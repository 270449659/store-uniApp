import * as localConfig from '../local/config'
import request from '@/common/request.js'

const webUrl = localConfig.websiteUrl

//地址列表
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

function getAddressDetail(o){
	return new Promise((reslove, reject) => {
		request.post(webUrl + 'App.User.addressDetailApi',o).then(res=>{
			if(res.ret==200){
			   reslove(res.data)
			}else{
				uni.showToast({ title: res.msg, icon: "none" });
			}
		})
	})
};

export default{
	getShopConsignee,
	getAddressDetail
}