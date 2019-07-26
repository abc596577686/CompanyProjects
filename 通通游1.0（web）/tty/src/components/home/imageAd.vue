<template>
    <nav class="msite_nav" style="overflow: hidden;">
        <div v-if="content.image_type=='0'">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="item in content.nav_list">
                        <p v-if="item.prefix==''" ><img :src="getImgPath(item.image)" style="width: 100%;"></p>
                        <a v-if="item.prefix=='外链'" :href="item.name"><img :src="getImgPath(item.image)" style="width: 100%;"></a>
                        <router-link v-if="item.prefix=='微页面'" :to="{path: routerPath+'/innerPage',query:{shopid:storeId,id:item.url,type:'wym'}}">
                            <img :src="getImgPath(item.image)" style="width: 100%;">
                        </router-link>
                        <router-link v-if="item.prefix=='商品分组'" :to="{path: routerPath+'/productGroup',query:{shopid:storeId,id:item.url}}">
                            <img :src="getImgPath(item.image)" style="width: 100%;">
                        </router-link>
                        <router-link v-if="item.prefix=='商品'" :to="{path: routerPath+'/productDetail',query:{shopid:storeId,productid:item.url}}">
                            <img :src="getImgPath(item.image)" style="width: 100%;">
                        </router-link>
                        <router-link v-if="item.prefix=='微页面分类'" :to="{path: routerPath+'/type',query:{shopid:storeId,channelId:item.url}}">
                            <img :src="getImgPath(item.image)" style="width: 100%;">
                        </router-link>
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </div>
        <div v-else>
            <div v-if="content.image_size=='0'" style="overflow: hidden;">
                <div class="swiper-slide" v-for="item in content.nav_list">
                    <p v-if="item.prefix==''" ><img :src="getImgPath(item.image)" style="width: 100%;"></p>
                    <a v-if="item.prefix=='外链'" :href="item.name"><img :src="getImgPath(item.image)" style="width: 100%;"></a>
                    <router-link v-if="item.prefix=='微页面'" :to="{path: routerPath+'/innerPage',query:{shopid:storeId,id:item.url,type:'wym'}}">
                        <img :src="getImgPath(item.image)" style="width: 100%;">
                    </router-link>
                    <router-link v-if="item.prefix=='商品分组'" :to="{path: routerPath+'/productGroup',query:{shopid:storeId,id:item.url}}">
                        <img :src="getImgPath(item.image)" style="width: 100%;">
                    </router-link>
                    <router-link v-if="item.prefix=='商品'" :to="{path: routerPath+'/productDetail',query:{shopid:storeId,productid:item.url}}">
                        <img :src="getImgPath(item.image)" style="width: 100%;">
                    </router-link>
                    <router-link v-if="item.prefix=='微页面分类'" :to="{path: routerPath+'/type',query:{shopid:storeId,channelId:item.url}}">
                        <img :src="getImgPath(item.image)" style="width: 100%;">
                    </router-link>
                </div>
             </div>
             <div v-if="content.image_size=='1'">
             
             <div class="swiper-slide" v-for="item in content.nav_list"  style="width: 50%;float: left;">
                 <a v-if="item.prefix==''" href="#"><img :src="getImgPath(item.image)" style="width: 100%;"></a>
                <a v-if="item.prefix=='外链'" :href="item.name"><img :src="getImgPath(item.image)" style="width: 100%;"></a>
                <router-link v-if="item.prefix=='微页面'" :to="{path: routerPath+'/innerPage',query:{shopid:storeId,id:item.url,type:'wym'}}">
                    <img :src="getImgPath(item.image)" style="width: 100%;">
                </router-link>
                <router-link v-if="item.prefix=='商品分组'" :to="{path: routerPath+'/productGroup',query:{shopid:storeId,id:item.url}}">
                    <img :src="getImgPath(item.image)" style="width: 100%;">
                </router-link>
                <router-link v-if="item.prefix=='商品'" :to="{path: routerPath+'/productDetail',query:{shopid:storeId,productid:item.url}}">
                    <img :src="getImgPath(item.image)" style="width: 100%;">
                </router-link>
                <router-link v-if="item.prefix=='微页面分类'" :to="{path: routerPath+'/type',query:{shopid:storeId,channelId:item.url}}">
                    <img :src="getImgPath(item.image)" style="width: 100%;">
                </router-link>
            </div>
            </div>
        </div>
    </nav>
</template>

<script>
    import {getImgPath } from '../common/mixin'
    import { rootPath } from 'src/config/env'
    export default {
        data() {
            return {
                 routerPath:''
            }
        },
        created() {
             this.routerPath=rootPath;
        },
        mounted() {
            if (this.content.image_type == "0") {
                new Swiper('.swiper-container', {
                    pagination: '.swiper-pagination',
                    loop: true,
                    autoplay: 3000 //可选选项，自动滑动
                });
            }
        },
        props: ['content', 'storeId'],
        mixins: [getImgPath]
    }
</script>

<style lang="scss" scoped>
    
</style>
