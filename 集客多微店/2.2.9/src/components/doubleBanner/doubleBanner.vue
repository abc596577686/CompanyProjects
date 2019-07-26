 <template>
  <div class="bannerWrap" ref="goodsNavList">
    <div class="imgWrap" v-for="item in doubleBanner">
      <router-link tag="div" :to="item.jumpUrl">
        <img v-lazy="item.pictureIcon">
      </router-link>
    </div>
  </div>
</template>

<script>

  export default {
    props: {
      doubleBanner: {
        type: Array,
        default: () => []
      }
    },
    mounted(){
      // setTimeout(()=>{
        // console.log(this.doubleBanner)
      // }, 20)
    },
    methods: {

    },
    components: {
    }
  }
</script>

<style lang="css" scoped>
  .bannerWrap{
    width: 100%;
    overflow: hidden;
  }
  .imgWrap{
    float: left;
    width: 50%;
    display: block;
    height: auto;
  }
  .imgWrap:nth-child(2n+1) {
    padding-right: 0.2rem;
  }
  .imgWrap:nth-child(2n) {
    padding-left: 0.2rem;
  }
  .bannerWrap img{
    width: 100%;
  }
</style>
