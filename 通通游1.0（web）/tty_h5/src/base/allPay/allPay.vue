<template>
  <section class="allPay">
    <!-- <div v-title data-title="demo"></div> -->
    <div class="allpay">
        <div class="total">总金额</div>
        <div class="totali">{{total}}</div> 
        <div class="tottit">费用说明</div> 
        <div class="tottiti">{{realamount}}</div> 
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        total:'',
        realamount:''
      }
    },
    methods: {
      
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .allpay{
      width: 16rem;
      height: 3.456rem;
      background-color: #fff;
      position: relative;
  }
  .total{
      width: 2.773333rem;
      height: 1.066667rem;
      line-height: .768rem;
      position: absolute;
      left: .512rem;
      top: 1.109333rem;
      font-size: .768rem;
      color: #666666;
  }
  .totali{
      width: 2.986667rem;
      height: .853333rem;
      line-height: .768rem;
      position: absolute;
      left: 12.3rem;
      top: 1.194667rem;
      font-size:.768rem;
      color: #FB4A4C;
  }
  .tottit{
      width: 2.773333rem;
      height: 1.066667rem;
      line-height: .512rem;
      position: absolute;
      left: .55rem;
      top: 2.432rem;
      font-size: .512rem;
      color: #FB4A4C;
  }
  .tottiti{
      width: 5.12rem;
      height: .853333rem;
      line-height: .768rem;
      position: absolute;
      left: 11.093333rem;
      top: 2.389333rem;
      font-size: .512rem;
      color: #666666;
  }
</style>