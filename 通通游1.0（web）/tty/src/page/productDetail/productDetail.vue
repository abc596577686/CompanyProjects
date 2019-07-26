
<template>
    <section class="productDetail">
        <div v-title :data-title="productName?productName:'通通游'"></div>
        <scroll @scroll="scroll"
            class="container">
            <div>
                <div class="lunboimg">
                    <mt-swipe :auto="3000">
                        <mt-swipe-item v-for="img in detail.image">
                            <img :src="img.imgUrl" style="width:100%;height:100%;display:block;">
                        </mt-swipe-item>
                    </mt-swipe>                 
                </div> 
                <!--产品名称  -->
                <div class="proName">{{detail.title}}</div> 
                <!--供应商  -->
                 <div class="supp">
                    <div class="supNa">{{detail.supName}}</div>
                </div> 
                <!--价格  -->
                <div class="pri">
                     <!--暂用价格 后面换字段  -->
                    <!-- <div class="price">￥{{detail.calendar[0].price[0].salePrice}}</div> -->
                    <div class="price">￥{{detail.price}}</div>
                    <span class="price1">起</span>
                    <span class="priceSub">
                        <img src="../../images/tty/icon_descript@2x.png" alt="error" style="width:100%;height:100%;display:block;">
                    </span>
                </div> 
                <!--装饰线  -->
                <span class="gte"></span>
                <div class="goind">
                    <span class="goind_img">
                        <img src="../../images/tty/旗帜@2x.png" alt="error" style="width:100%;height:100%;display:block;">
                    </span>
                    <span class="goind_goin">出发城市</span>
                    <span class="goind_place">{{detail.departPlace}}</span>
                </div> 
                <!--出发时间  -->
                <div class="gotime">
                    <div class="gotimeBox">
                        <div class="gotimediv" v-for="item in detail.calendar">
                            <span class="gotimedate">{{item.departDate}}</span>
                            <span class="gotimepay" v-for="per in item.price" v-show="per.priceType == '1'" v-html="per.salePrice"></span>
                        </div>
                    </div>
                    <!-- <div class="gotimediv">
                        <span class="gotimedate">{{detail}}10/07</span>
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
                    </div> -->
                    <div class="gotimediv1" @click="showSelectdate">
                        <span class="gtd_img">
                            <img src="../../images/tty/日期@2x.png" alt="error" style="width:100%;height:100%;display:block;">
                        </span>
                        <span class="gtd_more">
                            更多日期
                        </span>
                    </div>
                </div>
                <span class="gte"></span>
                <div class="controltip" :class="tabIsFixed === true ? 'fixed' : ''" ref="controltip">    
                    <div v-for="(item,$index) in items"  @click="selectStyle(item, $index)":class="{'active':item.active || item.autoActive,'unactive':!item.active}">{{item.select}}
                    </div>
                </div>
                <span class="gte"></span>
                <div class="maidian">产品卖点</div>
                <div class="localmain" v-html="detail.localmain"></div>
                <!-- 行程详情 -->
                <div class="perDayDetailWrap" ref="perDayDetailWrap">
                    <div v-for="item in detail.schedule">
                        <span class="gte"></span>
                        <div class="perDayDetailBox">
                            <div v-for="day in item.traffic">
                                <div class="title">
                                    <span class="h5">D1</span>
                                    <span v-html="day.departure"></span>
                                    <span class="underline">
                                        <img v-show="day.trafficTypeId == '1'" src="../../images/tty/icon_plan@2x.png">
                                        <img v-show="day.trafficTypeId == '2'" src="../../images/tty/icon_plan@2x.png">
                                        <img v-show="day.trafficTypeId == '3'" src="../../images/tty/icon_plan@2x.png">
                                        <img v-show="day.trafficTypeId == '4'" src="../../images/tty/icon_plan@2x.png">
                                    </span>
                                    <span v-html="day.destination"></span>
                                    <!-- <span class="underline">
                                        <img v-show="day.trafficTypeId == '1'" src="../../images/tty/icon_transit@2x.png">
                                    </span>
                                    <span>箱根</span> -->
                                </div>
                            </div>
                            <div>
                                <div class="details">
                                    <div class="item">
                                        <div class="content"></div>
                                    </div>
                                    <div class="item">
                                        <div class="label">
                                            <img src="../../images/tty/icon_plan@2x.png" alt="">
                                            <span>交通</span>
                                        </div>
                                        <div class="content">
                                            <p>
                                                游轮
                                            </p>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="label">
                                            <img src="../../images/tty/icon_food@2x.png" alt="">
                                            <span>餐食</span>
                                        </div>
                                        <div class="content">
                                            <p class="list"><span>早餐：<span v-html="item.breakfast == '0' ? '自理' : '含'"></span></span></p>
                                            <p class="list"><span>午餐：<span v-html="item.lunch == '0' ? '自理' : '含'"></span></span></p>
                                            <p class="list"><span>晚餐：<span v-html="item.dinner == '0' ? '自理' : '含'"></span></span></p>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="label">
                                            <img src="../../images/tty/icon_stay@2x.png" alt="">
                                            <span>住宿</span>
                                        </div>
                                        <div class="content">
                                            <div v-for="hotel in item.hotel">
                                                <span v-html="hotel.name"></span>
                                                <span v-html="hotel.star"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="label">
                                            <img src="../../images/tty/icon_shopping@2x.png" alt="">
                                            <span>购物店</span>
                                        </div>
                                        <div class="content">
                                            <div v-for="shop in item.shopping">
                                                <p class="name" v-html="shop.name"></p>
                                                <p class="list"><span>购物店介绍：</span><span v-html="shop.information"></span></p>
                                                <p class="list"><span>主营产品：</span><span v-html="shop.product"></span></p>
                                                <p class="list"><span>营业时间：</span><span v-html="shop.startTime"></span></p>
                                                <p class="list"><span>停留时间：</span><span v-html="shop.business"></span></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="label">
                                            <img src="../../images/tty/icon_scene@2x.png" alt="">
                                            <span>景点</span>
                                        </div>
                                        <div class="content">
                                            <div v-for="scenic in item.scenic">
                                                <p class="name" v-html="scenic.name"></p>
                                                <p v-html="scenic.content"></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="label">
                                            <img src="../../images/tty/icon_trip@2x.png" alt="">
                                            <span>行程</span>
                                        </div>
                                        <div class="content">
                                            <p v-html="item.content"></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <span class="gte"></span>
                <!-- 附注 -->
                <div class="dripRemark">
                    <h4 class="title">行程附注</h4>
                    <p class="content">以上行程仅供参考，不同出发日期，产品行程略有不同请最终合同版行程为准。</p>
                </div>
                <span class="gte"></span>
                <!-- 签证信息 -->
                <div class="visaInfo" ref="visaInfo">
                    <h4 class="title"><span class="tag"></span>签证信息</h4>
                    <p class="content">暂无信息</p>
                </div>
                <span class="gte"></span>
                <!-- 费用说明 -->
                <div class="costExplain" ref="costExplain">
                    <h4 class="title"><span class="tag"></span>费用说明</h4>
                    <div class="content">
                       包含：<p v-html="detail.feeInclude"></p>
                       不包含：<p v-html="detail.feeNoInclude"></p>
                    </div>
                </div>
                <span class="gte"></span>
                <!-- 预订须知 -->
                <a href="javascript:;" class="book" ref="book" @click="showBookinfo">
                    <div class="moreInto">
                        <h4 class="title"><span class="tag"></span>预订须知</h4>
                    </div>
                </a>
                <span class="gte"></span>
                <!-- 取消政策 -->
                <a href="javascript:;" class="policy">
                    <div class="moreInto">
                        <h4 class="title"><span class="tag"></span>取消政策</h4>
                    </div>
                </a>
            </div>
        </scroll>
        <div class="botterWrap">
            <a href="javascript:;" class="item active">
                <img src="../../images/tty/icon_home@2x.png" alt="">
                <span class="text">首页</span>
            </a>
            <span class="line"><em></em></span>
            <a href="javascript:;" class="item active">
                <img src="../../images/tty/icon_custom@2x.png" alt="">
                <span class="text">客服</span>
            </a>
            <div class="btn" @click="showSelectdate">下一步</div>
        </div>
        <transition name="sideSlip">
            <book-info v-show="isShowBookinfo" @back="isShowBookinfo=false" ref="bookinfo"></book-info>
        </transition>
        <!-- <transition name="sideSlip">
            <select-date v-show="isShowSelectdate" @back="isShowSelectdate=false" ref="selectdate"></select-date>
        </transition> -->
    </section>
