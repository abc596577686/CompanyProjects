<template>
    <section id='foot_guide'>
        <section  @click.stop.prevent = "jumpUrl({path: routerPath+'/index'}, 0, '首页')" class="guide_item">
            <img  class="footer" v-if="$route.path.indexOf('index') != -1" src="../../common/images/footer/icon_shop1.png">
            <img  class="footer" v-if="$route.path.indexOf('index') == -1" src="../../common/images/footer/icon_shop2.png">
            <span v-if="$route.path.indexOf('index') != -1" class="active-font">首页</span>
            <span v-if="$route.path.indexOf('index') == -1">首页</span>
        </section>
        <section  @click.stop.prevent = "jumpUrl({path: routerPath+'/type'}, 1, '分类')" class="guide_item">
            <img  class="footer" v-if="$route.path.indexOf('type') != -1" src="../../common/images/footer/icon_type1.png">
            <img  class="footer" v-if="$route.path.indexOf('type') == -1" src="../../common/images/footer/icon_type2.png">
            <span v-if="$route.path.indexOf('type') != -1" class="active-font">分类</span>
            <span v-if="$route.path.indexOf('type') == -1">分类</span>
        </section>
        <section @click.stop.prevent = "gotoAddress(routerPath+'/cart', 2, '购物车')" class="guide_item">
            <img class="footer" v-if="$route.path.indexOf('cart') != -1" src="../../common/images/footer/icon_cart1.png">
            <img class="footer" v-if="$route.path.indexOf('cart') == -1" src="../../common/images/footer/icon_cart2.png">
            <span v-if="$route.path.indexOf('cart') != -1" class="active-font">购物车</span>
            <span v-if="$route.path.indexOf('cart') == -1">购物车</span>
        </section>
        <section @click.stop.prevent = "jumpUrl({path: routerPath+'/profile'}, 3, '我的')" class="guide_item">
            <img class="footer" v-if="$route.path.indexOf('profile') != -1||$route.path.indexOf('order')!=-1" src="../../common/images/footer/icon_me1.png">
            <img class="footer" v-if="$route.path.indexOf('profile') == -1&&$route.path.indexOf('order') == -1" src="../../common/images/footer/icon_me2.png">
            <span v-if="$route.path.indexOf('profile') != -1||$route.path.indexOf('order') != -1" class="active-font">我的</span>
            <span v-if="$route.path.indexOf('profile') == -1&&$route.path.indexOf('order') == -1">我的</span>
        </section>
    </section>
</template>

<script>
    // import {mapState} from 'vuex'
    import { rootPath } from 'config/env'
    import { cartLists } from 'api'
    import qs from 'qs'
    import storage from 'good-storage'
    import sa from 'sa-sdk-javascript';

    const REGISTER_CODE = '-10'
    const CONSTRUMER = 'construmer'

    export default {
        data() {
            return{
                routerPath:''
            }
        },
        props: ['storeId'],
        created() {
             this.routerPath=rootPath;
        },
        methods: {
            jumpUrl(path, tabIndex, tabContent) {
                sa.track('$WebClick', {
                  $element_id: tabIndex,
                  $element_content: tabContent,
                  $element_name: tabContent,
                  $element_class_name: 'guide_item',
                  $element_type: '底部菜单',
                  $element_selector: 'section',
                  $element_target_url: path,
                  $url: location.href,
                  $title: this.documentTitle,
                  $url_path: location.pathname
                })
                this.$router.push(path)
            },
            gotoAddress(path) {

                let params = qs.stringify({
                    a: 'v1/cartList',
                    pagesize: 200,
                    pageidx: 1
                })
                cartLists(params).then(res => {
                    this.$router.push(path)
                    // if (res.code == REGISTER_CODE) {   // = -11
                    //     storage.set(CONSTRUMER, res.nickName)
                    //     this.$emit('showRegisterEnv')
                    // } else {
                    //     this.$router.push(path)
                    // }
                })
            }
        }
    }
</script>
<style lang="css" scoped>
  #foot_guide{
    background-color: #fff;
    position: fixed;
    z-index: 999;
    left: 0;
    right: 0; 
    bottom: 0;
    /*// @include wh(100%, 1.95rem);*/
    width: 100%;
    height: 1.95rem;
    display: flex;
    box-shadow: 0 -0.026667rem 0.053333rem rgba(0,0,0,.1);
    /*//max-width: 1024px;*/
    margin: 0 auto;
  }
  .guide_item{
    flex: 1;
    display: flex;
    text-align: center;
    flex-direction: column;
    align-items: center;
  }
  .guide_item .icon_style{
    /*// @include wh(.8rem, .8rem);*/
    width: .8rem;
    height: .8rem;
    margin-bottom: .2rem;
    margin-top: .3rem;
    fill: #ccc;
  }
  .guide_item span{
    /*// @include sc(.5rem, #666);*/
    font-size: .5rem;
    color: #666;
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
