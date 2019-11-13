package org.visionsoft.cms.mvc.controller.api

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.visionsoft.crm.domain.dao.GoodsDao

@RestController
@RequestMapping("goods")
class GoodsController {

    @Autowired
    lateinit var goodsDao:GoodsDao


    @GetMapping
    fun all() = goodsDao.findAll()

}