package org.visionsoft.eshop.spring.config

import com.fasterxml.jackson.dataformat.xml.XmlMapper
import com.fasterxml.jackson.dataformat.xml.ser.ToXmlGenerator
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.web.servlet.ServletRegistrationBean
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.EnableAspectJAutoProxy
import org.springframework.context.annotation.EnableLoadTimeWeaving
import org.springframework.core.io.Resource
import org.springframework.core.io.ResourceLoader
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder
import org.springframework.http.converter.xml.MappingJackson2XmlHttpMessageConverter
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext
import org.springframework.web.multipart.commons.CommonsMultipartResolver
import org.springframework.web.servlet.DispatcherServlet
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.EnableWebMvc
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import org.springframework.web.servlet.resource.PathResourceResolver
import org.visionsoft.common.reports.ReportPrinter
import org.visionsoft.eshop.spring.reports.ReportRepository
import org.visionsoft.eshop.spring.controller.api.IndexApiController
import java.io.IOException

const val CACHE_PERIOD = 3600*24*7


@Configuration
class MvcConfig: WebMvcConfigurer {

    @Value("\${cors.enabled}")
    var corsEnabled:Boolean = false
    override fun addResourceHandlers(registry: ResourceHandlerRegistry) {

        registry
                .addResourceHandler("/static/**")
                .addResourceLocations("classpath:/public/static/").setCachePeriod(CACHE_PERIOD)
                .resourceChain(false)
        registry
                .addResourceHandler("/favicon.ico")
                .addResourceLocations("classpath:/public/favicon.ico")
                .resourceChain(false)
        registry
                .addResourceHandler("/manifest.json")
                .addResourceLocations("classpath:/public/manifest.json")
                .resourceChain(false)
        registry
                .addResourceHandler("/swagger-ui/**")
                .addResourceLocations("/api/swagger-ui/*")
                .resourceChain(false)

        // redirects every page to index.html
        registry
                .addResourceHandler("/**")
                .addResourceLocations("classpath:/public/index.html")
                .resourceChain(false)
                .addResolver(object : PathResourceResolver() {
                    @Throws(IOException::class)
                    override fun getResource(resourcePath: String, location: Resource): Resource? {
                        return if (location.exists() && location.isReadable) location else null
                    }
                })

    }

    override fun addCorsMappings(registry: CorsRegistry) {
        if(corsEnabled) {
            registry.addMapping("/**")
                    .allowedOrigins("*")
                    .allowedMethods("*")
                    .allowedHeaders("*")
                    .allowCredentials(true).maxAge(3600)
        }
    }

    @Bean
    fun mappingJackson2XmlHttpMessageConverter(builder: Jackson2ObjectMapperBuilder): MappingJackson2XmlHttpMessageConverter? {
        val xmlMapper = builder.createXmlMapper(true).build<XmlMapper>()
        xmlMapper.configure(ToXmlGenerator.Feature.WRITE_XML_DECLARATION, true)
        return MappingJackson2XmlHttpMessageConverter(xmlMapper)
    }

    @Bean
    fun servlet(): DispatcherServlet {
        val root = AnnotationConfigWebApplicationContext()
        root.register(EshopApiConfig::class.java)
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


@ComponentScan(basePackageClasses = [IndexApiController::class])
@EnableWebMvc
class EshopApiConfig