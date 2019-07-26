
<template>
    <div>
        <div class="toptit">
            <div class="top_t">
                <img style="width:100%;height:100%" src="../../../images/tty/u253.png" alt="error">
            </div>
            <div class="top_o">
                支付订单
            </div>
        </div>
        <span class="gte1"></span>
        <div class="payState">
            <span class="payImg">
                <img style="width:100%;height:100%;display:block;" src="../../../images/tty/成功2@2x.png" alt="error">
            </span>
            <span class="paysc">支付成功</span>
            <span class="paysc2">查看订单详情</span> 
             <span  class="paysc3">
                <img style="width:100%;height:100%;display:block;" src="../../../images/tty/icon_into@2x.png" alt="error" >
            </span> 
        </div>
         <span class="gte1"></span>
        <div class="realPay">
             <span class="realPay_1">实付金额</span>
             <span class="realPay_2">{{realpay2}}</span> 
             <span class="realPay_3">订单编号</span> 
             <span class="realPay_4">{{realpay4}}</span> 
        </div>
        <span class="gte2"></span>
        <contacts></contacts>
        <span class="gte2"></span>
        <goinfo></goinfo>
        <span class="gte2"></span>
        <div class="request">
            <div>申请开发票</div>
            <span>
                <img style="width:100%;height:100%;display:block;" src="../../../images/tty/icon_into@2x.png" alt="error">
            </span>
        </div>
    </div>
</template>

<script>
    import contacts from 'src/page/personal/contacts/contacts'
    import goinfo from 'src/page/personal/goinfo/goinfo'


export default {
    data(){
        return{
            realpay2:'￥12124',               //实付金额
            realpay4:'T340832432422',         //订单编号
        }
    },
    mounted(){

    },
    watch:{
    
    },
    components: {
        // 联系人
        contacts,
        //出行人信息
        goinfo,

    },
    methods:{
        
    }
}

</script>

<style lang="css" scoped>
    @import 'paysuccess.css';

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
        width: 5.12rem;
        height: .853333rem;
        line-height: .682667rem;
        position: absolute;
        left: 6.570667rem;
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
    /*粗X2  */
    .gte2{
        display: block;
        width: 100%;
        height:.426667rem;
        background-color: #f0f0f0;
    }
  
</style>

