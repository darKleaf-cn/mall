import http from './public'
// 登陆
export const userLogin = (params) => {
  return http.fetchPost('/user/login', params)
}
// 退出登陆
export const logout = (params) => {
  return http.fetchGet('/user/logout', params)
}
// 用户信息
export const userInfo = (params) => {
  return http.fetchGet('/user/userinfo', params)
}
// 注册账号
export const register = (params) => {
  return http.fetchPost('/user/register', params)
}
// 修改用户信息
export const updateUserInfo = (params) => {
  return http.fetchPost('/user/updateUserInfo', params)
}
// 首页接口
export const productHome = (params) => {
  return http.fetchGet('/book/home', params)
}

