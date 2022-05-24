import axios from "../axios";

const url = "/auth";

const Auth_API = {
  login: (formData: any) => {
    return axios({
      url: url + "/login",
      data: formData,
      method: "POST",
      // data:
    });
  },
};
export default Auth_API;
