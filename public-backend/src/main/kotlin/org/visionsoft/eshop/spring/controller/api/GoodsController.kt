package org.visionsoft.eshop.spring.controller.api

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Sort
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import org.visionsoft.crm.domain.dao.CategoryDao
import org.visionsoft.crm.domain.dao.GoodsDao

@RestController
@RequestMapping("goods")
class GoodsController {

    @Autowired
    lateinit var goodsDao:GoodsDao


    @GetMapping
    fun all() = goodsDao.findPublished(Sort.by(Sort.Order.asc("name")))

    @GetMapping("/detail/{id}")
    fun item(@PathVariable id:Long) = goodsDao.findById(id).orElseThrow { ResponseStatusException(
            HttpStatus.NOT_FOUND, "entity not found"
    ) }

}


@RestController
@RequestMapping("categories")
class CategoriesController {

    @Autowired
    lateinit var categoryDao: CategoryDao


    @GetMapping
    fun all() = categoryDao.findAll()

}
