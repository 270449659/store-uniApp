<template>
	<view class="cart">
		<view class="content" >
		
			<!-- {{cartlist  }} -->
			<view class="cart-list"  v-if="cartList.length"> 
				<view class="list-item " v-for="(item,index) in cartLists"  :id="index" >
				   <view class="item-checkbox" :class="item.is_checked =='true' || item.is_checked ==true ? 'checked' :''" @click="checkedItem" :data-item-index="index" ></view> 
				   <view class="item-photo" @click="openDetails(item.goods_id)" >
					  <image v-bind:src="item.goods_thumb"></image>
				   </view>
					<view class="item-info">
					 <view class="info-name">{{item.goods_name}}</view>
					<!-- <view class="info-attr" >{{item.property}}</view> -->
					 <view class="info-price">￥{{item.goods_price}}</view>
					<view class="info-delete">
					   <image  @click="goDeleteGoods(item.rec_id)" :data-item-index="index" src="/static/images/cart/ind-delete-icon.png"> </image>
					 </view>
					 <view class="info-amount">
					   <view class="amount-button cutNumber" @click="cutNumber(item.goods_id,item.goods_number)" :data-item-index="index">-</view>
					   <input  class="amount-count"  v-model="item.goods_number"  disabled="true" type="number" />
					   <view class="amount-button addNumber" @click="addNumber(item.goods_id,item.goods_number,index)" :data-item-index="index">+</view>
					 </view>
				   </view>
				</view> 
			</view>  <!-- cart-list end-->
			<view class="cart-bottom flex-justify-content-s-b"  v-if="cartTotalCount.goods_count">
				<view  class="left cart-bottom-select">
					<view   @click="checkedAll" class="select-checkbox" :class="checkedAllStatus ? 'checked' : ''" ></view>
					全选
				</view>
				<view class="right flex">
					<view class="cart-bottom-total"><text class="total-price">￥{{cartTotals.checkedGoodsPrices}}</text></view>
				    <view :class="checkedGoodsLength ? 'dark' : ''"  @click="checkoutOrder" class="cart-submit-button">下单</view>
				</view>
			</view>
			<view class="empty" v-if="cartTotalCount==''">
				<view class="empty-item">
				  <img class="item-icon" src="/static/images/cart/cart-empty-icon.png"/>
				  <view class="item-text">您的购物车是空的</view>
				  <view class="item-button" @click="goHome">随便逛逛</view>
				</view> 
			</view>
		</view>
	</view>
</template>

