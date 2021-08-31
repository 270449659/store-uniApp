<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		computed:{
			 ...mapState({ 
			 	cartTotal: state => state.shopping.cartTotal	//商品基本信息
			 }),
			
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			this.isLogin=this.$isLogin();
			if(this.isLogin){
				this.userId= uni.getStorageSync('user_id');
				this.token= uni.getStorageSync('token');
				this.$store.dispatch('shopping/setCartList', {
				  platform:'H5',
				  user_id:this.userId,
				  token:this.token,
				  accesstoken:this.token,
				}) 
			}
			
		},
		watch:{		
			cartTotal(){
				//console.log('goods_count',this.cartTotal.goods_count) 
				wx.setTabBarBadge({
				  index:1,
				  text:''+ this.cartTotal.goods_count
				})
			}
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	.fixed-top{
		position: fixed !important;
		top: 0 !important;
		bottom: auto !important;
	}
	.fixed-bottom{
		position: fixed !important;
		bottom: 0 !important;
	}
	.flex{display: flex;}
	.fixed{position: fixed;}
	.flex-warp{display: flex; flex-wrap: wrap;}
	.flex-direction-column{display: flex; flex-direction: column;} 
	.flex-align-items-center{display:flex; align-items: center;}
	.flex-justify-content-b{display:flex;justify-content: space-between;}
	.flex-justify-content-center{display:flex; align-items: center;justify-content:center;}
	.flex-justify-content-s-a{display:flex; align-items: center;justify-content: space-around;}
	.flex-justify-content-s-b{display:flex; align-items: center;justify-content: space-between;}
	.flex-justify-content-f-e{display:flex; align-items: center;justify-content: flex-end;}
	/*每个页面公共css */
	@import './common/css/style.css';
	body{ background-color: #f3f3f3;}
	.mgt10{margin-top: 10rpx !important;}
	.mgt15{margin-top: 15rpx !important;}
	.mgt20{margin-top: 20rpx !important;}
	.mgt25{margin-top: 25rpx !important;}
	.mgt30{margin-top: 30rpx !important;}
	.mgt40{margin-top: 40rpx !important;}
	.mgt50{margin-top: 50rpx !important;}
	.mgl5{margin-left:5rpx!important;}
	.mgl10{margin-left:10rpx!important;}
	.mgl20{margin-left:20rpx!important;}
	.mgl30{margin-left:30rpx!important;}
	.mgr5{margin-right:5rpx!important;}
	.mgr10{margin-right:10rpx!important;}
	.mgr20{margin-right:20rpx!important;}
	.mgr25{margin-right:25rpx!important;}
	.mgr30{margin-right:30rpx!important;}
	.mgb20{margin-bottom: 20rpx !important;}
	.mgb25{margin-bottom: 25rpx !important;}
	.mgb40{margin-bottom: 40rpx !important;}
	.mglr30{margin-left: 30rpx!important;margin-right:30rpx!important;}
	.pdr15{padding-right: 15rpx !important;}
	.mglr45{margin-left: 45rpx!important;margin-right:45rpx!important;}
	.pdb30{padding-bottom: 30rpx !important;}
	.mgb50{margin-bottom: 50rpx !important;}
	/*字体布局*/
	.text-left{text-align:left!important;}
	.text-center{text-align:center!important;}
	.text-right{text-align:right!important;}
	/*overflow状态*/
	.overflow-hidden{overflow:hidden !important;}
	.overflow-visible{overflow:visible !important;}
	.overflow-auto{overflow:auto !important;}
	.scroll-y-show{overflow-y: auto; overflow-x:hidden;}
	/*每个页面公共css */
	 .voucher-center uni-label{font-size:25rpx}
	.voucher-center uni-radio .uni-radio-input {
		width: 35rpx;
		height:35rpx;
	}
</style>
