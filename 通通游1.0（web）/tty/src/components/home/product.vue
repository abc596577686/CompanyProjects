
<template>
    <!--一排两个-->
    <ul v-if="content.size=='1'" class="js-goods-list sc-goods-list pic clearfix size-1">
        <li v-for="item in content.goods" class="goods-card goods-list small-pic card">
            <router-link :to="{path: routerPath+'/productDetail',query:{shopid:storeId,productid:item.id}}" :style="{height:content.buy_btn_type!='1'&&content.price!='1'?'8.945rem':'10rem'}" class="js-goods link clearfix">
                <span class="photo-block"><img class="goods-photo js-goods-lazy" v-lazy="getImgPath(item.image)" style="display:inline;"></span>
                <span class="info clearfix info-title">
                <span  class="goods-title display-block">{{item.title}}</span>
                <span class="goods-sub-title c-black hide"></span>
                <span v-if="content.price=='1'" class="goods-price display-block min-height-price">
                    <span  style="color: #fe5000;">￥{{item.price}}</span>
                </span>
                </span>
                <div v-if="content.buy_btn=='1'" style="width: 3rem;height: 3rem;position: absolute;  right: 0; bottom: 0;" @click.stop.prevent="addcart(item.id)">
                    <span  class="goods-buy btn1 info-no-title"></span>
                    <!--<span v-if="content.buy_btn_type=='2'" class="goods-buy btn2 info-no-title"></span>
                    <span v-if="content.buy_btn_type=='3'" class="goods-buy btn3 info-no-title"></span>
                    <span v-if="content.buy_btn_type=='4'" class="goods-buy btn4 info-no-title"></span>-->
                </div>
            </router-link>
        </li>
    </ul>
    <!--一排一个大图-->
    <ul v-else-if="content.size=='0'" class="js-goods-list sc-goods-list pic clearfix size-1">
        <li v-for="item in content.goods" class="goods-card goods-list small-pic card" style="margin-top:10px;width: 100%;">
            <router-link :to="{path: routerPath+'/productDetail',query:{shopid:storeId,productid:item.id}}" class="js-goods link clearfix" style="height: auto;">
                <span class="photo-block" style="height: auto;"><img class="goods-photo js-goods-lazy" :src="getImgPath(item.image)" style="display:inline;    width: 100%;"></span>
                <span class="info clearfix info-title">
                    <span  class="goods-title display-block">{{item.title}}</span>
                    <span class="goods-sub-title c-black hide"></span>
                    <span v-if="content.price=='1'" class="goods-price display-block min-height-price">
                        <span style="color: #fe5000;">￥{{item.price}}</span>
                    </span>
                </span>
                <div v-if="content.buy_btn=='1'" style="width: 3rem;height: 3rem;position: absolute;  right: 0; bottom: 0;" @click.stop.prevent="addcart(item.id)">
                    <span class="goods-buy btn1 info-no-title"></span>
                    <!--<span v-if="content.buy_btn_type=='1'" class="goods-buy btn1 info-no-title"></span>
                    <span v-if="content.buy_btn_type=='2'" class="goods-buy btn2 info-no-title"></span>
                    <span v-if="content.buy_btn_type=='3'" class="goods-buy btn3 info-no-title"></span>
                    <span v-if="content.buy_btn_type=='4'" class="goods-buy btn4 info-no-title"></span>-->
                </div>
            </router-link>
        </li>
    </ul>
    <!--一排一个详细列表-->
    <ul v-else-if="content.size=='3'" class="js-goods-list sc-goods-list clearfix list size-3">
        <li v-for="item in content.goods" class="goods-card goods-list big-pic card">
            <router-link :to="{path: routerPath+'/productDetail',query:{shopid:storeId,productid:item.id}}" class="js-goods link clearfix" style="height: auto;">
                <div class="photo-block2">
                    <img class="goods-photo js-goods-lazy" :src="getImgPath(item.image)" style="display: block;">
                </div>
                <div class="info">
                    <p class="goods-title2">{{item.title}}</p>
                    <p class="goods-price2"><span  style="color: #fe5000;">￥{{item.price}}</span></p>
                    <div v-if="content.buy_btn=='1'" style="width: 3rem;height: 3rem;position: absolute;  right: 0; bottom: 0;" @click.stop.prevent="addcart(item.id)">
                        <span class="goods-buy btn1 info-no-title" ></span>
                        <!--<span v-if="content.buy_btn_type=='1'" class="goods-buy btn1 info-no-title"></span>
                        <span v-if="content.buy_btn_type=='2'" class="goods-buy btn2 info-no-title"></span>
                        <span v-if="content.buy_btn_type=='3'" class="goods-buy btn3 info-no-title"></span>
                        <span v-if="content.buy_btn_type=='4'" class="goods-buy btn4 info-no-title"></span>-->
                    </div>
                </div>
            </router-link>
        </li>
    </ul>
    
</template>

