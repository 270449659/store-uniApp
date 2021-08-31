<template>
	<view class="order-detail">
		<view class="content" v-if="load">
			<!-- 订单状态 -->
			<view class="order-status" v-if="orderDetailInfo.order_status == 0">
			    <!-- <image src="../../../assets/images/icon-order-light.png"></image> -->等待买家付款
			</view>
			<view class="order-status" v-if="orderDetailInfo.order_status == 1">
				 <!-- <image src="../../../assets/images/icon-order-light.png"></image> -->等待卖家发货
		    </view>
		    <view class="order-status" v-if="orderDetailInfo.order_status == 2">
			    <!-- <image src="../../../assets/images/icon-order-light.png"></image> -->等待买家收货
		    </view>
		    <view class="order-status" v-if="orderDetailInfo.order_status == 3">
               <!-- <image src="../../../assets/images/icon-order-light.png"></image> -->交易成功
		    </view>
		    <view class="order-status" v-if="orderDetailInfo.order_status == 4">
			   <!-- <image src="../../../assets/images/icon-order-light.png"></image> -->交易成功
		    </view>
		    <view class="order-status" v-if="orderDetailInfo.order_status == 5">
			   <!-- <image src="../../../assets/images/icon-order-light.png"></image> -->交易取消
		    </view>
			<!-- 订单状态 end-->
			<!-- Address -->
		    <view class="order-address"  v-if="orderDetailInfo.consignee">
				<view class="address-contact">
				   <text class="mgr10">{{orderDetailInfo.consignee}}</text>{{orderDetailInfo.mobile}}
				</view>
				<view class="address-detail">
				  <text>{{orderDetailInfo.full_region}}  </text>
				  <text>{{orderDetailInfo.address}}</text>
				</view>
		    </view> <!-- Address end -->
			<!-- Goods -->
			<view class="order-goods" >
				<view class="goods-item" v-for="good in orderDetailGoods">
				  <view class="item-photo">
					<image v-if="good.list_pic_url"  :src="good.list_pic_url"></image>
					<image  v-else src=""></image>
				  </view>
				  <view class="item-info">
					<view class="info-name">
					  {{good.goods_name}}
					</view>
					<view class="info-attr">
					  {{good.pextension_code}}
					</view>
					<view class="info-price">
					  ￥{{good.retail_price}}
					</view>
					<view class="info-amount">
					  x{{good.number}}
					</view>
				  </view>
				</view>
		    </view><!-- Goods end -->
			<!-- Total -->
		    <view class="order-summury" >
				<view class="summury-detail">
				  运费金额 <text class="summury-detail-text">+ ￥{{orderDetailInfo.shipping_fee}}</text>
				</view>
				<!-- <view class="summury-detail" v-for="item in promos">
				  {{item.name }} <text class="summury-detail-text">- ￥{{item.price}}</text>
				</view> -->
				<view class="summury-total">
				  订单总价 <text class="summury-detail-text">￥{{orderDetailInfo.goods_amount}}</text>
				</view>
		    </view>  <!-- Total end-->
			<!-- Info -->
			<view class="order-info">
				<view class="info-text">
				  订单编号：<text class="info-text-text">{{orderDetailInfo.order_sn}}</text>
				</view>
				<!-- <view class="info-text">
				  发票类型：<text class="info-text-text">{{order.invoice.type|| '不开发票'}}</text>
				</view>
				<view class="info-text">
				  发票抬头：<text class="info-text-text">{{order.invoice.content || '无'}}</text>
				</view> -->
				<view class="info-text">
				  创建时间：<text class="info-text-text">{{orderDetailInfo.add_time }}</text>
				</view>
				<!-- <view class="info-text" v-if="order.updated_at">
				  更新时间：<text class="info-text-text">{{order.updated_at}}</text>
				</view> -->
				<!-- <view class="info-text" v-if="order.paied_at">
				  支付时间：<text class="info-text-text">{{order.paied_at}}</text>
				</view>
				<view class="info-text" v-if="order.shipping_at">
				  发货时间：<text class="info-text-text">{{order.shipping_at }}</text>
				</view>
				<view class="info-text" v-if="order.finish_at">
				  完成时间：<text class="info-text-text">{{order.finish_at }}</text>
				</view>
				<view class="info-text" v-if="order.canceled_at">
				  取消时间：<text class="info-text-text">{{order.canceled_at}}</text>
				</view> -->
			</view> <!-- Info end-->
			<!-- Submit -->
			<view class="order-submit fixed-bottom" >
			  <view v-if="orderDetailInfo.status == 0" class="order-submit-list flex">
				<view class="submit-button"  @click="onCancelOrder">
				  取消订单
				</view>
				<view class="submit-button dark"  @click="goPay(orderId)">
				  付款
				</view>
			  </view>
			  <view v-if="orderDetailInfo.status == 2" class="order-submit-list flex">
				<view class="submit-button dark"   @click="confirmOrder">
				  确认收货
				</view>
				<view class="submit-button" @click="goExpress">
				  查看物流
				</view>
			  </view>
			  <view v-if="orderDetailInfo.status == 3" class="order-submit-list flex">
				<view class="submit-button dark" @click="goComment(orderId)">
				  评价
				</view>
				<view class="submit-button"  @click="goExpress">
				  查看物流
				</view>
			  </view>
			  <view v-if="orderDetailInfo.status == 4" class="order-submit-list flex">
				<view class="submit-button" @click="goExpress">
				  查看物流
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
		onLoad() {
		  this.isLogin=this.$isLogin();
		  this.userId= uni.getStorageSync('user_id');
		  this.token= uni.getStorageSync('token');
		  if(this.isLogin){
			this.goOrderDetailInfo();
		  }
		},
		computed:{
			...mapState({
				orderDetailInfo: state => state.orderStore.orderDetailInfo,
				orderDetailGoods: state => state.orderStore.orderDetailGoods,
			}),
			
		},
		methods: {
			
           goOrderTap(){
			   
		   },
		   goOrderDetailInfo(){
			this.$store.dispatch('setOrderDetailInfo', {
			   orderId: 2021082297712,
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
	/*order-detail 订单详情*/
	.order-status {
		margin-top: 15rpx;
		position: relative;
		display: block;
		width: 100%;
		height: 68rpx;
		box-sizing: border-box;
		border-top: #e2e2e2 1px solid;
		border-bottom: #e2e2e2 1px solid;
		background-color: #f3424c;
		color: #ffffff;
		font-size: 26rpx;
		font-weight: normal;
		line-height: 68rpx;
		overflow: hidden;
		text-align: left;
	}
	
	.order-status img {
	    margin-top: 16rpx;
	    margin-left: 20rpx;
	    margin-right: 20rpx;
	    float: left;
	    display: block;
	    width: 32rpx;
	    height:32rpx;
	}
	.order-address {
	    position: relative;
	    display: block;
	    /* width: 100%; */
	    box-sizing: border-box;
	    margin: 20rpx 20rpx 0 20rpx;
	    border-radius: 20rpx;
	    /* border-bottom: #e2e2e2 1px solid; */
	    background-color: #ffffff;
	}
	  
	.order-address .address-contact {
	  position: relative;
	  display: block;
	  width: 100%;
	  padding: 30rpx 68rpx 20rpx 30rpx;
	  box-sizing: border-box;
	  color: #404245;
	  font-size: 28rpx;
	  font-weight: normal;
	  text-align: left;
	  line-height: 36rpx;
	}
	  
	.order-address .address-detail {
	  position: relative;
	  display: block;
	  width: 100%;
	  padding: 0 68rpx 30rpx 30rpx;
	  box-sizing: border-box;
	  color: #888888;
	  font-size: 24rpx;
	  font-weight: normal;
	  text-align: left;
	  line-height: 28rpx;
	}
	  
	.order-address .address-detail text{
	  color: #888888;
	  font-size: 24rpx;
	  font-weight: normal;
	  text-align: left;
	  line-height:28rpx;
	}
	.order-goods {
	    position: relative;
	    display: block;
	    /* width: 100%; */
	    margin: 20rpx 20rpx 0 20rpx;
	    border-radius: 20rpx;
	    box-sizing: border-box;
	    background-color: #ffffff;
	}
	
    .order-goods .goods-item {
	    position: relative;
	    display: block;
	    /* width: 100%; */
	    height: 200rpx;
	    box-sizing: border-box;
	    margin: 20rpx 20rpx 0 20rpx;
	    border-radius: 20rpx;
	    /* border-bottom: #e2e2e2 1px solid; */
	    background-color: #ffffff;
	}
	
	.order-goods .goods-item .item-photo {
	    position: absolute;
	    top: 20rpx;
	    left: 20rpx;
	    display: block;
	    width: 160rpx;
	    height: 160rpx;
	    overflow: hidden;
	    border-radius: 10rpx;
	}
	
    .order-goods .goods-item .item-photo image{
	    width:100%;
	    max-width:100%;
	    height:100%;
	    background-color:#ffffff;
	
	}
	
	.order-goods .goods-item .item-info {
	    position: relative;
	    display: block;
	    height: 100%;
	    box-sizing: border-box;
	    margin-left: 208rpx;
	    margin-right: 10rpx;
	    overflow: hidden;
	}
	
	.order-goods .goods-item .item-info .info-name {
	    position: relative;
	    display: block;
	    width: 100%;
	    margin-top: 20rpx;
	    box-sizing: border-box;
	    color: #404245;
	    font-size: 28rpx;
	    font-weight: normal;
	    text-align: left;
	    line-height: 28rpx;
	}
	
	.order-goods .goods-item .item-info .info-attr {
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
	
	.order-goods .goods-item .item-info .info-price {
	    position: absolute;
	    left: 0;
	    bottom: 16rpx;
	    width: 50%;
	    display: block;
	    box-sizing: border-box;
	    color: #f3424c;
	    font-size: 28rpx;
	    font-weight: normal;
	    text-align: left;
	    line-height: 32rpx;
	}
	
	.order-goods .goods-item .item-info .info-amount {
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
	.order-summury {
	    position: relative;
	    display: block;
	    /* width: 100%; */
	    margin: 20rpx 20rpx 0 20rpx;
	    border-radius: 20rpx;
	    box-sizing: border-box;
	    /* border-bottom: #e2e2e2 1px solid; */
	    background-color: #ffffff;
	    overflow: hidden;
	}
	
	.order-summury .summury-total {
	    display: block;
	    height: 68rpx;
	    overflow: hidden;
	    color: #404245;
	    font-size: 26rpx;
	    font-weight: normal;
	    line-height: 68rpx;
	    padding-left: 20rpx;
	}
	
	.order-summury .summury-total .summury-detail-text {
	    float: right;
	    display: block;
	    height: 68rpx;
	    overflow: hidden;
	    color: #f3424c;
	    font-size: 26rpx;
	    font-weight: normal;
	    line-height: 68rpx;
	    padding-right: 20rpx;
	}
	
	.order-summury .summury-detail {
	    margin-top: 16rpx;
	    display: block;
	    height: 40rpx;
	    overflow: hidden;
	    color: #666666;
	    font-size: 26rpx;
	    font-weight: nomal;
	    line-height: 40rpx;
	    padding-left: 20rpx;
	}
	
	.order-summury .summury-detail .summury-detail-text {
	    float: right;
	    display: block;
	    height: 40rpx;
	    overflow: hidden;
	    color: #666666;
	    font-size: 26rpx;
	    font-weight: normal;
	    line-height: 40rpx;
	    padding-right: 20rpx;
	}
	.order-info {
	    position: relative;
	    display: block;
	    /* width: 100%; */
	    margin: 20rpx 20rpx 0 20rpx;
	    border-radius: 20rpx;
	    box-sizing: border-box;
	    /* border-bottom: #e2e2e2 1px solid; */
	    background-color: #ffffff;
	    overflow: hidden;
	}
	
	.order-info .info-text {
	    margin: 16rpx 0;
	    display: block;
	    height: 40rpx;
	    overflow: hidden;
	    color: #666666;
	    font-size: 28rpx;
	    font-weight: normal;
	    line-height: 40rpx;
	    padding-left: 20rpx;
	}
	.order-info .info-text .info-text-span{
	    float: right;
	    display: block;
	    height: 40rpx;
	    overflow: hidden;
	    color: #666666;
	    font-size: 26rpx;
	    font-weight: normal;
	    line-height: 40rpx;
	    padding-right: 20rpx;
	}
	.order-submit {
	    z-index: 100;
	    width: 100%;
	    height: 88rpx;
	    box-sizing: border-box;
	}
	.order-submit .order-submit-list{
	    background-color: #ffffff;
	}
	.order-submit .submit-button {
	    position: relative;
	    display: block;
	    width: 50%;
	    height: 100%;
	    box-sizing: border-box;
	    color: #404245;
	    background-color: #f7f7f7;
	    line-height: 88rpx;
	    text-align: center;
	    border-left: #e5e5e5 solid 1px;
	}
	
	.order-submit .submit-button.dark {
	    color: #ffffff;
	    background-color: #f3424c;
	    border-left: none;
	}
</style>
