import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import service from "./http"
import VCharts from 'v-charts'
import dayjs from 'dayjs'
import myUpload from 'vue-image-crop-upload';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import lodash from 'lodash'
import JsonExcel from 'vue-json-excel'
// import countTo from 'vue-count-to'



Vue.component('downloadExcel', JsonExcel)
    //扩展vue的插件
Vue.prototype.$lodash = lodash
    //引进组件时在mian引进


Vue.use(VCharts)
Vue.use(ElementUI)
Vue.prototype.$axios = service
Vue.prototype.$dayjs = dayjs
Vue.config.productionTip = false
Vue.use(mavonEditor)



new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')