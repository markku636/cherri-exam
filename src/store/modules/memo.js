const state = {
  memoList: [
    {
      memoId: "dfaadfadfad",
      memberId: 1,
      date: new Date(),
      memo: "1234",
    },
    {
      memoId: "dfaadfadfad1123",
      memberId: 1,
      date: new Date(),
      memo: "12345",
    },
  ],
};
const mutations = {
  ["ADD_MEMO"](state, payload) {
    state.memoList.push(payload);
  },
  ["REMOVE_MEMO"](state, payload) {
    state.memoList = state.memoList.filter((x) => x.memoId != payload);
  },
};

const actions = {
  addMemo({ commit }, payload) {
    commit("ADD_MEMO", payload);
  },
  removeMemo({ commit }, payload) {
    commit("REMOVE_MEMO", payload);
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
