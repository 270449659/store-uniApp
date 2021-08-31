import * as localConfig from '../local/config'
import request from '@/common/request.js'

const webUrl = localConfig.websiteUrl

//确认订单
function getCheckoutList(o){
	return new Promise((reslove, reject) => {
		request.post(webUrl + 'App.Order.orderDetailListApi',o).then(res=>{
			if(res.ret==200){
			   reslove(res.data)
			}else{
				uni.showToast({ title: res.msg, icon: "none" });
			}
		})
	})
};

function getExpressList(o){
	return new Promise((reslove, reject) => {
		request.post(webUrl + 'App.Shipping.shippingListApi',o).then(res=>{
			if(res.ret==200){
			   reslove(res.data)
			}else{
				uni.showToast({ title: res.msg, icon: "none" });
			}
		})
	})
};
function getExpressTwoList(o){
	return new Promise((reslove, reject) => {
		request.post(webUrl + 'App.Shipping.ShippingListTopApi',o).then(res=>{
			if(res.ret==200){
			   reslove(res.data)
			}else{
				uni.showToast({ title: res.msg, icon: "none" });
			}
		})
	})
};
function getSubmitOrder(o){
	return new Promise((reslove, reject) => {
		request.post(webUrl + 'App.Order.OrderSaveCartApi',o).then(res=>{
			if(res.ret==200){
			   reslove(res.data)
			}else{
				uni.showToast({ title: res.msg, icon: "none" });
			}
		})
	})
};

function getOrderList(o){
	return new Promise((reslove, reject) => {
		request.post(webUrl + 'App.Order.orderlistActionApi',o).then(res=>{
			if(res.ret==200){
			   reslove(res.data)
			}else{
				uni.showToast({ title: res.msg, icon: "none" });
			}
		})
	})
};

function getOrderDetailInfo(o){
	return new Promise((reslove, reject) => {
		request.post(webUrl + 'App.Order.orderdetailGetApi',o).then(res=>{
			if(res.ret==200){
			   reslove(res.data)
			}else{
				uni.showToast({ title: res.msg, icon: "none" });
			}
		})
	})
};

export default{
	getCheckoutList, 
	getExpressList,
	getExpressTwoList,
	getSubmitOrder,
	getOrderList,
	getOrderDetailInfo
}