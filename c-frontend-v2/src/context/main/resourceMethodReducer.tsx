import {DataAction} from "./actions";
export default function <T> (state:T, action:DataAction<T>):T {
    switch (action.type) {
        case 'set':
            return action.data;
        default:
            throw new Error();
    }
}
