<template>
  <section class="productDetail">
    <div :title="documentTitle"></div>
    <!-- 替换内容 -->
    <!-- <p>产品详情</p>
    <button @click="goBookInfo">进入预订须知</button>
    <button @click="goCancelPolicy">取消政策</button>
    <button @click="goSelectDate">下一步进入选择日期</button> -->
    <!--  -->
    <p v-show="isLoading"><img width="24" height="24" src="../../assets/images/loading.gif" class="loadImg"></p>
    <scroll class="container" @scroll="scroll" :probe-type="probeType" :listen-scroll="listenScroll" ref="container">
      <div>
        <div class="swiper-wrapper">
          <swiper :options="swiperOption" class="swiper-box">
            <swiper-slide class="swiper-item" v-for="goodImg in detail.image" key="goodImg">
              <img :src="goodImg.imgUrl">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
          <div class="untilWrap">
            <div class="item share" @click="showShareMask">
              <img src="../../assets/images/icon_share.png" style="height: 1rem;">
            </div>
            <!-- <a href='tel:110' class="item phone">
              <img src="../../assets/images/icon_phone.png">
            </a> -->
          </div>
        </div>
        <!--产品名称  -->
        <div class="proName">{{detail.title}}</div> 
        <!--供应商  -->
        <div class="supp" v-show="detail.supName != ''">
          <div class="supNa">{{detail.supName}}</div>
        </div> 
        <!--价格  -->
        <div class="pri">
           <!--暂用价格 后面换字段  -->
          <!-- <div class="price">￥{{detail.calendar[0].price[0].salePrice}}</div> -->
          <div class="price">￥{{price}}</div>
          <span class="price1">起</span>
          <span class="priceSub" @click="showExplainInfo">
            <img src="../../assets/images/icon_descript@2x.png">
          </span>
        </div> 
        <!--装饰线  -->
        <span class="gte"></span>
        <div class="goind">
          <span class="goind_img">
            <img src="../../assets/images/旗帜@2x.png" >
          </span>
          <span class="goind_goin">出发城市</span>
          <span class="goind_place" v-html="detail.departPlace"></span>
        </div> 
        <!--出发时间  -->
        <div class="gotime">
          <div class="gotimeBox">
            <div class="gotimediv" v-if="detail.calendars.length" v-for="item in detail.calendars">
              <span class="gotimedate">{{getFormatData(item.departDate)}}</span>
              <span class="gotimepay" v-for="per in item.price" v-show="per.priceType == '1'" v-html="per.salePrice"></span>
            </div>
          </div>
          <div class="line"><span></span></div>
          <div class="getMore" @click="showSelectdate">
            <span class="gtd_img">
              <img src="../../assets/images/日期@2x.png">
            </span>
            <span class="gtd_more">
              更多日期
            </span>
          </div>
        </div>
        <span class="gte"></span>
        <div class="controltip" ref="controltip">
          <div class="item" v-for="(tab, index) in tabs" @click="selectTab(tab, index)"
            :class="{'active': isActiveIndex == index}">
            <span v-html="tab.text"></span>
          </div>
        </div>
        <span class="gte"></span>
        <div class="maidian">产品卖点</div>
        <!-- <p class="localmain" v-html="detail.localmain == '' ? '无' : filterText(detail.localmain)"></p> -->
        <p class="localmain" v-for="data in paystyle" v-html="data == '' ? '无' : filterText(data)"></p>
        <span class="gte"></span>
        <div class="perDayDetailWrap" ref="perDayDetailWrap">
          <h4 class="title" ref="detailstitle"><span class="tag"></span>路线详情</h4>
          <div class="content"></div>
        </div>
        <span class="gte"></span>
        <!-- 行程详情 -->
        <div class="perDayDetailWrap">
          <div v-for="(item, index) in detail.schedule" v-show="index < detailMaxShowNum">
            <div class="perDayDetailBox">
              <div>
                <div class="title">
                  <span class="h5">D{{item.scheduleNo}}</span>
                  <span v-for="(trafficx, index) in item.traffic">
                    <span v-show="index==0">{{trafficx.departure}}</span>
                    <span v-show="trafficx.destination != null">
                        <img v-show="trafficx.trafficTypeId == 1" src="../../assets/images/icon_plan@2x.png">
                        <img v-show="trafficx.trafficTypeId == 2" src="../../assets/images/icon_train.png">
                        <img v-show="trafficx.trafficTypeId == 3" src="../../assets/images/icon_transit@2x.png">
                        <img v-show="trafficx.trafficTypeId == 4" src="../../assets/images/icon_cruise.png">
                        {{trafficx.destination}}
                    </span>
                  </span>
                </div>
              </div>
              <div>
                <div class="details">
                  <div class="item">
                    <div class="content"></div>
                  </div>
                  <div class="item">
                    <div class="label">
                      <img src="../../assets/images/icon_plan@2x.png">
                      <span>交通</span>
                    </div>
                    <div class="content">
                      <p v-if="item.traffic.length" v-for="type in item.traffic" v-html="type.trafficType"></p>
                      <p v-if="!item.traffic.length">暂无</p>
                    </div>
                  </div>
                  <div class="item">
                    <div class="label">
                      <img src="../../assets/images/icon_food@2x.png">
                      <span>餐食</span>
                    </div>
                    <div class="content">
                      <p class="list"><span>早餐：<span v-html="item.breakfast == '1' ? '含' : '自理'"></span></span></p>
                      <p class="list"><span>午餐：<span v-html="item.lunch == '1' ? '含' : '自理'"></span></span></p>
                      <p class="list"><span>晚餐：<span v-html="item.dinner == '1' ? '含' : '自理'"></span></span></p>
                    </div>
                  </div>
                  <div class="item">
                    <div class="label">
                      <img src="../../assets/images/icon_stay@2x.png">
                      <span>住宿</span>
                    </div>
                    <div class="content">
                      <div v-if="item.hotel.length" v-for="hotel in item.hotel">
                        <span v-html="hotel.name"></span>
                        <span v-html="hotel.star"></span>
                      </div>
                      <div v-if="!item.hotel.length">暂无</div>
                    </div>
                  </div>
                  <div class="item">
                    <div class="label">
                      <img src="../../assets/images/icon_shopping@2x.png">
                      <span>购物店</span>
                    </div>
                    <div class="content">
                      <div v-if="item.shopping.length" v-for="shop in item.shopping">
                        <p class="name" v-html="shop.name"></p>
                        <p class="list"><span>购物店介绍：</span><span v-html="shop.information"></span></p>
                        <p class="list"><span>主营产品：</span><span v-html="shop.product"></span></p>
                        <p class="list"><span>营业时间：</span><span v-html="shop.startTime"></span></p>
                        <p class="list"><span>停留时间：</span><span v-html="shop.business"></span></p>
                      </div>
                      <div v-if="!item.shopping.length">暂无</div>
                    </div>
                  </div>
                  <div class="item">
                    <div class="label">
                        <img src="../../assets/images/icon_scene@2x.png">
                        <span>景点</span>
                    </div>
                    <div class="content">
                        <div v-if="item.scenic.length" v-for="scenic in item.scenic">
                            <p class="name" v-html="scenic.name"></p>
                            <p v-html="scenic.content"></p>
                        </div>
                        <div v-if="!item.scenic.length">暂无</div>
                    </div>
                  </div>
                  <div class="item">
                    <div class="label">
                      <img src="../../assets/images/icon_trip@2x.png">
                      <span>行程</span>
                    </div>
                    <div class="content">
                      <p v-show="item.content != ''" v-html="item.content"></p>
                      <p v-show="item.content == ''">暂无</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="displayAll" v-if="detail.schedule && detail.schedule.length > 3">
            <div class="includeBtn" v-html="toggleShowAllText" @click="toggleShowAll" style="padding: 0.2rem 0 !important;"></div>
          </div>
        </div>

        <span class="gte"></span>
        <!-- 附注 -->
        <div class="dripRemark">
          <h4 class="title">行程附注</h4>
          <p class="content">以上行程仅供参考，不同出发日期，产品行程略有不同请最终合同版行程为准。</p>
        </div>
        <span class="gte"></span>
        <!-- 签证信息 -->
        <div class="visaInfo" ref="visaInfo">
          <h4 class="title"><span class="tag"></span>签证信息</h4>
          <div class="content">
            <p>签证国家: <span v-html="detail.country"></span></p>
            <p>签证类型: <span v-html="detail.signType"></span></p>
            <p>主领区: <span v-html="detail.district"></span></p>
            <p>送签地: <span v-html="detail.sendSign"></span></p>
          </div>
        </div>
        <span class="gte"></span>
        <!-- 费用说明 -->
        <div class="costExplain" ref="costExplain">
          <h4 class="title"><span class="tag"></span>费用说明</h4>
          <div class="content">
            <p v-html="shortCostExplainDesc"></p>
            <div class="displayAll" v-show="allCostExplainDesc.length > costExplainShowLength">
              <div class="includeBtn" v-html="costExplainShowAllText" @click="costExplainShowAll"></div>
            </div>
          </div>
        </div>
        <span class="gte"></span>
        <!-- 预订须知 -->
        <div class="book" ref="book" @click="goBookInfo">
          <div class="moreInto">
            <h4 class="title"><span class="tag"></span>预订须知</h4>
          </div>
        </div>
        <span class="gte"></span>
        <!-- 取消政策 -->
        <div class="policy" @click="goCancelPolicy">
          <div class="moreInto">
            <h4 class="title"><span class="tag"></span>取消政策</h4>
          </div>
        </div>
        <span class="gte"></span>
      </div>
      <div class="controltip ani" :class="tabIsFixed ? 'fixed' : 'hide'" ref="controltipFixed">    
        <div class="item" v-for="(tab, index) in tabs" @click="selectTab(tab, index)"
          :class="{'active': isActiveIndex == index}">
          <span v-html="tab.text"></span>
        </div>
      </div>
    </scroll>
    <div class="botterBox boxShow">
      <div class="botterWrap">
        <router-link :to='{path: "/index", query:{saleId: this.saleId}}' class="item active">
          <img src="../../assets/images/icon_home@2x.png">
          <span class="text">首页</span>
        </router-link>
        <span class="line"><em></em></span>
        <a :href="customHref" class="item active">
          <img src="../../assets/images/icon_custom@2x.png">
          <span class="text">客服</span>
        </a>
        <div class="btn" :class="{'disabled': productNull}" @click="showSelectdate" v-html="actionText"></div>
      </div>
    </div>
    <!-- <router-view></router-view> -->
    <tips :text="tipsText" :isShowTips="isShowTips"></tips>
    <transition name="fade">
      <div class="mask" v-show="isShowMock"></div>
    </transition>
    <transition name="slide">
      <explain :childrenPrice="childrenPrice" v-show="isShowExplain" @cancel="cancel"></explain>
    </transition>
    <transition name="fade">
      <div class="mask" @click="hideMask" v-show="isShowShareMask">
        <p class="shareTipsText">点击右上角分享</p>
      </div>
    </transition>
  </section>
