
<template>
    <div>
        <div class="toptit">
            <div class="top_t">
                <img style="width:100%;height:100%" src="../../../images/tty/u253.png" alt="error">
            </div>
            <div class="top_o">
                填写预定信息
            </div>
        </div>
        <span class="gte1"></span>
        <!--产品信息  -->
        <promain></promain>
        <span class="gte2"></span>
        <div class="selectServce">
            <div class="serv_1">可选服务</div>
            <span class="gte1"></span>
            <div class="serv_2" @click="serv">
                <span class="serv_2_img1" v-show="serv1">
                    <img src="../../../images/tty/dshdx.png" alt="error" style="width:100%;height:100%;display:block;">
                </span>
                <span class="serv_2_img2" v-show="serv2">
                    <img src="../../../images/tty/awqewq.png" alt="error" style="width:100%;height:100%;display:block;">
                </span>
                <span class="serv_2_t1">单房差</span>
                <span class="serv_2_t2">说明</span>
            </div>
        </div>
        <span class="gte2"></span>
        <contacts></contacts>
        <span class="gte2"></span>
        <div class="trvinfo">
            <div class="trvtop" style="position:relative;width:100%;height:35px">
                <span class="trvt_1">出行人信息</span>
                <span class="trvt_2" v-show="trvt2" @click="trvt22">
                    <img src="../../../images/tty/dshdx.png" alt="error" style="width:100%;height:100%;display:block;">
                </span>
                <span class="trvt_2" v-show="trvt3" @click="trvt33">
                    <img src="../../../images/tty/awqewq.png" alt="error" style="width:100%;height:100%;display:block;">
                </span>
                 <span class="trvt_3">预定后填写</span> 
            </div>
            <div class="sfz">
                <span class="sfz_img">
                    <img src="../../../images/tty/编辑1-@2x.png"  style="width:100%;height:100%;display:block;">
                </span>
                <span class="sfz_t1">成人1:</span>
                <span class="sfz_t2">{{sfzname}}</span>
                <span class="sfz_t3">身份证</span>
                <input type="text" class="sfz_t4" v-model="sfz4">
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
            <div class="tipmain">
                <p>2-12岁不占床</p>
                <p>大于2周岁不满12周岁的儿童不可使用出生证明,请使用身份证</p>
                <p>户口簿等,乘机请携带填写的相关证件</p>
            </div> 
        </div>
        <span class="gte2"></span>
        <div class="remark">
            <span>备注</span>
            <textarea v-model="textarea"></textarea>
        </div>
        <span class="gte1"></span>
        <div class="tipo">预定完成后可补充出行人信息及可开具发票。</div>
        <span class="gte1"></span>
        <div class="pay">
            <span class="payall">总计</span>
            <span class="paym">{{payallm}}</span>
            <span class="wenh">
                <img src="../../../images/tty/备注@2x.png" alt="error" style="width:100%;height:100%;display:block;"> 
            </span>
            <span class="monmx">费用明细</span>
            <button class="payBtn">下一步</button>
        </div>
    </div>
</template>

<script>
    import promain from 'src/page/personal/promain/promain'
    import contacts from 'src/page/personal/contacts/contacts'

