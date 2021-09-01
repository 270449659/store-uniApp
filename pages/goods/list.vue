<template>
	<view class="goods-list">
		<view class="content">
			<!-- {{goodsNavLists.navData}} -->
			<scroll-view  class="goodsNavList" scroll-x="true" @scroll="scroll" scroll-left="120">
				<slot  v-for="(item,index) in goodsNavLists.navData">
					
				<view @click="showToggle(item.id,index)"  v-bind:class="{active:goodsNavState == index}" class="goodsNavItem" :key="index" :id="index">{{item.name}}</view>
				</slot>
				<!-- <view id="demo2" class="scroll-view-item_H uni-bg-green">B</view>
				<view id="demo3" class="scroll-view-item_H uni-bg-blue">C</view> -->
			</scroll-view>
			<view class="category-title">
				<text></text>
			</view>
			<!-- category-title end-->
			<view class="search-filter uni-flex">
				<view class="filter-item" v-bind:class="sort_key == 'asc' ? 'active' : ''"   @click="goOrderTap" :data-id="sortkeyA">
				   <span class="text">综合</span>
				</view>
				<view class="filter-item" v-bind:class="sort_key == 'ascb' ? 'active' : ''"  @click="goOrderTap"  :data-id="sortkeyB">
				   <span class="text">销量</span>
				</view>
				<!-- <view class="filter-item" v-bind:class="sort_key == 5 ? 'active' : ''"  @click="goOrderTap"  :data-id="5">
				   <span class="text">新品</span>
				</view> -->
				<view class="filter-item by-price" v-if="sort_key == 1" v-bind:class="sort_key == 1 ? 'active' : '' "  @click="goOrderTap"  :data-id="1">
				   <view v-if="sort_value == 1" class="arrow">
					   <img class="ind" src="/static/images/goods/ind-arrow-upa.png"/>
					   <img class="ind" src="/static/images/goods/ind-arrow-down.png"/>
				   </view>
				   <view v-else-if="sort_value == 2" class="arrow">
					 <img class="ind" src="/static/images/goods/ind-arrow-up.png"/>
					 <img class="ind" src="/static/images/goods/ind-arrow-downb.png"/>
				   </view>
				   <span class="text">价格</span>
				</view>
				<view v-else class="filter-item by-price"  @click="goOrderTap"  :data-id="1">
				   <span class="text">价格</span>
				   <view class="arrow">
					 <img class="ind" src="/static/images/goods/ind-arrow-upa.png"/>
					 <img class="ind" src="/static/images/goods/ind-arrow-downb.png"/>
				   </view>
				</view>
			</view>  <!--search-filter end-->
	<!-- {{goodsLists.data}} -->
		 <view class="search-product flex" v-if="goodsLists.data">
				<view @click="open(item.id)"  class="product-item"  v-for="item in goodsLists.data" >
				  <view class="item-photo">
					<img :src="item.list_pic_url" />
				  </view>
				  <view class="item-name">{{item.name}}</view>
				  <view class="item-footer">
					<view class="footer-sales">{{item.virtual_sales}}人付款</view>
					<view class="footer-price">￥{{item.retail_price}}</view>
				  </view>
				</view>
			</view>  <!--search-product end-->
		</view>
	</view>
</template>	
<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				title: '商品列表',
				goodsNavState:0,
				sort_key:'asc',
				sortkeyA:'asc',
				sortkeyB:'ascb',
			
			}
		},
		onLoad(e) {
			this.goods_id=e.id;//商品id
			this.$store.dispatch('setGoodsNavList', {
			  cat_id:Number(this.goods_id),
			})
			this.$store.dispatch('setGoodsList', {
			  cat_id:Number(this.goods_id),
			  page:1,
			  order:this.sort_key,
			})
           
		},
		computed:{
			...mapState({
			    goodsNavLists: state => state.goodsStore.goodsNavLists,	//商品基本信息
				goodsLists: state => state.goodsStore.goodsLists,	//商品基本信息
			}),	
		},
		products(){
			return JSON.stringify(this.goodsLists)=='{}' ? {}:this.goodsLists;
		 	//return this.goodsLists
		 },
		methods: {
			showToggle(id,i){
				 this.goodsNavState = i;
				 this.$store.dispatch('setGoodsList', {
					cat_id:Number(id),
					page:1,
					//order:this.sort_key,
				 })
			},
			goOrderTap (event) {
				console.log('event',event)
				let sort_key = event.currentTarget.dataset.id;
					this.page=1;
					this.sort_key=sort_key;
					
				  if(sort_key == 1) {
					this.sort_value=this.sort_value == 1 ? 2 : 1
				  };
			 this.$store.dispatch('setGoodsList', {
			 				cat_id:Number(this.goods_id),
			 				page:1,
			 				order:this.sort_key,
			 })
			},
			open(id){
				uni.navigateTo({
					url:'/pages/goods/details?id='+id				
				});
			}
		},
		watch:{
			 goodsLists(){
			 	//this.getproduct(0)
			 	 console.log('goodsList', this.goodsLists) 
			}
		}
	}
