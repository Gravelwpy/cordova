<template>
    <div>
      <div class="bar">
        <van-nav-bar
          title="发送消息"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
        />
      </div>

      <div class="messageadd">
        <div class="demo-input-size">
          <van-field style="text-align: left;padding-left: 15px;" v-model="msgtitle" label="消息标题" placeholder="请输入标题"/>
        </div>

        <div class="demo-input-size">
          <van-cell style="text-align: left;padding-left: 15px;" title="通知班级" class="content" :value="classname" @click="selectClass" is-link/>
        </div>

        <div class="textarea">
          <van-field
            style="text-align: left;padding-left: 15px;"
            v-model="msgcontent"
            rows="4"
            autosize
            label="消息"
            type="textarea"
            placeholder="请输入消息"
            show-word-limit
          />
        </div>
        <el-button type="primary" round style="width: 80%;margin-top: 30px;" @click="send()">发送消息</el-button>
      </div>

      <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />

    </div>
</template>

<script>
  import { Toast } from 'vant';
    export default {
        name: "messageadd",
        components: {},
        data: function () {
            return {
              msgtitle: "",
              msgcontent: "",
              show: false,
              actions: [
                { name: '选项' },
                { name: '选项' },
                { name: '选项' }
              ],
              classname: '',
              classid: ''
            }
        },
        methods: {
          onSelect(item) {
            // 默认情况下点击选项时不会自动收起
            // 可以通过 close-on-click-action 属性开启自动收起
            this.show = false;
            this.classname = item.name;
            this.classid = item.class_id;

          },
          selectClass() {
            this.show = true;
          },
          send() {
            if( this.msgtitle === "" || this.msgcontent === "" || this.classid === "" ) {
              Toast('请按要求填写');
            } else {
              this.$req.post('message/addMessage', {
                msgtitle: this.msgtitle,
                msgcontent: this.msgcontent,
                classid: this.classid
              })
                .then(res => {
                  console.log(res)
                  if (res.error_code === 0 && res.data === 1 ) {
                    this.$toast('添加成功');
                  } else {
                    this.$toast(res.msg);
                  }
                })
            }
          },
          getclasslist() {
            this.$req.get('class/getclasslist')
              .then(res => {

                console.log(res);
                if( res.error_code === 0 ) {
                  this.actions = res.data;
                } else {
                  Toast('班级信息获取失败');
                }
              })
          },
          onClickLeft() {
            this.$router.push('/sign');
          },
        },
        created() {
          if( JSON.parse(localStorage.getItem('persion_info')) ) {
            this.getclasslist();
          } else {
            // this.$router.push('/');
          }
        },
        mounted() {
        }

    }
</script>

<style scoped>
  .messageadd {
    margin-top: 17px;
  }
  .textarea {
    margin-top: 10px;
  }
</style>
