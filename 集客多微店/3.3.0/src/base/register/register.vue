<template>
    <!-- <section class="registerWrap"> -->
        <!--注册提示框  -->
        <!-- v-if="iszhuce" -->
        <div class="registered">
            <div class="name">{{kehuName?kehuName+',请先完成手机验证':'请先完成手机验证'}}</div>
            <!--关闭  -->
            <!-- <div class="coverClose" @click="closeDiv" style="width: 2.88rem;height: 1.88rem;position: absolute;left: 12.834667rem;top: 0;"></div>  -->
            <div class="coverClose" @click="closeDiv"></div>
            <div class="close" @click="closeDiv">
                <img src="../../common/images/closediv.png" alt="error">
            </div>
            <div class="line"></div>
            <div class="contentWrap">
                <!--手机号  -->
                <input id="phone" type="text" class="phone" placeholder="请输入手机号" v-model="phonecode">
                <!--验证码  -->
                <div class="inputWrap">
                    <input id="phone_code" class="number" type="number" placeholder="请输入验证码" v-model="yzcode">
                    <div class="keyNum" @click="settime(this)" :disabled="disabled">获取验证码</div>
                </div>
            </div>
            <!--确认注册  -->
            <div class="bottomWrap">
                <div class="sure" @click="getTip()">确认</div>
            </div>
                
            <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText" style="z-index: 99999;"></alert-tip>
        </div>
    <!-- </section> -->
</template>

<script>
    import AlertTip from 'base/alertTip/alertTip'
    import { sendCode, userRegister, memberCenter } from 'api'
    import qs from 'qs'
    import storage from 'good-storage'

    const CONSTRUMER = 'construmer'

    export default {
        data() {
            return {
                kehuName:'', //客户昵称
                iszhuce : false,
                showAlert: false, //弹出框
                alertText: null, //弹出框信息
                area_code : 86,   //写死中国大陆地区
                timeoutKey : 0,   //倒计时控制
                linkKey:1,        //接口控制
                countdown : 60,   //倒计时初始时间
                divname : '获取验证码',
                yzcode : '',
                phonecode : '',
                disabled : false,
                addcartpram: {
                    productId: '',
                    num: 1,
                    isFromCartList: false,
                }
            }
        },
        created() {},
        mounted() {
            this.kehuName = storage.get(CONSTRUMER)
        },
        components: {
            AlertTip
        },
        methods: {
            // 关闭注册框
            closeDiv(){
                this.$emit('closeRegisterEnv')
            },
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
                        mobile: phone,
                        countryCode: 86,
                        codeType: 5
                    })

                    sendCode(params).then(res => {
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
                    this.divname = "重新发送" + this.countdown;
                    this.countdown--;                                       //数字倒计时
                }

                if (this.countdown == 0) {                                  //倒计时结束 重置按钮 可重新走接口
                    this.linkKey++                 //开启接口
                    this.timeoutKey--              //关闭倒计时
                    this.disabled = false
                    // obj.removeAttribute("disabled");  //重置倒计时按钮样式
                    this.divname = "获取验证码"
                    this.countdown = 60;
                    return;
                }

                var ttt = setTimeout(function(){
                    my.settime(obj)
                }, 1000) 
            },
            // 确认注册框
            getTip(){
                console.log(this.yzcode)
                if(this.yzcode == ''){
                    this.alertText = '请输入验证码'
                    this.showAlert = true
                }else{  //验证注册 跳转支付页面
                    console.log(this.yzcode)
                    let params = qs.stringify({
                        mobile: this.phonecode,       //注册框手机号
                        smsCode : this.yzcode,  //注册框验证码
                    })
                   
                    userRegister(params).then(res => {   //验证注册接口
                        console.log(res)
                        if(res){
                            if(res.code =='1'){  //注册成功 关闭注册框 重新购买
                                this.iszhuce = false
                                this.alertText = res.msg
                                this.showAlert = true
                                this.$emit('closeRegisterEnv')
                            }else{   //注册失败 重新尝试
                                this.alertText = res.msg
                                this.showAlert = true
                            }
                        }else{
                            this.alertText = '注册接口关闭'
                            this.showAlert = true
                        }
                    })
                }
            }
        }
    }
