<template>
    <div class="evaluatePage">
        <div v-title data-title="评价成功"></div>
        <section class="topMou" v-if="isWaitEvaluate == 0 && orderList.length == 0" style="width:100%;background-color:#fff;">
            <div class="coverr" style="width:100%;height:2rem;"></div>
            <div class="topImg">
                <img src="../../common/images/icon_dagou@3x.png">
            </div>
            <div class="txt_1">感谢评价</div>
            <div class="leftImg" style="top: 9.23rem;">
                <img src="../../common/images/littlequan.png">
            </div>
            <div class="txt_2" style="top: 9.14rem;">被评为精选评价将获得优惠券</div>
        </section>
        <section class="topMou" v-if="orderList.length != 0">
            <div class="topImg">
                <img src="../../common/images/icon_dagou@3x.png">
            </div>
            <div class="txt_1">感谢评价</div>
            <div class="leftImg">
                <img src="../../common/images/littlequan.png">
            </div>
            <div class="txt_2">被评为精选评价将获得优惠券</div>
        </section>
        <!-- <ul v-if="!emptyResult && localstatus == 4" :class="{'topJL': isTp }" style="margin-bottom:2.5rem;"> -->
        <!-- 还有待评价订单 -->
        <ul v-if="isWaitEvaluate == 1">
            <div class="topCoverD">这些商品还未评价哦~</div>
            <li class="block block-order animated" v-for="item in orderList" :key="item.orderId">
                <section class="order-content" style="display:block;" @click="showDetail(item.orderId)">
                    <div class="block block-list block-border-top-none block-border-bottom-none">
                        <div class="block-item name-card name-card-3col clearfix">
                            <div style="width:58px;float:left;">
                                <img v-lazy="item.imageUrl" style="width: 2.9rem;height: 2.9rem;"> 
                            </div>
                            <div class="detail">
                                <p style="margin-bottom:6px;font-size: 14px;">{{item.productName}}</p>
                            </div>
                            <div class="right-col">
                                <div class="price font_size_13" style="color: #545454"><span>{{item.price?'￥'+item.price:''}}</span></div>
                                <div class="num font_size_12">×<span class="num-txt">{{item.productNumber}}</span></div>
                            </div>
                            <div class="proTag">{{ item.productTags }}</div>
                        </div>
                    </div>
                </section>
                <div class="clearfix" style="width:100%;float:right;">
                    <p @click="goEvaluate(item)" class="orange-color js-delete-order font-size-12 btn-payment bordercolor1" style="float:right">去评价</p>
                </div>
            </li>
        </ul>
        
        <!-- 无待评价订单 -->
        <div v-if="isWaitEvaluate == 0 && orderList.length != 0" class="topCoverD">听说分享评论更易邀请下线哦~</div>
        <div v-if="isWaitEvaluate == 0 && orderList.length != 0" v-for="item in orderList" :key="item.orderId">  
            <div class="noWaitList">
                <div class="time">{{item.evaluateTime}}</div>
                <div class="rightImg" v-if="item.status == 3">
                    <img src="../../common/images/hg__2.png">
                </div>
                <div class="contentk">
                    {{item.content}}
                </div>
                <div class="evaluateImg">
                    <img :src="url.imageUrl" v-for="url in item.imageUrlList">
                </div>
                <!-- <div class="share"  @click="goshare(item)">   
                    <div class="goshare"></div>
                    <img class="shareimg" src="../../common/images/sh.png">
                    <div class="sgaretxt">分享</div>
                </div> -->
            </div>
        </div>

        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
    </div>

</template>

<script>
    import { productEvaluateList, applyEvaluate, webUploadImage, orderList} from 'api'
    import qs from 'qs'
    import alertTip from 'base/alertTip/alertTip'
    import { rootPath } from 'config/env'
    import storage from 'good-storage'
    import wx from 'weixin-js-sdk'
    import { baseUrl } from 'config/env'
    import loading from 'base/loading/loading'
    export default {
        data(){
            return{
                routerPath:'',
                show: false, //显示提示框
                showAlert: false, //弹出框
                alertText: null, //弹出框信息
                showLoading: false, //显示加载动画
                orderPram: {
                    status: '4',
                    pageidx: 1,
                    pagesize: 100,
                    isOrderPage: ''
                }, //请求对象
                orderList: [], //订单列表
                isWaitEvaluate:'',
            }
        },
        created(){
            this.routerPath = rootPath;
        },
        mounted(){
            this.getOrderList();
        },
        methods: {
            getOrderList() {
                let me = this;
                this.showLoading = true;

                this.orderPram.a = 'v1/orderList'
                let params = qs.stringify(this.orderPram)
                orderList(params).then(res => {
                    console.log('订单列表----')
                    console.log(res);
                    this.isWaitEvaluate = res.isWaitEvaluate
                    this.showLoading = false;
                    if (res.code != '1') return

                    this.pageMax = res.pageMax;
                    sessionStorage.OrderPageMax=res.pageMax;
                    sessionStorage.orderStatus = this.orderStatus;
                    if (!res.dataList.length) {
                        this.emptyResult = true;
                        sessionStorage.OrderEmptyResult=true;
                        sessionStorage.orderList=JSON.stringify(res.dataList);
                    } else {
                        sessionStorage.OrderEmptyResult=false;
                        if (res.dataList.length < this.orderPram.pagesize) {
                            this.nomore = true;
                        }
                        this.emptyResult = false;
                        this.orderList = res.dataList;
                        sessionStorage.orderList=JSON.stringify(res.dataList);
                    }
                })
                // .catch(function(err) {
                //     this.showLoading = false;
                // });
            },
            goEvaluate(item){  //去评价
                this.$router.push({
                    path: this.routerPath+'/evaluate',query:{itemId:item.itemId,orderId:item.orderId,url:item.imageUrl}
                });
            },
            goshare(item){
                // 创建待分享缓存
                var imageUrlList = JSON.stringify(item.imageUrlList);
                sessionStorage.waitShareUrlList = imageUrlList   //晒图
                sessionStorage.waitShareContent = item.content  //评价内容
                sessionStorage.waitShareName = item.productName  //商品名字
                sessionStorage.waitShareImage = item.productImage  //商品图片
                console.log('save success , wait Share')
                
                this.$router.push({
                    path: this.routerPath+'/evaluateShare',query:{}
                });
            }
        },
        components: {
            alertTip,
            loading
        }
    }
</script>

<style lang="css" scoped>
    @import 'evaluateSuccess';
    .evaluatePage{
        height: 100%;
        background-color: #fff;
    }
    .activek{
        visibility:hidden;
    } 
    .active1{
        border: .042667rem dashed #fff!important;
    } 
</style>
