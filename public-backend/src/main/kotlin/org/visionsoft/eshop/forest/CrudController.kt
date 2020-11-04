package org.visionsoft.eshop.forest

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.GenericTypeResolver
import org.springframework.data.repository.CrudRepository
import org.springframework.http.HttpStatus
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.ModelAttribute
import org.springframework.web.bind.annotation.PostMapping
import org.visionsoft.crm.domain.test.TransactionService
import javax.persistence.EntityManager
import javax.persistence.PersistenceContext
import javax.servlet.http.HttpServletRequest
import javax.validation.Valid

abstract class CRUDControllerSingleType<E, ID>: CRUDController<E, E, ID>() {
    override fun convert(entity: E): E = entity
}

abstract class CRUDController<E, W, ID>: AdHocController() {

    abstract val crudRepository:CrudRepository<E, ID>
    @PersistenceContext
    lateinit var em:EntityManager

    open fun testAccess(request: HttpServletRequest) {}

    open val model:E? @ModelAttribute("entity") get() {
        testAccess(request.request)
        val clazz = GenericTypeResolver.resolveTypeArguments(javaClass, CRUDController::class.java)
        val entityClazz = clazz?.get(0) as Class<E>
        val e: E = (if(isNew) {
            entityClazz.getDeclaredConstructor().newInstance()
        } else {
            em.find(entityClazz, pathVariables["id"]?.toLong()) as E
        }) ?: throw HttpStatus.NOT_FOUND.exception("Entity with id ${pathVariables["id"]} does not exist")
        updateEntityOnLoad(e)
        return e
    }
    open fun updateEntityOnLoad(entity:E) {
        //empty coz not want force implement this method
    }



    val isNew get() = "new" == pathVariables["id"]

    abstract fun convert(entity:E):W

    @GetMapping("{id}")
    fun get(@ModelAttribute("entity") entity:E) = entity


    @PostMapping("{id}")
    open fun save(@Valid @ModelAttribute("entity") entity:E) = run {
        this.convert(crudRepository.save(entity))
    }

}