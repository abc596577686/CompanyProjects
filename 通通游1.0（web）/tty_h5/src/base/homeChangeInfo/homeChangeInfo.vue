<template>
	<section class="explain">
		<div class="content">
			<div class="title"><img src="../../assets/images/icon_descript@2x.png" alt="">单房差说明</div>
			<div class="desc">
				<p>可根据您的要求，为您单独安排房间，具体价格可在办理后续手续时详询旅游顾问。</p>
			</div>
		</div>
		<div class="btn" @click="cancel">我知道了</div>
	</section>
</template>

<script type="text/ecmascript-6">
	export default {
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
	@import './homeChangeInfo.css';
</style>