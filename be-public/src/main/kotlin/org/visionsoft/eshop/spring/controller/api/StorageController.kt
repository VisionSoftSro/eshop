package org.visionsoft.eshop.spring.controller.api

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.data.repository.CrudRepository
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.visionsoft.crm.domain.dao.GoodsCrudDao
import org.visionsoft.crm.domain.dao.GoodsDao
import org.visionsoft.crm.domain.dao.OrdersDao
import org.visionsoft.crm.domain.lowerLike
import org.visionsoft.crm.domain.scheme.Goods
import org.visionsoft.crm.domain.scheme.Order
import org.visionsoft.crm.domain.scheme.OrderStatus
import org.visionsoft.eshop.forest.CRUDControllerSingleType
import org.visionsoft.eshop.forest.JsonWrapper
import org.visionsoft.eshop.forest.ListController
import org.visionsoft.eshop.forest.exception
import org.visionsoft.eshop.forest.toJson
import org.visionsoft.eshop.spring.service.CheckoutService
import java.math.BigDecimal
import javax.persistence.criteria.CriteriaBuilder
import javax.persistence.criteria.CriteriaQuery
import javax.persistence.criteria.Predicate
import javax.persistence.criteria.Root
import javax.servlet.http.HttpServletRequest

data class Passcode(val passcode: String, val value:Boolean)

@Component
class StoragePasscode {
    @Value("\${storage.passcode}")
    lateinit var passcode: String
    fun testPasscode(passcode:String) = when {
        passcode != this.passcode -> throw HttpStatus.FORBIDDEN.exception()
        else -> true.toJson()
    }
}


abstract class StorageDataController<T>:ListController<T, T>() {
    @Autowired
    lateinit var storagePasscode: StoragePasscode
    override fun testAccess(request: HttpServletRequest) {
        storagePasscode.testPasscode(request.getHeader("passcode"))
    }

    override fun extract(list: List<T>) = list
}


@RestController
@RequestMapping("/storage/goods")
class StorageGoodsController(override val repository: GoodsDao) : StorageDataController<Goods>() {
    override fun where(root: Root<Goods>, cq:CriteriaQuery<*>, cb: CriteriaBuilder): Predicate? {
        val preds = mutableListOf<Predicate>()
        parameter<String>("name") {
            preds.add(cb.lowerLike(root.get<String>(Goods::name.name), it))
        }
        parameter<String>("description") {
            preds.add(cb.lowerLike(root.get<String>(Goods::description.name), it))
        }
        parameter<String>("price") {priceParam->
            val price = priceParam.split("-").filter { it.isNotEmpty() }.map { BigDecimal(it) }
            if(price.size == 1) {
                preds.add(cb.equal(root.get<BigDecimal>(Goods::price.name), price[0]))
            }
            if(price.size == 2) {
                preds.add(cb.between(root.get<BigDecimal>(Goods::price.name), price[0], price[1]))
            }
        }
        parameter<Boolean>("published") {
            preds.add(cb.equal(root.get<Boolean>(Goods::published.name), it))
        }
        parameter<Int>("stock") {
            preds.add(cb.equal(root.get<Int>(Goods::stock.name), it))
        }
        return cb.and(*preds.toTypedArray())
    }
}

@Transactional
@RestController
@RequestMapping("/storage/goods")
class StorageGoodsCRUDController(override val crudRepository: GoodsCrudDao): CRUDControllerSingleType<Goods, Long>() {

    @Autowired
    lateinit var storagePasscode: StoragePasscode



    override fun testAccess(request: HttpServletRequest) {
        storagePasscode.testPasscode(request.getHeader("passcode"))
    }

}



@RestController
@RequestMapping("/storage/list")
class StorageListController(override val repository:OrdersDao) : StorageDataController<Order>() {
    override fun where(root: Root<Order>, cq:CriteriaQuery<*>, cb: CriteriaBuilder): Predicate? {
        val preds = mutableListOf<Predicate>()
        parameters<OrderStatus>("status") {
            preds.add(root.get<OrderStatus>(Order::status.name).`in`(it))
        }
        parameter<Long>("id") {
            preds.add(cb.equal(root.get<OrderStatus>(Order::id.name), it))
        }
        parameter<String>("email") {
            preds.add(cb.lowerLike(root.get<String>(Order::email.name), it))
        }
        return cb.and(*preds.toTypedArray())
    }
}


@RestController
@RequestMapping("/storage")
class StorageController {

    @Autowired
    lateinit var ordersDao: OrdersDao

    @Autowired
    lateinit var storagePasscode: StoragePasscode


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