<template>
    <div>
        <!-- <lazy-render :time="300"> -->
            <form class="search_form">
                <button type="submit" class="custom-search-button"></button>
                <router-link :to='{path: routerPath+"/productSearch"}' style="width:100%;">
                    <input type="search" name="search" placeholder="请输入商品关键字" class="search_input" readonly="true" style="width:100%;">
                </router-link>
                <!--<input type="submit" name="submit" class="search_submit" @click.prevent="searchTarget('')" value="搜索">-->
            </form>
            <section>
                <div class="cho_list">
                    <ul>
                        <li v-for="(item, index) in channelList" :key="index" @click="changeTab(item.catId, index)">
                            <span class="" :class="{cho_list_span: curIndex == index}">{{item.catName}}</span>
                        </li>
                    </ul>
                </div>
            </section>
            <!-- style="margin-top:2.13rem; sdf-->
            <!-- <section v-load-more="loaderMore">  -->
            <section> 
                <!-- <div class="double"> -->
                <div class="double">
                    <div class="items" v-if="productListArr.length > 0" v-for="good in productListArr" :key="good.productId">
                        <router-link :to="{path: routerPath+'/productDetail',query:{productId:good.productId}}">
                            <div class="placeholder">
                                <img v-lazy="good.imageUrl">
                                <p class="mc">{{good.productName}}</p>
                                <p class="price">￥{{good.price}}</p>
                            </div>
                        </router-link>
                    </div>
                </div>
            </section>
            <p v-show='nomore' class="empty_data">没有更多了</p>
            <aside class="return_top" @click="backTop" v-if="showBackStatus">
                <svg class="back_top_svg">
    				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#backtop"></use>
    			</svg>
            </aside>
            <footer class="loader_more" v-show="preventRepeatReuqest">正在加载更多商品...</footer>
            <section ref="abc" style="background-color: red;"></section>
            <section class="search_none" v-if="emptyResult">很抱歉！无搜索结果</section>
        <!-- </lazy-render> -->
        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>
        <foot-guide></foot-guide>
    </div>
</template>

