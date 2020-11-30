package org.visionsoft.cms.mvc.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.context.event.ApplicationReadyEvent
import org.springframework.context.ApplicationListener
import org.springframework.stereotype.Component
import org.visionsoft.cms.mvc.service.shipping.CzechPostService
import org.visionsoft.cms.mvc.service.shipping.ZasilkovnaService
import org.visionsoft.common.async.async
import org.visionsoft.crm.domain.scheme.User
import org.visionsoft.crm.domain.service.UserService

@Component
class AppInitialization: ApplicationListener<ApplicationReadyEvent> {

    @Autowired
    lateinit var czechPostService:CzechPostService
    @Autowired
    lateinit var zasilkovnaService: ZasilkovnaService

    override fun onApplicationEvent(event: ApplicationReadyEvent) {
        async<User>(null) {
            czechPostService.import()
        }
        async<User>(null) {
            zasilkovnaService.import()
        }
    }
}
