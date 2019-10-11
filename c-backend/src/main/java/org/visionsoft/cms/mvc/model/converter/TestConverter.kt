package org.visionsoft.cms.mvc.model.converter

import org.mapstruct.InheritInverseConfiguration
import org.mapstruct.Mapper
import org.mapstruct.Mapping
import org.mapstruct.Mappings
import org.visionsoft.cms.mvc.model.dto.Person
import org.visionsoft.cms.mvc.model.dto.PersonDto


@Mapper
interface TestConverter {
    @Mappings(
            Mapping(source = "phoneNumber", target = "phone"),
            Mapping(source = "address.cityA", target = "address.cityB")
    )
    fun convertToDto(person: Person) : PersonDto

    @InheritInverseConfiguration
    fun convertToModel(personDto: PersonDto) : Person
}