package org.visionsoft.common

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.builder.SpringApplicationBuilder
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer
import org.springframework.context.annotation.EnableAspectJAutoProxy
import org.springframework.context.annotation.Import
import org.visionsoft.cms.mvc.config.MvcConfig
import org.visionsoft.common.config.MailConfig
import org.visionsoft.crm.domain.config.DomainConfig


@SpringBootApplication//(exclude=[DispatcherServletAutoConfiguration::class])
@EnableAspectJAutoProxy
@Import(DomainConfig::class, MvcConfig::class, MailConfig::class)
class Application {

    companion object {
        @JvmStatic
        fun main(args: Array<String>) {
            SpringApplication.run(Application::class.java, *args)
        }
    }

}