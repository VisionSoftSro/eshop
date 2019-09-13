package org.visionsoft.common.config.security

import org.springframework.context.annotation.Bean
import org.springframework.security.authentication.AccountStatusException
import org.springframework.security.authentication.DisabledException
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.core.Authentication
import org.springframework.security.core.AuthenticationException
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer
import org.springframework.security.oauth2.provider.OAuth2Authentication

import org.springframework.security.oauth2.provider.token.DefaultAccessTokenConverter
import org.springframework.security.oauth2.provider.token.DefaultUserAuthenticationConverter
import org.springframework.security.oauth2.provider.token.RemoteTokenServices
import org.visionsoft.common.IUser


abstract class OauthSecurityConfiguration<U : IUser> : ResourceServerConfigurerAdapter(), ITokenExtractor<U> {


    lateinit var endpoint: String
    lateinit var clientId: String
    lateinit var clientSecret: String


    override fun configure(resources: ResourceServerSecurityConfigurer) {
        resources.tokenServices(tokenService())
    }


    @EnableWebSecurity
    class WebSecurity: WebSecurityConfigurerAdapter() {
        override fun configure(auth: AuthenticationManagerBuilder) {
            println("************** WEB SECURITY ****************")
        }
    }


    @Bean
    open fun tokenService(): RemoteTokenServices {
        val tokenService = object:RemoteTokenServices() {
            override fun loadAuthentication(accessToken: String?) = super.loadAuthentication(accessToken).also {
                if(!(it.userAuthentication as OauthAuthentication<*>).user.enabled) {
                    throw DisabledException("User is disabled")
                }
            }
        }
        tokenService.setCheckTokenEndpointUrl(endpoint)
        tokenService.setClientId(clientId)
        tokenService.setClientSecret(clientSecret)
        tokenService.setAccessTokenConverter(tokenConverter())
        return tokenService
    }

    @Bean
    open fun tokenConverter() = object:DefaultAccessTokenConverter(){

    }.apply {
        setUserTokenConverter(TokenConverter(this@OauthSecurityConfiguration))
    }

}

interface ITokenExtractor<U:IUser> {
    fun extractAuthentication(auth:Authentication):U
}

class TokenConverter<U : IUser>(var provider:ITokenExtractor<U>) : DefaultUserAuthenticationConverter() {
    override fun extractAuthentication(map: MutableMap<String, *>?) = super.extractAuthentication(map).let { OauthAuthentication(provider.extractAuthentication(it), it) }

}

class OauthAuthentication<U:IUser>(var user:U, authentication: Authentication): UsernamePasswordAuthenticationToken(authentication.principal, authentication.credentials, user.authorities)