<template>
  <div class="login-page">
    <div v-if="blankField" class="errorMessage">please enter {{ blankField }}</div>
    <form class="login-form" method action @submit.prevent="logingIn">
      USERNAME:
      <input type="text" class="formField username-input" v-model="username">
      <br>PASSWORD:
      <input type="text" class="formField password-input" v-model="password">
      <br>
      <input type="submit" value="Log in">
    </form>
    <div class="links">
      <div @click="registerPageLink">Register Here</div>
    </div>
  </div>
</template>

<script>
// import chatScreen from './chatScreen';
import router from "@/router";

export default {
  props: {
    userName1: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      username: "",
      password: "",
      isChatActive: false,
      blankField: '',
    };
  },
  mounted() {
    if (this.userName1) {
      this.username = this.userName1;
    }
  },
  methods: {
    logingIn() {
      console.log("hello");
      this.isChatActive = true;
      this.blankField = '';
      if (!this.password) this.blankField = 'password';
      if (!this.username) this.blankField = 'username';
      if (this.blankField) {
        return;
      }
      var func = function(response) {
        console.log(response, this);
        //  if (response.)
        router.push({
          path: response.data,
          query: { userName: this.username }
        });
      };
      this.$http
        .post("http://localhost:3000/api/posts/login", {
          username: this.username,
          password: this.password
        })
        .then(func.bind(this))
        .catch(err => {
          console.log(err);
        });
      // using bind above to able to use this of this.username otherwise use arrow function in
      // then or make func an arrow function
    },
    registerPageLink() {
      router.push({ path: "register" });
    }
  },
  components: {
    // chatScreen,
  }
};
</script>

<style lang="scss" scoped>
@import "./variables.scss";
.login-page {
  .errorMessage {
    position: relative;
    width: 100%;
    height: 30 * $s;
    display: flex;
    justify-content: center;
    align-items: center;
    color: red;
    margin-bottom: 10 * $s;
  }
  .login-form {
    position: relative;
    z-index: 1;
    .formField {
      position: relative;
      margin: 10 * $s 10 * $s;
      border: 1px solid black;
    }
    .username-input {
    }
    .password-input {
    }
  }
  .links{
    position: relative;
    width: auto;
    height: 100 * $s;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
