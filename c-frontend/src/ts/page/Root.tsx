import * as React from 'react';
import {Route, Router, Switch} from "react-router-dom";
// import {UserPage} from "./user";
import Wrapper from "../component/Wrapper";
import history from '../utils/History';
import {ToastContainer} from "react-toastify";
import {OnePage} from "./landing/OnePage";
import UserManagement from "./user/UserManagement";

export class MainPage extends React.Component {


    render() {
        return <Wrapper>
            <Router history={history}>
                <Switch>
                    <Route path={`/user`} render={()=><UserManagement  />} />
                    <Route path={`/`} render={()=><OnePage />}/>
                </Switch>
            </Router>
            <ToastContainer />
        </Wrapper>;
    }
}