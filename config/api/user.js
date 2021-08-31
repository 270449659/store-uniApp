import * as localConfig from '../local/config'
import request from '@/common/request.js'

const webUrl = localConfig.websiteUrl
//账号登录
function getLogins(o){
	return new Promise((resolve, reject) => {
		uni.request({
			//url: webUrl + '/index.php?s=/api/user/login',
			//url: webUrl + 'ecapi.auth.signin',
			url: webUrl + 'App.Passport.logincommonAccountApi',
			method: 'POST',

			data: o,
			header: {
				
				//'Content-Type':'application/json;charset=UTF-8',
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
				'Access-Control-Allow-Origin': '*',
				//'Content-Type': 'application/json',
				'token': uni.getStorageSync('token')
			},
			success: (res) => {
				if(res.data.ret ===200){
					uni.showToast({title:'登录成功',icon:'success'});
					resolve(res.data.data);
				}else{				
				    uni.showToast({title:res.data.msg,icon:'none'});	
				}
				
			}
		})
	})
}
//账号登录 end

//账号登录
function getMemberInfo(o){
	return new Promise((reslove, reject) => {
		request.post(webUrl + 'App.User.memberInfoApi',o).then(res=>{
			if(res.ret==200){
			   reslove(res.data)
			}else{
				uni.showToast({ title: res.msg, icon: "none" });
			}
		})
	})
};
export default{
	getLogins,
	getMemberInfo
    //getRegister,
	// getHistory,
	// getHistoryAdd,
	// getHistoryDelete,
	
}