<template>
  <div class="chat-container">
    <div
      class="to-member-container h-60"
      v-if="Object.keys(toMember).length > 0"
    >
      <div class="to-member p-l-20 p-t-12 p-b-12">
        <img class="to-member-head-img" />
        <div class="m-l-8">{{ toMember.nickName }}</div>
      </div>
      <div class="message-filter">
        <img src="@/assets/images/ic_close1.png" class="w-48 m-r-8" />
        <img src="@/assets/images/ic_note.png" class="w-48 m-r-20" />
      </div>
    </div>

    <div class="h-60 search-input p-r-20 p-l-20">
      <v-text-field
        color="#FFF"
        placeholder="輸入關鍵字查詢..."
        :height="40"
        v-model="searchKeyword"
      ></v-text-field>
    </div>
    <div class="flex-1 m-r-8">
      <VirtualScroller
        :is-chat-mode="true"
        :list="chatList.map((x, index) => ({ ...x, seq: index }))"
        :item-default-height="30"
        :uni-key="'seq'"
      >
        <template #default="slotScope">
          <div
            :id="'chat-' + slotScope.item[slotScope.uniKey]"
            :key="slotScope.item[slotScope.uniKey]"
            :style="{ 'min-height': slotScope.height + 'px' }"
            class="chat-row"
          >
            <span class="message">
              {{ slotScope.item.message }}
            </span>
          </div>
        </template>
      </VirtualScroller>
    </div>
    <div class="h-60 send-message-contrainer">
      <div class="flex flex-1 align-center p-r-20 p-l-20">
        <v-text-field
          color="#FFF"
          :height="36"
          placeholder="輸入訊息..."
          v-model="message"
        ></v-text-field>
      </div>
      <div class="w-48 m-l-40 m-r-20 send-message-btn" @click="sendMessage">
        <img src="@/assets/images/ic_sent.png" class="w-48" />
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapState } from "vuex";
import VirtualScroller from "@/components/VirtualScroller";
import { loginInfo } from "@/assets/mock/member.js";
export default {
  name: "ToChat",
  components: { VirtualScroller },
  data: () => {
    return {
      chatList: [],
      searchKeyword: "",
      message: "",
    };
  },
  computed: {
    ...mapState({
      toMember: (state) => state.chat.toMember,
    }),
  },
  watch: {
    toMember: {
      handler: function (newToMember) {
        this.chatList = [];
        this.greetingShow(newToMember);
      },
      deep: true,
    },
  },

  methods: {
    greetingShow(toMember) {
      
      let hobby = loginInfo.likes.find((x) => x.like == toMember.like);

      this.chatList.push({
        memberId: this.toMember.memberId,
        message: toMember.nickName,
      });

      this.chatList.push({
        memberId: this.toMember.memberId,
        message: `你好, 我是${loginInfo.name}`,
      });
      
      this.chatList.push({
        memberId: this.toMember.memberId,
        message: this.$t(`common.likeType${hobby.like}`),
      });

      this.chatList.push({
        memberId: this.toMember.memberId,
        message: hobby.value,
      });
    },
    sendMessage() {
      if (!this.toMember.memberId) {
        alert("請先選擇交談對象");
        return;
      }

      let newMessage = {
        memberId: this.toMember.memberId,
        message: this.message,
      };

      this.chatList.push(newMessage);
      this.message = "";
    },
  },
};
</script>

<style lang="scss">
.chat-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  .to-member-container {
    display: flex;
    box-shadow: 2px 2px 5px rgb(0 0 0 / 15%);
    align-items: center;
    .to-member {
      display: flex;
      flex: 1;
      justify-content: flex-start;
      align-items: center;
      font-size: 24px;
      font-weight: bold;

      .to-member-head-img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid #67e7ca;
      }
    }

    .message-filter {
      flex: 1;
      display: flex;
      justify-content: flex-end;
    }
  }

  .search-input {
    display: flex;
    box-shadow: 2px 2px 5px rgb(0 0 0 / 15%);
    align-items: center;

    .v-input__control {
      flex-wrap: nowrap;
      flex-direction: unset;
    }

    .v-text-field input {
      padding: 0 !important;
    }

    .v-input__slot::before {
      border-style: none !important;
    }
  }

  .chat-row {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    padding-left: 12px;
    font-size: 26px;
    word-break: break-all;
    box-sizing: border-box;
    background-color: "#4a90e2";
    padding-top: 12px;

    .message {
      line-height: 36px;
      background: #4a90e2;
      padding: 8px 16px;
      border-radius: 26px;
      margin-right: 8px;
      color: #fff;
    }
  }

  .send-message-contrainer {
    display: flex;
    align-items: center;
    border-top: 1px solid #67e7ca;

    .v-input__control {
      flex-wrap: nowrap;
      flex-direction: unset;
    }

    .v-text-field input {
      padding: 0 !important;
    }

    .v-input__slot::before {
      border-style: none !important;
    }
  }

  .send-message-btn {
    display: flex;
    align-items: center;
  }
}
</style>
