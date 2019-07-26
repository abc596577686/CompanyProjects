<template>
    <div class="order_page">
        <div v-title :data-title="storeName"></div>
        <div v-if="storeName" v-stat="{type:'pageview', title:storeName}"></div>
        
        <div class="order_list_ul" v-if="cartList.length!=0" style="padding-top: 1.7rem;"> 
            <div class="head" style="z-index:198">
                <div class="shop_name">
                    <img v-show="checkAll" src='../../common/images/icon_dagou@2x.png' class="operation_icon" @click="docheckAll(0)">
                    <img v-show="!checkAll" src='../../common/images/icon_yuan@2x.png' class="operation_icon" @click="docheckAll(1)">
                    <span style="display: inline-block; vertical-align: top; margin-left: 10px;">全选</span>
                </div>
                <div class="shop_operation"  @click="editEnv">
                    <span class="edit">{{editTex}}</span>
                </div>
            </div>
            <div class="goods_content" v-for="(item,index) in cartList">
                <div class="operation_img">
                    <img v-show="item.ischecked" src="../../common/images/icon_dagou@2x.png" class="operation_icon" @click="docheck(item)">
                    <img v-show="!item.ischecked" src="../../common/images/icon_yuan@2x.png" class="operation_icon" @click="docheck(item)">
                </div>
                <div class="goods_info" style="position: relative">
                    <div class="goods_img">
                        <a @click="goDetail(item)">
                            <img v-lazy="item.imageUrl">
                        </a>
                        <img v-show="item.isSoldOut=='1'" src="../../common/images/icon_qiangguang.png" style="position: absolute; left: 0%;">
                    </div>
                    <div class="goods_name_price">
                        <a @click="goDetail(item)">
                            <div class="goods_name" > 
                                <span class="name">
                                    <span v-if="item.isSeckillProduct == 1" class="seckillTip">限时购</span>
                                    {{item.productName}}
                                </span> 
                                <!-- <span class="taxation">税费：预计<span>{{item.tax*10000*item.quantity*10000/100000000}}</span></span> -->
                                <span class="taxation">{{item.productTags}}</span> 
                                <span v-show="editTex=='编辑'" style="font-size: 0.5rem; position: absolute; right: 0.42rem; bottom:2rem;">×{{item.productNumber}}</span> 
                            </div> 
                        </a>
                        <div class="goods_price">
                            <span class="unit_price">￥{{item.price}}</span>
                            <div class="goods_num" v-show="editTex=='完成'">
                                <span class="input-number-decrement" @click="subtraction(item);">–</span>
                                <input class="input-number" v-model="item.productNumber" @focus="inputFocus(item)" @blur="inputBlur(item)"></input>
                                <span class="input-number-increment" @click="add(item);">+</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--<p v-show='nomore' class="empty_data">没有更多了</p>-->
            <aside class="return_top" @click="backTop" v-if="showBackStatus">
                <svg class="back_top_svg">
    				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#backtop"></use>
    			</svg>
            </aside>
            <footer class="loader_more" v-show="preventRepeatReuqest">正在加载更多...</footer>
            <div ref="abc" style="background-color: red;"></div>
        </div>
        <div class="nocart_content" v-show="showNodata">
            <p style="text-align: center;"><img src="../../common/images/gouwuche@2x.png"></p>
            <div class="text">您的购物车还没有商品哦~</div>
            <router-link :to='{path: routerPath+"/index"}' class="btn">去逛逛</router-link>
        </div>
        <div class="footer" v-show="!showNodata">
             <!-- <div class="goods_order_operation">
                <button class="settlement" @click="goStatementOrDel()">{{bntTex}}</button>
            </div> -->
            <div class="goods_order_info">
                <div class="order_goods_cost">
                    <div class="order_money" style="margin-bottom: 3px;">
                        合计:<span>￥<span id="order_money">{{totalPrice}}</span>
                        </span>
                        (含税费:<span id="order_all_meony">{{totalSprice}}</span>)
                    </div>
                    <div class="order_notes">(税费金额以提交订单时应付总额明细为准)</div>
                </div>
            </div>
            <div class="goods_order_operation">
                <button class="settlement" @click="goStatementOrDel()">{{bntTex}}</button>
            </div>
        </div>
        <section class="coverpart" v-if="show">
            <section class="cover-background"></section>
            <section class="cover-content " :class="{'cover-animate' : isEnter, 'cover-animate-leave' : isLeave}">
                <h2>确定删除购物车</h2>
                <div class="sa-botton">
                    <button class="waiting" @click="ggcancelDel2">取消</button>
                    <div style="display:inline-block;">
                        <button class="quitlogin" @click="ggconfirmDel2">删除</button>
                    </div>
                </div>
            </section>
        </section>
        <!-- <rigister v-if="iszhuce"></rigister> -->
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>
    </div>
