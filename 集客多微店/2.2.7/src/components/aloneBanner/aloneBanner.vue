 <template>
  <div class="bannerWrap" ref="goodsNavList">
    <div>
      <router-link tag="div" :to="aloneBanner.contents[0].jumpUrl">
        <img :src="aloneBanner.picture">
      </router-link>
    </div>
  </div>
</template>

<script>
  import { rootPath } from 'config/env'
  
  export default {
    props: {
      aloneBanner: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        jumpUrl: ''
      }
    },
    mounted(){
      setTimeout(()=>{
        // console.log(this.aloneBanner)
      }, 20)
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
  }
  .bannerWrap img{
    width: 100%;
    display: block;
  }
</style>
