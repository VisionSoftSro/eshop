package org.visionsoft.boot.config.security

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer
import org.springframework.security.oauth2.provider.token.RemoteTokenServices

@Configuration
@ConfigurationProperties(prefix = "oauth")
@EnableResourceServer
@EnableGlobalMethodSecurity(prePostEnabled = true)
class OauthSecurityConfiguration : ResourceServerConfigurerAdapter() {


    lateinit var endpoint: String
    lateinit var clientId: String
    lateinit var clientSecret: String

    override fun configure(http: HttpSecurity) {
        println("************Configure http*******************")
        http
                .antMatcher("/**")
                .authorizeRequests()
                .antMatchers("/", "/error**")
                .permitAll()
                .anyRequest()
                .authenticated()
    }

    override fun configure(resources: ResourceServerSecurityConfigurer) {
        resources.tokenServices(tokenService())
    }
    @Bean
    fun tokenService(): RemoteTokenServices {
        val tokenService = RemoteTokenServices()
        tokenService.setCheckTokenEndpointUrl(endpoint)
        tokenService.setClientId(clientId)
        tokenService.setClientSecret(clientSecret)
        return tokenService
    }
}