<script>

    import { showBack, animate, wxShowOptionMenu } from 'common/js/utils'
    // import { loadMore, getImgPath } from 'common/js/mixin'
    import { getProductCollectionList, getCategoryList, goodsLists, getProxyProductList } from 'api'
    import loading from 'base/loading/loading'
    import footGuide from 'base/footer/footGuide' 
    import { rootPath } from 'config/env'
    import qs from 'qs'

    export default {
        data() {
            return {
                routerPath:'',
                storeName:sessionStorage.storeName,
                searchValue: '', // 搜索内容
                channelList: [], //频道列表
                curIndex: 0,
                // classIndex: 0,
                // baseUrl, // 图片域名地址
                emptyResult: false, // 搜索结果为空时显示
                pageMax: 0, //总页数
                productListArr: [], // 商品列表数据
                preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
                showBackStatus: false, //显示返回顶部按钮
                showLoading: false, //显示加载动画
                nomore: false, //没有更多啦
                pram: {
                    firstCategoryId: '',
                    pagesize: 200,
                    pageidx: 1,
                    keyword: '',
                    status:1
                } //数据请求参数
            }
        },
        created() {
            if (this.$route.query.channelId) {
                // this.classIndex = this.$route.query.channelId;
                // this.pram.categId = this.$route.query.channelId;
            }
            this.routerPath = rootPath;
            this._getCategoryList()
            // wxShowOptionMenu();
        },
      
        // mixins: [loadMore, getImgPath],
        // activated(){
        //     alert(1);
        // },
        mounted() {
            // sessionStorage.serchVaule = "";

            // if (window.isTypeLoadData!=true||!window.localStorage) {
            //     window.isTypeLoadData=true;
            //     this.showLoading = true;
            //     sessionStorage.typePageidx = 1
            // }else{
            //     this.channelList =  JSON.parse(sessionStorage.channelList);
            //     this.classIndex = sessionStorage.typeClassIndex;
            //     this.pageMax = sessionStorage.TypePageMax;
            //     this.emptyResult = sessionStorage.TypeEmptyResult;

            //     this.firstCategoryId =  sessionStorage.typeCategId;
            //     this.productListArr = JSON.parse(sessionStorage.productListArr);
            //     this.pageidx = sessionStorage.typePageidx;
            // }
            //开始监听scrollTop的值，达到一定程度后显示返回顶部按钮
            showBack(status => {
                this.showBackStatus = status;
            });
        },
        methods: {
            changeTab(id, index) {
                console.log('导航id：' + id)
                if (this.oldIndex == index) {
                    return;
                }
                this.oldIndex = index;
                this.pageidx = 1;
                this.nomore = false;

                this.productListArr = []
                if (id == '') {
                    this.firstCategoryId = '';
                    this._productCollection();
                } else {
                    this.firstCategoryId = id;
                    this._goodsLists();
                }

                this.curIndex = index;

            },
            //返回顶部
            backTop() {
                animate(document.body, {
                    scrollTop: '0'
                }, 400, 'ease-out');
            },
            //分类列表
            _getCategoryList() {
                let params = qs.stringify({
                    a: 'v1/productCategoryList'
                })
                getCategoryList(params).then((res) => {
                    console.log('商品分类----')
                    console.log(res)

                    if (res.code != '1') {
                        return
                    }

                    this.showLoading = false

                    // 添加店主推荐
                    let obj = {
                        catId: '',
                        catName: '店主推荐'
                    }
                    res.list.unshift(obj)
                    this.channelList = res.list

                    // 获取店主推荐商品
                    this._productCollection();

                    // this.firstCategoryId = this.channelList[0].catId
                    // this._goodsLists()

                })
                // .catch(function(err) {
                //     this.showLoading = false;
                // });
            },
            _productCollection() {
                let params = qs.stringify({
                    a: 'v1/productCollectionList'
                })
                getProductCollectionList(params).then(res => {
                    console.log('店主推荐----')
                    console.log(res)

                    this.showLoading = false;
                    this.pageMax = res.pageMax;
                    sessionStorage.TypePageMax = res.pageMax;
                    
                    if (res.dataList && !res.dataList.length) {
                        this.emptyResult = true;
                        sessionStorage.TypeEmptyResult = true;
                         // s
                        // 如果店主推荐没商品，隐藏店主推荐菜单
                        this.channelList.shift()
                        this.firstCategoryId = this.channelList[0].catId
                        this._goodsLists()
                    } else {
                        this.emptyResult = false;
                        sessionStorage.TypeEmptyResult = false;
                        this.productListArr = res.dataList;
                        sessionStorage.productListArr = JSON.stringify(res.dataList);
                    }
                })
            },
            // 获取分类商品列表
            _goodsLists() {
                this.productListArr = [];
                this.showLoading = true;

                let params = qs.stringify({
                    a: 'v1/distributionProductList',
                    pageidx: this.pageidx,
                    firstCategoryId: this.firstCategoryId
                })
                goodsLists(params).then(res => {
                    console.log('商品列表----')
                    console.log(res)

                    this.showLoading = false;
                    this.pageMax = res.pageMax;
                    sessionStorage.TypePageMax = res.pageMax;
                    
                    if (!res.dataList.length) {
                        this.emptyResult = true;
                        sessionStorage.TypeEmptyResult = true;
                    } else {
                        // 
                        this.emptyResult = false
                        sessionStorage.TypeEmptyResult = false;
                        this.productListArr = res.dataList;
                        sessionStorage.productListArr = JSON.stringify(res.dataList);
                    }
                })
            },
            // _getProxyProductList() {
            //     this.pram.a = 'v1/proxyProductList'
            //     let params = qs.stringify(this.pram)
            //     getProxyProductList(params).then(res => {
            //         console.log('主题详细数据----')
            //         console.log(res);

            //         this.showLoading = false;
            //         this.pageMax = res.pageMax;
            //         sessionStorage.TypePageMax = res.pageMax;

            //         if (!res.dataList.length) {
            //             this.emptyResult = true;
            //             sessionStorage.TypeEmptyResult = true;
            //         } else {
            //             this.emptyResult = false;
            //             sessionStorage.TypeEmptyResult = false;
            //             this.productListArr = res.dataList;
            //             sessionStorage.productListArr = JSON.stringify(res.dataList);
            //         }
            //     })
            // },
            searchTarget() {
                if (this.searchValue != "") {
                    this.pram.keyword = this.searchValue;
                    this._getData();
                }
            },
            //到达底部加载更多数据
            // async loaderMore() {
            //     console.log('加载更多…… -------')
            //     let me = this;
            //     //防止重复请求
            //     if (me.pram.pageidx < me.pageMax) {
            //         if (me.preventRepeatReuqest) {
            //             return
            //         }
            //         me.showLoading = true;
            //         me.preventRepeatReuqest = true;
            //         //数据的定位加20位
            //         me.pram.pageidx =Number(me.pram.pageidx)+1;
            //         sessionStorage.typePageidx=me.pram.pageidx;

            //         this.pram.a = 'v1/distributionProductList'
            //         let params = qs.stringify(this.pram)
            //         goodsLists(params).then(res => {
            //             console.log('商品列表----')
            //             console.log(res)

            //             me.showLoading = false;
            //             me.productListArr = [...this.productListArr, ...res.goods];
            //             sessionStorage.productListArr=JSON.stringify(me.productListArr);
            //             me.preventRepeatReuqest = false;
            //             if (res.goods.length < 20) {
            //                 return
            //             }
            //         }).catch(function(err) {
            //             me.showLoading = false;
            //             me.preventRepeatReuqest = false;
            //         });
            //     } else {
            //         this.nomore = true;
            //     }
            // }
        },
        components: {
            footGuide,
            loading,
            getProxyProductList
        }
        
    }
</script>

<style lang="css" scoped>
    @import 'type.css';
</style>
