package org.visionsoft.common

data class JsonWrapper(val value:Any)

fun Boolean.toJson() = JsonWrapper(this)
fun String.toJson() = JsonWrapper(this)