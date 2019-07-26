<template>
    <div class="order_detail_page">
        <div v-title data-title="物流详情"></div>
        <div v-stat="{type:'pageview', title:'物流详情'}"></div>
        
        <div v-show="!showLoading">
            <!-- <lazy-render :time="300"> -->
                <ul class="cho_top">
                    <li v-for="(item,index) in orderPackage" :class='{on: pageIndex ==index}' @click="pageChange(index)">
                        <p>包裹{{index+1}}</p>
                    </li>
                </ul>
                <div class="co">
                    <div class="page" data-num="1" v-if="productList.length > 0">
                        <div class="wl_info" v-for="product in productList">
                            <div class="wl_img">
                                <img v-lazy="product.imageUrl">
                            </div>
                            <div class="wl_txt">
                                <p class="wl_name">{{product.productName}}</p>
                                <!---<p class="wl_label">5磅 巧克力味</p>-->
                            </div>
                            <div class="wl_price">
                                <p class="peice">￥{{product.price}}</p>
                                <p class="num">x{{product.productNumber}}</p>
                                <p class="rufund">{{ product.rufundStatusName }}</p>
                            </div>
                            <div class="proTags">{{product.productTags}}</div>
                        </div>

                        <div class="wl_ques">
                            <ul>
                                <li>
                                    <p><span>包裹{{pageIndex+1}}：</span>{{orderPackage[pageIndex].total}}件物品</p>
                                </li>
                                <li>
                                    <p><span>物流公司：</span>{{orderPackage[pageIndex].logistics}}</p>
                                </li>
                                <li>
                                    <p><span>物流编号：</span>{{orderPackage[pageIndex].expressNo}}</p>
                                </li>
                                <li>
                                    <p><span>下单时间：</span>{{timesyc(orderPackage[pageIndex].createTime)}}</p>
                                </li>
                            </ul>
                        </div>
                        <div class="track-rcol" v-show="dataList.length>0">
                            <div class="track-list">
                                <ul style="padding-bottom: 30px;">
                                    <li v-for="wldata in dataList">
                                        <i class="node-icon"></i>
                                        <span class="txt">{{wldata.title}}</span>
                                        <span class="time">{{timesyc(wldata.createTime)}}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            <!-- </lazy-render> -->
        </div>
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>
    </div>
</template>

<script>
    // import { mapState, mapMutations } from 'vuex'
    // import { getImgPath } from 'src/components/common/mixin'
    import { orderPackageList } from 'api'
    import qs from 'qs'
    // import { orderPackageList } from 'src/service/getData'
    import loading from 'base/loading/loading'
    import alertTip from 'base/alertTip/alertTip'
    
    export default {
    
        data() {
            return {
                shopid: '',
                showLoading: true, //显示加载动画
                showAlert: false, //弹出提示框
                show: false, //显示确认提示框
                pageIndex: 0,
                orderPackage: [{total:0,logistics:'',expressNo:'',createTime:''}],
                productList: [], //商品列表
                dataList: [], //物流信息
                params: {
                    orderId: ''
                },
                orderId:'',
            }
        },
        created() {
            this.shopid = this.$route.query.shopid;
            this.params.orderId = this.$route.query.orderId;
        },
        mounted() {
            this.initData();
        },
        // mixins: [getImgPath],
        components: {
            loading,
            alertTip
        },
    
        methods: {
             timesyc(a){
                let aaa = Number(a)
                let date = new Date(aaa*1000)
                let Y = date.getFullYear() + '-';
                let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                let D = date.getDate() + ' ';
                let h = date.getHours() + ':';
                let m = date.getMinutes() + ':';
                let s = (date.getSeconds()+1 < 10 ? '0'+(date.getSeconds()+1) : date.getSeconds()+1);
                return Y+M+D+h+m+s;
            },
            async initData() {
                let params = qs.stringify(this.params)
                orderPackageList(params).then(res => {
                    console.log('查看物流----')
                    console.log(res);
                    this.showLoading = false;
                    if (res.code == "1") {
                        this.orderPackage = res.packageList;
                        if (this.orderPackage && res.packageList.length > 0) {
                            this.productList = res.packageList[0].productList;
                            this.dataList = res.packageList[0].dataList;
                        }
                    } else {
                        this.showAlert = true;
                        this.alertText = res.msg;
                    }
                });
            },
            pageChange(index) {
                this.pageIndex = index;
                this.productList = this.orderPackage[index].productList;
                this.dataList = this.orderPackage[index].dataList;
            }
        }
    
    }
</script>
  
<style lang="css" scoped>
    @import 'logistics';
</style>
