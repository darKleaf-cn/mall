<template>
  <div class="checkout">
    <y-header>
      <div slot="nav"></div>
    </y-header>
    <div class="w" style="padding-top: 40px">
      <!-- 收货地址 -->
      <y-shelf title="收货信息">
        <div slot="content">
          <ul class="address-item-list clearfix">
            <li
              v-for="(item, i) in addList"
              :key="i"
              class="address pr"
              :class="{ checked: receiverId === item.receiverId }"
              @click="
                chooseAddress(
                  item.receiverId,
                  item.receiverName,
                  item.receiverPhone,
                  item.receiverAddress
                )
              "
            >
              <span v-if="receiverId === item.receiverId" class="pa">
                <svg viewBox="0 0 1473 1024" width="17.34375" height="12">
                  <path
                    d="M1388.020 57.589c-15.543-15.787-37.146-25.569-61.033-25.569s-45.491 9.782-61.023 25.558l-716.054 723.618-370.578-374.571c-15.551-15.769-37.151-25.537-61.033-25.537s-45.482 9.768-61.024 25.527c-15.661 15.865-25.327 37.661-25.327 61.715 0 24.053 9.667 45.849 25.327 61.715l431.659 436.343c15.523 15.814 37.124 25.615 61.014 25.615s45.491-9.802 61.001-25.602l777.069-785.403c15.624-15.868 25.271-37.66 25.271-61.705s-9.647-45.837-25.282-61.717M1388.020 57.589z"
                    fill="#6A8FE5"
                    p-id="1025"
                  ></path>
                </svg>
              </span>
              <p>
                收货人: {{ item.receiverName }}
                {{ item.isDefault ? "(默认地址)" : "" }}
              </p>
              <p class="street-name ellipsis">
                收货地址: {{ item.receiverAddress }}
              </p>
              <p>手机号码: {{ item.receiverPhone }}</p>
              <div class="operation-section">
                <span
                  class="update-btn"
                  style="font-size: 12px"
                  @click="update(item)"
                  >修改</span
                >
                <span
                  class="delete-btn"
                  style="font-size: 12px"
                  :data-id="item.receiverId"
                  @click="del(item.receiverId)"
                  >删除</span
                >
              </div>
            </li>

            <li class="add-address-item" @click="update()">
              <img src="../../../static/svg/jia.svg" alt="" />
              <p>使用新地址</p>
            </li>
          </ul>
        </div>
      </y-shelf>
      <!-- 购物清单 -->
      <y-shelf title="购物清单">
        <div slot="content">
          <div class="box-inner ui-cart">
            <div>
              <!--标题-->
              <div class="cart-table-title">
                <span class="name">商品信息</span>
                <span class="subtotal">小计</span>
                <span class="num">数量</span>
                <span class="price">单价</span>
              </div>
              <!--列表-->
              <div class="cart-table" v-for="(item, i) in checkList" :key="i">
                <div v-if="item.checked === '1'">
                  <div class="cart-group divide pr" :data-bookId="item.bookId">
                    <div class="cart-top-items">
                      <div class="cart-items clearfix">
                        <!--图片-->
                        <div class="items-thumb fl">
                          <img :alt="item.name" :src="item.image" />
                          <a
                            @click="bookDetail(item.bookId)"
                            :title="item.name"
                            target="_blank"
                          ></a>
                        </div>
                        <!--信息-->
                        <div class="name hide-row fl">
                          <div class="name-table">
                            <a
                              @click="bookDetail(item.bookId)"
                              :title="item.name"
                              target="_blank"
                              v-text="item.name"
                            ></a>
                            <!-- <ul class="attribute">
                            <li>白色</li>
                          </ul> -->
                          </div>
                        </div>
                        <!--商品数量-->
                        <div>
                          <!--总价格-->
                          <div class="subtotal" style="font-size: 14px">
                            ¥ {{ item.price * item.bookNum }}
                          </div>
                          <!--数量-->
                          <div class="item-cols-num">
                            <span v-text="item.bookNum"></span>
                          </div>
                          <!--价格-->
                          <div class="price">¥ {{ item.price }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 合计 -->
            <div class="cart-bottom-bg fix-bottom">
              <div class="fix-bottom-inner">
                <div class="shipping">
                  <div class="shipping-box" style="padding: 0 40px">
                    <div class="shipping-total shipping-price">
                      <h4 class="highlight">
                        应付总额：<em>￥{{ checkPrice }}</em>
                      </h4>
                    </div>
                  </div>
                  <y-button
                    class="big-main-btn"
                    :classStyle="submit ? 'disabled-btn' : 'main-btn'"
                    style="
                      margin: 0;
                      width: 130px;
                      height: 50px;
                      line-height: 50px;
                      font-size: 16px;
                    "
                    :text="submitOrder"
                    @btnClick="_submitOrder"
                  >
                  </y-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </y-shelf>

      <y-popup :open="popupOpen" @close="popupOpen = false" :title="popupTitle">
        <div slot="content" class="md" :data-id="msg.receiverId">
          <div>
            <input
              type="text"
              placeholder="收货人姓名"
              v-model="msg.receiverName"
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="手机号码"
              v-model="msg.receiverPhone"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="收货地址"
              v-model="msg.receiverAddress"
            />
          </div>
          <div>
            <el-checkbox class="auto-login" v-model="msg.isDefault"
              >设为默认</el-checkbox
            >
          </div>
          <y-button
            text="保存"
            class="btn"
            :classStyle="btnHighlight ? 'main-btn' : 'disabled-btn'"
            @btnClick="
              save({
                userId: userId,
                receiverId: msg.receiverId,
                receiverName: msg.receiverName,
                receiverPhone: msg.receiverPhone,
                receiverAddress: msg.receiverAddress,
                isDefault: msg.isDefault,
              })
            "
          >
          </y-button>
        </div>
      </y-popup>
    </div>
    <y-footer></y-footer>
  </div>
</template>
<script>
import {
  receiverList,
  updateReceiver,
  addReceiver,
  delReceiver,
  productDet,
  submitOrder,
} from "@/api/goods";
import YShelf from "/components/shelf";
import YButton from "/components/YButton";
import YPopup from "/components/popup";
import YHeader from "/common/header";
import YFooter from "/common/footer";
import { getStore } from "/utils/storage";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      checkList: [],
      addList: [],
      receiverId: "0",
      popupOpen: false,
      popupTitle: "管理收货地址",
      num: "", // 立刻购买
      bookId: "",
      msg: {
        receiverId: "",
        receiverName: "",
        receiverPhone: "",
        receiverAddress: "",
        isDefault: false,
      },
      receiverName: "",
      receiverPhone: "",
      receiverAddress: "",
      userId: "",
      orderTotal: 0,
      submit: false,
      submitOrder: "提交订单",
    };
  },
  computed: {
    ...mapState(["cartList"]),
    btnHighlight() {
      let msg = this.msg;
      return msg.receiverName && msg.receiverPhone && msg.receiverAddress;
    },
    // 选中的总价格
    checkPrice() {
      let totalPrice = 0;
      this.checkList &&
        this.checkList.forEach((item) => {
          if (item.checked === "1") {
            totalPrice += item.bookNum * item.price;
          }
        });
      // this.orderTotal = totalPrice
      return totalPrice;
    },
  },
  methods: {
    ...mapMutations(["INIT_BUYCART"]),
    message(m) {
      this.$message.error({
        message: m,
      });
    },
    bookDetail(id) {
      window.open(window.location.origin + "#/bookDetail?bookId=" + id);
    },
    _getcheckList() {
      for (let item of this.cartList) {
        if (item.checked === "1") {
          this.checkList.push(item);
        }
      }
    },
    _receiverList() {
      receiverList({
        userId: this.userId,
      }).then((res) => {
        let data = res.result.data;
        if (data.length) {
          this.addList = data;
          for (let i = 0; i < data.length; i++) {
            if (i === 0 || data[i].isDefault) {
              this.receiverId = data[i].receiverId;
              this.receiverName = data[i].receiverName;
              this.receiverPhone = data[i].receiverPhone;
              this.receiverAddress = data[i].receiverAddress;
            }
          }
        } else {
          this.addList = [];
        }
      });
    },
    _updateReceiver(params) {
      updateReceiver(params).then((res) => {
        this._receiverList();
      });
    },
    _addReceiver(params) {
      addReceiver(params).then((res) => {
        if (res.rtnCode === "200") {
          this._receiverList();
        } else {
          this.message(res.message);
        }
      });
    },
    _delReceiver(params) {
      delReceiver(params).then((res) => {
        this._receiverList();
      });
    },
    // 提交订单后跳转付款页面
    _submitOrder() {
      this.submitOrder = "提交订单中...";
      this.submit = true;
      var array = [];
      if (this.receiverId === "0") {
        this.message("请选择收货信息");
        this.submitOrder = "提交订单";
        this.submit = false;
        return;
      }
      if (this.checkList.length === 0) {
        this.message("非法操作");
        this.submitOrder = "提交订单";
        this.submit = false;
        return;
      }
      for (var i = 0; i < this.checkList.length; i++) {
        if (this.checkList[i].checked === "1") {
          array.push(this.checkList[i]);
        }
      }
      let params = {
        userId: this.userId,
        receiverId: this.receiverId,
        receiverName: this.receiverName,
        receiverPhone: this.receiverPhone,
        receiverAddress: this.receiverAddress,
        bookList: this.checkList,
      };
      submitOrder(params).then((res) => {
        if (res.rtnCode === "200") {
          this.payment(res.result.orderIdList);
        } else {
          this.message(res.message);
          this.submitOrder = "提交订单";
          this.submit = false;
        }
      });
    },
    // 付款
    payment(orderIdList) {
      let str = "";
      for(let item of orderIdList){
        str+= item +','
      }
      // 需要拿到地址id
      this.$router.push({
        path: "/order/payment",
        query: {
          orderId: str,
        },
      });
    },
    // 选择地址
    chooseAddress(receiverId, receiverName, receiverPhone, receiverAddress) {
      this.receiverId = receiverId;
      this.receiverName = receiverName;
      this.receiverPhone = receiverPhone;
      this.receiverAddress = receiverAddress;
    },
    // 修改
    update(item) {
      this.popupOpen = true;
      if (item) {
        this.popupTitle = "管理收货地址";
        this.msg.receiverName = item.receiverName;
        this.msg.receiverPhone = item.receiverPhone;
        this.msg.receiverAddress = item.receiverAddress;
        this.msg.isDefault = item.isDefault;
        this.msg.receiverId = item.receiverId;
      } else {
        this.popupTitle = "新增收货地址";
        this.msg.receiverName = "";
        this.msg.receiverPhone = "";
        this.msg.receiverAddress = "";
        this.msg.isDefault = false;
        this.msg.receiverId = "";
      }
    },
    // 保存
    save(p) {
      this.popupOpen = false;
      if (p.receiverId) {
        this._updateReceiver(p);
      } else {
        delete p.receiverId;
        this._addReceiver(p);
      }
    },
    // 删除
    del(receiverId) {
      this._delReceiver({
        receiverId,
      });
    },
    _productDet(bookId) {
      productDet({
        bookId,
      }).then((res) => {
        let item = res.result;
        item.checked = "1";
        item.productImg = item.productImageBig;
        item.bookNum = this.num;
        item.productPrice = item.price;
        this.checkList.push(item);
      });
    },
  },
  mounted() {
    this.INIT_BUYCART();
    this.userId = getStore("userId");
    let query = this.$route.query;
    if (query.bookId && query.num) {
      this.bookId = query.bookId;
      this.num = parseInt(query.num);
      this._productDet(this.bookId);
    } else {
      this._getcheckList();
    }
    this._receiverList();
  },
  components: {
    YShelf,
    YButton,
    YPopup,
    YHeader,
    YFooter,
  },
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
// 收货地址
.address-item-list {
  padding: 30px 13px 0;

  .address {
    padding: 19px 14px 0 19px;

    p {
      line-height: 26px;
    }
  }

  li.checked {
    border-color: #6a8fe5;
    position: relative;
    background: #fff;

    .pa {
      right: 15px;
      top: 18px;
    }

    &:hover {
      background: #fff;
    }
  }

  li {
    position: relative;
    overflow: hidden;
    float: left;
    width: 276px;
    height: 158px;
    margin: 0 0 30px 16px;
    border: 1px solid #e5e5e5;
    border-radius: 3px;
    background: #fafafa;
    line-height: 14px;
    text-align: left;
    word-wrap: break-word;
    word-break: normal;
    color: #626262;
    cursor: pointer;
    -moz-user-select: -moz-none;
    -webkit-user-select: none;
    -o-user-select: none;
    user-select: none;

    &:hover {
      background: #f2f2f2;

      .operation-section {
        visibility: visible;
        transform: translate(0, 0);
      }
    }

    &.add-address-item {
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      p {
        margin-top: 5px;
      }
    }

    .operation-section {
      visibility: hidden;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 28px;
      background: #e1e1e1;
      border-top: 1px solid #e1e1e1;
      transition: all 0.2s ease;
      transform: translate(0, 29px);
      border-top: 1px solid #e1e1e1;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 11;

      span {
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        height: 100%;

        &:hover {
          background: #f2f2f2;
        }
      }

      span + span {
        border-left: 1px solid #e1e1e1;
      }
    }
  }
}

