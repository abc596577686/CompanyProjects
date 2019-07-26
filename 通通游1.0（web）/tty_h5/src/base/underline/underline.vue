<template>
  <p class="underline" v-html="text"></p>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      text: {
        type: String,
        default: '-- 没有更多了 --'
      }
    },
    data() {
      return {}
    }
  }
</script>

<style scoped lang="css">
  .underline{
    font-size: 0.41rem;
    color: #ccc;
    text-align: center;
    padding-top: -0.51rem;
    display: block;
  }
</style>
