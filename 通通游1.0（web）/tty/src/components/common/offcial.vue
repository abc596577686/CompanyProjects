<template>
	<section class="offcial">
		<div class="title">
			<img @click="back" src="../../images/tty/icon_back_black.png" alt="">
			费用说明
		</div>
		<scroll 
			@scroll="scroll"
	    :listen-scroll="listenScroll"
	    :probe-type="probeType"
	    ref="offcials"
	    class="content">

	    <div>
				<div class="artical">
					<h6>费用包含</h6>
					<p>1.行程中所列航班经济舱团体机票及相关税费； </p>
					<p>2.行程中所标明的双人标准间酒店住宿及早餐； </p>
					<p>3.行程中安排的午、晚餐，以中式餐食为主（中式用餐标准为六菜一汤），1顿风味餐； </p>
					<p>4.全程提供空调巴士，保证一人一正座，专业司机； </p>
					<p>5.行程中标注*的景点含首道门票费； </p>
					<p>6.ADS团队旅游签证费</p>
				</div>
				<div class="artical">
					<h6>费用不包含</h6>
					<p>1.境外服务费； </p>
					<p>2.护照费、申请签证中准备相关材料所需的制作、手续费 如未成年人所需的公证书、认证费； </p>
					<p>3.出入境的行李海关课税，超重行李的托运费、管理费等。</p>
				</div>
				<div class="artical">
					<h6>自选项目</h6>
					<p>莱茵河游船（不少于60分钟）45欧元/人 </p>
					<p>慕尼黑宝马博物馆（不少于40分钟）30欧元/人 </p>
					<p>富森新天鹅堡（不少于60分钟）60欧元/人</p>
				</div>

				<div class="artical">
					<h6>自选项目</h6>
					<p>莱茵河游船（不少于60分钟）45欧元/人 </p>
					<p>慕尼黑宝马博物馆（不少于40分钟）30欧元/人 </p>
					<p>富森新天鹅堡（不少于60分钟）60欧元/人</p>
				</div>
				<div class="artical">
					<h6>自选项目</h6>
					<p>莱茵河游船（不少于60分钟）45欧元/人 </p>
					<p>慕尼黑宝马博物馆（不少于40分钟）30欧元/人 </p>
					<p>富森新天鹅堡（不少于60分钟）60欧元/人</p>
				</div>
				<div class="artical">
					<h6>自选项目</h6>
					<p>莱茵河游船（不少于60分钟）45欧元/人 </p>
					<p>慕尼黑宝马博物馆（不少于40分钟）30欧元/人 </p>
					<p>富森新天鹅堡（不少于60分钟）60欧元/人</p>
				</div>
				<div class="artical">
					<h6>自选项目</h6>
					<p>莱茵河游船（不少于60分钟）45欧元/人 </p>
					<p>慕尼黑宝马博物馆（不少于40分钟）30欧元/人 </p>
					<p>富森新天鹅堡（不少于60分钟）60欧元/人</p>
				</div>
				<div class="artical">
					<h6>自选项目</h6>
					<p>莱茵河游船（不少于60分钟）45欧元/人 </p>
					<p>慕尼黑宝马博物馆（不少于40分钟）30欧元/人 </p>
					<p>富森新天鹅堡（不少于60分钟）60欧元/人</p>
				</div>
				<div class="artical">
					<h6>自选项目</h6>
					<p>莱茵河游船（不少于60分钟）45欧元/人 </p>
					<p>慕尼黑宝马博物馆（不少于40分钟）30欧元/人 </p>
					<p>富森新天鹅堡（不少于60分钟）60欧元/人</p>
				</div>
				<div class="artical">
					<h6>自选项目</h6>
					<p>莱茵河游船（不少于60分钟）45欧元/人 </p>
					<p>慕尼黑宝马博物馆（不少于40分钟）30欧元/人 </p>
					<p>富森新天鹅堡（不少于60分钟）60欧元/人</p>
				</div>
				<div class="artical">
					<h6>自选项目</h6>
					<p>莱茵河游船（不少于60分钟）45欧元/人 </p>
					<p>慕尼黑宝马博物馆（不少于40分钟）30欧元/人 </p>
					<p>富森新天鹅堡（不少于60分钟）60欧元/人</p>
				</div>
				<div class="artical">
					<h6>自选项目</h6>
					<p>莱茵河游船（不少于60分钟）45欧元/人 </p>
					<p>慕尼黑宝马博物馆（不少于40分钟）30欧元/人 </p>
					<p>富森新天鹅堡（不少于60分钟）60欧元/人</p>
				</div>
				<div class="artical">
					<h6>自选项目</h6>
					<p>莱茵河游船（不少于60分钟）45欧元/人 </p>
					<p>慕尼黑宝马博物馆（不少于40分钟）30欧元/人 </p>
					<p>富森新天鹅堡（不少于60分钟）60欧元/人</p>
				</div>
				<div class="artical">
					<h6>自选项目</h6>
					<p>莱茵河游船（不少于60分钟）45欧元/人 </p>
					<p>慕尼黑宝马博物馆（不少于40分钟）30欧元/人 </p>
					<p>富森新天鹅堡（不少于60分钟）60欧元/人</p>
				</div>
				<div class="artical">
					<h6>自选项目</h6>
					<p>莱茵河游船（不少于60分钟）45欧元/人 </p>
					<p>慕尼黑宝马博物馆（不少于40分钟）30欧元/人 </p>
					<p>富森新天鹅堡（不少于60分钟）60欧元/人</p>
				</div>
			</div>
		</scroll>
	</section>

</template>

<script type="text/ecmascript-6">
	import Scroll from 'common/scroll';

	export default{
		data() {
			return {
				scrollY: 0
			}
		},
	  created() {
	  	this.probeType = 3
	    this.listenScroll = true
    },
		methods: {
			scroll(pos) {

      },
      refresh() {
        this.$refs.offcials.refresh();
      },
      back() {
      	this.$emit('back')
      }
		},
		components: {
			Scroll
		}
	}
</script>

<style lang="css" scoped>
	@import './offcial.css';
</style>