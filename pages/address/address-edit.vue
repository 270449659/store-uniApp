<template>
  <div class="addressEdit">
    <!-- header -->
	<!-- header -->
	<header class="header fixed-top" >
	   <view @click="go" class="return">
		  <image class="return-icon" src="/static/images/right-ash-icon.png"></image>
	   </view>
	   <view v-if="consigneeId" class="title">
	   		编辑地址  
	   </view>
	   <view v-else class="title">
	   		添加地址  
	   </view>
	</header> <!-- header end-->
   <!-- <v-Header  v-if="consignee==null" title="添加地址" ></v-Header>
    <v-Header  v-else title="编辑地址" ></v-Header> -->
    <!-- content -->
    <div class="content">
<!--    {{}} -->
      <!-- Form -->
      <view class="address-form" >
		<view class="flex form-group">
			<view class="title">姓名</view>
			<input type="text"  v-model="addressInfo.consignee" @input="consigneeModelInput" placeholder="请输入收货人" />
		</view>
        <view class="flex form-group">
			<view class="title">联系方式</view>
			<input type="text"  v-model="addressInfo.mobile" placeholder="请输入联系方式" />
		</view>
		<view class="flex  form-group">
			<view class="title">地址</view>
			<view class="uni-list">
				<view @click="goPickerPup" v-if="addressInfo.province_name && addressPicker==false" class="uni-list-box uni-list-cell-db">
				  	<view class="uni-input"><text> {{addressInfo.province_name}}</text><text >{{addressInfo.city_name}}</text><text>{{addressInfo.district_name}}</text></view>
				</view>
				<view @click="goPickerPup" v-else-if="addressPicker && provinceNames" class="uni-list-box uni-list-cell-db">
		  	      	<view class="uni-input"><text> {{provinceNames.value}}</text><text >{{cityNames.value}}</text><text>{{districtNames.value}}</text></view>
				</view>
				<view @click="goPickerPup" v-else class="uni-list-cell-left">
					当前选择
				</view>
			</view>
		</view>
      <view class="flex  form-group">
      	<view class="title">详细地址</view>
      	<input type="text"  v-model="addressInfo.address" placeholder="详细地址" />
      </view>
       <view class="flex  flex-justify-content-s-b form-group Default-address">
       	<view class="title">默认地址</view>
           <switch :checked="checked" @change="switch2Change"/>
       </view>
           
      </view>  <!-- Form end-->
      <!-- Submit -->
	  
	  <view v-if="pickerPupStatus" class="picker-pup">
		<view class="mask show"></view>
			<view class="picker-pup-box">
				<!-- 头部 -->
				<view class="picker-pup-head">
					 <view @click="goPickerPupClose" class="picker-pup-head-btn">取消</view>
					 <view @click="goPickerPupOk" class="picker-pup-head-btn" style="color: rgb(255, 0, 0);">确定</view>
				 </view>
				 <!-- 头部 end-->
				  <!-- {{cityName.value}} {{districtName.value}} -->
				<picker-view v-if="pickerPupStatus" :indicator-style="indicatorStyle" :value="array" @change="bindChange" class="picker-view">
					 <picker-view-column>
						<view class="item" v-for="(item,index) in provinceName" :key="index">{{item.value}}</view>
					</picker-view-column> 
					<picker-view-column>
						<view class="item" v-for="(item,index) in cityName" :key="index">{{item.value}}</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item,index) in districtName" :key="index">{{item.value}}</view>
					</picker-view-column> 
				</picker-view>
			</view>	
	  	</view>
	  </view> 
      <div class="address-action">
        <div class="bar-cancel" @click="goCancel">取消</div>
        <div class="bar-save" @click="goSave"> 确认</div>
      </div>
      <!-- Submit -->
      <div class="address-bar" v-if="consigneeId!==''" >
        <div class="bar-delete" @click="goDelete">
          删除地址
        </div>
      </div>
	  <!-- Submit end-->
   </div>
  </div>
</template>

<script>

