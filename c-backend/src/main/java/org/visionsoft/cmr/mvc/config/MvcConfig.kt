package org.visionsoft.cmr.mvc.config

import org.springframework.web.servlet.DispatcherServlet
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext
import org.springframework.web.servlet.config.annotation.EnableWebMvc
import org.springframework.boot.web.servlet.ServletRegistrationBean
import org.springframework.context.ApplicationContext
import org.springframework.context.annotation.*


@Configuration
@ComponentScan(basePackages = ["org.visionsoft.cmr.mvc.config", "org.visionsoft.cmr.mvc.controller.common"])
class MvcConfig {

    @Bean
    fun servlet(): DispatcherServlet {
        val root = AnnotationConfigWebApplicationContext()
        root.register(CrmApiConfig::class.java)
        return DispatcherServlet(root)
    }

    @Bean
    fun apiV1(): ServletRegistrationBean<*> {
        val servletRegistrationBean = ServletRegistrationBean(servlet(), "/api/*")
        servletRegistrationBean.setName("api-v1")
        return servletRegistrationBean
    }
}


@ComponentScan(basePackages = ["org.visionsoft.cmr.mvc.controller.api"])
@EnableWebMvc
class CrmApiConfig {

}