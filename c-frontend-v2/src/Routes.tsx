import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import {GoodsPage} from "./page/GoodsPage";


function Nekam() {
    return <div>Nekde</div>
}

export function Routes() {
    return (
        <Switch>
            <Route path="/nekam">
                <Nekam/>
            </Route>
            <Route path="/">
                <GoodsPage/>
            </Route>
            <Redirect to={"/cs/"} />
        </Switch>
    );
}
