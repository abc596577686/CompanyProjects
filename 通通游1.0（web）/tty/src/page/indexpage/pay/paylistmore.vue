
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
        <span class="gte2"></span>
        <div class="knum">
            <span class="k1">订单编号</span>
            <span class="k2" style="color:#fb5759">{{num}}</span>
        </div>
        <span class="gte1"></span>
        <div class="knum">
            <span class="k1">姓名</span>
            <span class="k2">{{name}}</span>
        </div>
        <span class="gte1"></span>
        <div class="knum">
            <span class="k1">手机号</span>
            <span class="k2">{{phone}}</span>
        </div>
        <span class="gte1"></span>
        <div class="knum">
            <span class="k1">邮箱</span>
            <span class="k2">{{email}}</span>
        </div>
        <span class="gte2"></span>
        <promain></promain>
        <span class="gte1"></span>
        <div class="midtip">
            <span class="mt_1">单房差</span>
            <span class="mt_2">已选择</span> 
        </div>
        <!--付款  -->
        <div class="pay">
            <span class="payall">总计</span>
            <span class="paym">{{payallm}}</span>
            <span class="wenh">
                <img src="../../../images/tty/icon_descript@2x.png" alt="error" style="width:100%;height:100%;display:block;"> 
            </span>
            <span class="monmx">费用明细</span>
            <button class="payBtn">立刻支付</button>
        </div>
        <div class="sfz">
                <span class="sfz_img">
                    <img src="../../../images/tty/编辑1-@2x.png"  style="width:100%;height:100%;display:block;">
                </span>
                <span class="sfz_t1">成人1:</span>
                <span class="sfz_t2">{{sfzname}}</span>
                <span class="sfz_t3">身份证</span>
                <input type="text" class="sfz_t4" v-model="sfz3">
            </div>
            <div class="sfz">
                <span class="sfz_img">
                    <img src="../../../images/tty/编辑1-@2x.png"  style="width:100%;height:100%;display:block;">
                </span>
                <span class="sfz_t1">成人2:</span>
                <span class="sfz_t2">{{sfzname}}</span>
                <span class="sfz_t3">护照(国际)</span>
                <input type="text" class="sfz_t5" v-model="sfz4">
            </div>
    </div>
    </div>
</template>

<script>
    import promain from 'src/page/personal/promain/promain'

export default {
    data(){
        return{
            num:'T333324432432' ,    //订单编号
            name:'展会',             //订单姓名
            phone:'15256765676' ,    //手机号
            email:'231321@qq.com',   //邮箱
            payallm:'￥121212',      //总金额
            sfzname:'阿斯顿' ,       //获取名字
            sfz3:'1212' ,           //身份证
            sfz4:'1212',            //护照
        }
    },
    mounted(){

    },
    watch:{
    
    },
    components: {
        // 产品信息
        promain,
    },
    methods:{
        
    }
}

</script>

<style lang="css" scoped>
    @import 'paylistmore.css';

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
    .pay{
        width: 100%;
        height: 2.133333rem;
        background-color: #fff;
        position: fixed; 
         bottom: 0; 
    }
    .payall{
        width: 1.493333rem;
        height: .853333rem;
        line-height: .853333rem;
        font-size: .597333rem;
        color: #666666;
        position: absolute;
        left: .64rem;
        top: .853333rem;
    }
    .paym{
        width: 3.626667rem;
        height: .853333rem;
        line-height:  .768rem;
        font-size: .768rem;
        color: #fb4a4c;
        position: absolute;
        left: 1.92rem;
        top: .853333rem;
    }
    .wenh{
        width: .512rem;
        height: .512rem;
        position: absolute;
        left: 6.741333rem;
        top: .981333rem;

    }
    .monmx{
        width: 2.346667rem;
        height: .512rem;
        font-size: .512rem;
        color: #008ee5;
        position: absolute;
        left: 7.509333rem;
        top: .981333rem;
    }
    .payBtn{
        width: 5.973333rem;
        height: 2.133333rem;
        background-color: #ff8100;
        position: absolute;
        left: 10.1rem;
        top: 0;
        /* padding-left: 1.962667rem; */
        /* padding-top: .768rem; */
        text-align: center;
        line-height: 2.133333rem;
        font-size: .682667rem;
        color: #ffffff;
    }
</style>
