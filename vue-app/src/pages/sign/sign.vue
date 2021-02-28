<template>
  <div>
    <van-nav-bar title="签到" :z-index="999"> </van-nav-bar>
    <div class="sign">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img
            src="../../assets/gonggao.jpg"
            style="width: 100%; height: 150px"
          />
        </van-swipe-item>
      </van-swipe>

      <van-notice-bar color="#4f4f4f" background="#fff" left-icon="volume-o">
        通知内容
      </van-notice-bar>

      <div class="domain">
        <div
          class="console"
          v-for="(item, index1) in consoleData"
          :key="index1"
        >
          <div
            class="consoletitle"
            v-if="(user.type == 2 && index1 == 0) || index1 >= 1"
          >
            <div style="font-size: 13px; margin-left: 5px">{{ item.name }}</div>
            <div style="font-size: 10px; color: #a0a5ab">{{ item.tip }}</div>
          </div>
          <div
            class="itemchoose"
            v-if="(user.type == 2 && index1 == 0) || index1 >= 1"
          >
            <div
              v-for="(chooseitem, index) in item.choose"
              :key="index"
              class="itemc"
            >
              <router-link :to="chooseitem.functionname">
                <van-icon
                  :name="chooseitem.iconname"
                  :color="chooseitem.color"
                />
                <div style="font-size: 13px; color: #7a8187; margin-top: 4px">
                  {{ chooseitem.name }}
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <!--<div class="choose_item">-->
      <!--<div class="item">-->
      <!--<van-icon name="todo-list" color="#FF846C" size="100%" />-->
      <!--<p style="font-size: 35%;">历史签到</p>-->
      <!--</div>-->
      <!--<div class="item" @click="hashSeat">-->
      <!--<van-icon name="weapp-nav" color="#12E2C8" size="100%" />-->
      <!--<p style="font-size: 35%;">座位测试</p>-->
      <!--</div>-->
      <!--<div class="item">-->
      <!--<van-icon name="award" color="#89E17B" size="100%" @click="creatsign"/>-->
      <!--<p style="font-size: 35%;">发起签到</p>-->
      <!--</div>-->
      <!--<div class="item">-->
      <!--<van-icon name="bell" color="#26CAFD" size="100%" />-->
      <!--<p style="font-size: 35%;">发起历史</p>-->
      <!--</div>-->
      <!--</div>-->

      <!--<van-pull-refresh v-model="isLoading" @refresh="onRefresh">-->

      <!--<div class="signcard">-->

      <!--<div class="signcard_item" style="margin-bottom: 10px;">-->
      <!--<van-panel title="7月2日" desc="数据结构课签到" status="签到中">-->
      <!--<div slot="footer" style="height: 30px;">-->
      <!--<van-button @click="tosign" style="float: right;margin-right: 30px;" size="small" type="danger">立即签到</van-button>-->
      <!--</div>-->
      <!--</van-panel>-->
      <!--</div>-->

      <!--<div class="signcard_item" style="margin-bottom: 10px;">-->
      <!--<van-panel title="7月2日" desc="数据结构课签到" status="签到中">-->
      <!--<div slot="footer" style="height: 30px;">-->
      <!--<van-button  @click="show" style="float: right;margin-right: 30px;" size="small" type="danger">立即签到</van-button>-->
      <!--</div>-->
      <!--</van-panel>-->
      <!--</div>-->

      <!--<div class="signcard_item" style="margin-bottom: 10px;">-->
      <!--<van-panel title="7月2日" desc="数据结构课签到" status="签到中">-->
      <!--<div slot="footer" style="height: 30px;">-->
      <!--<van-button  @click="apitest" style="float: right;margin-right: 30px;" size="small" type="danger">apitest</van-button>-->
      <!--</div>-->
      <!--</van-panel>-->
      <!--</div>-->

      <!--<div class="signcard_item" style="margin-bottom: 10px;">-->
      <!--<van-panel title="7月2日" desc="数据结构课签到" status="签到中">-->
      <!--<div slot="footer" style="height: 30px;">-->
      <!--<van-button  @click="sitchoose" style="float: right;margin-right: 30px;" size="small" type="danger">清除登录信息</van-button>-->
      <!--</div>-->
      <!--</van-panel>-->
      <!--</div>-->

      <!--</div>-->

      <!--</van-pull-refresh>-->
    </div>
  </div>
</template>

