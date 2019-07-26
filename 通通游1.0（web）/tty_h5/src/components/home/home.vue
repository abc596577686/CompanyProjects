<template>
    <section class="home">
      <div v-title data-title="首页"></div>
      <div class="toptit">
        <div class="toptBg">
          <span class="totim">
            <img src="../../assets/images/icon_search.png"  style="width:100%;height:100%;display:block;">
          </span>
          <input class="toptB" type="text" placeholder="目的地/关键词" @click="goSearch">
        </div>
      </div>
      <div class="pulldownWrap">
        <div class="imgWrap">
          <img class="icon" :class="{'ani': isShowAni}" src="../../assets/images/icon_refresh.png">
        </div>
        <span class="text" v-html="pulldownTip.text"></span>
      </div>
      <scroll class="contentWrap"
        :probe-type="probeType"
        :listen-scroll="listenScroll"
        :pulldown="pulldown"
        :beforeScroll="beforeScroll"
        @refresh="refreshData"
        @pulldownScroll="pulldownScroll"
        @cancelRefresh="cancelRefresh"
        @scroll="scroll">
        <div>
          <!--轮播图  -->
          <div class="swiperIm">
            <img :src="imgUrl == '' ? defaultImg : imgUrl"  style="width:100%;height:100%;display:block;">
          </div>
          <!--链接小logo  -->
          <div class="linkTip">
            <!-- linktt.forwardUrl -->
            <div class="link" v-for="(link, index) in productIndexResultLogo" key="link" @click="routeLink(index, link)">
              <div class="Lt_im1">
                <img :src="link.imageUrl"  style="width:100%;height:100%;display:block;">
              </div> 
              <div class="Lt_t1">{{link.title}}</div> 
            </div>
          </div>
          <span class="sp1"></span>
          <div class="new">最新</div>
          <!--产品信息  -->
          <div class="productList">
            <router-link class="project" v-for="pro in productList" key="pro" :to='{path: "/productDetails", query:{productId: pro.productId, saleId: saleId}}'>
              <div class="mainPro">
                <div class="imgWrap">
                  <img :src="pro.imgUrl" >
                  <span class="supplier" v-html="pro.supName"></span>
                </div>
                <span class="mptitle line-02">{{pro.title}}</span>
                <span class="goTime line-01">最近出发 {{getFormatData(pro.calDate)}}</span>
                <span class="pay">￥{{pro.lowestAdultPrice}} 起</span>
              </div>
            </router-link>
          </div>
          <loading v-show="isLoading" title=""></loading>
          <underline style="margin-top: 30px" v-show="isUnderline"></underline>
        </div>
      </scroll>
      <div class="advert" @click="goDistAdvert">赚</div>
      <footer-bar :type="type"></footer-bar>
      <tips :text="tipsText" :isShowTips="isShowTips"></tips>
    </section>
</template>

