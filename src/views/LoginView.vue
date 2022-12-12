<template lang="">
  <!-- <form>
      <input type="text" name="username" v-model="user.username" />
      <span v-if="existError(errors, 'username')">
        {{ existError(errors, "username") }}
      </span>
      <input type="password" name="password" v-model="user.password" />
      <span v-if="existError(errors, 'password')">
        {{ existError(errors, "password") }}
      </span>
      <button type="button" @click="login">Login</button>
    </form> -->
  <div class="signin">
    <div class="box-signin">
      <div class="bg-login img-login"></div>
      <div class="right-login">
        <div>
          <a href="" class="logo-login"
            ><img src="@/assets/images/logo1.png"
          /></a>
          <h2 class="mb-1 text-center">Đăng nhập</h2>
          <form>
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label>Số điện thoại</label>
                  <input
                    @keyup.enter="login"
                    v-model="user.username"
                    type="text"
                    class="form-control"
                    name=""
                  />
                  <span
                    class="text-danger"
                    v-if="existError(errors, 'username')"
                  >
                    {{ existError(errors, "username") }}
                  </span>
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group">
                  <label>Mật khẩu</label>
                  <div class="password-input">
                    <input
                      @keyup.enter="login"
                      v-model="user.password"
                      :type="type"
                      class="form-control"
                      placeholder="Mật khẩu"
                      name=""
                    />
                    <span v-on:click="changeTypePas" class="view-pass">
                      <i class="icon-view" v-if="type == 'password'"></i>
                      <span v-else aria-hidden="true">x</span>
                    </span>
                    <span
                      class="text-danger"
                      v-if="existError(errors, 'password')"
                    >
                      {{ existError(errors, "password") }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-between alii align-items-center">
              <div class="forgot-pass">
                <a
                  data-toggle="modal"
                  data-target="#add-icon"
                  href="javascript:void(0)"
                  >Quên mật khẩu</a
                >
              </div>
              <div class="form-group">
                <button
                  v-on:click="login"
                  type="button"
                  class="btn btn-block btn-main"
                >
                  Đăng nhập
                </button>
              </div>
            </div>
          </form>
          <div>
            Thành viên mới
            <!-- <RouterLink :to="{ name: 'web-register' }">đăng ký</RouterLink> -->
          </div>
        </div>
      </div>
    </div>
    <div>
      <!-- <ModalForgotPassword> </ModalForgotPassword> -->
    </div>
  </div>
</template>
<script>
import { authStore } from "@/stores/auth";
import { defineComponent, reactive, ref } from "vue";
import helper from "@/helper/helper";
import { auth as intAuth } from "@/interfaces/user";
// import ModalForgotPassword from "@/components/ModalForgotPassword.vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
export default defineComponent({
  components: {
    // ModalForgotPassword,
  },
  setup() {
    const type = ref("password");
    const changeTypePas = () => {
      type.value = type.value == "password" ? "text" : "password";
    };
    const { existError } = helper();
    const auth = authStore();
    const { errors } = storeToRefs(authStore());
    const user = reactive(intAuth);
    const router = useRouter();
    const login = async () => {
      await auth.login(user).then(() => {
        router.push({ name: "web-index-customer" });
      });
    };
    return {
      user,
      errors,
      login,
      existError,
      type,
      changeTypePas,
      // ModalForgotPassword,
    };
  },
});
</script>
<style>
.bg-login {
  background-image: url("@/assets/images/login.png");
}
</style>
