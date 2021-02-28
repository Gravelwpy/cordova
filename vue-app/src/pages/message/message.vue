<template>
  <div>
    <div class="bar">
      <van-nav-bar title="消息" :z-index="999">
      </van-nav-bar>
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        shape="round"
        @search="onSearch(value)"
      >
        <div slot="action" @click="onSearch(value)">搜索</div>
      </van-search>
    </div>
    <div class="message">
      <div class="massegr">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list
            v-model="loading_down"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div class="collapsecard" v-for="(item, value) in massages" :key="value">
                <massagecell
                  :imgurl = "item.icon_url"
                  :title = "item.msg_title"
                  :massage = "item.msg_content"
                  :name = "item.name"
                  :insert_time = "item.insert_time * 1000"
                ></massagecell>
            </div>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>


  </div>
</template>

<script>
  import massagecell from '@/components/massagecell.vue'
  // @ is an alias to /src
  /* eslint-disable */
    export default {
      name: "message",
      components: {
        massagecell,
      },
      data() {
        return {
          list: [],
          loading_down: false,
          finished: false,
          user: "",
          page: 0,
          activeName: '',
          count: 0,
          isLoading: false,
          loading: true,
          value: "",
          searchKey: "",
          valuetrue: true,
          massages: [
            // {
            //   icon_url: "../assets/logo.png",
            //   msg_title: "titleooo",
            //   msg_content: "ssskljdlkfjkjfowiuretiutioputpiu你皮偶日哦哦瑞哦UBURANIERUIUMIUPOIWEURQUPIUio哦II偶然买额U日哦几姐姐可挂机啊健康合格IU和愤怒符付贵啊儿回家",
            // },
          ]
        }
      },
      mounted() {
      },
      created() {
        if( JSON.parse(localStorage.getItem('persion_info')) ) {
          this.user = JSON.parse(localStorage.getItem('persion_info'));
          console.log(this.user);
          this.getmessage("" , 0);
        } else {
          // this.$router.push('/');
        }
      },
      methods: {
        addmassage() {
          this.$router.push('/messageadd');
        },
        onLoad() {
          // 异步更新数据
          setTimeout(() => {
            this.getmessage(this.searchKey, this.page);
            // 加载状态结束
            this.loading_down = false;
          }, 1000);
        },
        getmessage(searchKey, page) {
          this.$req.post('message/getmsglist', {
            searchKey: searchKey,
            page: page,
          })
            .then(res => {
              if( res.error_code === 0 ) {
                // console.log(res.data.length);
                if( this.page === 0 && res.data.length !== 0) {
                  this.massages = res.data;
                  this.page++;
                } else if( res.data.length === 0) {
                  this.finished = true;
                } else {
                  this.massages = this.massages.concat(res.data);
                  this.page++;
                }
                this.isLoading = false;
              } else {
                this.$toast(res.msg);
              }
            })
        },
        onRefresh() {
          this.finished = false;
          this.searchKey = "";
          this.page = 0;
          this.massages = "";
          this.getmessage(this.searchKey, this.page);
          // setTimeout(() => {
          //   this.$toast('刷新成功');
          //   this.isLoading = false;
          //   this.count++;
          // }, 500);
        },
        onSearch(value) {
          this.finished = false;
          this.page = 0;
          this.searchKey = value;
          this.massages = "";
          this.getmessage(this.searchKey, this.page);
        }
      },
    }
</script>

<style scoped>
  .bar {
    /*position: fixed;*/
    /*width: 100%;*/
    /*z-index: 999;*/
    /*padding-top: 30px;*/
    /*background: white;*/
    /*top: 0px;*/
  }
  .message {
    /*margin-top: 130px;*/
    margin-bottom: 50px;
  }
  .collapsecard {
    background-color: white;
  }
</style>
