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
    var kind:String = "posta"
    lateinit var lat:BigDecimal
    lateinit var lng:BigDecimal
    lateinit var city:String
    lateinit var cityPart:String

    @OneToMany(mappedBy = "branch")
    var openingHours:List<CpOpeningHours> = mutableListOf()
}
@Entity
@Table
class CpDays {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id:Long?=null
    lateinit var name:String
}

@Entity
@Table
class CpOpeningHours {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id:Long?=null
    @ManyToOne
    lateinit var branch:CpBranches
    @ManyToOne
    lateinit var days:CpDays
    lateinit var openFrom:String
    lateinit var openTo:String
}