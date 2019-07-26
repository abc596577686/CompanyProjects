<template>
  <transition name="tipsAni">
    <section class="tipsBox" v-show="isShowTips">
      <div class="tips" v-html="text"></div>
    </section>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      text: {
        type: String,
        default: '网络出错了……'
      },
      isShowTips: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {

      }
    },
    methods: {
    }
  }
</script>

<style scoped lang="css">
  @import './tips.css';
</style>