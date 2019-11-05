import * as React from "react";

import data from "../../data/goods.json";

class Item extends React.Component<{item:any}> {
    render() {
        return (
            <div className="col-9 col-sm-6 col-md-4 col-lg-3">
                <div className="single-product-area mb-30">
                    <div className="product_image">
                        <img className="normal_img" src="/static/product-img/1/1.jpg" alt="" />
                            <div className="product_badge">
                                <span>Top</span>
                            </div>
                            <div className="product_wishlist">
                                <a href="wishlist.html"><i className="icofont-heart"/></a>
                            </div>
                            <div className="product_compare">
                                <a href="compare.html"><i className="icofont-exchange"/></a>
                            </div>
                    </div>

                    <div className="product_description">
                        <div className="product_add_to_cart">
                            <a href="#"><i className="icofont-cart"/> Add to Cart</a>
                        </div>

                        <div className="product_quick_view">
                            <a href="#" data-toggle="modal" data-target="#quickview"><i
                                className="icofont-eye-alt"/> Quick View</a>
                        </div>

                        <a href="#">Boutique Silk Dress</a>
                        <h6 className="product-price">$69.99</h6>
                    </div>
                </div>
            </div>
        );
    }
}

export class GoodsPage extends React.Component {

    componentDidMount(): void {

    }


    render() {
        return (
            <section className="best-selling-products-area mb-70">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-heading mb-50">
                                <h5>Naše zboží</h5>
                            </div>
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        {data.items.map(item=><Item item={item} />)}
                    </div>
                </div>
            </section>
        );
    }

}