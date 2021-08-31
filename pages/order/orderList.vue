<template>
	<view class="order-list">
		<view class="content" v-if="load">
			<!--order-filter -->
		  <view class="order-filter">
			<view class="filter-item" :id="0" v-bind:class="status == '0' ? 'active' : ''" @click="goOrderTap">
			  <text class="text">全部</text>
			</view>
			<view class="filter-item" :id="1" v-bind:class="status == '1' ? 'active' : ''" @click="goOrderTap"  >
			  <text class="text">待付款</text>
			</view>
			<view class="filter-item" :id="2" v-bind:class="status == '2' ? 'active' : ''" @click="goOrderTap" >
			  <text class="text">待发货</text>
			</view>
			<view class="filter-item" :id="3" v-bind:class="status == '3' ? 'active' : ''" @click="goOrderTap">
			  <text class="text">待收货</text>
			</view>
			<view  class="filter-item" :id="4" v-bind:class="status == '4' ? 'active' : ''" @click="goOrderTap">
			  <text class="text">待评价</text>
			</view>
			<view  class="filter-item" :id="5" v-bind:class="status == '5' ? 'active' : ''" @click="goOrderTap">
			  <text class="text">退换货</text>
			</view>
		  </view>   <!--order-filter end-->
		  <!--order-list --> 
		  <view v-if="orderList.length" class="order-list">
				 <!--list-item-->
			  <view class="list-item"  v-for="(item,index) in orderList" :key="index" :id="item.id">
				   <!--item-header-->
				<view class="item-header" >
				  <view class="header-sn">{{item.order_id}}</view>
				  <view class="header-status" :class="item.pay_status == '0' ? 'active0' : ''" >{{item.type_status}}</view>
				  <!-- <view class="header-status" :class="item.pay_status == '1' ? 'active0' : ''" v-if="item.pay_status == 1">等待发货</view>
				  <view class="header-status" :class="item.pay_status == '2' ? 'active0' : ''" v-if="item.pay_status == 2">等待收货</view>
				  <view class="header-status" :class="item.pay_status == '3' ? 'active5' : ''" v-if="item.pay_status == 3">交易成功</view>
				  <view class="header-status" :class="item.pay_status == '4' ? 'active5' : ''" v-if="item.pay_status == 4">交易成功</view>
				  <view class="header-status" :class="item.pay_status == '5' ? 'active5' : ''" v-if="item.pay_status == 5">交易取消</view> --> 
				</view> <!--item-header end-->
				<!--order-goods-->
			    <view  class="order-goods" @click="">
					<view  class="goods-item" v-for="goods in item.goods_list" :id="item.id">
					  <view  class="item-photo">
						<!-- <image v-if="goods.list_pic_url==null" ></image> -->
						<image class="item-photo-icon" :src="goods.list_pic_url"></image>
						<!-- <img  v-else v-lazy="goods.list_pic_url"  /> -->
					  </view >
					  <view  class="item-info">
						<view  class="info-name">
						  {{goods.name}}
						</view >
						<view  class="info-attr">
						  {{goods.spec}}
						</view >
						<view  class="info-price">
						  ￥{{goods.price}}
						</view >
						<view  class="info-amount">
						  x{{goods.number}}
						</view >
					  </view >
					</view >
					</view >   <!--order-goods end-->
			  </view> <!--list-item end-->
			</view>	<!--order-list end--> 
			<view v-else class="order-list">
				<view  class="list">
					<view  class="onorder">
						<image src="https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/no_order.png"></image>
						<view class="text">这里空空如也~~</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	
	export default {
		data() {
			return {
				load:true,
				status:0,
				openId:'',
				page:1,
			}
		},
		onLoad(e) {
			console.log(e)
			// if(e){
			// 	this.goods_id=e.id;//商品id
			// }else{
				
			// }
			
		  var status=e.status==undefined ? this.status :e.status;
		  //console.log('curre',status)
		  this.status=status;
		  this.isLogin=this.$isLogin();
		  this.userId= uni.getStorageSync('user_id');
		  this.token= uni.getStorageSync('token');
		  if(this.isLogin){
			this.goOrderList(status);
		  }
		},
		computed:{
			...mapState({
				orderList: state => state.orderStore.orderList,
			}),
			
		},
		methods: {
			
           goOrderTap(event){
			  let status = event.currentTarget.id || this.status;
			  this.status=status;
			  this.goOrderList(Number(status))
			  // if(Number(status)){
			   
			  // }
		   },
		   goOrderList(status){ 
			uni.showLoading({
			    title: '加载中'
			});   
			this.$store.dispatch('setOrderList', {
			   openId:this.openId,
			   status:status,
			   page:this.page,
			   platform:'H5',
			   user_id:this.userId,
			   token:this.token,
			   accesstoken:this.token,
			})   
		   }
		}
	}
</script>

