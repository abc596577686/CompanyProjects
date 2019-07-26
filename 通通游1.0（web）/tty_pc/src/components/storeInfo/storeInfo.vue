<template>
  <section class="storeInfo">
  	<el-row :gutter="45">
			<el-form :label-position="labelPosition" label-width="110px" :model="ruleForm" :rules="rules" ref="ruleForm" class="ruleForm">
			  <el-col :span="10">
			  	<div class="grid-content bg-purple">
						<el-form-item label="店铺名称：" prop="shopName">
              <el-row :gutter="5">
                <el-col :span="19">
                  <el-input v-model="ruleForm.shopName" @input="inputChange"></el-input>
                </el-col>
                <el-col :span="4">
                  <p><span v-html="minLen"></span>/<span v-html="maxLen"></span></p>
                </el-col>
              </el-row>
					  </el-form-item>
					  <el-form-item label="店铺logo：" prop="imageUrl">
					    <el-upload
							  class="avatar-uploader"
                ref="upload"
                action
                :http-request="uploadFile"
							  :auto-upload="true"
							  :multiple="false"
							  :show-file-list="false"
							  :on-success="handleAvatarSuccess"
                :on-error="handleError"
							  :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl && imageUrl.length" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
							<span class="uploadTips">建议尺寸：160*160px</span>
					  </el-form-item>
					  <el-form-item label="店招：" prop="imageUrlForShop">
					    <el-upload
							  class="avatar-uploader"
							  action
                :http-request="uploadFileForShop"
							  :show-file-list="false"
							  :auto-upload="true"
							  :multiple="false"
							  :on-success="handleAvatarSuccessForShop"
							  :before-upload="beforeAvatarUploadForShop"
                :on-error="handleErrorForShop">
							  <img v-if="imageUrlForShop && imageUrlForShop.length" :src="imageUrlForShop" class="avatarForShop">
							  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
							<span class="uploadTips">建议尺寸：750*300px</span>
					  </el-form-item>
					  <el-form-item label="店铺简介：" prop="shopDesc">
              <p class="tips">(选填)</p>
					    <el-input type="textarea" v-model="ruleForm.shopDesc"></el-input>
					  </el-form-item>
					  <el-form-item>
					    <el-button type="primary" @click.prevent="submitForm('ruleForm')">保存</el-button>
					  </el-form-item>
			  	</div>
			  </el-col>
			  <el-col :span="10">
			  	<div class="grid-content bg-purple-light">
						<el-form-item label="联系人姓名：">
					    <p v-html="shopInfo.name"></p>
					  </el-form-item>
					  <el-form-item label="联系人QQ：" prop="qq">
					    <el-input v-model="ruleForm.qq"></el-input>
					  </el-form-item>
						<el-form-item label="联系人电话：">
					    <p v-html="shopInfo.phone"></p>
					  </el-form-item>
						<el-form-item label="创建时间：">
					    <p v-html="shopInfo.creatTime"></p>
					  </el-form-item>
			  	</div>
			  </el-col>
			</el-form>
		</el-row>
    
  </section>
</template>

