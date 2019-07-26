 
<template>
    <div>
        <div class="top">
            <div class="waittopim">
                <img src="../../../images/tty/icon_back_black.png" alt="error">
            </div>
            <div class="waittoptit">订单详情</div>
        </div>
        <span class="grein"></span>
        <proinfo></proinfo>
        <span class="grein1">
            <span class="cpxx">
                产品信息
            </span>
        </span>
        <promain></promain>
        <span class="grein"></span>
        <contacts></contacts>
        <span class="grein"></span>
        <goinfo></goinfo>
        <span class="grein"></span>
        <allpay></allpay>
        <span class="grein"></span>
        <div class="yqtit">
            约签通知
            <span class="yq_1">
                 <img src="../../../images/tty/右@3x.png" alt="error"> 
            </span>
        </div>
        <div class="yqtit2">
            出团通知
            <span class="yq_2">
                 <img src="../../../images/tty/右@3x.png" alt="error"> 
            </span>
        </div>
        <div class="yqtit3">
            电子合同
            <span class="yq_3">
                 <img src="../../../images/tty/右@3x.png" alt="error"> 
            </span>
        </div>
        <div class="yqtit4">
            申请开发票
            <span class="yq_4">
                 <img src="../../../images/tty/右@3x.png" alt="error"> 
            </span>
        </div>
        <span class="grein"></span>
        <div class="readybtn">
            <!-- <div class="cancelbtn">取消</div> -->
            <div class="paybtn">退款</div>
        </div>
    </div>
</template>

<script>
import proinfo from 'src/page/personal/proinfo/proinfo'
import promain from 'src/page/personal/promain/promain'
import contacts from 'src/page/personal/contacts/contacts'
import goinfo from 'src/page/personal/goinfo/goinfo'
import remark from 'src/page/personal/remark/remark'
import allpay from 'src/page/personal/allpay/allpay'


export default {
    data(){
        return{
            
        }
    },
    mounted(){

    },
    watch:{

    },
    components: {
        // 订单状态
        proinfo,
        //  产品信息
        promain,
        // 联系人
        contacts,
        // 出行人信息
        goinfo,
        // 备注
        remark,
        // 总金额
        allpay
    },
    methods:{
        
    }
}

</script>

<style lang="css" scoped>
    *{
        padding: 0;
        margin:0;
    }
    .top{
        width: 100%;
        height: 1.877333rem;
        background-color: #fff;
        position: relative;
    }
    .waittopim{
        width: .469333rem;
        height: .853333rem;
        position: absolute;
        left: .64rem;
        top: .64rem;
    }
    .waittopim img{
        width: 100%;
        height: 100%;
        display: block;
    }
    .waittoptit{
        width: 3.2rem;
        height: .853333rem;
        line-height: .853333rem;
        position: absolute;
        font-size: .725333rem;
        color: #333333;
        left: 6.570667rem;
        top: .768rem
    }
    .grein{
        display: block;
        background-color: #f0f0f0;
        width: 100%;
        height: .469333rem;
    }
    .grein1{
        display: block;
        background-color: #f0f0f0;
        width: 100%;
        height: 1.28rem;
        position: relative;
    }
    .cpxx{
        width: 2.346667rem;
        height: .682667rem;
        font-size: .469333rem;
        color: #666666;
        display: block;
        position: absolute;
        left: .597333rem;
        top: .426667rem;
    }
    .readybtn{
        width: 16rem;
        height: 1.92rem;
        position: relative;
        background-color: #fff;
    }
    .cancelbtn{
        width: 2.944rem;
        height: 1.066667rem;
        border: 1px solid  #999999;
        position: absolute;
        left: 9.088rem;
        top: .469333rem;
        font-size: .512rem;
        color: #666666;
        text-align: center;
        line-height: 1.066667rem;
        
    }
    .paybtn{
        width: 2.944rem;
        height: 1.066667rem;
        border: 1px solid #FB4A4C;
        position: absolute;
        left: 12.458667rem;
        top: .469333rem;
        font-size: .512rem;
        color: #666666;
        text-align: center;
        line-height: 1.066667rem;
    }
    .yqtit{
        width: 100%;
        height: 1.706667rem;
        background-color: #fff;
        border: 1px solid 	#EDEDED;
        border-bottom: none;
        padding-left: .597333rem;
        padding-top: .597333rem;
        font-size: .64rem;
        color: #333333;
        position: relative;
    }
    .yq_1{
        width: .341333rem;
        height: .512rem;
        position: absolute;
        left: 15.061333rem;
        top: .768rem;
    }
    .yq_1 img{
        width: 100%;
        height: 100%;
        display: block;
    }
    .yqtit2{
        width: 100%;
        height: 1.706667rem;
        background-color: #fff;
        border: 1px solid 	#EDEDED;
        border-bottom: none;
        padding-left: .597333rem;
        padding-top: .597333rem;
        font-size: .64rem;
        color: #333333;
        position: relative;
    }
    .yq_2{
        width: .341333rem;
        height: .512rem;
        position: absolute;
        left: 15.061333rem;
        top: .768rem;
    }
    .yq_2 img{
        width: 100%;
        height: 100%;
        display: block;
    }
    .yqtit3{
        width: 100%;
        height: 1.706667rem;
        background-color: #fff;
        border: 1px solid 	#EDEDED;
        border-bottom: none;
        padding-left: .597333rem;
        padding-top: .597333rem;
        font-size: .64rem;
        color: #333333;
        position: relative;
    }
    .yq_3{
        width: .341333rem;
        height: .512rem;
        position: absolute;
        left: 15.061333rem;
        top: .768rem;
    }
    .yq_3 img{
        width: 100%;
        height: 100%;
        display: block;
    }
    .yqtit4{
        width: 100%;
        height: 1.706667rem;
        background-color: #fff;
        border: 1px solid 	#EDEDED;
        /* border-bottom: none; */
        padding-left: .597333rem;
        padding-top: .597333rem;
        font-size: .64rem;
        color: #333333;
        position: relative;
    }
    .yq_4{
        width: .341333rem;
        height: .512rem;
        position: absolute;
        left: 15.061333rem;
        top: .768rem;
    }
    .yq_4 img{
        width: 100%;
        height: 100%;
        display: block;
    }
    .readybtn{
        width: 16rem;
        height: 1.92rem;
        position: relative;
        background-color: #fff;
    }
    .paybtn{
        width: 2.944rem;
        height: 1.066667rem;
        border: 1px solid #FB4A4C;
        position: absolute;
        left: 12.458667rem;
        top: .469333rem;
        font-size: .512rem;
        color: #FB4A4C;
        text-align: center;
        line-height: 1.066667rem;
    }
</style>