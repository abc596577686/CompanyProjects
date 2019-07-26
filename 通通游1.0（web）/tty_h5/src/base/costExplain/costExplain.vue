<template>
	<section class="explain">
		<div class="content">
			<div class="title"><img src="../../assets/images/icon_descript@2x.png" alt="">费用说明</div>
			<div class="desc">
				<ul>
					<li class="item">
						<span>成人</span>
						<span class="price">¥{{priceInfo.adultPrice}} x{{priceInfo.adult}}</span>
					</li>
					<li class="item" v-show="priceInfo.children > 0">
						<span>儿童</span>
						<span class="price">¥{{priceInfo.childrenPrice}} x{{priceInfo.children}}</span>
					</li>

					<!-- adult: this.tripInfo.persons.adult,  
					children: this.tripInfo.persons.children,
					adultPrice: this.tripInfo.persons.adultPrice,
					childrenPrice: this.tripInfo.persons.childrenPrice,
					countPrice: this.orderCountPrice -->
					
					<!-- 产品经理说单房差先不加 -->
					<!-- <li class="item">
						<span>单房差</span>
						<span class="price">¥{{priceInfo.homeChangePrice}} x{{priceInfo.homeChangeNum}}</span>
					</li> -->
				</ul>
				<div class="bottom">应付金额：¥ {{priceInfo.countPrice}}</div>
			</div>
		</div>
		<div class="btn" @click="cancel">我知道了</div>
	</section>
</template>

<script type="text/ecmascript-6">
	export default {
		props: {
			priceInfo: {
				type: Object,
				default: {}
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
	@import './costExplain.css';
</style>

