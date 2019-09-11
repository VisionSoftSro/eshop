package org.visionsoft.domain.scheme

import javax.persistence.*

@Table
@Entity
class TestEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

}