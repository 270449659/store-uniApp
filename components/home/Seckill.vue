<template>
    <view class="seckill" >
       <view class="seckill-Box">
          <view class="seckill-top">
			  <view class="left flex">
				 <view  class="title">限时购</view>
				 <countdown :day="1" :hour="2" :minute="30" :second="0" color="#FFFFFF" background-color="#007AFF" border-color="#007AFF" />
			  </view> 
			  <view class="right">
				  更多
			  </view>   
		  </view>
		  <!-- seckill-top end -->
		  <view class="seckill-list">
			  <view class="ul">
				<view class="li">
					<image src="https://imgt1.oss-cn-shanghai.aliyuncs.com/shopexNewEcshop/images/202007/thumb_img/21_thumb_G_1593768208818.jpg" alt=""></image>			  
				    <text >塞翁福 红谷物礼盒</text>
					<view class="price">
						33.00
						<text  class="del">228.00</text>
					</view>  	
				</view>  
			  </view>
		  </view>  
       </view>
    </view>
</template>

<script>
import  countdown from '@/components/home/countdown'	
export default {
	components: {
		countdown
	},
	name: '',
	data(){
		return {
		}
	},
	methods: {
		
		// goIntegral(){
		// 	uni.navigateTo({
		// 		url: '/pages/ss-classSide/ss-classSide'
		// 	})
		// }
	}
}
</script>
<style lang="scss">
   .seckill{
	   padding: 0 10px 0px 10px;
	   margin: 0;
	   background: #fff;
	   .seckill-Box{
		   .seckill-top{
			   padding: 15px 0 5px;
			   margin: 10px 0 0;
			   background: #fff;
			   border-radius: 5px 5px 0 0;
			   display: flex;
			   justify-content: space-between;
			   .title{    
				   color: #333;
					font-weight: 400;
					font-size: 16px;
	           }
			   .time{
				   margin-right: 100px;
			   }
		    }
		   .seckill-list{
			   border-radius: 0 0 5px 5px;
			   background: #fff;
			   padding-top: 0;
			   .ul{
				  .li{
					width: 115px;
					padding-left: 0;
					margin-right: 5px;
					margin-bottom: 15px;
					border-right: 0 none;
					display: inline-block;
					vertical-align: top;
					image{
					    width: 115px;
					    height: 115px;
					    border: 0 none;
					    display: block;
					    background: #f5f5f5;
					}
					text{
					    -webkit-box-orient: vertical;
					    display: -webkit-box;
					    line-clamp: 2;
					    -webkit-line-clamp: 2;
					    overflow: hidden;
					    text-overflow: ellipsis;
					    word-break: break-all;
					}
					.price{
					    font-size: 14px;
					    margin-top: 4px;
					    color: #b4282d;
					    padding: 3px;
						.del {
						    color: #999;
						    font-size: 13px;
						    padding-left: 5px;
						    margin-left: 2px;
						    text-decoration: line-through;
						}
					}
				  } 
			   }
		    }
	   }
   }
</style>