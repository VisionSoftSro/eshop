import React, {ChangeEvent} from "react";

type QuantityProps = {
    pcs:number;
    setQuantity:(value:number)=>void
}
export function Quantity({pcs, setQuantity}:QuantityProps) {

    return (
        <div className="quantity">
            <span className="qty-minus" onClick={()=>setQuantity(pcs-1)}><i className="fa fa-minus" aria-hidden="true"/></span>
            <input className="qty-text" type="number" value={pcs} onChange={e=>setQuantity(parseInt(e.target.value))}/>
            <span className="qty-plus" onClick={()=>setQuantity(pcs+1)}><i className="fa fa-plus" aria-hidden="true"/></span>
        </div>
    );
}