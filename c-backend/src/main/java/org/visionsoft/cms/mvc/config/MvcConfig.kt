package org.visionsoft.cms.mvc.config

import com.fasterxml.jackson.dataformat.xml.XmlMapper
import com.fasterxml.jackson.dataformat.xml.ser.ToXmlGenerator
import org.springframework.boot.web.servlet.ServletRegistrationBean
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Import
import org.springframework.core.io.ResourceLoader
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder
import org.springframework.http.converter.xml.MappingJackson2XmlHttpMessageConverter
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext
import org.springframework.web.multipart.commons.CommonsMultipartResolver
import org.springframework.web.servlet.DispatcherServlet
import org.springframework.web.servlet.config.annotation.EnableWebMvc
import org.visionsoft.common.reports.ReportPrinter
import org.visionsoft.common.reports.ReportRepository


@Configuration
@ComponentScan(basePackages = ["org.visionsoft.cms.mvc.controller.common", "org.visionsoft.cms.mvc.service"])
@Import(WebSecurity::class)
class MvcConfig {

    @Bean
    fun mappingJackson2XmlHttpMessageConverter(builder: Jackson2ObjectMapperBuilder): MappingJackson2XmlHttpMessageConverter? {
        val xmlMapper = builder.createXmlMapper(true).build<XmlMapper>()
        xmlMapper.configure(ToXmlGenerator.Feature.WRITE_XML_DECLARATION, true)
        return MappingJackson2XmlHttpMessageConverter(xmlMapper)
    }

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

    @Bean
    fun reportPrinter()  = ReportPrinter()

    @Bean
    fun reportRepository(resourceLoader: ResourceLoader) = ReportRepository(mutableMapOf(
        "invoice" to resourceLoader.getResource("classpath:reports/invoice.jrxml"),
        "cod" to resourceLoader.getResource("classpath:reports/payment_cod.jrxml"),
        "bank_transfer" to resourceLoader.getResource("classpath:reports/payment_bank_transfer.jrxml")
    ))
}


@ComponentScan(basePackages = ["org.visionsoft.cms.mvc.controller.api"])
@EnableWebMvc
class CrmApiConfig {

}
