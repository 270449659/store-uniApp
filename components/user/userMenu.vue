<template>
	<view class="user-menu mglr30">
		<view class="user-menu-list">
			<view class="user-menu-item flex-justify-content-s-b">
				<view class="item-left">
					<i></i><text>我的钱包</text>
				</view>	
				<view class="item-right flex">
					<image src="/static/images/goods/nav-right.png"></image>
				</view>	
			</view>
			<view @click="goAddress" class="user-menu-item flex-justify-content-s-b">
				<view class="item-left">
					<i></i><text>地址管理</text>
				</view>	
				<view class="item-right flex">
				    <image src="/static/images/goods/nav-right.png"></image>
				</view>	
			</view>
			<view class="user-menu-item flex-justify-content-s-b">
				<view class="item-left">
					<i></i><text>我的收藏</text>
				</view>	
				<view class="item-right flex">
				    <image src="/static/images/goods/nav-right.png"></image>
				</view>	
			</view>
			<view class="user-menu-item flex-justify-content-s-b">
				<view class="item-left">
					<i></i><text>联系客服</text>
				</view>	
				<view class="item-right flex">
				    <image src="/static/images/goods/nav-right.png"></image>
				</view>	
			</view>
		</view>
	</view>
	<!--personal-menu-->	
  
</template>

<script>
export default{
	// props:{
	// 	orderData:Object,
 //    },
	
	data(){
		return {
			
		}
	},
	computed:{
		orderData(){
			return this.$store.state.userStore.memberInfo
		},	
	},
	methods: {
		goAddress(){
			uni.navigateTo({
			    url: '/pages/address/address-select'
			});
		}
		
	}
}
</script>
<style lang="scss">
 .user-menu{
	border-radius:20rpx;
	background: #fff;
	position: relative;
	.user-menu-list{
	   .user-menu-item{padding: 20rpx 25rpx;
		   .item-right{
			     width: 16rpx;
			     height: 20rpx;
				 image{
					width: 100%;
					height: 100%;
				 }
		   }
	   }
	}
	
 }
</style>