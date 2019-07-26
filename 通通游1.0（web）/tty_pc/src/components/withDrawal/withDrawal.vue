<template>
  <section class="withDrawal">
    <el-row :gutter="10">
  		<el-col :span="24">
		    <el-form :model="withDrawal" label-width="130px" class="demo-ruleForm">
		    	<el-form-item label="可提现金额：">
		    		<el-row :gutter="20">
						  <el-col :span="20">
						  	<div class="grid-content bg-purple">
						  		<span class="money">{{withDrawal.money}}</span>元
						  	</div>
						  </el-col>
						</el-row>
			    </el-form-item>
		    	<el-form-item label="提现至银行卡：">
		    		<el-row :gutter="20">
						  <el-col :span="6">
						  	<div class="grid-content bg-purple">
						  		<p v-html="withDrawal.card"></p>
						  	</div>
						  </el-col>
						  <el-col :span="6"><span class="changeCard" @click="changeCard">修改银行卡</span></el-col>
						</el-row>
			    </el-form-item>
		    	<el-form-item label="提现金额：">
		    		<el-row :gutter="0">
						  <el-col :span="4">
						  	<div class="grid-content bg-purple">
						  		<el-input type="number" v-model="withDrawal.drawMoney" class="drawInput" placeholder="输入提现金额"></el-input>
						  	</div>
						  </el-col>
						  <el-col :span="6">元</el-col>
						</el-row>
			    </el-form-item>
		    	<el-form-item label="提现审核周期：">
		    		<el-row :gutter="20">
						  <el-col :span="10">
						  	<div class="grid-content bg-purple">
			      			<p>5个工作日</p>
						  	</div>
						  </el-col>
						</el-row>
			    </el-form-item>
		    	<el-form-item>
			      <el-button type="primary" @click="drawBtn">确认提现</el-button>
			    </el-form-item>
		    </el-form>
	    </el-col>
	  </el-row>
  </section>
</template>

<script type="text/ecmascript-6">
	import qs from 'qs';
	import {getBankInfo, getCardList, drawMoney} from 'api'

  export default {
  	data() {
  		return {
  			withDrawal: {
  				money: '',
  				card: '',
  				drawMoney: ''
  			}
  		}
  	},
  	created() {
  		this._getBankInfo();
  		this._getCardList();
  	},
  	methods: {
  		drawBtn() {
  			console.log(typeof this.withDrawal.drawMoney)
  			if (this.withDrawal.drawMoney == '') {
  				this.$notify.error({
						title: '提示',
						message: '输入提现金额'
					})
					return;
  			}
  			if (Number(this.withDrawal.drawMoney) < 0) {
  				this.$notify.error({
						title: '提示',
						message: '不能为负数'
					})
					return;
  			}
  			if (parseFloat(this.withDrawal.drawMoney) > parseFloat(this.withDrawal.money)) {
  				this.$notify.error({
						title: '提示',
						message: '提现金额不能大于可提现金额'
					})
					return
  			}
  			let params = qs.stringify({
  				amount: this.withDrawal.drawMoney
  			});
	      drawMoney(params).then((res) => {
					console.log(res);
					if (res.state == '1') {
						this.$notify({
							type: 'success',
							title: '提示',
							message: res.message
						})
						this.withDrawal.money = parseFloat(this.withDrawal.money) - parseFloat(this.withDrawal.drawMoney);
						this.$router.push('/myIncome')
					} 
					if (res.state == '-1') {
						if (res.message) {
							this.$notify({
								type: 'error',
								title: '提示',
								message: res.message
							})
						}
						else {
							this.$notify({
								type: 'error',
								title: '提示',
								message: '提现失败'
							})
						}
					}
				})
  		},
  		changeCard() {
  			this.$router.push({
  				path: '/msgValidate'
  			})
  		},
  		_getCardList() {
      	getCardList().then((res) => {
          console.log(res);
          let data = res.info;
          this.withDrawal.card = data.cardNo;
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
  		_getBankInfo() {
		    getBankInfo().then((res) => {
					console.log(res);
					let data = res;
					this.withDrawal.money = data.canUsedBrokerage;
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
  	},
  	mounted() {

			
  	}
  }
</script>

<style scoped>
	.money{
		color: #FA5555;
		font-weight: bold;
	}
  .changeCard{
  	cursor: pointer;
  	color: #409EFF;
  }
</style>

<!-- session(['shopInfo'=>['id'=>1]]); -->