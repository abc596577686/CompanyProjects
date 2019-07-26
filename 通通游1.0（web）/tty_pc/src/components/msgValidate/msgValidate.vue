<template>
  <section class="msgValidate">
  	<el-row :gutter="10">
  		<el-col :span="10">
		    <el-form :model="validateForm" label-width="100px" class="demo-ruleForm">
		    	<el-form-item label="手机号：" prop="phoneNumber">
			      <el-input type="text" v-html="userPhone" auto-complete="off" placeholder=""></el-input>
			    </el-form-item>
		    	<el-form-item label="验证码：" prop="verificationCode" class="position">
			      <el-input type="text" v-model="validateForm.verificationCode"></el-input>
			      <div class="getBtn el-button el-button--primary" ref="getBtn" @click="getVerificationCode" v-html="verificationCodeText"></div>
			      <!-- <el-button class="getBtn" type="primary"></el-button> -->
			    </el-form-item>
		    	<el-form-item>
			      <el-button class="nextStep" type="primary" @click="nextStep">下一步</el-button>
			    </el-form-item>
		    </el-form>
	    </el-col>
	  </el-row>
  </section>
</template>

<script type="text/ecmascript-6">
  import qs from 'qs';
	import {getVerifyCode, verify, getBankInfo, getUserInfo} from 'api'

  export default {
  	data() {
  		return {
        userPhone: '',
  			bindStatus: null,
  			verificationCodeText: '获取验证码',
  			validateForm: {
  				phoneNumber: '',
  				verificationCode: ''
  			},
  			isClick: true,
  			number: 60,
        toggleClick: true
  		}
  	},
  	methods: {
  		getVerificationCode() {
        if (!this.toggleClick) return;
  			if (this._verifyPhone(this.validateForm.phoneNumber)) {
  				this._getVerifyCode();
  				this._countDown();
  			}
  		},
  		nextStep() {
        if (!this.toggleClick) return;
  			if (this._verifyPhone(this.validateForm.phoneNumber)) {
  				if (this.validateForm.verificationCode == '') {
	  				this.$notify.error({
		          title: '提示',
		          message: '验证码不能为空'
		        });
	  			} else {
            let params = qs.stringify({
              verifyCode: this.validateForm.verificationCode,
              phone: this.validateForm.phoneNumber
            });
            verify(params).then((res) => {
              console.log(res);
              if (res.state == '-1') {
                if (res.message) {
                  this.$notify.error({
                    title: '提示',
                    message: res.message
                  })
                } else {
                  this.$notify.error({
                    title: '提示',
                    message: '验证码不正确，请重新获取'
                  })
                }
              } 
              if (res.state == '1'){
                this.$router.push({
                  path: '/myBankCard'
                })
                localStorage.setItem('__bindStatus__', 1)
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
	  			}
  			}
  		},
  		_verifyPhone(number) {
  			let reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
  			if (number == '') {
  				this.$notify.error({
	          title: '提示',
	          message: '手机号不能为空'
	        });
          this.toggleClick = false;
          this._setDelayed();
  			} else if (!reg.test(number)) {
  				this.$notify.error({
	          title: '提示',
	          message: '手机号格式不正确'
	        });
          this.toggleClick = false;
          this._setDelayed();
	        return false;
  			} else {
  				return true;
  			}
  		},
      _setDelayed() {
        let timer = setTimeout(() => {
          this.toggleClick = true;
          clearTimeout(timer)
        }, 3600);
      },
  		_getVerifyCode() {
        if (!this.isClick) {
          return;
        }
  			let params = qs.stringify({
          phone: this.validateForm.phoneNumber
        });
		 	  getVerifyCode(params).then((res) => {
					console.log(res);
          if (res.state == '-1') {
            if (res.message) {
              this.$notify.error({
                title: '提示',
                message: res.message
              });
            } else {
              this.$notify.error({
                title: '提示',
                message: '错误，请联系管理员'
              });
            }
          } 
          if (res.state == '1') {
            this.$notify.success({
              title: '提示',
              message: '验证码已发送'
            });
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
  		_countDown() {
  			if (!this.isClick) {
  				return;
  			}
  			let timer = null;
  			this.isClick = false;
  			this.verificationCodeText = `${this.number}s后重新发送`;
  			this.$refs.getBtn.style.background = '#ccc';
  			timer = setInterval(() => {
  				if (this.number == 0) {
  					this.number = 60;
  					this.isClick = true;
  					this.verificationCodeText = `获取验证码`;
  					this.$refs.getBtn.style.background = '#409EFF';
  					clearInterval(timer);
  					return;
  				}
  				this.number --;
  				this.verificationCodeText = `${this.number}s后重新发送`;
  			}, 1000)
  		}
  	},
  	mounted() {
      getUserInfo().then((res) => {
        if (res.state == '-1') {
          if (res.message) {
            this.$notify({
              type: 'error',
              title: '提示',
              message: res.message
            });
          } else {
            this.$notify({
              type: 'error',
              title: '提示',
              message: '获取手机号失败'
            });
          }
          return;
        }
        if (res.state == '1') {
          this.userPhone = res.info.tel
          this.validateForm.phoneNumber = this.userPhone
        }
      })
  	}
  }
</script>

<style scoped>
	.position{
		position: relative;
	}
  .getBtn{
  	position: absolute;
    right: 0;
    bottom: 2px;
    padding: 0 10px;
    border: 0;
    border-radius: 0;
    height: 36px;
    line-height: 36px;
  }
</style>
