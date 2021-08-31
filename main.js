import Vue from 'vue'
import App from './App'
import store from './store'
import * as localConfig from './config/local/config'
import request from '@/common/request.js'
import isLogin from '@/common/mixins/isLogin'
Vue.config.productionTip = false
Vue.prototype.$http = request
Vue.prototype.$store = store

Vue.prototype.$isLogin = isLogin

Vue.prototype.websiteUrl = localConfig.websiteUrl
Vue.prototype.$websiteUrl = localConfig.websiteUrl + '/mobile/#/'
App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()