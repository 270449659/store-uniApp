<template>
	<view class="content login">
		<view class="auth-layout">
		  <view class="auth-panel">  <!-- 头部 -->
			  <image class="logo" src="/static/logo.png"></image>
			  <view class="title">Hi,欢迎来到my-store</view>
			  <text class="title-explain"> ——三亿家庭购物选择的APP</text>
		 </view>   <!-- 头部 end-->
		 <view class="form-warrap"> <!-- 内容-->
			 <form @submit="formSubmit">  <!-- 登录表单 -->
				 <view class="uni-common-mt">
					<view class="item-input userName flex"> <!-- 用户名 -->
						<!-- <label class="global-roaming">+86</label> -->
						<view class="down-icon"> </view>		
						<input type="text" name="userName" class="userName-input" v-model="userName" placeholder="请输入用户名" />
					</view> <!-- 用户名 end-->
					<!-- {{pwdInputType}} -->
					<view  v-if="passwordLogin" class="item-input password flex"> <!-- 密码 -->
						<!-- <input id="pwdinput" class="pwdinput" :type="pwdInputType" name="password" v-model="password" placeholder="请输入密码" /> -->
						<input id="pwdinput" class="pwdinput" name="password" v-model="password" placeholder="请输入密码" />
						 <view class="passwordCodeBtn"> 
							<view @click="passwordCode(false)" v-if="passwordBtn_type" class="passwordBtn f-w-five-hundred" type="primary" plain="true">
								  <image class="logo" src="/static/pwd-show-icon.png"></image>
							</view>
							<view @click="passwordCode(true)" v-else class="passwordBtn f-w-five-hundred" type="primary" plain="true">
								  <image class="logo" src="/static/pwd-close-icon.png"></image>
							</view>
						 </view>				
					</view> <!-- 密码 end-->
			         <view v-else class="item-input verification flex"> <!-- 验证码 -->
			         	<input type="number" name="sendVerify" v-model="sendVerify" placeholder="请输入取验证码" />
			         	 <view class="verifiCodeBtn">
			         		<button @click="sendVerifyCode" v-if="button_type"  class="verifiBtn f-w-five-hundred" type="primary" plain="true">{{codeBtn.text}}</button>
			         	     <text  class="verifiBtn f-w-five-hundred"  v-else>{{ button_text }}</text>
			         	 </view>				
			         </view> <!-- 验证码 end-->
					 <view v-if="tips" class="tips">忘记密码？</view>
					 <view v-else class="tips">收不到验证码？</view>
					  <view class="btn-bar btn-bar-radius">  <!-- 登录按钮 -->
					  <button v-show="formIndex == 0" class="btn btn-red btn-register" formType="submit">登录</button>
						<button v-show="formIndex == 1" class="btn btn-red btn-register" formType="submit">验证并登录</button>
						
						<navigator url="../register/register"  hover-class="none"><button class="btn btn-red btn-register">欢迎注册my-store</button></navigator>
					  </view><!-- 登录按钮 end-->
				 </view>  
			 </form> <!-- 登录表单 -->
			 <view class="explain">注册或登录即您将同意<text>《免责声明》</text>及<text>《隐私条款》</text>等其他规则</view>  
			 <view v-if="verificationBtn" class="other-login">
				<view class="other-login-title"> 其他登录方式</view>  
				<view @tap="pushPath" data-type="verification"  class="other-login-con flex"> 
				  <image src="/static/WeChatSubscriptio-icon.png"></image>
				</view>  
				<view  @tap="pushPath" data-type="verification" class="other-login-words">微信公众号登录</view> 
			</view>  
			<view v-else class="other-login">
				<view class="other-login-title"> 其他登录方式</view>  
				<view @tap="pushPath" data-type="password"  class="other-login-con flex"> 
				  <image  src="/static/WeChatSubscriptio-icon.png"></image>
				</view>  
				<view  @tap="pushPath" data-type="password" class="other-login-words">密码登录</view> 
			</view>  
		 </view> <!-- 内容  end-->
		</view>
	</view>
