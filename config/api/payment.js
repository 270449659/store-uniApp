import * as localConfig from '../local/config'
import request from '@/common/request.js'

const webUrl = localConfig.websiteUrl


//确认订单
function getPayDetail(o){
	return new Promise((reslove, reject) => {
		request.post(webUrl + 'App.Pay.payDetailApi',o).then(res=>{
			if(res.ret==200){
			   reslove(res.data)
			}else{
				uni.showToast({ title: res.msg, icon: "none" });
			}
		})
	})
};

//支付方式
function getPaymentList(o){
	return new Promise((reslove, reject) => {
		request.post(webUrl + 'App.Pay.getPaymentListApi',o).then(res=>{
			if(res.ret==200){
			   reslove(res.data)
			}else{
				uni.showToast({ title: res.msg, icon: "none" });
			}
		})
	})
};

//检测支付方式
function getPaymentIsUse(o){
	return new Promise((reslove, reject) => {
		request.post(webUrl + 'App.Pay.getPaymentIsUseApi',o).then(res=>{
			if(res.ret==200){
			   reslove(res.data)
			}else{
				uni.showToast({ title: res.msg, icon: "none" });
			}
		})
	})
};

//H5支付
function getPaymentSubmit(o){
	return new Promise((reslove, reject) => {
		request.post(webUrl + 'App.Pay.doPaymentBalanceApi',o).then(res=>{
			if(res.ret==200){
			   reslove(res.data)
			}else{
				uni.showToast({ title: res.msg, icon: "none" });
			}
		})
	})
};

export default{
	getPayDetail, 
	getPaymentList,
	getPaymentIsUse,
	getPaymentSubmit
}