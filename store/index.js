import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import login from './modules/login' //登录
import home from './modules/home' //首页
import userStore from './modules/user' //个人中心
import goodsStore from './modules/goodsStore' //商品
import shopping from './modules/shopping'//购物车
import categoryStore from './modules/categoryStore'//分类
import searchStore from './modules/search'//搜索
import orderStore from './modules/order'//订单
import paymentStore from './modules/payment'//支付
import addressStore from './modules/address'//地址




export default new Vuex.Store({
  modules: {
	  login,
	  home,
	  userStore,
	  goodsStore,
	  shopping,
	  categoryStore,
	  searchStore,
	  orderStore,
	  paymentStore,
	  addressStore
  }
});