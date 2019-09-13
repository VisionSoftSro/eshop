import React, { Component } from "react";
import cs from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Switch from "react-switch";
import Button from 'react-bootstrap/Button';
import {Link} from "../../../component/Link";
import {AssetCache} from "../../../../AssetCache";
import {CombinedState, ReducersState} from "../../../redux/Reducers";
import {connect} from "react-redux";
import {logout} from "../../../redux/reducers/login/LoginActions";
interface DropDownComponentProps {
    icon: IconProp
    count: number
}
interface DropdownState {
    showDropDown:boolean
}
class ComponentRefresh extends Component {

    state = { toggleActive: true, showRefresh: true };
    timeoutId: NodeJS.Timeout;

    constructor(props: any) {
        super(props);
        this.state = { toggleActive: true, showRefresh: true };
        this.onToggle = this.onToggle.bind(this);
        this.onShowRefresh = this.onShowRefresh.bind(this);
        this.onHideRefresh = this.onHideRefresh.bind(this);
    }

    onToggle() {
        this.setState({ toggleActive: !this.state.toggleActive, showRefresh: true }, ()=>{
            this.notifyChanges();
            if (!this.state.toggleActive) {
                this.onHideRefresh();
            }
        });
    }

    onShowRefresh() {
        this.setState({ showRefresh: false });
    }

    onHideRefresh() {
        this.notifyChanges();
        this.setState({ showRefresh: true });
    }

    notifyChanges() {
        clearTimeout(this.timeoutId);
        if (!this.state.toggleActive) {
            this.timeoutId = setTimeout(() => {
                this.onShowRefresh();
            }, 5000);
        }
    }

    render() {
        return (
            <div className="" style={{ paddingTop: 15 }} >
                <label>
                    <Switch className="" onChange={this.onToggle} checked={this.state.toggleActive} />
                    <div style={{ float: "right", paddingLeft: 10 }}> Automatické načítání novinek {this.state.toggleActive ? 'ZAPNUTO' : 'VYPNUTO'}</div>
                </label>
                <div style={{ float: "right", paddingLeft: 10, marginTop: -7 }} hidden={this.state.showRefresh}> <Button onClick={this.onHideRefresh}>Nová data</Button></div>
            </div>
        )
    }
}


class DropDownAutoHideComponent<T> extends React.Component<T, DropdownState> {

    state = { showDropDown: false };
    div:any = React.createRef();

    toggleVisibility = () => {
        this.setState({showDropDown:!this.state.showDropDown});
    };

    show = () => {
        this.setState({ showDropDown: true });
    };

    hide = () =>  {
        this.setState({ showDropDown: false});
    };

    componentWillMount(): void {
        document.addEventListener('mouseup', this.handleClick, false);
    }

    componentWillUnmount(): void {
        document.removeEventListener('mouseup', this.handleClick, false);
    }

    handleClick = (e:MouseEvent) => {
        const parent = this.div.current;
        this.hide();
        /*if(!parent.contains(e.target)) {
            this.hide();
        }*/
    };
}

class DropDownComponent extends DropDownAutoHideComponent<DropDownComponentProps> {

    render() {
        return <div className={cs("noti__item js-item-menu", this.state.showDropDown && "show-dropdown")} ref={this.div} style={{ marginLeft: 10 }}>
            <span onClick={this.toggleVisibility}>
                <FontAwesomeIcon icon={this.props.icon} style={{}} size="2x" />
            </span>
            <span className="quantity">{this.props.count}</span>
            <div className="mess-dropdown js-dropdown" >
                {this.props.children}
            </div>
        </div>
    }
}

class DropDownLanguageComponent extends DropDownAutoHideComponent<{}> {

    render() {
        return <div className={cs("account-item noti__item js-item-menu", this.state.showDropDown && "show-dropdown")} ref={this.div}>
            <div className="content" style={{ marginLeft: -15 }}>
                <Link href={this.show}>Čeština</Link>
            </div>
            <div className="mess-dropdown js-dropdown">
                {this.props.children}
            </div>
        </div>
    }
}

class DropDownLoginComponent extends DropDownAutoHideComponent<{}> {

    render() {
        return <div className={cs("account-item clearfix js-item-menu", this.state.showDropDown && "show-dropdown")} ref={this.div}>
            <div className="image">
                <img src={AssetCache.Image.Logo} alt="Uživatel" />
            </div>
            <div className="content">
                <Link href={this.show}>Uživatel</Link>
            </div>
            <div className="account-dropdown js-dropdown">
                {this.props.children}
            </div>
        </div>
    }
}

class Topbar extends React.Component<CombinedState> {

    dropdowns:Array<DropDownComponent> = [];

    render() {
        return <nav className="navbar navbar-expand-lg ">
            <div className=" container-fluid  ">
                <Link className="navbar-brand" href={""} history>
                    {Strings.MainPage}
                </Link>
                <div className="collapse navbar-collapse justify-content-end" id="navigation">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" href={()=>this.props.dispatch(logout())}>
                                <span className="no-icon">{Strings.Logout}</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>;
    }
}
export default connect((state:ReducersState) => state)(Topbar);