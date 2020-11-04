package org.visionsoft.eshop.forest

import org.springframework.http.HttpStatus
import org.springframework.web.client.HttpStatusCodeException
import java.util.ArrayList



class RestException(statusCode: HttpStatus, val response: Any?=null) : HttpStatusCodeException(statusCode) {
    companion object {
        private const val serialVersionUID = 3307374860512044591L
    }
}

fun HttpStatus.exception(message:Any?=null) = RestException(this, message)