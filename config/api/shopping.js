import * as localConfig from '../local/config'
import request from '@/common/request.js'

const webUrl = localConfig.websiteUrl

function getShopConsignee(o){
	return new Promise((reslove, reject) => {
		request.post(webUrl + 'App.User.addressGetListApi',o).then(res=>{
			if(res.ret==200){
			   reslove(res.data)
			}else{
				uni.showToast({ title: res.msg, icon: "none" });
			}
		})
	})
};

function getCartList(o){
	return new Promise((reslove, reject) => {
		request.post(webUrl + 'App.Cart.CartListApi',o).then(res=>{
			if(res.ret==200){
			   reslove(res.data)
			}else if(res.ret==403){	
				uni.showModal({
				    title: '没有登录',
				    content: '',
				   cancelText:'取消',
				   confirmText:'去登录',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
							  uni.navigateTo({
								url:'/pages/login/login'			
							  });
											   
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			}else{
				uni.showToast({ title: res.msg, icon: "none" });
			}
		})
	})
};
//更新购物车数据 
function getCartAdd(o){
	return new Promise((reslove, reject) => {
		request.post(webUrl + 'App.Cart.goodsAddCartApi',o).then(res=>{
			if(res.ret==200){
			   reslove(res.data)
			}else if(res.ret==403){
				uni.showModal({
				    title: '没有登录',
				    content: '',
				   cancelText:'取消',
				   confirmText:'去登录',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
							  uni.navigateTo({
								url:'/pages/login/login'			
							  });
											   
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			}else{
				uni.showToast({ title: res.msg, icon: "none" });
			}
		})
	})
};

// 单选
function getCartCheck(o){
	return new Promise((reslove, reject) => {
		request.post(webUrl + 'App.Cart.cartCheckApi',o).then(res=>{
			if(res.ret==200){
			   reslove(res.data)
			}else{
				uni.showToast({ title: res.msg, icon: "none" });
			}
		})
	})
};

// 多选
function getCartCheckAll(o){
	return new Promise((reslove, reject) => {
		request.post(webUrl + 'App.Cart.cartCheckAllApi',o).then(res=>{
			if(res.ret==200){
			   reslove(res.data)
			}else{
				uni.showToast({ title: res.msg, icon: "none" });
			}
		})
	})
};

// 删除
function getDeleteGoods(o){
	return new Promise((reslove, reject) => {
		request.post(webUrl + 'App.Cart.CartDelApi',o).then(res=>{
			if(res.ret==200){
			   reslove(res.data)
			}else{
				uni.showToast({ title: res.msg, icon: "none" });
			}
		})
	})
};
//更新购物车数据 立即购买
function getCartAddFast(o){
	return new Promise((reslove, reject) => {
		request.post(webUrl + 'App.Cart.goodsAddCartFastApi',o).then(res=>{
			if(res.ret==200){
			   reslove(res.data)	   
			}else if(res.ret==403){		
				uni.showModal({
				    title: '没有登录',
				    content: '',
				   cancelText:'取消',
				   confirmText:'去登录',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
							  uni.navigateTo({
								url:'/pages/login/login'			
							  });
											   
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			}else{
				uni.showToast({ title: res.msg, icon: "none" });
			}
		})
	})
};


function getUpdateNumber(o){
	return new Promise((reslove, reject) => {
		request.post(webUrl + 'App.Cart.cartUpdateNumApi',o).then(res=>{
			if(res.ret==200){
			   reslove(res.data)
			}else{
				uni.showToast({ title: res.msg, icon: "none" });
			}
		})
	})
};

export default {
	getShopConsignee,
	getCartList,
	getCartAdd,
	getUpdateNumber,
	getDeleteGoods,
	getCartAddFast,
	getCartCheck,
	getCartCheckAll
	
}