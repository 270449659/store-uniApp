(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-checkout-checkoutIndex"],{"5f4f":function(t,i,o){"use strict";var e=o("ce9a"),n=o.n(e);n.a},"78da":function(t,i,o){"use strict";var e=o("4ea4");Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var n=e(o("5530")),s=o("2f62"),r=e(o("2334")),a={components:{uniPopup:r.default},data:function(){return{title:"Hello",textareaComment:"",orderPrice:!0,canPurchase:!0,evaluateRadioItems:[{value:"0",name:"非常满意"},{value:"1",name:"满意",checked:"true"},{value:"2",name:"不满意"}],current:0,currentTwo:0,confirmDistributionPop:!1,deliveryId:0,deliveryTwoId:0,deliveryTwoName:""}},onLoad:function(t){this.goods_id=t.goodsId,this.isLogin=this.$isLogin(),this.userId=uni.getStorageSync("user_id"),this.token=uni.getStorageSync("token"),this.gocCheckoutList()},computed:(0,n.default)((0,n.default)({},(0,s.mapState)({checkoutInfo:function(t){return t.orderStore.checkoutInfo},expressInfo:function(t){return t.orderStore.expressInfo},expressTwoInfo:function(t){return t.orderStore.expressTwoInfo},orderId:function(t){return t.orderStore.orderId},defaultConsignees:function(t){return t.addressStore.defaultConsignees}})),{},{addressList:function(){var t=uni.getStorageSync("consigneesId");return console.log("12",t),t?this.defaultConsignees:"{}"==JSON.stringify(this.checkoutInfo)?"":this.checkoutInfo.address_list},total:function(){return"{}"==JSON.stringify(this.checkoutInfo)?"":this.checkoutInfo.total}}),methods:{checkoutOrder:function(){this.deliveryTwoId||this.deliveryTwoName?(uni.showLoading({title:"加载中"}),this.$store.commit("setSubmitOrder",{address_id:this.addressList.address_id,productId:this.goods_id,shipping_id:this.deliveryTwoId,bonus_id:"",point:0,p_type:!0,o_time:void 0,inv_payee:"",tax:"",tax_type:"n",tax_num:"",ral:!1,superpack:!1,superGoodsid:void 0,integralGoodsid:void 0,pack_fee:0,pack_name:void 0,inv_type:"",result_spike:void 0,goods_id:void 0,delivery_name:this.deliveryTwoName,delivery_id:this.deliveryId,pintuan:void 0,pintuanGoodsId:void 0,pintuanNumber:void 0,pintuanOrderId:void 0,msg:"",jifennum:"",accesstoken:"f8bf93222cbb7264d2ba02f0ea8bd1db",user_id:this.userId,platform:"H5",app_key:"wolf100000001",format:"JSON",api_version:"2.0",req_source:"app",token:this.token})):uni.showToast({title:"请选择配送方式",icon:"error",duration:2e3})},gocCheckoutList:function(){this.$store.dispatch("setCheckoutList",{platform:"H5",productId:this.goods_id,shipping:void 0,shipping_id:"",p_type:!0,tax_type:"n",shipping_type:"a",app_key:"wolf100000001",format:"JSON",api_version:"2.0",req_source:"app",user_id:this.userId,token:this.token,accesstoken:this.token})},goExpress:function(){this.$store.commit("setExpressList",{platform:"H5",address_id:2,user_id:this.userId,token:this.token}),this.$refs.popup.open("bottom")},evaluateRadioChange:function(t){this.confirmDistributionPop=!0,this.$store.commit("setExpressTwoList",{platform:"H5",address_id:2,user_id:this.userId,token:this.token}),console.log("ss");for(var i=0;i<this.expressInfo.length;i++)if(this.expressInfo[i].delivery_id===t.detail.value){this.current=i,this.deliveryId=this.expressInfo[i].delivery_id;break}},evaluateRadioChangeTwo:function(t){console.log("ss");for(var i=0;i<this.expressTwoInfo.length;i++)if(this.expressTwoInfo[i].delivery_id===t.detail.value){this.currentTwo=i,this.deliveryTwoId=this.expressTwoInfo[i].delivery_id,this.deliveryTwoName=this.expressTwoInfo[i].delivery_name;break}this.confirmDistributionPop=!1,this.$refs.popup.close()}},watch:{orderId:function(){console.log("orderId",this.orderId),uni.navigateTo({url:"/pages/payment/paymentIndex?orderId="+this.orderId})}}};i.default=a},"7c02":function(t,i,o){"use strict";var e;o.d(i,"b",(function(){return n})),o.d(i,"c",(function(){return s})),o.d(i,"a",(function(){return e}));var n=function(){var t=this,i=t.$createElement,o=t._self._c||i;return o("v-uni-view",{staticClass:"confirm"},[o("v-uni-view",{staticClass:"content"},[o("v-uni-view",{staticClass:"confirm-address"},[o("v-uni-view",{staticClass:"address-con"},[o("v-uni-view",{staticClass:"address-contact"},[o("v-uni-text",{staticClass:"mgr5"},[t._v(t._s(t.addressList.consignee))]),t._v(t._s(t.addressList.mobile))],1),o("v-uni-view",{staticClass:"address-detail mgt10"},[t.addressList.is_default?o("span",{staticClass:"moren"},[t._v("默认")]):t._e(),o("v-uni-text",[t._v(t._s(t.addressList.address))])],1)],1)],1),o("v-uni-view",{staticClass:"confirm-info"},[t._l(t.checkoutInfo.goods_list,(function(i){return o("v-uni-view",{staticClass:"confirm-goods"},[o("v-uni-view",{staticClass:"goods-photo"},[o("v-uni-image",{attrs:{src:i.goods_thumb}})],1),o("v-uni-view",{staticClass:"goods-info"},[o("v-uni-view",{staticClass:"info-name"},[t._v(t._s(i.goods_name))]),i.goods_attr?o("v-uni-view",{staticClass:"info-attr"},[o("v-uni-text",[t._v(t._s(i.goods_attr))])],1):t._e(),o("v-uni-view",{staticClass:"info-price"},[t._v(t._s(i.goods_price))]),o("v-uni-view",{staticClass:"info-amount"},[t._v(t._s(i.goods_number))])],1)],1)})),o("v-uni-view",{staticClass:"confirm-list confirm-distribution",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.goExpress.apply(void 0,arguments)}}},[o("v-uni-text",{staticClass:"left"},[t._v("配送")]),t.deliveryTwoName?o("v-uni-view",{staticClass:"right distribution-mode"},[t._v(t._s(t.deliveryTwoName))]):o("v-uni-view",{staticClass:"right distribution-mode"},[t._v("选择配送方式")])],1),o("v-uni-view",{staticClass:"confirm-list confirm-invoice"},[o("v-uni-text",{staticClass:"left"},[t._v("发票")]),o("v-uni-view",{staticClass:"right invoice-mode"},[t._v("不开发票")])],1),o("v-uni-view",{staticClass:"confirm-textarea"},[o("v-uni-textarea",{attrs:{type:"text",placeholder:"买家留言"},model:{value:t.textareaComment,callback:function(i){t.textareaComment=i},expression:"textareaComment"}})],1)],2),o("v-uni-view",{staticClass:"confirm-summury"},[t.checkoutInfo.total.goods_price?o("v-uni-view",{staticClass:"summury-total flex-justify-content-s-b"},[t._v("订单总额"),o("v-uni-text",{staticClass:"total-price"},[t._v("+￥"+t._s(t.checkoutInfo.total.goods_price))])],1):t._e(),t.checkoutInfo.total.total_fee?o("v-uni-view",{staticClass:"summury-detail flex-justify-content-s-b"},[t._v("商品总额"),o("v-uni-text",{staticClass:"total-price"},[t._v("+￥"+t._s(t.total.total_fee))])],1):t._e(),t.checkoutInfo.total.shipping_fee?o("v-uni-view",{staticClass:"summury-detail flex-justify-content-s-b"},[t._v("运费金额"),o("v-uni-text",{staticClass:"total-price"},[t._v("+￥"+t._s(t.checkoutInfo.total.shipping_fee))])],1):t._e()],1),t.orderPrice?o("v-uni-view",{staticClass:"confirm-submit fixed-bottom flex-justify-content-s-b"},[o("v-uni-view",{staticClass:"submit-total"},[o("v-uni-view",{staticClass:"total-price"},[t._v("￥"+t._s(t.checkoutInfo.total.goods_price))])],1),o("v-uni-view",{staticClass:"submit-button dark",class:{active:t.canPurchase},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.checkoutOrder.apply(void 0,arguments)}}},[t._v("提交订单并支付")])],1):t._e(),o("uniPopup",{ref:"popup",attrs:{type:"bottom"}},[o("v-uni-view",{staticClass:"confirm-distribution-modal"},[o("v-uni-view",{staticClass:"main"},[o("v-uni-view",{staticClass:"list"},[o("v-uni-radio-group",{on:{change:function(i){arguments[0]=i=t.$handleEvent(i),t.evaluateRadioChange.apply(void 0,arguments)}}},t._l(t.expressInfo,(function(i,e){return o("v-uni-label",{key:i.delivery_id,staticClass:"item flex-justify-content-s-b uni-list-cell uni-list-cell-pd"},[o("v-uni-view",{staticClass:"flex left"},[o("v-uni-radio",{staticClass:"flex-align-items-center",attrs:{value:i.delivery_id,checked:e===t.current}}),o("v-uni-view",[t._v(t._s(i.delivery_name))])],1),o("v-uni-view",{staticClass:"right"},[o("v-uni-image",{attrs:{src:"/static/images/goods/nav-right.png"}})],1)],1)})),1)],1)],1)],1)],1),t.confirmDistributionPop?o("v-uni-view",{staticClass:"confirm-distribution-pop"},[o("v-uni-view",{staticClass:"mask"}),o("v-uni-view",{staticClass:"modalDlg"},[o("v-uni-view",{staticClass:"modalDlg-box"},[o("v-uni-radio-group",{on:{change:function(i){arguments[0]=i=t.$handleEvent(i),t.evaluateRadioChangeTwo.apply(void 0,arguments)}}},t._l(t.expressTwoInfo,(function(i,e){return o("v-uni-label",{key:i.delivery_id,staticClass:"item flex-justify-content-s-b uni-list-cell uni-list-cell-pd"},[o("v-uni-view",{staticClass:"right"},[t._v(t._s(i.delivery_name))]),o("v-uni-view",{staticClass:"left"},[o("v-uni-radio",{staticClass:"flex-align-items-center",attrs:{value:i.delivery_id,checked:e===t.currentTwo}})],1)],1)})),1)],1)],1)],1):t._e()],1)],1)},s=[]},"8f0c":function(t,i,o){"use strict";o.r(i);var e=o("78da"),n=o.n(e);for(var s in e)"default"!==s&&function(t){o.d(i,t,(function(){return e[t]}))}(s);i["default"]=n.a},"8f9b":function(t,i,o){var e=o("24fb");i=e(!1),i.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */uni-view[data-v-05198604]{box-sizing:border-box}.confirm .content[data-v-05198604]{padding:%?30?% %?30?% 0 %?30?%}.confirm .content .confirm-address[data-v-05198604]{padding:%?20?% %?30?% %?30?% %?30?%;border-radius:%?10?%;background:#fff url(https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/address-bg-bd.png) -7px bottom repeat-x;background-size:64px 5px}.confirm .content .confirm-address .address-con[data-v-05198604]{position:relative}.confirm .content .confirm-address .address-con .address-contact[data-v-05198604]{font-size:%?35?%}.confirm .content .confirm-address .address-con .address-detail[data-v-05198604]{font-size:%?30?%;color:#666}.confirm .content .confirm-address .address-con .address-detail .moren[data-v-05198604]{font-size:%?25?%;color:#fff;padding:%?2?% %?6?%;background:#e60012;margin:0 %?10?% 0 auto;border-radius:%?10?%}.confirm .content .confirm-address .address-con[data-v-05198604]::after{content:"";position:absolute;display:inline-block;width:%?12?%;height:%?12?%;border-top:%?4?% solid #ccc;border-left:%?4?% solid #ccc;top:50%;-webkit-transform:translateY(-50%) rotate(135deg);transform:translateY(-50%) rotate(135deg);right:%?10?%}.confirm .content .confirm-info[data-v-05198604]{position:relative;margin-top:%?20?%;background:#fff;padding:%?20?% %?30?% %?20?% %?30?%;border-radius:%?10?%}.confirm .content .confirm-info .confirm-goods[data-v-05198604]{position:relative;width:100%;height:%?200?%}.confirm .content .confirm-info .confirm-goods .goods-photo[data-v-05198604]{position:absolute;top:0;left:0;width:%?160?%;height:%?160?%;overflow:hidden;border-radius:%?10?%}.confirm .content .confirm-info .confirm-goods .goods-photo uni-image[data-v-05198604]{width:100%;height:100%}.confirm .content .confirm-info .confirm-goods .goods-info[data-v-05198604]{position:relative;height:100%;margin-left:%?200?%;margin-right:%?10?%;overflow:hidden}.confirm .content .confirm-info .confirm-goods .goods-info .info-name[data-v-05198604]{color:#333;line-height:%?40?%;margin-bottom:%?10?%;font-size:%?28?%;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}.confirm .content .confirm-info .confirm-goods .goods-info .info-attr[data-v-05198604]{margin-bottom:%?12?%;font-size:%?24?%;color:#999;line-height:1}.confirm .content .confirm-info .confirm-goods .goods-info .info-price[data-v-05198604]{position:absolute;left:0;bottom:%?5?%;color:#f2270c;font-size:%?30?%}.confirm .content .confirm-info .confirm-goods .goods-info .info-amount[data-v-05198604]{position:absolute;right:0;bottom:%?5?%;color:#888;font-size:%?30?%}.confirm .content .confirm-info .confirm-list[data-v-05198604]{height:%?108?%;line-height:%?108?%;position:relative;font-size:%?30?%}.confirm .content .confirm-info .confirm-list .left[data-v-05198604]{position:absolute}.confirm .content .confirm-info .confirm-list .right[data-v-05198604]{text-align:right;padding-right:%?50?%}.confirm .content .confirm-info .confirm-list .right[data-v-05198604]::after{content:"";position:absolute;display:inline-block;width:%?12?%;height:%?12?%;border-top:%?4?% solid #ccc;border-left:%?4?% solid #ccc;top:50%;-webkit-transform:translateY(-50%) rotate(135deg);transform:translateY(-50%) rotate(135deg);right:%?10?%}.confirm .content .confirm-info .confirm-textarea uni-textarea[data-v-05198604]{height:%?130?%;min-height:%?130?%;padding:%?15?%;margin-top:%?20?%;background-color:#f5f5f5;border:none;text-align:left;overflow:hidden;color:#404245;font-size:%?28?%;font-weight:400;line-height:%?32?%}.confirm .content .confirm-summury[data-v-05198604]{background-color:#fff;margin-top:%?20?%;padding:0 %?16?% %?8?% %?16?%;border-radius:%?10?%;color:#888}.confirm .content .confirm-summury .summury-total[data-v-05198604]{color:#404245;height:%?68?%;font-weight:700;line-height:%?68?%}.confirm .content .confirm-summury .summury-total .total-price[data-v-05198604]{font-weight:700}.confirm .content .confirm-summury uni-text[data-v-05198604]{color:#e60012}.confirm .content .confirm-submit[data-v-05198604]{width:100%;height:%?88?%;box-sizing:border-box;border-top:#e2e2e2 2px solid;background-color:#fff;left:0}.confirm .content .confirm-submit .submit-total .total-price[data-v-05198604]{height:%?40?%;color:#e60012;font-size:%?38?%;font-weight:400;text-align:right;line-height:%?40?%}.confirm .content .confirm-submit .submit-total .total-discount[data-v-05198604]{height:%?30?%;color:#64686d;font-size:%?24?%;font-weight:700;text-align:right;line-height:%?30?%}.confirm .content .confirm-submit .submit-button[data-v-05198604]{width:40%;height:100%;font-size:%?26?%;font-weight:700;box-sizing:border-box;color:#404245;line-height:%?88?%;text-align:center;opacity:.25}.confirm .content .confirm-submit .submit-button.active[data-v-05198604]{opacity:1}.confirm .content .confirm-submit .submit-button.dark[data-v-05198604]{color:#fff;background-color:#555}.confirm .content .confirm-submit .submit-button.dark.active[data-v-05198604]{color:#fff;background-color:#f91515}.confirm .content .confirm-distribution-modal .main[data-v-05198604]{position:absolute;-webkit-transform:translateZ(0);transform:translateZ(0);bottom:0;width:100%;z-index:210;max-height:%?1000?%;min-height:%?400?%;background-color:#fff;border-top-left-radius:%?20?%;border-top-right-radius:%?20?%;overflow:hidden}.confirm .content .confirm-distribution-modal .main .list .item[data-v-05198604]{padding:%?20?% %?18?% %?16?% %?18?%;border-bottom:1px solid #e4e4e4}.confirm .content .confirm-distribution-modal .main .list .item .right[data-v-05198604]{width:%?16?%;height:%?20?%;line-height:%?25?%;font-size:%?24?%}.confirm .content .confirm-distribution-modal .main .list .item .right uni-image[data-v-05198604]{width:%?16?%;height:%?20?%}.confirm .content .confirm-distribution-pop .mask[data-v-05198604]{width:100%;height:100%;position:fixed;top:0;left:0;background:#000;z-index:9000;opacity:.6}.confirm .content .confirm-distribution-pop .modalDlg[data-v-05198604]{width:%?700?%;position:fixed;right:0;left:0;top:40%;z-index:9999;margin:0 auto;background-color:#fff;border-radius:%?23?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.confirm .content .confirm-distribution-pop .modalDlg .modalDlg-box[data-v-05198604]{width:100%}.confirm .content .confirm-distribution-pop .modalDlg .modalDlg-box .item[data-v-05198604]{padding:%?20?% 0 %?16?% %?18?%;border-bottom:1px solid #e4e4e4}.confirm .content .confirm-distribution-pop .modalDlg .modalDlg-box .item .right[data-v-05198604]{height:%?25?%;line-height:%?25?%;font-size:%?24?%}.confirm .content .confirm-distribution-pop .modalDlg .modalDlg-box .item[data-v-05198604]:last-child{border-bottom:none}',""]),t.exports=i},ce9a:function(t,i,o){var e=o("8f9b");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var n=o("4f06").default;n("2841e8b9",e,!0,{sourceMap:!1,shadowMode:!1})},db88:function(t,i,o){"use strict";o.r(i);var e=o("7c02"),n=o("8f0c");for(var s in n)"default"!==s&&function(t){o.d(i,t,(function(){return n[t]}))}(s);o("5f4f");var r,a=o("f0c5"),c=Object(a["a"])(n["default"],e["b"],e["c"],!1,null,"05198604",null,!1,e["a"],r);i["default"]=c.exports}}]);