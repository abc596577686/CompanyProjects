<template>
    <div>
        <div class="product">
            <img :src="productUrl">
            <div class="productName">
                {{productName}}
            </div>
            <div class="quality">X{{refundCount}}</div>
        </div>
        <div class="service">
            <div>
                <span class="localsp">物流公司</span>
                <template>
                    <el-select class="typeclc" v-model="companyName" placeholder="请选择物流公司">
                        <el-option
                            v-for="item in options1"
                            :key="item.companyName"
                            :label="item.label"
                            :value="item.companyName"   
                        >
                        </el-option>
                    </el-select>
                </template>
            </div>
            <span class="botCover"></span>
        </div>
        <!-- 填写单号 -->
        <div class="service">
            <div style="position:relative">
                <span class="localsp">填写单号</span>
                <input class="danhao" type="number" v-model="danhao">
            </div>
        </div>
        <!-- 描述 -->
        <div class="refundslid">
            <div class="slida">备注信息：</div>
            <textarea name="a" id="respTextarea" placeholder="描述最多100字" v-model="exptxt"></textarea>
            <div class="uploadmoudle">
                <div class="uploadmainA updiv">
                    <input type="file" ref="file1" id="file1"  name='file' @change='onUpload1'> 
                    <img class="photoimg" v-if="image1==''" src="../../../../common/images/photo.png">
                    <div class="phtxt1" v-if="image1==''">上传凭证</div>
                    <div class="phtxt2" v-if="image1==''">(最多3张)</div>
                    <!-- 上传后图片 -->
                    <img class="image1 im" v-if="image1!=''" :src="image1">
                </div>
                <div class="uploadmainB updiv" style="margin-left: 1rem;" v-if="show2">
                    <input type="file" ref="file2" id="file2"  name='file' @change='onUpload2'> 
                    <img class="photoimg" v-if="image2==''" src="../../../../common/images/photo.png">
                    <div class="phtxt1" v-if="image2==''">上传凭证</div>
                    <div class="phtxt2" v-if="image2==''">(最多3张)</div>
                    <!-- 上传后图片 -->
                    <img class="image2 im" v-if="image2!=''" :src="image2">
                </div>
                <div class="uploadmainC updiv" style="margin-left: 1rem;" v-if="show3">
                    <input type="file" ref="file3" id="file3"  name='file' @change='onUpload3'> 
                    <img class="photoimg" v-if="image3==''" src="../../../../common/images/photo.png">
                    <div class="phtxt1" v-if="image3==''">上传凭证</div>
                    <div class="phtxt2" v-if="image3==''">(最多3张)</div>
                    <!-- 上传后图片 -->
                    <img class="image3 im" v-if="image3!=''" :src="image3">
                </div>
            </div>
        </div>
        <!-- 提交申请 -->
        <div class="getApply">
            <button class="applyBtn" @click.stop="getapply()">提交申请</button>
        </div>
        <loading v-show="showLoading"></loading>
    </div>
</template>

<script>
    import { userInfo,showRefund,refundReasonList , webUploadImage ,applyRefund,expressList ,saveExpressNumber} from 'api'
    import qs from 'qs'
    import { rootPath } from 'config/env'   
    import loading from 'base/loading/loading'
    import loadingToast from 'base/loadingToast/loadingToast'
    import { baseUrl } from 'config/env'

    export default {
        data() {
            return {
                routerPath:'',
                myInfo: {},
                me:{
                    itemId:''
                },
                refundType:'',
                refundStatus:'',
                productName:'',
                refundCount:'',
                productUrl:'',
                alertText: null, //弹出框信息
                preventRepeat: false, //防止重复获取
                showLoading: false, //显示加载动画
                sybaseUrl: '', //服务器地址
                showLoadingToast:false,//显示loadingToast
                routerPath:'',
                options1: [
                    
                ],
                options2: [
                   
                ],
                refundName: '请选择',
                reason: '请选择退货原因',
                me:{
                    itemId:'',
                    orderId:'',
                },
                maxrefund:'',
                currentId:'',  //当前物流方式id
                currentReason:'', //当前退款原因id
                productName:'', //商品名称
                image1:'',
                image2:'',
                image3:'',
                returnUrl1:'',
                returnUrl2:'',
                returnUrl3:'',
                quantity:'',
                productImage:'',
                exptxt:'',
                show2:false,
                show3:false,
                companyName:'',
                danhao:'',
                refundId:'',
            }
        },
        created() {
            this.routerPath=rootPath;
            this.me.itemId = this.$route.query.itemId
        },
       
        mounted() {
            this.init()
        },
        methods:{
            async init(){
                let me = this;
                let params = qs.stringify(me.me)
                showRefund(params).then(res => {
                    if (res.code == "1") {
                        console.log(res)
                        this.refundType = res.data.refundType //类型
                        this.refundStatus = res.data.refundStatus //状态
                        console.log(this.refundType)
                        console.log(this.refundStatus)
                    
                        // 商品
                        this.productName = res.data.productName
                        this.refundCount = res.data.refundCount
                        this.productUrl = res.data.image

                        this.refundId = res.data.refundId
                    }else{
                        console.log('载入失败')
                    }
                });
                expressList().then(res => {
                    console.log(res)
                    this.options1 = res.dataList
                })
            },
            getapply(){
                let me = this;
                let params = qs.stringify({
                    refundId : me.refundId,
                    expressNumber : me.danhao,
                    expressCompany : me.currentId,
                    expressImage1 : me.returnUrl1,
                    expressImage2 : me.returnUrl2,
                    expressImage3 : me.returnUrl3,
                    expressExplain : me.exptxt,
                })
                saveExpressNumber(params).then(res => {
                    console.log(res)
                    if(res.code == 1){
                        this.$router.go(-1)
                    }else{
                        alert('申请失败请重试')
                    }
                })
            },
            onUpload1(){ 
                var file = event.target.files[0];
                var params = new FormData();
                params.append('file',file);
                params.append('chunk','0');
                this.showLoading = true     
                webUploadImage(params).then(res => {
                    console.log('上传正面图片后返回数据----')
                    console.log(res);
                    this.image1 = baseUrl + '/upload' + res.userImage
                    this.returnUrl1 = res.userImage
                    this.showLoading = false
                    this.show2 =true
                })
            },
            onUpload2(){
                var file = event.target.files[0];
                var params = new FormData();
                params.append('file',file);
                params.append('chunk','0');
                this.showLoading = true     
                webUploadImage(params).then(res => {
                    console.log('上传正面图片后返回数据----')
                    console.log(res);
                    this.image2 = baseUrl + '/upload' + res.userImage
                    this.returnUrl2 = res.userImage
                    this.showLoading = false
                    this.show3 =true
                })
            },
            onUpload3(){
                var file = event.target.files[0];
                var params = new FormData();
                params.append('file',file);
                params.append('chunk','0');
                this.showLoading = true     
                webUploadImage(params).then(res => {
                    console.log('上传正面图片后返回数据----')
                    console.log(res);
                    this.image3 = baseUrl + '/upload' + res.userImage
                    this.returnUrl3 = res.userImage
                    this.showLoading = false
                })
            },
        },
        watch: {
            // 获取退款类型id
            companyName(newValue, oldValue){
                for( var i=0;i<this.options1.length;i++){
                    if(this.options1[i].companyName == newValue){
                        this.currentId = this.options1[i].companyName.toString()
                    }
                }
                console.log(this.currentId)
            },
        },
        components: {
            loading
        },
    }
</script>
<style lang="css" scoped>
    @import 'writelogistics';
</style>
