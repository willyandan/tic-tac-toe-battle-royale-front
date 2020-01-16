import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    matchKey: null,
    players: 0,
    total: 0,
    match: null,
    position: 0,
    turn: null,
  },
  mutations: {
    setMatchKey(state, key) {
      state.matchKey = key;
    },

    setNumberOfPlayers(state, players: number) {
      state.players = players;
    },

    setTotal(state, total) {
      state.total = total;
    },

    setMatch(state, val) {
      state.match = val;
    },

    setPosition(state, val: number ) {
      state.position = val;
    },
    setTurn(state, val) {
      state.turn = val;
    }
  },
  actions: {

  },
});
