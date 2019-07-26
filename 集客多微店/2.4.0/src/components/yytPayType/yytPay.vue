<template>
    <div>
       <div v-title data-title="美付宝快捷支付"></div>
       <div class="toptit">
            <div class="price">订单金额<span>{{price?'￥'+price:''}}</span></div>
            <div class="num">订单编号<span>{{orderNo}}</span></div>
        </div>
        <div class="card">
            <span class="name">
                {{bankName}}
            </span>
            <span class="name" style="margin-left:.213333rem;width: 9rem;">
                {{cardNumber}}
            </span>
        </div>
        <div class="cov"></div>
        <div class="card">
            <span>手机号</span>
            <input style="margin-left:.5rem" id="phone" type="text" class="phone" placeholder="银行预留手机号" v-model="phonecode">
        </div>
        <div class="cov"></div>
        <div class="card">
            <span>验证码</span>
            <input style="margin-left:.5rem;width:8rem;" id="phone_code" class="number" type="number" placeholder="短信验证码" v-model="yzcode">
            <button class="keyNum" @click="settime(this)" :disabled="disabled">{{divname}}</button>
        </div>
        <button class="sureBtn" @click="commit()">确认并付款</button>

        <!-- 付款失败提示 -->
        <div class="tim" v-if="isshowfail"> 
            <!-- {{failReason}} -->
            <div style="padding: 1rem 1rem;">
                 {{failReason}}
            </div>
            <div class="coverline"></div>
            <div class="surediv">
                <span class="sure" @click="goback()">取消支付</span>
                <span class="sure" @click="godown()">继续支付</span>
            </div>
        </div>
        <div class="cover11" v-if="isshowfail"></div>
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText" style="z-index: 99999;"></alert-tip>
    </div>  
</template>

<script>
    import AlertTip from 'base/alertTip/alertTip'
    import { userQuickCardList, sendCode, userRegister, memberCenter,quickSendSms ,quickPaySubmit } from 'api'
    import loading from 'base/loading/loading'
    import { rootPath } from 'config/env'
    import qs from 'qs'

    export default {
        data() {
            return {
                routerPath:'',
                storeName:sessionStorage.storeName,
                price:'',  //订单金额
                orderNo:'',  //订单编号
                cardNum:'', //选择支付的银行卡号
                showAlert: false, //弹出框
                timeoutKey : 0,   //倒计时控制
                linkKey:1,        //接口控制
                countdown : 60,   //倒计时初始时间
                divname : '免费获取',
                yzcode : '',
                phonecode : '',
                disabled : false,
                orderId:'',
                quickCardId:'',
                bankName:'',
                cardNumber:'',
                isshowfail:false,
                failReason:'',
            }
        },
        created() {
           
        },
        mounted() {
            this.orderId = this.$route.query.orderId
            this.orderNo = this.$route.query.orderNo
            this.price = this.$route.query.price
            this.quickCardId = this.$route.query.quickCardId
            this.bankName = this.$route.query.bankName
            this.cardNumber = this.$route.query.cardNumber
        },
        methods: {
            // 验证码
 
            settime(obj) {
                var my = this
                var phone = this.phonecode;
                
                if (phone =='') {                                           //如果输入为空
                    this.phonecode = ""
                    this.alertText = '请输入手机号'
                    this.showAlert = true
                    return false;
                }

                // if (this.area_code == "86") {
                //     if (!phone.match(/^1[3|4|5|7|8][0-9]{9}$/)) {           //检查手机号格式
                //         this.alertText = '请输入正确的手机号'
                //         this.showAlert = true
                //         this.timeoutKey = 0              //关闭倒计时
                //         this.linkKey = 1                 //开启接口
                //         this.disabled = false
                //         this.divname = '获取验证码'
                //         this.countdown = 60;
                //         return false;
                //     }
                // } 

                if (this.linkKey == 1) {     
                    let params = qs.stringify({
                        // mobile: phone,
                        // countryCode: 86,
                        // codeType: 1
                        orderId: my.orderId,
                        sceneType: '0403',
                        quickCardId: my.quickCardId,
                        mobile: phone
                    })

                    quickSendSms(params).then(res => {
                        console.log(res)
                        if (res.code == '0'){                                 //发送失败 跳出提示 不进行倒计时
                            var msg1= res.msg
                            this.alertText = msg1
                            this.showAlert = true
                            clearTimeout(ttt);    
                        }else if(res.code == '1'){                            //发送成功 进入倒计时 按钮持续不可操作 直到cuntdown为0后恢复
                            var msg2 = res.msg
                            this.alertText = msg2
                            this.showAlert = true
                            this.timeoutKey = 1;         //倒计时控制变量 开启
                            this.linkKey = 0;            //接口关闭
                            console.log(this.timeoutKey)
                            console.log(this.linkKey)
                        }else{
                            this.alertText = res.msg
                            this.showAlert = true
                        }
                    })
                }

                if(this.timeoutKey == '1' && this.linkKey == '0'){                //倒计时控制开启  接口控制关闭  此时进行倒计时
                    this.disabled = true
                    // obj.setAttribute("disabled", true);                  //不可选中
                    this.divname = this.countdown+'s后重新获取';
                    this.countdown--;                                       //数字倒计时
                }

                if (this.countdown == 0) {                                  //倒计时结束 重置按钮 可重新走接口
                    this.linkKey++                 //开启接口
                    this.timeoutKey--              //关闭倒计时
                    this.disabled = false
                    // obj.removeAttribute("disabled");  //重置倒计时按钮样式
                    this.divname = "免费获取"
                    this.countdown = 60;
                    return;
                }

                var ttt = setTimeout(function(){
                    my.settime(obj)
                }, 1000) 
            },
            commit(){
                let params = qs.stringify({
                    orderId: this.orderId,   //订单号
                    quickCardId: this.quickCardId,  //不知道什么id
                    smsCode: this.yzcode, //验证码
                })

                quickPaySubmit(params).then(res => {
                    console.log('获取支付信息----')
                    console.log(res);
                    if(res.code == 1){
                        let _this = this
                        this.alertText = '支付成功'
                        this.showAlert = true
                        setTimeout(aaa, 2000);
                        function aaa() {
                            _this.$router.push({path:_this.routerPath+'/wap/paySuccess',query:{orderId:_this.orderId}})
                        }
                    }else if(res.code == 0){
                        this.failReason = res.msg
                        this.isshowfail = true
                    }else{
                        this.alertText = '接口调用失败 请重试'
                        this.showAlert = true
                    }
                    // this.datalist = res.dataList
                })
            },
            goback(){
                let _this = this
                // _this.$router.push({path:_this.routerPath+'/wap/paySuccess',query:{id:_this.orderId}})
                _this.isshowfail = true
                _this.$router.go(-1)
            },
            godown(){
                this.isshowfail = false
            }
        },
        components: {
            loading,
            AlertTip
        }
    }
</script>

<style lang="css" scoped>
    @import 'yytPay.css';
    #phone{
        font-size: .597333rem;
        outline: none;
    }
    #phone_code{
        font-size: .597333rem;
        outline: none;
    }
</style>
