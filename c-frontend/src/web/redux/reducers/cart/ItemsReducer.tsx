import {Action} from "redux";
import {CartGoods, Goods} from "../../../dto/Goods";
import {JsonProperty} from "../../../../common/utils/ObjectMapper";
import {PlainReduceState} from "../../../../common/redux/Reducers";

export enum ItemsActionType {
    Show="item/show"
}

export class ItemsState {
    items?:Array<Goods> = new Array<Goods>();

    constructor(items?: Array<Goods>) {
        this.items = items || new Array<Goods>();
    }
}

export interface ItemsAction extends Action<ItemsActionType>, ItemsState {

}

export const itemsReducer = (state:ItemsState = new ItemsState(), action:ItemsAction):ItemsState => {
    if(ItemsActionType.Show === action.type) {
        return new ItemsState(action.items);
    }
    return state;
};