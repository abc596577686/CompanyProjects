<template>
  <div v-title :data-title="productName?productName:'通通游'">
    <div class="lunboimg">
        <mt-swipe :auto="3000">
            <mt-swipe-item v-for="img in detail.info.image">
                <img :src="img.imgUrl" alt="error" style="width:100%;height:100%;display:block;">
            </mt-swipe-item>
        </mt-swipe>                 
    </div> 
    <!--产品名称  -->
    <div class="proName">
        {{detail.info.title}} {{detail.info.title}} {{detail.info.title}} {{detail.info.title}}
    </div> 
      <!--供应商  -->
       <div class="supp">
          <div class="supNa">{{detail.info.supName}}</div>
      </div> 
      <!--价格  -->
      <div class="pri">
           <!--暂用价格 后面换字段  -->
          <div class="price">￥{{detail.info.calendar[0].price[0].salePrice}}</div>
          <span class="price1">起</span>
          <span class="priceSub">
              <img src="../../images/tty/121212e.png" alt="error" style="width:100%;height:100%;display:block;">
          </span>
      </div> 
      <!--装饰线  -->
      <span class="gte"></span>
       <div class="goind">
          <span class="goind_img">
              <img src="../../images/tty/旗帜@2x.png" alt="error" style="width:100%;height:100%;display:block;">
          </span>
          <span class="goind_goin">出发城市</span>
          <span class="goind_place">{{detail.info.departPlace}}</span>
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
                  <img src="../../images/tty/日期@2x.png" alt="error" style="width:100%;height:100%;display:block;">
              </span>
              <span class="gtd_more">
                  更多日期
              </span>
          </div>
      </div>
      <span class="gte"></span>
      <div class="controltip">    
          <div v-for="(item,$index) in items"  @click="selectStyle(item, $index)":class="{'active':item.active || item.autoActive,'unactive':!item.active}">{{item.select}}
          </div>
      </div>
      <span class="gte"></span>
      <div class="maidian">产品卖点</div>
      <div class="localmain">{{localmain}}</div>
  </div>
</template>

