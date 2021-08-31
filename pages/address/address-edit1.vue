<template>
	<view class="content">
		
	 <view>
	        <view class="uni-padding-wrap">
	            <view class="uni-title">日期：{{year}}年{{month}}月{{day}}日</view>
	        </view>
		<view class="picker-pup">
			<!-- 头部 -->
		    <view class="picker-pup-head">
				 <view class="picker-pup-head-btn">取消</view>
				 <view class="picker-pup-head-btn" style="color: rgb(255, 0, 0);">确定</view>
			 </view>
			 <!-- 头部 end-->
				<picker-view v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChange" class="picker-view">
					<picker-view-column>
						<view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item,index) in days" :key="index">{{item}}日</view>
					</picker-view-column>
				</picker-view>
			 </view>
	    </view>
	</view>
</template>

<script>
	export default {
		data() {
			const date = new Date()
			            const years = []
			            const year = date.getFullYear()
			            const months = []
			            const month = date.getMonth() + 1
			            const days = []
			            const day = date.getDate()
			            for (let i = 1990; i <= date.getFullYear(); i++) {
			                years.push(i)
			            }
			            for (let i = 1; i <= 12; i++) {
			                months.push(i)
			            }
			            for (let i = 1; i <= 31; i++) {
			                days.push(i)
			            }
			            return {
			                title: 'picker-view',
			                years,
			                year,
			                months,
			                month,
			                days,
			                day,
			                value: [9999, month - 1, day - 1],
			                visible: true,
			                indicatorStyle: `height: 50px;`
			            }
		},
		onLoad() {

		},
		methods: {
		            bindChange: function (e) {
		                const val = e.detail.value
		                this.year = this.years[val[0]]
		                this.month = this.months[val[1]]
		                this.day = this.days[val[2]]
		            }
		        }
	}
</script>

<style>
	.picker-pup{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		transition: all .3s ease;
		/* transform: translateY(100%); */
		transform: translateY(0);
		z-index: 3000;
	}
	.picker-pup .picker-pup-head{
		display: flex;
		align-items: center;
		padding: 0 30rpx;
		height: 88rpx;
		background-color: #fff;
		position: relative;
		text-align: center;
		font-size: 32rpx;
		justify-content: space-between;
	}
	 .picker-view {
	        width: 750rpx;
	        height: 600rpx;
	        margin-top:0rpx;
	    }
	    .item {
	        height: 50px;
			line-height: 50px;
	        align-items: center;
	        justify-content: center;
	        text-align: center;
	    }
</style>