</script>
<style lang="scss" scoped>
	.goods-list .goodsNavList {
	    width: 100%;
	    height: 44px;
	    line-height: 44px;
	    background: #fff;
	    white-space: nowrap;
	}
	.goods-list .goodsNavList .goodsNavItem{
	    display: inline-block;
	    padding: 0 10px;
	    margin-left: 10px;
	}
	
	.goods-list .goodsNavList .active{
	    color: #ab2b2b;
	    height: 100%;
	    border-bottom: .02rem solid #ab2b2b;
	    box-sizing: border-box;
	}
	
	.search-filter {
	    width: 100%;
	    height: 88rpx;
	    color: #404245;
	    font-size: 28rpx;
	    font-weight: normal;
	    text-align: center;
	    line-height: 88rpx;
	    /* position: fixed;
	    top: 0;
	    z-index: 1000;
	    margin-top:  88px; */
	    overflow: hidden;
	    padding: 0;
	    box-sizing: border-box;
	    background-color: #ffffff;
	}
	
	.search-filter .filter-item {
	    position: relative;
	    width: 33%;
	    height: 88rpx;
	    overflow: hidden;
	    box-sizing: border-box;
	}
	.search-filter .filter-item .arrow{
	    position: absolute;
	    top: 34rpx;
	    right: 10rpx;
	    width: 24rpx;
	    height: 100%;
	}
	.search-filter .filter-item .arrow .ind{
	    position: relative;
	    display: block;
	    width: 16rpx;
	    height: 8rpx;
	    overflow: hidden;
	    box-sizing: border-box;
	    margin-bottom:4px;
	    opacity: 1;
	}
	.search-filter .filter-item .text {
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
	.search-filter .filter-item.active .text {
	    color:red;
	}
	.search-product {
		 flex-wrap:wrap;
	     padding:1%;
	    overflow: hidden;
	  }
	
	  .search-product .product-item {
	    position: relative;
	    width: 48%;
	    max-width:48%;
	    box-sizing: border-box;
	    margin: 1%;
	    padding-bottom: 0;
	    background-color: #ffffff;
	    /* border-bottom: #e2e2e2 1px solid; */
	    border-radius:15px;
	  }
	
	  .search-product .product-item:after {
	    content: " ";
	    position: absolute;
	    right: -1px;
	    top: 0;
	    bottom: 0;
	    width: 1px;
	    /* border-right: #e2e2e2 1px solid; */
	    z-index: 50;
	  }
	
	  .search-product .product-item .item-photo {
	    position: relative;
	    display: block;
	    width: 100%;
	    max-width: 100%;
	    height: 0;
	    padding-bottom: 100%;
	    border-radius:15rpx 15rpx 0 0;
	  }
	
	  .search-product .product-item .item-photo img {
	    position: absolute;
	    top: 0;
	    left: 0;
	    object-fit: cover;
	    width: 100%;
	    max-width: 100%;
	    height: 100%;
	    background-color: #ffffff;
	    border-radius:15rpx 15rpx 0 0;
	  }
	
	  .search-product .product-item .item-name {
	    display: block;
	    /* width: 100%; */
	    height: 56px;
	    padding: 0 5%;
	    text-align: left;
	    color: #404245;
	    font-size: 28rpx;
	    font-weight: normal;
	    line-height: 64rpx;
	    overflow: hidden;
	  }
	
	  .search-product .product-item .item-footer {
	    display: block;
	    /* width: 100%; */
	    padding: 0 5%;
	    height: 48rpx;
	  }
	
	  .search-product .product-item .item-footer .footer-price {
	    display: block;
	    height: 32rpx;
	    line-height: 32rpx;
	    color: red;
	    font-size: 24rpx;
	    font-weight: normal;
	    overflow: hidden;
	  }
	
	  .search-product .product-item .item-footer .footer-sales {
	    display: block;
	    height: 32rpx;
	    line-height: 32rpx;
	    color: #888888;
	    font-size: 20rpx;
	    font-weight: normal;
	    overflow: hidden;
	    float: right;
	  }
</style>