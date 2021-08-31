<template>
    <view class="page-section">
    	<view class="page-section-spacing">
    		<swiper class="swiper" :style="{height:imgheights + 'px'}" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
    			<swiper-item   v-for="(item,index) in datas.goods_image" :key="index">
    				<view class="swiper-item" >
    				    <image :src="item.img_url"  @load="imageLoad"></image>
    			    </view>
    			</swiper-item>		
    		</swiper>
    	</view>
		
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
			imgheights:'',
		}
	},
	onShow() {
	   
	},
	computed:{
		datas(){
			return this.$store.state.goodsStore.goodsInfo
		},	
    },
	mounted(){
		//console.log('modules', this.modules)
	},
	methods:{
			imageLoad(e){
				let imgwidth = e.detail.width;
				let	imgheight = e.detail.height;
				//设备宽度			
				const windowWidth = uni.getSystemInfoSync().windowWidth;
				this.imgheights = (windowWidth/imgwidth) * imgheight
			},
	},		
	watch:{
		datas(){
			
		}
	}
	
}
</script>
<style>
.page-section{
	position: relative;
	/* background-color: #f3424c; */
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