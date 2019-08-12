import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import 'bootstrap';
import './assets/scss/global.scss';

// tslint:disable-next-line:no-var-requires
const VuePageTransition = require('vue-page-transition');

Vue.config.productionTip = false;
Vue.use(VuePageTransition);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
