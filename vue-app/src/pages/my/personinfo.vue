<template>
  <div>
    <van-nav-bar title="个人中心" :z-index="998"> </van-nav-bar>
    <!--  尝试处理细节使黑色的箭头只在最后一秒显示-->
    <div @touchmove="change">
      <div
        id="top"
        class="background_top"
        v-bind:class="{
          background_top_background1: ifRun1,
          background_top_background2: ifRun2,
        }"
      ></div>

      <div class="main">
        <div class="main_top">
          <div class="main_top_part1">
            <img class="main_top_part1_heading" src="../../assets/logo.png" />
          </div>
          <div class="main_top_part2">
            <b v-model="name">
              {{ user.account.name }}
              <p v-model="rank"><br />{{ rank }}</p></b
            >
          </div>
        </div>

        <van-panel
          id="panel"
          :title="institute"
          :desc="user.account.class_name"
          style="border-radius: 10px 10px; margin-top: 10px; "
        >
          <div class="main_bottom">
            <!--注意这里flex布局不换行-->
            <div
              style="
                overflow: hidden;
                padding: 10px 15px;
                width: 70vw;
                height: 28px;
              "
            >
              <!--注意这里隐藏x轴坐标的精髓在与外部的div的height与内部的divline-height高度相同-->
              <div
                style="
                  white-space: nowrap;
                  overflow: auto;
                  overflow-x: auto;
                  height: 44px;
                  font-size: 14px;
                  line-height: 28px;
                "
              >
                <b v-model="tag">邮箱: {{ tag }} </b>
              </div>
            </div>
            <van-icon @click="edit()" name="edit" />
          </div>
        </van-panel>

        <van-panel
          title="操作"
          style="
            height: 330px;
            margin-top: 20px;
            margin-bottom: 0px;
            border-radius: 10px 10px;
            padding: 0px 10px;
          "
        >
          <div>
            <div
              style="
                border: 0px solid red;
                width: 100%;
                height: 80px;
                display: flex;
                justify-content: space-around;
              "
            >
              <div style="font-size: 30px; margin: 20px; text-align: center">
                <van-icon
                  name="column"
                  color="#ff911b"
                  @click="studentsignrecord"
                />
                <p style="font-size: 13px">签到记录</p>
              </div>
              <div style="font-size: 30px; margin: 20px; text-align: center">
                <van-icon
                  name="todo-list"
                  color="#ffb500"
                  @click="studentsignrecord"
                />
                <p style="font-size: 13px">签到统计</p>
              </div>
            </div>
            <div
              style="
                border: 0px solid blue;
                margin-top: 20px;
                width: 100%;
                height: 80px;
                display: flex;
                justify-content: space-around;
              "
            >
              <div
                style="font-size: 30px; margin: 20px; text-align: center"
                @click="questions()"
              >
                <van-icon name="question" color="#4dc6fd" />
                <p style="font-size: 13px">问题反馈</p>
              </div>
              <div
                style="font-size: 30px; margin: 20px; text-align: center"
                @click="towifiget()"
              >
                <van-icon name="location" color="#00be88" />
                <p style="font-size: 13px">wifi信息获取</p>
              </div>
            </div>
            <div
              style="
                border: 0px solid blue;
                margin-top: 20px;
                width: 100%;
                height: 80px;
                display: flex;
                justify-content: space-around;
              "
            >
              <div
                style="font-size: 30px; margin: 20px; text-align: center"
                @click="positionTest()"
              >
                <van-icon name="question" color="#4dc6fd" />
                <p style="font-size: 13px">定位测试</p>
              </div>
              <div
                style="font-size: 30px; margin: 20px; text-align: center"
                @click="my()"
              >
                <van-icon name="location" color="#00be88" />
                <p style="font-size: 13px">退出登录</p>
              </div>
            </div>
          </div>
        </van-panel>
      </div>

      <div id="bottom" class="background_bottom" ref="bottom"></div>
    </div>
  </div>
