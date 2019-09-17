package org.visionsoft.crm.domain.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import org.visionsoft.common.IUserService
import org.visionsoft.crm.domain.dao.UserDao
import org.visionsoft.crm.domain.scheme.User

@Component("userService")
class UserService: IUserService<User> {

    @Autowired
    lateinit var userDao: UserDao

    override fun findUser(name: String): User? = userDao.findByTerm(name, "email").singleResult()

}