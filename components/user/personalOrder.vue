<template>
    <view class="personal-order mglr30">
    	<view @click="myOrder(0)" class="personal-order-top flex-justify-content-s-b">
    		<uni-view  class="personal-order-top-name">我的订单</uni-view>
    		<uni-view  class="personal-order-top-all">查看全部订单></uni-view>
    	</view>	
		<!--personal-menu-->
		<view class="personal-order-list">
			<view class="personal-order-item" @click="myOrder(1)" role="button" tabindex="0">
			  <img class="item-icon" src="/static/images/user/status-created.png">
			  <span class="item-subtotal">{{orderData.allOrderNum.b}}</span>
			  <span class="item-text">待付款</span>
			</view>
			<view class="personal-order-item" @click="myOrder(2)" role="button" tabindex="0">
			  <img class="item-icon" src="/static/images/user/status-paid.png">
			  <span class="item-subtotal">{{orderData.allOrderNum.e}}</span>
			  <span class="item-text">待发货</span>
			</view>
			<view class="personal-order-item" @click="myOrder(3)" role="button" tabindex="0">
			  <img class="item-icon" src="/static/images/user/status-delivering.png">
			  <span class="item-subtotal">{{orderData.allOrderNum.c}}</span>
			  <span class="item-text">待收货</span>
			</view>
			<view class="personal-order-item" @click="myOrder(4)" role="button" tabindex="0">
			  <img class="item-icon" src="/static/images/user/status-deliveried.png">
			<!--  <span v-if="" class="item-subtotal">{{orderData.allOrderNum.d}}</span> -->
			  <span class="item-text">待评价</span>
			</view>	
		</view>	
		<!--personal-menu-->	
    </view>	
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
		myOrder(status){
			uni.navigateTo({
			    url: '/pages/order/orderList?status='+status
			});
		}
		
	}
}
</script>
<style lang="scss">
 .personal-order{
	 margin: -70rpx 0 0 0;
	 border-radius:20rpx;
	 background: #fff;
	 position: relative;
	.personal-order-top {
		padding: 20rpx 20rpx 20rpx;	
		color: #666;
		font-size: 25rpx;
		.personal-order-top-name{}
		.personal-order-top-all:after {
			border: .026667rem solid #c8c8cd;
			border-bottom-width: 0;
			border-left-width: 0;
			content: " ";
			top: 50%;
			right: .266667rem;
			position: absolute;
			width: .066667rem;
			height: .066667rem;
			transform: translateY(-50%) rotate(45deg);
		}
	}
	.personal-order-list{
		position: relative;
		display: block;
		/* width: 100%; */
		margin: 0 20rpx 20rpx;
		border-bottom-left-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
		background-color: #ffffff;
		overflow: hidden;
		.personal-order-item{
			position: relative;
			float: left;
			display: block;
			width: 25%;
			border: none;
			box-sizing: border-box;
			padding: .533333rem 0;
			display: block;
			.item-icon {
			    display: block;
			    width: 48rpx;
			    height: 48rpx;
			    margin: 0 auto;
			    overflow: hidden;
			}
			.item-subtotal{
				position: absolute;
				top: 50%;
				left: 50%;
				display: block;
				min-width: 40rpx;
				padding: 0 6rpx;
				height: 32rpx;
				box-sizing: border-box;
				overflow: hidden;
				margin-top: -60rpx;
				margin-left: 8rpx;
				color: #f3424c;
				font-size: 20rpx;
				font-weight: normal;
				line-height: 32rpx;
				text-align: center;
				border-radius: 16rpx;
				border: 2rpx #f3424c solid;
				background-color: #ffffff;
			}
			.item-text {
			    display: block;
			    width: 100%;
			    height: 48rpx;
			    line-height: 48rpx;
			    box-sizing: border-box;
			    border: none;
			    overflow: hidden;
			    color: #404245;
			    font-size: 24rpx;
			    font-weight: normal;
			    text-align: center;
			}
        }
	}
 }
</style>