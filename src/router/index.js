import Vue from 'vue'
import Router from 'vue-router'
const Index = () => import('../page/index.vue')
const Login = () => import('../page/Login/login.vue')
const Register = () => import('../page/Login/register.vue')
const Home = () => import('../page/Home/home.vue')
const book = () => import('../page/Book/book.vue')
const bookDetail = () => import('../page/Book/bookDetail.vue')
const Cart = () => import('../page/Cart/cart.vue')
const order = () => import('../page/Order/order.vue')
const user = () => import('../page/User/user.vue')
const orderList = () => import('../page/User/children/order.vue')
const information = () => import('../page/User/children/information.vue')
const receiverList = () => import('../page/User/children/receiverList.vue')
const coupon = () => import('../page/User/children/coupon.vue')
const aihuishou = () => import('../page/User/children/aihuishou.vue')
const support = () => import('../page/User/children/support.vue')
const checkout = () => import('../page/Checkout/checkout.vue')
const payment = () => import('../page/Order/payment.vue')
const paysuccess = () => import('../page/Order/paysuccess.vue')
// const Thanks = () => import('../page/Thanks/thanks.vue')
const Search = () => import('../page/Search/search.vue')
const RefreshSearch = () => import('../page/Refresh/refreshsearch.vue')
const RefreshGoods = () => import('../page/Refresh/refreshgoods.vue')
const orderDetail = () => import('../page/User/children/orderDetail.vue')
const Alipay = () => import('../page/Order/alipay.vue')
const Wechat = () => import('../page/Order/wechat.vue')
const QQpay = () => import('../page/Order/qqpay.vue')
Vue.use(Router)

import VueRouter from 'vue-router';
Vue.use(VueRouter);
//解决编程式路由往同一地址跳转时会报错的情况
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
//push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}
//replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
    return originalReplace.call(this, location).catch(err => err)
}


export default new Router({
  routes: [
    {
      path: '/',
      component: Index,
      name: 'index',
      redirect: '/home',
      children: [
        {path: 'home', component: Home},
        {path: 'book', component: book},
        {path: 'bookDetail', name: 'bookDetail', component: bookDetail},
        // {path: 'thanks', name: 'thanks', component: Thanks},
        {path: '/refreshgoods', name: 'refreshgoods', component: RefreshGoods}
      ]
    },
    {path: '/login', name: 'login', component: Login},
    {path: '/register', name: 'register', component: Register},
    {path: '/cart', name: 'cart', component: Cart},
    {path: '/refreshsearch', name: 'refreshsearch', component: RefreshSearch},
    {
      path: '/order',
      name: 'order',
      component: order,
      children: [
        {path: 'paysuccess', name: 'paysuccess', component: paysuccess},
        {path: 'payment', name: 'payment', component: payment},
        {path: '/search', name: 'search', component: Search},
        {path: 'alipay', name: 'alipay', component: Alipay},
        {path: 'wechat', name: 'wechat', component: Wechat},
        {path: 'qqpay', name: 'qqpay', component: QQpay}
      ]
    },
    {
      path: '/user',
      name: 'user',
      component: user,
      redirect: '/user/orderList',
      children: [
        {path: 'orderList', name: '订单列表', component: orderList},
        {path: 'orderDetail', name: '订单详情', component: orderDetail},
        {path: 'information', name: '账户资料', component: information},
        {path: 'receiverList', name: '收货地址', component: receiverList},
        {path: 'coupon', name: '我的优惠', component: coupon},
        {path: 'support', name: '售后服务', component: support},
        {path: 'aihuishou', name: '以旧换新', component: aihuishou}
      ]
    },
    {path: '/checkout', name: 'checkout', component: checkout},
    {path: '*', redirect: '/home'}
  ]
})
