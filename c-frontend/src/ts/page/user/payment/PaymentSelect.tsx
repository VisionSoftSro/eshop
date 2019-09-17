import * as React from 'react';
import config from '../../../../Config';
import cs from 'classnames';
import Wrapper from "../../../component/Wrapper";
import {Region} from "../../../model/Region";
import {currentLocale, formatPrice, GenericMap} from "../../../utils/Util";
import {SwalIcon} from "../../../component/SawlIcon";
import {Link} from "../../../component/Link";
import {TokenStore} from "../../../TokenStore";
import {httpEndpoint, httpEndpointList} from "../../../utils/HttpUtils";
import {Transaction} from "../../../model/Transaction";
import {StompComponent, SubscribeConfig} from "../../../component/StompComponent";
import {connect} from "react-redux";
import {PaymentType} from "../../../model/PaymentType";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as faIcon from "@fortawesome/free-solid-svg-icons";
import * as faBrand from "@fortawesome/free-brands-svg-icons";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {ReducersState} from "../../../redux/Reducers";
import {WebsocketState} from "../../../redux/reducers/websocket/WebsocketReducer";

const PAYMENT_STATE_PROGRESS = "PROGRESS";
const PAYMENT_STATE_FAILED = "FAILED";
const PAYMENT_STATE_SUCCESS = "SUCCESS";

const PaymentTypeIcon:GenericMap<IconProp> = {
    "paypal": faBrand.faPaypal,
    "fio": faIcon.faCreditCard,
    "dummy": faIcon.faDumpster,
    "braintree": faIcon.faBrain
};


interface PaymentTypeProps {
    paymentType:PaymentType
    purchasableItem:any;
    processTransaction:(data:{paymentType:PaymentType})=>void;
}

class PaymentTypeComp extends React.Component<PaymentTypeProps> {

    choose = () => {
        this.props.processTransaction({paymentType: this.props.paymentType});
    };

    render() {
        const title = Strings[`payments.${this.props.paymentType.name}.title`];
        return <Link href={this.choose}>
            <p>
                <FontAwesomeIcon icon={PaymentTypeIcon[this.props.paymentType.name]}/>
            </p>
            <p className="title"><span className="underline-text">{title}</span></p>
        </Link>;
    }

}

interface PaymentProgressProps {
    state?:PaymentSelectState;
    amount?:number;
    item?:any;
    region?:Region;
    onPaymentResult?:(result:boolean)=>void;
    onCancel:()=>void;
    processTransaction:(data:{storno?:boolean, paymentType?:PaymentType})=>void;
}

class PaymentProgress extends React.Component<PaymentProgressProps> {

    state:PaymentSelectState = this.props.state;

    componentDidMount() {

    }


    renderState() {
        if (PAYMENT_STATE_PROGRESS === this.props.state.paymentState) {
            return this.renderProgress();
        } else if (PAYMENT_STATE_SUCCESS === this.props.state.paymentState) {
            return <div className={"row text-center"}>
                <div>
                    <SwalIcon type="success"/>
                </div>
                <h3 className={"highlight"}>{Strings.PaymentWereSuccessfull}</h3>
                <div>
                    <Link href={() => {
                        this.props.onPaymentResult(true);
                    }}>{Strings.Continue}</Link>
                </div>
            </div>;
        } else if (PAYMENT_STATE_FAILED === this.props.state.paymentState) {
            return <div className={"row text-center"}>
                <div>
                    <SwalIcon type="error"/>
                </div>
                <span>{Strings.PaymentWereFailed}</span>
                {this.props.state.failingStrings && <h5 className={"text-danger"}>{this.props.state.failingStrings}</h5>}
                <div>
                    <Link href={() => {
                        this.props.onPaymentResult(false)
                    }}>{Strings.Again}</Link>
                </div>
            </div>;
        } else {
            return <div className={"row text-center"}>
                <h3>{Strings.PaymentInProgres}</h3>
            </div>;
        }
    }

