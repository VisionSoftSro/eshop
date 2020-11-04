package org.visionsoft.eshop.spring.controller.api

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
class IndexApiController{


    @GetMapping
    fun get() = "welcome"

}