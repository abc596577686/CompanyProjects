 <template>
  <div class="goodsListWrap" ref="goodsList">
    <router-link tag="div" :to="good.jumpUrl" class="goodWrap" v-for="good in goodsList" :key="good.title">
      <div class="imgWrap">
        <img  v-lazy="good.imageUrl">
        <div v-if="good.isSeckillProduct == 1" class="seckillTip">限时购</div>
      </div>
      <div class="detailsWrap">
        <p class="goodName" v-html="good.productName"></p>
        <p class="price" v-html="`¥${good.price}`"></p>
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
      //   console.log(this.goodsList)
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
  .goodWrap{
    display: flex;
    padding: .3rem .2rem;
    border-top: 1px solid #f5f5f5;
  }
  .imgWrap{
    flex: 0 0 5rem;
    height: 4.3rem;
    /*@include imgCenter*/
    overflow: hidden;
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items:center;
  }
  .imgWrap img{
    height: 100%;
  }
  .imgWrap .seckillTip{
    position: absolute;
    bottom: 0;
    left: 0;
    font-size: .2rem;
    padding: 0 .16rem;
    border: .02rem solid #FB4A4C;
    color: #FB4A4C;
    background-color: #ffffff;
  }
  .goodWrap .detailsWrap{
    font-size: .6rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-left: .3rem;
  }
  .goodName{
    overflow:hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /* autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
    word-break: break-all;
    text-overflow: ellipsis;
    height: 1.8rem;
    overflow: hidden;
  }
  .price{
    margin-top: .2rem;
    font-size: .66rem;
    color: #FB4A4C;
  }
</style>
