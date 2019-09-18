import React from 'react';
import ReactDOM from 'react-dom';
import './Global';
import './assets/main.scss';
import * as Locs from "../common/Localization";
import { Provider } from 'react-redux';
import DataStorage from "../common/DataStorage";
import moment from 'moment';
import 'moment/locale/cs';
import Root from "./pages/Root";
import store from './redux/WebRedux';
const i18n = Locs.init(require('./i18n/all'));
export const ChangeLocale = (locale:string) => {
    i18n.setLanguage(locale);
    moment.locale(locale);
    DataStorage.set("locale", locale);
};



const testEnvVars = () => {
    return process.env.REACT_APP_BINARIA_BACKEND_URL&&process.env.REACT_APP_LOGPORT_URL&&process.env.REACT_APP_BINARIA_API_KEY;
};

if(testEnvVars()) {
    ReactDOM.render(<Provider store={store}><Root /></Provider>, document.getElementById('root'));
} else {
    ReactDOM.render(<div>App is not properly configured. Run app with env variable <strong>REACT_APP_RAAL_BACKEND_URL</strong> set</div>, document.getElementById('root'));
}

ChangeLocale(DataStorage.get("locale")||"cs");