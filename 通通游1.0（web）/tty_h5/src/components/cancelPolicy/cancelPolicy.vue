<template>
  <transition name="slide">
    <section class="cancelPolicy">
      <div v-title data-title="取消政策"></div>
      <!-- <p>取消政策</p>
      <button @click="back">返回</button> -->

      <div class="title">
        <img @click="back" src="../../assets/images/icon_back_black.png" alt="">
        取消政策
      </div>

      <scroll
        class="artical"
        ref="artical">
        <div>
          <div v-show="policy.length">
            <p v-for="item in policy" v-html="`行程开始前${item.day}日，按旅游费用总额的${item.priceRate}%收取取消费用；`"></p>
          </div>
          <p>如果取消费用低于旅行社实际发生费用或取消时间不在 以上约束范围内，以旅行社实际发生费用为准。</p>
        </div>
      </scroll>


    </section>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import storage from 'good-storage'

  const POLICY = '__policy__'

  export default {
    data() {
      return {
        policy: []
      }
    },
    created() {
      this.probeType = 3
      this.listenScroll = true
      this.policy = storage.get(POLICY)
      console.log(this.policy)
    },
    methods: {
      back() {
        this.$router.back()
      }
    },
    components: {
      Scroll
    }
  }
</script>

<style scoped lang="css" rel="stylesheet/css">
  @import './cancelPolicy.css';
  .cancelPolicy{
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 10;
    width: 100%;
    background: #f5f5f5;
  }
</style>