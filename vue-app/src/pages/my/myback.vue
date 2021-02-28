<template>
  <div class="mystyle">
    <div class="bar">
      <van-nav-bar title="我的" :z-index="999">
      </van-nav-bar>
    </div>
    <div class="perHead">
      <div class="headImg">
        <img src="../../assets/logo.png" class="headimg"/>
      </div>
      <div class="name">
        <div v-if="this.user">
          <div class="username">{{user.name}}</div>
          <div class="fontsize"><van-icon name="award-o" size="14px" color="white"/>{{user.class}}</div>
        </div>
        <div v-else>
          <div class="loginfont" @click="login()"> {{ loginfont }} </div>
        </div>
      </div>
      <!--<div class="set">-->
        <!--<van-icon name="setting-o" size="30px" color="white"/>-->
      <!--</div>-->
    </div>

    <van-row class="user-links">
      <van-col span="6">
        <van-icon name="pending-payment" />
        签到记录
      </van-col>
      <van-col span="6">
        <van-icon name="records" />
        签到统计
      </van-col>
      <van-col span="6">
        <van-icon name="tosend" />
        个人信息
      </van-col>
      <van-col span="6">
        <van-icon name="logistics" />
        问题反馈
      </van-col>
    </van-row>

    <!--<van-cell-group class="user-group">-->
      <!--<van-cell icon="records" title="个人信息" is-link />-->
      <!--<van-cell icon="points" title="问题反馈" is-link />-->
    <!--</van-cell-group>-->

  </div>
</template>

<script>
  import loading_img from '@/assets/loading.gif'
  import { Row, Col, Icon, Cell, CellGroup } from 'vant';
  export default {
    data: function () {
      return {
        name: "lime",
        loading_img: loading_img,
        loginfont: "点击登录",
        user: "",
        //   {
        //   name: "Lime",
        //   class: "软件工程162",
        // },
      }
    },
    components: {
      [Row.name]: Row,
      [Col.name]: Col,
      [Icon.name]: Icon,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup
    },
    mounted(){
    },
    methods: {
      login() {
        console.log("hhhkjkl");
        this.$router.push('/login');
        // this.$refs.loginForm.validate((valid) => {
        //   if (valid) {
        //     if (this.user.name === 'admin' && this.user.pass === '123') {
        //       // dispatch采用Promise链式调用
        //       this.$store.dispatch('login', this.user).then(() => {
        //         this.$notify({
        //           type: 'success',
        //           message: '欢迎你,' + this.user.name + '!',
        //           duration: 3000
        //         })
        //         // this.$router.replace('/')
        //       })
        //     } else {
        //       this.$message({
        //         type: 'error',
        //         message: '用户名或密码错误',
        //         showClose: true
        //       })
        //     }
        //   }
        //   else {
        //     return false
        //   }
        // })
      }
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
      box-shadow: darkgrey 4px 4px 10px 1px ;
      border-radius: 8px;
      .van-icon {
        display: block;
        font-size: 24px;
      }
    }
  }
  .perHead {
    padding-top: 50px;
    height: 135px;
    background-color: #F56C6C;
  }
  .headImg {
    width: 60px;
    height: 60px;
    position: absolute;
    margin-left: 10%;
    margin-top: 20px;
    border-radius: 3em;
  }
  .headimg {
    width: 60px;
    height: 60px;
    border-radius: 3em;
  }
  .name {
    position: absolute;
    margin-left: calc(10% + 90px);
    margin-top: 30px;
    text-align: left;
    .username {
      margin-left: 6px;
    }
    .fontsize {
      margin-top: 6px;
      font-size: 13px;
      padding: 1px 4px 1px 4px;
      background-color: #00868B;
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
</style>
