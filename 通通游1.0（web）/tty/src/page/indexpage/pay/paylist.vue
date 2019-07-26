
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
            <button class="payBtn" @click="paybtn">立刻支付</button>
        </div>
        <div class="paytype" v-show="atype">
            <div class="pt_1">
                <span class="pt1tit">确认支付</span>
                <span class="pt1_img" @click="closepaytype">
                    <img src="../../../images/tty/关闭-(4@2x.png" alt="error" style="width:100%;height:100%;dispaly:block">
                </span>
            </div>
            <span class="gte1"></span>
            <div class="pt_2">
                <span class="pt2tit">请在45分钟内完成支付</span>
                <span class="pt2price">{{price}}</span>
            </div>
            <span class="gte1"></span>
            <div class="weixin" @click="wxsure">
                <span class="wx_img">
                    <img src="../../../images/tty/微信支付@2x.png" alt="error" style="width:100%;height:100%;dispaly:block">
                </span>
                <span class="wxzff">微信支付</span>
                <span class="wx_img2" v-show="wxim2">
                    <img src="../../../images/tty/同意-1@2x.png" alt="error" style="width:100%;height:100%;dispaly:block">
                </span>
                <span class="wx_img2" v-show="wxim3">
                    <img src="../../../images/tty/同意·@2x.png" alt="error" style="width:100%;height:100%;dispaly:block">
                </span>
            </div>
            <span class="gte1"></span>
            <div class="weixin" @click="zfbsure">
                <span class="wx_img">
                    <img src="../../../images/tty/支付宝@2x.png" alt="error" style="width:100%;height:100%;dispaly:block">
                </span>
                <span class="wxzff">支付宝支付</span>
                <span class="wx_img2" v-show="zfbim2">
                    <img src="../../../images/tty/同意-1@2x.png" alt="error" style="width:100%;height:100%;dispaly:block">
                </span>
                <span class="wx_img2" v-show="zfbim3">
                    <img src="../../../images/tty/同意·@2x.png" alt="error" style="width:100%;height:100%;dispaly:block">
                </span>
            </div>
            <span class="gte1"></span>
            <div class="makesurepay" @click="paybtnfna()">
                确定支付
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    import promain from 'src/page/personal/promain/promain'
    // import goinfo from 'src/page/personal/goinfo/goinfo'

export default {
    data(){
        return{
            num:'T333324432432' ,   //订单编号
            name:'展会',            //订单姓名
            phone:'15256765676' ,   //手机号
            email:'231321@qq.com',  //邮箱
            payallm:'￥121212',     //总金额
            price:'￥299',          //金额
            wxim2:true, //微信支付未选中
            wxim3:false, //微信支付选中
            zfbim2:true,//支付宝支付未选中
            zfbim3:false,//支付宝选中
            atype:false,//选择显示支付方式
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
        wxsure:function(){
            this.wxim2 = false
            this.wxim3 = true
            this.zfbim2 = true
            this.zfbim3 = false
        },
        zfbsure:function(){
            this.wxim2 = true
            this.wxim3 = false
            this.zfbim2 = false
            this.zfbim3 = true
        },
        paybtn:function(){
            this.atype = true;
        },
        closepaytype:function(){
            this.atype = false;
        },
        paybtnfna:function(){
            if (this.wxim3 == true || this.zfbim3 == true){
                alert('选择成功 唤醒支付')
            }else{
                alert('请选择支付方式')
            }
        },
    }
}

</script>

<style lang="css" scoped>
    @import 'paylist.css';

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

