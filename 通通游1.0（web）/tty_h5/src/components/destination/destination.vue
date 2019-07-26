<template>
  <transition name="slide">
    <section class="destination">
      <div v-title data-title="目的地"></div>
    	<!-- <p>目的地页面</p>
      <button @click="back">返回</button>
      <button @click="goProductList">进入产品列表</button> -->
      <p v-show="isLoading"><img width="24" height="24" src="../../assets/images/loading.gif" class="loadImg"></p>
      <div class="toptit">
        目的地
        <span class="topim1" @click="back">
          <img src="../../assets/images/icon_back_white.png" style="width：100%;height:100%;display:block;">
        </span>
        <span class="topim2" @click="goSearch">
          <img src="../../assets/images/icon_search_white.png" style="width：100%;height:100%;display:block;">
        </span>
      </div>
      <div class="maintxt">
        <div class="mainPick">
          <div v-for="(item, index) in continents"  @click="selectContinent(item, index)" :class="{'active': curContinentIndex == index}" v-html="item.title"></div>  
        </div>
        <div class="mainShow">
          <div class="allLine">
            <div class="imgWrap">
              <img :src="curContinentImgs.imgUrl">
              <div class="text">
                <span class="name" v-html="curContinentImgs.title"></span>
                <p class="bottom">
                  <span class="left" v-html="curContinentImgs.subTitle"></span>
                  <span class="right" @click="goProductListForContinent(curContinentImgs)">全部路线 ></span>
                </p>
              </div>
            </div>
          </div>

          <!-- 热门目的地 -->
          <p class="h4">热门目的地</p>
          <div class="hotList">
            <ul>
              <li class="item" v-for="item in curHotCountrys" @click="goProductListForCounty(item)">
                <img :src="item.imgUrl">
                <div class="text">
                  <p class="title" v-html="item.title"></p>
                  <p class="subTitle" v-html="item.subTitle"></p>
                </div>
              </li>
            </ul>
          </div>

          <!-- 全部地区 -->
          <p class="h4">全部地区 </p>
          <div class="countryList">
            <ul>
              <li class="item" v-for="(item, index) in curCountryList" v-html="item.title" :class="{active: curCountryIndex == index}" @click="selectCounty(item, index)"></li>
            </ul>
          </div>
        </div>
      </div>
    
    <tips :text="tipsText" :isShowTips="isShowTips"></tips>
    </section>
  </transition>
</template>

<script type="text/ecmascript-6">
  import tips from 'base/tips/tips'
  import {getCountryList} from 'api'
  import storage from 'good-storage'
  import qs from 'qs'

  const SEARCH_KEYWORDS = '__searchKeywords__'
  const TO_PLACE_CONTINENT_CODE = '__toPlaceCode__'
  const SALE_ID = '__saleId__'

  const defaultImg = require('../../assets/images/banner_default.png')

  const ERR_OK = 1
  const type = 2 //商品列表类型 为2目的地

  export default {
  	data() {
  		return {
        isLoading: false,
        isShowTips: false,
        tipsText: '',
        timer: undefined,
        curContinentIndex: 0,
        curCountryIndex: null,
        continents: [],
        continentImgs: [],
        hotCountrys: [],
        countryList: [],

        curContinentImgs: {},
        curHotCountrys: [],
        curCountryList: []
  		}
  	},
    created() {
      this.saleId = storage.get(SALE_ID)
      let params = qs.stringify({
        saleId: this.saleId
      })

      this.isLoading = true
      getCountryList(params).then((res) => {
        this.isLoading = false
        console.log(res)
        if(res.code != ERR_OK) {
          this._showTips(res.msg)
          return
        }
        let continentCountry = res.continentCountry
        this._filterList(continentCountry)
      })
    },
  	methods: {
  		back() {
        this.$router.back()
      },
      goSearch() {
        this.$router.push('/search?type=0')
      },
      goProductListForContinent(item) {
        storage.set(SEARCH_KEYWORDS, '')
        this.$router.push({
          path: '/searchResult',
          query: {
            continentCode: item.code
          }
        })
      },
      goProductListForCounty(item) {
        console.log(item.code)
        this.$router.push({
          path: '/searchResult',
          query: {
            countryCode: item.code
          }
        })
      },
      selectCounty(item, index) {
        this.curCountryIndex = index
        storage.set(SEARCH_KEYWORDS, item.title)
        this.$router.push({
          path: '/searchResult',
          query: {
            countryCode: item.code
          }
        })
      },
      selectContinent(item, index) {
        this.curContinentIndex = index

        this._filterCurContinentImgs()
        this._filterCurHotCountrys()
        this._filterCurCountryList()
      },
      _filterCurContinentImgs() {
        this.curContinentImgs = this.continentImgs[this.curContinentIndex]
      },
      _filterCurHotCountrys() {
        this.curHotCountrys = this.hotCountrys[this.curContinentIndex]
      },
      _filterCurCountryList() {
        this.curCountryList = this.countryList[this.curContinentIndex]
      },
      _filterList(continentCountry) {
        this.continents = []
        this.continentImgs = []
        this.hotCountrys = []
        this.countryList = []

        continentCountry.forEach((continent) => {
          // 大洲
          let continentObj = {
            title: continent.title,
            code: continent.continentCode
          }
          this.continents.push(continentObj)

          // 大洲主题
          let continentInfoObj = {
            title: continent.title,
            subTitle: continent.subTitle,
            imgUrl: continent.imageUrl,
            code: continent.continentCode
          }
          this.continentImgs.push(continentInfoObj)

          // 热门城市
          let hotCountry = []
          continent.hotList.forEach((country) => {
            let obj = {
              title: country.title,
              subTitle: country.subTitle,
              imgUrl: country.imageUrl,
              code: country.countryCode
            }
            hotCountry.push(obj)
          })
          this.hotCountrys.push(hotCountry)

          // 所有国家
          let countrys = []
          continent.countryList.forEach((country) => {
            let obj = {
              title: country.countryName,
              imgUrl: country.countryImg,
              code: country.countryCode
            }
            countrys.push(obj)
          })
          this.countryList.push(countrys)

        })

        this._filterCurContinentImgs()
        this._filterCurHotCountrys()
        this._filterCurCountryList()
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
      },  
  	},
    components: {
      tips
    }
  }
</script>

<style scoped lang="css" rel="stylesheet/css">
  @import './destination.css';

  .loadImg{
    width: 50px;
    height: 50px;
    display: block;
    margin: 1rem auto;
    z-index: 9999;
    position: fixed;
    margin: 0 auto;
    left: 0;
    right: 0;
    top: 12rem;
  }
  .destination{
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 10;
    width: 100%;
    background: #f5f5f5;
  }
</style>