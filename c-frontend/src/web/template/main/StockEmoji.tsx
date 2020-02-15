import * as React from "react";
import {AssetCache} from "../../AssetCache";

export function StockEmoji({stock}:{stock:number}) {
    return (
        <div style={{top:0, right:0, position:"absolute"}}>
            <img src={stock>0?AssetCache.Image.Happy:AssetCache.Image.Sad} />
        </div>
    )
}
