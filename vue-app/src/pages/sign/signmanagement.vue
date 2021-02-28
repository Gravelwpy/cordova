<template>
<div>
  <van-nav-bar
    title="签到管理"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />

  <div style="margin-top: 10px;">
    <div v-for="(item, index) in tableData" :key="index">
      <van-swipe-cell class="van-hairline--bottom">
        <van-cell :border="false" :title="item.sign_item_name" :value="item.sign_item_classid" :label="item.sign_item_begin_time + '--' + item.sign_item_end_time"/>
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
</div>
</template>

<script>
  import { Divider } from 'vant';
    export default {
        name: "signmanagement",
        components: {},
        data: function () {
            return {
              page: 1,
              size: 5,
              total: 0,
              tableData: []
            }
        },
        methods: {
          deleteitem(id) {
            this.$req.post('sign/deleteSign', {
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
            this.$req.post('sign/getAllSign', {
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
  .itemade {
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background-color: white;
    height: 62px;
    margin: 5px 10px;
    display: flex;
    padding: 10px;
    font: 12px/1.5 Tahoma,Helvetica,Arial,'宋体',sans-serif;
  }
  .itemname {
    color: #434d57;
    font-size: 16px;
    position: absolute;
  }
  .itemclass {
    color: #434d57;
    font-size: 17px;
    position: absolute;
    right: 30px;
  }
  .itemtime {
    color: #969799;
    font-size: 14px;
    position: absolute;
    margin-top: 30px;
  }
</style>
