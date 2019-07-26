<template>
  <section class="demo">
    <div v-title data-title="赚钱很辛苦"></div>
    <h4 class="tltle">赚钱很辛苦</h4>
    <h5 class="subTitle">那是你方法有问题</h5>
    <div class="item">
      <div class="imgWrap" style="margin-right: 20px;">
        <img src="../../assets/images/img_distApply_left.png" alt="">
      </div>
      <div class="textWrap">
        <p class="text">零成本成为分销员，动动手指就赚钱，只需将高品质的旅游线路分享给别人，就能挣到属于自己的利润</p>  
      </div>
    </div>
    <div class="item">
      <div class="textWrap">
        <p class="tips">这样加入我们：</p>
        <p class="text">选择“申请加入分销员”，即刻自动通过审批，下载APP</p>  
      </div>
      <div class="imgWrap" style="margin-left: 20px;">
        <img src="../../assets/images/img_distApply_right.png" alt="">
      </div>
    </div>
    <div class="applyIntoWrap">
      <div class="applyInto" @click="goDistApply">申请成为分销员</div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import storage from 'good-storage'

  const IDS = '__IDS__'
  const SALE_ID = '__saleId__'

  export default {
    data() {
      return {

      }
    },
    created() {
      let saleId = this._getQueryString('saleId')
      if (saleId) {
        storage.set(SALE_ID, saleId)
      }
    },
    methods: {
      goDistApply() {
        this.$router.push('/distApply')
      },
      _getQueryString(name) {
        var reg = new RegExp("(^|)" + name + "=([^&]*)(&|$)", "i")
        var r = window.location.href.substr(1).match(reg)
        if (r != null) return unescape(r[2])
        return null
      },
    }
  }
</script>

<style scoped lang="css" rel="stylesheet/css">
  @import './distAdvert.css';
</style>