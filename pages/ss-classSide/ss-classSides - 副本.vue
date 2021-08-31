<template>
	<view class="category">
		<view  class="search"><view  class="search-content"><view class="ser"><span  class="icon"></span><span >商品搜索</span></view></view></view>
		<view class="content">
			<!-- 左 -->
			<scroll-view  @scroll="leftScroll" class="left_view p_r" scroll-y :style="{ height: scrollH + 'px' }" :scroll-into-view="leftScrollTop()">
				<block v-for="(item, index) in dataArr" :key="index">
					<view :class="[left_selectIndex == index ? 'left_item_s' : '', 'left_item']" :id="'left_' + index" @click="leftTap({ item, index })">{{ item.name }}</view>
				</block>
				<view class="seletItem" :style="{ top: left_selectIndex * 60 + 'px' }"></view>
				<view class="" style="height: 80px;"><!-- 站位 --></view>
			</scroll-view>
            <!-- 左 end-->
			<scroll-view @scroll="rightScroll" class="right_view" scroll-y :style="{ height: scrollH + 'px' }" :scroll-into-view="'left_' + right_selectIndex" scroll-with-animation>	
				<block v-for="(item, index) in dataArr" :key="index">
					<view :ref="'left_' + index" class="right_item " :id="'left_' + index">
						<!-- banner区域 -->
						<view v-if="index==0" class="banner-wrapper">
							<swiper class="swiper-content" :autoplay="true" :interval="3000" :circular="true">
								<swiper-item class="swiper-item" v-for="item in banner" :key="item.id">
									<image class="swiper-img" :src="item.img_src"></image>
								</swiper-item>
							</swiper>
						</view>
						<text class="right_item_title "><p>我是分类->{{ item.name }}</p></text>
						<view class="right_item_view">
							<view class="item" v-for="(item, index) in item.subArr" :key="index" @click="rightTap(item)">
								<view class="item-box" :style="{ width: subItemW + 'px', height: subItemW + 'px' }"> 
								<image :src="item.img"></image>
								</view>
								<!-- <image :src="item.img"></image> -->
								<text>{{ item.name }}</text>
							</view>
						</view>
					</view>
				</block>
				<view class="" :style="{ height: placeholderH + 'px' }"><!-- 站位 --></view>
			</scroll-view>
		</view>	
	</view>
</template>

<script>
import testdata from './testdata.js';
export default {
	data() {
		return {
			left_scrolly: 0,
			// 底部有tabar-88 scrollH: uni.getSystemInfoSync().screenHeight-88
			scrollH: uni.getSystemInfoSync().screenHeight,
			subItemW: parseInt((uni.getSystemInfoSync().screenWidth * (2 / 3) - 15 * 2 - 24) / 4),
			left_selectIndex: 0,
			right_selectIndex: 0,
			ttscrollH: 0, //总高度
			placeholderH: 0, //占位高度
            banner:[{"id":"1","link": "details?id=84","img_src":"http://uniapp.atongweb.com/images/home/banner1.jpg"},{"id":"2","link":"details?id=84","img_src":"http://atongweb.com/data/afficheimg/20200227onkzcr.jpg"},{"id":"3","link":"details?id=84","img_src":"http://atongweb.com/data/afficheimg/20190722fgszmm.jpg"}],	
			heighArr: [],
			dataArr: testdata
		};
	},
	onLoad() {
		let self = this;
		setTimeout(function() {
			self.computerH();
		}, 100);
	},
	methods: {
		leftTap: function(e) {
			this.left_selectIndex = e.index;
			this.right_selectIndex = e.index;
		},
		// 左侧滚动
		leftScroll: function(e) {
			this.left_scrolly = e.detail.scrollTop;
		},
		// 左侧顶部高度
		leftScrollTop: function(e) {
			let b = this.left_selectIndex * 60 + 80;
			let c = b - this.scrollH;

			if (c > 0) {
				return 'left_' + this.left_selectIndex;
			}

			if (this.left_scrolly > b - 80) {
				return 'left_' + this.left_selectIndex;
			}
		},

		// 右边点击
		rightTap: function() {
			uni.showModal({
				title: '点击了',
				showCancel: false
			});
		},
		rightScroll: function(e) {
			let scrollH = e.detail.scrollTop + 30;
			let cc = this.ttscrollH - this.scrollH;

			let a = 0;
			let findInx = this.heighArr.findIndex(function(itemH, i) {
				a = a + itemH;
				return a > scrollH;
			});

			this.left_selectIndex = findInx;
		},

		// 计算高度
		computerH: function() {
			this.ttscrollH = 0;
			for (let item of this.dataArr) {
				let title_lineH = 49; //rpx
				let subNum = item.subArr.length;
				let subImgH = this.subItemW; //rpx
				let subTitleH = 40; //rpx
				let rowSpecH = 8; //rpx
				let rowN = subNum % 3;
				let rowSpecNum = parseInt(subNum / 3) + parseInt(rowN > 0 ? 1 : 0);
				let totalRpx = title_lineH + (subImgH + subTitleH) * rowSpecNum + rowSpecH * (rowSpecNum - 1);
				this.heighArr.push(totalRpx);
				this.ttscrollH = this.ttscrollH + totalRpx;
			}

			this.placeholderH = this.scrollH - this.heighArr[this.heighArr.length - 1];

			//以下方法也可以  但是通用性不高 上面方法 计算麻烦但是适合各种平台
			// let self=this
			// var selectorQuery = uni.createSelectorQuery()
			// selectorQuery.selectAll('.right_item').boundingClientRect(data => {
			// 	self.heighArr = data.map(item => {
			// 		return {
			// 			top: Math.round(item.top),
			// 			height: Math.round(item.height)
			// 		}
			// 	})
			// }).exec()
			// console.log('ttscrollH',this.$refs.left_0)
		}
	}
};
</script>

