package org.visionsoft.common

import javax.persistence.criteria.CriteriaBuilder
import javax.persistence.criteria.Path
import javax.persistence.criteria.Predicate


object CriteriaHelper {
    fun likeLowerUnaccent(cb: CriteriaBuilder, left: Path<String>, right: String): Predicate {
        val leftExp = cb.function("unaccent", String::class.java, left)
        val rightExp = cb.function("unaccent", String::class.java, cb.literal("%$right%"))
        return cb.like(cb.lower(leftExp), cb.lower(rightExp))
    }
}