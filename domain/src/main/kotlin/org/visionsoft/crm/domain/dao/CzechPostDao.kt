package org.visionsoft.crm.domain.dao

import org.springframework.data.jpa.domain.Specification
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.JpaSpecificationExecutor
import org.springframework.stereotype.Repository
import org.visionsoft.crm.domain.likeLowerUnaccent
import org.visionsoft.crm.domain.scheme.CpBranches
import org.visionsoft.crm.domain.scheme.Zasilkovna
import javax.persistence.criteria.CriteriaBuilder
import javax.persistence.criteria.Predicate
import javax.persistence.criteria.Root


object TermPredicate {
    inline fun <reified X> createTerms(value:String, root:Root<X>, cb:CriteriaBuilder, vararg terms:String):Predicate {
        return cb.and(*terms.map { cb.likeLowerUnaccent(root.get<String>(it), value) }.toTypedArray())
    }
}



object CzechPostSpecification {
    fun createTermSpec(term:String?, vararg terms:String) = Specification<CpBranches> { root, cq, cb ->
        val preds = mutableListOf<Predicate>()
        term?.let { TermPredicate.createTerms(term, root, cb, *terms) }
        cb.and(*preds.toTypedArray())
    }
}

@Repository
interface CzechPostDao: JpaRepository<CpBranches, Long>, JpaSpecificationExecutor<CpBranches>

object ZasilkovnaSpecification {
    fun createTermSpec(term:String?, vararg terms:String) = Specification<CpBranches> { root, cq, cb ->
        val preds = mutableListOf<Predicate>()
        term?.let { TermPredicate.createTerms(term, root, cb, *terms) }
        cb.and(*preds.toTypedArray())
    }
}
@Repository
interface ZasilkovnaDao: JpaRepository<Zasilkovna, String>