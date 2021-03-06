package org.visionsoft.common

import org.springframework.dao.EmptyResultDataAccessException
import org.visionsoft.common.transaction.entityManager
import javax.persistence.EntityManager
import javax.persistence.NoResultException
import javax.persistence.TypedQuery
import javax.persistence.criteria.CriteriaBuilder
import javax.persistence.criteria.Path


val <X> TypedQuery<X>.singleResultOrNull
    get() = try {
        this.singleResult
    } catch (e: EmptyResultDataAccessException) {
        null
    } catch (e: NoResultException) {
        null
    }

fun CriteriaBuilder.lowerLike(left: Path<String>, right:String) = CriteriaHelper.likeLowerUnaccent(this, left, right)

inline fun <T> T.applyAndPersist(em: EntityManager = entityManager, block: T.() -> Unit) = this.apply {
    block()
    persist(em)
}

fun <T> T.persist(em:EntityManager) = this.apply {
    em.persist(this)
}
