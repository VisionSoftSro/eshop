package org.visionsoft.common.transaction;

import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.transaction.PlatformTransactionManager;

import javax.annotation.Resource;

@Configurable
public class TransactionAccessor {
    @Resource
    private PlatformTransactionManager transactionManager;

    public PlatformTransactionManager getTransactionManager() {
        return transactionManager;
    }
}
