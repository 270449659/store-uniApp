<template>
	<view class="payment">
		<view class="content">
			<view class="payment-header flex">
			  <!-- <view class="header-title">订单 #{{orderInfo.sn}},请您尽快付款。</view> -->
			  <view class="header-title">请您尽快付款。{{payDetail.order_sn}}</view>
			  <view class="header-total"><text>￥{{payDetail.total_fee}}</text></view>
		    </view> <!-- payment-header end-->
			<view class="payment-list">
				
				<radio-group @change="evaluateRadioChange">
					<view class="flex-justify-content-s-b mgb40" v-for="(item, index) in paymentList" :key="item.pay_id">
						<view class="payment-title">
							<image v-if='item.pay_name=="余额支付"' class="payment-icon" src="https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/balance.png"></image>
							{{item.pay_name}}
						</view>
						<label class="radio"><radio class=" " :value="item.pay_id" :checked="index === current" /></label>
					</view>
			    </radio-group>
			</view>
			<button @click="goPaymentSubmit" class="payment-submit">确认支付</button>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				title: 'Hello',
				orderInfo:{
					total:0,
				},
				evaluateRadioItems: [{
						value: '0',
						name: '余额'
					},
					{
						value: '1',
						name: '微信',
						checked: 'true'
					},
					{
						value: '2',
						name: '支付宝'
					},
				],
				current: 0,
			}
		},
		onLoad(e) {     
		    this.orderId=e.orderId;//订单id
			this.isLogin=this.$isLogin();
			this.userId= uni.getStorageSync('user_id');
			this.token= uni.getStorageSync('token');
			if(this.orderId && this.isLogin){
				this.goPayDetail(this.orderId);
				this.goPaymentList();
				this.goPaymentIsUse()
				console.log('1')
			}
           
		},
		computed:{
			...mapState({
				payDetail: state => state.paymentStore.payDetail,//确定订单
				paymentList: state => state.paymentStore.paymentList,//支付方式
				payResult: state => state.paymentStore.payResult,//支付结果
				
			}),
		},	
		methods: {	
			//订单确认
			goPayDetail(orderId){
				this.$store.dispatch('setPayDetail', {
				   order_id:orderId,
				   platform:'H5',
				   user_id:this.userId,
				   token:this.token,
				   accesstoken:this.token,
				})
			},
			//支付方式
			goPaymentList(orderId){
				this.$store.commit('setPaymentList', {
				   platform:'H5',
				   user_id:this.userId,
				   token:this.token,
				   accesstoken:this.token,
				})
			},
			//检测支付方式
			goPaymentIsUse(orderId){
				this.$store.commit('setPaymentIsUse', {
				   platform:'H5',
				   user_id:this.userId,
				   token:this.token,
				   accesstoken:this.token,
				})
			},
			//testingPay
           // 需求点击
           evaluateRadioChange(evt) {
			   console.log('ss')
			   for (let i = 0; i < this.paymentList.length; i++) {
				   if (this.paymentList[i].pay_id === evt.detail.value) {
					   this.current = i;  
					   
					   break;
				   }
			   }
           },
           // 需求点击-end
		   
		   //支付
		   goPaymentSubmit(){
			   //console.log('1')
			   uni.showLoading({
			       title: '加载中'
			   });
			   	this.$store.commit('setPaymentSubmit', {
			   	   platform:'H5',
				   pay_id: 'deposit',
				   order_id:this.payDetail.order_sn,
				   money:this.payDetail.total_fee,
			   	   user_id:this.userId,
			   	   token:this.token,
			   	   accesstoken:this.token,
			   	})
		    }
		},
		//监听
		watch:{
		    //监听支付结果
			payResult(){
				//console.log('payResult', this.payResult)
				if(this.payResult){	
				   //console.log('cartAddFast1', this.payResult)
				   uni.showModal({
				       title: '支付结果',
				       content: '付款成功',
				   				   cancelText:'查看订单',
				   				   confirmText:'继续逛',
				       success: function (res) {
				           if (res.confirm) {
				               console.log('用户点击确定');
							   uni.switchTab({
							   	url: '/pages/home/index'
							   })
							   
				           } else if (res.cancel) {
							   uni.reLaunch({
							   	url: '/pages/order/orderList'
							   })
				               console.log('用户点击取消');
				           }
				       },
					   
				   }); 
				}
				this.$store.state.paymentStore.payResult=false;	  
			}
			
		}
	}
</script>

<style lang="scss">
	.content {
		
		
	}
	.payment-header {
	  padding:0 28rpx;
	  flex-direction: column;
	  align-items: center;
	  justify-content:center;
	  box-sizing:border-box;
	  background-color:#ffffff;
	  overflow:hidden;
	}
	
	.payment-header .header-title {
	  display:block;
	  margin-top:16rpx;
	  height:45rpx;
	  overflow:hidden;
	  box-sizing:border-box;
	  overflow:hidden;
	  color:#666666;
	  font-size:35rpx;
	  font-weight:normal;
	  line-height:45rpx;
	}
	
	.payment-header .header-total {
	  display:block;
	  height:65rpx;
	  overflow:hidden;
	  box-sizing:border-box;
	  overflow:hidden;
	  font-weight:normal;
	  line-height:65rpx;
	}
	
	.payment-header .header-total text {
	  color:#e60012;
	  font-size:40rpx;
	  font-weight:normal;
	  line-height:65rpx;
	}
	
	.payment-list{
	  position:relative;
	  display:block;
	  /* width:100%; */
	  margin: 20rpx;
	  padding: 30rpx 20rpx 20rpx;
	    border-radius: 20rpx;
	  background: #fff;
	  .payment-icon{ margin-right:20rpx; width: 30rpx;height:30rpx;}
	}
	
	.payment-submit{
	  position: fixed;
	  bottom: 0;
	  left: 0;
	  right: 0;
	  z-index: 999;
	  width:96%; 
	  height:88rpx;
	  color: #fff;

	  margin:50rpx 2% 20rpx 2%; 
	  font-size:38rpx;
	  border-radius:40rpx;
	  font-weight:normal;
	  line-height:88rpx;
	  text-align:center;
	  background-color: #f91515;
	  border: none;
	  /* background-image: -webkit-gradient(linear, left top, right top, color-stop(10%, #f98282), to(#f91515));
	  background-image: linear-gradient(to right, #f98282 10%, #f91515 100%); */
	}
</style>
