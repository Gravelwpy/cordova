<template>
  <div>
    <van-nav-bar title="课程表" :z-index="997"> </van-nav-bar>
    <div class="schedule">
      <!--用vant九宫格试试-->
      <div class="classschedule" v-if="classlist != null">
        <div class="classgrid">
          <van-grid square :column-num="8">
            <van-grid-item text="七月" />
            <van-grid-item text="周一" />
            <van-grid-item text="周二" />
            <van-grid-item text="周三" />
            <van-grid-item text="周四" />
            <van-grid-item text="周五" />
            <van-grid-item text="周六" />
            <van-grid-item text="周日" />
          </van-grid>

          <!-- 两端对齐 -->
          <van-row type="flex" justify="space-between">
            <van-col span="3">
              <div class="schedule_class_card_number">
                <van-grid square :column-num="1">
                  <van-grid-item
                    v-for="value in 12"
                    :key="value"
                    :text="value + ''"
                  >
                  </van-grid-item>
                </van-grid>
              </div>
            </van-col>

            <van-col span="3">
              <div
                class="schedule_class_card"
                v-for="(item, index) in classlist[0]"
              >
                <cell
                  :classname="item.course_name"
                  :local="item.room_id"
                  :number="item.i_duration"
                ></cell>
              </div>
            </van-col>

            <van-col span="3">
              <div
                class="schedule_class_card"
                v-for="(item, index) in classlist[1]"
              >
                <cell
                  :classname="item.course_name"
                  :local="item.room_id"
                  :number="item.i_duration"
                ></cell>
              </div>
            </van-col>
            <van-col span="3">
              <div
                class="schedule_class_card"
                v-for="(item, index) in classlist[2]"
              >
                <cell
                  :classname="item.course_name"
                  :local="item.room_id"
                  :number="item.i_duration"
                ></cell>
              </div>
            </van-col>
            <van-col span="3">
              <div
                class="schedule_class_card"
                v-for="(item, index) in classlist[3]"
              >
                <cell
                  :classname="item.course_name"
                  :local="item.room_id"
                  :number="item.i_duration"
                ></cell>
              </div>
            </van-col>
            <van-col span="3">
              <div
                class="schedule_class_card"
                v-for="(item, index) in classlist[4]"
              >
                <cell
                  :classname="item.course_name"
                  :local="item.room_id"
                  :number="item.i_duration"
                ></cell>
              </div>
            </van-col>
            <van-col span="3">
              <div
                class="schedule_class_card"
                v-for="(item, index) in classlist[5]"
              >
                <cell
                  :classname="item.course_name"
                  :local="item.room_id"
                  :number="item.i_duration"
                ></cell>
              </div>
            </van-col>
            <van-col span="3">
              <div
                class="schedule_class_card"
                v-for="(item, index) in classlist[6]"
              >
                <cell
                  :classname="item.course_name"
                  :local="item.room_id"
                  :number="item.i_duration"
                ></cell>
              </div>
            </van-col>
          </van-row>
        </div>
      </div>
      <div v-else>
        <div style="margin-top: 50%">
          <p style="color: #606266; font-size: 20px">暂无课程表数据</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cell from "@/components/cell.vue";

export default {
  name: "class",
  components: {
    cell,
  },
  data: function () {
    return {
      wid: 45,
      classlist: [],
    };
  },
  methods: {
    getSchedule() {
      this.$req.get("information/schedule", {}).then((res) => {
        console.log(res);
        this.classlist = res.data;
      });
    },
  },
  created() {
    if (JSON.parse(localStorage.getItem("persion_info"))) {
      this.getSchedule();
    } else {
      // this.$router.push('/');
    }
  },
  mounted() {},
};
</script>

<style scoped>
.classgrid {
  width: 100%;
}
.classschedule {
  display: flex;
}
.schedule {
  margin-bottom: 60px;
}
.schedule_class_card_number {
}
.schedule_class_card {
}
</style>
