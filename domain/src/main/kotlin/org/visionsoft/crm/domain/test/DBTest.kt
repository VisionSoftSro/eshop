package org.visionsoft.crm.domain.test

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.context.event.ApplicationReadyEvent
import org.springframework.context.ApplicationListener
import org.springframework.stereotype.Component
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.visionsoft.crm.domain.scheme.MyTable
import javax.persistence.EntityManager
import javax.persistence.PersistenceContext

@Service
@Transactional
class TransactionService {

    @PersistenceContext
    lateinit var em: EntityManager
    fun save() {

        em.persist(MyTable().apply { id = 1 })
//        em.flush()
    }

}


@Component
class AppInitialization2: ApplicationListener<ApplicationReadyEvent> {

    @Autowired
    lateinit var transactionService: TransactionService

    override fun onApplicationEvent(event: ApplicationReadyEvent) {
        transactionService.save()
    }
}

