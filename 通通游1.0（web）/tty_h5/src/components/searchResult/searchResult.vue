<template>
  <transition name="slide">
    <section class="searchResult">
      <div v-title data-title="搜索结果"></div>
    	<!-- <p>我是搜索结果页，这里有产品列表</p>
      搜索关键词： {{searchKeywords}}
      <button @click="back">返回</button>
      <button @click="toProductDetail">点击跳转产品详情</button> -->
      
      <div class="topSea">
        <span class="leftjt" @click="back">
          <img src="../../assets/images/icon_back@2x.png" >
        </span>
        <div class="searchD">
          <span class="littlefdj">
            <img src="../../assets/images/icon_search.png" >
          </span>
          <input class="searchInput" v-model="searchKeywords" type="text" placeholder="目的地/关键词">
        </div>
        <span class="clickSea" @click.stop.prevent="searchEnv">搜索</span>
      </div>
      
      <div class="searchList" v-show="isSearch">
        <span class="mdd" @click="getCountryListEnv">
          <span class="c1" v-html="query.textForPlace"></span>
          <!-- <span class="c1" style="color:#008ee5">目的地</span> -->
          <span class="c2" v-show="isShowCounty">
            <img src="../../assets/images/unfold-拷贝-3@2x.png" >
          </span>
          <span class="c2" v-show="!isShowCounty">
            <img src="../../assets/images/unfold@2x.png" >
          </span>
        </span> 
        <span class="mdd" @click="tripTimeEnv">
          <span class="c1">行程时间</span>
          <!-- <span class="c1" style="color:#008ee5" v-show="xc2">行程时间</span> -->
          <span class="c2" v-show="isShowTripTime">
            <img src="../../assets/images/unfold-拷贝-3@2x.png" >
          </span> 
          <span class="c2" v-show="!isShowTripTime">
            <img src="../../assets/images/unfold@2x.png" >
          </span> 
        </span>
        <span class="mdd" @click="orderbyEnv">
          <span class="c1">默认排序</span>
          <!-- <span class="c1" style="color:#008ee5" v-show="px2">默认排序</span> -->
           <span class="c2" v-show="isShowOrderBy">
            <img src="../../assets/images/unfold-拷贝-3@2x.png" >
          </span> 
          <span class="c2" v-show="!isShowOrderBy">
            <img src="../../assets/images/unfold@2x.png" >
          </span> 
        </span>
        <span class="mdd" @click="filterEnv">
          <span class="c1">筛选</span>
          <!-- <span class="c1"style="color:#008ee5" v-show="sx2">筛选</span> -->
          <span class="c2" style="left:2.3rem" v-show="isShowFilter">
            <img src="../../assets/images/unfold-拷贝-3@2x.png" >
          </span>
          <span class="c2" style="left:2.3rem" v-show="!isShowFilter">
            <img src="../../assets/images/unfold@2x.png" >
          </span> 
        </span>
      </div>
      <!-- 目的地 国家选择  -->
      <transition name="showAni">
        <div class="mddSel ani" v-show="isShowCounty">
          <!--一级  -->
          <scroll class="firSel" ref="firSel">
            <ul v-show="countrys.length">
              <li v-for="(country, index) in countrys" @click="selectCountry(country, index)" :class="{'isSelect': curCountyIndex == index}" v-html="country.title">
              </li>
            </ul>
          </scroll>
          <!--二级  -->
          <scroll class="secSel" ref="secSel">
            <ul v-show="citys.length">
              <li v-for="(city, index) in citys" @click="selectCity(city, index)" :class="{'isSelect': curCityIndex == index && curCityIndex != 0}" >
              <img :src="city.imgUrl" class="cityImg" alt="">
              <span v-html="city.title"></span>
              </li>
            </ul>
          </scroll>
        </div>
      </transition>
      <!--行程时间  -->
      <transition name="showAni">
        <div class="traveltime ani" v-show="isShowTripTime"> 
          <div class="sliderWrap">
            <div class="trati" v-html="`行程天数 ${sliderValue} 天`"></div>
            <range-slider
              class="slider"
              min="1"
              max="90"
              step="1"
              v-model="sliderValue">
            </range-slider>

            <div class="yushe">
              <span class="yushe1">1天</span>
              <span class="yushe2">90天</span>
            </div>
          </div>
          <div class="dateWrap">
            <div class="alltime">出发时间</div>
            <div class="alltimepick">
               <div v-for="(item, index) in month" @click="selectTripTime(item, index)" :class="{'ac': curTriptimeIndex == index}" v-html="item.mon">
              </div>
            </div>
          </div>
          <div class="reOrMake">
            <div class="reset" @click="reset">重置</div>
            <div class="sure" @click="tripTimeSearch">确定</div>
          </div>
        </div>
      </transition>
      <!--排序  -->
      <transition name="showAni">
        <div class="paixu ani" v-show="isShowOrderBy">
          <div v-for="(item, index) in paixu" @click="orderby(item, index)" :class="{'kk': curOrderbyIndex == index}" v-html="item.list">
          </div>
        </div>
      </transition>
      <!--筛选  -->
      <transition name="showAni">
        <scroll class="shaixuanWrap ani" v-show="isShowFilter">
          <div class="shaixuan">
            <span class="sxlist1" style="position:relative" :class="{kkkpt:shensuo1}">
              <span @click="moreCity">
                出发城市
                <span class="spim1" v-if="spim1" >
                  <img src="../../assets/images/unfold-拷贝-3@2x.png" style="width:100%;height:100%">
                </span>
                <span class="spim2" v-if="spim2" >
                  <img src="../../assets/images/unfold@2x.png" style="width:100%;height:100%">
                </span>
              </span>
              <div v-show="departCityList.length" v-for="(item, index) in departCityList" @click="selectHotCity(item, index)" :class="{'ac': curDepartIndex == index}" v-html="item.value">
              </div> 
            </span>
            <span class="sxlist2" style="position:relative" :class="{kkkpt:shensuo2}">
              <span @click="moreProduct">
                产品特色
                <span class="spim3" v-if="spim11" >
                  <img src="../../assets/images/unfold-拷贝-3@2x.png" style="width:100%;height:100%">
                </span>
                <span class="spim4" v-if="spim22" >
                  <img src="../../assets/images/unfold@2x.png" style="width:100%;height:100%">
                </span>
              </span>
              <div v-show="productThemeList" v-for="(item, index) in productThemeList" @click="selectThemeProduct(item, index)" :class="{'ac': curThemeIndex == index}" v-html="item.value">
              </div> 
            </span>
            <div class="gongying">
              <div>供应商</div>
              <span class="kaisa" :class="{'active': curDistIndex == index}" @click="selectDist(item, index)" v-for="(item, index) in distList" v-html="item.value"></span>
            </div>
            <div class="reOrMake">
              <div class="reset" @click="resetFilter">重置</div>
              <div class="sure" @click="getFilterProductList">确定</div>
            </div> 
          </div>
        </scroll>
      </transition>
      <!-- 产品列表 -->
      <!-- <loading v-show="isLoading" ></loading> -->
      <scroll class="productList" 
        :pullup="pullup"
        :beforeScroll="beforeScroll"
        @beforeScroll="listScroll"
        @scrollToEnd="loadMore">
        <div>
          <router-link class="project" v-for="pro in productList" key="pro" :to='{path: "/productDetails", query:{productId: pro.productId, saleId: saleId}}'>
            <div class="mainPro">
              <div class="imgWrap imgCenter">
                 <img :src="pro.imgUrl"> 
                <span class="supplier" v-html="pro.supName"></span>
              </div>
              <span class="mptitle line-02" v-html="pro.title"></span>
              <span class="goTime" v-html="`最近出发${pro.calDate}`"></span>
              <span class="pay" v-html="`¥${pro.lowestAdultPrice}起`"></span>
            </div>
          </router-link>
          <p v-show="isShowMoreLoading"><img width="24" height="24" src="../../assets/images/loading.gif" class="loadImg"></p>
          <p class="noMore" v-show="noMore">没有更多</p>
          <p class="noMore" v-show="noProductList">暂无旅游产品信息</p>
        </div>
      </scroll>
      <div class="advert" @click="goDistAdvert">赚</div>

      <transition name="fade">
        <div class="mask" v-show="isShowMock"></div>
      </transition>
      <tips :text="tipsText" :isShowTips="isShowTips"></tips>
    </section>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Loading from 'base/loading/loading'
  import RangeSlider from 'vue-range-slider'
  import 'vue-range-slider/dist/vue-range-slider.css'
  import tips from 'base/tips/tips'
  import Scroll from 'base/scroll/scroll'
  import storage from 'good-storage'
  import {getProductListForSearch, selectOption} from 'api'
  import qs from 'qs'
  import { mapMutations, mapActions, mapGetters } from 'vuex'

  const SEARCH_KEYWORDS = '__searchKeywords__'
  const SEARCH_STATE = '__searchState__'
  const IDS = '__IDS__'
  const TO_PLACE_CONTINENT_CODE = '__toPlaceCode__'

  const ERR_OK = '1'
  const SALE_ID = '__saleId__'
  const defaultImg = require('../../assets/images/banner_default.png')

  // 翻页
  let page = 1
  const rows = 20

  export default {
  	data() {
  		return {
        noMore: false,
        noProductList: false,
        isShowMoreLoading: false,
        hasMore: true,
        pullup: true,
        beforeScroll: true,
        sliderValue: 1,
        isShowMock: false,
        isShowTips: false,
        tipsText: '',
        timer: undefined,
        isSearch: true,
        isLoading: false,
        selectType: '',
        isShowCounty: false,
        isShowTripTime: false,
        isShowOrderBy: false,
        isShowFilter: false,
        curCountyIndex: null,
        curCityIndex: null,
        curTriptimeIndex: null,
        curOrderbyIndex: null,
        curDepartIndex: null,
        curThemeIndex: null,
        curDistIndex: null,
        newCountryList: [],
        CityObjArr: [],
        query: {
          textForPlace: '目的地',  //标题
          codeForContinentPlace: '',  //大洲code
          codeForCityPlace: '', //国家code
          travelDaysMax: '',
          travelDaysMin: '1',
          travelMonth: '', //月份 2017-12
          orderby: '', //1升序  2降序
          departPlaceCode: '', //出发城市
        },
        countrys: [],  
        citys: [],
        month:[
          {mon:'1月', code: '01'}, {mon:'2月', code: '02'}, {mon:'3月', code: '03'},
          {mon:'4月', code: '04'}, {mon:'5月', code: '05'}, {mon:'6月', code: '06'},
          {mon:'7月', code: '07'}, {mon:'8月', code: '08'}, {mon:'9月', code: '09'},
          {mon:'10月', code: '10'}, {mon:'11月', code: '11'}, {mon:'12月', code: '12'}, 
        ],
        paixu:[
          {list:'默认排序', code: '0'},
          {list:'价格从低到高', code: '1'},
          {list:'价格从高到底', code: '-1'},
        ],
        departCityList:[],
        productThemeList:[],
        distList: [],
        productList: [],
        //出发城市伸缩按钮  
        spim1 :false,
        spim11 :false,
        spim2 :true,
        spim22 :true,
        //出发城市 是否伸缩    
        shensuo1:true,
        //产品特色 是否伸缩
        shensuo2:true,
        productParams: {
          distId: '',
          platId: '',
          saleId: '',
          productId: ''
        },
        saleId: ''
      }
  	},
    created() {
      // 初始化页码 
      page = 1

      // 清除
      storage.set(TO_PLACE_CONTINENT_CODE, '')

      this.searchKeywords = storage.get(SEARCH_KEYWORDS, '')
      console.log('搜索关键词：')
      console.log(this.searchKeywords)

      this.saleId = storage.get(SALE_ID)

      this.query.codeForContinentPlace = this.$route.query.continentCode
      this.query.codeForCityPlace = this.$route.query.countryCode

      this._search()

    },
    watch: {
      sliderValue() {
        this.query.travelDaysMax = this.sliderValue
        console.log(this.query.travelDaysMax)
      },
      isShowTripTime(val) {
        val ? this.isShowMock = true : this.isShowMock = false
      },
      isShowOrderBy(val) {
        val ? this.isShowMock = true : this.isShowMock = false
      },
      isShowFilter(val) {
        val ? this.isShowMock = true : this.isShowMock = false
      },
      isShowCounty(val) {
        val ? this.isShowMock = true : this.isShowMock = false
      }
    },
  	methods: {
      loadMore() {
        if (!this.hasMore) {
          return
        }
        page++
        this._search()
      },
      listScroll() {
        console.log('beforeScroll')
      },
  		back() {
        this.$router.back()
      },
      mousedown() {
        console.log('down')
      },
      goDistAdvert() {
        this.$router.push('/distAdvert');
      },
      toProductDetail() {
        // this.$router.push('/productDetail')
      },
      // 点击搜索
      searchEnv() {
        page = 1
        this.productList = [];
        console.log('搜索内容：')
        console.log(this.searchKeywords)
        // if (this.searchKeywords == '') {
        //   // this.isSearch = false
        //   this._showTips('请输入关键词')
        //   return
        // }
        this.searchKeywords = this.searchKeywords
        storage.set(SEARCH_KEYWORDS, this.searchKeywords)

        if (this.searchKeywords != '') {
          this.saveSearchHistory(this.searchKeywords)
        }
        // 先清除关键词
        // this.searchKeywords = ''
        this._search()
      },
      getCountryListEnv() {
        this.isShowTripTime = false
        this.isShowOrderBy = false
        this.isShowFilter = false
        
        setTimeout(() => {
          this.isShowCounty = !this.isShowCounty
        }, 260)

        let params = qs.stringify({
          saleId: this.saleId
        })

        // 获取各州
        this._getCountryList(params)
      },
      tripTimeEnv() {
        this.isShowCounty = false
        this.isShowOrderBy = false
        this.isShowFilter = false

        setTimeout(() => {
          this.isShowTripTime = !this.isShowTripTime
        }, 260)
        
      },
      orderbyEnv() {
        this.isShowCounty = false
        this.isShowTripTime = false
        this.isShowFilter = false

        setTimeout(() => {
          this.isShowOrderBy = !this.isShowOrderBy
        }, 260)
        
      },
      filterEnv() {
        this.isShowCounty = false
        this.isShowTripTime = false
        this.isShowOrderBy = false

        setTimeout(() => {
          this.isShowFilter = !this.isShowFilter
        }, 260)

        let params = qs.stringify({
          saleId: this.saleId
        })

        // 获取帅选项
        this._getFilterItem(params)
      },
      // 目的地
      selectCountry(country, index) {
        this.curCountyIndex = index
        this.citys = this.CityObjArr[index]
        this.query.codeForContinentPlace = country.code
      },
      selectCity(city, index) {
        page = 1
        this.productList = [];
        this.curCityIndex = index
        this.isShowCounty = !this.isShowCounty
        this.query.textForPlace = this._filterText(city.title)
        this.query.codeForCityPlace = city.code

        this._search()
      },
      _filterText(text) {
        let str = '...'
        let newStr = ''
        if (text.length > 3) {
          newStr = text.slice(0, 3) + str
        } else {
          newStr = text
        }
        return newStr
      },
      // 选择出行天数
      selectTripTime(item, index) {
        this.curTriptimeIndex = index
        let year = this._getYear()
        let month = item.code
        this.query.travelMonth = `${year}-${month}`
        console.log(this.query.travelMonth)
      },
      changeSliderVal(env) {
        console.log(this.sliderValue)
        this.query.travelDaysMax = this.sliderValue
        console.log(this.query.travelDaysMax)
      },
      tripTimeSearch() {
        page = 1
        this.productList = [];
        this.isShowTripTime = !this.isShowTripTime

        this._search()
      },
      reset() {
        this.sliderValue = 1
        this.curTriptimeIndex = -1
        this.query.travelMonth = ''
      },
      // 排序
      orderby(item, index) {
        page = 1
        this.productList = [];

        this.curOrderbyIndex = index
        if (item.code == '0') {
          this.query.orderby = ''
        } else {
          this.query.orderby = item.code
        }
        this.isShowOrderBy = !this.isShowOrderBy

        this._search()
      },
      // 筛选 出发城市
      selectHotCity(item, index) {
        this.curDepartIndex = index
        this.query.departPlaceCode = item.name
      },
      // 筛选 产品特色
      selectThemeProduct(item, index) {
        this.curThemeIndex = index
        this.query.themeCode = item.name
      },
      // 选择供应商
      selectDist(item, index) {
        this.curDistIndex = index
        this.query.supId = item.name
      },
      moreCity() {
        this.spim1 =! this.spim1
        this.spim2 =! this.spim2
        this.shensuo1 =! this.shensuo1
      },
      moreProduct() {
        this.spim11 =! this.spim11
        this.spim22 =! this.spim22
        this.spim4 =! this.spim4
        this.shensuo2 =! this.shensuo2
      },
      // 筛选 重置按钮
      resetFilter() {
        this.departPlaceCode = ''
        this.themeCode = ''
        this.supId = ''

        this.curDistIndex = null
        this.curThemeIndex = null
        this.curDepartIndex = null

        // 清楚关键词
        // this.query.themeCode = null
        // this.productList = [];
        // this.searchKeywords = ''

        storage.set(TO_PLACE_CONTINENT_CODE, '')
        this.searchKeywords = storage.get(SEARCH_KEYWORDS, '')
        // 清除目的地
        this.query.departPlaceCode = ''
        this.query.themeCode = ''
        this.query.supId = ''
      },
      getFilterProductList() {
        page = 1
        this.productList = [];
        this.isShowFilter = !this.isShowFilter

        this._search()
      },
      _checkMore(data) {
        if (!data.length || page >= Number(data.total)/rows) {
          this.hasMore = false
        }
      },
      _search() {
        let params = qs.stringify({
          saleId: this.saleId,
          keyword: this.searchKeywords,
          departPlaceCode: this.query.departPlaceCode, //出发地
          toPlaceContinentCode: this.query.codeForContinentPlace,
          toPlaceCountryCode: this.query.codeForCityPlace,
          travelDaysMax: this.query.travelDaysMax,
          travelDaysMin: this.query.travelDaysMin,
          travelMonth: this.query.travelMonth,  // 格式 2017-12
          themeCode: this.query.themeCode,
          supId: this.query.supId,
          orderby: this.query.orderby,
          page: page,
          rows: rows
        })

        this.isShowMoreLoading = true
        getProductListForSearch(params).then((res) => {
          this.isShowMoreLoading = false
          console.log(res)
          if (res.code != ERR_OK) {
            this._showTips(res.msg)
            return
          }

          this.noMore = false
          this.noProductList = false
          let productList = res.productList
          if(productList.length > 0){
            productList.forEach((item) => {
              if (item.imgUrl == '' || !item.imgUrl) {
                item.imgUrl = defaultImg
              }
            })

            this.productList = this.productList.concat(this._genResult(productList))
            this._checkMore(res.productList)
          } else {
            if(this.productList.length == 0){
              this.noProductList = true
            }else{
              this.noMore = true
            }
          }
        })
        
      },
      _genResult(data) {
        let ret = []
        ret = ret.concat(data)
        return ret
      },
      _selectOption(params) {
        selectOption(params).then((res) => {
          console.log(res)
          if (res.code != ERR_OK) {
            this._showTips(res.msg)
            return
          }
        })
      },
      _getCountryList(params) {
        selectOption(params).then((res) => {
          console.log(res)
          if (res.code != ERR_OK) {
            this._showTips(res.msg)
            return
          }
          let getCountryList = res.destination;
          this.newCountryList = []
          this.CityObjArr = []
          let getCityList = []

          let optionAllObj = {
            title: '不限',
            code: '',
            isSelect: true
          }
          let optionAllCity = [{
            title: '不限',
            code: '',
            isSelect: true
          }]

          getCountryList.forEach((country) => {
            let CountryObj = {
              title: country.continentName,
              code: country.continentCode,
              isSelect: false
            }

            let CityObj = {}
            getCityList = []
            if (country.countryList.length) {
              country.countryList.forEach((city) => {
                CityObj = {
                  title: city.countryName,
                  code: city.countryCode,
                  imgUrl: city.countryImg
                }
                getCityList.push(CityObj)
              })
            } else {
              getCityList.push({})
            }
            getCityList.unshift(optionAllObj)

            this.newCountryList.push(CountryObj)
            this.CityObjArr.push(getCityList)
          })

          this.newCountryList.unshift(optionAllObj)
          this.CityObjArr.unshift(optionAllCity)

          console.log('获取的大洲：')
          console.log(this.newCountryList)

          console.log('获取的国家组：')
          console.log(this.CityObjArr)

          this.countrys = this.newCountryList
          this.citys = this.CityObjArr[0]

          this.$nextTick(() => {
            this.$refs.firSel.refresh()
            this.$refs.secSel.refresh()
          })
        })
      },
      _getFilterItem(params) {
        selectOption(params).then((res) => {
          console.log(res)
          if (res.code != ERR_OK) {
            this._showTips(res.msg)
            return
          }
          this.departCityList = res.hotCity
          this.productThemeList = res.theme
          this.distList = res.supplier
        })
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
      _getYear() {
        return new Date().getFullYear()
      },
      ...mapActions([
        'saveSearchHistory',
      ])
  	},
    mounted() {
    },
    components: {
      Scroll,
      tips,
      Loading,
      RangeSlider
    }
  }
</script>

<style scoped lang="css" rel="stylesheet/css">
  @import './searchResult.css';
  .loadImg{
    width: 50px;
    height: 50px;
    display: block;
    margin: 1rem auto;
  }
  .noMore{
    text-align: center;
    font-size: 0.6rem;
    margin: 1rem auto;
    color: #666;
  }
  .ani {
    transition: all .3s cubic-bezier(.55,0,.1,1);
  }
  .ani.showAni-enter, .ani.showAni-leave-active{
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  .ani.showAni-leave-active, .ani.showAni-enter{
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }
  .mask {
    transition: all .3s cubic-bezier(.55,0,.1,1);
  }
  .mask.fade-enter, .mask.fade-leave-active{
    opacity: 0;
  }
</style>