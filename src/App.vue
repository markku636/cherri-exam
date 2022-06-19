<template>
  <v-app>
    <TopBar />

          <FriendList />
    

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import FriendList from "@/components/FriendList";
import TopBar from "@/components/TopBar";
export default {
  name: "App",
  components: { FriendList, TopBar },
 
};
</script>

<style lang="scss">
.user-img {
  width: 48px;
  height: 48px;
  border: 1px solid #ffffff;
  border-radius: 50%;
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
.lang-btn {
  font-size: 20px;

  &.active .v-btn__content {
    color: #4a90e2;
  }
}
</style>
