<template>
  <div id="app">

  </div>
</template>

<script>
  export default {
    name: 'App',
    data:function(){
      return {

      }
    },
    methods:{
    },
    mounted(){
      window.locationService.getCurrentPosition(function(pos){
        alert(JSON.stringify(pos))
        window.locationService.stop(noop,noop)
      },function(e){
        alert(JSON.stringify(e))
        window.locationService.stop(noop,noop)
      });
    }

  }
</script>

<style>
</style>
