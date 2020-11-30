package org.visionsoft.common.domain

import org.hibernate.ScrollMode
import org.visionsoft.common.singleResultOrNull
import java.util.ArrayList
import javax.persistence.EntityManager
import javax.persistence.LockModeType
import javax.persistence.TypedQuery
import javax.persistence.criteria.*


interface Predicable<E> {
    fun where(criteria:JpaCriteria<E>, criteriaBuilder: CriteriaBuilder, root:Root<E>):Predicate?
}

abstract class JpaCriteria<T>(var entityManager: EntityManager): Predicable<T> {
    var lockMode: LockModeType = LockModeType.NONE

    internal abstract var domainClass: Class<T>
    internal abstract var maxResult:Int
    var useDistinct = false
    var criteriaBuilder:CriteriaBuilder = entityManager.criteriaBuilder

    init {
        //        query = criteriaBuilder.createQuery()
//        root = query.from(this.domainClass)
    }

    fun singleResult():T? {
        val q = this.createTypedQuery()
        q.lockMode = this.lockMode
        return q.singleResultOrNull
    }
    fun list(next: Int = -1, nextIsPage: Boolean = true): List<T> {
        val q = this.createTypedQuery()
        q.lockMode = this.lockMode
        if (next >= 0) {
            if (nextIsPage) {
                q.firstResult = (next - 1) * this.maxResult
            } else {
                q.firstResult = next
            }
            q.maxResults = this.maxResult
        }
        return q.resultList
    }

    fun scroll(scroll: HibernateScroll<T>) {
        val q = this.createTypedQuery()
        q.lockMode = this.lockMode
        val hquery = q.unwrap(org.hibernate.Query::class.java)
        val results = hquery.scroll(ScrollMode.FORWARD_ONLY)
        outer@ while (results.next()) {
            val data = results.get() as? Array<T>
            if (data != null) {
                for (t in data) {
                    val continueC = scroll.give(t)
                    if (!continueC) {
                        break@outer
                    }
                }
            }
        }
    }

    private fun createTypedQuery(): TypedQuery<T> {
        val conditionalOrder = CriteriaOrder()
        val (query, root) = this.getQuery<T>()
        val orderList = ArrayList<Order>()
//        if (conditionalOrder.getConditionalOrder() != null) {
//            orderList.addAll(conditionalOrder.getConditionalOrder())
//        }
        val simpleOrder = orderBy(criteriaBuilder, root)
        orderList.addAll(simpleOrder)
        if(orderList.isNotEmpty())
        query.orderBy(orderList)
        query.distinct(useDistinct)
        return this.entityManager.createQuery<T>(query)
    }

    open fun orderBy(cb: CriteriaBuilder, root: Root<T>): List<Order> = listOf()




    data class QueryWrapper<U, T>(val query:CriteriaQuery<U>, val root:Root<T>)
    fun <U>getQuery(count:Boolean = false): QueryWrapper<U, T> {
        var cq = this.criteriaBuilder.createQuery()
        val root = cq.from(domainClass)
        cq = if(count) {
            cq.select(criteriaBuilder.count(root))
        } else {
            cq.select(root)
        }

        val where = where(this, criteriaBuilder, root)
        if (where != null) {
            cq = cq.where(where)
        }

        return QueryWrapper<U, T>(cq as CriteriaQuery<U>, root)
    }


    fun count(): Long {
        val (query) = this.getQuery<Long>(true)
        val q = this.entityManager.createQuery<Long>(query)
        return q.singleResult
    }


    fun createOrderFromSource(root:Root<T>, source: List<OrderClause>?, convertor: OrderConvertor<T>?): List<Order> {
        val list = ArrayList<Order>()
        if (source != null)
            for (order in source) {
                if (convertor != null) {
                    val _order = convertor!!.convertOrder(order, this)
                    if (_order != null) {
                        list.add(_order)
                        continue
                    }
                }
                val exp = createExpresionFromName(order.name!!, root)
                val dir = order.dir
                if ("asc" == dir) {
                    list.add(criteriaBuilder.asc(exp))
                } else {
                    list.add(criteriaBuilder.desc(exp))
                }
            }
        return list
    }

    fun createExpresionFromName(name: String, root:Root<T>): Expression<*>? {
        val path = name.split("\\.".toRegex()).dropLastWhile { it.isEmpty() }.toTypedArray()
        var exp: Path<*>? = null
        for (s in path) {
            if (exp == null) {
                exp = root.get<Any>(s)
            } else {
                exp = exp.get<Any>(s)
            }
        }
        return exp
    }

}

interface HibernateScroll<T> {

    fun give(data: T): Boolean
}

class OrderClause {
    var name: String? = null
    var dir: String? = null
}

class CriteriaOrder {
    var clause: MutableList<OrderClause> = ArrayList()
    var conditionalOrder: List<Order> = ArrayList()


    fun pullClause(name: String): OrderClause? {
        var clause: OrderClause? = null
        for (c in this.clause) {
            if (name == c.name) {
                clause = c
                break
            }
        }
        if (clause != null)
            this.clause.remove(clause)
        return clause
    }

}


interface OrderConvertor<E> {
    fun convertOrder(clause: OrderClause, crit: JpaCriteria<E>): Order
}