    renderItem() {
        const amount = this.props.amount !== null ? this.props.amount : this.props.item.amount;
        return <div>
            <div className="hr-text hr-text-left m-t-0 m-b-1">
                <h6 className="text-white"><strong>{Strings[this.props.item.type]}</strong></h6>
            </div>
            <table className="table table-condensed">
                <tbody>
                <tr>
                    <td className="v-a-m b-t-0">{Strings.Name}</td>
                    <td className="v-a-m b-t-0 text-right text-white">{this.props.item.localizedName && Strings[this.props.item.name] || this.props.item.name}</td>
                </tr>
                <tr>
                    <td className="v-a-m">{Strings.Price}</td>
                    <td className="v-a-m text-right text-white">{formatPrice(this.props.item.price.result)}</td>
                </tr>
                {this.props.region &&
                <tr>
                    <td className="v-a-m">{Strings.State}</td>
                    <td className="v-a-m text-right text-white">{this.props.region.name}</td>
                </tr>
                }
                {
                    amount &&
                    <tr>
                        <td className="v-a-m">{Strings.Amount}</td>
                        <td className="v-a-m text-right text-white">{amount.toLocaleString(currentLocale())}</td>
                    </tr>

                }
                </tbody>
            </table>
        </div>;
    }

    renderPaymentTypes() {
        const items = [];
        const length = this.state.data.length;
        //nechce se mi premejslet
        let offset = 0;
        if(length === 3) {
            offset = 2;
        }
        if(length === 2) {
            offset = 3;
        }
        if(length === 1) {
            offset = 5;
        }
        let offsetClass = length * 3 === 12?"":"col-md-offset-"+offset;
        for (let i = 0; i < length; i++) {
            if(i > 0) offsetClass = "";
            let item = this.state.data[i];
            items.push(<div key={i} className={cs("col-md-3 text-center", offsetClass)}><PaymentTypeComp processTransaction={this.props.processTransaction} paymentType={item} purchasableItem={this.props.item}/></div>)
        }
        return items;
    }

    renderProgress() {
        return <div className={"row text-center"}>
            <h3>{Strings.CompleteYourPayment}</h3>
            <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw text-highlight"/>
        </div>;
    }

    renderExistedTransaction() {
        return <div className={"row text-center"}>
            <SwalIcon type={"warning"}/>
            <h3>{Strings.TransactionInProgress}</h3>
            {this.props.state.existedTransaction.haveContinue && <Link className={"primary"} href={() => {
                this.props.processTransaction({storno: false})
            }}>Strings.Continue</Link>}
            <Link className={"danger"} href={() => {
                this.props.processTransaction({storno: true})
            }} >{Strings.Storno}</Link>
        </div>;
    }


    getContent() {
        if (this.props.state.existedTransaction) {
            return this.renderExistedTransaction();
        }
        if (this.props.state.paymentState !== null) {
            return this.renderState();
        }
        if (this.props.state.data !== null) {
            return this.renderPaymentTypes();
        }
        return null;
    }

    render() {
        return <div className="view" id="how-we-work">
            <div className="content colors-e">
                <Link href={this.props.onCancel} className={"cross"}/>
                <div className="container">
                    <h3>{Strings.ChoosePaymentType}</h3>
                    <div className="row">
                        <div className="col-md-6 col-md-offset-3">
                            {this.renderItem()}
                        </div>
                    </div>
                    <div className="row icon-set">
                        {this.getContent()}
                    </div>
                </div>
            </div>
        </div>

        // return <div className="row">
        //     <div className={"col-md-4"}>{this.renderItem()}</div>
        //     <div className={"col-md-8"}>{this.getContent()}</div>
        // </div>
    }

}

interface PaymentSelectProps extends WebsocketState {
    item:any;
    amount?:number;
    onResult:(result:boolean)=>void;
    onEvent?:(data:Item)=>void;
    onCancel:()=>void;
    region?:any;
}

class PaymentSelectState {
    data:Array<PaymentType> = null;
    paymentState:any = null;
    existedTransaction:any = null;
    failingStrings:string = null;
}

// type Transaction = {transactionId:any, transactionAlreadyExist:boolean}
type Item = {result:string, msg:string};