.s-content {
  .md {
    > div {
      text-align: left;
      margin-bottom: 15px;

      > input {
        width: 100%;
        height: 50px;
        font-size: 18px;
        padding: 10px 20px;
        border: 1px solid #ccc;
        border-radius: 6px;
        box-shadow: 0 3px 5px -4px rgba(0, 0, 0, 0.4) inset,
          -1px 0 3px -2px rgba(0, 0, 0, 0.1) inset;
        line-height: 46px;
      }
    }
  }

  .btn {
    margin: 0;
    width: 100%;
    height: 50px;
    font-size: 14px;
    line-height: 48px;
  }
}

.ui-cart {
  img {
    width: 80px;
    height: 80px;
  }

  .cart-table-title {
    position: relative;
    z-index: 1;
    line-height: 38px;
    height: 38px;
    padding: 0 0 0 30px;
    font-size: 12px;
    background: #eee;
    border-bottom: 1px solid #dbdbdb;
    border-bottom-color: rgba(0, 0, 0, 0.08);

    .name {
      float: left;
      text-align: left;
    }

    span {
      width: 137px;
      float: right;
      text-align: center;
      color: #838383;
    }
  }

  .cart-group.divide {
    .cart-items {
      border-top: 1px dashed #eee;
    }
  }

  .cart-items {
    position: relative;
    height: 140px;
    margin-left: 74px;

    .subtotal {
      font-weight: 700;
    }

    .item-cols-num,
    .price,
    .subtotal {
      overflow: hidden;
      float: right;
      width: 137px;
      text-align: center;
      color: #666;
      line-height: 140px;
    }

    /*数量*/
    .subtotal,
    .item-cols-num {
      padding-top: 50px;
      line-height: 40px;
    }

    .select {
      width: 112px;
      height: 40px;
      padding-top: 4px;
      margin: 0 auto;
      line-height: 40px;

      .down {
        background-position: 0 -60px;
      }

      .down.down-disabled:hover {
        background-position: 0 -300px;
        cursor: not-allowed;
      }

      .num {
        position: relative;
        overflow: hidden;
        display: inline-block;
        width: 36px;
        height: 18px;
        margin: 7px 0 0;
        border: none;
        border-radius: 3px;
        line-height: 18px;
        text-align: center;
        font-size: 14px;
        transition: all 0.2s ease-out;
      }
    }
  }

  .down.down-disabled {
    background-position: 0 -300px;
    cursor: not-allowed;
  }
}

