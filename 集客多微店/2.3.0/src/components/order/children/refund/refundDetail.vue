<template>
    <div>
        <!-- 顶部状态 -->
        <!-- 退款状态 -->
        <div class="tk_mainStatus">
            <!-- 退款 -->
            <div class="imgdiv" v-if="refundType == 1">
                <img class="innerimg" src="../../../../common/images/red.png">
                <div class="long" v-if="refundStatus !=2 && refundStatus !=6"></div>
                <div class="glong" v-if="refundStatus ==2 || refundStatus ==6"></div>
                <img class="innerimg" v-if="refundStatus !=2 && refundStatus !=6" src="../../../../common/images/red.png">
                <img class="innerimg" v-if="refundStatus ==2 || refundStatus ==6" src="../../../../common/images/grey.png">
                <div class="long" v-if="refundStatus ==5"></div>
                <div class="glong" v-if="refundStatus !=5"></div>
                <img class="innerimg" v-if="refundStatus ==1 || refundStatus ==7 || refundStatus ==8 || refundStatus ==9" src="../../../../common/images/grey.png">
                <img class="innerimg" v-if="refundStatus ==2 || refundStatus ==6" src="../../../../common/images/close.png" style="width:.64rem;height:.64rem">
                <img class="innerimg" v-if="refundStatus ==5" src="../../../../common/images/r2xred.png" style="width:.64rem;height:.64rem">
            </div>
            <div class="txtdiv" v-if="refundType == 1">
                <div class="innerdiv" style="margin-left: -1.3rem;">{{aspeed.a}}</div>
                <div class="innerdiv" v-if="refundStatus !=2 && refundStatus !=6" style="margin-left: 3.3rem;">{{aspeed.b}}</div>
                <div class="innerdiv" v-if="refundStatus ==2 || refundStatus ==6" style="margin-left: 3.3rem;color:#999999;">{{aspeed.b}}</div>
                <div class="innerdiv" v-if="refundStatus ==5" style="margin-left: 3.3rem;">{{aspeed.c}}</div>
                <div class="innerdiv" v-if="refundStatus ==2 || refundStatus ==6" style="margin-left: 3.3rem;">{{aspeed.c}}</div>
                <div class="innerdiv" v-if="refundStatus ==1 || refundStatus ==7 || refundStatus ==8 || refundStatus ==9" style="margin-left: 3.3rem;color:#999999">{{aspeed.c}}</div>
            </div>
            <!-- 退款退货 -->
            <div class="imgdiv" v-if="refundType == 2">
                <img class="innerimg1" src="../../../../common/images/red.png">
                <div class="short" v-if="refundStatus !=2 && refundStatus !=6"></div>
                <div class="gshort" v-if="refundStatus ==2 || refundStatus ==6"></div>
                <img class="innerimg" v-if="refundStatus !=2 && refundStatus !=6" src="../../../../common/images/red.png">
                <img class="innerimg" v-if="refundStatus ==2 || refundStatus ==6" src="../../../../common/images/grey.png">
                <div class="short" v-if="refundStatus !=1 && refundStatus !=2 && refundStatus !=6"></div>
                <div class="gshort" v-if="refundStatus ==1 || refundStatus ==2 || refundStatus ==6"></div>
                <img class="innerimg" v-if="refundStatus !=1 && refundStatus !=2 && refundStatus !=6" src="../../../../common/images/red.png">
                <img class="innerimg" v-if="refundStatus ==1 || refundStatus ==2 || refundStatus ==6" src="../../../../common/images/grey.png">
                <div class="short" v-if="refundStatus !=1 && refundStatus !=2 && refundStatus !=3 && refundStatus !=6"></div>
                <div class="gshort" v-if="refundStatus ==1 || refundStatus ==2 || refundStatus ==3 || refundStatus ==6"></div>
                <img class="innerimg" v-if="refundStatus !=1 && refundStatus !=2 && refundStatus !=3 && refundStatus !=6" src="../../../../common/images/red.png">
                <img class="innerimg" v-if="refundStatus ==1 || refundStatus ==2 || refundStatus ==3 || refundStatus ==6" src="../../../../common/images/grey.png">
                <div class="short" v-if="refundStatus ==5"></div>
                <div class="gshort" v-if="refundStatus !=5"></div>
                <img class="innerimg" v-if="refundStatus !=2 && refundStatus !=5 && refundStatus !=6 " src="../../../../common/images/grey.png">
                <img class="innerimg" v-if="refundStatus ==2 || refundStatus ==6" src="../../../../common/images/close.png" style="width:.64rem;height:.64rem">
                <img class="innerimg" v-if="refundStatus ==5" src="../../../../common/images/r2xred.png" style="width:.64rem;height:.64rem">
            </div>
            <div class="txtdiv" v-if="refundType == 2">
                <div class="innerdiv" style="margin-left: -1.3rem;">{{bspeed.a}}</div>
                <div class="innerdiv" v-if="refundStatus != 2 && refundStatus !=6" style="margin-left: .1rem;">{{bspeed.b}}</div>
                <div class="innerdiv" v-if="refundStatus == 2 || refundStatus ==6" style="margin-left: .1rem;color:#999999;">{{bspeed.b}}</div>
                <div class="innerdiv" v-if="refundStatus != 1 && refundStatus != 2 && refundStatus !=6"  style="margin-left: .2rem;">{{bspeed.c}}</div>
                <div class="innerdiv" v-if="refundStatus == 1 || refundStatus == 2 || refundStatus ==6" style="margin-left: .2rem;color:#999999;">{{bspeed.c}}</div>
                <div class="innerdiv" v-if="refundStatus != 1 && refundStatus != 2 && refundStatus != 3  && refundStatus !=6" style="margin-left: .15rem;">{{bspeed.d}}</div>
                <div class="innerdiv" v-if="refundStatus == 1 || refundStatus == 2 || refundStatus == 3 || refundStatus ==6" style="margin-left: .2rem;color:#999999;">{{bspeed.d}}</div>
                <div class="innerdiv" v-if="refundStatus == 5" style="margin-left: .12rem;">{{bspeed.e}}</div>
                <div class="innerdiv" v-if="refundStatus != 2 && refundStatus != 5 && refundStatus !=6" style="margin-left: .2rem;color:#999999;">{{bspeed.e}}</div>
                <div class="innerdiv" v-if="refundStatus == 2 ||refundStatus ==6" style="margin-left: .2rem;">{{bspeed.e}}</div>
            </div>
        </div>
        <!-- 状态提示 -->
        <div class="infoTip">
            <div class="toptip">
                <img v-if="lieimgshowkey == 0" src="../../../../common/images/litime.png">
                <img v-if="lieimgshowkey == 1" src="../../../../common/images/closelist.png">
                <span>{{headtitle}}</span>
            </div>
            <div class="showtitle">
                <div class="littlesqu"></div>
                <div class="maintilte">
                    {{maintitle}}
                </div>
            </div>
            <div class="showtitle">
                <div class="littlesqu" v-if="showkey"></div>
                <div class="maintilte" v-if="showkey">
                    {{timetitle}}
                </div>
            </div>
        </div>
        <!-- 商品展示 -->
        <div class="product">
            <img :src="productUrl">
            <div class="productName">
                {{productName}}
            </div>
            <div class="quality">X{{refundCount}}</div>
        </div>
        <!-- 具体描述 -->
        <div class="reason">
            <div style="text-indent: .554667rem;line-height:2.090667rem">
                <span class="title1">退款原因：</span>{{reason}}
            </div>
            <span class="lit"></span>
            <div style="text-indent: .554667rem;line-height:2.090667rem">
                <span class="title1">退款金额：</span>{{price?'￥'+price:''}}
            </div>
            <span class="lit"></span>
            <div style="text-indent: .554667rem;line-height:2.090667rem">
                <span class="title1">问题描述：</span>{{miaoshu}}
            </div>
        </div>
        <div class="cover">

        </div>
        <!-- <div class="btn1" @click="goWrite()">填写单号</div> -->
        <!-- 底部按钮 -->
        <div class="bottomBtn" v-if="bottomshow">
            <div class="btn1" v-if="this.refundType==2 && this.refundStatus==3" @click="goWrite()">填写单号</div>
            <router-link class="btn1" v-if="this.refundStatus==2" :to="{path: routerPath+'/applyrefund',query:{itemId:me.itemId}}">
                再次申请
            </router-link>
            <router-link class="btn1" v-if="this.refundStatus==6" :to="{path: routerPath+'/applyrefund',query:{itemId:me.itemId}}">
                再次申请
            </router-link>
        </div>
    </div>
