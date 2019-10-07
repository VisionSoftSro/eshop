import React from 'react';
import ReactDOM from 'react-dom';
import './Global';
import { Provider } from 'react-redux';
import 'moment/locale/cs';
import Root from "./pages/Root";
import store from './redux/WebRedux';
import './assets/scss/main.scss';

//localizations
import * as Locs from "../common/Localization";
import {WebsocketTest} from "./WebsocketTest";
const i18n = Locs.init(require('./i18n/all').default);
window.Strings = i18n;
// ReactDOM.render(<Provider store={store}><Root /></Provider>, document.getElementById('root'));
ReactDOM.render(<Provider store={store}><Root /></Provider>, document.getElementById('root'));
