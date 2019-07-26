<template>
    <div>
        <div class="infomain">
            <div class="toptit_img">
                <img src="../../../images/tty/打钩(7)@2x.png" alt="error">
            </div>
            <div class="toptit_txt">{{toptit}}</div>
            <div class="greyin"></div>
            <div class="greyin2"></div>
            <div class="maintxt">{{maintxt}}</div>
            <div class="maintime">{{maintime}}</div>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return{
            toptit:'退款申请已提交',
            maintxt:'您的退款申请已提交，客服将为您及时解决',
            maintime:'申请时间 2017-01-18 00:02',
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
    *{
        margin: 0;
        padding: 0;
    }
    .infomain{
        width: 100%;
        height: 5.461333rem;
        position: relative;
        background-color: #fff;
    }
    .toptit_img{
        width: .682667rem;
        height: .682667rem;
        position: absolute;
        left: .512rem;
        top: .810667rem;
    }
    .toptit_img img{
        display: block;
        width: 100%;
        height: 100%;
    }
    .toptit_txt{
        width: 5.12rem;
        height: .810667rem;
        line-height: .810667rem;
        font-size: .597333rem;
        color: #333333;
        position: absolute;
        left: 1.450667rem;
        top: .896rem;
    }
    .greyin{
        width: .213333rem;
        height: .170667rem;
        position: absolute;
        left: .682667rem;
        top: 2.645333rem;
        background-color: #DDDDDD;
    }
    .greyin2{
        width: .213333rem;
        height: .170667rem;
        position: absolute;
        left: .682667rem;
        top: 4.138667rem;
        background-color: #DDDDDD;
    }
    .maintxt{
        width: 12.8rem;
        height: .810667rem;
        line-height: .810667rem;
        font-size: .597333rem;
        color: #666666;
        position: absolute;
        left: 1.152rem;
        top: 2.346667rem;
    }
    .maintime{
        width: 12.8rem;
        height: .810667rem;
        line-height: .810667rem;
        font-size: .554667rem;
        color: #666666;
        position: absolute;
        left: 1.152rem;
        top: 3.797333rem;
    }
</style>
