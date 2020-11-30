package org.visionsoft.common.controller


import org.springframework.core.GenericTypeResolver
import org.springframework.http.HttpStatus
import org.springframework.validation.Errors
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.ModelAttribute
import org.springframework.web.bind.annotation.PostMapping
import org.visionsoft.common.transaction.entityManager
import org.visionsoft.common.transaction.transaction
import javax.servlet.http.HttpServletRequest
import javax.validation.Valid

open class CRUDControllerSingleType<E>: CRUDController<E, E>() {
    override fun convert(entity: E): E = entity
}

abstract class CRUDController<E, W>: AdHocController() {

    open fun testAccess(request: HttpServletRequest) {}

    open val model:E? @ModelAttribute("entity") get() {
        testAccess(request.request)
        val clazz = GenericTypeResolver.resolveTypeArguments(javaClass, CRUDController::class.java)
        val entityClazz = clazz[0] as Class<E>
        val e: E = (if(isNew) {
            entityClazz.newInstance()
        } else {
            entityManager.find(entityClazz, pathVariables["id"]?.toLong()) as E
        }) ?: throw WebError.createException(HttpStatus.NOT_FOUND, "Entity with id ${pathVariables["id"]} does not exist")
        updateEntityOnLoad(e)
        return e
    }
    open fun updateEntityOnLoad(entity:E) {

    }



    val isNew get() = "new" == pathVariables["id"]

    abstract fun convert(entity:E):W

    @GetMapping("{id}")
    fun get(@ModelAttribute("entity") entity:E) = entity

    open fun validateEntity(entity:E, errors:Errors) {

    }
    open fun updateEntityAfterValidation(entity:E) {

    }
    open fun updateEntityBeforeValidation(entity:E) {

    }
    @PostMapping("{id}")
    fun save(@Valid @ModelAttribute("entity") entity:E, errors:Errors) = transaction {
        var e = entity
        updateEntityBeforeValidation(e)
        validateEntity(e, errors)
        throwValidationError(errors)
        updateEntityAfterValidation(e)
        if(isNew) {
            it.persist(e)
        } else {
            e = it.merge(e)
        }
        it.flush()
        this.convert(e)
    }

}