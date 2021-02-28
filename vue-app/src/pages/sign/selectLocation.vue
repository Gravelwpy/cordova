<template>
  <div>
    <div class="bar">
      <van-nav-bar
        title="签到"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </div>

    <div class="map" id="allmap"></div>

    <div class="reflashbutton">
      <van-icon name="aim" @click="reflashmap()" size="30px" color="blue"/>
    </div>

    <div class="detial">
      <van-cell>
        <template slot="title">
          <span class="custom-title">
            <div class="classdetile">
              <div>当前课程：数据结构</div>
              <div>教师：xxx</div>
              <div>时间：周一 3-4节</div>
            </div>
          </span>
        </template>
      </van-cell>
    </div>


    <!--位置选择-->
    <!--<div class="local">-->

      <!--<div class="div1">-->
        <!--<van-grid square :column-num="6" :gutter="3">-->
          <!--<van-grid-item-->
            <!--v-for="value in 48"-->
            <!--:key="value"-->
            <!--:icon="weticon"-->
          <!--/>-->
        <!--</van-grid>-->
      <!--</div>-->

      <!--<div class="div2">-->
        <!--<van-grid square :column-num="6" :gutter="3">-->
          <!--<van-grid-item-->
            <!--v-for="value in 48"-->
            <!--:key="value"-->
            <!--:icon="weticon"-->
          <!--/>-->
        <!--</van-grid>-->
      <!--</div>-->

      <!--<div class="signbutton">-->
        <!--<van-button round type="danger" size="large" @click="sign()">确认签到</van-button>-->
      <!--</div>-->


    <!--</div>-->

    <van-popup
      v-model="show"
      :style="{ height: '350px' }"
      position="bottom">

      <van-password-input
        :value="value"
        info="请输入签到码"
        :mask="false"
        @focus="showKeyboard = true"
      />

      <!-- 数字键盘 -->
      <van-number-keyboard
        close-button-text="完成"
        :show="showKeyboard"
        @input="onInput"
        @delete="onDelete"
        @blur="showKeyboard = true"
      />

    </van-popup>

  </div>
</template>

<script>
  import BMap from 'BMap'

  export default {
    data() {
      return {
        weticon: "audio",
        show: false,
        value: '123',
        showKeyboard: true,

        latitude: 121.577339,
        longitude: 29.824966,

      }
    },
    mounted(){
      // console.log("test");
      var map = new BMap.Map("allmap");
      map.centerAndZoom(new BMap.Point(this.latitude, this.longitude), 20);  // 初始化地图,设置中心点坐标和地图级别
      map.setCurrentCity("宁波");          // 设置地图显示的城市 此项是必须设置的
      map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    },
    methods: {
      reflashmap() {

        let onDeviceReady = function () {
          initBaiduMap();
        };

        function initBaiduMap() {
          // 进行定位
          if ('baidumap_location' in window) {
            alert("定位中。。。");
            baidumap_location.getCurrentPosition(function (result) {
              alert(result.latitude);
              alert(result.longitude);

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
      onClickLeft() {
        this.$router.push('/sign');
      },
      onClickRight() {
        Toast('按钮');
      },
      sign() {
        console.log("ddd");
        this.show = true;
      },
      showPopup() {
        this.show = true;
      },
      onInput(key) {
        this.value = (this.value + key).slice(0, 6);
        console.log(this.value.length);
        if(this.value.length == 6) {
          this.value = "";
          this.show = false;
        }
      },
      onDelete() {
        this.value = this.value.slice(0, this.value.length - 1);
      }
    },
    created() {
      if( JSON.parse(localStorage.getItem('persion_info')) ) {
        // 初始化内容
      } else {
        // this.$router.push('/');
      }
    },
  }
</script>

<style scoped>
  .classdetile {
    text-align: left;
    padding-left: 8%;
    box-shadow: darkgrey 4px 4px 10px 1px ;
    border-radius: 8px;
  }
  .local {

  }
  .div1 {
    float: left;
    width: 48%;
    margin: 10px 1% 10px 1%;
  }
  .div2 {
    float: left;
    width: 48%;
    margin: 10px 1% 10px 1%;
  }
  .signbutton {
    width: 80%;
    margin-left: 10%;
  }
  .bar {
    position: fixed;
    width: 100%;
    z-index: 999;
    padding-top: 30px;
    background: white;
    top: 0px;
  }
  .detial {
    margin-top: 75%;
  }
  .map {
    top: 80px;
    height: 35%;
    position: absolute;
    width: 100%;
  }
  .reflashbutton {
    width: 32px;
    height: 32px;
    background-color: white;
    box-shadow: darkgrey 1px 1px 10px 1px ;
    position: absolute;
    top: 100px;
    left: 15px;
  }
</style>
