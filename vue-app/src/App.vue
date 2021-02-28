<template>
  <div id="app">

    <router-view/>

    <div v-show="$route.path !== '/selectLocation'
                 && $route.path !== '/login'
                 && $route.path !== '/studentsignrecord'
                 && $route.path !== '/messagemanagement'
                 && $route.path !== '/question'
                 && $route.path !== '/loginbak'
                 && $route.path !== '/sutdengsignresult'
                 && $route.path !== '/register'
                 && $route.path !== '/test'
                 && $route.path !== '/messageadd'
                 && $route.path !== '/creatnewsign'
                 && $route.path !== '/signmanagement'
                 && $route.path !== '/studentsigndetail'
                 && $route.path !== '/studentsign'
                 && $route.path !== '/addsign'
                 && $route.path !== '/hallSeat'
                 && $route.path !== '/wifiget'
                 && $route.path !== '/wifiTest'
                 && $route.path !== '/'">
      <van-tabbar route>
        <van-tabbar-item
          replace
          to="/schedule"
          icon="label-o"
        >课程表</van-tabbar-item>
        <van-tabbar-item
          replace
          to="/sign"
          icon="edit"
        >签到</van-tabbar-item>
        <!--<van-tabbar-item-->
          <!--replace-->
          <!--to="/message"-->
          <!--icon="envelop-o"-->
        <!--&gt;消息</van-tabbar-item>-->
        <van-tabbar-item
          replace
          to="/personinfo"
          icon="manager-o"
        >我的</van-tabbar-item>
      </van-tabbar>
    </div>

  </div>
</template>

<script>
  // eslint-disable-next-line
  /* eslint-disable */
  export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: linear-gradient(to top, #f5f5f5 0%, #f5f5f5 100%);
  height: 100%;
  position: absolute;
  width: 100%;
  overflow: scroll;
}

</style>
