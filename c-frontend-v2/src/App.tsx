import React from 'react';
import {Provider} from 'use-http';
import {PaymentMethod} from "./api/ApiTypes";
import {useFetchPaymentMethods} from "./api/BackendApi";
import {productImageUrl} from "./TemplateUtil";


function Body() {
    const {error, loading, data} = useFetchPaymentMethods<PaymentMethod[]>();

    return (
        <div className="App">
            {error && 'Error!'}
            {loading && 'Loading...'}
            {data.map(item => <div key={item.id}>{item.code}</div>)}
        </div>
    );
}

function App() {

    return (
        <Provider url='/api'>
            <Body/>
        </Provider>
    );
}

export default App;
