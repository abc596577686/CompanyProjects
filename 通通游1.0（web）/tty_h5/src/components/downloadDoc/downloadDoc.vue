<template>
  <section class="downDocWrap">
    <div v-title :data-title="documentTitle"></div>

    <div class="top">
      <div class="waittopim" @click="back">
        <img src="../../assets/images/icon_back_black.png">
      </div>
      <div class="waittoptit" v-html="documentTitle"></div>
    </div>

    <scroll class="downList">
      <div>
        <div class="item" v-for="item in data">
          <span class="text line-01" v-html="item.itemName"></span>
          <!-- <a :href="item.itemValue" class="downBtn" download="item.itemName">下载</a> -->
          <div @click="godownload(item)" v-if="item.itemName !='' && item.itemName != null">下载</div>
        </div>
      </div>
    </scroll>
  </section>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import storage from 'good-storage'

  const SIGN_INFO = '__singInfo__'  //签约信息
  const GROUP_INFO = '__groupInfo__' //出团通知

  export default {
    data() {
      return {
        documentTitle: '',
        data: []
      }
    },
    created() {
      let type = Number(this.$route.query.type)
      switch(type) {
        case 1:
          this.documentTitle = '签约通知'
          this.data = storage.get(SIGN_INFO)
          break
        case 2:
          this.documentTitle = '出团通知'
          this.data = storage.get(GROUP_INFO)
          break
      }
    },
    mounted(){
      console.log()
    },
    methods: {
      back() {
        this.$router.goBack()
      },
      godownload(item){
        window.location.replace(item.itemValue)
      }
    },
    components: {
      Scroll
    }
  }
</script>

<style scoped lang="css" rel="stylesheet/css">
  .downDocWrap {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: #f5f5f5;
  }
  .downList {
    position: absolute;
    top: 1.877333rem;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    border-bottom: 1px solid #f5f5f5;
  }
  .item {
    height: 2rem;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    padding: .3rem 1rem;
    line-height: 2;
    border-bottom: 1px solid #f5f5f5;
    background: #fff;
  }
  .item span{
    /*display: block;*/
  }
  .downBtn{
    color: blue;
    flex: 0 0 2rem;
    text-align: right;
  }
.top{
    width: 100%;
    height: 1.877333rem;
    background-color: #fff;
    position: relative;
    border-bottom: 1px solid #f5f5f5;
}
.waittopim{
    width: .469333rem;
    height: .853333rem;
    position: absolute;
    left: .64rem;
    top: .64rem;
}
.waittopim img{
    width: 100%;
    height: 100%;
    display: block;
}
.waittoptit{
    width: 3.2rem;
    height: .853333rem;
    line-height: .853333rem;
    position: absolute;
    font-size: .725333rem;
    color: #333333;
    left: 6.570667rem;
    top: .768rem
}
</style>