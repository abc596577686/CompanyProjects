
<template>
    <div>
        <div class="topc">
            <div class="topc_im">
                <img src="../../images/tty/u2.png" alt="error">
            </div>
            <div class="topc_tit">{{topctit}}</div>            
        </div>
        <div class="midc">
            <div class="midc_mine">我的订单</div>
            <div class="midc_find">查看全部订单</div>
            <div class="midc_im">
                <img src="../../images/tty/qj_1.png" alt="error">
            </div>
        </div>
        <div class="midd">
            <div class="midd_1">
                <div class="midd_1_num">9</div>
                <div class="midd_1_im">
                    <img src="../../images/tty/待付款-拷贝-3@2x.png" alt="error">
                </div>
                <div class="midd_1_txt">待付款</div>
            </div>
            <div>
                <div class="midd_1_num">9</div>
                <div class="midd_1_im">
                    <img src="../../images/tty/已付款-拷贝-2@2x.png" alt="error">
                </div>
                <div class="midd_1_txt">已付款</div>
            </div>
            <div>
                <div class="midd_1_num">9</div>
                <div class="midd_1_im">
                    <img src="../../images/tty/款易2.0-管钱-退款@2x.png" alt="error">
                </div>
                <div class="midd_1_txt">退款</div>
            </div>
        </div>
        <foot></foot>
        <!-- <alert-tip v-show="showAlert" @closeTip="showAlert = false" :alertTit="alertTit"  :alertText="alertText" :alertMain="alertMain"></alert-tip> -->
    </div>
</template>

<script>
import alertTip from 'src/components/common/alertTip'
import foot from 'src/page/foot/foot'

export default {
    data(){
        return{
            showAlert: false, //弹出框
            alertTit: null,  //弹出框标题
            alertText: null, //弹出框信息
            alertMain: null, //确认提示
            topctit:'Lily全球购', //店招名字 
        }
    },
    mounted(){

    },
    watch:{

    },
    components: {
        foot  
    },
    methods:{
        
    }
}

</script>

<style lang="css" scoped>
   /* @import 'src/style/mixin'; */
    @import 'personal.css'; 
    
</style>