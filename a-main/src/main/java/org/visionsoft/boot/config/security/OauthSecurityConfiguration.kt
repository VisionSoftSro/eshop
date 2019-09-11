package org.visionsoft.boot.config.security

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.core.Authentication
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer

import org.springframework.security.oauth2.provider.token.DefaultAccessTokenConverter
import org.springframework.security.oauth2.provider.token.DefaultUserAuthenticationConverter
import org.springframework.security.oauth2.provider.token.RemoteTokenServices
import org.visionsoft.boot.IUser
import org.visionsoft.boot.IUserService
import org.visionsoft.boot.transaction.transaction
import javax.annotation.Resource


abstract class OauthSecurityConfiguration<U:IUser> : ResourceServerConfigurerAdapter() {

    @Resource(name = "userService")
    lateinit var userService: IUserService<U>

    lateinit var endpoint: String
    lateinit var clientId: String
    lateinit var clientSecret: String


    override fun configure(resources: ResourceServerSecurityConfigurer) {
        resources.tokenServices(tokenService())
    }

    @Bean
    fun tokenService(): RemoteTokenServices {
        val tokenService = RemoteTokenServices()
        tokenService.setCheckTokenEndpointUrl(endpoint)
        tokenService.setClientId(clientId)
        tokenService.setClientSecret(clientSecret)
        tokenService.setAccessTokenConverter(tokenConverter())
        return tokenService
    }

    @Bean
    fun tokenConverter() = DefaultAccessTokenConverter().apply {
        setUserTokenConverter(TokenConverter(userService))
    }

}


class TokenConverter<U:IUser>(userService:IUserService<U>): DefaultUserAuthenticationConverter() {
    override fun extractAuthentication(map: MutableMap<String, *>?) = transaction {
        var auth: Authentication? = super.extractAuthentication(map)
//        if (auth != null) {
//            var acc: UserAccount? = getAccount(auth.name) //?: throw UnauthorizedUserException(localizedMessage["AccountInvalid"])
//            if (acc == null) {
//                acc = createAccount(auth.name)
//            }
//            try {
//                if(acc.blocked) {
//                    throw EmailAuthenticationException(acc.email, "User is blocked")
//                }
//                return@transaction JpaOauthAuthentication(auth.principal, auth.credentials, acc.roles)
//            } catch (e: Exception) {
//                throw UnauthorizedUserException("User could not be loaded", e)
//            }
//
//        } else {
//            val auths = this.getAuthorities(map) ?: return@transaction null
//            val id = map["client_id"] as String
//            auth = AnonymousAuthenticationToken(id, id, auths)
//        }
        return@transaction auth
    }

}