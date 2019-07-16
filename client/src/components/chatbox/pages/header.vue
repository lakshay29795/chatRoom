<template>
  <div class="header" style="position: relative;">
    <v-container>
      <v-toolbar dark color="primary" ml6>
        <v-toolbar-title v-if="!showSearch" ml4 class="white--text heading">TALKIE</v-toolbar-title>
        <v-list-tile-avatar v-else>
          <img v-if="getCurrentRouteName() !== 'chatWindow'" src="@/static/appIcon.png" />
        </v-list-tile-avatar>

        <v-spacer></v-spacer>

        <v-text-field
          v-if="showSearch"
          v-model="searchString"
          placeholder="Search"
          color="#e7e1e8"
          data-vv-name="password"
          :clearable="true"
          @keyup.enter="search"
          required
        ></v-text-field>
        <v-btn icon>
          <v-icon @click="search">search</v-icon>
        </v-btn>
        <!-- <v-btn icon>
          <v-icon>apps</v-icon>
        </v-btn>-->

        <!-- <v-btn icon>
          <v-icon>refresh</v-icon>
        </v-btn>-->

        <!-- <v-btn icon>
          <v-icon>more_vert</v-icon>
        </v-btn>-->
        <v-menu bottom left>
          <template v-slot:activator="{ on }">
            <v-btn dark icon v-on="on" @click="getoptions">
              <v-icon>more_vert</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-tile v-for="(item, i) in headerOptions" :key="i" @click="selectOption(item)">
              <v-list-tile-title>{{ item.label }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar>
    </v-container>
  </div>
</template>

<script>
import router from "@/router";
import { mapState, mapGetters } from "vuex";
export default {
  _props: {
    headerPage: {
      type: String,
      required: false
    }
  },
  get props() {
    return this._props;
  },
  set props(value) {
    this._props = value;
  },
  data() {
    return {
      showSearch: false,
      searchString: "",
      headerOptions: []
    };
  },
  computed: {
    ...mapGetters("header", {
      getHeaderOptions: "getHeaderOptions"
    })
  },
  mounted() {
    console.log("router val", router.currentRoute);
  },
  methods: {
    search() {
      this.showSearch = !this.showSearch;
    },
    selectOption(item) {
      console.log("selectedOption", item);
    },
    getoptions(evt) {
      evt.stopPropagation();
      this.headerOptions = this.getHeaderOptions(router.currentRoute.name);
    },
    getCurrentRouteName() {
      return router.currentRoute.name;
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  height: 10%;
  z-index: 2;
  .heading {
    font-family: cursive;
  }
}
</style>
