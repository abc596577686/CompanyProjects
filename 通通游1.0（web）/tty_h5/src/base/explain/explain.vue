<template>
	<section class="explain">
		<div class="content">
			<div class="title"><img src="../../assets/images/icon_descript@2x.png" alt="">价格说明</div>
			<div class="desc">
				<p>1.零售价：指全国统一零售价 2.儿童价说明：￥{{childrenPrice}}/人，2-6岁不含6岁不占床 </p>
				<p>3.起价说明：起价为双人出行共有一间房核算的最低单人价格，先到先得。 </p>
				<p>4.产品价格会根据您所选择的出发日期、出行人数、入住酒店房型、航班、交通、上下团地点及所选附加服务的不同而有所差别 </p>
				<p>5.部分团组有预售期，当前预售价格及名额售后，会自动售卖下一阶段价格及名额，因此，越早报名越享受优惠。</p>
			</div>
		</div>
		<div class="btn" @click="cancel">我知道了</div>
	</section>
</template>

<script type="text/ecmascript-6">
	export default {
		props: {
			childrenPrice: {
				type: Number,
				default: ''
			}
		},
		data() {
			return {

			}
		},
		methods: {
			cancel() {
				this.$emit('cancel')
			}
		}
	};
</script>

<style lang="css" scoped>
	@import './explain.css'
</style>