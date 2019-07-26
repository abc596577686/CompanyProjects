<template>
  <div id="app" @touchmove.prevent>
    <!-- <keep-alive> -->
      <router-view></router-view>
    <!-- </keep-alive> -->
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    data() {
      return {}
    },
    components: {}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  #app
    position: absolute
    top: 0
    bottom: 0
    left: 0
    right: 0
    width: 100%
    color: #333
    background: #f5f5f5
</style>
