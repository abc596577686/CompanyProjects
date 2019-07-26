<template>
  <section class="refundReasons">
    <div v-title data-title="退款"></div>
  	<p>退款申请提交成功</p>
    <button @click="goRefundProgress">查看退款详情</button>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {
  	data() {
  		return {

  		}
  	},
  	methods: {
      goRefundProgress() {
        this.$router.push('/refundProgress')
      }  		
  	}
  }
</script>

<style scoped lang="css" rel="stylesheet/css">
</style>