</template>

<script>
    import {mapState, mapMutations } from 'vuex'

    import headTop from 'base/head/head'
    import loading from 'base/loading/loading'
    // import Register from 'base/register/register'
    // import {loadMore, getImgPath } from 'src/components/common/mixin'
    import {showBack,animate, setStore, getStore} from 'common/js/utils'
    import { cartLists, addNumCart, deleteCart, checkCart, orderCheckDetail } from 'api'
    // import {cartLists, addNumCart, deleteCart,checkCart} from 'src/service/getData'
    import footGuide from 'base/footer/footGuide'
    import alertTip from 'base/alertTip/alertTip'
    // import {wxHideOptionMenu } from 'common/js/utils'
    import { rootPath } from 'config/env'
    import qs from 'qs'
    import sa from 'sa-sdk-javascript';

    export default {
        data() {
            return {
                routerPath:'',
                offset: 0,
                show: false, //显示确认提示框
                showAlert: false, //弹出框
                alertText: null, //弹出框信息
                preventRepeat: false, //防止重复获取
                showLoading: false, //显示加载动画
                cartList: [], //购物车列表
                ischeckdate: [], //获取选项框数据
                checkAll: false, //全选
                totalPrice: 0, //总价格
                totalSprice: 0, //总税费
                tempNum: 1, //某件商品原数量
                bntTex: '结算',
                editTex: '编辑',
                // shopname: '',
                showNodata: false, //是否显示购物车空
                showBackStatus: false, //显示返回顶部按钮
                preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
                nomore: false, //没有更多啦
                unchechcartid:[],//取消选中的购物车ID
                pram: {
                    id: '',
                    pagesize: 1000,
                    pageidx: 1
                }, 
                //数据请求参数
                addcartpram: {
                    productId: '',
                    num: 1,
                    isFromCartList: true,
                }, 
                //购物车商品数量修改请求参数
                confirmpram: {
                    cartIds: ''
                },
                // storeName: sessionStorage.storeName,
                storeName:'',
                msg:'',
                iszhuce : false,
                level:'',  //用户等级
            }
        },
        created() {
            this.showLoading = true;
            this.routerPath=rootPath;
            // wxHideOptionMenu();
        },
        mounted() {
            this.pram.a = 'v1/cartList'
            let params = qs.stringify(this.pram)
            cartLists(params).then(res => {
                console.log('购物车列表----')
                console.log(res);
                console.log(res.data.storeName)
                this.storeName = res.data.storeName
                this.msg = res.data.msg
                console.log(this.storeName)
                if(res.code!= "1" && res.code!= "-10"){
                    return;
                }
                this.showLoading = false;

                if (res.dataList.length == 0) {
                    this.showNodata = true;
                    this.showLoading = false;
                    return;
                }
                this.storeName = res.data.storeName
                this.cartList = res.dataList;
                // this.shopname = res.data.storeName;
                this.level = res.level  //新增用户等级

                // if (!this.storeName) {
                    // this.storeName = res.data.storeName;
                // }
                
                // for (let i = 0; i < this.cartList.length; i++) {
                //     for (var j = 0; j < uncheaksIds.length; j++) {
                //         if(this.cartList[i].cartId == uncheaksIds[j] ){
                //             this.cartList[i].ischecked = false;
                //         }
                //         console.log(this.cartList[i]);
                //     }
                // }

                // this.checkIsAll();
                this.calculation();

                //开始监听scrollTop的值，达到一定程度后显示返回顶部按钮
                showBack(status => {
                    this.showBackStatus = status;
                });
            })
        },
        // mixins: [loadMore, getImgPath],
        components: {
            headTop,
            footGuide,
            loading,
            alertTip,
            // Register
        },
        methods: {
            ...mapMutations([
                'SAVE_CART_ID'
            ]),
            //到达底部加载更多数据
            async loaderMore() {
                //防止重复请求
                if (this.pram.pageidx < this.pageMax) {
                    if (this.preventRepeatReuqest) {
                        return
                    }
                    this.showLoading = true;
                    this.preventRepeatReuqest = true;
                    let uncheaksIds=JSON.parse(getStore("unchechcartids"));
                    //数据的定位加20位
                    this.pram.pageidx = Number(this.pram.pageidx)+1;
                    goodsLists(this.pram).then(res => {
                        this.showLoading = false;
                        this.cartList = [...this.cartList, ...res.cartList];;
                        this.preventRepeatReuqest = false;
                        
                        for (var i = 0; i < this.cartList.length; i++) {
                            for(var j=0;j<uncheaksIds.length;j++){
                                if(this.cartList[i].cartId==uncheaksIds[j]){
                                    this.cartList[i].ischecked=false;
                                }
                            }
                        }
                        // this.checkIsAll();
                        if (res.cartList < 20) {
                            return
                        }
                       
                    })
                } else {
                    this.nomore = true;
                }
            },
            //返回顶部
            backTop() {
                animate(document.body, {
                    scrollTop: '0'
                }, 400, 'ease-out');
            },
            //去结算页面或者删除
            goStatementOrDel() {
                // let me = this;
                var cartIds = "";
                this.cartList.forEach(item => {
                    if (item.ischecked) {
                        cartIds += item.cartId + ",";
                    }
                });
                this.confirmpram.cartIds = cartIds.substring(0, cartIds.length - 1);
                console.log('购物车id--')
                console.log(this.confirmpram.cartIds)
                if (this.bntTex == "结算") {
                    this.showLoading = true;
                    if (this.confirmpram.cartIds != "") {
                        let params = qs.stringify(this.confirmpram)
                        console.log(params)
                        checkCart(params).then(res => {
                            console.log('购物车结算校验----')
                            console.log(res);
                            this.showLoading = false;
                            // 如果校验通过
                            if (res.code == "1") {
                                this.SAVE_CART_ID(this.confirmpram.cartIds);
                                this.$router.push({
                                    path: `${this.routerPath}/confirmOrder`,
                                    query: {
                                        isFromCart: true
                                    }
                                })
                                
                            } else {
                                this.showAlert = true;
                                this.alertText = res.msg;
                            }
    
                        })
                    } else {
                        this.showLoading = false;
                        this.showAlert = true;
                        this.alertText = "请选择需要结算的商品！";
                    }
                } else { //删除购物车
                    this.show = true;
                    this.isEnter = true;
                    this.isLeave = false;
                }
    
            },
            //二次弹窗 取消
            ggcancelDel2() {
                clearTimeout(this.timer)
                this.isEnter = false;
                this.isLeave = true;
                this.timer = setTimeout(() => {
                    clearTimeout(this.timer)
                    this.show = false;
                }, 200)
            },
            //二次弹窗 确定
            ggconfirmDel2() {
                this.isEnter = false;
                this.isLeave = true;
                this.timer = setTimeout(() => {
                    clearTimeout(this.timer)
                    this.show = false;
                }, 200);

                let params = qs.stringify({
                    cartIds: this.confirmpram.cartIds
                })
                deleteCart(params).then(res => {
                    console.log('删除购物车----');
                    console.log(res);

                    if (res.code == "1") {
                        window.location.reload();
                    } else {
                        this.showAlert = true;
                        this.alertText = res.msg;
                    }
                })
            },
            //全选或者取消全选
            docheckAll(i) {
                if (i == 0) {  // 取消全选
                    console.log('取消全选')
                    this.checkAll = false;

                    this._initPrice()

                    this.cartList.forEach(item => {
                        item.ischecked = false;
                    })

                    // this.checkIsAll();
                } else {  //全选
                    console.log('全选')
                    this.checkAll = true;

                    this._initPrice()

                    // console.log(this.cartList)
                    this.cartList.forEach(item => {
                        item.ischecked = true;
                        //计算总价 和总税费
                        this.totalPrice = parseFloat(this.totalPrice)
                        this.totalPrice += (parseFloat(item.price).toFixed(2) * 100 * parseFloat(item.productNumber) / 100);
                        // this.totalSprice += (parseFloat(item.tax) * parseFloat(item.quantity));
                        // this.totalSprice = 0
                    })
                     // this.totalPrice += this.totalSprice;
                    this.totalPrice = this.totalPrice.toFixed(2);
                    // this.totalSprice = this.totalSprice.toFixed(2);
                    //this.checkIsAll();
                    // this.calculation();
                }
            },
            docheck(item, actionType) {
                if (actionType == 'EDIT') {
                    item.ischecked = true
                } else {
                    item.ischecked = !item.ischecked;
                }
                // this.checkIsAll();
                //计算总价 和总税费
                this.calculation();
            },
            //商品数量减少
            subtraction(item) {
                if (parseInt(item.productNumber) > 1) {
                    //item.ischecked = true;
                    this.tempNum = item.productNumber;
                    //item.productNumber -= 1;
                    item.productNumber = Number(item.productNumber) - 1;
                    //this.checkIsAll();
                    //this.calculation();
                    //保存数量
                    this.addcartpram.num = item.productNumber;
                    this.addcartpram.productId = item.productId;
                    this.addcartpram.productSpecId = item.productSpecId;
                    this.doAddNumCart(item);
                    this.docheck(item, 'EDIT');
                }
            },
            //商品数量添加
            add(item) {
                console.log(item.productNumber)
                console.log(item.stockNumber)
                if (parseInt(item.productNumber) < parseInt(item.stockNumber)) { //小于库存
                    if (item.productType == '2' && item.productNumber >= 20) { //跨境商品不能超过20个
                        this.showAlert = true;
                        this.alertText = '加入购物车的跨境商品数量最大不可超过20个!'
                        return;
                    }
                    //item.ischecked = true;
                    this.tempNum = item.productNumber;
    
                    item.productNumber = Number(item.productNumber) + 1;
                    //this.checkIsAll();
                    //this.calculation();
                    // this.productNumber
                    //保存数量
                    this.addcartpram.num = item.productNumber;
                    this.addcartpram.productId = item.productId;
                    this.addcartpram.productSpecId = item.productSpecId;
                    this.doAddNumCart(item);
                    this.docheck(item, 'EDIT')
                } else {
                    this.showAlert = true;
                    this.alertText = '此商品没有更多库存！'
                }
    
            },
            //检查是否已经全选了
            checkIsAll() {
                // this.checkAll = true;
                // this.unchechcartid=[];

                // for (let i = 0; i < this.cartList.length; i++) {
                //     if (!this.cartList[i].ischecked) {
                //         if (this.checkAll) {
                //             this.checkAll = false;
                //         }
                //         this.unchechcartid.push(this.cartList[i].cartId);
                //        // break;
                //     } 
                // }
                // setStore("unchechcartids",this.unchechcartid);
                //console.log(this.unchechcartid);
            },
            //计算税费和总价
            calculation() {
                this._initPrice()
                
                this.cartList.forEach(item => {
                    if (item.ischecked == true) {
                        this.totalPrice = parseFloat(this.totalPrice)
                        this.totalPrice += (parseFloat(item.price) * parseFloat(item.productNumber));
                        // this.totalSprice += (parseFloat(item.tax) * parseFloat(item.quantity));
                        // this.totalSprice = 0;
                    }
                })
                // this.totalPrice += this.totalSprice;
                // this.totalPrice = this.totalPrice.toFixed(2);
                // this.totalSprice = this.totalSprice.toFixed(2);
            },
            //编辑或者完成
            editEnv() {
                // 编辑
                if (this.editTex == "编辑") {
                    this.editTex = "完成";
                    this.bntTex = '删除';

                    // this._initPrice()

                    // this.checkAll = false;
                    this.cartList.forEach(item => {
                        // item.ischecked = false;
                    })
                } else {  // 完成
                    this.editTex = "编辑";
                    this.bntTex = '结算';
                    // this.checkAll = true;
                    // this.cartList.forEach(item => {
                    //     item.ischecked = true;
                    // });
                    // let uncheaksIds=JSON.parse(getStore("unchechcartids"));
                    // for (var i = 0; i < this.cartList.length; i++) {
                    //     for(var j=0;j<uncheaksIds.length;j++){
                    //         if(this.cartList[i].cartId==uncheaksIds[j]){
                    //             this.cartList[i].ischecked=false;
                    //             if(this.checkAll){
                    //                 this.checkAll = false;
                    //             }
                                
                    //         }
                    //     }
                    // }
                    //this.checkIsAll();
                    //计算总价 和总税费
                    this.calculation();
                }
    
            },
            //获取焦点时临时保存该商品的数量
            inputFocus(item) {
                this.tempNum = item.productNumber;
            },
            //商品数量框失去焦点
            inputBlur(item) {
                // console.log(item)
                //console.log(this.tempNum);
                ///if (item.productNumber < item.stockNumber) { //小于库存
                if (item.productType == '2' && item.productNumber > 20) { //跨境商品不能超过20个
                    this.showAlert = true;
                    this.alertText = '加入购物车的跨境商品数量最大不可超过20个!'
                    item.productNumber = this.tempNum;
                    return;
                }
               // item.ischecked = true;
               // this.checkIsAll();
               // this.calculation();
                //保存数量
                this.addcartpram.num = item.productNumber;
                this.addcartpram.productId = item.productId;
                this.addcartpram.productSpecId = item.productSpecId;
                this.doAddNumCart(item);
                // } else {
                //     item.quantity = this.tempNum;
                //     this.showAlert = true;
                //     this.alertText = '此商品暂无库存！'
                // }
            },
            //添加购物车或者修改购物车商品数量
            doAddNumCart(item) {
                let params = qs.stringify(this.addcartpram)
                console.log(this.addcartpram)
                addNumCart(params).then(res => {
                    console.log('修改购物数量----')
                    console.log(res);

                    if (res.code == "0") { //成功
                        item.quantity = this.tempNum;
                        this.showAlert = true;
                        this.alertText = res.msg;
                    }
                });
            },
            _initPrice(){
                this.totalPrice = '0.00';
                this.totalSprice = '0.00';
            },
            // 跳转详情页
            goDetail(item){
                // 判断是否是秒杀商品
                if(item.isSeckillProduct == 1 && this.level == 1){
                    this.showAlert = true;
                    this.alertText = "您选购的商品,正在参与秒杀活动,升级经销商可以更优惠的价格进行购买"
                }else{
                    this.$router.push({
                        path: `${this.routerPath}/productDetail`,
                        query: {
                            productId:item.productId,
                        }
                    })
                }
            }
        },
        watch: {
            storeName(val) {
                // console.log(val)
                val !='' ? document.title=val : document.title='购物车'

                // sa.track('$pageview', {
                //   $title: document.title,
                //   $url: location.href,
                //   $url_path: location.pathname,
                //   $referrer_host: location.hostname,
                //   $referrer: document.referrer,
                // })
            },
            // 监听全选
            //  checkAll:function (value){
            //     if(value){
            //          this.cartList.forEach(item => {
            //            item.ischecked=true;
            //         })
            //     }else{
            //          this.cartList.forEach(item => {
            //            item.ischecked=false;
            //         })
            //     }
            // }

            // this.totalPrice += (item.price * item.quantity);
            // this.totalSprice += (item.tax * item.quantity);
        }
    }
</script>
  
<style lang="css" scoped>
    @import 'cart';
</style>
