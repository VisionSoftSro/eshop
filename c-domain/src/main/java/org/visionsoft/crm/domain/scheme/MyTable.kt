package org.visionsoft.crm.domain.scheme

import javax.persistence.*


@Table
@Entity
class MyTable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    var note:String? = null
}