export default {
    data(){
        return{
            serv1:true,    //单房差未选中
            serv2:false,   //单房差选定
            sfzname:'朱小婷',
            sfz4:'3102271994080903333' ,  //出行人信息 身份证
            trvt2:true,
            trvt3:false,   //出行人信息何时显示
            payallm:'￥12121' , //获取总价
            textarea:''  //文本域内容
        }
    },
    mounted(){

    },
    watch:{
    
    },
    components: {
        //产品信息
        promain,
        //联系人  
        contacts
    },
    methods:{
        serv:function(){
            this.serv1 =! this.serv1
            this.serv2 =! this.serv2
        },
        trvt22:function(){
            this.trvt2 =! this.trvt2
            this.trvt3 =! this.trvt3
        },
        trvt33:function(){
            this.trvt2 =! this.trvt2
            this.trvt3 =! this.trvt3
        }
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
        width: 5.12rem;
        height: .853333rem;
        line-height: .682667rem;
        position: absolute;
        left: 5.674667rem;
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
    .selectServce{
        width: 100%;
        height: 4.565333rem;
        background-color: #fff;
        position: relative;
    }
    .serv_1{
        width: 100%;
        height: 1.536rem;
        padding-left: .597333rem;
        padding-top: .512rem;
        font-size: .597333rem;
        color: #666666;
    }
    .serv_2{
        width: 100%;
        height: 2.986667rem;
        position: relative;
    }
    .serv_2_img1{
        display: block;
        width: .768rem;
        height: .768rem;
        position: absolute;
        left: .597333rem;
        top: .64rem
    }
    .serv_2_img2{
        display: block;
        width: .768rem;
        height: .768rem;
        position: absolute;
        left: .597333rem;
        top: .64rem
    }
    .serv_2_t1{
        width: 1.92rem;
        height: .853333rem;
        position: absolute;
        left: 1.749333rem;
        top: .725333rem;
        font-size: .554667rem;
        color: #666666;
    }
    .serv_2_t2{
        width: 1.92rem;
        height: .853333rem;
        position: absolute;
        left: 1.792rem;
        top: 1.834667rem;
        font-size: .469333rem;
        color: #fb4a4c;
    }
    .trvinfo{
        width: 100%;
        height: 9.898667rem;
        background-color: #fff;
        position: relative;
    }
    .trvt_1{
        width: 3.2rem;
        height: .554667rem;
        font-size: .554667rem;
        position: absolute;
        left: .554667rem;
        top: .469333rem;
        color: #646464;
    }
    .trvt_2{
        width: .768rem;
        height: .768rem;
        position: absolute;
        left: 11.605333rem;
        top: .384rem;
    }
    .trvt_3{
        width: 2.986667rem;
        height: .682667rem;
        position: absolute;
        left: 12.672rem;
        top: .469333rem;
        font-size: .554667rem;
        color: #666666;        
    }
    .sfz{
        width: 100%;
        height: 2.517333rem;
        position: relative;
    }
    .sfz_img{
        width: .768rem;
        height: .768rem;
        position: absolute;
        left: .597333rem;
        top: .426667rem;
    }
    .sfz_t1{
        width: 1.92rem;
        height: .554667rem;
        font-size: .554667rem;
        color: #666666;
        position: absolute;
        left: 1.664rem;
        top: .512rem;
    }
    .sfz_t2{
        width: 1.92rem;
        height: .554667rem;
        font-size: .554667rem;
        color: #666666;
        position: absolute;
        left: 3.712rem;
        top: .512rem;
    }
    .sfz_t3{
        width: 4rem;
        height: .554667rem;
        font-size: .554667rem;
        color: #666666;
        position: absolute;
        left: 1.664rem;
        top: 1.493333rem;
    }
    .sfz_t4{
        width: 7.68rem;
        height: .554667rem;
        font-size: .554667rem;
        color: #666666;
        position: absolute;
        left: 4rem;
        top: 1.493333rem;
    }
    .sfz_t5{
        width: 7.68rem;
        height: .554667rem;
        font-size: .554667rem;
        color: #666666;
        position: absolute;
        left: 5rem;
        top: 1.493333rem;
    }
    .tipmain{
        width: 16rem;
        height: 3.370667rem;
        position: relative;
        padding-left: .64rem;
        padding-top: .469333rem;
    }
    .tipmain p{
        width: 100%;
        height: .853333rem;
        line-height: .853333rem;
        font-size: .512rem;
        color: #666666;
    }
    .remark{
        width: 100%;
        height: 4.949333rem;
        position: relative;
        background-color: #fff;
    }
    .remark span{
        display: block;
        width: 1.706667rem;
        height: .597333rem;
        font-size: .597333rem;
        color: #666666;
        position: absolute;
        left: .597333rem;
        top: .469333rem;    
    }
    .remark textarea{
        position: absolute;
        left: .554667rem;
        top: 1.493333rem;
        width: 14.976rem;
        height: 3.029333rem;
        line-height: .597333rem;
        font-size: .597333rem;
        color: #666666;
        /* word-wrap: break-word; */
        word-break : break-all;
        resize:none;
    }
    .tipo{
        width: 100%;
        height: 1.322667rem;
        padding-left: .554667rem;
        padding-top: .469333rem;
        font-size: .469333rem;
        color: #999999;
    }
    .pay{
        width: 100%;
        height: 2.133333rem;
        background-color: #fff;
        position: relative;
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

