import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/';
import { userInfo } from '@/api';
import ElementUI from 'element-ui';

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
