import React, {ChangeEvent, useEffect, useState} from "react";
import {clamp} from "../../common/utils/Util";

type QuantityProps = {
    pcs:number;
    max:number;
    min?:number;
    setQuantity:(value:number)=>void
}
export function Quantity({pcs, setQuantity, max, min}:QuantityProps) {

    const [pcs2, setPcs2] = useState(pcs);

    useEffect(()=>{
        setQuantity(pcs2);
    }, [pcs2]);

    return (
        <div className="quantity">
            <span className="qty-minus" onClick={()=>setPcs2(clamp(pcs-1, min, max||min))}><i className="fa fa-minus" aria-hidden="true"/></span>
            <input className="qty-text" type="number" value={pcs} onChange={e=>setPcs2(clamp(parseInt(e.target.value), min, max||min))}/>
            <span className="qty-plus" onClick={()=>setPcs2(clamp(pcs+1, min, max||min))}><i className="fa fa-plus" aria-hidden="true"/></span>
        </div>
    );
}

Quantity.defaultProps = {
    min: 0
};
