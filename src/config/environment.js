import desktopConfig from "./desktopConfig";
import mobileConfig from "./mobileConfig";


const hostname = window.location.hostname;


const config = hostname === "localhost"
    ? desktopConfig
    : mobileConfig;


export default config;