<script type="text/ecmascript-6">
  import tips from 'base/tips/tips'
  import { getHomeData } from 'api'
  import Scroll from 'base/scroll/scroll'
  import footerBar from 'base/footer/footer'
  import Loading from 'base/loading/loading'
  import Underline from 'base/underline/underline'
  import qs from 'qs'
  import storage from 'good-storage'

  const ERR_OK = '1'
  const defaultImg = require('../../assets/images/default_productDetail_banner.png')

  const IDS = '__IDS__'
  const IS_DERICT = '__isDerict__'
  const SALE_ID = '__saleId__'

  export default {
  	data() {
  		return {
        isShowAni: false,
        pulldown: true,
        beforeScroll: true,
        probeType: 3,
        listenScroll: true,
        scrollY: 0,
        pulldownTip: {
          text: '下拉刷新', // 松开立即刷新
          rotate: '' // icon-rotate
        },
        isShowPage: true,
        isShowTips: false,
        tipsText: '',
        timer: undefined,
        type: '1',
        saleId: '',
        isLoading: true,
        isUnderline: false,
        imgUrl: defaultImg,
        // 首页数据
        // 默认小于四个 大于四个高度加一倍
        productIndexResultLogo: [],
        productList: [],
        isDerict: false
  		}
  	},
    created() {
      this.isLoading = false
      // 存储当前产品信息
      this.saleId = Number(this.$route.query.saleId)
      console.log(this.saleId)
      storage.set(SALE_ID, this.saleId)
    },
    beforeRouteEnter (to, from, next) {
        window.comeBackPage = false
        if(from.path.indexOf("productDetails")>=0 
            || from.path.indexOf("search")>=0
            || from.path.indexOf("productList")>=0
            || from.path.indexOf("distAdvert")>=0
            || from.path.indexOf("destination")>=0){
            if(sessionStorage.isHomeSession){
              window.comeBackPage = true
            }
        }    
        next();
    },
  	methods: {
      scroll(pos) {
        this.scrollY = pos.y
      },
      pulldownScroll() {
        this.pulldownTip = {
          text: '松开立即刷新'
        }
        this.isShowAni = true
      },
      cancelRefresh() {
        this.pulldownTip = {
          text: '下拉刷新'
        }
        this.isShowAni = false
      },
      refreshData() {
        this.productList = []
        this.getHomeData()
      },
      getHomeData(){
        window.comeBackPage = false
        let params = qs.stringify({
          saleId: this.saleId
        });

        this.isLoading = true
        getHomeData(params).then((res) => {
          this.isLoading = false
          if(res.code != ERR_OK) {
            this.$router.push('/error')
            return
          }

          this.isUnderline = true
          let productIndex = res.productIndexResult
          this.productIndexResultLogo = res.productIndexResult.logo

          // logo
          if(productIndex.cycleTheme.length > 0){
            let bannerImg = productIndex.cycleTheme[0].imageUrl
            this.imgUrl = bannerImg
          }
          console.log(res)

          // 菜单
          productIndex.logo.forEach((item) => {
            if (item.title == '热门') {
              item.type = 3
            }else if (item.title == '爆款') {
              item.type = 4
            }else if (item.title == '高返佣') {
              item.type = 5
            }else if (item.title == '目的地') {
              item.type = 2
            }
          })
          
          // 列表
          let productList = res.productList
          productList.forEach((item) => {
            if (item.imgUrl == '' || !item.imgUrl) {
              item.imgUrl = defaultImg
            }
          })
          this.productList = productList

          // 本地缓存
          sessionStorage.isHomeSession = true
          sessionStorage.imgUrl = this.imgUrl
          sessionStorage.isUnderline = this.isUnderline
          sessionStorage.productIndexResultLogo = qs.stringify(this.productIndexResultLogo);
          sessionStorage.productList = qs.stringify(this.productList);
        })
      },
      getFormatData(dateString){
        if(dateString.trim().length == 10){
          try{
            dateString = dateString.trim();
            dateString = dateString.slice(5);
            return dateString.replace('-', '/');
          }catch(e){
          }
        }
        return "";      
      },
      goDistAdvert() {
        this.$router.push('/distAdvert');
      },
  		search() {
        this.$router.push('/search')
      },
      goDistribution() {
        this.$router.push('/distribution')
      },
      goDestination() {
        this.$router.push('/destination')
      },
      goCustom() {
        this.$router.push('/custom')
      },
      goUserCenter() {
        this.$router.push('/userCenter')
      },
      goProductDetails() {
        this.$router.push('/productDetails')
      },
      goSearch() {
        this.$router.push({
          path: '/search',
          query: {
            type: '0'
          }
        })
      },
      routeLink(index, link) {
        if (index == '2') {
          this.$router.push('/distAdvert')
          return
        }else if (index == '3') {
          this.$router.push('/destination')
          return
        }
        this.$router.push({ path: '/productList', query: { selectType: link.type, title: link.title} })
      },
      _getQueryString(name) {
        var reg = new RegExp("(^|)" + name + "=([^&]*)(&|$)", "i")
        var r = window.location.href.substr(1).match(reg)
        if (r != null) return unescape(r[2])
        return null
      },
      _showTips(text) {
        if (this.timer) return
        this.isShowTips = true
        this.tipsText = text
        this.timer = setTimeout(() => {
          this.isShowTips = false
          this.timer = undefined
          clearTimeout(this.timer)
        }, 1600)
      }
  	},
    mounted() {
      let me = this
      if (window.comeBackPage) {
        me.imgUrl = sessionStorage.imgUrl
        me.isUnderline = sessionStorage.isUnderline
        me.productList = qs.parse(sessionStorage.productList)
        me.productIndexResultLogo = qs.parse(sessionStorage.productIndexResultLogo)
      } else {
        me.getHomeData()
      }
    },
    components: {
      footerBar,
      Scroll,
      Loading,
      Underline,
      tips
    }
  }
</script>

<style scoped lang="css" rel="stylesheet/css">
  @import './home.css';
  .home{
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 10;
    width: 100%;
    background: #f5f5f5;
  }
</style>