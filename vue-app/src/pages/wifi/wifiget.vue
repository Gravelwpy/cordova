<template>
    <div class="page">
        <van-nav-bar
          title="Wifi测试"
          left-text="返回"
          @click-left="onClickLeft"
        />

      <div class="circle"  @click="cicleGetWifi">
        <van-circle
          v-model="currentRate"
          :rate="rate"
          size="170px"
          :stroke-width="20"
          color="#0984e3"
        />
      </div>

      <div class="testbut">
        <div class="testbut_forn" v-if="state == 0">
          点击开始测试
        </div>
        <div v-else="state == 1">
          <div style="font-size: 20px;">当前进度</div>
          <div style="font-size: 20px;">{{rate}}%</div>
          <div style="font-size: 10px;">测试中请勿进行其他操作</div>
        </div>
      </div>

      <div class="card" @click="showPopup">
        <div class="card_left card_all">
          <div class="card_title">当前地点:</div>
          <div class="card_con">{{ local }}</div>
        </div>
        <div class="card_right card_all">
          <div class="card_title">测试点编号:</div>
          <div class="card_con">{{ localnum }}</div>
        </div>
      </div>

      <div class="card">
        <div class="card_left card_all">
          <div class="card_title">测试组数:</div>
          <div class="card_con"><van-stepper min="10" step="10"  v-model="testnumber" /></div>
          <!--<div style="font-size: 15px;margin-top: 5px;color: rgba(220,220,220,0.86);">每组默认20条数据</div>-->
        </div>
        <div class="card_right card_all" @click="showlocalPopup">
          <div class="card_title">经纬度:(点击查看)</div>
          <div class="latitudeandlongitudefont">
            <div>纬度：{{ latitude }}</div>
            <div>经度：{{ longitude }}</div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card_left card_all" @click="savewifi">
          <div class="card_title">手机型号:</div>
          <div class="card_con">{{ deviceManufacturer }}</div>
        </div>
        <div class="card_right card_all"  @click="addlocal">
          <div class="card_title">待定功能:</div>
          <div class="card_con">{{ deviceManufacturer }}</div>
        </div>
      </div>


      <div class="cardtype2" @click="handleLogin">
        <van-icon name="orders-o" />
        <div class="cardtype2_font">测试历史记录</div>
      </div>
      <div class="cardtype2" @click="addlocal">
        <van-icon name="orders-o" />
        <div class="cardtype2_font">添加测试点</div>
      </div>

      <!--弹出层-->
      <van-popup
        v-model="show"
        position="bottom"
        :style="{ height: '60%' }"
      >
        <div class="limit">
          <van-sidebar
            v-model="activeKey"
            @change="clickitem"
          >
            <div class="localitem" v-for="(item, index) in localinfo">
              <div class="localitemcell" v-for="(item2, index2) in item.test_point" v-if="chooseitem == index"  @click="confert(index,index2)">
                <van-cell :value="item2.testPoint" icon="location-o" />
              </div>
            </div>
            <div v-for="item in localinfo">
              <van-sidebar-item :title="item.loc_name" />
            </div>
          </van-sidebar>
        </div>
        <div class="getlocal" @click="addlocal">
          添加测试点
        </div>

      </van-popup>

      <van-popup
        closeable
        position="bottom"
        :style="{ height: '90%' }"
        v-model="addpoint">
        <div class="addpoint">
          <van-cell-group>
            <van-field
              v-model="testpointname"
              required
              clearable
              label="测试点"
              right-icon="question-o"
              placeholder="请输入测试点名称"
            />

            <van-field
              v-model="testpointnumber"
              label="测试点编号"
              placeholder="测试点编号"
              required
            />
          </van-cell-group>
        </div>

        <van-cell-group>
          <van-field
            :value="addtestpointlongitude"
            label="经度"
            disabled
          />
        </van-cell-group>

        <van-cell-group>
          <van-field
            :value="addtestpointlatitude"
            label="纬度"
            disabled
          />
        </van-cell-group>
        <div>
          <van-button type="default"   @click="addpontfun">添加</van-button>
        </div>
        <div class="map" id="testpoint"></div>

      </van-popup>

      <van-popup
        closeable
        position="bottom"
        :style="{ height: '90%' }"
        v-model="showlocal">

        <div class="map" id="allmap"></div>

      </van-popup>

    </div>
