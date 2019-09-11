package org.visionsoft.smersever.config

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.visionsoft.boot.config.security.OauthSecurityConfiguration
import org.visionsoft.domain.scheme.User

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