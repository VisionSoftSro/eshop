package org.visionsoft.common.config

import org.springframework.boot.autoconfigure.mail.MailProperties
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.PropertySource
import org.springframework.mail.javamail.JavaMailSenderImpl
import org.visionsoft.common.mail.MailClient

@ComponentScan(basePackageClasses = [MailClient::class])
class MailConfig