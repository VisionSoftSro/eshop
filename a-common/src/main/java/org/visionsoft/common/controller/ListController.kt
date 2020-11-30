package org.visionsoft.common.controller



import org.springframework.http.HttpStatus
import org.springframework.validation.BindingResult
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.visionsoft.common.domain.JpaCriteria
import org.visionsoft.common.domain.OrderClause
import org.visionsoft.common.domain.OrderConvertor
import org.visionsoft.common.transaction.entityManager

import javax.persistence.criteria.CriteriaBuilder
import javax.persistence.criteria.Order
import javax.persistence.criteria.Predicate
import javax.persistence.criteria.Root
import javax.servlet.http.HttpServletRequest
import javax.validation.constraints.Max
import javax.validation.constraints.Min
import java.lang.reflect.ParameterizedType
import java.util.ArrayList


abstract class DataControllerSingleType<E>: DataController<E, E>() {
    override fun extract(list: List<E>) = list
}

/**
 * Created by heris on 03.07.2017.
 */
@Validated
abstract class DataController<E, W> : AdHocController() {

    val entityClass: Class<E>
        get() = findParametrizedClass()!!.actualTypeArguments[0] as Class<E>

    val searchValue: String?
        get() = request["search[value]"]

    val useDistinct = false

    fun testAccess(request: HttpServletRequest) {}

    @GetMapping("", "/")
    operator fun get(@Min(0) @RequestParam(value = "page", defaultValue = "1") start: Int,
                          @Min(1) @Max(100) @RequestParam(value = "pageSize", defaultValue = "10") length: Int,
                          @RequestParam(required = false, defaultValue = "true", value = "nextIsPage") nextIsPage: Boolean, ordering: OrderingWrapper, request: HttpServletRequest, result: BindingResult): ScrollableList<W> {
        testAccess(request)
        if (result.hasErrors()) {
            throw WebError.createException(HttpStatus.BAD_REQUEST)
        }
        val ec = object : JpaCriteria<E>(entityManager) {
            override var domainClass = entityClass
            override var maxResult = length
            override fun where(criteria: JpaCriteria<E>, criteriaBuilder: CriteriaBuilder, root: Root<E>) = this@DataController.where(criteria, criteriaBuilder, root)
            override fun orderBy(cb: CriteriaBuilder, root: Root<E>) = this@DataController.innerOrderBy(cb, root, this, ordering)
        }
        ec.useDistinct = useDistinct
        val list = ScrollableList<W>()
        list.list = extract(ec.list(start, nextIsPage))
        list.page = start
        list.objectsPerPage = length
        list.total = ec.count()
//        list.pageCount = list.total.toInt() / length + if (list.total % length > 0) 1 else 0
        this.updateList(list)
        return list
    }

    fun innerOrderBy(qb: CriteriaBuilder, root: Root<E>, ec:JpaCriteria<E>, ordering: OrderingWrapper): MutableList<Order> {
        val orderList:MutableList<Order> = ArrayList()
        orderList.addAll(ec.createOrderFromSource(root, this.normalizeOrder(ordering.order), this.orderConvertor))
        val customOrder = this.orderBy(qb, root)
        if(customOrder != null) {
            orderList.addAll(customOrder)
        }
        if(orderList.isEmpty()) {
            orderList.addAll(this.defaultOrder(qb, root))
        }
        return orderList
    }
    val orderConvertor:OrderConvertor<E>? get() = null
    abstract fun extract(list:List<E>):List<W>

    fun normalizeOrder(list:List<OrderClause>) = list

    fun updateList(list: ScrollableList<W>) {
    }

    fun orderBy(cb: CriteriaBuilder, root: Root<E>): MutableList<Order>? {
        return null
    }

    fun defaultOrder(qb: CriteriaBuilder, root: Root<E>): List<Order> {
        val list = ArrayList<Order>()
        list.add(qb.asc(root.get<Any>("id")))
        return list
    }

    fun where(criteria: JpaCriteria<E>, criteriaBuilder: CriteriaBuilder, root: Root<E>): Predicate? = null

    fun findParametrizedClass(): ParameterizedType? {
        var clz: Class<*>? = javaClass

        while (clz != null && clz.genericSuperclass !is ParameterizedType) {
            clz = clz.superclass
        }

        return if (clz == null) {
            null
        } else {
            clz.genericSuperclass as ParameterizedType
        }
    }
}
class OrderingWrapper {
    var order: List<OrderClause> = ArrayList()
}