<template>
    <section class="orderDetail">
      <div v-title data-title="订单详情"></div>
    	<!-- <p>订单详情</p>
      <button @click="back">返回</button>
      <button @click="goPay">支付</button>
      <button @click="goRefund">退款</button> -->
      
      <div class="top">
        <div class="waittopim" @click="back">
          <img src="../../assets/images/icon_back_black.png">
        </div>
        <div class="waittoptit">订单详情</div>
      </div>

      <scroll class="scrollWrap-top-bottom">
        <div>
          <div>
            <div class="proinfo">
              <div class="maintit item">
                <div class="mt_1">订单状态</div>
                <div class="mt_2" v-html="orderStatusDec"></div>
              </div>
              <div class="mainnum item">
                <div class="mi_1">订单编号</div>
                <div class="mi_2 color" v-html="orderNum"></div> 
              </div>
              <div class="maintime item">
                <div class="mi_1">下单时间</div>
                <div class="mi_2" v-html="createTime"></div> 
              </div> 
              <!-- <div class="maintime item" v-show="payTime != null"> -->
              <div class="maintime item" v-show="this.order.orderStatus != '1' && this.order.orderStatus != '4'">
                <div class="mi_1">支付时间</div>
                <div class="mi_2" v-html="payTime"></div> 
              </div>
              <!-- <div class="maintime item" v-show="calDate != null"> -->
              <div class="maintime item" v-show="this.order.orderStatus != '4' && this.order.orderStatus != '5'">
                <div class="mi_1">出团时间</div>
                <div class="mi_2" v-html="calDate"></div> 
              </div>
              <div class="maintime item" v-show="this.order.orderStatus == '3'">
                <div class="mi_1">回团时间</div>
                <div class="mi_2" v-html="calBackDate"></div> 
              </div> 
            </div>
          </div>
          <span class="grein1">
            <span class="cpxx">产品信息</span>
          </span>
          <div class="promain">
            <div class="promain_im imgCenter">
              <span class="supplier" v-html="order.supName"></span>
              <img :src="order.productImageId">
            </div>
            <div class="promain_tit line-02" v-html="order.productTitle"></div>
            <div class="promain_peonum">出游人数：成人 x{{order.num}} | 儿童 x{{order.orderNumDesc}}</div>
            <div class="promain_peotime">出发时间： {{order.calDate}}</div>
            <div class="refundjin" @click="goRefundProgress" v-show="order.returnState == '1' && order.orderStatus == '2'">退款进度</div>
          </div>
          <span class="grein"></span>
          <div class="knum">
            <span class="k1">联系人</span>
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
          <span class="grein"></span>
          <div class="knum">
            <span class="k1">出行人信息</span>
          </div>
          <!--出行人信息  -->
          <div v-for="data in order.detail">
              <div class="knum">
                <span class="k1">姓名</span>
                <span class="k2" v-html="data.clientName"></span>
              </div>
              <div class="knum">
                <span class="k1" v-show="data.idType == '1'">身份证</span>
                <span class="k1" v-show="data.idType == '2'">护照</span>
                <span class="k2" v-html="data.idNumber"></span>
              </div>
          </div>
          
          <span class="grein"></span>
          <div class="knum">
            <span class="k1">备注</span>
          </div>
          <p class="remark" v-html="this.order.customerMemo"></p>
          <span class="grein"></span>
          <div class="allpay">
            <div class="total">总金额</div>
            <div class="totali" v-html="`￥${order.totalFee}`"></div> 
            <div class="tottit" @click="showCostExplain">费用说明</div> 
            <div class="tottiti">
              <span style="margin-right: 0.8rem;" v-html="`应付金额：￥${order.totalFee}`"></span>
            </div> 
          </div>

          <div v-show="orderStatus != 1">
            <span class="grein"></span>
            <div class="knum" @click="goSignList">
              <span class="k1" >面签通知</span>
              <span class="gg">
                <img src="../../assets/images/yo2x.png" >   
              </span>
            </div>
            <div class="knum" @click="goGroupList">
              <span class="k1" >出团通知</span>
              <span class="gg">
                <img src="../../assets/images/yo2x.png" alt="">   
              </span>
            </div>
            <span class="grein"></span>
            <div class="knum" @click="applyInvoice">
              <span class="k1">申请开发票</span>
              <span class="gg">
                <img src="../../assets/images/yo2x.png" >   
              </span>
            </div>
          </div>
          <span class="grein"></span>
        </div>
      </scroll>
      <div class="lastsure">
        <span class="last1" @click="concatConstomer">联系客服</span>
        <span class="last1" @click="getinvoice(order)" v-show="order.orderStatus == '3'">申请发票</span>
        <span class="last2" @click='cancelEnv' v-show="order.orderStatus == '1'">取消</span>
        <span class="last3" v-show="order.orderStatus == '1'" @click='orderPay()'>付款</span>  
        <span class="last1" v-show="order.orderStatus == '2' && order.returnState == '0' " @click="refundEnv">退款</span> 
      </div> 
      
      <span class="greycover" v-show="isShowMask || isShowConfirm"></span>
      <!--退款弹窗  -->
      <div class="refundreq" v-show="isShowMask">
        <div class='responsecl' @click="closeEnv">
          <img src="../../assets/images/closePro.png" >
        </div>
        <span>输入退款原因</span>
        <textarea v-model='refundReson'></textarea>
        <div class="tijiao" @click="submitEnv">提交</div>
      </div>
      
      <!--取消订单弹窗  -->
      <div class='cancelll' v-show='isShowConfirm'>
        <p>确定要取消该订单吗？</p>
        <div class="btnWrap">
          <div class='cele1' @click='cancelOrderEnv'>取消</div>
          <div class='cele2' @click='cancelOrderOk'>确定</div>  
        </div>
      </div>
      <!--遮罩层  -->
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
  import CostExplain from 'base/costExplain/costExplain'
  import Scroll from 'base/scroll/scroll'
  import tips from 'base/tips/tips'
  import storage from 'good-storage'
  import {getOrderDetail, cancel, refund, pay} from 'api'
  import {isWeiXin} from 'common/js/cache'
  import qs from 'qs'

  const ERR_OK = '1'
  const PRICE_INFO = '__priceInfo__'
  const SALE_ID = '__saleId__'
  const SIGN_INFO = '__singInfo__'  //签约信息
  const GROUP_INFO = '__groupInfo__' //出团通知
  const ORDER_STATUS = '__orderStatus__'
  const ORDER_NUM = '__orderNum__'
  const successState = 2

  const defaultImg = require('../../assets/images/default_productDetail_banner.png')

  export default {
  	data() {
  		return {
        isShowTips: false,
        tipsText: '',
        timer: undefined,
        isShowMock: false,
        isShowCostExplain: false,
        orderStatusDec: '',
        createTime: '',
        priceInfo: {
          // 成人数量
          adult:'',
          // 成人价
          adultPrice:'0',
          // 儿童数量
          children:'',
          // 儿童价
          childrenPrice:'0',
          // 总价
          countPrice:''
        },
        isShowMask: false, // 退款窗口
        isShowConfirm :false,
        totalFee:'',
        signInfo: [],
        groupInfo: [],
        refundReson:'', // 记录用户填写退款理由
        payTime:'',
        calDate:'',
        calBackDate:'',
        saleId: null,
        orderNum: '',
        orderStatus: 1,
        payStatus:'',
        order: {},
        orderDetail: {},
        // 订单出行人总及金额
        // peo:[],

          
  		}
  	},
    created() {
      this.saleId = storage.get(SALE_ID)
      this.orderNum = this.$route.query.orderNum
      storage.set(ORDER_NUM, this.orderNum)
      
      let params = qs.stringify({
        orderNum: this.orderNum
      })

      getOrderDetail(params).then((res) => {
        // console.log(res)
        if (res.code != ERR_OK) {
          this._showTips(res.msg)
          return
        }

        this.order = res.order
        this.orderDetail = res.order.detail

        this.createTime = this.order.createTime
        this.payTime = this.order.payTime
        this.calDate = this.order.calDate
        this.calBackDate = this.order.calBackDate

        this.totalFee = this.order.totalFee
        this.download1 = this.order.teamAdviceList
        this.download2 = this.order.visaAdviceList

        !this.orderDetail.remark ? this.orderDetail.remark = '无' : this.orderDetail.remark

        this.order.productImageUrl = this._filterImg(this.order.productImageUrl)

        this.orderStatus = Number(this.order.orderStatus)
        this.payStatus = this.order.payStatus
        switch(Number(this.orderStatus)) {
          case 1:
            this.orderStatusDec = '待付款'
            break;
          case 2:
            this.orderStatusDec = '已付款'
            break;
          case 3:
            this.orderStatusDec = '已完成'
            break;
          case 4:
            this.orderStatusDec = '已取消'
            break;
          case 5:
            this.orderStatusDec = '已退款'
            break;
          default:
            this.orderStatusDec = '无'
        }

        // 增加退款中判断
        if(this.order.returnState == '1' && this.order.orderStatus == '2'){
          this.orderStatusDec = '退款中'
        }

        if(this.order.returnState == '2'){
          this.orderStatusDec = '已退款'
        }

        this.signInfo = this.order.visaAdviceList
        this.groupInfo = this.order.teamAdviceList

        storage.set(SIGN_INFO, this.signInfo)
        storage.set(GROUP_INFO, this.groupInfo)

        console.log(this.order.detail)
        var i
        for(i=0;i<this.order.detail.length;i++){
          if(this.order.detail[i].productCalPriceType =='1'){
            this.adultPrice = this.order.detail[i].salePrice
          }
          if(this.order.detail[i].productCalPriceType =='2'){
            this.childrenPrice = this.order.detail[i].salePrice
          } 
        }
        console.log(this.order.num)
        console.log(this.adultPrice)
        console.log(this.order.orderNumDesc)
        console.log(this.childrenPrice)
        console.log(this.order.totalFee)
       
        this.priceInfo.adult = this.order.num
        this.priceInfo.adultPrice = this.adultPrice
        this.priceInfo.children = this.order.orderNumDesc
        this.priceInfo.childrenPrice = this.childrenPrice
        this.priceInfo.countPrice = this.order.totalFee
      })

      console.log(this.priceInfo)

      // 金额信息保存到本地缓存
      // storage.set(PRICE_INFO,this.priceInfo)

    },
  	methods: {
      orderPay(){
        if (!isWeiXin()) {
          this._showTips(`请使用微信浏览器订单支付`)
          return
        }

        let me = this
        let payOrderNum = me.order.orderNum
        let params = qs.stringify({
          orderNum: payOrderNum,
          saleId: this.saleId,
          payType: 'weixin'
        })
        
        pay(params).then((res) => {
          if (res.code != ERR_OK) {
            console.log(`出错了：${res.msg}`)
            this._showTips(`提示：${res.msg}`)
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
              onBridgeReady()
            }
          }
        })
      },
      back() {
        this.$router.goBack()
      },
      goPay() {
        this.$router.push('/pay')
      },
      goRefund() {
        this.$router.push('/refund')
      },
      showCostExplain() {
        this.isShowMock = !this.isShowMock
        this.isShowCostExplain = !this.isShowCostExplain
      },
      cancel() {
        this.isShowMock = !this.isShowMock
        this.isShowCostExplain = !this.isShowCostExplain
      },
      closeEnv(){
        this.isShowMask = false
      },
      cancelEnv(){
        this.isShowConfirm = true
      },
      // 取消订单确认
      cancelOrderOk(){
        this.isShowConfirm = false

        let params = qs.stringify({
          saleId: this.saleId,
          orderNum: this.orderNum,
          orderStatus: this.orderStatus,
          payStatus: this.payStatus,
        })

        cancel(params).then((res) => {
          if(res.code != ERR_OK){   //取消订单成功 刷新页面
            this._showTips(res.msg)
            return
          }
          // 回到订单列表
          this.$router.push('/orderlist')
        })
      },
      // 联系客服
      concatConstomer(){
        this.$router.push('/custom')
      },
      // 面签通知
      goSignList(){
        this.$router.push({ path: '/downloadDoc', query: { type: 1 } })
      },
      // 出团通知
      goGroupList(){
        this.$router.push({ path: '/downloadDoc', query: { type: 2 } })
      },
      cancelOrderEnv(){
        this.isShowMask = false
        this.isShowConfirm = false
      },
      applyInvoice(){
        this.$router.push({
          path: '/invoice', 
          query: {
            orderNo: this.orderNum,
            amount: this.totalFee,
          }
        })
      },
      refundEnv(){
        this.isShowMask = true
      },
      submitEnv(){
        if(this.refundReson == ''){
          this._showTips('请填写退款原因')
          return
        }

        let params = qs.stringify({
          clientRemark: this.refundReson,
          orderNum:  this.orderNum,
          userId: 25,
        })
        refund(params).then((res) => {
          if(res.code != ERR_OK){
            this._showTips(res.msg)
            return
          }

          this.$router.push({
            path:  '/refundProgress',
            query: {
              orderNum: this.orderNum
            }
          })
        })
      },
      // 查询退款进度
      goRefundProgress(){
        this.$router.push({ path: '/refund', query: { orderNum: this.orderNum } })
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
      _filterImg(url) {
        return !url || !url.length ? defaultImg : url
      },
      // 申请发票
      getinvoice(order){
        // alert(1)
        this.$router.push({
          path: '/invoice',
          query: {
            orderNo: order.orderNum,
            amount: order.totalFee,
          }
        })
      }
  	},
    components: {
      Scroll,
      CostExplain,
      tips
    }
  }
</script>

<style scoped lang="css" rel="stylesheet/css">
  @import './orderDetail.css';

  .orderDetail{
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