import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/pages/HomeView.vue";
import { authStore } from "@/stores/auth";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "web-home",
      component: HomeView,
      meta: { requiresAuth: -1 },
    },
    // {
    //   path: "/dang-ky",
    //   name: "web-register",
    //   meta: { requiresAuth: -1 },
    //   component: () => import("../views/RegisterView.vue"),
    // },
    // {
    //   path: "/dat-lai-mat-khau/",
    //   name: "web-reset-password",
    //   meta: { requiresAuth: -1 },
    //   component: () => import("../views/ResetPasswordView.vue"),
    // },
    // {
    //   path: "/danh-sach-ctv",
    //   name: "web-index-ctv",
    //   meta: { requiresAuth: 1 },
    //   component: () => import("../views/ctv/IndexView.vue"),
    // },
    // {
    //   path: "/chi-tiet-ctv/:id",
    //   name: "web-detail-ctv",
    //   meta: { requiresAuth: 1 },
    //   component: () => import("../views/ctv/DetailView.vue"),
    // },
    // {
    //   path: "/danh-sach-khach-ctv",
    //   name: "web-index-customer",
    //   meta: { requiresAuth: 1 },
    //   component: () => import("../views/customer/IndexView.vue"),
    // },
    // {
    //   path: "/chi-tiet-khach-hang/:id",
    //   name: "web-detail-customer",
    //   meta: { requiresAuth: 1 },
    //   component: () => import("../views/customer/DetailView.vue"),
    // },
    // {
    //   path: "/lich-su-thanh-toan",
    //   name: "web-index-revenue-history",
    //   meta: { requiresAuth: 1 },
    //   component: () => import("../views/history/IndexRevenueView.vue"),
    // },
    // {
    //   path: "/lich-su-hoa-hong",
    //   name: "web-index-ref-history",
    //   meta: { requiresAuth: 1 },
    //   component: () => import("../views/history/IndexRefView.vue"),
    // },
    // {
    //   path: "/profile",
    //   name: "web-profile",
    //   meta: { requiresAuth: 1 },
    //   component: () => import("../views/ProfileView.vue"),
    // },
  ],
});
// eslint-disable-next-line no-unused-vars
router.beforeEach(async (to, from) => {
  const { fetchUser, logout } = authStore();
  const auth_layout = to.meta.requiresAuth;
  fetchUser()
    .then((res) => {
      if (
        to.path != "/" &&
        auth_layout == 1 &&
        Object.keys(res.data.data).length == 0
      ) {
        logout();
        window.location.href = "/";
      }
      if (auth_layout == -1 && Object.keys(res.data.data).length > 0)
        window.location.href = "/danh-sach-khach-ctv";
    })
    .catch((error) => {
      if (to.path != "/" && auth_layout != -1) window.location.href = "/";
    });
  // instead of having to check every route record with
  // to.matched.some(record => record.meta.requiresAuth)
});
export default router;
