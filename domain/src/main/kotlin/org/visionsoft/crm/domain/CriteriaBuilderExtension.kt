package org.visionsoft.crm.domain

import javax.persistence.criteria.CriteriaBuilder
import javax.persistence.criteria.Path
import javax.persistence.criteria.Predicate


fun CriteriaBuilder.likeLowerUnaccent(left: Path<String>, right: String): Predicate {
    val leftExp = this.function("unaccent", String::class.java, left)
    val rightExp = this.function("unaccent", String::class.java, this.literal("%$right%"))
    return this.like(this.lower(leftExp), this.lower(rightExp))
}