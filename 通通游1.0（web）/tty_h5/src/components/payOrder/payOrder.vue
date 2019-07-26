<template>
    <section class="payOrder">
      <div v-title data-title="支付订单"></div>
      <!-- <p>支付订单</p>
      <button @click="back">返回</button>
      <button @click="goPay">立即支付</button> -->

      <div class="toptit">
        <div class="top_t" @click="back">
            <img style="width:100%;height:100%" src="../../assets/images/u253.png">
        </div>
        <div class="top_o">
            支付订单
        </div>
      </div>
      <scroll class="scrollWrap-top-bottom">
        <div>
          <span class="gte2"></span>
          <div class="knum">
            <span class="k1">订单编号</span>
            <span class="k2" style="color:#fb5759" v-html="order.orderNum"></span>
          </div>
          <div class="knum">
            <span class="k1">姓名</span>
            <span class="k2" v-html="order.customerName"></span>
          </div>
          <div class="knum">
            <span class="k1">手机号</span>
            <span class="k2" v-html="order.customerPhone"></span>
          </div>
          <div class="knum">
            <span class="k1">邮箱</span>
            <span class="k2" v-html="order.customerEmail"></span>
          </div>
          <span class="gte2"></span>
          <!-- <promain :productInfo="productInfo" :tripInfo="tripInfo"></promain> -->

          <div class="promain">
            <div class="promain_im">
              <img :src="order.imgUrl">
              <span class="supplier" v-html="this.orderInfo.supName"></span>
            </div>
            <div class="promain_tit" v-html="order.title"></div>
            <div class="promain_peonum">出游人数：成人X{{order.num}} &nbsp 儿童X{{order.orderNumDesc}}</div>
            <div class="promain_peotime">出发时间： {{order.calDate}}</div>
          </div>
          <span class="grein"></span>
          <div class="knum">
            <span class="k1">出行人信息</span>
          </div>
          <!--出行人信息  -->
          <div v-for="data in orderInfo.detail" v-show="orderInfo.detail.length > 0">
              <div class="knum">
                <span class="k1">姓名</span>
                <span class="k2" v-html="data.clientName"></span>
              </div>
              <div class="knum">
                <span class="k1" v-if="data.idType == '1'">身份证</span>
                <span class="k1" v-if="data.idType == '2'">护照</span>
                <span class="k2" v-html="data.idNumber"></span>
              </div>
          </div>
          <p class="remark" v-show="orderInfo.detail.length == 0">无</p>
          
          <span class="grein"></span>
          <div class="knum">
            <span class="k1">备注</span>
          </div>
          <p class="remark">{{orderRemark}}</p>
        </div>
      </scroll>
      <!--付款  -->
      <div class="pay">
        <span class="payall">总计</span>
        <span class="paym" v-html="`¥${order.totalFee}`"></span>
        <span class="wenh">
          <img src="../../assets/images/icon_descript@2x.png" style="width:100%;height:100%;display:block;"> 
        </span>
        <span class="monmx" @click="showCostExplain">费用明细</span>
        <button class="payBtn" @click="showPayBox">立刻支付</button>
      </div>
      <transition name="payAni">
        <div class="paytype" v-show="atype">
          <div class="pt_1 item">
            <span class="pt1tit">确认支付</span>
            <span class="pt1_img" @click="closepaytype">
              <img src="../../assets/images/关闭-(4@2x.png" style="width:100%;height:100%;dispaly:block">
            </span>
          </div>
          <div class="pt_2 item">
            <span class="pt2tit">请在1小时内完成支付</span>
            <span class="pt2price">¥{{order.totalFee}}</span>
          </div>
          <div class="weixin item">
            <span class="wx_img">
              <img src="../../assets/images/微信支付@2x.png" style="width:100%;height:100%;dispaly:block">
            </span>
            <span class="wxzff">微信支付</span>
            <span class="wx_img2">
              <img src="../../assets/images/同意·@2x.png" style="width:100%;height:100%;dispaly:block">
            </span>
          </div>
          <span class="gte1"></span>
          <div class="makesurepay" @click="goPay">确定支付</div>
        </div>
      </transition>

      <transition name="fade">
        <div class="mask" v-show="isShowMock"></div>
      </transition>
      <transition name="slide">
        <cost-explain :priceInfo="priceInfo" v-show="isShowCostExplain" @cancel="cancel"></cost-explain>
      </transition>
      <tips :text="tipsText" :isShowTips="isShowTips"></tips>
    </section>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import CostExplain from 'base/costExplain/costExplain'
  import tips from 'base/tips/tips'
  import { mapGetters } from 'vuex'
  import {pay} from 'api'
  import qs from 'qs'
  import storage from 'good-storage'
  import {isWeiXin} from 'common/js/cache'

  const ORDER_INFO = '__orderInfo__'
  const PRICE_INFO = '__priceInfo__'
  const ORDER_STATUS = '__orderStatus__'
  const successState = 2

  const ERR_OK = '1'
  const SALE_ID = '__saleId__'

  const defaultImgUrl = require('../../assets/images/banner_default.png')

  export default {
    computed: {
      ...mapGetters([
        // 'productInfo',
        // 'tripInfo',
        'serverStatus'
      ])
    },
    data() {
      return {
        orderRemark: '无',
        isShowTips: false,
        tipsText: '',
        timer: undefined,
        isShowMock: false,
        isShowCostExplain: false,
        order: {
          orderNum: '' ,   
          customerName: '',
          customerPhone: '',
          customerEmail: '',
          orderNumDesc: '',
          calDate: '',
          imgUrl: '',
          title: '',
          totalFee: '',
          num:'',
        },
        orderInfo: null,
        atype: false,
        payParams: {},
        saleId: null
      }
    },
    created() {
      this.priceInfo = storage.get(PRICE_INFO)
      this.saleId = storage.get(SALE_ID)
      
      // 获取订单信息
      this.orderInfo = storage.get(ORDER_INFO)
      if(this.orderInfo.customerMemo != null && this.orderInfo.customerMemo != ''){
        this.orderRemark = this.orderInfo.customerMemo
      }
    },
    beforeRouteEnter (to, from, next) {
        if(from.path.indexOf("payStatus")>=0){
          next({
            path: '/orderlist',
            query: { saleId: storage.get(SALE_ID)}
          })
        }else if(from.path.indexOf("orderlist")>=0
          ||from.path.indexOf("index")>=0){
          next({
            path: '/index',
            query: { saleId: storage.get(SALE_ID)}
          })
        }else{
          next();
        }
    },
    methods: {
      back() {
        this.$router.goBack()
      },
      goPay() {
        if (!isWeiXin()) {
          this._showTips(`请使用微信浏览器订单支付`)
          return
        }

        let me = this
        let payOrderNum = me.orderInfo.orderNum
        let params = qs.stringify({
          orderNum: payOrderNum,
          saleId: me.saleId,
          payType: 'weixin'
        })
        
        pay(params).then((res) => {
          if (res.code != ERR_OK) {
            console.log(`出错了：${res.msg}`)
            me._showTips(`提示：${res.msg}`)
            return
          }

          if (res.code == ERR_OK) {
            let orderPayInfo = res.orderPayInfo
            function onBridgeReady() {
              WeixinJSBridge.invoke('getBrandWCPayRequest', {
                  "appId": orderPayInfo.appId, //公众号名称，由商户传入     
                  "timeStamp": orderPayInfo.timeStamp, //时间戳，自1970年以来的秒数     
                  "nonceStr": orderPayInfo.nonceStr, //随机串     
                  "package": orderPayInfo.package,
                  "signType":orderPayInfo.signType, //微信签名方式：     
                  "paySign": orderPayInfo.paySign //微信签名 
              },
              function(res2) {
                  if (res2.err_msg == "get_brand_wcpay_request:ok") {
                      me._showTips(`订单支付已成功!`)
                      storage.set(ORDER_STATUS, successState)
                      me.$router.push({path: '/payStatus', query:{orderNum: payOrderNum}})
                  } else if(res2.err_msg == "get_brand_wcpay_request:cancel"){
                      me._showTips(`订单支付已取消!`)
                  }else{
                      me._showTips(`订单支付失败!`)
                  }
              });
            }

            if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                } else if (document.attachEvent) {
                    document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                }
            } else {
                onBridgeReady();
            }
          }
        })
      },
      showPayBox() {
        this.atype = true;
      },
      closepaytype() {
        this.atype = false;
      },
      showCostExplain() {
        this.isShowMock = !this.isShowMock
        this.isShowCostExplain = !this.isShowCostExplain
      },
      cancel() {
        this.isShowMock = !this.isShowMock
        this.isShowCostExplain = !this.isShowCostExplain
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
      // console.log(this.orderInfo)

      setTimeout(() => {
        console.log('获取的订单信息：')
        this.orderInfo = storage.get(ORDER_INFO)
        console.log(this.orderInfo)
        this.order.orderNum = this.orderInfo.orderNum
        this.order.customerName = this.orderInfo.customerName
        this.order.customerPhone = this.orderInfo.customerPhone
        this.order.customerEmail = this.orderInfo.customerEmail
        this.order.orderNumDesc = this.orderInfo.orderNumDesc
        this.order.calDate = this.orderInfo.calDate
        this.order.imgUrl = this.orderInfo.productImageId ? this.orderInfo.productImageId : defaultImgUrl
        this.order.title = this.orderInfo.productTitle
        this.order.totalFee = this.orderInfo.totalFee
        this.order.num = this.orderInfo.num
        console.log(this.serverStatus)
      }, 30)
    },
    components: {
      Scroll,
      tips,
      CostExplain
    }
  }
</script>

<style scoped lang="css" rel="stylesheet/css">
  @import './payOrder.css';
  .payOrder{
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 10;
    width: 100%;
    background: #f5f5f5;
  }
  .paytype {
    transition: all .36s cubic-bezier(.55,0,.1,1);
  }
  .paytype.payAni-enter, .paytype.payAni-leave-active{
    transform: translate3d(0, -100%, 0);
  }
  .paytype.payAni-leave-active, .paytype.payAni-enter{
    transform: translate3d(0, 100%, 0);
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