import * as React from "react";
import {ReactElement, useEffect, useState} from "react";
import {CartGoods, GoodsDto} from "../../dto/GoodsDto";
import {clamp, getHashValue} from "../../../common/utils/Util";
import {booleanComparator, Loader} from "../../../common/component/Loader";
import {httpEndpoint} from "../../../common/utils/HttpUtils";
import {Page404} from "./Page404";
import {Link} from "../../../common/component/Link";
import {cartStore, dataStore, selectedItemStore} from "../../redux/WebRedux";
import {DataAction, DataActionType} from "../../redux/reducers/cart/DataReducer";
import {Quantity} from "../Quantity";
import {CartAction, CartActionType} from "../../redux/reducers/cart/CartReducer";
import {announceAddedToCart} from "../Root";
import OwlCarousel from 'react-owl-carousel';
import {productImageUrl} from "../../TemplateUtil";
import {ItemAction, ItemActionType} from "../../redux/reducers/cart/ItemReducer";
import {
    Carousel,
    CarouselItem,
} from 'reactstrap';
import cs from 'classnames';
import {StockEmoji} from "./StockEmoji";



const useDetailLoading = ():[GoodsDto, boolean] => {
    const [item, setItem] = useState(null as GoodsDto);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        const id = getHashValue("pid");
        httpEndpoint<GoodsDto>(GoodsDto, `goods/detail/${id}`).then(result=>{
            if(result && result.response.status !== 200) {
                setLoading(false);
            } else {
                setItem(result.data);
                setLoading(false);
            }
        });
    }, []);
    return [item, loading];
};

const useImageIterator = ({images}:GoodsDto) => {
    const iterator = (callback:(index:number)=>ReactElement) => {
        const array = new Array<ReactElement>();
        for(let i = 0; i < images; i++) {
            array.push(callback(i+1));
        }
        return array;
    };
    return [iterator];
};

const useCarousel = ({images}:GoodsDto):[number, (index:number)=>void] => {
    const [index, setIndex] = useState(0);
    return [index, (newIndex)=>{
        setIndex(clamp(newIndex, 0, images));
    }]
};

const usePcsCounter = ({stock}:GoodsDto):[number, (value:number)=>void, boolean] => {
    const [pcs, setPcs] = useState(0);
    const [available, setAvailable] = useState(false);
    return [pcs, (value)=>{
        setPcs(value);
        setAvailable(value <= stock && value > 0);
    }, available];
};

function Item({item}:{item:GoodsDto}) {
    const [pcs, setPcs, available] = usePcsCounter(item);
    const [imageIterator] = useImageIterator(item);
    const [index, setIndex] = useCarousel(item);
    const category = item.categories[0];
    useEffect(()=>{
        window.scrollTo(0, 0);
    }, []);
    return (
        <section className="best-selling-products-area" >
            <div className="container" style={{paddingTop:20, minHeight:500, paddingBottom:50}}>
                <div className="row">
                    <div className="col-12">
                        <h5>{Strings["Goods"]}</h5>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">{Strings["Category"]}</li>
                            <li className="breadcrumb-item"><Link href={`/${category.getSeoName()}`} callback={()=>dataStore.dispatch<DataAction>({type:DataActionType.SetCategory, currentCategory:category})} >{category.getName()}</Link></li>
                            <li className="breadcrumb-item">{item.name}</li>
                        </ol>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-6">
                        <div className={"single_product_thumb"}>
                            <Carousel interval={false} id="product_details_slider" indicators={false} activeIndex={index} next={()=>setIndex(index+1)} previous={()=>setIndex(index-1)} autoPlay={false}>
                                {
                                    imageIterator(number=>(
                                        <CarouselItem key={number} style={{height:500}}>
                                            <Link className={"gallery_img"} href={productImageUrl(item.code, number)} history={false}>
                                                <img className={"d-block w-100"} src={productImageUrl(item.code, number)} />
                                            </Link>

                                        </CarouselItem>
                                    ))
                                }
                                <ol className="carousel-indicators">
                                    {
                                        imageIterator(number=>(
                                            <li className={number-1===index&&"active"||""} key={number} onClick={()=>setIndex(number-1)}
                                                style={{backgroundImage:`url(${productImageUrl(item.code, number)})`}}>
                                            </li>
                                        ))
                                    }
                                </ol>
                            </Carousel>

                        </div>

                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="single_product_desc">
                            <h4 className="title mb-2">{item.name}</h4>
                            {/*<h4 className="price mb-5">{item.getPrice().format()}</h4>*/}
                            <div className="short_overview mb-4">
                                <h6>Popis</h6>
                                <p dangerouslySetInnerHTML={{__html:item.description}} />
                                <p><strong>{Strings["InStock"]}:</strong> {item.stock} ks</p>
                                <p><strong>{Strings["Price"]}:</strong> {item.getPrice().format()}</p>
                            </div>
                            <div className="cart clearfix my-5 d-flex flex-wrap align-items-center">
                                <StockEmoji stock={item.stock} style={{marginRight:20}}/>
                                {
                                    item.stock > 0 &&(
                                        <>

                                            <Quantity max={item.stock} pcs={pcs} setQuantity={setPcs} />
                                            <Link href={()=>{
                                                if(available) {
                                                    const cg = new CartGoods(item, pcs);
                                                    announceAddedToCart(cg);
                                                    cartStore.dispatch<CartAction>({ type: CartActionType.AddCart, item:cg});
                                                }
                                            }} className={cs("btn bigshop-btn mt-1 mt-md-0 ml-1 ml-md-3", !available&&"disabled")}>
                                                {Strings["AddToCart"]}
                                            </Link>
                                        </>
                                    )||<strong>{Strings["OutOfStock"]}</strong>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function ItemDetail() {
    const [item, loading] = useDetailLoading();


    return (
        <Loader comparator={booleanComparator} value={!loading}>
            {(loader)=>(
                loader&&(
                    <section className="best-selling-products-area" >
                        <div className="container" style={{paddingTop:20, minHeight:500}}>
                            {loader}
                        </div>
                    </section>
                )||
                !item&&(
                    // 404
                    <Page404 />
                )||(
                    // 200
                    <Item item={item} />
                )
            )}
        </Loader>
    );
}
