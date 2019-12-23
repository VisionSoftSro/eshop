package org.visionsoft.cms.mvc.controller.api

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.visionsoft.common.JsonWrapper
import org.visionsoft.common.controller.WebError
import org.visionsoft.common.toJson
import org.visionsoft.common.transaction.transaction
import org.visionsoft.crm.domain.dao.OrdersDao
import org.visionsoft.crm.domain.scheme.Order
import org.visionsoft.crm.domain.scheme.OrderStatus
import org.visionsoft.crm.domain.service.CheckoutService

data class Passcode(val passcode: String, val value:Boolean)

@RestController
@RequestMapping("/storage")
class StorageController {

    @Autowired
    lateinit var ordersDao: OrdersDao

    @Value("\${storage.passcode}")
    lateinit var passcode: String

    @Autowired
    lateinit var checkoutService: CheckoutService

    @PostMapping("passcode")
    fun passcode(@RequestParam passcode:String) = Passcode(passcode, passcode == this.passcode)

    @PostMapping("save/{order}")
    fun save(order:Order, @RequestParam(required = false) trackingUrl:String?, @RequestHeader passcode:String, @RequestHeader type:String): JsonWrapper {
        testPasscode(passcode)
        when (type) {
            "confirm" -> checkoutService.confirm(order, trackingUrl)
            "cancelWithEmail" -> checkoutService.cancel(order, true)
            "cancel" -> checkoutService.cancel(order, false)
        }
        return true.toJson()
    }

    @GetMapping
    fun list(order:Order, @RequestHeader passcode:String): List<Order> {
        testPasscode(passcode)
        return ordersDao.findByStatus(OrderStatus.New)
    }

    fun testPasscode(passcode:String) = if(passcode != this.passcode) throw WebError.createException(HttpStatus.FORBIDDEN) else true

}