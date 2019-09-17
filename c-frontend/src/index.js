//IE fix
import "babel-polyfill";

import React from 'react';
import ReactDOM from 'react-dom';
import './Global';
import './assets/main.scss';
import * as serviceWorker from './serviceWorker';
import i18n from "./i18n/Localization";
import moment from 'moment';
import 'moment/locale/cs';

import {MainPage} from "./ts/page/Root";
import DataStorage from "./ts/DataStorage";
export const ChangeLocale = locale => {
    i18n.setLanguage(locale);
    moment.locale(locale);
    DataStorage.set("locale", locale);
};

import { Provider } from 'react-redux';
import store from './ts/redux/ReduxStore';
import {DeleteThis} from "./DeleteThis";

const testEnvVars = () => {
    return process.env.REACT_APP_BINARIA_BACKEND_URL&&process.env.REACT_APP_LOGPORT_URL&&process.env.REACT_APP_BINARIA_API_KEY;
};

if(testEnvVars()) {
    // ReactDOM.render(<Provider store={store}><MainPage /></Provider>, document.getElementById('root'));
    ReactDOM.render(<div><DeleteThis /></div>, document.getElementById('root'));
} else {
    ReactDOM.render(<div>App is not properly configured. Run app with env variable <strong>REACT_APP_RAAL_BACKEND_URL</strong> set</div>, document.getElementById('root'));
}

ChangeLocale(DataStorage.get("locale")||"cs");
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