<script>
    import {getImgPath} from '../common/mixin'
    import {addNumCart} from 'src/service/getData'
    import { rootPath } from 'src/config/env'
    export default {
        data() {
            return {
                routerPath:'',
                addcartpram: {
                    storeId: '',
                    productId: '',
                    num: 1,
                    isFromCartList: false,
                }, //购物车商品数量修改请求参数
            }
        },
        mixins: [getImgPath],
        props: ['content','storeId'],
        created() {
            this.addcartpram.storeId=this.storeId;
            this.routerPath=rootPath;
        },
        methods:{
            addcart(id){
                 this.addcartpram.productId=id;
                 addNumCart(this.addcartpram).then(res => {
                    if (res.code == "1") { //成功
                        this.$emit('openTip');
                    } else {
                         this.$emit('errorTip');
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    .sc-goods-list {
        font-size: 0.52rem;
        padding: 0.213rem 0;
        list-style: none;
        margin: 0;
    }
    
    .clearfix {
        zoom: 1;
    }
    
    .sc-goods-list.pic .goods-card.small-pic.card {
        margin: 0.08rem 0;
    }
    
    .sc-goods-list.pic .goods-card.small-pic {
        width: 50%;
        float: left;
    }
    
    .sc-goods-list .goods-card {
        position: relative;
        margin-left: 0.213rem;
        margin-right: 0.213rem;
    }
    
    .sc-goods-list.pic .goods-card.small-pic.card .link {
        // border: 1px solid #eee;
        margin: 0 0.08rem;
    }
    
    .sc-goods-list .link {
        display: block;
        background: #fff;
        height: 10rem;
    }
    
    .sc-goods-list .link2 {
        display: block;
        background: #fff;
    }
    
    .sc-goods-list.pic .goods-card.small-pic .photo-block {
        width: 100%;
        height: 6.39rem;
        display: block;
    }
    
    .sc-goods-list .link .photo-block {
        text-align: center;
        overflow: hidden;
        position: relative;
    }
    
    .sc-goods-list.pic .goods-card.small-pic .photo-block img {
        max-width: 80%;
    }
    
    .sc-goods-list.pic .goods-card.small-pic.card .info {
        min-height: 1rem;
        display: block;
    }
    
    .sc-goods-list.pic .goods-card.small-pic .info {
        font-size: 0.55rem;
    }
    
    .sc-goods-list.pic .goods-card .info {
        padding-left: 0.17rem;
        margin-top: 0.426rem;
    }
    
    .clearfix:after {
        content: "";
        display: table;
        clear: both;
    }
    .sc-goods-list .goods-buy.btn1 {
        right: .5rem;
        bottom: 0.68rem;
        height: 0.9rem;
        width: 1rem;
    }
    
    .sc-goods-list .goods-buy.btn1{
        background-image: url(../../images/icon_gouwuche.png);
        background-repeat: no-repeat;
        background-size: cover;
    }
    
    .sc-goods-list .link .goods-buy {
        position: absolute;
    }
    
    .sc-goods-list .goods-buy {
        position: absolute;
    }
    
    .sc-goods-list.pic .goods-card.small-pic .info .goods-title {
        height: 1.36rem;
        overflow: hidden;
        display: block;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    
    .sc-goods-list.pic .goods-card .info .goods-title {
        margin-bottom: 0.213rem;
    }
    
    .sc-goods-list .link .info .goods-title {
        line-height: 1.3rem;
        overflow: hidden;
        color: #333;
    }
    
    .sc-goods-list.pic .goods-card.small-pic.card .info .goods-price {
        margin-top: 0.213rem;
    }
    
    .sc-goods-list.pic .goods-card .info .goods-price {
        float: left;
        margin-right: 0.426rem;
        margin-bottom: 0.426rem;
    }
    
    .sc-goods-list .link .info .goods-price {
        font-weight: bold;
        padding: 0px;
    }
    
    .min-height-price {
        min-height: 0.72rem;
    }
    
   .goods-price  span {
        font-style: normal;
        color: #ff6600;
    }
    
    .photo-block2 {
        float: left;
        margin-right: 0.55rem;
        width: 5.3rem;
        height: 5.3rem;
        text-align: center;
        overflow: hidden;
        position: relative;
    }
    
    .photo-block2 img {
        max-width: 5.3rem;
        max-height: 5.3rem;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        vertical-align: bottom;
    }
    
    .goods-card.card {
        padding: 0.213rem 0 0.213rem 0.213rem ;
        margin-top: 0.213rem ;
        border: 1px solid #eee;
        background: #fff;
    }
    
    .goods-title2 {
        padding-top: 0.213rem;
        padding-right: 6px;
        font-size: 14px;
        // max-height: 60px;
        margin-bottom: 0.26rem;
        line-height: 1rem;
        overflow: hidden;
        color: #333;
        margin: 0;
    }
    
    .goods-price2 {
        font-size: 0.7rem;
        margin-bottom: 8px;
        position: absolute;
        left: 5.76rem;
        bottom: 0.34rem;
        color: #fe5000;
    }
</style>
