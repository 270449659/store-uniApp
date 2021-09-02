<template>
	<view class="goods-details"> 
	<!-- <view class="product-details"> -->
	  <!-- header -->
	  <header class="header fixed-top header-abs" >
		 <view @click="go" class="return header-icon-back"><span></span> </view>
	  </header> <!-- header end-->
	 <header class="header fixed-top header-fixed"  v-show="!showAbs" :style="opacityStyle">
		<view  @click="go" class="return header-icon-back"><span></span> </view>
		<h1 class="mint-header-title">{{title}}</h1>
	  </header>
	   <!-- header end-->
	  <!-- content-->
	  <view class="content">
		<GoodsPhotos></GoodsPhotos><!-- 商品轮播图 -->
		
		<!--goods-info-->
		<view class="goods-info">
			
			<view  class="gi-discount darlang-btn" v-if="active==true">
				<view  class="discount" >				
				  <view v-if="currentPriceState" class="m"><span>￥</span>{{product_current_price || '???'}}</view>
				  <view v-else class="m"><span>￥</span>{{productCurrent_price || '???'}}<span>.{{product_current_price || '???'}}</span></view>
				  <view class="s">
					<!-- <view>{{product.sales_count || 0}} 件已售</view> -->
					<!-- <span>￥{{product.price || '???'}}</span> -->
				  </view>
				</view>
				<view class="time">
				  <view  class="t">活动结束时间</view>
				  <view class="dt">{{goodsDiscountTime || '待定'}}</view>
				  <!-- <view class="db">{{goods.discount.end_at_b || '待定'}}</view > -->
				</view>
			</view>
			<!-- gi-discount 定时活动-->
			<view class="info-price" v-else >
			  <span v-if="currentPriceState" class="price-shop danger" ><span>￥</span>{{productCurrentPrice}}</span>   
		 	  <span v-else class="price-shop danger"  >
				<slot v-if="productCurrentPrice" name="header">
					 <span>￥</span>{{productCurrentPrice[0]}}<span class="price_decimals">.{{productCurrentPrice[1]}}</span> 
				</slot> 
			</span>  
			  <!-- <span class="price-market ">￥{{product.price}}</span> -->
			</view>
			<view class="info-name">{{goodsInfoData.goods_name}}</view> 
		</view> 
		<!--goods-info end-->	  
		
		<!-- Attr属性-->
		<view class="product-attr" v-if="goodsInfo.properties">
			<view class="attr-group" v-for="(item,index) in goodsInfo.properties" :key="index">
			  <view class="group-name">{{item.info.goods_name}}</view>
			  <!-- {{item.is_multiselect}} -->
			  <view class="group-items" :data-type="item.is_multiselect ? 'multi' : ' '">
				<view class="group-item" v-for="(items,indexs) in item.attrs" :key="indexs" :data-i="index"  :data-type="items.is_multiselect ? 'c' : 'r'" :data-id="items.id" :class="items.checked ? 'active' : ''" @click="choise_ver($event,items)"  :id="items.id">
					<!-- {{items.checked}}  -->
				  {{items.attr_name}}
				  <span  v-if="items.attr_price>0" >+￥{{items.attr_price}}</span>
				</view>
			  </view>
			  <view class="attr-line" ></view>
			</view>
		</view>
		<!--Attr属性- end-->
		
		<!-- Amount 购买数量-->
		<view class="product-amount" >
			<view class="amount-name">购买数量（库存{{goodsInfoData.goods_number}}）</view>
			<view class="amount-input">
			    <view class="input-button" @click="cutNumber()">-</view>
				 <input type="text" v-model="number" class="input-count">
				<view class="input-button" @click="addNumber()" >+</view>
			</view>
		</view>
	    <!-- Amount 购买数量 end -->
		
	    <!-- product-info-box -->
	    <view  class="product-info-box">
		  <!-- 规格 --> 
		   <view class="product-info product-specifications" @click="goProductAttr"> 
			<p class="product-info-title">选择</p>
			<p v-if="attrName_index.length" class="product-info-value">
			  <span v-for="(item,index) in attrName_index"  :key="index" >{{item.attrs}}，</span>
			  <span>x{{number}}</span>
			</p>
			<p v-else class="product-info-value">{{number}}件</p>
			<image class="product-info-arrow" src="/static/images/goods/nav-right.png"></image>
		  </view><!-- 规格 end-->
		  <!-- 地址 -->
	
		  <view class="product-info product-specifications"  @click="goAddressSelect(true)">
			<span class="product-info-title">送至</span>
			
			<span v-if="defaultConsignees" class="product-info-value">
			<!-- <span  v-for="(value,index) in defaultConsignees" :key="index"></span> -->
			<span >{{defaultConsignees.address_list}}</span>
			</span>
			<span v-else class="product-info-value">请添加您的地址</span>      
			<image class="product-info-arrow" src="/static/images/goods/nav-right.png"></image>
		  </view><!-- 地址 end-->
		  <!-- 服务 -->
		  <view class="product-info product-specifications" >
		    <span class="product-info-title">服务</span>
		    <span class="product-info-value-item">99元免基础运费(20kg内)</span>
		    <span class="product-info-value-item">7天无理由退货</span>
		  </view> <!-- 服务 end-->
		</view>
		<!-- product-info-box end-->
		
		<!-- Comment -->
		<!-- <div class="product-comment" v-if="comments.reviews">
			<div class="comment-header" @click="goComments(id)">
			  <image class="header-arrow" src="/static/images/goods/nav-right.png"></image>
			  <div class="header-title">商品评价（{{comments.reviews.length}}）</div>
			</div>
			<div class="comment-item" v-for="(item,index) in comments.reviews" :key="index"  @click="touchComment()">
			  <div class="item-info">
				<span class="user">{{item.is_anonymous == 1 ? '匿名用户' : item.author.username}}</span>
				<span class="rate">{{formatGrade(item.grade)}}</span>
				<span class="time">{{item.created_at}}</span>
			  </div>
			  <div class="item-body">
				{{item.content}}
			  </div>
			  <div class="comment-line" v-if="item !== comments[item.length-1]"></div>
			</div>
		</div> -->
		<!-- Comment end-->
		 <!--product-intro-->
		  <view class="product-intro" >
			<view class="intro-header">商品介绍</view>
			<view class="article-content">
			<rich-text :nodes="goodsDesc"></rich-text> 
			</view>
			<!-- #ifdef MP-WEIXIN -->
			<ad v-if="goodsDesc.length > 0" unit-id="adunit-01b7a010bf53d74e"></ad>
			<!-- #endif -->
			<view class="intro-content"  v-html="(goodsDesc || '没有产品详情')"></view>
		  </view>
		  <!--product-intro end-->
	      <!-- Submit -->
		    <view class="product-submit fixed-bottom" >
			  <view class="submit-collect" @click="goodsCollect">
				<img class="collect-icon"  :src=" goodsHasCollect ? icon_collect_selected : icon_collect "> 
				<span class="collect-title">收藏</span>     
			  </view>
			<view class="submit-cart" @click="openCart">
				<img class="cart-icon" src="/static/images/goods/icon_cart.png">
				<view class="cart-badge" v-if="userId">{{cartTotal.goods_count}}</view>
				<span class="cart-title">购物车</span>
			</view>
			  <view class="submit-box">
				<view class="submit-button"  data-type="touchAddCart"  @click="goPurchase('touchAddCart')">
				  加入购物车
				</view>
				<view class="submit-button dark" data-type="goPurchase" @click="goPurchase('goPurchase')">
				  立即购买   
				</view>
			  </view>
			</view>
			<!-- Submit end-->
            <uni-popup ref="popup" type="bottom">
			    <product-attr-modal v-if="productAttrModalState" @choiseVer="choiseVer" @close="closeProductAttrModal" @getPurchase="getPurchase" :productAttrData="productAttr"  > </product-attr-modal>
		    </uni-popup>
			<uni-popup ref="AddressSelectpopup" type="bottom">
			    <address-select-modal v-if="addressSelectModalState" @close="closeAddressSelectModal"> </address-select-modal>
			</uni-popup> 
	  </view>  
	  <!-- content end-->
	</view>
