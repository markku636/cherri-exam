<template>
  <v-app>
    <v-app-bar app color="#4a90e2" dark class="chat-title-bar">
      <div class="d-flex align-center">
        <span class="chat-title">Cherri Chat</span>
      </div>

      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click="showDraw = !showDraw"> </v-app-bar-nav-icon>
      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <div class="user-img m-r-8">          
        </div>
        <span class="f-24 f-bold">{{ userInfo.name }}</span>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app color="white--text" v-model="showDraw">
      <v-list-item>
        <v-list-item-content>
          <FriendList />
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>

    <v-main> 
        <router-view></router-view>
123
    </v-main>
  </v-app>
</template>

<script>
import FriendList from "@/components/FriendList";

export default {
  name: "App",
  components: { FriendList },

  data: () => ({
    userInfo: {
      name: "潔西卡",
      img: "",
    },
    showDraw: true,
  }),
};
</script>

<style lang="scss">

.user-img{
  width: 48px;
  height: 48px;
  border: 1px solid #ffffff;
  border-radius:50%;
  background-color: #ffffff;
}
.chat-title-bar {
  .chat-title {
    color: #fff;
    font-size: 24px;
  }
}

.v-list-item {
  padding: 0 0 !important;
}
</style>
