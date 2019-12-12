package org.visionsoft.crm.domain.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import org.visionsoft.common.mail.MailClient
import org.visionsoft.common.transaction.transaction
import org.visionsoft.crm.domain.scheme.Goods
import org.visionsoft.crm.domain.scheme.PaymentMethod
import org.visionsoft.crm.domain.scheme.ShippingMethod
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
        val map = mutableMapOf(
                "orderId" to 123,
                "checkout" to checkout,
                "totalPrice" to (checkout.goods.sumByDouble { it.goods!!.price.multiply(BigDecimal(it.pcs!!)).toDouble()} + checkout.shippingMethod!!.price.toDouble())
        )
        mailClient.send("herisn23@gmail.com", "general", "customerOrderConfirmTemplate", map, checkout.emailAddress!!)

        mailClient.send("herisn23@gmail.com", "general", "storageOrderConfirmTemplate", map, storageEmail)
    }

}