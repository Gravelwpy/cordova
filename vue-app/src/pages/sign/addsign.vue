<template>
  <div>
    <div class="bar">
      <van-nav-bar
        title="添加签到"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>

    <div class="messageadd">
      <div class="demo-input-size margin_top_10">
        <template>
          <el-select  style="width: 100%;" v-model="signtype" placeholder="请选择签到类型">
            <el-option
              v-for="item in signtypelist"
              :key="item.type"
              :label="item.name"
              :value="item.type">
            </el-option>
          </el-select>
        </template>
      </div>

      <div class="demo-input-size margin_top_10">
        <template>
          <el-select  style="width: 100%;" multiple v-model="grade" placeholder="请选择班级">
            <el-option
              v-for="item in options"
              :key="item.class_id"
              :label="item.class_name"
              :value="item.class_id">
            </el-option>
          </el-select>
        </template>
      </div>

      <div class="demo-input-size margin_top_10">
        <template>
          <el-select  style="width: 100%;" v-model="signway" placeholder="请选择验证方式">
            <el-option
              v-for="item in signwaylist"
              :key="item.type"
              :label="item.name"
              :value="item.type">
            </el-option>
          </el-select>
        </template>
      </div>

      <van-cell-group v-if="signway == 1">
        <van-field
          v-model="password"
          center
          clearable
          placeholder="请设置密码"
        >
          <van-button slot="button" size="small" type="primary" @click="setpassword()">设置密码</van-button>
        </van-field>
      </van-cell-group>
      <!--密码弹出-->
      <van-number-keyboard
        v-model="password"
        :show="show"
        :maxlength="6"
        @blur="show = false"
      />

      <van-cell-group>
        <van-field
          v-model="longitude"
          clearable
          label="经度"
          placeholder="经度"
          @click-right-icon="$toast('question')"
        />

        <van-field
          v-model="latitude"
          label="经度"
          placeholder="纬度"
        />
      </van-cell-group>

      <el-button type="primary" round style="width: 60%;margin-top: 30px;" @click="mapshowfun()">设置签到点</el-button>

      <van-popup
        round
        position="bottom"
        :style="{ height: '80%' }"
        v-model="mapshow">
        <div class="map" id="allmap"></div>
      </van-popup>

      <el-button type="primary" round style="width: 60%;margin-top: 30px;" @click="send()">发起签到</el-button>
    </div>
  </div>
</template>

<script>
  import BMap from 'BMap'

  export default {
    name: "addsign",
    components: {},
    data: function () {
      return {
        title: "",
        textarea: "",
        grade: "",
        options: "",
        signtype: "",//签到类型
        signway: "",// 签到方式
        password: "",
        show: false,
        value: '',
        mapshow: false,
        latitude: 121.577339,
        longitude: 29.824966,
        signtypelist: [
          {
            type: 1,
            name: "上课签到",
          },
          {
            type: 2,
            name: "实验室签到",
          },
        ],
        signwaylist: [
          {
            type: 1,
            name: "密码验证",
          },
          // {
          //   type: 2,
          //   name: "刷脸",
          // },
        ],
      }
    },
    methods: {
      reflashmap() {

        let onDeviceReady = function () {
          initBaiduMap();
        };

        function initBaiduMap() {
          console.log("进行定位");
          // 进行定位
          if ('baidumap_location' in window) {
            console.log(定位中);
            baidumap_location.getCurrentPosition(function (result) {
              alert(result.latitude);
              alert(result.longitude);

              this.latitude = result.latitude;
              this.longitude = result.longitude;

              var map = new BMap.Map("allmap");
              map.centerAndZoom(new BMap.Point(result.longitude, result.latitude), 20);  // 初始化地图,设置中心点坐标和地图级别
              map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
              map.enableScrollWheelZoom(true);

              map.clearOverlays();
              var new_point = new BMap.Point(result.longitude,result.latitude);
              var marker = new BMap.Marker(new_point);  // 创建标注
              map.addOverlay(marker);              // 将标注添加到地图中
              map.panTo(new_point);

            }, function (error) {
              console.error(error);
            });
          } else {
            console.error('baidumap_location is undefined');
          }
        }

        document.addEventListener("deviceready", onDeviceReady, false);

      },
      mapshowfun() {
        this.mapshow = true;

        console.log("test");
        var map = new BMap.Map("allmap");
        map.centerAndZoom(new BMap.Point(this.latitude, this.longitude), 20);  // 初始化地图,设置中心点坐标和地图级别

        var new_point = new BMap.Point(this.latitude,this.longitude);
        var marker = new BMap.Marker(new_point);  // 创建标注
        map.addOverlay(marker);              // 将标注添加到地图中
        map.panTo(new_point);

        map.setCurrentCity("宁波");          // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

        map.addEventListener("click",function(e){
          // alert(e.point.lng + "," + e.point.lat);

          var new_point = new BMap.Point(e.point.lng,e.point.lat);
          var marker = new BMap.Marker(new_point);  // 创建标注
          map.addOverlay(marker);              // 将标注添加到地图中
          map.panTo(new_point);
          console.log(this.latitude);
          console.log(this.latitude +","+ this.longitude +","+ e.point.lng +","+ e.point.lat);
          var pointA = new BMap.Point(121.577339,29.824966 );
          var pointB = new BMap.Point(e.point.lng,e.point.lat);
          alert('距离是：'+(map.getDistance(pointA,pointB)).toFixed(2)+' 米。');
        });

        if ('baidumap_location' in window) {
          baidumap_location.getCurrentPosition(function (result) {
            alert(result.latitude);
            alert(result.longitude);

            // var map = new BMap.Map("allmap");
            map.centerAndZoom(new BMap.Point(result.longitude, result.latitude), 20);  // 初始化地图,设置中心点坐标和地图级别
            // map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
            // map.enableScrollWheelZoom(true);

            map.clearOverlays();
            var new_point = new BMap.Point(result.longitude,result.latitude);
            var marker = new BMap.Marker(new_point);  // 创建标注
            map.addOverlay(marker);              // 将标注添加到地图中
            map.panTo(new_point);

          }, function (error) {
            console.error(error);
          });
        } else {
          console.error('baidumap_location is undefined');
        }

      },
      setpassword() {
        this.show = true;
      },
      send() {
        console.log(this.latitude);
        console.log(this.longitude);
        console.log(this.signtype);
        console.log(this.grade);
        console.log(this.signway);
        console.log(this.password);
      },
      getclasslist() {
        this.$req.get('class/getclasslist')
          .then(res => {

            console.log(res);
            if( res.error_code === 0 ) {
              this.options = res.data;
            } else {
              this.$toast('班级信息获取失败');
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
    mounted(){

    },

  }
</script>

<style scoped>
  .bar {
    position: fixed;
    width: 100%;
    z-index: 999;
    padding-top: 30px;
    background: white;
    top: 0px;
  }
  .messageadd {
    margin-top: 40%;
    width: 80%;
    margin-left: 10%;
  }
  .textarea {
    margin-top: 20px;
  }
  .margin_top_10 {
    margin-top: 10px;
  }
  .map {
    height: 100%;
    position: absolute;
    width: 100%;
  }
</style>
