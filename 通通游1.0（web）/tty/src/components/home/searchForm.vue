<template>
    <div class="custom-search">
        <button type="submit" class="custom-search-button"></button>
        <router-link :to='{path: routerPath+"/search",query:{shopid:storeId}}' >
            <input  type="search" class="custom-search-input" placeholder="商品搜索：请输入商品关键字" name="q" value="" readonly="true">
        </router-link>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
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
        props: ['storeId'],
    }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    .custom-search {
        margin-bottom: 0.427rem;
        position: relative;
        width: 96%;
        margin-left: 2%;
    }
    
    .custom-search-input {
        margin: 0;
        padding: 0 0.427rem 0 1.7rem;
        -webkit-appearance: none;
        -moz-appearance: none;
        height: 1.6rem;
        width: 100%;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        border: 0px none;
        outline: none;
        font-size: 0.6rem;
        border-radius: 0.213rem;
        border: 1px #eee solid;
    }
    
    .custom-search-button {
        position: absolute;
        top: 0.35rem;
        left: 0.1rem;
        border: 0px none;
        height: 1.4rem;
        line-height: 1.4rem;
        width: 1.5rem;
        padding: 0;
        color: #fff;
        font-size: 0.6rem;
        background: #fff url(../../images/search_icon.png) center center no-repeat;
        background-size: 0.68rem 0.68rem;
        border-radius: 0.213rem 0 0 0.213rem;
    }
</style>
