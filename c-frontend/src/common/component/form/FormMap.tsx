import {FunctionalMap, FunctionMapFunctionsExposed, MapData} from "../map/FunctionalMap";
import React, {FunctionComponent, useEffect, useRef, useState} from "react";
import {CustomFieldComponentProps} from "./FormFieldInterface";
import {LatLng} from "leaflet";
import {Link} from "../Link";
import Modal from "react-bootstrap/Modal";

type FormDataToMapData<T> = (data:T)=>MapData
type MapDataToFormData<T> = (formData:MapData)=>T
export type MapDataConverters<T> = [FormDataToMapData<T>, MapDataToFormData<T>]

export type FormMapOptions<T = any> = {
    latLng?:LatLng,
    zoom?:number,
    onChanged?(data:T):void,
    maxPoints?:number,
    converters?():MapDataConverters<T>,
}

function useConverters<T extends any = MapData>(options:FormMapOptions<T>):MapDataConverters<T> {
    if((options || null) !== null && options.converters) {
        return options.converters();
    }
    return [
        data => data as unknown as MapData,
        mapData => mapData as unknown as T
    ];
}
const defaultZoom = 10;
const defaultPosition = new LatLng(54.040161, 14.489570);

export function FormMap<T>(props:CustomFieldComponentProps<T, FormMapOptions<T>>) {
    const [hidden, setHidden] = useState(true);
    const [toMapData, toFormData] = useConverters(props.options);
    const points = toMapData(props.value);
    //ref for getting leaflet object
    const mapRef = useRef<FunctionMapFunctionsExposed>();
    return (
        <>
            <Link className={"form-control"} href={() => setHidden(!hidden)}>{Strings[`ShowHide.${hidden}`]}</Link>
            <Modal show={!hidden} onHide={() => setHidden(true)} size="xl" onShow={()=>mapRef.current.leafletFunctions().leaflet().invalidateSize()}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FunctionalMap latLng={props.options.latLng || defaultPosition} ref={mapRef} points={points} onPointsChanged={points=>{
                        const formPoints:T = toFormData(points);
                        props.onValueChanged(formPoints);
                        props.options.onChanged&&props.options.onChanged(formPoints);
                    }} zoom={props.options.zoom || defaultZoom} maxPoints={props.options.maxPoints}/>
                </Modal.Body>
            </Modal>
        </>
    );
}

FormMap.defaultProps = {
  options:{}
};