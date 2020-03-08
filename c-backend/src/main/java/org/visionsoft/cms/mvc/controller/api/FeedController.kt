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


const val NS = "http://www.zbozi.cz/ns/offer/1.0"

@JacksonXmlRootElement(localName = "SHOP", namespace = NS)
class Shop {
    @JacksonXmlElementWrapper(useWrapping = false)
    @JacksonXmlProperty(localName = "SHOPITEM", namespace = NS)
    var items:List<ShopItem>?=null
}

class ShopItem {
    @JacksonXmlProperty(localName = "ITEM_ID", namespace = NS)
    var id:Long?=null

    @JacksonXmlProperty(localName = "PRODUCTNAME", namespace = NS)
    var name:String?=null
    @JacksonXmlProperty(localName = "DESCRIPTION", namespace = NS)
    var description:String?=null
    @JacksonXmlProperty(localName = "CATEGORYTEXT", namespace = NS)
    var category:String?=null
    @JacksonXmlProperty(localName = "URL", namespace = NS)
    var url:String?=null
    @JacksonXmlProperty(localName = "IMGURL", namespace = NS)
    var imgUrl:String?=null
    @JacksonXmlProperty(localName = "PRICE_VAT", namespace = NS)
    var price:BigDecimal?=null
    @JacksonXmlProperty(localName = "DELIVERY_DATE", namespace = NS)
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
    fun getSeznam() = Shop().apply {
        items = goodsDao.findAll().map { ShopItem().apply {
            this.category = seoCategoriesCZNames[it.categories[0].id]
            this.id = it.id
            this.name = it.name!!.trim()
            this.delivery = if(it.stock > 0) {0} else {-1}
            this.description = it.description
            this.price = it.price
            this.url = "$domain/$category/${name!!.unaccent().replace(" ", "-")}#pid=$id"
            this.imgUrl = "$domain/static/product-img/${it.code!!}/1.jpg"
        } }
    }


}
