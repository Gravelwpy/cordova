<template>
    <div>
      <van-nav-bar
        title="签到结果"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />

      <div class="classinfocard">
        <div class="classname">{{ this.classdata.sign_item_name }}</div>
        <div class="classtime">时间:{{ this.classdata.sign_item_begin_time + '--' +  this.classdata.sign_item_end_time}}</div>
        <div class="classroomname">{{ this.classdata.room_name }}</div>
        <div class="classtime">老师:{{ this.classdata.name }}</div>
        <div class="classtag"><van-tag color="#f2826a">已签到</van-tag></div>
      </div>
      <studentsignseatresult
        v-if="this.json_data.length > 0"
        :seatarray="json_data"
        :signtiemid="signtiemid"
      ></studentsignseatresult>
    </div>
</template>

<script>
  import studentsignseatresult from '../../components/studentsignseatresult.vue'
    export default {
        name: "sutdengsignresult",
      components: {
        studentsignseatresult
      },
        data: function () {
            return {
              json_data: {},
              classdata: '',
              signtiemid: -1,
              classroomid: 0,
              choosecol: -1,
              chooserow: -1,
            }
        },
        methods: {
          onClickLeft() {
            this.$router.push('/studentsign');
          },
          getSignDetial() {
            this.$req.post('sign/getStudentSignResult', {
              signid: JSON.parse(localStorage.getItem('signitemid'))
            })
              .then(res => {
                console.log(res);
                if(res.error_code == 0 ) {
                  this.choosecol = res.data.col
                  this.chooserow = res.data.row
                  this.getSeatDetial();
                } else {
                  this.$toast(res.msg);
                }
              })
          },
          getSeatDetial() {
            this.$req.post('sign/getStudentSignDetial', {
              signid: JSON.parse(localStorage.getItem('signitemid'))
            })
              .then(res => {
                console.log(res);
                if(res.error_code == 0 ) {
                  res.data.roomseatlist.data[this.chooserow][this.choosecol] = {"is_seat": 1}
                  this.json_data = res.data.roomseatlist.data;
                  this.classdata = res.data.signitem;
                  this.signtiemid = res.data.signitem.id;
                  this.classroomid = res.data.signitem.classid;
                } else {
                  this.$toast(res.msg);
                }
              })
          }
        },
        created() {
          this.getSignDetial();
        },
        mounted() {
        }

    }
</script>

<style scoped>
  .signdetialclass {
  }
  .classinfocard {
    background-color: white;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin: 10px;
    padding: 10px;
    text-align: left;
    border-radius: 10px;
  }
  .classname {
    font-size: 16px;
    color: #585858;
  }
  .classtime {
    margin-top: 10px;
    font-size: 14px;
    color: #585858;
  }
  .classroomname {
    font-size: 17px;
    color: #585858;
    position: relative;
    float: right;
    margin-right: 10px;
    /*margin-top: -25px;*/
  }
  .classtag {
    position: relative;
    float: right;
    margin-right: 10px;
    margin-top: -55px;
  }
</style>