<script>
	import {formatTime} from '@/common/js/index.js'
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				title: 'Hello',
				checkedGoodsLength:false,//是否选商品
			    cartTotals: {
			        checkedGoodsCount: 0,
			        checkedGoodsPrices:0.00
			    },
				//cartlist:''
				checkedAllStatus: false,//全选
			}
		},
		onLoad() {
			this.userId= uni.getStorageSync('user_id');
			this.token= uni.getStorageSync('token');
			this.Times=formatTime(null, '-')
			console.log('this.timess',formatTime(null, '-'));
            this.getCartList(0);
			 
			
		},
		computed:{
			...mapState({
				cartList: state => state.shopping.cartList,//购物车列表
				updateNumber: state => state.shopping.updateNumber,//更新购物车
			    cartTotal: state => state.shopping.cartTotal,//购物车数量
				deleteCart: state => state.shopping.deleteCart,//删除购物车
			
		    }),
			
			cartLists: {
				get() {
					let cartList=this.$store.state.shopping.cartList;
					let checkedlength=0;
					let cartListData=cartList.map((element, index, array)=> {     
					     if(element.is_checked=="true"){
							this.checkedGoodsLength=true;
							console.log("true")
							checkedlength++;
							element.is_checked = true;
						 }else if(element.is_checked=="false"){
			                element.is_checked = false;
						 }else {
							element.is_checked = element.is_checked; 
						 } 
					     return element
					 });
					 if(cartList.length==checkedlength){
						 this.checkedAll()
					 }
					 return cartListData
					 //console.log('tmpCartData',cartListData)
				},
				 set(val) {
					 this.$store.state.shopping.cartList=val
				 }
			},				
			cartTotalCount(){
				let a=JSON.stringify(this.cartTotal)=='{}' ? '':this.cartTotal;
				return a;
				//this.empty=true;
			},
		},		
		methods: {
			//提交订单
			checkoutOrder() {
				console.log('checkoutOrder')
			    let checkedGoods = this.cartLists.filter((element, index, array)=> {
			        if (element.is_checked === true) {
			          return true;
			        }
			    });
			    if (checkedGoods.length <= 0) {
			        uni.showToast({
			            title: '请先选择商品',
			            duration: 2000
			        });
			        this.checkedGoodsLength=false;
			        return false;
			    }else {
					uni.navigateTo({
						url: '/pages/checkout/checkoutIndex?goodsId='+this.goods_id,
					})
				}
				
			},	  
			// 检查当前项
			checkedItem(event) {
				let itemIndex =event.target!=undefined?event.target.dataset.itemIndex:event; 
				let checkedlength=0;
				let tmpCartData=this.cartLists.map((element, index, array)=> {
				   if (index == itemIndex) {
					 element.is_checked = !element.is_checked;
					 this.recId= element.rec_id;
					 this.ischecked= element.is_checked;
				   }
				   if(element.is_checked){
					   //console.log('11')
					   checkedlength++;
				    }
				   return element;
				});
				//console.log('checkedaa',checkedlength)
				if(tmpCartData.length==checkedlength){
					this.checkedAll()
				}else{
					this.checkedAllStatus=false;
				}
				let ischeckeds;
				if(this.ischecked){
					ischeckeds=1
				}else{
					ischeckeds=0
				}
				this.$store.commit('shopping/setCartCheck', {
				  platform:'H5',
				  id: this.recId,
				  ischecked:ischeckeds,
				  user_id:this.userId,
				  token:this.token,
				  accesstoken:this.token,
				}) 
			    this.cartLists=tmpCartData;
				this.getCheckedGoodsPrice(tmpCartData)
				console.log('1')		
			},
			
			// 检查全部项
			checkedAll() {
				let ischeckeds;
				if(this.checkedAllStatus){
					ischeckeds=0
				    this.checkedAllStatus=false;
					let tmpCartData=this.cartLists.map((element, index, array)=>{  
						element.is_checked = false;
						return element;
					});
					this.cartLists=tmpCartData;
					this.cartTotals.checkedGoodsPrices=0.00.toFixed(2);
					this.checkedGoodsLength=false;
			    }else{
					ischeckeds=1
				    this.checkedAllStatus=true; 
				    let tmpCartData=this.cartLists.map((element, index, array)=>{  
					  element.is_checked = true;
					  return element;
				    });
					this.cartGoods=tmpCartData;
					this.getCheckedGoodsPrice(tmpCartData)
				} 
				uni.showLoading({
				    title: '加载中'
				});
				this.$store.commit('shopping/setCartCheckAll', {
				  platform:'H5',
				  ischecked:ischeckeds,
				  user_id:this.userId,
				  token:this.token,
				  accesstoken:this.token,
				}) 
			},
			
			// 检查价格
			getCheckedGoodsPrice(tmpCartData) {
				let cartGoodsAmount = 0;
				let cartGoodsCount = 0;
				let cartGoods = tmpCartData;
				if (cartGoods && cartGoods.length > 0) {
					for (let i = 0; i < cartGoods.length; i++) {
						if (cartGoods[i].is_checked) {
						  cartGoodsAmount = Number(cartGoodsAmount + (cartGoods[i].goods_price * cartGoods[i].goods_number));
						  cartGoodsCount += parseInt(cartGoods[i].goods_number);
						}
					}
					this.getCheckedGoodsCount(cartGoodsCount)
					this.cartTotals.checkedGoodsPrices=cartGoodsAmount.toFixed(2);
					console.log(this.cartTotals.checkedGoodsPrices)
					if(this.cartTotals.checkedGoodsPrices>0){
					   this.checkedGoodsLength=true;  
					}else{
					   this.checkedGoodsLength=false;
					}	
				}
			},
			 // 检查数量
			getCheckedGoodsCount(cartGoodsCount) {
				this.cartTotals.checkedGoodsCount=cartGoodsCount;
			},
			//购物车列表
            getCartList(update){
				uni.showLoading({
				    title: '加载中'
				});
				
				this.$store.dispatch('shopping/setCartList', {
				  platform:'H5',
				  // user_id:this.userId,
				  // token:this.token,
				  // accesstoken:this.token,
				  user_id:3,
				  token:'02c211546f2fd8827dff3633763e177e',
				  accesstoken:'02c211546f2fd8827dff3633763e177e',
				  app_key: 'wolf100000001',
				  req_source: 'app',
				  format: 'JSON',
				  api_version: '2.0',
				  timestamp:formatTime(null, '-'),
				  req_source: 'h5',
				  sign: '14E7AD8C354C11A8CE0F0B8A98337F82',
				})
			},
			// 数量增
			addNumber(id,number,index) {
			  // console.log('addNumber'+id,amount,index)
			  let numbers=number+1;
			  this.getUpdateNumber(id,numbers);
			   //this.checkedItem(index)
			}, //加  end
			
			 // 更新购物车
			getUpdateNumber(id,number) {
				uni.showLoading({
				    title: '加载中'
				});
				 this.$store.dispatch('shopping/setUpdateNumber', {
				   platform:'H5',
				   user_id:this.userId,
				   token:this.token,
				   goods_id:id,
				   number:number,
				   product_id: 0
				 })
				 
			},
			// 更新购物车-end
			
			goDeleteGoods(recId){
				uni.showLoading({
				    title: '加载中'
				});
				this.$store.commit('shopping/setDeleteGoods', {
				  platform:'H5',
				  user_id:this.userId,
				  token:this.token,
				  id:recId,
				  //id:goodsId,
				})
				
			},
			goHome(){
				console.log('1')
				 uni.switchTab({
					url: '/pages/home/homeIndex'
				})
				// uni.navigateTo({
				//   url: "/pages/home/index"
				// });
			}
		},
		watch:{
			updateNumber(){
				let updateNumber=JSON.stringify(this.updateNumber)=='{}' ? '':this.updateNumber;
				console.log('asas',updateNumber)
				if(updateNumber.update_cart){
				  console.log('updateNumber')
				 this.getCartList(0)
				}
				
			},
		deleteCart(){
			//let deleteGoods=JSON.stringify(this.deleteGoods)=='{}' ? '':this.deleteGoods;
			//console.log('deleteGoods',deleteGoods)
		
			if(this.deleteCart){
			  console.log('deleteGoods1')
			 this.getCartList(0)
			  this.$store.state.shopping.deleteCart=false;
			}else{
				this.cartTotalCount==''
			}
		}
	}
	}
