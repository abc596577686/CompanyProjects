<template>
    <div class="order_detail_page">
        <div v-title data-title="确认订单"></div>
        <div v-stat="{type:'pageview', title:'确认订单'}"></div>
        
        <!-- <lazy-render :time="300" style="margin-bottom: 60px;"> -->
        <div v-show="!showLoading">
            <div class="bg_white">
                <div class="assd order_assd2 clearfix" @click="goAddress()" style="width:100%;border:none"> 
                    <div class="assd_icon assd_icon2">
                        <span class="location_icon">&nbsp;</span>
                    </div>
                    <div v-show="addressInfo.isEmpty==1" class="assd_info assd_info-top" style="margin-top: 16px;padding-top: 20px;">
                        暂无收货人资料，请添加
                    </div>
                    <div v-show="addressInfo.name" class="assd_info assd_info3">
                        <!-- <span class="info_names">收件人:</span> -->
                        <span class="info_phone info_phones">{{addressInfo.name?addressInfo.name:''}}</span>
                        <span calss='info_phonecode'>{{addressInfo.mobile?addressInfo.mobile:''}}</span>
                        <p class="info_txt" style="height:auto">{{addressInfo.address?addressInfo.address:''}}</p>
                        <p v-if = "addressInfo.isEmpty=='0' && addressInfo.isValidIdentity=='0'" class="info_txt" style="color:#FB4A4C;font-size:0.5rem;">{{addressInfo.msg}}</p> 
                        <!-- <p class="info_txt" style="color:#FB4A4C;font-size:0.5rem;margin-left: -0.213rem;">（未上传订购人信息）</p> -->
                        <p v-if = "addressInfo.isEmpty=='0' && addressInfo.isValidIdentity=='1'" class="info_txt" style="color:#666666;font-size:0.5rem;"><span>订购信息</span> <span>{{addressInfo.realName?addressInfo.realName:''}}</span> <span>{{addressInfo.identityNo?addressInfo.identityNo:''}}</span></p>
                        <!-- <p v-show="islesstip" class="info_txt" style="color:#fe5000;font-size:0.5rem;margin-left: -0.213rem;">（未上传实名身份信息）</p> -->
                    </div>
                    <div class="assd_right_icon">
                        <span class="icon-go icon_a" style="line-height:60px;"></span>
                    </div>
                </div>
                <!-- <div class="hint_info_span">根据国家海关要求，购买保税仓及海外直邮商品，必须上传个人实名信息，并且保证与收货人信息的一致</div> -->
            </div>
            <div class="showTit">
                根据国家海关要求，购买保税仓及海外直邮商品，必须上传个人实名信息，并保证与收货人信息的一致。
            </div>
            <div class="payType">
                <div class="payTypeImg1">
                    <img src="../../common/images/webcatpay.png">
                </div>
                <span class="paytxt1">微信支付</span> 
                <span class="paytxt2">(推荐)</span> 
                <div class="payTypeImg2">
                    <img src="../../common/images/dagou2@2x.png">
                </div>
            </div>
            <!-- <div class="top" style="background:#fff;">
                <span class="store_icon"></span>
                <p>店铺：{{orderInfo.storeName}}</p>
            </div> -->
            <div class="list_info bg_white" style="border-top: 10px solid #eee;">
                <ul>
                    <li class="info_li" v-for="item in orderInfo.productList">
                        <a> 
                            <div class="info_lidiv" style="position: relative;">
                                <div class="info_imgdiv">
                                    <img :src="item.imageUrl" class="info_img">
                                </div>
                                <p class="shop_txt">{{item.productName}}</p> 
                                <div class="product_tag">{{item.productTags}}</div>
                                <div class="info_price_num">x{{item.productNumber}}</div>
                                <p class="info_price">¥{{item.price}}</p>
                                <!-- </div>  -->
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="coupons" style="border-top: 10px solid #eee;" @click="goCouponListEnv">
                优惠券
                <span class="couponsSp" v-if="orderInfo.useCouponId=='-1'">未使用优惠券</span>
                <span class="couponsSp" v-if="orderInfo.useCouponId!='-1'  && coupon.availableCouponList && coupon.availableCouponList.length=='0'">无可用优惠券</span>

                <!-- <span class="couponsSp" v-show="orderInfo.useCouponId!='-1' && coupon.availableCouponList.length != '0'">{{orderInfo.preferentialAmount?orderInfo.preferentialAmount:''}}</span>  -->

                <span class="couponsSp" v-if="orderInfo.useCouponId!='-1' && coupon.availableCouponList && coupon.availableCouponList.length != '0'">{{orderInfo.preferentialAmount?'-￥' + orderInfo.preferentialAmount:''}}</span> 

                <span class="icon-go icon_a" style="line-height:60px;top:-12px"></span>  
            </div>
            <!-- <div class="payment_info bg_white" style="border-top: 10px solid #eee;">
                <p>运费<span>¥{{orderInfo.postage}}</span></p>
                <p class="clear_order_goods_format"></p>
                <p>进口税<span>¥{{orderInfo.tax}}</span></p>
                <p class="clear_order_goods_format"></p>
                <p class="yf">实际付款（含运费）<span class="yf_span">¥{{orderInfo.orderAmount}}</span></p>
            </div> -->
            <!-- <div class="ui_list bg_white">
                <a name="buy_way"></a>
                <ul>
                    <li class="ui_list_li b ui_list_li_2" style="border-bottom:none;">配送方式
                        <span class="icon-go icon_a" style="top:-7px;"></span>
                        <span class="choose" data-type="express">快递配送</span>
                    </li>
                </ul>
            </div> -->

            <!--新增分类价格显示  -->
            <div class="pricelist" style="border-top: 10px solid #eee;height: 60px;">
                商品合计
                <span class="listsp">{{orderInfo.productAmount==''?'':'¥' + orderInfo.productAmount}}</span> 
            </div>
            <div class="pricelist" style="border-top: 1px solid #eee;">
                运费
                <span class="listsp">{{orderInfo.postage ==''?'':'¥' + orderInfo.postage}}</span> 
            </div>
            <div class="pricelist" style="border-top: 1px solid #eee;">
                进口税
                <span class="listsp">{{orderInfo.tax ==''?'':'¥' + orderInfo.tax}}</span>
            </div>
            <div class="pricelist" style="border-top: 1px solid #eee;">
                优惠券
                <span class="listsp">{{orderInfo.preferentialAmount==''?'': '-' + '¥' + orderInfo.preferentialAmount}}</span> 
            </div>
            <div class="pricelist" style="border-top: 1px solid #eee;">
                总金额
                <span class="listsp">{{orderInfo.orderAmount==''?'':'¥' + orderInfo.orderAmount }}</span> 
            </div>
            <!--发货须知  -->
            <div class="tipInfo">
                <div class="tipImg1">
                    <img src="../../common/images/keyy.png" alt="error">
                </div>
                <div class="getTip">发货须知：跨境商品统一工作日发货</div>
            </div>
            <!--底部白框  -->
            <div class="coverdiv"></div>
            <transition name="fade">
                <div class="cover" v-if="showPayWay || registeredControl"></div>
                <div class="cover1" v-if="iss"></div>
            </transition>
            <!--收货地址填写提示框  -->
            <section class="registeredDiv" v-if="registeredControl">
                <h3 class="title">提示</h3>
                <div class="registerMain">
                    <p>你当前还未设置收货地址,请前往设置收货地址</p>
                </div>
                <div class="bottomBtn">
                    <div class="btn registerBtn1" @click="closeRegister1">取消设置</div>
                    <div class="btn registerBtn2" @click="closeRegister2">前往设置</div>
                </div>
            </section>

            <transition name="slid_up">
                <div class="choose_type_Container" v-if="showPayWay">
                    <div class="choose_type_Container" v-if="showPayWay">
                        <div class="pay_msg1">
                            <span>请选择支付方式</span>
                            <img src="../../common/images/icon_guanbi@2x.png" @click="showPayWayFun">
                        </div>
                        <div class="pay_msg pay_msg2">
                            <span class="order_time_msg">请在72小时内完成支付</span>
                            <span class="order_money">¥{{orderInfo.payAmount}}</span>
                        </div>
                        <div class="pay_msg pay_msg5" style="display:block;">
                            <img class="pay_icon" src="../../common/images/webcatpay.png">
                            <span class="pay_text">微信支付（推荐）</span>
                            <img class="pay_select_icon" v-if="payType==0" @click="surePayway(1)" src="../../common/images/icon_dagou@2x.png">
                            <img class="pay_select_icon" v-if="payType!=0" @click="surePayway(0)" src="../../common/images/icon_yuan@2x.png">
                        </div>
                        <div class="pay_msg pay_msg5" style="display:block;">
                            <img class="pay_icon" src="../../common/images/icon_union.png">
                            <span class="pay_text">美付宝快捷支付</span>
                            <img class="pay_select_icon" v-if="payType==1" @click="surePayway1(0)" src="../../common/images/icon_dagou@2x.png">
                            <img class="pay_select_icon" v-if="payType!=1" @click="surePayway1(1)" src="../../common/images/icon_yuan@2x.png">
                        </div>
                         <!-- <div class="pay_msg pay_msg2" @click="showAlipay">
                            <span class="order_time_msg" style="color:#999">更多支付方式</span>
                            <span class="order_money" style="color:#999"> <img src="../../common/images/arrowdown.png" width="20"></span>
                        </div> -->
                        <!-- <div class="pay_msg pay_msg5" v-show="alipay" style="display:block;">
                            <img class="pay_icon" src="../../common/images/zhifubao.png">
                            <span class="pay_text">支付宝支付</span>
                            <img class="pay_select_icon" v-if="payType==1" @click="surePayway(0)" src="../../common/images/icon_dagou@2x.png">
                            <img class="pay_select_icon" v-if="payType!=1" @click="surePayway(1)" src="../../common/images/icon_yuan@2x.png">
                        </div>  -->
                        <div class="pay_msg6">
                            <div class="pay_button" @click.stop="submitPay2()">确认支付</div>
                        </div>
                    </div>
                </div>
            </transition>
            <transition name="fade">
                <section class="activities_details" v-if="showActivities">
                    <div class="ui_listh">
                        <ul>
                            <li class="ui_list_li a address_edit_name"><input type="text" placeholder="请填写收货人" maxlength="20" v-model="checkpram.name"></li>
                            <li class="ui_list_li a address_edit_tel"><input type="tel" placeholder="请填写联系电话" maxlength="20" v-model="checkpram.mobile"></li>
                        </ul>
                    </div>
                    <div class="my_address_but">
                        <button @click.stop.prevent="showActivitiesFun">确定</button>
                    </div>
                </section>
            </transition>
            <div class="foot">
                <!-- <span class="foot_num">共{{orderInfo.totalNumber}}件</span> -->
                <span class="foot_prprice">应付:<label>¥{{orderInfo.payAmount}}</label></span>
                <!-- <button class="foot_sub" style="" @click="sureOrder">确认订单</button> -->
                <button class="foot_sub" @click.stop="submitPay()">确认订单</button>
            </div>
            <loading-toast v-if="showLoadingToast" @closeTip="showLoadingToast = false" :loadingText="loadingText"></loading-toast>
            </div>

            <!--补充信息  -->
            <div class="registered" v-show="iszhuce1">
                <div class="name">订购人实名认证</div>
                <div class="nametip">
                     <img src="../../common/images/keyy.png" alt="error" class="nametipImg">     
                    海关要求购买跨境商品需提供实名信息
                </div>
                <span class="cvoerhide"></span>
                <!--关闭  -->
                <div class="coverClose" @click="closeDiv"></div>  
                <div class="close" @click="closeDiv">
                    <img src="../../common/images/closediv.png" alt="error">
                </div>
                <!--姓名  -->
                <input id="phone" type="text" class="phone" v-model="namecode" placeholder="您的姓名">
                <!--身份证号  -->
                <input id="phone_code" class="number" type="text" v-model="peocode" placeholder="您的身份证号(将按加密处理)">
                <div class="openWhy" @click="openWhy()">了解实名认证</div>
                <!--确认注册  -->
                <div class="sure" @click="getTip()">提交</div>
            </div>

            <!--补充信息带身份证  -->
            <div class="registered1" v-show="iszhuce2">
                <div class="name">订购人实名认证</div>
                <div class="nametip">
                     <img src="../../common/images/keyy.png" alt="error" class="nametipImg">     
                    海关要求购买跨境商品需提供实名信息
                </div>
                <span class="cvoerhide"></span>
                <!--关闭  -->
                <div class="coverClose" @click="closeDiv"></div> 
                <div class="close" @click="closeDiv">
                    <img src="../../common/images/closediv.png" alt="error">
                </div>
                <!--姓名  -->
                <input id="phone" type="text" class="phone" v-model="namecode" placeholder="您的姓名">
                <!--身份证号  -->
                <input id="phone_code" class="number" type="text" v-model="peocode" placeholder="您的身份证号(将按加密处理)">
                <div class="nametip2">请上传身份证正反面共两张照片</div>
                <!--正面  -->
                <div class="peoCardImg1">
                    <input type="file" ref="file1" value=""  id="file1"  name='file' @change='onUpload1'> 
                    <div class="uploadcover" :class="{active:isShow1}" @click="uploadEnv1">
                        <img src='../../common/images/uploadimg.png' style="width:100%;height:100%;">
                    </div>
                    <div class="upload" :class="{active:isShow2}">
                        <img :src="peoCardImg1" style="width:100%;height:100%;">
                    </div>
                </div>
                <!--反面  -->
                <div class="peoCardImg2">
                    <input type="file" ref="file2" value=""  id="file2"   name='file' @change='onUpload2'>
                    <div class="uploadcover" :class="{active:isShow3}" @click="uploadEnv2">
                        <img src='../../common/images/uploadimg.png' style="width:100%;height:100%;">
                    </div>
                    <div class="upload" :class="{active:isShow4}">
                        <img :src="peoCardImg2" style="width:100%;height:100%;">
                    </div>
                </div>
                <div class="openWhy" @click="openWhy()">了解实名认证</div>
                <!--确认注册  -->
                <div class="sure" @click="getTip()">提交</div>
            </div>

        <!-- </lazy-render> -->
        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>
        <!-- <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition> -->
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
        <div class="cover22" v-if="showCover"  @click.self="closeCover"> 
            <div><img class="ercode" :src="ercode"></div>
        </div>
        <!-- whyshow rz -->
        <div class="why" v-if="iss">
            <div class="why1">
                为什么需要实名认证？
                <div class="whhImg" @click="closeWhy()">
                    <img src="../../common/images/closediv.png">
                </div>
            </div>
            <div class="why2">
                <div>订购人可以为自己或他人购买跨境商品（订购人可以和收货人不为同一人）</div>
                <div>根据海关要求订购人的真实姓名和身份证号必须真实且一致否则无法通过海关清关 </div>
                <div>你的身份证信息将加密保管，平台将保证信息安全，绝不对外泄露</div>
            </div>
            <button class="whyBtn" @click="closeWhy()">我知道了</button>
        </div>
    </div>
