package org.visionsoft.common.transaction

import org.springframework.orm.jpa.JpaTransactionManager
import org.springframework.transaction.annotation.Propagation
import org.springframework.transaction.TransactionDefinition
import org.springframework.transaction.annotation.Isolation
import org.springframework.transaction.support.DefaultTransactionDefinition
import org.visionsoft.common.ApplicationContextProvider
import javax.persistence.EntityManager

private var txm:JpaTransactionManager? = null

private var em:EntityManager? = null

val entityManager:EntityManager = em?.let { it }?:ApplicationContextProvider.getBean<EntityManager>().also {
    em = it
}

val txManager get() = txm?.let { it }?:ApplicationContextProvider.getBean<JpaTransactionManager>().also {
    txm = it
}

fun <T> transaction(propagation: Propagation = Propagation.REQUIRED, isolation: Isolation = Isolation.DEFAULT, isReadOnly:Boolean = false, timeOut:Int = TransactionDefinition.TIMEOUT_DEFAULT, rollBackFor:Array<Class<Exception>>? = arrayOf(java.lang.Exception::class.java), a:(em:EntityManager)->T):T? {
    val txm:JpaTransactionManager = txManager
    val def = DefaultTransactionDefinition()
    def.name = "KotlinTransaction"
    def.propagationBehavior = propagation.value()
    def.isolationLevel = isolation.value()
    def.isReadOnly = isReadOnly
    def.timeout = timeOut

    val status = txm.getTransaction(def)

    var result:T? = null
    try {
        result = a(entityManager)
        txm.commit(status)
    } catch (e:Exception) {
//        val te = e.javaClass
//        if(rollBackFor != null) {
//            for(i in rollBackFor) {
//                if(i.isAssignableFrom(te)) {
//                    txm.rollback(status)
//                    throw e
//                }
//            }
//        }
        throw e
    }
    return result
}