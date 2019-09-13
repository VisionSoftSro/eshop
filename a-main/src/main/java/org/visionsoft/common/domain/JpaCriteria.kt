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
        val query = this.getQuery<T>()
        val orderList = ArrayList<Order>()
//        if (conditionalOrder.getConditionalOrder() != null) {
//            orderList.addAll(conditionalOrder.getConditionalOrder())
//        }
        val simpleOrder = orderBy(criteriaBuilder, query.from(domainClass))
        orderList.addAll(simpleOrder)
        query.orderBy(orderList)
        return this.entityManager.createQuery<T>(query)
    }

    fun orderBy(cb: CriteriaBuilder, root: Root<T>): List<Order> = listOf()



    fun <U>getQuery(count:Boolean = false): CriteriaQuery<U> {

        val cq = this.criteriaBuilder.createQuery()
        val root = cq.from(domainClass)
        if(count) {
            cq.select(criteriaBuilder.count(root))
        } else {
            cq.select(root)
        }

        val where = where(this, criteriaBuilder, root)
        if (where != null) {
            cq.where(where)
        }

        return cq as CriteriaQuery<U>
    }


    fun count(): Long? {
        val q = this.entityManager.createQuery<Long>(this.getQuery(true))
        return q.singleResult
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
