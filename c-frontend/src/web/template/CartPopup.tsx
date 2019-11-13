import React from "react";
import {connect} from "react-redux";
import {CartAction, CartActionType, CartState} from "../redux/reducers/cart/CartReducer";
import {productImageUrl} from "../TemplateUtil";
import {Price} from "../dto/Goods";
import {cartStore} from "../redux/WebRedux";
import {reduceStateToPlainObject} from "../../common/redux/Reducers";

class CartPopup extends React.Component<CartState> {

    render() {
        return (
            <div className="cart-area">
                <div className="cart--btn"><i className="icofont-cart"/> <span
                    className="cart_quantity">{this.props.cart.length}</span></div>

                <div className="cart-dropdown-content">
                    <ul className="cart-list">
                        {this.props.cart.length === 0 && <div>{Strings["CartIsEmpty"]}</div>}
                        {this.props.cart.map(item=>(
                            <li key={item.goods.id}>
                                <div className="cart-item-desc">
                                    <a href="#" className="image">
                                        <img src={productImageUrl(item.goods.id, 1)} className="cart-thumb" alt=""/>
                                    </a>
                                    <div>
                                        <a href="#">{item.goods.name}</a>
                                        <p>{item.pcs}x - <span className="price">{item.goods.getPrice().format()}</span></p>
                                    </div>
                                </div>
                                <span className="dropdown-product-remove" onClick={()=>{
                                    cartStore.dispatch<CartAction>({type: CartActionType.RemoveCart, item:item});
                                }}><i className="icofont-bin"/></span>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-pricing my-4">
                        <ul>
                            {/*<li>*/}
                            {/*    <span>Sub Total:</span>*/}
                            {/*    <span>$822.96</span>*/}
                            {/*</li>*/}
                            {/*<li>*/}
                            {/*    <span>Shipping:</span>*/}
                            {/*    <span>$30.00</span>*/}
                            {/*</li>*/}
                            <li>
                                <span>{Strings["TotalPrice"]}:</span>
                                <span>{new Price((this.props.cart.length>0?this.props.cart.map(a=>a.pcs * a.goods.price):[0]).reduce((a,b)=>a+b),'CZK').format()}</span>
                            </li>
                        </ul>
                    </div>
                    <div className="cart-box">
                        <a href="checkout-1.html"
                           className="btn bigshop-btn d-block">Checkout</a>
                    </div>
                </div>
            </div>
        );
    }

}
export default connect((state:CartState)=>reduceStateToPlainObject(state))(CartPopup);