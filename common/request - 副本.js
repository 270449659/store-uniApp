import Fly from 'flyio/dist/npm/wx'
import {formatTime,object2String} from '@/common/js/index.js'
import MD5 from '@/common/md5.js'
const request = new Fly()
const errorPrompt = (err) => {
	// #ifdef MP-WEIXIN
	wx.showToast({
		title: err.message || 'fetch data error.',
		icon: 'none'
	})
	// #endif
	
	// #ifdef APP-PLUS
	uni.showToast({
		title: err.message || 'fetch data error.',
		icon: 'none'
	})
	// #endif
}

request.interceptors.request.use((request) => {
	//data.app_key = 'wolf100000001'
	//data.format = 'JSON'
	// data.api_version = '2.0'
	// data.timestamp = formatTime(null, '-')
	// data.req_source = 'app'
	// data.token = localStorage.getItem('token') || ''
	// data.user_id = localStorage.getItem('user_id') || ''
	// if (data.user_id === '') {
	//   delete data.user_id
	// }
	//data.platform = 'H5'
	//const dataStr = object2String(data)
	//data.sign = MD5.hash('ANDYJJ' + dataStr + 'I4MoPIPaVCc8M5fnfruLBd').toUpperCase()
	let Data={
		app_key:'wolf100000001', 	       
		format :'JSON',
		api_version:'2.0',
		timestamp:formatTime(null, '-'),
		req_source:'app',
		platform:'H5',
		//user_id:uni.getStorageSync('user_id'),
	   // token:uni.getStorageSync('token'),
		//accesstoken:uni.getStorageSync('token'),
	};
	
	//454B94C9E0EC5B561F08391B39103154
	request.body=Object.assign({},request.body,Data);
	const dataStr = object2String(request.body)
	setTimeout(function () {
	   request.body.sign = MD5.hash('ANDYJJ' + dataStr + 'I4MoPIPaVCc8M5fnfruLBd').toUpperCase()
	}, 1100);
	
	console.log('o',request.body)
	console.log('dataStr',dataStr)
	
	request.timeout = 30000;
	request.header = {
	    //'Content-Type': 'application/json',
		'Content-Type':'application/x-www-form-urlencoded',
		//'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',
		//'token': uni.getStorageSync('token'),
		//'X-Client-Hash':uni.getStorageSync('client_hash')
	}
	
	
	return request;
})

request.interceptors.response.use((response, promise) => {
	let client_hash = '';
	for(var k in response.headers){
		if(k.toLowerCase() === "x-client-hash"){
			client_hash = response.headers[k][0]
		}
	}
	if(client_hash){
		uni.setStorageSync('client_hash',client_hash);
	}
	if(response.data.status === 'failed'){
		switch(response.data.errors.code){
			case 12:
				console.log('用户未登录')
				uni.navigateTo({
					url:'/pages/login/login?delta=1'
				})
			break
			case 404:
				console.log("暂无记录")
			break
			case 506:
				console.log("存在违禁词")
			break
			case 102:
				console.log("用户数据错误，请重新登录")
				break
			default:
		}
	}
	
	return promise.resolve(response.data)
}, (err, promise) => {
	errorPrompt(err)
	return promise.reject(err)
})

export default request