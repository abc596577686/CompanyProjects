<template>
    <div>
        <div v-title data-title="商品评价"></div>
        <div class="showdetail">
            <div class="productImgUrl">
                <img :src='url'>
            </div>
            <div class="pf_txt">
                评分
            </div>
            <el-rate style="line-height: 2.5;"
            v-model="value3"
            show-text
            @change='aaa(value3)'>
            </el-rate>
        </div>
        <section class="upMoudle">
            <textarea v-model="content" class="content" style="outline:none;resize:none;" placeholder="快告诉小伙伴宝贝有多好吧，大家都等着你的使用心得呢~被评为精选评论可获得优惠券">
                
            </textarea>
            <div class="txt_1">
                有图有真相，上传图片更有机会评为精选获得优惠券哟~
            </div>
            <el-upload style="margin-top: .853333rem;"
            action="http://test.uzengroup.com/clt/user/webUploadImage.msp"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :limit=5
            :on-exceed="overnum"
            :on-success="addimg">
            <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            <div class="upBtnTxt">最少输入6个字</div>
            <button class="upBtn" @click="submit()">
                提交
            </button>
        </section>
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
                showLoading:false,
                dialogImageUrl: '',
                dialogVisible: false,
                routerPath:'',
                url:'',
                value3: 5,
                score: 5, //分值  默认5
                content:'', //说明文字
                show: false, //显示提示框
                showAlert: false, //弹出框
                alertText: null, //弹出框信息
                autoshow:[],
                keyshow:[],
                imageUrl: '',
                urllist:[],
                fileUrlList:[],
                imagePath1:'',
                imagePath2:'',
                imagePath3:'',
                imagePath4:'',
                imagePath5:'',
            }
        },
        created(){
            this.routerPath = rootPath;
        },
        mounted(){
            // this.init();
            this.url = this.$route.query.url
            console.log(this.url)
        },
        methods: {
            addimg(response, file, fileList){
                console.log(fileList)
                this.urllist = fileList
            },
            overnum(){
                this.showAlert = true;
                this.alertText = '最多上传五张哦~';
            },
            handleRemove(file, fileList) {
                this.urllist = fileList
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                // const isJPG = file.type === 'image/jpeg';
                // const isLt2M = file.size / 1024 / 1024 < 2;

                // if (!isJPG) {
                // this.$message.error('上传头像图片只能是 JPG 格式!');
                // }
                // if (!isLt2M) {
                // this.$message.error('上传头像图片大小不能超过 2MB!');
                // }
                // return isJPG && isLt2M;
            },
            aaa(value3){
                console.log(value3)
                this.score = value3
            },
            submit(){
                console.log(this.urllist)
                for(var i=0;i<this.urllist.length;i++){
                    var arrStr = {url:this.urllist[i].response.userImage};
                    this.fileUrlList.push(arrStr)
                }
                console.log(this.fileUrlList)
                if(this.fileUrlList.length == 5){
                    this.imagePath1 = this.fileUrlList[0].url
                    this.imagePath2 = this.fileUrlList[1].url
                    this.imagePath3 = this.fileUrlList[2].url
                    this.imagePath4 = this.fileUrlList[3].url
                    this.imagePath5 = this.fileUrlList[4].url
                }else if(this.fileUrlList.length == 4){
                    this.imagePath1 = this.fileUrlList[0].url
                    this.imagePath2 = this.fileUrlList[1].url
                    this.imagePath3 = this.fileUrlList[2].url
                    this.imagePath4 = this.fileUrlList[3].url
                }else if(this.fileUrlList.length == 3){
                    this.imagePath1 = this.fileUrlList[0].url
                    this.imagePath2 = this.fileUrlList[1].url
                    this.imagePath3 = this.fileUrlList[2].url
                }else if(this.fileUrlList.length == 2){
                    this.imagePath1 = this.fileUrlList[0].url
                    this.imagePath2 = this.fileUrlList[1].url
                }else if(this.fileUrlList.length == 1){
                    this.imagePath1 = this.fileUrlList[0].url
                }
                
                var itemId = this.$route.query.itemId
                var orderId = this.$route.query.orderId
                let params = qs.stringify({
                    itemId: itemId,
                    orderId: orderId,
                    score: this.score,
                    content: this.content,
                    imagePath1: this.imagePath1,
                    imagePath2: this.imagePath2,
                    imagePath3: this.imagePath3,     
                    imagePath4: this.imagePath4,
                    imagePath5: this.imagePath5,
                })
                console.log(params)
                applyEvaluate(params).then(res => {
                    if(res.code == 1){  //success
                        this.showAlert = true;
                        this.alertText = res.msg;

                        this.$router.replace({
                            path: this.routerPath+'/evaluateSuccess',query:{}
                        });
                    }else{
                        this.showAlert = true;
                        this.alertText = res.msg;
                    }       
                })
            }
        },
        components: {
            alertTip,
            loading
        }
    }
</script>

<style lang="css" scoped>
    @import 'evaluate';
    .activek{
        visibility:hidden;
    } 
    .active1{
        border: .042667rem dashed #fff!important;
    } 
    .avatar-uploader .el-upload {
        border: .042667rem dashed #d9d9d9;
        border-radius: .256rem;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        /* margin-top: .853333rem; */
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 1.194667rem;
        color: #8c939d;
        width: 3.2rem;
        height: 3.2rem;
        line-height: 3.2rem;
        text-align: center;
        border: .042667rem dashed #666;
    }
    .avatar {
        width: 3.2rem;
        height: 3.2rem;
        display: block;
    }
</style>
