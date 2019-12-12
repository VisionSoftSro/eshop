package org.visionsoft.crm.domain.dao

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import org.visionsoft.crm.domain.scheme.Category
import org.visionsoft.crm.domain.scheme.PaymentMethod
import org.visionsoft.crm.domain.scheme.ShippingMethod


@Repository
interface PaymentMethodDao: JpaRepository<PaymentMethod, Long>
@Repository
interface ShippingMethodDao: JpaRepository<ShippingMethod, Long>