<template>
    <div>
        <div v-title data-title="晒单有礼"></div>
        <header v-for="url in headImg">   
            <img :src="url.imageUrl">
        </header>
        <div class="cover">

        </div>
        <footer>
            <button @click="goEvaluate()">
                马上去评论
            </button>
            <div class="goImg">
                <img src="../../common/images/gogogo.png">
            </div>
        </footer>
        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
    </div>
</template>

<script>
    import { productEvaluateList} from 'api'
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
                score: 1, //分值  默认5
                content:'', //说明文字
                show: false, //显示提示框
                showAlert: false, //弹出框
                alertText: null, //弹出框信息
                imgList:'',
                headImg:'',
                routerPath:'',
            }
        },
        created(){
            this.routerPath=rootPath;
        },
        mounted(){
            this.init();
        },
        methods: {
            init(){
                // var productId = this.$route.query.productId
                let params = qs.stringify({
                    // productId: productId,
                })
                productEvaluateList(params).then(res => {
                    console.log(res)
                    if (res.code == '1'){         
                        this.headImg = res.data.list
                    }
                })
            },
            goEvaluate(){
                this.$router.push({
                    path: this.routerPath+'/order',query:{tab:4}
                });
            }
        },
        components: {
            alertTip,
            loading
        }
    }
</script>

<style lang="css" scoped>
    @import 'evaluateIntroduce';
    .activek{
        visibility:hidden;
    } 
    .active1{
        border: .042667rem dashed #fff!important;
    } 
</style>