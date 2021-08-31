import * as localConfig from '../local/config'
import request from '@/common/request.js'

const webUrl = localConfig.websiteUrl

function getGoodsInfo(o){
	return new Promise((resolve, reject) => {
		uni.request({
			url: webUrl + 'App.Goods.GoodsDetailActionApi',		
			method: 'POST',
			data: o,
			header: {
				'Content-Type':'application/x-www-form-urlencoded',
			},
			success: (res) => {
				if(res.data.ret ===200){
					resolve(res.data.data);
				}else{
					uni.showToast({title:res.data.error_desc,icon:'none'});
				}
				
			}
		})
	})
}
function getGoodsComment(o){
	return new Promise((reslove, reject) => {
		request.post(webUrl + 'ecapi.review.product.list',o).then(res=>{
			reslove(res)
		})
	})
}
function getGoodsNavList(o){
	return new Promise((reslove, reject) => {
		uni.request({
			url: webUrl + 'App.Category.categorylistNavListApi',
			method: 'POST',
			data: o,
			header: {
				//'Content-Type': 'application/json',
				"Content-Type": "application/x-www-form-urlencoded",
				'accesstoken': uni.getStorageSync('token'),
				'token': uni.getStorageSync('token'),
				'user_id': uni.getStorageSync('user_id')
			},
			success: (res) => {
				reslove(res.data)
			}
		})
		
	})
}


function getGoodsList(o){
	return new Promise((reslove, reject) => {
		uni.request({
			url: webUrl + 'App.Category.categorylistGoodsListApi',
			method: 'POST',
			data: o,
			header: {
				//'Content-Type': 'application/json',
				"Content-Type": "application/x-www-form-urlencoded",
				'accesstoken': uni.getStorageSync('token'),
				'token': uni.getStorageSync('token'),
				'user_id': uni.getStorageSync('user_id')
			},
			success: (res) => {
				reslove(res.data)
			}
		})
		
	})
}

// 收藏
function getGoodsCollect(o){
	return new Promise((reslove, reject) => {
		request.post(webUrl + 'App.User.goodsAddCollectApi',o).then(res=>{
			if(res.ret==200){
			   reslove(res.data)
			}else{
				uni.showToast({ title: res.msg, icon: "none" });
			}
		})
	})
}		

export default {
	getGoodsInfo,
	getGoodsComment,
	getGoodsNavList,
	getGoodsList,
	getGoodsCollect
}