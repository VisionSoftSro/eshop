package org.visionsoft.common.domain

import org.hibernate.boot.model.naming.Identifier
import org.hibernate.boot.model.naming.ImplicitNamingStrategyLegacyHbmImpl
import org.hibernate.boot.model.naming.PhysicalNamingStrategy
import org.hibernate.cfg.ImprovedNamingStrategy
import org.hibernate.cfg.NamingStrategy
import org.hibernate.engine.jdbc.env.spi.JdbcEnvironment

/**
 * Created by TremlL on 9.1.2018.
 */

class ImplicitNamingStrategyLegacyImpl: ImplicitNamingStrategyLegacyHbmImpl() {

}

class PhysicalNamingStrategyLegacyImpl : PhysicalNamingStrategy {

    val namingStrategy: NamingStrategy = ImprovedNamingStrategy()

    override fun toPhysicalColumnName(p0: Identifier?, p1: JdbcEnvironment?) = Identifier.toIdentifier(namingStrategy.columnName(p0!!.text))

    override fun toPhysicalTableName(p0: Identifier?, p1: JdbcEnvironment?) = Identifier.toIdentifier(namingStrategy.tableName(p0!!.text))

    override fun toPhysicalSchemaName(p0: Identifier?, p1: JdbcEnvironment?) = p0

    override fun toPhysicalCatalogName(p0: Identifier?, p1: JdbcEnvironment?) = p0

    override fun toPhysicalSequenceName(p0: Identifier?, p1: JdbcEnvironment?) = p0

}