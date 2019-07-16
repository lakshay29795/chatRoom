<template>
  <div class="chatscreen-wrapper">
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex
          v-for="(card, idx) in friendsData"
          :key="card.title"
          v-bind="{ [`xs${flexVal(idx)}`]: true }"
          @click="openChatWindow($event, card)">
          <v-card v-if="friendsData.length > 0">
            <v-img :src="card.src" height="200px">
              <v-container fill-height fluid pa-2>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <!-- <span class="headline white--text" v-text="card.title"></span> -->
                  </v-flex>
                </v-layout>
              </v-container>
            </v-img>

            <v-card-actions>
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
              </v-btn>-->
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout justify-center>
        <v-flex class="addFriendIcon" v-if="showAddFriendIcon" @click="addNewFriend" xs6 sm4 >
          <v-img class="rounded-card" v-if="friendsData.length === 0"
            :src="require(`@/static/addFriend.png`)"
            gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
          ></v-img>
        </v-flex>
      </v-layout>
      <!-- <add-friend :items="items" v-if="!showAddFriendIcon"></add-friend> -->
      <!-- <v-card v-if="friendsList === 0" ripple class="rounded-card"> -->
        
      <!-- </v-card> -->
    </v-container>
  </div>
</template>

<script>
import router from "@/router";
import Messages from "@/Messages";
import addFriend from "../utilities/addNewFriend";
import { mapState, mapMutations } from 'vuex';
export default {
  name: "chatscreen",
  props: {
    userName: String,
    required: true
  },
  watch: {},
  created() {
    console.log(Messages, '22222222222');
    // Messages.send('keyUP', this.handleButtonDown);
  },
  mounted() {
    // Messages.on(this.$el, 'click', this.openChatWindow);
    this.socketMap.forEach(element => {
      Messages.on(element.event, element.function);
    });
    if (this.friendsData.length === 0) Messages.send('getFriendsList', {username: this.userName}, this.sendCallback);
    this.$validator.localize("en", this.dictionary);
  },
  destroyed() {},
  data() {
    return {
      friendsList: [],
      showAddFriendIcon: true,
      socketMap: [
        {
          event: 'friendsList',
          function: this.myFriends,
        },
        {
          event: 'allUsers',
          function: this.allUsersList,
        }
      ],
      items: [
        { active: false, title: 'Jason Oner', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
        { active: false, title: 'Ranee Carlson', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { active: false, title: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { active: false, title: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' }
      ],
    };
  },
  computed: {
    ...mapState('chat', {
      friendsData: 'friendsData',
    }),
  },
  methods: {
    ...mapMutations('chat', {
      updateFriendsData: 'UPDATE_FRIENDS_DATA',
    }),
    openChatWindow(evt, card) {
      console.log("222", this.$el, this.$el.className);
      // evt.stopPropagation();
      router.push({
        path: "chatWindow",
        query: { userName: card.title }
      });
      console.log("3333333");
    },
    addFavourite(evt) {
      evt.stopPropagation();
      router.push({
        path: "register",
        query: { userName: this.userName },
      });
    },
    handleButtonDown(type) {
      console.log("11111111111");
    },
    sendCallback() {
      console.log('event sent');
    },
    addNewFriend() {
      Messages.send("getAllUsers", this.userName);
    },
    myFriends(data) {
      console.log('friends', data);
      if (data.length === 0) return;
      data.forEach((user) => {
        console.log('friends', user);
        this.friendsList.push({
          title: user.name,
          src: user.profilePicture,
        });
      })
      if (this.friendsList.length) {
        this.updateFriendsData({type: 'ADD', all: false, data: this.friendsList });
        this.showAddFriendIcon = false;
      } 
    },
    allUsersList(data) {
      console.log('all users', data);
      this.items = data;
      this.items.forEach((item)=>{item.active = false});
      this.showAddFriendIcon = false;
    },
    flexVal(idx) {
      return idx === 0 ? 12 : 6;
    }
  },
  components: {
    addFriend,
  },
};
</script>

<style lang="scss" scoped>
.chatscreen-wrapper {
  position: relative;
  width: 100%;
  .addFriendIcon {
    // margin-left: 25%;
    margin-top: 40%;
  }
  .rounded-card{
      border-radius:50%;
      // width: 100px;
      // height: 100px;
  }
}
</style>
