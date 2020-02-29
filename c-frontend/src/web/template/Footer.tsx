import * as React from "react";
import moment from "moment";
import {Link} from "../../common/component/Link";

export class Footer extends React.Component {
    render() {
        return (
            <footer className="footer_area" style={{zIndex:0}}>
                <div className="container">
                    <div className="row pt-5">
                        <div className="col-12 col-lg-6 col-md-6">
                            <div className="single_footer_area">
                                <div className="footer_heading mb-4">
                                    <h6>Zákaznická podpora</h6>
                                    <span style={{fontSize:"small", color:"white"}}>Máte dotaz? Neváhejte nás kdykoliv kontaktovat! Jsme tu pro vás 24/7</span>
                                </div>
                                <ul className="footer_widget_menu">
                                    <li><a href={"mailto:info@oslavyadarky.cz"}><i className="icofont-rounded-right"/> info@oslavyadarky.cz</a></li>
                                    <li><a href={"tel:+420 608 319 575"}><i className="icofont-rounded-right"/> +420 608 319 575</a></li>
                                </ul>

                                {/*<div className="footer_social_area mt-15">*/}
                                    {/*<a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a>*/}
                                    {/*<a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a>*/}
                                    {/*<a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a>*/}
                                    {/*<a href="#"><i className="fa fa-pinterest" aria-hidden="true"></i></a>*/}
                                    {/*<a href="#"><i className="fa fa-dribbble" aria-hidden="true"></i></a>*/}
                                    {/*<a href="#"><i className="fa fa-rss" aria-hidden="true"></i></a>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 col-md-6">
                            <div className="single_footer_area mb-100">
                                <div className="footer_heading mb-4">
                                    <h6>Informace</h6>
                                </div>
                                <ul className="footer_widget_menu">
                                    <li><Link history={false} target={"_blank"} href={"/static/pdf/VOP.a.OOU.-.final.pdf"}><i className="icofont-rounded-right"/> Ochrana osobních údajů a obchodní podmínky</Link></li>
                                    {/*<li><a href="#"><i className="icofont-rounded-right"></i> Free Shipping Policy</a>*/}
                                    {/*</li>*/}
                                    {/*<li><a href="#"><i className="icofont-rounded-right"></i> Your Cart</a></li>*/}
                                    {/*<li><a href="#"><i className="icofont-rounded-right"></i> Return Policy</a></li>*/}
                                    {/*<li><a href="#"><i className="icofont-rounded-right"></i> Free Coupon</a></li>*/}
                                    {/*<li><a href="#"><i className="icofont-rounded-right"></i> Delivary Info</a></li>*/}
                                </ul>
                            </div>
                        </div>
                        {/*<div className="col-12 col-sm-6 col-md col-lg-4 col-xl-2">*/}
                            {/*<div className="single_footer_area mb-100">*/}
                                {/*<div className="footer_heading mb-4">*/}
                                    {/*<h6>Account</h6>*/}
                                {/*</div>*/}
                                {/*<ul className="footer_widget_menu">*/}
                                    {/*<li><a href="#"><i className="icofont-rounded-right"></i> Product Support</a></li>*/}
                                    {/*<li><a href="#"><i className="icofont-rounded-right"></i> Terms &amp; Conditions</a>*/}
                                    {/*</li>*/}
                                    {/*<li><a href="#"><i className="icofont-rounded-right"></i> Help</a></li>*/}
                                    {/*<li><a href="#"><i className="icofont-rounded-right"></i> Payment Method</a></li>*/}
                                    {/*<li><a href="#"><i className="icofont-rounded-right"></i> Affiliate Program</a></li>*/}
                                    {/*<li><a href="#"><i className="icofont-rounded-right"></i> Privacy Policy</a></li>*/}
                                {/*</ul>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                        {/*<div className="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-2">*/}
                            {/*<div className="single_footer_area mb-100">*/}
                                {/*<div className="footer_heading mb-4">*/}
                                    {/*<h6>Support</h6>*/}
                                {/*</div>*/}
                                {/*<ul className="footer_widget_menu">*/}
                                    {/*<li><a href="#"><i className="icofont-rounded-right"></i> Payment Method</a></li>*/}
                                    {/*<li><a href="#"><i className="icofont-rounded-right"></i> Help</a></li>*/}
                                    {/*<li><a href="#"><i className="icofont-rounded-right"></i> Product Support</a></li>*/}
                                    {/*<li><a href="#"><i className="icofont-rounded-right"></i> Terms &amp; Conditions</a>*/}
                                    {/*</li>*/}
                                    {/*<li><a href="#"><i className="icofont-rounded-right"></i> Privacy Policy</a></li>*/}
                                    {/*<li><a href="#"><i className="icofont-rounded-right"></i> Affiliate Program</a></li>*/}
                                {/*</ul>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                        {/*<div className="col-12 col-md-7 col-lg-8 col-xl-3">*/}
                            {/*<div className="single_footer_area mb-50">*/}
                                {/*<div className="footer_heading mb-4">*/}
                                    {/*<h6>Join our mailing list</h6>*/}
                                {/*</div>*/}
                                {/*<div className="subscribtion_form">*/}
                                    {/*<form action="#" method="post">*/}
                                        {/*<input type="email" name="mail" className="form-control mail"*/}
                                               {/*placeholder="Your E-mail Addrees"/>*/}
                                            {/*<button type="submit" className="submit"><i*/}
                                                {/*className="icofont-long-arrow-right"></i></button>*/}
                                    {/*</form>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                            {/*<div className="single_footer_area mb-100">*/}
                                {/*<div className="footer_heading mb-4">*/}
                                    {/*<h6>Download our Mobile Apps</h6>*/}
                                {/*</div>*/}
                                {/*<div className="apps_download">*/}
                                    {/*<a href="#"><img src="img/core-img/play-store.png" alt="Play Store"/></a>*/}
                                    {/*<a href="#"><img src="img/core-img/app-store.png" alt="Apple Store"/></a>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    </div>
                </div>
                <div className="footer_bottom_area">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-12">
                                <div className="copywrite_text">
                                    <p>oslavyadarky.cz {moment().format('YYYY')}</p>
                                    <p style={{fontSize:"small"}}>Provozovatelem internetového obchodu oslavyadárky.cz je společnost <a href={"https://vision-soft.cz"} className={"orange-link"}>Vision Soft s.r.o.</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}
