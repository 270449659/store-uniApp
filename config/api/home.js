import * as localConfig from '../local/config'
import request from '@/common/request.js'
import {formatTime,object2String} from '@/common/js/index.js'
import MD5 from '@/common/md5.js'
const webUrl = localConfig.websiteUrl
//banner
function getbanners(o){
	return new Promise((resolve, reject) => {
		uni.request({
			//url: webUrl + '/index.php?s=/api/user/login',
			url: webUrl + 'ecapi.banner.list',
			method: 'POST',
			data: o,
			header: {
				'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',
				//'Content-Type': 'application/json',
				'token': uni.getStorageSync('token')
			},
			success: (res) => {
				if(res.data.error_code ===0){
					resolve(res.data);
				}else{
					uni.showToast({title:res.data.error_desc,icon:'none'});
				}
				
			}
		})
	})
};
function getHomes(data){
	
	return new Promise((reslove, reject) => {
		request.post(webUrl + 'App.Index.IndexListApi',data).then(res=>{
			if(res.ret==200){
			   reslove(res.data)
			}else{
				uni.showToast({ title: res.msg, icon: "none" });
			}
		})
	})
	// data.app_key = 'wolf100000001'
	// data.format = 'JSON'
	// data.api_version = '2.0'
	// data.timestamp = formatTime(null, '-')
	// data.req_source = 'app'
	// data.token = localStorage.getItem('token') || ''
	//data.user_id = localStorage.getItem('user_id') || ''
	// if (data.user_id === '') {
	//   delete data.user_id
	// }
	// data.platform = 'H5'
	// const dataStr = object2String(data)
	// data.sign = MD5.hash('ANDYJJ' + dataStr + 'I4MoPIPaVCc8M5fnfruLBd').toUpperCase()
	// return new Promise((resolve, reject) => {
	// 	uni.request({
	// 		//url: webUrl + '/index.php?s=/api/user/login',
	// 		//url: webUrl + 'ecapi.home.product.list',
	// 		url: webUrl + 'App.Index.IndexListApi',
	// 		method: 'POST',
	// 		data,
	// 		header: {
	// 			'Content-Type': 'application/x-www-form-urlencoded',
	// 		},
	// 		success: (res) => {
	// 			if(res.data.ret ===200){
	// 				resolve(res.data.data);
	// 			}else{
	// 				uni.showToast({title:res.data.error_desc,icon:'none'});
	// 			}
				
	// 		}
	// 	})
	// })
}

//账号登录 end
export default{
	getbanners,
	getHomes,
	
}