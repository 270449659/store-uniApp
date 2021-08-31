<template>
    <!-- 品牌街 -->
	<view class="brand-street" >
		<view class="street-header" >
		  <view class="header-title">每日大牌</view>
		</view>
		<view class="brand-street-container">
		   <view class="brand-street-container-margin">
			<view class="brand-street-product-item brand-street-product-item-1"><image mode="widthFix" class="brand-street-product-item-icon" src="/static/images/home/HW.jpg"></image></view> 
			<view class="brand-street-product-item brand-street-product-item-2"><image mode="widthFix" class="brand-street-product-item-icon" src="/static/images/home/oppo.jpg"></image></view>  
			<view class="brand-street-product-item brand-street-product-item-3"><image mode="widthFix" class="brand-street-product-item-icon" src="/static/images/home/vivo.jpg"></image></view>  
			<view class="brand-street-product-item brand-street-product-item-4"><image mode="widthFix" class="brand-street-product-item-icon" src="/static/images/home/MI.jpg"></image></view>   
		   </view>  
		 </view>  
	  </view>  
	<!-- 品牌街 end-->
</template>

<script>
export default{
	// props:['datas'],
	data(){
		return {
			imgheights:''
		}
	},
	methods:{
			
	},		
}
</script>
<style>
.brand-street {
    margin:0 28rpx;
   background:#FEEBEB; 
   border-radius: 20rpx;
  }
  /*********** 品牌街 ***********/

  .brand-street .brand-street-container{
    margin:0 15rpx 28rpx 15rpx;
    padding-bottom: 15rpx;
  }
   .brand-street .street-header{
    position: relative;
    display: block;
    width: 100%;
    height: 88rpx;
    overflow: hidden;
    box-sizing: border-box;
    /* background-color: #ffffff;  */

  }
  .brand-street .street-header .header-title{
    text-align:left;
    padding-left:28rpx;
    font-size: 35rpx;
    line-height: 88rpx;
    font-weight:500
   }
  .brand-street .brand-street-container-margin{width: 100%; display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between; align-items: center;}
  .brand-street .brand-street-product-item{display: flex;box-sizing: border-box; width:50%;padding:10rpx;}
 .brand-street .brand-street-product-item a{width: 100%; box-sizing: border-box;}
  .brand-street .brand-street-product-item-1 uni-image{
  border-top-left-radius: 20rpx;
}
  .brand-street .brand-street-product-item-2 uni-image{
  border-top-right-radius: 20rpx;
}
  .brand-street .brand-street-product-item-3 uni-image{
  border-bottom-left-radius: 20rpx;
}
  .brand-street .brand-street-product-item-4 uni-image{
  border-bottom-right-radius: 20rpx;
}
  .brand-street .brand-street-product-item uni-image{width: 100%;}
  /*********** 品牌街 end***********/
</style>