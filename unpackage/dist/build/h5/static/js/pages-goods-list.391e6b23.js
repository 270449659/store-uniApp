(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-goods-list"],{"09b6":function(t,i,o){"use strict";var s=o("8acb"),e=o.n(s);e.a},2354:function(t,i,o){"use strict";var s;o.d(i,"b",(function(){return e})),o.d(i,"c",(function(){return a})),o.d(i,"a",(function(){return s}));var e=function(){var t=this,i=t.$createElement,o=t._self._c||i;return o("v-uni-view",{staticClass:"goods-list"},[o("v-uni-view",{staticClass:"content"},[o("v-uni-scroll-view",{staticClass:"goodsNavList",attrs:{"scroll-x":"true","scroll-left":"120"},on:{scroll:function(i){arguments[0]=i=t.$handleEvent(i),t.scroll.apply(void 0,arguments)}}},[t._l(t.goodsNavLists.navData,(function(i,s){return t._t("default",[o("v-uni-view",{key:s,staticClass:"goodsNavItem",class:{active:t.goodsNavState==s},attrs:{id:s},on:{click:function(o){arguments[0]=o=t.$handleEvent(o),t.showToggle(i.id,s)}}},[t._v(t._s(i.name))])])}))],2),o("v-uni-view",{staticClass:"category-title"},[o("v-uni-text")],1),o("v-uni-view",{staticClass:"search-filter uni-flex"},[o("v-uni-view",{staticClass:"filter-item",class:"asc"==t.sort_key?"active":"",attrs:{"data-id":t.sortkeyA},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.goOrderTap.apply(void 0,arguments)}}},[o("span",{staticClass:"text"},[t._v("综合")])]),o("v-uni-view",{staticClass:"filter-item",class:"ascb"==t.sort_key?"active":"",attrs:{"data-id":t.sortkeyB},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.goOrderTap.apply(void 0,arguments)}}},[o("span",{staticClass:"text"},[t._v("销量")])]),1==t.sort_key?o("v-uni-view",{staticClass:"filter-item by-price",class:1==t.sort_key?"active":"",attrs:{"data-id":1},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.goOrderTap.apply(void 0,arguments)}}},[1==t.sort_value?o("v-uni-view",{staticClass:"arrow"},[o("img",{staticClass:"ind",attrs:{src:"/static/images/goods/ind-arrow-upa.png"}}),o("img",{staticClass:"ind",attrs:{src:"/static/images/goods/ind-arrow-down.png"}})]):2==t.sort_value?o("v-uni-view",{staticClass:"arrow"},[o("img",{staticClass:"ind",attrs:{src:"/static/images/goods/ind-arrow-up.png"}}),o("img",{staticClass:"ind",attrs:{src:"/static/images/goods/ind-arrow-downb.png"}})]):t._e(),o("span",{staticClass:"text"},[t._v("价格")])],1):o("v-uni-view",{staticClass:"filter-item by-price",attrs:{"data-id":1},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.goOrderTap.apply(void 0,arguments)}}},[o("span",{staticClass:"text"},[t._v("价格")]),o("v-uni-view",{staticClass:"arrow"},[o("img",{staticClass:"ind",attrs:{src:"/static/images/goods/ind-arrow-upa.png"}}),o("img",{staticClass:"ind",attrs:{src:"/static/images/goods/ind-arrow-downb.png"}})])],1)],1),t.goodsLists.data?o("v-uni-view",{staticClass:"search-product flex"},t._l(t.goodsLists.data,(function(i){return o("v-uni-view",{staticClass:"product-item",on:{click:function(o){arguments[0]=o=t.$handleEvent(o),t.open(i.id)}}},[o("v-uni-view",{staticClass:"item-photo"},[o("img",{attrs:{src:i.list_pic_url}})]),o("v-uni-view",{staticClass:"item-name"},[t._v(t._s(i.name))]),o("v-uni-view",{staticClass:"item-footer"},[o("v-uni-view",{staticClass:"footer-sales"},[t._v(t._s(i.virtual_sales)+"人付款")]),o("v-uni-view",{staticClass:"footer-price"},[t._v("￥"+t._s(i.retail_price))])],1)],1)})),1):t._e()],1)],1)},a=[]},"38d9":function(t,i,o){"use strict";var s=o("4ea4");o("a9e3"),Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var e=s(o("5530")),a=o("2f62"),r={data:function(){return{title:"商品列表",goodsNavState:0,sort_key:"asc",sortkeyA:"asc",sortkeyB:"ascb"}},onLoad:function(t){this.goods_id=t.id,this.$store.dispatch("setGoodsNavList",{cat_id:Number(this.goods_id)}),this.$store.dispatch("setGoodsList",{cat_id:Number(this.goods_id),page:1,order:this.sort_key})},computed:(0,e.default)({},(0,a.mapState)({goodsNavLists:function(t){return t.goodsStore.goodsNavLists},goodsLists:function(t){return t.goodsStore.goodsLists}})),products:function(){return"{}"==JSON.stringify(this.goodsLists)?{}:this.goodsLists},methods:{showToggle:function(t,i){this.goodsNavState=i,this.$store.dispatch("setGoodsList",{cat_id:Number(t),page:1})},goOrderTap:function(t){console.log("event",t);var i=t.currentTarget.dataset.id;this.page=1,this.sort_key=i,1==i&&(this.sort_value=1==this.sort_value?2:1),this.$store.dispatch("setGoodsList",{cat_id:Number(this.goods_id),page:1,order:this.sort_key})},open:function(t){uni.navigateTo({url:"/pages/goods/details?id="+t})}},watch:{goodsLists:function(){console.log("goodsList",this.goodsLists)}}};i.default=r},"7f1b":function(t,i,o){"use strict";o.r(i);var s=o("38d9"),e=o.n(s);for(var a in s)"default"!==a&&function(t){o.d(i,t,(function(){return s[t]}))}(a);i["default"]=e.a},"8acb":function(t,i,o){var s=o("da09");"string"===typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);var e=o("4f06").default;e("6f4c4af7",s,!0,{sourceMap:!1,shadowMode:!1})},9805:function(t,i,o){"use strict";o.r(i);var s=o("2354"),e=o("7f1b");for(var a in e)"default"!==a&&function(t){o.d(i,t,(function(){return e[t]}))}(a);o("09b6");var r,n=o("f0c5"),d=Object(n["a"])(e["default"],s["b"],s["c"],!1,null,"58b43434",null,!1,s["a"],r);i["default"]=d.exports},da09:function(t,i,o){var s=o("24fb");i=s(!1),i.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.goods-list .goodsNavList[data-v-58b43434]{width:100%;height:44px;line-height:44px;background:#fff;white-space:nowrap}.goods-list .goodsNavList .goodsNavItem[data-v-58b43434]{display:inline-block;padding:0 10px;margin-left:10px}.goods-list .goodsNavList .active[data-v-58b43434]{color:#ab2b2b;height:100%;border-bottom:.02rem solid #ab2b2b;box-sizing:border-box}.search-filter[data-v-58b43434]{width:100%;height:%?88?%;color:#404245;font-size:%?28?%;font-weight:400;text-align:center;line-height:%?88?%;\r\n  /* position: fixed;\r\n    top: 0;\r\n    z-index: 1000;\r\n    margin-top:  88px; */overflow:hidden;padding:0;box-sizing:border-box;background-color:#fff}.search-filter .filter-item[data-v-58b43434]{position:relative;width:33%;height:%?88?%;overflow:hidden;box-sizing:border-box}.search-filter .filter-item .arrow[data-v-58b43434]{position:absolute;top:%?34?%;right:%?10?%;width:%?24?%;height:100%}.search-filter .filter-item .arrow .ind[data-v-58b43434]{position:relative;display:block;width:%?16?%;height:%?8?%;overflow:hidden;box-sizing:border-box;margin-bottom:4px;opacity:1}.search-filter .filter-item .text[data-v-58b43434]{display:block;width:90%;height:100%;color:#404245;font-size:%?28?%;font-weight:400;text-align:center;line-height:%?88?%;box-sizing:border-box;margin:0 auto}.search-filter .filter-item.active .text[data-v-58b43434]{color:red}.search-product[data-v-58b43434]{-webkit-flex-wrap:wrap;flex-wrap:wrap;padding:1%;overflow:hidden}.search-product .product-item[data-v-58b43434]{position:relative;width:48%;max-width:48%;box-sizing:border-box;margin:1%;padding-bottom:0;background-color:#fff;\r\n  /* border-bottom: #e2e2e2 1px solid; */border-radius:15px}.search-product .product-item[data-v-58b43434]:after{content:" ";position:absolute;right:-1px;top:0;bottom:0;width:1px;\r\n  /* border-right: #e2e2e2 1px solid; */z-index:50}.search-product .product-item .item-photo[data-v-58b43434]{position:relative;display:block;width:100%;max-width:100%;height:0;padding-bottom:100%;border-radius:%?15?% %?15?% 0 0}.search-product .product-item .item-photo img[data-v-58b43434]{position:absolute;top:0;left:0;object-fit:cover;width:100%;max-width:100%;height:100%;background-color:#fff;border-radius:%?15?% %?15?% 0 0}.search-product .product-item .item-name[data-v-58b43434]{display:block;\r\n  /* width: 100%; */height:56px;padding:0 5%;text-align:left;color:#404245;font-size:%?28?%;font-weight:400;line-height:%?64?%;overflow:hidden}.search-product .product-item .item-footer[data-v-58b43434]{display:block;\r\n  /* width: 100%; */padding:0 5%;height:%?48?%}.search-product .product-item .item-footer .footer-price[data-v-58b43434]{display:block;height:%?32?%;line-height:%?32?%;color:red;font-size:%?24?%;font-weight:400;overflow:hidden}.search-product .product-item .item-footer .footer-sales[data-v-58b43434]{display:block;height:%?32?%;line-height:%?32?%;color:#888;font-size:%?20?%;font-weight:400;overflow:hidden;float:right}',""]),t.exports=i}}]);