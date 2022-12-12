import { defineStore } from "pinia";
import helper from "@/helper/helper";
const { $axios, $qs, showErrorMsg } = helper();
import { authStore } from "@/stores/auth";
export const ctvStore = defineStore({
  id: "ctv",
  state: () => ({
    items: [],
    item: "",
    filter: {
      search: "",
    },
    pagination: {
      page: 1,
      lastPage: 0,
      last_page: 0,
      perPage: 0,
      total: 0,
      total_current: 0,
    },
  }),
  getters: {
    getItems: (state) => state.items,
    getItem: (state) => state.item,
    getPagination: (state) => state.pagination,
    getFilter: (state) => state.filter,
  },
  actions: {
    async fetchItems(filter, path = "ctv/list-ctv") {
      try {
        const response = await $axios({
          method: "get",
          url: path + "?" + $qs.stringify(filter),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authStore().token}`,
          },
        });
        this.items = response.data.data.data;
        delete filter["page"];
        this.setFilter(filter);
        this.setPagination(response.data.data);
        return response;
      } catch (error) {
        return Promise.reject(false);
      }
    },
    async fetchItem(id, path = "ctv/list-ctv") {
      try {
        const response = await $axios({
          method: "get",
          url: path + `/${id}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authStore().token}`,
          },
        });
        this.item = response.data.data;
        return response;
      } catch (error) {
        return Promise.reject(false);
      }
    },
    setPagination(pagination) {
      delete pagination["data"];
      this.pagination = {
        ...pagination,
        page: pagination.current_page,
      };
    },
    setFilter(filter) {
      for (var k in this.filter) {
        this.filter[k] = filter[k];
      }
    },
  },
});
