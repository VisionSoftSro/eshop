package org.visionsoft.eshop.forest

import kotlin.math.ceil

data class JsonWrapper(val value:Any)
fun Boolean.toJson() = JsonWrapper(this)
fun String.toJson() = JsonWrapper(this)



open class JsonList<T>(list: List<T>)
data class ScrollableList<E>(
        val page: Int = 0,
        val objectsPerPage: Int = 0,
        val total: Long = 0,
        val list: List<E>
): JsonList<E>(list){


    val pages: Long
        get() = ceil(total.toDouble() / objectsPerPage).toLong()
}