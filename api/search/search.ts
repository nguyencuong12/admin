import axios from "../axios";

let url = "/search";
const Search = {
  search: async (searchField: string) => {
    return await axios({
      method: "GET",
      url: url,
      params: {
        searchField: searchField,
      },
    });
  },
};
export default Search;
