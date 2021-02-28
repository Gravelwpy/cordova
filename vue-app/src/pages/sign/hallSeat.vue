<template>
    <div class="seat">
      <cinema-seat-choose
        v-if="this.json_data.length > 0"
        :seatarray="json_data"
      ></cinema-seat-choose>
      <div style="position: absolute">
        <el-button type="primary" @click="getSignSeatData">主要按钮</el-button>
        <el-button type="primary" @click="setZ">0</el-button>
      </div>
    </div>
</template>

<script>
  import cinemaSeatChoose from '../../components/cinema-seat-choose.vue'

    export default {
        name: "hallSeat",
        components: {
          cinemaSeatChoose
        },
        data: function () {
            return {
              json_data: {},
              d: 40
            }
        },
        methods: {
          setZ() {
            this.json_data = {}
          },
          getSignSeatData: function() {
            this.json_data = {}
            this.d++;
            console.log(this.d)
            this.$req.post('classseat/getSignSeatData', {
              classroomid: this.d
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
                // if( res.error_code === 0 ) {
                //   localStorage.setItem('persion_info', JSON.stringify(res.data));
                //   localStorage.setItem('token', res.data.token);
                //   // console.log(JSON.parse(localStorage.getItem('persion_info')));
                //   // localStorage.setItem('userInfo', JSON.stringify(item));
                //   this.$toast('登录成功');
                //   this.$router.push('/schedule');
                // } else {
                //   this.$toast(res.msg);
                // }
              })
          }
        },
        created() {
          this.getSignSeatData()
        },
        mounted() {
        }
    }
</script>

<style scoped>
  .seat {
    display: flex;
    width: 100%;
  }
</style>
