import {Action} from "redux";
import {CartGoods, Category, Goods} from "../../../dto/Goods";
import {JsonProperty} from "../../../../common/utils/ObjectMapper";
import {PlainReduceState} from "../../../../common/redux/Reducers";

export enum DataActionType {
    SetGoods="data/set-goods",
    SetCategories="data/set-categories",
    SetCategory="data/set-category"
}

export interface DataState {
    goods?:Array<Goods>;
    categories?:Array<Category>;
    currentCategory?:Category;
}

export interface DataAction extends Action<DataActionType>, DataState {

}

export const dataReducer = (state:DataState = {goods:[], categories:[], currentCategory:null}, action:DataAction):DataState => {
    if(DataActionType.SetGoods === action.type) {
        return {...state, ...{goods:action.goods}};
    } else if (DataActionType.SetCategory === action.type) {
        return {...state, ...{currentCategory:action.currentCategory}};
    } else if (DataActionType.SetCategories === action.type) {
        return {...state, ...{categories:action.categories}};
    }
    return state;
};