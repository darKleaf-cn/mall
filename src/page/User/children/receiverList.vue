<template>
  <div>
    <y-shelf title="收货地址">
      <span slot="right"
        ><y-button
          text="添加收货地址"
          style="margin: 0"
          @btnClick="update()"
        ></y-button
      ></span>
      <div slot="content">
        <!--标题-->
        <div class="table-title">
          <span class="name">姓名</span> <span class="address">详细地址</span>
          <span class="receiverPhone">电话</span>
        </div>
        <div v-if="addList.length">
          <div class="address-item" v-for="(item, i) in addList" :key="i">
            <div class="name">{{ item.receiverName }}</div>
            <div class="address-msg">{{ item.receiverAddress }}</div>
            <div class="receiverPhoneephone">{{ item.receiverPhone }}</div>
            <div class="defalut">
              <a
                href="javascript:;"
                v-text="item.isDefault ? '( 默认地址 )' : ''"
                :class="{ 'defalut-address': item.isDefault }"
              ></a>
            </div>
            <div class="operation">
              <el-button
                type="primary"
                icon="edit"
                size="small"
                @click="update(item)"
                >修改</el-button
              >
              <el-button
                type="danger"
                icon="delete"
                size="small"
                :data-id="item.receiverId"
                @click="del(item.receiverId, i)"
                >删除</el-button
              >
            </div>
          </div>
        </div>
        <div v-else>
          <div style="padding: 80px 0; text-align: center">
            <div style="font-size: 20px">你还未添加收货地址</div>
            <div style="margin: 20px">
              <y-button text="添加地址" @btnClick="update()"></y-button>
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
</template>
<script>
import {
  receiverList,
  updateReceiver,
  addReceiver,
  delReceiver,
} from "@/api/goods";
import YButton from "/components/YButton";
import YPopup from "/components/popup";
import YShelf from "/components/shelf";
import { getStore } from "/utils/storage";
export default {
  data() {
    return {
      addList: [],
      popupOpen: false,
      popupTitle: "管理收货信息",
      msg: {
        receiverId: "",
        receiverName: "",
        receiverPhone: "",
        receiverAddress: "",
        isDefault: false,
      },
      userId: "",
    };
  },
  computed: {
    btnHighlight() {
      let msg = this.msg;
      return msg.receiverName && msg.receiverPhone && msg.receiverAddress;
    },
  },
  methods: {
    message(m) {
      this.$message.error({
        message: m,
      });
    },
    _receiverList() {
      receiverList({ userId: this.userId }).then((res) => {
        let data = res.result.data;
        if (data.length) {
          this.addList = data;
          this.receiverId = data[0].receiverId;
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
    changeDef(item) {
      if (!item.isDefault) {
        item.isDefault = true;
        this._updateReceiver(item);
      }
      return false;
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
    del(receiverId, i) {
      delReceiver({ receiverId: receiverId,userId:this.userId }).then((res) => {
        if (res.rtnCode === "200") {
          this.addList.splice(i, 1);
        } else {
          this.message("删除失败");
        }
      });
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
  },
  created() {
    this.userId = getStore("userId");
    this._receiverList();
  },
  components: {
    YButton,
    YPopup,
    YShelf,
  },
};
</script>
<style scoped lang="scss">
.table-title {
  position: relative;
  z-index: 1;
  line-height: 38px;
  height: 38px;
  padding: 0 0 0 38px;
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
    float: left;
    text-align: center;
    color: #838383;
  }
  .address {
    margin-left: 115px;
  }
  .receiverPhone {
    margin-left: 195px;
  }
}

.address-item {
  display: flex;
  align-items: center;
  height: 115px;
  text-align: center;
  .name {
    width: 106px;
  }
  .address-msg {
    flex: 1;
  }
  .receiverPhoneephone {
    width: 160px;
  }
  .defalut {
    width: 80px;
    > a {
      text-align: center;
      /*display: none;*/
    }
  }
  .operation {
    width: 135px;
    a {
      padding: 10px 5px;
    }
  }
  &:hover {
    .defalut > a {
      display: block;
    }
  }
}

.address-item + .address-item {
  border-top: 1px solid #cfcfcf;
}

.defalut-address {
  color: #626262;
  display: block;
  pointer-events: none;
  cursor: default;
}

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
</style>
