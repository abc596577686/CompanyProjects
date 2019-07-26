<template>
    <div class="profile_page" >
        <div v-title data-title="支付"></div>
        <div v-stat="{type:'pageview', title:'支付'}"></div>
        
        <!--商品信息  -->
        <div class="proInfo">
            <div class="proImg">
                <img :src="productImg" alt="error">
            </div>
            <div class="proName">
                {{productName}}
            </div>
            <div class="proPrice">
                {{productPrice}}
            </div>
        </div>
        <!--收货信息  -->
        <div class="getTip">
            收货信息
        </div>
        <div class="name">
            收货人姓名
            <input class="inputInfo" type="text" v-model="payinfo.name">
        </div>
        <hr>
        <div class="name">
            手机号
            <input class="inputInfo" type="number" v-model="payinfo.mobile">
        </div>
        <hr>
        <div class="name">
            身份证号
            <input class="inputInfo" type="number" v-model="payinfo.identityNo">
        </div>
        <hr>
        <!--选择省市区  -->
        <div class="weui-cell weui-cell-access" id="showIOSActionSheet" style="height:50px;background-color: #fff;padding-left:.64rem;">
            <div class="weui-cell-bd" @click="choseAdd()">
                <span style="vertical-align: middle;font-size:.597333rem" id="peisong_address">省市区(请选择)&nbsp&nbsp&nbsp{{Province?Province:'省份'}}、 {{City?City:'城市'}}、{{District?District:'区域'}}</span> 
            </div>
             <div class="weui-cell-ft"></div>
        </div>
        <hr>
        <div class='mainAdress'>
            <span class='mA-1'>请填写详细地址</span>
            <span class='mA-2'>(无需重复填写省市区)</span>
            <input type="text" id="addrPic" v-model="payinfo.address">
        </div>
         <hr> 
        <span class="tti"></span>
        <hr style="opacity: 0.1;background-color: lightgrey;height: .2px;">  
        <div class="payType">
            <div class="type_1">
                <img src="../../../common/images/webcatpay.png" alt="error">
            </div>
            <div class="type_2">微信支付</div>
            <div class="type_3">(推荐)</div>
            <div class="type_4">
                <img src="../../../common/images/icon_dagou@2x.png" alt="error">
            </div>
        </div>
        <hr>
        <div class="markSure"   @click.stop="submitPay()">
            马上支付
        </div>

        <!--地址选择框  -->
        <section class="myAddress">
        <section class="showChose" v-show="showChose" @click="closeAdd()">
        </section>
        <section class="address" v-show="showChose">
        <!--<section class="title">
            <h4>请选择地址</h4>
            <span @click="closeAdd()">×</span>
        </section>-->
        <section class="title" style="height:2rem;line-height:2rem;border-bottom:1px #eee solid;overflow: hidden;">
            <div class="area" @click="provinceSelected()" :class="showProvince?'active':''">{{Province?Province:'省份'}}</div>
            <div class="area" @click="citySelected()" :class="showCity?'active':''">{{City?City:'城市'}}</div>
            <div class="area" @click="districtSelected()" :class="showDistrict?'active':''">{{District?District:'区域'}}</div>
        </section>
        <ul>
            <li class="addList" v-for="(v,k) in info" @click="getProvinceId(v.areaId, v.areaName , k)" v-show="showProvince" :class="v.selected ? 'active' : ''">{{v.areaName}}</li>
            <li class="addList" v-for="(v,k) in showCityList" @click="getCityId(v.areaId, v.areaName , k)" v-show="showCity" :class="v.selected ? 'active' : ''">{{v.areaName}}</li>
            <li class="addList" v-for="(v,k) in showDistrictList" @click="getDistrictId(v.areaId, v.areaName , k)" v-show="showDistrict" :class="v.selected ? 'active' : ''">{{v.areaName}}</li>
        </ul>
    </section>
    </section>
    <!--小弹窗  -->
    <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
    <loading-toast v-if="showLoadingToast" @closeTip="showLoadingToast = false" :loadingText="loadingText"></loading-toast> 
    </div>
</template>

