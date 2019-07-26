
<template>
    <div>
        <div class="toptit">
            <div class="top_t">
                <img style="width:100%;height:100%" src="../../../images/tty/u253.png" alt="error">
            </div>
            <div class="top_o">
                游客信息
            </div>
             <div class="sure">
                确定
            </div> 
        </div>
        <span class="gte"></span>
        <div class="peoInfo" @click="redctfc()">   
            <img src="../../../images/tty/编辑1-@2x.png" alt="1">
            <span class="peoName">{{peoname}}</span>
            <span class="peoClass">{{peoclass}}</span> 
        </div>
        <div class="yx_img" v-if="redct">
            <img src="../../../images/tty/同意-1@2x.png" alt="error" style="width:100%;height:100%">
        </div>
         <div class="red_img" v-if="redct1">
            <img src="../../../images/tty/同意·@2x.png" alt="error"  style="width:100%;height:100%">
        </div> 
    </div>
</template>

<script>

export default {
    data(){
        return{
            peoname:'朱小庭',
            peoclass:'身份证',
            redct:true,
            redct1:false,
        }
    },
    mounted(){

    },
    watch:{

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
        }
    }   
}

</script>

<style lang="css" scoped>
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
        width: 3.2rem;
        height: .853333rem;
        line-height: .682667rem;
        position: absolute;
        left: 6.613333rem;
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
    .gte{
        display: block;
        width: 100%;
        height:.085333rem;
        background-color: #f0f0f0;
    }
    .peoInfo{
        width: 100%;
        height: 3.029333rem;
        position: relative;
         background-color: #fff;
    }
    .peoInfo img{
        width: .768rem;
        height: .768rem;
        position: absolute;
        left: .597333rem;
        top: 1.237333rem;
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
    .yx_img{
        display: block;
        width: .768rem;
        height: .768rem;
        position: absolute;
        left: 14.805333rem;
        top: 3.242667rem;
    }
    .red_img{
        display: block;
        width: .768rem;
        height: .768rem;
        position: absolute;
        left: 14.805333rem;
        top: 3.242667rem;
    }
</style>