import region from '@/common/js/region.json'
 import { mapState } from 'vuex'
  export default {
    name : 'address-edit',
   
    data () {
      return {
        // addressInfo:{},
	   consigneeModel:'',//名字
       consigneeId: null,//地址id
	   //array: ['中国', '美国', '巴西', '日本'],
	   array:[0,0,0],
	   index: 0,
	   indicatorStyle: `height: 50px;`,
	   pickerPupStatus:false,//picker开关
	   addressPicker:false,//picke地址
	   provinceName:[],
	   provinceNames:{},//显示省
	   cityName:[],
	   cityNames:[],//市
	   districtName:[],
	   districtNames:[],//区
	   checked:false,//设置为默认地址
       // popupVisible:false,
       //  name: '',
       //  mobile:'',
       //  address: '',
       //  regions:[],
       //  region: '',
       //  is_default: false,
       //  provinceName:[],
       //  cityName:[],
       //  pickerData:[],
       //  pickerRegions:[],
       //  pickerRegionName:null,
       //  provinceID:[],
       //  tel: '',

      }
    },
	onLoad(e){
		console.log(e)
		this.consigneeId=e.addressId;//地址id
		let consigneeId=e.addressId;
		console.log('consigneeId',consigneeId)
		this.isLogin=this.$isLogin();
		this.userId= uni.getStorageSync('user_id');
		this.token= uni.getStorageSync('token');
		if(consigneeId!==''){
			console.log('consigneeId11',consigneeId)
			this.showAddress(this.consigneeId);
		}else{
			this.addressInfo={
				consignee:'',
				 email:'',
				 mobile:'',
				 address:'',
				// mobile_addr_id_list: 0,0,0,
				 checked: true,
				 province:'',
				 city: '',
				 district:'',
			};
		}
		//this.getCartList(consigneeId);
		this.formatRegions();//全国地址
	},
    mounted(){
      //var consignee=this.$route.query.id|| null;
	  
    },
	computed:{
		...mapState({	
			addressInfo: state => state.addressStore.addressInfo//地址	
		}),
		addressInfo: {
			get() {
				let cartList=this.$store.state.addressStore.addressInfo;
				 return cartList
				 //console.log('tmpCartData',cartListData)hi
			},
			 set(val) {
				 this.$store.state.addressStore.addressInfo=val
			 }
		},		
	},
	//监听
	watch:{
		addressInfo(){
            let checked=this.addressInfo.is_default=="false" ? false : this.addressInfo.is_default;
		    this.checked=checked;
		}
	},
	
    methods : {
		consigneeModelInput(e){
			//console.log('e',e)
			this.consigneeModel=e.detail.value;
		},
		//打开全国地址
		goPickerPup(){
			this.pickerPupStatus=true;
		},
		//关闭全国地址
		goPickerPupClose(){
			this.pickerPupStatus=false;
		},
		//确定选择地址
		goPickerPupOk(){
			this.provinceNames=this.province_Names;
			this.cityNames=this.city_Names;
			this.districtNames=this.district_Names;
			this.addressPicker=true;
			this.pickerPupStatus=false;
		},
		
		//选择全国地址
		bindChange: function (e) {	 
			const val = e.detail.value
			//this.aa=val;
			let  province_Names=[]; let city_Names=[]; let district_Names=[];
			// this.provinceNames =this.provinceName[val[0]];
			// let provinceNamesChildren =this.provinceNames.children;
			// let cityName =this.cityName=provinceNamesChildren;
			// this.cityNames=cityName[val[1]];
			// let districtName=this.districtName=this.cityNames.children;
			// this.districtNames =districtName[val[2]];
						
			this.province_Names =this.provinceName[val[0]];
			let provinceNamesChildren =this.province_Names.children;
			let cityName =this.cityName=provinceNamesChildren;
			this.city_Names= cityName[val[1]];
			let districtName=this.districtName=this.city_Names.children;
			this.district_Names =districtName[val[2]];
		},
		
		//全国地址
		formatRegions(){
			uni.request({
			    url: 'http://web.atongweb.com/js/region.json', //仅为示例，并非真实接口地址。
			    success: (res) => {
					 console.log(res);
					if(res.errMsg="request:ok" && res.statusCode==200){
					 this.provinceName=res.data;
					 let provinceNamesChildren =this.provinceName[0].children;
					 if(provinceNamesChildren){
						this.cityName=provinceNamesChildren; 
						let cityNamesChildren=provinceNamesChildren[0].children;
						if(cityNamesChildren){
							this.districtName=cityNamesChildren;
						}
					 }	
					}
			    }
			});
		},
		
		//设置为默认地址
		switch2Change(e) {
			console.log('switch2 发生 change 事件，携带值为', e.target.value)
		},

		go() {
			 uni.navigateBack();
		},
    
        goSave:function () {
			//var consignee=this.$route.query.id|| null;
			//this.consigneeModel.length
			 console.log('addressInfo',this.addressInfo.consignee)
			if(this.addressInfo.consignee.length <=0) {
			 
			  uni.showToast({
				  title: '性名不能为空',
				  icon: 'none',
				  duration: 2000
			  });
			  return false;
			}
			if(this.addressInfo.mobile.length <=5) {
			  uni.showToast({
				  title: '手机不能为空',
				  icon: 'none',
				  duration: 2000
			  });
			  return false;
			}
			if(this.addressInfo.province_name.length<= 0) {
			  Toast('地址不能为空');
			  uni.showToast({
				  title: '地址不能为空',
				  icon: 'none',
				  duration: 2000
			  });
			  return false;
			}
			//var region = this.$data.regions[this.$data.regions.length - 1];
			// if (!region) {
			//   Toast('地址不能为空');
			//   return;
			// }
	
			if(this.addressInfo.address.length<=0) {
			  uni.showToast({
				  title: '详细地址不能为空',
				  icon: 'none',
				  duration: 2000
			  });
			  return false;
			}

			if(this.consigneeId== null){
				console.log('null');
				uni.request({
					url: 'http://interface.atongweb.com/?service=App.User.addaddressDetailActionApi', //仅为示例，并非真实接口地址。
					data: {
						consignee:this.addressInfo.consignee,
						email: this.addressInfo.email,
						mobile:this.addressInfo.mobile,
						address: this.addressInfo.address,
					   // mobile_addr_id_list: 0,0,0,
						checked: true,
						address_id: this.addressInfo.address_id,
						province: this.addressInfo.province_name,
						city: this.addressInfo.city_name,
						district:this.addressInfo.district_name,
						accesstoken: this.token,
						user_id: this.userId,
						platform: 'H5',
						app_key: 'wolf100000001',
						format: 'JSON',
						api_version: '2.0',
						token:this.token,
					
					},
					// header: {
					//     'custom-header': 'hello' //自定义请求头信息
					// },
					success: (res) => {
						console.log(res.data);
						uni.navigateTo({
							url:'/pages/address/address-select'		
						});
					}
				}); 
				
			}else{
			  if(this.consigneeId!== null) {
				console.log('!null');
				uni.request({
					url: 'http://interface.atongweb.com/?service=App.User.addaddressDetailActionApi', //仅为示例，并非真实接口地址。
					data: {
						consignee:this.addressInfo.consignee,
						email: this.addressInfo.email,
						mobile:this.addressInfo.mobile,
						address: this.addressInfo.address,
					   // mobile_addr_id_list: 0,0,0,
						checked: true,
						address_id: this.addressInfo.address_id,
						province: this.addressInfo.province_name,
						city: this.addressInfo.city_name,
						district:this.addressInfo.district_name,
						accesstoken: this.token,
						user_id: this.userId,
						platform: 'H5',
						app_key: 'wolf100000001',
						format: 'JSON',
						api_version: '2.0',
						token:this.token,
					
					},
					// header: {
					//     'custom-header': 'hello' //自定义请求头信息
					// },
					success: (res) => {
						console.log(res.data);
						uni.navigateTo({
							url:'/pages/address/address-select'		
						});
					}
				}); 
			  }
			} ///更新结束  
		},///更新与添加结束
	  
	     //删除
        goDelete () {
			var consigneeId=this.consigneeId|| null;
			uni.request({
				url: 'http://interface.atongweb.com/?service=App.User.AddressDeleteApi', //仅为示例，并非真实接口地址。
				data: {
					id: this.consigneeId, 
					user_id: this.userId,            
					token:this.token,       
				},
				// header: {
				//     'custom-header': 'hello' //自定义请求头信息
				// },
				success: (res) => {
					console.log(res.data);
					uni.navigateTo({
						url:'/pages/address/address-select'		
					});
				}
			}); 
        },
		//删除-end

       // 地址列表
       showAddress(consigneeId) {  
		   if(consigneeId!==''){	
			   this.$store.dispatch('setAddressDetail',{
					'address_id':Number(consigneeId),
					'user_id':this.userId,
					'token':this.token
			   })    
		   }
       },
    
      //关闭地址编辑/添加
      goCancel:function () {
        history.go(-1)
      },
    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	/* #ifdef APP-PLUS */
	.addressEdit .header {margin-top:55rpx;}  
	.addressEdit .content .search-history-box{
	   padding-top:143rpx; 
	}
	/* #endif */
	/* #ifdef MP */
	
	.addressEdit .header .return{margin-top:0;}

	/* #endif */
	  .header{
	    z-index: 100;
	    width: 100%;
	    height: 88rpx;
	    box-sizing: border-box;
	   background-color: #ffff !important;
	    /* box-shadow: rgba(0, 0, 0, .05) 0 1px 3px; */
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
			.return-icon{
				width: 20rpx;
				height:30rpx;
			    transform:rotate(180deg);
			}
			
		}
		.title{
			text-align: center;
			line-height: 88rpx;
			height: 100%;
		}
	  }
	  .fixed-top {
	      position: fixed!important;
	      top: 0!important;
	      bottom: auto!important;
	  }
	  
    .content{    
		width: 100%;    
		padding-right: 15px;
        font-size: 15px;
		margin-top: 88rpx;
		padding-bottom:150rpx;

	}
	
	.address-form{
		.form-group{
			background-color: #fff;
			padding: 0.5px 15px;
			display: flex; 
			align-items: center;
			min-height: 100rpx;
			
			.title{
				padding-right: 30rpx;
				font-size: 30rpx; 
			}
			.uni-list-cell-left text{margin-right: 10rpx;}
			.uni-list{
				width:75%;
				.uni-list-box{
					width:100%;
					// picker-view{
					// width: 750rpx;
					//         height: 60rpx;
					// }
				}
			}
			picker{width:100%}
			
		}
	}
	
	//picker-pup
    .picker-pup{
    	position: relative;
    	z-index: 888;
    }
	.picker-pup .mask.show{
		position: fixed;
		z-index: 1000;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background: rgba(0,0,0,.6);
		visibility: visible;
       opacity: 1;
	}
	.picker-pup .picker-pup-box{
	 	position: fixed;
	 	bottom: 0;
	 	left: 0;
	 	width: 100%;
	 	transition: all .3s ease;
		    background-color: #fff;
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
		background-color: #f3f3f3;
		margin-top:0rpx;
    }
	.item {
		height: 50px;
		line-height: 50px;
		align-items: center;
		justify-content: center;
		text-align: center;
	}
	
    //picker-pup-end
  .address-action {
    position: relative;
    z-index: 100;
    margin-top: 20rpx;
    width: 100%;
    height: 128rpx;
    box-sizing: border-box;
  }
  .address-action .bar-cancel {
    position: relative;
    display: inline-block;
    margin-left: 20rpx;
    width: 42%;
    height: 88rpx;
    box-sizing: border-box;
    background-color: #A2A6AD;
    text-align: center;
    color: #ffffff;
    font-size: 28rpx;
    border-radius:40rpx;
    font-weight: normal;
    line-height: 88rpx;
  }
  .address-action .bar-save {
    position: absolute;
    display: inline-block;
    right: 20rpx;
    width: 42%;
    height: 88rpx;
    box-sizing: border-box;
    background-color: #DD2626;
    text-align: center;
    color: #ffffff;
    font-size: 28rpx;
    border-radius:40rpx;
    font-weight: normal;
    line-height:88rpx;
  }
  .addressEdit .address-bar {
    width:90%;
    height:88rpx;
    margin:5rpx auto;
    font-size:32rpx;
    text-align:center;
    line-height:88rpx;
    border: 1px solid #ccc;
    border-radius:40rpx;
    box-shadow: 0 6rpx 12rpx 0 rgba(0,0,0,.05);

  }
</style>