class PaymentPage extends StompComponent<PaymentSelectProps, PaymentSelectState> {

    state = new PaymentSelectState();
    paymentWindow:any = null;
    transactionSubscribe:SubscribeConfig<Item> = null;

    componentDidMount() {
        super.componentDidMount();
        this.loadExistedTransaction();
    }

    addSubscribers() {
        this.addSubscriber<Transaction>("transaction/", data => {
            if (data.transactionId) {
                this.subscribeToTransaction(data.transactionId);
            } else if (data.transactionAlreadyExist) {
                if(this.paymentWindow){this.paymentWindow.close()}
                this.loadExistedTransaction();
            }

        }, true);
    }

    subscribeToTransaction(tid:string) {
        if (this.transactionSubscribe !== null) {
            this.transactionSubscribe.unsubscribe().remove();
        }
        this.transactionSubscribe = this.addSubscriber<Item>("transaction/" + tid, data => {
            const result = data.result;
            if (result === "SUCCESS") {
                this.setState({paymentState: PAYMENT_STATE_SUCCESS, existedTransaction: null});
            } else if (result === "FAILED") {
                this.setState({
                    failingStrings: Strings[data.msg],
                    paymentState: PAYMENT_STATE_FAILED,
                    existedTransaction: null
                });
            } else if (result === "STORNO") {
                this.reloadTypes().then(()=>{});
            }
            this.props.onEvent(data);
            this.paymentWindow = null;
        }, true);
    }

    processTransaction(options:any) {
        let url;
        const token = TokenStore.getToken();
        if (options.paymentType) {
            let amount = this.props.amount !== null ? this.props.amount : this.props.item.amount;
            url = `${config.backendUrl}/payment/transaction/?item=${this.props.item.id}&paymentType=${options.paymentType.id}&region=${this.props.region ? this.props.region.id : ""}&amount=${amount||""}&__token=${token.accessToken}`
        } else if (this.state.existedTransaction) {
            url = `${config.backendUrl}/payment/transaction/continue?storno=${options.storno}&__token=${token.accessToken}`;
        } else {
            console.log("No valid option to process transaction");
            return;
        }
        this.paymentWindow = window.open(url, "", "width=800,height=600,left=0,top=0,resizable=yes,scrollbars=yes");
        window.onbeforeunload = e => {
            if (this.paymentWindow) this.paymentWindow.close();
            return null
        };
        this.startPaymentWindowChecking();
        this.setState({paymentState: PAYMENT_STATE_PROGRESS, existedTransaction: null});
    }

    startPaymentWindowChecking = () => {
        if (this.paymentWindow === null) {
            return;
        }
        if (this.paymentWindow.closed) {
            this.paymentWindow = null;
            window.onbeforeunload = null;
            this.loadExistedTransaction();
        } else {
            setTimeout(this.startPaymentWindowChecking, 10);
        }

    };

    loadExistedTransaction() {
        httpEndpoint<Transaction>(Transaction, "payment/transaction/existed-transaction").then(result => {
            const data = result.data;
            this.reloadTypes().then(() => {
                if (data) {
                    this.subscribeToTransaction(data.id);
                    this.setState({existedTransaction: data});
                }
            })
        });
    }

    async reloadTypes() {
        const result = await httpEndpointList<PaymentType>(PaymentType, "payment/transaction/types");
        const data = result.data;
        this.setState({data: data.list, paymentState: null, existedTransaction: null});
    }


    onPaymentResult = (success:boolean) => {
        if (!success) {
            this.setState({paymentState: null});
        }
        this.props.onResult(success);
    };


    render() {
        if (this.state.existedTransaction || this.state.paymentState || this.state.data) {
            return <PaymentProgress onPaymentResult={this.onPaymentResult} processTransaction={this.processTransaction.bind(this)} item={this.props.item} onCancel={()=>{
                if(this.paymentWindow){this.paymentWindow.close()}
                this.props.onCancel();
            }} state={this.state}/>
        }
        return null;

    }
}
export const PaymentSelect = connect((state:ReducersState) => state.websocket)(PaymentPage);