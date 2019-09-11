package org.visionsoft.smersever.config

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer
import org.visionsoft.boot.config.security.OauthSecurityConfiguration
import org.visionsoft.boot.domain.scheme.User

@EnableResourceServer
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Configuration
@ConfigurationProperties(prefix = "oauth")
class SecurityConfig: OauthSecurityConfiguration<User>() {

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
}