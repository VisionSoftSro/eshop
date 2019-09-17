import React from 'react';
import Sidebar, {SideBarProps} from "./Sidebar";
import Topbar from "./Topbar";
import {Router, Route, Switch, Redirect} from "react-router";
import {ToastContainer, toast} from "react-toastify";
import history from '../../../utils/History';
import {StarterPackController} from "../controller/StarterPackController";
import {AccountController} from "../controller/AccountController";
import Wrapper from "../../../component/Wrapper";
import {Link} from "../../../component/Link";
import moment from 'moment';
interface DecoratorProps extends SideBarProps {

}

export default class Decorator extends React.Component<DecoratorProps> {

    constructor(props: DecoratorProps) {
        super(props);

    }

    render() {
        return <Wrapper>
            {/*<div className="page-wrapper">*/}
            {/*    <Sidebar navigation={this.props.navigation}/>*/}
            {/*    <div className='page-container'>*/}
            {/*        <Topbar />*/}
            {/*        <div className='main-content' style={{paddingBottom: 30}}>*/}
            {/*            <Router history={history}>*/}
            {/*                <Switch>*/}
            {/*                    {this.props.navigation.routes.map((item, ii)=>{*/}
            {/*                        return <Route key={ii} path={`/${item.href}`} render={props=>{*/}
            {/*                            const Component = item.component;*/}
            {/*                            const useDefaultWrapper = item.useDefaultWrapper !== undefined ? item.useDefaultWrapper : true;*/}
            {/*                            return useDefaultWrapper&&<div className="section__content section__content--p30">*/}
            {/*                                    <div className={"container-fluid"}>*/}
            {/*                                        {*/}
            {/*                                            // @ts-ignore*/}
            {/*                                            <Component {...item.properties} />*/}
            {/*                                        }*/}
            {/*                                    </div>*/}
            {/*                                </div>||*/}
            {/*                                <Wrapper>*/}
            {/*                                    {*/}
            {/*                                        // @ts-ignore*/}
            {/*                                        <Component {...item.properties} />*/}
            {/*                                    }*/}
            {/*                                </Wrapper>*/}
            {/*                        }}/>;*/}
            {/*                    })}*/}
            {/*                    {<Redirect to={this.props.navigation.defaultRoute} />}*/}
            {/*                </Switch>*/}
            {/*            </Router>*/}

            {/*        </div>*/}
            {/*    </div>*/}
            {/*<footer className="bdT ta-c p-30 lh-0 fsz-sm c-grey-600">*/}
            {/*<span>Copyright © {moment().format('YYYY')} Created by <a href="https://t-mobile.cz" target='_blank' title="T-Mobile">T-Mobile</a>. All rights reserved.</span>*/}
            {/*</footer>*/}
            {/*</div>*/}
            <div className="wrapper">
                <div className="sidebar" data-color="purple">
                    <div className="sidebar-wrapper">
                        <div className="logo">
                            <Link href="" className="simple-text">Binaria</Link>
                        </div>
                        <Sidebar navigation={this.props.navigation}/>
                    </div>
                </div>
                <div className="main-panel">
                    <Topbar/>
                    <div className="content">
                        <div className="container-fluid">
                            <Switch>
                                {this.props.navigation.routes.map((item, ii) => {
                                    return <Route key={ii} path={`/${this.props.navigation.context}/${item.href}`} render={props => {
                                        const Component = item.component;
                                        const useDefaultWrapper = item.useDefaultWrapper !== undefined ? item.useDefaultWrapper : true;
                                        return useDefaultWrapper &&
                                            <div className="section__content section__content--p30">
                                                <div className={"container-fluid"}>
                                                    {
                                                        // @ts-ignore
                                                        <Component {...item.properties} />
                                                    }
                                                </div>
                                            </div> ||
                                            <Wrapper>
                                                {
                                                    // @ts-ignore
                                                    <Component {...item.properties} />
                                                }
                                            </Wrapper>
                                    }}/>;
                                })}
                                {<Redirect to={`/${this.props.navigation.context}/${this.props.navigation.defaultRoute}`}/>}
                            </Switch>
                        </div>
                    </div>
                    <footer className="footer">
                        <div className="container">
                            <nav>
                                <p className="copyright text-center">
                                    ©
                                    {moment().format('YYYY')}
                                    <a href="https://vision-soft.cz">Vision Soft s.r.o.</a>
                                </p>
                            </nav>
                        </div>
                    </footer>
                </div>
            </div>
        </Wrapper>;
    }

}
