<template>
	<section class="homeContainer">
		<el-row class="container">
			<!-- header -->
			<!-- container -->
			<el-col :span="24" class="ctn-wrap">
				<div class="main">
					<div class="mainDh">
						<div class="wweq">
							<span class="logo" style="font-size:17px;">
								<img class="logo-img" :src="logo">
							</span>
							<nav class="cl-effect-21">
								<div class="Dh1 ki" :class="{active: curIndex == index}" v-for="(nav, index) in mainNav" @click.stop.prevent="markActive(nav, index)">
									<i :class=nav.icon class="iconfont"></i>{{nav.name}}	
									<transition name="fadeIn">
										<div class="we">
											<div v-if="navTitle" @click.stop.prevent class="title navTitle">{{navTitle}}</div>
											<div class="href" v-if="nav.active" v-for="(item, index) in nav.subNav" :class="{'link-active': subIndex == index}" @click.stop.prevent="navTo(item.path, index)">{{item.name}}</div>
										</div>
									</transition>
								</div>
							</nav>
							<div class="fixedBottom" @mouseover="mouseover" @mouseout="mouseout">
								<span v-html="userPhone">15800039390</span>
								<transition name="fadeIn">
									<div v-show="isToggle" class="user-name-hover">
										<ul>
		                  <li>
		                  	<a @click.stop.prevent="showMessagePage" class="g-js-show-more-notice" href="javascript:;">消息</a>
		                  </li>
											<li>
												<a @click.stop.prevent="logout" href="javascript:;">退出</a>
											</li>
										</ul>
		        			</div>
								</transition>
							</div>
						</div> 
						<div class="zsBg" ref="zsBg"></div>
						<!-- 右侧主体 -->
						<section class="content-container">
							<div class="content">
								<!-- 面包屑 -->
								<el-col :span="24" class="breadcrumb-container">
									<el-breadcrumb separator=">">
									  <el-breadcrumb-item v-if="parentPathName">{{parentPathName}}</el-breadcrumb-item>
									  <el-breadcrumb-item v-if="currentPathName">{{currentPathName}}</el-breadcrumb-item>
									</el-breadcrumb>
								</el-col>

								<el-col :span="24" class="content-wrapper">
									<transition name="fadeLeft">
										<router-view @inAni="inAni" @outAni="outAni" @changeIndex="changeIndex" @subIndexChange="subIndexChange" @navTitleChange="navTitleChange" @hasSecondNavEnv="hasSecondNavEnv"></router-view>
									</transition>
								</el-col>
							</div>
						</section>
					</div>
				</div>
			</el-col>
		</el-row>
	</section>
</template>

