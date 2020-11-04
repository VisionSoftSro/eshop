package org.visionsoft.eshop.spring

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.context.event.ApplicationReadyEvent
import org.springframework.context.ApplicationListener
import org.springframework.stereotype.Component
import org.visionsoft.eshop.spring.service.CzechPostService
import org.visionsoft.eshop.spring.service.ZasilkovnaService


@Component
class AppInitialization: ApplicationListener<ApplicationReadyEvent> {

    @Autowired
    lateinit var czechPostService: CzechPostService
    @Autowired
    lateinit var zasilkovnaService: ZasilkovnaService

    override fun onApplicationEvent(event: ApplicationReadyEvent) {
        czechPostService.import()
        zasilkovnaService.import()
    }
}
