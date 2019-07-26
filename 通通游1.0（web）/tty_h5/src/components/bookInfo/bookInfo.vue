<template>
  <section class="bookInfo">
    <div class="title">
      <img @click="back" src="../../assets/images/icon_back_black.png" alt="">
      预订须知
    </div>
    <scroll
      class="artical"
      ref="artical">
      <div>
        <div class="bookInfoDesc" v-html="bookInfoDesc"></div>
      </div>
    </scroll>
  </section>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import storage from 'good-storage'

  const BOOK_INFO = '__bookInfo__'

  export default{
    data() {
      return {}
    },
    created() {
      this.probeType = 3
      this.listenScroll = true

      this.bookInfoDesc = storage.get(BOOK_INFO)
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

<style lang="css">
  @import './bookInfo.css';
</style>