</template>

<script>
  import BMap from 'BMap'

    export default {
        name: "wifiget",
        components: {},
        data: function () {
            return {
              addtestpointlongitude: 121.578547,
              addtestpointlatitude: 29.824040,
              // 测试点名称编号
              testpointname: '',
              testpointnumber: '',

              addpoint: false, //添加测试点弹出

              state: 0, // 当前页面状态 1 测试 0 未测试
              currentRate: 0,
              gradientColor: {
                '0%': '#3fecff',
                '100%': '#6149f6'
              },
              rate: 0,
              timer: '', //定时器
              asknum: 0,

              deviceManufacturer: '', //手机型号

              latitude: "", // 纬度
              longitude: "", //经度

              activeKey: 0,
              chooseitem: 0,

              showlocal: false,

              show: false,

              local: '请选择地点',
              localnum: '请选择地点编号', // 测试点编号
              loc_id: null,

              testnumber: 1,
              testpernumber: 10,

              localinfo: [
                {
                  localname: '实验室203-1',

                  testpoint: [
                    {
                      number: 1,
                      id: 1,
                    },
                    {number: 2,},
                    {number: 3,},
                    {number: 4,},
                  ],
                },
                {
                  localname: '实验室203-2',
                  testpoint: [
                    {number: 1,},
                    {number: 2,},
                    {number: 3,},
                  ],
                },
              ],

              wifilist: [
                {
                  "BSSID": "8a:25:93:ea:24:64",
                  "SSID": "李大鸡的鸡",
                  "capabilities": "[WPA-PSK-CCMP][WPA2-PSK-CCMP][ESS]",
                  "frequency": 2472,
                  "level": -57,
                  "timestamp": "515790664626"
                },
                {
                  "BSSID": "8a:25:93:ea:24:64",
                  "SSID": "李大鸡的鸡",
                  "capabilities": "[WPA-PSK-CCMP][WPA2-PSK-CCMP][ESS]",
                  "frequency": 2472,
                  "level": -57,
                  "timestamp": "515790664626"
                },
                {
                  "BSSID": "8a:25:93:ea:24:64",
                  "SSID": "李大鸡的鸡",
                  "capabilities": "[WPA-PSK-CCMP][WPA2-PSK-CCMP][ESS]",
                  "frequency": 2472,
                  "level": -57,
                  "timestamp": "515790664626"
                },{
                  "BSSID": "8a:25:93:ea:24:64",
                  "SSID": "李大鸡的鸡",
                  "capabilities": "[WPA-PSK-CCMP][WPA2-PSK-CCMP][ESS]",
                  "frequency": 2472,
                  "level": -57,
                  "timestamp": "515790664626"
                }
              ],
            }
        },
        methods: {
          setlat_lot() {
            var _this = this;

            if ('baidumap_location' in window) {
              baidumap_location.getCurrentPosition(function (result) {
                console.log("百度定位")
                _this.longitude = result.latitude;
                _this.latitude = result.longitude;
                _this.addtestpointlongitude = result.latitude;
                _this.addtestpointlatitude = result.longitude;
              }, function (error) {
                console.error(error);
              });
            } else {
              console.error('baidumap_location is undefined');
            }
          },
          addpontfun() {
            if( this.testpointname == '' || this.testpointnumber == '') {
              this.$toast('请输入测试点名称及编号')
            } else {
              this.$req.post('location/addPoint', {
                "loc_name": this.testpointname,
                "longitude": this.addtestpointlongitude,
                "latitude": this.addtestpointlatitude,
                "test_point": this.testpointnumber,
              })
                .then(res => {
                  console.log(res)
                  this.getlocallist();
                })
            }
            console.log("kkk");

          },
          inittestpointmap() {

            const _this = this;

            // 百度地图API功能
            var map = new BMap.Map("testpoint");
            map.centerAndZoom(new BMap.Point(this.addtestpointlongitude, this.addtestpointlatitude), 20);  // 初始化地图,设置中心点坐标和地图级别
            map.setCurrentCity("宁波");          // 设置地图显示的城市 此项是必须设置的
            map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

            var new_point = new BMap.Point(this.latitude,this.longitude);
            var marker = new BMap.Marker(new_point);  // 创建标注
            map.addOverlay(marker);              // 将标注添加到地图中
            map.panTo(new_point);

            map.addEventListener("click",function(e){
              // alert(e.point.lng + "," + e.point.lat);
              map.clearOverlays();
              _this.addtestpointlatitude = e.point.lat;
              _this.addtestpointlongitude = e.point.lng;
              var new_point = new BMap.Point(e.point.lng,e.point.lat);
              var marker = new BMap.Marker(new_point);  // 创建标注
              map.addOverlay(marker);              // 将标注添加到地图中
              map.panTo(new_point);
            });

          },
          addlocal() {
            const _this = this;
            this.addpoint = true;
            setTimeout(() => {
              _this.inittestpointmap();
            }, 0);
          },
          handleLogin() {
            if (true) {
              var a = {"wifi_rec_id_list":[1,2]}
              console.log(JSON.stringify(a))
              console.log(JSON.parse(JSON.stringify(a)))
              this.$req.post('wifi/get_wifi_info', {
                "json_str": JSON.stringify(a)
              })
                .then(res => {
                  console.log(res)
                })
            } else {
              this.$toast('请输入账号密码')
            }
          },
          savewifi() {
            var _this = this;
            var locdata={};
            locdata.loc_id = _this.loc_id;
            locdata.wifi_list = _this.wifilist;
            console.log(JSON.stringify(locdata));

            this.$req.post('wifi/add_wifi', {
              json_str: JSON.stringify(locdata)
            })
              .then(res => {
                console.log(res);
              })
          },
          getlocallist: async function () {
            await this.$req.post('location/getLoc', {
            })
              .then(res => {
                if(res.error_code == 0 ) {
                  console.log(res.data);
                  this.localinfo = res.data;
                }else {
                  console.log(res.msg);
                }

              })
          },
          cellMap() {
            var _this = this;

            if ('baidumap_location' in window && this.longitude == "" && this.latitude == "") {
              baidumap_location.getCurrentPosition(function (result) {
                console.log("百度定位")
                _this.latitude = result.latitude;
                _this.longitude = result.longitude;
                console.log(_this.latitude);
                console.log(_this.longitude);
              }, function (error) {
                console.error(error);
              });
            } else {
              console.error('baidumap_location is undefined');
            }

            // 百度地图API功能
            var map = new BMap.Map("allmap");
            map.centerAndZoom(new BMap.Point(this.longitude, this.latitude), 20);  // 初始化地图,设置中心点坐标和地图级别
            map.setCurrentCity("宁波");          // 设置地图显示的城市 此项是必须设置的
            map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

            var new_point = new BMap.Point(this.longitude, this.latitude);
            var marker = new BMap.Marker(new_point);  // 创建标注
            map.addOverlay(marker);              // 将标注添加到地图中
            map.panTo(new_point);

          },

          showlocalPopup() {
            var _this = this;
            this.showlocal = true;

            setTimeout(() => {
              _this.cellMap();
            }, 0);

          },
          confert(index1,index2) {
            this.local = this.localinfo[index1].loc_name;
            this.localnum = this.localinfo[index1].test_point[index2].testPoint;
            this.loc_id = this.localinfo[index1].test_point[index2].locId;
            this.latitude =  this.localinfo[index1].test_point[index2].latitude; // 纬度
            this.longitude =  this.localinfo[index1].test_point[index2].longitude; //经度
            this.show = false;
          },
          clickitem(num) {
            this.chooseitem = num;
          },
          showPopup() {
            this.show = true;
          },
          onClickLeft() {
            this.$router.push('/personinfo');
          },
          test() {
            var _this = this;
            console.log(this.asknum);
            console.log(this.asknum >= this.testnumber - 1);
            if(this.asknum >= this.testnumber ) {
              // 调用接口保存数据
              const wifidata = { wifi_test_list:_this.wifilist };
              console.log(wifidata);

              _this.$req.post('wifi_record/add_record', {
                loc_id : _this.loc_id,
                phone_info: _this.deviceManufacturer,
                wifi_info_list : JSON.stringify(wifidata),
                type: 1
              })
                .then(res => {
                  console.log(res);
                  if(res.error_code == 0 ) {
                    this.$toast('完成测试');
                  }else {
                    console.log(res.msg);
                  }
                })

              clearTimeout(this.timer);
              this.state = 0;
              this.rate = 0;
              this.asknum = 0;
            } else {
              this.getwifilist(this.asknum);
              // console.log("this.asknum / this.testnumber:" + this.asknum / this.testnumber);
              this.rate = parseInt( (this.asknum+1) / this.testnumber * 100);
            }
            this.asknum++;
          },
          cicleGetWifi: async function() {

            if(this.local ==  '请选择地点' && this.localnum == '请选择地点编号') {
              this.$toast('请选择地点');
            } else {
              this.state = 1;
              this.timer = setInterval(async () => {
                await setTimeout(this.test(), 0)
              }, 6000)
            }
          },
          getwifilist: function (num) {
            const _this = this;

            // var locdata={};
            // locdata.wifi_rec_id = _this.loc_id;

            cordova.plugins.hotspot.scanWifiByLevel(SSIDlist, errorCB);//扫描当前可用WIFI，此函数第一个参数返回的信息是一个包含 [SSID, BSSID, frequency, level, timestamp, capabilities]
            async function SSIDlist(info){
              console.log(info);
              _this.wifilist[num] = info;
              console.log(_this.wifilist[num] );
              // const wifidata = { wifi_list:info };
              // locdata.wifi_list = info;
              // console.log(JSON.stringify(info));
              //
              // await _this.$req.post('wifi_record/add_record', {
              //   loc_id : _this.loc_id,
              //   phone_info: _this.deviceManufacturer,
              //   wifi_info_list : JSON.stringify(wifidata)
              // })
              //   .then(res => {
              //     console.log(res);
              //   })

            }
            function errorCB(){
              this.$toast('获取wifi信息失败');
            }
          },

        },
        created() {
          this.getlocallist();
          this.deviceManufacturer = device.model;
          // this.setlat_lot();
          // setInterval(this.getwifilist, 30000);
        },
        mounted() {

        },
      destroyed() {
        clearTimeout(this.timer);
      }

      }
