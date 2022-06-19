const state = {
  toMember: {},
};
const mutations = {
  ["SET_TO_MEMBER"](state, payload) {
    state.toMember = payload;
  },
};

const actions = {
  setToMember({ commit }, payload) {
    commit("SET_TO_MEMBER", payload);
  },
};

const getters = {};

export default {
  namespaced: true, // 將 !state 轉為 區域變數
  state,
  getters,
  actions,
  mutations,
};