</script>

<style lang="css" scoped>
    .registerWrap{

    }
    .registered{
        width: 100%;
        /* height:auto; */
        /*height: 11.264rem;*/
        position: fixed;
        bottom: 0;
        background-color: #fff;
        border-top: .042667rem solid lightgrey;
        z-index: 9999;
        padding-top: .5rem;
    }
    .registered1{
        width: 100%;
        /* height:auto; */
        height: 17.237333rem;
        position: fixed;
        bottom: 0;
        background-color: #fff;
        border-top: .042667rem solid lightgrey;
    }
    .name{
        width: 12rem;
        font-size: .6rem;
        line-height: 1.5;
        font-size: .6rem;
        margin-left: 1rem;
    }
    .line{
        height: 1px;
        width: 100%;
        transform: scale(1, .5);
        background: #ccc;
        margin: .3rem 0;
    }
    .contentWrap{
        padding: .5rem;
    }
    .nametip{
        width: 15rem;
        height: .768rem;
        font-size: .554667rem;
        line-height: .768rem;
        position: absolute;
        left: .597333rem;
        top: 2.858667rem;
        color: #333333;
        text-indent: 1.153333rem;
    }
    .nametip2{
        width: 15rem;
        height: .768rem;
        font-size: .554667rem;
        line-height: .768rem;
        position: absolute;
        left: .682667rem;
        top: 8.746667rem;
        color: #333333;
        /* text-indent: 1.153333rem; */
    }
    .nametipImg{
        position: absolute;
        width: .768rem;
        height: .768rem;
        top: 0;
        left: 0;
    }
    .cvoerhide{
        display: block;
        width: 100%;
        height: .032667rem;
        position: absolute;
        top: 2.176rem;
        background-color: lightgrey;
        opacity: .3;
    }
    .close{
        padding: .5rem;
        position: absolute;
        right: .5rem;
        top: .2rem;
    }
    .close img{
        width: .6rem;
        display: block;
    }
    .phone{
        width: 14.677333rem;
        height: 1.8rem;
        background-color: #F7F7F7;
        /* position: absolute; */
        /* left: .626667rem; */
        /* top: 4.096rem; */
        border: none;
        text-indent: .6rem; 
        font-size: .6rem;
        margin-bottom: .5rem;
        outline: none;
    }
    .number{
        width: 14.677333rem;
        height: 1.8rem;
        background-color: #F7F7F7;
        /* position: absolute; */
        /* left: .626667rem; */
        /* top: 6.442667rem; */
        border: none;
        text-indent: .6rem;
        font-size: .6rem;
        outline: none;
    }
    .inputWrap{
        width: 14.677333rem;
        height: 1.8rem;
        background-color: #F7F7F7;
        /* position: absolute; */
        /* left: .626667rem; */
        /* top: 6.442667rem; */
        border: none;
        position: relative;
        /*text-indent: .6rem;*/
        /*font-size: .6rem;*/
        /*outline: none;*/
    }
    .keyNum{
        display: block;
        width: 3.4rem;
        height: 1.12rem;
        border: .04rem solid #FB4A4C;
        font-size: .56rem;
        line-height: 1.12rem;
        text-align: center;
        color: #FB4A4C;
        position: absolute;
        right: .5rem;
        top: .35rem;
        background-color: #fff;
    }
    .bottomWrap{
        text-align: center;
        margin: .6rem 0;
    }
    .sure{
        display: inline-block;
        width: 13.76rem;
        height: 1.621333rem;
        background-color: #FB4A4C;
        /* box-shadow: -3px  3px  8px  #F5C77E; */
        text-align: center;
        line-height: 1.621333rem;
        border-radius: .2rem;
        /*position: absolute;*/
        /*left: 1.099rem;*/
        /*bottom: .682667rem;*/
        color: #fff;
        font-size: .64rem;
    }
</style>
