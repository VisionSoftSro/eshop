package org.visionsoft.crm.domain.dao

import org.springframework.data.domain.Sort
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Component
import org.springframework.stereotype.Repository
import org.visionsoft.common.domain.GenericDao
import org.visionsoft.crm.domain.scheme.Category
import org.visionsoft.crm.domain.scheme.CpBranches
import org.visionsoft.crm.domain.scheme.Goods
import org.visionsoft.crm.domain.scheme.Zasilkovna

@Repository
interface CzechPostDao: JpaRepository<CpBranches, Long> {


}
@Repository
interface ZasilkovnaDao: JpaRepository<Zasilkovna, String> {


}


@Component
class CzechPostGenericDao:GenericDao<CpBranches>(CpBranches::class.java)

@Component
class ZasilkovnaGenericDao:GenericDao<Zasilkovna>(Zasilkovna::class.java)
