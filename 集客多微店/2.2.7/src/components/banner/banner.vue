<template>
    <div class="slide-wrapper">
      <div class="slide-content">
        <banner-slide ref="slide" :autoPlay="isAutoPlay" :loop="isLoop" :showDot="isShowDot" :interval="interval" :threshold="threshold" :speed="speed" @pauseOutSlide="pauseOutSlide" @playOutSlide="playOutSlide">
          <div v-for="(item, index) in bannerList">
            <router-link tag="div" v-if="item.jumpUrl" :to="item.jumpUrl" class="imgWrap" :class="{'isHome': isHome}">
              <img v-if="item.imageUrl" :src="item.imageUrl" @click="trackEnv(item.jumpUrl, index)">
              <img v-if="!item.imageUrl" :src="item.pictureIcon" @click="trackEnv(item.jumpUrl, index)">
            </router-link>
            <div tag="div" v-else class="imgWrap">
              <img v-if="item.imageUrl" :src="item.imageUrl">
              <img v-if="!item.imageUrl" :src="item.pictureIcon">
            </div>
          </div>
        </banner-slide>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  
  import BannerSlide from 'components/slide_banner/slide_banner'
  import sa from 'sa-sdk-javascript';

  export default {
    props: {
      bannerList: {
        type: Array,
        default: []
      },
      isHome: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      data() {
        console.log(this.bannerList)
        return this.bannerList
      }
    },
    data() {
      return {
        isAutoPlay: true,
        isLoop: true,
        isShowDot: true,
        speed: 400,
        threshold: 0.3,
        interval: 4000
      }
    },
    methods: {
      trackEnv(url, index){
        sa.track('bannerClick', {
          pageType: '首页',
          bannerLocation: 'top',
          bannerName: '轮播图',
          bannerID: '',
          url: url,
          bannerRank: index
        })
      },
      pausePlay() {
        this.isAutoPlay = false
      },
      startPlay() {
        this.isAutoPlay = true
      },
      pauseOutSlide() {
        this.$emit('pauseOutSlide')
      },
      playOutSlide() {
        this.$emit('playOutSlide')
      }
    },
    components: {
      BannerSlide
    }
  }
</script>

<style lang='css' scoped>
    /*@import 'src/style/mixin';*/
    .slide-wrapper{
      position: relative;
      width: 100%;
      min-height: 7.81rem;
      overflow: hidden;
    }
    .slide-content{
      /*position: absolute;*/
      /*top: 0;
      left: 0;
      width: 100%;
      height: 100%;*/
    }
    .imgWrap {
      /*display: flex !important;*/
      /*height: 7.81rem;*/
      text-align: center;
      /*@include imgCenter*/
      overflow: hidden;
      display: flex;
      flex-direction:column;
      justify-content: center;
      align-items:center;
      height: 15rem;
    }
    .isHome.imgWrap{
      height: 9rem;
    }
    img{
      /*height: 7.81rem;*/
      width: 100% !important;
      display: inline-block;
    }
</style>
