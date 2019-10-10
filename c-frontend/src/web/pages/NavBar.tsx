import * as React from "react";
import {Link} from "../../common/component/Link";

export class NavBar extends React.Component {

    render() {
        return (
            <nav className="navbar navbar-default navbar-static-top yamm sticky-header">
                <div className="container">
                    <div className="pull-right">
                        <ul className="right-icon-nav nav navbar-nav list-inline">
                            <li className="cart-nav"><Link href={()=>null} data-toggle="offcanvas"
                                                        data-target="#cartNavmenu" data-canvas="body">
                                <i className="material-icons">shopping_cart</i> <span className="label label-primary">3</span></Link>
                            </li>
                            <li className="dropdown"><Link href={()=>null} className="dropdown-toggle"
                                                        data-toggle="dropdown"><i className="material-icons">search</i></Link>
                                <ul className="dropdown-menu search-dropdown">
                                    <li>
                                        <div className="search-form">
                                            <form role="form">
                                                <input type="text" className="form-control" placeholder="Search here..."/>
                                                    <button type="submit"><i className="material-icons">search</i></button>
                                            </form>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="index.html"><img src="images/logo.png" alt=""/></a>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                                   aria-haspopup="true" aria-expanded="false">Home <i className="fa fa-angle-down"></i></a>
                                <ul className="dropdown-menu">
                                    <li><a href="index.html">V1 - Default</a></li>
                                    <li><a href="index-creative.html">V2 - Creative</a></li>
                                </ul>
                            </li>

                            <li className="dropdown active">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                                   aria-haspopup="true" aria-expanded="false">Pages <i className="fa fa-angle-down"></i></a>
                                <ul className="dropdown-menu">
                                    <li><a href="page-empty.html">Empty page</a></li>
                                    <li><a href="about.html">About us</a></li>
                                    <li><a href="contact.html">Contact </a></li>
                                    <li><a href="contact-v2.html">Contact v2</a></li>
                                    <li><a href="error-404.html">Error 404</a></li>
                                    <li><a href="coming-soon.html">Coming Soon</a></li>
                                    <li><a href="login.html">Login</a></li>
                                    <li><a href="register.html">Register</a></li>

                                    <li><a href="help-center.html">Help center</a></li>
                                </ul>
                            </li>
                            <li className="dropdown yamm-fw">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">Shop <i
                                    className="fa fa-angle-down"></i></a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <div className="yamm-content">

                                            <div className="row">

                                                <div className="col-sm-4">
                                                    <h3 className="heading">Category View</h3>
                                                    <ul className="mega-menu-list list-unstyled nav">
                                                        <li><a href="cat-grid-2col.html">Grid 2 columns</a></li>
                                                        <li><a href="cat-grid-3col.html">Grid 3 columns</a></li>
                                                        <li><a href="cat-grid-4col.html">Grid 4 columns</a></li>
                                                        <li><a href="cat-grid-masonry.html">Grid Masonry</a></li>
                                                        <li><a href="cat-list-left-sidebar.html">Left sidebar (List)</a>
                                                        </li>
                                                        <li><a href="cat-list-right-sidebar.html">Right Sidebar (List)</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="col-sm-4">
                                                    <h3 className="heading">Shop Pages </h3>
                                                    <ul className="mega-menu-list list-unstyled nav">
                                                        <li><a href="product-detail-1.html">Product Detail 1</a></li>

                                                        <li><a href="cart.html">Cart</a></li>
                                                        <li><a href="checkout.html">Checkout</a></li>

                                                        <li><a href="wishlist.html">Wishlist</a></li>
                                                        <li><a href="order-track.html">Order Tracking</a></li>
                                                    </ul>

                                                </div>
                                                <div className="col-sm-4">
                                                    <h3 className="heading">Elements</h3>
                                                    <ul className="mega-menu-list list-unstyled nav">
                                                        <li><a href="typography.html">Typography</a></li>
                                                        <li><a href="buttons.html">Buttons</a></li>
                                                        <li><a href="testimonials.html">Testimonials</a></li>
                                                        <li><a href="modals.html">Modals</a></li>
                                                        <li><a href="tab-accordion.html">Tabs & accordions</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li><a href="blog.html">Blog</a></li>

                        </ul>
                    </div>
                </div>
            </nav>
        )
    }

}