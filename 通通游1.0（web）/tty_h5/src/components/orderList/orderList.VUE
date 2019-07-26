<template>
    <section class="orderList">
      <!-- <tips :text="tipsText" :isShowTips="isShowTips"></tips> -->
      <div v-title data-title="订单列表"></div>
    	<!-- <p>订单列表页</p>
      <button @click="goOrderDetail">订单详情</button>
      <button>付款</button>
      <button>退款</button>
      <button @click="goRefundReasons">提交退款原因</button> -->

      <!-- <span class="greycover1" v-show="retct"></span>  -->

      <div class="altoptit">
        <div class="item"
          v-for="(item, $index) in items"
          @click="selectStyle(item, $index)" 
          :class="{'active':item.active || item.autoActive,'unactive':!item.active}">
          <span v-html="item.select" class="text"></span>
        </div>
      </div>
      <div class="loadingBox" v-show="isLoading">
        <loading :title="loadingText"></loading>
      </div>
      <p class="tips" v-show="orderList.length == '0' && !isLoading">您还没有此订单</p>
      <scroll class="orderListWrap" 
        :data="orderList" 
        :pullup="pullup"
        @scrollToEnd="orderMore">
          <div>
            <div class="myPay" v-for="(order, index) in orderList">
              <!--主要信息框  -->
              <div class="maintxt">
                <!--订单号及状态  -->
                <div class="listTit">
                    <!--订单号  -->
                    <span class="listT_num" v-html="`订单号: ${order.orderNum}`"></span>
                    <!--订单状态  -->
                    
                    <!--退款中    -->
                    <div class="listT_sta" v-show="order.returnState == '1' && order.orderStatus == '2' ">退款中</div>
                    <!--退款取消  -->
                    <div class="listT_sta" v-show="order.returnState == '3'">已付款</div> 
                    <!--退款完成  -->
                    <div class="listT_sta" v-show="order.returnState == '2'">已退款</div> 
                    <!--正常订单状态  -->
                    <div class="listT_sta" v-show="order.orderStatus == '1'">待付款</div>
                    <div class="listT_sta" v-show="order.returnState == '0' && order.orderStatus == '2' ">已付款</div>
                    <div class="listT_sta" v-show="order.orderStatus == '3'">已完成</div>
                    <div class="listT_sta" v-show="order.orderStatus == '4'">已取消</div>
                </div>
                <div class="mainit" >
                  <!--订单图片  -->
                  <div class="minImg imgCenter" @click='routelist(order)'>
                    <span class="supplier" v-html="order.supName"></span>
                    <img @error="imageLoadError" :src="order.productImageId" alt="">
                  </div>
                  <!--订单名称  -->
                   <div class="listName line-02" v-html="order.productTitle"></div> 
                  <!--出发时间  -->
                  <div class="goTime" v-html="`出发:${order.calDate}`"></div>
                  <!--人数  -->
                  <div class="goPeople">
                    <span v-show="order.num > 0" v-html="`成人 X${order.num}`"></span>
                    <span v-show="order.orderNumDesc > 0" v-html="`儿童 X${order.orderNumDesc}`"></span>
                  </div>

                  <div class='refunde' @click='failRef(order)' v-show="order.returnState == '3'">
                    <span class="refundImg" >
                      <img src="../../assets/images/description.png" >
                    </span>
                    <span class="failRefund">退款失败</span> 
                  </div>  
                </div>
                <div class="listTip">
                  <!--支付时间  -->
                  <div class="priceItem">
                    <div class="payTime" v-html="`${order.createTime}下单`"></div>
                    <!--总金额  -->
                    <span class="allComp2" v-html="`￥${order.totalFee}`"></span>
                    <!-- <span class="allComp2" v-html="`￥${order.detail[0].salePrice}`"></span> -->
                    <span class="allComp1" v-html="allcomp1"></span>
                  </div>

                  <!--联系人  -->
                  <!-- <div v-show="order.returnState == '2'">
                    <div class="linkName">联系人姓名：{{linkname}}</div>
                    <div class="linkPhone">联系人手机号：{{linkphone}}</div>
                  </div> -->
                  <!--收益  -->
                  <!-- <div v-show="order.returnState == '2'">
                    <span class="getIn">收益</span>
                    <span class="getIn1">{{getin}}</span>
                  </div> -->
                  <!-- <div class="cancelbtn" v-if="cancelbtnct">取消</div> -->
                  <div class="oiuu" style="height: 1.7rem;width:100%;padding-right:14px">
                    <div class="cancelbtn qw" v-show="order.orderStatus == '1'" @click='cancellist(order)'>取消</div>
                    <div class="paybtn qw"  v-show="order.orderStatus == '1'" @click='orderPay(order)'>支付</div>
                    <div class="fapiaobtn qw" v-show="order.orderStatus == '2' && order.returnState == '0' && order.invoiceFlag != '1'" @click="getinvoice(order)">申请发票</div>
                    <div class="fapiaobtn qw" v-show="order.orderStatus == '2' && order.returnState == '3' && order.invoiceFlag != '1'" @click="getinvoice(order)">申请发票</div>
                    <!-- <div class="fapiaobtn" v-show="order.orderStatus == '2'" @click="getinvoice">申请发票</div> -->
                    <!-- <div class="fapiaobtn" v-show="order.returnState == '2'" @click="getinvoice">申请发票</div>  -->
                    <!-- <div class="hetongbtn" v-show="order.orderStatus == '2'" @click="gethetong">生成合同</div> -->
                    <!-- <div class="hetongbtn" v-show="order.orderStatus == '5'" @click="gethetong">生成合同</div>  -->
                    <div class="moreinfobtn qw" v-show="order.orderStatus == '2' && order.returnState != '1' && order.returnState != '2'"  @click="getmore(order)">补充资料</div>
                     <!-- <div class="moreinfobtn" v-show="order.returnState == '2'" @click="getmore">补充资料</div>  -->
                    <div class="item refundbtn qw" v-show="order.orderStatus == '2' && order.returnState == '0'" @click="refundEnv(order)">退款</div>
                    <div class="item refundbtn qw" v-show="order.orderStatus == '2' && order.returnState == '3'" @click="refundEnv(order)">退款</div>
                    <!-- <div class="item refundbtn qw" v-show="order.orderStatus == '2' && order.returnState == '1'">退款中…</div> -->
                     <!-- <div class="refundbtn" v-show="order.returnState == '2'" @click="refundEnv(order)">退款</div>  -->
                  </div>
                </div>
              </div>
            </div>
            <loading :title="loadingText" v-show="hasMore && !isLoading"></loading>
            <underline v-show="isUnderline"></underline>
            <div class="isOrderNull imgCenter" v-show="orderList.length == '0' && !isLoading">
              <img src="../../assets/images/default_isOrderNull.png" alt="">
            </div>
            <div class='cancelll' v-if='cancee'>
              <p>确定要取消该订单吗？</p>
              <div class='cele1' @click='celea'>取消</div>
              <div class='cele2' @click='celeb(order)'>确定</div>
            </div>
          </div>
      </scroll>
      <!--灰色罩层  -->
      
      <!--退款原因  -->
      <!-- <div class="11"></div> -->

      <!--退款小窗口  -->
      <transition name="fade">
        <span class="greycover" v-show="refundct || responsect" @click='uuui'></span>
      </transition>

      <div class='slidek' v-show="responsect" >
        <span class='slideksp'>退款原因</span>
        <span class='slidekspq'>{{weqw}}</span>
      </div>

      <transition name="slide">
        <div class="refundreq" v-show="refundct">
          <div class='responsecl' @click='closeres()'>
            <img src="../../assets/images/closePro.png" >
          </div>
          <span>输入退款原因</span>
          <textarea v-model='refundres'></textarea>
          <div class="tijiao" @click="submitRefundEnv">提交</div>
        </div>
      </transition>
      <tips :text="tipsText" :isShowTips="isShowTips"></tips>
    </section>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import Underline from 'base/underline/underline'
  import promain from 'base/promain/promain'
  import {isWeiXin} from 'common/js/cache'
  import tips from 'base/tips/tips'
  import {getOrderList, cancel, refund, pay, getOrderDetail} from 'api'
  import qs from 'qs'
  import storage from 'good-storage'
  
  const ERR_OK = '1'
  const SALE_ID = '__saleId__'
  const TAB_ID = '__tabId__'
  const ORDER_STATUS = '__orderStatus__'
  const successState = 2

  const EDIT_ALLINFO = '__editAllInfo__'   //全部信息
  const EDIT_KEYINFO = '__editKeyInfo__'   //操作信息
  
  const DEFAULT_IMG = require('../../assets/images/default_productDetail_banner.png')

  export default {
  	data() {
  		return {
        tab: 0,
        page: 1,
        size: 3,
        pullup: true,
        hasMore: true,
        isUnderline: false,
        // isLoading: true,
        loadingText: '加载中……',
        isLoading: false,
        isShowTips: false,
        timer: undefined,
        tipsText: '请输入退款原因',
        tips: '暂无订单',
        active: false,  //顶部导航样式
        items: [
          {select:'全部', tab:0, orderStatus: '', autoActive:true}, //第一个默认变色
          {select:'待付款', tab:1, orderStatus: '1', autoActive:false},
          {select:'已付款', tab:2, orderStatus: '2', autoActive:false},
          {select:'已完成', tab:3, orderStatus: '3', autoActive:false},
          {select:'已取消', tab:4, orderStatus: '4',autoActive:false},
          {select:'退款', tab:5, orderStatus: '5', autoActive:false}
        ],
        listnum:'',  //订单号
        liststate:'',        //订单状态
        imgsrc1:'', //订单图片地址
        listname:'',//订单名称
        gotime:'',//出发时间
        gopeople:'',
        paytime:'',//下单时间
        allcomp1:'',
        allcomp2:'',
        failRefundct: false,  //退款失败原因
        linkname:'' , //联系人姓名
        linkphone:'' , //联系人姓名
        linkct:false,   //退款中显示 联系人信息
        getin:'',  //收益
        getct:false,  //收益

        // 订单信息
        orderList:[],

        // 写死数据
        distId:'jkd',
        page: '1', 
        rows: '10',
        // userId: '123555',  //自动添加

        // 订单状态
        orderStatus:'',

        model:'',
        // 退款窗口
        refundct:false,

        // 记录用户填写退款理由
        refundres:'',
        // 记录当前操作的退款订单号
        refundproduct:'',
        // 记录当前操作的退款人用户ID
        refundpeo:'',
        saleId: null,
        // 退款遮罩
        retct: false,
        cancee :false,
        curOrder: null, //当前订单
        responsect :false,
        weqw:'',
  		}
  	},
    created() {
      // 初始化页码
      this.page = 1

      this.saleId = storage.get(SALE_ID)
      this.tab = Number(storage.get(TAB_ID))

      console.log('------' + this.tab)
      this.orderStatus = ''
      this.items.forEach((item) => {
        if(item.tab == this.tab){
          item.autoActive = true
          this.orderStatus = item.orderStatus
        }else{
          item.autoActive = false
        }
      })
      
      let params = qs.stringify({
        distId: this.distId,
        page: this.page,
        rows: this.rows,
        userId: this.userId,
        orderStatus: this.orderStatus,
        page: this.page,
        size: this.size
      })
      this._getOrderList(params);
    },
    mounted() {
  
    },
  	methods: {
      imageLoadError(good) {
        good.productImagUrl = DEFAULT_IMG
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
      scroll() {},
  		goOrderDetail() {
        this.$router.push('/orderDetail')
      },
      goRefundReasons() {
        this.$router.push('/refundReasons')
      },
      selectStyle(item, index) {
        this.page = 1

        this.orderList = []
        this.isLoading = true
        this.orderStatus = item.orderStatus
        this.curSelectIndex = index
        // console.log('orderStatus---' + this.orderStatus)

        this.items.forEach((xitem) => {
          if(xitem.tab == item.tab){
            xitem.autoActive = true
          }else{
            xitem.autoActive = false
          }
        })

        let params = qs.stringify({
          page: this.page,
          rows: this.rows,
          userId: this.userId,
          orderStatus: this.orderStatus,
          page: this.page,
          size: this.size
        })

        storage.set(TAB_ID, item.tab)
        this._getOrderList(params);
      },
      closeres(){
        this.refundct = false
      },
      orderPay(order){
        if (!isWeiXin()) {
          this._showTips(`请使用微信浏览器订单支付`)
          return
        }

        let me = this
        let payOrderNum = order.orderNum
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
      cancellist(order){
        this.$router.push({path: '/orderDetail', 
          query: { 
            orderNum: order.orderNum,
            orderStatus:order.orderStatus,
            payStatus:order.payStatus,
          } 
        })
      },
      getinvoice(order) {
        this.$router.push({
          path: '/invoice',
          query: {
            orderNo: order.orderNum,
            amount: order.totalFee,
          }
        })
      },
      // 补充资料 （补充之前点选预定后填写的预订信息）
      getmore(order) {
        // 设置当前选中的全部订单信息进入缓存
        storage.set(EDIT_ALLINFO,order)
        
          this.$router.push({
              path:  '/travellist',
              query: {
                // visitor: order    //当前选中订单的全部信息
              }
          })
      },
      // 退款按钮 order当前操作订单号
      refundEnv(order) {
          this.curOrder = order
          this.refundproduct = ''
          this.refundpeo = ''
          // 显示退款窗口
          this.refundct = true
          // 填写退款原因后跳转
          this.refundproduct = order.orderNum
          // 记录当前操作的退款订单号
          this.refundpeo = order.userId
          // console.log(this.refundproduct)
          // console.log(this.orderStatus)
      },
      // 退款提交
      submitRefundEnv() {
        // 如果输入全是空格替换为空
        if(this.refundres.lastIndexOf(" ")>=0){
            this.refundres = this.refundres.replace(this.refundres,'');
        }
        //检测为空或者为null
        if(this.refundres.length == '0' || this.refundres == '' ||  this.refundres == null){
          this._showTips('请填写退款原因后提交')
        }else{
            this.clientRemark = this.refundres
            this.orderNum = this.refundproduct
            this.useId = this.refundpeo
          
            let params = qs.stringify({
              clientRemark: this.clientRemark,
              orderNum:  this.orderNum,
              userId: this.useId,
            })
            
            refund(params).then((res) => {
              if(res.code != ERR_OK){
                this._showTips(res.msg)
                return
              }

              this.$router.push({
                path:  '/refundProgress',
                query: {
                  orderNum: this.refundproduct
                }
              })
            })
        }
      },
      orderMore() {
        console.log('more')
        if (!this.hasMore) {
          this.isUnderline = true
          return
        }
        this.page++
        let params = qs.stringify({
          distId: this.distId,
          page: this.page,
          rows: this.rows,
          userId: this.userId,
          orderStatus: this.orderStatus,
          page: this.page,
          size: this.size
        })
        this._getOrderList(params)
      },
      _getOrderList(params) {
        this.isUnderline = false
        this.hasMore = true
        getOrderList(params).then((res) => {
          console.log(res)
          if (res.code != ERR_OK) {
            this._showTips(res.msg)
            return
          }

          this.orderList = this.orderList.concat(this._getData(res.orderList))
          this.isLoading = false

          console.log(this.orderList)

          this._checkMore(res)
        })
      },
      _getData(data) {
        let ret = data
        return ret 
      },
      _checkMore(data) {
        if (!data.orderList.length || (data.size + data.page * data.size) > data.total) {
          this.hasMore = false
        }
      },
      celea(){
        this.retct = false
        this.cancee = false
      },
      celeb(order){
        let eee = this
        let params = qs.stringify({
          saleId: this.saleId,
          orderNum: order.orderNum,
          orderStatus:order.orderStatus,
          payStatus:order.payStatus,
        })
        // console.log(params)
        cancel(params).then((res) => {
            // console.log(res)
            if(res.code != ERR_OK){
              this._showTips(res.msg)
              return
                
            }
            let params = qs.stringify({
              distId: this.distId,
              page: this.page,
              rows: this.rows,
              userId: this.userId,
              orderStatus: this.orderStatus,
              page: this.page,
              size: this.size
            })
            this._getOrderList(params)
        })
      },
      routelist(order){
        // if(order.returnState == '0' ){
        //   if(order.orderStatus == '1' ||order.orderStatus == '2' ||order.orderStatus == '3' || order.orderStatus == '4'  ){
        //       this.$router.push({path: '/orderDetail', query: { orderNum: order.orderNum} })
        //   }
        // }else if(order.returnState == '1'){
        //   this.$router.push({path: '/refund', query: { orderNum: order.orderNum} })
        // }else if(order.returnState == '2'){
        //   this.$router.push({path: '/refund', query: { orderNum: order.orderNum} })
        // }else if(order.returnState == '3'){
        //   this.$router.push({path: '/refund', query: { orderNum: order.orderNum} })
        // }
        this.$router.push({path: '/orderDetail', query: { orderNum: order.orderNum} })
      },
      // 退款失败按钮
      failRef(order){
        this.responsect = true
        
        let params = qs.stringify({
          orderNum: order.orderNum
        })

        getOrderDetail(params).then((res) => {
          // console.log('长度')
          // console.log(res.order.back.length)
          // console.log(res.order.back[res.order.back.length-1].operatorRemark)

          // this.weqw = res.order.back[res.order.back.length-1].operatorRemark
          
          this.weqw = res.order.back[0].operatorRemark

          if(res.order.back[0].operatorRemark == '' || res.order.back[0].operatorRemark == null){
            this.weqw = '无'
          }
        })
      },
      uuui(){
        this.responsect = false
      },
      // _backReson(order) {
      //   if (order.back.length) {
      //     return order.back[0].operatorRemark ? order.back[0].operatorRemark : '无'
      //   } else {
      //     return '无'
      //   }
      // }
  	},
    components: {
      Scroll,
      tips,
      loading: Loading,
      underline: Underline,
    }
  }
</script>

<style scoped lang="css" rel="stylesheet/css">
  @import './orderList.css';
  .orderList{
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 10;
    width: 100%;
    background: #f5f5f5;
  }
  .qw{
    /* background-color: #black */
    margin-top: .298667rem;
    margin-left: .597333rem;
    float: right;
  }
  /* 过渡动画 */
  .greycover {
    transition: all .3s cubic-bezier(.55,0,.1,1);
  }
  .greycover.fade-enter, .greycover.fade-leave-active{
    opacity: 0;
  }
  .refundreq {
    transition: all .3s cubic-bezier(.55,0,.1,1);
  }
  .refundreq.slide-enter, .refundreq.slide-leave-active{
    transform: translate3d(0, -100%, 0);
  }
  .refundreq.slide-leave-active, .refundreq.slide-enter{
    transform: translate3d(0, 100%, 0);
  }
</style>