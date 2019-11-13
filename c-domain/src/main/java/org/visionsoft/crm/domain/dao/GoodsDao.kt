package org.visionsoft.crm.domain.dao

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import org.visionsoft.crm.domain.scheme.Goods

@Repository
interface GoodsDao: JpaRepository<Goods, String>