.cart-group.divide .cart-top-items:first-child .cart-items {
  border-top: none;
}

.items-choose {
  position: absolute;
  left: -74px;
  top: 0;
  width: 74px;
  height: 20px;
  padding: 60px 0 0 31px;
  font-size: 12px;
  color: #999;
}

.items-thumb {
  position: relative;
  margin-top: 30px;
  overflow: hidden;
  width: 80px;
  height: 80px;
}

.cart-items .items-thumb > a,
.ui-cart .cart-items .items-thumb > i {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border: 1px solid #fff;
  border-radius: 3px;
  border: 0 solid rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.06);
}

.name {
  width: 380px;
  margin-left: 20px;
  color: #323232;
  display: table;

  a {
    color: #333;
    font-size: 16px;
  }
}

.name-table {
  display: table-cell;
  vertical-align: middle;
  height: 140px;
}

.fix-bottom {
  padding: 22px 29px 19px 30px;
  height: 90px;
  width: 100%;
  z-index: 1;
  background-position: center;
  background: #fdfdfd;
  background: -webkit-linear-gradient(#fdfdfd, #f9f9f9);
  background: linear-gradient(#fdfdfd, #f9f9f9);
  border-top: 1px solid #e9e9e9;
  box-shadow: 0 -3px 8px rgba(0, 0, 0, 0.04);

  .cart-bottom-bg {
    height: 80px;
    border-top: 1px solid #d9d9d9;
    border-radius: 0 0 8px 8px;
  }

  .fix-bottom-inner {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .shipping {
    display: flex;
    align-items: center;
  }

  em {
    display: inline-block;
    position: relative;
    top: 3px;
    margin-top: -4px;
    font-size: 24px;
    color: #d44d44;
    font-weight: 700;
  }
}

.attribute,
.name p {
  color: #999;
  font-size: 12px;
  padding-top: 4px;
  line-height: 17px;
}
</style>