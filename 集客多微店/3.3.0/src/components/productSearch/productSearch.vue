<template>
    <div>
        <div v-title data-title="商品搜索"></div>
        <div v-stat="{type:'pageview', title:'商品搜索'}"></div>

        <div class="search_form">
            <button type="submit" class="custom-search-button"></button>
            <input type="text" placeholder="请输入商品关键字" class="search_input" v-model="searchValue" @focus="showHistory=false" @keyup="checkInput($event)">
            <button type="text" style="width: 2.3rem; margin-left: 0.6rem;border-radius: 0.2rem; border: none;  background: #fff;"  @click.stop.prevent="searchTarget()">搜索</button>
        </div>
        <section v-if="productListArr.length!=0">
            <div class="double">
                <div class="items" v-for="item in productListArr" :key="item.productId">
                    <router-link :to="{path: routerPath+'/productDetail',query:{productId: item.productId}}">
                        <div class="placeholder">
                            <div class="imgWrap">
                                <img :src="item.imageUrl">
                            </div>
                            <p class="mc">
                                <span v-if="item.isSeckillProduct == 1" class="seckillTip">限时购</span>
                                {{item.productName}}</p>
                            <p class="price">￥{{item.price}}</p>
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
        <section class="search_history" v-if="searchHistory.length && showHistory">
            <h4 class="title_restaurant">搜索历史</h4>
            <ul>
                <li v-for="(item, index) in searchHistory" :key="index" class="history_list">
                    <span class="history_text ellipsis" @click.prevent="searchTarget(item)">{{item}}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="delete_icon" @click="deleteHistory(index)">
                            <line x1="8" y1="8" x2="18" y2="18" style="stroke:#999;stroke-width:3" />
                            <line x1="18" y1="8" x2="8" y2="18" style="stroke:#999;stroke-width:3" />
                        </svg>
                </li>
            </ul>
            <footer class="clear_history" @click="clearAllHistory">清空搜索历史</footer>
        </section>
        <footer class="loader_more" v-show="preventRepeatReuqest">正在加载更多商品...</footer>
        <div ref="abc" style="background-color: red;"></div>

        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>

        <div class="search_none" v-if="emptyResult">很抱歉！无搜索结果</div>
    </div>
</template>

