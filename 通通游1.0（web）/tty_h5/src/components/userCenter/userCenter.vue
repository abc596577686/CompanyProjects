<template>
  <section class="userCenter">
    <div v-title data-title="个人中心"></div>

    <div class="topc">
      <div class="topc_im">
        <img :src="userInfo.iconId">
      </div>
      <div class="topc_tit" v-html="userInfo.name"></div>            
    </div>
    <div class="midc">
      <div class="midc_mine">我的订单</div>
      <div class="midc_find" @click="goAllOrderList">查看全部订单</div>
      <div class="midc_im">
          <img src="../../assets/images/qj_1.png">
      </div>
    </div>
    <div class="midd">
      <div @click="goOrderListByStatus(item)" class="item" v-for="item in link_orderList" key="item">
        <div class="box">
          <div class="midd_1_im">
            <div class="midd_1_num" v-show="item.tag != ''" v-html="item.tag"></div>
            <img :src="item.img">
          </div>
          <div class="midd_1_txt" v-html="item.text"></div>
        </div>
      </div>
    </div>
    <footer-bar :type="type"></footer-bar>
    <tips :text="tipsText" :isShowTips="isShowTips"></tips>
  </section>
</template>

<script type="text/ecmascript-6">
  import footerBar from 'base/footer/footer'
  import {userInfo, orderLength} from 'common/js/mock.js'
  import {getUserInfo} from 'api'
  import storage from 'good-storage'
  import tips from 'base/tips/tips'

  const ERR_OK = '1'
  const TAB_ID = '__tabId__'
  const defaultImg = require('../../assets/images/default_head.png')

  export default {
  	data() {
  		return {
        isShowTips: false,
        tipsText: '',
        timer: undefined,
        userInfo: {
          name: '您的昵称',
          iconId: defaultImg
        },
        orderLength: [],
        link_orderList: [
          {
            text: '待付款',
            tag: '',
            tab: 1,
            img: require('../../assets/images/待付款-拷贝-3@2x.png')
          },
          {
            text: '已付款',
            tag: '',
            tab: 2,
            img: require('../../assets/images/已付款-拷贝-2@2x.png')
          },
          {
            text: '退款',
            tag: '',
            tab: 5,
            img: require('../../assets/images/款易2.0-管钱-退款@2x.png')
          }
        ],
        type: '3'
  		}
  	},
    created() {
      getUserInfo().then((res) => {
        console.log(res)
        if (res.code != ERR_OK) {
          this._showTips(res.msg)
          return
        }
        this.userInfo.name = res.userInfo.name
        this.userInfo.iconId = res.userInfo.iconId == ''||!res.userInfo.iconId  ? defaultImg : res.userInfo.iconId
        
        this.link_orderList[0].tag = res.unPayOrderCount ? res.unPayOrderCount : ''
        this.link_orderList[1].tag = res.payOrderCount ? res.payOrderCount : ''
        this.link_orderList[2].tag = res.refundOrderCount ? res.refundOrderCount : ''
      })
    },
  	methods: {
  		goAllOrderList() {
        storage.set(TAB_ID, 0)
        this.$router.push('/orderList')
      },
      goOrderListByStatus(item) {
        storage.set(TAB_ID, item.tab)
        this.$router.push('/orderList')
      },
      goHome() {
        this.$router.push('/home')
      },
      goCustom() {
        this.$router.push('/custom')
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
    components: {
      footerBar,
      tips
    },
    mounted() {

    },
    counted() {

    }
  }
</script>

<style scoped lang="css" rel="stylesheet/css">
  @import './userCenter.css';

  .userCenter{
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 10;
    width: 100%;
    background: #f5f5f5;
  }
</style>