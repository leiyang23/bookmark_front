import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElemetUI from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
import http from './utils/http'
import 'font-awesome/css/font-awesome.css'

Vue.use(ElemetUI);

Vue.config.productionTip = false;
Vue.prototype.$http = http.http;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
