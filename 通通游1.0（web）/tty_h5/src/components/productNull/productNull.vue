<template>
  <section class="productNull">
    <div v-title data-title="产品已下架"></div>
    <p class="tips">亲，此产品已下架</p>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {

      }
    },
    methods: {
      
    }
  }
</script>

<style scoped lang="css" rel="stylesheet/css">
  .productNull {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: #f5f5f5;
    box-sizing: border-box;
    padding: 1rem;
    font-size: 13px;
    text-align: center;
  }
  .tips{
    position: absolute;
    width: 100%;
    top: 20%;
    text-align: center;
    font-size: 13px;
    color: #ccc;
  }
</style>