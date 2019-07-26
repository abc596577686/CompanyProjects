<template>
  <div id="app">
    <div class="swiper-wrapper">
      <swiper :options="swiperOption" class="swiper-box">
        <swiper-slide class="swiper-item" v-for="goodImg in goods.goodImgs" key="goodImg">
          <img :src="goodImg.url" alt="">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <!--产品名称  -->
    <div class="proName">
      <p v-html="goods.title"></p>
    </div>
    <!--供应商  -->
    <div class="supp">
      <div class="supNa" v-html="goods.supName"></div>
    </div> 
    <!--价格  -->
    <div class="pri">
      <!--暂用价格 后面换字段  -->
      <div class="price" v-html="goods.salePrice"></div>
      <span class="price1">起</span>
      <span class="priceSub">
        <img :src="icon.icon_more" alt="error" style="width:100%;height:100%;display:block;">
      </span>
    </div> 
    <!--装饰线  -->
    <span class="gte"></span>
    <div class="goind">
      <span class="goind_img">
        <img :src="icon.icon_flag" alt="error" style="width:100%;height:100%;display:block;">
      </span>
      <span class="goind_goin">出发城市</span>
      <span class="goind_place" v-html="goods.departPlace"></span>
    </div> 
    <!--出发时间  -->
    <div class="gotime">
      <div class="gotimediv">
        <span class="gotimedate">10/07</span>
        <span class="gotimepay">￥4599</span>
      </div>
      <div class="gotimediv">
        <span class="gotimedate">10/07</span>
        <span class="gotimepay">￥4599</span>
      </div>
      <div class="gotimediv">
        <span class="gotimedate">10/07</span>
        <span class="gotimepay">￥4599</span>
      </div>
      <div class="gotimediv">
        <span class="gotimedate">10/07</span>
        <span class="gotimepay">￥4599</span>
      </div>
      <div class="gotimediv1">
        <span class="gtd_img">
          <img :src="icon.icon_calendar" style="width:100%;height:100%;display:block;">
        </span>
        <span class="gtd_more">
          更多日期
        </span>
      </div>
    </div>
    <span class="gte"></span>
    <div class="controltip">    
      <div 
        v-for="(item, $index) in goods.items"  
        @click="selectStyle(item, $index)"
        :class="{'active':item.active || item.autoActive,'unactive':!item.active}"
        v-html="item.select">
      </div>
    </div>
    <span class="gte"></span>
    <div class="maidian">产品卖点</div>
    <div class="localmain" v-html="goods.localmain"></div>

  </div>
</template>

