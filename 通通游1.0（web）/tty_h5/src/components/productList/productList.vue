<template>
  <transition name="fade">
    <section class="productList">
      <div v-title :data-title="documentTitle"></div>
    	<!-- <p>产品列表</p>
      <button @click="back">返回</button>
      <button @click="goProductDetails">查看产品详情</button> -->
      <div class="toptit">
        <span v-html="documentTitle"></span>
        <span class="topim1" @click="back">
          <img src="../../assets/images/icon_back_white.png" style="width：100%;height:100%;display:block;">
        </span>
        <span class="topim2" @click="goSearch">
          <img src="../../assets/images/icon_search_white.png" style="width：100%;height:100%;display:block;">
        </span>
      </div>
      <scroll class="productList scrollWrap"
        :pullup="pullup"
        :pulldown="pulldown"
        :beforeScroll="beforeScroll"
        @beforeScroll="listScroll"
        @scrollToEnd="loadMore"
        @pulldown="refreshData">
        <div>
          <router-link class="project" v-for="good in productList" key="pro" :to='{path: "/productDetails", query:{productId: good.productId, saleId: saleId}}'>
            <div class="mainPro">
              <div class="imgWrap">
                <img :src="good.imgUrl" alt="">
                <span class="supplier" v-html="good.supName"></span>
              </div>
              <span class="mptitle">{{good.title}}</span>
              <span class="goTime line-01">最近出发 {{good.calDate}}</span>
              <span class="pay">￥{{good.lowestAdultPrice}} 起</span>
            </div>
          </router-link>
          <p v-show="isShowMoreLoading"><img width="24" height="24" src="../../assets/images/loading.gif" class="loadImg"></p>
          <p class="noMore" v-show="noMore">没有更多</p>
          <p class="noMore" v-show="noProductList">暂无旅游产品信息</p>
        </div>
      </scroll>
      <tips :text="tipsText" :isShowTips="isShowTips"></tips>
    </section>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import tips from 'base/tips/tips'
  import { getProductList } from 'api'
  import qs from 'qs'
  import storage from 'good-storage'

  const ERR_OK = '1'
  const IDS = '__IDS__'
  const SALE_ID = '__saleId__'
  const PRODUCT_TYPE = '__productType__'
  const DOCUMENT_TITLE = '__documentTitle__'

  let page = 1
  const rows = 20

  const defaultImg = require('../../assets/images/default_productDetail_banner.png')

  export default {
  	data() {
  		return {
        noMore: false,
        noProductList: false,
        pullup: true,
        pulldown: true,
        beforeScroll: true,
        isShowMoreLoading: false,
        hasMore: true,
        saleId: '',
        isShowTips: false,
        tipsText: '',
        timer: undefined,
        documentTitle: '热门',
        productListId: '',
        productList: [],
        selectType: '',
        renderTitle: true
  		}
  	},
    created() {
      // 初始化页码
      page = 1
      console.log('当前页码：' + page)
      storage.set(PRODUCT_TYPE, this.$route.query.selectType)
      this.selectType = this.$route.query.selectType
      this._changeDocumentTitle(this.selectType)

      this.saleId = storage.get(SALE_ID)
    },
  	methods: {
      refreshData() {
        console.log('-------可以刷新')
      },
      listScroll() {
        console.log('beforeScroll')
      },
      loadMore() {
        if (!this.hasMore) {
          console.log('没有了')
          return
        }
        page++
        console.log('开始加载……')
        this._getProductList()
      },
  		back() {
        this.$router.back()
      },
      goSearch() {
        this.$router.push('/search?type=0')
      },
      _changeDocumentTitle(selectType) {
        console.log(selectType)
        selectType = Number(selectType)
        switch(selectType) {
          case 3:
            this.documentTitle = '热门'
            break
          case 4:
            this.documentTitle = '爆款'
            break
          case 5:
            document.title = '高返佣'
            break
        }
        storage.set(DOCUMENT_TITLE, document.title)
      },
      _getProductList() {
        let params = qs.stringify({
          saleId: this.saleId,
          electType: this.selectType,
          page: page,
          rows: rows
        });
        
        this.noMore = false
        this.isShowMoreLoading = true
        getProductList(params).then((res) => {
          this.isShowMoreLoading = false
          console.log(res)
          if (res.code != ERR_OK) {
            this._showTips(res.msg)
            return
          }

          this.noMore = false
          this.noProductList = false
          let productList = res.productList
          if(productList.length > 0){
            productList.forEach((item) => {
              if (item.imgUrl == '' || !item.imgUrl) {
                item.imgUrl = defaultImg
              }
            })
            this.productList = this.productList.concat(this._genResult(productList))
            this._checkMore(res.productList)
          }else{
            if(this.productList.length == 0){
              this.noProductList = true
            }else{
              this.noMore = true
            }
          }
        })
      },
      _genResult(data) {
        let ret = []
        ret = ret.concat(data)
        return ret
      },
      _checkMore(data) {
        if (!data.length || page >= Number(data.total)/rows) {
          this.hasMore = false
        }
      },
      _showTips(text) {
        if (this.timer) return
        this.isShowTips = true
        this.tipsText = text
        this.timer = setTimeout(() => {
          this.isShowTips = false
          this.timer = undefined
          clearTimeout(this.timer)
        }, 1600)
      },
  	},
    mounted() {
      this._getProductList()
    },  
    components: {
      Scroll,
      tips
    }
  }
</script>

<style scoped lang="css" rel="stylesheet/css">
  @import './productList.css';
  /*.contentWrap{
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
  }*/
  .loadImg{
    width: 50px;
    height: 50px;
    display: block;
    margin: 1rem auto;
    margin-top: 150px;
  }
  .noMore{
    text-align: center;
    font-size: 0.6rem;
    margin: 1rem auto;
    color: #666;
  }
  .productList{
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 10;
    width: 100%;
    background: #f5f5f5;
  }
</style>