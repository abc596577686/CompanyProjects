
<template>
    <div>
        <div class="promain">
            <div class="promain_im">
                <img src="../../../images/tty/图层-21@3x.png" alt="error">
            </div>
            <div class="promain_tit">{{promatit}}</div>
            <div class="promain_peonum">出游人数： {{peoplenum}}</div>
            <div class="promain_peotime">出发时间： {{peopletime}}</div>
            <div class="promain_state">{{prostate}}</div>
        </div>
        <div class="shuoming" v-show="kk">
                <div class="shuom1">{{sm1}}</div>
                <div class="shuom2">{{sm2}}</div>
        </div>
        <div class="zc" v-show="ek">
                <div class="zcsq">再次申请</div>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return{
            promatit:'邂逅彩虹岛-美国夏威夷欧湖半岛自助游7天4晚',
            peoplenum:'成人x1',
            peopletime:'2017-09-24',
            prostate:'退款进度',
            kk:false,   //完成退款时显示
            sm1:'申请退款原因，图片与页面描述不符',
            sm2:'退款金额 ￥209.00',
            ek:false, //再次申请
        }
    },
    mounted(){
        
    },
    watch:{

    },
    components: {

    },
    methods:{
        
    }
}

</script>

<style lang="css" scoped>
    .promain{
        width: 100%;
        height: 4.949333rem;
        background-color: #fff;
        position: relative;
    }
    .promain_im{
        width: 5.290667rem;
        height: 3.925333rem;
        position: absolute;
        left: .554667rem;
        top: .512rem;
    }
    .promain_im img{
        width: 100%;
        height: 100%;
    }
    .promain_tit{
        width: 9.258667rem;
        height: 1.365333rem;
        line-height: .682667rem;
        font-size: .597333rem;
        color: #666666;
        position: absolute;
        left: 6.058667rem;
        top: .512rem;
    }
    .promain_peonum{
        width: 8.106667rem;
        height: .853333rem;
        line-height: .512rem;
        font-size: .512rem;
        color: #999999;
        position: absolute;
        left: 6.101333rem;
        top: 2.602667rem;
    }
    .promain_peotime{
        width: 8.106667rem;
        height: .853333rem;
        line-height: .512rem;
        font-size: .512rem;
        color: #999999;
        position: absolute;
        left: 6.101333rem;
        top: 3.925333rem;
    }
    .promain_state{
        width: 2.944rem;
        height: 1.024rem;
        line-height: 1.024rem;
        font-size: .554667rem;
        color: #FB4A4C;
        border: 1px solid #FB4A4C; 
        text-align: center;
        position: absolute;
        left: 12.544rem;
        top: 3.541333rem;
    }
    .shuoming{
        width: 16rem;
        height: 1.962667rem;
        padding-left: .554667rem;
        padding-top: .384rem;
        background-color: #fff;
        border: 1px solid lightgrey;
        border-left: none;
        border-right: none;
        border-bottom: none;
    }
    .shuom1{
        width: 9.386667rem;
        height: .554667rem;
        font-size: .469333rem;
        color: #666666;
    }
    .shuom2{
        width: 9.386667rem;
        height: .554667rem;
        font-size: .469333rem;
        color: #666666;
        position: relative;
        top: .256rem;
    }
    .zc{
        width: 100%;
        height: 1.92rem;
        background-color: #fff;
        border: 1px solid lightgrey;
        border-left: none;
        border-right: none;
        border-bottom: none;
        /* position: relative; */
        /* left: 12.416rem; */
        padding-left: 12.544rem;
        padding-top: .469333rem;
    }
    .zcsq{
        width: 2.944rem;
        height: 1.024rem;
        border: 1px solid #666666;
        /* padding-left: .341333rem;
        padding-top: .298667rem; */
        font-size: .554667rem;
        text-align: center;
        line-height: 1.024rem;
    }
</style>