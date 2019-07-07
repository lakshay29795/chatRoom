<template>
<div class="wrapper">
  <header-bar :headerPage="headerType" @headerItems="setHeaderItems"></header-bar>
  <header-options v-if="headerItems.length" :items="headerItems"></header-options>
  <router-view></router-view>
  <!-- <footer-bar :footer-page="'chat'"></footer-bar> -->
</div>
</template>

<script>
import router from "@/router";
import headerBar from "@/components/chatbox/pages/header";
import headerOptions from "./utilities/headerOptions"
import * as FormData from 'form-data'
export default {
  data() {
    return {
      headerType: 'main', // main, chat, settings
      headerItems: [],
      toRoute: [
        `login`,
        `register`,
        `chatscreen`
      ],
      routeIdx: 0,
      isSliderMenu: true,
    };
  },
  mounted() {
    const username = window.localStorage.getItem('chatty');
    let queryData = {};
    if (username) {
      queryData = {userName: username};
      this.routeIdx = 2;
    }
    router.push({
      path: this.toRoute[this.routeIdx], 
      query: {userName: username}
    });
    // router.push({path: 'login'});
  },
  methods: {
    loginPage() {
      // router.push({ path: 'login' });
    },
    registerPage() {
      // router.push({ path: 'register' });
    },
    setHeaderItems(items) {
      this.headerItems = items;
    },
  },
  components: {
    headerBar,
    headerOptions,
  },
};
</script>

<style lang="scss" scoped>
@import "@/utilities/variables.scss";
.wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  .sliderWrapper {
    position: absolute;
    top: 0;
    left: 0;
  }
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
