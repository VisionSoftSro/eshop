import {CustomFieldComponentProps} from "../../../../common/component/form/FormFieldInterface";

import {CheckoutDto} from "../../../dto/CheckoutDto";
import {useEffect, useState} from "react";
import {StandaloneField} from "../../../../common/component/form/StandaloneField";
import {FormInputType} from "../../../../common/component/form/Form";
import {SelectProps} from "../../../../common/component/form/FormSelect";
import React from "react";
import {Zasilkovna} from "../../../dto/Branches";

export function FormZasilkovnaAutocomplete(props: CustomFieldComponentProps<Zasilkovna, { checkout: CheckoutDto }>) {
    const {checkout} = props.options;
    const [value, setValue] = useState(props.value);
    useEffect(() => {
        if (value) {
            checkout.branchId = value.id
        }
        props.onValueChanged(value);
    }, [value]);
    return (
        <StandaloneField type={FormInputType.Select} selectProps={{
            ajax: {
                url: "ac/zasilkovna",
                paginable:true,
                clazz:Zasilkovna
            },
            formatOption: (value:Zasilkovna) => {
                return {
                    label: `${value.name} - (${value.city}, ${value.address}, ${value.zip})`,
                    value: value
                };
            },
            formatValue: value => value,
            isSearchable: true

        } as SelectProps<Zasilkovna>} placeholder={"Vyberte poštu"} className={"col-12"} onValueChanged={data => {
            setValue(data.value);
        }} value={value}/>
    );
}
