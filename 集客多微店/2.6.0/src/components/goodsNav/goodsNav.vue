 <template>
  <div class="goodsNavWrapper" ref="goodsNavList">
    <div class="nav" v-for="nav in goodsNavList">
      <router-link tag="div" :to="nav.jumpUrl">
        <div class="img">
          <img v-lazy="nav.pictureIcon">
        </div>
      </router-link>
      <p class="text" v-html="nav.navigationName"></p>
    </div>
  </div>
</template>

<script>
  
  export default {
    props: {
      goodsNavList: {
        type: Array,
        default: false
      }
    },
	  data(){
      return{
          
      }
    },
    mounted(){
      setTimeout(()=>{
        console.log(this.goodsNavList)
      }, 20)
    },
    methods: {

    },
    components: {
    }
  }
</script>

<style lang="css" scoped>
  .goodsNavWrapper {
    width: 100%;
    overflow: hidden;
    padding: 0.1rem 0.63rem;
    background: #fff;
  }
  .goodsNavWrapper .nav{
    width: 3.66rem;
    float: left;
    display: inline-block;
    font-size: 0.51rem;
    color: #333;
    text-align: center;
    margin-top: 0.43rem;
    padding: .2rem;
    /*@include center;*/
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .goodsNavWrapper .img{
    width: 2.6rem;
    height: 2.6rem;
    border-radius: 100%;
    overflow: hidden;
    display: inline-block;
    margin-bottom: 0.13rem;
  }
  .goodsNavWrapper .img img{
    height: 100%;
  }
  .goodsNavWrapper .text{
    display: block;
    width: 100%;
    overflow:hidden;
    /*display: -webkit-box;
    -webkit-line-clamp: 1;*/
    /* autoprefixer: off */
    /*-webkit-box-orient: vertical;*/
    /* autoprefixer: on */
    /*word-break: break-all;
    text-overflow: ellipsis;*/
  }
</style>
