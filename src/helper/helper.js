// import { inject } from "vue";
import $axios from "@/plugins/axios";
import $swal from "@/plugins/sweetalert2";
import $qs from "@/plugins/qs";
import $moment from "@/plugins/moment";

export default () => {
  const token = window.localStorage.getItem("token");
  const existError = (error, key) => {
    if (error && error[key] != undefined && error[key][0] != undefined)
      return error[key][0] ? error[key][0] : false;
    return false;
  };
  const showErrorMsg = (error, msg = false) => {
    if (msg) $swal.fire("Thông báo", msg, "warning");
    else {
      if (error.response.data.msg != undefined)
        $swal.fire("Thông báo", error.response.data.msg, "warning");
      if (error.response.data.message != undefined)
        $swal.fire("Thông báo", error.response.data.message, "warning");
    }
  };
  const showSuccessMsg = (msg) => {
    $swal.fire("Thông báo", msg, "success");
  };
  const getHostOrigin = () => {
    // eslint-disable-next-line no-undef
    return window.location.protocol + "//" + window.location.host;
  };
  const saveLog = async (
    type_user = "",
    position = "",
    type = "web",
    key = ""
  ) => {
    try {
      await $axios({
        method: "post",
        url: `log-activity?type_user=${type_user}&position=${position}&key=${key}&type=${type}`,
        data: {},
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // eslint-disable-next-line no-empty
    } catch (error) {}
  };
  const handleUpdate = (data, method = "post", path) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const response = await $axios({
          method: method,
          url: path,
          data: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };
  const loadDetail = (method = "get", path) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const response = await $axios({
          method: method,
          url: path,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };
  const getLimitName = (name) => {
    var str = name;

    let acronym = str
      .split(/\s/)
      .reduce((response, word) => (response += word.slice(0, 1)), "");
    return acronym.split("").length > 2
      ? acronym.split("")[acronym.length - 2] +
          acronym.split("")[acronym.length - 1]
      : acronym;
  };
  // upload avatar
  const uploadAvatarFile = (event) => {
    let formData = new FormData();
    let file = event.target.files[0];
    formData.append("files", file);
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      await $axios({
        method: "post",
        url: `/uploads/images?type=house`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
        .then(function (response) {
          resolve({
            data: response.data.data[0],
            src: URL.createObjectURL(file),
          });
        })
        .catch(() => {
          reject(false);
        });
    });
  };
  const dateTimeFormat = (date) => {
    return $moment(date).format("DD-MM-YYYY HH:mm");
  };
  const dateFormat = (date) => {
    return $moment(date).format("DD-MM-YYYY");
  };
  return {
    $axios,
    $swal,
    $qs,
    $moment,
    saveLog,
    dateTimeFormat,
    existError,
    showErrorMsg,
    showSuccessMsg,
    uploadAvatarFile,
    handleUpdate,
    getLimitName,
    loadDetail,
    dateFormat,
    getHostOrigin,
  };
};
