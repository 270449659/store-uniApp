<template>
<view  class="product-attr-modal">
	<view class="main">
		<view class="header flex">
			<view class="header-box">
				<image alt="商品图" :src="productAttrData.goods_image" class="avt" id="popupImg" ptag="7001.1.239" ></image>
				<view class="header-right">
					<view v-if="productAttrData.current_price_state" class="price" id="priceSale2"><span class="price_decimals">¥</span><em>{{productAttrData.goods_price}}</em></view>
					<view v-else class="price" id="priceSale2"><span class="price_decimals">¥</span><em>{{productAttrData.goods_price[0]}}</em><span class="price_decimals">.{{productAttrData.goods_price[1]}}</span></view>
					<view class="stock" id="stock"><span></span></view>
					<view v-if="attrName.length" class="prop" id="popupSkuChoose">
					   <span  class="prop-span">已选</span>
						<span v-for="(item,index) in attrName" :key="index">
						{{item.attrs}},
						</span>
						x{{curGoodsNum}}
					</view>	
					<view v-else class="prop" id="popupSkuChoose"><span  class="prop-span">已选</span><span>{{curGoodsNum}}件</span></view> 
				</view>
			</view>
			<view  @click="onClose" class="close" id="popupClose">X</view>
		</view><!-- header end -->
		<view class="body">
			<!-- 规格与颜色 -->
			<view v-if="productAttrData.goods_properties" class="popupSkuArea" id="popupSkuArea" >
				<view v-for="(item,index) in productAttrData.goods_properties" :key="index">	
					<view class="specifications-title">{{item.name}}</view>
					<view class="specifications-info flex">
					<view v-for="(items,indexs) in item.attrs" :key="indexs" :data-i="index"  :data-type="items.is_multiselect ? 'c' : 'r'" :data-id="items.id"  @click="choise_ver($event,items)"  :id="items.id" class="specifications-list">
					  <span class="item" :class="items.checked ? 'active' : ''" >    {{items.attr_name}}</span>
					</view>
					</view>
					<!-- <view class="colour-title">颜色</view>
					<view class="colour" id="skuPop2" >
						<text class="item active" no="2" dis="0">红色</text>
					</view> -->
				</view>	
			</view><!-- 规格与颜色 end-->
			
			<!-- 数量-->
			<view class="count-choose flex" id="popupCount">
				<view class="count">数量</view>
				<view class="num-wrap flex">
					<span data-type="cut" @click="changeGoodsNum($event)" class="minus disable" id="minus1"><span  data-type="cut" class="row"></span></span>
					
					<view class="text-wrap"><input  type="number" :value="curGoodsNum" @input="changeGoodsNum($event)" data-type="input"  class="text"   id="buyNum1" /></view>
					<span data-type="add"  @click="changeGoodsNum($event)"  class="plus" id="plus1"><span data-type="add" class="row"></span><span data-type="add"  class="col"></span></span>
				</view>
				
			</view>
			<!-- 数量 end-->			
		</view>	 <!-- body end-->
		<view class="btns show">		            		            
			<view @click="goPurchase" class="btn yellow" id="buyBtn1">确认</view>
		</view>
	</view><!-- main end -->	
	
