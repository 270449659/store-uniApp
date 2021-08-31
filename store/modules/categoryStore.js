import {
	SET_CATEGORY_LIST,
	SET_CATEGORY_SECONDARY
} from '../mutation-type.js'
import { apiCategory } from '@/config'
const state = {
	categoryList:{},
	categorySecondary:{},
}
const getters = {
	
}
const mutations = {
		[SET_CATEGORY_LIST](state,o){
			state.categoryList = o;
			console.log('state',state.categoryList)
	        uni.hideLoading()
		},
		[SET_CATEGORY_SECONDARY](state,o){
			state.categorySecondary = o;
			console.log('state',state.categorySecondary)
			uni.hideLoading()
		},
}
const actions = {
	setCategoryList({ commit }){
		apiCategory.getCategoryList().then(res =>{
			commit(SET_CATEGORY_LIST,res)
		})
		
	},
	setCategorySecondary({ commit }, o){
		apiCategory.getCategorySecondary(o).then(res =>{
			commit(SET_CATEGORY_SECONDARY,res)
		})
		
	},
	
}
export default {
	state,
	getters,
	mutations,
	actions
}