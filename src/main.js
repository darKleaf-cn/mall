import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/';
import { userInfo } from '@/api';
import ElementUI from 'element-ui';
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueLazyload, {
  // preLoad: 1.3,
  // error: 'dist/error.png',
  loading: '/static/images/load.gif'
  // attempt: 1
})

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