</template>

<script>
    import { mapState, mapMutations} from 'vuex'
    // import loading from 'src/components/common/loading'
    // import { getImgPath } from 'src/components/common/mixin'
    // 接口
    import { getCityList, productDetail, addNumCart, orderCheckDetail, checkBuy, getPostage, shareProduct, getToken} from 'src/service/getData'
    import {wxShowOptionMenu, isWeiXin} from 'src/config/mUtils'
    // import alertTip from 'src/components/common/alertTip'
    import wx from 'weixin-js-sdk';
    import { rootPath } from 'src/config/env'
    import Scroll from 'common/scroll';
    import selectDate from 'page/selectDate/selectDate';
    import bookInfo from 'common/bookInfo';

    export default {
        created() {
            this.probeType = 3
            this.listenScroll = true
        },
        data() {
            return {
                    isShowBookinfo: false,
                    isShowSelectdate: false,
                    tabIsFixed: false,
                    tabPosition: 0,
                    position: {
                        perDayDetailWrap: 0,
                        costExplain: 0,
                        visaInfo: 0,
                        book: 0
                    },
//                 img:'http://tty-supplier.oss-cn-beijing.aliyuncs.com/image/a3a0287ba2cb0b71d846a22cb6668f18',
//                 routerPath:'',
//                 shopid: '',
//                 productId: '',
                   productName:'星游澳洲：澳大利亚凯恩斯精致私家团',
//                 showAlert: false, //弹出框
                // alertText: null, //弹出框信息
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
                    distId: 'jkd',
                    platId: 'tty',
                    productId: '1183FE8AE2B34877837D5E40CE2203FB',
                    // 商品详情
                    detail: {
                        image: [
                            {
                                imgUrl: 'http://tty-supplier.oss-cn-beijing.aliyuncs.com/image/a3a0287ba2cb0b71d846a22cb6668f18'
                            },{
                                imgUrl: 'http://tty-supplier.oss-cn-beijing.aliyuncs.com/image/a3a0287ba2cb0b71d846a22cb6668f18'
                            },{
                                imgUrl: 'http://tty-supplier.oss-cn-beijing.aliyuncs.com/image/a3a0287ba2cb0b71d846a22cb6668f18'
                            }
                        ],
                        title: '我是标题',
                        supName: '凯撒旅游',
                        salePrice: '199.00',
                        departPlace: '北京',
                        localmain: ''
                    },
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
            // 运费详情数据
            
            let me = this;
            // getCityList().then(res => {
            //       this.info = res.list;
            // });
            // me.shopid = me.$route.query.shopid;
            // me.productId = me.$route.query.productid;
            // me.addcartpram.storeId = me.shopid;
            // me.addcartpram.productId = me.productId;
            // me.routerPath=rootPath;
            // wxShowOptionMenu();
            // alert(isWeiXin())
            if(isWeiXin()){
                // shareProduct({
                //     wholesaleId: me.productId,
                //     storeId:me.shopid
                // }).then(res => {
                    //let u = res.shareUrl;
                    // let link = window.location.href;
                    // let title =  res.productName;
                    // let imgUrl = res.imageMin;
                    let desc = '我发现一个好东西，分享给你！';
                    // let link2 = link.replace(/&/g,"##");

                    let title =  '我是标题';
                    let link = 'http://www.baidu.com';
                    let imgUrl = 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/logo_white.png';
                    let appId = '123456';
                    let timestamp = Math.random(5) * 10;
                    let nonceStr = 'abcde';
                    let signature = '1a2b3c';

                    // getToken({
                    //     url: encodeURI(link2)
                    // }).then(res2 => {
                        // wx.config({
                        //     debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        //     // appId: res2.appId, // 必填，公众号的唯一标识
                        //     // timestamp: res2.timestamp, // 必填，生成签名的时间戳
                        //     // nonceStr: res2.nonceStr, // 必填，生成签名的随机串
                        //     // signature: res2.signature, // 必填，签名，见附录1

                        //     appId: appId, // 必填，公众号的唯一标识
                        //     timestamp: timestamp, // 必填，生成签名的时间戳
                        //     nonceStr: nonceStr, // 必填，生成签名的随机串
                        //     signature: signature, // 必填，签名，见附录1

                        //     jsApiList: [
                        //         'onMenuShareAppMessage', // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
                        //         'onMenuShareTimeline', // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
                        //         'onMenuShareQQ', // 获取“分享到QQ”按钮点击状态及自定义分享内容接口
                        //         'onMenuShareQZone' //获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
                        //     ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                        // });
                        wx.ready(function () {
                            wx.onMenuShareTimeline({
                                title: title, // 分享标题
                                link: link, // 分享链接
                                imgUrl: imgUrl, // 分享图标
                                success() {
                                    me.showAlert=true;
                                    me.alertText="分享成功";
                                },
                                cancel() {
                                    // 用户取消分享后执行的回调函数
                                }
                            })
                            // 分享给朋友
                            wx.onMenuShareAppMessage({
                                title: title, // 分享标题
                                desc: desc, // 分享描述
                                link: link, // 分享链接
                                imgUrl: imgUrl, // 分享图标
                                success: function() {
                                    me.showAlert=true;
                                    me.alertText="分享成功";
                                },
                                cancel: function() {
                                    // 用户取消分享后执行的回调函数
                                }
                            })
                            // 分享到QQ
                            wx.onMenuShareAppMessage({
                                title: title, // 分享标题
                                desc: desc, // 分享描述
                                link: link, // 分享链接
                                imgUrl: imgUrl, // 分享图标
                                success: function() {
                                    me.showAlert=true;
                                    me.alertText="分享成功";
                                },
                                cancel: function() {
                                    // 用户取消分享后执行的回调函数
                                }
                            })
                            // 分享到QQ空间
                            wx.onMenuShareQZone({
                                title: title, // 分享标题
                                desc: desc, // 分享描述
                                link: link, // 分享链接
                                imgUrl: imgUrl, // 分享图标
                                success: function() {
                                    me.showAlert=true;
                                    me.alertText="分享成功";
                                },
                                cancel: function() {
                                    // 用户取消分享后执行的回调函数
                                }
                            })
                        });
                    // });
            //     });
            }
        },
        mounted() {
            // this.tabPosition = this.$refs.controltip.offsetTop;
            // this._setPosition();
            // window.addEventListener('scroll', this.handleScroll);

            let me = this;
            productDetail(
                me.distId,
                me.platId,
                me.productId
            ).then(res => {
                console.log(res);
                if (res.code == '0') {
                    return
                }
                let data = res.info;
                me.detail = data
                me.detail.price = res.price;
                me.detail.localmain = `${data.sellPtOne} ${data.sellPtTwo} ${data.sellPtThree} ${data.sellPtFour}`
                // 
                // console.log(me.detail.info.calendar[0].price[0].salePrice)
            });
        },
        destroyed() {
            // window.removeEventListener('scroll', this.handleScroll);
        },
        // mixins: [getImgPath],
        components: {
           Scroll,
           bookInfo,
           selectDate
        },
        methods: {
            scroll() {},
            showSelectdate() {
                // this.isShowSelectdate = true;
                // setTimeout(() => {
                //     this.$refs.selectdate.refresh();
                // }, 20)
                this.$router.push({
                    path: '/selectDate'
                })
            },
            showBookinfo() {
                this.isShowBookinfo = true;
                setTimeout(() => {
                    this.$refs.bookinfo.refresh();
                }, 20)
            },
            // _setPosition() {
            //     this.position = {
            //         perDayDetailWrap: this.$refs.perDayDetailWrap.offsetTop,
            //         costExplain: this.$refs.costExplain.offsetTop,
            //         visaInfo: this.$refs.visaInfo.offsetTop,
            //         book: this.$refs.book.offsetTop
            //     }
            // },
            // handleChange(index) {
            //     ...
            // }
            // 中间导航栏
            handleScroll() {
                // var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                // // console.log(scrollTop);
                // // console.log(this.tabPosition);
                // if (scrollTop >= this.tabPosition) {
                //     this.tabIsFixed = true
                //     this._setPosition();
                // } else {
                //     this.tabIsFixed = false
                //     this._setPosition();
                // }
            },
            selectStyle (item, index) {
                const _this=this;
                this.$nextTick(function () {
                    this.items.forEach(function (item) {
                        _this.$set(item,'active',false);
                        item.autoActive = false;
                    });
                    this.$set(item,'active',true);
                })
                console.log(index);
                // switch(index) {
                //     case 0:
                //         window.scrollTo(0, this.position.perDayDetailWrap - this.$refs.controltip.offsetHeight)
                //         break;
                //     case 1:
                //         window.scrollTo(0, this.position.costExplain)
                //         break;
                //     case 2:
                //         window.scrollTo(0, this.position.visaInfo)
                //         break;
                //     case 3:
                //         window.scrollTo(0, this.position.book)
                //         break;
                // }
            },
            selectDate() {
                this.$router.push({
                  path: `/wap/selectDate`
                })
            }
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
    .controltip .active{
        border: .128rem solid #008ee5;
        border-top: none;
        border-left: none;
        border-right: none;
        color: #008ee5 !important;
    }
</style>