<script type="text/ecmascript-6">
  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  import {getGoodsDetails} from 'api';
  import qs from 'qs';

  const GOODS = {
    goodImgs: [
      {url: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=927713672,3398572521&fm=173&s=69D7478FC9010ACEC61978890300F003&w=550&h=334&img.JPG'},
      {url: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=927713672,3398572521&fm=173&s=69D7478FC9010ACEC61978890300F003&w=550&h=334&img.JPG'}
    ],
    title: '泰国-曼谷-芭提雅-沙美岛7或8日游>10年经典，直飞，无自费，入驻4晚国际5星酒店，1或2晚沙美岛度假村',
    supName: '凯撒旅游',
    salePrice: '998.00',
    departPlace: '上海',
    items: [
      {select:'路线详情', autoActive:true},
      {select:'签证信息'},
      {select:'费用说明'},
      {select:'预定须知'}
    ],
    localmain: '欧洲经典三国游览，品尝意式特色餐，入内卢浮宫'
  }
  
  export default {
    data() {
      return {
        swiperOption: {
          pagination: '.swiper-pagination',
          direction: 'horizontal',
          slidesPerView: 1,
          paginationClickable: true,
          spaceBetween: 30,
          mousewheelControl: true,
          autoplay: 3600,
          loop: true
        },
        icon: {
          icon_more: require('./assets/icon_more.png'),
          icon_flag: require('./assets/icon_flag.png'),
          icon_calendar: require('./assets/icon_calendar.png')
        }
        
      }
    },
    created() {
      this.goods = GOODS
      let params = qs.stringify({
        distId: 'jkd',
        platId: 'tty',
        productId: '61D4E08349754132B05132311216EA9F'
      });
      getGoodsDetails(params).then((res) => {
        console.log(res);
        
      })
    },
    components: {
      swiper,
      swiperSlide
    },
    mounted() {}
  }
</script>

<style>
  *{margin:0; padding:0; box-sizing:border-box;}
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  .swiper-wrapper{
    min-height: 260px;
  }
  .lunboimg{
    width: 100%;
    height: 7.808rem;
    position: relative;
  }
  .proName{
    width: 100%;
    height: 2.858667rem;
    font-size: .597333rem;
    color: #333333;
    padding-top: .256rem; 
    padding-left: .597333rem; 
    padding-right: .597333rem; 
    background-color: #fff;
  }
  .supp{
    width: 100%;
    height: .810667rem;
    background-color: #fff;
  }
  .supNa{
    width: 2.688rem;
    height: .810667rem;
    color: #008ee5;
    font-size: .512rem;
    border: .042667rem solid #008ee5;
    border-radius: .128rem .128rem .128rem .128rem;
    text-align: center;
    line-height: .810667rem;
    position: relative;
    left: .597333rem;
  }
  .pri{
    width: 100%;
    height: 1.28rem;
    position: relative;
    background-color: #fff;
  }
   .price{
      width: 2.986667rem;
      height: .768rem;
      line-height: .768rem;
      font-size: .682667rem;
      color: #fb4a4c;
      position: absolute;
      left: .597333rem;
      top: .384rem;
  }
   .price1{
      display: block;
      width: 2.986667rem;
      height: .768rem;
      font-size: 12px;
      color:#666666;
      position: absolute;
      left: 2.82667rem; 
      top: .554667rem;  
  }
  .priceSub{
      display: block;
      width: .554667rem;
      height: .554667rem;
      position: absolute;
      left: 3.712rem;
      top: .554667rem;
  }
  .gte{
      width: 100%;
      height: .512rem;
      display: block;
      background-color: #f4f4f4;
  }
  .goind{
      width: 100%;
      height: 1.706667rem;
      position: relative;
      background-color: #fff;
  }
   .goind_img{
       width: .554667rem;
       height: .554667rem;
       position: absolute;
       left: .682667rem;
       top: .682667rem;
  }
  .goind_goin{
      width: 2.986667rem;
      height: .597333rem;
      line-height: .597333rem;
      font-size: .597333rem;
      color: #333333;
      position: absolute;
      left: 1.450667rem;
      top: .64rem;
  }
  .goind_place{
      width: 1.706667rem;
      height: .597333rem;
      line-height: .597333rem;
      font-size: .597333rem;
      color: #333333;
      position: absolute;
      left: 14.250667rem;
      top: .64rem;
  }
  .gotime{
      width: 100%;
      height: 3.2rem;
      background-color: #fff;
      font-size: 0;
  }
  .gotime > div{
      width: 20%;
      height: 3.2rem;
      display: inline-block;
      position: relative;
  }
  .gotimedate{
      width: 1.92rem;
      height: .512rem;
      font-size: .512rem;
      color: #666666;
      /* text-align: center;   */
      position: absolute; 
      left: .768rem; 
      top: 1.28rem;
  }
  .gotimepay{
      width: 1.92rem;
      height: .512rem;
      line-height: .512rem;
      font-size: .512rem;
      color: #FB4A4C;
      /* text-align: center;   */
      position: absolute; 
      left: .768rem; 
      top: 1.92rem;
  }
  .gtd_img{
      width: .768rem;
      height: .768rem;
      display: block;
      position: absolute;
      left: 1.28rem;
      top: 1.066667rem;
  }
  .gtd_more{
      width: 2.346667rem;
      height: .512rem;
      position: absolute;
      left: 0.7rem;
      top: 2.06667rem;
      font-size: .512rem;
      color: #999999;
  }
  .controltip{
      width: 100%;
      height: 2.005333rem;
      font-size: 0;
      background-color: #fff;
  }
  .controltip > div{
      width: 20%;
      height: 2.005333rem;
      display: inline-block;
      font-size: .64rem;
      text-align: center;
      color: #333333;
      padding-top: .725333rem;
      margin-left: .64rem;
  }
  .maidian{
      width: 100%;
      height: 1.749333rem;
      color: #333333;
      font-size: .64rem;
      padding-left: .725333rem;
      padding-top: .554667rem;
      background-color: #fff;
  }
  .localmain{
      width: 100%;
      height: 1.749333rem;
      background-color: #fff;
      font-size: .554667rem;
      color: #666666;
      padding-left: .725333rem;
      padding-top: .64rem;
  }

</style>
