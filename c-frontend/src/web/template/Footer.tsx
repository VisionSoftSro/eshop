import * as React from "react";

export class Footer extends React.Component {
    render() {
        return (
            <footer className="footer_area section_padding_100_0">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3">
                            <div className="single_footer_area mb-100">
                                <div className="footer_heading mb-4">
                                    <h6>Contact Us</h6>
                                </div>
                                <ul className="footer_content">
                                    <li><span>Address:</span> Lords, London, UK - 1259</li>
                                    <li><span>Phone:</span> 002 63695 24624</li>
                                    <li><span>FAX:</span> 002 78965 369552</li>
                                    <li><span>Email:</span> support@example.com</li>
                                </ul>
                                <div className="footer_social_area mt-15">
                                    <a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                                    <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                                    <a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a>
                                    <a href="#"><i className="fa fa-pinterest" aria-hidden="true"></i></a>
                                    <a href="#"><i className="fa fa-dribbble" aria-hidden="true"></i></a>
                                    <a href="#"><i className="fa fa-rss" aria-hidden="true"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md col-lg-4 col-xl-2">
                            <div className="single_footer_area mb-100">
                                <div className="footer_heading mb-4">
                                    <h6>Information</h6>
                                </div>
                                <ul className="footer_widget_menu">
                                    <li><a href="#"><i className="icofont-rounded-right"></i> Your Account</a></li>
                                    <li><a href="#"><i className="icofont-rounded-right"></i> Free Shipping Policy</a>
                                    </li>
                                    <li><a href="#"><i className="icofont-rounded-right"></i> Your Cart</a></li>
                                    <li><a href="#"><i className="icofont-rounded-right"></i> Return Policy</a></li>
                                    <li><a href="#"><i className="icofont-rounded-right"></i> Free Coupon</a></li>
                                    <li><a href="#"><i className="icofont-rounded-right"></i> Delivary Info</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md col-lg-4 col-xl-2">
                            <div className="single_footer_area mb-100">
                                <div className="footer_heading mb-4">
                                    <h6>Account</h6>
                                </div>
                                <ul className="footer_widget_menu">
                                    <li><a href="#"><i className="icofont-rounded-right"></i> Product Support</a></li>
                                    <li><a href="#"><i className="icofont-rounded-right"></i> Terms &amp; Conditions</a>
                                    </li>
                                    <li><a href="#"><i className="icofont-rounded-right"></i> Help</a></li>
                                    <li><a href="#"><i className="icofont-rounded-right"></i> Payment Method</a></li>
                                    <li><a href="#"><i className="icofont-rounded-right"></i> Affiliate Program</a></li>
                                    <li><a href="#"><i className="icofont-rounded-right"></i> Privacy Policy</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-2">
                            <div className="single_footer_area mb-100">
                                <div className="footer_heading mb-4">
                                    <h6>Support</h6>
                                </div>
                                <ul className="footer_widget_menu">
                                    <li><a href="#"><i className="icofont-rounded-right"></i> Payment Method</a></li>
                                    <li><a href="#"><i className="icofont-rounded-right"></i> Help</a></li>
                                    <li><a href="#"><i className="icofont-rounded-right"></i> Product Support</a></li>
                                    <li><a href="#"><i className="icofont-rounded-right"></i> Terms &amp; Conditions</a>
                                    </li>
                                    <li><a href="#"><i className="icofont-rounded-right"></i> Privacy Policy</a></li>
                                    <li><a href="#"><i className="icofont-rounded-right"></i> Affiliate Program</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-12 col-md-7 col-lg-8 col-xl-3">
                            <div className="single_footer_area mb-50">
                                <div className="footer_heading mb-4">
                                    <h6>Join our mailing list</h6>
                                </div>
                                <div className="subscribtion_form">
                                    <form action="#" method="post">
                                        <input type="email" name="mail" className="form-control mail"
                                               placeholder="Your E-mail Addrees"/>
                                            <button type="submit" className="submit"><i
                                                className="icofont-long-arrow-right"></i></button>
                                    </form>
                                </div>
                            </div>
                            <div className="single_footer_area mb-100">
                                <div className="footer_heading mb-4">
                                    <h6>Download our Mobile Apps</h6>
                                </div>
                                <div className="apps_download">
                                    <a href="#"><img src="img/core-img/play-store.png" alt="Play Store"/></a>
                                    <a href="#"><img src="img/core-img/app-store.png" alt="Apple Store"/></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer_bottom_area">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-12 col-md-6">
                                <div className="copywrite_text">
                                    <p>Made with <i className="fa fa-heart" aria-hidden="true"></i> by <a href="#">Designing
                                        World</a></p>
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="payment_method">
                                    <img src="img/payment-method/paypal.png" alt=""/>
                                        <img src="img/payment-method/maestro.png" alt=""/>
                                            <img src="img/payment-method/western-union.png" alt=""/>
                                                <img src="img/payment-method/discover.png" alt=""/>
                                                    <img src="img/payment-method/american-express.png" alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}