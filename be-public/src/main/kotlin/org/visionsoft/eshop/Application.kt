package org.visionsoft.eshop

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.EnableAspectJAutoProxy
import org.springframework.context.annotation.EnableLoadTimeWeaving
import org.springframework.context.annotation.Import
import org.springframework.instrument.classloading.InstrumentationLoadTimeWeaver
import org.visionsoft.crm.domain.config.DomainConfig
import org.visionsoft.eshop.spring.PackageInfo


@SpringBootApplication
@EnableLoadTimeWeaving
@ComponentScan(basePackageClasses = [PackageInfo::class])
@Import(DomainConfig::class)
class Application

fun main(args: Array<String>) {
    runApplication<Application>(*args){
        setHeadless(false)
    }
}
