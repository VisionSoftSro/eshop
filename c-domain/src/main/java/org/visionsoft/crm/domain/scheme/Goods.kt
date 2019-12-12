package org.visionsoft.crm.domain.scheme

import java.math.BigDecimal
import javax.persistence.*
import javax.validation.constraints.NotNull

@Entity
@Table(name="goods")
class Goods {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id:Long?=null
    var code:String? = null
    var name:String? = null
    var description:String? = null
    var stock:Int = 0
    var price:BigDecimal = BigDecimal.ZERO
    var hot:Boolean = false

    @ManyToMany
    @JoinTable(name = "goods_category", joinColumns = [(JoinColumn(name = "goods"))], inverseJoinColumns = [(JoinColumn(name = "category"))])
    var categories:MutableList<Category> = mutableListOf()

}

@Entity
@Table(name="category")
class Category {
    @Id
    var id:String? = null
}
@Entity
@Table(name="c_order")
class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id:Long?=null

    @NotNull
    var email:String? = null

    @ManyToMany
    @JoinTable(name = "c_order_goods", joinColumns = [(JoinColumn(name = "c_order"))], inverseJoinColumns = [(JoinColumn(name = "goods"))])
    var categories:MutableList<Goods> = mutableListOf()

}



