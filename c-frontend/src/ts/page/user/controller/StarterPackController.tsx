import * as React from 'react';
import {httpEndpointList} from "../../../utils/HttpUtils";
import {StarterPack} from "../../../model/StarterPack";
import {Block} from "../../../component/Block";
import {Loader} from "../../../component/Loader";
import {formatPrice, JsonList} from "../../../utils/Util";
import Wrapper from "../../../component/Wrapper";
import {Link} from "../../../component/Link";
import {PaymentSelect} from "../payment/PaymentSelect";

type State = { data?: JsonList<StarterPack>, selectedPack?:StarterPack };

export class StarterPackController extends React.Component<{}, State> {
    state: State = {};

    async componentDidMount() {
        const result = await httpEndpointList<StarterPack>(StarterPack, "starter-pack/list");
        this.setState({data: result.data});
    }

    buildPacks() {
        const arr = [];
        for (let i = 0; i < this.state.data.list.length; i++) {
            const pack = this.state.data.list[i];
            arr.push(<StarterPackItem key={i} item={pack} onClick={this.onClick}/>)
        }
        return arr;
    }

    onClick = (pack: StarterPack): void => {
        this.setState({selectedPack:pack});
    };

    render() {

        return <Block title={Strings.StarterPacks}>
            {
                this.state.selectedPack&&
                //payment screen
                <PaymentSelect onResult={(success:boolean)=>{}} item={this.state.selectedPack} onCancel={()=>{
                    this.setState({selectedPack:null})
                }} />
                ||
                //List
                <Loader value={this.state.data}>
                    {
                        () => {
                            return <Wrapper>
                                <div className="row">
                                    {this.buildPacks()}
                                </div>
                                <div className={"row"}>
                                    <div className="col-12">
                                        * Ve hře jsou prozatím 2 regiony. Koupí startovního balíčku obdržíte začáteční
                                        budovy pro daný region, který si vyberete ve hře.
                                    </div>
                                </div>
                            </Wrapper>
                        }
                    }
                </Loader>
            }
        </Block>;
    }

}
interface StarterPackItemProps {
    item: StarterPack;
    onClick: (pack: StarterPack) => void
}

class StarterPackItem extends React.Component<StarterPackItemProps> {
    render() {
        const item = this.props.item;
        const imageName = item.name.toLowerCase().replace(" ", "_");
        return <div className="col-lg-4 col-md-4 col-sm-6 col-xs-6">
            {/*<img src={ABSOLUTE_URL + "/resources/images/starter-packs/" + imageName + ".png"} width="100"/>*/}

            <ul className="price">
                <li className="header">{item.name}</li>
                <li>{formatPrice(item.price.result)}</li>
                {/*<StarterPackBonuses data={item.bonuses} name={item.name}/>*/}
                <li className="grey">
                    <Link href={() => {
                        this.props.onClick(item)
                    }} className={"btn btn-primary"}>
                        {Strings.Buy}
                    </Link>
                </li>
            </ul>
        </div>;
    }
}
// class StarterPackBonus extends React.Component {
//
//     renderInternal() {
//         const item = this.props.item;
//         const type = this.props.item.type;
//         if("RESOURCE" === type) {
//             const resource = gd.findResource(item.resource);
//             return <Wrapper>{formatNumber(item.amount)} x {resource.name}</Wrapper>;
//         } else if("BUILDING" === type) {
//             const b = gd.findBuilding(item.buildingObject);
//             return b.name;
//         } else if("ALLOWANCES" === type){
//             return <Wrapper>{formatNumber(item.amount)} x {messages.Allowance}</Wrapper>
//         } else if("MONEY" === type){
//             return <Wrapper>{formatNumber(item.amount)} x {messages.Binars}</Wrapper>
//         }
//         return "";
//     }
//     render() {
//         return <li>{this.renderInternal()}</li>
//     }
// }
//
//
// class StarterPackBonuses extends React.Component {
//
//     constructor(props){
//         super(props);
//         this.state = {bonuses:this.regroupData()};
//     }
//
//
//     regroupData() {
//         const buildings = [];
//         const regionBuildings = {};
//         const other = [];
//         const l  = this.props.data;
//         for(let i =0; i < l.length; i++) {
//             const b = l[i];
//             if("BUILDING" !== b.type) {
//                 other.push(b);
//             } else {
//                 if(b.region) {
//                     if(!regionBuildings[b.region]) {
//                         regionBuildings[b.region] = [];
//                     }
//                     regionBuildings[b.region].push(b);
//                 } else {
//                     buildings.push(b);
//                 }
//             }
//
//         }
//         return {
//             other:other,
//             buildings:buildings,
//             regionBuildings:regionBuildings
//         };
//     }
//
//     renderItems(items) {
//         const arr = [];
//         for(let i = 0; i < items.length; i++) {
//             const item = items[i];
//             arr.push(<StarterPackBonus item={item} key={i}/>)
//         }
//         return arr;
//     }
//
//     renderRegionalBuildings() {
//         const arr = [];
//         let a = 0;
//         for(let i in  this.state.bonuses.regionBuildings) {
//             const b = this.state.bonuses.regionBuildings[i];
//             arr.push(<li className={"grey"} key={a++}>{i} *</li>);
//             arr.push(<Wrapper key={a++}>{this.renderItems(b)}</Wrapper>);
//         }
//         return arr;
//     }
//
//     render() {
//         //<div className="separator-small"/>
//         return <Wrapper>
//             <li className={"grey"}>{messages.Resources}</li>
//             {this.renderItems(this.state.bonuses.other)}
//             <li className={"grey"}>{messages.Buildings}</li>
//             {this.renderItems(this.state.bonuses.buildings)}
//             {this.renderRegionalBuildings()}
//         </Wrapper>;
//     }
// }
// class StarterPackItem extends React.Component {
//     render() {
//         const item = this.props.item;
//         const imageName = item.name.toLowerCase().replace(" ", "_");
//         return <div className="col-lg-4 col-md-4 col-sm-6 col-xs-6">
//             {/*<img src={ABSOLUTE_URL + "/resources/images/starter-packs/" + imageName + ".png"} width="100"/>*/}
//
//             <ul className="price">
//                 <li className="header">{item.name}</li>
//                 <li>{formatPrice(item.price.result)}</li>
//                 <StarterPackBonuses data={item.bonuses} name={item.name}/>
//                 <li className="grey">
//                     <Link href={()=>{this.props.onClick(item)}} className={"btn btn-primary"}>
//                         {messages.Buy}
//                     </Link>
//                 </li>
//             </ul>
//         </div>;
//     }
// }
// class StarterPacks extends React.Component {
//     buildPacks() {
//         const arr = [];
//         for(let i =0; i < this.props.packs.length; i++) {
//             const pack = this.props.packs[i];
//             arr.push(<StarterPackItem key={i} item={pack} onClick={this.props.onClick}/>)
//         }
//         return arr;
//     }
//
//
//     render() {
//         return <Wrapper>
//             <div className="row">
//                 {this.buildPacks()}
//             </div>
//             <div className={"row"}>
//                 <div className="col-lg-4 col-md-4 col-sm-6 col-xs-6">
//                     * Ve hře jsou prozatím 2 regiony. Koupí startovního balíčku obdržíte začáteční budovy pro daný region, který si vyberete ve hře.
//                 </div>
//             </div>
//         </Wrapper>;
//     }
//
// }