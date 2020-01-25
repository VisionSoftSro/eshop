package org.visionsoft.common.config

import org.springframework.context.annotation.Configuration
import org.springframework.core.io.Resource
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter
import org.springframework.web.servlet.resource.PathResourceResolver

import java.io.IOException

@Configuration
class WebApplicationConfiguration : WebMvcConfigurerAdapter() {

    override fun addResourceHandlers(registry: ResourceHandlerRegistry) {

        registry
                .addResourceHandler("/static/**")
                .addResourceLocations("classpath:/public/static/")
                .resourceChain(false)
        registry
                .addResourceHandler("/favicon.ico")
                .addResourceLocations("classpath:/public/favicon.ico")
                .resourceChain(false)
        registry
                .addResourceHandler("/manifest.json")
                .addResourceLocations("classpath:/public/manifest.json")
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

}
