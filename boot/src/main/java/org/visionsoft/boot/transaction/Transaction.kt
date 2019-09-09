package org.visionsoft.boot.transaction

import org.springframework.transaction.annotation.Propagation
import org.springframework.transaction.TransactionDefinition
import org.springframework.transaction.annotation.Isolation
import org.springframework.transaction.support.DefaultTransactionDefinition

fun <T> transaction(propagation: Propagation = Propagation.REQUIRED, isolation: Isolation = Isolation.DEFAULT, isReadOnly:Boolean = false, timeOut:Int = TransactionDefinition.TIMEOUT_DEFAULT, rollBackFor:Array<Class<Exception>>? = arrayOf(java.lang.Exception::class.java), a:()->T):T? {
    val txm = TransactionAccessor().txManager
    val def = DefaultTransactionDefinition()
    def.name = "KotlinTransaction"
    def.propagationBehavior = propagation.value()
    def.isolationLevel = isolation.value()
    def.isReadOnly = isReadOnly
    def.timeout = timeOut

    val status = txm.getTransaction(def)

    var result:T? = null
    try {
        result = a()
        txm.commit(status)
    } catch (e:Exception) {
        val te = e.javaClass
        if(rollBackFor != null) {
            for(i in rollBackFor) {
                if(i.isAssignableFrom(te)) {
                    txm.rollback(status)
                    throw e
                }
            }
        }
    }
    return result
}