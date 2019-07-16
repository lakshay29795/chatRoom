<template>
  <v-container fluid class="messageScreen" absolute pb-1>
    <!-- <v-btn @click="goBack">BACK</v-btn> -->
    <v-layout row wrap fill-height>
      <v-flex xs12>
          <div ref="chat" id="logs">
            <template v-for="(item, index) in logs">
              <v-layout row wrap :key="index" mt-2>
                <v-flex xs8 d-flex>
                  <v-card class="messageCard">
                    <v-card-text>{{ item }}
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </template>
          </div>
          <!-- <v-card-actions>
            <v-form @submit.prevent="submit">
              <v-text-field v-model="msg" label="Message" single-line solo-inverted></v-text-field>
              <v-btn fab dark small color="primary" type="submit">
                <v-icon dark>send</v-icon>
              </v-btn>
            </v-form>
          </v-card-actions>-->
      </v-flex>
      <v-layout row wrap class="typeMessage" >
        <v-flex xs12 mt-2 >
          <v-form @submit.prevent="submit">
            <v-layout row>
              <v-flex xs10>
                <v-text-field v-model="msg" label="Message" single-line solo hide-details></v-text-field>
                <!-- <v-text-field single-line solo-inverted></v-text-field> -->
              </v-flex>
              <v-flex xs2>
                <v-btn fab dark small color="primary" type="submit">
                  <v-icon dark>send</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-form>
        </v-flex>
      </v-layout>
    </v-layout>
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
  watch: {
    logs() {
      setTimeout(() => {
        this.$refs.chat.$el.scrollTop = this.$refs.chat.$el.scrollHeight;
      }, 0);
    }
  },
  data() {
    return {
      logs: [],
      msg: null
    };
  },
  mounted() {},
  methods: {
    goBack() {
      router.back();
    },
    submit() {
      this.logs.push(this.msg);
      this.msg = "";
    }
  }
};
</script>

<style lang="scss" scoped>
#logs {
  // height: 100px;
  overflow: auto;
}
.messageScreen {
  height: 90%;
  // position: absolute;
  // bottom: 0;
  // padding-bottom: 0;
  .typeMessage {
    align-self: flex-end;
    // white-space: nowrap;
    // overflow: hidden;
    // text-overflow: ellipsis;
  }
}
</style>

