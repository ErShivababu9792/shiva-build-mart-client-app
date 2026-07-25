import desktopConfig from "./desktopConfig";
import mobileConfig from "./mobileConfig";

const hostname = window.location.hostname;

const config =
  hostname === "localhost"
    ? desktopConfig
    : {
        ...mobileConfig,
        API_URL: "https://shiva-build-mart-api.onrender.com/api",
      };

export default config;