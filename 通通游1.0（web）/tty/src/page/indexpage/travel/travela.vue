
<template>
    <div>
        <div class="toptit">
            <div class="top_t">
                <img style="width:100%;height:100%" src="../../../images/tty/u253.png" alt="error">
            </div>
            <div class="top_o">
                出行人信息
            </div>
             <div class="sure" @click="saveall">
                保存
            </div> 
        </div>
        <span class="gte"></span>
        <div class="peoInfo">
            <div class="name">
                <span class="nametit">姓名</span>
                <input class="namein" placeholder="必填" v-model="namein"></input>
            </div>
            <span class="gte1"></span>
            <div class="phone">
                <span class="phonetit">手机号</span>
                <input class="phonein" placeholder="必填" v-model="phonein"></input>
            </div>   
            <span class="gte1"></span> 
            <div class="email">
                <span class="emailtit">邮箱</span>
                <input class="emailin" placeholder="必填" v-model="emailin"></input>
            </div> 
            <span class="gte1"></span>
            <div class="pack">
                <span class="packtit">证件类型</span>
                <div class="packin">{{packin}}</div>
                <span class="packimg">
                    <img src="../../../images/tty/icon_into@2x.png" alt="error" style="width:100%;height:100%">
                </span>
            </div>
            <span class="gte1"></span> 
            <div class="packnum">
                <span class="packnumtit">证件号码</span>
                <input class="packnumin" placeholder="必填" v-model="packnumin"></input>
            </div>  
            <span class="gte1"></span> 
            <div class="packnum">
                <span class="packnumtit">证件有效期</span>
                <input class="packnumin" placeholder="必填" v-model="packtimein"></input>
            </div>
            <span class="gte1"></span> 
           <div class="pack">
                <span class="packtit">证件签发地</span>
                <div class="packin">{{packplace}}</div>
                <span class="packimg">
                    <img src="../../../images/tty/icon_into@2x.png" alt="error" style="width:100%;height:100%">
                </span>
            </div>
            <span class="gte1"></span> 
            <div class="email">
                <span class="emailtit">英文姓</span>
                <input class="emailin" placeholder="如中文名为通通游,填写tong" v-model="engx"></input>
            </div>
            <span class="gte1"></span> 
            <div class="email">
                <span class="emailtit">英文名</span>
                <input class="emailin" placeholder="如中文名为通通游,填写tongyou" v-model="engm"></input>
            </div>
            <span class="gte1"></span> 
            <div class="pack">
                <span class="packtit">性别</span>
                <div class="packin">{{sex}}</div>
                <span class="packimg">
                    <img src="../../../images/tty/icon_into@2x.png" alt="error" style="width:100%;height:100%">
                </span>
            </div>
            <span class="gte1"></span> 
            <div class="packnum">
                <span class="packnumtit">生日</span>
                <input class="packnumin" placeholder="必填" v-model="borndate"></input>
            </div>     
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return{
            namein:'',      //姓名
            phonein:'' ,       //手机号
            emailin:'' ,        //邮箱
            packin:'暂无证件',   //证件类型
            packnumin:'' ,    //证件号码
            packtimein :'', //证件有效期
            packplace:'请选择',//证件签发地
            engx:'',//英文姓
            engm:'',//英文名
            sex:'请选择' ,//性别
            borndate:''//出生日期
        }
    },
    mounted(){

    },
    watch:{
        namein:function(val){

        }
    },
    components: {

    },
    methods:{
        redctfc:function(){
            this.redct =! this.redct
            this.redct1 =! this.redct1
        },
        redct1fc:function(){
            this.redct1 =! this.redct1
            this.redct =! this.redct
        },
        saveall:function(){
            alert("保存成功")
        }
    }   
}

</script>

