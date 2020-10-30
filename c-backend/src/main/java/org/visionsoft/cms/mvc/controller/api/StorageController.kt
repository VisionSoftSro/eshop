package org.visionsoft.cms.mvc.controller.api

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
import org.springframework.web.bind.annotation.*
import org.visionsoft.common.JsonWrapper
import org.visionsoft.common.controller.CRUDController
import org.visionsoft.common.controller.DataControllerSingleType
import org.visionsoft.common.controller.WebError
import org.visionsoft.common.toJson
import org.visionsoft.common.transaction.transaction
import org.visionsoft.crm.domain.dao.OrdersDao
import org.visionsoft.crm.domain.scheme.Goods
import org.visionsoft.crm.domain.scheme.Order
import org.visionsoft.crm.domain.scheme.OrderStatus
import org.visionsoft.crm.domain.service.CheckoutService
import javax.servlet.http.HttpServletRequest

data class Passcode(val passcode: String, val value:Boolean)

@Component
class StoragePasscode {
    @Value("\${storage.passcode}")
    lateinit var passcode: String
    fun testPasscode(passcode:String) = if(passcode != this.passcode) throw WebError.createException(HttpStatus.FORBIDDEN) else true

}


abstract class StorageDataController<T>:DataControllerSingleType<T>() {
    @Autowired
    lateinit var storagePasscode:StoragePasscode
    override fun testAccess(request: HttpServletRequest) {
        storagePasscode.testPasscode(request.getHeader("passcode"))
    }
}


@RestController
@RequestMapping("/storage/goods")
class StorageGoodsController:StorageDataController<Goods>()
@RestController
@RequestMapping("/storage/goods")
class StorageGoodsCRUDController: CRUDController<Goods, Goods>() {
    @Autowired
    lateinit var storagePasscode:StoragePasscode
    override fun testAccess(request: HttpServletRequest) {
        storagePasscode.testPasscode(request.getHeader("passcode"))
    }
    override fun convert(entity: Goods) = entity

}



@RestController
@RequestMapping("/storage/list")
class StorageListController:StorageDataController<Order>()


@RestController
@RequestMapping("/storage")
class StorageController {

    @Autowired
    lateinit var ordersDao: OrdersDao

    @Autowired
    lateinit var storagePasscode:StoragePasscode


    @Autowired
    lateinit var checkoutService: CheckoutService

    @PostMapping("passcode")
    fun passcode(@RequestParam passcode:String) = Passcode(passcode, passcode == storagePasscode.passcode)


    @GetMapping("{order}")
    fun order(@RequestHeader passcode:String, @PathVariable order:Order): Order {
        storagePasscode.testPasscode(passcode)
        return order
    }

    @PostMapping("save/{order}")
    fun save(order:Order, @RequestParam(required = false) trackingUrl:String?, @RequestHeader passcode:String, @RequestHeader type:String): JsonWrapper {
        storagePasscode.testPasscode(passcode)
        when (type) {
            "invoice" ->  checkoutService.createInvoice(order)
            "ship" -> checkoutService.ship(order, trackingUrl)
            "cancelWithEmail" -> checkoutService.cancel(order, true)
            "cancel" -> checkoutService.cancel(order, false)
        }
        return true.toJson()
    }

}