<template>
  <div class="loading">
    <img width="50" height="50" src="./loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '正在载入...'
      }
    },
    data() {
      return {}
    }
  }
</script>

<style scoped lang="css">
  .loading {
    width: 100%;
    text-align: center;
    z-index: 10;
    font-size: 13px;
    color: #666;
    position: absolute
  }
  .desc {
    line-height: 1.8;
    font-size: 12px;
    color: #666;
  }
</style>
