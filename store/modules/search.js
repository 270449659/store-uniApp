import {
	SET_HOTSEARCH,

} from '../mutation-type.js'
import { apiSearch } from '@/config'
const state = {
	hotSearch:[],
}
const getters = {
	
}
const mutations = {
		[SET_HOTSEARCH](state,o){
			state.hotSearch = o.hotKeywordList;
			console.log('state',state)
	        uni.hideLoading()
		},
		
}
const actions = {
	setHotSearch({ commit }){
		apiSearch.getHotSearch().then(res =>{
			commit(SET_HOTSEARCH,res)
		})
		
	},
	
	
}
export default {
	state,
	getters,
	mutations,
	actions
}