
<template>
    <div>
        <div class="toptit">
            <div class="top_t" @click="ret()">
                <img style="width:100%;height:100%" src="../../../images/tty/u253.png" alt="error">
            </div>
            <div class="top_o">
                申请发票
            </div>
        </div>
        <span class="gte"></span>
        <div class="peoInfo"> 
            <div class="name">
                <span class="nametit">发票种类</span>
                <div class="namein">{{classin}}</div>
            </div>
            <span class="gte1"></span>
            <div class="main" @click="maininct">
                <span class="maintit">发票内容</span>
                <div class="mainin">{{mainin}}</div>
                <span class="mainimg">
                    <img src="../../../images/tty/icon_into@2x.png" alt="error" style="width:100%;height:100%">
                </span>
            </div>
            <span class="gte1"></span>
            <div class="name">
                <span class="nametit">收票人手机</span>
                <div class="namein">{{phonein}}</div>
            </div>
            <span class="gte1"></span>
            <div class="name">
                <span class="nametit">收票人邮箱</span>
                <div class="namein">{{emailin}}</div>
            </div>
            <span class="gte1"></span>
            <div class="main" @click="mainin1ct">
                <span class="maintit">收票类型</span>
                <div class="mainin">{{recin}}</div>
                <span class="mainimg">
                    <img src="../../../images/tty/icon_into@2x.png" alt="error" style="width:100%;height:100%">
                </span>
            </div>
            <span class="gte1" ></span>
            <div class="toptt">
                <span class="tt_1">发票抬头</span>
                <input class="tt_2" placeholder="请填写公司名称" v-model="invoicetop">
                <div class="tt_3">纳税人识别号:</div>
                 <input class="tt_4" v-model="keynum"> 
            </div>
            <div class="saveInfoBtn" @click="saveall">
                保存
            </div>
            
            <div class="fpnr" v-show="fqct">
                <div @click="fp_1">团款</div>
                <div @click="fp_2">住宿</div>
                <div @click="fp_3">旅游服务费</div>
                <div @click="fp_4">交通</div>
                <div @click="fp_5">机票加酒店</div>
                <div @click="fp_6">门票费</div> 
            </div>

            <div class="splx" v-show="spct">
                <div @click="sp_1">个人</div>
                <div @click="sp_2">企业</div>
            </div>
        </div>
        <div class="greyfg"  v-show="grct"></div>
    </div>
</template>

<script>

