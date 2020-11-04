package org.visionsoft.crm.domain.scheme

import javax.persistence.*

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
