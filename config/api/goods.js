import * as localConfig from '../local/config'
import request from '@/common/request.js'

const webUrl = localConfig.websiteUrl

//商品详情
function getGoodsInfo(o){
	return new Promise((reslove, reject) => {
		request.post(webUrl + 'App.Goods.GoodsDetailActionApi',o).then(res=>{
			if(res.ret ===200){
				reslove(res.data);
			}else{
				uni.showToast({title:res.msg,icon:'none'});
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
		request.post(webUrl + 'App.Category.categorylistNavListApi',o).then(res=>{
		
			if(res.ret ===200){
				reslove(res.data);
			}else{
				uni.showToast({title:res.msg,icon:'none'});
			}
		})
	})
}

//商品列表
function getGoodsList(o){
	return new Promise((reslove, reject) => {
		request.post(webUrl + 'App.Category.categorylistGoodsListApi',o).then(res=>{
			reslove(res.data)
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