package org.visionsoft.crm.domain.dao

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import org.visionsoft.crm.domain.scheme.Category
import org.visionsoft.crm.domain.scheme.Goods
import org.visionsoft.crm.domain.scheme.Order
import org.visionsoft.crm.domain.scheme.OrderStatus

@Repository
interface GoodsDao: JpaRepository<Goods, Long> {

    @Query("FROM Goods WHERE categories in :categories")
    fun findByCategories(categories:List<Category>):List<Goods>

}
@Repository
interface CategoryDao: JpaRepository<Category, String>

@Repository
interface OrdersDao: JpaRepository<Order, Long> {
    @Query("FROM Order WHERE status = :status")
    fun findByStatus(status:OrderStatus):List<Order>
}