</script>

<style scoped>
  .testbut {
    box-shadow: 0 0 20px #dcdde1;
    justify-content: center;
    align-items: center;
    display: flex;
    margin-bottom: 30px;
    width: 170px;
    height: 170px;
    margin-left: calc(50% - 85px);
    border-radius: 100px;
    background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
  }
  .testbut_forn {
    font-size: 20px;
  }
  .card {
    display: flex;
    width: calc(100% - 20px);
    margin-left: 10px;
    justify-content: center;
  }
  .card_all {
    border-radius: 10px;
    box-shadow: 0 0 2px #dcdde1;
    background-color: white;
    justify-content: center;
    align-items: center;
    height: 90px;
    width: 50%;
  }
  .card_title {
    font-size: 13px;
    margin-top: 10px;
    display: flex;
    margin-left: 20px;
  }
  .card_con {
    font-size: 20px;
    margin-top: 15px;
  }
  .card_left {

  }
  .card_right {
    margin-left: 2%;
    margin-bottom: 10px;
  }
  .cardtype2 {
    display: flex;
    width: calc(100% - 20px);
    margin-left: 10px;
    margin-bottom: 10px;
    justify-content: center;
    height: 70px;
    border-radius: 10px;
    box-shadow: 0 0 2px #dcdde1;
    background-color: white;
    justify-content: center;
    align-items: center;
  }
  .cardtype2_font {
    font-size: 20px;
  }
  .localitem {
    position: absolute;
    margin-left: 100px;
  }
  .localitemcell {
    width: 200px;
  }
  .latitudeandlongitudefont {
    font-size: 15px;
    line-height: 20px;
    margin-top: 10px;
  }
  .map {
    height: 100%;
    position: absolute;
    width: 100%;
  }
  .getlocal {
    font-size: 20px;
    line-height: 30px;
    height: 30px;
    border: ghostwhite 1px solid;
  }
  .limit {
    height: 80%;
    overflow: scroll;
  }
  .circle {
    position: absolute;
    margin-left: calc(50% - 85px);
  }
  .addpoint {
    margin-top: 10px;
  }
</style>