</script>

<style>
	.cart{}
	.cart .cart-list {
	
	   /*margin-top:88rpx; */
	    position: relative;
	    display: block;
	    width: 100%;
	    box-sizing: border-box;
	    border-top: #e2e2e2 1px solid;
	    padding-bottom: 64rpx;
	}
	
    .cart-list .list-item {
	    position: relative;
	    display: block;
	    /* width: 100%; */
	    height: 220rpx;
	    box-sizing: border-box;
	    border-bottom: #e2e2e2 1px solid;
	    background-color: #ffffff;
	    padding: 20rpx 0;
	    border-radius: 20rpx;
	    margin: 28rpx 28rpx 28rpx 28rpx;
	  
	}
	    
	.cart-list .list-item .item-checkbox {
	    position: absolute;
	    top: 50%;
	    left: 20rpx;
	    margin-top: -10rpx;
	    width: 40rpx;
	    height: 40rpx;
	    background-image: url(http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/checkbox-0e09baa37e.png);
	    background-repeat: no-repeat;
	    background-size: cover;
	}
	  
	.cart-list .list-item .item-checkbox.checked {
	    background:url(http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/checkbox-checked-822e54472a.png) no-repeat;
	    background-size:40rpx;
	} 
	
	.cart-list .list-item .item-photo {
	    position: absolute;
	    top: 20rpx;
	    left:88rpx;
	    display: block;
	    width: 180rpx;
	    height: 180rpx;
	    box-sizing: border-box;
	    /* border: #e2e2e2 2px solid; */
	    overflow: hidden;
	}
	  
	.cart-list .list-item .item-photo image {
	    width: 100%;
	    max-width: 100%;
	    height: 100%;
	    background-color: #ffffff;
	}
	  
	.cart-list .list-item .item-info {
	    position: relative;
	    display: block;
	    height: 100%;
	    margin-left: 288rpx;
	}
	
	.cart-list .list-item .item-info .info-name {
	    display: block;
	    position: relative;
	    margin-top: 8rpx;
	    color: #404245;
	    font-size: 28rpx;
	    font-weight: normal;
	    text-align: left;
	    line-height: 32rpx;
	    box-sizing: border-box;
	    padding-right: 108rpx;
	    max-height: 64rpx;
	    overflow: hidden;
	}
	
	.cart-list .list-item .item-info .info-attr {
	    margin-top: 16rpx;
	    position: relative;
	    display: block;
	    box-sizing: border-box;
	    color: #999999;
	    font-size: 26rpx;
	    font-weight: normal;
	    text-align: left;
	    line-height: 30rpx;
	    padding-right: 88rpx;
	}
	
	.cart-list .list-item .item-info .info-price {
	    position: absolute;
	    left: 0;
	    bottom: 4rpx;
	    display: block;
	    height: 48rpx;
	    color: #f2270c;
	    font-size: 28rpx;
	    font-weight: normal;
	    text-align: left;
	    line-height: 48rpx;
	    box-sizing: border-box;
	    overflow: hidden;
	}
	  
	.cart-list .list-item .item-info .info-delete {
	    position: absolute;
	    padding: 20rpx;
	    top: 0px;
	    right: 0px;
	    display: block;
	    width: 88rpx;
	    height: 88rpx;
	    overflow: hidden;
	    z-index: 100;
	}
	
	.cart-list .list-item .item-info .info-delete image {
	    margin-top: 30rpx;
	    margin-left: 30rpx;
	    width: 28rpx;
	    height: 28rpx;
	}
	
	.cart-list .list-item .item-info .info-amount {
	    position: absolute;
	    right: 8rpx;
	    border: 2rpx solid #ccc;
	    border-radius:50rpx;
	    bottom: 0;
	    display: block;
	    height: 48rpx;
	    overflow: hidden;
	}
	
	.cart-list .list-item .item-info .info-amount .amount-button {
	    float: left;
	    display: block;
	    width:48rpx;
	    height:48rpx;
	    font-size:28rpx;
	    line-height:48rpx;
	    text-align: center;
	    overflow: hidden;
	    box-sizing: border-box;
	    color: #404245;
	    opacity: 1;
	}
	  
	.cutNumber {
	    border-right:2rpx solid #ccc;
	}
	
	.addNumber {
	    border-left:2rpx solid #ccc;
	}
	
	.cart-list .list-item .item-info .info-amount .amount-button.active {
	    opacity: 1;
	  }
	
	  .cart-list .list-item .item-info .info-amount .amount-button img {
	    display: block;
	    margin-top:14rpx;
	    margin-left: 24rpx;
	    width: 24rpx;
	    height: 24rpx;
	    opacity: 1;
	  }
	  .cart-list .list-item .item-info .info-amount .amount-count {
	    
	    float: left;
	    display: block;
	    width: 72rpx;
	    min-width: 40rpx;
	    height: 48rpx;
	    margin-top:0.5px;
	    border: none;
	    background: #ffffff;
	    overflow: hidden;
	    color: #404245;
	    font-size: 20rpx;
	    font-weight: normal;
	    text-align: center;
	    box-sizing: border-box;
	    line-height: 48rpx;
	    opacity: 1;
	  }
	  
	  /* 底部 */
	  .content .cart-bottom  {
	      bottom: 88rpx;
	    }
		
	    .cart-bottom{
	      position: fixed;
	      left: 0;
	      bottom: 0;
	      z-index: 100;
	      width: 100%;
	      height: 100rpx;
	      box-sizing: border-box;
	      border-top: #e2e2e2 1px solid;
	      background-color: #ffffff;
	    }
	    .cart-bottom .cart-bottom-select{ 
			position: relative;
			width: 30%;
			height: 100%;
			box-sizing: border-box;
			color: #404245;
			font-size: 28rpx;
			font-weight: normal;
			text-align: left;
			line-height: 100rpx;
			padding-left: 88rpx;
		}
		.cart-bottom .cart-bottom-select .select-checkbox {
		    position: absolute;
		    top: 50%;
		    left: 20rpx;
		    margin-top: -20rpx;
		    width: 40rpx;
		    height: 40rpx;
		    background:url(http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/checkbox-0e09baa37e.png) no-repeat;
		    /*background-image: url("../image/check-off.png");*/
		    background-size: cover;
		  }
		
		.cart-bottom .cart-bottom-select .select-checkbox.checked {
		    background:url(http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/checkbox-checked-822e54472a.png) no-repeat;
		    /*background-image: url("../image/check-on-multi.png");*/
		    background-size: cover;
		}
		
		.cart-bottom .right{width:70%;}
		
	    .cart-bottom .cart-bottom-total {
			width: 70%;
	        color: #f2270c;
	        font-size: 32rpx;
			text-align: right;
			padding-right: 20rpx;
			box-sizing: border-box;
	        font-weight: normal;
	        line-height: 100rpx;
	        opacity:1;
	    }
	    
	    .cart-bottom .cart-submit-button {
	        position: relative;
	        width: 40%;
	        height: 100%;
	        box-sizing: border-box;
	        color: #ffffff;
	        font-size: 30rpx;
	        font-weight: normal;
	        background-color:#d81e06;
	        line-height:100rpx;
	        text-align: center;
	        opacity: .3;
	    }
	    .cart-bottom .cart-submit-button.dark {opacity:1;}
		
		.empty {
		    position: relative;
		    display: block;
		    width: 100%;
		    overflow: hidden;
		  }
		  .empty-item {
		    height:100%;
		    width:100%;
		    padding:50% 0;
		    display:flex;
		    justify-content:center;
		    flex-direction:column;
		    align-items:center;
		
		  }
		  .empty .empty-item .item-icon {
		    display: block;
		    margin: 0 auto;
		    width: 160rpx;
		    height: 160rpx;
		  }
		  .empty .empty-item .item-text {
		    display: block;
		    height: 64rpx;
		    line-height: 64rpx;
		    color: #666666;
		    font-size: 28rpx;
		    font-weight: normal;
		    overflow: hidden;
		    text-align: center;
		  }
		  .empty .empty-item .item-button {
		    display: block;
		    width: 320rpx;
		    height: 80rpx;
		    line-height: 80rpx;
		    color: #ffffff;
		    background-color: red;
		    font-size: 28rpx;
		    font-weight: normal;
		    border-radius: 80rpx;
		    overflow: hidden;
		    text-align: center;
		    margin: 0 auto;
		    margin-top: 20rpx;
		  }
</style>
