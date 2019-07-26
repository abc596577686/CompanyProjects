 <template>
  <section class="themeContainer">
    <div v-title data-title="详情"></div>
    <div v-stat="{type:'pageview', title:'内页详情'}"></div>

    <div v-show="!showLoading">
      <scroll class="innerPageWrap" ref="innerPage">
        <div>
          <div class="topImgWrap" v-for="img in bannerImg">
            <img :src="img">
          </div>
          <goods-two-columns v-if="goodList.length" :goodsList="goodList" style="overflow:hidden;"></goods-two-columns>
          <div v-else class="good_null_wrapper">
            <img class="good_null" src="../../../../common/images/good_null_default.png">
            <p class="text">暂无商品，去其它栏目看看</p>
          </div>
        </div>
      </scroll>
    </div>
    <transition name="loading">
      <loading v-show="showLoading"></loading>
    </transition>
  </section>
</template>

<script>
  import loading from 'base/loading/loading'
  import Scroll from 'base/scroll/scroll'
  import GoodsTwoColumns from 'components/goodsTwoColumns/goodsTwoColumns'
  import { getInsidePageDetail } from 'api'
  import { mock_insidePageDetail } from 'service/mock'
  import { setJumpUrl } from 'common/js/utils'
  import qs from 'qs'
  import storage from 'good-storage'
  // import sa from 'sa-sdk-javascript';

  const PAGE_ID = 'pageId'

  export default {
    // beforeRouteEnter(to, from, next){
    //   next(vm => {
    //     if (to.path.indexOf('/insidePage') > 0) {
    //       vm.pageId = Number(to.query.pageId);
    //       vm.channelId = Number(to.query.channelId);
    //       console.log(vm.pageId)
    //       console.log(storage.get(PAGE_ID))

    //       if (vm.pageId != storage.get(PAGE_ID)) {
    //         vm._getInsidePageDetail(vm.channelId, vm.pageId)
    //         vm.$nextTick( () => {
    //           vm.$refs.innerPage.scrollTo(0, 0 ,500)
    //         })
            
    //         storage.set(PAGE_ID, vm.pageId)
    //       } else {
    //         vm._getInsidePageDetail(vm.channelId, vm.pageId)
    //       }
    //     }
    //   })
    // },

  	data() {
      return {
        bannerImg: [],
        goodList: [],
        showLoading: false   //显示加载动画
      }
    },
    created() {
      this.channelId = this.$route.query.channelId
      this.pageId = Number(this.$route.query.pageId)
      // console.log(this.pageId)
      // if (this.$route.path.indexOf('/insidePage') > 0) {
      //   if (this.pageId != storage.get(PAGE_ID)) {
      //     this._getInsidePageDetail(this.channelId, this.pageId)
      //     storage.set(PAGE_ID, this.pageId)
      //   }
      // }
      
    },
    mounted() {
      setTimeout(() => {
        this._getInsidePageDetail(this.channelId, this.pageId)
      }, 20)

      // sa.track('$pageview', {
      //   $title: document.title,
      //   $url: location.href,
      //   $url_path: location.pathname,
      //   $referrer_host: location.hostname,
      //   $referrer: document.referrer,
      // })
      // mock 数据
      // this.data = mock_insidePageDetail
      // console.log(this.data);
    },
    methods: {
      _getInsidePageDetail(channelId, pageId) {
        let me = this;
      	let params = qs.stringify({
      		a: 'v1/channelDetail',
      		channelId: channelId,
      		pageId: pageId
      	})

        me.showLoading = true;
        getInsidePageDetail(params).then((res) => {
          console.log(res)
          if (res.code == "1") {
            me.goodList = []
            me.bannerImg = []
            me.showLoading = false;
          	res.list.forEach(item => {
              //banner图
              if (item.type == '0') { 
                me.bannerImg.push(item.picture)
              }

              //商品
              if (item.type == '3') { 
                me.goodList = me.goodList.concat(item.products)
              }
            })

            // 添加跳转链接
            res.list.forEach((good) => {
              good = setJumpUrl(good, channelId)
            })
          }
        })
      }
    },
    components: {
      loading,
      Scroll,
      GoodsTwoColumns
    }
  }
</script>

<style lang="css" scoped>
    .innerPageWrap{
      background: #fff;
      width: 100%;
      overflow: hidden;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
    }
    .topImgWrap{
      width: 100%;
      overflow: hidden;
    }
    .topImgWrap img{
      width: 100%;
      display: block;
    }
    .good_null_wrapper{
      width: 100%;
      margin-top: 2rem;
      text-align: center;
    }
    .good_null_wrapper .good_null{
      width: 4rem;
      display: inline-block;
      margin-bottom: 1rem;
    }
    .good_null_wrapper .text{
      color: #999;
      font-size: .6rem;
    }
    .goodWrap{
      width: 100%;
      display: flex;
      padding: .3rem .2rem;
      border-top: 1px solid #f5f5f5;
    }
    .goodWrap .imgWrap{
      flex: 0 0 3rem;
      height: 4.3rem;
      /*@include imgCenter*/
      overflow: hidden;
		  display: flex;
		  flex-direction:column;
		  justify-content: center;
		  align-items:center;
    }
    .goodWrap .imgWrap img{
      height: 100%;
    }
    .imgWrap .seckillTip{
      position: absolute;
      bottom: .5rem;
      left: .5rem;
      font-size: .2rem;
      padding: 0 .16rem;
      border: .02rem solid #FB4A4C;
      color: #FB4A4C;
      background-color: #ffffff;
    }
    .goodWrap .content{
      font-size: .6rem;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding-left: .5rem;
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
    .salesNumber{
      font-size: 0.46rem;
      color: #999;
    }


</style>
