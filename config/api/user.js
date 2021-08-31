import * as localConfig from '../local/config'
import request from '@/common/request.js'
import MD5 from '@/common/md5.js'

const webUrl = localConfig.websiteUrl
//账号登录
function getLogins(data){

  data.app_key = 'wolf100000001'
  data.format = 'JSON'
  data.api_version = '2.0'
  data.timestamp = formatTime(null, '-')
  data.req_source = 'app'
  // data.token = localStorage.getItem('token') || ''
  // data.user_id = localStorage.getItem('user_id') || ''
  if (data.user_id === '') {
    delete data.user_id
  }
  data.platform = 'H5'
  const dataStr = object2String(data)
  data.sign = MD5.hash('ANDYJJ' + dataStr + 'I4MoPIPaVCc8M5fnfruLBd').toUpperCase()

	return new Promise((resolve, reject) => {
		uni.request({
			//url: webUrl + '/index.php?s=/api/user/login',
			//url: webUrl + 'ecapi.auth.signin',
			url: webUrl + 'App.Passport.logincommonAccountApi',
			method: 'POST',

			data,
			header: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
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

function object2String(obj) {
  var objStr = '';
  if (typeof obj === 'object' && Object.getOwnPropertyNames(obj).length > 0) {
      var objKeys = Object.getOwnPropertyNames(obj).sort();
      for (var k in objKeys) {
          var item = obj[objKeys[k]];
          if (typeof item === 'object' && Object.getOwnPropertyNames(item).length > 0) {
              item = object2String(item);
          }
          objStr += objKeys[k] + item;
      }
  }
  return objStr;
}

var formatTime = function (date, sep) {
  if (sep === void 0) { sep = '/'; }
  if (!date || date === null) {
      date = new Date();
  }
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return ([year, month, day].map(formatNumber).join(sep) +
      ' ' +
      [hour, minute, second].map(formatNumber).join(':'));
};
/**
* 格式化数值 - 个位数前导补零
*
* @param number n 数值
* @author: crlang
*/
var formatNumber = function (n) {
  var s = n.toString();
  return s[1] ? s : '0' + s;
};
