export default function isLogin(){
	
	console.log('token',uni.getStorageSync('token'))
	return uni.getStorageSync('token') == '' ? false : true
}