</template>

<script type="text/ecmascript-6">
  import Loading from 'base/loading/loading'
  import Scroll from 'base/scroll/scroll'
  import tips from 'base/tips/tips'
  import explain from 'base/explain/explain'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  // import {mapMutations, mapActions} from 'vuex'
  import {getGoodsDetails} from 'api'
  import storage from 'good-storage'
  import qs from 'qs'
  import wx from 'weixin-js-sdk'
  import {wxShowOptionMenu, isWeiXin} from 'common/js/wxshare'

  const ERR_OK = '1'
  const DATALIST = '__dataList__'   //生产的当前产品主要信息 用于业务逻辑
  const DATA_PRICE = '__dataPrice__'  //用于展示日历对应价格
  const IDS = '__IDS__'
  const IS_DERICT = '__isDerict__'
  const PRODUCT_INFO = '__productInfo__'
  const BOOK_INFO = '__bookInfo__'
  const POLICY = '__policy__'
  const calendarMaxLen = 4
  const SALE_ID = '__saleId__'
  const PRODUCT_ID = '__productId__'
  const maxNum = 3
 
  const defaultImg = require('../../assets/images/default_productDetail_banner.png')

  export default {
    data() {
      return {
        isProductColse: false,
        isShowShareMask: false,
        detailMaxShowNum: 3,   //商品详情旅行天数最大显示数
        toggleShowAllText: '查看全部行程',
        documentTitle: '产品详情',
        costExplainShowLength: 300,   //费用说明长度显示
        shortCostExplainDesc: '',   //费用说明
        allCostExplainDesc: '',   //全部费用说明
        costExplainShowAllText: '查看全部费用说明',
        newDocumentTitle: '',
        scrollY: 0,
        saleId: '',
        productId: '',
        isShowTips: false,
        isShowMock: false,
        isShowExplain: false,
        isLoading: false,
        tipsText: '',
        timer: undefined,
        customHref: 'http://18600364506.udesk.cn/im_client/?web_plugin_id=39776',
        swiperOption: {
          pagination: '.swiper-pagination',
          direction: 'horizontal',
          slidesPerView: 1,
          paginationClickable: true,
          spaceBetween: 0,
          mousewheelControl: true,
          autoplay: 2600,
          speed: 800,
          loop: true
        },
        tabIsFixed: false,
        price: '0',
        detail: {
          image: [
            {
              imgUrl: defaultImg
            }
          ],
          title: '',
          supName: '',
          salePrice: '',
          departPlace: '',
          calendars: [],
          localmain: ''
        },
        tabs: [
          {text:'路线详情'},
          {text:'签证信息'},
          {text:'费用说明'},
          {text:'预定须知'}
        ],
        isActiveIndex: 0,
        dataList: [],
        calendars: [],
        productParams: {},
        isDerict: false,
        childrenPrice: null,
        actionText: '下一步',
        productNull: false,
        // 卖点
        paystyle:[]
      }
    },
    created() {
      document.title = '产品详情'
      this.isProductColse = false
      this.probeType = 3
      this.listenScroll = true

      this.productId = this.$route.query.productId
      this.saleId = Number(this.$route.query.saleId)

      storage.set(SALE_ID, this.saleId)
      storage.set(PRODUCT_ID, this.productId)
      this._getProductDetail()
    },
    watch: {
      scrollY(newY) {
        if (-newY > this.$refs.controltip.offsetTop) {
          this.tabIsFixed = true

          // 这个页面标题动态改变就是不生效，目前还不知道怎么变相解决。但不影响用户使用
          this.documentTitle = ''
        } else {
          this.tabIsFixed = false

          this.documentTitle = ''
        }
      }
    },
    methods: {
      filterText(data) {
        return data.replace(/(\r\n)|(\n)/g,'<br>')
      },
      showShareMask() {
        this.isShowShareMask = !this.isShowShareMask
      },
      hideMask() {
        this.isShowShareMask = !this.isShowShareMask
      },
      toggleShowAll() {
        if (this.detailMaxShowNum != maxNum) {
          this.detailMaxShowNum = maxNum
          this.toggleShowAllText = '查看全部行程'
        } else {
          this.detailMaxShowNum = Math.pow(this.detailMaxShowNum, 10)
          this.toggleShowAllText = '收起全部行程'
        }
      },
      costExplainShowAll() {
        // if (this.shortCostExplainDesc.length <= this.costExplainShowLength) {
        if (this.shortCostExplainDesc.length <= 400) { 
          this.shortCostExplainDesc = this.filterText(this.allCostExplainDesc)
          this.costExplainShowAllText = '收起费用说明'
        } else {
          this.shortCostExplainDesc = this.filterText(this.allCostExplainDesc.substring(0, this.costExplainShowLength))
          this.costExplainShowAllText = '查看全部费用说明'
        }
        console.log( this.shortCostExplainDesc)
        console.log( this.shortCostExplainDesc.length)
      },
      getFormatData(dateString){
        if(dateString.trim().length == 10){
          try {
            dateString = dateString.trim();
            dateString = dateString.slice(5);
            return dateString.replace('-', '/');
          } catch(e) {}
        }
        return ""
      },
      scroll(pos) {
        this.scrollY = pos.y
      },
      goCancelPolicy() {
        this.$router.push('/cancelPolicy')
      },
      cancel() {
        console.log('cancel')
        this.isShowMock = !this.isShowMock
        this.isShowExplain = !this.isShowExplain
      },
      goBookInfo() {
        this.$router.push('/bookInfo')
      },
      goCancelPolicy() {
        this.$router.push('/cancelPolicy')
      },
      goSelectDate() {
        this.$router.push('/selectDate')
      },
      showExplainInfo() {
        this.isShowMock = !this.isShowMock
        this.isShowExplain = !this.isShowExplain
      },
      showSelectdate() {
        if (this.isProductColse) {
          return
        }

        let productInfo = {
          imgUrl: this._getImgUrl(this.detail.image),
          title: this.detail.title,
          supName: this.detail.supName,
          distId: this.productParams.distId,
          platId: this.productParams.platId,
          productDbid: this.productParams.productId,
          saleId: this.productParams.saleId,
          distMemberName: '',
          userId: '',
          productTitle: this.detail.title,
          dataList: this.dataList,
          calDbid: '',
          calDate: '',
          totalFee: '',
          departPlace: this.detail.departPlace
        }

        storage.set(PRODUCT_INFO, productInfo)

        let dataList = storage.get(DATALIST)
        console.log("-----sss---------" + dataList[0].text)

        this.$router.push('/selectDate')
      },
      selectTab (tab, index) {
        this.isActiveIndex = index
        switch(index) {
          case 0:
            this._scrollTo(this.$refs.perDayDetailWrap)
            break
          case 1:
            this._scrollTo(this.$refs.visaInfo)
            break
          case 2:
            this._scrollTo(this.$refs.costExplain)
            break
          case 3:
            this._scrollTo(this.$refs.book)
            break
        }
      },
      _scrollTo(ele) {
        this.$refs.container.scrollToElement(ele, 500)
      },
      _getImgUrl(images) {
        if (images.length) {
          return images[0].imgUrl
        } else {
          return defaultImg
        }
      },
      _getProductDetail() {
        let params = qs.stringify({
          saleId: this.saleId,
          productId: this.productId
        })

        this.isLoading = true
        getGoodsDetails(params).then((res) => {
          this.isLoading = false
          console.log(res)


          // 商品不存在
          if (res.code == '3') {
            this.$router.push('/error')
            return
          }else if (res.code == '2') {
            this.isProductColse = true
            this.actionText = '已售罄'
            this.productNull = true
            this._showTips(res.msg)
            return
          }

          if (res.code == ERR_OK) {
            this.price = res.price
            let data = res.info
            this.detail = data
            this.detail.calendars = this._split(data.calendar)
            
            // this.detail.localmain = `${data.sellPtOne} ${data.sellPtTwo} ${data.sellPtThree} ${data.sellPtFour}`
            // 卖点修改
            if(data.sellPtOne && data.sellPtOne != '' && data.sellPtOne != null){
                this.paystyle.push(data.sellPtOne)
            }
            if(data.sellPtTwo && data.sellPtTwo != '' && data.sellPtTwo != null){
                this.paystyle.push(data.sellPtTwo)
            }
            if(data.sellPtThree && data.sellPtThree != '' && data.sellPtThree != null){
                this.paystyle.push(data.sellPtThree)
            }
            if(data.sellPtFour && data.sellPtFour != '' && data.sellPtFour != null){
                this.paystyle.push(data.sellPtFour)
            }

            console.log('卖点')
            console.log(this.paystyle)

            this._setDataList(data.calendar)

            storage.set(BOOK_INFO, this.detail.bookRule)

            // 设置 取消政策数据
            let policy = []
            this.detail.policy.forEach((item) => {
              let obj = {
                day: item.rangeMin == '0' ? '当' : item.rangeMin,
                priceRate: item.priceRate
              }
              policy.push(obj)
            })

            // 费用说明
            this.allCostExplainDesc = "包含：<br/>" + this.detail.feeInclude
            this.allCostExplainDesc += "<br/>不包含：<br/>" + this.detail.feeNoInclude
            this.shortCostExplainDesc = this.allCostExplainDesc

            if(this.allCostExplainDesc.length > this.costExplainShowLength){
              this.shortCostExplainDesc = this.allCostExplainDesc.substring(0, this.costExplainShowLength)
            }
            
            this.newDocumentTitle = this.detail.title
            console.log(this.newDocumentTitle)

            storage.set(POLICY, policy)

            // console.log(res.info.localmain)
          } else {
            this._showTips(res.msg)
          }
        })
      },
      _split(calendars) {
        return calendars.slice(0, calendarMaxLen)
      },
      _switchStock(num) {
        let str = ''
        if (Number(num) > 6) {
          str = `余>6`
        } else {
          str = `余${num}`
        }
        return str + ''
      },
      _setDataList(calendar) {
        this.dataList = []
        this.calendars = []
        let str = ''
        calendar.forEach((day) => {
          let dayInfo = {
            text: day.departDate,
            id: day.dbId,
            pricy: this._priceChange(day.price),
            moreThan: this._switchStock(day.validStock),
            stockNumber: day.validStock
          }
          this.dataList.push(dayInfo)
        })

        this.dataList.forEach((item) => {
          let text = this._formate(item.text)
          str = '"' + text + '":'+ '"' + item.moreThan + '\\n¥' + item.pricy.adultPrice + '起"'
          console.log(str)
          this.calendars.push(str)
        })

        this.calendars = this.calendars.toString()
        this.calendars = '{' + this.calendars + '}'
        console.log(this.calendars)
        this.calendars = JSON.parse(this.calendars)

        storage.set(DATA_PRICE, this.calendars)
        storage.set(DATALIST, this.dataList)

        console.log('calendars:')
        // console.log(this.calendars)
        console.log('dataList:')
        // console.log(this.dataList)

        // 设置价格说明里面的儿童价格
        this.childrenPrice = this.dataList[0].pricy.childrenPrice
        if(this.dataList.length){
          this.childrenPrice = this.dataList[0].pricy.childrenPrice
        }
      },
      _formate(data) {
        // console.log(data)
        let strArr = data.split('-')
        let newArr = []
        strArr.forEach((item) => {
          newArr.push(Number(item).toString())
        })
        return newArr.join('-')
      },
      _priceChange(pricy) {
        let adultPrice = '';
        let childrenPrice = '';
        let homeChange = '';
        pricy.forEach((item) => {
          if (item.priceType == '2') {
            childrenPrice = item.salePrice
          }
          if (item.priceType == '3') {
            homeChange = item.salePrice
          }
          if (item.priceType == '1') {
            adultPrice = item.salePrice
          }
        })
        return {
          adultPrice: adultPrice,
          childrenPrice: childrenPrice,
          homeChange: homeChange 
        }
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
      _getQueryString(name) {
        var reg = new RegExp("(^|)" + name + "=([^&]*)(&|$)", "i")
        var r = window.location.href.substr(1).match(reg)
        if (r != null) return unescape(r[2])
        return null
      },
      // ...mapMutations({ }),  //setProductInfo: 'SET_PRODUCT_INFO'
      // ...mapActions([ ]) // 'saveProductInfos'
    },
    mounted() {
      wxShowOptionMenu()
      if(isWeiXin()){
        let link = `http://wap.ttylink.com/productDetails?saleId=${this.saleId}&platId=tty&distId=jkd&productId=${this.productId}`
        let title =  this.detail.title
        let imgUrl = this.detail.image[0].imgUrl
        let desc = '我发现一个好东西，分享给你！'

        wx.config({
          debug: false,
          appId: 'wx8edf254c7b278788',         // 公众号的唯一标识
          timestamp: new Date().getTime(),     // 生成签名的时间戳
          nonceStr: Math.random() * 100 + '',  // 生成签名的随机串
          signature: '',                       // 签名
          jsApiList: [
            'onMenuShareAppMessage',
            'onMenuShareTimeline',
            'onMenuShareQQ',
            'onMenuShareQZone'
          ]
        })
        wx.ready(function () {
          wx.onMenuShareTimeline({
            title: title,
            link: link,
            imgUrl: imgUrl,
            success() {
              console.log("分享成功")
            },
            cancel() {

            }
          })
          // 分享给朋友
          wx.onMenuShareAppMessage({
            title: title,
            desc: desc,
            link: link,
            imgUrl: imgUrl,
            success: function() {
              console.log("分享成功")
            },
            cancel: function() {
            }
          })
          // 分享到QQ
          wx.onMenuShareAppMessage({
            title: title,
            desc: desc,
            link: link,
            imgUrl: imgUrl,
            success: function() {
              console.log("分享成功")
            },
            cancel: function() {
              
            }
          })
          // 分享到QQ空间
          wx.onMenuShareQZone({
            title: title,
            desc: desc,
            link: link,
            imgUrl: imgUrl,
            success: function() {
              console.log("分享成功")
            },
            cancel: function() {
              
            }
          })
        })
      }
    },
    components: {
      Scroll,
      swiper,
      swiperSlide,
      Loading,
      tips,
      explain
    }
  }
</script>

<style scoped lang="css" rel="stylesheet/css">
  @import './productDetails.css';
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
  .productDetail{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    overflow: hidden;
    background: #f5f5f5;
  }
  .mask{
    position: absolute;
    bottom: 0;
    width: 100%;
    background: rgba(0,0,0,.5);
    top: 0;
    z-index: 200;
    color: #fff;
    text-align: right;
  }
  .shareTipsText{
    font-size: 1rem;
    width: 1rem;
    float: right;
    margin-right: 2rem;
    margin-top: 2rem;
    line-height: 1.3;
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