<script>
    import { mapState,mapMutations} from 'vuex'
    // import loading from 'src/components/common/loading'
    // import { getImgPath } from 'src/components/common/mixin'
    // 接口
    import { getCityList, productDetail, addNumCart,orderCheckDetail, checkBuy, getPostage,shareProduct,getToken} from 'src/service/getData'
    import {wxShowOptionMenu,isWeiXin} from 'src/config/mUtils'
    // import alertTip from 'src/components/common/alertTip'
    import wx from 'weixin-js-sdk'
    import { rootPath } from 'src/config/env'

    export default {
        data() {
            return {
                   localmain:'欧洲经典三国游览，品尝意式特色餐，入内卢浮宫',
//                 img:'http://tty-supplier.oss-cn-beijing.aliyuncs.com/image/a3a0287ba2cb0b71d846a22cb6668f18',
//                 routerPath:'',
//                 shopid: '',
//                 productId: '',
                   productName:'星游澳洲：澳大利亚凯恩斯精致私家团',
//                 showAlert: false, //弹出框
//                 alertText: null, //弹出框信息
//                 productInfo: {},
//                 headerImageList: [],
//                 preventRepeat: false, //防止重复获取
//                 showLoading: true, //显示加载动画
// //              showLoading: false, //关闭加载动画
//                 descStatus: 0,
//                 showChose: false,
//                 showProvince: true,
//                 showCity: false,
//                 showDistrict: false,
//                 showCityList: false,
//                 showDistrictList: false,
//                 province: 310000,
//                 city: 310000,
//                 district: 310112,
//                 GetProvinceId: 2,
//                 Province: "上海市",
//                 City: false,
//                 District:false,
//                 selected: false,
//                 info: [{
//                     code: 310000,
//                     name: '上海'
//                 }],
//                 showBuy: false, //显示数量选择框
//                 showDesc: false, //显示商品说明
//                 addcartpram: {
//                     storeId: '',
//                     productId: '',
//                     num: 1,
//                     isFromCartList: false,
//                 }, //购物车商品数量修改请求参数
//                 oprType: 1, //操作类型 1-添加购物车 2-立即购买
//                 oprText: '', //操作描述
//                 quantity: 0, //购物车数量
//                 postage: '', //运费
//                 // weightDesc: '',//运费描述
//                 showsf:false, //是否显示税费
//                 kkk:{}, //运费文字
//                 yunfeikk:false, //控制运费文字的显示
//                 productee:false //运费栏显示(无需求 暂时不显示)
                
                    // 暂时写死 三个参数
                    distId:'jkd',
                    platId:'tty',
                    productId:'1E34B6C2169A43E3B889A36CFF48EE5F',
                    // 商品详情
                    detail:[],
                    // 四部导航标题
                    items: [   
                        {select:'路线详情', autoActive:true},
                        {select:'签证信息'},
                        {select:'费用说明'},
                        {select:'预定须知'}
                    ],  
            }
        },
        created() {
            // let me = this;
            // getCityList().then(res => {
            //       this.info = res.list;
            // });
            // me.shopid = me.$route.query.shopid;
            // me.productId = me.$route.query.productid;
            // me.addcartpram.storeId = me.shopid;
            // me.addcartpram.productId = me.productId;
            // me.routerPath=rootPath;
            // wxShowOptionMenu();
            // if(isWeiXin()){
            //     shareProduct({
            //         wholesaleId: me.productId,
            //         storeId:me.shopid
            //     }).then(res => {
            //         //let u = res.shareUrl;
            //         let link=window.location.href;
            //         let title =  res.productName;
            //         let imgUrl =res.imageMin;
            //         let desc = '我发现一个好东西，分享给你！';
            //         let link2=link.replace(/&/g,"##");
            //         getToken({
            //             url: encodeURI(link2)
            //         }).then(res2 => {
            //             wx.config({
            //                 debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            //                 appId: res2.appId, // 必填，公众号的唯一标识
            //                 timestamp: res2.timestamp, // 必填，生成签名的时间戳
            //                 nonceStr: res2.nonceStr, // 必填，生成签名的随机串
            //                 signature: res2.signature, // 必填，签名，见附录1
            //                 jsApiList: [
            //                     'onMenuShareAppMessage', // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
            //                     'onMenuShareTimeline', // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
            //                     'onMenuShareQQ', // 获取“分享到QQ”按钮点击状态及自定义分享内容接口
            //                     'onMenuShareQZone' //获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
            //                 ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            //             });
            //             wx.ready(function () {
            //                 wx.onMenuShareTimeline({
            //                     title: title, // 分享标题
            //                     link: link, // 分享链接
            //                     imgUrl: imgUrl, // 分享图标
            //                     success() {
            //                         me.showAlert=true;
            //                         me.alertText="分享成功";
            //                     },
            //                     cancel() {
            //                         // 用户取消分享后执行的回调函数
            //                     }
            //                 })
            //                 // 分享给朋友
            //                 wx.onMenuShareAppMessage({
            //                     title: title, // 分享标题
            //                     desc: desc, // 分享描述
            //                     link: link, // 分享链接
            //                     imgUrl: imgUrl, // 分享图标
            //                     success: function() {
            //                         me.showAlert=true;
            //                         me.alertText="分享成功";
            //                     },
            //                     cancel: function() {
            //                         // 用户取消分享后执行的回调函数
            //                     }
            //                 })
            //                 // 分享到QQ
            //                 wx.onMenuShareAppMessage({
            //                     title: title, // 分享标题
            //                     desc: desc, // 分享描述
            //                     link: link, // 分享链接
            //                     imgUrl: imgUrl, // 分享图标
            //                     success: function() {
            //                         me.showAlert=true;
            //                         me.alertText="分享成功";
            //                     },
            //                     cancel: function() {
            //                         // 用户取消分享后执行的回调函数
            //                     }
            //                 })
            //                 // 分享到QQ空间
            //                 wx.onMenuShareQZone({
            //                     title: title, // 分享标题
            //                     desc: desc, // 分享描述
            //                     link: link, // 分享链接
            //                     imgUrl: imgUrl, // 分享图标
            //                     success: function() {
            //                         me.showAlert=true;
            //                         me.alertText="分享成功";
            //                     },
            //                     cancel: function() {
            //                         // 用户取消分享后执行的回调函数
            //                     }
            //                 })
            //             });
            //         });
            //     });
            // }
        },
        mounted() {

            // 运费详情数据
            // let me = this;
            // productDetail(
            //     me.distId,
            //     me.platId,
            //     me.productId
            // ).then(res => {
            //     me.detail = res 
            //     console.log(me.detail.info.calendar[0].price[0].salePrice)
            // });
        },
        // mixins: [getImgPath],
        components: {
           
        },
        methods: {
            // handleChange(index) {
            //     ...
            // }
            // 中间导航栏
            selectStyle (item, index) {
            const _this=this;
            this.$nextTick(function () {
                this.items.forEach(function (item) {
                    _this.$set(item,'active',false);
                    item.autoActive = false;
                });
                    this.$set(item,'active',true);
            });
        },
        },
        filters: {
           
        },
        watch: {

        }
    }
</script>

<style lang="scss" scoped>
    // @import 'src/style/mixin';
    @import 'productDetail';
    body{
        background-color: #fff !important;
    }
    .active{
        border: .128rem solid #008ee5;
        border-top: none;
        border-left: none;
        border-right: none;
        color: #008ee5 !important;
    }
</style>


