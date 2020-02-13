import {CustomFieldComponentProps} from "../../../../common/component/form/FormFieldInterface";

import {CheckoutDto} from "../../../dto/CheckoutDto";
import {useEffect, useState} from "react";
import {StandaloneField} from "../../../../common/component/form/StandaloneField";
import {FormInputType} from "../../../../common/component/form/Form";
import {SelectProps} from "../../../../common/component/form/FormSelect";
import React from "react";
import {CpBranch} from "../../../dto/Branches";

export function FormCzechPostAutocomplete(props: CustomFieldComponentProps<CpBranch, { checkout: CheckoutDto }>) {
    const {checkout} = props.options;
    const [value, setValue] = useState(props.value);
    useEffect(() => {
        if (value) {
            checkout.postCode = value.zip;
            checkout.city = value.city;
            checkout.address = `${value.address}`;
        }
        props.onValueChanged(value);
    }, [value]);
    return (
        <StandaloneField type={FormInputType.Select} selectProps={{
            ajax: {
                url: "ac/cp",
                paginable:true,
                clazz:CpBranch
            },
            formatOption: value => {
                return {
                    label: (
                        value.address

                    ),
                    value: value
                };
            },
            formatValue: value => value,
            isSearchable: true

        } as SelectProps<CpBranch>} placeholder={"Vyberte poštu"} className={"col-12"} onValueChanged={data => {
            setValue(data.value);
        }} value={value}/>
    );
}
