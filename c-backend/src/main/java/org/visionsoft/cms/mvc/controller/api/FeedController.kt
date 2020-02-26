package org.visionsoft.cms.mvc.controller.api

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.visionsoft.crm.domain.dao.GoodsDao
import java.math.BigDecimal


@JacksonXmlRootElement(localName = "SHOP")
class Shop {
    var items:List<ShopItem>?=null
}

@JacksonXmlRootElement(localName = "SHOPITEM")
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

@RestController
@RequestMapping("feed/")
class FeedController {

    @Value("\${mail.domain}")
    lateinit var domain:String

    @Autowired
    lateinit var goodsDao: GoodsDao

    @GetMapping("seznam")
    fun getSeznam() = Shop().apply {
        items = goodsDao.findAll().map { ShopItem().apply {
            this.category = it.categories[0].id
            this.id = it.id
            this.name = it.name
            this.delivery = if(it.stock > 0) {0} else {-1}
            this.description = it.description
            this.price = it.price
            this.imgUrl = ""
            this.url = ""
        } }
    }


}
