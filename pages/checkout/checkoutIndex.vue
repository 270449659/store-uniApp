<template>
	<view class="confirm">
		<view class="content" >
			<!-- 地址 --> 
			<view class="confirm-address">
				<view class="address-con">
					<view class="address-contact">
					  <text class="mgr5">{{addressList.consignee}}</text>{{addressList.mobile}}
				    </view>
					<view class="address-detail mgt10">
						<span class="moren" v-if="addressList.is_default">默认</span>
						<text>{{addressList.address}}</text> 
					</view>
				</view>
			</view>
			
			<!-- 订单信息 -->
			<view class="confirm-info">
				<view class="confirm-goods" v-for="item in checkoutInfo.goods_list">
				   <view class="goods-photo"><image :src="item.goods_thumb"></image></image></view>
				   <view class="goods-info">
					   <view class="info-name">{{item.goods_name}}</view> 
					   <view class="info-attr" v-if="item.goods_attr">
						   <text>{{item.goods_attr}}</text>
					    </view> 
						<view class="info-price">{{item.goods_price}}</view> 
						<view class="info-amount">{{item.goods_number}}</view>
					</view>
				</view>
				
				<!-- 配送方式 -->
				<view  @click="goExpress"  class="confirm-list confirm-distribution">
					<text class="left">配送</text>
					<view v-if="deliveryTwoName"  class="right distribution-mode">{{deliveryTwoName}}</view>
					<view v-else class="right distribution-mode">选择配送方式</view>	
					<!-- {{deliveryId}} -->
				</view>	
				<!-- 发票-->
				<view class="confirm-list confirm-invoice">
					<text class="left">发票</text>
					<view class="right invoice-mode">不开发票</view>
				</view>	
					
				<!-- 买家留言 -->
				<view class="confirm-textarea">
				  <textarea type="text" placeholder="买家留言" v-model="textareaComment"></textarea>
				</view>
			</view>
			<!-- 订单总额 -->
			<view class="confirm-summury">
			  <view v-if="checkoutInfo.total.goods_price" class="summury-total flex-justify-content-s-b">
				订单总额 <text class="total-price">+￥{{checkoutInfo.total.goods_price}}</text>
			  </view>
			  <view v-if="checkoutInfo.total.total_fee" class="summury-detail flex-justify-content-s-b">
				商品总额 <text class="total-price">+￥{{total.total_fee}}</text>
			  </view>
			  <view  v-if="checkoutInfo.total.shipping_fee"  class="summury-detail flex-justify-content-s-b">
				运费金额 <text class="total-price">+￥{{checkoutInfo.total.shipping_fee}}</text>
			  </view>
			</view> <!-- Total end-->
			
			
			 <!-- Submit -->
			<view class="confirm-submit fixed-bottom flex-justify-content-s-b" v-if="orderPrice">
			  <view class="submit-total">
				<view class="total-price">￥{{checkoutInfo.total.goods_price}}</view>
			<!-- 	<view class="total-discount">优惠￥2</view> -->
			  </view>
			  <view class="submit-button dark" :class="{active:canPurchase}"  @click="checkoutOrder">
				提交订单并支付
			  </view>
			</view><!-- Submit end-->
			
			<!-- 配送弹框 -->
			<uniPopup ref="popup" type="bottom">	
				<view class="confirm-distribution-modal">
					<view class="main">
						<view class="list">
						   <radio-group @change="evaluateRadioChange">
							   <label class="item flex-justify-content-s-b uni-list-cell uni-list-cell-pd" v-for="(item, index) in expressInfo" :key="item.delivery_id">
								   <view class="flex left">
									   <radio class="flex-align-items-center" :value="item.delivery_id" :checked="index === current" />
								       <view>{{item.delivery_name}}</view>
								   </view>
								    <view class="right"><image src="/static/images/goods/nav-right.png"></image></view>
							   </label>
						   </radio-group>
						</view >
					</view>
				</view>
			</uniPopup>
		    <!-- 配送弹框 二级-->
			<view v-if="confirmDistributionPop" class="confirm-distribution-pop">
				<view class="mask" ></view>
				<view class="modalDlg">
					<view class="modalDlg-box">
					   <radio-group @change="evaluateRadioChangeTwo">
						   <label class="item flex-justify-content-s-b uni-list-cell uni-list-cell-pd" v-for="(item, index) in expressTwoInfo" :key="item.delivery_id">
							   
							   <view class="right">{{item.delivery_name}}</view>
							   <view class="left">
							   		 <radio class="flex-align-items-center" :value="item.delivery_id" :checked="index === currentTwo" />
							   </view>
						   </label>
					   </radio-group>
					</view >
			    </view>	
		    </view>	
			 <!-- 配送弹框 二级-end-->
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import uniPopup from '@/components/uni-popup/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				title: 'Hello',
				textareaComment:'',
				orderPrice: true,
				canPurchase: true,
				evaluateRadioItems: [{
						value: '0',
						name: '非常满意'
					},
					{
						value: '1',
						name: '满意',
						checked: 'true'
					},
					{
						value: '2',
						name: '不满意'
					},
				],
				
				current: 0,
				currentTwo: 0,
				confirmDistributionPop:false,
				deliveryId:0,
				deliveryTwoId:0,
				deliveryTwoName:'',
			}
		},
		onLoad(e) {
			//console.log('e',e.goodsId)
			this.goods_id=e.goodsId;//商品id
			this.isLogin=this.$isLogin();
			this.userId= uni.getStorageSync('user_id');
			this.token= uni.getStorageSync('token');
			this.gocCheckoutList();
			
		},
		computed:{
			...mapState({
				checkoutInfo: state => state.orderStore.checkoutInfo,//分类
				expressInfo: state => state.orderStore.expressInfo,//配送方式 
				expressTwoInfo: state => state.orderStore.expressTwoInfo,//配送方式二级
				orderId: state => state.orderStore.orderId,//订单号
				defaultConsignees: state => state.addressStore.defaultConsignees,//地址
			}),
			addressList(){
				 let consigneesId =uni.getStorageSync('consigneesId');
				 console.log("12",consigneesId)
				 if(consigneesId){
					 return this.defaultConsignees
				 }else{
					 return JSON.stringify(this.checkoutInfo)=='{}' ? '':this.checkoutInfo.address_list;	
				 }
				
				//console.log('221')
			},
			total(){
				return JSON.stringify(this.checkoutInfo)=='{}' ? '':this.checkoutInfo.total;	
				//console.log('221')
			},
		},		
		methods: {
			//提交订单并支付
			checkoutOrder(){
				if(!this.deliveryTwoId && !this.deliveryTwoName){
					uni.showToast({
						title:'请选择配送方式',
						icon:'error',
						duration: 2000
					});	
				}else{
				uni.showLoading({
				    title: '加载中'
				});	
				this.$store.commit('setSubmitOrder', {
				  address_id: this.addressList.address_id,
				  productId: this.goods_id,
				  shipping_id:this.deliveryTwoId,
				  bonus_id: '',
				  point: 0,
				  p_type: true, 
				  o_time: undefined,
				  inv_payee: '',
				  tax: null,
				  tax_type: 'n',
				  tax_num: '',
				  ral: false,
				  superpack: false,
				  superGoodsid: undefined,
				  integralGoodsid: undefined,
				  pack_fee: 0,
				  pack_name: undefined,
				  inv_type: '',
				  result_spike: undefined,
				  goods_id: undefined,
				  delivery_name:this.deliveryTwoName,
				  delivery_id: this.deliveryId,
				  pintuan: undefined,
				  pintuanGoodsId: undefined,
				  pintuanNumber: undefined,
				  pintuanOrderId: undefined,
				  msg: '',
				  jifennum: '',
				  accesstoken: 'f8bf93222cbb7264d2ba02f0ea8bd1db',
				  user_id: this.userId,
				  platform: 'H5',
				  app_key: 'wolf100000001',
				  format: 'JSON',
				  api_version: '2.0',
				  req_source: 'app',
				  token: this.token,
				  //token:this.token,
				})
				}
			},
			//提交订单并支付-end
			
			 //确认订单列表
             gocCheckoutList(){
				 //console.log('1')
				 // shipping_id:45,
				this.$store.dispatch('setCheckoutList', {
			      platform:'H5',
				  productId:this.goods_id,
				  shipping: undefined,
				  shipping_id:'',
				  p_type: true,
				  tax_type: 'n',
				  shipping_type: 'a',
				  app_key: 'wolf100000001',
				  format: 'JSON',
				  api_version: '2.0',
				  req_source: 'app',
				  user_id:this.userId,
				  token:this.token,
				  accesstoken:this.token,
				})
			 },
			 //确认订单列表-end
			 
			 // 打开规格
			 goExpress(){	
				 this.$store.commit('setExpressList', {
				   platform:'H5',
				   address_id:2,
				   user_id:this.userId,
				   token:this.token
				 })
			 	this.$refs.popup.open('bottom')
			 },// 打开规格 end
			 
			 // 配送一级点击
		   evaluateRadioChange(evt) {
			   this.confirmDistributionPop=true;
			   this.$store.commit('setExpressTwoList', {
			     platform:'H5',
			     address_id:2,
			     user_id:this.userId,
			     token:this.token
			   })
			   console.log('ss')
			   for (let i = 0; i < this.expressInfo.length; i++) {
				   if (this.expressInfo[i].delivery_id === evt.detail.value) {
					   this.current = i;  
					   this.deliveryId=this.expressInfo[i].delivery_id;
					   break;
				   }
			   }
		   },
		   // 配送一级点击-end
		   
		   // 配送二级点击
		   evaluateRadioChangeTwo(evt) {	   
			   console.log('ss')
			   for (let i = 0; i < this.expressTwoInfo.length; i++) {
				   if (this.expressTwoInfo[i].delivery_id === evt.detail.value) {
					   this.currentTwo = i;
					   this.deliveryTwoId=this.expressTwoInfo[i].delivery_id;
					   this.deliveryTwoName=this.expressTwoInfo[i].delivery_name;
					   break;
				   }
			   };
			   this.confirmDistributionPop=false;
			   this.$refs.popup.close()
		   },
		   // 配送二级点击-end
		},
		//监听
		watch:{
			orderId(){
				console.log('orderId', this.orderId)
				uni.navigateTo({
					url: '/pages/payment/paymentIndex?orderId='+this.orderId,
				})	  
			},
		}
	}
