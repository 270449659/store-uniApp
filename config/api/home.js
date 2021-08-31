import * as localConfig from '../local/config'
import request from '@/common/request.js'

const webUrl = localConfig.websiteUrl
//账号登录
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
function getHomes(o){
	return new Promise((resolve, reject) => {
		uni.request({
			//url: webUrl + '/index.php?s=/api/user/login',
			//url: webUrl + 'ecapi.home.product.list',
			url: webUrl + 'App.Index.IndexListApi',
			method: 'POST',
			data:{
				platform:'H5',
				// user_id:this.userId,
				// token:this.token,
				// accesstoken:this.token,
				user_id:3,
				token:'c6ff849e7732d0c53141c04c65769365',
				accesstoken:'c6ff849e7732d0c53141c04c65769365',
				app_key: 'wolf100000001',
				format: 'JSON',
				api_version: '2.0',
				timestamp:this.times,
				req_source: 'h5',
				sign: '14E7AD8C354C11A8CE0F0B8A98337F82',
			},
			header: {
				'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',
				//'Content-Type': 'application/json',
				// 'Referer': 'http://localhost:8080/',
				'token': uni.getStorageSync('token')
			},
			data:{
				
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

//账号登录 end
export default{
	getbanners,
	getHomes,
	
}