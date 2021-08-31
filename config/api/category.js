import * as localConfig from '../local/config'
import request from '@/common/request.js'

const webUrl = localConfig.websiteUrl

function getCategoryList(o){
	return new Promise((reslove, reject) => {
		request.post(webUrl + 'App.Category.CategoryListApi',o).then(res=>{
			if(res.ret==200){
			   reslove(res.data)
			}else{
				uni.showToast({ title: res.msg, icon: "none" });
			}
		})
	})
}
function getCategorySecondary(o){
	return new Promise((reslove, reject) => {
		let formdata = new FormData()
		uni.request({
			url: webUrl + 'App.Category.CategorySecondaryApi',
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
				reslove(res.data.data)
			}
		})
		
	})
};
export default {
	getCategoryList,
	getCategorySecondary
}