import * as React from "react";
import {AssetCache} from "../AssetCache";
import {Link} from "../../common/component/Link";

export class TopBar extends React.Component {

    changeLocale = (locale:string) => {
        console.log(locale)
    };

    render() {
        return (
            <div className="top-bar">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 hidden-xs">
                            <span>Free shipping worldwide on order above $150</span>
                        </div>
                        <div className="col-sm-6">
                            <ul className="list-inline pull-right">
                                <li><a href="#"><i className="material-icons">perm_identity</i> Login</a></li>
                                <li><a href="#"><i className="material-icons">favorite_border</i> Wishlist (0)</a></li>
                                <li className="dropdown"><a href="#" data-toggle="dropdown" className="dropdown-toggle"><img
                                    src={AssetCache.Image.Flags.Spanish} alt=""/> English</a>
                                    <ul className="lang-dropdown dropdown-menu">
                                        <li>
                                            <Link href={this.changeLocale} displayHref={"es"} funcArgs={"es"}>
                                                <img className="flag" src={AssetCache.Image.Flags.Spanish} alt="Spanish"/>Spanish
                                            </Link>
                                            <Link href={this.changeLocale} displayHref={"en"} funcArgs={"en"}>
                                                <img className="flag" src={AssetCache.Image.Flags.English} alt="Spanish"/>Spanish
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}