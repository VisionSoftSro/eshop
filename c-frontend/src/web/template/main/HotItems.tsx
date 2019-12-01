import * as React from "react";
import {DataState} from "../../redux/reducers/cart/DataReducer";
import {productImageUrl} from "../../TemplateUtil";
import {connect} from "react-redux";
import {reduceStateToPlainObject} from "../../../common/redux/Reducers";
import OwlCarousel from 'react-owl-carousel';
import {selectedItemStore} from "../../redux/WebRedux";
import {ItemAction, ItemActionType} from "../../redux/reducers/cart/ItemReducer";
import {Link} from "../../../common/component/Link";

class HotItems extends React.Component<DataState> {


    render() {
        return <section className="welcome_area">
            {this.props.goods.length > 0 &&<OwlCarousel
                className="welSlideTwo"
                loop
                nav
                responsive={{0:{
                        items:1
                    },
                    1000:{
                        items:3
                    }}}
            >
                {this.props.goods.filter(i=>i.hot).map(item=>(
                    <div key={item.id} className="single_slide home-3 bg-img" style={{backgroundImage:`url(${productImageUrl(item.code, 1)})`}}>
                        <div className="container h-100">
                            <div className="row h-100 align-items-center">
                                <div className="col-12">
                                    <div className="welcome_slide_text text-center">
                                        <p data-animation="fadeInUp" data-delay="100ms">{item.name}</p>
                                        <h2 data-animation="fadeInUp" data-delay="300ms">{item.getPrice().format()}</h2>
                                        <Link href={()=>{
                                            selectedItemStore.dispatch<ItemAction>({type: ItemActionType.Show, item:item, pcs:1});
                                        }} className="btn bigshop-btn" data-animation="fadeInUp"
                                           data-delay="500ms">{Strings["BuyNow"]}</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </OwlCarousel>}
        </section>;
    }
}

export default connect((state:DataState) => reduceStateToPlainObject(state))(HotItems);


