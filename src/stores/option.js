import { defineStore } from "pinia";
import helper from "@/helper/helper";
const { $axios, $qs, showErrorMsg } = helper();
export const optionStore = defineStore({
  id: "option",
  state: () => ({
    provinces: [],
    districts: [],
    wards: [],
  }),
  getters: {
    getProvince: (state) => state.provinces,
    getDistrict: (state) => state.districts,
    getWard: (state) => state.wards,
  },
  actions: {
    async fetchProvince(path = "location/provinces") {
      this.provinces = [];
      this.districts = [];
      this.wards = [];
      try {
        const response = await $axios({
          method: "get",
          url: path,
          headers: {
            "Content-Type": "application/json",
          },
        });
        this.provinces = response.data.data;
        return response;
      } catch (error) {
        return Promise.reject(false);
      }
    },
    async fetchDistrict(province_id, path = "location/districts") {
      this.districts = [];
      this.wards = [];
      try {
        const response = await $axios({
          method: "get",
          url: path + `?${$qs.stringify({ province_id: province_id })}`,
          headers: {
            "Content-Type": "application/json",
          },
        });
        this.districts = response.data.data;
        return response;
      } catch (error) {
        return Promise.reject(false);
      }
    },
    async fetchWard(district_id, path = "location/wards") {
      this.wards = [];
      try {
        const response = await $axios({
          method: "get",
          url: path + `?${$qs.stringify({ district_id: district_id })}`,
          headers: {
            "Content-Type": "application/json",
          },
        });
        this.wards = response.data.data;
        return response;
      } catch (error) {
        return Promise.reject(false);
      }
    },
  },
});
