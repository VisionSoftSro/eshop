package org.visionsoft.crm.domain.dao

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import org.visionsoft.crm.domain.scheme.Category
import org.visionsoft.crm.domain.scheme.Goods
import org.visionsoft.crm.domain.scheme.PaymentMethod
import org.visionsoft.crm.domain.scheme.ShippingMethod


@Repository
interface PaymentMethodDao: JpaRepository<PaymentMethod, Long> {
    @Query("FROM PaymentMethod WHERE published = true")
    fun findPublished():List<PaymentMethod>
}
@Repository
interface ShippingMethodDao: JpaRepository<ShippingMethod, Long> {
    @Query("FROM ShippingMethod WHERE published = true")
    fun findPublished():List<ShippingMethod>
}