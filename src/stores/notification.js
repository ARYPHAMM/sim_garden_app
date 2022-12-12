import { defineStore } from "pinia";
import helper from "@/helper/helper";
const { $axios, $qs } = helper();
import { authStore } from "@/stores/auth";
export const notificationStore = defineStore({
  id: "notification",
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
    async fetchItems(filter, setData = true, path = "ctv/list-noti") {
      try {
        const response = await $axios({
          method: "get",
          url: path + "?" + $qs.stringify(filter),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authStore().token}`,
          },
        });
        let data = response.data.data.data;
        if (setData) {
          this.items = this.items.concat(response.data.data.data);
          this.items = [...new Set(this.items)];
          this.setPagination(response.data.data);
        }
        return data;
      } catch (error) {
        return Promise.reject(false);
      }
    },
    async fetchItem(id, path = "ctv") {
      try {
        const response = await $axios({
          method: "get",
          url: path + `/${id}/customer`,
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
    setItem(item) {
      this.pagination.total_unread--;
      this.items.map((currentValue, index) => {
        if (currentValue.id == item.id)
          if (!currentValue.read_at) {
            this.items[index] = item;
          }
      });
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
