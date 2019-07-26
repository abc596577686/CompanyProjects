<template>
  <section class="myIncome">
    <el-row :gutter="10" class="top">
		  <el-col :span="4">
			  <div class="grid-content bg-purple">
			  	<div class="imgWrap">
			  		<img :src="shopHead" class="shopAvatar">
			  	</div>
			  </div>
			 </el-col>
		  <el-col :span="20">
			  <div class="grid-content bg-purple">
				  <el-form :inline="false">
					  <el-form-item label="店铺名称：">
					  	<p v-html="shopInfo.name"></p>
					  </el-form-item>
					  <el-form-item label="收款帐户：">
					  	<p v-html="shopInfo.account"></p>
					  </el-form-item>
					  <el-form-item label="银行卡号：">
					  	<p v-if="!shopInfo.card" class="bindInto" @click="bindInto">绑定银行卡</p>
					  	<!-- <router-link v-show="!shopInfo.card" to="/msgValidate" class="bindInto">绑定银行卡</router-link> -->
					  	<p v-if="shopInfo.card" v-html="shopInfo.card"></p>
					  </el-form-item>
					</el-form>
			  </div>
			</el-col>
		</el-row>
		<ul class="count">
			<li>
				<p class="name">待结算金额(不可提现金额)</p>
				<span class="price" v-html="changeVal(userCount.djs)"></span>
			</li>
			<li class="position">
				<p class="name">可提现金额</p>
				<span class="price" v-html="changeVal(userCount.ktx)"></span>
				<el-button class="drawBtn" type="primary" @click="draw">提现</el-button>
			</li>
			<li>
				<p class="name">已提现</p>
				<span class="price" v-html="changeVal(userCount.ytx)"></span>
			</li>
		</ul>
  </section>
</template>

<script type="text/ecmascript-6">
	import qs from 'qs';
	import {getShopInfo, getCardList, getBankInfo} from 'api';
  // http://img.alicdn.com/bao/uploaded/i2/TB1kkBqOXXXXXaUaFXXXXXXXXXX_!!0-item_pic.jpg

  export default {
  	data() {
  		return {
  			shopHead: '',
  			shopInfo: {
  				name: '',
  				account: '',
  				card: null
  			},
  			userCount: {
					djs: 0,
  				ktx: 0,
					ytx: 0
  			},
  			bindStatus: '0' // 0未绑定 1已绑定
  		}
  	},
  	created() {
  		this._getShopInfo();
	 		this._getCardList();
	 		this._getBankInfo();
  	},
  	methods: {
  		changeVal(val) {
        return `¥${val}`
      },
      draw() {
      	if (this.shopInfo.card) {
      		this.$router.push('/withDrawal');
      	} else {
      		this.$router.push('/msgValidate');
      	}
      },
      bindInto() {
      	this.$router.push({
      		path: '/msgValidate'
      	})
      },
      _getShopInfo() {
  			getShopInfo().then((res) => {
          console.log(res);
          if (res.state == '-1') {
            this.$notify({
              type: 'error',
              title: '提示',
              message: '获取信息失败'
            })
            return
          }
          if (res.state == '1') {
            let data = res.info;
  					this.shopInfo.name = data.name
            this.shopHead = data.logoId
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
      _getCardList() {
      	getCardList().then((res) => {
          console.log(res);
          if (res.state == '-1') {
            this.$notify({
              type: 'error',
              title: '提示',
              message: '获取信息失败'
            });
          }
          if (res.state == '1') {
            let data = res.info;
            this.shopInfo.card = data.cardNo;
            this.shopInfo.account = data.cardHolder
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
      _getBankInfo() {
    	  getBankInfo().then((res) => {
					console.log(res);
          if (res.state == '-1') {
            this.$notify({
              type: 'error',
              title: '提示',
              message: '获取信息失败'
            })
            return
          }
          if (res.state == '1') {
  					let data = res;
  					this.userCount = {
  						djs: data.unSetBrokerage ? data.unSetBrokerage : 0,
  						ktx: data.canUsedBrokerage ? data.canUsedBrokerage : 0,
  						ytx: data.usedBrokerage ? data.usedBrokerage : 0
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
      }
  	},
  	mounted() {
  	}
  }
</script>

<style scoped>
  .myIncome{
    padding: 0 20px;
  }
  .myIncome .top{
    padding-bottom: 20px;
    border-bottom: 1px solid #f5f5f5;
  }
	.imgWrap{
    /*border:1px solid #ccc;*/
	}
  .shopAvatar{
  	width: 136px;
    height: auto !important;
  	border:1px solid #ccc;
  }
  ul.count{
		color: #333;
		display: flex;
		padding: 30px 0;
	}
  ul.count li{
    flex:1;
    text-align: center;
  }
  .price{
    font-size:25px;
    color: #f5112e;
    font-weight: normal;
    margin-top: 15px;
    display: block;
  }
  .name{
    font-size: 13px;
  }
	.position{
		position: relative;
	}
	.drawBtn{
		position: absolute;
		bottom: 0px;
		right: 0px;
	}
	.bindInto{
		color: #409EFF;
		cursor: pointer;
	}
	.bindInto:hover{
		text-decoration: underline;
	}
</style>