 <template>
  <div class="goodsListWrap" ref="goodsList">
    <router-link tag="div" :to="good.jumpUrl" class="productWrap" v-for="good in goodsList" :key="good.title">
      <div class="goodWrap">
        <div class="imgWrap">
          <img v-lazy="good.imageUrl">
          <div v-if="good.isSeckillProduct == 1" class="seckillTip">限时购</div>
        </div>
        <div class="productDesc">
          <p class="text" v-html="good.productName"></p>
        </div>
        <p class="price" v-html="`¥ ${good.price}`"></p>
      </div>
    </router-link>
  </div>
</template>

<script>

  export default {
    props: {
      goodsList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        jumpUrl: ''
      }
    },
    mounted(){
      // setTimeout(()=>{
        console.log(this.goodsList)
      // }, 20)
    },
    methods: {

    },
    components: {
    }
  }
</script>

<style lang="css" scoped>
  /*@import 'src/style/mixin';*/
  .goodsListWrap{
    width: 100%;
    background: #fff;
  }
  .productWrap{
    width: 50%;
    background: #f5f5f5;
    padding: .1rem;
    float: left;
  }
  .goodWrap{
    background: #fff;
    padding: .3rem;
  }
  .goodWrap .imgWrap{
    width: 100%;
    height: 7.1rem;
    /*@include imgCenter;*/
    overflow: hidden;
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items:center;
    position: relative;
  }
  .goodWrap .imgWrap img{
    display: block;
    width: 100%;
  }
  .imgWrap .seckillTip{
    position: absolute;
    bottom: 0;
    left: 0;
    font-size: .5rem;
    padding: 0 .16rem;
    border: .02rem solid #FB4A4C;
    color: #FB4A4C;
    background-color: #ffffff;
  }
  .goodWrap .productDesc{
    overflow: hidden;
    margin-top: .3rem;
  }
  .goodWrap .productDesc .text{
    font-size: .56rem;
    overflow:hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /* autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
    word-break: break-all;
    text-overflow: ellipsis;
    height: 1.42rem;
    line-height: 1.3;
  }
  .goodWrap .price{
    margin-top: .3rem;
    font-size: 18px;
    color: #FB4A4C;
  }
</style>
