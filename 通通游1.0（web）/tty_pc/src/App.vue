<template>
  <div id="app" :style="style">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    name: 'app',
    data() {
      return {
        style: {
          backgroundImage: "url(" + require("./assets/images/bg.png") + ")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center top",
          backgroundSize: 'cover'
        }
      }
    }
  }
</script>

<style scoped>
  /*@import './assets/styles/fonts/iconfont.css'*/

  .eeol{
    width: 500px;
    height: 500px;
  }
  body {
    margin: 0px;
    padding: 0px;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
  }
  
  #app {
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0;
    right: 0;
    width: 100%;
    background-size: cover;
  }
  .el-submenu [class^=fa] {
    vertical-align: baseline;
    margin-right: 10px;
  }

  .el-menu-item [class^=fa] {
    vertical-align: baseline;
    margin-right: 10px;
  }

  .toolbar {
    background: #f2f2f2;
    padding: 10px;
    margin: 10px 0px;
    
  }
  .toolbar .el-form-item {
    margin-bottom: 10px;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all .2s ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  th{
    font-size: 13px !important;
  }

  .el-tabs__nav-wrap::after{
    height: 1px;
  }
</style>
