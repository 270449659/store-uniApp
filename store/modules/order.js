import {
	SET_CHECKOUT_LIST,
	SET_ORDER_LIST,
	SET_ORDER_DETAIL_INFO
} from '../mutation-type.js'
import { apiOrder } from '@/config'

const state = {
 checkoutInfo:{
	 total:{}
 },
  expressInfo:[],
  expressTwoInfo:[],
  orderId:'',
  orderList:[],
  orderDetailInfo:{},
  orderDetailGoods:[],	
  
}
const mutations = {
	SET_CHECKOUT_LIST(state,o){
		
		if(o.cart_init){
			state.checkoutInfo=o.info;
			console.log('确认订单',o)
		}else{
			uni.showToast({
			    title: '没有登录',
			    duration: 2000
			});
		}
	},
	
	//订单列表
	SET_ORDER_LIST(state,o){
		 uni.hideLoading();
		if(o.order_list){
			state.orderList=o.order_list;
			console.log('订单列表',o)
		}else{
			uni.showToast({
			    title: '没有登录',
			    duration: 2000
			});
		}
	},	
	//订单详情
	SET_ORDER_DETAIL_INFO(state,o){
		if(o){
			state.orderDetailInfo=o.orderInfo;
			state.orderDetailGoods=o.orderGoods;	
			console.log('订单详情',o)
		}else{
			uni.showToast({
			    title: '没有登录',
			    duration: 2000
			});
		}
	},	
	setExpressList({ commit }, o){
		apiOrder.getExpressList(o).then(res => {
			if(res.shipping_list){
				state.expressInfo=res.info;
				console.log('购',res)
			}
		  
		})
	},
	// 二级
	setExpressTwoList({ commit }, o){
		apiOrder.getExpressTwoList(o).then(res => {
			if(res.shipping_list){
				state.expressTwoInfo=res.info;
				console.log('购2',res)
			}
		})
	},
	// 二级-end
	
	setSubmitOrder({ commit }, o){
		apiOrder.getSubmitOrder(o).then(res => {
		if(res.gen_order){
			state.orderId=res.info.order_id;
			console.log('购2',res)
		}
		})
	},
	
}

const actions = {
	setCheckoutList({ commit }, o){
		apiOrder.getCheckoutList(o).then(res => {
			commit('SET_CHECKOUT_LIST',res)
		})
	},
	setOrderList({ commit }, o){
		apiOrder.getOrderList(o).then(res => {
			commit('SET_ORDER_LIST',res)
		})
	},
	setOrderDetailInfo({ commit }, o){
		apiOrder.getOrderDetailInfo(o).then(res => {
			commit('SET_ORDER_DETAIL_INFO',res)
		})
	},
	
}
export default {
	state,
	mutations,
	actions
}