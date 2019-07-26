<template>
  <section class="commissionConfigure">
    <el-row :gutter="0">
		  <el-col :span="24">
			  <div class="grid-content bg-purple">
				  <el-form :inline="false">
				  	<el-form-item label="分销员返佣：">
				  		<!-- <el-col> -->
						  	<p class="changeVal" v-if="commission == ''" @click="setCommissions">设置</p>
						  	<span class="percent" v-else>{{commission}}%</span>
						  	<span class="changeVal" v-show="commission != ''" @click="changeCommissions">修改</span>
							<!-- </el-col> -->
					  </el-form-item>
				  </el-form>
				</div>
			</el-col>
		</el-row>
		<transition name="fadeTopIn">
			<div v-show="isShowMessageBox" tabindex="-1" role="dialog" aria-modal="true" aria-label="提示" class="el-message-box__wrapper" style="z-index: 2067;">
				<div class="el-message-box">
					<div class="el-message-box__header">
						<div class="el-message-box__title">
							<span v-html="title"></span>
						</div>
						<button type="button" aria-label="Close" class="el-message-box__headerbtn">
							<i class="el-message-box__close el-icon-close" @click.stop="closeMessageBox"></i>
						</button>
					</div>
					<div class="el-message-box__content">
						<div class="el-message-box__input" style="">
							<div class="el-input" style="text-align:center;">
								<input style="width:30%;" v-model="money" placeholder="" type="number" class="el-input__inner"> %
							</div>
							<div class="el-message-box__errormsg" style="visibility: hidden;"></div>
						</div>
					</div>
					<div class="el-message-box__btns">
						<button @click="confirm('cancel')" type="button" class="el-button el-button--default el-button--small" style="">
							<span>
			          取消
			        </span>
			      </button>
			      <button @click="confirm('ok')" type="button" class="el-button el-button--default el-button--small el-button--primary ">
				      <span>
			          确定
			        </span>
		        </button>
		      </div>
	    	</div>
	  	</div>
  	</transition>
  	<transition name="fadeIn">
			<div v-show="isShowMessageBox" class="v-modal" tabindex="0" style="z-index: 2063;"></div>
		</transition>
  </section>
</template>

<script type="text/ecmascript-6">
	import qs from 'qs';
	import {getCommission, setCommission} from 'api';

  export default {
  	data() {
  		return {
		 		commission: '',
		 		title: '分销员返佣',
		 		money: '',
		 		isShowMessageBox: false
  		}
  	},
  	watch: {
  		'money'(val) {
  			console.log(val)
  		}
  	},
  	methods: {
  		setCommissions() {
  			this.title = '修改分销员返佣';
  			this.isShowMessageBox = true;
  			console.log(this.title);
  		},
  		changeCommissions() {
  			this.title = '分销员返佣';
  			this.isShowMessageBox = true;
  			this.money = this.commission;
  		},
  		closeMessageBox() {
  			this.isShowMessageBox = false;
  		},
  		confirm(type) {
  			if (type == 'cancel') {
  				this.isShowMessageBox = false;
  			}
  			if (type == 'ok') {
  				if (this.money == '') {
  					this.$notify({
							title: '提示',
							type: 'error',
							message: '金额不能为空'
						})
  				} else if (this.money < 0 || this.money > 100) {
  					this.$notify({
							title: '提示',
							type: 'error',
							message: '比例在0-100之间'
						})
  				} else {
  					this.isShowMessageBox = false;
  					let params = qs.stringify({
	  					ratio: this.money
	  				});
	  				setCommission(params).then((res) => {
							console.log(res)
							if (res.state == '1') {
								this.$notify({
									title: '提示',
									message: '修改成功',
									type: 'success'
								})
								this.commission = this.money;
							} else {
								this.$notify({
									title: '提示',
									message: '修改失败，请重新修改',
									type: 'error'
								})
							}
						})
						.catch((res) => {
							if (res.code == '911') {
								this.$notify({
			            title: '提示',
			            message: '操作超时，请重新登录',
			            type: 'error'
			          })
			          this.$router.push('/login')
							}
						})
  				}
  			}
  		},
  		_getCommission() {
  			getCommission().then((res) => {
					console.log(res);
					let data = res.info;
					this.commission = data.ratio;
				})
				.catch((res) => {
					if (res.code == '911') {
						this.$notify({
	            title: '提示',
	            message: '操作超时，请重新登录',
	            type: 'error'
	          })
	          this.$router.push('/login')
					}
				})
				
				this.commission = '';
				if (this.commission == '') {

				}
  		}
  	},
  	mounted() {
  		this._getCommission();
  	}
  }
</script>

<style scoped>
	.commissionConfigure{
		padding: 0 20px;
	}
	.fadeTopIn-enter-active{
		transition: all .36s;
	}
	.fadeTopIn-enter{
		opacity: 0;
		transform: translate3d(0, -15px, 0);
	}
	.fadeIn-enter-active{
		transition: all .36s;
	}
	.fadeIn-enter{
		opacity: 0;
	}
	.percent{
		font-size: 24px;
		font-weight: bold;
		color: #FB4A4C;
	}
  .changeVal{
  	color: blue;
  	font-size: 13px;
  	cursor: pointer;
  	display: inline-block;
  	margin-left: 10px;
  }
  .v-modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: .5;
    background: #000;
    z-index: 2063;
	}

</style>