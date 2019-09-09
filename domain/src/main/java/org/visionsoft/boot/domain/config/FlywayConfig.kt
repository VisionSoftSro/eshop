package org.visionsoft.boot.domain.config

import org.flywaydb.core.Flyway
import org.springframework.boot.autoconfigure.data.jpa.EntityManagerFactoryDependsOnPostProcessor
import org.springframework.boot.autoconfigure.flyway.FlywayMigrationInitializer
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import javax.sql.DataSource

//@Configuration
//class FlywayConfig {
//
//    @Bean
//    fun flyway(dataSource: DataSource): Flyway {
//        print("initialize flyway bean")
//        val flyway = Flyway()
//        flyway.dataSource = dataSource
//        flyway.setLocations("db/migration")
//        return flyway
//    }
//
//    @Bean
//    fun flywayInitializer(flyway: Flyway): FlywayMigrationInitializer {
//        return FlywayMigrationInitializer(flyway) {
//            it.migrate()
//        }
//    }
//
//    /**
//     * Additional configuration to ensure that [EntityManagerFactory] beans depend on the
//     * `flywayInitializer` bean.
//     */
//    @Configuration
//    class FlywayInitializerJpaDependencyConfiguration : EntityManagerFactoryDependsOnPostProcessor("flywayInitializer")
//}