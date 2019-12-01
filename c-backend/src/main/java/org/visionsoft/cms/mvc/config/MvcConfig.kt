package org.visionsoft.cms.mvc.config

import org.springframework.web.servlet.DispatcherServlet
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext
import org.springframework.web.servlet.config.annotation.EnableWebMvc
import org.springframework.boot.web.servlet.ServletRegistrationBean
import org.springframework.context.annotation.*
import org.springframework.web.multipart.commons.CommonsMultipartResolver
import org.springframework.context.annotation.Bean




@Configuration
@ComponentScan(basePackages = ["org.visionsoft.cms.mvc.controller.common"])
@Import(WebSecurity::class)
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
    @Bean
    fun multiPartResolver(): CommonsMultipartResolver {

        return CommonsMultipartResolver()
    }
}


@ComponentScan(basePackages = ["org.visionsoft.cms.mvc.controller.api"])
@EnableWebMvc
class CrmApiConfig {

}