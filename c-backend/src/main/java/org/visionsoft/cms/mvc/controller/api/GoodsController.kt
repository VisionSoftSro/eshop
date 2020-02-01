package org.visionsoft.cms.mvc.controller.api

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Sort
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.client.HttpStatusCodeException
import org.springframework.web.server.ResponseStatusException
import org.visionsoft.common.controller.WebError
import org.visionsoft.common.controller.WebServiceErrorController
import org.visionsoft.crm.domain.dao.CategoryDao
import org.visionsoft.crm.domain.dao.GoodsDao
import org.visionsoft.crm.domain.scheme.Category
import org.visionsoft.crm.domain.scheme.Goods

@RestController
@RequestMapping("goods")
class GoodsController {

    @Autowired
    lateinit var goodsDao:GoodsDao


    @GetMapping
    fun all() = goodsDao.findAll(Sort.by(Sort.Order.asc("name")))

    @GetMapping("/detail/{id}")
    fun item(@PathVariable id:Long) = goodsDao.findById(id).orElseThrow { ResponseStatusException(
            HttpStatus.NOT_FOUND, "entity not found"
    ) }

//    @GetMapping("/category")
//    fun byCategory(@RequestParam category: List<Category>) = goodsDao.findByCategories(category, Sort.by(Sort.Order.asc("name")))

}


@RestController
@RequestMapping("categories")
class CategoriesController {

    @Autowired
    lateinit var categoryDao: CategoryDao


    @GetMapping
    fun all() = categoryDao.findAll()

}