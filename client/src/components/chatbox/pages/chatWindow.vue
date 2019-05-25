<template>
  <v-container>
    <v-btn @click="goBack">BACK</v-btn>
  </v-container>
</template>

<script>
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
      var func = function(response) {
        console.log(response, this.userName);
        //  if (response.)
        router.push({
          path: response.data,
          query: { userName: this.userName }
        });
      };
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$http
            .post("http://localhost:3000/api/posts/login", {
              username: this.userName,
              password: this.password
            })
            .then(func.bind(this))
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    clear() {
      this.userName = "";
      this.password = "";
      this.select = null;
      this.$validator.reset();
    },
    goBack() {
      router.back();
    }
  }
};
</script>

