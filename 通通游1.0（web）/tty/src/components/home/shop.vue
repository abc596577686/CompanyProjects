<template>
    <div style="padding:0;margin-bottom: 0.427rem;">
        <div class="tpl-shop">
            <div class="tpl-shop-header"  :style="{background: 'url('+imgurl+content.shop_head_bg_img+') center center/100% 100% no-repeat'}" >
                <div class="tpl-shop-title">{{storeName}}</div>
                <div class="tpl-shop-avatar"><img width="80" height="80" :src="getImgPath(storeImage)"></div>
            </div>
            <div class="tpl-shop-content">
                <ul class="clearfix">
                    <li >
                        <router-link :to='{path: "/wap/type",query:{shopid:storeId}}'>
                        <span class="count">{{productNumber}}</span>
                        <span class="text">全部商品</span>
                         </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {getImgPath} from '../common/mixin'
    import { imgBaseUrl } from 'src/config/env';
    export default {
        data() {
            return {
               imgurl:"",
            }   
        },
        props: ['content','storeId','productNumber','storeName','storeImage'],
        mixins: [getImgPath],
        created() {
            this.imgurl=imgBaseUrl;
        }
       
        
    }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    .tpl-shop-header {
        position: relative;
        height: 5rem;
        background-repeat: no-repeat;
        background-position-x: center;
        background-size: cover;
        background-color: #576bf7 !important;
    }
    
    .tpl-shop-title {
        position: absolute;
        bottom: 0.426rem;
        left: 4.266rem;
        font-size: 16px;
        color: #FFFFFF;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    }
    
    .tpl-shop-avatar {
        position: absolute;
        left: 0.43rem;
        top: 3rem;
        width: 3.4rem;
        height: 3.4rem;

    }
    
    .tpl-shop-avatar img {
        width: 3.4rem;
        height: 3.4rem;
        background-color: #eee;
        border-radius: 3px;
        -webkit-box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.2);
        box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.2);
    }
    
    .tpl-shop-content {
        // padding: 0.3rem 0;
        border-bottom: 1px solid #eee;
        background: #fff;
    }
    
    .tpl-shop-content ul {
        margin: 0 0 0 3.67rem;
        padding: 0;
    }
    
    .clearfix {
        zoom: 1;
    }
    
    ol,
    ul {
        list-style: none;
    }
    
    .tpl-shop-content li:last-child {
        border-right: 0px none;
    }
    
    .tpl-shop-content li {
        float: left;
        width: 33%;
        list-style: none;
        box-sizing: border-box;
        margin-top:  0.426rem;
    }
    
    .tpl-shop-content li a {
        display: block;
        margin-top: -0.426rem;
        margin-bottom:  0.256rem;
    }
    
    a {
        color: #333;
        background: transparent;
        text-decoration: none;
    }
    
    .clearfix:after {
        content: "";
        display: table;
        clear: both;
    }
    
    .tpl-shop-content .count {
        height: 0.896rem;
        line-height: 0.896rem;
        font-size: 0.7rem;
        color: #333;
        overflow: hidden;
    }
    
    .tpl-shop-content span {
        display: block;
        font-size: 0.512rem;
        text-align: center;
        color: #999;
    }
</style>
