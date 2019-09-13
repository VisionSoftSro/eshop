package org.visionsoft.common.controller

import org.springframework.context.MessageSource
import org.springframework.context.NoSuchMessageException
import org.springframework.context.i18n.LocaleContextHolder
import org.springframework.stereotype.Component
import org.springframework.validation.Errors
import org.springframework.validation.ObjectError

import javax.annotation.Resource
import javax.validation.ConstraintViolation

@Component
class ErrorConversionBean {
    @Resource(name = "messageSource")
    private val validationMessageResourceBundle: MessageSource? = null

    fun convertErrorsToJson(code: Int, mainErrorCode: String, status: String, errors: Errors): ValidationErrors {
        return convertErrorsToJson(code, mainErrorCode, null, status, errors)
    }

    fun <T> convertErrorsToJsonSet(code: Int, mainErrorCode: String, status: String, errors: Set<ConstraintViolation<T>>?): ValidationErrors {
        val e = ValidationErrors(code, status)
        e.status = status
        e.message = resolveMessage(mainErrorCode, null)
        if (errors != null) {
            this.fillErrors(e, errors)
        }
        return e
    }

    fun convertErrorsToJson(code: Int, mainErrorCode: String, mainErrorArgs: Array<Any>?, status: String, errors: Errors?): ValidationErrors {
        val e = ValidationErrors(code, status)
        e.status = status
        e.message = resolveMessage(mainErrorCode, mainErrorArgs)
        if (errors != null) {
            this.fillErrors(e, errors.allErrors)
        }
        return e
    }

    private fun fillErrors(e: ValidationErrors, errors: List<ObjectError>) {
        for (err in errors) {
            val fe = FieldError()
            if (err is org.springframework.validation.FieldError) {
                fe.name = err.field
            } else {
                fe.name = err.objectName
            }

            val mesg = resolveMessage(err.code, err.arguments)
            if (mesg != null && mesg == err.code) {
                fe.message = err.defaultMessage
            } else {
                fe.message = mesg
            }

            e.errors.add(fe)
        }
    }

    private fun <T> fillErrors(e: ValidationErrors, errors: Set<ConstraintViolation<T>>) {
        for (err in errors) {
            val fe = FieldError()
            fe.name = err.propertyPath.toString()

            if (err.message == err.messageTemplate) {
                fe.message = resolveMessage(err.message.replace("{", "").replace("}", ""))
            } else {
                fe.message = err.message
            }
            e.errors.add(fe)
        }
    }

    @JvmOverloads
    fun resolveMessage(key: String?, args: Array<Any>? = null): String? {
        try {
            return validationMessageResourceBundle!!.getMessage(key, args, LocaleContextHolder.getLocale())
        } catch (nsm: NoSuchMessageException) {
            return key
        }

    }
}
