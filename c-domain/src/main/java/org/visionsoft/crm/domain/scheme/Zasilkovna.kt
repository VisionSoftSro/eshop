package org.visionsoft.crm.domain.scheme

import javax.persistence.*

@Entity
@Table
class Zasilkovna {
    @Id
    var id:String?=null
    lateinit var zip:String
    lateinit var name:String
    lateinit var address:String
    lateinit var city:String
    lateinit var country:String
    lateinit var place:String
}
