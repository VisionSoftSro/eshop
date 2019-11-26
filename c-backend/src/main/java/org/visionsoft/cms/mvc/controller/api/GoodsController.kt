package org.visionsoft.cms.mvc.controller.api

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.visionsoft.crm.domain.dao.CategoryDao
import org.visionsoft.crm.domain.dao.GoodsDao
import org.visionsoft.crm.domain.scheme.Category

@RestController
@RequestMapping("goods")
class GoodsController {

    @Autowired
    lateinit var goodsDao:GoodsDao


    @GetMapping
    fun all() = goodsDao.findAll()

    @GetMapping("/category")
    fun byCategory(@RequestParam category: List<Category>) = goodsDao.findByCategories(category)

}


@RestController
@RequestMapping("categories")
class CategoriesController {

    @Autowired
    lateinit var categoryDao: CategoryDao


    @GetMapping
    fun all() = categoryDao.findAll()

}