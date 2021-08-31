<template>
	<view class="Search">
	    <!-- header -->
		<header class="header fixed-top" :style="'padding-top:' + header.top + 'px;'">
		   <view class="return" @click="go()">
			  <image class="return-icon" src="/static/images/right-ash-icon.png"></image>
		   </view>
		  <view class="search-list" >
		  <image class="search-icon" src="/static/images/header-search.png"></image>
		  <!-- <input class="search-input"   placeholder="请输入您要搜索的商品" v-model="searchTitle" /> -->
		 <input class="search-input"  type="text" v-model="searchData"  confirm-type="search"  @confirm="goSearch(0)"  placeholder="请输入您要搜索的内容" 
			 placeholder-style="font-size:25rpx;color:#999999"/>
             <image  @click="GetinputDelete" class="input-delete-icon mgl10" src="/static/images/voucherCenter/input-delete-icon.png"></image> 
		  </view>
		  <view class="search-cancel" @click="goSearch(0)" >搜索</view>
		</header> <!-- header end-->
		<!-- content -->
		<view class="content">
		   <view class="search-history-box">
				<view class="search-header clear" v-if="historyData">
				  <!-- <img class="header-icon" src="../../assets/images/ind-history.png"> -->
				  <p class="search-header-p">最近搜索</p>
				  <i class="garbage-pic" @click="clearHistoryData"> </i>
				</view>
				<view class="search-keywords " v-if="historyData">
				  <view class="keyword" @click="goSearch(item)"  v-for="item in historyData" >{{item}}</view>
				</view>
			</view> <!-- search-history-box -->
			<!-- 热门 -->
			<view  class="history hotsearch">
				<view class="title">
					<text>热门搜索</text>
				</view>
				<view  class="cont">
					<view v-for="(item,index) in hotSearch" :key="index"  data-value="" class="active">{{item.keyword}}</view>
				</view>
			</view>
			<!-- 热门 -->
		</view> <!-- content-end --> 	
	</view>   
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				title: '',
				header: {
					top: 0,
					height: 0
				},
				searchData:"",
				historyData:'',
				hotData:''
			}
		},
		computed:{
			...mapState({
			hotSearch: state => state.searchStore.hotSearch,//热门搜索
			})
		},	
		onLoad() {
		  this.goHistoryData();//取存储的历史记录
          this.goHotKey(0);//用接口取历史记录
		  this.isLogin=this.$isLogin();
		  this.userId= uni.getStorageSync('user_id');
		  this.token= uni.getStorageSync('token');
		  if(this.isLogin){
		  	this.goHotSearch();//热门搜索
		  }
		},
		created () {
			/* #ifdef MP */
			const header = uni.getMenuButtonBoundingClientRect();
			this.header.top = header.top;
			this.header.height = header.height;
			/* #endif */
		},
		methods: {
            go(){
			 uni.navigateBack();
			},
	
			// 热门搜索
			goHotSearch(){
				this.$store.dispatch('setHotSearch',{
					user_id:this.userId,
					accesstoken:this.token,
					token:this.token
				})
			},
			
			// 搜索列表
			goSearch(item){
				let skw =item;
				let searchData=this.searchData;
				let nkw = searchData.replace(/(^\s*)|(\s*$)/g, "");
				let tt = uni.getStorageSync('searchHistoryKey');
				let sk=[];  
				if(typeof tt !== 'string'){
				   tt = tt.toString();
				    sk =tt?tt.split(","):[];     
				   }else{	    
					 sk =tt?tt.split(","):[];    
				   }
				// 是否输入的内容
				if (!skw) {
					//去除空格后是否为空, 不为空保存到历史记录
					if (nkw.length > 0) {
					   console.log('3',sk)	
					    sk.push(nkw);
					    this.historyData=sk;
					     uni.setStorageSync('searchHistoryKey', sk);
					}
				}else{
					searchData = skw;
				}
			},
			 //@confirm监听软键盘回车事件
			getSearch(){
				console.log(this.search)
				uni.showToast({
					title:"搜索成功",
					duration:2000
					// icon:"none"	
				})
				
			},
			
			//清除输入框
			GetinputDelete(){
				this.searchData='';
			},
			//取存储的历史记录
			goHistoryData(){
			    let sk = uni.getStorageSync('searchHistoryKey');
				if(typeof sk !== 'string'){
				   sk = sk.toString();
				   this.historyData=sk?sk.split(","):'';
				}else{
					this.historyData=sk?sk.split(","):'';
				}
			 
			},
			
			//用接口取历史记录
			goHotKey(){
				let keywords=[{type: 1, content: "智能手机"},{type: 1, content: "音乐手机"},{type: 1, content: "[object MouseEvent]"},{type: 1, content: "小米10"},{type: 1, content: "v"},{type: 1, content: "福"},{type: 1, content: "小米"},{type: 1, content: "我问问"},{type: 1, content: "northface"},{type: 1, content: "好"}];
			    if (keywords.length > 0) {
				   this.hotData=keywords;
			    }
			},
			//  清除历史记录
			clearHistoryData() {
			  try {
				 uni.removeStorageSync('searchHistoryKey')
				  this.historyData=''
			  } catch(e) {
				Toast("清理失败");
			  }
			},  //  清除历史记录
		}
	}
</script>