</template>

<script>
    import { userInfo,showRefund } from 'api'
    import qs from 'qs'
    import { rootPath } from 'config/env'

    export default {
        data() {
            return {
                routerPath:'',
                myInfo: {

                },
                me:{
                    itemId:''
                },
                refundType:'', //订单售后类型
                refundStatus:'',//当前售后状态
                refundSpeedList:{}, //字段说明集合
                aspeed:{
                    a:'',
                    b:'',
                    c:'',
                },
                bspeed:{
                    a:'',
                    b:'',
                    c:'',
                    d:'',
                    e:''
                },
                headtitle:'',
                maintitle:'',
                timetitle:'',
                lieimgshowkey:'0',
                showkey: true,
                reason:'',
                price:'',
                miaoshu:'',
                productName:'',
                productUrl:'',
                refundCount:'',
                bottomshow:false,
            }
        },
        created() {
            this.routerPath=rootPath;
            this.me.itemId = this.$route.query.itemId;
        },
        mounted() {
            this.init()
        },
        methods:{
            async init(){
                let me = this;
                let params = qs.stringify(me.me)
                showRefund(params).then(res => {
                    if (res.code == "1") {
                        console.log(res)
                        this.refundType = res.data.refundType //类型
                        this.refundStatus = res.data.refundStatus //状态
                        console.log(this.refundType)
                        console.log(this.refundStatus)
                        this.refundSpeedList = res.refundSpeedList
                        if(this.refundType ==1 ){
                            this.aspeed.a = res.refundSpeedList[0].name
                            this.aspeed.b = res.refundSpeedList[1].name
                            this.aspeed.c = res.refundSpeedList[2].name
                        }else{
                            this.bspeed.a = res.refundSpeedList[0].name
                            this.bspeed.b = res.refundSpeedList[1].name
                            this.bspeed.c = res.refundSpeedList[2].name
                            this.bspeed.d = res.refundSpeedList[3].name
                            this.bspeed.e = res.refundSpeedList[4].name
                        }
                        // 信息抬头
                        this.headtitle = res.refundStatusContent.title
                        // 主要退货信息
                        this.maintitle = res.refundStatusContent.content
                        // 时间
                        this.timetitle = res.refundStatusContent.refundTimeTitle
                        // 控制时间显示
                        if(this.refundType ==2){
                            if(this.refundStatus == 4 || this.refundStatus == 7 || this.refundStatus == 8 || this.refundStatus == 9 || this.refundStatus == 3){
                                this.showkey = false
                            }
                        }
                        if(this.refundType ==1 ){
                            if(this.refundStatus ==2 || this.refundStatus ==6){
                                this.lieimgshowkey = 1 
                            }
                        }else if(this.refundType ==2 ){
                            if(this.refundStatus ==2 || this.refundStatus ==6){
                                this.lieimgshowkey = 1 
                            }
                        }
                        if(this.refundType ==1){
                            if(this.refundStatus==2 || this.refundStatus==3 || this.refundStatus==6){
                                this.bottomshow = true
                            }
                        }
                        if(this.refundType ==2){
                            if(this.refundStatus==2 || this.refundStatus==3 || this.refundStatus==6){
                                this.bottomshow = true
                            }
                        }
                        // 底部信息
                        this.reason = res.data.refundReason
                        this.price = res.data.refundAmount
                        this.miaoshu = res.data.refundExplain
                        // 商品
                        this.productName = res.data.productName
                        this.refundCount = res.data.refundCount
                        this.productUrl = res.data.image
                    }else{
                        console.log('载入失败')
                    }
                });
            },
            goRefundDetail(){
                this.$router.push({path: this.routerPath+'/refundDetail',query:{itemId:this.itemId}});
            },
            goback(){
                this.$router.go(-1)
            },
            // 填写订单
            goWrite(){
                this.$router.push({
                    path: this.routerPath+'/writelogistics',
                    query: {
                        itemId: this.$route.query.itemId
                    }
                })
            }
        },
        components: {

        },
    }
</script>
<style lang="css" scoped>
    @import 'refundDetail'; 
</style>
