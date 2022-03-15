import { default as axios } from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
});
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    console.log("ERR REQUEST", err);
  },
);
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    console.log("ERR RESPONSE", err);
  },
);
export default instance;
