package org.visionsoft.cms.mvc.controller.api

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.visionsoft.common.unaccent
import org.visionsoft.crm.domain.dao.GoodsDao
import java.math.BigDecimal


const val NSSeznam = "http://www.zbozi.cz/ns/offer/1.0"

@JacksonXmlRootElement(localName = "SHOP", namespace = NSSeznam)
class ShopSeznam {
    @JacksonXmlElementWrapper(useWrapping = false)
    @JacksonXmlProperty(localName = "SHOPITEM", namespace = NSSeznam)
    var items:List<ShopItemSeznam>?=null
}

class ShopItemSeznam {
    @JacksonXmlProperty(localName = "ITEM_ID", namespace = NSSeznam)
    var id:Long?=null

    @JacksonXmlProperty(localName = "PRODUCTNAME", namespace = NSSeznam)
    var name:String?=null
    @JacksonXmlProperty(localName = "DESCRIPTION", namespace = NSSeznam)
    var description:String?=null
    @JacksonXmlProperty(localName = "CATEGORYTEXT", namespace = NSSeznam)
    var category:String?=null
    @JacksonXmlProperty(localName = "URL", namespace = NSSeznam)
    var url:String?=null
    @JacksonXmlProperty(localName = "IMGURL", namespace = NSSeznam)
    var imgUrl:String?=null
    @JacksonXmlProperty(localName = "PRICE_VAT", namespace = NSSeznam)
    var price:BigDecimal?=null
    @JacksonXmlProperty(localName = "DELIVERY_DATE", namespace = NSSeznam)
    var delivery:Long?=null
}


const val NSHeureka = ""

@JacksonXmlRootElement(localName = "SHOP", namespace = NSHeureka)
class ShopHeureka {
    @JacksonXmlElementWrapper(useWrapping = false)
    @JacksonXmlProperty(localName = "SHOPITEM", namespace = NSHeureka)
    var items:List<ShopItemHeureka>?=null
}

class ShopItemHeureka {
    @JacksonXmlProperty(localName = "ITEM_ID", namespace = NSHeureka)
    var id:Long?=null

    @JacksonXmlProperty(localName = "PRODUCTNAME", namespace = NSHeureka)
    var name:String?=null
    @JacksonXmlProperty(localName = "MANUFACTURER", namespace = NSHeureka)
    var manufacturer:String?=null
    @JacksonXmlProperty(localName = "DESCRIPTION", namespace = NSHeureka)
    var description:String?=null
    @JacksonXmlProperty(localName = "CATEGORYTEXT", namespace = NSHeureka)
    var category:String?=null
    @JacksonXmlProperty(localName = "URL", namespace = NSHeureka)
    var url:String?=null
    @JacksonXmlProperty(localName = "IMGURL", namespace = NSHeureka)
    var imgUrl:String?=null
    @JacksonXmlProperty(localName = "PRICE_VAT", namespace = NSHeureka)
    var price:BigDecimal?=null
    @JacksonXmlProperty(localName = "DELIVERY_DATE", namespace = NSHeureka)
    var delivery:Long?=null
}


val seoCategoriesCZNames = mapOf("gift" to "darky", "party" to "oslavy")

@RestController
@RequestMapping("feed/")
class FeedController {

    @Value("\${mail.domain}")
    lateinit var domain:String

    @Autowired
    lateinit var goodsDao: GoodsDao

    @GetMapping("seznam", produces= [MediaType.APPLICATION_XML_VALUE])
    fun getSeznam() = ShopSeznam().apply {
        items = goodsDao.findAll().map { ShopItemSeznam().apply {
            this.category = "Oslavy a dárky"
            this.id = it.id
            this.name = it.name!!.trim()
            this.delivery = if(it.stock > 0) {0} else {-1}
            this.description = it.description
            this.price = it.price
            this.url = "$domain/${seoCategoriesCZNames[it.categories[0].id]}/${name!!.unaccent().replace(" ", "-")}#pid=$id"
            this.imgUrl = "$domain/static/product-img/${it.code!!}/1.jpg"
        } }
    }


    @GetMapping("heureka", produces= [MediaType.APPLICATION_XML_VALUE])
    fun getHeureka() = ShopHeureka().apply {
        items = getSeznam().items?.map { ShopItemHeureka().apply {
            this.category = it.category
            this.id = it.id
            this.name = it.name
            this.manufacturer = it.name
            this.delivery = it.delivery
            this.description = it.description
            this.price = it.price
            this.url = it.url
            this.imgUrl = it.imgUrl
        } }
    }

}
