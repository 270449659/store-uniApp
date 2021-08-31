/* user */
const GET_BANNERS = 'getbanner'
const GET_HOME_INFO = 'getHomeInfo'
const SET_MEMBER_INFO = 'setMemberInfo'
const USER_LOGIN = 'userLogin'
const SET_GOODS_INFO = 'setGoodsInfo'
const SET_GOODS_NAV_LIST = 'setGoodsNavList'
const SET_GOODS_LIST = 'setGoodsList'

const SET_SHOP_CONSIGNEE = 'setShopConsignee'
const SET_ADDRESS_DETAIL = 'setAddressDetail'
const SET_GOODS_COMMENT = 'setGoodsComment'	
const SET_CART_LIST= 'setCartList'	
const SET_CART_ADD= 'setCartAdd'
const SET_CATEGORY_LIST= 'setCategoryList'	
const SET_CATEGORY_SECONDARY= 'setCategorySecondary'
const SET_HOTSEARCH= 'setHotSearch'

const SET_DELETE_GOODS = 'setDeleteGoods'	

const SET_CHECKOUT_LIST= 'setCheckoutList'

const SET_PAY_DETAIL= 'setPayDetail'

const SET_ORDER_LIST= 'setOrderList'
const SET_ORDER_DETAIL_INFO= 'setOrderDetailInfo'

    
export{
	GET_BANNERS, //轮播图
	GET_HOME_INFO, //首页
	USER_LOGIN,//用户登录
	SET_MEMBER_INFO,//用户中心
	SET_GOODS_INFO,//商品详情
	SET_GOODS_NAV_LIST,//商品列表分类
    SET_HOTSEARCH,//热门搜索
	SET_GOODS_LIST,//商品列表
	SET_SHOP_CONSIGNEE,//地址
	SET_ADDRESS_DETAIL,//地址详情
	SET_GOODS_COMMENT,//评论
	SET_CART_LIST,//购物车
	SET_CART_ADD,//添加购物车
	SET_DELETE_GOODS,//删除购物车
	SET_CATEGORY_LIST,//分类
	SET_CATEGORY_SECONDARY,//二级分类
	
	SET_PAY_DETAIL,//确定订单
	SET_ORDER_LIST,//订单列表
	SET_ORDER_DETAIL_INFO//订单详情
}