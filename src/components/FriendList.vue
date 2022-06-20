<template>
  <v-navigation-drawer
    app
    color="white--text"
    class="nav-drawer"
    v-model="showDraw"
  >
    <v-list-item>
      <v-list-item-content>
        <div class="friend-list">
          <div class="p-t-8 p-b-16 frend-dvision">
            <span class="m-l-12 firend-title">
              好友列表({{ memberList.length }})
            </span>
          </div>

          <div
            class="friend-card p-t-12 p-b-12 p-l-12 p-r-12"
            v-for="member in memberList"
            :key="member.id"
            @click="clickNickName(member)"
          >
            <div class="head-img" />
            <div class="member-info m-l-12">
              <div class="name-name">
                {{ member.nickName }}
              </div>
              <div class="last-message p-t-8">
                大家好，我是{{ member.nickName }}~
              </div>
            </div>
          </div>
        </div>
      </v-list-item-content>
    </v-list-item>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
import { memberList } from "@/assets/mock/member.js";

export default {
  data: () => {
    return { memberList: memberList };
  },
  props: {},
  computed: {
    ...mapState({
      showDraw: (state) => state.showDraw,
    }),
  },

  methods: {
    clickNickName(member) {
      this.$store.dispatch("chat/setToMember", member);
      this.$router.push({ path: "/to-chat" });
    },
  },
};
</script>

<style lang="scss">
.nav-drawer {
  box-shadow: 10px 0 5px -5px rgb(0 0 0 / 5%);
  .v-list-item {
    padding: 0 0 !important;
  }

  .friend-list {
    display: flex;
    flex-direction: column;

    .frend-dvision {
      border-bottom: 1px solid #67e7ca;
    }

    .firend-title {
      display: flex;
      flex: 1;
      align-items: center;
    }

    .friend-card {
      display: flex;
      border-bottom: 1px solid #67e7ca;

      .head-img {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: 1px solid #67e7ca;
      }

      .member-info {
        .name-name {
          font-weight: bold;
          font-size: 24px;
        }

        .last-message {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
