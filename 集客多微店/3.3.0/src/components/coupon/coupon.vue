 <template>
  <div class="couponWrap">
    <div v-title data-title="优惠券"></div>
    <div v-stat="{type:'pageview', title:'优惠券'}"></div>
    
    <!-- <static-nav ref="navBar" :navList="navList" :curSelectIndex="curSelectIndex" @changeNavBar="changeNavBar" :coupon="coupon"></static-nav> -->
    <div class="toptit" >
      <span v-for="(data,index) in navList" :class="{iscc:index==isAc}" @click="showac(index)">{{data.channelName}}</span>
    </div>
    <div class="couponListWrap">
      <content-slide ref="slideContent" :autoPlay="false" :loop="false" @changeSlideIndex="changeSlideIndex" @pausePlay="pausePlay" @startPlay="startPlay">
        <div class="useCoupon slideItem">
          <div class="item" v-if="useCouponList.length" v-for="(item, index) in useCouponList" @click="selectCouponEnv(item,index)" :class="{'selected': curSelectItem == index || curUseCouponId == item.userCouponId}">
            <div class="labelWrap">
              <span>¥<em class="price" v-html="item.giveAmount"></em></span>
              <p class="tips">满 <em v-html="item.fullAmount"></em> 使用</p>
            </div>
            <div class="contentDesc">
              <div class="top">
                <span class="type" v-html="item.typeName"></span>
                <span class="name" v-html="item.couponName"></span>
              </div>
              <div class="bottom">
                <p class="effectiveTime" v-html="item.effectiveTimeFormat"></p>
              </div>
            </div>
            <div class="selectTag"></div>
          </div>
          <div v-if="!useCouponList.length" class="noMore">无可使用优惠券</div>
        </div>
        <div class="unUseCoupon slideItem">
          <div class="item" v-if="unUseCouponList.length" v-for="item in unUseCouponList">
            <div class="labelWrap">
              <span>¥<em class="price" v-html="item.giveAmount"></em></span>
              <p class="tips">满 <em v-html="item.fullAmount"></em> 使用</p>
            </div>
            <div class="contentDesc">
              <div class="top">
                <span class="type" v-html="item.typeName"></span>
                <span class="name" v-html="item.couponName"></span>
              </div>
              <div class="bottom">
                <p class="effectiveTime" v-html="item.effectiveTimeFormat"></p>
              </div>
            </div>
            <div class="selectTag"></div>
          </div>
          <div v-if="!unUseCouponList.length" class="noMore">无不可使用优惠券</div>
        </div>
      </content-slide>
    </div>
    <div class="noCouponWrap">
      <p class="noUse" @click="noUseEnv()">不使用优惠券</p>
    </div>
  </div>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import StaticNav from 'components/staticNav/staticNav'
  import ContentSlide from 'components/slide_content/slide_content'
  import { getCouponList } from 'api'
  import { mock_coupon } from 'service/mock'
  import qs from 'qs'
  import storage from 'good-storage'

  const ERR_OK = '1'
  const COUPON_DETAIL = 'couponDetail'
  const COUPON_ID = 'couponId'
  const COUPON_NAME = 'couponName'
  const COUPON_AMOUNT = 'couponAmount'
  const COUPONS = 'coupons'

  export default {
  	data(){
      return{
        items: 30,

        beforeScroll: true,
        listenScroll: true,
        probeType: 3,

        coupon: true,
        navList: [{
          id: 0,
          channelName: '可使用优惠券'
        },
        {
          id: 1,
          channelName: '不可使用优惠券'
        }],
        curSelectIndex: 0,

        unUseCouponList: [],
        useCouponList: [],
        curSelectItem: null,
        curUseCouponId: '',
        isAc:0,
        // changeSlideIndex:0,
      }
    },
    created() {
      // this.productId = this.$route.query.productId; //产品id
      // this.postType = this.$route.query.postType;  //请求方式 0:立即下单
      // this.number = this.$route.query.number; //购买数量
      // this.curUseCouponId = this.$route.query.useCouponId; //优惠券id
      // this._getCouponList()

      
    },
    mounted() {
      setTimeout(() => {
        this.useCouponId = this.$route.query.useCouponId
        this.coupons = storage.get(COUPONS)
        this.useCouponList = this.coupons.availableCouponList;
        this.unUseCouponList = this.coupons.unavailableCouponList;
        
        // 默认选中
        this.useCouponList.forEach((item, index) => {
          if (item.userCouponId == this.useCouponId) {
            this.curSelectItem = index
          }
        })
        
      }, 20)
    },
    methods: {
      changeNavBar(curIndex) {
        console.log(curIndex)
        this.$refs.slideContent.scrollTo(curIndex)
      },
      pausePlay(){

      },
      startPlay(){

      },
      changeSlideIndex(curIndex) {
        console.log(curIndex)
        // this.$refs.navBar.changeCurrentIndex(curIndex)
        // this.$refs.slideContent.scrollTo(curIndex)
        this.isAc = curIndex
        this.$refs.slideContent.scrollTo(curIndex)
        
      },
      noUseEnv() {
        storage.set(COUPON_ID, '-1')
        this.$router.go(-1)
      },
      selectCouponEnv(item,index) {
        this.curSelectItem = index
        console.log('当前优惠券:')
        console.log(item)
        
        storage.set(COUPON_ID, Number(item.userCouponId))
        storage.set(COUPON_NAME, Number(item.couponName))
        storage.set(COUPON_AMOUNT, Number(item.giveAmount))

        this.$router.go(-1)
        
      },
      _getCouponList() {
        let params = qs.stringify({
          a: 'v1/orderCheckDetail',
          productId: this.productId,
          postType: this.postType,
          number: this.number
        })
        getCouponList(params).then((res) => {
          if (res.code == ERR_OK) {
            console.log('优惠券----')
            console.log(res)

            let data = res;
            this.unUseCouponList = data.coupon.unavailableCouponList;
            this.useCouponList = data.coupon.availableCouponList;

            console.log(mock_coupon)
          }
        })
      },
      showac(index){
          this.isAc = index
          this.$refs.slideContent.scrollTo(index)
      }
    },
    watch:{
      UseCouponList(newValue, oldValue){
        console.log(newValue)
      }
    },
    components: {
      Scroll,
      StaticNav,
      ContentSlide
    }
  }

