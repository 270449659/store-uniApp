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
	<!-- {{b.banner_url}} -->
		  <view  v-if="dian" class="tab-menu" >
			  	<!--  <view style="margin-left:150px; height:200px;"> 22 {{categorySecondary}}</view> -->
				<view class="tab-menu-photo">
					<img :src="categoryList.this_cat.banner_url"/>
				</view>
				<ul class="tab-menu-item flex">	
				  <li @click="open(cat.cat_id)"  class="tab-menu-cell flex"  v-for="(cat,indexs) in categoryList.cat_item.child_menu" :key="indexs" :id="indexs">   
					<img class="photo" :src="cat.pic" />
					<text class="text">{{cat.cat_name}}</text>
				  </li>
				</ul>
		  </view>   <!-- tab-menu end-->
		 <view v-else class="tab-menu" > 
			 <view class="tab-menu-photo"><img  :src="b.banner_url"/></view>
				<ul class="tab-menu-item flex">
					<li @click="open(cat.cat_id)"  class="tab-menu-cell flex"  v-for="(cat,indexs) in b.data" :key="indexs" :id="indexs">   
						<img class="photo" :src="cat.pic" />
						<text class="text">{{cat.cat_name}}</text>
					</li>
				</ul>
		    </view> 
		    <!-- tab-menu end-->
		</view><!-- content end-->
	</view>	
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				title: '分类',
				selectedSide:0,
				child_menu:{},
				dian:true,
				categoryList:{
					"cat_list":[{"cat_name":"防暑套装","cat_id":"1","sort_order":"40"},
					{"cat_name":"生活家居","cat_id":"8","sort_order":"41"},
					{"cat_name":"食品","cat_id":"5","sort_order":"42"},
					{"cat_name":"纺织用品","cat_id":"10","sort_order":"43"},
					{"cat_name":"学习文具","cat_id":"12","sort_order":"43"},
					{"cat_name":"家用电器","cat_id":"9","sort_order":"44"},
					{"cat_name":"户外运动","cat_id":"11","sort_order":"50"}],
					"cat_item":{"child_menu":[{"cat_name":"日化套装","cat_id":"2","littleTitle":"日化套装","pic":"https:\/\/imgt1.oss-cn-shanghai.aliyuncs.com\/shopexNewEcshop\/images\/202007\/1594702572872171874.png"},{"cat_name":"防晒护肤","cat_id":"3","littleTitle":"防晒护肤","pic":"https:\/\/imgt1.oss-cn-shanghai.aliyuncs.com\/shopexNewEcshop\/images\/202007\/1594701604833773001.jpg"},{"cat_name":"日化单品","cat_id":"4","littleTitle":"日化单品","pic":""}],"pic":"https:\/\/imgt1.oss-cn-shanghai.aliyuncs.com\/tools\/default_category.png"},
					"this_cat":{"cat_name":"防暑套装","cat_id":"1","banner_url":"https:\/\/imgt1.oss-cn-shanghai.aliyuncs.com\/shopexNewEcshop\/images\/202007\/1594529789428055260.jpg","pic":"https:\/\/imgt1.oss-cn-shanghai.aliyuncs.com\/shopexNewEcshop\/images\/202007\/1594529789428055260.jpg"}
				},
				b:{}
			}
		},
		onLoad() {

		},
		onShow() {
			//this.$store.dispatch('setCategoryList')	
			this.aa();
		},
		mounted(){  console.log('categoryList', this.categoryList)
		},
		// computed:{
		// 	...mapState({
		// 		categoryList: state => state.categoryStore.categoryList,//分类
		// 		categorySecondary: state => state.categoryStore.categorySecondary,//二级分类
				
		// 	}),
		// 	childMenu(){
		// 		return JSON.stringify(this.categoryList)=='{}' ? {}:this.categoryList.cat_item.child_menu;
		// 	},
		// 	bannerUrl(){
		// 		return JSON.stringify(this.categoryList)=='{}' ? {}:this.categoryList.this_cat.banner_url;
		// 	},
		// 	categorySecondarys(){
		// 		return JSON.stringify(this.categorySecondary)=='{}' ? '':this.categorySecondary;
		// 	},
		// 	bannerUrls(){
		// 		return JSON.stringify(this.categorySecondary)=='' ? {}:this.categorySecondary.banner_url.banner_url;
		// 	}
		// 	// selectedSide(){
		// 	//  return	this.categoryList.cat_item.child_menu[0];
		// 	// }
		// },
		
		methods: {
			aa(){
				//this.categoryList=data

			},
			 showToggle(categorie,i){
			     this.selectedSide = i;
				//var user=uni.getStorageSync('user_id')||'';
				// if(user){
				// 	user_id:user
				// }
				this.dian=false;
				  function aa(){
					return{
						data:[{"cat_id":"14","cat_name":"餐具套装","keywords":"","cat_desc":"","parent_id":"8","sort_order":"59","template_file":"","measure_unit":"","show_in_nav":"1","style":"","is_show":"1","grade":"0","filter_attr":"","cate_img":"https:\/\/imgt1.oss-cn-shanghai.aliyuncs.com\/shopexNewEcshop\/images\/202007\/1594701739285586361.jpg","is_top":"1","is_goods":"1","pic":"https:\/\/imgt1.oss-cn-shanghai.aliyuncs.com\/shopexNewEcshop\/images\/202007\/1594701739285586361.jpg"},{"cat_id":"15","cat_name":"收纳箱包","keywords":"","cat_desc":"","parent_id":"8","sort_order":"40","template_file":"","measure_unit":"","show_in_nav":"1","style":"","is_show":"1","grade":"0","filter_attr":"","cate_img":"https:\/\/imgt1.oss-cn-shanghai.aliyuncs.com\/shopexNewEcshop\/images\/202007\/1594701725327412757.jpg","is_top":"0","is_goods":"0","pic":"https:\/\/imgt1.oss-cn-shanghai.aliyuncs.com\/shopexNewEcshop\/images\/202007\/1594701725327412757.jpg"}],
						banner_url:{"cate_img":"https:\/\/imgt1.oss-cn-shanghai.aliyuncs.com\/shopexNewEcshop\/images\/202007\/1594532503188637296.jpg","banner_url":"https:\/\/imgt1.oss-cn-shanghai.aliyuncs.com\/shopexNewEcshop\/images\/202007\/1594532503188637296.jpg"}	   
					}
				  }
				 this.b=aa();
			
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
			// categoryList(){
			// 	console.log('categoryList', this.categoryList) 
			// },
			// categorySecondary(){
			// 	console.log('categorySecondary', this.categorySecondary) 
			// }
			
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
