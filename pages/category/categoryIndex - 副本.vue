<template>
	<view class="category">
	    <!-- header -->
	    <header class="header fixed-top">
	      <view class="search">
	        <img class="search-icon" src="/static/images/category/header-search.png">
	        <span class="search-text">请输入您要搜索的商品</span>
	      </view>
	    </header>
		<!-- content -->
		<view class="content" v-if="null !=categoryList">
		  <view  class="navbar-nav">
			  <view class="nav-list" v-bind:class="{active:selectedSide == index}"   v-for="(cat_list,index) in categoryList.cat_list" :key="index" :id="index">	
			  <!-- {{cat_list.cat_id}} -->
				<text  v-bind:class="{active:selectedSide == index}" class="nav-item" @click="showToggle(cat_list,index)" >{{cat_list.cat_name}}</text>
			  </view>
		  </view>
	
		  <view v-if="categorySecondarys" class="tab-menu" >
			  	<!--  <view style="margin-left:150px; height:200px;"> 22 {{categorySecondary}}</view> -->
				<view class="tab-menu-photo">
					<img :src="bannerUrls"/>
				</view>
				<ul class="tab-menu-item flex">	
				  <li @click="open(cat.cat_id)"  class="tab-menu-cell flex"  v-for="(cat,indexs) in categorySecondary.data" :key="indexs" :id="indexs">   
					<img class="photo" :src="cat.pic" />
					<text class="text">{{cat.cat_name}}</text>
				  </li>
				</ul>
		  </view>   <!-- tab-menu end-->
		  <view v-else class="tab-menu" > 
			 <view class="tab-menu-photo"><img  :src="bannerUrl"/></view>
				<ul class="tab-menu-item flex">
				  <li @click="open(cat.cat_id)"  class="tab-menu-cell flex"  v-for="(cat,indexs) in childMenu" :key="indexs" :id="indexs">   
					<img class="photo" :src="cat.pic" />
					<text class="text">{{cat.cat_name}}</text>
				  </li>
				</ul>
		  </view>   <!-- tab-menu end-->
		</view>  <!-- content end-->
	</view>	
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				title: '分类',
				selectedSide:0,
				child_menu:{}
			}
		},
		onLoad() {

		},
		onShow() {
			this.$store.dispatch('setCategoryList')	
		},
		mounted(){  console.log('categoryList', this.categoryList)
		},
		computed:{
			...mapState({
				categoryList: state => state.categoryStore.categoryList,//分类
				categorySecondary: state => state.categoryStore.categorySecondary,//二级分类
				
			}),
			childMenu(){
				return JSON.stringify(this.categoryList)=='{}' ? {}:this.categoryList.cat_item.child_menu;
			},
			bannerUrl(){
				return JSON.stringify(this.categoryList)=='{}' ? {}:this.categoryList.this_cat.banner_url;
			},
			categorySecondarys(){
				return JSON.stringify(this.categorySecondary)=='{}' ? '':this.categorySecondary;
			},
			bannerUrls(){
				return JSON.stringify(this.categorySecondary)=='' ? {}:this.categorySecondary.banner_url.banner_url;
			}
			// selectedSide(){
			//  return	this.categoryList.cat_item.child_menu[0];
			// }
		},
		
		methods: {
			 showToggle(categorie,i){
			     this.selectedSide = i;
				var user=uni.getStorageSync('user_id')||'';
				// if(user){
				// 	user_id:user
				// }
				 this.$store.dispatch('setCategorySecondary',{
					cat_id:Number(categorie.cat_id),
					user_id:user
				 })
			    },
			open(id) {
				uni.navigateTo({
					url:'/pages/goods/list?id='+id				
				});
			 
			},	
		},
		watch:{
			// banners(){
			// 	 console.log('banner', this.banners) 
			// },
			categoryList(){
				console.log('categoryList', this.categoryList) 
			},
			categorySecondary(){
				console.log('categorySecondary', this.categorySecondary) 
			}
			
		}
	}
</script>

<style>
	.header{
	    z-index: 100;
	    width: 100%;
	    height: 88rpx;
	    box-sizing: border-box;
	    border-bottom: #e2e2e2 1px solid;
	    background-color: #ffffff;
	    box-shadow: rgba(0, 0, 0, .05) 0 1px 3px;
	  }
	  .search {
	    position: relative;
	    height: 68rpx;
	    margin-left: 16rpx;
	    margin-right: 16rpx;
	    margin-top: 10rpx;
	    margin-bottom: 10rpx;
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
	  .category .content .navbar-nav{
	      display: block;
	      margin-top: 88rpx;
	      padding-bottom: 88rpx;
	      position: fixed;
	      top: 0;
	      left: 0;
	      width: 26%;
	      height: 100%;
	      box-sizing: border-box;
	      background:#fff;
	      /* border-right: #e2e2e2 1px solid; */
	      overflow-x: hidden;
	      overflow-y: scroll;
	    }
	    .category .content .navbar-nav .nav-list{
	      display:flex;
	      align-items: center;
	      width:100%;
	      padding: 0;
	      height: 120rpx;
	      color: #404245;
	      font-size: 32rpx;
	      font-weight: normal;
	      line-height:120rpx !important;
	      text-align: center;
	      box-sizing: border-box;
	    }
	    .category .content .navbar-nav .nav-list.active{
	        background-color: #ffffff;
	    }
	    .category .content .navbar-nav .nav-item{
	      display: block;
	      width: 100%;
	      padding: 0;
	      height: 32rpx;
	      color: #404245;
	      font-size:28rpx;
	      font-weight: normal;
	      line-height:32rpx !important;
	      text-align: center;
	      box-sizing: border-box;
	      /*border-bottom: #e2e2e2 1px solid;*/
	    }
	    .category .content .navbar-nav .nav-item.active{
	      height: 36rpx;
	      line-height:36rpx !important;
	      /* border-left:hsl(359, 80%, 57%) 4px solid; */
	      color: #e93b3d;
	      font-size: 32rpx;
	      background-color: #ffffff;
	    }
		.category .content .tab-menu{
		    width: 72%;
		    height: 100%;
		    padding-top: 88rpx;
		    padding-bottom: 88rpx;
		    position: fixed;
		    top: 0;
		    left:28%;
		    overflow-x: hidden;
		    overflow-y: scroll;}
		 .category .content .tab-menu .tab-menu-photo{
		    width:98%;
		    height:135rpx;
		    border-radius:20rpx;
		    margin:10rpx 0 10rpx 0;
		   }
		   .category .content .tab-menu .tab-menu-photo img{
				width: 100%;
				height: 100%;
            }
		.category .content .tab-menu .tab-menu-item {
		    width: 98%;
		    overflow: hidden;
		    flex-wrap:wrap;
		    font-weight: normal;
		    text-align: center;
		    background-color: #ffffff;
		    box-sizing: border-box;
		    border-radius: 20rpx;
			padding-left:0px;
		    /* border-bottom: #e2e2e2 1px solid; */
		  }
		
		  .category .content .tab-menu .tab-menu-item .tab-menu-cell{
		    width:50%;
		    /* height: 120px; */
		    flex-direction: column;
		    align-items:center;
		    font-size: 28rpx;
		    /* line-height: 120px; */
		    /* border-bottom:1px solid #e2e2e2; */
		  }
		  .category .content .tab-menu .tab-menu-item .tab-menu-cell .text{
		    color: #404245;
		    padding:10rpx 0 18rpx 0;
		    }
		  .category .content .tab-menu .tab-menu-item .tab-menu-cell .photo{
		    width: 200rpx;
		    height:200rpx;
		  }	
</style>
