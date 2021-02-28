<template>
  <div>
    <van-nav-bar
      title="签到列表"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <div  style="margin-top: 10px;">
      <div v-for="(item, index) in tableData" :key="index" class="van-hairline--surround">
        <!--<div class="itemade" @click="toSignDetail(item.id, item.signflag)">-->
        <!--<div class="itemname">{{ item.sign_item_name }}</div>-->
        <!--<div class="itemclass"><van-tag color="#1989fa" size="large">{{ item.sign_item_classid }}</van-tag></div>-->
        <!--<div class="itemtime">{{ item.sign_item_begin_time + '&#45;&#45;' + item.sign_item_end_time }}</div>-->
        <!--</div>-->
        <van-cell :border="false" :title="item.sign_item_name" :value="item.sign_item_classid" :label="item.sign_item_begin_time + '--' + item.sign_item_end_time" @click="toSignDetail(item.id, item.signflag)"/>
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
        tableData: [],
      }
    },
    methods: {
      toSignDetail(id, signflag) {
        // 获取签到信息如果未签到跳转到签到页面 已签到则跳转到详情页面
        if( signflag > 0 ) {
          localStorage.setItem('signitemid', JSON.stringify(id));
          this.$router.push('/sutdengsignresult');
        } else {
          localStorage.setItem('studentsignid', JSON.stringify(id));
          this.$router.push('/studentsigndetail');
        }
      },
      change(item) {
        this.page = item;
        this.getTableList()
      },
      onClickLeft() {
        this.$router.push('/sign');
      },
      getTableList() {
        this.$req.post('sign/getStudentAllSign', {
          page: this.page,
          size: this.size
        })
          .then(res => {
            console.log(res)
            if (res.error_code === 0) {
              this.tableData = res.data.data
              this.total = res.data.number
            } else {
              this.$toast(res.msg);
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
