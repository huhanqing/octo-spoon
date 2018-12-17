import Vue from 'vue'
import Router from 'vue-router'
import Header from '../components/header/Header'
import Goods from '../components/goods/Goods'
import Seller from '../components/seller/Seller'
import Ratings from '../components/ratings/Ratings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/header',
      component: Header
    },
    {
      path: '/goods',
      component: Goods
    },
    {
      path: '*',
      redirect: '/goods'
    },
    {
      path: '/seller',
      component: Seller
    },
    {
      path: '/ratings',
      component: Ratings
    },
  ],
  linkActiveClass:'active'
})
