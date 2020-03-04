import * as React from 'react';
import useFetch from "use-http/dist";

export function useFetchPaymentMethods<T>() {
    const {loading, error, data} = useFetch({
        path: '/method/payments',
        data: []
    }, []);
    const typedData =  data as T;
    return {loading, error, data:typedData};
}
