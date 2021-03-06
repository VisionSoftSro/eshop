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
import {setHttpConfig} from "../common/utils/HttpUtils";
import {exist} from "../common/utils/Util";
import {changeLocale} from "./redux/reducers/LocaleActions";
import {currentLocale} from "../common/utils/LocaleAccessor";
const i18n = Locs.init(require('./i18n/all').default);
window.Strings = i18n;
const loc = currentLocale();
if (!exist(loc)) {
    // @ts-ignore
    mainStore.dispatch(changeLocale("cs"))
}
setHttpConfig({
    apiUrl:`${config.backendUrl}/api/`
});
// ReactDOM.render(<Provider store={store}><Root /></Provider>, document.getElementById('root'));
ReactDOM.render(<Provider store={mainStore}><Root /></Provider>, document.getElementById('root'));