</script>

<style lang="css" scoped>
  .noCouponWrap{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    padding: .3rem 0;
    text-align: center;
    background: #fff;
  }
  .noUse{
    display: inline-block;
    padding: .2rem;
    width: 86%;
    font-size: .6rem;
    border-radius: .4rem;
    border: 1px solid #f02f39;
    color :#f02f39;
  }
  .couponListWrap{
    position: absolute;
    left: 0;
    width: 100%;
    top: 1.9rem ;
    bottom: 2.2rem;
    background: #e6e6e6;
  }
  .slideItem{
    float: left;
    height: auto;
    overflow: auto !important;
    padding: 0 .5rem;
  }
  .slideItem .item{
    padding: .8rem;
    background: #fff;
    border-radius: .3rem;
    margin-top: .3rem;
    overflow: hidden;
    position: relative;
  }
  .useCoupon .item {
    background: #fff;
  }
  .unUseCoupon .item {
    background: #ccc;
  }
  .unUseCoupon .effectiveTime{
    color: #000;
  }
  .slideItem .item:after{
    position: absolute;
    content: '';
    top: 50%;
    margin-top: -.4rem;
    right: -.35rem;
    padding: .5rem;
    background: #e6e6e6;
    border-radius: 100%;
  }
  .slideItem .item:before{
    position: absolute;
    content: '';
    top: 50%;
    margin-top: -.4rem;
    left: -.35rem;
    padding: .5rem;
    background: #e6e6e6;
    border-radius: 100%;
  }
  .slideItem .item .selectTag{
    display: none;
    color: #fff;
    font-size: 1rem;
  }
  .slideItem .item.selected .selectTag{
    display: block;
    background: #f02f39;
    width: 5rem;
    height: 4rem;
    position: absolute;
    top: -3rem;
    right: -2.5rem;
    -webkit-transform: rotate(-45deg);
    transform: rotate(35deg);
  }
  .labelWrap{
    display: inline-block;
    font-size: .55rem;
    color: #f02f39;
    float: left;
    margin-right: .8rem;
  }
  .labelWrap .price{
    font-size: 1.3rem;
  }
  .labelWrap .tips{
    color: #333;
    font-size: .5rem;
  }
  .labelWrap em{
     font-style: normal;
  }
  .contentDesc{
    display: inline-block;
    float: left;
    font-size: .7rem;
  }
  .contentDesc .type{
    display: inline-block;
    padding: .1rem .2rem;
    color: #fff;
    background: #f02f39;
    font-size: .55rem;
  }
  .contentDesc .name{
    font-size: .6rem;
    display: inline-block;
    vertical-align: middle;
  }
  .contentDesc .bottom{
    margin-top: .8rem;
    font-size: .55rem;
    color: #ccc;
  }
  .noMore{
    text-align: center;
    font-size: .6rem;
    color :#ccc;
    margin-top: 3rem;
  }
  .toptit{
    width: 100%;
    height:1.877333rem;
    background-color: #fff;
    font-size: 0;
}
.toptit > span{
    margin-left: 1.1rem;
    /* margin-right: .6rem; */
    display: inline-block;
    font-size: .6rem;
    width: 40%;
    height: 1.7rem;
    text-align: center;
    line-height: 1.7rem;
}
.couponlist{
    width: 100%;
    /* padding-top: .554667rem; */
    padding-left: .554667rem;
}
.list{
    width: 14.933333rem;
    height: 4.821333rem;
    background-color: #fff;
    margin-top: .554667rem;
    position: relative;
    overflow: hidden;
}
.priceimg{
    width: .55rem;
    height: .55rem;
    color: #FB4A4C;
    position: absolute;
    left: .810667rem;
    top: 1.3rem;
    text-align: center;
    line-height:.5rem;
    font-size: .55rem;
}
  .iscc{
        font-weight: bold;
        color: #FB4A4C;
        border-bottom:.1rem solid #FB4A4C;
    }
</style>
