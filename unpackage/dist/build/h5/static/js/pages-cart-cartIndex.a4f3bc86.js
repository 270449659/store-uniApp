(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-cart-cartIndex"],{"1fc2":function(t,e,i){"use strict";var o=i("4ea4");i("4de4"),i("d81d"),i("a9e3"),i("b680"),i("e25e"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=o(i("5530")),n=i("2f62"),s={data:function(){return{title:"Hello",checkedGoodsLength:!1,cartTotals:{checkedGoodsCount:0,checkedGoodsPrices:0},checkedAllStatus:!1}},onLoad:function(){this.userId=uni.getStorageSync("user_id"),this.token=uni.getStorageSync("token");var t=new Date,e=t.getFullYear(),i=t.getMonth()+1,o=t.getDate(),a=t.getHours(),n=t.getMinutes(),s=t.getSeconds();console.log("s2",e+"-"+i+"-"+o+" "+a+":"+n+":"+s),this.times=e+"-"+i+"-"+o+" "+a+":"+n+":"+s,console.log("this.times",this.times),this.getCartList(0)},computed:(0,a.default)((0,a.default)({},(0,n.mapState)({cartList:function(t){return t.shopping.cartList},updateNumber:function(t){return t.shopping.updateNumber},cartTotal:function(t){return t.shopping.cartTotal},deleteCart:function(t){return t.shopping.deleteCart}})),{},{cartLists:{get:function(){var t=this,e=this.$store.state.shopping.cartList,i=0,o=e.map((function(e,o,a){return"true"==e.is_checked?(t.checkedGoodsLength=!0,console.log("true"),i++,e.is_checked=!0):"false"==e.is_checked?e.is_checked=!1:e.is_checked=e.is_checked,e}));return e.length==i&&this.checkedAll(),o},set:function(t){this.$store.state.shopping.cartList=t}},cartTotalCount:function(){var t="{}"==JSON.stringify(this.cartTotal)?"":this.cartTotal;return t}}),methods:{checkoutOrder:function(){console.log("checkoutOrder");var t=this.cartLists.filter((function(t,e,i){if(!0===t.is_checked)return!0}));if(t.length<=0)return uni.showToast({title:"请先选择商品",duration:2e3}),this.checkedGoodsLength=!1,!1;uni.navigateTo({url:"/pages/checkout/checkoutIndex?goodsId="+this.goods_id})},checkedItem:function(t){var e,i=this,o=void 0!=t.target?t.target.dataset.itemIndex:t,a=0,n=this.cartLists.map((function(t,e,n){return e==o&&(t.is_checked=!t.is_checked,i.recId=t.rec_id,i.ischecked=t.is_checked),t.is_checked&&a++,t}));n.length==a?this.checkedAll():this.checkedAllStatus=!1,e=this.ischecked?1:0,this.$store.commit("shopping/setCartCheck",{platform:"H5",id:this.recId,ischecked:e,user_id:this.userId,token:this.token,accesstoken:this.token}),this.cartLists=n,this.getCheckedGoodsPrice(n),console.log("1")},checkedAll:function(){var t;if(this.checkedAllStatus){t=0,this.checkedAllStatus=!1;var e=this.cartLists.map((function(t,e,i){return t.is_checked=!1,t}));this.cartLists=e,this.cartTotals.checkedGoodsPrices=(0).toFixed(2),this.checkedGoodsLength=!1}else{t=1,this.checkedAllStatus=!0;var i=this.cartLists.map((function(t,e,i){return t.is_checked=!0,t}));this.cartGoods=i,this.getCheckedGoodsPrice(i)}uni.showLoading({title:"加载中"}),this.$store.commit("shopping/setCartCheckAll",{platform:"H5",ischecked:t,user_id:this.userId,token:this.token,accesstoken:this.token})},getCheckedGoodsPrice:function(t){var e=0,i=0,o=t;if(o&&o.length>0){for(var a=0;a<o.length;a++)o[a].is_checked&&(e=Number(e+o[a].goods_price*o[a].goods_number),i+=parseInt(o[a].goods_number));this.getCheckedGoodsCount(i),this.cartTotals.checkedGoodsPrices=e.toFixed(2),console.log(this.cartTotals.checkedGoodsPrices),this.cartTotals.checkedGoodsPrices>0?this.checkedGoodsLength=!0:this.checkedGoodsLength=!1}},getCheckedGoodsCount:function(t){this.cartTotals.checkedGoodsCount=t},getCartList:function(t){uni.showLoading({title:"加载中"}),this.$store.dispatch("shopping/setCartList",{platform:"H5",user_id:3,token:"c6ff849e7732d0c53141c04c65769365",accesstoken:"c6ff849e7732d0c53141c04c65769365",app_key:"wolf100000001",format:"JSON",api_version:"2.0",timestamp:this.times,req_source:"h5",sign:"14E7AD8C354C11A8CE0F0B8A98337F82"})},addNumber:function(t,e,i){var o=e+1;this.getUpdateNumber(t,o)},getUpdateNumber:function(t,e){uni.showLoading({title:"加载中"}),this.$store.dispatch("shopping/setUpdateNumber",{platform:"H5",user_id:this.userId,token:this.token,goods_id:t,number:e,product_id:0})},goDeleteGoods:function(t){uni.showLoading({title:"加载中"}),this.$store.commit("shopping/setDeleteGoods",{platform:"H5",user_id:this.userId,token:this.token,id:t})},goHome:function(){console.log("1"),uni.switchTab({url:"/pages/home/homeIndex"})}},watch:{updateNumber:function(){var t="{}"==JSON.stringify(this.updateNumber)?"":this.updateNumber;console.log("asas",t),t.update_cart&&(console.log("updateNumber"),this.getCartList(0))},deleteCart:function(){this.deleteCart?(console.log("deleteGoods1"),this.getCartList(0),this.$store.state.shopping.deleteCart=!1):this.cartTotalCount}}};e.default=s},5237:function(t,e,i){"use strict";i.r(e);var o=i("c5a8"),a=i("cb1a");for(var n in a)"default"!==n&&function(t){i.d(e,t,(function(){return a[t]}))}(n);i("60a2");var s,c=i("f0c5"),r=Object(c["a"])(a["default"],o["b"],o["c"],!1,null,"04d96ea1",null,!1,o["a"],s);e["default"]=r.exports},"59c9":function(t,e,i){var o=i("24fb");e=o(!1),e.push([t.i,'.cart .cart-list[data-v-04d96ea1]{\n\t\n\t   /*margin-top:88rpx; */position:relative;display:block;width:100%;box-sizing:border-box;border-top:#e2e2e2 1px solid;padding-bottom:%?64?%}.cart-list .list-item[data-v-04d96ea1]{position:relative;display:block;\n\t    /* width: 100%; */height:%?220?%;box-sizing:border-box;border-bottom:#e2e2e2 1px solid;background-color:#fff;padding:%?20?% 0;border-radius:%?20?%;margin:%?28?% %?28?% %?28?% %?28?%}.cart-list .list-item .item-checkbox[data-v-04d96ea1]{position:absolute;top:50%;left:%?20?%;margin-top:%?-10?%;width:%?40?%;height:%?40?%;background-image:url(http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/checkbox-0e09baa37e.png);background-repeat:no-repeat;background-size:cover}.cart-list .list-item .item-checkbox.checked[data-v-04d96ea1]{background:url(http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/checkbox-checked-822e54472a.png) no-repeat;background-size:%?40?%}.cart-list .list-item .item-photo[data-v-04d96ea1]{position:absolute;top:%?20?%;left:%?88?%;display:block;width:%?180?%;height:%?180?%;box-sizing:border-box;\n\t    /* border: #e2e2e2 2px solid; */overflow:hidden}.cart-list .list-item .item-photo uni-image[data-v-04d96ea1]{width:100%;max-width:100%;height:100%;background-color:#fff}.cart-list .list-item .item-info[data-v-04d96ea1]{position:relative;display:block;height:100%;margin-left:%?288?%}.cart-list .list-item .item-info .info-name[data-v-04d96ea1]{display:block;position:relative;margin-top:%?8?%;color:#404245;font-size:%?28?%;font-weight:400;text-align:left;line-height:%?32?%;box-sizing:border-box;padding-right:%?108?%;max-height:%?64?%;overflow:hidden}.cart-list .list-item .item-info .info-attr[data-v-04d96ea1]{margin-top:%?16?%;position:relative;display:block;box-sizing:border-box;color:#999;font-size:%?26?%;font-weight:400;text-align:left;line-height:%?30?%;padding-right:%?88?%}.cart-list .list-item .item-info .info-price[data-v-04d96ea1]{position:absolute;left:0;bottom:%?4?%;display:block;height:%?48?%;color:#f2270c;font-size:%?28?%;font-weight:400;text-align:left;line-height:%?48?%;box-sizing:border-box;overflow:hidden}.cart-list .list-item .item-info .info-delete[data-v-04d96ea1]{position:absolute;padding:%?20?%;top:0;right:0;display:block;width:%?88?%;height:%?88?%;overflow:hidden;z-index:100}.cart-list .list-item .item-info .info-delete uni-image[data-v-04d96ea1]{margin-top:%?30?%;margin-left:%?30?%;width:%?28?%;height:%?28?%}.cart-list .list-item .item-info .info-amount[data-v-04d96ea1]{position:absolute;right:%?8?%;border:%?2?% solid #ccc;border-radius:%?50?%;bottom:0;display:block;height:%?48?%;overflow:hidden}.cart-list .list-item .item-info .info-amount .amount-button[data-v-04d96ea1]{float:left;display:block;width:%?48?%;height:%?48?%;font-size:%?28?%;line-height:%?48?%;text-align:center;overflow:hidden;box-sizing:border-box;color:#404245;opacity:1}.cutNumber[data-v-04d96ea1]{border-right:%?2?% solid #ccc}.addNumber[data-v-04d96ea1]{border-left:%?2?% solid #ccc}.cart-list .list-item .item-info .info-amount .amount-button.active[data-v-04d96ea1]{opacity:1}.cart-list .list-item .item-info .info-amount .amount-button img[data-v-04d96ea1]{display:block;margin-top:%?14?%;margin-left:%?24?%;width:%?24?%;height:%?24?%;opacity:1}.cart-list .list-item .item-info .info-amount .amount-count[data-v-04d96ea1]{float:left;display:block;width:%?72?%;min-width:%?40?%;height:%?48?%;margin-top:.5px;border:none;background:#fff;overflow:hidden;color:#404245;font-size:%?20?%;font-weight:400;text-align:center;box-sizing:border-box;line-height:%?48?%;opacity:1}\n\t/* 底部 */.content .cart-bottom[data-v-04d96ea1]{bottom:%?88?%}.cart-bottom[data-v-04d96ea1]{position:fixed;left:0;bottom:0;z-index:100;width:100%;height:%?100?%;box-sizing:border-box;border-top:#e2e2e2 1px solid;background-color:#fff}.cart-bottom .cart-bottom-select[data-v-04d96ea1]{position:relative;width:30%;height:100%;box-sizing:border-box;color:#404245;font-size:%?28?%;font-weight:400;text-align:left;line-height:%?100?%;padding-left:%?88?%}.cart-bottom .cart-bottom-select .select-checkbox[data-v-04d96ea1]{position:absolute;top:50%;left:%?20?%;margin-top:%?-20?%;width:%?40?%;height:%?40?%;background:url(http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/checkbox-0e09baa37e.png) no-repeat;\n\t\t    /*background-image: url("../image/check-off.png");*/background-size:cover}.cart-bottom .cart-bottom-select .select-checkbox.checked[data-v-04d96ea1]{background:url(http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/checkbox-checked-822e54472a.png) no-repeat;\n\t\t    /*background-image: url("../image/check-on-multi.png");*/background-size:cover}.cart-bottom .right[data-v-04d96ea1]{width:70%}.cart-bottom .cart-bottom-total[data-v-04d96ea1]{width:70%;color:#f2270c;font-size:%?32?%;text-align:right;padding-right:%?20?%;box-sizing:border-box;font-weight:400;line-height:%?100?%;opacity:1}.cart-bottom .cart-submit-button[data-v-04d96ea1]{position:relative;width:40%;height:100%;box-sizing:border-box;color:#fff;font-size:%?30?%;font-weight:400;background-color:#d81e06;line-height:%?100?%;text-align:center;opacity:.3}.cart-bottom .cart-submit-button.dark[data-v-04d96ea1]{opacity:1}.empty[data-v-04d96ea1]{position:relative;display:block;width:100%;overflow:hidden}.empty-item[data-v-04d96ea1]{height:100%;width:100%;padding:50% 0;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.empty .empty-item .item-icon[data-v-04d96ea1]{display:block;margin:0 auto;width:%?160?%;height:%?160?%}.empty .empty-item .item-text[data-v-04d96ea1]{display:block;height:%?64?%;line-height:%?64?%;color:#666;font-size:%?28?%;font-weight:400;overflow:hidden;text-align:center}.empty .empty-item .item-button[data-v-04d96ea1]{display:block;width:%?320?%;height:%?80?%;line-height:%?80?%;color:#fff;background-color:red;font-size:%?28?%;font-weight:400;border-radius:%?80?%;overflow:hidden;text-align:center;margin:0 auto;margin-top:%?20?%}',""]),t.exports=e},"60a2":function(t,e,i){"use strict";var o=i("6735"),a=i.n(o);a.a},6735:function(t,e,i){var o=i("59c9");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var a=i("4f06").default;a("65ec8d0e",o,!0,{sourceMap:!1,shadowMode:!1})},c5a8:function(t,e,i){"use strict";var o;i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return n})),i.d(e,"a",(function(){return o}));var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"cart"},[i("v-uni-view",{staticClass:"content"},[t.cartList.length?i("v-uni-view",{staticClass:"cart-list"},t._l(t.cartLists,(function(e,o){return i("v-uni-view",{staticClass:"list-item ",attrs:{id:o}},[i("v-uni-view",{staticClass:"item-checkbox",class:"true"==e.is_checked||1==e.is_checked?"checked":"",attrs:{"data-item-index":o},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.checkedItem.apply(void 0,arguments)}}}),i("v-uni-view",{staticClass:"item-photo",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.openDetails(e.goods_id)}}},[i("v-uni-image",{attrs:{src:e.goods_thumb}})],1),i("v-uni-view",{staticClass:"item-info"},[i("v-uni-view",{staticClass:"info-name"},[t._v(t._s(e.goods_name))]),i("v-uni-view",{staticClass:"info-price"},[t._v("￥"+t._s(e.goods_price))]),i("v-uni-view",{staticClass:"info-delete"},[i("v-uni-image",{attrs:{"data-item-index":o,src:"/static/images/cart/ind-delete-icon.png"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.goDeleteGoods(e.rec_id)}}})],1),i("v-uni-view",{staticClass:"info-amount"},[i("v-uni-view",{staticClass:"amount-button cutNumber",attrs:{"data-item-index":o},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.cutNumber(e.goods_id,e.goods_number)}}},[t._v("-")]),i("v-uni-input",{staticClass:"amount-count",attrs:{disabled:"true",type:"number"},model:{value:e.goods_number,callback:function(i){t.$set(e,"goods_number",i)},expression:"item.goods_number"}}),i("v-uni-view",{staticClass:"amount-button addNumber",attrs:{"data-item-index":o},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.addNumber(e.goods_id,e.goods_number,o)}}},[t._v("+")])],1)],1)],1)})),1):t._e(),t.cartTotalCount.goods_count?i("v-uni-view",{staticClass:"cart-bottom flex-justify-content-s-b"},[i("v-uni-view",{staticClass:"left cart-bottom-select"},[i("v-uni-view",{staticClass:"select-checkbox",class:t.checkedAllStatus?"checked":"",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.checkedAll.apply(void 0,arguments)}}}),t._v("全选")],1),i("v-uni-view",{staticClass:"right flex"},[i("v-uni-view",{staticClass:"cart-bottom-total"},[i("v-uni-text",{staticClass:"total-price"},[t._v("￥"+t._s(t.cartTotals.checkedGoodsPrices))])],1),i("v-uni-view",{staticClass:"cart-submit-button",class:t.checkedGoodsLength?"dark":"",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.checkoutOrder.apply(void 0,arguments)}}},[t._v("下单")])],1)],1):t._e(),""==t.cartTotalCount?i("v-uni-view",{staticClass:"empty"},[i("v-uni-view",{staticClass:"empty-item"},[i("img",{staticClass:"item-icon",attrs:{src:"/static/images/cart/cart-empty-icon.png"}}),i("v-uni-view",{staticClass:"item-text"},[t._v("您的购物车是空的")]),i("v-uni-view",{staticClass:"item-button",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goHome.apply(void 0,arguments)}}},[t._v("随便逛逛")])],1)],1):t._e()],1)],1)},n=[]},cb1a:function(t,e,i){"use strict";i.r(e);var o=i("1fc2"),a=i.n(o);for(var n in o)"default"!==n&&function(t){i.d(e,t,(function(){return o[t]}))}(n);e["default"]=a.a}}]);