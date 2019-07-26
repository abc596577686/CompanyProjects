<template>
	<section class="mask"></section>
</template>

<script type="text/ecmascript-6">
	export default {
		data() {
			return {
				
			}
		}
	};
</script>

<style lang="css" scoped>
	.mask {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0,0,0,.3);
		z-index: 8888;
	}

</style>