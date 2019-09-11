package org.visionsoft.domain.service

import org.springframework.stereotype.Component
import org.visionsoft.boot.IUserService
import org.visionsoft.domain.scheme.User

@Component("userService")
class UserService: IUserService<User> {
    override fun findUser(name: String): User {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

}