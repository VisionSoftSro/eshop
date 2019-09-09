package org.visionsoft.boot.async


interface User

val asyncUserThreadLocal = ThreadLocal<User?>()


fun setAsyncUser(user:User) = asyncUserThreadLocal.set(user)
fun clearAsyncUser() = asyncUserThreadLocal.remove()

class AsyncHelper {
    fun run(user: User?=null, a: () -> Unit) {
        if (user != null) {
            setAsyncUser(user)
        }
        //TODO do it in another thread
        a()

        clearAsyncUser()
    }
}

fun async(user: User?=null, a: () -> Unit) =  AsyncHelper().run(user, a)