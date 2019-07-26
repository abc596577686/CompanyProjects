<template>
    <div class="paySuccess_page">
        <div v-title data-title="订单支付成功"></div>
        <div v-stat="{type:'pageview', title:'订单支付成功'}"></div>
        
         <!-- <lazy-render :time="300"> -->
            <section v-show="!showLoading">
                <!-- <div class="successInfo">
                    <div class="bigImg">
                        <img src="../../common/images/paysuccess.png" alt="error" style="width:100%;height:100%">
                    </div>
                     <div class="successTxt">
                        支付成功
                    </div> 
                     <div class="successPrice">
                         {{orderData.payAmount?'￥'+orderData.payAmount:''}} 
                    </div>
                     <div class="txt1">
                        您的包裹已经准备就绪
                    </div> 
                     <div class="txt2">
                        想实时了解物流信息可下载APP查询
                    </div>  -->
                <!-- </div> -->
                <!-- 顶部标题 -->
                <div class="toptit">
                    <div class="ready">买家已付款</div>
                    <div class="chaxun">
                        您的包裹准备就绪
                        <router-link class="cx" :to='{path: routerPath+"/order/orderDetail",query:{id:orderData.orderId}}'>
                            订单查询
                        </router-link>
                        <img src="../../common/images/icon_select.png">
                    </div>
                </div>
                <span class="coverline"></span>
                <div class="toptit1">
                    <div class="ee">实付金额
                        <div>{{orderData.payAmount?'￥'+orderData.payAmount:''}}</div>
                    </div>
                    <div class="ff">订单号
                        <div>{{orderData.orderNo}}</div>
                    </div>
                </div>

                <section class="bottomobrd" style="padding-top:10px;margin-top:10px;color:#333">
                <p class="baoguo" ><span style="font-size:14px;">收件人信息</span></p>
                <p class="baoguo" ><span>收件人</span><span class="bent" >{{orderData.name}}</span></p>
                    <p class="baoguo" ><span>联系电话</span><span class="bent" >{{orderData.mobile}}</span></p>
                    <p class="baoguo" ><span>收货地址</span><span class="bent" >{{orderData.address}}</span></p>
                </section>
                <section class="my_address_but">
                    <button @click.stop.prevent="goOnbuy">继续购物</button>
                </section>
            </section>
         <!-- </lazy-render> -->
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>
    </div>
</template>

<script>
    // import {getImgPath} from 'src/components/common/mixin'
    import {orderDetail} from 'api'
    import qs from 'qs'
    // import {orderDetail} from 'src/service/getData'
    import loading from 'base/loading/loading'
    import alertTip from 'base/alertTip/alertTip'
    import { rootPath } from 'config/env'

export default {
    data(){
        return{
            shopid:'',
            routerPath:'',
            showLoading: true, //显示加载动画
            showAlert: false, //弹出框
            alertText: null, //弹出框信息
            orderData: {},
            pram: {
                a:'v1/orderDetail',
                orderId: ''
            },
        }
    },
    created(){
        this.routerPath=rootPath;
        this.pram.orderId = this.$route.query.orderId;
    },
    mounted() {
        this.initData();
    },
     components: {
        loading,
        alertTip
    },
     methods: {
        async initData() {
            let me = this;
            let params = qs.stringify(me.pram);
            orderDetail(params).then(res => {
                console.log('订单详情----');
                console.log(res);

                me.showLoading = false;
                if (res.code == "1") {
                    me.orderData = res.data;
                }else{
                    me.showAlert=true;
                    me.alertText=res.msg;
                }
            });
        },
        // goOrder(){
        //     this.$router.push({path:this.routerPath+'/index.json?a=v1/orderDetail',query:{shopid:this.shopid,id:this.pram.orderId}});
        // },
        goOnbuy(){
            this.$router.push({path:this.routerPath+'/index'});
            // window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.webapp.jkd" 
        }
    }
}

</script>

<style lang="css" scoped>
   @import 'paySuccess';
</style>
