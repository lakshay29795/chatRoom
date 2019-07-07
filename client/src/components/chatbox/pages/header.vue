<template>
  <div class="hide-overflow header" style="position: relative;">
    <v-container>
      <v-toolbar class="hide-overflow" dark color="primary" ml6>
        <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
        <!-- <v-list-tile-avatar>
          <img src="https://randomuser.me/api/portraits/men/85.jpg">
        </v-list-tile-avatar> -->

        <v-toolbar-title v-if="!showSearch" ml4 class="white--text heading">TALKIE</v-toolbar-title>
        <v-list-tile-avatar v-else>
          <img src="@/static/app-icon.png">
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
        </v-btn> -->

        <!-- <v-btn icon>
          <v-icon>refresh</v-icon>
        </v-btn> -->

        <!-- <v-btn icon>
          <v-icon>more_vert</v-icon>
        </v-btn> -->
        <v-menu bottom left max-height="70">
            <template v-slot:activator="{ on }">
              <v-btn
                dark
                icon
                v-on="on"
                @click="getoptions"
              >
                <v-icon>more_vert</v-icon>
              </v-btn>
            </template> 
          </v-menu>
      </v-toolbar>
    </v-container>
  </div>
</template>

<script>
import router from '@/router';
import { mapState, mapGetters } from 'vuex';
export default {
  _props: {
    headerPage: {
      type: String,
      required: true
    }
  },
  get props() {
    return this._props;
  },
  set props(value) {
    this._props=value;
  },
  data() {
    return {
      showSearch: false,
      searchString: '',
      headerOptions: [],
    };
  },
  computed: {
    ...mapGetters('header', {
      getHeaderOptions: 'getHeaderOptions',
    }),
  },
  mounted() {
    console.log('router val', router.currentRoute);
  },
  methods: {
    search() {
      this.showSearch = !this.showSearch;
    },
    selectOption() {
      console.log('selectedOption');
    },
    getoptions() {
      this.headerOptions = this.getHeaderOptions(router.currentRoute.name);
      this.$emit('headerItems', this.headerOptions);
    }
  },
};
</script>

<style lang="scss" scoped>
  .header {
    .heading {
      font-family: cursive;
    }
  }
</style>
