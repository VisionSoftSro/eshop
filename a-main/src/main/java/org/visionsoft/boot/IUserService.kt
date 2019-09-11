package org.visionsoft.boot

interface IUser


interface IUserService<U : IUser> {
    fun findUser(name: String): U
}

var service:IUserService<*>? = null

inline fun <reified U : IUser> currentUser(): U? {
    if(service == null) {
        val context = ApplicationContextProvider.getContext()
        service = context?.getBean("userService", IUserService::class.java)
    }
    return service?.findUser("") as? U
}
