import axios from "axios";
const my_axios = axios.create({
  baseURL: "https://api.amorstay.com.vn/api/v1/",
});
export default my_axios;
// export default {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   install: (app, option) => {
//     app.provide("$axios", my_axios);
//   },
// };
