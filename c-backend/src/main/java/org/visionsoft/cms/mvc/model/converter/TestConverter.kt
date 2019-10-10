package org.visionsoft.cms.mvc.model.converter

import org.mapstruct.InheritInverseConfiguration
import org.mapstruct.Mapper
import org.mapstruct.Mapping
import java.time.LocalDate

data class Person(var firstName: String?, var lastName: String?, var phoneNumber: String?, var birthdate: LocalDate?) {
    // Necessary for MapStruct
    constructor() : this(null, null, null, null)
}
data class PersonDto(var firstName: String?, var lastName: String?, var phone: String?, var birthdate: LocalDate?) {
    // Necessary for MapStruct
    constructor() : this(null, null, null, null)
}
@Mapper
interface TestConverter {
    @Mapping(source = "phoneNumber", target = "phone")
    fun convertToDto(person: Person) : PersonDto

    @InheritInverseConfiguration
    fun convertToModel(personDto: PersonDto) : Person
}