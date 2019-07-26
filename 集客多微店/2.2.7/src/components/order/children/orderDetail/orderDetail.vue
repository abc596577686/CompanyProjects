<template>
    <div class="order_detail_page">
        <!-- <lazy-render :time="300"> -->
            <div v-title data-title="订单详情"></div>
            <div v-stat="{type:'pageview', title:'订单详情'}"></div>

            <section class="order_info_top">
                <label v-if="orderData.status != 1">{{orderData.status|orderStatusDesc}}</label>
                <div v-if="orderData.status == 1" class="waitpay">待付款</div>
                <div v-if="orderData.status == 1" class="waitpay1">{{setTime!=''?'剩'+setTime+'完成支付，超时自动取消':''}} </div>
            </section>
            <section class="white_color">
                <div class="order_ad">
                    <span class="location_icon">&nbsp;</span>
                </div>
                <div>
                    <div style="padding:.213333rem 0 .213333rem .213333rem">
                        <p class="order_sh d">
                            <span>收货人: </span>
                            <span style="margin-left:5px;">{{orderData.name}}</span>
                            <span style="margin-left:20px;">{{orderData.mobile}}</span>
                        </p>
                        <p class="order_ad d">
                            <span>收货地址: </span>
                            <span>{{orderData.address}}</span>
                        </p>
                        <p v-if="orderData.buyWayType==1" class="order_ad d" style="margin-top:5px;margin-left: 1.7rem;">
                            <span style="color:#fe5000;">请截图已保存到店时凭单号到店提货</span>
                        </p>
                    </div>
                </div>
            </section>
            <section class="order_info white_color">
                <ul class="order_info_one">
                    <li v-for="product in productList">
                        <div class="order_info_one_div">
                            <router-link :to="{path: routerPath+'/productDetail',query:{shopid:shopid,productId:product.productId}}" class="thumb" style="color:#333;">
                                <img v-lazy="product.imageUrl">
                                <img v-show="product.isSoldOut=='1'" src="../../../../common/images/icon_qiangguang.png" style="position: absolute;width: 20%;height: 3.4rem; left: 0;">
                            </router-link>
                            
                            <div>
                                <p class="order_info_one_txt">
                                    <router-link :to="{path:  routerPath+'/productDetail',query:{shopid:shopid,productId:product.productId}}">
                                        <span class="order_product_name">{{product.productName}}</span>
                                    </router-link>
                                </p>
                            </div>
                            <div class="l_indent_content_shop_right">
                                <p class="l_indent_content_shop_num">¥{{product.price}}</p>
                                <p class="l_indent_content_shop_sl">x{{product.productNumber}}</p>
                                <p class="l_indent_content_shop_rufund">{{ product.rufundStatusName }}</p>
                            </div>
                            <div class="proTags">{{product.productTags}}</div>
                            <div v-if="product.refundStatus !=0 && product.refundStatus ==6 && product.isPackage!=1" class="refundTag1" @click="showwarntitle()">
                                申请售后
                            </div>
                            <router-link v-if="product.refundStatus == 0 && orderData.status !=1 && orderData.status !=5 && product.isPackage!=1" class="refundTag1" :to="{path: routerPath+'/applyrefund',query:{itemId:product.orderItemId,orderId:pram.orderId}}">
                                申请售后
                            </router-link>
                            <router-link v-if="product.refundStatus !=0 && product.refundStatus !=6" class="refundTag2" :to="{path:routerPath+'/refundDetail',query:{itemId:product.orderItemId}}">
                                {{product.refundStatus|refundTag}}
                            </router-link>
                        </div>
                    </li>
                </ul>
                <ul class="order_info_two white_color">
                    <li>
                        <div class="l_indent_content_shop_yf">
                            <p class="l_yf_p">运费</p>
                            <p class="l_yf_num">¥ {{orderData.postage}}</p>
                        </div>
                    </li>
                    <li style="margin-top: -0.213rem;">
                        <div class="l_indent_content_shop_yf">
                            <p class="l_yf_p">进口税</p>
                            <p class="l_yf_num">¥ {{orderData.tax?orderData.tax:'0.0'}}</p>
                        </div>
                    </li>
                    <li style="margin-top: -0.213rem;">
                        <div class="l_indent_content_shop_yf">
                            <p class="l_yf_p">优惠券</p>
                            <p class="l_yf_num">- ¥ {{orderData.preferentialAmount}}</p>
                        </div>
                    </li>
                    <li>
                        <div class="l_indent_content_shop_yf">
                            <p class="l_yf_p_d">实际付款(含运费)</p>
                            <p class="l_yf_num_d">¥ {{orderData.payAmount}}</p>
                        </div>
                    </li>
                </ul>
            </section>
            <section class="manager">
                <a class="mana1" href="https://jikeduo.qiyukf.com/client?k=06f1b1294f5f993266d9931f9be05e51&wp=1">
                    <img src="../../../../common/images/kfimg@2x.png" @click="showPayWayFun">
                    <span>在线客服</span>
                </a>
                <a class="mana2" href='tel://4000639639'>
                    <img src="../../../../common/images/phone@2x.png" @click="showPayWayFun">
                    <span>电话客服</span>    
                </a>
            </section>
            <section class="order_info_bot white_color">
                <p class="l_indent_content_shop_bh one">订单编号:<span>{{orderData.orderNo}}</span></p>
                <button class="fuzhi" 
                    v-clipboard:copy="orderData.orderNo"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                >复制</button>
                <p class="l_indent_content_shop_bh two">创建时间: <span>{{createTime}}</span></p>
                <p v-if="orderData.status != 1 && payTime!='' && payTime!=0" class="l_indent_content_shop_bh two">付款时间: <span>{{payTime}}</span></p>
                <p v-if="orderData.status == 4" class="l_indent_content_shop_bh two">发货时间: <span>{{sendTime}}</span></p>
                <p v-if="orderData.status == 4" class="l_indent_content_shop_bh two">成交时间: <span>{{complateTime}}</span></p>
                <!-- <p v-if="orderData.status == 2" class="l_indent_content_shop_bh two">付款时间: <span>{{payTime}}</span></p> -->
            </section>
            <section class="order-detail-footer white_color" v-if="orderData.status != 2 ">
                <!-- <p v-if="orderData.status!=1&&orderData.status!=5" @click="goTel()" class="btn-payment bordercolor2 order-detail-bth-style">售后咨询</p> -->
                <p v-if="orderData.status==1" @click="ggPayOrder2(orderData)" class="btn-payment  bordercolor1 order-detail-bth-style">付款</p>
                <p v-if="orderData.status==1" @click="ggcancelOrder2(orderData)" class="btn-payment bordercolor2 order-detail-bth-style">取消订单</p>
                <p v-if="orderData.status==3" @click="ggSureGet2(orderData)" class="btn-payment bordercolor1 order-detail-bth-style">确认收货</p>
                <p v-if="orderData.status==3 || orderData.status==4" @click="ggLogistics2(orderData)" class="btn-payment bordercolor2 order-detail-bth-style">查看物流</p>
                <p v-if="orderData.status==5" @click="ggDelOrder2(orderData)" class="btn-payment bordercolor2 order-detail-bth-style">删除订单</p>
            </section>
            <section class="coverpart" v-if="show">
                <section class="cover-background" @click="close11"></section>
                <section class="cover-content " :class="{'cover-animate' : isEnter, 'cover-animate-leave' : isLeave}">
                    <h2>{{showTxt}}</h2>
                    <div class="sa-botton">
                        <button class="waiting" @click="ggcancelDel2">取消</button>
                        <div style="display:inline-block;">
                            <button class="quitlogin" @click="ggconfirmDel2">{{showconfirmText}}</button>
                        </div>
                    </div>
                </section>
            </section>
            <transition name="fade">
                <div class="cover" v-if="showPayWay" @click="showPayWayFun"></div>
            </transition>
            <transition name="slid_up">
                <div class="choose_type_Container" v-if="showPayWay">
                    <div class="choose_type_Container" v-if="showPayWay">
                        <div class="pay_msg1">
                            <span>请选择支付方式</span>
                            <img src="../../../../common/images/icon_guanbi@2x.png" @click="showPayWayFun">
                        </div>
                        <div class="pay_msg pay_msg2">
                            <span class="order_time_msg">请在72小时内完成支付</span>
                            <span class="order_money">¥{{orderData.payAmount}}</span>
                        </div>
                        <div class="pay_msg pay_msg5" style="display:block;">
                            <img class="pay_icon" src="../../../../common/images/webcatpay.png">
                            <span class="pay_text">微信支付（推荐）</span>
                            <img class="pay_select_icon" v-if="payType==0" @click="surePayway(1)" src="../../../../common/images/icon_dagou@2x.png">
                            <img class="pay_select_icon" v-if="payType!=0" @click="surePayway(0)" src="../../../../common/images/icon_yuan@2x.png">
                        </div>
                        <div class="pay_msg pay_msg5">
                            <img class="pay_icon" src="../../../../common/images/icon_union.png">
                            <span class="pay_text">美付宝快捷支付</span>
                            <img class="pay_select_icon" v-if="payType==1" @click="surePayway1(0)" src="../../../../common/images/icon_dagou@2x.png">
                            <img class="pay_select_icon" v-if="payType!=1" @click="surePayway1(1)" src="../../../../common/images/icon_yuan@2x.png">
                        </div>
                        <!-- <div class="pay_msg pay_msg2" @click="showAlipay">
                            <span class="order_time_msg" style="color:#999">更多支付方式</span>
                            <span class="order_money" style="color:#999"> <img src="../../../../common/images/arrowdown.png" width="20"></span>
                        </div> -->
                        <!-- <div class="pay_msg pay_msg5" v-show="alipay" style="display:block;">
                            <img class="pay_icon" src="../../../../common/images/zhifubao.png">
                            <span class="pay_text">支付宝支付</span>
                            <img class="pay_select_icon" v-if="payType==1" @click="surePayway(0)" src="../../../../common/images/icon_dagou@2x.png">
                            <img class="pay_select_icon" v-if="payType!=1" @click="surePayway(1)" src="../../../../common/images/icon_yuan@2x.png">
                        </div> -->
                        <div class="pay_msg6">
                            <div class="pay_button" @click.stop="submitPay2()">确认支付</div>
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
        <div class="cover22" v-if="showCover"  @click.self="closeCover"> 
            <div><img class="ercode" :src="ercode"></div>
        </div>

        <!--联系方式  -->
        <section class="coverpart" v-if="isShowDelete">
            <div class="cover-background"></div>
            <section class="cover-content " :class="{'cover-animate' : isEnter, 'cover-animate-leave' : isLeave}">
                <div class="callPhoneClose">
                    <img src="../../../../common/images/icon_guanbi@2x.png" @click="callPhoneCloseFun">
                </div>
                <h2>如有售后方面的问题,请联系您的店主进行咨询    {{sellerPhone}}</h2>
                <hr style="height: 0.01em; opacity: 0.2;">
                <div class="sa-botton">
                    <span class="callPhone"><a v-bind:href="'tel:' + sellerPhone" style="color:#0084FF;">拨打电话</a></span>
                </div>
            </section>
        </section>
        <div class="bottomcov" style="width:100%;height:2rem;">
            
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    // import {getImgPath} from 'src/components/common/mixin'
    import { orderDetail, cancelOrder, queryTake, deleteOrder, orderPay } from 'api'
    // import {orderDetail,cancelOrder,queryTake,deleteOrder, orderPay } from 'src/service/getData'
    import loading from 'base/loading/loading'
    import alertTip from 'base/alertTip/alertTip'
    import loadingToast from 'base/loadingToast/loadingToast'
    import {isWeiXin,wxHideOptionMenu } from 'common/js/utils'
    import { rootPath } from 'config/env'
    import qs from 'qs';
    // import sa from 'sa-sdk-javascript';

    export default {
        data() {
            return {
                routerPath:'',
                shopid: '',
                showAlert: false, //弹出提示框
                show: false, //显示确认提示框
                isShowDelete: false, //显示删除对话框
                sellerPhone: '400-063-9939', //售后电话
                showTxt: '', //确认框提示文字
                showconfirmText: '确定', //确认框确认按钮文
                showLoadingToast:false,//显示loadingToast
                loadingText:'',//loadingTost 提示信息
                porType: 1, //操作类型 1-取消订单 2-删除订单 3-确认收货
                payType: 0, //付款方式 0-微信 1-支付宝
                alipay: false, //现在支付宝支付
                oprOrderId: '', //需要操作的订单号
                showLoading: true, //显示加载动画
                showPayWay: false, //显示付款方式
                orderData: {},
                productList: [],
                pram: {
                    a:'v1/orderDetail',
                    orderId: ''
                },
                showCover:false,
                ercode:'',//二维码
                storeName:sessionStorage.storeName,
                setTime:'',//倒计时时间
                createTime:'',
                payTime:'',
                sendTime:'',
                complateTime:'',
            }
        },
        created() {
            this.shopid = this.$route.query.shopid;
            this.pram.orderId = this.$route.query.id;
            this.oprOrderId = this.$route.query.id;
            this.routerPath = rootPath;
            wxHideOptionMenu();
        },
        mounted() {
            // sa.track('$pageview', {
            //   $title: document.title,
            //   $url: location.href,
            //   $url_path: location.pathname,
            //   $referrer_host: location.hostname,
            //   $referrer: document.referrer,
            // })

            this.initData();
        },
        // mixins: [getImgPath],
        components: {
            loading,
            alertTip,
            loadingToast
        },
        computed: {
            ...mapState([
                'orderDetail', 'userInfo'
            ]),
        },
        methods: {
            // gomana1(){
            //     window.location.href = "https://jikeduo.qiyukf.com/client?k=06f1b1294f5f993266d9931f9be05e51&wp=1"
            // },
            onCopy: function (e) {
                // alert('You just copied: ' + e.text)
                this.showAlert = true;
                this.alertText = "订单号："+ e.text +"复制成功";
            },
            onError: function (e) {
                this.showAlert = true;
                this.alertText = "复制失败请重试";
            },
            unionPayEnv() {
                this.$router.push({
                    path:  this.routerPath+'/',
                    query: {}
                });
            },

            async initData() {
                let me = this;
                let params = qs.stringify(me.pram)
                orderDetail(params).then(res => {
                    me.showLoading = false;
                    if (res.code == "1") {
                        me.orderData = res.data;
                        if(me.orderData.status == 1){  //待付款状态唤起倒计时
                            me.timeOut();
                        }
                        let createTime = me.timesyc(me.orderData.createTime)
                        me.createTime = createTime
                        let payTime = me.timesyc(me.orderData.payTime)
                        me.payTime = payTime
                        let sendTime = me.timesyc(me.orderData.sendTime)
                        me.sendTime = sendTime
                        let complateTime = me.timesyc(me.orderData.complateTime)
                        me.complateTime = complateTime

                        me.productList = res.dataList;
                        console.log(me.productList)
                        if(res.data.storeMobile != "" && res.data.storeMobile.length > 0){
                            me.sellerPhone = res.data.storeMobile;
                        }
                        
                    }
                });
            },
            timesyc(a){
                let aaa = Number(a)
                let date = new Date(aaa*1000)
                let Y = date.getFullYear() + '-';
                let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                // let D = date.getDate() + '';
                let D = (date.getDate()+1 < 10 ? '0'+(date.getDate()+1) : date.getDate()+1);
                let h = date.getHours() + ':';
                let m = date.getMinutes() + ':';
                let s = (date.getSeconds()+1 < 10 ? '0'+(date.getSeconds()+1) : date.getSeconds()+1);
                return Y+M+D+'    '+h+m+s;
            },
            oprOrder2() {
                this.show = true;
                this.isEnter = true;
                this.isLeave = false;
            },
            //取消
            ggcancelDel2() {
                clearTimeout(this.timer)
                this.isEnter = false;
                this.isLeave = true;
                this.timer = setTimeout(() => {
                    clearTimeout(this.timer)
                    this.show = false;
                }, 200)
            },
            closeCover1(){
                clearTimeout(this.timer)
                this.isEnter = false;
                this.isLeave = true;
                this.timer = setTimeout(() => {
                    clearTimeout(this.timer)
                    this.show = false;
                }, 200)
                console.log(111)
                // this.isShowDelete = false
            },
            close11(){
                // this.isShowDelete = false
                clearTimeout(this.timer)
                this.isEnter = false;
                this.isLeave = true;
                this.timer = setTimeout(() => {
                    clearTimeout(this.timer)
                    this.show = false;
                }, 200)
            },
            //确定
            ggconfirmDel2() {
                let me = this;
                if (this.porType == 1) { //取消订单
                    let params = qs.stringify({
                        orderId: this.oprOrderId
                    })
                    cancelOrder(params).then(res => {
                        if (res.code == "1") {
                            this.initData();
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
                        if (res.code == "1") {
                            this.$router.go(-1);
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
                            this.initData();
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
            showPayWayFun() {
                let me = this;
                this.showPayWay = !this.showPayWay;
                // console.log(me.productList)
                // console.log(me.productList[0].productId)
                // me.$router.push({path: me.routerPath+'/productDetail',query:{productId:me.productList[0].productId}})
            },
            showAlipay() {
                this.alipay = !this.alipay;
                if( this.alipay){
                    this.payType = 1;
                }else{
                    this.payType = 0;
                }
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
            ggPayOrder2(order) { //去支付
                this.showPayWay = !this.showPayWay;
            },
            submitPay2() {
                let me = this;
                me.showLoadingToast=true;
                me.loadingText="订单正在提交....";
                let paybo = {
                    orderId: this.oprOrderId,
                    isWeb: true
                }
                if(this.payType == 1){
                    me.$router.push({path: me.routerPath+'/yytOrderDetail',query:{orderId:this.oprOrderId,price:this.orderData.payAmount,num:this.orderData.orderNo}});
                }else if (this.payType == 0) {
                    paybo.payType = "weixin";
                    let params = qs.stringify(paybo)
                    orderPay(params).then(res => {
                        me.showLoadingToast=false;
                        if (res.code == "1") {
                            if(res.orderPayInfo.isOther=="1"){
                                me.ercode=res.orderPayInfo.imagePath;
                                me.showCover=true;
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
                                                me.$router.push({path: me.routerPath+'/paySuccess',query:{shopid:me.shopid,id:res.orderId}});
                                            } else if(res3.err_msg == "get_brand_wcpay_request:cancel"){
                                                me.showAlert = true;
                                                me.alertText = "订单支付取消！";
                                                // me.$router.push({path: me.routerPath+'/productDetail',query:{productId:me.productList[0].productId}})
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
                                //me.initData();
                                me.initData();
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
            ggcancelOrder2(order) { //取消订单
                this.porType = 1;
                this.oprOrderId = order.orderId;
                this.showTxt = "是否确认取消该订单？";
                this.showconfirmText = "确定";
                this.oprOrder2();
    
            },
            ggSureGet2(order) { //确认收货
                this.porType = 3;
                this.oprOrderId = order.orderId;
                this.showTxt = "是否确认该订单收货？";
                this.showconfirmText = "确定";
                this.oprOrder2();
    
            },
            ggDelOrder2(order) { //删除订单
                this.porType = 2;
                this.oprOrderId = order.orderId;
                this.showTxt = "是否确认删除该订单？";
                this.showconfirmText = "删除";
                this.oprOrder2();
            },
            ggLogistics2(order) { //查看物流
                this.$router.push({
                    path:  this.routerPath+'/order/logistics',
                    query: {
                        orderId: order.orderId
                    }
                });
            },
            goTel(){
                this.isShowDelete = true;
            },
            callPhoneCloseFun(){
                this.isShowDelete = false;
            },
            closeCover(){
                this.showCover=false;
            },
            timeOut(){
                let me = this
                let endtime = Number(me.orderData.endPaymentTime)
                let timeoo = setInterval(function(){
                    var nowtime = new Date().getTime()
                    if(endtime > nowtime){
                        // t 目标时间戳
                        let t = endtime - nowtime;
                        let h = Math.floor((t/3600000)%24);
                        let m = Math.floor((t/60000)%60);
                        let s = Math.floor((t/1000)%60);
                        let timeshow = h+'时'+m+'分'+s+'秒'
                        me.setTime = timeshow
                    }else{
                        //倒计时结束处理
                        clearTimeout(timeoo)
                        let timeoo = null
                        window.reload();
                    }
                },1000);
            },
            showwarntitle(){
                alert('您的售后申请已超时，可电话联系平台客服4000639639为您及时解决')
            }
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
                        return value = '交易完成';
                    case '5':
                        return value = '交易关闭';
                    case '6':
                        return value = '退款中';
                }
            },
            refundTag:function(value){
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
        watch: {
    
        }
    }
</script>
  
<style lang="css" scoped>
    @import 'orderDetail';
</style>
