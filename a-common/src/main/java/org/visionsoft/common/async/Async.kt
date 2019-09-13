package org.visionsoft.common.async

import org.visionsoft.common.IUser


val asyncUserThreadLocal = ThreadLocal<IUser?>()


fun setAsyncUser(user:IUser) = asyncUserThreadLocal.set(user)
fun clearAsyncUser() = asyncUserThreadLocal.remove()

class AsyncHelper {
    inline fun <reified U:IUser> run(user: U?=null, a: () -> Unit) {
        if (user != null) {
            setAsyncUser(user)
        }
        //TODO do it in another thread
        a()

        clearAsyncUser()
    }
}

inline fun <reified U:IUser> async(user: U?=null, a: () -> Unit) =  AsyncHelper().run(user, a)