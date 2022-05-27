import axios from "../axios";

const url = "/admin";

const Admin_API = {
  getAD: () => {
    return axios({
      method: "get",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      url: url + "/",
    });
  },
};
export default Admin_API;
