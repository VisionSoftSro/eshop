package org.visionsoft.cms.mvc.controller.api

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.visionsoft.common.transaction.transaction
import org.visionsoft.crm.domain.scheme.Goods
import org.visionsoft.crm.domain.service.Checkout
import org.visionsoft.crm.domain.service.CheckoutService





data class CheckoutResult(var success:Boolean, var outOfStock:List<Goods>?, var orderNumber:Long)

@RestController
@RequestMapping("checkout")
class CheckoutController {


    @Autowired
    lateinit var checkoutService: CheckoutService

    @PostMapping
    fun acceptOrder(checkout:Checkout): CheckoutResult {
        val outOfStock = mutableListOf<Goods>()
        checkout.goods.forEach {
            if(it.goods!!.stock < it.pcs!!) {
                outOfStock.add(it.goods!!)
            }
        }
        val success = checkout.goods.isNotEmpty() && outOfStock.isEmpty()
        var id:Long? = null
        if(success) {
            id = checkoutService.makeOrder(checkout)?.id
        }

        return CheckoutResult(success, outOfStock, id!!)
    }
}
