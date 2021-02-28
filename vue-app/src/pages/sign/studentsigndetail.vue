<template>
    <div class="signdetialclass">
      <van-nav-bar
        title="签到"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
      <div class="classinfocard">
        <div class="classname">{{ this.classdata.sign_item_name }}</div>
        <div class="classtime">时间:{{ this.classdata.sign_item_begin_time + '--' +  this.classdata.sign_item_end_time}}</div>
        <div class="classroomname">{{ this.classdata.room_name }}</div>
        <div class="classtime">老师:{{ this.classdata.name }}</div>
      </div>
      <studentsignseat
        v-if="this.json_data.length > 0"
        :seatarray="json_data"
        :signtiemid="signtiemid"
        :signitemtype="signitemtype"
        :latitude="latitude"
        :longitude="longitude"
        :sign_item_radius="radius"
      ></studentsignseat>
    </div>
</template>

<script>
  import studentsignseat from '../../components/studentsignseat.vue'
    export default {
        name: "studentsigndetail",
        components: {
          studentsignseat
        },
        data: function () {
            return {
              json_data: {},
              classdata: '',
              signtiemid: -1,
              classroomid: 0,
              signitemtype: -1,
              latitude: -1,
              longitude: -1,
              radius: -1
            }
        },
        methods: {
          onClickLeft() {
            this.$router.push('/studentsign');
          },
          getSignSeatData: function() {
            this.json_data = {}
            this.$req.post('classseat/getStudentSignSeatData', {
              classroomid: this.classroomid,
              signtiemid: this.signtiemid
            })
              .then(res => {
                console.log(res);
                if(res.error_code == 0 ) {
                  this.json_data = res.data;
                  this.seatRow = this.json_data.length;
                  this.seatCol = this.json_data[0].length;
                } else {
                  this.$toast(res.msg);
                }
              })
          }
        },
        created() {
          // this.getSignSeatData();
          // 获取签到信息以及座位信息
          this.$req.post('sign/getStudentSignDetial', {
            signid: JSON.parse(localStorage.getItem('studentsignid'))
          })
            .then(res => {
              console.log(res);
              if(res.error_code == 0 ) {
                this.json_data = res.data.roomseatlist.data;
                this.classdata = res.data.signitem;
                this.signtiemid = res.data.signitem.id;
                this.classroomid = res.data.signitem.classid;
                this.signitemtype = res.data.signitem.sign_item_sign_type;
                this.latitude = res.data.signitem.sign_item_latitude;
                this.longitude = res.data.signitem.sign_item_longitude;
                this.radius = res.data.signitem.sign_item_radius
              } else {
                this.$toast(res.msg);
              }
            })
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
    margin-top: -25px;
  }
</style>
