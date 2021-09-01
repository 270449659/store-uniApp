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
		request.post(webUrl + 'App.Category.CategorySecondaryApi',o).then(res=>{
			if(res.ret==200){
			  reslove(res.data)
			}else{
				uni.showToast({ title: res.msg, icon: "none" });
			}
		})
	})
	
};
export default {
	getCategoryList,
	getCategorySecondary
}