</template>

<script>
import { Row, Col, Icon, Cell, CellGroup, Panel } from "vant";
export default {
  name: "personinfo",
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Panel.name]: Panel,
  },
  data: function () {
    return {
      user: {
        account: {
          name: "",
          class_name: "",
        },
        type: 1,
      },
      institute: "计算机与数据学院",
      major: "计算机181",
      name: "孙晓明",
      rank: "签到之星",
      tag: "1143037789@qq.com",
      sex: "男", //控制背景图片变化
      ifRun1: true,
      ifRun2: false,
    };
  },
  methods: {
    questions() {
      this.$router.push("/question");
    },
    my() {
      this.$router.push("/my");
    },
    positionTest() {
      this.$router.push("/wifiTest");
    },
    studentsignrecord() {
      this.$router.push("/studentsignrecord");
    },
    towifiget() {
      this.$router.push("/wifiget");
    },
    login() {
      this.$router.push("/loginbak");
    },
    onClickLeft() {
      this.$router.push("/my");
    },
    change() {
      var all = document.getElementById("bottom").offsetTop; /*计算初始距离*/
      var mid = document.getElementById("top").offsetTop;
      var now = this.$refs.bottom.getBoundingClientRect().top; /*计算动态距离*/
      console.log(all + "+" + now);
      var show = (all - now) / (all - mid); /*化为百分比计算*/
      document.getElementById("bar").style.opacity = show;
      document.getElementById("bar2").style.opacity = 1 - show;
    },
    edit() {
      this.$router.push("/edit_personInfo");
    },
  },
  created() {
    //注意created以后才会在内存中生成dom树
    if (this.sex == "男") {
      this.ifRun1 = false;
      this.ifRun2 = true;
    }
    if (JSON.parse(localStorage.getItem("persion_info"))) {
      this.user = JSON.parse(localStorage.getItem("persion_info"));
    } else {
      this.$toast("请登录");
    }
  },
  mounted() {},
};
</script>

<style scoped>
.van-hairline--bottom::after {
  border-bottom-width: 0px;
}

.van-cell {
  border-radius: 10px 10px;
}

#bar2 .van-icon-arrow-left:before {
  color: white;
}

#bar .van-icon-arrow-left:before {
  color: black;
}

/*****************************************以上是对组件中css的调整******************************************/

.background_top {
  /*为什么这里的div_bar栏会覆盖在div_backgroundTop之上，因为dvi_bar的position:fixed,脱离了正常的文档流*/
  /*border: 1px solid red;*/
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-blend-mode: soft-light, screen;
  height: 220px;
}

.background_top_background1 {
  background-image: url("../../assets/images/gcl_background/background5.jpg");
}

.background_top_background2 {
  background-image: url("../../assets/images/gcl_background/background4.jpg");
}

.main {
  border: 0px solid blue;
  position: absolute;
  width: calc(100% - 20px); /*宽度是width啊大哥,注意用calc运算符前后必须有空格*/
  padding: 2vw;
  height: 200px;
  text-align: left;
  z-index: 0;
  top: 60px;
}

.main_top {
  display: flex;
}

.main_top_part1 {
  margin-right: 10px;
}

.main_top_part1_heading {
  border-radius: 50%;
  width: 60px;
  height: 60px;
  border: 1px solid white;
}

.main_top_part2 {
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 3px;
  color: #ffffff;
  font-size: 15px;
}

.main_top_part2 p {
  font-size: 9px;
}

#panel {
  background-color: #ffffff;
  padding-bottom: 10rpx;
}

.main_bottom {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
}

.main_bottom div {
  text-align: center;
  line-height: 20px;
  font-size: 12px;
}

.background_bottom {
  border: 0px solid black;
  /*height: 200px;*/
  /*border: red 1px solid;*/
  z-index: 2;
}
.loginout_but {
  position: relative;
  margin-top: 420px;
}
</style>

