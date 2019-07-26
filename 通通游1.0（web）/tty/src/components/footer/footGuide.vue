<template>
    <section id='foot_guide'>
        <section  @click.stop.prevent = "gotoAddress({path: routerPath+'/index',query:{shopid:storeId}})" class="guide_item">
            <img  class="footer" v-if="$route.path.indexOf('index') != -1" src="../../images/footer/icon_shop1.png">
            <img  class="footer" v-if="$route.path.indexOf('index') == -1" src="../../images/footer/icon_shop2.png">
            <span v-if="$route.path.indexOf('index') != -1" class="active-font">店铺</span>
            <span v-if="$route.path.indexOf('index') == -1">店铺</span>
        </section>
        <section  @click.stop.prevent = "gotoAddress({path: routerPath+'/type?shopid='+storeId})" class="guide_item">
            <img  class="footer" v-if="$route.path.indexOf('type') != -1" src="../../images/footer/icon_type1.png">
            <img  class="footer" v-if="$route.path.indexOf('type') == -1" src="../../images/footer/icon_type2.png">
            <span v-if="$route.path.indexOf('type') != -1" class="active-font">分类</span>
            <span v-if="$route.path.indexOf('type') == -1">分类</span>
        </section>
        <section  @click.stop.prevent = "gotoAddress(routerPath+'/cart?shopid='+storeId)" class="guide_item">
            <img  class="footer" v-if="$route.path.indexOf('cart') != -1" src="../../images/footer/icon_cart1.png">
            <img  class="footer" v-if="$route.path.indexOf('cart') == -1" src="../../images/footer/icon_cart2.png">
            <span v-if="$route.path.indexOf('cart') != -1" class="active-font">购物车</span>
            <span v-if="$route.path.indexOf('cart') == -1">购物车</span>
        </section>
        <section  @click.stop.prevent = "gotoAddress(routerPath+'/profile?shopid='+storeId)" class="guide_item">
            <img  class="footer" v-if="$route.path.indexOf('profile') != -1||$route.path.indexOf('order')!=-1" src="../../images/footer/icon_me1.png">
            <img  class="footer" v-if="$route.path.indexOf('profile') == -1&&$route.path.indexOf('order') == -1" src="../../images/footer/icon_me2.png">
            <span v-if="$route.path.indexOf('profile') != -1||$route.path.indexOf('order') != -1" class="active-font">我的</span>
            <span v-if="$route.path.indexOf('profile') == -1&&$route.path.indexOf('order') == -1">我的</span>
        </section>
    </section>
</template>

<script>
    import {mapState} from 'vuex'
    import { rootPath } from 'src/config/env'
    export default {
    	data(){
            return{
                routerPath:''
            }
        },
        props: ['storeId'],
      
        created() {
             this.routerPath=rootPath;
        },
        methods: {
        	gotoAddress(path){
        		this.$router.push(path)
        	}
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../style/mixin';

    #foot_guide{
        background-color: #fff;
        position: fixed;
        z-index: 9999;
        left: 0;
        right: 0; 
        bottom: 0;
        @include wh(100%, 1.95rem);
        display: flex;
        box-shadow: 0 -0.026667rem 0.053333rem rgba(0,0,0,.1);
        //max-width: 1024px;
        margin: 0 auto;
    }
    .guide_item{
    	flex: 1;
    	display: flex;
    	text-align: center;
    	flex-direction: column;
    	align-items: center;
		.icon_style{
			@include wh(.8rem, .8rem);
			margin-bottom: .2rem;
			margin-top: .3rem;
			fill: #ccc;
		}
		span{
			@include sc(.5rem, #666);
		}
    }
    .footer{
        width: .85rem;
        margin-bottom: .15rem;
        margin-top: .3rem;
    }
    .active-font{
        color: #fe5000 !important;
    }
   
</style>
