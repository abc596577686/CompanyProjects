<template>
    <div>
        <!-- 顶部栏 -->
        <!-- <static-nav ref="navBar" :navList="navList" :curSelectIndex="curSelectIndex" @changeNavBar="changeNavBar" :coupon="coupon"></static-nav> -->
        <div v-title data-title="我的优惠券"></div>
        <div v-stat="{type:'pageview', title:'我的优惠券'}"></div>
        
        <div class="toptit" >
            <span v-for="(data,index) in navList" :class="{iscc:index==isAc}" @click="showac(index)">{{data.channelName}}</span>
        </div>
        <section class="couponlist">
            <div v-for="(data,index) in dataList" v-if="isshow == 0">
                <div class='list'>
                    <div class="priceimg">￥</div>
                    <span class="price">{{data.giveAmount}}</span>
                    <!--满使用  -->
                    <div class="fulluse">{{data.fullAmount!=''?'满￥'+data.fullAmount+'使用':''}}</div>
                    <div class="coverline"></div>
                    <div class="leftd"></div>
                    <div class="rightd"></div>
                    <!-- 使用范围 -->
                    <div class="useCvor">{{data.title}}</div>
                    <div class="down" :class="{active:index==isActive}" @click="showUp(data,index)">
                        <img class="downImg im" src="../../common/images/icon_viewMore.png">
                    </div>
                    <div class="up" :class="{active1:index==isActive}" @click="showDown(data,index)">
                        <img class="upImg im" src="../../common/images/icon_packUp.png">
                    </div>
                    <!-- 券类型 -->
                    <div class="cardtype">
                        {{data.typeName}}
                    </div>
                    <div class="cardName">
                        {{data.couponName}}
                    </div>
                    <div class="cardtitle">
                        {{data.effectiveTimeFormat}}
                    </div>
                    <!-- 立刻使用 -->
                    <div class="nowUse" @click="usecard(data)">
                        立刻使用
                    </div>
                </div>
                <!-- 适用商品 -->
                <div class="otherProduct" :class="{active1:index==isActive}">
                    <div class="line"></div>
                    <div class="useCvor1">以下商品适用：</div>
                    <div class="bfproduct">
                        {{data.bindNames}}
                    </div>
                </div>
            </div>
            <div v-for="(data,index) in dataList" v-if="isshow == 1">
                <div class='list' style="background-color: #E1E1E1;">
                    <div class="priceimg" style="color:#000;">￥</div>
                    <span class="price" style="color:#000;">{{data.giveAmount}}</span>
                    <!--满使用  -->
                    <div class="fulluse" style="color:#000;">{{data.fullAmount!=''?'满￥'+data.fullAmount+'使用':''}}</div>
                    <div class="coverline"></div>
                    <div class="leftd"></div>
                    <div class="rightd"></div>
                    <!-- 使用范围 -->
                    <div class="useCvor">{{data.title}}</div>
                    <!-- 券类型 -->
                    <div class="cardtype" style="background-color: #666666;">
                        {{data.typeName}}
                    </div>
                    <div class="cardName">
                        {{data.couponName}}
                    </div>
                    <div class="cardtitle">
                        {{data.effectiveTimeFormat}}
                    </div>
                </div>
                <!-- 适用商品 -->
                <div class="otherProduct" :class="{active1:index==isActive}">
                    <div class="line"></div>
                    <div class="useCvor1">以下商品适用：</div>
                    <div class="bfproduct">
                        {{data.bindNames}}
                    </div>
                </div>
            </div>
        </section>
        <!-- 未使用 -->
        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>

    </div>
</template>

<script>
    import { couponList } from 'api'
    import qs from 'qs'
    import { rootPath } from 'config/env'
    import Scroll from 'base/scroll/scroll'
    import StaticNav from 'components/staticNav/staticNav'
    import ContentSlide from 'components/slide_content/slide_content'
    import { getCouponList } from 'api'
    import { mock_coupon } from 'service/mock'
    import storage from 'good-storage'
    import loading from 'base/loading/loading'
    // import sa from 'sa-sdk-javascript';

    export default {
        data() {
            return {
                items: 30,
                beforeScroll: true,
                listenScroll: true,
                probeType: 3,
                routerPath:'',
                myInfo: {},
                navList: [
                    {
                        id: 0,
                        channelName: '未使用'
                    },
                    {
                        id: 1,
                        channelName: '已使用'
                    },
                    {
                        id: 2,
                        channelName: '已过期'
                    }
                ],
                curSelectIndex: 0,
                coupon: true,
                down:true,
                up:false,
                me:{
                    pageidx:1,
                    pagesize:100,
                    status:'',
                },
                dataList:{}, //优惠券列表
                showLoading: true, //显示加载动画
                isAc:0,
                isActive:-1,
                couponId:'',
                isshow: 0,
            }
        },
        created() {
            this.routerPath=rootPath;
            this.me.pageidx = 1
            this.me.pagesize =100
            this.me.status = this.$route.query.status
        },
        mounted() {
            this.init()  

            // sa.track('$pageview', {
            //   $title: document.title,
            //   $url: location.href,
            //   $url_path: location.pathname,
            //   $referrer_host: location.hostname,
            //   $referrer: document.referrer,
            // })
        },
        methods:{
            async init(){
                let me = this
                let params = qs.stringify(me.me)
                couponList(params).then(res => {
                    console.log(res)
                    this.dataList = res.dataList
                    this.showLoading = false;

                    if(me.me.status == 0){
                        me.isshow = 0
                    }else{
                        me.isshow = 1
                    }
                })
            },
            changeNavBar(curIndex) {
                let _this = this
                console.log(curIndex)
                this.showLoading = true;
                _this.me.status = curIndex
                console.log( _this.me.status)
                this.init()

                this.$refs.slideContent.scrollTo(curIndex)
            },
            showUp(data,index){
                if(data.attribute == 3){
                    console.log('此券全场通用')
                }else{
                    this.isActive = index
                }
            },
            showDown(){
                this.isActive = -1
            },
            usecard(data){
                this.$router.push({path: this.routerPath+'/productSearch',query:{couponId:data.couponId}});
            },
            showac(index){
                this.isAc = index
                console.log(index)
                this.showLoading = true;
                this.me.status = index
                // console.log( _this.me.status)
                this.init()
            }
        },
        components: {
            Scroll,
            StaticNav,
            ContentSlide,
             loading
        },
        watch:{
            // curIndex(newValue, oldValue){
            //     console.log('变成了'+newValue)
            //     // this.me.status = newValue
            //     // this.init()
            // }
        }
    }
</script>
<style lang="css" scoped>
    @import 'showCoupon';
    .active{
        display: none!important;
    }
    .active1{
        display: block!important;
    }
    .isActive{
        display: none;
    }
    .iscc{
        font-weight: bold;
        color: #FB4A4C;
        border-bottom:.1rem solid #FB4A4C;
    }
</style>
