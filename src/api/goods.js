import http from './public'
// 商品列表
export const bookQueryList = (params) => {
  return http.fetchGet('/book/queryList', params)
}
// 商品详情
export const productDet = (params) => {
  return http.fetchGet('/book/detail', params)
}

// 获取购物车列表
export const getCartList = (params) => {
  return http.fetchPost('/cart/cartList', params)
}
// 加入购物车
export const addCart = (params) => {
  return http.fetchPost('/cart/addCart', params)
}
// 删除购物车
export const delCart = (params) => {
  return http.fetchPost('/cart/delCart', params)
}

// 获取收货信息列表
export const receiverList = (params) => {
  return http.fetchPost('/receiver/receiverList', params)
}

// 修改收货信息
export const updateReceiver = (params) => {
  return http.fetchPost('/receiver/updateReceiver', params)
}
// 添加收货信息
export const addReceiver = (params) => {
  return http.fetchPost('/receiver/addReceiver', params)
}
// 删除收货信息
export const delReceiver = (params) => {
  return http.fetchPost('/receiver/delReceiver', params)
}

// 生成订单
export const submitOrder = (params) => {
  return http.fetchPost('/receiver/addOrder', params)
}
// 支付
export const payMent = (params) => {
  return http.fetchPost('/member/payOrder', params)
}
// 获取用户订单
export const orderList = (params) => {
  return http.fetchGet('/member/orderList', params)
}
// 获取单个订单详情
export const getOrderDet = (params) => {
  return http.fetchGet('/member/orderDetail', params)
}
// 取消订单
export const cancelOrder = (params) => {
  return http.fetchPost('/member/cancelOrder', params)
}
// 删除订单
export const delOrder = (params) => {
  return http.fetchGet('/member/delOrder', params)
}
