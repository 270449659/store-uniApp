import {
	GET_BANNERS,GET_HOME_INFO
} from '../mutation-type.js'
import { apiHome } from '@/config'
const state = {
	banners:[],
	modules:[],
	scopeUserInfo:null,
}
const getters = {
	
}
const mutations = {
		[GET_BANNERS](state,o){
			state.banners = o;
			//console.log('state',state.banners)
		},
		[GET_HOME_INFO](state,o){
			state.modules = o;
			uni.hideLoading()
			//console.log('state',state.modules)
			state.scopeUserInfo='';
		},
}
const actions = {
	setbanner({ commit }){
		apiHome.getbanners().then(res =>{
			commit(GET_BANNERS,res)
		})
		
	},
	setHome({ commit }){
		apiHome.getHomes().then(res =>{
			commit(GET_HOME_INFO,res)
		})
		
	}
	
}
export default {
	state,
	getters,
	mutations,
	actions
}