import * as React from "react";
import {Token} from "../../model/Token";
import {Form, FormButton, FormField, FormStatus} from "../../component/form/Form";
import {http} from "../../utils/HttpUtils";
import {Link} from "../../component/Link";
import config from '../../../Config';
import {ReducersState} from "../../redux/Reducers";
import {connect} from "react-redux";
import TokenStore from "../../TokenStore";
import {LoginForm, processLogin} from "../../redux/reducers/login/LoginActions";
import {LoginActionType, LoginState} from "../../redux/reducers/login/LoginReducer";






class LoginPage extends React.Component<LoginState> {

    componentDidMount(): void {
        //lets try login when refresh page if token exist user will be automatically logged in
        this.props.dispatch(processLogin());
    }

    login = async (form:Form<LoginForm>) => {
        await this.props.dispatch(processLogin(form.data));
        return FormStatus.Skip;
    };

    render() {
        return (
            <div className="wrapper wrapper-full-page">
                <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute">
                    <div className="container">
                        <div className="navbar-wrapper">
                            <Link className="navbar-brand" href="/user" history>Binaria Account managment</Link>
                            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                                    aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-bar burger-lines" />
                                <span className="navbar-toggler-bar burger-lines" />
                                <span className="navbar-toggler-bar burger-lines" />
                            </button>
                        </div>
                        <div className="collapse navbar-collapse justify-content-end" id="navbar">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link href={""} history className="nav-link">
                                        <i className="nc-icon nc-chart-pie-35"/> {Strings.MainPage}
                                    </Link>
                                </li>
                                <li className="nav-item ">
                                    <a href={config.logportRegisterUrl} className="nav-link">
                                        <i className="nc-icon nc-badge"/> {Strings.Register}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="full-page section-image">
                    <div className="content">
                        <div className="container">
                            <div className="col-md-4 col-sm-6 ml-auto mr-auto">
                                <Form<LoginForm> data={{}} simpleLabel onSend={this.login}>
                                    <div className="card card-login">
                                        <div className="card-header ">
                                            <h3 className="header text-center">{Strings.SignIn}</h3>
                                        </div>
                                        <div className="card-body">
                                            <div className="card-body">
                                                <FormField title={Strings["Email"]} name={"username"} type={"text"} />
                                                <FormField title={Strings["Password"]} name={"password"} type={"password"} />
                                                <div className="form-group" style={{color:"#696969", fontSize:"small"}}>
                                                    {Strings.LogportLoginDesc}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer ml-auto mr-auto">
                                            <FormButton className="btn btn-warning btn-wd">{Strings.Login}</FormButton>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                    <div className="full-page-background"/>
                </div>
            </div>
        );
    }
}
export default connect((state:ReducersState) => state)(LoginPage);