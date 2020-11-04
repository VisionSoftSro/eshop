package org.visionsoft.eshop.forest

import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.propertyeditors.StringTrimmerEditor
import org.springframework.context.MessageSource
import org.springframework.core.convert.ConversionService
import org.springframework.http.HttpStatus
import org.springframework.util.StringUtils
import org.springframework.web.bind.WebDataBinder
import org.springframework.web.bind.annotation.InitBinder
import org.springframework.web.context.request.RequestAttributes
import org.springframework.web.context.request.RequestContextHolder
import org.springframework.web.servlet.HandlerMapping
import java.text.ParseException
import java.text.SimpleDateFormat
import java.util.Arrays
import java.util.Date
import javax.validation.ConstraintViolation

const val IsoDateTimePattern = "yyyy-MM-dd'T'HH:mm:ss.SSSZ"
abstract class AdHocController {


    @Autowired
    lateinit var conversionService: ConversionService

    @Autowired
    protected var messageSource: MessageSource? = null
    open val fullDisallowedFields: Array<String?>
        get() {
            val dis = disallowedFields
            val list = ArrayList(Arrays.asList(*dis))
            list.add("id")
            list.add("createdOn")
            list.add("createdBy")
            list.add("modifiedOn")
            list.add("modifiedBy")
            return list.toTypedArray()
        }

    open val disallowedFields: Array<String>
        get() = emptyArray()


    @InitBinder
    fun initBinder(binder: WebDataBinder) {
        binder.registerCustomEditor(String::class.java, StringTrimmerEditor(true))
        binder.setDisallowedFields(*fullDisallowedFields)
        this.updateInitBinder(binder)
    }

    fun updateInitBinder(binder: WebDataBinder) {

    }


    inline fun <reified T: Any> header(key: String, crossinline block:(T) -> Unit) {
        request.request.getHeader(key)?.let {
            block(convertValue(it)!!)
        }
    }

    inline fun <reified T: Any> parameter(key: String, crossinline block:(T)->Unit) {
        getParameterValue<T>(key)?.let {
            block(it)
        }
    }
    inline fun <reified T : Any> parameters(key: String, crossinline block:(List<T>)->Unit) {
        getParameterValues<Array<T>>(key)?.let {
            block(it.toList())
        }
    }

    inline fun <reified T> getParameterValue(key: String): T? {
        val value = request[key]
        if(value != null) {
            return convertValue(value)
        }
        return null
    }
    inline fun <reified T> convertValue(value:String): T? {
        return if (conversionService.canConvert(String::class.java, T::class.java)) {
            conversionService.convert(value, T::class.java)
        } else {
            null
        }
    }


    inline fun <reified T> getParameterValues(key: String): T? {
        val request = request.request
        val values:MutableList<String> = ArrayList()
        if(key.contains("*")) {
            val newKey = key.replace("*", "")
            val filtered = request.parameterMap.keys.filter { it.contains(newKey) }
            values.clear()
            for(i in filtered) {
                val value = request.parameterMap[i]
                if(value?.none { it!="" } == false) {
                    values.addAll(value.toList())
                }
            }
        } else {
            val data = request.getParameterValues(key)
            if(data != null)
                values.addAll(data.toList())
        }

        return if (!values.isEmpty() && conversionService.canConvert(String::class.java, T::class.java)) {
            conversionService.convert(values, T::class.java)
        } else {
            null
        }
    }



    protected fun getISODateTimeParameter(key: String): Date? {
        val value = request[key]
        if (!StringUtils.isEmpty(value)) {
            try {
                return SimpleDateFormat(IsoDateTimePattern).parse(value)
            } catch (e: ParseException) {
                val logger = LoggerFactory.getLogger(javaClass)
                if(logger.isDebugEnabled) {
                    logger.debug("", e)
                }
            }

        }
        return null
    }


    val pathVariables
        get() = RequestContextHolder.getRequestAttributes()
                ?.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE,
                        RequestAttributes.SCOPE_REQUEST) as Map<String, String>
}
