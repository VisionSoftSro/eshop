package org.visionsoft.crm.domain.config

import org.springframework.boot.autoconfigure.domain.EntityScan
import org.springframework.context.annotation.AdviceMode
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Import
import org.springframework.data.jpa.repository.config.EnableJpaRepositories
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.EnableTransactionManagement
import org.visionsoft.crm.domain.test.AppInitialization2


@Configuration
@EnableTransactionManagement
@EnableJpaRepositories("org.visionsoft.crm.domain.dao")
@EntityScan("org.visionsoft.crm.domain.scheme")
@ComponentScan(basePackageClasses = [AppInitialization2::class])
class DomainConfig