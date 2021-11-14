import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/';
import { userInfo } from '@/api';
import ElementUI from 'element-ui';
import VueLazyload from 'vue-lazyload';
import { getStore } from '/utils/storage';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueLazyload, {
  // preLoad: 1.3,
  // error: 'dist/error.png',
  loading: '/static/images/load.gif'
  // attempt: 1
})

const whiteList = ['/home', '/book', '/login', '/register', '/bookDetail', '/thanks', '/search', '/refreshsearch', '/refreshgoods'] // 不需要登陆的页面
router.beforeEach(function (to, from, next) {
  let params = {
    token: getStore('token')
  }
  userInfo(params).then(res => {
    if (res.rtnCode !== "200") { // 没登录
      if (whiteList.indexOf(to.path) !== -1) { // 白名单
        next()
      } else {
        next('/login')
      }
    } else {
      store.commit('RECORD_USERINFO', res.result)
      if (to.path === '/login') { //  跳转到
        next({ path: '/' })
      }
      next()
    }
  })
})

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
