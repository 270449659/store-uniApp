<template>
    <view class="home-menu" >
       <view class="menu-item" @click="gohotSale()">
        <image class="item-icon" src="/static/images/home/home-hot.png"></image>
        <view class="item-text">热卖</view>
      </view>
      <view class="menu-item"  @click="goPhone()">
        <image class="item-icon" src="/static/images/home/home-phone.png"></image>
        <view class="item-text">手机</view>
      </view>
      <view class="menu-item"  @click="goCashgift()" >
        <image class="item-icon" src="/static/images/home/home-cashgift.png"></image>
        <view class="item-text">红包</view>
      </view>
      <view class="menu-item" @click="goIntegral">
        <image class="item-icon" src="/static/images/home/home-integral.png"></image>
        <view class="item-text">积分</view>
      </view>
    </view>
</template>

<script>
export default{
	// props:['datas'],
	data(){
		return {
			
		}
	},
	methods: {
		goCashgift(){
			uni.navigateTo({
				url: '/pages/categorys/category'
			})
		},
		goIntegral(){
			uni.navigateTo({
				url: '/pages/ss-classSide/ss-classSide'
			})
		}
	}
}
</script>
<style>
.home-menu {
	    position: relative;
	    display: block;
	    width: 100%;
	    /* background-color: #ffffff; */
	    overflow: hidden;
	    /* border-bottom: #e2e2e2 1px solid; */
	  }
	
	  .home-menu .menu-item {
	    position: relative;
	    float: left;
	    display: block;
	    width: 25%;
	    border: none;
	    box-sizing: border-box;
	    padding: 24rpx 0;
	  }
	
	  .home-menu .menu-item .item-icon {
	    display: block;
	    width: 88rpx;
	    height: 88rpx;
	    margin: 0 auto;
	    overflow: hidden;
	  }
	
	  .home-menu .menu-item .item-text {
	    display: block;
	    width: 100%;
	    height: 48rpx;
	    line-height: 48rpx;
	    box-sizing: border-box;
	    border: none;
	    overflow: hidden;
	    color: #404245;
	    font-size: 28rpx;
	    font-weight: normal;
	    text-align: center;
	    margin-top: 8rpx;
	  }
</style>