export default {
    data(){
        return{
            classin:'普通发票',       //发票种类
            mainin:'旅游费',          //发票内容
            phonein:'15200000000',   //收票人手机号
            emailin:'99999@163.com', //收票人邮箱
            recin:'公司',            //收票类型
            invoicetop:'',           //发票抬头
            keynum:'1212121212',     //识别号
            fqct: false,             //发票类型选择     
            grct: false,             //灰色覆盖 
            spct: false,             //收票类型    
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
        ret(){
            this.$router.go(-1)
        },
        redctfc:function(){
            this.redct =! this.redct
            this.redct1 =! this.redct1
        },
        redct1fc:function(){
            this.redct1 =! this.redct1
            this.redct =! this.redct
        },
        saveall:function(){
            alert(1)
        },
        maininct:function(){
            this.fqct = true
            this.grct = true
        },
        mainin1ct:function(){
            this.spct = true
            this.grct = true
        },
        fp_1:function(){
            this.mainin = '团款'
            this.fqct = false
            this.grct = false
        },
        fp_2:function(){
            this.mainin = '住宿'
            this.fqct = false
            this.grct = false
        },
        fp_3:function(){
            this.mainin = '旅游服务费'
            this.fqct = false
            this.grct = false
        },
        fp_4:function(){
            this.mainin = '交通'
            this.fqct = false
            this.grct = false
        },
        fp_5:function(){
            this.mainin = '机票加酒店'
            this.fqct = false
            this.grct = false
        },
        fp_6:function(){
            this.mainin = '门票费'
            this.fqct = false
            this.grct = false
        },
        sp_1:function(){
            this.recin = '个人'
            this.spct = false
            this.grct = false
        },
        sp_2:function(){
            this.recin = '企业'
            this.spct = false
            this.grct = false
        },
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
    .name{
        width: 100%;
        height: 2.133333rem;
        position: relative;
    }  
    .nametit{
        display: block;
        width: 3.413333rem;
        height: .853333rem;
        line-height: .853333rem;
        position: absolute;
        left: .597333rem;
        top: .725333rem;
        font-size: .682667rem;
        color: #333333;
    }
    .namein{
        display: block; 
        width: 8.533333rem;
        height: .853333rem;
        line-height: .853333rem;
        position: absolute;
        left: 4.266667rem;
        top: .725333rem;
        font-size: .597333rem;
        color: #333333;
    }
    .main{
        width: 100%;
        height: 2.133333rem;
        position: relative;
    }  
    .maintit{
        display: block;
        width: 3.413333rem;
        height: .853333rem;
        line-height: .853333rem;
        position: absolute;
        left: .597333rem;
        top: .725333rem;
        font-size: .682667rem;
        color: #333333;
    }
    .mainin{
        display: block; 
        width: 8.533333rem;
        height: .853333rem;
        line-height: .853333rem;
        position: absolute;
        left: 4.266667rem;
        top: .725333rem;
        font-size: .597333rem;
        color: #333333;
    }
    .mainimg{
        width: .384rem;
        height: .597333rem;
        position: absolute;
        left: 15.104rem;
        top: .554667rem;
    }
    .toptt{
        width: 100%;
        height: 2.773333rem;
        position: relative;
    }
    .tt_1{
        width: 3.413333rem;
        height: .853333rem;
        line-height: .682667rem;
        font-size: .682667rem;
        color: #333333;
        position: absolute;
        left: .597333rem;
        top: .64rem;
    }
    .tt_2{
        width: 8.533333rem;
        height: .853333rem;
        line-height: .597333rem;
        font-size: .597333rem;
        color: #333333;
        position: absolute;
        left: 4.266667rem;
        top: .554667rem;
    }
    .tt_3{
        width: 3.626667rem;
        height: .682667rem;
        font-size: .512rem;
        color: #999999;
        line-height: .512rem;
        position: absolute;
        left: .597333rem;
        top: 1.706667rem;
    }
    .tt_4{
         width: 8.533333rem;
        height: .853333rem;
        line-height: .597333rem;
        font-size: .597333rem;
        color: #999999;
        position: absolute;
        left: 4.266667rem;
        top: 1.536rem;
    }
    .saveInfoBtn{
        width: 15.018667rem;
        height: 2.133333rem;
        background-color: #008ee5;
        border-radius: .341333rem .341333rem .341333rem .341333rem;
        position: absolute;
        top: 22.954667rem;
        left: .597333rem;
        font-size: .682667rem;
        color: #ffffff;
        text-align: center;
        line-height: 2.133333rem;
    }
    .fpnr{
        width: 15.26667rem;
        height: 10.368rem;
        position: fixed;
        bottom: .341333rem;
        left: .4rem;
        border-radius: .341333rem .341333rem .341333rem .341333rem;
        z-index: 1000;
        background-color: #ffffff;
    }
    .greyfg{
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #000000;
        opacity: 0.4;
        z-index: 999;
    }
    .fpnr > div{
        width: 100%;
        height: 1.7rem;
        text-align: center;
        font-size: .597333rem;
        color: #333333;
        line-height: 1.7rem; 
    }
    .splx{
        width: 15.26667rem;
        height:3.456rem;
        position: fixed;
        bottom: .341333rem;
        left: .4rem;
        border-radius: .341333rem .341333rem .341333rem .341333rem;
        z-index: 1000;
        background-color: #ffffff;
    }
    .splx > div{
        width: 100%;
        height: 1.7rem;
        text-align: center;
        font-size: .597333rem;
        color: #333333;
        line-height: 1.7rem; 
    }

</style>