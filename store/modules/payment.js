import {
   SET_PAY_DETAIL
} from '../mutation-type.js'
import { apiPayment } from '@/config'

const state = {
 payDetail:{},
 paymentList:[],
 testingPay:{},
 payResult:false,
}
const mutations = {
	SET_PAY_DETAIL(state,o){
		if(o.pay_detail){
			state.payDetail=o.info;
			console.log('确认订单2',o)
		}else{
			uni.showToast({
			    title: '没有登录',
			    duration: 2000
			});
		}
	},
	//支付方式
	setPaymentList({ commit }, o){
		apiPayment.getPaymentList(o).then(res => {
			if(res.payment_list){
				state.paymentList=res.info;
				console.log('方式',res)
			}
		  
		})
	},
	//检测支付方式
	setPaymentIsUse({ commit }, o){
		apiPayment.getPaymentIsUse(o).then(res => {
			if(res){
				state.testingPay=res;
				console.log('检测方式',res)
			}
		  
		})
	},
	//h5支付
	setPaymentSubmit({ commit }, o){
		apiPayment.getPaymentSubmit(o).then(res => {
			if(res.dopay){
				setTimeout(()=> {
				    uni.hideLoading();
				}, 1000);
				state.payResult=res.dopay;
				console.log('支付结果',res)
			}else{
				uni.showToast({
				    title: res.info,
					icon:'error',
				    duration: 2000
				});
			}
		  
		})
	},
	
}

const actions = {
	setPayDetail({ commit }, o){
		apiPayment.getPayDetail(o).then(res => {
			commit('SET_PAY_DETAIL',res)
		})
	},
}
export default {
	state,
	mutations,
	actions
}