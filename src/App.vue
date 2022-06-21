<template>
  <v-app class="app-container">
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
.app-container {
  .v-btn {
    text-transform: none;
  }
}
</style>
