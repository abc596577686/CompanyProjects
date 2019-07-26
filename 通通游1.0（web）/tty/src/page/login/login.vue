
<template>
    <div class="service_page">
        <!-- <div class="topimg">
           <img src="../../images/tty/u2.png" alt="Error">
        </div> -->
        <div class="topCt">
            <!-- <div class="topCt_img_bg"> -->
                <div class="topCt_img">
                    <img src="../../images/tty/u253.png" alt="Error">
                </div>
            <!-- </div> -->
            <div class="topCt_t1" @click="yzlogin" v-bind:class="{yz:isaction}">验证码登录</div> 
            <div class="topCt_t2" @click="mmlogin" v-bind:class="{yz:isaction1}">密码登录</div>  
        </div>
        <div class="topImg">
            <img src="../../images/tty/u2.png" alt="error">
        </div>
        <div class="user">{{user}}</div>
        <input class="userIn" type="text" :placeholder="userin" v-model="userink">
        <!--提示小弹窗  -->
        <span class="xs"></span>
        <div class="code">{{code}}</div>
        <input class="codeIn" type="text" :placeholder="codein" v-model="codeink">
        <button @click="send" class="sec_yzbtn" :disabled="st" v-show="hhbtn">
                <span v-if="sendMsgDisabled">{{time+'秒后获取'}}</span> 
                <span v-if="!sendMsgDisabled">获取验证码</span> 
        </button>
        <button class="marklogin" @click="makesure">登录</button>
        <div class="registerbtn" @click="registerjump">注册账号</div>
        <div class="losebtn" @click="registerjump">忘记密码</div>
        <div class="usevx">使用第三方账户</div>
        <div class="vximg">
            <img src="../../images/tty/weixin.png" alt="error">
        </div>
        <alert-tip v-show="showAlert" @closeTip="showAlert = false" :alertTit="alertTit"  :alertText="alertText" :alertMain="alertMain"></alert-tip>
    </div>
</template>

<script>
import alertTip from 'src/components/common/alertTip'

export default {
    data(){
        return{
            showAlert: false, //弹出框
            alertTit: null,  //弹出框标题
            alertText: null, //弹出框信息
            alertMain: null, //确认提示
            user:'+86',
            userin:'请输入手机号码',
            userink:'',
            code:'验证码',
            codein:'请输入验证码',
            codeink:'',
            st: false,   //验证码默认可使用 点击出发后控制不可选中
            time: 60,    // 发送验证码倒计时
            sendMsgDisabled: false,
            hhbtn : true,
            isaction:true,
            isaction1:false,
            key:'待传入参数'
        }
    },
    mounted(){

    },
    watch:{
    
    },
    components: {
        //弹窗小组件
        alertTip  
    },
    methods:{
        yzlogin:function(){
            this.user = '+86'
            this.code =  '验证码'
            this.userin = '请输入手机号'
            this.codein = '请输入验证码'
            this.hhbtn = true
            this.isaction = true
            this.isaction1 = false
        },
        mmlogin:function(){
            this.user = '用户名'
            this.code =  '密码'
            this.userin = '请输入用户名'
            this.codein = '请输入密码'
            this.hhbtn = false
            this.isaction = false
            this.isaction1 = true
        },
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
        registerjump:function(){
            this.$router.push({path:"/wap/register",query:{a:this.key}})
        },
        makesure:function(){
                this.showAlert=true;
                this.alertTit="操作成功";
                this.alertText="登陆成功";
                this.alertMain="确定";
        }
    }
}

</script>

<style lang="css" scoped>
   /* @import 'src/style/mixin'; */
    @import 'login.css'; 
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