package org.visionsoft.crm.domain.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import org.visionsoft.common.mail.MailClient
import org.visionsoft.common.transaction.transaction
import org.visionsoft.crm.domain.scheme.*
import java.math.BigDecimal


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
    var phoneNumber:Long? = null
    var street:String? = null
    var streetNo:String? = null
    var city:String? = null
    var postCode:Int? = null
    var shippingMethod:ShippingMethod? = null
    var paymentMethod:PaymentMethod? = null


}

@Component
class CheckoutService {

    @Value("\${mail.storage}")
    lateinit var storageEmail:String

    @Autowired
    lateinit var mailClient: MailClient


    /**
     * Make order. Return goods what are out of stock else
     */
    fun makeOrder(checkout: Checkout) = transaction {em->

        val order = Order()
        order.status = OrderStatus.New
        order.goods = checkout.goods.map { OrderContent().apply { goods = it.goods; pcs = it.pcs; this.order = order } }
        order.email = checkout.emailAddress
        em.persist(order)

        checkout.goods.forEach {
            em.merge(it.goods)?.let {goods ->
                goods.stock -= it.pcs!!
            }
        }
        order
    }?.let {
        val map = mutableMapOf(
                "orderId" to it.id!!,
                "checkout" to checkout,
                "totalPrice" to (checkout.goods.sumByDouble { it.goods!!.price.multiply(BigDecimal(it.pcs!!)).toDouble()} + checkout.shippingMethod!!.price.toDouble())
        )
        mailClient.send("Vaše objednávka", "general", "customerOrderConfirmTemplate", map, checkout.emailAddress!!)
        mailClient.send("Nová objednávka", "general", "storageOrderConfirmTemplate", map, storageEmail)
        it
    }

    fun confirm(order:Order, trackingUrl:String?) = transaction {
        val orderMerged = it.merge(order)
        orderMerged.status = OrderStatus.Confirm
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