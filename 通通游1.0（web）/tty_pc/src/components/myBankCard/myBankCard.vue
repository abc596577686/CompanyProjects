<template>
  <section class="myBankCard">
  	<el-row :gutter="10">
  		<el-col :span="24">
  			<div class="grid-content bg-purple">
  				<div v-if="bindStatus == '1'">
				    <el-form :label-position="labelPosition" label-width="120px" :model="bankCard" :rules="rules" ref="bankCard" class="ruleForm">
				    	<el-form-item label="发卡银行：" prop="issBankName">
								<el-select v-model="bankCard.issBankName" placeholder="请选择银行">
						      <el-option v-for="bank in bankList" :label="bank.name" :value="bank.value" key="bank"></el-option>
						      <!-- <el-option label="中国银行" value="0"></el-option>
						      <el-option label="中信银行" value="1"></el-option>
						      <el-option label="招商银行" value="2"></el-option> -->
						    </el-select>
					    </el-form-item>
							<el-form-item label="开户银行：" prop="depositBankName">
						    <el-input v-model="bankCard.depositBankName"></el-input>
						  </el-form-item>
							<el-form-item label="银行卡卡号：" prop="code">
						    <el-input v-model="bankCard.code"></el-input>
						  </el-form-item>
							<el-form-item class="lineHeight" label="开卡人姓名(公司名称)：" prop="unitName">
						    <el-input v-model="bankCard.unitName"  placeholder="人名或公司名称"></el-input>
						  </el-form-item>
						  <el-form-item>
						    <el-button type="primary" @click.prevent="submitForm('bankCard')">保存</el-button>
						  </el-form-item>
						  <!-- <el-form-item v-show="!editStatus">
						    <el-button type="primary" @click.prevent="editEnv">修改</el-button>
						  </el-form-item> -->
				   	</el-form>
			   	</div>
			   	<div v-else>
				    <el-form :label-position="labelPosition" label-width="120px" :model="bankCard" :rules="rules" class="ruleForm">
				    	<el-form-item label="发卡银行：" prop="issBankName">
						    <p v-html="bankName"></p>
					    </el-form-item>
							<el-form-item label="开户银行：" prop="depositBankName">
						    <p v-html="bankCard.depositBankName"></p>
						  </el-form-item>
							<el-form-item label="银行卡卡号：" prop="code">
						    <p v-html="bankCard.code"></p>
						  </el-form-item>
							<el-form-item class="lineHeight" label="开卡人姓名：" prop="unitName">
						    <p v-html="bankCard.unitName"></p>
						  </el-form-item>
						  <el-form-item>
						    <el-button type="primary" @click.prevent="editEnv">修改</el-button>
						  </el-form-item>
				   	</el-form>
			   	</div>
			  </div>
		  </el-col>
   	</el-row>
  </section>
</template>

<script type="text/ecmascript-6">
	import qs from 'qs';
	import {getBankList, getDistributionDetails, bindBankInfo} from 'api'

  export default {
  	data() {
  		return {
  			bindStatus: '1', // 1未绑定 2已绑定
  			labelPosition: 'right',
  			bankList: [],
  			bankCard: {
  				issBankName: '',
  				depositBankName: '',
  				code: '',
  				unitName: ''
  			},
	  		rules: {
	  			issBankName: [
	  				{required: true, message: '请选择发卡银行', trigger: 'change'}
	  			],
	  			depositBankName: [
	  				{required: true, message: '请填写开户银行'}
	  			],
	  			code: [
	  				{required: true, message: '请填写银行卡卡号'}
	  			],
	  			unitName: [
	  				{required: true, message: '请填写开户人姓名'}
	  			]
	      },
	      bankName: '',
	      editStatus: false
  		}
  	},
  	created() {
  		if (localStorage.getItem('__bindStatus__')) {
  			this.bindStatus = localStorage.getItem('__bindStatus__')
  		}

  	},
  	watch: {
  		'bankList'() {
  			console.log(this.bankCard.issBankName)
  			this.bankList.forEach((bank) => {
					if (bank.value == this.bankCard.issBankName) {
						console.log('相等')
						console.log(bank)
						this.bankName = bank.name
					}
				})
  		}
  	},
  	methods: {
  		editEnv() {
  			this.bindStatus = 1
  			localStorage.setItem('__bindStatus__', this.bindStatus)

  			this.$router.push({
					path: '/msgValidate'
				})
  		},
  		submitForm(formName) {
  			this.$refs[formName].validate((valid) => {
          if (valid) {
          	let params = qs.stringify({
          		issuingBank: this.bankCard.issBankName,
          		depositBank: this.bankCard.depositBankName,
          		cardNo: this.bankCard.code,
          		cardHolder: this.bankCard.unitName
          	});
            bindBankInfo(params).then((res) => {
            	console.log(res);
							if (res.state == '1') {
								this.$notify({
									title: '提示',
									message: '绑定成功',
									type: 'success'
								})
								this.$router.push({
									path: '/withDrawal'
								})
							} else {
								this.$notify({
									title: '提示',
									message: '修改失败，请重新绑定',
									type: 'error'
								})
							}
						})
          } else {
            console.log('error submit!!');
            return false;
          }
        });
  		}
  	},
  	mounted() {
  		getBankList().then((res) => {
  			console.log(res);
  			let data = res.list;
  			this.bankList = data;
  		})
	 	  getDistributionDetails().then((res) => {
				console.log(res);
				if (res.state == '1') {
					let data = res.info;
					if (!localStorage.getItem('__bindStatus__')) {
						if (data.cardNo && data.cardNo.length) {
							this.editStatus = true
							this.bindStatus = 2
						} else {
							this.editStatus = false
							this.bindStatus = 1
						}
		  		}

					this.bankCard = {
						issBankName: data.issuingBank,
	  				depositBankName: data.depositBank,
	  				code: data.cardNo,
	  				unitName: data.cardHolder
					}
				} else {
					this.$notify({
						title: '提示',
						type: 'error',
						message: res.message
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

  	},
  	destroyed() {
  		localStorage.clear()
  	}
  }
</script>

<style >
  .myBankCard .lineHeight .el-form-item__label{
		line-height: 1.5;
		text-align: center;
  }
  .myBankCard .el-form-item__label{
  	letter-spacing: 2px;
  	text-align: left;
  	width: 110px !important;
  }
  .myBankCard .el-form-item{
  	padding-left: 20px;
  }
</style>