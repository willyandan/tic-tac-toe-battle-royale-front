import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io-extended';
import './registerServiceWorker';
import 'bootstrap';
import './assets/scss/global.scss';
import VueSwal from 'vue-sweetalert2';

// tslint:disable-next-line:no-var-requires
const VuePageTransition = require('vue-page-transition');

export const SocketInstance = socketio('http://localhost:3000/');

Vue.config.productionTip = false;
Vue.use(VuePageTransition);
Vue.use(VueSwal);
Vue.use(VueSocketIO, SocketInstance);
new Vue({
  router,
  store,
  render: (h) => h(App),
  sockets: {
    initMatch(val) {
      this.$store.commit('setMatch', val);
      this.$router.push({
        name: 'match',
      });
    },
    turn(val) {
      this.$store.commit('setTurn', val);
    },
    end_match() {
      this.$store.commit('setMatchKey', null);
      this.$store.commit('setMatch', null);
      this.$store.commit('setPosition', 1);
      this.$router.replace({
        name: 'position',
      });
    },
  },
}).$mount('#app');
