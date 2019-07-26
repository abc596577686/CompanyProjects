
<template>
    <div>
        <div class="proinfo">
            <div class="maintit item">
                <div class="mt_1">订单状态</div>
                <div class="mt_2">{{orderStatusDec}}</div>
            </div>
            <div class="mainnum item">
                <div class="mn_1">订单编号</div>
                <div class="mn_2">{{orderNum}}</div> 
            </div>
            <div class="maintime item">
                <div class="mi_1">下单时间</div>
                <div class="mi_2">{{createTime}}</div> 
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        orderStatusDec: {
            type: String,
            default: '无'
        },
        orderNum: {
            type: String,
            default: '无'
        },
        createTime: {
            type: String,
            default: '无'
        }
    },
    data(){
        return{}
    }
}

</script>

<style lang="css" scoped>
    .proinfo{
        width: 100%;
        height: 4.608rem;
        background-color: #fff;
        position: relative;
    }
    .proinfo .item{
        border-bottom: 0.04rem solid #f5f5f5;
    }
    .maintit{
        width: 100%;
        height: 1.536rem;
    }
    .mainnum{
        width: 100%;
        height: 1.536rem;
    }
    .maintime{
        width: 100%;
        height: 1.536rem;
    }
    .mt_1{
        width: 2.56rem;
        height: .64rem;
        line-height: .64rem;
        position: absolute;
        left: .512rem;
        top: .512rem;
        font-size: .469333rem;
        color: #666666;   
    }
    .mt_2{
        width: 2.133333rem;
        height: .64rem;
        line-height: .64rem;
        position: absolute;
        left: 3.2rem;
        top: .512rem;
        font-size: .469333rem;
        color: #FB4A4C;  
    }
    .mn_1{
        width: 2.56rem;
        height: .64rem;
        line-height: .64rem;
        position: absolute;
        left: .512rem;
        top: 2.048rem;
        font-size: .469333rem;
        color: #666666;   
    }
    .mn_2{
        width: 8.533333rem;
        height: .64rem;
        line-height: .64rem;
        position: absolute;
        left: 3.2rem;
        top: 2.048rem;
        font-size: .469333rem;
        color: #FB4A4C;
    }
    .mi_1{
        width: 2.56rem;
        height: .64rem;
        line-height: .64rem;
        position: absolute;
        left: .512rem;
        top: 3.584rem;
        font-size: .469333rem;
        color: #666666;   
    }
    .mi_2{
        width: 8.533333rem;
        height: .64rem;
        line-height: .64rem;
        position: absolute;
        left: 3.2rem;
        top: 3.584rem;
        font-size: .469333rem;
        color: #666666;
    }
</style>