<style lang="css" scoped>
    *{
        margin: 0;
        padding: 0;
    }
    .toptit{
        width: 100%;
        height: 1.877333rem;
        position: relative;
         padding-top: .64rem; 
         padding-left: .554667rem; 
         background-color: #fff;
    }
    .top_t{
        width: .469333rem;
        height: .853333rem;
        position: absolute;
    }
    .top_o{
        width:3.84rem;
        height: .853333rem;
        line-height: .682667rem;
        position: absolute;
        left: 6.314667rem;
        top: .810667rem;
        font-size: .682667rem;
        color: #333333;
    }
    .sure{
        width: 1.493333rem;
        height: .853333rem;
        line-height: .682667rem;
        font-size: .682667rem;
        color: #333333;
        position: absolute;
        left: 14.122667rem;
        top: .853333rem;
    }
    /*粗线  */
    .gte{
        display: block;
        width: 100%;
        height:.085333rem;
        background-color: #f0f0f0;
    }
    /*细线  */
    .gte1{
        display: block;
        width: 100%;
        height:.04rem;
        background-color: #f0f0f0;
    }
    .peoInfo{
        width: 100%;
        /* height: 3.029333rem; */
        position: relative;
         background-color: #fff;
    }
    .peoName{
        width: 2.133333rem;
        height: .853333rem;
        font-size: .597333rem;
        color: #333333;
        position: absolute;
        left: 1.749333rem;
        top: .725333rem;

    }
    .peoClass{
        width: 2.133333rem;
        height: .853333rem;
        font-size: .597333rem;
        color: #333333;
        position: absolute;
        left: 1.749333rem;
        top: 1.749333rem;
    }
    .name{
        width: 100%;
        height: 2.133333rem;
        position: relative;
    }  
    .nametit{
        display: block;
        width: 1.706667rem;
        height: .853333rem;
        line-height: .853333rem;
        position: absolute;
        left: .597333rem;
        top: .75rem;
        font-size: .682667rem;
        color: #333333;
    }
    .namein{
        display: block; 
        width: 8.533333rem;
        height: .853333rem;
        line-height: .682667rem;
        position: absolute;
        left: 4.266667rem;
        top: .725333rem;
        font-size: .682667rem;
        color: #333333;
    }
    .phone{
        width: 100%;
        height: 2.133333rem;
        position: relative;
    }  
    .phonetit{
        display: block;
        width: 2.56rem;
        height: .853333rem;
        line-height: .853333rem;
        position: absolute;
        left: .597333rem;
        top: .75rem;
        font-size: .682667rem;
        color: #333333;
    }
    .phonein{
        display: block;
        width: 8.533333rem;
        height: .853333rem;
        line-height: .682667rem;
        position: absolute;
        left: 4.266667rem;
        top: .725333rem;
        font-size: .682667rem;
        color: #333333;
    }
    .email{
        width: 100%;
        height: 2.133333rem;
        position: relative;
    }  
    .emailtit{
        display: block;
        width: 2.56rem;
        height: .853333rem;
        line-height: .853333rem;
        position: absolute;
        left: .597333rem;
        top: .75rem;
        font-size: .682667rem;
        color: #333333;
    }
    .emailin{
        display: block;
        width: 11.533333rem;
        height: .853333rem;
        line-height: .682667rem;
        position: absolute;
        left: 4.266667rem;
        top: .725333rem;
        font-size: .682667rem;
        color: #333333;
    }
    .pack{
        width: 100%;
        height: 2.133333rem;
        position: relative;
    }  
    .packtit{
        display: block;
        width: 3.413333rem;
        height: .853333rem;
        line-height: .853333rem;
        position: absolute;
        left: .597333rem;
        top: .75rem;
        font-size: .682667rem;
        color: #333333;
    }
    .packin{
        display: block;
        width: 8.533333rem;
        height: .853333rem;
        line-height: .853333rem;
        position: absolute;
        left: 4.266667rem;
        top: .725333rem;
        font-size: .682667rem;
        color: #333333;
    }
    .packimg{
        width: .341333rem;
        height: .597333rem;
        position: absolute;
        left: 15.146667rem;
        top: .597333rem;
    }
    .packnum{
        width: 100%;
        height: 2.133333rem;
        position: relative;
    }  
    .packnumtit{
        display: block;
        width: 3.413333rem;
        height: .853333rem;
        line-height: .853333rem;
        position: absolute;
        left: .597333rem;
        top: .75rem;
        font-size: .682667rem;
        color: #333333;
    }
    .packnumin{
        display: block;
        width: 8.533333rem;
        height: .853333rem;
        line-height: .682667rem;
        position: absolute;
        left: 4.266667rem;
        top: .71rem;
        font-size: .682667rem;
        color: #333333;
    }
</style>