<template>
  <div class="footer">
    <div class="container">
      <div class="siteinfo">
        <ul class="c0">
          <h3 class="c1">我的信息</h3>
          <ul>
            <li class="c2">
              <router-link to="/user/orderList"
                ><a class="c3">订单信息</a></router-link
              >
            </li>
            <li class="c2">
              <router-link to="/user/information"
                ><a class="c3">用户信息</a></router-link
              >
            </li>
            <li class="c2">
              <router-link to="/user/receiverList"
                ><a class="c3">收货信息</a></router-link
              >
            </li>
          </ul>
        </ul>
        <ul class="c0">
          <h3 class="c1">相关技术</h3>
          <ul>
            <li class="c2">
              <a class="c3" target="_blank" href="https://cn.vuejs.org/">vue</a>
            </li>
            <li class="c2">
              <a class="c3" target="_blank" href="https://element.eleme.cn/"
                >element-ui</a
              >
            </li>
            <li class="c2">
              <a class="c3" target="_blank" href="https://nodejs.org/"
                >nodejs</a
              >
            </li>
          </ul>
        </ul>
        <ul class="c0">
          <h3 class="c1">友情链接</h3>
          <ul>
            <li class="c2">
              <a class="c3" target="_blank" href="https://book.jd.com/"
                >京东书城</a
              >
            </li>
            <li class="c2">
              <a class="c3" target="_blank" href="https://www.ireader.com.cn/"
                >掌阅书城</a
              >
            </li>
            <li class="c2">
              <a class="c3" target="_blank" href="http://book.dangdang.com/"
                >当当网</a
              >
            </li>
          </ul>
        </ul>
        <ul class="c0">
          <h3 class="c1">关注我吧</h3>
          <ul>
            <li class="c2">
              <a class="c3" target="_blank" href="">腾讯 QQ</a>
            </li>
            <li class="c2">
              <a class="c3" target="_blank" href="">新浪微博</a>
            </li>
            <li class="c2">
              <a class="c3" target="_blank" href="">官方邮箱</a>
            </li>
          </ul>
        </ul>

        <ul class="c4">
          <li class="tel">联系方式：123456789</li>
          <li class="time">周一至周日 10:00-23:00</li>
        </ul>
      </div>

      <div class="copyright">
        <h4 class="content-c2">Copyright ©2021 All Rights Reserved.</h4>
        <ul class="privacy">
          <li class="content-c1">法律声明</li>
          <li class="content-c1">隐私条款</li>
          <li class="content-c1">开发者中心</li>
        </ul>
      </div>
      <div class="cop">
        <span class="content-c3">蜀ICP备xxxxxxxx号-x</span>
        <span class="content-c3">蜀ICP证xxxxxxxx号</span>
      </div>
    </div>
  </div>
</template>
<script>
import YButton from "/components/YButton";
export default {
  data() {
    return {};
  },
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.footer {
  padding: 50px 0 20px;
  border-top: 1px solid #e6e6e6;
  background: #fafafa;
  margin-top: 60px;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container {
  width: 1220px;
}

.siteinfo {
  height: 100px;
  padding: 50px 0 130px;
  border-bottom: 1px solid #e6e6e6;
  position: relative;
}

.c0 {
  width: 149px;
  line-height: 1;
  float: left;
}

.c1 {
  color: #646464;
  font-size: 12px;
  padding: 0 0 14px;
}

.c2 {
  color: #c3c3c3;
  font-size: 12px;
  padding: 6px 0;
}

.c3 {
  color: #969696;
}

.c4 {
  position: absolute;
  right: 0;
  overflow: hidden;
  line-height: 34px;
}

.tel {
  font-size: 20px;
  color: #646464;
  position: relative;
}

.c5 {
  color: #646464;
  right: -70px;
  position: relative;
}

.time {
  margin-top: 5px;
  // right: 0px;
  position: relative;
  clear: both;
  // width: 241px;
  font-size: 12px;
  line-height: 18px;
  color: #c3c3c3;
  text-align: right;
}

.online {
  clear: both;
  width: 241px;
  font-size: 12px;
  line-height: 18px;
  color: #c3c3c3;
  text-align: right;
}

.button {
  width: 130px;
  height: 34px;
  font-size: 14px;
  color: #5079d9;
  border: 1px solid #dcdcdc;
  margin-top: 8px;
}

.copyright {
  color: #434d55;
  font-size: 12px;
  padding: 40px 0 0;
  display: flex;
  align-items: left;
}

.privacy {
  float: left;
  margin: 0 0 0 12px;
}

.content-c0 {
  color: #5079d9;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: #3a5fcd;
  }
}

.content-c1 {
  float: left;
  line-height: 12px;
  padding: 1px 10px 0;
  border-left: 1px solid #ccc;
}

.content-c2 {
  float: left;
  height: 15px;
  line-height: 15px;
  color: #757575;
}

.cop {
  clear: both;
  padding: 10px 0 0;
  height: 15px;
}

.content-c3 {
  margin-right: 20px;
  color: #bdbdbd;
  font-size: 12px;
  height: 12px;
  line-height: 1;
}
</style>