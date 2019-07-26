<template>
  <div class="homePage">
		<ul class="count">
			<li>
				<span class="price" v-html="changeVal(userCount.ktx)"></span>
				<p class="name">可提现金额</p>
			</li>
			<li>
				<span class="price" v-html="changeVal(userCount.djs)"></span>
				<p class="name">待结算金额</p>
			</li>
			<li>
				<span class="price" v-html="changeVal(userCount.jy)"></span>
				<p class="name">总交易额</p>
			</li>
			<li>
				<span class="price" v-html="userCount.dd"></span>
				<p class="name">订单数</p>
			</li>
			<li>
				<span class="price" v-html="userCount.td"></span>
				<p class="name">退订订单</p>
			</li>
		</ul>
		<div class="quickEntry">
			<h4 class="title">常用功能</h4>
			<div class="list">
				<!-- <router-link class="item" to="/withDrawal"><i class="iconfont el-new-icon-caiwu"></i>金额提现</router-link>
				<router-link class="item" to="/goodsMarket"><i class="iconfont el-new-icon-icon--"></i>代理产品</router-link>
				<router-link class="item" to="/distributorManage"><i class="iconfont el-new-icon-fenxiao"></i>添加分销员</router-link> -->
				<div class="item" v-for="(item, index) in mainNav" @click="markActive(item, index)">
					<i class="iconfont" :class="item.icon"></i><span v-html="item.name"></span>
				</div>
				<!-- <div class="item"><i class="iconfont el-new-icon-caiwu"></i><span v-html="mainNav"></span>金额提现</div>
				<div class="item"><i class="iconfont el-new-icon-icon--"></i>代理产品</div>
				<div class="item"><i class="iconfont el-new-icon-fenxiao"></i>添加分销员</div> -->
				<!-- <router-link class="item" to="/storeInfo">店铺装修</router-link> -->
				<!-- <router-link class="item" to="/storeInfo">客服系统</router-link> -->
			</div>
		</div>
  </div>
</template>

<script type="text/ecmascript-6">
	import {getUserCount} from 'api'

  export default {
  	data() {
  		return {
  			userCount: {
  				ktx: '',
  				djs: '',
  				jy: '',
  				dd: '',
  				td: ''
  			},
  			curIndex: null,
  			hasSecondNav: null,
  			parentPathName: null,
  			hasSecondNav: null,
  			mainNav:[
					{
						name:'金额提现',
						active: false,
						icon: 'el-new-icon-caiwu',
						subNav:[ 
							{ 
								name:'金额提现', path:'/msgValidate'
							}
						]
					},
					{
						name:'产品市场',
						active: false,
						icon: 'el-new-icon-shichang',
						subNav:[ 
							{ 
								name:'产品市场', path:'/goodsMarket'
							}
						]
					},
					{
						name:'添加分销员',
						active: false,
						icon: 'el-new-icon-fenxiao',
						subNav:[ 
							{ 
								name:'添加分销员', path:'/distributorManage'
							}
						]
					}
				]
  		}
  	},
  	created() {
  		this._getUserCount();
  	},
  	methods: {
      changeVal(val) {
        return `¥${val}`
      },
      markActive(nav, index){
				console.log(nav)
				console.log(index)
        for(var k=0; k<this.mainNav.length; k++){
          this.mainNav[k].active = false;
        }
        this.mainNav[index].active = true
        this.curIndex = index
        switch(index) {
        	case 0:
        		this.curIndex = 5
        		break;
        	case 1:
        		this.curIndex = 4
        		break;
        	case 2:
        		this.curIndex = 6
        		break;
        }
        this.$emit('changeIndex', this.curIndex)

        if (nav.path) {
        	this.$router.replace(nav.path);
        	this.currentPathName = null;
        	this.parentPathName = null;
        	this.hasSecondNav = 0;
        	this.$emit('hasSecondNavEnv', 0)
        	this._out_ani();
        } else {
					this.parentPathName = nav.name;
	        if (!nav.subNav) {
	        	this.hasSecondNav = 0;
	        	this.$emit('hasSecondNavEnv', 0)
	        	this._out_ani();
	        } else {
	        	let path = nav.subNav[0].path;
	        	this.$router.replace(path);
	        	this.hasSecondNav = 1;
	        	this.$emit('hasSecondNavEnv', 1)
	        	// 二级菜单出场动画
	        	this._in_ani();
	        	this.subIndex = 0;
	        	this.navTitle = nav.name
	        	this.$emit('subIndexChange', this.curIndex)
	        	this.$emit('navTitleChange', nav.name)
	        }
        }

        let menus = {
        	curIndex: this.curIndex,
					hasSecondNav: this.hasSecondNav,
					parentPathName: this.parentPathName,
					currentPathName: this.currentPathName,
					navTitle: this.navTitle,
					subIndex: this.subIndex,
        }
        sessionStorage.setItem('__menus__',JSON.stringify(menus));
      },
      _in_ani() {
      	// this.$refs.zsBg.style.width = '136px';
      	this.$emit('inAni')
      },
      _out_ani() {
      	// this.$refs.zsBg.style.width = '0';
      	this.$emit('outAni')
      },
  		_getUserCount() {
  			getUserCount().then((res) => {
					console.log(res);
					this.userCount = {
						ktx: res.canUsedBrokerage ? res.canUsedBrokerage : '0',
						djs: res.unSetBrokerage ? res.unSetBrokerage : '0',
						jy: res.orderTotalFee ? res.orderTotalFee : '0',
						dd: res.orderCount ? res.orderCount : '0',
						td: res.returnTotalCount ? res.returnTotalCount : '0'
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

<style>
.homePage ul.count{
	background: #fff;
	color: #333;
	display: flex;
	padding: 30px;
	border-bottom: 12px solid #f5f5f5;
}
.homePage li{
	flex:1;
	text-align: center;
}
.homePage .price{
	font-size: 20px;
	color: #FB4A4C;
	font-weight: bold;
}
.homePage .name{
	font-size: 12px;
	color: #333;
}
.homePage .quickEntry{
	padding: 30px;
	color: #333;
	font-size: 13px;
}
.homePage .title{
	margin: 5px 0;
	font-size: 16px;
	color: #333;
}
.homePage .list{
	/*display: flex;*/
	overflow: hidden;
}
.homePage .list .item{
	/*flex: 1;*/
	float: left;
	background: #F8F8F8;
	text-align: center;
	margin:15px 10px 15px 0;
	cursor: pointer;
	color: #333;
	padding:15px 40px;
	color: #333;
	transition: all .3s;
	display: block;
}
.homePage .item:hover{
	background: #eee;
	color: #333;
	/*text-decoration: underline;*/
}
</style>