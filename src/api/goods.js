import http from './public'
// 商品列表
export const bookQueryList = (params) => {
  return http.fetchPost('/book/queryList', params)
}
// 商品详情
export const productDet = (params) => {
  return http.fetchPost('/book/detail', params)
}
// 商品类型
export const bookType = (params) => {
  return http.fetchPost('/book/bookType', params)
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

// 提交订单
export const submitOrder = (params) => {
  return http.fetchPost('/order/submit', params)
}
// 支付
export const payment = (params) => {
  return http.fetchPost('/order/payment', params)
}
// 获取用户订单
export const orderList = (params) => {
  return http.fetchPost('/order/queryList', params)
}
// 获取订单详情
export const getOrderDet = (params) => {
  return http.fetchPost('/order/detail', params)
}
// 删除订单
export const delOrder = (params) => {
  return http.fetchPost('/order/delOrder', params)
}