</script>

<style lang="scss">
	view{box-sizing: border-box;}
	.confirm{
		.content {
			padding:30rpx 30rpx 0 30rpx;
			.confirm-address{
				padding: 20rpx 30rpx 30rpx 30rpx;
				border-radius:10rpx;
				background: #fff url(https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/address-bg-bd.png) -7px bottom repeat-x;
		        background-size: 64px 5px;
				.address-con{
					position: relative;
					.address-contact{
					  font-size:35rpx;
					}
					.address-detail{
					  font-size:30rpx;
					  color: #666;
					  .moren{
						  font-size:25rpx;
						  color: #fff;
						  padding: 2rpx 6rpx;
						  background: #e60012;
						  margin: 0 10rpx 0 auto;
						  border-radius:10rpx;
					    }
					}
					
				}
				.address-con::after {
					content: "";
					position: absolute;
					display: inline-block;
					width: 12rpx;
					height: 12rpx;
					border-top: 4rpx solid #ccc;
					border-left: 4rpx solid #ccc;
					top: 50%;
					transform: translate(0,-50%) rotate(135deg);
					right: 10rpx;
				}	 
			}
			.confirm-info{
				position: relative;
				margin-top:20rpx;
			    background: #fff;
				padding: 20rpx 30rpx 20rpx 30rpx;
				border-radius: 10rpx;
				.confirm-goods{
					position: relative;
					width: 100%;
					height: 200rpx;
					.goods-photo{
						position: absolute;
						top: 0;
						left:0;
						width: 160rpx;
						height: 160rpx;
						overflow: hidden;
						border-radius: 10rpx;
						image{width: 100%; height:100%;}
					}
					.goods-info{
						position: relative;
						height: 100%;
						margin-left:200rpx;
						margin-right: 10rpx;
						overflow: hidden;
						.info-name{
							color: #333;
							line-height: 40rpx;
							margin-bottom: 10rpx;
							font-size: 28rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
						}
						.info-attr{
							margin-bottom: 12rpx;
							font-size: 24rpx;
							color: #999;
							line-height: 1;
						}
						.info-price{ 
							position: absolute;
							left:0;
						    bottom: 5rpx;
							color: #f2270c;
                            font-size: 30rpx;
						}
						.info-amount{
							position: absolute;
							right:0;
							bottom:5rpx;
							color: #888;
							font-size: 30rpx;
						}
					}
				}
				.confirm-list{
					height: 108rpx;
					line-height: 108rpx;
					position: relative;
					font-size:30rpx;
					.left{position: absolute;}
					.right{
					text-align: right;
					
					 padding-right:50rpx
					 }
					.right::after {
					content: "";
					position: absolute;
					display: inline-block;
					width: 12rpx;
					height: 12rpx;
					border-top: 4rpx solid #ccc;
					border-left: 4rpx solid #ccc;
					top: 50%;
					transform: translate(0,-50%) rotate(135deg);
					right: 10rpx;
				    }	 
				}
				.confirm-textarea{
					textarea{
						height: 130rpx;
						min-height: 130rpx;
						padding: 15rpx;
						margin-top: 20rpx;
						background-color: #f5f5f5;
						border: none;
						text-align: left;
						overflow: hidden;
						color: #404245;
						font-size: 28rpx;
						font-weight: normal;
						line-height: 32rpx;
					}
				}
				
			}
			.confirm-summury{	
				background-color: #ffffff;
				margin-top: 20rpx;
				padding:0 16rpx 8rpx 16rpx;
				border-radius: 10rpx;
				color: #888;
				.summury-total{
					color: #404245;
					height: 68rpx;
					font-weight: bold;
					line-height: 68rpx;
					.total-price{
						font-weight: 700;
					}
				}
				text{color:#e60012;}
			}
			
			 .confirm-submit {
			    width: 100%;
			    height: 88rpx;
			    box-sizing: border-box;
			    border-top: #e2e2e2 2px solid;
			    background-color: #ffffff;
			    left: 0;
				.submit-total{
					.total-price {
					    height: 40rpx;
					    color: #e60012;
					    font-size: 38rpx;
					    font-weight: normal;
					    text-align: right;
					    line-height: 40rpx;
					} 
					.total-discount {    
					    height: 30rpx;
					    color: #64686d;
					    font-size: 24rpx;
					    font-weight: bold;
					    text-align: right;
					    line-height: 30rpx;
					  } 
				}
				.submit-button {	
				    width: 40%;
				    height: 100%;
				    font-size: 26rpx;
				    font-weight: 700;
				    box-sizing: border-box;
				    color: #404245;
				    line-height: 88rpx;
				    text-align: center;
				    opacity: 0.25;
					
				}
				.submit-button.active {
				    opacity: 1.0;
				}
				.submit-button.dark {
				    color: #ffffff;
				    background-color: #555555;
					
				}
				.submit-button.dark.active {
				    color: #ffffff;
				    background-color: #f91515;
				}
			}
			.confirm-distribution-modal{
				.main{	
					position: absolute;
					transform: translate3d(0,0,0);
					bottom:0;
					width: 100%;
					z-index: 210;
					max-height:1000rpx;
					min-height: 400rpx;
					background-color: #fff;
					border-top-left-radius:20rpx;
					border-top-right-radius:20rpx;
					overflow: hidden;
					.list{
						.item{
							padding:20rpx 18rpx 16rpx 18rpx;
							border-bottom:1px solid #e4e4e4;
							
							.right{
								    width: 16rpx;
								    height: 20rpx;
								line-height: 25rpx;
								font-size:24rpx;
								image{
									width: 16rpx;
									height: 20rpx;  
								}
							}
						}
					}
				}
			}
			.confirm-distribution-pop{
				.mask{
						width: 100%;
						height: 100%;
						position: fixed;
						top: 0;
						left: 0;
						background: #000;
						z-index: 9000;
						opacity: 0.6;
					}
					.modalDlg{
						width: 700rpx;
						// height: 405rpx;
						position: fixed;
						//top: 0;
						right: 0;
						//bottom: 0;
						left: 0;
						top: 40%;
						z-index: 9999;
						margin:0 auto;
						// margin: 0rpx 130rpx 185rpx 130rpx;
						background-color: #fff;
						border-radius: 23rpx;
						display: flex;
						flex-direction: column;
						align-items: center;
						.modalDlg-box{
							width: 100%;
							.item{
								padding:20rpx 0 16rpx 18rpx;
								border-bottom:1px solid #e4e4e4;
								
								.right{
									height: 25rpx;
									line-height: 25rpx;
									font-size:24rpx;
								}
							}
							.item:last-child{border-bottom:none;}
						}
					}
			}
		}
	}
	
</style>
