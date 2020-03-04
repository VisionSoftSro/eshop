import * as React from "react";
import {useContext, useEffect, useReducer, useState} from "react";
import {PaymentMethod, ShippingMethod} from "../../api/ApiTypes";
import useFetch from "use-http/dist";
import {Backdrop, CircularProgress} from "@material-ui/core";
import {useStyles} from "../../Styles";

type LoadResource = "shipping" | "payment"
type DataState = {
    paymentMethods:PaymentMethod[],
    shippingMethods:ShippingMethod[]
}
type AppState = {
    setLoading:(state:boolean)=>void
}&DataState
export const Context = React.createContext({} as AppState);

export function useAppContext() {
    return useContext(Context);
}



export function AppContext({children}:React.PropsWithChildren<{}>) {
    const classes = useStyles();
    // const [paymentMethods, dispatchPayment] = useReducer<ResourceReducer<PaymentMethod[]>>(resourceMethodReducer, []);
    // const [shippingMethods, dispatchShipping] = useReducer<ResourceReducer<ShippingMethod[]>>(resourceMethodReducer, []);

    const [dataState, setDataState] = useState({paymentMethods:[], shippingMethods:[]} as DataState);
    const [loading, setLoading] = useState(true);
    const [dataFetched, setDataFetched] = useState(false);
    const [request] = useFetch();
    useEffect(()=> {
        async function fetchAll() {
            const paymentMethods:PaymentMethod[] = await request.get("/method/payments");
            const shippingMethods:ShippingMethod[] = await request.get("/method/shippings");
            setDataState({paymentMethods, shippingMethods});
            setDataFetched(true);
            setLoading(false);
        }
        fetchAll().then().catch(()=>{
            console.log("error?");
        });
        // useLoadResource("payment");
        // useLoadResource("shipping");
    }, []);
    return (
        // Note: This current way of exposing these values can lead to unexpected bugs.
        // We'll talk about this later in the post why writing `{state, dispatch}` can
        // lead to performance issues.
        <Context.Provider value={{...dataState, setLoading}}>
            {dataFetched&&children}
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Context.Provider>
    );
}
