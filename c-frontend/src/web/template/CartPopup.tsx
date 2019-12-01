import React from "react";
import {connect} from "react-redux";
import {CartAction, CartActionType, CartState} from "../redux/reducers/cart/CartReducer";
import {productImageUrl} from "../TemplateUtil";
import {Price} from "../dto/GoodsDto";
import {cartStore, checkoutStore} from "../redux/WebRedux";
import {reduceStateToPlainObject} from "../../common/redux/Reducers";
import {Link} from "../../common/component/Link";
import {CheckoutAction, CheckoutActionType} from "../redux/reducers/cart/CheckoutReducer";

class CartPopup extends React.Component<CartState> {

    showCheckout() {

    }

    render() {
        return (
            <div className="cart-area">
                <div className="cart--btn"><i className="icofont-cart"/> <span
                    className="cart_quantity">{this.props.cart.length}</span></div>

                <div className="cart-dropdown-content" style={{maxHeight: "90vh", overflow:"auto"}}>
                    <ul className="cart-list">
                        {this.props.cart.length === 0 && <div>{Strings["CartIsEmpty"]}</div>}
                        {this.props.cart.map(item=>(
                            <li key={item.goods.id}>
                                <div className="cart-item-desc">
                                    <a href="#" className="image">
                                        <img src={productImageUrl(item.goods.code, 1)} className="cart-thumb" alt=""/>
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
                        <Link href={"checkout"} callback={()=>checkoutStore.dispatch<CheckoutAction>({type:CheckoutActionType.SetStep, step:0})}
                           className="btn bigshop-btn d-block">K pokladně</Link>
                    </div>
                </div>
            </div>
        );
    }

}
export default connect((state:CartState)=>reduceStateToPlainObject(state))(CartPopup);