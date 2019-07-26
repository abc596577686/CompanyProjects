<template>
    <div>
        <header>
            <img class="headerImg" src="../../../common/images/jihead@2x.png">
            <div class="header_txt1">1</div>
            <div class="header_txt2">全球营养供应商</div>
        </header>
        <section class="imgurl">   
            <img :src="img.imageUrl" v-for="img in imageUrlList">
        </section>
        <section class="content">
            <span style="color:#FB4A4C">{{"@"+name+':'}}</span><span>{{content}}</span>
        </section>
        <section class="product">
            <div class="product_info">
                <img :src="productImage" class="productImage">
                <div class="productName">{{productName}}</div>
            </div>
        </section>
        <div class="cover"></div>
        <div class="ewCode">
            <img :src="productImage">
        </div>
        <div class="title">
            长按识别二维码，领取30元新人红包
        </div>
        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
    </div>
</template>

<script>
    import { productEvaluateList, applyEvaluate, webUploadImage} from 'api'
    import qs from 'qs'
    import alertTip from 'base/alertTip/alertTip'
    import { rootPath } from 'config/env'
    import storage from 'good-storage'
    import wx from 'weixin-js-sdk'
    import { baseUrl } from 'config/env'
    import loading from 'base/loading/loading'
    export default {
        data(){
            return{
                url:'',
                value3: null,
                showLoading: false, //显示加载动画
                resImgUrl1:'',  //上传用字段    
                resImgUrl2:'',
                resImgUrl3:'',
                resImgUrl4:'',  
                resImgUrl5:'',
                score: 5, //分值  默认5
                content:'', //说明文字
                show: false, //显示提示框
                showAlert: false, //弹出框
                alertText: null, //弹出框信息
                imageUrlList:'',
                content:'',
                productName:'',
                productImage:'',
                name:'',
            }
        },
        created(){
            var listobj = JSON.parse(sessionStorage.waitShareUrlList);
            this.imageUrlList = listobj      //晒图
            this.content = sessionStorage.waitShareContent          //评价内容
            this.productName = sessionStorage.waitShareName        //商品名字
            this.productImage = sessionStorage.waitShareImage       //商品图片
            this.name = localStorage.construmer
        },
        mounted(){
            this.url = this.$route.query.url
            // console.log(this.imageUrlList)
        },
        methods: {
    
        },
        components: {
            alertTip,
            loading
        }
    }
</script>

<style lang="css" scoped>
    @import 'evaluateShare';
    .activek{
        visibility:hidden;
    } 
    .active1{
        border: .042667rem dashed #fff!important;
    } 
</style>