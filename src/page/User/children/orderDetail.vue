<template>
  <div>
    <y-shelf v-bind:title="orderTitle">
      <div slot="content">
        <div v-loading="loading" element-loading-text="加载中..." style="min-height: 10vw;" v-if="bookList.length">
          <div class="orderState" v-if="orderState !== -1 && orderState !== 6">
            <el-steps :space="200" :active="orderState+2" finish-status="success">
              <el-step title="下单" ></el-step>
              <el-step title="付款"></el-step>
              <el-step title="运输中"></el-step>
              <el-step title="交易成功"></el-step>
            </el-steps>
          </div>
          <div class="status-now" v-if="orderState === 0">
            <ul>
              <li class="status-title">
                <h3>订单状态：待付款</h3>
              </li>
              <li class="button">
                <el-button @click="orderPayment(orderId)" type="primary" size="small">现在付款</el-button>
                <el-button @click="_delOrder()" size="small">取消订单</el-button>
              </li>
            </ul>
            <!-- <p class="realtime">
              <span>您的付款时间还有 </span>
              <span class="red">
                <countDown v-bind:endTime="countTime" endText="已结束"></countDown>
              </span>
              <span>，超时后订单将自动取消。</span>
            </p> -->
          </div>
          <div class="status-now" v-if="orderState === 1">
            <ul>
              <li class="status-title">
                <h3>订单状态：运输中</h3>
              </li>
            </ul>
          </div>
          <div class="status-now" v-if="orderState === 2">
            <ul>
              <li class="status-title">
                <h3>订单状态：已完成</h3>
              </li>
            </ul>
            <p class="realtime">
              <span>您的订单已交易成功，感谢您的惠顾！</span>
            </p>
          </div>
          <div class="gray-sub-title cart-title">
            <div class="first">
              <div>
                <span class="order-id">商品名称</span>
              </div>
              <div class="f-bc">
                <span class="price">单价</span>
                <span class="num">数量</span>
                <span class="operation">小计</span>
              </div>
            </div>
          </div>

          <!--商品-->
          <div class="goods-table">
            <div class="cart-items" v-for="(item,i) in bookList" :key="i">
              <a @click="bookDetail(item.bookId)" class="img-box"><img :src="item.image" alt=""></a>
              <div class="name-cell ellipsis">
                <a @click="bookDetail(item.bookId)" title="" target="_blank">{{item.name}}</a>
              </div>
              <div class="n-b">
                <div class="price">¥ {{Number(item.price).toFixed(2)}}</div>
                <div class="goods-num">{{item.bookNum}}</div>
                <div class="subtotal"> ¥ {{Number(item.price * item.bookNum).toFixed(2)}}</div>
              </div>
            </div>
          </div>
          <!--合计-->
          <div class="order-discount-line">
            <p style="font-size: 14px;font-weight: bolder;"> <span style="padding-right:47px">商品总计：</span>
              <span style="font-size: 16px;font-weight: 500;line-height: 32px;">¥ {{orderPrice}}</span>
            </p>
            <p><span style="padding-right:30px">运费：</span><span style="font-weight: 700;">+ ¥ 0.00</span></p>
            <p class="price-total"><span>应付金额：</span><span class="price-red">¥ {{orderPrice}}</span></p>
          </div>

          <div class="gray-sub-title cart-title">
            <div class="first">
              <div>
                <span class="order-id">收货信息</span>
              </div>
            </div>
          </div>
          <div style="height: 155px;padding: 20px 30px;">
            <p class="address">姓名：{{ receiverName }}</p>
            <p class="address">联系电话：{{ receiverPhone }}</p>
            <p class="address">详细地址：{{ receiverAddress }}</p>
          </div>
        </div>
        <div v-loading="loading" element-loading-text="加载中..." v-else>
          <div style="padding: 100px 0;text-align: center">
            获取该订单信息失败
          </div>
        </div>
      </div>
    </y-shelf>

  </div>
