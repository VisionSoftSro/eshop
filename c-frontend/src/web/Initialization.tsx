import React from 'react';
import ReactDOM from 'react-dom';
import './Global';
import { Provider } from 'react-redux';
import 'moment/locale/cs';
import Root from "./template/Root";
import {mainStore} from './redux/WebRedux';
import config from '../Config';
//localizations
import * as Locs from "../common/Localization";
import {setConfig} from "../common/utils/HttpUtils";
import {saveState} from "../common/redux/ReduxStoreStorage";
import {CartState} from "./redux/reducers/cart/CartReducer";
const i18n = Locs.init(require('./i18n/all').default);
window.Strings = i18n;

setConfig({
    apiUrl:`${config.backendUrl}/api/`
});
// ReactDOM.render(<Provider store={store}><Root /></Provider>, document.getElementById('root'));
ReactDOM.render(<Provider store={mainStore}><Root /></Provider>, document.getElementById('root'));
