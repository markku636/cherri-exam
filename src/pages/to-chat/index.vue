<template>
  <div class="chat-container">
    <div class="to-member-container">
      <div class="to-member p-l-20 p-t-12">
        <img class="to-member-head-img" />
        <div class="m-l-8">{{ toMember.nickName }}</div>
      </div>
      <div class="message-filter">filter</div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapState } from "vuex";
export default {
  name: "ToChat",
  computed: {
    ...mapState({
      toMember: (state) => state.chat.toMember,
    }),
  },
};
</script>

<style lang="scss">
.chat-container {
  width: 100%;
  width: 100%;

  .to-member-container {
    display: flex;

    .to-member {
      display: flex;
      flex: 1;
      justify-content: flex-start;
      align-items: center;
      font-size: 24px;
      font-weight:bold;

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
}
</style>
