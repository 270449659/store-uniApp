<template>
  <div class="address-select-modal">
	<!-- header -->
	<header class="header">
	  <h1 class="mint-header-title"> {{title}}</h1>
	  <div @click="onClose"  class="close" id="popupClose">X</div>
	</header> <!-- header end-->  
    <!-- content -->
	<!-- {{addressList}} -->
    <div class="content">
      <!-- Address -->
      <div class="address-list" v-if="addressList.length > 0" >
        <div class="list-item" v-for="(item,index) in addressList" :id="index"  @click="goConfirmProduct(item.address_id)" >
          <div class="item-checkbox"></div>
          <div class="item-info" >
            <div class="info-contact">
              <span class="contact-name">{{item.consignee}}</span><span class="contact-mobile">{{item.mobile}}</span>
              <span class="contact-default" v-if="item.is_default">默认</span> 
             
            </div>
            <div class="info-detail">
              <span >
               {{item.address_list}}
              </span>
             {{item.address}}
            </div>
          </div>
          <div class="item-edit" @click="goEdit(item.id,index)">
          <!--  <img src="../../assets/images/ind-edit.png"/> -->
          </div>
        </div>
      </div> <!--address-list end-->
      <div class="list-empty" v-else>
        <!-- <img class="icon" src="../../assets/images/icon_address.png" > -->
        <div class="msg">暂无任何地址</div>
      </div>
      <div class="address-bar">
        <div class="bar-create flex" @click="goAddsite">
          <span> 添加收货地址 </span>
          <span class="bar-create-icon">+</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'category',

  data () {
    return {
      title:'选择地址',
      //addressList:[],
      defaultAddress: '',
    }
  },
  mounted() {
  },
  computed:{
        addressList(){
        	return this.$store.state.addressStore.addressList//地址
        },	
  		
  	},	
  
   // props:['addressList'],
  methods:{
    goConfirmProduct(id){//返回确定订单
	console.log('1')
	        uni.setStorageSync('consigneesId',id);
			this.onClose()
           // window.localStorage.setItem('consigneesId',id);
           //this.$router.push({path:"details",query:{id:73}})
            //history.go(0)
            //this.onClose()
			
    },  //返回确定订单end
	onClose() {
		this.$emit('close',false,1)
	},
  }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .address-select-modal{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background:#fff;
    z-index: 9995;
    -webkit-transition: .3s;
    transition: .3s; 
  }
  header{
    position: relative;
    z-index: 100;
    width: 100%;
    height: 88rpx;
    color: black;
    font-size:28rpx;
    background-color:#ffffff;
    border-bottom: #e2e2e2 2rpx solid;
  }
  .header h1{
    margin: 0;
    padding: 0;
	font-size: 35rpx;
    text-align: center;
    height: 88rpx;
    line-height: 88rpx;
  }
  .header .close {
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
  .content{    
    width: 100%;
    margin-top:0;
    padding-bottom:0;
  }
  .address-list {
    margin-top:0;
    position: relative;
    display: block;
    width: 100%;
    box-sizing: border-box;
    /* border-top: #e2e2e2 1px solid; */
  }
  .address-list .list-item {
    position: relative;
    display: block;
    width: 100%;
    box-sizing: border-box;
    border-bottom: #e2e2e2 2rpx solid;
    background-color: #ffffff;
  }
  .address-list .list-item.active .item-checkbox {
    /*background-image: url(../image/check-on-single.png);*/
    background-repeat: no-repeat;
    background-size: cover;
  }
  .address-list .list-item .item-info {
    position: relative;
    display: block;
    padding-left: 20rpx;
    padding-right:88rpx;
    box-sizing: border-box;
  }
  .address-list .list-item .item-info .info-contact {
    position: relative;
    display: block;
    width: 100%;
    padding: 30rpx 0 20rpx 0;
    box-sizing: border-box;
    color: #404245;
    font-size: 28rpx;
    font-weight: normal;
    text-align: left;
    line-height: 36rpx;
  }
  .address-list .list-item .item-info .info-contact .contact-name{

  }
  .address-list .list-item .item-info .info-contact .contact-mobile{
    padding-left:50rpx;
  }
  .address-list .list-item .item-info .info-contact .contact-default {
    color: #e80714;
    border-radius: 20rpx;
    border: #e80714 solid 2rpx;
    box-sizing: border-box;
    padding: 4rpx 8rpx;
    font-size: 20rpx;
    font-weight: normal;
    text-align: left;
    margin-left: 8rpx;
  }
  .address-list  .list-item .item-info .info-contact .submit-select {
 position:relative;
    box-sizing:border-box;
    color:#404245;
    font-size:28rpx;
    font-weight:normal;
    text-align:left;
    line-height:48rpx;
    top:-5rpx;
    padding-left:30rpx;

  }

  .address-list .list-item .item-info .info-detail {
    position: relative;
    display: block;
    width: 100%;
    padding: 0 0 30rpx 0;
    box-sizing: border-box;
    color: #888888;
    font-size: 24rpx;
    font-weight: normal;
    text-align: left;
    line-height: 28rpx;
  }
  .address-list .list-item .item-edit {
    margin-top: -88rpx;
    position: absolute;
    right: 0;
    top: 50%;
    display: block;
    width: 88rpx;
    height: 88rpx;
    box-sizing: border-box;
  }
  .address-list .list-item .item-edit {
    margin-top: -44rpx;
    position: absolute;
    right: 0;
    top: 50%;
    display: block;
    width: 88rpx;
    height: 88rpx;
    box-sizing: border-box;
  }
  .address-list .list-item .item-edit img {
    margin-top: 22rpx;
    margin-left: 22rpx;
    display: block;
    width: 40rpx;
    height: 40rpx;
    box-sizing: border-box;
  }

  .address-bar {
    position: relative;
    z-index: 100;
    width: 100%;
    height: 128rpx;
    box-sizing: border-box;
  }
  .address-bar .bar-create {
    align-items: center;
    justify-content: center;
    position: relative;
    margin: 20rpx 20rpx 20rpx 20rpx;
    height: 88rpx;
    box-sizing: border-box;
    background-color: #f42e14;
    text-align: center;
    color: #ffffff;
    font-size: 28rpx;
    font-weight: normal;
    line-height: 88rpx;
  }
  .address-bar .bar-create .bar-create-icon{
    width: 28rpx;
    height:28rpx;
    margin-left: 15rpx;
    line-height: 28rpx;
    /* display: block; */
    border: 2rpx solid #ffffff;
    border-radius:20rpx;
  }
  .list-empty {
    height:100%;
    width:100%;
    padding:50% 0;
    display:flex;
    justify-content:center;
    flex-direction:column;
    align-items:center;

  }
  .list-empty .icon {
    height:200rpx;
    width:200rpx;

  }

  .list-empty .msg {
    line-height:40rpx;
    font-size:24rpx;
    color:#999;

  }
</style>
