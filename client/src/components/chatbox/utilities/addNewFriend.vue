<template>
  <v-container grid-list-xs>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-toolbar color="teal" dark>
            <v-toolbar-title class="text-xs-center">Select Friend</v-toolbar-title>

            <!-- <v-btn icon>
                <v-icon>search</v-icon>
            </v-btn>-->
          </v-toolbar>

          <v-list subheader>
            <!-- <v-subheader>Recent chat</v-subheader> -->
            <v-list-tile v-for="(item, index) in listItems" :key="item.name" avatar @click="selectFriend(index)">
              <v-list-tile-avatar>
                <img :src="item.profilePicture">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="item.name"></v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-icon :color="item.active ? 'teal' : 'grey'">chat_bubble</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Messages from "@/Messages";
import Vue from 'vue';
export default {
  props: {
    items: {
      required: true,
    },
  },
  data() {
    return {
      listItems: [],
    };
  },
  mounted() {
    this.items.forEach(element => {
      this.listItems.push(element);      
    });
  },
  methods: {
    selectFriend(idx) {
      const tempObj = this.listItems[idx];
      tempObj.active = !tempObj.active;
      Vue.set(this.listItems, idx, tempObj);
      // this.listItems[idx].active = !this.listItems[idx].active;
    },
  },
}
</script>
