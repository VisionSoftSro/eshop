import * as React from "react";
import cs from 'classnames';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import Collapse from 'react-bootstrap/Collapse';
import {faAdjust} from "@fortawesome/free-solid-svg-icons";
import {Navigation, RouteConfig} from "../../../navigation/Navigation";
import {Link} from "../../../component/Link";
import {AssetCache} from "../../../../AssetCache";
import Wrapper from "../../../component/Wrapper";
import history from '../../../utils/History';
interface MenuLinkProps {
    icon?: IconProp,
    open?: boolean,
    className?: string,
    title: string,
    callback: () => void,
    href: (() => void) | string,
    subMenus?: Array<RouteConfig>,
    parent: Sidebar
}

class MenuLink extends React.Component<MenuLinkProps> {
    static defaultProps = {
        icon: faAdjust,
        href: "javascript:void(0);",
        callback: () => {
        },
        className: "",
        open: false
    };

    render() {
        return <li
            className={cs("nav-item", this.props.className, this.props.parent.state.location === `/${this.props.href}` && "active")}>
            <Link href={this.props.href} className={"nav-link"} history callback={this.props.callback}>
                <FontAwesomeIcon icon={this.props.icon} style={{marginRight: 20}}/>
                {this.props.title}
            </Link>
            {this.props.children}
        </li>
    }

}

interface MenuWithSubLinkState {
    opened: boolean
}

class MenuWithSublink extends React.Component<MenuLinkProps, MenuWithSubLinkState> {
    static defaultProps = {
        icon: "",
        href: "javascript:void(0);",
        callback: () => {
        },
        className: "",
        open: false
    };

    constructor(props: MenuLinkProps) {
        super(props);
        this.state = {
            opened: props.open
        };
    }


    handleClick = () => {
        this.setState({
            opened: !this.state.opened
        });
    };

    render() {
        return <li className={"has-sub"}>
            <a className={cs("js-arrow", this.state.opened && "menu-sub-active")} href="#"
               onClick={this.handleClick}><FontAwesomeIcon icon={this.props.icon}
                                                           style={{marginRight: 20}}/>{this.props.title}</a>
            <Collapse in={this.state.opened}>
                <ul className="list-unstyled" style={{paddingLeft: 34}}>
                    {this.props.subMenus.filter(i => i.menuConfig !== undefined).map((item, ii) => {
                        return <MenuLink parent={this.props.parent} key={ii} href={item.href}
                                         icon={item.menuConfig.icon} title={item.menuConfig.title}
                                         callback={this.props.callback}/>
                    })}
                </ul>
            </Collapse>
            {this.props.children}
        </li>
    }
}

export interface SideBarProps {
    navigation: Navigation
}

export default class Sidebar extends React.Component<SideBarProps> {
    state = {isOpen: false, location: window.location.pathname};

    constructor(props: any) {
        super(props);

    }

    componentDidMount(): void {
        // @ts-ignore
        history.listen((location: Location) => {
            this.setState({location: location.pathname});
        })
    }

    renderDesktop() {
        return <ul className="nav">
            {this.renderItems()}
        </ul>;
    }

    renderMobile() {
        return <header className="header-mobile d-block d-lg-none">
            <div className="header-mobile__bar">
                <div className="container-fluid">
                    <div className="header-mobile-inner">
                        <div className="logo">
                            <img src={AssetCache.Image.Logo} alt={"logo"}/>
                        </div>
                        <button className={cs("hamburger hamburger--slider", this.state.isOpen && "is-active")}
                                type="button" onClick={() => this.setState({isOpen: !this.state.isOpen})}>
        <span className="hamburger-box">
        <span className="hamburger-inner"/>
            </span>
                        </button>
                    </div>
                </div>
            </div>
            <nav className="navbar-mobile" style={{display: this.state.isOpen && "block" || "none"}}>
                <div className="container-fluid">
                    <ul className="navbar-mobile__list list-unstyled">
                        {this.renderItems(true, () => {
                            this.setState({isOpen: false})
                        })}
                    </ul>
                </div>
            </nav>
        </header>;
    }

    renderItems(mobile: boolean = false, onClick: () => void = () => {
    }): React.ReactNode {
        return <Wrapper>
            {this.props.navigation.routes.filter(i => i.menuConfig !== undefined).map((item, ii) => {
                if (item.subMenus !== undefined) {
                    return <MenuWithSublink parent={this} open={item.submenuOpen} key={ii} href={item.href}
                                            icon={item.menuConfig.icon} title={item.menuConfig.title} callback={onClick}
                                            subMenus={item.subMenus}/>
                } else {
                    return <MenuLink parent={this} key={ii} href={`/${this.props.navigation.context}/${item.href}`} icon={item.menuConfig.icon}
                                     title={item.menuConfig.title} callback={onClick}/>
                }
                //return <MenuLink key={ii} href={item.href} icon={item.menuConfig.icon} title={item.menuConfig.title} callback={onClick}/>

            })}
        </Wrapper>
    }

    renderSubItems(mobile: boolean = false, onClick: () => void = () => {
    }): React.ReactNode {
        let ulClassName = "list-unstyled navbar__sub-list js-sub-list";
        if (mobile) {
            ulClassName = "navbar-mobile-sub__list list-unstyled js-sub-list";
        }
        return <Wrapper>
            {this.props.navigation.routes.filter(i => i.menuConfig !== undefined).map((item, ii) => {
                return <MenuLink parent={this} key={ii} href={item.href} icon={item.menuConfig.icon}
                                 title={item.menuConfig.title} callback={onClick}/>
            })}
        </Wrapper>
    }

    render() {
        return <Wrapper>
            {this.renderDesktop()}
            {this.renderMobile()}
        </Wrapper>
    }
}