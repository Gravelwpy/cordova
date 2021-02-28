<template>
  <div>
    <div id="bar" class="bar"><!--为什么van-nav-bar只要在这里就能产生覆盖了？因为文件内的类总比文件外的类优先级高-->
      <van-nav-bar
        title="编辑个人信息"
        right-text="完成"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </div>

    <div>
      <p style="font-size: 13px;text-align: left;padding-left: 15px;line-height: 30px">个人信息</p>

      <van-cell-group>
        <van-field
          v-model="name"
          clearable
          label="姓名"
          readonly
        />

          <van-field
            v-model="sex"
            clearable
            label="性别"
            readonly
          />

        <van-field
          v-model="phone"
          required
          clearable
          label="手机号"
          right-icon="phone-o"
        />

        <van-field
          v-model="mail"
          required
          clearable
          label="邮箱"
          right-icon="envelop-o"
        />
      </van-cell-group>
    </div>

    <div>
      <p style="font-size: 13px;text-align: left;padding-left: 15px;line-height: 30px">院校信息</p>

      <van-cell-group>
        <van-field
          v-model="number"
          clearable
          label="学号"
          readonly
        />

        <van-field
          v-model="institute"
          clearable
          readonly
          label="学院"
          label-style="text-align:right"
        />

        <van-field
          v-model="major"
          clearable
          readonly
          label="专业及班级"
        />

      </van-cell-group>
    </div>

  </div>
</template>

<script>
    export default {
        name: "edit_personInfo",
        components: {},
        data: function () {
            return {
                name: "刘晓峰",
                phone: "15858474986",
                sex: "男",
                mail: "1143037783@qq.com",
                number: "3180421018",
                institute: "计算机与数据学院",
                major: "计算机181",
            }
        },
        methods: {
            onClickLeft(){
                this.$router.push('/personinfo');
            },
            onClickRight(){

            }
        },
        created() {
        },
        mounted() {
        }

    }
</script>

<style scoped>

  .van-icon-arrow-left:before{
    color: black;
  }

  .van-nav-bar__title{
    font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
  }

  .bar {
    position: sticky;
    width: 100%;
    z-index: 998;
    padding-top: 30px;
    background: white;
    top: 0px;
  }

</style>
