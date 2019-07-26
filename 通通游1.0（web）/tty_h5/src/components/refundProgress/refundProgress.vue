
<template>
    <div style="background-color:#fff">
        <div class="top">
            <div class="waittopim" @click="ret">
                <!-- <img src="../../../images/tty/icon_back_black.png" alt="error"> -->
                <img src="../../common/image/icon_back_black.png" >  
            </div>
            <div class="waittoptit">待申请退款</div>
            <div class="green">
                <!-- <img src="../../../images/tty/成功2@2x.png" alt=""> -->
                <img src="../../common/image/refundsuccess.png" >  
            </div>
            <div class="ready">退款申请已提交</div>
            <div class="ready1">您的申请已提交,请耐心等候</div>
            <div class="ct_btn" @click="gorefundinfo">查看退款详情</div>
        </div>
    </div>
</template>

<script>
import qs from 'qs'
import storage from 'good-storage'
import { mapMutations, mapActions, mapGetters } from 'vuex'

export default {
    data(){
        return{
            // 退款订单号
            refundproduct:''
        }
    },
    created() {
        this.refundproduct = this.$route.query.orderNum
    },
    mounted(){

    },
    watch:{
    
    },
    components: {

    },
    methods:{
        // 返回上一页
        ret(){
            this.$router.go(-1)
        },
        // 查看退款详情
        gorefundinfo(){
            this.$router.push({
                path:  '/refund',
                query: {
                    orderNum: this.refundproduct
                }
            })
        }
    }
}

</script>

<style lang="css" scoped>
    *{
        padding: 0;
        margin:0;
    }
    body{
        width: 100%;
        background-color: #fff;
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
        width: 4.266667rem;
        height: .853333rem;
        line-height: .853333rem;
        position: absolute;
        font-size: .725333rem;
        color: #333333;
        left: 6.186667rem;
        top: .768rem
    }
    .green{
        width: 3.498667rem;
        height: 3.413333rem;
        position: absolute;
        left: 6.186667rem;
        top: 3.968rem;
    }
    .green img{
        width: 100%;
        height: 100%;
        display: block;
    }
    .ready{
        width: 6.4rem;
        height: 1.066667rem;
        position: absolute;
        left: 5.461333rem;
        top: 9.344rem;
        font-size: .725333rem;
        color: #333333;
    }
    .ready1{
        width: 8.533333rem;
        height: 1.066667rem;
        position: absolute;
        left: 4.352rem;
        top: 10.88rem;
        font-size: .554667rem;
        color: #666666;
    }
    .ct_btn{
        position: absolute;
        left: 10px;
        top: 15.488rem;
        width: 14.976rem;
        height: 2.133333rem;
        background-color: #008EE5;
        padding-left: 5.290667rem;
        padding-top: .725333rem;
        font-size: .725333rem;
        line-height: .725333rem;
        color: #FFFFFF;
        border-radius: .341333rem .341333rem .341333rem .341333rem;
    }
</style>
