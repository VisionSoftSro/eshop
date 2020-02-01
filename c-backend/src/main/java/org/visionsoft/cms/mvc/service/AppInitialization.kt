package org.visionsoft.cms.mvc.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.context.event.ApplicationReadyEvent
import org.springframework.context.ApplicationListener
import org.springframework.stereotype.Component
import org.visionsoft.cms.mvc.service.czechpost.BalikovnyService
import org.visionsoft.common.async.async
import org.visionsoft.crm.domain.dao.CzechPostDao
import org.visionsoft.crm.domain.scheme.User
import org.visionsoft.crm.domain.service.UserService

@Component
class AppInitialization: ApplicationListener<ApplicationReadyEvent> {
    @Autowired
    lateinit var userService: UserService

    @Autowired
    lateinit var balikovnyService:BalikovnyService

    @Autowired
    lateinit var czechPostDao: CzechPostDao

    override fun onApplicationEvent(event: ApplicationReadyEvent) {
        async<User>(null) {
            if(czechPostDao.count() == 0L) {
                balikovnyService.migrate()
            }

        }
    }
}