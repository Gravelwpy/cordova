<template>
  <div class="mystyle">
    <div class="bar">
      <van-nav-bar
        title="注册"
        left-text="返回"
        left-arrow
        @click-left="back"
        :z-index="999">
      </van-nav-bar>
    </div>

    <div class="login">

      <div class="demo-input-size">
        <el-input
          placeholder="请输入学号"
          v-model="register_info.stu_code">
        </el-input>
      </div>

      <div class="demo-input-size margin_top_10">
        <el-input
          placeholder="请输入姓名"
          v-model="register_info.stu_name">
        </el-input>
      </div>

      <div class="demo-input-size margin_top_10">
        <template>
          <el-select  style="width: 100%;" v-model="register_info.grade" placeholder="请选择班级">
            <el-option
              v-for="item in options"
              :key="item.class_id"
              :label="item.class_name"
              :value="item.class_id">
            </el-option>
          </el-select>
        </template>
      </div>

      <div class="demo-input-size margin_top_10">
        <template>
          <el-radio v-model="register_info.sex" label="男">男</el-radio>
          <el-radio v-model="register_info.sex" label="女">女</el-radio>
        </template>
      </div>

      <div class="demo-input-size margin_top_10">
        <el-input
          placeholder="请输入密码"
          type="password"
          v-model="register_info.password">
        </el-input>
      </div>

      <div v-if="password_same" class="attition">两次密码不同</div>

      <div class="demo-input-size margin_top_10">
        <el-input
          placeholder="请再次输入密码"
          type="password"
          @change="change"
          v-model="password_agaian">
        </el-input>
      </div>

      <div class="demo-input-size margin_top_10">
        <el-input
          placeholder="请输入电话"
          @change="change_tele"
          v-model="register_info.tele">
        </el-input>
      </div>
      <div v-if="tele_form" class="attition">电话格式不正确</div>

      <div class="margin_top_10">
        <el-button style="width: 80%;" type="primary" @click="register_fun()" round>注册</el-button>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "register",
    components: {},
    data: function () {
      return {
        register_info: {
          stu_code: "",
          password: "",
          stu_name: "",
          sex: '男',
          grade: "",
          tele: "",
        },
        password_agaian: "",
        password_same: 0,
        tele_form: 0,
        options: [{
          value: '选项1',
          label: '软件161'
        }, {
          value: '选项2',
          label: '软件162'
        }, {
          value: '选项3',
          label: '计算机161'
        }, {
          value: '选项4',
          label: '计算机162'
        }],
      }
    },
    methods: {
      getclasslist() {
        this.$req.get('class/getclasslist')
          .then(res => {

            console.log(res);
            if( res.error_code === 0 ) {
              this.options = res.data;
            } else {
              this.$toast('班级信息获取失败');
            }
          })
      },
      back() {
        this.$router.back();
      },
      change() {
        console.log("change");
        console.log(this.register_info.password);
        console.log(this.password_agaian);
        if( this.register_info.password !== this.password_agaian ) {
          this.password_same = 1;
        } else {
          this.password_same = 0;
        }
      },
      change_tele() {
        let reg = /^1[345789]\d{9}$/;
        if (this.register_info.tele != '' && reg.test(this.register_info.tele)) {
          this.tele_form = 0;
        } else {
          this.tele_form = 1;
        }
      },
      register_fun() {
        if( this.tele_form === 1
          || this.password_same === 1
          || this.password_agaian === ""

          || this.register_info.stu_code === ""
          || this.register_info.stu_name === ""
          || this.register_info.grade === ""
          || this.register_info.sex === ""
          || this.register_info.password === ""
          || this.register_info.tele === ""
        ) {
          this.$toast('请按格式输入');
        } else {
          this.$req.post('account/signup', {
            stu_code: this.register_info.stu_code,
            password: this.register_info.password,
            stu_name: this.register_info.stu_name,
            sex: this.register_info.sex,
            grade: this.register_info.grade,
            tele: this.register_info.tele,
          })
            .then(res => {
              if( res.error_code === 0 ) {
                this.$toast('注册成功');
                this.$router.back();
              } else {
                this.$toast(res.msg);
              }
            })
        }
      }
    },
    created() {
      this.getclasslist();
    },
    mounted() {

    }

  }
</script>

<style scoped>
  .bar {
    position: fixed;
    width: 100%;
    z-index: 999;
    padding-top: 30px;
    background: white;
    top: 0px;
  }
  .login {
    margin-top: 40%;
    width: 80%;
    margin-left: 10%;
    border-radius: 20px;
  }
  .margin_top_10 {
    margin-top: 10px;
  }
  .attition {
    color: red;
    font-size: 5px;
    float: right;
    margin-bottom: 2px;
  }
</style>
