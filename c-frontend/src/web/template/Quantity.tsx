import React, {ChangeEvent} from "react";
import {clamp} from "../../common/utils/Util";

type QuantityProps = {
    pcs:number;
    max:number;
    setQuantity:(value:number)=>void
}
export function Quantity({pcs, setQuantity, max}:QuantityProps) {

    return (
        <div className="quantity">
            <span className="qty-minus" onClick={()=>setQuantity(clamp(pcs-1, 0, max))}><i className="fa fa-minus" aria-hidden="true"/></span>
            <input className="qty-text" type="number" value={pcs} onChange={e=>setQuantity(parseInt(e.target.value))}/>
            <span className="qty-plus" onClick={()=>setQuantity(clamp(pcs+1, 0, max))}><i className="fa fa-plus" aria-hidden="true"/></span>
        </div>
    );
}