<template>
    <div class="mystyle">
      <div class="backimg"></div>

      <div class="bodycolor"></div>

      <div class="perHead">
        <div class="headImg">
          <img src="../../assets/logo.png" class="headimg" />
        </div>

        <div class="name">
          <div v-if="this.user">
            <div class="username">{{ user.account.name }}</div>
            <div class="fontsize">{{ user.account.class_name }}</div>
          </div>
          <div v-else>
            <div class="loginfont">{{ loginfont }}</div>
          </div>
        </div>
      </div>

      <van-cell-group class="user-group">
        <van-cell icon="records" title="签到记录" is-link />
        <van-cell icon="points" title="签到统计" is-link />
        <van-cell icon="records" title="个人信息" is-link />
        <van-cell icon="points" title="问题反馈" is-link />
        <van-cell
          icon="points"
          title="WIFI信息获取"
          @click="towifiget()"
          is-link
        />
      </van-cell-group>

      <div class="loginout_but" v-if="this.user">
        <van-button
          plain
          type="danger"
          @click="loginout()"
          round
          style="width: 60%"
          >退出登录</van-button
        >
      </div>
      <div class="loginout_but" v-else>
        <van-button type="default" @click="login()" round style="width: 60%"
          >点击登录</van-button
        >
      </div>
    </div>
</template>

<script>
import loginback from "../../assets/loginback.jpg";
import loading_img from "../../assets/loading.gif";
import back from "../../assets/goodnightBack.jpg";
import { Row, Col, Icon, Cell, CellGroup } from "vant";
export default {
  data: function () {
    return {
      name: "lime",
      back: back,
      loginback: loginback,
      loading_img: loading_img,
      loginfont: "请登录",
      user: "",
      //   {
      //   name: "Lime",
      //   class: "软件工程162",
      // },
    };
  },
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
  },
  mounted() {},
  created() {
    this.user = JSON.parse(localStorage.getItem("persion_info"));
    console.log(this.user);
    // if( JSON.parse(localStorage.getItem('persion_info')) ) {
    //   this.user = JSON.parse(localStorage.getItem('persion_info'));
    // } else {
    //   // this.$router.push('/');
    // }
  },
  methods: {
    towifiget() {
      this.$router.push("/wifiget");
    },
    loginout() {
      localStorage.clear("persion_info");
      this.user = "";
      this.$toast("退出成功");
      this.$router.push("/login");
    },
    login() {
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="less">
.user {
  &-poster {
    width: 100%;
    height: 53vw;
    display: block;
  }
  &-group {
    margin-bottom: 15px;
    margin-top: 15px;
  }
  &-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;
    margin-top: -40px;
    width: 90%;
    margin-left: 5%;
    box-shadow: darkgrey 4px 4px 10px 1px;
    border-radius: 8px;
    .van-icon {
      display: block;
      font-size: 24px;
    }
  }
}
.perHead {
  margin-top: 55%;
  height: 90px;
  background-color: white;
  border-radius: 30px;
}
.bodycolor {
  border-radius: 30px;
  position: absolute;
  width: 100%;
  z-index: 0;
  bottom: 0px;
  top: 30%;
  background: white;
}
.headImg {
  width: 80px;
  height: 80px;
  position: absolute;
  margin-left: calc(50% - 40px);
  margin-top: -40px;
  border: white 2px solid;
  border-radius: 3em;
  background-color: white;
}
.headimg {
  width: 60px;
  height: 60px;
  border-radius: 3em;
}
.name {
  color: #111;
  position: absolute;
  width: 200px;
  margin-left: calc(50% - 100px);
  margin-top: 50px;
  text-align: center;
  .username {
    font-size: 25px;
  }
  .fontsize {
    margin-top: 6px;
    font-size: 13px;
    border-radius: 3em;
  }
  .loginfont {
    font-size: 17px;
  }
}
.set {
  float: right;
  margin-top: 32px;
  margin-right: 9%;
}
.mystyle {
  margin-top: -30px;
}
.user-group {
  margin-top: 40px;
}
.bar {
  position: fixed;
  width: 100%;
  z-index: 999;
  padding-top: 30px;
  background: white;
  top: 0px;
}
.backimg {
  background-image: linear-gradient(
    -225deg,
    #9efbd3 0%,
    #57e9f2 48%,
    #45d4fb 100%
  );
  width: 100%;
  z-index: 0;
  position: absolute;
  top: -60px;
  bottom: 0px;
  overflow: hidden;
}
.loginout_but {
}
.infor_detail {
  position: absolute;
  display: flex;
  justify-content: space-around;
  border: red 1px solid;
  width: 100%;
  margin-top: 110px;
}
</style>
