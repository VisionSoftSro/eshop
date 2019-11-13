package org.visionsoft.cms.mvc.config

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.context.event.ApplicationReadyEvent
import org.springframework.context.ApplicationListener
import org.springframework.stereotype.Component
import org.visionsoft.common.applyAndPersist
import org.visionsoft.common.transaction.transaction
import org.visionsoft.crm.domain.scheme.RoleCode
import org.visionsoft.crm.domain.scheme.User
import org.visionsoft.crm.domain.service.UserService

@Component
class AppInitialization: ApplicationListener<ApplicationReadyEvent> {
    @Autowired
    lateinit var userService: UserService

    override fun onApplicationEvent(event: ApplicationReadyEvent) {
        transaction {
//            if(userService.findUser("admin") == null) {
//                User().applyAndPersist {
//                    email = "admin"
//                    roles = RoleCode.values().toMutableList()
//                    enabled = true
//                }
//            }
        }
    }
}