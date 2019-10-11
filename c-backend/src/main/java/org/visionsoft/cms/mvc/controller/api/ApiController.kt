package org.visionsoft.cms.mvc.controller.api

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.visionsoft.crm.domain.dao.UserDao
import java.time.LocalDate


@RequestMapping("test2")
@RestController
class TestApiController{
    @Autowired
    lateinit var userDao: UserDao


    @GetMapping
    fun get() = userDao.find()




}