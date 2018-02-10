import Vue from 'vue';
import Router from 'vue-router';
import Profile from '../components/Profile';
import Marketplace from '../components/Marketplace';
import SnakeList from '../components/SnakeList';
import Admin from '../components/Admin';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: { name: window.web3 ? 'mySnake' : 'error' }
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/my-snake',
      name: 'mySnake',
      component: Profile
    },
    {
      path: '/marketplace',
      name: 'marketplace',
      component: Marketplace,
      children: [
        {
          path: 'selling',
          component: SnakeList,
          name: 'marketplace.selling'
        },
        {
          path: 'siring',
          component: SnakeList,
          name: 'marketplace.siring'
        },
        {
          path: 'gen0',
          component: SnakeList,
          name: 'marketplace.gen0'
        },
        {
          path: 'all',
          component: SnakeList,
          name: 'marketplace.all'
        }
      ]
    }
  ]
})
