/* eslint-disable no-debugger */
<template>
  <v-app-bar app color="#4a90e2" dark class="chat-title-bar">
    <div class="d-flex align-center">
      <span class="chat-title">Cherri Chat</span>
    </div>

    <v-spacer></v-spacer>
    <span class="m-r-8">{{ $t("message") }}</span>
    <v-app-bar-nav-icon @click="setShowDraw(showDraw)"> </v-app-bar-nav-icon>
    <v-btn
      rounded
      :outlined="lang.value != $i18n.locale"
      :color="'#FFF'"
      class="m-r-8 lang-btn"
      :height="28"
      :class="{ active: lang.value == $i18n.locale }"
      v-for="lang in langs"
      :key="'lang-' + lang.value"
      @click="setLang(lang.value)"
      >{{ lang.name }}
    </v-btn>
    <v-divider vertical class="mx-2"></v-divider>

    <v-btn
      href="https://github.com/vuetifyjs/vuetify/releases/latest"
      target="_blank"
      text
    >
      <div class="user-img m-r-8"></div>
      <span class="f-24 f-bold">{{ loginInfo.name }}</span>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";
import { loginInfo } from "@/assets/mock/member.js";
export default {
  data: () => ({
    langs: [
      { name: "中文", value: "tw" },
      { name: "English", value: "en" },
    ],
    loginInfo: loginInfo,
  }),
  computed: {
    ...mapState({
      showDraw: (state) => state.showDraw,
    }),
  },
  methods: {
    setShowDraw(showDraw) {
      this.$store.dispatch("setShowDraw", !showDraw);
    },
    setLang(lang) {
      this.$store.dispatch("setLang", lang);
    },
  },
};
</script>
