package org.visionsoft.crm.domain.dao

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import org.visionsoft.crm.domain.scheme.Category
import org.visionsoft.crm.domain.scheme.Goods

@Repository
interface GoodsDao: JpaRepository<Goods, Long> {

    @Query("FROM Goods WHERE categories in :categories")
    fun findByCategories(categories:List<Category>)

}
@Repository
interface CategoryDao: JpaRepository<Category, String>