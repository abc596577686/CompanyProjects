<template>
  <section class="distApply">
    <div v-title data-title="申请分销员"></div>
      
    <div class="apply-title">申请成为分销员</div>
    <div class="itemWrap">
      <div class="item">
        <span class="lable">申请人手机号：</span>
        <input type="text" v-model="phone">
      </div>
      <div class="item">
        <span class="lable">申请人姓名：</span>
        <input type="text" v-model="name">
      </div>
      <div class="item">
        <span class="lable">推荐人手机号：</span>
        <input type="text" v-model="referrerPhone">
      </div>
    </div>
    <div class="submitWrap">
      <div class="onputBtn" @click="submitApply">提交申请</div>
    </div>
    </div>
    <tips :text="tipsText" :isShowTips="isShowTips"></tips>
  </section>
</template>

<script type="text/ecmascript-6">
  import storage from 'good-storage'
  import {applyDist} from 'api'
  import tips from 'base/tips/tips'
  import qs from 'qs'

  const ERR_OK = 1
  const SALE_ID = '__saleId__'

  export default {
    data() {
      return {
        isShowTips: false,
        tipsText: '',
        timer: undefined,
        phone: '',
        name: '',
        referrerPhone: '',
        saleId: ''
      }
    },
    created() {
      this.saleId = storage.get(SALE_ID)
    },
    methods: {
      submitApply() {
        let params = qs.stringify({
          saleId: this.saleId,
          phone: this.phone,
          userName: this.name,
          referrerPhone: this.referrerPhone
        })
        applyDist(params).then((res) => {
          console.log(res)
          if (res.code != ERR_OK) {
            this._showTips(`提示: ${res.msg}`)
            return
          }
          this._showTips(res.msg)
          this.$router.push('/applySuccess')
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
    },
    components: {
      tips
    } 
  }
</script>

<style scoped lang="css" rel="stylesheet/css">
  @import './distApply.css';
  .distApply{
    background: #fff;
  }
</style>