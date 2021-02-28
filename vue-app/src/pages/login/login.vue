<template>
<div class="login">
  <van-nav-bar title="打卡签到APP" :z-index="999"> </van-nav-bar>

   <div class="pictureBox"> 
     <el-image class="picture" src="/static/images/logo.png"></el-image>
 </div>
      <div class="demo-input-size top">
        <el-input
          placeholder="请输入账号"
          v-model="account">
        </el-input>
      </div>

      <div class="demo-input-size margin_top_10">
        <el-input
          placeholder="请输入密码"
          type="password"
          v-model="password">
        </el-input>
      </div>

      <div class="margin_top_10">
        <el-button style="width: 80%;" type="primary" @click="login()" round>登 陆</el-button>
        <el-button style="width: 80%;" type="primary" @click="test()" round>测 试</el-button>
      </div>

      <div class="register">
        <div class="register_line">还没有账号？<div class="font_style" @click="register()">点击注册</div></div>
      </div>
          
</div>
  
</template>

<script>
  import goodnightBack from '@/assets/goodnightBack.jpg'
  import loginback from '@/assets/loginback.jpg'
    export default {//Vue是通过webpack实现的模块化，因此可以使用import来引入模块
        name: "login",
        components: {},//定义私有组件
        data: function () {
            return {
              type: 1,
              account: "",
              password: "",
              loginback: loginback,
              goodnightBack: goodnightBack,
            }
        },
        methods: {
          register() {
            this.$router.push('/register');
          },
          test() {
            this.$router.push('/schedule');
            // this.$req.post('location/getLoc', {
            // })
            //   .then(res => {
            //     console.log(res);
            //   })
          },
          login() {
            if( this.account !== "" && this.password !== "" ) {
              let _this = this;
              if( _this.account.length >= 9 ) {
                _this.type = 1
              } else {
                _this.type = 2
              }
              this.$req.post('account/login', {
                account: this.account,
                password: this.password,
                type: this.type
              })
                .then(res => {
                  console.log(res);
                  if( res.error_code === 0 ) {
                    localStorage.setItem('persion_info', JSON.stringify(res.data));
                    localStorage.setItem('token', res.data.token);
                    // console.log(JSON.parse(localStorage.getItem('persion_info')));
                    // localStorage.setItem('userInfo', JSON.stringify(item));
                    this.$toast('登录成功');
                    this.$router.push('/schedule');
                  } else {
                    this.$toast(res.msg);
                  }
                })
            } else {
              this.$toast('请输入账号密码');
            }
          }
        },
        created() {
          if( JSON.parse(localStorage.getItem('persion_info')) ) {
            this.$router.push('/schedule');
          } else {
            // this.$router.push('/sign');
          }
        },
        mounted() {
        }

    }
</script>

<style scoped>
.login{
  padding: 20rpx;
  overflow-x: hidden;
}
.pictureBox {
  display: flex;
  justify-content: center;
}
.picture {
  margin-top: 60rpx;
  width: 80%;
  height: 400rpx;
  padding-top: 15%;
}
.bar {
  position: fixed;
  width: 100%;
  z-index: 999;
  padding-top: 30px;
  background: white;
  top: 0px;
}
  /* .login {
    margin-top: 70%;
    width: 80%;
    margin-left: 10%;
    border-radius: 20px;
  } */
  .margin_top_10 {
    margin-top: 10px;
    width: 80%;
    margin-left: 10%;
  }
  .register {
    font-size: 10px;
  }
  .font_style {
    color: #409EFF;
  }
  .register_line {
    display: flex;
    float: right;
    margin-top: 15px;
    margin-right: 15px;
  }
  .top {
    margin-top: 20px;
    width: 80%;
    margin-left: 10%;
  }
  .backimg {
    background-image: linear-gradient(-225deg, #9EFBD3 0%, #57E9F2 48%, #45D4FB 100%);
    width: 100%;
    z-index: -999;
    position: absolute;
    top: 0px;
    bottom: 0px;
    overflow: hidden;
  }
  .mystyle {
  }
</style>

