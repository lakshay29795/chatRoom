<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex v-for="card in cards" :key="card.title" v-bind="{ [`xs${card.flex}`]: true }" @click="openChatWindow($event, card)">
        <v-card>
          <v-img :src="card.src" height="200px">
            <v-container fill-height fluid pa-2>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <!-- <span class="headline white--text" v-text="card.title"></span> -->
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>

          <v-card-actions >
            <span class="body-1 black--text" v-text="card.title"></span>
            <v-spacer></v-spacer>
            <v-btn icon @click="addFavourite">
              <v-icon>favorite</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>bookmark</v-icon>
            </v-btn>
            <!-- <v-btn icon>
              <v-icon>share</v-icon>
            </v-btn> -->
          </v-card-actions>
        </v-card>
      </v-flex>
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
  data() {
    return {
      cards: [
        {
          title: "RAHUL",
          src: "http://www.loyolaphoenix.com/wp-content/uploads/2014/11/photo-14.jpg",
          flex: 12
        },
        {
          title: "RAJESH",
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrkFg-e72Iob3hwIGK-WgdgUHhR2ADuSII1AqEkLelguscRP3Y",
          flex: 6
        },
        {
          title: "AMAN1",
          src: "https://qph.fs.quoracdn.net/main-raw-140029254-nwdoycrmcjbwpqccvawsjxjaunapeuge.jpeg",
          flex: 6
        },
        {
          title: "RAHUL1",
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdCpjql9ciVjcpYK5ljWmHUyVBjPYJ0HQBOVzd4yI_hZCVd1e1",
          flex: 6
        },
        {
          title: "RAJESH1",
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjyrXS2DkOAqVOmQyYu_6fA5BHV68X5XwpohYn9771o8kOs95M",
          flex: 6
        },
        {
          title: "AMAN11",
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbHv8DBD4R4V2oeKs-w7mpPQl72VB3Wp9tEn5RKyNwVGbMk1ZiRQ",
          flex: 6
        },
        {
          title: "RAHUL11",
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS42U6y03gQQHjUf-bZ16FY84Hz170xgV1ObGuoWh7rhajE9AerBg",
          flex: 6
        },
        {
          title: "RAJESH11",
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkiVN0cICMs2YjcB_pdk1VezgaLdOLKk9L1HGGCQrCH7DcwA0yEA",
          flex: 6
        },
        {
          title: "AMAN",
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLTYpX2vn6y3sBCXj7BqYzVg7-GfCUlbXmj_9xkclKKap84uaOXw",
          flex: 6
        },
      ]
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
    openChatWindow(evt, card) {
        router.push({
          path: 'chatWindow',
          query: { userName: card.title }
        });
        console.log('3333333');
    },
    addFavourite(evt) {
        evt.stopPropagation();
    }
  },
  components: {
  },
};
</script>

