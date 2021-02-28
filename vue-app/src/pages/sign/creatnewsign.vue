<template>
  <div>
    <van-nav-bar
      title="添加签到"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="newitem">
      <div class="group">
        <van-cell title="参与考勤班级" class="content" :value="chooseItem.classname" @click="selectClass" is-link/>
        <van-cell title="考勤组名称" class="content" :value="chooseItem.name" @click="setItemName" is-link/>
      </div>
      <div class="group">
        <van-cell title="考勤类型" class="content" :value="chooseItem.type" @click="setItemType" is-link/>
        <van-cell title="考勤时间" class="content" :value="chooseItem.time + ''" @click="setItemTime" is-link/>
      </div>
      <div class="group">
        <van-cell title="考勤点" class="content" :value="chooseItem.localname" @click="setItemLocal" is-link/>
        <van-cell title="考勤教室" class="content" :value="chooseItem.roomname" @click="setItemRoomId" is-link/>
        <van-cell title="考勤范围" class="content" :value="chooseItem.area + '米'" @click="setItemLocalArea" is-link/>
      </div>
      <div class="group">
        <van-cell title="验证方式" class="content" :value="chooseItem.signtypename" @click="setSignTypeName" is-link/>
        <van-cell title="输入签到码" class="content" v-if="chooseItem.signtype === 1" :value="chooseItem.password" @click="setSignTypePass" is-link/>
      </div>
    </div>
    <div class="savebutton">
      <van-button type="info" round block @click="subMsg">保存</van-button>
    </div>
    <!--弹出层-->
    <van-action-sheet
      v-model="show"
      cancel-text="取消"
      @cancel="onCancel"
      :actions="classactions"
      @select="onSelect" />

    <van-dialog :showCancelButton="false" :closeOnClickOverlay="true" v-model="dialogshow" title="请输入考勤组名称" show-cancel-button>
      <van-field v-model="chooseItem.name" placeholder="请输入用户名" />
    </van-dialog>

    <van-action-sheet
      v-model="typeshow"
      cancel-text="取消"
      @cancel="onCancel"
      :actions="typeactions"
      @select="onSelectType" />

    <van-action-sheet
      v-model="timeshow"
      :overlay="false"
      cancel-text="确定"
      @cancel="onCancelTime"
      title="请选择开始时间和结束时间">
      <el-time-picker
        is-range
        v-model="chooseItem.time"
        format="HH:mm"
        value-format="HH:mm"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        placeholder="选择时间范围">
      </el-time-picker>
    </van-action-sheet>

    <van-action-sheet
      style="height: 50%;overflow: auto"
      v-model="localshow"
      :actions="localactions"
      cancel-text="取消"
      @select="onSelectLocal"
      @cancel="onCancel"
    />

    <van-action-sheet
      style="height: 50%;overflow: auto"
      v-model="roomidshow"
      :actions="roomidactions"
      @select="onSelectRoomId"
    />

    <van-dialog :showCancelButton="false" :closeOnClickOverlay="true" v-model="areashow" title="请输入考勤范围" >
      <input style="margin-top: 10px;" v-model="chooseItem.area" type="digit" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入考勤范围"/>
    </van-dialog>

    <van-action-sheet
      v-model="signtypeshow"
      cancel-text="取消"
      @cancel="onCancel"
      :actions="signtypeshowactions"
      @select="onSelectSignType" />

    <van-dialog :showCancelButton="false" :closeOnClickOverlay="true" v-model="passshow" title="请输入数字签到码" show-cancel-button>
      <input style="margin-top: 10px;" v-model="chooseItem.password" type="digit" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入签到码"/>
    </van-dialog>
  </div>
</template>

