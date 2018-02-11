import Vue from 'vue';
import Router from 'vue-router';
import Profile from '../components/Profile';
import Snake, { Info, Auction } from '../components/Snake';
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
      path: '/profile/:account',
      name: 'profile',
      component: Profile
    },
    {
      path: '/snake/:id',
      component: Snake,
      children: [
        {
          path: '',
          name: 'snake',
          component: Info
        },
        {
          path: 'sell',
          name: 'snake.sell',
          component: Auction
        },
        {
          path: 'sire',
          name: 'snake.sire',
          component: Auction
        }
      ]
    },
    {
      path: '/marketplace',
      component: Marketplace,
      children: [
        {
          path: '',
          component: OnSale,
          name: 'marketplace'
        },
        {
          path: 'siring',
          component: Siring,
          name: 'marketplace.siring'
        },
        // {
        //   path: 'gen0',
        //   name: 'marketplace.gen0'
        // },
        {
          path: 'all',
          component: All,
          name: 'marketplace.all'
        }
      ]
    }
  ]
})
