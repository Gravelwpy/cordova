<template>
  <div>
    <van-nav-bar
      title="消息管理"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <div style="margin-top: 10px;background-color: white;">
      <div v-for="(item, index) in tableData" :key="index" class="van-hairline--surround" @click="shoedetial(item.msg_title,item.msg_content)">
        <van-swipe-cell class="van-hairline--bottom">
          <massagecell
            :imgurl = "item.icon_url"
            :title = "item.msg_title"
            :massage = "item.msg_content"
            :name = "item.name"
            :insert_time = "item.insert_time / 1"
          ></massagecell>
          <van-button
            slot="right"
            square
            text="删除"
            type="danger"
            class="delete-button"
            @click="deleteitem(item.id)"
          />
        </van-swipe-cell>
      </div>
    </div>

    <div class="pagination">
      <van-pagination
        v-model="page"
        :total-items="total"
        :items-per-page="size"
        mode="simple"
        @change="change"
      />
    </div>

    <van-dialog v-model="dialogshow" :title="msg_title">
      <van-field
        v-model="msg_content"
        rows="1"
        autosize
        type="textarea"
        disabled
      />
    </van-dialog>

  </div>
</template>

<script>
  import massagecell from '@/components/massagecell.vue'
  import { Divider } from 'vant';
  import { Dialog } from 'vant';
  export default {
    name: "messagemanagement",
    components: {
      massagecell
    },
    data: function () {
      return {
        page: 1,
        size: 5,
        total: 0,
        tableData: [],
        msg_title: '',
        msg_content: '',
        dialogshow: false
      }
    },
    methods: {
      shoedetial(msg_title, msg_content) {
        this.msg_title = msg_title;
        this.msg_content = msg_content;
        this.dialogshow = true;
      },
      deleteitem(id) {
        this.$req.post('message/delectMessage', {
          id: id
        })
          .then(res => {
            console.log(res)
            if (res.error_code === 0 && res.data === 1) {
              this.getTableList();
              this.$toast("删除成功");
            } else {
              this.$toast(res.msg);
            }
          })
      },
      change(item) {
        this.page = item;
        this.getTableList()
      },
      onClickLeft() {
        this.$router.push('/sign');
      },
      getTableList() {
        this.$req.post('message/getAllMessageByPage', {
          page: this.page,
          size: this.size
        })
          .then(res => {
            console.log(res)
            if (res.error_code === 0) {
              this.tableData = res.data.data
              this.total = res.data.number
            }
          })
      },
    },
    created() {
      this.getTableList();
    },
    mounted() {
    }

  }
</script>

<style scoped>
  .pagination {
    position: absolute;
    width: 100%;
    bottom: 0px;
  }
</style>
