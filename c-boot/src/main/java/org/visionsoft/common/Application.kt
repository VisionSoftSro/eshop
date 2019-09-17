package org.visionsoft.common

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.domain.EntityScan
import org.springframework.boot.builder.SpringApplicationBuilder
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.EnableAspectJAutoProxy
import org.springframework.transaction.annotation.EnableTransactionManagement

@SpringBootApplication

class Application: SpringBootServletInitializer() {

    override fun configure(builder: SpringApplicationBuilder) = builder.sources(Application::class.java)!!

    companion object {

        @JvmStatic
        fun main(args: Array<String>) {
            print("Starting App")
            SpringApplication.run(Application::class.java, *args)
        }
    }

}

@Configuration
@EnableTransactionManagement
@ComponentScan("org.visionsoft")
@EntityScan( "org.visionsoft.domain.scheme" )
@EnableAspectJAutoProxy
class ApplicationBoot