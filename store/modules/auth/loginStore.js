import {
	USER_LOGIN,
} from '../../mutation-type.js'
import { apiUser } from '@/config'
const state = {}
const getters = {
	
}
const mutations = {
	[USER_LOGIN](state,o){
		state.token = o.data;
		//存本地token
		uni.setStorage({
			key:'token',
			data:o.data,
			success: (res) => {
				uni.reLaunch({ 
					url:'/pages/home/home'
				});
			}
		});
	},
}
const actions = {
	userPwdLogin({ commit }, o){
			apiUser.getLogins(o).then(res=>{
				commit(USER_LOGIN,res)
			})
		},
	userRegister({ commit }, o){
		return apiUser.getRegister(o)
	},	
}
export default {
	state,
	getters,
	mutations,
	actions
}