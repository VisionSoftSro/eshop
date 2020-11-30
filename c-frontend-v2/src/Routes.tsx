import React from "react";
import {Route, Switch, Redirect, Router} from "react-router";
import {GoodsPage} from "./page/GoodsPage";
import App from "./App";


function Nekam() {
    return <div>Nekde</div>
}


// function userRedirect(nextState, replace) {
//     var defaultLanguage = 'en-gb';
//     var redirectPath = defaultLanguage + nextState.location.pathname
//     replace({
//         pathname: redirectPath,
//     })
// };
function NotFound() {
    return <div>404</div>
}


export function Routes() {
    return (
        <Route path="/(:locale)" component={GoodsPage}>
            <Route path="/nekam" component={Nekam} />
            <Route path="*" component={NotFound} />
        </Route>
    );
}
