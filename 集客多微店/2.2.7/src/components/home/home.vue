<template>
  <section class="homeWrap">
    <div v-title :data-title="documentTitle ? documentTitle : '首页' " ></div>
    <div v-stat="{type:'pageview', title:'首页'}"></div>

    <!-- <down-app v-show="isShowDownload" @closeEnv="close"></down-app> -->
    <nav-bar v-if="navList" ref="navBar" :navList="navList" :curSelectIndex="curSelectIndex" @changeNavBar="changeNavBar"></nav-bar>

    <div v-if="channelList.length" class="content-slider" ref="contentSlider">
      <content-slide ref="slideContent" :autoPlay="false" :loop="false" @changeSlideIndex="changeSlideIndex" @pausePlay="pausePlay" @startPlay="startPlay">
        <div v-for="(channel, index) in channelList">
          <!-- item content -->
          <!-- @refresh="refreshData"  --> 
          <!-- :pullDownRefresh="pullDownRefreshObj" -->
          <!-- @pulldownScroll="pulldownScroll" -->
          <!-- :pulldown="pulldown" -->
          <!-- <keep-alive> -->
            <scroll class="innerScroll" direction="vertical"
                :probe-type="probeType"
                :listen-scroll="listenScroll"
                :beforeScroll="beforeScroll"
                @refresh="refreshData"
                @beforeScroll="beforeScrollEnv"
                @cancelRefresh="cancelRefresh"
                @scroll="scroll"
                :ref="`scroll_${index}`">
              <div class="content">
                <div v-if="channel && channel.componentType == '0'">
                  <div v-for="component in channel.list" class="component">

                    <!-- 多图banner -->
                    <more-banner v-if="component && component.type == '0' && component.attribute == '0'" ref="moreBanner" :bannerList="component.contents" @pauseOutSlide="pauseOutSlide" @playOutSlide="playOutSlide" :isHome="true"></more-banner>

                    <!-- 单张banner -->
                    <alone-banner v-if="component && component.type == '0' && component.attribute == '1'" :aloneBanner="component"></alone-banner>

                    <!-- 两张banner -->
                    <double-banner v-if="component && component.type == '0' && component.attribute == '2'" :doubleBanner="component.contents"></double-banner>

                    <!-- 商品导航 4个 -->
                    <goods-nav v-if="component && component.type == '1' && component.attribute == 0" :goodsNavList="component.contents"></goods-nav>

                    <!-- 商品导航 8个 -->
                    <goods-nav v-if="component && component.type == '1' && component.attribute == 1" :goodsNavList="component.contents"></goods-nav>

                    <!-- 专题 -->
                    <div class="themeWrap" v-if="component && component.type == '2' && component.contents.length" style="font-size:12px;">
                      <router-link v-if="component.contents.length" :to="`/wap/index/theme?channelId=${channelId}&pageId=${component.contents[0].pageId}`" tag="div" class="imgWrap">
                        <img v-lazy="component.picture">
                      </router-link>
                      <goods-slide :themeGoodsList="component.products" @pauseOutSlide="pauseOutSlide" @playOutSlide="playOutSlide"></goods-slide>
                    </div>
                      
                    <!-- 商品 一排一列 （暂时取消）-->
                    <!-- <goods-one-columns v-if="component && component.type == '3'" :goodsList="component.products"></goods-one-columns> -->

                    <!-- 商品 一排两列 -->
                    <goods-two-columns v-if="component && component.type == '3'" :goodsList="component.products"></goods-two-columns>

                  </div>

                  <div v-if="!channel.list">暂无数据</div>
                  
                </div>
                <!-- 秒杀 -->
                <div v-if="channel && channel.componentType == '1'" class="secKillDetailWrap">
                  <div class="topImgWrap">
                    <img :src="secKillDetailData.headImgUrl">
                  </div>
                  <div class="screenListWrap">
                    <div class="screenList">
                      <nav-bar-seckill v-if="secKillDetailData.seckillList" ref="" :seckillList="secKillDetailData.seckillList" @pauseOutSlideForSeckill="pauseOutSlideForSeckill" @playOutSlideForSeckill="playOutSlideForSeckill" :curSelectIndexForSeckill="curSelectIndexForSeckill" @switchScreen="switchScreen" ></nav-bar-seckill>
                    </div>
                  </div>
                  <!-- 剩余时间提示 -->
                  <div v-if="snapUpIng" class="timerWrap" ref="timerWrap">
                    <p class="text" v-html="`${textTips} ${timerText}`"></p>
                  </div>
                  <!-- 当前场次的商品列表 -->
                  <div v-if="secKillDetailData.productList.length" class="secKillGoodsList">
                    <ul>
                      <li>
                        <div @click="jumpProductDetail(good)" class="good" v-for="(good, index) in secKillDetailData.productList" :key="good.productId">
                          <div class="imgWrap">
                            <img class="img" :src="good.imageUrl">
                            <!-- 抢完了 -->
                            <!-- <div v-if="good.isSoldOut == 1" class="over">抢完了</div> -->
                            <img v-if="good.isSoldOut == 1" class="over" src="../../common/images/good_soldout.png">
                          </div>
                          <div class="goodDetail">
                            <p class="productName" v-html="good.productName"></p>
                            <div class="priceWrap">
                              <span class="timeLimitPrice">
                                限时价 <em class="num" v-html="`¥${good.price}`"></em>
                              </span>
                              <del class="originalPrice" v-html="`原价 ¥${good.originalPrice}`"></del>
                            </div>
                            
                            <!-- 限量 即将开始-->
                            <div v-if="snapState == 3" class="limitNumber" v-html="`限量${good.stockNumber}件`"></div>
                            <div v-if="snapState == 3" class="btn" @click.stop.prevent="remindMsgEnv(good)" v-html="good.remindText"></div>
                            
                            <!-- 剩余数量 抢购中-->
                            <div v-if="snapState == 2" class="remainderNumber">
                              <!-- <div class="progress" :style="{'width': good.precent == '100%' ? '0' : good.precent}"></div> -->
                              <div class="progress" :style="{'width': good.precent}"></div>
                               
                              <span class="text">仅剩{{good.stockNumber}}件</span>
                            </div>
                            <div v-if="snapState == 2 && good.remainderNumber != 0" class="btn rob">马上抢</div>
                            <div v-if="snapState == 2 && good.remainderNumber == 0" class="btn see">去看看</div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div v-if="!secKillDetailData.productList.length" class="secKillGoodsPlaceholder">
                    <img class="good_null" src="../../common/images/good_null_default.png">
                    <p class="text">暂无商品</p>
                  </div>
                </div>
              </div>
            </scroll>
          <!-- </keep-alive> -->
        </div>
      </content-slide>
    </div>

    <!-- 确认弹窗 -->
    <transition name="fade">
      <confirm v-show="isShowConfirm" :userMobile="userMobile" @hideConfirm="hideConfirm" @confirm="confirmEnv"></confirm>
    </transition>

    <!--注册提示框  -->
    <div class="registered" v-show="iszhuce" style="z-index:99999">
      <div class="name">{{nickName?nickName+',请先完成手机验证':'请先完成手机注册'}}</div>
      <!--关闭  -->
      <div class="coverClose" @click="closeDiv"></div>  
      <div class="close1" @click="closeDiv">
           <img src="../../common/images/closediv.png">  
      </div>  
      <span class="coversp"></span> 
      <!--手机号  -->
      <input id="phone" type="text" class="phone" placeholder="请输入手机号" v-model="phonecode" autofocus>
      <!--验证码  -->
      <input id="phone_code" type="text" class="number" placeholder="请输入验证码" v-model="yzcode" >
      <button id="btn" class="keyNum" @click="settime(this)" :disabled="disabled" >{{divname}}</button>
      <!--确认注册  -->
      <button class="sure" @click="getTip()">确认</button>
    </div>
    <!--蒙层  -->
    <shade v-if="isShowShade" @touchEnv="touchEnv"></shade> 
    <!-- <shade v-if="iszhuce" @touchEnv="touchEnv"></shade>   -->

    <!-- 弹窗提示语 -->
    <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText" style="z-index: 99999;"></alert-tip>

    <transition name="loading">
      <loading v-show="showLoading"></loading>
    </transition>
    <foot-guide v-show="!showCover" @showRegisterEnv="showRegisterEnv"></foot-guide>
  </section>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import DownApp from 'base/downApp/downApp'
  import FootGuide from 'base/footer/footGuide'
  import loading from 'base/loading/loading'
  import Confirm from 'base/confirm/confirm'
  import AlertTip from 'base/alertTip/alertTip'
  import Register from 'base/register/register'
  import Shade from 'base/shade/shade'

  import NavBar from 'components/navBar/navBar'
  import NavBarSeckill from 'components/navBarSeckill/navBarSeckill'
  import ContentSlide from 'components/slide_content/slide_content'
  import MoreBanner from 'components/banner/banner'
  import AloneBanner from 'components/aloneBanner/aloneBanner'
  import DoubleBanner from 'components/doubleBanner/doubleBanner'
  import GoodsNav from 'components/goodsNav/goodsNav'
  import GoodsSlide from 'components/goodsSlide/goodsSlide'
  import GoodsOneColumns from 'components/goodsOneColumns/goodsOneColumns'
  import GoodsTwoColumns from 'components/goodsTwoColumns/goodsTwoColumns'

  import { navSerialize, setJumpUrl, countDown, wxShowOptionMenu, isWeiXin } from 'common/js/utils'
  import { getNavList, getChannelDetail, seckillList, seckillNotice, getToken ,sendCode, userRegister, memberCenter} from 'api'
  import qs from 'qs'
  import { rootPath } from 'config/env'
  import storage from 'good-storage'
  import wx from 'weixin-js-sdk'
  // import sa from 'sa-sdk-javascript';

  // import { mock_channelList, mock_list, mock_secKillDetail, mock_list_3, mock_list_4, mock_familyProductList } from 'service/mock'

  const GOODS_MAX_NUM = 8
  const pullingDownBackHeight = -50
  const SECKILL_TAB_INDEX = '__seckillTabIndex__'
  const USERINFO_MOBILE = '__userMobile__'
  const SCROLL_Y = 'scroll_y'
  // const refreshIcon = require('../../images/icon_refresh.png')
  
  export default {
    name: 'home',
    // beforeRouteLeave(to, from, next) {
    //   to.meta.keepAlive = false;
    //   next();
    // },
    activated() {
      // document.title = ''
      // let scrollY = storage.get(SCROLL_Y, '')

      // this.$nextTick(() => {
        // console.log(this.$refs.scroll_0[0].scrollTo(0, -300, 500));
        // console.log(this.$refs.scroll[0].$el);
      // })
    },
    watch: { 
      documentTitle(val) {
        document.title = val
      }
    },
    data() {
      return {
        // 埋点
        stayTime: 0,
        nickName:'',
        kehuName:'', //客户昵称
        // iszhuce : false,
        showAlert: false, //弹出框
        alertText: null, //弹出框信息
        area_code : 86,   //写死中国大陆地区
        timeoutKey : 0,   //倒计时控制
        linkKey:1,        //接口控制
        countdown : 60,   //倒计时初始时间
        divname : '获取验证码',
        yzcode : '',
        phonecode : '',
        disabled : false,
        addcartpram: {
            productId: '',
            num: 1,
            isFromCartList: false,
        },

        documentTitle: '首页',
        routerPath: '',
        isShowDownload: true,
        showCover: false,
        navList: null,

        beforeScroll: true,
        probeType: 3,
        listenScroll: true,

        loosenText: false,
        isLoading: false,
        pullDownRefreshObj: {
          threshold: 50,
          stop: 50
        },
        isPullDown: false,
        isReLoad: false,
        refreshIcon: require('../../common/images/icon_refresh.png'),
        isRefreshData: false,
        isShowAni: false,
        pulldown: true,
        
        scrollY: 0,
        pulldownTipText: '下拉刷新',
        pageTitle:'',
        showAlert: false, //弹出框
        alertText: '加入购物车成功！', //弹出框信息
        productNumber: 0, //店铺商品数量
        pStoreName:'',//店铺名称
        pImage:'',//店铺LOGO
        storeCustomFieldList: [], //首页数据
        showLoading: true, //显示加载动画
        showBackStatus: false, //显示返回顶部按钮
        showCover:false,
        isShowConfirm: false,
        curSelectIndex: 0,
        curIndex: 0,
        curChannelId: '',
        channelList: [],
        channelIds: [],
        secKillDetailData: {},  //秒杀详情
        headImgUrl: '', //秒杀专场banner图
        screenList: [],  //秒杀场次列表
        currentSelectIndex: '',  //当前选择的场次索引(秒杀导航)
        timerText: '--: --: --',  //开抢倒计时
        systemTime: '',  //系统时间
        timer: null,  //定时器
        seckillId: '',  //秒杀场次id
        snapUpIng: false, //抢购中 (是否显示倒计时)
        seckillTotalStock: 0, //剩余库存
        textTips: '', //倒计时提示
        userMobile: '',
        snapState: null,

        curSelectIndexForSeckill: 0,

        iszhuce: false,
        isShowShade: false,

        remindText: '开抢提醒'
      }
    },
    created() {
      storage.remove(SECKILL_TAB_INDEX)
      storage.remove(USERINFO_MOBILE)
      this.routerPath = rootPath;
      this._getNavList()

    },
    mounted() {
      this._wxShareEnv()
    },
    beforeRouteEnter (to, from, next) {
      if(sessionStorage.documentTitle == '' || sessionStorage.documentTitle == 'undefined'){
        document.title = '首页'
      }else{
        document.title = sessionStorage.documentTitle
      }
      next();  
    },
    methods: {
        // 关闭注册框
        closeDiv(){
            this.iszhuce = false;
            this.isShowShade = false
        },
        // 验证码  
        settime(obj) {
            var my = this
            var phone = this.phonecode;
            
            if (phone =='') {                                           //如果输入为空
                this.phonecode = ""
                this.alertText = '请输入手机号'
                this.showAlert = true
                return false;
            }

            // if (this.area_code == "86") {
            //     if (!phone.match(/^1[3|4|5|7|8][0-9]{9}$/)) {           //检查手机号格式
            //         this.alertText = '请输入正确的手机号'
            //         this.showAlert = true
            //         this.timeoutKey = 0              //关闭倒计时
            //         this.linkKey = 1                 //开启接口
            //         this.disabled = false
            //         this.divname = '获取验证码'
            //         this.countdown = 60;
            //         return false;
            //     }
            // } 

            if (this.linkKey == 1) {     
                let params = qs.stringify({
                    mobile: phone,
                    countryCode: 86,
                    codeType: 5
                })
                
                sendCode(params).then(res => {
                    console.log(res)
                    if (res.code == '0'){                                 //发送失败 跳出提示 不进行倒计时
                        var msg1= res.msg
                        this.alertText = msg1
                        this.showAlert = true
                        clearTimeout(ttt);    
                    }else if(res.code == '1'){                            //发送成功 进入倒计时 按钮持续不可操作 直到cuntdown为0后恢复
                        var msg2 = res.msg
                        this.alertText = msg2
                        this.showAlert = true
                        this.timeoutKey = 1;         //倒计时控制变量 开启
                        this.linkKey = 0;            //接口关闭
                        // console.log(this.timeoutKey)
                        // console.log(this.linkKey)
                    }else{
                        this.alertText = res.msg
                        this.showAlert = true
                    }
                })
            }

            if(this.timeoutKey == '1' & this.linkKey != '1'){                //倒计时控制开启  接口控制关闭  此时进行倒计时
                this.disabled = true
                // obj.setAttribute("disabled", true);                  //不可选中
                this.divname = "重新发送" + this.countdown;
                this.countdown--;                                       //数字倒计时
            }

            if (this.countdown == 0) {                                  //倒计时结束 重置按钮 可重新走接口
                this.linkKey++                 //开启接口
                this.timeoutKey--              //关闭倒计时
                this.disabled = false
                // obj.removeAttribute("disabled");  //重置倒计时按钮样式
                this.divname = "获取验证码"
                this.countdown = 60;
                return;
            }

            var ttt = setTimeout(function(){
                my.settime(obj)
            }, 1000) 
        },
        // 确认注册框
        getTip(){
            // console.log(this.yzcode)
            if(this.yzcode == '' || this.phonecode == ''){
                this.alertText = '请输入完整的信息'
                this.showAlert = true
            }else{  //验证注册 跳转支付页面
                // console.log(this.yzcode)
                let params = qs.stringify({
                    mobile: this.phonecode,       //注册框手机号
                    smsCode : this.yzcode,  //注册框验证码
                })
                
                userRegister(params).then(res => {   //验证注册接口
                    // console.log(res)
                    if(res){
                        if(res.code =='1'){  //注册成功 关闭注册框 重新购买
                        // alert('1');
                            this.isShowShade = false
                            this.iszhuce = false
                            this.alertText = res.msg
                            this.showAlert = true
                            //  alert('2');
                            // console.log('--------')
                            // this.productInfo.isH5CommonUser = 0
                            // this._getProductDetail()

                        }else{   //注册失败 重新尝试
                            this.alertText = res.msg
                            this.showAlert = true
                        }
                    }else{
                        this.alertText = '注册接口关闭'
                        this.showAlert = true
                    }
                })
            }
        },
      scroll(pos) {
        this.scrollY = pos.y
        // console.log(this.scrollY)
        // storage.set(SCROLL_Y, this.scrollY)
      },
      closeRegisterEnv() {
        this.iszhuce = !this.iszhuce
        this.isShowShade = !this.isShowShade
      },
      showRegisterEnv() {
        this.iszhuce = !this.iszhuce
        this.isShowShade = !this.isShowShade
      },
      touchEnv() {
        this.iszhuce = !this.iszhuce
        this.isShowShade = !this.isShowShade
      },
      beforeScrollEnv() {
        this.isPullDown = true;
        this.isShowAni = true;
        // console.log('开始下拉')
      },
      refreshData() {
        this.refreshIcon = require('../../common/images/loading.gif')
        console.log(parseInt(this.channelId))
        let scrollRef = this.$refs.scroll[parseInt(this.channelId) - 1]
        scrollRef.scrollTo(0, 50 ,500)
        console.log('数据加载中……')
        this.pulldownTipText = '数据加载中……'
        this.isLoading = true;
        setTimeout(() => {
          console.log('获取新数据')
          this.isReLoad = true;
          scrollRef.scrollTo(0, 0 ,500)
          setTimeout(() => {
            this.loosenText = false;
            this.isReLoad = false;
            this.isShowAni = false;
            this.isPullDown = false;
            this.isLoading = false;
            this.refreshIcon = require('../../common/images/icon_refresh.png')
          }, 500)

        }, 1600)
        console.log('刷新数据')
      },
      pulldownScroll() {
        // this.pulldownTipText = '松开立即刷新'
        this.loosenText = true;                
        // console.log('松开立即刷新')
        this.isShowAni = true
        // console.log(this.isShowAni)
      },
      cancelRefresh() {
        // this.pulldownTipText = '下拉刷新'
        this.loosenText = false;
        this.isShowAni = false
      },
      pausePlay() {
        if (this.$refs.moreBanner) {

        // console.log(this.$refs.moreBanner)
          this.$refs.moreBanner.forEach((item) => {
            item.pausePlay()
          })
        }
      },
      startPlay() {
        if (this.$refs.moreBanner) {
          this.$refs.moreBanner.forEach((item) => {
            item.startPlay()
          })
        }
      },
      pauseOutSlide() {
        this.$refs.slideContent.slideDisabled()
      },
      playOutSlide() {
        this.$refs.slideContent.slideEnable()
      },
      pauseOutSlideForSeckill() {
        this.$refs.slideContent.slideDisabled()
      },
      playOutSlideForSeckill() {
        this.$refs.slideContent.slideEnable()
      },
      changeSlideIndex(curIndex) {
        this.curIndex = curIndex
        this.$refs.navBar.changeCurrentIndex(curIndex)
        this.channelId = this.navList[curIndex].channelId
        // this._getChannelDetail(channelId)
      },
      changeNavBar(curIndex) { //切换首页导航
        console.log('改变slide索引：' + curIndex)
        this.curIndex = curIndex
        this.$refs.slideContent.scrollTo(curIndex)
        this.channelId = this.navList[curIndex].channelId
        console.log('channelId: ' + this.channelId)

        // 如果是秒杀专场
        if (this.navList[curIndex].isSeckill == '1') {
          this._getSecKillList()
          // this._getUserInfo()
          return

        } else {
          this._getChannelDetail(this.channelId)
        }
      },
      switchScreen(screen) { // 切换秒杀场次
        console.log('当前秒杀场次: ')
        console.log(screen)

        this.systemTime = screen.systemTime
        this.startTime = screen.startTime
        this.endTime = screen.endTime

        // if(screen.isCurrentSeckill == '' ) { //如果秒杀进行中
        // if(screen.seckillStatus == '已开抢' || screen.seckillStatus == '即将开始') {
        //   this.snapUpIng = true
        // } else {
        //   this.snapUpIng = false
        // }

        // console.log(dateFormate(screen.startTime))

        this._getSecKillDetail(screen.seckillId);
      },
      remindMsgEnv(good) {
        console.log('开抢提醒')
        this.isShowConfirm = true
        this.noticeProduct = good
      },
      hideConfirm() {
        this.isShowConfirm = false
      },
      confirmEnv(phone) {
        // if (!/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(phone)) {
        //   this.showAlert = true
        //   this.alertText = '请填写正确的手机号码'
        //   return
        // }
        console.log(phone);
        this.isShowConfirm = false
        let params = qs.stringify({
          productId: this.noticeProduct ? this.noticeProduct.productId : '',
          mobile: phone
        })
        seckillNotice(params).then(res => {
          console.log('提交手机号----')
          console.log(phone)
          console.log(res)
          if (res.code != '1') {
            this.showAlert = true
            this.alertText = res.msg
            return
          }
          this.showAlert = true
          this.alertText = res.msg
          // this.noticeProduct.remindText = '已设置'
        })
      },
      jumpProductDetail(good) {
        this.$router.push({
          path: `${this.routerPath}/productDetail`,
          query: {
            productId: good.productId
          }
        })
      },
      _stayTime() {
        return this.stayTime += 1000
      },
      _getNavList() {
        let params = qs.stringify({
            a: 'v1/channelDetail'
        })

        getNavList(params).then(res => {
          console.log('导航----')
          console.log(res)
          if (res.code == '1') {
            this.showLoading = false;

            let ret = []
            this.navList = navSerialize(res.channelList)
            this.channelList.length = this.navList.length
            this.channelId = this.navList[0] ? this.navList[0].channelId : ''
            this._getChannelDetail(this.channelId)

            console.log('页面标题: ')
            console.log(res.storeName)
            this.documentTitle = res.storeName;
            sessionStorage.documentTitle = res.storeName;

            // sa.track('$pageview', {
            //   $title: '112',
            //   $url: location.href,
            //   $url_path: location.pathname,
            //   $referrer_host: location.hostname,
            //   $referrer: document.referrer,
            // })

            // sa.track('$WebStay', {
            //   $viewport_width: window.innerWidth,
            //   $viewport_height: window.innerHeight,
            //   $title: this.documentTitle,
            //   $url: location.href,
            //   $event_duration: this._stayTime(),
            //   $url_path: location.pathname,
            // })

          }

        })
      },
      close() {
        this.isShowDownload = false
        this.$refs.contentSlider.style.top = '1.9rem'
      },
      _getChannelDetail(channelId) {
        this.channelId = channelId ? channelId : ''
        console.log('当前模版id:' + channelId)
        // console.log(this.channelIds)
        if (this.channelIds.indexOf(this.channelId) != -1) {
          console.log('不获取数据')
          return
        }
        this.channelIds.push(this.channelId)

        // console.log('channelId: ' + this.channelId)
        let params = qs.stringify({
          a: 'v1/channelDetail',
          channelId: this.channelId
        })
        
        getChannelDetail(params).then(res => {
          console.log('当前模版数据----')
          console.log(res)
          if (res.code == '1') {
            res.componentType = '0'
            let data = res
            data.list.forEach((component) => {
              // 添加跳转链接
              component = setJumpUrl(component, this.channelId)
            })
            this.$set(this.channelList, this.curIndex, data)
            // console.log(this.channelList)
          }
        })
      },
      _getSecKillDetail(seckillId) {
        if (this.timer) {
          clearInterval(this.timer)
          this.timer = null
        }

        if (!seckillId) {
          seckillId = ''
        }
        console.log('秒杀场次id：' + seckillId)

        let params = qs.stringify({
          a: 'v1/seckillList',
          seckillId: seckillId
        })
        seckillList(params).then(res => {
          console.log('秒杀详情----')
          console.log(res)

          // 获取当前系统时间
          this.systemTime = res.systemTime

          if (res.dataList.length) {
            this._judgeTime(this.systemTime, this.startTime, this.endTime)

            res.dataList.forEach((good) => {
              let stockNumber = parseInt(good.stockNumber)
              let seckillTotalStock = parseInt(good.seckillTotalStock)
              let precent;
              if (stockNumber == seckillTotalStock) {
                precent = '100%'
              } else {
                precent = (stockNumber / seckillTotalStock ) * 100 + '%'
              }
              if(stockNumber == 0 && seckillTotalStock == 0) {
                precent = '0%'
              }
              good.precent = precent //剩余百分比
              good.remainderNumber = stockNumber
              good.remindText = '开抢提醒'
            })
          } else {
            this._judgeTime(this.systemTime, this.startTime, this.endTime)

            // 没有商品时，设置提示语
            // this.snapUpIng = true
            // this.textTips = '暂未开启'
            // this.timerText = ''
          }

          this.secKillDetailData = {
            componentType: '1',
            headImgUrl: this.headImgUrl,
            seckillList: this.seckillList,
            productList: res.dataList
          }
          this.$set(this.channelList, this.curIndex, this.secKillDetailData)
          console.log(this.channelList)
        })
      },
      // 获取秒杀列表
      _getSecKillList() {
        // 初始化秒杀详情
        // this.secKillDetailData = {}
        // this.headImgUrl = ''
        // this.seckillList = []
        // this.snapUpIng = true

        if (this.timer) {
          clearInterval(this.timer)
          this.timer = null
        }

        let params = qs.stringify({
          a: 'v1/seckillList',
          seckillId: ''
        })
        seckillList(params).then(res => {
          console.log('秒杀列表----')
          console.log(res)

          if (res.code == '1') {
            this.headImgUrl = res.headerImageList[0].imageUrl
            this.seckillList = res.seckillList //秒杀导航
            
            this.userMobile = res.mobile
            storage.set(USERINFO_MOBILE, this.userMobile)

            this.seckillList.forEach((screen, index) => {
              screen.id = index  //id用于tab切换动画
            })

            let secKillIndex = storage.get(SECKILL_TAB_INDEX)
            // console.log(secKillIndex)

            if (secKillIndex != undefined) {
              this.seckillList.forEach((screen, index) => {
                if (secKillIndex == index) {
                  this.curSelectIndexForSeckill = index
                  this.seckillId = screen.seckillId
                  this.systemTime = screen.systemTime
                  this.startTime = screen.startTime
                  this.endTime = screen.endTime

                  this._getSecKillDetail(this.seckillId)
                }
              })

            } else {
              this.seckillList.forEach((screen, index) => {
                if (screen.isCurrentSeckill == '1') {
                  this.seckillId = screen.seckillId
                  this.curSelectIndexForSeckill = index

                  this.systemTime = screen.systemTime
                  this.startTime = screen.startTime
                  this.endTime = screen.endTime

                  this._getSecKillDetail(this.seckillId)
                }
              })
            }

          }

        })
      },
      _judgeTime(t1, t2, t3) {
        // t1系统时间 t2开场时间 t3结束时间
        // 1已开抢 2抢购中 3即将开始

        let ret = ''

        if (t2 >= t1) {
          ret = '即将开始'
          this.snapUpIng = true
          this.snapState = 3
          this.textTips = '距离开场'
          this._djs(t1, t2, t3, 'feture')

        } else {
          if (t3 > t1) {
            ret = '抢购中'
            this.snapUpIng = true
            this.snapState = 2
            this.textTips = '本场还剩'
            this._djs(t1, t2, t3, 'ing')

          } else {
            ret = '已结束'
            this.snapUpIng = false
            this.textTips = '已结束'

          }
        }
        console.log(ret)
        return ret;
      },
      _djs(t1, t2, t3, state) {
        console.log('时间戳差值计算----------')

        let difference;
        if (state == 'ing') {
          difference = t3 - t1; //毫秒差
        } else {
          difference = t2 - t1; 
        }

        var seconds = Math.round(difference / 1000)
        // console.log(`剩余 ${seconds} 秒`)

        this.timerText = countDown(difference)
        console.log(this.timerText)

        console.log('开启倒计时')
        this.timer = setInterval(() => {
          difference = (seconds - 1) * 1000
          // console.log(countDown(difference));

          this.timerText = countDown(difference)
          // console.log(this.timerText)
          seconds = seconds - 1;
          // console.log(seconds);

          if (seconds == '0') {

            if (this.timer) {
              clearInterval(this.timer)
              this.timer = null
            }
            clearInterval(this.timer);
            // console.log('重新获取秒杀详情')

            this.secKillDetailData = {}
            this.headImgUrl = ''
            this.seckillList = []
            this.snapUpIng = true
            // this.$refs.timerWrap[0].style.display = 'none';

            this._getSecKillList()
          }

        }, 1000)
      },
      _wxShareEnv() {
        console.log('微信判断----')
        console.log(isWeiXin())
        if (isWeiXin()) {
          let me = this

          let link = window.location.href
          let title =  '';
          let imgUrl = require('common/images/logo.png');
          let desc = '我发现一个好东西，分享给你！';
          let link2 = link.replace(/&/g,"##");

          let params = qs.stringify({
            url: link2
          })
          getToken(params).then((res) => {
            console.log('微信签名----');
            console.log(res);

            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: res.appId, // 必填，公众号的唯一标识
                timestamp: res.timestamp, // 必填，生成签名的时间戳
                nonceStr: res.nonceStr, // 必填，生成签名的随机串
                signature: res.signature, // 必填，签名，见附录1
                jsApiList: [
                  'onMenuShareAppMessage', // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
                  'onMenuShareTimeline', // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
                  'onMenuShareQQ', // 获取“分享到QQ”按钮点击状态及自定义分享内容接口
                  'onMenuShareQZone' //获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.ready(function () {
              wx.onMenuShareTimeline({
                  title: title, // 分享标题
                  link: link, // 分享链接
                  imgUrl: imgUrl, // 分享图标
                  success() {
                    me.showAlert=true;
                    me.alertText="分享成功";
                  },
                  cancel() {
                      // 用户取消分享后执行的回调函数
                  }
              })
              // 分享给朋友
              wx.onMenuShareAppMessage({
                  title: title, // 分享标题
                  desc: desc, // 分享描述
                  link: link, // 分享链接
                  imgUrl: imgUrl, // 分享图标
                  success: function() {
                      me.showAlert=true;
                      me.alertText="分享成功";
                  },
                  cancel: function() {
                      // 用户取消分享后执行的回调函数
                  }
              })
              // 分享到QQ
              wx.onMenuShareAppMessage({
                  title: title, // 分享标题
                  desc: desc, // 分享描述
                  link: link, // 分享链接
                  imgUrl: imgUrl, // 分享图标
                  success: function() {
                      me.showAlert=true;
                      me.alertText="分享成功";
                  },
                  cancel: function() {
                      // 用户取消分享后执行的回调函数
                  }
              })
              // 分享到QQ空间
              wx.onMenuShareQZone({
                  title: title, // 分享标题
                  desc: desc, // 分享描述
                  link: link, // 分享链接
                  imgUrl: imgUrl, // 分享图标
                  success: function() {
                      me.showAlert=true;
                      me.alertText="分享成功";
                  },
                  cancel: function() {
                      // 用户取消分享后执行的回调函数
                  }
              })
            })
          })             
        }
      }
    },
    components: {
      DownApp,
      NavBar,
      Confirm,
      AlertTip,
      Register,
      Shade,
      NavBarSeckill,
      FootGuide,
      loading,
      Scroll,
      ContentSlide,
      MoreBanner,
      AloneBanner,
      DoubleBanner,
      GoodsNav,
      GoodsSlide,
      GoodsOneColumns,
      GoodsTwoColumns
    }
     
  }
</script>

<style lang="css" scoped>
  @import 'home.css'
</style>
