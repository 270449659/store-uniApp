import {
	SET_GOODS_INFO,
	SET_GOODS_NAV_LIST,
	//SET_GOODS_LIST
	
} from '../mutation-type.js'
import { apiGoods } from '@/config'
const state = {
    goodsNavLists:{},
	goodsLists:{},
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
		if(o.ret===200){
			state.goodsNavLists = o.data;	
			//console.log('state',state.goodsNavLists)
		}		
	},
	// [SET_GOODS_LIST](state,o){
	// 	if(o.ret===200){
	// 		state.goodsLists = o.data;	
			
	// 		state.setGoodsCollect
			
	// 	}		
	// },
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
	setGoodsNavList({ commit }, o){
		apiGoods.getGoodsNavList(o).then(res =>{
			commit(SET_GOODS_NAV_LIST,res)
		})
		
	},
	// setGoodsList({ commit }, o){
	// 	apiGoods.getGoodsList(o).then(res =>{
	// 		commit(SET_GOODS_LIST,res)
	// 	})
		
	// }
	
}
export default {
	state,
	getters,
	mutations,
	actions
}