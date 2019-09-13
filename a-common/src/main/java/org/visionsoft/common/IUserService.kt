package org.visionsoft.common

import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.oauth2.provider.OAuth2Authentication
import org.visionsoft.common.async.asyncUserThreadLocal
import org.visionsoft.common.config.security.OauthAuthentication

interface IUser {

    val authorities:List<GrantedAuthority>
    val name:String
    val enabled:Boolean
}


interface IUserService<U : IUser> {
    fun findUser(name: String): U?
}

var service:IUserService<*>? = null

inline fun <reified U : IUser> currentUser(): U? {
    val user = asyncUserThreadLocal.get()
    if(user != null) {
        return user as U
    }
    val auth = SecurityContextHolder.getContext().authentication
    if(auth is OAuth2Authentication) {
        if(auth.userAuthentication is OauthAuthentication<*>)
        return (auth.userAuthentication as OauthAuthentication<*>).user as U
    }
    return null
}
