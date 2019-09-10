package org.visionsoft.boot.controller

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.security.Principal

@RestController
@RequestMapping
class TestController {

    @GetMapping
    fun get() = "test"

    @GetMapping("/user")
    fun user(currentUser: Principal) = ResponseEntity.ok(currentUser)
}