package org.visionsoft.crm.domain.dao

import org.springframework.data.domain.Sort
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.JpaSpecificationExecutor
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import org.visionsoft.crm.domain.scheme.Category
import org.visionsoft.crm.domain.scheme.Goods
import org.visionsoft.crm.domain.scheme.Order
import org.visionsoft.crm.domain.scheme.OrderStatus

@Repository
interface GoodsDao: JpaRepository<Goods, Long>, JpaSpecificationExecutor<Goods> {

    @Query("FROM Goods WHERE categories in :categories")
    fun findByCategories(categories:List<Category>, sort:Sort):List<Goods>
    @Query("FROM Goods WHERE published = true")
    fun findPublished(sort:Sort):List<Goods>
}
@Repository
interface GoodsCrudDao: CrudRepository<Goods, Long>

@Repository
interface CategoryDao: JpaRepository<Category, String>

@Repository
interface OrdersDao: JpaRepository<Order, Long>, JpaSpecificationExecutor<Order> {
    @Query("FROM Order WHERE status = :status")
    fun findByStatus(status:OrderStatus):List<Order>
}
