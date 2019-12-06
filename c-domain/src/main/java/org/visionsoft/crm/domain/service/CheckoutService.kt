package org.visionsoft.crm.domain.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import org.visionsoft.common.mail.MailClient
import org.visionsoft.common.transaction.transaction
import org.visionsoft.crm.domain.scheme.Goods


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
    var shippingMethod:Int? = null
    var paymentMethod:Int? = null

    var goods:MutableList<CartGoods> = mutableListOf()
}

@Component
class CheckoutService {

    @Autowired
    lateinit var mailClient: MailClient

    fun makeOrder(checkout: Checkout) = transaction {
        mailClient.send("herisn23@gmail.com", "general", "customerOrderConfirmTemplate", mutableMapOf("checkout" to checkout), checkout.emailAddress!!)
    }

}