import React, {ChangeEvent} from "react";
import {ItemAction, ItemActionType, ItemState} from "../../redux/reducers/cart/ItemReducer";
import {connect} from "react-redux";
import {reduceStateToPlainObject} from "../../../common/redux/Reducers";
import {Modal, ModalBody} from "react-bootstrap";
import {cartStore, selectedItemStore} from "../../redux/WebRedux";
import {CartAction, CartActionType} from "../../redux/reducers/cart/CartReducer";
import {CartGoods} from "../../dto/Goods";
import {voidFormSubmit} from "../../../common/component/form/Form";
import {clamp} from "../../../common/utils/Util";
import {productImageUrl} from "../../TemplateUtil";

class ModalItem extends React.Component<ItemState> {


    plus = () => {
        this.setQuantity(this.props.pcs+1);
    };

    minus = () => {
        this.setQuantity(this.props.pcs-1);
    };

    setQuantity = (pcs:number) => {
        selectedItemStore.dispatch<ItemAction>({type: ItemActionType.ChangeQuantity, pcs:clamp(pcs, 1, this.props.item.stock)});
    };

    hide = () => {
      selectedItemStore.dispatch<ItemAction>({type: ItemActionType.Clear})
    };

    addToCart = () => {
        cartStore.dispatch<CartAction>({ type: CartActionType.AddCart, item:new CartGoods(this.props.item, this.props.pcs)});
        this.hide();
    };

    onInputChanged = (event:ChangeEvent<HTMLInputElement>) => {
        this.setQuantity(parseInt(event.target.value));
    };

    render() {
        return (
            <Modal show={this.props.item !== null} onHide={this.hide}>
                <ModalBody>
                    {
                        this.props.item && (
                            <div className="quickview_body">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-12 col-lg-5">
                                            <div className="quickview_pro_img">
                                                <img className="first_img" src={productImageUrl(this.props.item.code, 1)} alt=""/>
                                                <img className="hover_img" src={productImageUrl(this.props.item.code, 2)} alt=""/>
                                                {this.props.item.hot&&(
                                                    <div className="product_badge">
                                                        <span className="badge-new">Top</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-7">
                                            <div className="quickview_pro_des">
                                                <h4 className="title">{this.props.item.name}</h4>
                                                <div className="top_seller_product_rating mb-15">
                                                    <i className="fa fa-star" aria-hidden="true"/>
                                                    <i className="fa fa-star" aria-hidden="true"/>
                                                    <i className="fa fa-star" aria-hidden="true"/>
                                                    <i className="fa fa-star" aria-hidden="true"/>
                                                    <i className="fa fa-star" aria-hidden="true"/>
                                                </div>
                                                <h5 className="price">{this.props.item.getPrice().format}</h5>
                                                <p dangerouslySetInnerHTML={{__html:this.props.item.description}} />
                                                <p><strong>{Strings["InStock"]}:</strong> {this.props.item.stock} ks</p>
                                                <p><strong>{Strings["Price"]}:</strong> {this.props.item.getPrice().format()}</p>
                                                {/*<a href="#">View Full Product Details</a>*/}
                                            </div>
                                            <form className="cart" method="post" onSubmitCapture={voidFormSubmit} onSubmit={voidFormSubmit}>
                                                {
                                                    this.props.item.stock > 0 &&
                                                    (
                                                        <div className="quantity">
                                                            <span className="qty-minus" onClick={this.minus}><i className="fa fa-minus" aria-hidden="true"/></span>
                                                            <input type="number" value={this.props.pcs} onChange={this.onInputChanged}/>
                                                            <span className="qty-plus" onClick={this.plus}><i className="fa fa-plus" aria-hidden="true"/></span>
                                                        </div>
                                                    ) ||
                                                        <strong>{Strings["OutOfStock"]}</strong>
                                                }
                                                <button type="submit" name="addtocart" value="5" className="cart-submit" onClick={this.addToCart}>
                                                    {Strings["AddToCart"]}
                                                </button>
                                                {/*<div className="modal_pro_wishlist">*/}
                                                {/*    <a href="wishlist.html"><i className="icofont-heart"/></a>*/}
                                                {/*</div>*/}
                                                {/*<div className="modal_pro_compare">*/}
                                                {/*    <a href="compare.html"><i className="icofont-exchange"/></a>*/}
                                                {/*</div>*/}
                                            </form>
                                            {/*<div className="share_wf mt-30">*/}
                                            {/*    <p>Share with friends</p>*/}
                                            {/*    <div className="_icon">*/}
                                            {/*        <a href="#"><i className="fa fa-facebook" aria-hidden="true"/></a>*/}
                                            {/*        <a href="#"><i className="fa fa-twitter" aria-hidden="true"/></a>*/}
                                            {/*        <a href="#"><i className="fa fa-pinterest" aria-hidden="true"/></a>*/}
                                            {/*        <a href="#"><i className="fa fa-linkedin" aria-hidden="true"/></a>*/}
                                            {/*        <a href="#"><i className="fa fa-instagram" aria-hidden="true"/></a>*/}
                                            {/*        <a href="#"><i className="fa fa-envelope-o" aria-hidden="true"/></a>*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )
                    }

                </ModalBody>
            </Modal>
        );
    }

}


export default connect((state:ItemState) => reduceStateToPlainObject(state))(ModalItem);