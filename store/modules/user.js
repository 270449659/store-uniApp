import {
	USER_LOGIN,
	SET_MEMBER_INFO
} from '../mutation-type.js'
import { apiUser } from '@/config'
const state = {
	token:'',
	memberInfo:{
		allOrderNum:{},
		info:{},
		rank_name:{}
	}
}
const getters = {
	
}
const mutations = {
	[USER_LOGIN](state,o){
		if(o.is_login){
			state.token = o.token;
			//存本地token
			//console.log('o',o)
			uni.setStorageSync('user_id', o.user_id);
			uni.setStorage({
				key:'token',
				data:o.sess_id,
				success: (res) => {
					console.log('1')
					uni.reLaunch({ 
						url:'/pages/home/homeIndex'
					});
				}
			});
		}else{
			uni.showToast({
			    title:o.msg,
				icon:'error',
			    duration: 2000
			});
		}
		
		
	},
	[SET_MEMBER_INFO](state,o){
		console.log('o',o)
		state.memberInfo=o
	}
}
const actions = {
	userPwdLogin({ commit }, o){
		apiUser.getLogins(o).then(res=>{
			commit(USER_LOGIN,res)
		})
	},
	userRegister({ commit }, o){
		apiUser.getRegister(o)
	},
	setMemberInfo({ commit }, o){
		apiUser.getMemberInfo(o).then(res=>{
			commit(SET_MEMBER_INFO,res)
		})
	},
}
export default {
	state,
	getters,
	mutations,
	actions
}