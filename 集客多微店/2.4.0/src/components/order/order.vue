<template>
    <div class="order_page">
        <!-- <lazy-render :time="300" style="margin-bottom: 60px;"> -->
            <div v-title data-title="订单列表"></div>
            <div v-stat="{type:'pageview', title:'订单列表'}"></div>
            <header class="head_top">
                <div class="tabber">
                    <span :class='{active: orderStatus =="0"}' @click="orderStatusChange(0)">全部</span>
                    <span :class='{active: orderStatus =="1"}' @click="orderStatusChange(1)">待付款</span>
                    <span :class='{active: orderStatus =="2"}' @click="orderStatusChange(2)">待发货</span>
                    <span :class='{active: orderStatus =="3"}' @click="orderStatusChange(3)">已发货</span>
                    <!-- <span :class='{active: orderStatus =="4"}' @click="orderStatusChange(4)">待评价</span> -->
                    <!-- <span :class='{active: orderStatus =="6"}' @click="orderStatusChange(6)">售后</span> -->
                </div>
            </header>
            <div class="order_list_ul">
                <div class="headImg" v-if="orderList != '' && this.orderPram.status == 4 && topcoverimg!= ''" @click="gohead()">
                    <img :src='topcoverimg'>
                </div>
                <div v-if="emptyResult" class="empty-list list-finished" style="padding-top: 60px;">
                    <div>
                        <p class="noorder">居然还没有订单</p>
                        <p class="font-size-12">好东西，手慢无</p>
                    </div>
                    <!-- <div>
                        <router-link :to="{path:  routerPath+'/index'}" class="tag tag-big tag-orange" style="padding:8px 30px;">去逛逛</router-link>
                    </div> -->
                </div>
                <!-- <scroller v-if="!emptyResult"  style="padding-top: 2rem;"
                    :on-infinite="infinite"> -->
                <ul v-if="!emptyResult && localstatus != 4" :class="{'topJL': isTp }" style="margin-bottom:2.5rem;">
                    <li class="block block-order animated" v-for="item in orderList">
                        <div class="header">
                            <!-- <i class="store_icon"></i> -->
                            <span style="margin:0 10px 0 0;color:#999;font-size: 12px;">{{item.storeName}}</span>
                            <span style="color:#999;font-size:12px;margin-left:-10px;">{{orderNoName + item.orderNo}}</span>
                            <span v-if="orderStatus != 6" class="orange-color order_status">{{ item.status|orderStatusDesc1 }}</span>
                            <span v-if="orderStatus == 6" class="orange-color order_status">{{ item.status|refundStatus }}</span>
                        </div>
                        <section class="order-content" style="display:block;" v-for="product in item.productList" @click="showDetail(item.orderId)">
                            <div class="block block-list block-border-top-none block-border-bottom-none">
                                <div class="block-item name-card name-card-3col clearfix">
                                    <div style="width:2.474667rem;float:left;">
                                        <img v-lazy="product.imageUrl" style="width: 2.9rem;height: 2.9rem;"> 
                                        <img v-show="product.isSoldout=='1'" src=" ../../common/images/icon_qiangguang.png" style="position: absolute;top: 0.34rem;width: 2.9rem;height: 2.9rem;">
                                    </div>
                                    <div class="detail">
                                        <p style="margin-bottom:.256rem;font-size: 14px;">{{product.productName}}</p>
                                    </div>
                                    <div class="right-col">
                                        <div class="price font_size_13" style="color: #545454"><span>{{product.price?'￥'+product.price:''}}</span></div>
                                        <div class="num font_size_12">×<span class="num-txt">{{product.productNumber}}</span></div>
                                        <div v-if="orderStatus != 6"> 
                                            <span class="orange-color order_status">{{ product.refundStatus | refundStatus }}</span>
                                        </div>
                                    </div>
                                    <div class="proTag">{{ product.productTags }}</div>
                                    <!-- <div class="refundTag">退款中</div> -->
                                </div>
                            </div>
                        </section>
                        <div class="bottom" style="width:100%;float:right;" v-if="orderStatus != 6">
                            <div class="clearfix" style="float:right"><span class="font_size_11 font_color_black_3">共{{item.totalNumber}}件&nbsp;合计</span><span class="dark_gray font_size_13 font_color_black_2">￥{{item.payAmount}}</span>&nbsp;&nbsp;<span class="font_size_11 font_color_black_2">(含快递￥{{item.postage}}<span class="font_size_11 font_color_black_2" style="margin-left:.3rem;" v-if="item.productType == 2">含税费￥{{item.tax}}</span>)</span></div>
                        </div>
                        <div class="bottom" style="width:100%;float:right;" v-if="orderStatus == 6">
                            <div class="clearfix" style="float:right"><span class="font_size_11 font_color_black_3"><span style="font-size:.469333rem;color:#666666">退款金额：</span><span style="font-size:.469333rem;color:#FB4A4C">{{item.payAmount?'￥'+item.payAmount:''}}</span></span></div>
                        </div>
                        <div class="clearfix" style="width:100%;float:right;">
                            <p v-if="item.status==1 && orderStatus != 6" @click="doPayOrder(item)" class="orange-color js-delete-order font-size-12 btn-payment bordercolor1" style="float:right">付款</p>
                            <p v-if="item.status==1 && orderStatus != 6" @click="docancelOrder(item)" class="orange-color js-delete-order font-size-12 btn-payment bordercolor2" style="float:right">取消付款</p>
                            <p v-if="item.status==3 && orderStatus != 6" @click="doSureGet(item)" class="orange-color js-delete-order font-size-12 btn-payment bordercolor1" style="float:right">确认收货</p>
                            <p v-if="item.status==3 && orderStatus != 6" @click="goLogistics(item)" class="orange-color js-delete-order font-size-12 btn-payment bordercolor1" style="float:right">查看物流</p>
                            <p v-if="item.status==4 && orderStatus != 6" @click="goLogistics(item)" class="orange-color js-delete-order font-size-12 btn-payment bordercolor1" style="float:right">查看物流</p>
                            <p v-if="item.status==2 && orderStatus != 6" @click="goLogistics(item)" class="orange-color js-delete-order font-size-12 btn-payment bordercolor1" style="float:right">查看物流</p>
                            <p v-if="item.status==5 && orderStatus != 6" @click="doDelOrder(item)" class="orange-color js-delete-order font-size-12 btn-payment bordercolor2" style="float:right">删除订单</p>
                            <router-link v-if="orderStatus == 6" :to="{path: routerPath+'/refundDetail',query:{itemId:item.orderId}}" class="orange-color js-delete-order font-size-12 btn-payment bordercolor2" style="float:right">查看详情</router-link>
                        </div>
                    </li>
                </ul>
                <ul v-if="!emptyResult && localstatus == 4" :class="{'topJL': isTp }" style="margin-bottom:2.5rem;">
                    <li class="block block-order animated" v-for="item in orderList" >
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
            </div>
            <p v-show='nomore' class="empty_data">没有更多了</p>
            <aside class="return_top" @click="backTop" v-if="showBackStatus">
                <svg class="back_top_svg">
    				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#backtop"></use>
    			</svg>
            </aside>
            <footer class="loader_more" v-show="preventRepeatReuqest">正在加载更多商品...</footer>
            <div ref="abc" style="background-color: red;"></div>
    
            <section class="coverpart" v-if="show" @click="cancelDel()">
                <section class="cover-background"></section>
                <section class="cover-content " :class="{'cover-animate' : isEnter, 'cover-animate-leave' : isLeave}">
                    <h2>{{showTxt}}</h2>
                    <div class="sa-botton">
                        <button class="waiting" @click="cancelDel">取消</button>
                        <div style="display:inline-block;">
                            <button class="quitlogin" @click="confirmDel">{{showconfirmText}}</button>
                        </div>
                    </div>
                </section>
            </section>
    
            <transition name="fade">
                <div class="cover" v-if="showPayWay" @click="showPayWayFun"></div>
            </transition>

            <!-- 付款面板 -->
            <transition name="slid_up">
                <div class="choose_type_Container" v-if="showPayWay">
                    <div class="choose_type_Container" v-if="showPayWay">
                        <div class="pay_msg1">
                            <span>请选择支付方式</span>
                            <img src="../../common/images/icon_guanbi@2x.png" @click="showPayWayFun">
                        </div>
                        <div class="pay_msg pay_msg2">
                            <span class="order_time_msg">请在72小时内完成支付</span>
                            <span class="order_money">¥{{oprOrder.payAmount}}</span>
                        </div>
                        <div class="pay_msg pay_msg5" style="display:block;">
                            <img class="pay_icon" src="../../common/images/webcatpay.png">
                            <span class="pay_text">微信支付（推荐）</span>
                            <img class="pay_select_icon" v-if="payType==0" @click="surePayway(1)" src="../../common/images/icon_dagou@2x.png">
                            <img class="pay_select_icon" v-if="payType!=0" @click="surePayway(0)" src="../../common/images/icon_yuan@2x.png">
                        </div>
                        <div class="pay_msg pay_msg5">
                            <img class="pay_icon" src="../../common/images/icon_union.png">
                            <span class="pay_text">美付宝快捷支付</span>
                            <img class="pay_select_icon" v-if="payType==1" @click="surePayway1(0)" src="../../common/images/icon_dagou@2x.png">
                            <img class="pay_select_icon" v-if="payType!=1" @click="surePayway1(1)" src="../../common/images/icon_yuan@2x.png">
                        </div>
                        <!-- <div class="pay_msg pay_msg2" @click="showAlipay">
                            <span class="order_time_msg" style="color:#999">更多支付方式</span>
                            <span class="order_money" style="color:#999"> <img src="../../common/images/arrowdown.png" width="20"></span>
                        </div>
                        <div class="pay_msg pay_msg5" v-show="alipay" style="display:block;">
                            <img class="pay_icon" src="../../common/images/zhifubao.png">
                            <span class="pay_text">支付宝支付</span>
                            <img class="pay_select_icon" v-if="payType==1" @click="surePayway(0)" src="../../common/images/icon_dagou@2x.png">
                            <img class="pay_select_icon" v-if="payType!=1" @click="surePayway(1)" src="../../common/images/icon_yuan@2x.png">
                        </div> -->
                        <div class="pay_msg6">
                            <div class="pay_button" @click.stop="submitPay(oprOrder)">确认支付</div>
                        </div>
                    </div>
                </div>
            </transition>
            <loading-toast v-if="showLoadingToast" @closeTip="showLoadingToast = false" :loadingText="loadingText"></loading-toast>
        <!-- </lazy-render> -->
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>
        <!--<div class="search_none" v-if="emptyResult">很抱歉！无搜索结果</div>-->
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
         <div class="cover22" v-if="showCover"  @click.self="closeCover"> 
            <div><img class="ercode" :src="ercode"></div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    import headTop from 'base/head/head'
    import loading from 'base/loading/loading'
    import footGuide from 'base/footer/footGuide'
    import alertTip from 'base/alertTip/alertTip'
    import loadingToast from 'base/loadingToast/loadingToast'
    import { rootPath } from 'config/env'
    import { orderList, cancelOrder, queryTake, deleteOrder, orderPay } from 'api'
    import qs from 'qs'
    // import {orderList, cancelOrder, queryTake, deleteOrder, orderPay} from 'src/service/getData'
    // import { getImgPath, loadMore} from 'src/components/common/mixin'
    // import {showBack, animate, isWeiXin, wxHideOptionMenu} from 'common/js/utils'
    import { isWeiXin } from 'common/js/utils'
    import sa from 'sa-sdk-javascript';

    export default {
        data() {
            return {
                routerPath:'',
                orderList: [], //订单列表
                showAlert: false, //弹出提示框
                show: false, //显示确认提示框
                showTxt: '', //确认框提示文字
                showLoadingToast: false,//显示loadingToast
                loadingText:'',//loadingTost 提示信息
                showconfirmText: '确定', //确认框确认按钮文
                porType: 1, //操作类型 1-取消订单 2-删除订单 3-确认收货
                oprOrderId: '', //需要操作的订单号
                oprOrder: {}, //需要操作的订单
                showPayWay: false, //显示付款方式
                payType: 0, //付款方式 0-微信 1-支付宝
                alipay: false, //现在支付宝支付
                offset: 0,
                preventRepeat: false, //防止重复获取
                showLoading: false, //显示加载动画
                orderStatus: 0,
                pageMax: 0, //总页数
                nomore: false, //没有更多啦
                preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
                showBackStatus: false, //显示返回顶部按钮
                emptyResult: false, // 搜索结果为空时显示
                orderPram: {
                    status: '0',
                    pageidx: 1,
                    pagesize: 100,
                    isOrderPage: ''
                }, //请求对象
                showCover: false,
                ercode:'',//二维码
                orderNoName:'订单号：',
                listlength:'8',
                key:1,
                isevaluate: 0, //是否评价订单
                localstatus:'',
                isTp: false,
                isOrderPage :'',  //附带参数
                topcoverimg:'',
            }
        },
        created() {
            this.orderStatus = this.$route.query.tab;
            this.orderPram.status = this.orderStatus;
            this.routerPath = rootPath;
            // wxHideOptionMenu();
            this.localstatus = this.orderPram.status
            console.log(this.localstatus)
            if(sessionStorage.topimg){
                this.topcoverimg = sessionStorage.topimg   
            }
        },
        mounted() {

            sa.track('$pageview', {
              $title: document.title,
              $url: location.href,
              $url_path: location.pathname,
              $referrer_host: location.hostname,
              $referrer: document.referrer,
            })
            this.getOrderList();
            let me=this;
            if(window.isOrderLoadData!=true||!window.localStorage||window.comeBackorder){
                window.isOrderLoadData=true;
                this.showLoading = true;
                sessionStorage.orderpageidx=1;
                this.getOrderList();
            }else{
                this.orderList =  JSON.parse(sessionStorage.orderList);
                this.orderStatus= sessionStorage.orderStatus;
                this.pageMax= sessionStorage.OrderPageMax;
                if(this.orderList .length>0){
                    this.emptyResult = false;
                }else{
                    this.emptyResult = true;
                }
                this.orderPram.pageidx=sessionStorage.orderpageidx;
            }
            this.bottom = 8
        
        },
        // mixins: [loadMore, getImgPath],
        methods: {
            // ...mapMutations([
            //     'SAVE_ORDER'
            // ]),
            infinite (done) {
                console.log('触发下拉')
                let me = this;
                if(me.key == 0){
                    return
                }
                this.showLoading = true;
                let infi = setTimeout(() => {
                    me.orderPram.pagesize = this.bottom + 5
                    this.bottom = me.orderPram.pagesize
                    this.orderPram.a = 'v1/orderList'
                    let params = qs.stringify(this.orderPram)
                    orderList(params).then(res => {
                        console.log(me.listlength)
                        console.log(res.dataList.length)
                        console.log('订单列表----')
                        console.log(res);
                        if (res.code != '1') return
                        if(res.dataList.length == me.listlength){
                            me.showLoading = false;
                            window.clearTimeout(infi);
                            let infi = null
                            me.key = 0
                            return
                        }
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
                            // console.log(res.headerImageList[0].imageUrl)
                            sessionStorage.orderList=JSON.stringify(res.dataList);
                        }
                        me.showLoading = false;
                        me.listlength  = res.dataList.length
                    })
                    done()
                    window.clearTimeout(infi);
                    let infi = null
                }, 1500)
            },
            // 去往售后详情
            goRefundMain(item){
                console.log(item)
            },
            //显示详情页
            showDetail(id) {
                if(this.orderPram.status == 6){   //去往售后信息
                    
                }else{  //去往订单详情
                    this.preventRepeat = false;
                    this.$router.push({
                        path:this.routerPath+'/orderDetail',
                        query: {
                            id: id
                        }
                    });
                }
            },
            getOrderList() {
                let me = this;
                this.showLoading = true;

                if(this.orderPram.status == 4 ){
                    this.orderPram.isOrderPage = 1
                }

                this.orderPram.a = 'v1/orderList'
                let params = qs.stringify(this.orderPram)
                orderList(params).then(res => {
                    console.log('订单列表----')
                    console.log(res);

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
                        if(this.orderPram.isOrderPage = 1){
                            this.topcoverimg = res.headerImageList[0].imageUrl
                        }
                        sessionStorage.topimg = res.headerImageList[0].imageUrl
                        sessionStorage.orderList=JSON.stringify(res.dataList);
                    }
                })
                // .catch(function(err) {
                //     this.showLoading = false;
                // });
            },
            //返回顶部
            backTop() {
                animate(document.body, {
                    scrollTop: '0'
                }, 400, 'ease-out');
            },
            //切换tab
            orderStatusChange(id) {  
                this.nomore = false;
                this.emptyResult = false;
                this.orderList = [];
                this.orderStatus = id;
                this.orderPram.status = id;
                this.orderPram.pageidx = 1;
                sessionStorage.orderStatus=id;
                this.localstatus = id;
                this.orderPram.isOrderPage = '';
                if(id == 4){
                    this.orderPram.isOrderPage = 1
                }
                if(id == 6){
                    this.$router.push({path: this.routerPath+'/refundList',query:{tab:6}});
                }
                this.getOrderList();
            },
            doOprOrder() {
                this.show = true;
                this.isEnter = true;
                this.isLeave = false;
            },
            //到达底部加载更多数据
            loaderMore() {
                let me = this;
                //防止重复请求
                if (me.orderPram.pageidx < me.pageMax) {
                    if (me.preventRepeatReuqest) {
                        return
                    }
                    me.showLoading = true;
                    me.preventRepeatReuqest = true;
                    //数据的定位加20位
                    me.orderPram.pageidx =Number(me.orderPram.pageidx)+1;
                    sessionStorage.orderpageidx=me.orderPram.pageidx;
                    let params = qs.stringify(me.orderPram)
                    orderList(params).then(res => {
                        me.showLoading = false;
                        me.orderList = [...this.orderList, ...res.orderList];
                        sessionStorage.orderList=JSON.stringify(me.orderList);
                        me.preventRepeatReuqest = false;
                        if (res.orderList.length < me.orderPram.pagesize) {
                            me.nomore = true;
                            return;   
                        }
                    }).catch(function(err) {
                        me.showLoading = false;
                        me.preventRepeatReuqest = false;
                    });
                }else{
                      me.nomore = true;
                }
            },
            //取消
            cancelDel() {
                clearTimeout(this.timer)
                this.isEnter = false;
                this.isLeave = true;
                this.timer = setTimeout(() => {
                    clearTimeout(this.timer)
                    this.show = false;
                }, 200)
            },
            //确定
            confirmDel() {
                console.log()
                let me = this;
                if (this.porType == 1) { //取消订单
                    let params = qs.stringify({
                        orderId: this.oprOrderId
                    })
                    cancelOrder(params).then(res => {
                        if (res.code == "1") {
                            this.getOrderList();
                        } else {
                            me.showAlert = true;
                            me.alertText = res.msg;
                        }
                    });
                } else if (this.porType == 2) { //删除订单
                    let params = qs.stringify({
                        orderId: this.oprOrderId
                    })
                    deleteOrder(params).then(res => {
                        console.log('删除订单----')
                        console.log(res);
                        if (res.code == "1") {
                            this.getOrderList();
                        } else {
                            me.showAlert = true;
                            me.alertText = res.msg;
                        }
                    });
                } else if (this.porType == 3) { //确认收货
                    let params = qs.stringify({
                        orderId: this.oprOrderId
                    })
                    queryTake(params).then(res => {
                        if (res.code == "1") {
                            this.getOrderList();
                        } else {
                            me.showAlert = true;
                            me.alertText = res.msg;
                        }
                    });
                }
                clearTimeout(this.timer)
                this.isEnter = false;
                this.isLeave = true;
                this.timer = setTimeout(() => {
                    clearTimeout(this.timer)
                    this.show = false;
                }, 200)
            },
    
            doPayOrder(order) { //去支付
                this.oprOrder = order;
                this.oprOrderId = order.orderId;
                this.showPayWayFun();
            },
            docancelOrder(order) { //取消订单
                this.porType = 1;
                this.oprOrderId = order.orderId;
                this.showTxt = "是否确认取消该订单？";
                this.showconfirmText = "确定";
                this.doOprOrder();
            },
            doSureGet(order) { //确认收货
                this.porType = 3;
                this.oprOrderId = order.orderId;
                this.showTxt = "是否确认该订单收货？";
                this.showconfirmText = "确定";
                this.doOprOrder();

            },
            doDelOrder(order) { //删除订单
                this.porType = 2;
                this.oprOrderId = order.orderId;
                this.showTxt = "是否确认删除该订单？";
                this.showconfirmText = "删除";
                this.doOprOrder();
            },
            goLogistics(order) { //查看物流
                console.log(order)
                this.$router.push({
                    path:  this.routerPath+'/order/logistics',
                    query: {
                        orderId: order.orderId
                    }
                });
            },
    
            showPayWayFun() {
                this.showPayWay = !this.showPayWay;
            },
            //选择付款方式
            surePayway(type) {
                console.log(type)
                if (type == "1") {
                    this.alipay = true;
                }
                this.payType = 0;

            },
            surePayway1(type) {
                console.log(type)
                if (type == "1") {
                    this.alipay = true;
                }
                this.payType = 1;
                
            },
            showAlipay() {
                this.alipay = !this.alipay;
                if( this.alipay){
                    this.payType = 1;
                }else{
                    this.payType = 0;
                }
            },
            submitPay(oprOrder) {
                console.log(oprOrder)
                this.showPayWay = !this.showPayWay
                let me = this;
                me.showLoadingToast = true;
                me.loadingText = "订单正在提交....";
                let paybo = {
                    orderId: this.oprOrderId,
                    isWeb: true
                }
                if(this.payType == 1){
                    me.$router.push({path: me.routerPath+'/yytOrderDetail',query:{orderId:this.oprOrderId,price:oprOrder.payAmount,num:oprOrder.orderNo}});
                }else if (this.payType == 0) {
                    paybo.payType = "weixin";
                    let params = qs.stringify(paybo)
                    orderPay(params).then(res => {
                        console.log('订单支付----')
                        console.log(res);

                        me.showLoadingToast=false;
                        if (res.code == "1") {
                            if(res.orderPayInfo.isOther=="1"){
                                me.ercode=res.orderPayInfo.imagePath;
                                me.showCover = true;
                                return;
                            }
                            if (isWeiXin() && this.payType == 0) {
                                function onBridgeReady() {
                                    WeixinJSBridge.invoke(
                                        'getBrandWCPayRequest', {
                                            "appId": res.orderPayInfo.appId, //公众号名称，由商户传入     
                                            "timeStamp": res.orderPayInfo.timeStamp, //时间戳，自1970年以来的秒数     
                                            "nonceStr": res.orderPayInfo.nonceStr, //随机串     
                                            "package": res.orderPayInfo.package,
                                            "signType":res.orderPayInfo.signType, //微信签名方式：     
                                            "paySign": res.orderPayInfo.paySign //微信签名 
                                        },
                                        function(res2) {
                                            if (res2.err_msg == "get_brand_wcpay_request:ok") {
                                                me.showAlert = true;
                                                me.alertText = "订单支付成功！";
                                                me.$router.push({path: me.routerPath+'/paySuccess',query:{id: res.orderId}});
                                            } else if(res3.err_msg == "get_brand_wcpay_request:cancel"){
                                                me.showAlert = true;
                                                me.alertText = "订单支付取消！";
                                            }else{
                                                me.showAlert = true;
                                                me.alertText = "订单支付失败！";
                                            }
                                        });
                                }
                                if (typeof WeixinJSBridge == "undefined") {
                                    if (document.addEventListener) {
                                        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                                    } else if (document.attachEvent) {
                                        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                                        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                                    }
                                } else {
                                    onBridgeReady();
                                }
                            } else if (this.payType == 1) {
                                me.getOrderList();
                                window.location.href = res.orderPayInfo;
                            } else {
                                me.showAlert = true;
                                me.alertText = "请在微信浏览器中打开";
                            }
                        } else {
                            me.showAlert = true;
                            me.alertText = res.msg;
                        }
                    });
                }
            },
            closeCover(){
                this.showCover=false;
            },
            goEvaluate(item){  //去评价
                // alert('前往评价')
                this.$router.push({
                    path: this.routerPath+'/evaluate',query:{itemId:item.itemId,orderId:item.orderId,url:item.imageUrl}
                });
            },
            gohead(){
                this.$router.push({
                    path: this.routerPath+'/evaluateIntroduce',query:{tab:4}
                });
            }
        },
        components: {
            headTop,
            footGuide,
            loading,
            alertTip,
            loadingToast
        },
        filters: {
            orderStatusDesc: function(value) {
                switch (value) {
                    case '1':
                        return value = '待付款';
                    case '2':
                        return value = '待发货';
                    case '3':
                        return value = '已发货';
                    case '4':
                        return value = '已完成';
                    case '5':
                        return value = '退款成功';
                    case '6':
                        return value = '退款中';
                    case '7':
                        return value = '买家确认收货';
                }
            },
            orderStatusDesc1: function(value) {
                switch (value) {
                    case '1':
                        return value = '待付款';
                    case '2':
                        return value = '待发货';
                    case '3':
                        return value = '已发货';
                    case '4':
                        return value = '已完成';
                    case '5':
                        return value = '交易关闭';
                    case '6':
                        return value = '退款中';
                    case '7':
                        return value = '买家确认收货';
                }
            },
            refundStatus:function(value){
                switch (value) {
                    case '1':
                        return value = '退款中';
                    case '7':
                        return value = '退款中';
                    case '8':
                        return value = '退款中';
                    case '3':
                        return value = '退款中';
                    case '4':
                        return value = '退款中';
                    case '9':
                        return value = '退款中';
                    case '2':
                        return value = '退款失败';
                    case '6':
                        return value = '退款失败';
                    case '5':
                        return value = '退款成功';
                }
            }
        },
        beforeRouteEnter (to, from, next) {
           if(from.path.indexOf("orderDetail")>=0||from.path.indexOf("logistics")>0){
                window.comeBackorder=false;
                next();
           }else{
                window.comeBackorder=true;
                next();
           }
        },
        watch:{
            localstatus(newValue, oldValue){
                this.isTp = false
                if(newValue == '4'){
                    this.isTp = true
                }
            },
        }
    }
</script>

<style lang="css" scoped>
    @import 'order';
    .topJL{
        /* margin-top: 4.26666rem; */
    }
</style>
