<template>
  <transition name="">
    <section class="selectDate">
      <div v-title data-title="选择日期"></div>
      <!-- <p>选择日期和人数</p>
      <button @click="back">返回</button>
      <button @click="goEditBookInfo">下一步进入预订信息</button> -->

      <div class="topBar">
        <div class="back" @click="back"><img src="../../assets/images/icon_back@2x.png"></div>
        <h4 class="title">选择出发日期和人数</h4>
      </div>
      <scroll
        class="container"
        ref="selectDate">
        <div>
          <calendar :events="calendarDate.events" :range="calendarDate.range" :lunar="calendarDate.lunar" :value="calendarDate.value" :begin="calendarDate.begin" :end="calendarDate.end" @select="calendarDate.select"></calendar>
          <!-- <span class="gte"></span> -->
          <div class="selectDetails">
            <div class="title">
                <span class="text">选择出行人数</span>
                <span class="toInfo" @click="showExpensesInfo">价格说明</span>
            </div>
            <div class="content">
                <div class="item adult">
                    <div style="display:inline-block;">
                        <span class="label">成人
                            <span class="price">¥<em v-html="selectProduct.adultPrice"></em>/人</span>
                        </span>
                        <div class="takeCount">
                            <span class="reduce handle" :class="{disabled: selectProduct.adultJsDisabled}" @click="reduce(1)">-</span>
                            <!-- <input type="number" :value="selectProduct.adult" @input="inputChangeAdult" disabled> -->
                            <div class="input" type="number" v-html="selectProduct.adult"></div>
                            <span class="add handle" :class="{disabled: selectProduct.adultAddDisabled}" @click="add(1)">+</span>
                        </div>
                    </div>
                </div>
                <div class="item children">
                    <div style="display:inline-block;">
                        <span class="label">儿童
                            <span class="price">¥<em v-html="selectProduct.childrenPrice"></em>/人</span>
                        </span>
                        <div class="takeCount">
                            <span class="reduce handle" :class="{disabled: selectProduct.childrenJsDisabled}" @click="reduce(2)">-</span>
                            <!-- <input type="number" :value="selectProduct.children" @input="inputChangeChildren" disabled> -->
                            <div class="input" type="number" v-html="selectProduct.children"></div>
                            <span class="add handle" :class="{disabled: selectProduct.childrenAddDisabled}" @click="add(2)">+</span>
                        </div>
                    </div>
                </div>
            </div>
          </div>
          <span class="gte"></span>
        </div>
      </scroll>
      <div class="botterWrap boxShow">
        <div class="remarkBox">
          <p style="padding-top: 0.5rem;font-size: 0.6rem;">订单总计: <span class="price" v-html="`¥${selectProduct.countPrice}`"></span></p>
          <p class="right"><img src="../../assets/images/icon_descript@2x.png"><span @click="showPriceInfo">费用说明</span></p>
        </div>
        <div class="btn" @click="goEditBookInfo">下一步</div>
      </div>
      <tips :text="tipsText" :isShowTips="isShowTips"></tips>

      <transition name="fade">
        <div class="mask" v-show="isShowMock"></div>
      </transition>
      <transition name="slide">
        <explain :childrenPrice="childrenPrice"  v-show="isShowExplain" @cancel="cancel"></explain>
      </transition>
      <transition name="slide">
        <cost-explain :priceInfo="priceInfo" v-show="isShowCostExplain" @cancel="cancel"></cost-explain>
      </transition>
    </section>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll.vue'
  import calendar from 'base/calendar/calendar.vue'
  import tips from 'base/tips/tips'
  import explain from 'base/explain/explain'
  import CostExplain from 'base/costExplain/costExplain'
  import {dateFormate} from 'common/js/dateFormate'
  import {mapMutations, mapActions, mapGetters} from 'vuex'
  import storage from 'good-storage'

  const DATALIST = '__dataList__'
  const DATA_PRICE = '__dataPrice__'  //用于展示日历对应价格
  const CLIENT_TYPE = '__clientType__'
  const SELECT_ADULT = '__selectAdult__'
  const SELECT_CHILDREN = '__selectChildren__'
  const CONTACT_INFO = '__contactInfo__'
  const HOME_CHANGEVAL = '__homeChangeVal__'
  const RESERVER = '__reserver__'
  const ORDER_INFO = '__orderInfo__'
  const TRIP_INFO = '__tripInfo__'
  const PRODUCT_INFO = '__productInfo__'  //传过来的产品信息
  const PRICE_INFO = '__priceInfo__'
  const ORDER_COUNT_PRICE = '__orderCountPrice__'

  const num = 0
  const price = 0
  const minPrice = `${price}`

  let dataList = []
  let _this = null

  export default {
    data(){
      return{
        stockNumber: 0,
        isShowLayer: false,
        isShowExpensesInfo: false,
        isShowMock: false,
        isShowExplain: false,
        isShowCostExplain: false,
        isShowTips: false,
        tipsText: '',
        timer: undefined,
        tripInfo: {},
        productInfo: {},
        day: [], //默认日期
        selectDataIndex: null,
        isSelectOk: false,
        calendarDate:{
          range: false,
          value: this._setDateFormate(), //日期 默认的呢 
          lunar: false,  //农历啊
          events: storage.get(DATA_PRICE),
          zero: true,
          select(begin, end) {
            if (begin) {
              _this._judgeSelectItem(begin.join('-'))
              _this.getPrice()
            }
          }
        },
        selectProduct:{
          adult: '1',
          children: '0',
          adultPrice: '0.00',
          childrenPrice: '0.00',
          countPrice: '0',
          adultAddDisabled: false,
          adultJsDisabled: false,
          childrenAddDisabled: false,
          childrenJsDisabled: true
        },
        calendarId: '',
        calendar: '',
        childrenPrice: null,
        priceInfo: {},
        res: 0
      }
    },
    created() {
      // 初始化指针
      _this = this
      if (storage.get(TRIP_INFO)) {
        this.tripInfo = storage.get(TRIP_INFO)
      }
      if (storage.get(PRODUCT_INFO)) {
        this.productInfo = storage.get(PRODUCT_INFO)
      }
    },
    methods: {
      back() {
        this.$router.goBack()
      },
      goEditBookInfo() {

        if(!this.isSelectOk) {
          console.log('请选择有效的出行日期')
          this._showTips('请选择有效的出行日期')
          return
        }

        let adult = Number(this.selectProduct.adult)
        let children = Number(this.selectProduct.children)
        let allProductPorsen = adult + children
        if(allProductPorsen <= 0){
          this._showTips('选择有效的出行人数')
          return
        }else if(adult == 0 && children > 0){
          this._showTips('选择有效的成人出行人数')
          return
        }else if(adult < children){
          this._showTips('儿童出行人数必须等于或小于成人出行人数')
          return
        }

        this.productInfo.calDbid = this.calendarId
        this.productInfo.calDate = this.calendar
        this.productInfo.totalFee = this.selectProduct.countPrice

        console.log('旅行信息：')
        console.log(this.tripInfo)
        this.tripInfo.date = this.calendar
        this.tripInfo.persons = {
          adult: adult,
          children: children,
          adultPrice: this.selectProduct.adultPrice,
          childrenPrice: this.selectProduct.childrenPrice,
          homeChange: '0',
          homeChangePrice: '0'
        }
        this.tripInfo.countPrice = this.selectProduct.countPrice
        this.tripInfo.homeChangePrice = '0'

        storage.set(TRIP_INFO, this.tripInfo)
        storage.set(PRODUCT_INFO, this.productInfo)

        console.log(TRIP_INFO)

        // 清除之前下单用户信息
        this.clearRefreshMust()
        this.$router.push('/editBookInfo')
      },
      clearRefreshMust() {
        // 清除已选择的出行人列表
        if (storage.get(SELECT_ADULT)) {
          console.log('当前有已选择的出行人列表。 清除~：')
          console.log(storage.get(SELECT_ADULT))
          storage.remove(SELECT_ADULT)
        } 

        if (storage.get(SELECT_CHILDREN)) {
          console.log('当前有已选择的出行人列表。 清除~：')
          console.log(storage.get(SELECT_CHILDREN))
          storage.remove(SELECT_CHILDREN)
        } 
        else {
          console.log('当前没有已选择的出行人列表')
        }

        // 清除客户类型
        if (storage.get(CLIENT_TYPE)) {
          console.log('当前客户类型。 清除~：')
          console.log(storage.get(CLIENT_TYPE))
          storage.remove(CLIENT_TYPE)
        } else {
          console.log('当前没有客户类型')
        }

        // 清除联系人信息
        if (storage.get(CONTACT_INFO)) {
          console.log('联系人信息。 清除~：')
          console.log(storage.get(CONTACT_INFO))
          storage.remove(CONTACT_INFO)
        } else {
          console.log('当前没有联系人信息')
        }

        // 清除单房差数量
        if (storage.get(HOME_CHANGEVAL)) {
          console.log('单房差数量。 清除~：')
          console.log(storage.get(HOME_CHANGEVAL))
          storage.remove(HOME_CHANGEVAL)
        } else {
          console.log('当前没有单房差数量')
        }

        // 清除是否预订后填写
        if (storage.get(RESERVER)) {
          console.log('是否预订后填写。 清除~：')
          console.log(storage.get(RESERVER))
          storage.remove(RESERVER)
        } else {
          console.log('当前没有是否预订后填写')
        }

        // 清除订单信息
        if (storage.get(ORDER_INFO)) {
          console.log('已下订单信息。 清除~：')
          console.log(storage.get(ORDER_INFO))
          storage.remove(ORDER_INFO)
        } else {
          console.log('当前没有已下订单信息。')
        }

        // 清除订单总价格 包含单房差
        if (storage.get(ORDER_COUNT_PRICE)) {
          console.log('总价格(包含单房差)。 清除~：')
          console.log(storage.get(ORDER_COUNT_PRICE))
          storage.remove(ORDER_COUNT_PRICE)
        } else {
          console.log('当前没有总价格(包含单房差)。')
        }
      },
      refresh(){
        this.$refs.selectDate.refresh()
      },
      showExpensesInfo() {
        this.isShowMock = !this.isShowMock
        this.isShowExplain = !this.isShowExplain
      },
      showPriceInfo() {
        this.isShowMock = !this.isShowMock
        this.isShowCostExplain = !this.isShowCostExplain

        this.priceInfo = {
          adult: this.selectProduct.adult,
          children: this.selectProduct.children,
          adultPrice: this.selectProduct.adultPrice,
          childrenPrice: this.selectProduct.childrenPrice,
          homeChange: '0',
          homeChangePrice: '0',
          countPrice: this.selectProduct.countPrice
        }
        storage.set(PRICE_INFO, this.priceInfo)
        console.log(this.priceInfo)
      },
      cancel() {
        console.log('cancel')
        this.isShowMock = !this.isShowMock
        this.isShowExplain = false
        this.isShowCostExplain = false
      },
      // 人数减少
      reduce(type) {
        let adult = Number(this.selectProduct.adult)
        let children = Number(this.selectProduct.children)
      
        switch(type) {
          case 1:
            if (!this.selectProduct.adultJsDisabled){
              this.selectProduct.adult = Number(this.selectProduct.adult) - 1;
            }
            break;
          case 2:
            if (!this.selectProduct.childrenJsDisabled){
              this.selectProduct.children = Number(this.selectProduct.children) - 1
            }
            break;
        }
        this.count()
      },
      // 人数增加
      add(type) {
        let adult = Number(this.selectProduct.adult)
        let children = Number(this.selectProduct.children)
        if(adult + children == this.stockNumber){
          this.count()
          return;
        }

        switch(type) {
          case 1:
            if (!this.selectProduct.adultAddDisabled){
              if(adult == 9){
                this.count()
                break;
              }
              this.selectProduct.adult = Number(this.selectProduct.adult) + 1;
            }
            break;
          case 2:
            if (!this.selectProduct.childrenAddDisabled){
              if(children == 9){
                this.count()
                break;
              }
              this.selectProduct.children = Number(this.selectProduct.children) + 1;
            }
            break;
        }
        this.count()
      },
      // 成人文本输入
      inputChangeAdult(val) {
        // let adult = Number(this.selectProduct.adult)
        // let children = Number(this.selectProduct.children)
        // let inputAdult = Number(val.target.value)
        // if(inputAdult + children > 9){
        //   this.selectProduct.adult = adult
        // }else if(inputAdult + children > this.stockNumber){
        //   this.selectProduct.adult = adult
        // }else{
        //   this.selectProduct.adult = inputAdult
        // }
        // this.count()
      },
      // 儿童文本输入
      inputChangeChildren(val) {
        // let adult = Number(this.selectProduct.adult)
        // let children = Number(this.selectProduct.children)
        // let inputChildren = Number(val.target.value)
        // if(adult + inputChildren > 9){
        //   this.selectProduct.children = children
        // }else if(adult + inputChildren > this.stockNumber){
        //   this.selectProduct.children = children
        // }else{
        //   this.selectProduct.children = inputChildren
        // }
        // this.count()
      },
      _initSelect(){
        if(this.stockNumber == 0){
          this.selectProduct.adult=0
          this.selectProduct.children=0
          this.selectProduct.adultPrice=0.00
          this.selectProduct.childrenPrice=0.00
          this.selectProduct.adultAddDisabled=true
          this.selectProduct.adultJsDisabled=true
          this.selectProduct.childrenAddDisabled=true
          this.selectProduct.childrenJsDisabled=true
        }else if(this.stockNumber == 1){
          this.selectProduct.adult=1
          this.selectProduct.children=0
          this.selectProduct.adultPrice=this.adultPrice
          this.selectProduct.childrenPrice=this.childrenPrice
          this.selectProduct.adultAddDisabled=true
          this.selectProduct.adultJsDisabled=false
          this.selectProduct.childrenAddDisabled=true
          this.selectProduct.childrenJsDisabled=true
        }else{
          this.selectProduct.adult=1
          this.selectProduct.children=0
          this.selectProduct.adultPrice=this.adultPrice
          this.selectProduct.childrenPrice=this.childrenPrice
          this.selectProduct.adultAddDisabled=false
          this.selectProduct.adultJsDisabled=false
          this.selectProduct.childrenAddDisabled=false
          this.selectProduct.childrenJsDisabled=true
        }
        this.count()
      },
      count() {
        let stockNumber = Number(this.stockNumber)
        let adult = Number(this.selectProduct.adult)
        let children = Number(this.selectProduct.children)
        let adultPrice = Number(this.selectProduct.adultPrice)
        let childrenPrice = Number(this.selectProduct.childrenPrice)
        
        this.selectProduct.adultAddDisabled = false
        this.selectProduct.adultJsDisabled = false
        this.selectProduct.childrenAddDisabled = false
        this.selectProduct.childrenJsDisabled = false
        if(stockNumber == 0){
          adult = 0
          children = 0
          this.selectProduct.adult = 0
          this.selectProduct.children = 0
          this.selectProduct.adultAddDisabled = true
          this.selectProduct.adultJsDisabled = true
          this.selectProduct.childrenAddDisabled = true
          this.selectProduct.childrenJsDisabled = true
        }else{
          if(adult == 0){
            this.selectProduct.adultJsDisabled = true
          }
          if(children == 0){
            this.selectProduct.childrenJsDisabled = true
          }

          if(Number(this.childrenPrice) <= 0){
            this.selectProduct.childrenAddDisabled=true
            this.selectProduct.childrenJsDisabled=true
          }
          
          if(adult == 9){
            this.selectProduct.adultAddDisabled = true
          } 
          if(children == 9){
            this.selectProduct.childrenAddDisabled = true
          } 
          
          if(adult + children == stockNumber){
            this.selectProduct.adultAddDisabled = true
            this.selectProduct.childrenAddDisabled = true
          }
        }

        // 计算总价
        let adultCountPrice = adultPrice * 100 * adult
        let childrenCountPrice = childrenPrice * 100 * children
        let countPrice = (adultCountPrice + childrenCountPrice).toFixed(2) / 100
        this.selectProduct.countPrice = countPrice
      },
      getPrice() {
        this.stockNumber = 0
        if(this.isSelectOk) {
          let index = this.selectDataIndex
          let adultPrice = dataList[index].pricy.adultPrice
          let childrenPrice = dataList[index].pricy.childrenPrice
          this.stockNumber = dataList[index].stockNumber
          this.calendarId = dataList[index].id
          this.calendar = dataList[index].text

          this.adultPrice = adultPrice
          this.childrenPrice = childrenPrice
        }
        this._initSelect()
      },
      _judgeSelectItem(str) {
        let _this = this
        console.log(str)
        str = str.split('-')
        let newStr = []
        str.forEach((item) => {
          if (Number(item) < 10) {
            item = '0' + item
          }
          newStr.push(item)
        })
        newStr = newStr.join('-')
        // console.log(newStr)
        console.log(this.isSelectOk)
        for (var i = 0; i < dataList.length; i++) {
          console.log(dataList[i].text)
          if (dataList[i].text == newStr) {
            // console.log('ok:' + index)
            _this.isSelectOk = true
            _this.selectDataIndex = i
            // console.log(_this.selectDataIndex)
            console.log(_this.isSelectOk)
            return
          } else if(dataList[i].text !== newStr) {
            _this.isSelectOk = false
            this.stockNumber = 0 
            console.log(_this.isSelectOk)
          }
        }

      },
      _setDateFormate() {
        let ret = []
        dataList = storage.get(DATALIST)
        if(dataList.length > 0){
          let dateArr = dataList[0].text.split(',').join('-').split('-')
          dateArr.forEach((item) => {
            ret.push(Number(item))
          })
        }else{
          let dateArr = dateFormate().split(' ')[0].split('-')
          dateArr.forEach((item) => {
            this.day.push(Number(item))
          })
        }
        return ret
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
      ...mapMutations({
        
      }),
      ...mapActions([
        
      ])
    },
    mounted(){
      this.count()
      this.calendarDate.select();

      this.stockNumber = 0
      if(dataList.length > 0){
        this.isSelectOk = true
        this.stockNumber = dataList[0].stockNumber
        this.adultPrice = dataList[0].pricy.adultPrice
        this.childrenPrice = dataList[0].pricy.childrenPrice
        this.calendarId = dataList[0].id
        this.calendar = dataList[0].text
      }
      this._initSelect()
    },

    components: {
      Scroll,
      calendar,
      tips,
      explain,
      CostExplain
    }
  }
</script>

<style scoped lang="css" rel="stylesheet/css">
  @import './selectDate.css';
  .selectDate{
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 10;
    width: 100%;
    background: #f5f5f5;
  }
  .mask{
    position: absolute;
    bottom: 0;
    width: 100%;
    background: rgba(0,0,0,.2);
    top: 0;
    z-index: 200;
  }
  .mask {
    transition: all .3s cubic-bezier(.55,0,.1,1);
  }
  .mask.fade-enter, .mask.fade-leave-active{
    opacity: 0;
  }
  .explain {
    transition: all .3s cubic-bezier(.55,0,.1,1);
  }
  .explain.slide-enter, .explain.slide-leave-active{
    transform: translate3d(0, -100%, 0);
  }
  .explain.slide-leave-active, .explain.slide-enter{
    transform: translate3d(0, 100%, 0);
  }
</style>