
<template>
    <div>
        <div class="tk_main">
            <span class="tk_main_back">
                <img src="../../../images/tty/返回-(1)@2x.png" alt="error">
            </span>
            <span class="tk_main_tit">退款进度</span>
        </div>
        <span class="greyfc"></span>
        <div class="refundInfo_1">填写申请</div>
        <div class="refundInfo_2">平台审核</div> 
        <div class="refundInfo_3">完成退款</div>  
        <!-- <div class="refundInfo_4">退款失败</div>   -->
         <!-- <div class="refundInfo_5">完成退款</div>    -->
        <!--红圈样式  -->
        <div class="ref_im1">
            <img src="../../../images/tty/椭圆-1@2x.png" alt="error">
        </div>
        <div class="ref_im2">
            <img src="../../../images/tty/椭圆-1@2x.png" alt="error">
        </div>
        <div class="ref_im3">
            <img src="../../../images/tty/椭圆-1@2x.png" alt="error">
        </div>
        <!--灰圈样式  -->
        <div class="ref_im4">
            <img src="../../../images/tty/椭圆-1-拷贝-2@2x.png" alt="error">
        </div>
        <div class="ref_im5">
            <img src="../../../images/tty/椭圆-1-拷贝-2@2x.png" alt="error">
        </div>
        <div class="ref_im6">
            <img src="../../../images/tty/椭圆-1-拷贝-2@2x.png" alt="error">
        </div>
        <div class="xux"></div>
        <div class="xux1"></div>
    </div>
</template>

<script>

export default {
    data(){
        return{

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
    .tk_main{
        width: 100%;
        height: 5.504rem;
        position: relative;
        background-color: #fff;
    }
    .tk_main_back{
        width: .469333rem;
        height: .768rem;
        display: block;
        position: absolute;
        left: .725333rem;
        top: .597333rem;
    }
    .tk_main_back img{
        width: 100%;
        height: 100%;
    }
    .tk_main_tit{
        width: 3.2rem;
        height: 1.066667rem;
        line-height: 1.066667rem;
        font-size: .725333rem;
        color: #333333;
        position: absolute;
        left: 6.570667rem;
        top: .64rem;   
    }
    .greyfc{
        display: block;
        width: 100%;
        height: .042667rem;
        background-color: lightgrey;
        position: absolute;
        top: 2.048rem;
    }
    .refundInfo_1{
        width: 2.218667rem;
        height: .554667rem;
        font-size: .554667rem;
        color: #FB4A4C;
        position: absolute;
        left: .597333rem;
        top: 3.797333rem;
    }
     .refundInfo_2{
        width: 2.218667rem;
        height: .554667rem;
        font-size: .554667rem;
        color: #FB4A4C;
        position: absolute;
        left: 6.912rem;
        top: 3.797333rem;
    } 
    /* .refundInfo_2{
        width: 2.218667rem;
        height: .554667rem;
        font-size: .554667rem;
        color: #999999;
        position: absolute;
        left: 6.912rem;
        top: 3.797333rem;
    } */
    .refundInfo_3{
        width: 2.218667rem;
        height: .554667rem;
        font-size: .554667rem;
        color: #999999;
        position: absolute;
        left: 13.184rem;
        top: 3.797333rem;
    }
     .refundInfo_4{
        width: 2.218667rem;
        height: .554667rem;
        font-size: .554667rem;
        color: #FB4A4C;
        position: absolute;
        left: 13.184rem;
        top: 3.797333rem;
    } 
    .refundInfo_5{
        width: 2.218667rem;
        height: .554667rem;
        font-size: .554667rem;
        color: #FB4A4C;
        position: absolute;
        left: 13.184rem;
        top: 3.797333rem;
    }
    /*红圈  */
    .ref_im1{
        width: .469333rem;
        height: .426667rem;
        position: absolute;
        left: 1.493333rem;
        top: 2.56rem;
    }
    .ref_im2{
        width: .469333rem;
        height: .426667rem;
        position: absolute;
        left: 7.808rem;
        top: 2.56rem;
    }
    .ref_im3{
        width: .469333rem;
        height: .426667rem;
        position: absolute;
        left: 14.08rem;
        top: 2.56rem;
    }
    /*灰圈  */
    .ref_im4{
        width: .469333rem;
        height: .426667rem;
        position: absolute;
        left: 1.493333rem;
        top: 2.56rem;
    }
    .ref_im5{
        width: .469333rem;
        height: .426667rem;
        position: absolute;
        left: 7.808rem;
        top: 2.56rem;
    }
    .ref_im6{
        width: .469333rem;
        height: .426667rem;
        position: absolute;
        left: 14.08rem;
        top: 2.56rem;
    }
    .ref_im1 img{
        width: 100%;
        height: 100%;
    }
    .ref_im2 img{
        width: 100%;
        height: 100%;
    }
    .ref_im3 img{
        width: 100%;
        height: 100%;
    }
    .ref_im4 img{
        width: 100%;
        height: 100%;
    }
    .ref_im5 img{
        width: 100%;
        height: 100%;
    }
    .ref_im6 img{
        width: 100%;
        height: 100%;
    }
    .xux{
        width: 5.888rem;
        height: 1.28rem;
        border: 1px dashed lightgrey;
        border-top: none;
        border-left: none;
        border-right: none;
        position: absolute;
        left: 1.877333rem;
        top: 2.005333rem;
    }
    .xux1{
        width: 5.888rem;
        height: 1.28rem;
        border: 1px dashed lightgrey;
        border-top: none;
        border-left: none;
        border-right: none;
        position: absolute;
        left: 8.192rem;
        top: 2.005333rem;
    }
</style>