<style lang="scss">
* {
	box-sizing: border-box;
}
.category{
	.search {
		position: relative;
		.search-content{
			width: 100%;
			box-sizing: border-box;
			position: fixed;
			z-index: 99; 
			height: 88rpx;
			padding: 0 30rpx;
			background: #fff;
			display: flex;
			align-items: center;
			border-bottom: 0.5px solid #ededed;
			
			.ser{
			    width: 690px;
			    height: 56rpx;
			    background: #ededed;
			    border-radius: 8rpx;
			    display: flex;
			    align-items: center;
			    justify-content: center;
				span{
				    display: inline-block;
				}
				.icon{
				    background: url(https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/search.png) 50% no-repeat;
				    background-size: 100%;
				    width: 28rpx;
				    height: 28rpx;
				    margin-right:10rpx;
				}
			}
		}
	}
}
.content{
	display: grid;
	grid-template-columns: 1fr 2fr;
	grid-template-rows: auto;
	position: absolute;
	left: 0rpx;
	bottom: 0rpx;
	right: 0rpx;
	top: 88rpx;
	overflow: hidden;
}
.left_view {
	background-color: #f8f8f8;
	position: relative;
	// 蒙版
	.seletItem {
		height: 110rpx;
		position: absolute;
		top: 0rpx;
		left: 0rpx;
		z-index: 10;
		right: 0rpx;
		background-color: rgba(255, 255, 255, 0.3);
		transition: top 0.2s linear;
		display: flex;
		align-items: center;

		&::before {
			content: '';
			width: 6rpx;
			height: 40%;
			background-color: #00a3fe;
			left: 0rpx;
			border-radius: 0px 100rpx 100rpx 0px;
		}
	}
	.left_item {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 60px;
		margin-bottom: 0rpx;
		position: relative;
		font-weight: bold;
		font-size: 28rpx;
	}
	.left_item_s {
		background-color: #ffffff;
		color: #000;
		font-weight: bold;
		position: relative;
	}
}

.right_view {
	background-color: #ffffff;
	padding: 0rpx 12px;
	.banner-wrapper {
		.swiper-content {
			width: 100%;
			height: 180rpx;
			//margin-bottom: 20rpx;
			.swiper-item {
				.swiper-img {
					width: 100%;
					height: 180rpx;
				}
			}
		}
	}
	.right_item {
		.right_item_title {
			position: relative;
			display: block;
            text-align: center;
			height: 125rpx;
			line-height: 125rpx;
			font-size: 28rpx;
			font-weight: bold;
			p{
				position: relative;
				top:33rpx;
				background-color: #fafafa;
				height: 60rpx;
				line-height: 60rpx;	
			}
		}
		.right_item_view {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			grid-template-rows: auto;
			grid-gap: 8px 15px;
			.item {
				display: flex;
				flex-flow: column nowrap;
				align-items: center;
				.item-box{
						display: flex;
						justify-content: center;
					image{width: 70rpx; height:70rpx}
				}
				
				text {
					color: #333;
					font-size: 23rpx;
					margin: 0rpx 0 20rpx 0;
					// line-height: 40px;
				}
			}
		}
	}
}
</style>
