import axios from "./axios";
import sweetalert2 from "./sweetalert2";
import qs from "./qs";
export default {
  install: (app) => {
    app.provide("$axios", axios);
    app.provide("$swal", sweetalert2);
    app.provide("$qs", qs);
  },
};
