<template>
    <nav class="msite_nav" style="margin-top:0.3rem;">
        <div class="food_types_container">
    
            <p class="link_to_food" v-for="item in content" v-if="item.image!=''">
                <a v-if="item.prefix==''" :href="item.name">
                    <figure>
                        <img :src="getImgPath(item.image)">
                        <figcaption>{{item.title}}</figcaption>
                    </figure>
                </a>
                <a v-if="item.prefix=='外链'" :href="item.name">
                    <figure>
                        <img :src="getImgPath(item.image)">
                        <figcaption>{{item.title}}</figcaption>
                    </figure>
                </a>
                <router-link v-if="item.prefix=='微页面'" :to="{path: routerPath+'/innerPage',query:{shopid:storeId,id:item.url,type:'wym'}}">
                    <figure>
                        <img :src="getImgPath(item.image)">
                        <figcaption>{{item.title}}</figcaption>
                    </figure>
                </router-link>
                <router-link v-if="item.prefix=='商品分组'" :to="{path: routerPath+'/productGroup',query:{shopid:storeId,id:item.url}}">
                    <figure>
                        <img :src="getImgPath(item.image)">
                        <figcaption>{{item.title}}</figcaption>
                    </figure>
                </router-link>
                <router-link  v-if="item.prefix=='商品'" :to="{path: routerPath+'/productDetail',query:{shopid:storeId,productid:item.url}}">
                    <figure>
                        <img :src="getImgPath(item.image)">
                        <figcaption>{{item.title}}</figcaption>
                    </figure>
                </router-link>
                 <router-link  v-if="item.prefix=='微页面分类'" :to="{path: routerPath+'/type',query:{shopid:storeId,channelId:item.url}}">
                    <figure>
                        <img :src="getImgPath(item.image)">
                        <figcaption>{{item.title}}</figcaption>
                    </figure>
                </router-link>
            </p>
        </div>
    </nav>
</template>

<script>
    import { getImgPath} from '../common/mixin'
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
        mixins: [getImgPath],
        props: ['content','storeId'],
    }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    .msite_nav {
        // padding-top: 2.1rem;
        background-color: #fff;
        border-bottom: 0.025rem solid $bc;
    }
    
    .food_types_container {
        display: flex;
        flex-wrap: wrap;
        .link_to_food {
            width: 25%;
            padding: 0.3rem 0rem;
            @include fj(center);
            figure {
                img {
                    margin-bottom: 0.3rem;
                    @include wh(1.8rem, 1.8rem);
                    border-radius: 0.9rem;
                }
                figcaption {
                    text-align: center;
                    @include sc(0.55rem, #666);
                }
            }
        }
    }
</style>
