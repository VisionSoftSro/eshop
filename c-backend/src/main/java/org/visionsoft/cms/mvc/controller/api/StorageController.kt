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
import org.visionsoft.common.domain.JpaCriteria
import org.visionsoft.common.lowerLike
import org.visionsoft.common.toJson
import org.visionsoft.common.transaction.transaction
import org.visionsoft.crm.domain.dao.OrdersDao
import org.visionsoft.crm.domain.scheme.Goods
import org.visionsoft.crm.domain.scheme.Order
import org.visionsoft.crm.domain.scheme.OrderStatus
import org.visionsoft.crm.domain.service.CheckoutService
import java.math.BigDecimal
import javax.persistence.criteria.CriteriaBuilder
import javax.persistence.criteria.Predicate
import javax.persistence.criteria.Root
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
class StorageGoodsController:StorageDataController<Goods>() {
    override fun where(criteria: JpaCriteria<Goods>, criteriaBuilder: CriteriaBuilder, root: Root<Goods>): Predicate? {
        val preds = mutableListOf<Predicate>()
        parameter<String>("name") {
            preds.add(criteriaBuilder.lowerLike(root.get(Goods::name.name), it))
        }
        parameter<String>("description") {
            preds.add(criteriaBuilder.lowerLike(root.get(Goods::description.name), it))
        }
        parameter<String>("price") {priceParam->
            val price = priceParam.split("-").filter { it.isNotEmpty() }.map { BigDecimal(it) }
            if(price.size == 1) {
                preds.add(criteriaBuilder.equal(root.get<BigDecimal>(Goods::price.name), price[0]))
            }
            if(price.size == 2) {
                preds.add(criteriaBuilder.between(root.get<BigDecimal>(Goods::price.name), price[0], price[1]))
            }
        }
        parameter<Boolean>("published") {
            preds.add(criteriaBuilder.equal(root.get<Boolean>(Goods::published.name), it))
        }
        parameter<Int>("stock") {
            preds.add(criteriaBuilder.equal(root.get<Int>(Goods::stock.name), it))
        }
        return criteriaBuilder.and(*preds.toTypedArray())
    }
}
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
class StorageListController:StorageDataController<Order>() {
    override fun where(criteria: JpaCriteria<Order>, criteriaBuilder: CriteriaBuilder, root: Root<Order>): Predicate? {
        val preds = mutableListOf<Predicate>()
        parameters<OrderStatus>("status") {
            preds.add(root.get<OrderStatus>(Order::status.name).`in`(it))
        }
        parameter<Long>("id") {
            preds.add(criteriaBuilder.equal(root.get<OrderStatus>(Order::id.name), it))
        }
        parameter<String>("email") {
            preds.add(criteriaBuilder.lowerLike(root.get<String>(Order::email.name), it))
        }
        return criteriaBuilder.and(*preds.toTypedArray())
    }
}


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