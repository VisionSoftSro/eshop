package org.visionsoft.common.domain

import javax.persistence.EntityManager
import javax.persistence.PersistenceContext
import java.util.ArrayList
import javax.persistence.criteria.CriteriaBuilder
import javax.persistence.criteria.Predicate
import javax.persistence.criteria.Root

abstract class GenericDao<T>(var entityClass:Class<T>) {

    @PersistenceContext
    lateinit var entityManager: EntityManager
    fun createCriteria(maxResult: Int, predicate: Predicable<T>?): JpaCriteria<T> {
        return object : JpaCriteria<T>(entityManager) {
            override var maxResult: Int = maxResult
            override var domainClass: Class<T> = entityClass
            override fun where(criteria: JpaCriteria<T>, criteriaBuilder:CriteriaBuilder, root:Root<T>): Predicate? = predicate?.where(this, criteriaBuilder, root)
        }
    }

    fun <ID>find(id:ID) = entityManager.find(entityClass, id)

    fun find(max:Int = 10, predicate: Predicable<T>? = null): List<T> {
        return createCriteria(max, predicate).list()
    }

    fun single(predicate: Predicable<T>): T? {
        return createCriteria(0, predicate).singleResult()
    }

    fun count(predicate: Predicable<T>? = null): Long? {
        return createCriteria(0, predicate).count()
    }

    fun findByTerm(value: String, vararg keys: String) = this.findByTerm(value, 10, *keys)

    fun findByTerm(value: String, max: Int, vararg keys: String): JpaCriteria<T> {
        return createCriteria(max, object:Predicable<T> {
            override fun where(criteria: JpaCriteria<T>, criteriaBuilder: CriteriaBuilder, root: Root<T>): Predicate? {
                val predicates = ArrayList<Predicate>()
                for (key in keys) {
                    predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get(key)), criteriaBuilder.lower(criteriaBuilder.literal("%$value%"))))
                }
                return criteriaBuilder.or(*predicates.toTypedArray())
            }
        })
    }
}