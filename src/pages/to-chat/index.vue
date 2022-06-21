<template>
  <div class="chat-container">
    <div
      class="to-member-container h-60"
      v-show="Object.keys(toMember).length > 0"
    >
      <div class="to-member p-l-20 p-t-12 p-b-12">
        <img class="to-member-head-img w-44 h-44" />
        <div class="m-l-8">{{ toMember.nickName }}</div>
      </div>
      <div class="message-filter">
        <div
          class="search-botton m-r-8"
          :class="{ active: activeBtn === SearchButtonType.Search }"
        >
          <img
            :src="require('@/assets/images/ic_search.png')"
            @click="activeBtn = SearchButtonType.Search"
            class="w-44 h-44"
          />
        </div>

        <v-menu
          :position-y="140"
          absolute
          offset-y
          transition="scale-transition"
          v-model="memoShow"
          :close-on-content-click="false"
        >
          <template v-slot:activator="{ on, attrs }">
            <div
              class="search-botton m-r-20"
              :class="{
                active: memoShow && activeBtn === SearchButtonType.Memo,
              }"
              v-bind="attrs"
              v-on="on"
              @click="activeBtn = SearchButtonType.Memo"
            >
              <img src="@/assets/images/ic_note.png" class="w-48 h-48" />
            </div>
          </template>

          <v-card>
            <MemoList />
          </v-card>
        </v-menu>
      </div>
    </div>

    <div
      class="h-60 search-input-container p-r-20 p-l-20"
      v-show="
        Object.keys(toMember).length > 0 &&
        activeBtn === SearchButtonType.Search
      "
    >
      <div class="flex-1 m-r-8">
        <v-text-field
          color="#FFF"
          :placeholder="$t('chat.inputKeyword')"
          :height="40"
          v-model="search"
        />
      </div>
      <div class="w-168">
        <div class="flex justify-end align-center">
          <span class="m-r-12 f-20"> {{ matchCount }}則符合訊息 </span>
          <img
            :src="require('@/assets/images/ic_close1.png')"
            @click="search = ''"
            class="w-36 h-36"
          />
        </div>
      </div>
    </div>

    <div class="flex-1 m-r-8">
      <VirtualScroller
        :is-chat-mode="true"
        :list="chatList.map((x, index) => ({ ...x, seq: index }))"
        :item-default-height="64"
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
          :placeholder="$t('chat.inputMessage')"
          v-model="message"
          v-on:keyup.enter="sendMessage"
        ></v-text-field>
      </div>
      <div class="w-48 m-l-40 m-r-20 send-message-btn" @click="sendMessage">
        <img src="@/assets/images/ic_sent.png" class="w-48" />
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import Mark from "mark.js/dist/mark.es6.js";
import MemoList from "./components/MemoList";
import { mapState } from "vuex";
import VirtualScroller from "@/components/VirtualScroller";
import { loginInfo } from "@/assets/mock/member.js";
import { SearchButtonType } from "@/common/enums";

export default {
  name: "ToChat",
  components: { VirtualScroller, MemoList },
  data: () => {
    return {
      SearchButtonType,
      chatList: [],
      search: "",
      message: "",
      activeBtn: "",
      matchCount: 0,
      memoShow: false,
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
        this.greetingInit(newToMember);
      },
      deep: true,
      immediate: true,
    },
    search: function (val) {
      if (val) {
        this.matchCount = this.chatList.filter(
          (x) => x.message.indexOf(val) > -1
        ).length;

        this.heightLightMessage(val);
      }
    },
  },
  methods: {
    heightLightMessage(text) {
      let context = document.querySelectorAll(".chat-row");
      var instance = new Mark(context);
      instance.unmark();
      instance.mark(text);
    },
    greetingInit(toMember) {
      if (Object.keys(toMember).length === 0) {
        return;
      }

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
      if (!this.message) {
        return;
      }

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
  overflow: hidden;
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

  .search-input-container {
    display: flex;
    box-shadow: 2px 2px 5px rgb(0 0 0 / 15%);
    align-items: center;
    border-bottom: 1px solid #67e7ca;

    .match-count-text {
      color: #a3a4b1;
    }

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
  .search-botton {
    display: flex;
    align-items: center;
    justify-content: center;

    &.active {
      background-color: #f4f4f4;
      border: 1px solid #f0f0f0;
      border-radius: 50%;
    }

    img {
      padding: 4px;
    }
  }
}
</style>
