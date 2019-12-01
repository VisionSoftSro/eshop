package org.visionsoft.cms.mvc.controller.api

import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.visionsoft.crm.domain.scheme.Goods


class CartGoods {
    var goods:Goods? = null
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

@RestController
@RequestMapping("checkout")
class CheckoutController {

    @PostMapping
    fun acceptOrder(checkout:Checkout) {
        print(checkout)
    }
}
