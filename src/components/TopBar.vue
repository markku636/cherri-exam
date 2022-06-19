/* eslint-disable no-debugger */
<template>
  <v-app-bar app color="#4a90e2" dark class="chat-title-bar">
    <div class="d-flex align-center">
      <span class="chat-title">Cherri Chat</span>
    </div>

    <v-spacer></v-spacer>
    <span class="m-r-8">{{ $t("message") }}</span>
    <v-btn
      rounded
      :outlined="lang.value != $i18n.locale"
      :color="'#FFF'"
      class="m-r-8 lang-btn"
      :class="{ active: lang.value == $i18n.locale }"
      v-for="lang in langs"
      :key="'lang-' + lang.value"
      @click="setLang(lang.value)"
      >{{ lang.name }}
    </v-btn>
    <v-app-bar-nav-icon @click="setShowDraw(showDraw)"> </v-app-bar-nav-icon>

    <v-btn
      href="https://github.com/vuetifyjs/vuetify/releases/latest"
      target="_blank"
      text
    >
      <div class="user-img m-r-8"></div>
      <span class="f-24 f-bold">{{ userInfo.name }}</span>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    langs: [
      { name: "中文", value: "tw" },
      { name: "English", value: "en" },
    ],
    userInfo: {
      name: "潔西卡",
      img: "",
    },
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