<script>
  import gonggao from '../../assets/gonggao.jpg'
  import { Toast } from 'vant';
  export default {
    name: 'creatnewsign',
    data() {
      return {
        roomidshow: false,
        passshow: false,
        signtypeshow: false,
        areashow: false,
        localshow: false,
        defaulttime: new Date(2016, 9, 10, 18, 40),
        timeshow: false,
        typeshow: false,
        false: false,
        true: true,
        chooseItem: {
          roomname: '',
          roomid: '',
          classname: '',
          classid: '',
          name: '',
          type: '',
          typeid: '',
          time: '',
          localname: '',
          latitude: '',
          longitude: '',
          area: 200,
          signtype: 0,
          signtypename: '直接签到',
          password: ''
        },
        dialogshow: false,
        show: false,
        signtypeshowactions: [
          { name: '直接签到', subname: '学生可直接点击签到', type: 0 },
          { name: '签到码签到', subname: '学生需要输入签到码签到', type: 1 }
        ],
        roomidactions: [
          { name: '选项' },
          { name: '选项' },
          { name: '选项', subname: '描述信息' }
        ],
        localactions: [
          { name: '选项' },
          { name: '选项' },
          { name: '选项', subname: '描述信息' }
        ],
        classactions: [
          { name: '选项' },
          { name: '选项' },
          { name: '选项', subname: '描述信息' }
        ],
        typeactions: [
          { name: '课堂签到', typeid: 1 ,subname: '上课签到'},
          { name: '实验室签到', typeid: 2 ,subname: '实验室定时签到'},
        ],
        gonggao,
        images: [
          gonggao
        ],
        count: 0,
        isLoading: false
      }
    },

    methods: {
      getAllRoom() {
        this.$req.post('classroom/getAllClassRoom', {
        })
          .then(res => {
            console.log(res)
            if( res.data !== '' ) {
              this.roomidactions = res.data.data
              this.roomidshow = true
            } else {
              this.$toast('获取失败');
            }
          })
      },
      onSelectRoomId(item) {
        this.chooseItem.roomid = item.id
        this.chooseItem.roomname = item.name
        this.roomidshow = false
        console.log(this.chooseItem.roomid)
      },
      setItemRoomId() {
        this.getAllRoom();
        // this.roomidshow = true
      },
      testTime() {
        console.log(this.chooseItem.time[0])
      },
      subMsg() {
        if( this.chooseItem.type === '' ||
          this.chooseItem.name === '' ||
          this.chooseItem.classid === '' ||
          this.chooseItem.latitude === '' ||
          this.chooseItem.longitude === '' ||
          this.chooseItem.area === '' ||
          this.chooseItem.time === '' ||
          this.chooseItem.roomid === ''
        ) {
          this.$toast('请按要求填写输入信息');
        } else {
          if(this.chooseItem.time === '' && this.chooseItem.signtype === 1 ) {
            this.$toast('请按要求填写输入信息');
          } else {
            this.$req.post('sign/addSignItem', {
              type: this.chooseItem.typeid,
              name: this.chooseItem.name,
              classid: this.chooseItem.classid,
              latitude:this.chooseItem.latitude,
              longitude:this.chooseItem.longitude,
              radius:this.chooseItem.area,
              begintime: this.chooseItem.time[0],
              endtime: this.chooseItem.time[1],
              check: this.chooseItem.password,
              signtype: this.chooseItem.signtype,
              classroomid: this.chooseItem.roomid
            })
              .then(res => {
                console.log(res)
                if( res.data !== '' ) {
                  this.$toast('添加成功');
                } else {
                  this.$toast('添加失败');
                }
              })
          }
        }
      },
      setSignTypePass() {
        this.passshow = true
      },
      onSelectSignType(item) {
        this.chooseItem.signtype = item.type
        this.chooseItem.signtypename = item.name
        this.signtypeshow = false
      },
      setSignTypeName() {
        this.signtypeshow = true
      },
      setItemLocalArea() {
        this.areashow = true
      },
      onSelectLocal(item) {
        console.log(item)
        this.chooseItem.latitude = item.latitude
        this.chooseItem.longitude = item.longitude
        this.chooseItem.localname = item.name + item.subname
        this.localshow = false;
      },
      getLocalListByName() {
        this.$req.post('location/getLocList')
          .then(res => {

            console.log(res);
            if( res.error_code === 0 ) {
              this.localactions = res.data[0].list;
              this.localshow = true;
            } else {
              this.$toast('班级信息获取失败');
            }
          })
      },
      setItemLocal() {
        this.getLocalListByName()
      },
      onCancelTime() {
        // console.log("sss")
      },
      setItemTime() {
        this.timeshow = true
      },
      onSelectType(item) {
        console.log(item)
        this.chooseItem.type = item.name
        this.chooseItem.typeid = item.typeid
        this.typeshow = false
      },
      setItemType() {
        this.typeshow =true
      },
      setItemName() {
        this.dialogshow = true
      },
      getclasslist() {
        this.$req.get('class/creatNewSignGetclassList')
          .then(res => {

            console.log(res);
            if( res.error_code === 0 ) {
              this.classactions = res.data;
              this.show = true;
            } else {
              this.$toast('班级信息获取失败');
            }
          })
      },
      selectClass() {
        this.getclasslist();
      },
      onSelect(item) {
        console.log(item)
        this.chooseItem.classname = item.name
        this.chooseItem.classid = item.class_id
        this.show = false;
      },
      onCancel() {
        this.show = false
        this.typeshow = false
        this.localshow = false
      },
      onClickLeft() {
        this.$router.push('/sign');
      },
      showmap() {

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
              alert(JSON.stringify(result));
            }, function (error) {
              console.error(error);
            });
          } else {
            console.error('baidumap_location is undefined');
          }
        }

        document.addEventListener("deviceready", onDeviceReady, false);

      },
      apitest() {
        this.$req.post('helloSpringBoot', {
        })
          .then(res => {
            console.log(res);
          })
      },
    },
    created() {
      if( JSON.parse(localStorage.getItem('persion_info')) ) {
        // 初始化内容
      } else {
        // this.$router.push('/');
      }
    },
    mounted(){
    },
  }
</script>

<style scoped>
  .newitem {
    width: 100%;
  }
  .group {
    margin-top: 10px;
  }
  .content {
    text-align: left;
  }
  .savebutton {
    width: 80%;
    margin-left: 10%;
    margin-top: 30px;
    /*background-color: white;*/
    /*padding: 20px;*/
    /*position:absolute;*/
    /*bottom: 0px;*/
    /*width: calc( 100% - 40px );*/
  }
</style>
