import {
	SET_GOODS_INFO,
	SET_GOODS_NAV_LIST,
	SET_GOODS_LIST
	
} from '../mutation-type.js'
import { apiGoods } from '@/config'
const state = {
    goodsNavLists:{},
	goodsLists:{},
	categorySecondary:{},
    goodsInfo:{},
	goodsHasCollect:false
}
const getters = {
	
}
const mutations = {
	[SET_GOODS_INFO](state,o){
	    state.goodsInfo = o;
		console.log(o)
	    state.goodsHasCollect= o.collected;
	},
	
	//SET_GOODS_COMMENT(state,o){
	// 	if(o.error_code===0){	
	// 		state.comments.total = o.total;
	// 		state.comments.reviews = o.reviews;
	// 	}
	//},
	[SET_GOODS_NAV_LIST](state,o){
		
			state.goodsNavLists = o;	
			//console.log('state',state.goodsNavLists)
			
	},
	[SET_GOODS_LIST](state,o){
			state.goodsLists = o;	
			//console.log('12')
			state.setGoodsCollect=true;
	},
	setGoodsCollect({ commit }, o){
		apiGoods.getGoodsCollect(o).then(res => {
			//console.log('12',res)
			state.goodsHasCollect=res.res
			if(res.res){
			}
		})
	},
}
const actions = {
	//商品详情
	setGoodsInfo({ commit }, o){
		apiGoods.getGoodsInfo(o).then(res => {
			//console.log('12',res)
			commit(SET_GOODS_INFO,res)
		})
	},
	// setGoodsComment({ commit }, o){
	// 	apiGoods.getGoodsComment(o).then(res => {
	// 		commit(SET_GOODS_COMMENT,res)
	// 	})
	// },
	//
	setGoodsNavList({ commit }, o){
		apiGoods.getGoodsNavList(o).then(res =>{
			commit(SET_GOODS_NAV_LIST,res)
		})
		
	},
	//商品列表
	setGoodsList({ commit }, o){
		apiGoods.getGoodsList(o).then(res =>{
			commit(SET_GOODS_LIST,res)
		})
		
	}
	
}
export default {
	state,
	getters,
	mutations,
	actions
}