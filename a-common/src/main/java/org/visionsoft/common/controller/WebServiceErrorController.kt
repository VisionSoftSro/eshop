package org.visionsoft.common.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.validation.Errors

import javax.validation.ValidatorFactory

open class WebServiceErrorController {

    @Autowired(required = false)
    lateinit var validatorFactory: ValidatorFactory

    @Autowired
    lateinit var errorConversion: ErrorConversionBean

    val mainErrorCode: String
        get() = "validation.entity.cannotsave"

    //    protected <T> ValidationErrors validate(T entity) {
    //        if(this.validatorFactory == null) {
    //            this.validatorFactory = Validation.buildDefaultValidatorFactory();
    //        }
    //        Validator validator = this.validatorFactory.getValidator();
    //        Set<ConstraintViolation<T>> errors = validator.validate(entity);
    //
    //        return this.errorConversion.convertErrorsToJsonSet(HttpStatus.UNPROCESSABLE_ENTITY.value(), getMainErrorCode(), "validation", errors);
    //    }

    protected fun throwValidationError(errors: Errors) {
        if (errors.hasErrors()) {
            val verrors = this.createValidationErrors(errors)
            throw RestException(HttpStatus.UNPROCESSABLE_ENTITY, verrors)
        }
    }

    protected fun createValidationErrors(errors: Errors): ValidationErrors {
        return errorConversion.convertErrorsToJson(422, "Form.errors", "validation", errors)
    }

    protected fun createValidationErrors(code: Int, key: String, status: String, errors: Errors): ValidationErrors {
        return errorConversion.convertErrorsToJson(code, key, status, errors)
    }

    protected fun merge(vararg errors: ValidationErrors): ValidationErrors? {
        if (errors.isEmpty()) {
            return null
        }
        if (errors.size == 1) {
            return errors[0]
        }
        val master = errors[0]
        for (i in 1 until errors.size) {
            val err = errors[i]
            master.errors.addAll(err.errors)
        }
        return master
    }

}