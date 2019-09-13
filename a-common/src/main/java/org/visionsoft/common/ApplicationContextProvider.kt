package org.visionsoft.common

import org.springframework.beans.BeansException
import org.springframework.context.ApplicationContext
import org.springframework.context.ApplicationContextAware
import org.springframework.stereotype.Component

@Component
class ApplicationContextProvider : ApplicationContextAware {

    @Throws(BeansException::class)
    override fun setApplicationContext(ac: ApplicationContext) {
        context = ac
    }

    companion object {
        var context: ApplicationContext? = null
            private set

        fun <T> getBean(name:String) = context!!.getBean(name) as T

        inline fun <reified T> getBean() = context!!.getBean(T::class.java) as T
    }


}