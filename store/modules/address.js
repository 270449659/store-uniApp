import {
   SET_SHOP_CONSIGNEE,
   SET_ADDRESS_DETAIL
} from '../mutation-type.js'
import { apiAddress } from '@/config'

const state = {
 defaultConsignees:[],//地址
 addressList:[],//地址
 addressInfo:{},//地址编辑列表
}
const mutations = {
	[SET_SHOP_CONSIGNEE](state,o){
		this.consigneeNew=uni.getStorageSync('consigneesId')||'';
		let newConsignee = Number(this.consigneeNew)||null;
		let defaultConsignees = [];
		const resultList = o.info.length>0?o.info:'';
		if(resultList){
				
			for (let i in resultList) {
				if (newConsignee === null) {
					if (resultList[i].is_default) {
					  defaultConsignees = resultList[i];
				    }
				}else{
					if (Number(resultList[i].address_id) === newConsignee) {
					  defaultConsignees = resultList[i];
				    }
				}
			}
			this.consignee=defaultConsignees.address_id,
			this.defaultConsignees=defaultConsignees
		}
		//组织渲染数据
		state.defaultConsignees=this.defaultConsignees;
		//console.log('addressList',state.addressList)
		state.addressList=resultList;
	},
	
	[SET_ADDRESS_DETAIL](state,o){
				
		if(o.is_detail){
			state.addressInfo=o.data
		}
		
		
    },
	
}

const actions = {
	//地址列表
	setShopConsignee({ commit }, o){
		apiAddress.getShopConsignee(o).then(res => {

			commit(SET_SHOP_CONSIGNEE,res)
		})
	},
	//地址详情
	setAddressDetail({ commit }, o){
		apiAddress.getAddressDetail(o).then(res => {
		
			commit(SET_ADDRESS_DETAIL,res)
		})
	},
}
export default {
	state,
	mutations,
	actions
}