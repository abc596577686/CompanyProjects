<template>
    <div class="themeDetail">
      <div></div>
      <div class="title">
        <!-- <h3 class="text" v-html="theme.specialName"></h3> -->
        <img :src="theme.picture">
      </div>
      <div class="productList">
        <div class="productWrap" v-for="product in theme.products">
          <router-link tag="div" :to="product.jumpUrl" class="product">
            <div class="imgWrap">
              <img v-lazy="product.imageUrl">
              <div v-if="product.isSeckillProduct == 1" class="seckillTip">限时购</div>
            </div>
            <div class="productDesc">
              <p class="text" v-html="product.productName"></p>
            </div>
            <p class="price" v-html="`¥ ${product.price}`"></p>
          </router-link>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">

  export default {
    props: {
      theme: {
        type: Object,
        default: {}
      }
    },
    computed: {
      data() {
        return this.theme
      }
    },
    data() {
      return {
        
      }
    },
    created() {
      // console.log(this.theme)
    },
    methods: {

    },
    components: {

    }
  }
</script>

<style lang='css' scoped>
    .title{
      width: 100%;
      /*padding: .5rem 0;*/
      background: #fff;
      text-align: center;
      border-top: 1px solid #f5f5f5;
    }
    .title img{
      display: block;
      width: 100%;
    }
    .title .text{
      font-size: 1rem;
      font-style: normal;
      font-weight: normal;
    }
    .productList{
      overflow: hidden;
      padding: .1rem;
      background: #f5f5f5;
    }
    .productWrap{
      width: 50%;
      background: #f5f5f5;
      padding: .1rem;
      float: left;
    }
    .product{
      background: #fff;
      padding: .3rem;
    }
    .product .imgWrap{
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
    .product .imgWrap img{
      display: block;
      width: 100%;
    }
    .product .imgWrap .seckillTip{
      position: absolute;
      bottom: 0rem;
      left: 0rem;
      font-size: .2rem;
      padding: 0 .16rem;
      border: .02rem solid #FB4A4C;
      color: #FB4A4C;
      background-color: #ffffff;
    }
    .product .productDesc{
      /*height: 1.46rem;*/
      margin-top: .3rem;
    }
    .product .productDesc .text{
      font-size: .6rem;
      /*@include line-2;*/
      overflow:hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: break-all;
      text-overflow: ellipsis;
      height: 1.6rem;
    }
    .product .price{
      margin-top: .3rem;
      font-size: 18px;
      color: #FB4A4C;
    }
</style>
