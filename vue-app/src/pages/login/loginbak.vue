<template>
  <div class="mystyle">

<!--    <div class="backimg"></div>-->
    <div id="login" class="login">

<!--      <van-icon name="map-marked" size="100px" color="#409EFF"/>-->
<!--      滴滴——你的签到小管家！-->
      <div style="border: 0px solid red;width: 100%;height: 20px;margin-bottom: 5%;">
        <p class="font" style="line-height: 10%;text-align: left;font-weight: bold;letter-spacing: 2px;">自律使人自由!</p>
      </div>

      <div class="demo-input-size margin_top_10 font">
        <input v-model="account" type="text" style="background: none;border-bottom: 1px solid #c0c4cc;width: 100%;font-size: 14px;color: black;line-height: 40px;" placeholder="请输入账号"></input>
      </div>

      <div class="demo-input-size margin_top_10">
        <input v-model="password" type="password" style="background: none;border-bottom: 1px solid #c0c4cc;width: 100%;font-size: 14px;color: black;line-height: 40px;" placeholder="请输入密码"></input>
      </div>

      <div class="register">
        <div class="register_line">还没有账号？<div class="font_style" @click="register()">点击注册</div></div>
      </div>

      <div class="margin_top_10">
        <el-button style="width: 100%;border-radius: 10px;margin-top: 20%;background-color: rgba(255,255,255,0.25) ;border: 0px solid #c2c2c2" type="primary" @click="login()" round>登陆</el-button>
        <el-button style="width: 80%;opacity: 0" type="primary" @click="test()" round>测试</el-button>
      </div>

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
          },
          login() {
            if( this.account !== "" && this.password !== "" ) {
              this.$req.post('account/login', {
                account: this.account,
                password: this.password,
                type: 1
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
            // this.$router.push('/schedule');
          } else {
            // this.$router.push('/sign');
          }
        },
        mounted() {
        },
    }


</script>

<style scoped>
  /*注意这个scope它将所有的css都限定在这个页面中*/
  .van-cell{
    background-color: #f6f6f6;
  }
  /***************************************以上是对组件中css的改动********************************************/
  .login {
    margin-top: 45%;
    width: 80%;
    margin-left: 10%;
    border-radius: 20px;
    background: inherit;
    z-index:-3;
    position: relative;
  }

  .login div{
    z-index: 2;
  }

  .login::before {
    content: "";
    width: 120%;
    height: 120%;
    top: -10%;
    left: -10%;
    border-radius: 20px;
    position: absolute;
    background: inherit;
    filter: blur(40px);/*40px*/
    z-index: -1;
    border-radiu: 5px;
  }

  .margin_top_10 {
    margin-top: 10px;
  }
  .register {
    font-size: 10px;
  }
  .font_style {
    color: blue;
  }

  .register_line {
    display: flex;
    float: right;
    margin-top: 15px;
    margin-right: 15px;
  }

  .mystyle {
    position: absolute;
    width: 100%;
    bottom: 0px;
    top: 0px;
    text-align: initial;
    z-index: 0;
    background:url(../../assets/images/gcl_background/background4.jpg) no-repeat fixed;
    background-size: 100% 100%;
  }

  /**全背景模糊**/
  /*.mystyle::before{*/
  /*  content: '';*/
  /*  width: 100%;*/
  /*  top: 0px;*/
  /*  bottom: 0px;*/
  /*  position: absolute;*/
  /*  z-index: -1;*/
  /*  background:url(../../assets/images/gcl_background/ocean3.jpg);*/
  /*  background-repeat: no-repeat;*/
  /*  background-size: 100% 100%;*/
  /*  filter: blur(5px);*/
  /*}*/

  .font{
    font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
  }

</style>

