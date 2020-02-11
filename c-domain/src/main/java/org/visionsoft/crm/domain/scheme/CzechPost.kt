package org.visionsoft.crm.domain.scheme

import org.dom4j.Branch
import java.math.BigDecimal
import javax.persistence.*
import javax.validation.constraints.NotNull

@Entity
@Table
class CpBranches {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id:Long?=null
    lateinit var zip:String
    lateinit var name:String
    lateinit var address:String
    lateinit var city:String
}
