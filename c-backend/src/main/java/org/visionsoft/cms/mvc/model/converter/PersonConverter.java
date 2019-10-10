package org.visionsoft.cms.mvc.model.converter;

import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface PersonConverter {
    @Mapping(source = "phoneNumber", target = "phone")
    PersonDto convertToDto(Person person);

    @InheritInverseConfiguration
    Person convertToModel(PersonDto personDto);
}