<script>
import gonggao from "../../assets/gonggao.jpg";
import { Toast } from "vant";
export default {
  data() {
    return {
      user: "",
      gonggao,
      images: [gonggao],
      count: 0,
      isLoading: false,
      consoleData: [
        {
          name: "管理控制台",
          tip: "(教师及管理员可见)",
          choose: [
            {
              name: "新建签到",
              iconname: "add-square",
              color: "#17D8FF",
              functionname: "/creatnewsign",
            },
            {
              name: "签到管理",
              iconname: "setting",
              color: "#ff911b",
              functionname: "/signmanagement",
            },
            {
              name: "消息发送",
              iconname: "chat",
              color: "#ff7c00",
              functionname: "/messageadd",
            },
            {
              name: "消息管理",
              iconname: "column",
              color: "#15bc84",
              functionname: "/messagemanagement",
            },
          ],
        },
        {
          name: "签到管理",
          tip: "",
          choose: [
            {
              name: "签到",
              iconname: "location",
              color: "#40b4ff",
              functionname: "/studentsign",
            },
            {
              name: "签到记录",
              iconname: "comment",
              color: "#f15642",
              functionname: "/studentsignrecord",
            },
            // { name: '签到点管理', iconname: 'column', color: '#15bc84' },
            // { name: '消息发送', iconname: 'chat', color: '#ff7c00' }
          ],
        },
        {
          name: "协同效率",
          tip: "",
          choose: [
            {
              name: "问卷调查",
              iconname: "underway",
              color: "#FFAD29",
              functionname: "/addsign",
            },
            {
              name: "智能填表",
              iconname: "todo-list",
              color: "#29D4FF",
              functionname: "/addsign",
            },
            // { name: '签到点管理', iconname: 'column', color: '#15bc84' },
            // { name: '消息发送', iconname: 'chat', color: '#ff7c00' }
          ],
        },
        {
          name: "课堂应用",
          tip: "",
          choose: [
            {
              name: "随机选人",
              iconname: "manager",
              color: "#FF6417",
              functionname: "/addsign",
            },
            {
              name: "小组管理",
              iconname: "cluster",
              color: "#17D8FF",
              functionname: "/addsign",
            },
            // { name: '签到点管理', iconname: 'column', color: '#15bc84' },
            // { name: '消息发送', iconname: 'chat', color: '#ff7c00' }
          ],
        },
        {
          name: "其他应用",
          tip: "",
          choose: [
            {
              name: "功能待定",
              iconname: "more",
              color: "#40b4ff",
              functionname: "/addsign",
            },
            // { name: '新建问卷', iconname: 'underway', color: '#ff911b' }
            // { name: '签到点管理', iconname: 'column', color: '#15bc84' },
            // { name: '消息发送', iconname: 'chat', color: '#ff7c00' }
          ],
        },
      ],
    };
  },

  methods: {
    tip() {
      this.$toast("功能有待开发");
    },
    creatsign: function () {
      this.$router.push("/addsign");
    },
    hashSeat: function () {
      this.$router.push("/hallSeat");
    },
    sitchoose() {
      localStorage.clear("persion_info");
    },
    tosign() {
      this.$router.push("/selectLocation");
    },
    show() {
      let onDeviceReady = function () {
        initBaiduMap();
      };

      function initBaiduMap() {
        // 进行定位
        if ("baidumap_location" in window) {
          alert("定位中。。。");
          baidumap_location.getCurrentPosition(
            function (result) {
              alert(result.latitude);
              alert(result.longitude);
              alert(JSON.stringify(result));
            },
            function (error) {
              console.error(error);
            }
          );
        } else {
          console.error("baidumap_location is undefined");
        }
      }

      document.addEventListener("deviceready", onDeviceReady, false);
    },
    apitest() {
      this.$req.post("helloSpringBoot", {}).then((res) => {
        console.log(res);
      });
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        this.count++;
      }, 500);
    },
  },
  created() {
    if (JSON.parse(localStorage.getItem("persion_info"))) {
      this.user = JSON.parse(localStorage.getItem("persion_info"));
      console.log(this.user);
    } else {
      // this.$router.push('/');
    }
  },
  mounted() {},
};
</script>

<style scoped>
.my-swipe {
  color: #fff;
  font-size: 20px;
  line-height: 130px;
  text-align: center;
  background-color: #39a9ed;
}
.domain {
  background-color: white;
  width: 100%;
  margin-top: 5px;
  min-height: 10px;
  margin-bottom: 5px;
}
.console {
  padding: 7px;
}
.consoletitle {
  color: #434c53;
  display: flex;
  align-items: flex-end;
  font-weight: bold;
}
.itemchoose {
  margin-top: 5px;
  display: flex;
  flex-wrap: wrap;
}
.itemc {
  margin: 5px 0px;
  width: 25%;
}
</style>
