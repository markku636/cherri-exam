<template>
  <div class="edit-memo">
    <v-textarea
      outlined
      name="input-7-4"
      label=""
      placeholder="輸入訊息..."
      v-model="newMemo.memo"
      color="#4a90e2"
    ></v-textarea>
    <v-btn depressed color="#4a90e2" class="submit-btn" @click="addMemo"
      >新增</v-btn
    >
  </div>
</template>

<script>
import { mapState } from "vuex";
import { generatorUUID } from "@/utils";
export default {
  name: "EditInfo",
  data() {
    return {
      newMemo: {
        memoId:"",
        memberId:"",
        date:"",
        memo: "1111111111111111111",        

      },
    };
  },
  computed: {
    ...mapState({
      toMember: (state) => state.chat.toMember,
    }),
  },

  created() {},
  methods: {
    addMemo() {
      this.newMemo.memoId = generatorUUID();
      this.newMemo.memberId = this.toMember.memberId;
      this.newMemo.date = new Date();

      this.$store.dispatch("memo/addMemo", this.newMemo);
    },
  },
};
</script>

<style lang="scss">
.edit-memo {
  width: 100%;

  .submit-btn {
    border-radius: 0;
    width: 100%;
    &.v-btn {
      color: #fff;
    }
  }

  .v-text-field.v-text-field--enclosed .v-input__slot {
    padding: 0;
  }
  .v-text-field__details {
    min-height: 0px;
    .v-messages {
      min-height: 0px;
    }
  }

  .v-input textarea {
    border-color: #4a90e2;
  }
  .v-input__slot fieldset {
    border-color: #4a90e2;
  }
}
</style>
