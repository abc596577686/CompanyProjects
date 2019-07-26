
<template>
    <div>
        <!--退款小窗口  -->
        <span class="greycover" v-if="refundct"></span>
        <div class="refundreq" v-if="refundct">
            <span>输入退款原因</span>
            <textarea></textarea>
            <div class="tijiao" @click="rouRefund()">提交</div> 
        </div>
        <div class="altoptit">
            <div v-for="(item,$index) in items"  @click="selectStyle (item, $index)":class="{'active':item.active || item.autoActive,'unactive':!item.active}">{{item.select}}
            </div>
        </div>
        <div style="width:100%;height:  26.624rem;overflow:scroll">
            <div class="myPay" v-for="(data, index) in listinfo.orderList" >
                <div class="grein"></div>
                <!--主要信息框  -->
                <div class="maintxt">
                    <!--订单号及状态  -->
                    <div class="listTit">
                        <!--订单号  -->
                        <span class="listT_num">订单号:{{data.orderNum}}</span>
                        <!--订单状态  -->
                        <div class="listT_sta">{{data.liststate}}</div>
                    </div>
                    <div class="mainit">
                        <!--订单图片  -->
                        <div class="minImg">
                            <img src='../../../images/tty/banner@2x.png' alt="error">
                        </div>
                        <!--订单名称  -->
                        <div class="listName">
                            {{data.productTitle}}
                        </div>
                        <!--出发时间  -->
                        <div class="goTime">{{data.calDate}}</div>
                        <!--人数  -->
                        <div class="goPeople">{{data.orderNumDesc}}</div>
                        <!--退款失败  -->
                        <div v-if="data.failRefundct">
                            <span class="refundImg">
                                <img src="../../../images/tty/备注@2x.png" alt="error">
                            </span>
                            <span class="failRefund">退款失败</span>
                        </div>
                    </div>
                    <div class="listTip">
                        <!--支付时间  -->
                        <div class="payTime">{{data.createTime}}</div>
                        <!--总金额  -->
                        <span class="allComp1">{{allcomp1}}</span>
                        <span class="allComp2">￥{{data.detail[0].salePrice}}</span>
                        
                        <!--联系人  -->
                        <div v-if="data.linkct">
                            <div class="linkName">联系人姓名：{{linkname}}</div>
                            <div class="linkPhone">联系人手机号：{{linkphone}}</div>
                        </div>
                        <!--收益  -->
                        <div v-if="data.getct">
                            <span class="getIn">收益</span>
                            <span class="getIn1">{{getin}}</span>
                        </div>
                        <!-- <div class="cancelbtn" v-if="cancelbtnct">取消</div> -->
                        <div class="cancelbtn" v-if="data.cancelbtnct">取消</div>
                        <div class="paybtn" v-if="data.paybtnct">支付</div>
                        <div class="fapiaobtn" v-if="data.fapiaobtnct" @click="getinvoice()">申请发票</div>
                        <div class="hetongbtn" v-if="data.hetongbtnct" @click="gethetong()">生成合同</div>
                        <div class="moreinfobtn" v-if="data.moreinfobtnct" @click="getmore()">补充资料</div>
                        <div class="refundbtn" v-if="data.refundbtnct" @click="getrefund()">退款</div>
                    </div>
                </div>
            </div>
        </div>
        <!--灰色罩层  -->
        
        <!--退款原因  -->
        <!-- <div class="11"></div> -->
    </div>
</template>

<script>

import { rootPath } from 'src/config/env'
// 接口
import {orderkey} from 'src/service/getData'

import { mapState, mapMutations} from 'vuex'
// import {wxShowOptionMenu, isWeiXin} from 'src/config/mUtils'
import wx from 'weixin-js-sdk'

