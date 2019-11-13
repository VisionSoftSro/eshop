import * as React from "react";
import {ItemsState} from "../../redux/reducers/cart/ItemsReducer";
import {productImageUrl} from "../../TemplateUtil";
import {connect} from "react-redux";
import {reduceStateToPlainObject} from "../../../common/redux/Reducers";
import OwlCarousel from 'react-owl-carousel';

class HotItems extends React.Component<ItemsState> {
    render() {
        return <section className="welcome_area">
            {this.props.items.length > 0 &&<OwlCarousel
                className="welSlideTwo"
                loop
                margin={10}
                nav
            >
                {this.props.items.filter(i=>i.hot).map(item=>(
                    <div key={item.id} className="single_slide home-3 bg-img" style={{backgroundImage:`url(${productImageUrl(item.id, 1)})`}}>
                        <div className="container h-100">
                            <div className="row h-100 align-items-center">
                                <div className="col-12">
                                    <div className="welcome_slide_text text-center">
                                        <p data-animation="fadeInUp" data-delay="100ms">{item.name}</p>
                                        <h2 data-animation="fadeInUp" data-delay="300ms">{item.getPrice().format()}</h2>
                                        <a href="#" className="btn bigshop-btn" data-animation="fadeInUp"
                                           data-delay="500ms">Buy Now</a>
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

export default connect((state:ItemsState) => reduceStateToPlainObject(state))(HotItems);


