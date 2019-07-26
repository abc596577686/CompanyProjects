<template>
  <section class="payStatus">
    <div v-title data-title="支付成功"></div>
  	<!-- <p>支付状态页面(支付成功、失败) </p>
    <button @click="back">返回</button>
    <button @click="goInvoice">申请发票</button> -->

    <div class="toptit">
      <div class="top_t" @click="back">
        <img style="width:100%;height:100%" src="../../assets/images/u253.png" >
      </div>
      <div class="top_o">
        支付订单
      </div>
    </div>
    <scroll class="scrollWrap-top-bottom">
      <div>
        <div class="payState">
          <span class="payImg">
            <img style="width:100%;height:100%;display:block;" src="../../assets/images/成功2@2x.png" >
          </span>
          <span class="paysc">支付成功</span>
          <span class="paysc2" @click="goOrderDetail">查看订单详情</span> 
          <span  class="paysc3">
            <img style="width:100%;height:100%;display:block;" src="../../assets/images/icon_into@2x.png" alt="" >
          </span> 
        </div>

        <div class="realPay">
          <span class="realPay_1">实付金额</span>
          <span class="realPay_2" v-html="order.totalFee"></span> 
          <span class="realPay_3">订单编号</span> 
          <span class="realPay_4" v-html="order.orderNum"></span> 
        </div>
        <span class="gte2"></span>
        <!-- <contacts :contactsInfo="contactsInfo"></contacts> -->
        <div class="knum">
          <span class="k1" style="font-size: 0.65rem;width: auto !important;">联系人</span>
            <!-- <span class="k2" v-html="order.customerName"></span> -->
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
        <!--出行人信息  -->
        <!-- <goinfo></goinfo> -->
        <div class="Peoinfo">
          <div class="info1">出行人信息
            <span class="goimg" @click="goedit">
                <img src="../../assets/images/icon_into@2x.png" alt="error" style="width:100%;height:100%,display:block">
              </span>
          </div>
          <div class="infomain" v-for="data in order.detail">
              <span class="main1">姓名</span> 
              <span class="main3" v-html="data.clientName"></span> 
              <span class="main2" v-show="data.idType =='1'">身份证</span>
              <span class="main2" v-show="data.idType =='2'">护照</span>    
              <span class="main4" v-html="data.idNumber"></span> 
          </div> 
        </div>
        <span class="gte2"></span>
        <div class="request" @click="goinvocie">
          <div>申请开发票</div>
          <span>
            <img style="width:100%;height:100%;display:block;" src="../../assets/images/icon_into@2x.png" >
          </span>
        </div>
        <span class="gte2"></span>
      </div>
    </scroll>
  </section>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import contacts from 'base/contacts/contacts'
  import goinfo from 'base/goinfo/goinfo'
  import storage from 'good-storage'
  import {getOrderDetail} from 'api'
  import qs from 'qs'

  const ORDER_INFO = '__orderInfo__'
  const PRODUCT_ID = '__productId__'
  const SALE_ID = '__saleId__'
  const PERSON_INFO = '__personInfo__'
  const ORDER_STATUS = '__orderStatus__'
  const successState = 2

  export default {
  	data() {
  		return {
        orderNum: '',
        orderStatusDec: '',
        order: {}
  		}
  	},
    created(){
      this.saleId = storage.get(SALE_ID)
      this.orderNum = this.$route.query.orderNum
    },
    beforeRouteEnter (to, from, next) {
        if(successState == storage.get(ORDER_STATUS)){
          storage.set(ORDER_STATUS, '')
          next();
        }else if(from.path.indexOf("orderDetail")>=0
          ||from.path.indexOf("orderlist")>=0
          ||from.path.indexOf("index")>=0){
          next({
            path: '/orderlist',
            query: { saleId: storage.get(SALE_ID)}
          })
        }else{
          next();
        }
    },
    mounted() {
      // 获取订单信息 填充出行人信息
      let params = qs.stringify({
          orderNum: this.orderNum,
      })

      getOrderDetail(params).then((res) => {
          console.log(res)
          if(res.code == '1' ){
            // 赋值order
            this.order = res.order
          }
      })
    },
  	methods: {
  		back() {
        this.$router.goBack()
      },
      goInvoice() {
        this.$router.push('/invoice')
      },
      goOrderDetail() {
        this.$router.push({path: '/orderDetail',  query: {orderNum: this.orderNum}})
      },
      goinvocie(){
        this.$router.push({
            path: '/invoice',
            query: {
                orderNo: this.order.orderNum,
                amount: this.order.totalFee,
            }
        })
      },
      // 跳转出行人信息
      goedit(){
        
        // 设置出行人信息为全部订单信息
        storage.set(PERSON_INFO, this.order)

        this.$router.push(
          {path: '/payreadyinfo', query:{orderNum: this.orderNum}}
        )

      }
  	},
    components: {
      goinfo,
      contacts,
      Scroll
    }
  }
</script>

<style scoped lang="css" rel="stylesheet/css">
  @import './payStatus.css';

  .payStatus{
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 10;
    width: 100%;
    background: #f5f5f5;
  }
</style>