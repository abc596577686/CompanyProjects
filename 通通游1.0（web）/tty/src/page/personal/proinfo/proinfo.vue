
<template>
    <div>
        <div class="proinfo">
            <div class="maintit">
                <div class="mt_1">订单状态</div>
                <div class="mt_2">{{mt}}</div>
            </div>
            <div class="mainnum">
                <div class="mn_1">订单编号</div>
                <div class="mn_2">{{mn}}</div> 
            </div>
            <div class="maintime">
                <div class="mi_1">下单时间</div>
                <div class="mi_2">{{mi}}</div> 
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return{
            mt:'审核中',                       //订单状态
            mn:'T3048728347',                 //订单编号
            mi:'2017-09-24 10:19:23',         //下单时间
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
    /* @import 'src/style/mixin'; */
    /* @import 'personal.css';  */
    .proinfo{
        width: 100%;
        height: 4.608rem;
        background-color: #fff;
        position: relative;
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