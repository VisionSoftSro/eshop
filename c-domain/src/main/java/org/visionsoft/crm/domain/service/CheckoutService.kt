package org.visionsoft.crm.domain.service

import com.fasterxml.jackson.databind.ObjectMapper
import net.sf.jasperreports.engine.JREmptyDataSource
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.core.io.InputStreamSource
import org.springframework.stereotype.Component
import org.visionsoft.common.mail.Attachment
import org.visionsoft.common.mail.MailClient
import org.visionsoft.common.reports.ReportExportConfig
import org.visionsoft.common.reports.ReportRenderType
import org.visionsoft.common.reports.ReportRepository
import org.visionsoft.common.transaction.transaction
import org.visionsoft.crm.domain.dao.CzechPostDao
import org.visionsoft.crm.domain.dao.ZasilkovnaDao

import org.visionsoft.crm.domain.scheme.*
import java.io.ByteArrayInputStream
import java.io.File
import java.io.FileInputStream
import java.io.FileOutputStream

import java.math.BigDecimal
import java.time.Instant
import java.time.LocalDate
import java.time.ZoneId
import java.util.*


class CartGoods {
    var goods: Goods? = null
    var pcs:Int? = null
}
open class SimpleCheckout {
    var goods:MutableList<CartGoods> = mutableListOf()
}
class Checkout: SimpleCheckout() {
    var firstName:String? = null
    var lastName:String? = null
    var emailAddress:String? = null
    var phoneNumber:String? = null
    var street:String? = null
    var streetNo:String? = null
    var city:String? = null
    var postCode:String? = null
    var branchId:String? = null
    var shippingMethod:ShippingMethod? = null
    var paymentMethod:PaymentMethod? = null
}

data class ReportGoods(val name:String, val price:Double)

@Component
class CheckoutService {

    @Value("\${invoices.path}")
    lateinit var invoicePath:String

    @Value("\${mail.storage}")
    lateinit var storageEmail:String

    @Autowired
    lateinit var mailClient: MailClient

    @Autowired
    lateinit var objectMapper: ObjectMapper

    @Autowired
    lateinit var reports:ReportRepository

    @Autowired
    lateinit var zasilkovnaDao: ZasilkovnaDao

    @Autowired
    lateinit var czechPostDao: CzechPostDao


    fun getDeliveryAddress(order:Order):String? = when(order.shippingMethod!!.code!!) {
        "zasilkovna"-> {
            zasilkovnaDao.findById(order.branchId!!).get().let { "${it.country}, ${it.city}, ${it.address}, ${it.zip})" }
        }
        "czech_post"-> {
            czechPostDao.findById(order.branchId!!.toLong()).get().let {value-> "${value.name} - (${value.city}, ${value.address}, ${value.zip})" }
        }
        else -> {
            null
        }
    }



    /**
     * Make order. Return goods what are out of stock else
     */
    fun makeOrder(checkout: Checkout) = transaction {em->
        val order = Order()
        order.status = OrderStatus.New
        order.goods = checkout.goods.map { OrderContent().apply { goods = it.goods; pcs = it.pcs; this.order = order } }
        order.email = checkout.emailAddress
        order.address = "${checkout.street} ${checkout.streetNo}"
        order.city = checkout.city
        order.firstName = checkout.firstName
        order.lastName = checkout.lastName
        order.postCode = checkout.postCode
        order.branchId = checkout.branchId
        order.paymentMethod = checkout.paymentMethod
        order.shippingMethod = checkout.shippingMethod
//        order.json = objectMapper.writeValueAsString(checkout)
        em.persist(order)

        checkout.goods.forEach {
            em.merge(it.goods)?.let {goods ->
                goods.stock -= it.pcs!!
            }
        }
        order
    }?.let {order->
        val map = mutableMapOf(
                "orderId" to order.id!!,
                "checkout" to checkout,
                "deliveryAddress" to getDeliveryAddress(order),
                "totalPrice" to (checkout.goods.sumByDouble { it.goods!!.price.multiply(BigDecimal(it.pcs!!)).toDouble()} + checkout.shippingMethod!!.price.toDouble() + checkout.paymentMethod!!.price.toDouble())
        )
        mailClient.send("Vaše objednávka", "general", "customerOrderAcceptedTemplate", map, checkout.emailAddress!!)
        mailClient.send("Nová objednávka", "general", "storageOrderAcceptedTemplate", map, storageEmail)
        order
    }

    fun createInvoice(order:Order) = transaction {
        val orderMerged = it.merge(order)
//        val checkout = objectMapper.readValue(orderMerged.json, Checkout::class.java)
        orderMerged.status = OrderStatus.Invoice
        val reportGoods = order.goods.map{g-> ReportGoods(g.goods!!.name!!, g.goods!!.price.toDouble()) }.toMutableList().also {l->
            orderMerged.shippingMethod?.let {
              ship->  l.add(ReportGoods(ship.localizedName!!, ship.price.toDouble()))
            }
            orderMerged.paymentMethod?.let {
                pay->  l.add(ReportGoods(pay.localizedName!!, pay.price.toDouble()))
            }
        }
        val map = mutableMapOf<String, Any?>(
                "orderId" to order.id!!,
                "createdDate" to Date(),
                "payday" to Date.from(LocalDate.now().plusDays(5).atStartOfDay(ZoneId.systemDefault()).toInstant()),
                "name" to "${order.firstName} ${order.lastName}",
                "address" to "${order.address}, ${order.postCode}",
                "city" to "${order.city}",
                "ordersDS" to JRBeanCollectionDataSource(reportGoods),
                "totalPrice" to orderMerged.sum(),
                "shipmentDS" to JRBeanCollectionDataSource(listOf(orderMerged)),
                "shipment" to reports[orderMerged.paymentMethod!!.code!!].getCompiledReport(),
                "branchId" to orderMerged.branchId,
                "deliveryAddress" to getDeliveryAddress(order)
        )
        val name = "faktura_${order.id}.pdf"
        val file = File("$invoicePath/$name")
        if(file.createNewFile()) {
            val fos = FileOutputStream(file)
            fos.use {
                reports["invoice"].renderToStream(map, JREmptyDataSource(),fos, ReportRenderType.PDF )
            }
        }
        mailClient.send("Vaše faktura k objednávce", "general", "customerOrderInvoiceTemplate", map, listOf(Attachment(name, InputStreamSource { FileInputStream(file) })), order.email!!)
        mailClient.send("Byla vygenerována faktura", "general", "storageOrderInvoiceTemplate", map, listOf(Attachment(name, InputStreamSource { FileInputStream(file) })), storageEmail)
    }

    fun ship(order:Order, trackingUrl:String?) = transaction {
        val orderMerged = it.merge(order)
        orderMerged.status = OrderStatus.Shipped
    }?.let {
        val map = mutableMapOf(
            "orderId" to order.id!!,
            "checkout" to SimpleCheckout().apply {
                goods = order.goods.map { CartGoods().apply { pcs = it.pcs; goods = it.goods } }.toMutableList()
            }
        )
        if(trackingUrl != null) {
            map["trackingUrl"] = trackingUrl
        }
        mailClient.send("Objednávka byla expedována", "general", "customerOrderShippingTemplate", map, order.email!!)
    }

    fun cancel(order:Order, sendEmail:Boolean) = transaction {em->
        val orderMerged = em.merge(order)
        orderMerged.status = OrderStatus.Cancel
        orderMerged.goods.forEach {
            it.goods!!.stock += it.pcs!!
        }
    }

}
