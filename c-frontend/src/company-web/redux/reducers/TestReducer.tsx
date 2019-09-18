import {Action} from "redux";
import {ReducerDispatch} from "../../../common/redux/ReducerDispatchInterfaceDeclaration";

export enum TestActionType {
    Test="test/test"
}

export interface TestState extends ReducerDispatch<TestAction> {
    value?:number
}

interface TestAction extends Action<TestActionType>, TestState {
}

export const testReducer = (state:TestState = {value:0}, action:TestAction):TestState => {
    if(TestActionType.Test === action.type) {
        return {
            value:action.value
        };
    }
    return state;
};