<script type="text/ecmascript-6">
  import qs from 'qs';
	import {getShopInfo, upShopInfo, uploadImageForShop} from 'api';

  export default {
  	data() {
      return {
        file: null,
        imageId: '',
        imageForShopId: '',
        labelPosition: 'right',
        ruleForm: {
          shopName: '',
          shopDesc: '',
          imageUrl: '',
          imageUrlForShop: '',
          qq: ''
        },
        rules: {
        	shopName: [
            { required: true, message: '请输入店铺名称', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          shopDesc: [
            { required: false, message: '' }
          ],
          imageUrl: [
          	{required: true, message: '请上传店铺Logo'}
          ],
          imageUrlForShop: [
          	{required: true, message: '请上传店招图'}
          ],
          qq: [
          	{required: true, message: '请输入QQ号码', trigger: 'blur'},
          	{pattern: /^[0-9]*$/, message: 'qq号码有误', trigger: 'blur' }
          ]
        },
        imageUrl: null,
        imageUrlForShop: null,

        // 由后台获取数据
        shopInfo: {
        	name: '',
        	phone: '',
        	creatTime: ''
        },
        minLen: 0,
        maxLen: 20
      }
    },
    created() {
      this._getShopInfo()
    },
    methods: {
      inputChange(val) {
        this.minLen = val.length
      },
    	submitForm(formName) {
				let _this = this;

        this.$refs[formName].validate((valid) => {
          if (valid) {
      			this.$confirm('确认提交吗？', '提示', {
		    			confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning',
		          center: true
		    		}).then(() => {

							//提交数据
							let params = qs.stringify({
                name: _this.ruleForm.shopName,
                contactQq: _this.ruleForm.qq,
                promotionNotice: _this.ruleForm.shopDesc,
                logoId: this.imageId,
                signageId: this.imageForShopId
							})

							upShopInfo(params).then((res) => {
                console.log(res);
                if (res.state == '1') {
                  this.$notify({
                    title: '提示',
                    message: '提交成功',
                    type: 'success'
                  })
                } 
                if (res.state == '-1') {
                  if (res.message) {
                    this.$notify({
                      title: '提示',
                      message: res.message,
                      type: 'error'
                    })
                    return
                  }
                  this.$notify({
                    title: '提示',
                    message: '哎呀…… 出点意外，请稍后再试 ^_^',
                    type: 'error'
                  })
                }
							})
              .catch((res) => {
                if (res.response) {
                  if (res.response.status == '911') {
                    this.$notify({
                      title: '提示',
                      message: '操作超时，请重新登录',
                      type: 'error'
                    })
                    this.$router.push('/login')
                  }
                }
              })

						}).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消'
		          });
		        });
          } else {
            this.$notify.error({
							title: '提示',
							message: '亲，请注意必填项^_^'
						})
            return false;
          }
        });
      },
      handleAvatarSuccess(res, file) {
      	console.log('成功')
        this.ruleForm.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2; //不能超过2M

        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      handleAvatarSuccessForShop(res, file) {
        this.ruleForm.imageUrlForShop = URL.createObjectURL(file.raw);
      },
      beforeAvatarUploadForShop(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      handleError(err, file, fileList) {
        console.log('上传失败')
        console.log(err, file, fileList)
      },
      handleErrorForShop(err, file, fileList) {
        console.log('上传失败')
        console.log(err, file, fileList)
      },
      uploadFile(file) {
        console.log(file);
        this.file = file.file;
        
        this.$notify({
          type: 'info',
          title: '提示',
          message: '上传中……'
        })

        let formData = new FormData();
        formData.append('type', 'dianpu');
        formData.append('file', this.file);

        uploadImageForShop(formData).then((res) => {
          console.log(res);
          if (res.state == '1') {
            this.$notify({
              title: '提示',
              message: '上传成功',
              type: 'success'
            })
            this.imageUrl = res.fileUrl;
            this.imageId = res.fileId;
            this.ruleForm.imageUrl = res.fileUrl;
          } else {
            this.$notify({
              title: '提示',
              message: '上传失败，参数有误',
              type: 'error'
            })
          }

        }).catch(() => {
          this.$notify({
            title: '提示',
            message: '提交失败，请联系管理员',
            type: 'error'
          })
        })
      },
      uploadFileForShop(file) {
        console.log(file);
        this.file = file.file;

        this.$notify({
          title: '提示',
          message: '上传中……',
          type: 'info'
        })

        let formData = new FormData();
        formData.append('type', 'dianpu');
        formData.append('file', this.file);

        uploadImageForShop(formData).then((res) => {
          console.log(res);
          if (res.state == '1') {
            this.$notify({
              title: '提示',
              message: '上传成功',
              type: 'success'
            })
            this.imageUrlForShop = res.fileUrl;
            this.imageForShopId = res.fileId;

            this.ruleForm.imageUrlForShop = res.fileUrl;
          } else {
            this.$notify({
              title: '提示',
              message: '上传失败，参数有误',
              type: 'error'
            })
          }

        }).catch(() => {
          this.$notify({
            title: '提示',
            message: '提交失败，请联系管理员',
            type: 'error'
          })
        })
      },
      _getShopInfo() {
  			getShopInfo().then((res) => {
          console.log(res);
          if (res.state == '1') {
            let data = res.info;
  					this.shopInfo = {
              name: data.contactName,
              phone: data.contactPhone,
              creatTime: data.createTime
            }
            this.ruleForm = {
              qq: data.contactQq,
              shopName: data.name,
              shopDesc: data.promotionNotice
            }

            this.imageId = data.logoId
            this.imageForShopId = data.signageId

            this.ruleForm.imageUrl = data.logoId;
            this.imageUrl = data.logoId;
            this.ruleForm.imageUrlForShop = data.signageId;
            this.imageUrlForShop = data.signageId;
            this.minLen = this._getNameLen(data.name)
          }
          if (res.state == '-1') {
            if (res.message) {
              this.$notify({
                title: '提示',
                message: res.message,
                type: 'error'
              })
            } else {
              this.$notify({
                title: '提示',
                message: '亲，获取数据失败 ^_^',
                type: 'error'
              })
            }
          }
				})
        .catch((res) => {
          if (res.response) {
            if (res.response.status == '911') {
              this.$notify({
                title: '提示',
                message: '操作超时，请重新登录',
                type: 'error'
              })
              this.$router.push('/login')
            }
          }
        })
      },
      _getNameLen(name) {
        if (!name) return 0

        let ret = name.length
        return ret
      }
    },
    mounted() {

    }
  }
</script>

<style>
  .storeInfo{
    margin: 20px 0;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    /*// height: 178px;*/
    min-height: 178px;
    display: block;
  }
  .avatarForShop{
  	width: 278px;
    min-height: 178px;
    // height: 178px;
    display: block;
  }
  .el-textarea textarea{
  	min-height: 160px !important;
  }
  .uploadTips{
  	font-size: 12px;
  	color: #ccc;
  	margin-top: -10px;
    display: block;
  }
  .tips{
    color: #ef7272;
  }

</style>