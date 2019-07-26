<template>
    <div class="service_page">
        <div class="topimg">
           <img src="../../assets/images/u2.png" alt="Error">
        </div>
        <div class="sec_phone_1">+86</div>
        <input class="sec_phone_2" placeholder="请输入手机号码" v-model="phoneIn"></input>
        <div class="sec_yz_1">验证码</div>
            <input class="sec_yz_2" placeholder="请输入验证码" v-model="yzIn"></input> 
        <!-- <button class="sec_yzbtn" @click="readyYz" :disabled="st">{{yzmt}}</button> -->
        <button @click="send" class="sec_yzbtn" :disabled="st">
                <span v-if="sendMsgDisabled">{{time+'秒后获取'}}</span> 
                <span v-if="!sendMsgDisabled">获取验证码</span> 
        </button>
        <span class="deshr"></span>
        <div class="sec_mm_1">密码</div>
        <input class="sec_mm_2" placeholder="请输入密码" v-model="mima"></input>
        <div class="sec_qr_1">确认密码</div>
        <input class="sec_qr_2" placeholder="请再次请输入密码" v-model="mimai"></input>
        <span class="deshr1"></span>
        <button class="sec_zcbtn" @click="readyZf" :disabled="makesure">确定</button>
        <span class="redTip" v-show="redct" :redct="redct">{{mimayz}}</span>
        <!--提示小弹窗  -->
        <alert-tip v-show="showAlert" @closeTip="showAlert = false" :alertTit="alertTit"  :alertText="alertText" :alertMain="alertMain"></alert-tip>
    </div>
</template>

<script>
// import alertTip from 'src/components/common/alertTip'
import alertTip from 'src/components/common/alertTip'

export default {
    data(){
        return{
            phoneIn:'',
            yzIn:'',
            yzmt:'获取验证码',
            countdown:'60',    //验证码初始
            timeoutKey:'0',    //倒计时开关
            linkkey:'1',       //接口开关
            st: false,          //默认可选中
            time: 60, // 发送验证码倒计时
            sendMsgDisabled: false,
            showAlert: false, //弹出框
            alertTit: null,  //弹出框标题
            alertText: null, //弹出框信息
            alertMain: null, //确认提示
            mima : null,     //第一次密码
            mimai : null,    //确认密码
            mimayz :"两次输入的密码不一致，请效验",
            redct : false,  //密码不一致提示
            makesure:false, //密码不一致控制不可点击
        }
    },
    mounted(){
        var ttt = setTimeout(function(){
            this.readyYz
        }, 1000)
    },
    watch:{
        mimai:function(){
            let me = this
            if(this.mimai == this.mima){
                me.redct = false;
                this.makesure = false
            }else{
                me.redct = true;
                this.makesure = true
            }
        }
    },
    components: {
        //弹窗小组件
        alertTip  
    },
    methods:{
        send:function(){
            let me = this;
            this.st = true;
            me.sendMsgDisabled = true;
            let interval = window.setInterval(function() {   //取名定时器
            if ((me.time--) <= 0) {
                me.time = 60;
                me.sendMsgDisabled = false;
                window.clearInterval(interval);
                me.st = false;
            }
            }, 1000);
        },

        // 支付按钮
        readyZf:function(){
            if(this.phoneIn == ''){
                // this.mima = '';
                // this.mimai = '';
                this.showAlert=true;
                this.alertTit="登录失败";
                this.alertText="手机号错误,请正确输入";
                this.alertMain="确定";
            }else if(this.yzIn == ''){
                // this.mima = '';
                // this.mimai = '';
                this.showAlert=true;
                this.alertTit="登录失败";
                this.alertText="验证码错误,请正确输入";
                this.alertMain="确定";
            }else if(this.mima == '' || this.mima == null){
                this.showAlert=true;
                this.alertTit="登录失败";
                this.alertText="密码填写错误,请正确输入";
                this.alertMain="确定";
                // this.mima = '';
                // this.mimai = '';
            }else if(this.mimai == '' || this.mimai == null){
                this.showAlert=true;
                this.alertTit="登录失败";
                this.alertText="密码填写错误,请正确输入";
                this.alertMain="确定";
                // this.mima = '';
                // this.mimai = '';
            }else{
                this.showAlert=true;
                this.alertTit="登录成功";
                this.alertText="恭喜您操作成功";
                this.alertMain="确定";
            }
        },
        readyYz:function(obj){
            let me = this;
            if (this.linkkey == 1) {                                        //当接口控制开启 可走接口交互验证码

                // $.post("/api/user/sendCode.msp", {
                //         mobile: phone,
                //         countryCode: area_code,
                //         codeType: 1
                // },function(data){
                //     if (data.code == '0'){                                 //发送失败 跳出提示 不进行倒计时
                //         var k1 = data.msg
                //         alert(k1)
                //         clearTimeout(ttt);
                    
                //     }else if(data.code == '1'){                            //发送成功 进入倒计时 按钮持续不可操作 直到cuntdown为0后恢复
                //         var k2 = data.msg
                //         timeoutKey = 1;         //倒计时控制变量 开启
                //         linkKey = 0;            //接口关闭                                     
                //     }
                // }, "json");
                // alert(1)
            }
        }
    }
}

</script>

<style lang="css" scoped>
   /* @import 'src/style/mixin'; */
    @import 'register.css'; 
    .redTip{
        position: absolute;
        left: 1.92rem;
        top: 17.066667rem;
        width: 12.8rem;
        height: .853333rem;
        font-size: 16px;
        color: orangered;
    }
</style>