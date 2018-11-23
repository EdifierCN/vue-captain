
const state = {
  isLoading: false,
  direction: 'forward',
  isFooter: false
};

const mutations = {
  updateLoadingStatus (state, payload) {
    state.isLoading = payload.isLoading;
  },
  updateDirection (state, payload) {
    state.direction = payload.direction
  },
  updateFooter (state, payload) {
    state.isFooter = payload.isFooter
  }
};

const actions = {

};

export default {
  state,
  mutations,
  actions
}
