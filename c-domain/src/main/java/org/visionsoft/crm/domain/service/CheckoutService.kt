package org.visionsoft.crm.domain.service

import com.fasterxml.jackson.databind.ObjectMapper
import net.sf.jasperreports.engine.JREmptyDataSource
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.core.io.InputStreamSource
import org.springframework.stereotype.Component
import org.visionsoft.common.mail.Attachment
import org.visionsoft.common.mail.MailClient
import org.visionsoft.common.reports.ReportRenderType
import org.visionsoft.common.reports.ReportRepository
import org.visionsoft.common.transaction.transaction

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
    var postCode:Int? = null
    var shippingMethod:ShippingMethod? = null
    var paymentMethod:PaymentMethod? = null
}

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

    /**
     * Make order. Return goods what are out of stock else
     */
    fun makeOrder(checkout: Checkout) = transaction {em->
        val order = Order()
        order.status = OrderStatus.New
        order.goods = checkout.goods.map { OrderContent().apply { goods = it.goods; pcs = it.pcs; this.order = order } }
        order.email = checkout.emailAddress
        order.json = objectMapper.writeValueAsString(checkout)
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
                "totalPrice" to (checkout.goods.sumByDouble { it.goods!!.price.multiply(BigDecimal(it.pcs!!)).toDouble()} + checkout.shippingMethod!!.price.toDouble() + checkout.paymentMethod!!.price.toDouble())
        )
        mailClient.send("Vaše objednávka", "general", "customerOrderAcceptedTemplate", map, checkout.emailAddress!!)
        mailClient.send("Nová objednávka", "general", "storageOrderAcceptedTemplate", map, storageEmail)
        order
    }

    fun createInvoice(order:Order) = transaction {
        val orderMerged = it.merge(order)
        val checkout = objectMapper.readValue(orderMerged.json, Checkout::class.java)
//        orderMerged.status = OrderStatus.Invoice
        val map = mutableMapOf<String, Any?>(
                "orderId" to order.id!!,
                "createdDate" to Date(),
                "payday" to Date.from(LocalDate.now().plusDays(5).atStartOfDay(ZoneId.systemDefault()).toInstant()),
                "name" to "${checkout.firstName} ${checkout.firstName}",
                "address" to "${checkout.street} ${checkout.street} ${checkout.postCode}",
                "city" to "${checkout.city}",
                "PAYMENT_METHOD" to reports["cod"]

        )
        val file = File("$invoicePath/${order.id!!}.pdf")
        var stream:InputStreamSource? = null
        if(file.createNewFile()) {
            val fos = FileOutputStream(file)
            reports["invoice"].renderToStream(map, JREmptyDataSource(),fos, ReportRenderType.PDF )
            stream = InputStreamSource { FileInputStream(file) }
        }
        mailClient.send("Vaše faktura k objednávce", "general", "customerOrderInvoiceTemplate", map, stream?.let {a-> listOf(Attachment("faktura_${order.id}.png", a))}, order.email!!)
        mailClient.send("Byla vygenerována faktura", "general", "storageOrderInvoiceTemplate", map, stream?.let {a-> listOf(Attachment("faktura_${order.id}.png", a))}, storageEmail)
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