<style lang="scss" scoped>
	/* #ifdef APP-PLUS */
	.Search .header {margin-top:55rpx;}  
	.Search .content .search-history-box{
	   padding-top:143rpx; 
	}
	/* #endif */
	/* #ifdef MP */
	.Search .header .search-cancel{display: none;}
	.Search .header .return{margin-top:0;}
	.Search .header .search-list{margin-top:0; width: 63%;}
	/* #endif */
	  .header{
	    z-index: 100;
	    width: 100%;
	    height: 88rpx;
	    box-sizing: border-box;
	   background-color: #ffff !important;
	    /* box-shadow: rgba(0, 0, 0, .05) 0 1px 3px; */
	  }
	  .fixed-top {
	      position: fixed!important;
	      top: 0!important;
	      bottom: auto!important;
	  }
	  
	  .return{
		display:flex;
		margin-top: 15rpx;
		align-items: center;
	    z-index: 120;
	    position: absolute;
		left: 20rpx;
	    width: 40rpx;
	    height: 58rpx;
	    box-shadow: none;
	    background-color: transparent;
	}
	.return-icon{
		width: 20rpx;
		height:30rpx;
	    transform:rotate(180deg);
	}
	  .search-list {
	    position: relative;
	    height: 58rpx;
	    margin-left: 70rpx;
	    margin-right:88rpx;
	    margin-top: 15rpx;
	    margin-bottom: 15prx;
	    box-sizing: border-box;
	    overflow: hidden;
	    background-color: #f2f2f2;
	    border-radius: 34rpx;
	  }
	
	  .search-icon {
	    position: absolute;
	    top: 6rpx;
	    left: 12rpx;
	    display: block;
	    width:48rpx;
	    height: 48rpx;
	    box-sizing: border-box;
	    overflow: hidden;
	
	  }
	
	  .search-input{
	    width:75%;
	    height: 58rpx;
	    margin: 0 auto;
	    padding-left:10rpx;
	    font-size:28rpx;
	    background-color: transparent;
	    outline: none;
	    border: none;
	  }
	
	  .Search .search-text {
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
	
	  .search-cancel{
	    position: absolute;
	    right: 0;
	    top: 0;
	    color: #81838e;
	    font-size: 28rpx;
	    height:88rpx;
	    width: 88rpx;
	    line-height:88rpx;
	    text-align: center;
	    /* background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8BAMAAADI0sRBAAAAFVBMV…odUCZNgt1UDxYCYU4gxlDjm0BqIZTWhhUYzUSjmWg0E1EEACMo4bFTxh7UAAAAAElFTkSuQmCC); */
	    text-decoration: none;
	  }
	  /* header end*/
      .input-delete-icon{  
		  position: absolute;
		  top: 12rpx;
		  right: 15rpx;
		  width: 33rpx;
		  height: 34rpx;
		  border-radius:50rpx;
		}
	  .Search .content{
		  display: block;
		  width: 100%;
	    margin-top: 88rpx;
	    padding-bottom:150rpx;
	    background: #ffffff;
	
	  }
	
	   .content .search-history-box{
		   padding-top: 88rpx; 
	   }
	  /* 搜索记录 */
	   .content .search-header{ 
	    display: block;
	    width: 100%;
	    height:37rpx;
	    overflow: hidden;
	    color: #404245;
	    font-size: 35rpx;
	    font-weight: 600;
	    line-height:37rpx;
	    text-align: left;
	    box-sizing: border-box;
	    border: none;
	    padding-left: 40rpx;
	  }
	  .content .search-header.clear:after {
	    content: "";
	    display: block;
	    height: 0;
	    clear: both;
	    visibility: hidden;
	}
	  .content .search-header-p{
	    float: left;
	    width:200rpx;
	    margin: 0;
	    padding:0;
	  }
	   .content .search-header .garbage-pic {
	    float: right;
	    display: block;
	    background: url(../../static/images/delete-icon.png) no-repeat; 
	    width: 26rpx;
		height:31rpx;
	    background-position: 0 ;
	    background-size: 26rpx 31rpx;
	    position: relative;
	    margin:0 40rpx 0 0;
	
	}
	
	   .content .search-keywords {
	    display: block;
	    overflow: hidden;
		margin-top: 24rpx;
	    padding: 0 24rpx;
	  }
	
	  .content .search-keywords .keyword {
	    display: block;
	    float: left;
	    min-width: 80rpx;
	    max-width: 90%;
	    height: 56rpx;
	    padding: 8rpx 16rpx;
	    margin: 16rpx;
	    overflow: hidden;
	    color: #404245;
	    font-size: 28rpx;
	    font-weight: normal;
	    text-align: center;
	    box-sizing: border-box;
	    border-radius:25rpx;
	    background-color:#f5f5f5;
	  } 
	
	.content .search-keywords-no{
	     padding-left: 30rpx;
	}
	/* 搜索记录end */
	.Search .history {
	      background: #fff;
	      padding: 30rpx;
	}
	.Search .history .title {
	    display: flex;
	    justify-content: space-between;
	    align-items: center;
	    margin-bottom: 30rpx;
	}
	.Search .history .cont{
	    //max-width: 343px;
		
		font-size: 25rpx;
	    display: flex;
	    flex-wrap: wrap;
	}
	.Search .history .cont view {
	    overflow: hidden;
	    text-overflow: ellipsis;
	    padding: 10rpx 10rpx;
	    border: 1rpx solid #999;
		border-radius:25rpx;
	    margin: 0 30rpx 20rpx 0;
	}
	.Search .history .cont .active{
	    border:1px solid #b4282d;
	    color: #b4282d;
	}
</style>
