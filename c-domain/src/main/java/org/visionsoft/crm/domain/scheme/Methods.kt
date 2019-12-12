package org.visionsoft.crm.domain.scheme

import java.math.BigDecimal
import javax.persistence.*
import javax.validation.constraints.NotNull

@Entity
@Table
class PaymentMethod {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id:Long?=null

    @NotNull
    var code:String? = null

    var localizedName:String? = null
}


@Entity
@Table
class ShippingMethod {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id:Long?=null

    @NotNull
    var code:String? = null

    var shippingTime:String? = null
    var price:BigDecimal = BigDecimal.ZERO
    var localizedName:String? = null

}
