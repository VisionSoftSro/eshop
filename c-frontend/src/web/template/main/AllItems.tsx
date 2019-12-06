import * as React from "react";
import {DataState} from "../../redux/reducers/cart/DataReducer";
import {CartGoods, GoodsDto} from "../../dto/GoodsDto";
import {cartStore, selectedItemStore} from "../../redux/WebRedux";
import {CartAction, CartActionType} from "../../redux/reducers/cart/CartReducer";
import {productImageUrl} from "../../TemplateUtil";
import {Link} from "../../../common/component/Link";
import {connect} from "react-redux";
import {reduceStateToPlainObject} from "../../../common/redux/Reducers";
import {ItemAction, ItemActionType} from "../../redux/reducers/cart/ItemReducer";
import {Loader} from "../../../common/component/Loader";
import Wrapper from "../../../common/component/Wrapper";

class Item extends React.Component<{item:GoodsDto}> {

    addToCart = () => {
        cartStore.dispatch<CartAction>({ type: CartActionType.AddCart, item:new CartGoods(this.props.item, 1)});
    };

    showDetail = () => {
        selectedItemStore.dispatch<ItemAction>({type: ItemActionType.Show, item:this.props.item, pcs:1});
    };

    render() {
        return (
            <div className="col-9 col-sm-6 col-md-4 col-lg-3">
                <div className="single-product-area mb-30">
                    <div className="product_image">
                        <img className="normal_img" src={productImageUrl(this.props.item.code, 1)} alt="" />
                        {this.props.item.hot && <div className="product_badge">
                            <span>Top</span>
                        </div>}
                        {/*<div className="product_wishlist">*/}
                        {/*    <a href="wishlist.html"><i className="icofont-heart"/></a>*/}
                        {/*</div>*/}
                        {/*<div className="product_compare">*/}
                        {/*    <a href="compare.html"><i className="icofont-exchange"/></a>*/}
                        {/*</div>*/}
                    </div>

                    <div className="product_description">
                        <div className="product_add_to_cart">
                            <Link href={this.addToCart}>
                                <i className="icofont-cart"/> {Strings["AddToCart"]}
                            </Link>
                        </div>

                        <div className="product_quick_view">
                            <Link href={this.showDetail}>
                                <i className="icofont-eye-alt"/> {Strings["QuickView"]}
                            </Link>
                        </div>

                        <a href="#">{this.props.item.name}</a>
                        <h6 className="product-price">{this.props.item.getPrice().format()}</h6>
                    </div>
                </div>
            </div>
        );
    }
}
class AllItems extends React.Component<DataState> {
    render() {
        return <section className="best-selling-products-area mb-70" >
            <div className="container" style={{paddingTop:20}}>
                {this.props.currentCategory &&
                <Wrapper>
                    <div className="row">
                        <div className="col-12">
                            <h5>{Strings["Goods"]}</h5>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">{Strings["Category"]}</li>
                                <li className="breadcrumb-item active">{Strings[`Categories.${this.props.currentCategory.id}`]}</li>
                            </ol>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        {
                            this.props.goods.filter(i=>i.categories.map(ii=>ii.id).includes(this.props.currentCategory.id)).map(item=><Item key={item.id} item={item} />)
                        }
                    </div>
                </Wrapper>|| <Loader />}
            </div>
        </section>;
    }
}

export default connect((state:DataState) => reduceStateToPlainObject(state))(AllItems);