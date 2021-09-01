import {
	SET_SHOP_CONSIGNEE,
	SET_CART_LIST,
	SET_CART_ADD,
	SET_UPDATE_NUMBER
} from '../mutation-type.js'

import { apiShopping } from '@/config'

const state = {
 cartAdd:{},//购物车增加
 cartList:[],//购物车列表
 cartNum:'',
 cartTotal:{
	 goods_count:0,
 },//购物车数量
 updateNumber:{},//更新数量
 cartAddFast:false,//更新成功
 deleteCart:false//删除
}
const mutations = {
	
	// 购物车单选
    setCartCheck({ commit }, o){
		apiShopping.getCartCheck(o).then(res => {
			// console.log('2',res)
			
		})
	},
	// 购物车多选
	setCartCheckAll({ commit }, o){
		apiShopping.getCartCheckAll(o).then(res => {
			// console.log('2',res)
			
		})
	},
	SET_CART_LIST(state,o){
		uni.hideLoading()
		if(o.add_cart){
			state.cartList=o.info.goods_list;
			state.cartTotal=o.info.total;
			
		}else{
			state.cartList=[];//购物车列表
			state.cartTotal={};
		}
	    //console.log('购物车数量',o)
	},
	
	SET_CART_ADD(state,o){
		if(o.add_cart){
			state.cartAdd=o.goods;
			uni.showToast({
			    title: '加入购物车成功',
			    duration: 2000
			});
		}else{
			uni.showToast({
			    title:o.msg,
				icon:'error',
			    duration: 2000
			});
            
		}

	},
	
	SET_UPDATE_NUMBER(state,o){
		
		if(o.update_cart){
			state.updateNumber=o
		}else{
			uni.showToast({
			    title:o.msg,
				icon:'error',
			    duration: 2000
			});

		}
	},
    //更新
	setCartAddFast({ commit }, o){
		apiShopping.getCartAddFast(o).then(res => {
			console.log('更新',res)
			if(res.add_cart){
				state.cartAddFast=res.add_cart;
				uni.hideLoading()
			}else if(res.msg=="库存不足"){
				uni.showToast({
				    title:res.msg,
					icon:'error',
				    duration: 2000
				});
			}else{
				state.cartAddFast=res.add_cart;
				uni.showToast({
				    title:res.msg,
					icon:'error',
				    duration: 2000
				});
				uni.navigateTo({
					url:'/pages/login/login'			
				});
			}
			
		})
	},
	//删除
	setDeleteGoods({ commit }, o){
		apiShopping.getDeleteGoods(o).then(res => {
			console.log('删除',res)
			if(res.delete_cart){
				state.deleteCart=res.delete_cart;
				uni.hideLoading()
			}else{
				uni.showToast({
				    title:res.msg,
					icon:'error',
				    duration: 2000
				});
				// uni.navigateTo({
				// 	url:'/pages/login/login'			
				// });
			}
			
		})
	},
}

const actions = {
	
	setCartList({ commit }, o){
		apiShopping.getCartList(o).then(res => {
			commit('SET_CART_LIST',res)
			//console.log('setCartList res',res)
		})
	},
	
	setCartAdd({ commit }, o){
		apiShopping.getCartAdd(o).then(res => {
			commit('SET_CART_ADD',res)
		})
	},
	setUpdateNumber({ commit }, o){
		apiShopping.getUpdateNumber(o).then(res => {
			commit('SET_UPDATE_NUMBER',res)
		})
	},
}
export default {
  namespaced: true,
	state,
	mutations,
	actions
}