export default {
    data(){
        return{ 
            active: false,  //顶部导航样式
            items: [
                    // {select:'全部',}, 
                    {select:'全部', autoActive:true}, //第一个默认变色
                    {select:'待付款'},
                    {select:'已付款'},
                    {select:'已完成'},
                    {select:'已取消'},
                    {select:'退款'},
            ],
            listnum:'1212121221212',  //订单号
            liststate:'111',        //订单状态
            imgsrc1:'', //订单图片地址
            listname:'邂逅彩虹岛-美国夏威夷欧胡岛半自助游7天4晚',//订单名称
            gotime:'出发：2017-09-17',//出发时间
            gopeople:'成人 x1',
            paytime:'2017-09-17 23:25下单',//下单时间
            allcomp1:'总计',
            allcomp2:'￥5988.00',
            failRefundct:false,  //退款失败原因
            linkname:'朱小婷' , //联系人姓名
            linkphone:'1520000000' , //联系人姓名
            linkct:false,   //退款中显示 联系人信息
            getin:'￥900',  //收益

            getct:false,  //收益
            cancelbtnct:false,   //取消按钮
            paybtnct:false,      //支付按钮
            fapiaobtnct:false,   //申请发票按钮
            hetongbtnct:false,   //生成合同按钮
            moreinfobtnct:false, //补充资料按钮
            refundbtnct:false,   //退款按钮

            // 订单信息
            listinfo:[],

            // 写死数据
            distId:'jkd',
            page: '1', 
            rows: '10',
            userId: '123555',
            // 订单状态
            orderStatus:'',

            model:'',
            // 退款窗口
            refundct:false,
        }
    },
    mounted(){
        // 数据接口
        let me = this;
        orderkey(
            me.distId,
            me.page,
            me.rows,
            me.userId,
            me.orderStatus,
        ).then(res => {
            me.listinfo = res
            let orderList = res.orderList
            // order名字自定义
            orderList.forEach((order) => {
                if(order.returnState == 1){         // 退款成功
                    order.liststate = '已退款'
                    order. fapiaobtnct= true
                    order. hetongbtnct= true
                    order. moreinfobtnct= true
                    order. refundbtnct= true
                }
                if(order.returnState == 2) {  //退款中
                    order.liststate = '退款中'
                    order. linkct= true
                    order. getct= true
                } 
                if(order.returnState == 0){
                    // 待付款
                    if(order.orderStatus == 1) {
                        order.liststate = '待付款'
                        order. cancelbtnct= true
                        order. paybtnct= true
                    }
                    // 已付款
                    if(order.orderStatus == 2) {
                        order.liststate = '已付款'
                        order. fapiaobtnct= true
                        order. hetongbtnct= true
                        order. moreinfobtnct= true
                        order. refundbtnct= true
                        order. failRefundct= true
                    }
                    // 已完成
                    if(order.orderStatus == 3) {
                        order.liststate = '已完成'
                    }
                    // 已取消
                    if(order.orderStatus == 4) {
                        order.liststate = '已取消'
                    }
                    // 已退款
                    if(order.orderStatus == 5) {
                        order.liststate = '已退款'
                        order. fapiaobtnct= true
                        order. hetongbtnct= true
                        order. moreinfobtnct= true
                        order. refundbtnct= true
                    }
                }
            })
        });
    },
    watch:{
      
    },
    components: {
        myPay:function(listinfo){ 
            console.log(listinfo)
        },
    },
    methods:{
        
        selectStyle (item, index) {
            const _this=this;
            this.$nextTick(function () {
                this.items.forEach(function (item) {
                    _this.$set(item,'active',false);
                    item.autoActive = false;
                    
                    console.log(index)
                    
                    // 判断显示
                });
                this.$set(item,'active',true);
            });
            if(index == 0){
                orderkey(
                _this.distId,
                _this.page,
                _this.rows,
                _this.userId,
                _this.orderStatus = '',
            ).then(res => {
                _this.listinfo = res
                let orderList = res.orderList
                // order名字自定义
                orderList.forEach((order) => {
                    if(order.returnState == 1){         // 退款成功
                        order.liststate = '已退款'
                        order. fapiaobtnct= true
                        order. hetongbtnct= true
                        order. moreinfobtnct= true
                        order. refundbtnct= true
                    }else if(order.returnState == 2) {  //退款中
                        order.liststate = '退款中'
                        order. linkct= true
                        order. getct= true
                    }else if(order.returnState == 0){
                        // 待付款
                        if(order.orderStatus == 1) {
                            order.liststate = '待付款'
                            order. cancelbtnct= true
                            order. paybtnct= true
                        }
                        // 已付款
                        if(order.orderStatus == 2) {
                            order.liststate = '已付款'
                            order. fapiaobtnct= true
                            order. hetongbtnct= true
                            order. moreinfobtnct= true
                            order. refundbtnct= true
                            order. failRefundct= true
                        }
                        // 已完成
                        if(order.orderStatus == 3) {
                            order.liststate = '已完成'
                        }
                        // 已取消
                        if(order.orderStatus == 4) {
                            order.liststate = '已取消'
                        }
                        // 已退款
                        if(order.orderStatus == 5) {
                            order.liststate = '已退款'
                            order. fapiaobtnct= true
                            order. hetongbtnct= true
                            order. moreinfobtnct= true
                            order. refundbtnct= true
                        }
                    }
                })
            });
            }
            orderkey(
                _this.distId,
                _this.page,
                _this.rows,
                _this.userId,
                _this.orderStatus=index,
            ).then(res => {
                _this.listinfo = res
                let orderList = res.orderList
                // order名字自定义
                orderList.forEach((order) => {
                    if(order.returnState == 1){         // 退款成功
                        order.liststate = '已退款'
                        order. fapiaobtnct= true
                        order. hetongbtnct= true
                        order. moreinfobtnct= true
                        order. refundbtnct= true
                    }else if(order.returnState == 2) {  //退款中
                        order.liststate = '退款中'
                        order. linkct= true
                        order. getct= true
                    }else if(order.returnState == 0){
                        // 待付款
                        if(order.orderStatus == 1) {
                            order.liststate = '待付款'
                            order. cancelbtnct= true
                            order. paybtnct= true
                        }
                        // 已付款
                        if(order.orderStatus == 2) {
                            order.liststate = '已付款'
                            order. fapiaobtnct= true
                            order. hetongbtnct= true
                            order. moreinfobtnct= true
                            order. refundbtnct= true
                            order. failRefundct= true
                        }
                        // 已完成
                        if(order.orderStatus == 3) {
                            order.liststate = '已完成'
                        }
                        // 已取消
                        if(order.orderStatus == 4) {
                            order.liststate = '已取消'
                        }
                        // 已退款
                        if(order.orderStatus == 5) {
                            order.liststate = '已退款'
                            order. fapiaobtnct= true
                            order. hetongbtnct= true
                            order. moreinfobtnct= true
                            order. refundbtnct= true
                        }
                    }
                })
            });
        },
        // 跳转获取发票
            //  me.shopid = me.$route.query.shopid;
        getinvoice:function(){
            this.$router.push({
                path:  '/wap'+'/invoice',
                query: {
                    // shopid: this.shopid,
                    // id: this.productId,
                    // num: this.addcartpram.num

                    // shopid: 1,
                    // id: 114175,
                    // num: 1
                }
            })
        },
        // 跳转合同
        gethetong:function(){
            this.$router.push({
                path:  '/wap'+'/dianzi',
                query: {
               
                }
            })
        },
        // 补充资料 （补充之前点选预定后填写的预订信息）
        getmore:function(){
            this.$router.push({
                path:  '/wap'+'/goinfo',
                query: {
                   
                }
            })
        },
        // 退款按钮
        getrefund:function(){
            this.refundct = true
            // 填写退款原因后跳转
            // this.$router.push({
            //     path:  '/wap'+'/refund',
            //     query: {
                   
            //     }
            // })
        },
        // 退款原因提交
        rouRefund:function(){
            alert('提交信息 跳转退款主控')
        }
    }
}

