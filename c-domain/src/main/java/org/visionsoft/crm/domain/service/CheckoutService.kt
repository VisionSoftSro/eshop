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

class Checkout {
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

    var goods:MutableList<CartGoods> = mutableListOf()
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

}