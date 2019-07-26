<template>
  <section class="error">
    <div v-title data-title="错误"></div>
    <img class="logo" src="../../assets/images/logo.png" alt="">
    <!-- <p class="tips">通通游分销商品访问链接错误</p>
    <p>请联系分销员重新获取</p> -->
    <p class="tips">很抱歉，该链接已失效</p>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {

      }
    }
  }
</script>

<style scoped lang="css" rel="stylesheet/css">
  .error {
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
  .logo {
    width: 4rem;
    display: block;
    margin: 4rem auto 2rem;
  }
  .tips{
    line-height: 2;
    color: #ccc;
  }
</style>