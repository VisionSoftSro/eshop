package org.visionsoft.crm.domain.config

import org.springframework.boot.autoconfigure.domain.EntityScan
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration
import org.springframework.data.jpa.repository.config.EnableJpaRepositories
import org.springframework.transaction.annotation.EnableTransactionManagement

@EnableTransactionManagement
@ComponentScan("org.visionsoft.crm.domain")
@EntityScan( "org.visionsoft.crm.domain.scheme" )
@Configuration
@EnableJpaRepositories("org.visionsoft.crm.domain")
class DomainConfig