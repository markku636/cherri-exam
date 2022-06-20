const state = {
  memoList: [],
};
const mutations = {
  ["PUSH_MEMO"](state, payload) {
    state.toMember.push(payload);
  },
};

const actions = {
  pushMemo({ commit }, payload) {
    commit("PUSH_MEMO", payload);
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