</view>
</template>
<script>
export default{
    props:{
        productAttrData: {
            type: Object,
			required: true,	
        },
    },        
	watch: {		  		  
		productAttrData: {
			handler(newName, oldName) {
				
				console.log('productAttrData',newName);
				this.product=newName;
				this.curGoodsStock=newName.stock_num;
				this.curGoodsNum=newName.number;
				this.typeName=newName.typeName;
			},
			immediate: true,
			deep: true	   
		},
	},
	data(){
		return {
			cur_ver_index:'', //当前选中的属性
			attrName:[],
			attrValue:'',
            curGoodsNum: 1,// 当前商品购买数量
			curGoodsStock:'',
			current_price_state:null,
			goods_image:{
				large:'',
			},
			typeName:''
		}
	},
	
	computed:{
		//已选
		// attr_name: {
		// 	get() {
		// 		return this.attr != '' ? this.attrValue: ''
		// 	},
		// },
	},
    methods: {
		
		// onClose() {
		// 	this.$refs.popup.close()
		// },
		
		onClose() {
		 	this.$emit('close',false)
		 },
		
		// 数量
		changeGoodsNum(e){
			console.log(e.currentTarget.dataset.type)
			let type = e.currentTarget.dataset.type;
			let curGoodsNum = this.curGoodsNum;
			let curGoodsStock = this.curGoodsStock;

			if (type === 'add') {
				curGoodsNum ++;
				if (curGoodsNum > 99999 && curGoodsNum <= curGoodsStock) {
				   Toast('该商品限购99999件');
				curGoodsNum = 99999;
				}else{
					if (curGoodsNum >= curGoodsStock) {
						Toast('不能大于库存数量');
						curGoodsNum = curGoodsStock;
					}
				}
			}

			if (type === 'cut') {
				curGoodsNum --;
				if (curGoodsNum < 1) {
					Toast('请至少选择一件商品');
					curGoodsNum = 1;
				}
			}
			
			if (type === 'input') {
				curGoodsNum = e.target.value;
				if (curGoodsNum > 99999 && curGoodsNum <= curGoodsStock) {
					Toast('该商品限购99999件');
					curGoodsNum = 99999;
				}else{
					if (curGoodsNum > curGoodsStock) {
						Toast('不能大于库存数量');
						curGoodsNum = curGoodsStock;
					}else{
						if (curGoodsNum < 1) {
							Toast('请至少选择一件商品');
							curGoodsNum = 1;
						}
					}
				}
			}
			this.curGoodsNum=curGoodsNum;	 
		   this.$emit('choiseVer',this.cur_ver_index,this.productAttrData.goods_properties,this.curGoodsNum)  
		},// 数量  end
		
		//确定
		goPurchase() {
			if(this.productAttrData.goods_properties && this.productAttrData.goods_properties.length > 0){
			  if (!this.cur_ver_index) {
			  uni.showToast({
			      title: '请选择规格',
			      duration: 2000
			  });
			  return false;
			  }	
			}
			//console.log('goPurchase',this.typeName)
			this.$emit('getPurchase',this.typeName)
		},//确定--end

	}		
}		
</script>
<style lang="scss">
	.product-attr-modal{
		position: fixed;
		top:0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 110;
		background-color: rgba(0,0,0,.7);
		.main{
			position: absolute;
			transform: translate3d(0,0,0);
			bottom:0;
			width: 100%;
			z-index: 210;
			max-height:1000rpx;
			min-height: 500rpx;
			background-color: #fff;
			border-top-left-radius: 12px;
			border-top-right-radius: 12px;
			// overflow: hidden;
			.header{
				height: 200rpx;
				padding: 0 0 0 230rpx;
				align-items: center;
				text-align: left;
				margin:28rpx;
				.avt {
				    position: absolute;
				    left: 18rpx;
				    top: 18rpx;
				    border-radius: 6px;
				    width: 200rpx;
				    height: 200rpx;
					image{
						width: 100%;
						height:100%;
					}
				}	
				.price {
				    font-family: JDZH-Regular;
				    display: inline-block;
				    height: 80rpx;
				    line-height: 80rpx;
				    color: #f2270c;
                    font-size: 48rpx;
                    em{
                        font-style: normal;
                    }
					 span{
                        font-size: 0.373333rem;
                    }

				}
				.prop {
				    word-break: break-all;
				    font-size: 24rpx;
				    color: #333;
				    line-height: 1;
                    padding-right: 10rpx;
                    .prop-span{
                        color:#8c8c8c;
                        margin-right: 10rpx;
                    }
				}
				.close {
				   width: 44rpx;
					height:44rpx;
					line-height: 44rpx;
					text-align: center;
					position: absolute;
					top: 22rpx;
					right:22rpx;
					font-size: 25rpx;
					border-radius: 50rpx;
					color: #ffffff;
					background-color: rgba(0,0,0,.5);
				}
			}// header end 
			
			// body
			.body{
				// 规格与颜色
				max-height: 700rpx;
				 margin: 0 28rpx 0 28rpx;
				 padding-bottom:100rpx;
				 overflow: auto;
				.popupSkuArea{
					// 规格
				   .specifications-title{
					   color: #262626;
					   margin: 40rpx 0 24rpx 0;
					   font-size:28rpx;
					   font-family:PingFang SC;
					   font-weight:bold;
					}
				   .specifications-info{
						 
						.specifications-list{
							overflow: hidden;
							.item{
								padding: 0 18rpx;
								min-width: 20rpx;
								max-width: 270rpx;
								overflow: hidden;
								height: 57rpx;
								line-height: 57rpx;
								float: left;
								text-align: center;
								margin-right: 32rpx;
								margin-bottom: 20rpx;
								font-size: 22rpx;
								color: #262626;
								background: #f2f2f2;
									border: 1px solid #f2f2f2;
								border-radius:40rpx;		  
							} 
							.active{
								background: #fcedeb;
								border: 1px solid #f2270c;
								color: #f2270c;
							 
							}	  
						}// 规格 end
					}
					
				   .colour-title{  // 颜色
					   color: #262626;
					   margin: 40rpx 0 24rpx 0;
					   font-size:28rpx;
					   font-family:PingFang SC;
					   font-weight:bold;
				   }
				   .colour{
					   padding: 0 6rpx;
					   overflow: hidden;
					   .item{
						   padding: 0 18rpx;
						   min-width: 20rpx;
						   max-width: 270rpx;
						   overflow: hidden;
						   height:57rpx;
						   line-height:57rpx;
						   float: left;
						   text-align: center;
						   margin-right: 32rpx;
						   margin-bottom: 20rpx;
						   font-size:28rpx;
						   color: #262626;
						   background: #f2f2f2;
						   border-radius: 40rpx;		  
					   } 
					   .active{
						   background: #fcedeb;
						   border: 1px solid #f2270c;
						   font-size:28rpx;
						   color: #f2270c;
						   height:57rpx;
						}	  
				   }  // 颜色 end
				  
				}// 规格与颜色 end
				
				.count-choose{
					padding: 50rpx 0 100rpx 0;
					font-size:28rpx;
					align-items: center;
					justify-content: space-between;
					.count { //数量题目
						color: #262626;
						height: 31rpx;
						line-height: 31rpx;
						font-weight: 700;
					}//数量题目
					.num-wrap{//数量
						position: relative;
						z-index: 0;
						width:178rpx;
						height: 57rpx;
						vertical-align: middle;	
						align-items: center;
						border: 1.5px solid #ccc;
						border-radius:28rpx;
						.minus{ // 减
							position: relative;
							max-width: 30rpx;
							min-width: 30rpx;
							margin-left: 10rpx;
							height: 40rpx;
							line-height: 40rpx;
							background: #fff;
							text-align: center;
							.row {
								border-radius: 20rpx;
								position: absolute;
								top: 50%;
								left: 50%;
								-webkit-transform: translate(-50%,-50%);
								transform: translate(-50%,-50%);
								width: 16rpx;
								height: 4rpx;
								background-color: #262626;
							}
						}// 减 end
						// 输入框
						.text-wrap {
							position: relative;
							width: 90rpx;
							z-index: 0;
							margin: 0 1px;
							border-radius: 2px;
							input {
								font-size: 11rpx;
								background: #f2f2f2;
							}
							.text {
								font-family: JDZH-Regular;
								height:40rpx;
								width: 100%;
								color: #333;
								background: #fff;
								font-size:28rpx;
								text-align: center;
								border: none;
							}
						} // 输入框 end
						// 加
						.plus {
							position: relative;
							max-width: 30rpx;
							min-width: 30rpx;
							height: 40rpx;
							line-height: 40rpx;
							background: #fff;
							text-align: center;
							 .row {
								border-radius: 20rpx;
								position: absolute;
								top: 50%;
								left: 50%;
								-webkit-transform: translate(-50%,-50%);
								transform: translate(-50%,-50%);
								width: 16rpx;
								height: 4rpx;
								background-color: #262626;
							}		
							.col {
								border-radius: 20rpx;
								position: absolute;
								top: 50%;
								left: 50%;
								-webkit-transform: translate(-50%,-50%);
								transform: translate(-50%,-50%);
								width: 4rpx;
								height: 16rpx;
								background-color: #262626;
							}
						}	 // 加 end
					}//数量 end
					
				}
				
			}// body end
			
			.btns{
				width: 100%;
				position: absolute;
				bottom: 0;
				color: #FFFFFF;
				height:100rpx;
				line-height:100rpx;
				text-align: center;
				font-size:33rpx;
				font-family:PingFang SC;
				font-weight:800;
				background:linear-gradient(90deg,rgba(244,46,20,1) 0%,rgba(246,44,67,1) 51%,rgba(255,138,0,1) 100%);
			}
		}
		
	}
</style>