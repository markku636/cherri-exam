<template>
  <div class="memo-list">
    <EditMemo />
    <v-divider class="m-t-20"></v-divider>
    <template v-if="currentMemberList.length > 0">
      <div
        class="memo-card"
        v-for="item in currentMemberList"
        :key="item.memoId"
      >
        <div class="memo-head">
          <div class="memo-date">{{ item.date | dateTimeFormat }}</div>
          <img
            src="@/assets/images/ic_close2.png"
            class="memo-close w-12 h-12"
            @click="removeMemo(item.memoId)"
          />
        </div>
        <div class="memo-text">{{ item.memo }}</div>
      </div>
    </template>
    <template v-else>
      <div class="no-record">{{$t('chat.noRecord')}}</div>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import EditMemo from "./EditMemo";
export default {
  components: { EditMemo },
  data: () => {
    return {};
  },
  computed: {
    ...mapState({
      memoList: (state) => state.memo.memoList,
      toMember: (state) => state.chat.toMember,
    }),
    currentMemberList() {
      return this.memoList.filter((x) => x.memberId == this.toMember.memberId);
    },
  },
  methods: {
    removeMemo(memoId) {
      this.$store.dispatch("memo/removeMemo", memoId);
    },
  },
};
</script>

<style lang="scss">
.memo-list {
  width: 400px;
  padding: 20px;

  .theme--light.v-divider {
    border-color: #67e7ca;
  }

  .no-record {    
    padding: 8px;
    margin-top: 16px;
  }

  .memo-card {
    border: solid 1px #67e7ca;
    padding: 12px;
    margin-top: 16px;
    min-height: 120px;

    .memo-head {
      display: flex;
      align-items: center;
      .memo-date {
        color: #4a90e2;
        flex: 1;
      }

      .memo-close {
        display: flex;
        align-items: center;
        width: 12px;
      }
    }
    .memo-text {
      margin-top: 8px;
      display: block;
    }
  }
}
</style>
