package org.visionsoft.eshop.forest

import org.springframework.web.context.request.RequestContextHolder
import org.springframework.web.context.request.ServletRequestAttributes
import javax.servlet.http.HttpServletRequest
import kotlin.math.ceil

val request:RequestWrapper get() = RequestWrapper((RequestContextHolder.getRequestAttributes() as ServletRequestAttributes).request as HttpServletRequest)
class RequestWrapper(val request: HttpServletRequest) {
    operator fun get(key:String): String? {
        return request.getParameter(key)
    }
}


//val currentUser get() = UserContextHolder.getAuthentication().user

data class SimpleMessage(val message:String)

val String.simpleMessage get() = SimpleMessage(this)
//alias for simplemessage
val String.sm get() = this.simpleMessage