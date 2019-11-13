package org.visionsoft.crm.domain.scheme

import java.math.BigDecimal
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name="goods")
class Goods {

    @Id
    var id:String? = null
    var name:String? = null
    var description:String? = null
    var stock:Int = 0
    var price:BigDecimal = BigDecimal.ZERO
    var hot:Boolean = false
}