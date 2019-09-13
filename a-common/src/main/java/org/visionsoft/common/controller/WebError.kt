package org.visionsoft.common.controller

import org.springframework.http.HttpStatus
import org.springframework.web.client.HttpStatusCodeException
import java.util.ArrayList

interface ExceptionTranslator {

    fun translateException(throwable: Throwable): String
}


open class WebError {
    var code: Int = 0
    var message: String? = null

    constructor(code: Int) {
        this.code = code
    }

    constructor(code: Int, message: String) {
        this.code = code
        this.message = message
    }

    companion object {
        @JvmOverloads
        fun createException(status: HttpStatus, message: String? = null): RestException {
            return RestException(status, WebError(status.value(), message
                    ?: ""))
        }
    }
}

class RestException(statusCode: HttpStatus, val response: Any) : HttpStatusCodeException(statusCode) {
    companion object {
        private const val serialVersionUID = 3307374860512044591L
    }
}

class ValidationErrors(code: Int, var status: String?) : WebError(code) {

    var errors: MutableList<FieldError> = ArrayList()
    var redirect: String? = null

    fun toException(): RestException {
        return createException(this)
    }

    companion object {

        private val serialVersionUID = 1L

        fun createException(errors: ValidationErrors): RestException {
            return RestException(HttpStatus.valueOf(errors.code), errors)
        }
    }
}

class FieldError {

    var name: String? = null
    var message: String? = null

    constructor() {}

    constructor(name: String, message: String) : super() {
        this.name = name
        this.message = message
    }

}
