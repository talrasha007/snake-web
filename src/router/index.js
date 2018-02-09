import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: { name: window.web3 ? 'mySnake' : 'error' }
    },
    {
      path: '/my-snake',
      name: 'mySnake',
      component: HelloWorld
    }
  ]
})
