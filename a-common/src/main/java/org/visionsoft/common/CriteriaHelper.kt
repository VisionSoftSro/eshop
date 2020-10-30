package org.visionsoft.common

import javax.persistence.criteria.CriteriaBuilder
import javax.persistence.criteria.Path
import javax.persistence.criteria.Predicate


object CriteriaHelper {
    fun likeLowerUnaccent(cb: CriteriaBuilder, left: Path<String>, right: String): Predicate {
        val leftExp = cb.function("lower_unaccent", String::class.java, left)
        val rightExp = cb.function("lower_unaccent", String::class.java, cb.literal("%$right%"))
        return cb.like(leftExp, rightExp)
    }

    fun lowerUnaccent(cb: CriteriaBuilder, left: Path<String>, right: String): Predicate {
        val leftExp = cb.function("lower_unaccent", String::class.java, left)
        val rightExp = cb.function("lower_unaccent", String::class.java, cb.literal(right))
        return cb.equal(leftExp, rightExp)
    }
}