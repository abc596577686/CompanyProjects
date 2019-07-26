<template>
  <div>
  <!-- <div class="header"></div> -->
  <transition :name="transitionName">
    <!-- <keep-alive> -->
    <router-view class="child-view"></router-view>
    <!-- </keep-alive> -->
  </transition>
  </div>
</template>

<script type="ecmascript-6">
  // window.onpopstate = function() {
  //   this.isBack = true
  // }

  export default {
    data () {
      return {
        transitionName: 'slide-left'
      }
    },
    beforeRouteUpdate (to, from, next) {
      let isBack = this.$router.isBack
      if (isBack) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
      this.$router.isBack = false
      next()
    }
  }
</script>
<style scoped lang="css">
  .child-view{
    position: absolute;
    width:100%;
    height: 100%;
    overflow: hidden;
    transition: all .36s cubic-bezier(.55,0,.1,1);
  }
  .header{
    position:absolute;
    height:44px;
    background:#0058f1;
    width:100%;
  }
</style>
