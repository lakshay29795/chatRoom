<template>
  <div class="login-page">
    <!-- <chatScreen class="chat-screen" v-if="isChatActive" :userName="username"></chatScreen> -->
    <div v-if="blankField" class="errorMessage">please enter {{ blankField }}</div>
    <div class="login-form">
      <form action @submit.prevent="register">
        USERNAME:
        <input type="text" class="formField username-input" v-model="username">
        <br>EMAIL:
        <input type="text" class="formField email-input" v-model="email">
        <br>FIRST NAME
        <input type="text" class="formField firstName-input" v-model="firstName">
        <br>LAST NAME
        <input type="text" class="formField lastName-input" v-model="lastName">
        <br>PASSWORD:
        <input type="text" class="formField password-input" v-model="password">
        <br>
        <input type="submit" value="Register">
      </form>
      <div class="links">
        <div @click="loginPageLink">Login</div>
      </div>
    </div>

  </div>
</template>

<script>
// import chatScreen from './chatScreen';
import router from "@/router";

export default {
  data() {
    return {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
      isChatActive: false,
      blankField: '',
    };
  },
  methods: {
    register() {
      this.isChatActive = true;
      this.blankField = '';
      console.log(this.username, this.password, this.firstName, this.lastName, this.email);
      if (!this.password) this.blankField = 'password';
      if (!this.lastName) this.blankField = 'lastname';
      if (!this.firstName) this.blankField = 'firstname';
      if (!this.email) this.blankField = 'email';
      if (!this.username) this.blankField = 'username';
      if (this.blankField) {
        return;
      }
      console.log('register called');
      this.$http.post('http://localhost:3000/api/posts/register', {
        username: this.username,
        email: this.email,
        name: this.firstName + this.lastName,
        password: this.password,
      }).then((response) => {
        if (response.data) {
          console.log('registered user');
          router.push({ path: response.data, query: { userName: this.username } });
        } else {
          // ask to register properly
        }
      }).catch((err) => {
        throw err;
      })
    },
    loginPageLink() {
      router.push({ path: "login" });
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
  display: block;
  justify-content: center;
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
    // z-index: 1;
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
