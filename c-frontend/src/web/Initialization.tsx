import React from 'react';
import ReactDOM from 'react-dom';
import './Global';
import { Provider } from 'react-redux';
import 'moment/locale/cs';
import Root from "./decorator/Root";
import store from './redux/WebRedux';

//localizations
import * as Locs from "../common/Localization";
const i18n = Locs.init(require('./i18n/all').default);
window.Strings = i18n;
// ReactDOM.render(<Provider store={store}><Root /></Provider>, document.getElementById('root'));
ReactDOM.render(<Provider store={store}><Root /></Provider>, document.getElementById('root'));
