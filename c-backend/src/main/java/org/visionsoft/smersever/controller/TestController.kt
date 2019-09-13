package org.visionsoft.smersever.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.visionsoft.common.controller.DataControllerSingleType
import org.visionsoft.common.currentUser
import org.visionsoft.common.transaction.entityManager
import org.visionsoft.domain.dao.MyDao
import org.visionsoft.domain.dao.UserDao
import org.visionsoft.domain.scheme.User
import java.security.Principal

@RestController
@RequestMapping
class TestController {

    @Autowired
    lateinit var userDao: UserDao

    @Autowired
    lateinit var myDao: MyDao

    @GetMapping
    fun get() = "test"

    @GetMapping("getUsers")
    fun getUsers() = userDao.find()

    @GetMapping("getMy")
    fun getMy() = entityManager.createQuery("from MyTable order by note").resultList

    @GetMapping("/user")
    fun user(user: Principal) = currentUser<User>()
}



@RestController
@RequestMapping("users")
class UsersList: DataControllerSingleType<User>()
