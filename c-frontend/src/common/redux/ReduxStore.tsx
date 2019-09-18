import reducer, {CombinedState} from './Reducers';
import {applyMiddleware, createStore} from 'redux';
import thunk from "redux-thunk";
export const store:CombinedState = createStore(reducer, applyMiddleware(thunk));
export default store;