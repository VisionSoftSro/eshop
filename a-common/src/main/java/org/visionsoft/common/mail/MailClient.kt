package org.visionsoft.common.mail

import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.core.io.InputStreamSource
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.stereotype.Service
import org.springframework.mail.MailException
import org.springframework.mail.javamail.MimeMessageHelper
import org.springframework.mail.javamail.MimeMessagePreparator
import org.springframework.stereotype.Component
import org.thymeleaf.TemplateEngine
import org.thymeleaf.context.Context
import java.io.InputStream
import java.util.logging.Logger


@Component
class MailContentBuilder @Autowired constructor(var templateEngine: TemplateEngine) {

    fun build(map:Map<String, Any?>, template:String): String {
        val context = Context()
        context.setVariables(map)
        return templateEngine.process(template, context)
    }

}

data class Attachment(val name:String, val stream:InputStreamSource)

@Service
class MailClient @Autowired constructor(var mailSender: JavaMailSender, var mailBuilder:MailContentBuilder) {


    @Value("\${mail.from}")
    lateinit var mailFrom:String

    @Value("\${mail.info}")
    lateinit var infoEmail:String

    @Value("\${mail.domain}")
    lateinit var domain:String

    fun send(subject:String, mainTemplate:String, bodyTemplate:String? = null, parameters:Map<String, Any?>, vararg recipients:String) {
        send(subject, mainTemplate, bodyTemplate, parameters, null, *recipients)
    }

    fun send(subject:String, mainTemplate:String, bodyTemplate:String? = null, parameters:Map<String, Any?>, attachments:List<Attachment>?, vararg recipients:String) {
        try {
            mailSender.send {
                val messageHelper = MimeMessageHelper(it, (attachments?.size ?: 0) > 0)
                messageHelper.setFrom(mailFrom)
                messageHelper.setTo(recipients)
                messageHelper.setSubject(subject)
                val params = parameters.toMutableMap()
                params["domain"] = domain
                bodyTemplate?.let {
                    params["bodyTemplate"] = bodyTemplate
                    params["mailInfo"] = infoEmail
                }
                attachments?.let {at->
                    at.forEach{a->
                        messageHelper.addAttachment(a.name, a.stream)
                    }
                }
                messageHelper.setText(mailBuilder.build(params, mainTemplate), true)
            }
        } catch (e: MailException) {
            LoggerFactory.getLogger(javaClass).error("", e)
            // runtime exception; compiler will not force you to handle it
        }

    }
}
