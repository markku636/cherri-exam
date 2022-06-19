import Vue from "vue";
import Vuex from "vuex";
import { app } from "@/main"; //匯入我們的Vue Instance

Vue.use(Vuex);

const modulesFiles = require.context("./modules", true, /\.js$/);

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

export default new Vuex.Store({
  state: {
    showDraw: true,
  },
  mutations: {
    ["SET_LANG"](state, payload) {
      app.$i18n.locale = payload; // 改變語言
    },
    ["SET_SHOWDRAW"](state, payload) {
      state.showDraw = payload;
    },
  },
  actions: {
    setLang({ commit }, payload) {
      commit("SET_LANG", payload);
    },
    setShowDraw({ commit }, payload) {
      commit("SET_SHOWDRAW", payload);
    },
    
  },
  modules: modules,
  getters: {},
});
