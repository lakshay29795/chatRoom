<template>
  <div class="wrapper">
    <div class="login" @click="loginPage">login</div>
    <div class="register" @click="registerPage">register</div>
  </div>
</template>

<script>
import router from "@/router";
export default {
  data() {
    return {

    };
  },
  methods: {
    loginPage() {
      router.push({ path: 'login' });
    },
    registerPage() {
      router.push({ path: 'register' });
    },
  }
};
</script>

<style lang="scss" scoped>
@import "./variables.scss";
  .wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    .login {
      position: absolute;
      width: 30%;
      height: 20%;
      top: 20%;
      left: 30%;
      background-color: green;
      opacity: 0.8;
      display: flex;
      justify-content: center;
      align-items: center;
      color: red;
      font-size: 30 * $s;
    }
    .register {
      position: absolute;
      width: 30%;
      height: 20%;
      top: 50%;
      left: 30%;
      background-color: orange;
      opacity: 0.8;
      display: flex;
      justify-content: center;
      align-items: center;
      color: red;
      font-size: 30 * $s;
    }
  }
</style>
