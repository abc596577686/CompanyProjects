
<template>
    <div>
        <div class="contacts">
            <div class="cont">{{contpeo}}</div>
            <div class="name">姓名</div>
            <div class="namet">{{name}}</div>  
            <div class="phone">身份证</div>
            <div class="phonet">{{peoinfo1}}</div>
        </div>
        <!-- <alert-tip v-show="showAlert" @closeTip="showAlert = false" :alertTit="alertTit"  :alertText="alertText" :alertMain="alertMain"></alert-tip> -->
    </div>
</template>

<script>
// import alertTip from 'src/components/common/alertTip'

export default {
    data(){
        return{
            showAlert: false, //弹出框
            alertTit: null,  //弹出框标题
            alertText: null, //弹出框信息
            alertMain: null, //确认提示
            contpeo:'出行人信息',
            name:'朱小婷',
            peoinfo1:'310227199409090909',
        }
    },
    mounted(){

    },
    watch:{
    
    },
    components: {
        //弹窗小组件
        // alertTip
    },
    methods:{

    }
}

</script>

<style lang="css" scoped>
/* @import 'src/style/mixin'; */
/* @import 'index.css';  */
    .contacts{
        width: 100%;
        height: 4.650667rem;
        position: relative;
        background-color: #fff;
    }
    .cont{
        width: 4rem;
        height: .853333rem;
        line-height: .853333rem;
        font-size: .554667rem;
        position: absolute;
        left: .512rem;
        top: .512rem;
        color: #666666;
    }
    .name{
        width: 1.493333rem;
        height: .853333rem;
        line-height: .554667rem;
        font-size: .554667rem;
        color: #666666;
        position: absolute;
        top: 2.005333rem;
        left: .554667rem
    }
    .namet{
        width: 4.266667rem;
        height: .853333rem;
        line-height: .554667rem;
        font-size: .554667rem;
        color: #666666;
        position: absolute;
        top: 2.005333rem;
        left: 2.602667rem;
    }
    .phone{
        width: 2.346667rem;
        height: .853333rem;
        line-height: .554667rem;
        font-size: .554667rem;
        color: #666666;
        position: absolute;
        top: 3.498667rem;
        left: .554667rem
    }
    .phonet{
        width: 8.106667rem;
        height: .853333rem;
        line-height: .554667rem;
        font-size: .554667rem;
        color: #666666;
        position: absolute;
        top: 3.498667rem;
        left: 2.602667rem;
    }
</style>
