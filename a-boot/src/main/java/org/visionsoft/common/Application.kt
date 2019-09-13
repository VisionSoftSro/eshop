package org.visionsoft.common

import org.springframework.boot.CommandLineRunner
import org.springframework.context.annotation.Bean
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.domain.EntityScan
import org.springframework.context.ApplicationContext
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.EnableAspectJAutoProxy
import org.springframework.transaction.annotation.EnableTransactionManagement
import java.util.*


@SpringBootApplication
@EnableTransactionManagement
@ComponentScan("org.visionsoft")
@EntityScan( "org.visionsoft.domain.scheme" )
@EnableAspectJAutoProxy
class Application {

    @Bean
    fun commandLineRunner(ctx: ApplicationContext): CommandLineRunner {
        return CommandLineRunner {
            println("Let's inspect the beans provided by Spring Boot:")

            val beanNames = ctx.beanDefinitionNames
            Arrays.sort(beanNames)
            for (beanName in beanNames) {
               // println(beanName)
            }
        }
    }


    companion object {

        @JvmStatic
        fun main(args: Array<String>) {
            print("Starting App")
            SpringApplication.run(Application::class.java, *args)
        }
    }

}