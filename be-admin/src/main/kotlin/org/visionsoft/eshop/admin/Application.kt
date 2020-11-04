package org.visionsoft.eshop.admin

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.EnableLoadTimeWeaving
import org.springframework.context.annotation.Import
import org.visionsoft.crm.domain.config.DomainConfig
import org.visionsoft.eshop.admin.spring.PackageInfo


@SpringBootApplication
@EnableLoadTimeWeaving
@Import(DomainConfig::class)
@ComponentScan(basePackageClasses = [PackageInfo::class])
class Application

fun main(args: Array<String>) {
    runApplication<Application>(*args){
        setHeadless(false)
    }
}
