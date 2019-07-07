<template>
  <v-container>
    <form>
      <v-text-field
        v-model="userName"
        v-validate="'required|max:20'"
        :counter="20"
        :error-messages="errors.collect('name')"
        label="USERNAME"
        data-vv-name="name"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        v-validate="'required'"
        :error-messages="errors.collect('password')"
        label="PASSWORD"
        :type="'password'"
        data-vv-name="password"
        required
      ></v-text-field>
      <!-- <v-text-field
        v-model="email"
        v-validate="'required|email'"
        :error-messages="errors.collect('email')"
        label="E-mail"
        data-vv-name="email"
        required
      ></v-text-field>-->
      <!-- <v-select
          v-model="select"
          v-validate="'required'"
          :items="items"
          :error-messages="errors.collect('select')"
          label="Select"
          data-vv-name="select"
          required
      ></v-select>-->
      <v-checkbox
        v-model="checkbox"
        v-validate="'required'"
        :error-messages="errors.collect('checkbox')"
        value="1"
        label="You Sure ?"
        data-vv-name="checkbox"
        type="checkbox"
        required
      ></v-checkbox>

      <v-btn @click="submit">Login</v-btn>
      <v-btn @click="clear">clear</v-btn>
    </form>
  </v-container>
</template>

<script>
import router from "@/router";
import Messages from "@/Messages";
export default {
  props: {
    userName1: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      userName: "",
      password: "",
      checkbox: null,
      dictionary: {
        attributes: {
          email: "E-mail Address"
          // custom attributes
        },
        custom: {
          name: {
            required: () => "Name can not be empty",
            max: `The name field may not be greater than 20 characters`
            // custom messages
          },
          select: {
            required: "Select field is required"
          }
        }
      }
    };
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
  },
  methods: {
    submit() {
      var loginCallback = function(response) {
        console.log(response, this.userName);
         if (response.data.redirect === 'chatscreen') window.localStorage.setItem('chatty', this.userName);
        router.push({
          path: response.data.redirect,
          query: { userName: this.userName }
        });
      };
      this.$validator.validateAll().then(result => {
        if (result) {
          const data = {
            username: this.userName,
            password: this.password
          };
          this.$http.post('http://localhost:3000/api/posts/login', data)
          .then(loginCallback.bind(this))
          .catch(err => {
            console.log(err);
          });
          // Messages.httpRequest('POST', 'login', data, loginCallback.bind(this));
        }
      });
    },
    clear() {
      this.userName = "";
      this.password = "";
      this.select = null;
      this.$validator.reset();
    }
  }
};
</script>

