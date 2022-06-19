<template>
  <div class="chat-container">
    <div class="to-member-container h-60">
      <div class="to-member p-l-20 p-t-12 p-b-12">
        <img class="to-member-head-img" />
        <div class="m-l-8">{{ toMember.nickName }}</div>
      </div>
      <div class="message-filter">filter</div>
    </div>

    <div class="h-60">search input</div>
    <div class="flex-1 m-r-8">
      <VirtualScroller
        :is-chat-mode="true"
        :list="chatList.map((x, index) => ({ ...x, seq: index }))"
        :item-default-height="30"
        :uni-key="'seq'"
      >
        <template #default="slotScope">
          <!-- id 一定要給 -->
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
    <div class="h-60">Send Message</div>
  </div>
</template>

<script type="text/javascript">
import { mapState } from "vuex";
import VirtualScroller from "@/components/VirtualScroller";
export default {
  name: "ToChat",
  components: { VirtualScroller },
  data: () => {
    return {
      chatList: [
        { userId: 2, message: "1123121" },
        { userId: 2, message: "1123121" },
        { userId: 2, message: "1123121" },
        { userId: 2, message: "1123121" },
        { userId: 2, message: "1123121" },
        { userId: 2, message: "1123121" },
        { userId: 2, message: "1123121" },
        { userId: 2, message: "1123121" },
        { userId: 2, message: "1123121" },
        { userId: 2, message: "1123121" },
        { userId: 2, message: "1231111" },
        { userId: 2, message: "1123121" },
        { userId: 2, message: "1123121" },
        { userId: 2, message: "1123121" },
        { userId: 2, message: "1123121" },
        { userId: 2, message: "1123121" },
        { userId: 2, message: "1123121" },
        { userId: 2, message: "1123121" },
        { userId: 2, message: "1123121" },
        { userId: 2, message: "1123121" },
        { userId: 2, message: "1123121" },
        { userId: 2, message: "1123121" },
        { userId: 2, message: "1123121" },
        { userId: 2, message: "1123121" },
        { userId: 2, message: "1123121" },
        { userId: 2, message: "1123121" },
        { userId: 2, message: "1123121" },
        { userId: 2, message: "1123121" },
        { userId: 2, message: "1123121" },
        { userId: 2, message: "1123121" },
        { userId: 2, message: "1123121" },
        { userId: 2, message: "1123121" },
      ],
    };
  },
  computed: {
    ...mapState({
      toMember: (state) => state.chat.toMember,
    }),
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
      justify-content: flex-end;
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
    padding-top: 8px;
    padding-bottom: 8px;

    .message {
      line-height: 36px;
      background: #4a90e2;
      padding: 8px 16px;
      border-radius: 26px;
      margin-right: 8px;
      color: #fff;
    }
  }
}
</style>
