interface AppConfig {
    logportUrl:string;
    logportRegisterUrl:string;
    backendUrl:string;
    backendClientId:string;
}

const defaultConfig:AppConfig = {
    logportUrl:process.env.REACT_APP_LOGPORT_URL,
    logportRegisterUrl:process.env.REACT_APP_LOGPORT_URL,
    backendUrl:process.env.REACT_APP_BINARIA_BACKEND_URL,
    backendClientId:process.env.REACT_APP_BINARIA_API_KEY
};

export default {...defaultConfig};