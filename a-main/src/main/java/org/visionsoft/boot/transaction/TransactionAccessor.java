package org.visionsoft.boot.transaction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.orm.jpa.JpaTransactionManager;

@Configurable
public class TransactionAccessor {
    @Autowired
    JpaTransactionManager txManager;

    public JpaTransactionManager getTxManager() {
        return txManager;
    }
}