</template>
<script>
import { mapState } from 'vuex'
import GoodsPhotos from '@/components/goods/GoodsPhotos'
import htmlParser from '@/common/html-parser'
import uniPopup from '@/components/uni-popup/components/uni-popup/uni-popup.vue'
import productAttrModal from '@/components/product-attr-modal/index.vue'
import addressSelectModal from '@/components/goods/address-select-modal.vue'
import icon_collect_selected from '@/static/images/goods/icon_collect_selected.png'
import icon_collect from '@/static/images/goods/icon_collect.png'
export default{
	components: {
		GoodsPhotos,//主图
		uniPopup,
		productAttrModal,//属性
		addressSelectModal//地址
	},
	data(){
		return {		
			showAbs: true,
			opacityStyle: {opacity: 0 },//透明度
			title:'商品详情',
			product:{},
			goodsId: 0,
			//currentPriceState:true,
			product_current_price:null,//商品价格
			properties:[],//属性
			attrName_index:[],//属性名称 
			number:1,//数量
			//goodsDesc:[],//图文描述
			//htmlNodes: []//图文描述
			productAttrModalState:true,//属性弹框状态
			addressSelectModalState:false,//地址弹框状态
		    paged: {//评论页码
				page: 1,
				size: 10 
			},//评论页码-end
			userHasCollect: false,//收藏状态
			icon_collect_selected:icon_collect_selected,//
			icon_collect:icon_collect,//
			cur_ver_index:'', //当前选中的版本下标
		}
	},
	computed:{
		...mapState({
			goodsInfo: state => state.goodsStore.goodsInfo,	//商品基本信息
			defaultConsignees: state => state.addressStore.defaultConsignees,//地址
			comments: state => state.goodsStore.comments,//评论
			cartNum:state => state.shopping.cartNum,//购物车
			cartAdd:state => state.shopping.cartAdd,//添加购物车
			cartAddFast: state => state.shopping.cartAddFast,//更新购物车--购买商品
			goodsHasCollect: state => state.goodsStore.goodsHasCollect,//收藏
			cartTotal: state => state.shopping.cartTotal//购物车数量
			
		}),	
		goodsInfoData(){
			return JSON.stringify(this.goodsInfo)=='{}' ? '':this.goodsInfo.info;
		},
	    active(){
			return JSON.stringify(this.goodsInfo)=='{}' ? {}:this.goodsInfo.info.active;
		},
		// cartAddFast(){
		// 	console.log('11',this.cartAddFast)
		// },
		currentPriceState(){  //限时活动判断
			 let product=''
			 product=JSON.stringify(this.goodsInfo)=='{}' ? '':this.goodsInfo.info.current_price;
			 // 拆分价格小数点
			 let current_price_a=product;
			 let  r =/^[0-9]*[1-9][0-9]*$/　　//正整数    
			 //str为你要判断的字符
			 let str=current_price_a;
			 //console.log('current_price_state',r.test(str))
			 return r.test(str); //执行返回结果 true 或 false
		}, //限时活动判断--end
		 
		 //价格
		productCurrentPrice(){	 
			 var current_price_a=JSON.stringify(this.goodsInfo)=='{}' ? '':this.goodsInfo.info.shop_price ||'';
			if(current_price_a){
				if(this.currentPriceState){
					return current_price_a;
				}else if(this.currentPriceState==false && typeof current_price_a !== 'string'){
				  current_price_a = current_price_a.toString();
				  let current_price_b=current_price_a.split(".");
				  return current_price_b;
				  //console.log("current_price_b1",current_price_a)
				}else if(this.currentPriceState==false && typeof current_price_a == 'string')
				{
				  let current_price_b=current_price_a.split(".");
				  //console.log("current_price_b",current_price_b)
				  return current_price_b;
				} 
			} 
		},//价格--end
		
		goodsDesc(){ //图文描述

			let result=JSON.stringify(this.goodsInfo)=='{}' ? '':this.goodsInfo.info.goods_desc;
			//console.log('goodsDesc',result)
		    //let htmlString = goodsDesc.content.replace(/\\/g, "").replace(/<img/g, "<img style=\"display:none;\"");
		    //this.htmlNodes = htmlParser(htmlString);
		    //return htmlParser(htmlString);
			const reg = /style\s*=(['\"\s]?)[^'\"]*?\1/gi;
			const regex = new RegExp('<img', 'gi');
			const regex2 = new RegExp('<p', 'gi');
			if(result){
				result = result.replace(reg, '');
				result = result.replace(regex, '<img style="max-width: 100%; height:auto; display: block;"');
				result = result.replace(regex2, '<p style="margin:0;padding:0;"');
			}
			return result
		}, //图文描述--end
		
		//已选
		productAttr: {
			get() {
				let  productAttra = { 
				  goods_image:JSON.stringify(this.goodsInfo)=='{}' ? '':this.goodsInfo.goods_image[0].img_url,
				  goods_price:this.productCurrentPrice,
				  goods_properties:this.goodsInfo.properties,
				  stock_num:this.goodsInfo.good_stock,
				  number:this.number,
				  current_price_state:this.currentPriceState,
				  typeName:this.typeName,
				};
				return this.productAttr=productAttra||'';          
		    },
			set(newVal) {
			 
			}
		}, //已选--end
		// properties(){
		// 	this.goodsInfo.properties;
		// }
	},				

	onLoad(e){
		console.log(e)
		this.goods_id=e.id;//商品id
		this.isLogin=this.$isLogin();
		this.userId= uni.getStorageSync('user_id');
		this.token= uni.getStorageSync('token');
		
		this.goGoodsInfo(this.goods_id);//商品详情show
		this.goGoodsComment(this.goodsId);//评论
		if(this.isLogin){
			this.checkoutDefault();//地址
		}
		
		//this.goCart()//购物车
	},
	onShow(){
		//this.goCart()//购物车
	},
	mounted:function () {	
	 window.addEventListener('scroll', this.handleScroll)
	},
	unmounted () {
	    window.removeEventListener('scroll', this.handleScroll)
	  },
	methods:{
		goGoodsInfo(goodsId){
			if(this.token){
				this.$store.dispatch('setGoodsInfo', {
				   goods_id:Number(goodsId),
				   platform:'H5',
				   user_id:this.userId,
				   token:(this.token)
				})
			}else{
				this.$store.dispatch('setGoodsInfo', {
				   goods_id:Number(goodsId),
				   platform:'H5',

				   token:(this.token)
				})
			}
			
		},
		handleScroll () {  //头部渐变
		  const top = document.documentElement.scrollTop || document.body.scrollTop;
		  this.top=top;
		  if (top > 60) {
			let opacity = top / 100
			opacity = opacity > 1 ? 1 : opacity
			this.opacityStyle = { opacity }
			this.showAbs = false
		  } else {
			this.showAbs = true
		  }
		  //console.log("showAbs",this.showAbs)
		},   //头部渐变 end
		 go() {  //返回
		  history.go(-1)
		}, //返回 end
		goSearch() {
		 
		},
		// 打开规格
		goProductAttr(){	
			this.productAttrModalState=true;
			this.$refs.popup.open('bottom')
		},// 打开规格 end
		
		
		closeProductAttrModal(state){
			this.$refs.popup.close()
			this.productAttrModalState=state;
	    	
		},// 关闭规格 end
		// 打开地址
		goAddressSelect(){	
			this.addressSelectModalState=true;
			this.$refs.AddressSelectpopup.open('bottom')
		},// 打开地址 end
		 //关闭地址
		closeAddressSelectModal(state,index){
		 if(index===1){
			this.$refs.AddressSelectpopup.close()
		  this.checkoutDefault()
		 }
		},		
		// 关闭规格
		// 打开地址
		showPopup(state){
		  if(this.isLogin){
			this.addressSelectModal=state;
		  }
		},
		// 打开地址 end
		
		//结帐地址
		checkoutDefault(){ 
		  //that.consigneeNew=window.localStorage.consigneesId;
		  //let newConsignee = Number(that.consigneeNew)||null;
		  //console.log('newConsignee',newConsignee)
		 this.$store.dispatch('setShopConsignee',{
			 'user_id':this.userId,
			 'token':this.token
		 })
		},
		//结帐地址--end
		
		//获取选择的规格 data 规格属性项
		checkSeleItemStock(data) {
			
		},
		
		cutNumber() {
		  if(this.number==1){
			Toast('数量最少为1');
			this.number=1
		  }else {
			 this.number--
			}
		},   //减
		
		addNumber(){
		  this.number++
			//this.number=res.data.product.number + 1
		}, //加
		
		//属性确定
		getPurchase(state){
		  console.log("goPurchase",state)
		  //this.checked=true;
		  this.$refs.popup.close()
		  this.goPurchase(state)
		},//属性确定 end	
		
		// 属性
		choiseVer(itemId,itemAttrName,curGoodsNum){
		  // console.log("showAbs",itemId,itemAttrName,curGoodsNum)
			 this.cur_ver_index=itemId;
		 //this.attrName_index =itemAttrName;
		  this.number=curGoodsNum;
		  this.properties=itemAttrName,
		  //  console.log('properties',this.properties)
		  this.checkSeleItemStock(itemAttrName);
	
		},// 属性 end
		
        // 商品评论
		// ecapi.review.product.list
		goGoodsComment(goodsId) {
		  this.$store.dispatch('setGoodsComment', {
		     page:this.paged.page,
		     per_page:this.paged.size,
		     product:goodsId
		  })
		},
		
		openCart() {
		  uni.reLaunch({
		    url: "/pages/cart/cartIndex"
		  });
		},
		
        //加入购物车与立即购买
            // ecapi.order.price
        goPurchase(i) {
			let typeName=i;
			this.typeName=typeName;
			let order_product = [];
			let cart_good_id = [];
			let goodsInfo = [];
			//console.log('ww',token)
		    if(!this.isLogin){
				uni.showToast({
				    title: '请登录',
				    duration: 2000
				});
			  return false;
		    }
			// 验证库存
			if (this.goodsInfo.defaultSkuStore === 0) {
				uni.showToast({
				      title: '商品已经售完',
				      duration: 2000
				});
				return false;
			}else{
				console.log('1121')
				if (this.goodsInfo.defaultSkuStore < this.number) {
				    uni.showToast({
					    title: '购买数大于库存',
					    duration: 2000
				    });
				  return false;
				}
			}    // 验证库存end
			var property = null,propertys = null,propertyName = null;  
			if(this.properties && this.properties.length > 0 ){
				//提示选择完整规格
				if (!this.cur_ver_index) {
				 this.productAttrModalState=true;
				 this.$refs.popup.open('bottom')
				  //Toast('请选择规格', 'error');
				  return false;
				}
				
				let goodsAttrsInfo = [];
				let goodsAttrs = [];
				if (this.properties && this.properties.length > 0) {
				  for (let i = 0; i < this.properties.length; i++) {
					goodsAttrsInfo = goodsAttrsInfo.concat(this.properties[i].attrs.filter(k => k.checked).map(k => {return {name: this.properties[i].name + ':' + k.attr_name, id: k.id, price: k.attr_price};}));
					goodsAttrs = goodsAttrs.concat(this.properties[i].attrs.filter(k => k.checked).map(k => k.id));
				  }
				}
				var propertyName =goodsAttrsInfo;
				var property =  goodsAttrs;
				var propertys =  JSON.stringify(goodsAttrs);
			}
			
			if(typeName==='touchAddCart'){//加入购物车
			    this.cartTotal.goods_count+=this.number;
			    this.$store.dispatch('shopping/setCartAdd',{
					num:this.number, 
					goods_id:this.goods_id, 
					user_id:this.userId,
					token:this.token,
					//property: propertys 
					product_id: 0,
				},)//加入购物车 e	 
			}else{	
				this.$store.commit('shopping/setCartAddFast',{
					fastbuy: true,
					goods_id:this.goods_id, 
					sku: 'n,u,l,l',
					num:this.number, 
			        app_key: 'wolf100000001',
					accesstoken:this.token,
					user_id:this.userId,
					token:this.token,
					//property: propertys 
					product_id: 0,
				},)//加入购物车 e	
				  
				// if(this.cartAddFast){
				// 	console.log('cartAddFast121',this.$store.state.shopping.cartAddFast)
				// 	uni.navigateTo({
				// 		url: '/pages/checkout/checkoutIndex?goodsId='+this.goods_id,
				// 	 })
				// }
				
			}
		},
        //加入购物车与立即购买--end
		
		//收藏
		goodsCollect(){
			if(this.goodsHasCollect){
			  var goodsHasCollect=true;
			}else{
			 var goodsHasCollect=false;
			}
			this.$store.commit('setGoodsCollect',{
				goods_id:this.goods_id, 
				collect_status:goodsHasCollect,
				accesstoken:this.token,
				user_id:this.userId,
				token:this.token,
			})
			
		}
    },
	//监听
	watch:{
		goodsInfo(){
			 //console.log('datas', this.goodsInfo) 		 
		},
	    //监听更新购物车--购买商品
		cartAddFast(){
			//console.log('cartAddFast1 watch', this.cartAddFast)
			if(this.cartAddFast){
				uni.navigateTo({
					url: '/pages/checkout/checkoutIndex?goodsId='+this.goods_id,
				 })	  
				 this.$store.state.shopping.cartAddFast=false;
			}
			
		}
		
	}
}		
</script>
<style lang="scss" scoped>
 .goods-details header{
  z-index: 100;
  width: 100%;
  height: 88rpx;
  color: black;
  font-size:28rpx;
  /* background-color:#ffffff; */
  }
  .fixed-top {
    position: fixed !important;
    top: 0 !important;
    bottom: auto !important;
  }
    .header-fixed{
        background-color:#ffffff;
        /* border-bottom: #e2e2e2 1px solid; */
     }
  .goods-details header h1{
	   text-align: center;
	   line-height: 88rpx;
	   margin:0;
	   padding:0;
	 }
  .return{
      z-index: 120;
      position: absolute;
	  display: flex;
	  align-items: center;
      width: 88rpx;
      height:88rpx;
      box-shadow: none;
      background-color: transparent;
    }
     .header-abs .return{
      width: 60rpx;
      height:60rpx;
      margin: 10rpx;
      box-shadow: none;
      background: rgba(0, 0, 0, .7);
      border-radius: 50px;
   }
   .header-abs .header-icon-back span{
	   background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAbUExURUdwTP///////////////////////////////xb9HQ4AAAAIdFJOUwD6i0/UdjQCdVO0QgAAAEZJREFUKM9jYKAiKMAixiqSgCmo0eGAIcbUgUVQo6PRAItC4WGjkBWbQhYsCrELYtWO1SLsThoWSh2IS2DYkyJDQQE1kj4AQAEnj84DdFIAAAAASUVORK5CYII=) no-repeat 50%;
	   background-size: 20px 20px;
	   margin: 0;
   }
   .header-icon-back span {
     
       width: 60rpx;
       height:60rpx;
       background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzRCQTEyN0IzOTcwMTFFODk1OEZCOEVCMEE2QUU1NkUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzRCQTEyN0MzOTcwMTFFODk1OEZCOEVCMEE2QUU1NkUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3NEJBMTI3OTM5NzAxMUU4OTU4RkI4RUIwQTZBRTU2RSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3NEJBMTI3QTM5NzAxMUU4OTU4RkI4RUIwQTZBRTU2RSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PulQWg8AAAF/SURBVHja7Ni9SsRAEAfwnd1wldiIlqK1td4LiL7CFQaFCHZWgmVqH+GK4FejryA+gPcA9vZ2YnVkd5yAcBLOYJKZ3UWyRbIchPsxSzb/HUBEFfPQKvIxAP89MGn7wPHpuTLOtXoGMdl1WF4rUBug9cX25tpdnufRVHBssXxGhTu0Y6yjs1P6bRTLEo9Lp56ohquLasKcbk5sifvgAMBRRc5oWoau4FIcfRJOaPoQ+i1uwt2H3mZYcdxAdhwnUATHBRTDcQBFcX2B4rg+QC+4rsA9X7gunzpQ1j7S3QuudQWz7HKFjjBbNXNR4QhaYcMCi+LqkwxvtbSX0SWNJVGjAZhQ1T4W8Qk11e2GpkexRP5ZotVBHUmXWwlk122mCZnGAPwV+b3caQxAL0iOsCCK5IpbYkjOwCqC5I787EiJQxMrUurY2YScxNI8Woq0qKZtUpR062NmQB/+RALgqM3/+mgevRhI9imMvVIcewdtqtbH/M8BdOhRD8DA40uAAQDL2thNJDxLvAAAAABJRU5ErkJggg==) no-repeat 50%;
       background-position: 0 0;
       background-size: contain;
	   display: block;
    }
    .header-abs .return .mintui-back{color: #ffff;}
	.goods-info {
	    position: relative;
	    display: block;
	    width: 100%;
	    box-sizing: border-box;
	    /* border-top: #e2e2e2 2px solid;
	    border-bottom: #e2e2e2 2px solid; */
	    background-color: #ffffff;
	    /* padding: 28px; */
	    border-radius: 0 0 20rpx 20rpx;
		.info-price {
		    padding: 28rpx 28rpx 0 28rpx;
			.price-shop {
				line-height:40rpx;
				color: #404245;
				font-size: 60rpx;
				font-weight: normal;
				overflow: hidden;
			}
			.price-shop.danger {
			    color: #e60012;
			}
				
		}
	   .info-name {
		   /* width: 90%; */
		   padding-top: 20rpx;
		   /* margin-right:108px; */
		   line-height: 36rpx;
		   color: #404245;
		   font-size:32rpx;
		   padding: 28rpx;
		   font-family: PingFang;
		   font-weight: bold;
		   overflow: hidden;
		   border-radius: 20rpx;
		}
		.product-info-title{
			font-weight: 700;
			margin-right: 10rpx;
		 }
	}
	.product-amount {
	    display:none;
	    margin-top: 15rpx;
	    position: relative;
	    width: 100%;
	    box-sizing: border-box;
	    background-color: #ffffff;
	    padding: 16rpx 24rpx;
	    border-radius: 20rpx;
	}
	.product-info-box {
	    margin-top: 15rpx;
	    border-radius: 20rpx;
	    padding:0 24rpx;
	    background-color: #ffffff;
		.product-info{
		    position: relative;
		    display: flex;
		    align-items: center;
		    width: 100%;
		    height:88rpx;
		    line-height: 88rpx;
		    overflow: hidden;
		    color: #404245;
		    font-size: 28rpx;
		    font-weight: normal;
		    text-align: left;
		    box-sizing: border-box;
			.product-info-title{
				font-weight: 700;
				margin-right: 10rpx;
			}
			.product-info-value{
			    font-size: 28rpx;
			 }
			.product-info-value-item{
			    font-size: 23rpx;
				padding:0 12rpx 0 0;
				display: inline-block;
				line-height: 1;
				color: #8c8c8c;
		    }
			.product-info-value-item:before{
			    content: "";
			    display: inline-block;
			    vertical-align: middle;
			    margin-top: -2rpx;
			    margin-right: 6rpx;
			    width: 15rpx;
			    height: 15rpx;
			    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAMAAADzapwJAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAA8UExURUdwTPMoDPInDPInDP87NPosE/MnDPInDPInDPcpD/UoDvInDPMnDvInDPIoDPInDPInDPQoDfInDPInDDAotc8AAAATdFJOUwBkjOUEEbD13iE0zkCQfpN5S3Nig6CDAAAAsklEQVQY02WRiw7DIAhFobOC2tou9///ddTXnCPGhKO8LkTFdvYqop53+pq7BYCq3XIMGhJki86e46kDhxf8HNsyJFzkJhD48W74n28WfFsPImGhkJ0Y50K3E0wecaEULa2KWyg5UbJDdKTjS8m+Nlym6/TBNQkbH9RBe0njnZaS3BxGp7RZgzZOFeTNTYxK8jK8pc1dqskupDJJ0EnY4KHhfw2CNJRz+VlXXVqepV9X/AHuSwhEt5a/JQAAAABJRU5ErkJggg==) no-repeat;
			    background-size: 15rpx auto;
			}
			.product-info-arrow{
				position: absolute;
				right:0;
				top: 30rpx;
				display: block;
				width: 16rpx;
				height: 20rpx;
				line-height: 44rpx;
				box-sizing: border-box;
			} 
		}	
	}
	
	/*intro*/
	.product-intro {
	    margin-top: 15rpx;
	    position: relative;
	    display: block;
	    width: 100%;
	    box-sizing: border-box;
	    border-radius: 20rpx;
	    background-color: #ffffff;
	}
	
	.product-intro .intro-header {
	    position: relative;
	    display: block;
	    width: 100%;
	    height: 88rpx;
	    box-sizing: border-box;
	    text-align: center;
	    color: #404245;
	    font-size: 28rpx;
	    font-weight: normal;
	    line-height: 88rpx;
	}
	
	.product-intro .intro-content{
	    position: relative;
	    display: block;
	    box-sizing: border-box;
	    color: #404245;
	    font-size: 28rpx;
	    font-weight: normal;
	    overflow: hidden;
	    /* padding: 28px; */
	    text-align: left;
	    width: 100%;
	    max-width: 100%;
	    height:auto;
	}
	/*intro end*/
	/*product-comment*/
	.product-comment {
	    margin-top: 15rpx;
	    border-radius: 20rpx;
	    position: relative;
	    display: block;
	    padding:0 24rpx;
	    width: 100%;
	    box-sizing: border-box;
	    background-color: #ffffff;
	}
	
	.product-comment .comment-header {
	    position: relative;
	    display: block;
	    width: 100%;
	    height: 88rpx;
	    overflow: hidden;
	    box-sizing: border-box;
	}
	
	.product-comment .comment-header .header-arrow {
	    position: absolute;
	    right:0;
	    top: 30rpx;
	    display: block;
	    width: 16rpx;
	    height: 20rpx;
	    line-height: 44rpx;
	    box-sizing: border-box;
	}
	
	.product-comment .comment-header .header-title {
	    display: block;
	    width: 100%;
	    height: 88rpx;
	    box-sizing: border-box;
	    color: #404245;
	    font-size: 28rpx;
	    font-weight: normal;
	    line-height: 88rpx;
	    text-align: left;
	}
	
	.product-comment .comment-item {
	    position: relative;
	    display: block;
	    width: 100%;
	    margin: 16rpx 0;
	    box-sizing: border-box;
	}
	
	.product-comment .comment-item .item-info {
	    position: relative;
	    display: block;
	    width: 100%;
	    box-sizing: border-box;
	    overflow: hidden;
	    padding-left: 24px;
	    padding-right: 16px;
	}
	
	.product-comment .comment-item .item-info .user {
	    color: #404245;
	    font-size: 28rpx;
	    font-weight: normal;
	    line-height: 36rpx;
	}
	
	.product-comment .comment-item .item-info .rate {
	    color: #ffffff;
	    font-size: 24rpx;
	    font-weight: normal;
	    line-height: 24rpx;
	    padding: 4rpx 6rpx;
	    background-color: #e60012;
	    border-radius: 6rpx;
	    margin-left: 8rpx;
	}
	
	.product-comment .comment-item .item-info .time {
	    float: right;
	    color: #404245;
	    font-size: 26rpx;
	    font-weight: normal;
	    line-height: 36rpx;
	    padding: 6rpx;
	}
	
	.product-comment .comment-item .item-body {
	    display: block;
	    color: #404245;
	    font-size: 26rpx;
	    font-weight: normal;
	    line-height: 36rpx;
	    margin-top: 12rpx;
	    padding: 0 24rpx;
	}
	/*product-comment end*/
	
	/*product-submit*/
	  .product-submit {
	    display:flex;
	    position: relative;
	    z-index: 10;
	    width: 100%;
	    height:100rpx;
	    box-sizing: border-box;
	    border-top: 1px solid rgba(0, 0, 0, 0.15);
	    background-color: #ffffff;
	  }
	
	  .fixed-bottom {
	      position: fixed !important;
	      top: auto !important;
	      bottom: 0 !important;
	  }
	  
	  .product-submit .submit-collect {
	    position: relative;
	    display: flex;
	    flex-direction: column;
	    align-items: center;
	    justify-content: center;
	    width: 20%;
	    height: 100%;
	    /* border-right:1px solid #e2e2e2 ; */
	    box-sizing: border-box;
	  }
	
	  .product-submit .submit-collect .collect-icon {
	    /* position: absolute;
	    top: 50%;
	    left: 50%; */
	    display: block;
	    width: 44rpx;
	    height: 44rpx;
	    box-sizing: border-box;
	    /* margin-top: -32px;
	    margin-left: -32px; */
	  }
	  .product-submit .submit-collect .collect-title{
	    font-size: 20rpx;
	  }
	  .product-submit .submit-cart {
	    position: relative;
	    display: flex;
	    justify-content: center;
	    flex-direction: column;
	    align-items: center;
	    width: 20%;
	    height: 100%;
	    box-sizing: border-box;
	  }
	
	  .product-submit .submit-cart .cart-icon {
	    /* position: absolute;
	    top: 50%;
	    left: 50%; */
	    position: relative;
	    display: block;
	    width: 44rpx;
	    height: 44rpx;
	    box-sizing: border-box;
	    /* margin-top: -32px;
	    margin-left: -32px;*/
	  } 
	
	  .product-submit .submit-cart .cart-badge {
	    position: absolute;
	    top: 50%;
	    left: 50%;
	    display: block;
	    min-width: 28rpx;
	    height: 28rpx;
	    box-sizing: border-box;
	    overflow: hidden;
	    margin-top: -38rpx;
	    margin-left: 10rpx;
	    padding: 0 4rpx;
	    color: #ffffff;
	    font-size: 16rpx;
	    font-weight: normal;
	    line-height: 28rpx;
	    text-align: center;
	    border-radius: 16rpx;
	    background-color: #f3424c;
	  }
	  .product-submit .submit-cart .cart-title{
	    font-size: 20rpx;
	  }
	   .product-submit .submit-box{
	     display: flex;
	     justify-content: center;
	     align-content: center;
	     width:60%;
	     font-weight: 700;
	     font-size: 25rpx;
	     box-sizing: border-box;
	     padding:12rpx 1% 12rpx 1%;
	     border-radius: 35rpx;
	     height:100%;
	   }
	  .product-submit .submit-button {
	    position: relative;
	    display: block;
	    width: 50%;
	    border-radius:35rpx 0 0 35rpx;
	    height: 100%;
	    box-sizing: border-box;
	    color: #ffffff;
	    background-color:#FF9500;
	     line-height: 72rpx; 
	    text-align: center;
	    opacity: 1;
	
	  }
	
	  .product-submit .submit-button.active {
	    opacity: 1.0;
	  }
	
	  .product-submit .submit-button.dark {
	    color: #ffffff;
	    background-color:#d81e06;
	    border-radius:0 35rpx 35rpx 0;
	    opacity: 1;
	  }
	
	  .product-submit .submit-button.dark.active {
		color: #ffffff;
		background-color:#d81e06;
		opacity: 1.0;
	  }
	  /*product-submit end*/
</style> 