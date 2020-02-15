import * as React from "react";
import {AssetCache} from "../../AssetCache";
import {CSSProperties} from "react";

export function StockEmoji({stock, style}:{stock:number, style:CSSProperties}) {
    return (
        <div style={style}>
            <img src={stock>0?AssetCache.Image.Happy:AssetCache.Image.Sad} />
        </div>
    )
}
