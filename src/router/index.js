import Vue from 'vue';
import Router from 'vue-router';
import Profile from '@/components/Profile';
import Marketplace, { SnakeList } from '@/components/Marketplace';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: { name: window.web3 ? 'mySnake' : 'error' }
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
