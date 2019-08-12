import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Lobby from './views/Lobby.vue';
import Match from './views/Match.vue';
import Position from './views/Position.vue';
Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/lobby',
      name: 'lobby',
      component: Lobby,
    },
    {
      path: '/match',
      name: 'match',
      component: Match,
    },
    {
      path: '/position',
      name: 'position',
      component: Position,
    },
  ],
});
