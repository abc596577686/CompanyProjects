<template>
    <div class="profile_page">
        <!-- <lazy-render :time="300"> -->
            <div v-title data-title="个人信息"></div>
            <div v-stat="{type:'pageview', title:'个人信息'}"></div>
            
            <section>
                <div class="my_top">
                    <div class="top_img">
                        <img :src="myInfo.headerImage">
                    </div>
                    <p class="txt_t">{{myInfo.nickname? myInfo.nickname : ""}}</p>
                </div>
                <div class="icon">
                    <router-link :to='{path:  routerPath+"/order",query:{tab:0}}'>
                        <div class="weui-cell weui-cell-access top">
                            <div class="weui-cell-bd">
                                <span style="vertical-align: middle">
                                    <!-- <label class="label"></label> -->
                                    <span>我的订单</span>
                                </span>
                                <span class="right">查看全部订单</span>
                            </div>
                            <div class="weui-cell-ft"></div>
                        </div>
                    </router-link>
                    <div class="icon_div">
                        <ul>
                            <router-link :to='{path: routerPath+"/order", query: { tab: 1}}'>
                                <li>
                                    <img src="../../common/images/icon_daifukuan@2x.png">
                                    <p class="icon_p">待付款</p>
                                    <span class="listNumber" v-if="unpayCount!=0">{{unpayCount}}</span>
                                </li>
                            </router-link>
                            <router-link :to='{path: routerPath+"/order",query:{tab: 2}}'>
                                <li>
                                    <img src="../../common/images/icon_daifahuo@2x.png">
                                    <p class="icon_p">待发货</p>
                                    <span class="listNumber" v-if="unsentCount!=0">{{unsentCount}}</span>
                                </li>
                            </router-link>
                            <router-link :to='{path: routerPath+"/order", query:{tab: 3}}'>
                                <li>
                                    <img src="../../common/images/icon_daishouhuo@2x.png">
                                    <p class="icon_p">待收货</p>
                                    <span class="listNumber" v-if="undeliveryCount!=0">{{undeliveryCount}}</span>
                                </li>
                            </router-link>
                            <router-link :to='{path: routerPath+"/order", query:{tab: 4}}'>
                                <li>
                                    <img src="../../common/images/weeq.png">
                                    <p class="icon_p">待评价</p>
                                    <span class="listNumber" v-if="waitevl!=0">{{waitevl}}</span>
                                </li>
                            </router-link>
                            <router-link :to='{path:  routerPath+"/refundList",query:{tab:6}}'>
                                <li>
                                    <img src="../../common/images/icon_tuihuan@2x.png">
                                    <p class="icon_p">退款/售后</p>
                                    <span class="listNumber" v-if="refuntCount!=0">{{refuntCount}}</span>
                                </li>
                            </router-link>
                        </ul>
                    </div>
                </div>
                <router-link :to='{path: routerPath+"/showCoupon", query: {pageidx:"1",pagesize:"100",status:"0"}}'>
                    <div class="weui-cell weui-textnav top_t" style="margin-top: 0.42rem">
                        <img src="../../common/images/yhq.png">
                        <div class="weui-cell-bd">
                            <span style="vertical-align: middle;padding-left:1.153333rem;"> 我的优惠券 </span>
                        </div>
                        <div class="weui-cell-ft"></div>
                    </div>
                </router-link>
                <router-link :to='{path: routerPath+"/chooseAddress", query: {from: "me", type: 1}}'>
                    <div class="weui-cell weui-textnav top_t" style="margin-top: 0.1rem">
                        <img src="../../common/images/location_icon.png">
                        <div class="weui-cell-bd">
                            <span style="vertical-align: middle;padding-left:1.153rem;"> 收货地址管理 </span>
                        </div>
                        <div class="weui-cell-ft"></div>
                    </div>
                </router-link>
                <a class="href" href="https://jikeduo.qiyukf.com/client?k=06f1b1294f5f993266d9931f9be05e51&wp=1">
                    <div class="weui-cell weui-textnav top_t" style="margin-top: 0.1rem">
                        <img src="../../common/images/kfimg@2x.png">
                        <div class="weui-cell-bd">
                            <span style="vertical-align: middle;padding-left:1.153rem;"> 联系客服 </span>
                        </div>
                        <div class="weui-cell-ft"></div>
                    </div>
                </a>
                <router-link :to='{path: routerPath+"/bankCardList", query: {}}'>
                    <div class="weui-cell weui-textnav top_t" style="margin-top: 0.1rem">
                        <img src="../../common/images/icon_bankCard.png">
                        <div class="weui-cell-bd">
                            <span style="vertical-align: middle;padding-left:1.153rem;"> 我的银行卡 </span>
                        </div>
                        <div class="weui-cell-ft"></div>
                    </div>
                </router-link>
            </section> 
        <!-- </lazy-render> -->
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
        <foot-guide></foot-guide>
    </div>
</template>

<script>
    import footGuide from 'base/footer/footGuide' 
    // import {baseUrl } from 'src/config/env'
    import { userInfo } from 'api'
    import qs from 'qs'
    // import {userInfo } from 'src/service/getData'
    // import {getImgPath } from 'src/components/common/mixin'
    // import {wxHideOptionMenu } from 'common/js/utils'
    import { rootPath } from 'config/env'
    // import sa from 'sa-sdk-javascript';

    export default {
        data() {
            return {
                routerPath:'',
                myInfo: {},
                unsentCount:'',
                unpayCount:'',
                undeliveryCount:'',
                refuntCount:'',
                waitevl:'',
            }
        },
        created() {
            this.routerPath=rootPath;
        },
       
        mounted() {
            // sa.track('$pageview', {
            //   $title: document.title,
            //   $url: location.href,
            //   $url_path: location.pathname,
            //   $referrer_host: location.hostname,
            //   $referrer: document.referrer,
            // })

            let params = qs.stringify({
                a: 'v1/userInfo'
            })
            userInfo(params).then(res => {
                console.log('获取用户信息----')
                console.log(res);

                if (res.code == "1") {
                    this.myInfo = res.userInfo;
                    this.unsentCount = res.orderInfo.unsentCount
                    this.unpayCount = res.orderInfo.unpayCount
                    this.undeliveryCount = res.orderInfo.undeliveryCount
                    this.refuntCount = res.orderInfo.refuntCount
                    this.waitevl = res.orderInfo.waitEvaluateCount
                    // if(res.userInfo&&res.userInfo.isSellers=="true"){
                    //     this.isShowSeller=true;
                    // }
                }
            });

        },
         components: {
            footGuide
        },
        // mixins: [getImgPath],
    }
</script>
<style lang="css" scoped>
    @import 'profile';
</style>
