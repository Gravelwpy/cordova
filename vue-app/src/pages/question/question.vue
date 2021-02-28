<template>
  <div class="roommanagement" >
    <div class="bar">
      <van-nav-bar
        title="发送消息"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>

    <el-form ref="form" :model="form" class="textarea">
        <el-input
          :rows="8"
          class="textareaself"
          placeholder="请填写具体内容帮助我们了解您的意见与建议"
          type="textarea"
          v-model="form.desc"></el-input>
      <el-form-item class="sub_button">
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'Index',
    components: {},
    data: function() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      onClickLeft() {
        this.$router.push('/personinfo');
      },
      onSubmit() {
        if (this.form.desc === '') {
          this.$message({
            showClose: true,
            message: '请按要求填写数据',
            type: 'warning'
          })
        } else {
          this.$req.post('question/addquestion', {
            desc: this.form.desc
          })
            .then(res => {
              console.log(res)
              if (res.data === 1) {
                this.$message({
                  showClose: true,
                  message: '提交成功',
                  type: 'success'
                })
                this.form.desc = ''
              }
            })
        }
      }
    }

  }
</script>

<style scoped>
  .roommanagement {
    position: absolute;
    height: calc( 100% - 2px );
    width: calc( 100% - 2px );
    /*overflow: auto;*/
    /*margin: 20px;*/
    /*background: white;*/
    /*border-radius: 20px;*/
    /*padding: 3% 5%;*/
  }
  .textarea {
    margin: 20px;
  }
  .sub_button {
    margin-top: 20px;
  }
</style>
