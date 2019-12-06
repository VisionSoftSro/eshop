package org.visionsoft.common.mail

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.stereotype.Service
import org.springframework.mail.MailException
import org.springframework.mail.javamail.MimeMessageHelper
import org.springframework.mail.javamail.MimeMessagePreparator
import org.springframework.stereotype.Component
import org.thymeleaf.TemplateEngine
import org.thymeleaf.context.Context


@Component
class MailContentBuilder @Autowired constructor(var templateEngine: TemplateEngine) {

    fun build(map:Map<String, Any>, template:String): String {
        val context = Context()
        context.setVariables(map)
        return templateEngine.process(template, context)
    }

}

@Service
class MailClient @Autowired constructor(var mailSender: JavaMailSender, var mailBuilder:MailContentBuilder) {


    @Value("\${mail.from}")
    lateinit var mailFrom:String

    @Value("\${mail.domain}")
    lateinit var domain:String



    fun send(subject:String, mainTemplate:String, bodyTemplate:String? = null, parameters:Map<String, Any>, vararg recipients:String) {
        try {
            mailSender.send {
                val messageHelper = MimeMessageHelper(it)
                messageHelper.setFrom(mailFrom)
                messageHelper.setTo(recipients)
                messageHelper.setSubject("Sample mail subject")
                val params = parameters.toMutableMap()
                params["domain"] = domain
                bodyTemplate?.let {
                    params["bodyTemplate"] = bodyTemplate
                }
                messageHelper.setText(mailBuilder.build(params, mainTemplate))
            }
        } catch (e: MailException) {
            // runtime exception; compiler will not force you to handle it
        }

    }
}
