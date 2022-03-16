import { default as axios, AxiosError } from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
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
    window.alert(err.response?.data.error);
    // console.error(err.response.data.message);
    // window.alert(err.data);
    // console.log("ERR RESPONSE", err.message);
  },
);
export default instance;
