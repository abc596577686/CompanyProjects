<template>
	<!-- <transition :name="transitionName">  -->
		<router-view class="child-view"></router-view>
	<!-- </transition> -->
</template>

<script>
	import {mapMutations} from 'vuex'
  	export default {
			data() {
	      return {
	        shopid:'',
	        transitionName: 'slide-left'
	      }
	    },
			created() {
				let me=this;
	     	me.shopid= this.$route.params.shopid;
				if(me.shopid){ me.SAVE_SHOPID(me.id); }
	    },
			methods: {
	      ...mapMutations([
	          'SAVE_SHOPID'
	      ])
		  },
		  //监听路由的路径，可以通过不同的路径去选择不同的切换效果 
			// watch: {
			// 	'$route' (to, from) {
			// 		console.log(to.path);
			// 		console.log(from.path);
			// 		console.log(
			// 			'现在路由:', to.path.split('/')[1],
			// 			'来自路由:', from.path.split('/')[1],
			// 			'现在的动画:', this.transitionName
			// 		)
			// 		const toDepth = to.path.split('/').length;
			// 		const fromDepth = from.path.split('/').length;
			// 		console.log(toDepth, fromDepth);
			// 		this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
			// 	}
			// },
			beforeRouteUpdate (to, from, next) {
				console.log(this.$router.isBack)
	      let isBack = this.$router.isBack
	      if (isBack) {
	        this.transitionName = 'slide-right'
	      } else {
	        this.transitionName = 'slide-left'
	      }
	      this.$router.isBack = false
	      next()
	    }
	  }

</script>

<style lang="scss">
 	@import './style/common';

 	#app{
 		position: absolute;
 		top: 0;
 		bottom: 0;
 		width: 100%;
 		overflow: hidden
 	}
 	.child-view{
 		position: absolute;
 		width: 100%;
 		height: 100%;
 		transition: all .5s cubic-bezier(.55,0,.1,1);
 	}
 	.slide-left-enter-active, .slide-left-leave-active{
 		transition: all .3s;
 	}
 	.slide-left-enter{
 		transform: translate3d(-100%, 0, 0);
 	}

 	.slide-right-enter-active, .slide-right-leave-active{
 		transition: all .3s;
 	}
 	.slide-right-enter{
 		transform: translate3d(100%, 0, 0);
 	}
</style>
