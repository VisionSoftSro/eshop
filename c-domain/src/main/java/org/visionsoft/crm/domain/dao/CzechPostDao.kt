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

@Repository
interface CzechPostDao: JpaRepository<CpBranches, Long> {


}


@Component
class CzechPostGenericDao:GenericDao<CpBranches>(CpBranches::class.java)