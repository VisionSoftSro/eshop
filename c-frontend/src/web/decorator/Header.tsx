import * as React from "react";
import {AssetCache} from "../AssetCache";
import {Link} from "../../common/component/Link";

export class Header extends React.Component {

    changeLocale = (locale: string) => {
        console.log(locale)
    };

    render() {
        return (
            <header className="header_area">
                <div className="top-header-area">
                    <div className="container h-100">
                        <div className="row h-100 align-items-center">
                            <div className="col-6">
                                <div className="welcome-note">
                                    <span className="popover--text" data-toggle="popover"
                                          data-content="Welcome to Bigshop ecommerce template."><i
                                        className="icofont-info-square"/></span>
                                    <span className="text">Welcome to Bigshop ecommerce template.</span>
                                </div>
                            </div>
                            <div className="col-6">
                                <div
                                    className="language-currency-dropdown d-flex align-items-center justify-content-end">

                                    <div className="language-dropdown">
                                        <div className="dropdown">
                                            <a className="btn btn-sm dropdown-toggle" href="#" role="button"
                                               id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true"
                                               aria-expanded="false">
                                                English
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right"
                                                 aria-labelledby="dropdownMenu1">
                                                <a className="dropdown-item" href="#">Bangla</a>
                                                <a className="dropdown-item" href="#">Arabic</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="currency-dropdown">
                                        <div className="dropdown">
                                            <a className="btn btn-sm dropdown-toggle" href="#" role="button"
                                               id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true"
                                               aria-expanded="false">
                                                $ USD
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right"
                                                 aria-labelledby="dropdownMenu2">
                                                <a className="dropdown-item" href="#">৳ BDT</a>
                                                <a className="dropdown-item" href="#">€ Euro</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bigshop-main-menu" id="sticker">
                    <div className="container">
                        <div className="classy-nav-container breakpoint-off">
                            <nav className="classy-navbar" id="bigshopNav">

                                <a href="index.html" className="nav-brand"><img src={AssetCache.Image.Logo} alt="logo"/></a>

                                <div className="classy-navbar-toggler">
                                    <span className="navbarToggler"><span/><span/><span/></span>
                                </div>

                                <div className="classy-menu">
                                    <div className="classycloseIcon">
                                        <div className="cross-wrap"><span className="top"/><span
                                            className="bottom"/></div>
                                    </div>

                                    <div className="classynav">
                                        <ul>
                                            <li><a href="#">Home</a>
                                                <ul className="dropdown">
                                                    <li><a href="index-1.html">Home - 1</a></li>
                                                    <li><a href="index-2.html">Home - 2</a></li>
                                                    <li><a href="index-3.html">Home - 3</a></li>
                                                </ul>
                                            </li>
                                            <li><a href="#">Shop</a>
                                                <ul className="dropdown">
                                                    <li><a href="#">Shop Grid</a>
                                                        <ul className="dropdown">
                                                            <li><a href="shop-grid-left-sidebar.html">Shop Grid Left
                                                                Sidebar</a></li>
                                                            <li><a href="shop-grid-right-sidebar.html">Shop Grid Right
                                                                Sidebar</a></li>
                                                            <li><a href="shop-grid-top-sidebar.html">Shop Grid Top
                                                                Sidebar</a></li>
                                                            <li><a href="shop-grid-no-sidebar.html">Shop Grid No
                                                                Sidebar</a></li>
                                                        </ul>
                                                    </li>
                                                    <li><a href="#">Shop List</a>
                                                        <ul className="dropdown">
                                                            <li><a href="shop-list-left-sidebar.html">Shop List Left
                                                                Sidebar</a></li>
                                                            <li><a href="shop-list-right-sidebar.html">Shop List Right
                                                                Sidebar</a></li>
                                                            <li><a href="shop-list-top-sidebar.html">Shop List Top
                                                                Sidebar</a></li>
                                                            <li><a href="shop-list-no-sidebar.html">Shop List No
                                                                Sidebar</a></li>
                                                        </ul>
                                                    </li>
                                                    <li><a href="product-details.html">Single Product</a></li>
                                                    <li><a href="cart.html">Cart</a></li>
                                                    <li><a href="#">Checkout</a>
                                                        <ul className="dropdown">
                                                            <li><a href="checkout-1.html">Login</a></li>
                                                            <li><a href="checkout-2.html">Billing</a></li>
                                                            <li><a href="checkout-3.html">Shipping Method</a></li>
                                                            <li><a href="checkout-4.html">Payment Method</a></li>
                                                            <li><a href="checkout-5.html">Review</a></li>
                                                            <li><a href="checkout-complate.html">Complate</a></li>
                                                        </ul>
                                                    </li>
                                                    <li><a href="#">Account Page</a>
                                                        <ul className="dropdown">
                                                            <li><a href="my-account.html">- Dashboard</a></li>
                                                            <li><a href="order-list.html">- Orders</a></li>
                                                            <li><a href="downloads.html">- Downloads</a></li>
                                                            <li><a href="addresses.html">- Addresses</a></li>
                                                            <li><a href="account-details.html">- Account Details</a>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li><a href="wishlist.html">Wishlist</a></li>
                                                    <li><a href="compare.html">Compare</a></li>
                                                </ul>
                                            </li>
                                            <li><a href="#">Pages</a>
                                                <div className="megamenu">
                                                    <ul className="single-mega cn-col-4">
                                                        <li><a href="about-us.html">- About Us</a></li>
                                                        <li><a href="faq.html">- FAQ</a></li>
                                                        <li><a href="contact.html">- Contact</a></li>
                                                        <li><a href="login.html">- Login &amp; Register</a></li>
                                                        <li><a href="404.html">- 404</a></li>
                                                        <li><a href="500.html">- 500</a></li>
                                                    </ul>
                                                    <ul className="single-mega cn-col-4">
                                                        <li><a href="my-account.html">- Dashboard</a></li>
                                                        <li><a href="order-list.html">- Orders</a></li>
                                                        <li><a href="downloads.html">- Downloads</a></li>
                                                        <li><a href="addresses.html">- Addresses</a></li>
                                                        <li><a href="account-details.html">- Account Details</a></li>
                                                        <li><a href="coming-soon.html">- Coming Soon</a></li>
                                                    </ul>
                                                    <div className="single-mega cn-col-2">
                                                        <div className="megamenu-slides owl-carousel">
                                                            <a href="shop-grid-left-sidebar.html">
                                                                <img src="img/bg-img/mega-slide-2.jpg" alt=""/>
                                                            </a>
                                                            <a href="shop-list-left-sidebar.html">
                                                                <img src="img/bg-img/mega-slide-1.jpg" alt=""/>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li><a href="#">Blog</a>
                                                <ul className="dropdown">
                                                    <li><a href="blog-with-left-sidebar.html">Blog Left Sidebar</a></li>
                                                    <li><a href="blog-with-right-sidebar.html">Blog Right Sidebar</a>
                                                    </li>
                                                    <li><a href="blog-with-no-sidebar.html">Blog No Sidebar</a></li>
                                                    <li><a href="single-blog.html">Single Blog</a></li>
                                                </ul>
                                            </li>
                                            <li><a href="#">Elements</a>
                                                <div className="megamenu">
                                                    <ul className="single-mega cn-col-4">
                                                        <li><a href="accordian.html">- Accordions</a></li>
                                                        <li><a href="alerts.html">- Alerts</a></li>
                                                        <li><a href="badges.html">- Badges</a></li>
                                                        <li><a href="blockquotes.html">- Blockquotes</a></li>
                                                    </ul>
                                                    <ul className="single-mega cn-col-4">
                                                        <li><a href="breadcrumb.html">- Breadcrumbs</a></li>
                                                        <li><a href="buttons.html">- Buttons</a></li>
                                                        <li><a href="forms.html">- Forms</a></li>
                                                        <li><a href="gallery.html">- Gallery</a></li>
                                                    </ul>
                                                    <ul className="single-mega cn-col-4">
                                                        <li><a href="heading.html">- Headings</a></li>
                                                        <li><a href="icon-fontawesome.html">- Icon FontAwesome</a></li>
                                                        <li><a href="icon-icofont.html">- Icon Ico Font</a></li>
                                                        <li><a href="labels.html">- Labels</a></li>
                                                    </ul>
                                                    <ul className="single-mega cn-col-4">
                                                        <li><a href="modals.html">- Modals</a></li>
                                                        <li><a href="pagination.html">- Pagination</a></li>
                                                        <li><a href="progress-bars.html">- Progress Bars</a></li>
                                                        <li><a href="tables.html">- Tables</a></li>
                                                    </ul>
                                                </div>
                                            </li>
                                            <li><a href="contact.html">Contact</a></li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="hero_meta_area ml-auto d-flex align-items-center justify-content-end">

                                    <div className="search-area">
                                        <div className="search-btn"><i className="icofont-search"></i></div>

                                        <div className="search-form">
                                            <input type="search" className="form-control" placeholder="Search"/>
                                            <input type="submit" className="d-none" value="Send"/>
                                        </div>
                                    </div>

                                    <div className="wishlist-area">
                                        <a href="wishlist.html" className="wishlist-btn"><i
                                            className="icofont-heart"></i></a>
                                    </div>

                                    <div className="cart-area">
                                        <div className="cart--btn"><i className="icofont-cart"></i> <span
                                            className="cart_quantity">2</span></div>

                                        <div className="cart-dropdown-content">
                                            <ul className="cart-list">
                                                <li>
                                                    <div className="cart-item-desc">
                                                        <a href="#" className="image">
                                                            <img src="img/product-img/top-1.png" className="cart-thumb"
                                                                 alt=""/>
                                                        </a>
                                                        <div>
                                                            <a href="#">Kid's Fashion</a>
                                                            <p>1 x - <span className="price">$32.99</span></p>
                                                        </div>
                                                    </div>
                                                    <span className="dropdown-product-remove"><i
                                                        className="icofont-bin"></i></span>
                                                </li>
                                                <li>
                                                    <div className="cart-item-desc">
                                                        <a href="#" className="image">
                                                            <img src="img/product-img/best-4.png" className="cart-thumb"
                                                                 alt=""/>
                                                        </a>
                                                        <div>
                                                            <a href="#">Headphone</a>
                                                            <p>2x - <span className="price">$49.99</span></p>
                                                        </div>
                                                    </div>
                                                    <span className="dropdown-product-remove"><i
                                                        className="icofont-bin"></i></span>
                                                </li>
                                            </ul>
                                            <div className="cart-pricing my-4">
                                                <ul>
                                                    <li>
                                                        <span>Sub Total:</span>
                                                        <span>$822.96</span>
                                                    </li>
                                                    <li>
                                                        <span>Shipping:</span>
                                                        <span>$30.00</span>
                                                    </li>
                                                    <li>
                                                        <span>Total:</span>
                                                        <span>$856.63</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="cart-box">
                                                <a href="checkout-1.html"
                                                   className="btn bigshop-btn d-block">Checkout</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="account-area">
                                        <div className="user-thumbnail">
                                            <img src="img/bg-img/user.jpg" alt=""/>
                                        </div>
                                        <ul className="user-meta-dropdown">
                                            <li className="user-title"><span>Hello,</span> Lim Sarah</li>
                                            <li><a href="my-account.html">My Account</a></li>
                                            <li><a href="order-list.html">Orders List</a></li>
                                            <li><a href="wishlist.html">Wishlist</a></li>
                                            <li><a href="login.html"><i className="icofont-logout"/> Logout</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        );
    }

}