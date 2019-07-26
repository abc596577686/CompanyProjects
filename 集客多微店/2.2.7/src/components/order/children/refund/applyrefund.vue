<template>
    <div>
        <!-- 顶部商品 -->
        <section class="product">
            <img :src="productImage">
            <div class="proName">{{productName}}</div>
            <div class="proNum">{{quantity?'X'+quantity:''}}</div>
        </section>
        <div class="service">
            <div>
                <span class="localsp">申请服务</span>
                <template>
                    <el-select class="typeclc" v-model="refundName" placeholder="请选择">
                        <el-option
                            v-for="item in options1"
                            :key="item.refundName"
                            :label="item.label"
                            :value="item.refundName">
                        </el-option>
                    </el-select>
                </template>
            </div>
            <span class="botCover"></span>
            <div>
                <span class="localsp">申请售后原因</span>
                <template>
                    <el-select class="typeclc" v-model="reason">
                        <el-option
                            v-for="item in options2"
                            :key="item.reason"
                            :label="item.label"
                            :value="item.reason"  
                        >
                        </el-option>
                    </el-select>
                </template>
            </div>
            <span class="botCover"></span>
            <div style="padding:0">
                <span class="localsp">退款金额：</span>
                <span class="localspRed">{{maxrefund?maxrefund:''}}</span>
            </div>
        </div>
        <!-- 最大退款金额 -->
        <div class="maxRefund">
            {{maxrefund?'最大退款金额 ￥'+maxrefund:''}}
        </div>
        <!-- 描述 -->
        <div class="refundslid">
            <div class="slida">问题描述：</div>
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
        <!-- </transition> -->
    </div>
</template>

<script>
    import { refundReasonList , webUploadImage ,applyRefund} from 'api'
    import qs from 'qs'
    import { rootPath } from 'config/env'
    import loading from 'base/loading/loading'
    import loadingToast from 'base/loadingToast/loadingToast'
    import { baseUrl } from 'config/env'

    export default {
        data() {
            return {
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
                currentId:'',  //当前退款方式id
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
            }
        },
        created() {
           this.me.itemId = this.$route.query.itemId;
           this.me.orderId = this.$route.query.orderId;
           this.routerPath = rootPath;
        },
       
        mounted() {
            this.initData();
        },
        components: {
            
        },
        methods:{
            // showClick1(item){
                // console.log(item)
                // this.currentId = item.refundType
            // },
            // showClick2(value){
                // console.log(value)
                // this.currentReason = item.reasonId
            // },
            async initData() {
                let me = this;
                let params = qs.stringify(me.me)
                refundReasonList(params).then(res => {
                    if (res.code == "1") {
                        console.log(res)
                        this.options1 = res.refundTypeList
                        this.options2 = res.dataList
                        this.productName = res.productName
                        this.quantity = res.quantity
                        this.productImage = res.productImage
                    }else{
                        console.log('载入失败')
                    }
                });
            },
            getapply(){
                let me = this;
                let params = qs.stringify({
                    reasonId : me.currentReason,
                    refundType : me.currentId,
                    orderId : this.$route.query.orderId,
                    itemId : this.$route.query.itemId,
                    amount : me.maxrefund,
                    refundExplain : me.exptxt,
                    image1 : me.returnUrl1,
                    image2 : me.returnUrl2,
                    image3 : me.returnUrl3,
                })
                applyRefund(params).then(res => {
                    console.log(res)
                    if(res.code == 1){
                        this.$router.push({
                            // path: this.routerPath+'/refundDetail',
                            path: this.routerPath+'/applyAcess',
                            query: {
                                itemId: this.$route.query.itemId
                            }
                        })
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
        filters: {
           
        },
        watch: {
            // 获取退款类型id
            refundName(newValue, oldValue){
                for( var i=0;i<this.options1.length;i++){
                    if(this.options1[i].refundName == newValue){
                        this.currentId = this.options1[i].refundType.toString()
                    }
                }
                console.log(typeof(this.currentId))
            },
            // 获取退款原因id
            reason(newValue, oldValue){
                // console.log(this.options2)
                for( var i=0;i<this.options2.length;i++){
                    if(this.options2[i].reason == newValue){
                        this.currentReason = this.options2[i].reasonId
                        // 更新最大退款金额
                        this.maxrefund = this.options2[i].maxAmount
                    }
                }
                console.log(this.currentReason)
            }
        },
         components: {
            loading
        },
    }
</script>
<style lang="css" scoped>
    @import 'applyrefund';
    .el-input__inner{
        border: none;
    }   
</style>