</template>

<script>
    import { mapState, mapMutations, } from 'vuex'
    // import {getImgPath} from 'src/components/common/mixin'
    import { orderCheckDetail, orderConfrim, orderPay, updateOrderPayRecode ,updateAddress ,webUploadImage ,inviteAgentConfrim } from 'api'
    import qs from 'qs'
    // import {orderCheckDetail,orderConfrim,orderPay,updateOrderPayRecode} from 'src/service/getData'
    import loading from 'base/loading/loading'
    import alertTip from 'base/alertTip/alertTip'
    import loadingToast from 'base/loadingToast/loadingToast'
    import {isWeiXin } from 'common/js/utils'
    import { rootPath } from 'config/env'
    import axios from 'axios'
    import storage from 'good-storage'
    import { baseUrl } from 'config/env'
    import sa from 'sa-sdk-javascript';

    const COUPON_ID = 'couponId'
    const COUPON_NAME = 'couponName'
    const COUPON_AMOUNT = 'couponAmount'
    const COUPONS = 'coupons'
    
    export default {
        data() {
            return {
                iss: false,
                isShow1 :false,
                isShow2 :true,
                isShow3 :false,
                isShow4 :true,
                islesstip:false,
                peoCardImg1:'',  
                peoCardImg2:'',
                returnUrl1:'',
                returnUrl2:'',
                namecode:'',
                peocode:'',
                iszhuce1 : false,   //不带身份证注册框显示
                iszhuce2 : false,   //带身份证注册框显示
                routerPath:'',
                showLoading: true, //显示加载动画
                orderData: null,
                preventRepeat: false,
                showPayWay: false, //显示付款方式
                payType: 0, //付款方式 0-微信 1-支付宝
                alipay: false, //现在支付宝支付
                showActivities: false, //是否显示提货人信息
                showAlert: false, //弹出框
                alertText: null, //弹出框信息
                showLoadingToast:false,//显示loadingToast
                loadingText:'',//loadingTost 提示信息
                checkpram: {
                    a:'v1/orderCheckDetail',
                    cartIds: '',
                    buyWarType: '0',
                    postType: 1,
                    addressId: '',
                    // mobile: '',
                    // name: '',
                    number: 1,
                    productId: '',
                    userCouponId :'0',   //优惠券id
                    productSpecId : '',   //商品规格id
                    storeId:'',
                },
                orderInfo: {}, //订单信息
                coupon:{},
                addressInfo: {}, //地址信息
                showCover:false,
                ercode:'',//二维码
                storeName:sessionStorage.storeName,
                phonecode:'', //用户手机号
                price:{},   //价格
                registeredControl:false, //填写收货框控制
                ispackage :'',   //是否是大礼包
                // addressInfo:{},//地址信息
                getAddressId:'',
                orderId:'',
            }
        },
        mounted() {

            if (storage.get(COUPON_ID)) {
                this.checkpram.userCouponId = storage.get(COUPON_ID)
            }

            this.checkpram.productSpecId = this.$route.query.productSpecId;   //商品规格id
            this.checkpram.groupProductInfo = this.$route.query.groupProductInfo
            
            if (this.$route.query.id != undefined && this.$route.query.id != "") {
                this.checkpram.productId = this.$route.query.id;
                this.checkpram.number = this.$route.query.num;
                this.checkpram.productSpecId = this.$route.query.productSpecId;
                this.checkpram.postType = 0;

            } else {
                this.checkpram.cartIds = this.cart_id;
            }
            this.routerPath = rootPath; 
            if (this.choosedAddress) {
                this.checkpram.addressId=this.choosedAddress.addressId;
            }
            // 获取地址id 
            // this.checkpram.addressId = res.addressInfo.addressId
            
            // 打印查看addressId
            console.log('addressId如下----')
            console.log(this.checkpram.addressId)
            this.initData();
            // console.log(this.choosedAddress)
            // console.log(this.routerPath)
        },
        // mixins: [getImgPath],
        components: {
            loading,
            alertTip,
            loadingToast
        },
        computed: {
            ...mapState([
                'cart_id', 'choosedAddress'
            ])
        },
        methods: {
            openWhy(){
                this.iss = true
            },
            closeWhy(){
                this.iss = false
            },
            uploadEnv1() {
                // console.log('正面')
                this.$refs.file1.dispatchEvent(new MouseEvent('click'))
            },
            uploadEnv2() {
                // console.log('反面')
                this.$refs.file2.dispatchEvent(new MouseEvent('click'))
            },
            goCouponListEnv(){
                this.$router.push({
                    path: this.routerPath + '/coupon',
                    query: {
                        productId: this.checkpram.productId,
                        postType: this.checkpram.postType,
                        number: this.checkpram.number,
                        useCouponId: this.useCouponId
                    }
                })
            },
            // 上传身份证正面
            onUpload1:function(e){    
                // let me = this
                let file = e.target.files[0];           
                let params = new FormData(); 
                params.append('file',file,file.name);
                params.append('chunk','0');
                // params.append("base64str", base64Str);
                // console.log(params)
                // console.log(params.get('file')); 
                this.showLoading = true   
                webUploadImage(params).then(res => {
                    console.log('上传正面图片后返回数据----')
                    console.log(res);
                    this.isShow1 = true
                    this.isShow2 = false
                    this.peoCardImg1 = baseUrl + 'upload' + res.userImage
                    this.showLoading = false
                    this.returnUrl1 = res.userImage
                })
            },
            onUpload2:function(e){    
                // let me = this
                let file = e.target.files[0];           
                let params = new FormData(); 
                params.append('file',file,file.name);
                params.append('chunk','0');
                // params.append("base64str", base64Str);
                // console.log(params.get('file'));   
                this.showLoading = true      
                webUploadImage(params).then(res => {
                    console.log('上传背面图片后返回数据----')
                    console.log(res);
                    this.isShow3 = true
                    this.isShow4 = false
                    this.peoCardImg2 = baseUrl + 'upload' + res.userImage
                    this.showLoading = false
                    this.returnUrl2 = res.userImage
                })
            },
            // 关闭注册框
            closeDiv(){
                this.iszhuce1 = false;
                this.iszhuce2 = false;
            },
            // 确认补充信息
            getTip(){
                // if(this.returnUrl1 == '' || this.returnUrl2 == ''){
                // }else{
                // }
                let params = qs.stringify({
                    // addressId : this.checkpram.addressId,
                    addressId : this.addressInfo.addressId,
                    identityName : this.namecode ,
                    identityNo :  this.peocode ,
                    identityFrontRelative : this.returnUrl1 ,
                    identityBackRelative : this.returnUrl2 ,
                    productType : this.orderInfo.productType ,
                })
                updateAddress(params).then(res => {
                    if(res.code == 1 ){
                        this.iszhuce1 = false;
                        this.iszhuce2 = false;

                        this.showAlert = true;
                        this.alertText = res.msg;
                        
                        this.initData()
                    } else {
                        this.showAlert = true;
                        this.alertText = res.msg;
                    }
                })
            },
            initData() {
                // if(!this.cart_id){
                //     this.showAlert = true;
                //     this.alertText = "参数错误！";
                //     this.showLoading = false;
                //     return;
                // }
                this.checkpram.a = 'v1/orderCheckDetail'
                // console.log(this.checkpram)
                let params = qs.stringify(this.checkpram)
                // console.log(this.params)

                orderCheckDetail(params).then(res => {
                    this.showLoading = false;
                    console.log('订单详情----');
                    console.log(res);

                    if (res.code == "1") {
                        // this.getAddressId = res.addressInfo.addressId
                        // console.log(this.getAddressId)

                        // this.kehuName = res.data.nickName
                        this.namecode = res.addressInfo.realName
                        this.peocode = res.addressInfo.identityNo
                        this.checkpram.userCouponId = res.data.useCouponId,
                        this.checkpram.storeId = res.data.storeId,  
                        this.addressInfo = res.addressInfo,
                        this.ispackage = res.data.isInviteProduct,
                        this.phonecode = res.addressInfo.mobile
                        this.orderInfo = res.data
                        this.coupon = res.coupon
                        this.ispackage = res.data.isInviteProduct;
                        this.useCouponId = res.data.useCouponId
                        storage.set(COUPONS, res.coupon)

                        if(this.storeName == undefined){
                            this.storeName = this.orderInfo.storeName;
                        }
                        // if(res.addressInfo){
                        //     this.addressInfo = res.addressInfo;
                        // }
                        // if (this.choosedAddress) {
                        //     this.addressInfo = this.choosedAddress;
                        // }                        
                    } else {
                        // this.$router.go(-1);
                    }
                });
            },
            goAddress() {
                this.preventRepeat = false;
                this.$router.push({
                path: this.routerPath+'/chooseAddress',
                    query: {
                        from:"confirm",
                        type:this.orderInfo.productType,
                        id: this.$route.query.id,
                        productSpecId: this.$route.query.productSpecId,
                        groupProductInfo: this.$route.query.groupProductInfo,
                        num: this.$route.query.num,
                    }
                });
            },
            showPayWayFun() {
                this.showPayWay = !this.showPayWay;
                // console.log(this.orderId)
                this.$router.push({   //取消支付 去往待支付订单详情页
                    path:  this.routerPath+'/order/orderDetail',
                    query: {
                        id: this.orderId
                    }
                });
            },
            //确认订单，先检查商品是否跨境，身份证是否上传
            sureOrder() {
                // var mproductType = this.orderInfo.productType;    //商品类别 1-国内 2-跨境 3-直邮
                // var addressId = this.addressInfo.addressId;
                // var isValidIdentity = this.addressInfo.isValidIdentity;

                // if (this.checkpram.buyWarType != 1 && addressId == '') {
                //     this.showAlert = true;
                //     this.alertText = "没选择收货地址！";
                //     return;
                // }else if (mproductType == "2" && this.checkpram.buyWarType == 0) {
                //     // alert(1)
                //     if (isValidIdentity == '0') {
                //         this.showAlert = true;
                //         this.alertText = "跨境商品需要上传身份证号！请前往添加！";
                //         this.iszhuce1 =true;
                //         return;
                //     }
                // } else if (mproductType == "3"&& this.checkpram.buyWarType == 0) {
                //     // alert(2)
                //     if (isValidIdentity == '0') {
                //         this.showAlert = true;
                //         this.alertText = "直邮商品需要上传身份证号及身份证正反面！请前往添加！";
                //         this.iszhuce2 =true;
                //         return;
                //     }
                // }else if(this.checkpram.buyWarType == 1){
                //     if(this.checkpram.name==""||this.checkpram.mobile==""){
                //         this.showAlert = true;
                //         this.alertText = "请填写完整的提货人信息！";
                //         return;
                //     }
                // }
                
                // this.showPayWay = !this.showPayWay;
            },
            //选择付款方式
            surePayway(type) {
                console.log(type)
                if (type == "1") {
                    this.alipay = true;
                }
                this.payType = 0;

            },
            surePayway1(type) {
                console.log(type)
                if (type == "1") {
                    this.alipay = true;
                }
                this.payType = 1;
                
            },
            showAlipay() {
                this.alipay = !this.alipay;
                if( this.alipay){
                    this.payType = 1;
                }else{
                    this.payType = 0;
                }
            },
            //前往填写提货信息
            goAddGetInfo() {
                this.$router.push({
                    path: '/takeInfo'
                });
            },
            //控制提货人信息页的显示隐藏
            showActivitiesFun() {
                this.showActivities = !this.showActivities;
            },
            submitPay() {
                var mproductType = this.orderInfo.productType;    //商品类别 1-国内 2-跨境 3-直邮
                var addressId = this.addressInfo.addressId;
                var isValidIdentity = this.addressInfo.isValidIdentity;


                if (this.checkpram.buyWarType != 1 && addressId == '') {
                    this.registeredControl = true
                    // this.showAlert = true;
                    // this.alertText = "没选择收货地址！";
                    return;
                }else if (mproductType == "2" && this.checkpram.buyWarType == 0 && isValidIdentity == '0') {
                    // console.log(1)
                    // this.showAlert = true;
                    // this.alertText = "跨境商品需要上传身份证号！请前往添加！";
                    this.iszhuce1 =true;
                    return;
                }else if (mproductType == "3" && this.checkpram.buyWarType == 0 && isValidIdentity == '0') {
                    // console.log(2)
                    // this.showAlert = true;
                    // this.alertText = "直邮商品需要上传身份证号及身份证正反面！请前往添加！";
                    this.iszhuce2 =true;
                    return;
                }else if(this.checkpram.buyWarType == 1){
                    // console.log(3)
                    if(this.checkpram.name==""||this.checkpram.mobile==""){
                        this.showAlert = true;
                        this.alertText = "请填写完整的提货人信息！";
                        return;
                    }
                }else{
                    let me = this;
                    if (this.payType == 0) {   //微信支付
                        let me = this;
                        // 优先判断是否有收货地址
                        if(this.addressInfo.isEmpty == 1){  //如果未填写过地址信息 跳出弹窗提示
                            this.registeredControl = true;
                            return
                        }else{    //收货地址不为空

                            if (me.checkpram.buyWarType == "0") {
                                me.checkpram.addressId = me.addressInfo.addressId;
                            }
                            let params = qs.stringify(me.checkpram)

                            if (this.ispackage == 1){  //大礼包支付
                                inviteAgentConfrim(params).then(res => {
                                    if (res.code == "1") {   //大礼包商品特殊支付
                                        this.orderId = res.orderId
                                        this.showPayWay = !this.showPayWay; //唤起支付框
                                    } else {  
                                        me.showLoadingToast=false;
                                        me.showAlert = true;
                                        me.alertText = res.msg;
                                    }
                                });
                            }else{    //正常商品支付
                                orderConfrim(params).then(res => {
                                    if (res.code == "1") {
                                        this.orderId = res.orderId
                                        this.showPayWay = !this.showPayWay; //唤起支付框
                                    } else {
                                        me.showLoadingToast=false;
                                        me.showAlert = true;
                                        me.alertText = res.msg;
                                    }
                                });
                            }
                        }
                    }
                }
            },
            submitPay2(){
                let me = this;
                me.showLoadingToast=true;
                me.loadingText="订单正在提交....";
                let paybo = {
                    orderId: this.oprOrderId,
                    isWeb: true
                }
                if(this.payType == 1){  //美付宝支付方式
                    let me = this;
                        // 优先判断是否有收货地址
                        if(this.addressInfo.isEmpty == 1){  //如果未填写过地址信息 跳出弹窗提示
                            this.registeredControl = true;
                            return
                        }else{    //收货地址不为空
                            me.showLoadingToast=true;
                            me.loadingText="订单正在提交....";
                            //me.showLoading = true;
                            if (me.checkpram.buyWarType == "0") {
                                me.checkpram.addressId = me.addressInfo.addressId;
                            }

                            let params = qs.stringify(me.checkpram)
                            if (this.ispackage == 1){
                                console.log('当前是大礼包支付')
                                inviteAgentConfrim(params).then(res => {
                                if (res.code == "1") {   //大礼包商品特殊支付
                                    let paybo = {
                                        orderId: res.orderId,
                                        isWeb: true
                                    }
                                    if (this.payType == 0) {
                                        paybo.payType = "weixin";
                                    }
                                    let params = qs.stringify(paybo)
                                    orderConfrim(params).then(res2 => {
                                        me.$router.push({path: me.routerPath+'/yytOrderDetail',query:{orderId:res.orderId,price:res.amount,num:res.orderNo}});
                                    });
                                
                                } else {  
                                    me.showLoadingToast=false;
                                    me.showAlert = true;
                                    me.alertText = res.msg;
                                }
                            });
                        }else{    //正常商品支付
                            orderConfrim(params).then(res => {
                                me.$router.push({path: me.routerPath+'/yytOrderDetail',query:{orderId:res.orderId,price:res.amount,num:res.orderNo}});
                            });
                        }
                    }
                }else{  //微信支付
                    me.showLoadingToast=true;
                    me.loadingText="订单正在提交....";

                    let paybo = {
                        orderId: this.orderId,
                        isWeb: true
                    }
                    if (this.payType == 0) {
                        paybo.payType = "weixin";
                    }
                    //唤起支付
                    let params = qs.stringify(paybo)
                    orderPay(params).then(res2 => {
                        me.showLoadingToast=false;
                        if (res2.code == "1") {
                            if (isWeiXin() && this.payType == 0) {
                                function onBridgeReady() {
                                    WeixinJSBridge.invoke(
                                        'getBrandWCPayRequest', {
                                            "appId": res2.orderPayInfo.appId, //公众号名称，由商户传入     
                                            "timeStamp": res2.orderPayInfo.timeStamp, //时间戳，自1970年以来的秒数     
                                            "nonceStr": res2.orderPayInfo.nonceStr, //随机串     
                                            "package": res2.orderPayInfo.package,
                                            "signType":res2.orderPayInfo.signType, //微信签名方式：     
                                            "paySign": res2.orderPayInfo.paySign //微信签名 
                                        },
                                        function(res3) {
                                            if (res3.err_msg == "get_brand_wcpay_request:ok") {
                                                me.showAlert = true;
                                                me.alertText = "订单支付成功！";
                                                me.$router.replace({path: me.routerPath+'/paySuccess',query:{orderId:res2.orderId}});
                                            }else if(res3.err_msg == "get_brand_wcpay_request:cancel"){
                                                me.showAlert = true;
                                                me.alertText = "订单支付取消！";
                                                // me.$router.push({path: me.routerPath+'/productDetail',query:{productId:me.checkpram.productId}})
                                                me.$router.push({path: me.routerPath+'/order/orderDetail',query:{id: res2.orderId}})
                                            }else if(res3.err_msg == "get_brand_wcpay_request:fail"){
                                                me.showAlert = true;
                                                me.alertText = "订单支付失败！";
                                            }
                                        });
                                }
                                if (typeof WeixinJSBridge == "undefined") {
                                    if (document.addEventListener) {
                                        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                                    } else if (document.attachEvent) {
                                        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                                        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                                    }
                                } else {
                                    onBridgeReady();
                                }
                            } else if (me.payType == 1) { 
                                setTimeout(()=>{
                                    window.location.href = res2.orderPayInfo;
                                },1000)
                            } else {
                                me.showAlert = true;
                                me.alertText = "请在微信浏览器中打开";
                            }
                        } else {
                            me.showAlert = true;
                            me.alertText = res2.msg;
                        }
                    });
                }
            },
            closeCover(){
                this.showCover=false;
            },
            // 填写收货取消
            closeRegister1(){
                this.registeredControl = false
            },
            // 前往填写 
            closeRegister2(){
                this.$router.push({
                path: this.routerPath+'/chooseAddress',
                    query: {
                        from: "confirm",
                        type: this.orderInfo.productType,
                        id: this.$route.query.id,
                        productSpecId: this.$route.query.productSpecId,
                        groupProductInfo: this.$route.query.groupProductInfo,
                        num: this.$route.query.num,
                    }
                });
            }
        },
        watch: { 
        },
        beforeRouteLeave (to, from, next) {
           if( this.showActivities){
                this.showActivities=!this.showActivities;
                next(false)
            }else{
                next()
            }
        }

    }
</script>
  
<style lang="css" scoped>
    @import 'confirmOrder';
    .active{
        visibility:hidden
    } 
</style>