<script>
    import { mapState, mapMutations, } from 'vuex'
    import footGuide from 'base/footer/footGuide'
    import { baseUrl, rootPath } from 'config/env';
    // import {getImgPath } from 'src/components/common/mixin'
    import { wxHideOptionMenu } from 'common/js/utils'
    import { orderCheckDetail, getCityList, getPostage ,inviteAgentConfrim ,productDetail,orderPay } from 'api'
    import qs from 'qs'
    // import { orderCheckDetail,orderConfrim,orderPay,updateOrderPayRecode,userInfo ,getCityList, productDetail, addNumCart, checkBuy, getPostage,shareProduct,getToken} from 'src/service/getData'
    import alertTip from 'base/alertTip/alertTip'
    import loading from 'base/loading/loading'
    import loadingToast from 'base/loadingToast/loadingToast'
    import {isWeiXin } from 'common/js/utils'
    // import sa from 'sa-sdk-javascript';
    
    export default {
        data() {
            return {
                productImg : '',  //商品图片
                productName:'大礼包',   //商品名称
                productPrice:'￥25.00',  //商品价格
                productInfo: {},
                headerImageList: [],
                stockNumber: 0,
                preventRepeat: false, //防止重复获取
                showLoading: true, //显示加载动画
                descStatus: 0,
                showChose: false,
                showProvince: true,
                showCity: false,
                showDistrict: false,
                showCityList: false,
                showDistrictList: false,
                showProductSpec: false,
                showProductSecondarySpec: false,
                province: 310000,
                city: 310000,
                district: 310112,
                GetProvinceId: 2,
                Province: "上海市",
                City: false,
                District:false,
                selected: false,
                info: [{
                    areaId: 310000,
                    areaName: '上海'
                }],
                showAlert: false, //弹出框
                alertText: null, //弹出框信息
                showLoadingToast:false,//显示loadingToast
                loadingText:'',//loadingTost 提示信息

                //走支付信息 
                payinfo:{
                    addressId: '',  
                    name: '',      //姓名
                    mobile: '',    //手机号
                    provinceId:'',   //省 id
                    cityId:'',       //市 id
                    areaId:'',       //区 id  
                    address:'',    //填写的地址
                    smsCode:'',    //验证码
                    identityNo:'',   //身份证
                },
                // 支付方式
                payType: '0'
            }
        },
        created() {
            if (this.choosedAddress) {
                this.payinfo.addressId=this.choosedAddress.addressId;
            }

            // 获取省市区三级数据
            let me = this;
            let params = qs.stringify({
                a: 'v1/regionList'
            })
            getCityList(params).then(res => {
                console.log('城市列表----')
                console.log(res)
                this.info = res.list;
            });
            
            // 获取商品图片
            let painfo = qs.stringify({
                a: 'v1/productDetail',
                productId: 1,                     // 大礼包id写死1
            })
            productDetail(painfo).then(res => {
                console.log('产品详情----')
                console.log(res);
                this.productImg = res.headerImageList[0].imageUrl
            });
        },
        mounted() { 
        },
        methods:{
            // 先手获取地址信息 一会唤醒要用
            // async initData() {
            //     let me = this;
            //     // if(this.cart_id==undefined){
            //     //     this.showAlert = true;
            //     //     this.alertText = "参数错误！";
            //     //     this.showLoading = false;
            //     //     return;
            //     // }
            //     orderCheckDetail(me.checkpram).then(res => {
            //         me.showLoading = false;
            //         if (res.code == "1") {
            //             me.orderInfo = res.data;
            //             if(res.addressInfo){
            //                 me.addressInfo = res.addressInfo;
            //             }
            //             if(me.storeName==undefined){
            //                 me.storeName=me.orderInfo.storeName;
            //             }
            //             // if (me.choosedAddress) {
            //             //     me.addressInfo = me.choosedAddress;
            //             // }
            //         } else {
            //             // me.$router.go(-1);
            //             me.showAlert = true;
            //             me.alertText = "获取地址信息有误";
            //         }
    
            //     });
    
            // },
            districtSelected: function() {
                this.showProvince = false;
                this.showCity = false;
                this.showDistrict = true;
            },
            yunfeiXs:function(){
                this.yunfeikk =! this.yunfeikk;
            },          
            cpa:function(){
               this.yunfeikk =! this.yunfeikk;
            },
            choseAdd: function() {
                this.showChose = true;
            },
            closeAdd: function() {
                this.showChose = false;
            },
            // 三级筛选
            _filter(add, areaname, areaId) {
            let result = [];
                for (let i = 0; i < add.length; i++) {
                    if (areaId == add[i].areaId) {
                        result = add[i][areaname];
                    }
                }
                return result;
            },
            // 省市区三级
            getProvinceId: function(code, input, index) {
                this.province = code;
                this.Province = input;
                this.showProvince = false;
                this.showCity = true;
                this.showDistrict = false;
                this.showCityList = this._filter(this.info, 'childrenList', this.province);
                // 点击选择当前
                this.info.map(a => a.selected = false);
                this.info[index].selected = true;
                // console.log(code)
                this.payinfo.provinceId = code
            },
            provinceSelected: function(code, input, index) {
                // 清除市级和区级列表
                this.showCityList = false;
                this.showDistrictList = false;
                // 清除市级和区级选项
                this.City = false;
                this.District = false;
                // 选项页面的切换
                this.showProvince = true;
                this.showCity = false;
                this.showDistrict = false;
            },
            getCityId: function(code, input, index) {
                this.city = code;
                this.City = input;
                this.showProvince = false;
                this.showCity = false;
                this.showDistrict = true;
                this.showDistrictList = this._filter(this.showCityList, 'childrenList', this.city);
                // 选择当前添加active
                this.showCityList.map(a => a.selected = false);
                this.showCityList[index].selected = true;
                // console.log(code)
                this.payinfo.cityId = code
            },
            citySelected: function() {
                this.showProvince = false;
                this.showCity = true;
                this.showDistrict = false;
            },
            getDistrictId: function(areaId, input, index) {
                this.district = areaId;
                this.District = input;
                // 选择当前添加active
                this.showDistrictList.map(a => a.selected = false);
                this.showDistrictList[index].selected = true;
                // 选取市区选项之后关闭弹层
                this.showChose = false;
                // console.log(areaId)
                this.payinfo.areaId  = areaId
                // 重新选择后 根据目的地重新获取运费价格
                // if(this.productInfo.isFreePostage == 0){               
                //     //如果为非包邮商品更新信息
                //     let params = qs.stringify({
                //         number: this.addcartpram.num,
                //         productId: this.productId,
                //         provinceId: this.province,
                //         isWeb: true
                //     })
                //     getPostage(params).then(res => {
                //         if (res.areaId == "1") {
                //             this.postage = res.postage+'元';    //更新运费
                //             this.kkk = res.postageDesc;         //更新描述文字
                //         }
                //     });
                // }
            },
            //选择付款方式
            // surePayway(type) {
            //     if (type == "1") {
            //         this.alipay = true;
            //     }
            //     this.payType = type;
            // },
            // showAlipay() {
            //     this.alipay = !this.alipay;
            //     if( this.alipay){
            //         this.payType = 1;
            //     }else{
            //         this.payType = 0;
            //     }
            // },
            submitPay(){
                // 验证支付
                let params = qs.stringify({
                    addressId: this.payinfo.addressId,
                    name: this.payinfo.name,
                    mobile: this.payinfo.mobile,
                    provinceId: this.payinfo.provinceId,   
                    cityId: this.payinfo.cityId,
                    areaId: this.payinfo.areaId,
                    address: this.payinfo.address,
                    smsCode: this.payinfo.smsCode,
                    identityNo: this.payinfo.identityNo,
                })
                console.log(params)
                inviteAgentConfrim(params).then(res => {
                    console.log('----支付反馈----')
                    console.log(res)
                    if(res.code == 1){
                        let paybo = {
                            orderId: res.orderId,
                            payType : "weixin",
                            isWeb: true
                        }
                        
                        let params = qs.stringify(paybo)
                        let me =this
                        console.log(params)
                        orderPay(params).then(res2 => {
                            me.showLoadingToast = false;
                            if (res2.code == "1") {
                                // console.log(res2)
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
                                                    me.$router.push({path: me.routerPath+'/success'});
                                                }else if(res3.err_msg == "get_brand_wcpay_request:cancel"){
                                                    me.showAlert = true;
                                                    me.alertText = "订单支付取消！";
                                                    me.$router.push({path:me.routerPath+'/paydealers'});
                                                }else if(res3.err_msg == "get_brand_wcpay_request:fail"){
                                                    me.showAlert = true;
                                                    me.alertText = "订单支付失败！";
                                                   me.$router.push({path:me.routerPath+'/paydealers'});
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
                    }else{
                        me.showAlert = true;
                        me.alertText = res.msg;
                    }
                });
            }
        },
        components: {
            alertTip,
            loadingToast,
            loading,
        }
    }
</script>
<style lang="css" scoped>
    @import 'paydealers';
    body{
        background-color: #fff!important;
    }
    .weui-cell-bd span{
        background-color: #fff;
    }
</style>
