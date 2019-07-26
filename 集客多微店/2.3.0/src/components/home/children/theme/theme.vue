<template>
  <section class="themeContainer">
    <div v-title :data-title="themeName ? themeName : '专题详情'"></div>
    <div v-if="themeName" v-stat="{type:'pageview', title: themeName ? themeName : '专题详情'}"></div>

    <div v-show="!showLoading">
      <!-- 专题导航 -->
      <static-nav v-if="tabIsFixed && navList && navList.length <= 4 && navList.length != 1" ref="navBar_1" :navList="navList" :curSelectIndex="curSelectIndex" @changeNavBar="changeNavBar" :class="{'fixed': tabIsFixed}"></static-nav>
      <nav-bar v-if="tabIsFixed && navList && navList.length > 4" ref="navBar_2" :viewMore="true" :navList="navList" :curSelectIndex="curSelectIndex" @changeNavBar="changeNavBar" @showMoreNav="showMoreNav" :class="{'fixed': tabIsFixed}"></nav-bar>
      <scroll class="themeWrap" ref="scroll" @scroll="scroll" :listen-scroll="listenScroll" :probe-type="probeType">
        <div>
          <div class="themeImgWrap" ref="themeImgWrap">
            <img :src="bannerImgUrl">
          </div>
            
          <!-- 切换楼层 -->
          <transition name="viewMoreAni">
            <div class="topNav" v-show="isShowMoreNav">
              <div class="title">
                切换楼层
                <img class="packUp" src="../../../../common/images/icon_packUp.png">
              </div>
              <div class="list">
                <div class="item" v-for="(item, index) in navList" v-html="item.channelName" :class="{'active': curIndex == index}" @click="selectTopNav(index)"></div>
              </div>
            </div>
          </transition>

          <!-- 专题导航 -->
          <static-nav v-if="navList && navList.length <= 4 && navList.length != 1" :navList="navList" ref="navBar_3" :curSelectIndex="curSelectIndex" @changeNavBar="changeNavBar"></static-nav>
          <nav-bar v-if="navList && navList.length > 4" :viewMore="true" :navList="navList" ref="navBar_4" :curSelectIndex="curSelectIndex" @changeNavBar="changeNavBar" @showMoreNav="showMoreNav"></nav-bar>

          <!-- 专题商品分类 -->
          <theme-detail v-for="(theme, index) in themeList" :key="theme.channelName" :theme="theme" :ref="theme.refName"></theme-detail>

          <!-- 遮罩 -->
          <transition name="viewMoreAni">
            <shade v-show="isShowMoreNav" @touchEnv="touchEnv"></shade>
          </transition>
        </div>
      </scroll>
    </div>   
    <transition name="loading">
      <loading v-show="showLoading"></loading>
    </transition> 
  </section>
</template>

<script>
  import loading from 'base/loading/loading'
  import Scroll from 'base/scroll/scroll'
  import Shade from 'base/shade/shade'
  import NavBar from 'components/navBar/navBar'
  import StaticNav from 'components/staticNav/staticNav'
  import ThemeDetail from 'components/themeDetail/themeDetail'
  import qs from 'qs'

  import { getThemeDetails } from 'api'
  import { mock_themeDetails } from 'service/mock'
  import { navSerialize, setJumpUrl } from 'common/js/utils'
  // import sa from 'sa-sdk-javascript';

  const NAV_HEIGHT = 45

  export default {
    data(){
      return{
        probeType: 3,
        listenScroll: true,
        scrollY: 0,
        isShowMoreNav: false,
        curSelectIndex: 0,
        curIndex: 0,
        bannerImgUrl: '',
        navList: null,
        themeList: [],
        tabIsFixed: false,
        showLoading: false   //显示加载动画
      }
    },
    created(){
      console.log(this.$route.query)
      this.channelId = this.$route.query.channelId
      this.pageId = this.$route.query.pageId
      this.themeName = this.$route.query.themeName
      this._getThemeDetails()
    },
    watch: {
      isShowMoreNav(state) { 
        if (state) {
          this.$refs.scroll.scrollTo(0,0,300)
          this.$refs.scroll.disable()
        } else {
          this.$refs.scroll.enable()
        }
      },
      scrollY(newY) {
        // console.log(newY)

        if (-newY == this.$refs.themeImgWrap.offsetHeight || newY == 0){
          return
        }
        if (-newY > this.$refs.themeImgWrap.offsetHeight) {
          // console.log('Yes')
          this.tabIsFixed = true
        } else {
          // console.log('No')
          this.tabIsFixed = false
        }


      },
      curIndex(val) {
        this.curSelectIndex = val
      }
    },
    methods: {
      scroll(pos) {
        this.scrollY = pos.y
      },
      touchEnv() {
        this.isShowMoreNav = false;
      },
      showMoreNav() {
        this.isShowMoreNav = true;
      },
      selectTopNav(index) {
        this.curIndex = index;
        this.isShowMoreNav = false;
        this.curSelectIndex = this.curIndex

        setTimeout(() => {
          this._changeIndex(index)
        }, 50)

        this._scrollTo(index)
      },
      changeNavBar(curIndex) {
        this.tabIsFixed = true
        // console.log('改变slide索引：' + curIndex)
        this.curIndex = curIndex
        // this.channelId = this.navList[curIndex].channelId
        this._scrollTo(curIndex)

        setTimeout(() => {
          this._changeIndex(curIndex)
        }, 50)
        
      },
      _changeIndex(curIndex) {
        if (this.navList.length > 4) {
          this.$refs.navBar_4.changeCurrentIndex(curIndex)
          if (this.tabIsFixed) {
            this.$refs.navBar_2.changeCurrentIndex(curIndex)
          }
        } else {
          this.$refs.navBar_3.changeCurrentIndex(curIndex)
          if (this.tabIsFixed) {
            this.$refs.navBar_1.changeCurrentIndex(curIndex)
          }
        }
      },
      _scrollTo(curIndex) {
        this.themeList.forEach((item, index) => {
          if (curIndex == index) {
            let scrollPosY = -this.$refs[item.refName][0].$el.offsetTop
            // console.log(scrollPosY)
            this.$refs.scroll.scrollTo(0, scrollPosY + NAV_HEIGHT, 500)
            return
          }
        })
      },
      _getThemeDetails() {
        let me = this;
        let params = qs.stringify({
          a: 'v1/channelDetail',
          channelId: this.channelId,
          pageId: this.pageId
        })

        me.showLoading = true;
        getThemeDetails(params).then((res) => {
          console.log('专题详情：', res);
          if (res.code == "1"){
            me.showLoading = false;
            me.bannerImgUrl = res.spePicture;
            let ret = []
            res.list.forEach((good, index) => {
              let obj = {
                id: index + 1,
                channelName: good.specialName
              }
              ret.push(obj)
            })

            me.navList = ret
            res.list.forEach((good) => {
              // 添加跳转链接
              good = setJumpUrl(good, me.channelId)
            })
            me.themeList = me._addAttr(res.list);

            // sa.track('$pageview', {
            //   $title: document.title,
            //   $url: location.href,
            //   $url_path: location.pathname,
            //   $referrer_host: location.hostname,
            //   $referrer: document.referrer,
            // })
          }
        })
      },
      _addAttr(list){
        list.forEach((item, index) => {
          item.refName = `theme_${index}`
        })
        return list
      }
    },
    mounted() {
      // console.log(this.$refs.navBar)
    },
    components: {
      loading,
      Scroll,
      StaticNav,
      NavBar,
      ThemeDetail,
      Shade
    }
  }

</script>

<style lang="css" scoped>
  @import 'theme';
</style>
