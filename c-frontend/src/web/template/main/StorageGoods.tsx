import React, {forwardRef, useImperativeHandle, useRef, useState} from "react";
import {Typography} from "@material-ui/core";
import MaterialTable from "material-table";
import {useGoodsQuery} from "../../api/StorageApi";
import {Form, FormButton, FormField} from "../../../common/component/form/Form";
import {GoodsDto} from "../../dto/GoodsDto";
import ModalHeader from "react-bootstrap/ModalHeader";
import {Modal, ModalBody} from "react-bootstrap";

type GoodsFormExposed = {
    setData(data: GoodsDto): void
}
const GoodsForm = forwardRef<GoodsFormExposed, { passcode: string, onResult: () => void }>(({passcode, onResult}, ref) => {
    const [data, setData] = useState<GoodsDto>(null);
    useImperativeHandle(ref, () => {
        return {
            setData
        }
    });
    return (
        <Modal show={data !== null} onHide={() => setData(null)} size={"lg"}>
            <ModalHeader closeButton>
                {data && data.name}
            </ModalHeader>
            <ModalBody>
                {data&&(
                    <Form<GoodsDto> onResult={()=>{
                        onResult();
                        setData(null);
                        }} data={data} url={`storage/goods/${data.id}`} inputGroupEnabled={false}
                                    simpleLabel={true} requestInit={{method: "POST", headers: {"passcode": passcode}}}>
                        <FormField type={"number"} name={"price"} title={"Cena"}/>
                        <FormField type={"text"} name={"name"} title={"Název"}/>
                        <FormField type={"textarea"} name={"description"} title={"Popis"} wysiwyg/>
                        <FormField type={"checkbox"} name={"published"} title={"Publikovat"}/>
                        <FormButton>Uložit</FormButton>
                    </Form>
                )}
            </ModalBody>
        </Modal>
    );
});

export function Goods({passcode}: { passcode: string }) {
    const {listQuery} = useGoodsQuery(passcode);
    const formRef = useRef<GoodsFormExposed>(null);
    const tableRef = useRef();
    return (
        <>
            <Typography variant={"h3"}>Zboží</Typography>
            <GoodsForm onResult={async () => {
                // @ts-ignore
                tableRef.current.onQueryChange();
            }} passcode={passcode} ref={formRef}/>
            <MaterialTable<GoodsDto> columns={[
                {field: "id", title: "ID"},
                {field: "code", title: "code"},
                {field: "name", title: "name"},
                {field: "price", title: "cena"},
                {field: "published", title: "Publikováno", render:data => data.published ? <i className={"fa fa-check"}/> : <i className={"fa fa-times"}/>}
            ]} data={listQuery} actions={[
                {
                    icon: "edit",
                    onClick: (e, row) => {
                        formRef.current.setData(row as GoodsDto);
                    }
                }
            ]} options={{search: false}} tableRef={tableRef}/>
        </>
    );
}