</script>

<style lang="css" scoped>
    .altoptit{
        width: 100%;
        height: 1.834667rem;
        background-color: #fff;
        position: relative;
        z-index: 3;
         border: 1px solid #f0f0f0;
         border-top: none; 
         border-left: none; 
         border-right: none; 
    } 
    .altoptit >div{
         margin-left: .64rem;     
    }
    .active{
        display: inline-block;
        width: 1.621333rem;
        width: 1.92rem;
        border: .128rem solid #008ee5;
        border-left: none;
        border-top: none;
        border-right: none;
        position: relative; 
        font-size: .554667rem;
        color: #008ee5;
        text-align: center;
        line-height: 1.749333rem;
    }
     .unactive{
        display: inline-block;
        width: 1.92rem;
        height: 1.749333rem;
        font-size: .554667rem;
        color: #666666;
        text-align: center;
        line-height: 1.749333rem;
    }  
    .myPay{
        width: 100%;
        height: 9.216rem;
        position: relative;
        background-color: #fff;
        top: -.512rem;
        z-index: 2
    }
    .grein{
        width: 100%;
        height: .512rem;
        background-color: #F0F0F0;
    }
    .maintxt{
        width: 100%;
        height: 8.874667rem;
        position: relative;
    }
    .listTit{
        width: 100%;
        height:1.536rem;
        border: 1px solid #f0f0f0;
        border-top : none;
        border-left: none;
        border-right: none;
    }
    .listT_num{
        display: block;
        width: 9rem;
        height: .768rem;
        font-size: .469333rem;
        line-height: .469333rem;
        color: #999999;
        position: absolute;
        left: .469333rem;
        top: .512rem;
    }
    .listT_sta{
        display: block;
        width: 1.92rem;
        height: .768rem;
        font-size: .512rem;
        color: #Fb4a4c;
        position: absolute;
        left: 13.866667rem;
        top: .512rem;
    }
    .mainit{
        padding-left: .512rem;
        width: 100%;
        height: 4.181333rem;
        position: relative;
    }
    .listTip{
        width: 100%;
        height: 3.157333rem;
        position: relative;
        padding-left: .512rem;
        padding-top: .469333rem;
    }
    .minImg{
        width: 4.906667rem;
        height: 3.669333rem;

    }
    .minImg img{
        width: 100%;
        height: 100%;
        display: block;
    }
    .listName{
        width: 9.258667rem;
        height: 1.706667rem;
        font-size: .597333rem;
        word-wrap:break-word;
        color: #333333;
        position: absolute;
        left: 5.632rem;
        top: .298667rem;
    }
    .goTime{
        width: 5.12rem;
        height: .725333rem;
        font-size: .469333rem;
        color: #666666;
        position: absolute;
        left: 5.632rem;
        top: 2.176rem;
    }
    .goPeople{
        width: 5.12rem;
        height: .725333rem;
        font-size: .469333rem;
        color: #666666;
        position: absolute;
        left: 5.632rem;
        top: 3.029333rem;
    }
    .refundImg{
        width: .426667rem;
        height: .426667rem;
        display: block;
        position: absolute;
        left: 12.757333rem;
        top: 3.157333rem;
    }
    .refundImg img{
        width: 100%;
        height: 100%;
        display: block;
    }
    .failRefund{
        width: 2.346667rem;
        height: .768rem;
        line-height:.512rem; 
        display: block;
        position: absolute;
        left: 13.44rem;
        top: 3.114667rem;
        font-size: .512rem;
        color: #FF8100;
    }
    .payTime{
        width: 6.4rem;
        height: .725333rem;
        font-size: .469333rem;
        color: #999999;
    }
    .allComp1{
        width: 1.28rem;
        height: .725333rem;
        position: absolute;
        left: 11.392rem;
        top: .384rem;
        font-size: .512rem;
        color: #666666;
    }
    .allComp2{
        width: 3.413333rem;
        height: .725333rem;
        position: absolute;
        left: 13.184rem;
        top: .384rem;
        font-size: .512rem;
        color: #fb4a4c;
    }
    .linkName{
        width: 7.253333rem;
        height: .725333rem;
        line-height: .469333rem;
        position: absolute;
        left: .512rem;
        top: 1.493333rem;
        font-size: .469333rem;
        color: #999999;
    }
    .linkPhone{
        width: 7.253333rem;
        height: .725333rem;
        line-height: .469333rem;
        position: absolute;
        left: .512rem;
        top: 2.432rem;
        font-size: .469333rem;
        color: #999999;
    }
    .getIn{
        width: 1.28rem;
        height: .725333rem;
        position: absolute;
        left: 12.501333rem;
        top: 1.749333rem;
        font-size: .512rem;
        color: #666666;
    }
    .getIn1{
        width: 1.28rem;
        height: .725333rem;
        position: absolute;
        left: 14.23rem;
        top: 1.749333rem;
        font-size: .512rem;
        color: #fb4a4c;
    }
    .cancelbtn{
        width: 2.944rem;
        height: 1.066667rem;
        position: absolute;
        left: 9.130667rem;
        top: 1.493333rem;
        font-size: .554667rem;
        text-align:center;
        line-height: 1.066667rem;
        color: #666666;
        border: .042667rem solid #999999;
    }
    .paybtn{
        width: 2.944rem;
        height: 1.066667rem;
        position: absolute;
        left: 12.629333rem;
        top: 1.493333rem;
        font-size: .554667rem;
        text-align:center;
        line-height: 1.066667rem;
        color: #fb4a4c;
        border: .042667rem solid #fb4a4c;
    }
    .fapiaobtn{
        width: 2.944rem;
        height: 1.066667rem;
        position: absolute;
        left: 2.090667rem;
        top: 1.493333rem;
        font-size: .554667rem;
        text-align:center;
        line-height: 1.066667rem;
        color: #666666;
        border: .042667rem solid #999999;
    }
    .hetongbtn{
        width: 2.944rem;
        height: 1.066667rem;
        position: absolute;
        left: 5.632rem;
        top: 1.493333rem;
        font-size: .554667rem;
        text-align:center;
        line-height: 1.066667rem;
        color: #666666;
        border: .042667rem solid #999999;
    }
    .moreinfobtn{
        width: 2.944rem;
        height: 1.066667rem;
        position: absolute;
        left: 9.130667rem;
        top: 1.493333rem;
        font-size: .554667rem;
        text-align:center;
        line-height: 1.066667rem;
        color: #fb4a4c;
        border: .042667rem solid #fb4a4c;
       
    }
    .refundbtn{
        width: 2.944rem;
        height: 1.066667rem;
        position: absolute;
        left: 12.629333rem;
        top: 1.493333rem;
        font-size: .554667rem;
        text-align:center;
        line-height: 1.066667rem;
        color: #999999;
        border: .042667rem solid #999999;
    }
    .greycover{
        display: block;
        z-index: 1000; 
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #000000;
        opacity: 0.3;
    }
    .refundreq{
        position: fixed;
        z-index: 2000;
        left: .554667rem;
        bottom: .853333rem; 
        width: 14.933333rem;
        height: 11.946667rem;
        background-color: #fff;
    }
    .refundreq span{
        font-size: .64rem;
        color: #333333;
        position: absolute;
        left: 5.589333rem;
        top: .768rem;
    }
    .refundreq textarea{
        /* background-color: black; */
        width: 12.8rem;
        height: 7.68rem;
        position: absolute;
        left: 1.024rem;
        top: 1.834667rem;
        outline:none;resize:none;
        font-size: .725333rem;
        color: #000;
    }
    .tijiao{
        width: 10.709333rem;
        height: 1.408rem;
        line-height: 1.408rem;
        text-align: center;
        background-color: #008ee5;
        border-radius: .341333rem .341333rem .341333rem .341333rem;
        position: absolute;
        left: 2.133333rem;
        bottom: .384rem;
        font-size: .682667rem;
        color: #ffffff;
    }
</style>