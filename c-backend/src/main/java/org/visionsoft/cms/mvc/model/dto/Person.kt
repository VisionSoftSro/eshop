package org.visionsoft.cms.mvc.model.dto

import java.time.LocalDate

data class PersonAddress(var cityA:String?) {
    // Necessary for MapStruct
    constructor() : this(null)
}
data class PersonAddressDto(var cityB:String?) {
    // Necessary for MapStruct
    constructor() : this(null)
}
data class Person(var anyVal:String?, var firstName: String?, var lastName: String?, var phoneNumber: String?, var birthdate: LocalDate?, var address:PersonAddress?) {
    // Necessary for MapStruct
    constructor() : this(null, null, null, null, null,  null)
}
data class PersonDto(var anyVal:String?, var firstName: String?, var lastName: String?, var phone: String?, var birthdate: LocalDate?, var address:PersonAddressDto?) {
    // Necessary for MapStruct
    constructor() : this(null, null, null, null, null,  null)
}