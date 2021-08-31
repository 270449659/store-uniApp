<template>
    <view class="page-section">
    	<view class="page-section-spacing">
    		<swiper class="swiper" :style="{height:imgheights + 'px'}" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
    			<swiper-item   v-for="(banner,index) in datas.banner" :key="index" :id="banner.id" >
					<view class="swiper-item" >
					    <image :src="banner.img_src"  @load="imageLoad" :data-url="banner.img_url"></image>
    			    </view>
				</swiper-item>		
    		</swiper>
    	</view>
		<view class="swipe-botton"> </view>
    </view>
</template>

<script>
export default{
	// props:['datas'],
	data(){
		return {
			background: ['color1', 'color2', 'color3'],
			indicatorDots: true,
			autoplay: true,
			interval: 2000,
			duration: 500,
			imgheights:'',//商品主图片高度
		}
	},
	onShow() {
	   
		//this.$store.dispatch('setbanner')
	},
	computed:{
		datas(){
			return this.$store.state.home.modules
		},
		// indicatorDots(){
		// 	return this.datas.banners.length > 1 ? true : false
		// }		
    },
	mounted(){
		//console.log('modules', this.modules)
	},
	methods:{
			imageLoad(e){
				let imgwidth = e.detail.width;
				let	imgheight = e.detail.height;
				//console.log('d')
				//设备宽度			
				const windowWidth = uni.getSystemInfoSync().windowWidth;
				//console.log('windowWidth',windowWidth)
				this.imgheights = (windowWidth/imgwidth) * imgheight
			},
	},		
	watch:{
		datas(){
			 //console.log('datas', this.datas) 
		}
	}
	
}
</script>
<style>
.page-section{
	position: relative;
	background-color: #f3424c;
}
.swipe-botton{
    width: 100%;
    height: 100px;
    background:#f6f6f6;
    bottom: -1px;
    position: absolute;
    border-radius:60px 60px 0 0;
  }
.page-section .page-section-spacing{ 
	
	position: relative;
	height: 100%;
    z-index: 90;
}

.page-section .swiper-item{    
	padding: 0 3.5%;
	margin: 0 auto;
	width: 93%;
    height: 100%;
    border-radius: 5rpx;
    position: relative;
    display: block;
	}
.page-section .swiper-item image{
	width:100%;
	height: 100%;    
	border-radius: 5rpx
	}
	.page-section .swiper-item image img{
		width:100%;
		height: 333px;    
	
		}
</style>