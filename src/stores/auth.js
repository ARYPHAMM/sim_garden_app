import { defineStore } from "pinia";

import helper from "@/helper/helper";
// import { initAuth } from "@/interface/Auth";
const { $axios, showErrorMsg, $swal, getHostOrigin, showSuccessMsg } = helper();
export const authStore = defineStore({
  id: "auth",
  state: () => ({
    user: {},
    is_staff: false,
    token: window.localStorage.getItem("token"),
    errors: [],
  }),
  getters: {
    getUser: (state) => state.user,
    getToken: (state) => state.token,
    getErrors: (state) => state.errors,
    isStaff: (state) => state.is_staff,
    isLogin: (state) => (Object.keys(state.user).length > 0 ? true : false),
  },
  actions: {
    async register(user, path = "ctv/dang-ky") {
      if (user.type == "householder") {
        path = "auth/register";
        user.ref_code = user.code_gioithieu;
      }
      try {
        const response = await $axios({
          method: "post",
          url: path,
          data: user,
          headers: {
            "Content-Type": "application/json",
          },
        });
        this.errors = [];
        return response;
      } catch (error) {
        if (
          error.response != undefined &&
          error.response.data != undefined &&
          error.response.data.errors != undefined
        )
          this.errors = error.response.data.errors;
        else showErrorMsg(error);
        return Promise.reject(false);
      }
    },
    async fetchUser(path = "ctv/me") {
      try {
        const response = await $axios({
          method: "get",
          url: path,
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        this.user = response.data.data;
        this.user.password_old = "";
        this.user.password_new = "";
        this.user.password_confirmation = "";
        this.user.ward_id = this.user.ward ? this.user.ward.id : "";
        this.user.district_id = this.user.district ? this.user.district.id : "";
        this.user.province_id = this.user.province ? this.user.province.id : "";

        return response;
      } catch (error) {
        return Promise.reject(false);
      }
    },
    async renegrateCode() {
      // $swal
      //   .fire({
      //     text: "Get link",
      //     type: "warning",
      //     icon: "question",
      //     confirmButtonText: "Đồng ý",
      //     showCancelButton: true,
      //     cancelButtonText: "Hủy",
      //   })
      //   .then(async (result) => {
      //     if (result.isConfirmed) {
      var input = document.createElement("textarea");
      input.innerHTML =
        getHostOrigin() + "/dang-ky?ref_code=" + this.user.ref_code;
      document.body.appendChild(input);
      input.select();
      // eslint-disable-next-line no-unused-vars
      var result1 = document.execCommand("copy");
      document.body.removeChild(input);
      showSuccessMsg("Coppy link chia sẻ thành công! \n " + input.innerHTML);
      // let path = `ctv/${this.user.id}/generate-code`;
      // try {
      //   const response = await $axios({
      //     method: "get",
      //     url: path,
      //     headers: {
      //       Authorization: `Bearer ${this.token}`,
      //     },
      //   });
      //   this.user.ref_code = response.data.data;
      //   return response;
      // } catch (error) {
      //   return Promise.reject(false);
      // }
      //   }
      // });
    },
    async login(auth, path = "auth/login") {
      try {
        const response = await $axios({
          method: "post",
          url: path,
          data: auth,
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${this.$store.state.auth.token}`,
          },
        });
        // this.user = response.data.data.user;
        // this.is_staff = response.data.data.is_staff;
        this.token = response.data.data;
        this.errors = [];
        localStorage.setItem("token", this.token);
        return response;
      } catch (error) {
        //#1
        // const err = error as AxiosError;
        if (
          error.response != undefined &&
          error.response.data != undefined &&
          error.response.data.errors != undefined
        )
          this.errors = error.response.data.errors;
        else showErrorMsg(error);
        return Promise.reject(false);
        //#2
        // const err = error as AxiosError;
        // return err.response?.data;
      }
    },
    async logout(path = "auth/signout") {
      const token = this.token;
      this.token = "";
      this.user = {};
      localStorage.setItem("token", this.token);
      try {
        const response = await $axios({
          method: "post",
          url: path,
          data: {},
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response;
      } catch (error) {
        // showErrorMsg(error);
        return Promise.reject(false);
      }
    },
  },
});
