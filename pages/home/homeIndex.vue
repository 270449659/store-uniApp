<template>
	<view class="home">
		<!-- header -->
		<header class="header fixed-top">
		    <view class="search" @click="goSearch">
		        <img class="search-icon" src="/static/images/home/header-search.png">
		        <span class="search-text">请输入您要搜索的商品</span>
		    </view>
		</header>	  
		<!-- header end-->
		
		<!-- content -->
		<view class="content">
		    <!-- 轮播图 --><Banner></Banner><!-- 轮播图 -->
			<!-- Menu --><Menu></Menu><!-- Menu end-->
			<!-- 秒杀 --><Seckill></Seckill><!-- 秒杀 end-->
			<!-- 品牌街 --><BrandStreet></BrandStreet><!-- 品牌街 end-->
			
			<!-- 商品 -->
			<view class="home-product" >
				<view class="productMenu uni-padding-wrap uni-common-mt">    
					<view class="flex uni-row flex-justify-content-s-a" >
						<view  @click="getproduct(index)" v-for="(tab,index) in productMenu" :id="index" :key="index" class="flex-item" :class="tabIndex==index ? 'active' : ''">{{tab}}</view>
					</view>
				</view>
				<view class="product-itemlist">
				  <view class="product-ul clearfix">
					<li class="product-item" v-for="(hotProducts,index) in modulesProducts" :key="index"  @click="open(hotProducts.goods_id)" >
						<view class="product-item-main">
							<view  class="item-exhibition">展示作品</view>
							<view class="item-photo">
							 <image :src="hotProducts.goods_thumb"></image>
							</view>
							<view class="item-name">{{hotProducts.name}}</view>
							<view class="item-current-price">￥{{hotProducts.shop_price}}
							  <span class="item-price">￥{{hotProducts.market_price}}</span>
							</view>
						</view>
					</li>
				  </view>  
				   <!-- <view class="loading-more" v-if="modules.hot_products.length > 0"> -->
				  全部加载完毕
				</view>
			</view>	
			<!-- 商品 end-->	
			
		</view>	
		<!-- content -->
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import Banner from '@/components/home/Banner'
	import  Menu from '@/components/home/Menu'
	import  BrandStreet from '@/components/home/BrandStreet'
	import  Seckill from '@/components/home/Seckill'
	
	export default {
		components: {
			Banner,
			Menu,
			BrandStreet,
			Seckill
		},
		data() {
			return {
				title: 'Hello',
				productMenu:["新品上架","销量排行"],
				modulesProducts:{},
				tabIndex:0,
			}
		},
		computed:{
			...mapState({
				modules: state => state.home.modules,
			}),
			
		},
		onLoad() {

		},
		onShow() {
			//this.$store.dispatch('setbanner')
			uni.showLoading({
			    title: '加载中'
			});
			this.$store.dispatch('setHome',{
				  // platform:'H5',
				  // // user_id:this.userId,
				  // // token:this.token,
				  // // accesstoken:this.token,
				  // user_id:3,
				  // token:'c6ff849e7732d0c53141c04c65769365',
				  // accesstoken:'c6ff849e7732d0c53141c04c65769365',
				  // app_key: 'wolf100000001',
				  // format: 'JSON',
				  // api_version: '2.0',
				  // timestamp:this.times,
				  // req_source: 'h5',
				  // sign: '14E7AD8C354C11A8CE0F0B8A98337F82',
				})
			this.isLogin=this.$isLogin();	
		},
		mounted(){ 
			
		},
		methods: {
			goSearch(){
			  this.$router.push('/search');
			}, 
			getproduct(id) {
				//console.log('id',id)
				 this.tabIndex=id;
				  if(id==0){
					    this.modulesProducts=this.modules.newGoods
				   }else if(id==1){
					   this.modulesProducts=this.modules.hotGoods
				   }else{
					   
				   }
			 },
			 open(id) {
				 
				 uni.navigateTo({
					url:'/pages/goods/details?id='+id				
				});
			   //this.$router.push({path:"pages/product/details",query:{id:id}})
			 }
		},
		watch:{
			// banners(){
			// 	 console.log('banner', this.banners) 
			// },
			modules(){
				this.getproduct(0)
				//console.log('modules', this.modules) 
			},
		}
	}
</script>

