import {exist} from "./common/utils/Util";

interface AppConfig {
    logportUrl:string;
    logportRegisterUrl:string;
    backendUrl:string;
    backendClientId:string;
}

const defaultClientId = "cmFhbDpyYWFs";
const useProxy = exist(process.env.REACT_APP_CMS_USE_PROXY) ? process.env.REACT_APP_CMS_USE_PROXY === "true" : true;
let defaultConfig: AppConfig = {
    logportUrl:process.env.REACT_APP_LOGPORT_URL,
    logportRegisterUrl:process.env.REACT_APP_LOGPORT_URL,
    backendUrl: process.env.REACT_APP_CMS_BACKEND_URL || "",
    backendClientId: process.env.REACT_APP_CMS_CLIENT_ID || defaultClientId
};
if (process.env.NODE_ENV === 'development' && useProxy) {
    defaultConfig.backendUrl = "";
    defaultConfig.backendClientId = process.env.REACT_APP_CMS_CLIENT_ID || defaultClientId;
}

export default {...defaultConfig};