</template>
<script>
  import {
    getOrderDet,
    delOrder
  } from '@/api/goods'
  import YShelf from '/components/shelf'
  import {
    getStore
  } from '/utils/storage'
  // import countDown from '/components/countDown'
  export default {
    data() {
      return {
        bookList: [0],
        userId: '',
        orderState: 0,
        orderId: '',
        receiverName: '',
        receiverPhone: '',
        receiverAddress: '',
        orderTitle: '',
        orderDate: '',
        payTime: '',
        closeTime: '',
        finishTime: '',
        orderPrice: '',
        loading: true,
        countTime: 0
      }
    },
    methods: {
      message(m) {
        this.$message.error({
          message: m
        })
      },
      orderPayment(orderId) {
        window.open(window.location.origin + '#/order/payment?orderId=' + orderId)
      },
      bookDetail(id) {
        window.open(window.location.origin + '#/bookDetail?bookId=' + id)
      },
      _getOrderDet() {
        let params = {
          userId: this.userId,
          orderId: this.orderId
        }
        getOrderDet(params).then(res => {
          if (res.code === 200) {
            const data = res.result;
            this.orderState = data.orderState;
            this.bookList = data.bookList;
            this.orderPrice = data.orderPrice
            this.receiverName = data.receiverName
            this.receiverPhone = data.receiverPhone
            this.receiverAddress = data.receiverAddress
            this.orderDate = data.createDate
            // this.closeTime = res.result.closeDate
            // this.payTime = res.result.payDate
            this.loading = false
          } else {
            // this.loading = false
            this.message(res.message)
          }
        })
      },
      _delOrder() {
        delOrder({
          userId: this.userId,
          orderId: this.orderId
        }).then(res => {
          if (res.code == 200) {
            this.$router.push({
              path: 'orderList'
            })
          } else {
            this.message(res.mess)
          }
        })
      }
    },
    created() {
      this.userId = getStore('userId')
      this.orderId = this.$route.query.orderId
      this.orderTitle = '订单号：' + this.orderId
      this._getOrderDet()
    },
    components: {
      YShelf,
      // countDown
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../assets/style/mixin";

  .orderState {
    // display: flex;
    align-items: center;
    flex-direction: row;
    margin: 50px -150px 20px 60px;
  }

  .orderState-close {
    display: flex;
    align-items: center;
    flex-direction: row;
    margin: 50px -800px 20px 60px;
  }

  .status-now {
    background: #F6F6F6;
    border: 1px solid #dadada;
    border-radius: 5px;
    padding: 22px 30px 20px;
    margin: 0 30px 30px 30px;
    line-height: 38px;
  }

  .status-title {
    font-size: 18px;
    color: #666;
  }

  .button {
    float: right;
    margin: -37px 0 20px 0;
  }

  .realtime {
    border-top: 1px solid #dcdcdc;
    margin-top: 20px;
    padding-top: 26px;
  }

  .red {
    color: #d44d44;
  }

  .address {
    line-height: 38px;
    word-wrap: break-word;
    word-spacing: normal;
    word-break: break-all;
    color: #626262;
  }

  .img-box {
    border: 1px solid #EBEBEB;
    margin-left: -80px;
  }

  img {
    display: block;
    @include wh(80px);
  }

  .goods-table {
    .n-b {
      display: flex;
      align-items: center;
      justify-content: center;

      >div {
        color: #626262;
        font-weight: 700;
        width: 165px;
        text-align: center;
      }
    }

    .cart-items {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 110px;
      padding: 15px 0 15px 111px;
      border-bottom: 1px solid #EFEFEF;

      a {
        color: #333;
      }
    }

    .price {
      padding-left: 107px;
    }

    .goods-num {
      padding-left: 60px;
    }
  }

  .order-discount-line {
    padding: 22px 30px 20px;
    line-height: 24px;
    text-align: right;
    font-size: 12px;

    &:first-child {
      line-height: 32px;
      text-align: right;
      font-size: 14px;
      font-weight: bolder;
    }
  }

  .gray-sub-title {
    height: 38px;
    padding: 0 24px;
    background: #EEE;
    border-top: 1px solid #DBDBDB;
    border-bottom: 1px solid #DBDBDB;
    line-height: 38px;
    font-size: 12px;
    color: #666;
    display: flex;

    span {
      display: inline-block;
      height: 100%;
    }

    .first {
      display: flex;
      justify-content: space-between;
      flex: 1;

      .f-bc {
        >span {
          width: 130px;
          text-align: center;
        }
      }
    }

    .last {
      width: 230px;
      text-align: center;
      display: flex;
      border-left: 1px solid #ccc;

      span {
        flex: 1;
      }
    }
  }

  .bt {
    border-top: 1px solid #EFEFEF;
  }

  .date {
    padding-left: 0px;
  }

  .order-id {
    margin-left: 10px;
  }

  .cart {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;

    &:hover {
      .del-order {
        display: block;
      }
    }

    .del-order {
      display: none;
    }

    .cart-l {
      display: flex;
      align-items: center;
      flex: 1;
      padding: 15px 0;
      justify-content: space-between;
      position: relative;

      &:before {
        position: absolute;
        content: ' ';
        right: -1px;
        top: 0;
        width: 1px;
        background-color: #EFEFEF;
        height: 100%;
      }

      .ellipsis {
        margin-left: 20px;
        width: 220px;
      }

      .img-box {
        border: 1px solid #EBEBEB;
      }

      img {
        display: block;
        @include wh(80px);
      }

      .cart-l-r {
        display: flex;

        >div {
          text-align: center;
          width: 112px;
        }
      }

      .car-l-l {
        display: flex;
        align-items: center;
      }
    }

    .cart-r {
      width: 230px;
      display: flex;

      span {
        text-align: center;
        flex: 1;
      }
    }
  }

  .prod-operation {
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 254px;

    div {
      width: 100%;
      text-align: center;
    }

    div:last-child {
      padding-right: 24px;
    }
  }

  .price-total {
    height: 54px;
    line-height: 54px;
    font-size: 18px;
  }

  .price-red {
    font-weight: 700;
    color: #d44d44;
  }
</style>