import * as React from "react";
import Wrapper from "../../component/Wrapper";
import {Loading} from "../../component/Loading";
import LoginPage from "./LoginPage";
import Decorator from "./decorator/Decorator";
import lightstrap from '../../../assets/lightstrap/light-bootstrap-dashboard';
import navigation from '../../navigation/NavigationConfig';
import { connect } from 'react-redux';
import {ReducersState} from "../../redux/Reducers";
import {WebsocketState} from "../../redux/reducers/websocket/WebsocketReducer";


export class UserManagement extends React.Component<WebsocketState> {


    componentDidMount(): void {
        lightstrap();
    }

    render() {
        return <div className={"account-management"}>
            {
                this.props.token === null&&<LoginPage />||
                (
                    this.props.connected&&
                    <Wrapper>
                        <Decorator navigation={navigation}/>
                    </Wrapper> ||
                    <div>
                        <Loading fullscreen show/>
                    </div>
                )
            }
        </div>;
    }

}

export default connect((state:ReducersState) => state.websocket)(UserManagement);