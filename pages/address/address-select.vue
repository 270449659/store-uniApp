<template>
  <div class="addressSelect">
    <!-- content -->
    <div class="content">
      <!-- Address -->
	  <!-- {{addressList}} -->
      <div class="address-list" v-if="addressList.length > 0"  >
        <div class="list-item"  v-for="(item,index) in addressList" :id="index"  @click="goConfirmProduct(item.id)">
          <div class="item-checkbox"></div>
          <div class="item-info" >
            <div class="info-contact">
              <span class="contact-name">{{item.consignee}}</span><span class="contact-mobile">{{item.mobile}}</span>
              <span class="contact-default" v-if="item.is_default">默认</span>
              <!-- <span class="submit-select" v-if="item.is_default"  :data-id="item.id">设置默认</span> -->
              <!-- <span class="submit-select" @click="setDefaultAddress" v-else  :data-id="item.id">设置默认</span> -->
            </div>
            <div class="info-detail">
              <span v-for="value in item.regions">
                {{value.name}}
              </span>
              {{item.address}}
            </div>
          </div>
          <div class="item-edit" @click="goEdit(item.address_id,index)">
            <img src="/static/images/address/ind-edit.png"/>
          </div>
        </div>
      </div> <!--address-list end-->
      <div class="list-empty" v-if="empty && addressList.length <= 0">
        <img class="icon" src="/static/images/address/icon_address.png" >
        <div class="msg">暂无任何地址</div>
      </div>
      <div class="address-bar fixed-bottom">
        <div class="bar-create" @click="goAddsite">
          添加收货地址
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'category',

  data () {
    return {
      title:'选择地址',
      empty:false,
      defaultAddress: '',
    }
  },
 //  mounted:function () {
 // this.getAddressList();
 //  },
  onLoad(e){
  	this.isLogin=this.$isLogin();
  	this.userId= uni.getStorageSync('user_id');
  	this.token= uni.getStorageSync('token');
  	if(this.isLogin){
  		this.getAddressList();//地址
  	}
  	//this.goCart()//购物车
  },
   computed:{
		...mapState({	
			addressList: state => state.addressStore.addressList//地址
			
	}),
	},
  methods:{
    go:function () {
      history.go(-1)
    },

    goEdit(addressId,index) {//修改
    //  window.event.cancelBubble = true; //取消事件的冒泡机制
      // var addressList='';
      //  addressList=this.addressList[index];
       // window.localStorage.setItem('addressList',JSON.stringify(addressList));   //将checkedGoods转变为字符串存储
      //this.$router.push({path:"address-edit",query:{id:id}})
	  uni.navigateTo({
	  	url:'/pages/address/address-edit?addressId='+addressId			
	  });
    },//修改end
  
    goAddsite() {
	  uni.navigateTo({
	  	url:'/pages/address/address-edit?addressId='			
	  });
      //this.$router.push({path:"address-edit"})
    },

    goConfirmProduct:function(id){//返回确定订单
     let confirmProduct=this.$route.query.confirmProduct|| null;
     //console.log('confirmProduct',confirmProduct)
     if(confirmProduct){
        window.localStorage.setItem('consigneesId',id);
        history.go(-1)
      }
    },  //返回确定订单end

    // 设定默认收货地址
    // ecapi.consignee.setDefault
    setDefaultAddress(e) {
      let selfID = e.currentTarget.dataset.id;
      this.$axios.post('ecapi.consignee.setDefault',{ consignee: selfID})
        .then((res)=> {
          this.defaultAddress=selfID
          Toast('设定成功！')
          console.log(res);
          // console.log(categories);
        })
        .catch((error)=> {
          console.log(error);
        });
    },
    
    getAddressList () {
      this.$store.dispatch('setShopConsignee',{
      			 'user_id':this.userId,
      			 'token':this.token
      })

    },
    

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  header{
    z-index: 100;
    width: 100%;
    height: 88rpx;
    color: black;
    font-size:28rpx;
    background-color:#ffffff;
    border-bottom: #e2e2e2 1rpx solid;
  }
  .content{    width: 100%;

  /*  margin-top: 88rpx; */
    padding-bottom:150rpx;

  }
  .address-list {
    margin-top: 20rpx;
    position: relative;
    display: block;
    width: 100%;
    box-sizing: border-box;
    border-top: #e2e2e2 1rpx solid;
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
    position: relative;
    margin: 20rpx 20rpx 20rpx 20rpx;
    height: 88rpx;
    box-sizing: border-box;
    text-align: center;
    color: #ffffff;
    font-size: 28rpx;
    font-weight: normal;
    line-height: 88rpx;
    border-radius:40rpx;
    background-image: linear-gradient(135deg,#f2140c,#f2270c 70%,#f24d0c);

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