<script>

    import { showBack, animate, trim } from 'common/js/utils'
    import loading from 'base/loading/loading'
    import footGuide from 'base/footer/footGuide'
    import { goodsLists } from 'api'
    import { getStore, setStore } from 'common/js/utils'
    import { rootPath } from 'config/env'
    import qs from 'qs'
    import sa from 'sa-sdk-javascript';

    export default {
        data() {
            return {
                routerPath:'',
                searchHistory: [], // 搜索历史记录
                showHistory: false, // 是否显示历史记录，只有在返回搜索结果后隐藏
                searchValue: '', // 搜索内容
                emptyResult: false, // 搜索结果为空时显示
                pageMax: 0, //总页数
                productListArr: [], // 商品列表数据
                preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
                showBackStatus: false, //显示返回顶部按钮
                showLoading: false, //显示加载动画
                nomore: false, //没有更多啦
                pram: {
                    categId: '',
                    pagesize: 20,
                    pageidx: 1,
                    keyword: '',
                    status: '',
                    couponId:'',
                }, //数据请求参数
                storeName:sessionStorage.storeName
            }
        },
        created() {
            this.routerPath = rootPath;
            this.pram.couponId = this.$route.query.couponId
        },
        // mixins: [loadMore, getImgPath],
        mounted() {
            // sa.track('$pageview', {
            //   $title: document.title,
            //   $url: location.href,
            //   $url_path: location.pathname,
            //   $referrer_host: location.hostname,
            //   $referrer: document.referrer,
            // })

            //获取搜索历史记录
            if (getStore('searchHistory')) {
                this.searchHistory = JSON.parse(getStore('searchHistory'));
            }
            if(this.pram.couponId != ''){
                this.getData();
            }
            if (sessionStorage.serchVaule!='') {
                this.pram.keyword=sessionStorage.serchVaule;
                this.searchValue=sessionStorage.serchVaule;
                if(window.isPSearchLoadData!=true||!window.localStorage){
                    window.isPSearchLoadData=true;
                    sessionStorage.pdgpageidx= 1;
                    this.getData();
                }else{
                    this.pageMax = sessionStorage.searchPPageMax;
                    // this.emptyResult =  sessionStorage.searchPEmptyResult;
                    this.productListArr = JSON.parse(sessionStorage.searchPRestaurantList);
                    this.pram.pageidx=sessionStorage.pdgpageidx;
                }
            }
            //开始监听scrollTop的值，达到一定程度后显示返回顶部按钮
            showBack(status => {
                this.showBackStatus = status;
            });

        },
        components: {
            footGuide,
            loading
        },
        methods: {
            //到达底部加载更多数据
            loaderMore() {
                let me = this;
                //防止重复请求
                if (me.pram.pageidx < me.pageMax) {
                    if (me.preventRepeatReuqest) {
                        return
                    }
                    me.showLoading = true;
                    me.preventRepeatReuqest = true;
                    //数据的定位加20位
                    me.pram.pageidx = Number( me.pram.pageidx )+1;
                    sessionStorage.pdgpageidx= me.pram.pageidx;

                    let params = qs.stringify( me.pram );
                    goodsLists(params).then(res => {
                        me.showLoading = false;
                        me.productListArr = [...this.productListArr, ...res.goods];
                        sessionStorage.searchPRestaurantList=JSON.stringify(me.productListArr);
                        me.preventRepeatReuqest = false;
                        if (res.goods.length < 20) {
                            return
                        }
                    }).catch(function(err) {
                        me.showLoading = false;
                        me.preventRepeatReuqest = false;
                    });
                } else {
                    this.nomore = true;
                }
            },
            //点击删除按钮，删除当前历史记录
            deleteHistory(index) {
                this.searchHistory.splice(index, 1);
                setStore('searchHistory', this.searchHistory);
            },
            //清除所有历史记录
            clearAllHistory() {
                this.searchHistory = [];
                setStore('searchHistory', this.searchHistory);
            },
            //返回顶部
            backTop() {
                animate(document.body, {
                    scrollTop: '0'
                }, 400, 'ease-out');
            },
            getData() {
                if (this.searchValue.length) {
                    this.showHistory = false
                }
                this.productListArr = [];
                this.showLoading = true;
                this.pram.keyword = this.searchValue;
                sessionStorage.serchVaule = this.pram.keyword;

                //获取数据
                this.pram.a = 'v1/distributionProductList'
                console.log(this.pram)
                let params = qs.stringify(this.pram)
                goodsLists(params).then(res => {
                    console.log('搜索结果----')
                    console.log(res);

                    this.showLoading = false;
                    if (res.code != '1') {
                        sa.track('search', {
                            keyWord: this.searchValue,
                            hasResult: false,
                            isHistory: false,
                            isRecommend: false
                        })
                        return
                    }

                    sa.track('search', {
                        keyWord: this.searchValue,
                        hasResult: true,
                        isHistory: false,
                        isRecommend: false
                    })

                    if (res.dataList.length == 0) {
                        this.emptyResult = true;
                         sessionStorage.searchPEmptyResult=true;
                    } else {
                        this.emptyResult = false;
                        this.productListArr = res.dataList;
                         sessionStorage.searchPEmptyResult=false;
                         sessionStorage.searchPRestaurantList=JSON.stringify(res.dataList);
                    }
    
                }).catch(function(err) {
                    // this.showLoading = false;
                });



            },
            //搜索结束后，删除搜索内容直到为空时清空搜索结果，并显示历史记录
            checkInput(ev) {
                if (this.searchValue === '') {
                    this.showHistory = false; //显示历史记录
                    this.emptyResult = false; //隐藏搜索为空提示
                } 
                if(ev.keyCode==13){
                     this.searchTarget();
                 }
                // else {
                //     this.pram.keyword = this.searchValue;
                //     this.searchTarget();
                // }
            },
            //点击提交按钮，搜索结果并显示，同时将搜索内容存入历史记录
            searchTarget(historyValue) {
                if (historyValue) {
                    this.searchValue = historyValue;
                    this.pram.keyword = this.searchValue;
                } else{
                    this.pram.keyword = this.searchValue;
                }
                //隐藏历史记录
                this.showHistory = false;
                //获取搜索结果
                this.getData();
                /**
                 * 点击搜索结果进入下一页面时进行判断是否已经有一样的历史记录
                 * 如果没有则新增，如果有则不做重复储存，判断完成后进入下一页
                 */
                let history = getStore('searchHistory');
                if (history) {
                    let checkrepeat = false;
                    this.searchHistory = JSON.parse(history);
                    this.searchHistory.forEach(item => {
                        if (item == this.searchValue) {
                            checkrepeat = true;
                        }
                    })
                    if (!checkrepeat) {
                        if (this.searchValue != "" && trim(this.searchValue) != "") {
                            this.searchHistory.push(this.searchValue)
                        }
                    }
                } else {
                    if (this.searchValue != "" && trim(this.searchValue) != "") {
                        this.searchHistory.push(this.searchValue)
                    }
                }
                setStore('searchHistory', this.searchHistory)
            },
        }
    }
</script>

<style lang="css" scoped>
    @import 'productSearch';

    .imgWrap {
        position: relative;
    }
    .seckillTip{
        /*position: absolute;*/
        /*bottom: .38rem;*/
        /*left: .75rem;*/
        font-size: .6rem;
        padding: 0 .16rem;
        border: .02rem solid #FB4A4C;
        color: #FB4A4C;
        background-color: #ffffff;
      }
</style>
