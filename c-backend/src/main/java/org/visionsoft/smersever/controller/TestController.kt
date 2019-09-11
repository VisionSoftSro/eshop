package org.visionsoft.smersever.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.visionsoft.boot.currentUser
import org.visionsoft.domain.scheme.User
import java.security.Principal

@RestController
@RequestMapping
class TestController {

    @GetMapping
    fun get() = "test"

    @GetMapping("/user")
    fun user(user: Principal) = currentUser<User>()
}