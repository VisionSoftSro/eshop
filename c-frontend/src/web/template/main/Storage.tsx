import * as React from "react";
import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import {Form, FormButton, FormField, FormHttpResponse, FormInputType} from "../../../common/component/form/Form";
import Wrapper from "../../../common/component/Wrapper";
import {httpEndpoint} from "../../../common/utils/HttpUtils";
import {OrderDto, OrderStatus} from "../../dto/OrderDto";
import {productImageUrl} from "../../TemplateUtil";
import {Price} from "../../dto/GoodsDto";
import {Modal, ModalBody} from "react-bootstrap";
import MaterialTable from "material-table";
import {getHashValue} from "../../../common/utils/Util";
import ModalHeader from "react-bootstrap/ModalHeader";
import {useOrdersQuery} from "../../api/StorageApi";
import {Goods} from "./StorageGoods";
import {AppBar, Box, Tab, Tabs, Typography} from "@material-ui/core";

class StorageData {
    trackingNumber:string
}

interface AccessedFormState {
    id?:number
    detail?:OrderDto
}



type OrderFormExposed = {
    setOrder(order:OrderDto):void
}
const OrderForm = forwardRef<OrderFormExposed, {passcode:string, onResult:()=>void}>(({passcode, onResult}, ref) => {
    const [order, setOrder] = useState(null as OrderDto);
    useImperativeHandle(ref, ()=>{
       return {
           setOrder(o) {
               setOrder(o);
           }
       }
    });
    return (
        <Modal show={order !== null} onHide={()=>setOrder(null)} size={"lg"}>
            <ModalHeader closeButton>
                {order&&order.id}
            </ModalHeader>
            <ModalBody>
                {order&&(
                    <Form<StorageData> onResult={()=>{
                        onResult();
                        setOrder(null);
                    }} data={new StorageData()} url={`storage/save/${order.id}`} inputGroupEnabled={false} simpleLabel={true} requestInit={{method:"POST", headers:{"passcode":passcode}}}>
                        <table className="table table-bordered mb-30">
                            <thead>
                            <tr>
                                <th scope="col">Obrázek</th>
                                <th scope="col">Produkt</th>
                                <th scope="col">Cena za kus</th>
                                <th scope="col">Počet</th>
                                <th scope="col">Celkem</th>
                            </tr>
                            </thead>
                            <tbody>
                            {order.goods.map(i => (
                                <tr key={i.goods.id}>
                                    <td>
                                        <img width={50} src={productImageUrl(i.goods.code, 1)} alt="Product"/>
                                    </td>
                                    <td>
                                        {/*<a href="#">Bluetooth Speaker</a>*/}
                                        {i.goods.name}
                                    </td>
                                    <td>{i.goods.getPrice().format()}</td>
                                    <td>
                                        {i.pcs} ks
                                    </td>
                                    <td>{new Price(i.goods.price * i.pcs, 'CZK').format()}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        {order.status===OrderStatus.Invoice&&(
                            <div className={"row"}>
                                <div className={"col-md-12"}>
                                    <FormField name={"trackingUrl"} title={"TrackingUrl"} type={FormInputType.Text} />
                                </div>
                            </div>
                        )}
                        <div className={"row"}>
                            <div className={"col-md-12"}>
                                {order.status===OrderStatus.New&&<FormButton className={"btn btn-small btn-success mr-1"} type={"invoice"}>Vytvořit fakturu</FormButton>}
                                {order.status===OrderStatus.Invoice&&<FormButton className={"btn btn-small btn-success mr-1"} type={"ship"}>Potvrdit odeslaní</FormButton>}
                                {
                                    (order.status!==OrderStatus.Shipped && order.status!==OrderStatus.Cancel)&&(
                                       <>
                                           <FormButton className={"btn btn-small btn-danger mr-1"} type={"cancel"}>Zrusit</FormButton>
                                           <FormButton className={"btn btn-small btn-warning mr-1"} type={"cancelWithEmail"}>Zrusit a odeslat email</FormButton>
                                       </>
                                    )
                                }
                            </div>
                        </div>
                    </Form>
                )}
            </ModalBody>
        </Modal>
    );
});




function Orders({passcode}:{passcode:string}) {
    const [doQuery] = useOrdersQuery(passcode);
    const formRef = useRef(null as OrderFormExposed);
    const tableRef = useRef();
    useEffect(()=>{
        const orderId = getHashValue("orderId");
        if(orderId) {
            httpEndpoint<OrderDto>(OrderDto, `storage/${orderId}`, {method:"GET", headers:{"passcode":passcode}}).then(result=>{
                console.log("detail order=", result);
                if(result.data) {
                    formRef.current.setOrder(result.data);
                }
            });
        }
    }, []);

    return (
        <>
            <OrderForm onResult={async()=>{
                // @ts-ignore
                tableRef.current.onQueryChange();
            }} passcode={passcode} ref={formRef} />
            <MaterialTable tableRef={tableRef} columns={[
                {field:"id", title:"ID"},
                {field:"status", title:"status", lookup:OrderStatus},
                {field:"email", title:"email"}
            ]} data={doQuery} actions={[
                {
                    icon:"edit",
                    onClick:(e, row)=>{
                        formRef.current.setOrder(row as OrderDto);
                    }
                }
            ]} options={{search:false, filtering:true}} title={"Objednávky"}/>
        </>
    )
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}
function TabPanel(props:TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
function AccessedForm({passcode}:{passcode:string}) {
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };
    return (
        <>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Objednávky" {...a11yProps(0)} />
                    <Tab label="Zboží" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Orders passcode={passcode} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Goods passcode={passcode} />
            </TabPanel>
        </>
    );
}

interface PasscodeState {
    passcode?:string
}

class PasscodeResult {
    value:boolean = false;
    passcode:string = "";
}
export class StorageForm extends React.Component<any, PasscodeState> {

    state:PasscodeState = {passcode:null};

    passCodeResult = (result:FormHttpResponse<PasscodeResult>) => {
        if(result&&result.data&&result.data.value) {
            this.setState({passcode:result.data.passcode})
        }
    };

    render() {
        return <section className="best-selling-products-area mb-70" >
            <div className="container p-5" style={{paddingTop:20}}>
                {
                    this.state.passcode&&<AccessedForm passcode={this.state.passcode}/>||(
                        <Form<PasscodeResult> data={new PasscodeResult()} url={"storage/passcode"} onResult={this.passCodeResult} inputGroupEnabled={false} simpleLabel={true}>
                            <FormField name={"passcode"} title={"Heslo"} type={"password"} />
                            <FormButton className={"btn btn-small btn-primary"}>Odemknout</FormButton>
                        </Form>
                    )
                }
            </div>
        </section>;
    }

}