</template>
<script>
	import {
			mapState,
			mapMutations,
			mapActions
		} from 'vuex'
	var graceChecker = require("@/common/graceChecker.js");
	
	export default {
		data() {
			return {	
				title: 'Hello',
				userName:'', //用户账号
				password:'', //密码
				pwdInputType:'password',//密码输入类型
			    passwordBtn_type:true, //隐藏或显示密码
				sendVerify:'', //验证码
				button_type:true, //获取验证码按钮
				codeBtn: {
					text: '获取验证码',
					},
				button_text:'10s重发',
				passwordLogin:true,//密码登录
				verificationBtn:true,  //验证码按钮
				tips:true,//忘记密码或忘记验证码
				formIndex: 0,//登录按钮
			}
		},
		components:{
			
		},
		onLoad() {

		},
		methods: {
			passwordCode(index){
			   //console.log('index',index)
			   this.button_type=index;   		    
				if(index){
					this.pwdInputType="password"
				}else{
					 this.pwdInputType = "text"
				}
				//console.log('pwdinput',this.pwdInputType)
			   // if(pwdinput.type === "password"){
				  //  pwdinput.type = "text"
			   // }else{
				  //  pwdinput.type = "password"
			  //  }
			
			},
			// 提交登录
			formSubmit(e){		
				var rule = [
					{name:"userName", checkType : "notnull", checkRule:" ",  errorMsg:"用户名不能为空"},
					// {name:"mobile", checkType : "phoneno", checkRule:" ",  errorMsg:"手机号码不正确"},
					{name:"password", checkType : "notnull", checkRule:"",  errorMsg:"密码不能为空"},	
				];
				var rule_Verify = [
					{name:"mobile", checkType : "notnull", checkRule:" ",  errorMsg:"手机号码不能为空"},
					{name:"mobile", checkType : "phoneno", checkRule:" ",  errorMsg:"手机号码不正确"},
					{name:"sendVerify", checkType : "notnull", checkRule:"",  errorMsg:"验证码不正确"}
				];
				const formIndex = this.formIndex;
				if (0 == formIndex) {
					//进行表单检查
					var formData = e.detail.value;
					console.log(formData)
					let checkRes = graceChecker.check(formData, rule);
					if(checkRes){
						this.$store.dispatch('userPwdLogin', {
							username: e.detail.value.userName,
							password: e.detail.value.password
						})
						//uni.reLaunch({
						//	url:'/pages/home/home'
						//});
					}else{
						uni.showToast({ title: graceChecker.error, icon: "none" });
					}
					
				}else if(1 == formIndex){
					//进行表单检查
					var formData = e.detail.value;
					//console.log(formData)
					let checkRes = graceChecker.check(formData, rule_Verify);
					if(checkRes){
						// uni.reLaunch({
						// 	url:'/pages/home/home'
						// });
					}else{
						uni.showToast({ title: graceChecker.error, icon: "none" });
					}
				}
				
				
			}, // 提交登录 end
			
			// 验证码登录
			 pushPath(e) {
			      let type = e.currentTarget.dataset.type;
			      console.log('type',type)
			      if (type === 'verification') {  
					  this.formIndex=1;
					  this.passwordLogin=false;
					  this.verificationBtn=false;
					  this.tips=false;
				  }else{
					 this.formIndex=0;
					 this.passwordLogin=true; 
					 this.verificationBtn=true; 
					 this.tips=true; 
				  }
				
		    },
			// 验证码登录 eng
			
			//获取验证码
			sendVerifyCode(){	
				var rule = [
						{name:"mobile", checkType : "notnull", checkRule:" ",  errorMsg:"手机号码不能为空"},
						{name:"mobile", checkType : "phoneno", checkRule:" ",  errorMsg:"手机号码不正确"},
				];
				let o = {			       
					 mobile: this.mobile,
				};
				
				//进行表单检查
				var formData = o;
				//console.log(formData)
				var checkRes = graceChecker.check(formData, rule);	
				if(checkRes){			
					let res='success';
					if (res == 'success') {
					this.button_type = false
					let second = 10
					const timer = setInterval(() => {
						second--
						if (second) {
							this.button_text = + second + 's重发'
						} else {
							this.codeBtn.text = '重新发送';
							this.button_type = true
							clearInterval(timer);
						}
					}, 1000)
					}
					
				}else{
					uni.showToast({ title: graceChecker.error, icon: "none" });
				}
					
			},//获取验证码 end
		}
	}
