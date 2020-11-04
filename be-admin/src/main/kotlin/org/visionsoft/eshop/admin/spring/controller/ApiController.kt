package org.visionsoft.eshop.admin.spring.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class ApiController {

    @GetMapping
    fun welcome() = "welcome admin"

}