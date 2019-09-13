package org.visionsoft.common.transaction

import org.springframework.transaction.support.TransactionSynchronizationAdapter
import org.springframework.transaction.support.TransactionSynchronizationManager




interface AfterCommitExecutor {
    fun execute(a: () -> Unit)
}

open class AfterCommitExecutorImpl : TransactionSynchronizationAdapter(), AfterCommitExecutor {
    override fun execute(a: () -> Unit) {
        TransactionSynchronizationManager.registerSynchronization(
                object : TransactionSynchronizationAdapter() {
                    override fun afterCommit() {
                        a()
                    }
                })
    }

}

fun afterCommit(a: () -> Unit) = AfterCommitExecutorImpl().execute(a)