<style lang="scss">
	/*order-filter*/
	.order-list{
		.order-filter {
		  width: 100%;
		  height: 88rpx;
		  color: #404245;
		  font-size: 28rpx;
		  font-weight: normal;
		  text-align: center;
		  line-height: 88rpx;
		  box-sizing: border-box;
		  background-color: #ffffff;
		  border-bottom: #e2e2e2 1px solid;
		  .filter-item {
		    position: relative;
		    display: block;
		    float: left;
		    width: 16.6%;
		    height: 88rpx;
		    overflow: hidden;
		    box-sizing: border-box;
			.text {
			  display: block;
			  width: 90%;
			  height: 100%;
			  color: #404245;
			  font-size: 28rpx;
			  font-weight: normal;
			  text-align: center;
			  line-height: 88rpx;
			  box-sizing: border-box;
			  margin: 0 auto;
			}
		  }
		  .filter-item.active .text{
		    border-bottom: #f3424c 2px solid;
		    color:#f3424c;
		  }
		} /*order-filter end*/ 
		.order-list {
			position: relative;
			display: block;
			width: 100%;
			text-align: center;
			overflow: hidden;
			.list-item {
			    position: relative;
			    display: block;
			    /* width: 100%; */
			    text-align: center;
			    background-color: #ffffff;
			    overflow: hidden;
			    margin: 20rpx 20rpx 0 20rpx;
			    border-radius: 20rpx;
			    /* border-top: #e2e2e2 1px solid;
			    border-bottom: #e2e2e2 1px solid; */
				.item-header {
				    position: relative;
				    display: block;
				    /*width: 100%;*/
				    height: 68rpx;
				    padding: 0 28rpx;
				    background-color: #ffffff;
				    overflow: hidden;
				    /* border-bottom: #e2e2e2 1px solid; */
					.header-sn {
					    float: left;
					    position: relative;
					    width: 50%;
					    display: block;
					    color: #aaaaaa;
					    font-size: 26rpx;
					    font-weight: normal;
					    text-align: left;
					    line-height: 68rpx;
					}
					.header-status {
					    float: left;
					    position: relative;
					    width: 50%;
					    display: block;
					    //color: #.order-address[data-v-780183da]f3424c;
					    font-size: 28rpx;
					    font-weight: normal;
					    text-align: right;
					    line-height: 68rpx;
					}
					.header-status.active0 {
					   color: #f3424c;
					}
					.header-status.active5 {
					   color: #bbb;
					}
				}
				.order-goods {
				    position: relative;
				    display: block;
				    width: 100%;
				    box-sizing: border-box;
				    background-color: #ffffff;
					.goods-item {
					    position: relative;
					    display: block;
					    width: 100%;
					    height: 200rpx;
					    box-sizing: border-box;
					    border-bottom: #e2e2e2 1px solid;
					    background-color: #ffffff;
						.item-photo {
						    position: absolute;
						    top: 20rpx;
						    left: 20rpx;
						    display: block;
						    width: 160rpx;
						    height: 160rpx;
						    overflow: hidden;
						    /* border: #e2e2e2 1px solid; */
							image{
							    width: 100%;
							    max-width: 100%;
							    height: 100%;
							   // background-color: #ffffff;
							}
						}
						.item-info {
						    position: relative;
						    display: block;
						    height: 100%;
						    box-sizing: border-box;
						    margin-left: 208rpx;
						    margin-right: 10rpx;
						    overflow: hidden;
							.info-name {
							    position: relative;
							    display: block;
							    width: 100%;
							    margin-top: 20rpx;
							    box-sizing: border-box;
							    color: #404245;
							    font-size: 28rpx;
							    font-weight: normal;
							    text-align: left;
							    line-height: 30rpx;
							}
							.info-attr {
							    position: relative;
							    display: block;
							    width: 100%;
							    margin-top: 16rpx;
							    box-sizing: border-box;
							    color: #666666;
							    font-size: 26rpx;
							    font-weight: normal;
							    text-align: left;
							    line-height: 28rpx;
							}
							.info-price {
							     position: absolute;
							     left: 0;
							     bottom: 16rpx;
							     width: 50%;
							     display: block;
							     box-sizing: border-box;
							     color: #404245;
							     font-size: 28rpx;
							     font-weight: normal;
							     text-align: left;
							     line-height: 32px;
							} 
							.info-amount {
							    position: absolute;
							    right: 12rpx;
							    bottom: 16rpx;
							    width: 50%;
							    display: block;
							    box-sizing: border-box;
							    color: #888888;
							    font-size: 28rpx;
							    font-weight: normal;
							    text-align: right;
							    line-height: 32rpx;
							}
						}
					}
				  }
			}
		}
		.list{
		   width: 94%;
           margin: 0 auto;
		   .onorder{
			   width: 100%;
			   height: 50vw; 
			   display: flex;
			   justify-content: center; 
			   align-content: center; 
			   flex-wrap: wrap; 
			   image{
				   width: 20vw;
				   height: 20vw;
			   }
			   .text{
			       width: 100%;
			       height: 30px;
			       font-size: 14px;
			       color: #444;
			       display: flex;
			       justify-content: center;
			       align-items: center;
			   }
		    }
		}
	} 
	  
	
	
</style>
