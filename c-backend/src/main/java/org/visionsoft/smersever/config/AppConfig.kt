package org.visionsoft.smersever.config

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.context.event.ApplicationReadyEvent
import org.springframework.context.ApplicationListener
import org.springframework.stereotype.Component
import org.visionsoft.common.applyAndPersist
import org.visionsoft.common.transaction.transaction
import org.visionsoft.domain.scheme.RoleCode
import org.visionsoft.domain.scheme.User
import org.visionsoft.domain.service.UserService

@Component
class AppConfig: ApplicationListener<ApplicationReadyEvent>{

    @Autowired
    lateinit var userService: UserService

    override fun onApplicationEvent(event: ApplicationReadyEvent) {
        transaction {
            if(userService.findUser("admin") == null) {
                User().applyAndPersist {
                    email = "admin"
                    roles = RoleCode.values().toMutableList()
                    enabled = true
                }
            }
        }
    }
}