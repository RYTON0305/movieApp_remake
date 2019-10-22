import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from '@/stores'


import 'normalize.css'

import axios from 'axios'
// import VueAxios from 'vue-axios'

// Vue.use(VueAxios, axios)
Vue.prototype.axios=axios;

Vue.filter('setWH',(url,arg)=>{
  if(!url) return;
  return url.replace(/w\.h/,arg)
})

import Scroller from '@/components/Scroller'
Vue.component('Scroller',Scroller)

import Loading from '@/components/Loading'
Vue.component('Loading',Loading)

Vue.config.productionTip = false


import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'


Vue.use(MintUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
