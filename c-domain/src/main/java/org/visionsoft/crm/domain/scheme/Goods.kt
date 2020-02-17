package org.visionsoft.crm.domain.scheme

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonManagedReference
import java.io.Serializable
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
    var published:Boolean = false
    var images:Int = 0
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



class OrderContentId: Serializable  {
    var goods:Goods? = null
    var order:Order? = null
}

@Entity
@Table(name="c_order_goods")
@IdClass(OrderContentId::class)
class OrderContent {

    @Id
    @ManyToOne
    @JoinColumn(name="goods")
    var goods:Goods? = null

    @Id
    @ManyToOne
    @JoinColumn(name="c_order")
    @JsonBackReference
    var order:Order? = null

    var pcs:Int? = null

}

enum class OrderStatus {
    New, Invoice, Shipped, Cancel
}


@Entity
@Table(name="c_order")
class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id:Long?=null

    @NotNull
    var email:String? = null

//    var json:String? = null

    @Enumerated(EnumType.STRING)
    var status:OrderStatus? = null

    var address:String? = null
    var city:String? = null
    var firstName:String? = null
    var lastName:String? = null
    var postCode:String? = null
    var branchId:String? = null
    @ManyToOne
    var shippingMethod:ShippingMethod? = null
    @ManyToOne
    var paymentMethod:PaymentMethod? = null
    @OneToMany(mappedBy = "order", cascade = [CascadeType.PERSIST])
    @JsonManagedReference
    var goods:List<OrderContent> = listOf()




}

fun Order.sum() = (this.goods.sumByDouble { it.goods!!.price.multiply(BigDecimal(it.pcs!!)).toDouble()} + this.shippingMethod!!.price.toDouble() + this.paymentMethod!!.price.toDouble())

