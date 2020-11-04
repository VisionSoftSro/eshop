package org.visionsoft.crm.domain.scheme

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id

@Entity
class MyTable {
    @Id
    var id:Long?=null
}