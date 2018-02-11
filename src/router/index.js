import Vue from 'vue';
import Router from 'vue-router';
import Profile from '../components/Profile';
import Marketplace, { OnSale, Siring, All } from '../components/Marketplace';
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
          component: OnSale,
          name: 'marketplace.selling'
        },
        {
          path: 'siring',
          component: Siring,
          name: 'marketplace.siring'
        },
        {
          path: 'gen0',
          component: OnSale,
          name: 'marketplace.gen0'
        },
        {
          path: 'all',
          component: All,
          name: 'marketplace.all'
        }
      ]
    }
  ]
})