</script>
<style>
	page{
	background-color:#fff;
	}
	.content {
		/* display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center; */
	}
	.auth-layout {
	    padding:0 48rpx 0 48rpx;
	}
	 /* 头部 */
	.auth-panel{
		padding: 1rpx 0;	
		/* display: flex;
		justify-content: center;
    	align-items: center; */
		box-sizing:content-box
	}      
	.logo {
		width:154rpx;
		height: 104rpx;
		margin:60rpx 0 0 0;	
	}
	.auth-panel .title{
		margin:94rpx 0 19rpx 0;
		height:51rpx;
		font-size:50rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(26,26,26,1);
		line-height:39rpx;	
	}
    .auth-panel .title-explain{
		 height:24rpx;
		 font-size:25rpx;
		 font-family:PingFang SC;
		 font-weight:500;
		 color:rgba(153,153,153,1);
		 line-height:39rpx;	 
	}
	/* 头部 end*/
	
	/* 内容*/
	.form-warrap{
		
	}
	.item-input{
		align-items: center;
		padding: 55.5rpx 0 12rpx 0;
		border-bottom: 1px solid #DDDDDD;
	}
	 .item-input label{ width: 200rpx; height: 1.4rem; line-height: 1.4rem; }
	 .item-input uni-input{
		display: flex;
		flex: 1;
		box-sizing: border-box;
		width: 100%;
	 	height:33rpx;
		box-sizing: border-box;
	 	font-size:33rpx;
	 	font-family:PingFang SC;
	 	font-weight:500;
	 	color:#999999;
	 	line-height:33rpx;		
	 }
	 .item-input .pwdinput{
	 	height:33rpx;
	 	font-size:33rpx;
	 	font-family:PingFang SC;
	 	font-weight:500;
	 	color:#999999;
	 	line-height:33rpx;
	 }

	 
	/* 密码*/
	.item-input.password{
		/* padding-left:140rpx; */
		justify-content:space-between;
	}
	.item-input.password .pwdinput{
		border: none;	
		outline:none;
	}
	.item-input .passwordCodeBtn .passwordBtn{
		 display: block;
		 width: 35rpx;
		 height: 26rpx;
		 line-height:26rpx;	
		 padding:0 0 0 15rpx; 
	 }
	 .item-input .passwordCodeBtn .passwordBtn image{
	 	 width: 100%;
	 	 height:100%;
	 	 margin:0;
	  }
	 /* 密码 end*/
	 /* 验证码 */
	 .item-input.verification{
	 	/* padding-left:140rpx; */
	 	 justify-content:space-between;
	 }
	 .item-input .verifiCodeBtn{
	 	/* height: 44rpx; */
	 }
	 .item-input .verifiCodeBtn .verifiBtn{
	 	 display: block;
	 	 font-size:25rpx;
	 	 line-height:25rpx;	
	 	 color: #F53120;
	 	 padding:10rpx 20rpx 10rpx 20rpx;
	 	 border:2rpx solid #F53120;
	 	 border-radius:50rpx;
	  }
	  /* 验证码 end*/
	  
	 .tips{
	 		 height:25rpx;
	 		 line-height:25rpx;
	 		 font-size:25rpx;
	 		 font-family:PingFang SC;
	 		 font-weight:500;
	 		 color:#F53120;
	 		 margin-top:23rpx;
	 }
	 /* 提交按钮 */
	 .btn-bar .btn-register{
		 margin-top:45rpx;
	 }
	 .btn-register{
		 line-height:93rpx;
		 height:93rpx;
		 color: #FFFFFF;
		 background:linear-gradient(90deg,rgba(244,46,20,1),rgba(246,44,67,1),rgba(241,130,0,1));
		 border-radius:50rpx;
	 }	
	 /* 提交按钮 end*/
	 
	 /* 底部说明 */
	 .explain{
		 margin-top:31.5rpx;
		 text-align: center;
		 font-size:19rpx;
		 height:19rpx;
		 line-height:30rpx;
		 font-family:PingFang SC;
		 font-weight:500;
		 color:#999999; 
	 }
	 .explain text{
		 color: #F42E14;
	 }
	 
	 /* 底部说明 end*/
	 
	
	   
	   
	 /* 其他登录 */
	  .other-login {
		  margin-top: 43rpx;
	  }
	  .other-login .other-login-title{
		  height:29rpx;
		  font-size:31rpx;
		  font-family:PingFang SC;
		  font-weight:500;
		  color:#999999;
	   }
	   .other-login .other-login-con {
		   position:relative;
		   justify-content:center;
		   margin-top: 30rpx;	  
	   }
	   .other-login .other-login-con image{
		  width: 88rpx;
		  height:88rpx;;
		  margin:0;    
	   }
	   .other-login-words{
		    margin-top:17rpx;	 
		   height:25rpx;
		   font-size:25rpx;
		   font-family:PingFang SC;
		   font-weight:500;
		   color:rgba(26,26,26,1);
		  text-align: center;
	   }
	   /* 其他登录 end*/
	/* 内容 end*/
</style>