<script type="text/ecmascript-6">
	import {loginOut, getUserInfo} from 'api';

	export default {
		data() {
			return {
				userPhone: '',
				logo: require('../assets/images/logo.png'),
				isToggle: false,
				subNavActive: null,
				navTitle: null,
				currentPathName: '',
				parentPathName: '',
				sysName:'分销商运营系统欢迎您^_^',
				collapsed: false,
				sysUserName: '',
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				curIndex: null,
				subIndex: null,
  			navActive: false,
  			hasSecondNav: 0,
  			isActive: false,
				// 导航栏信息数据
				mainNav:[
					{
						name:'首页', 
						active: true,
						path: '/homePage',
						icon: 'el-new-icon-shouye-copy'
					}, 
					{
						name:'店铺',
						active: false,
						icon: 'el-new-icon-dianpu',
						subNav:[
							{
								name:'店铺信息', path:'/storeInfo'
							}
						]
					},
					{
						name:'产品',
						active: false,
						icon: 'el-new-icon-icon--',
						subNav:[
							{
								name:'店铺产品', path:'/shopGood'
							}
						] 
					},
					{ 
						name:'订单',
						active: false,
						icon: 'el-new-icon-dingdan',
						subNav:[
							{ 
								name:'订单列表', path:'/orderList'
							}
						] 
					},
					{
						name:'市场', 
						active: false,
						icon: 'el-new-icon-shichang',
						subNav:[ 
							{ 
								name:'产品市场', path:'/goodsMarket'
							}
						]
					},
					{
						name:'财务', 
						active: false,
						icon: 'el-new-icon-caiwu',
						subNav:[ 
							{ 
								name:'我的收入', path:'/myIncome'
							},
							{ 
								name:'我的银行卡', path:'/myBankCard'
							}
						]
					}, 
					{
						name:'分销', 
						active: false,
						icon: 'el-new-icon-fenxiao',
						subNav:[
							{
								name:'分销员管理', path:'/distributorManage'
							}, 
							{
								name:'佣金配置', path:'/commissionConfigure'
							}
						]
					},
					{
						name:'消息', 
						active: false,
						icon: 'el-new-icon-fenxiao',
						subNav:[
							{
								name:'收益通知', path: '/message'
							}
						]
					}
					// { 
					// 	name:'营销', 
					// 	active: false,
					// 	icon: 'el-new-icon-yingyong'
					// }, 
					// { 
					// 	name:'设置', 
					// 	active: false,
					// 	icon: 'el-new-icon-shezhi'
					// }
      	]
			}
		},
		created() {
			// 设置选中状态
			let menus = JSON.parse(sessionStorage.getItem('__menus__'));
			this.curIndex = menus ? menus.curIndex : 0;
			this.hasSecondNav = menus ? menus.hasSecondNav : 0;
			this.parentPathName = menus ? menus.parentPathName : null;
			this.currentPathName = menus ? menus.currentPathName : null;
			this.navTitle = menus ? menus.navTitle : null;
			this.subIndex = menus ? menus.subIndex : null;

			this.mainNav[this.curIndex].active = true;
		},
		methods: {
			hasSecondNavEnv(val) {
				console.log(val)
				this.hasSecondNav = 1
			},
			navTitleChange(val) {
				this.navTitle = val
			},
			subIndexChange(val) {
				this.mainNav[val].active = true
				this.subIndex = 0
			},
			changeIndex(val) {
				console.log(val)
				this.curIndex = val
			},
			markActive(nav, index){
				console.log(nav)
				console.log(index)
        for(var k=0; k<this.mainNav.length; k++){
          this.mainNav[k].active = false;
        }
        this.mainNav[index].active = true

        this.curIndex = index

        if (nav.path) {
        	this.$router.replace(nav.path);
        	this.currentPathName = null;
        	this.parentPathName = null;
        	this.hasSecondNav = 0;
        	this._out_ani();
        } else {
					this.parentPathName = nav.name;
	        if (!nav.subNav) {
	        	this.hasSecondNav = 0;
	        	this._out_ani();
	        } else {
	        	let path = nav.subNav[0].path;
	        	this.$router.replace(path);
	        	this.hasSecondNav = 1;
	        	// 二级菜单出场动画
	        	this._in_ani();
	        	this.subIndex = 0;
	        	this.navTitle = nav.name
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
      navTo(path, index) {
      	this.subIndex = index;
      	this.$router.replace(path);

      	// 保存二级菜单状态
      	let menus = JSON.parse(sessionStorage.getItem('__menus__'));
				if (!menus) {
					menus = {}
				}
				menus.subIndex = this.subIndex;
				sessionStorage.setItem('__menus__',JSON.stringify(menus));
      },
			onSubmit() {
			},
			//退出登录
			logout: function () {
				this.isToggle = false;
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('__menus__');

					loginOut().then((res) => {
						console.log(res);
						if (res.state == '1') {
							_this.$router.push('/login');
						} else {
							this.$notify({
								title: '提示',
								message: '退出失败',
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
					
				})
			},
			showMessagePage() {
				this.$router.push({
					path: '/message'
				})
				this.isToggle = false;
			},
			mouseover() {
				this.isToggle = true;
			},
			mouseout() {
				this.isToggle = false;
			},
			inAni() {
				console.log('inAni=========')
				this._in_ani()
			},
			outAni() {
				console.log('outAni=========')
				this._out_ani()
			},
      _in_ani() {
      	this.$refs.zsBg.style.width = '136px';
      },
      _out_ani() {
      	this.$refs.zsBg.style.width = '0';
      }
		},
		watch: {
			'$route'(to, from) {
				//监听路由改变
				this.currentPathName = to.name;

				// 设置菜单状态
				let menus = JSON.parse(sessionStorage.getItem('__menus__'));
				if (!menus) {
					menus = {}
				}
				menus.currentPathName = this.currentPathName;
				sessionStorage.setItem('__menus__',JSON.stringify(menus));

				console.log(menus.currentPathName)
				// this.currentPath = to.path;
				// this.currentPathNameParent = to.matched[0].name;
			}
		},
		mounted() {
			getUserInfo().then((res) => {
				console.log(res);
				if (res.state == '-1') {
					this.$notify({
						title: '提示',
						message: '获取手机号失败',
						type: 'error'
					})
					return;
				}
				if(res.state == '1') {
					this.userPhone = res.info.tel;
				}
				
			})

			var commission = sessionStorage.getItem('__user__');
			if (commission) {
				commission = JSON.parse(commission);
				this.sysUserName = commission.name || '';
			}

			if (this.hasSecondNav) {
				this._in_ani();
			} else {
				this._out_ani();
			}
		}
	}

</script>

<style scoped>
	
	.content-container .secTilt{
		background-color: #888d99;
		width: 160px;
		height: 551px;
		position: absolute;
		left: 160px;
		top: -56px;
		z-index: 1000;
	}
	.el-menu{
		width: 160px;
		position: relative;
	}
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
	}
	.content-container {
		background: #fff;
		flex:1;
		overflow-y: scroll;
		border-left: 12px solid #F5F5F5;
	}
	.content-container .content{
		/*background: #fff;*/
	}
	.breadcrumb-container {
		padding: 0 20px;
		border-bottom: 12px solid #f5f5f5;
		color: #6b6e77 !important;
		border-radius:0;
	}
	.el-breadcrumb{
		height: 60px;
		line-height: 60px;
	}
	.title {
		width: 200px;
		float: left;
		color: #475669;
	}
	.breadcrumb-inner {
		float: right;
	}
	.content-wrapper {
		background-color: #fff;
		box-sizing: border-box;
		padding: 20px 0;
		margin-bottom: 50px;
	}
	.fadeLeft-enter-active{
		transition: all .5s;
	}
	.fadeLeft-enter{
		opacity: 0;
		transform: translate3d(30px, 0, 0);
	}
	.ctn-wrap{
		position: absolute;
		top: 0;
		bottom:0;
		left:0;
		right: 0;
		overflow: hidden;
	}
	.zsBg{
		/*background-color: #eee;*/
		background-color: #fff;
		width: 136px;
		height: 100%;
		z-index: 1000;
		transition: all .36s;
		padding: 0;
		box-sizing: border-box;

	}
	.we{
		width: 96px;
		position: fixed;
		/*left: 100px;*/
		left: 136px;
		top: 0;
		text-align: center;
		margin-top: 70px;
		margin: 70px 20px 0;
		box-sizing: border-box;
	}
	.we a{
		color: #5f626b;
		font-size: 14px;
		display: block;
		padding: 3px;
		font-weight: normal;
	}
	.href{
		color: #666;
		font-size: 12px;
		display: block;
		padding: 11px 3px;
		font-weight: normal;
		line-height: 1;
		margin-bottom: 5px;
		transition: all .3s;
	}
	.href.link-active{
		color: #666;
		background: #f8f8f8;
	}
	.href:hover{
		background: #f8f8f8;
	}
	.we a.link-active{
		color: #666;
		background: #fff;
	}
	.we a:hover{
		outline: none;
		color: #666;
	}
	.href:hover{
		outline: none;
		color: #666;
	}
	.href.link-active:hover{
		color: #000;
	}
	.we a.link-active:hover{
		color: #000;
	}
	.we a:after, .we a:before{
		display: none;
	}
	.wweq{
		position: relative;
		/*width: 100px;*/
		width: 136px;
		z-index: 2000;
		box-shadow: 2px 0px 5px #ccc;
	}
	.logo {
		display: block;
		height:100px;
		text-align: center;
		padding: 32px 0;
		box-sizing: border-box;
		font-size: 22px;
		border-color: rgba(238,241,146,0.3);
		border-right-width: 0px;
		border-right-style: solid;
	}
	img {
		width: 48px;
		border-radius: 50%;
	}
	.el-menu{
		background-color: #252834;	
	}
	.Dh1{
		cursor: pointer;
		/*width: 136px;*/
		width:100%;
		height: 45px;
		text-align: center;
		background-color: #252834;
		color: #8a8d96;
		line-height: 45px;
		font-size: 12px;
		z-index: 2000;
		/*position: relative;*/
		transition: all .36s;
		/*padding: 0 16px;*/
	}
	.Dh1.active{
		background-color: #F8F8F8;
		color: #008EE5;
		border-left: 4px solid #fe313c;
		box-sizing: border-box;
	}
	.ki:hover{
		background: #555a69;
	}
	.Dh1.active.ki:hover{
		background: #F8F8F8;
	}
	.fadeIn-enter-active{
		transition: all .36s;
	}
	.fadeIn-enter{
		opacity: 0;
	}
	.Dh2{
		width: 100px;
		height: 45px;
		background-color:#ddd;
		text-align: center;
		color: #13151a;
		line-height: 45px;
		font-size: 10px;
		z-index: 3000;
	}
	.secTilt{
		background-color: #888d99;
		width: 160px;
		height: 551px;
		position: absolute;
		left: 160px;
		top: -56px;
		z-index: 1000;
	}
	.el-menu{
		width: 160px;
		position: relative;
	}
  .main {
		display: flex;
		overflow: hidden;
		height: 100%;
	}
	.main .mainDh{
		background-color: #252834;
		z-index: 1000;
		flex:1;
		display: flex;
		width: 100%;
	}
	.fadeIn-enter-active{
		transition: all .3s;
	}
	.fadeIn-enter{
		opacity: 0;
	}
	.navTitle{
		padding:18px 0;
		font-size:14px;
		color:#888d99;
		width:100%;
		border-bottom:1px solid rgb(238, 238, 238);
		text-align:center;
		display: none;
		margin-bottom: 70px;
	}

	.homeContainer .fixedBottom{
		cursor: pointer;
	  position: absolute;
	  bottom: 0;
	  width: 136px;
	  left: 0;
	  padding: 15px 0;
	  text-align: center;
	  font-size: 15px;
	  color: #fff;
	  background: #fe313c;
	  border: none;
	  border-radius: 0;
	  display: block;
	  letter-spacing: 1px;
	  font-weight: bold;
	  box-sizing: border-box;
	}
	.user-name-hover{
		position: absolute;
    bottom: 45px;
    left: 10px;
    z-index: 2;
    width: 136px;
    text-align: center;
    box-shadow: 0 0 25px #cac6c6;
    border-radius: 3px;
	}
	.user-name-hover:before{
		display: inline-block;
    content: '';
    width: 0;
    height: 0;
    border: 6px solid transparent;
    border-top-color: #fff;
    position: absolute;
    bottom: -12px;
    left: 50%;
    margin-left: -6px;
    z-index: 3;
	}
	.user-name-hover ul{
    background: #fff;
    border-radius: 3px;
	}
	.user-name-hover ul li{
		padding: 10px 0;
		transition: all .3s;
    color: #333;
	}
	.user-name-hover ul li:hover{
		background-color: #008EE5;
	}
	.user-name-hover ul li:hover a{
		color: #fff;
	}
	.user-name-hover ul a{
		display: block;
    height: 26px;
    line-height: 26px;
    font-size: 12px;
	}
</style>