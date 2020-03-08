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


@JacksonXmlRootElement(localName = "SHOP")
class Shop {
    @JacksonXmlElementWrapper(useWrapping = false)
    @JacksonXmlProperty(localName = "SHOPITEM")
    var items:List<ShopItem>?=null
}

class ShopItem {
    @JacksonXmlProperty(localName = "ITEM_ID")
    var id:Long?=null

    @JacksonXmlProperty(localName = "PRODUCTNAME")
    var name:String?=null
    @JacksonXmlProperty(localName = "DESCRIPTION")
    var description:String?=null
    @JacksonXmlProperty(localName = "CATEGORYTEXT")
    var category:String?=null
    @JacksonXmlProperty(localName = "URL")
    var url:String?=null
    @JacksonXmlProperty(localName = "IMGURL")
    var imgUrl:String?=null
    @JacksonXmlProperty(localName = "PRICE_VAT")
    var price:BigDecimal?=null
    @JacksonXmlProperty(localName = "DELIVERY_DATE")
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
