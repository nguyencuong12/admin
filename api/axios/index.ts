import { default as axios, AxiosError } from "axios";
import SweetAlert2 from "../../utils/sweetAlert";

// let url = "https://api.sashimeomeo.com";
let url = process.env.HOST_API;

const instance = axios.create({
  baseURL: url,
});
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (err: AxiosError) => {
    console.log("ERR REQUEST", err);
  },
);
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err: AxiosError) => {
    switch (err.response?.status) {
      case 401: {
        // console.log("401 CALL !!");
        SweetAlert2.accessDenide();

        break;
      }
      default: {
        window.alert(err.response?.data.error);
        break;
      }
    }

    // console.error(err.response.data.message);
    // window.alert(err.data);
    // console.log("ERR RESPONSE", err.message);
  },
);
export default instance;