<style>
	.header{
	    z-index: 100;
	    width: 100%;
	    height: 100rpx !important;
	    box-sizing: border-box;
	    border-bottom:none!important;
	    background-color: #f3424c!important;
	    box-shadow:none !important;
	    /* box-shadow: rgba(0, 0, 0, .05) 0 1px 3px; */
	}
	
	.fixed-top {
	    position: fixed !important;
	    top: 0 !important;
	    bottom: auto !important;
	}
	.search {
	    position: relative;
	    height: 68rpx;
	    margin: 16rpx 16rpx 16rpx 16rpx;
	    box-sizing: border-box;
	    overflow: hidden;
	    background-color: #f2f2f2;
	    border-radius: 34rpx;
	}
	
	.search .search-icon {
	    position: absolute;
	    top: 10rpx;
	    left: 12rpx;
	    display: block;
	    width:48rpx;
	    height: 48rpx;
	    box-sizing: border-box;
	    overflow: hidden;
	}
	
	.search .search-text {
	    display: block;
	    width: 100%;
	    height: 68rpx;
	    margin: 0 auto;
	    padding-left: 76rpx;
	    box-sizing: border-box;
	    overflow: hidden;
	    color: #a2a6ad;
	    font-size: 28rpx;
	    font-weight: normal;
	    line-height: 68rpx;
	}
    .content{
	  width: 100%;
      margin-top: 100rpx;
      padding-bottom:150rpx;
    }
	.productMenu{height: 80rpx;line-height: 80rpx;background: #fff;border:0;}
	.home-product .product-itemlist{
	    margin:0 20rpx 0 20rpx;
	    }
	  .home-product .clearfix:after {
	    clear: both;
	    content: ".";
	    height: 0;
	    display: block;
	    visibility: hidden;
	}
	  .home-product .product-item {
	    position: relative;
	    display: block;
	    float: left;
	    width: 50%;
	    max-width: 50%;
	    padding: 8rpx;
	    box-sizing: border-box;
	    border-radius:20rpx;
	    /* border-bottom: #e2e2e2 1px solid; */
	  }
	.home-product .product-item:nth-child(odd) {
	    padding-right:10rpx;
	}
	  .home-product .product-item:after {
	    content: " ";
	    position: absolute;
	    right: -1px;
	    top: 0;
	    bottom: 0;
	    width: 1px;
	    /* border-right: #e2e2e2 1px solid; */
	    z-index: 50;
	  }
	  .home-product .product-item-main{
	    border-radius:20rpx;
	    background-color: #ffffff;
	  }
	  .item-exhibition {
	    width: 60rpx;
	    height:60rpx;
	    color: #fff;
		text-align: center;
	    background-color: red;
	    font-size: 22rpx;
	    border: 1px solid red;
	    border-radius: 50rpx;
	    position: absolute;
	    z-index: 50;
	}
	  .home-product .product-item .item-photo {
	    position: relative;
	    display: block;
	    width: 100%;
	    max-width: 100%;
	    height: 0;
	    padding-bottom: 100%;
	    border-top-left-radius:20px;
	    border-top-right-radius:20px;
	    /*background-color: #f6f6f6;*/
	    overflow: hidden;
	  }
	
	  .home-product .product-item .item-photo uni-image{
	    position: absolute;
	    top: 0;
	    left: 0;
	    object-fit: cover;
	    width: 100%;
	    max-width: 100%;
	    height: 100%;
	    background-color: #ffffff;
	  }
	
	  .home-product .product-item .item-name {
	    display: block;
	    width: 100%;
	    height: 48rpx;
	    text-align: left;
	    padding-left:13rpx;
	    color: #404245;
	    font-size: 26rpx;
	    font-weight: normal;
	    line-height: 64rpx;
	    overflow: hidden;
	  }
	
	  .home-product .product-item .item-current-price {
	    display: block;
	    width: 100%;
	    height:36rpx;
	    text-align: left;
	    line-height: 48rpx;
	    color: red;
	    padding-left:13rpx;
	    padding-bottom: 21rpx;
	    font-size: 24rpx;
	    font-weight: normal;
	    overflow: hidden;
	    margin-bottom: 16rpx;
	  }
	.home-product .product-item .item-price {
	    color: #999;
	    font-size: .24rem;
	    padding-left: .133333rem;
	    text-decoration: line-through;
	}
</style>
