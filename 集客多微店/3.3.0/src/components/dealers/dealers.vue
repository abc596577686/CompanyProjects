<template>
    <div class="page">
        <div v-title data-title="开通经销商"></div>
        <div v-stat="{type:'pageview', title:'开通经销商'}"></div>

        <!--上方  -->
        <div class="register">
            <div class="regis_img_1">
                <img src="../../common/images/sq@2x.png" alt="error">
            </div>
             <div class="regis_img_2">
                <img src="../../common/images/zuoo@2x.png" alt="error">
            </div> 
            <!--小图标和文字  -->
            <div class="regis_img_3">
                <img :src="topinfo.imgurl1">
            </div>
            <span class="regis_txt_1 littletxt">{{topinfo.txt1}}</span>

            <div class="regis_img_4">
                <img :src="topinfo.imgurl2">
            </div>
            <span class="regis_txt_2 littletxt">{{topinfo.txt2}}</span>

            <div class="regis_img_5">
                <img :src="topinfo.imgurl3">
            </div>
            <span class="regis_txt_3 littletxt">{{topinfo.txt3}}</span> 

            <div class="regis_img_6">
                <img :src="topinfo.imgurl4">
            </div>
            <span class="regis_txt_4 littletxt">{{topinfo.txt4}}</span>

            <!--小提示  -->
            <div class="txt1">据2017年数据统计成为经销商预计</div>
            <div class="txt2">
                <span class="t1">可省</span>
                <span class="t2" style="color:#B2976A; font-size:.682667rem">{{crucesMoney}}</span>
                <span class="t3">元</span>
                <span class="t4">可赚</span>
                <span class="t5" style="color:#B2976A; font-size:.682667rem">{{saveMoney}}</span>
                <span class="t6">元</span>
            </div>
            <!-- <div></div> -->
        </div>
        <!--底部图片  -->
        <div class="bottomImg" v-for="img in bottomImg">
            <img :src="img.src" style="display:block">
        </div>
        <!--点击购买  -->
        <div class="payBtn" @click="buyNow"> 
            288元开通集客多经销商
        </div>
        <transition name="fade">
            <div class="cover" v-if="showBuy" @click="closeBuy"></div>
        </transition>
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
                    <li class="addList" v-for="(v,k) in info" @click="getProvinceId(v.code, v.name, k)" v-show="showProvince" :class="v.selected ? 'active' : ''">{{v.name}}</li>
                    <li class="addList" v-for="(v,k) in showCityList" @click="getCityId(v.code, v.name, k)" v-show="showCity" :class="v.selected ? 'active' : ''">{{v.name}}</li>
                    <li class="addList" v-for="(v,k) in showDistrictList" @click="getDistrictId(v.code, v.name, k)" v-show="showDistrict" :class="v.selected ? 'active' : ''">{{v.name}}</li>
                </ul>
            </section>
        </section>
        <transition name="fade">
            <div class="cover" v-if="showBuy" @click="closeBuy"></div>
        </transition>
        <transition name="slid_up">
            <div class="choose_type_Container" v-if="showBuy" style="overflow:scroll">
                <!--商品顶部标题  -->
                <div class="proTitle">
                    <span class="proImg">
                        <img :src="imagePath" style="width:100%;height:100%;display:block;">   
                    </span>
                    <span class="proPrice">¥{{productPrice}}</span>
                    <span class="proAllInfo" v-if="showProductSpec">{{selectSpecInfo}}</span>
                    <span class="closePro" @click="closeBuy()">
                            <img src="../../common/images/icon_guanbi@2x.png" alt="error" style="width:100%;height:100%;display:block;"> 
                            <!-- <img :src="promainimg" alt="error" style="width:100%;height:100%;display:block;">  -->
                    </span>
                </div>

                <div v-if="showProductSpec" style="overflow:scroll;min-height:5rem;max-height:15rem;">    
                    <!--一级规格  -->
                    <div class="proColor">
                        <span class="tit11">{{primarySpecModelName}}</span>
                        <ul class="tt1" v-if="primarySpecList.length">
                            <li class="tt1div" v-for="(item, index) in primarySpecList" @click="selectPrimarySpec(item, index)" :class="{'activeSpec': item.isChecked,'ee': item.disabled}" >
                                {{item.primarySpecName}}
                            </li>
                            <!-- <input type="text"> -->
                        </ul>
                    </div>
                    <!--二级规格  -->
                    <div class="proSize" v-if="showProductSecondarySpec">
                        <span class="tit11">{{secondarySpecModelName}}</span>
                        <ul>
                            <li class="tt1div" v-for="(item, index) in secondarySpecList" @click="selectSecondarySpec(item, index)" :class="{'activeSpec': item.isChecked,'ee': item.disabled}">
                                {{item.secondarySpecName}}
                            </li>
                        </ul>
                    </div>
                </div>

                <!--选择数量  -->
                <div class="list ">
                    <p class="list_p">续费年数</p>
                    <div class="gw_num" style="margin-top: 13px;">
                        <span class="input-number-decrement" @click="subtraction();">–</span>
                        <input class="input-number" v-model="addcartpram.num" ></input>
                        <span class="input-number-increment" @click="add();">+</span>
                    </div>
                </div>
                <!--税费显示  -->
                <div class="shuifei" v-show="productType==2">
                    <div class="shuifei1">税费</div>
                    <div class="shuifei2">本商品已包税</div> 
                </div>
                <!--购买  -->
                <div class="buynow2" @click="doOperation();">确定</div>
            </div>
        </transition>

        <transition name="fade">
            <div class="cover" v-if="showDesc" @click="closeDesc"></div>
        </transition>
        <transition name="slid_up">
            <div class="choose_type_Container" v-if="showDesc">
                    <div class="gm-task" style="padding-bottom: 2.176rem"> 
                    <div style="position: absolute;right: 10px;top: 10px;" @click="closeDesc">
                        <img src="../../common/images/icon_guanbi@2x.png" width="17">
                    </div>
                    <p style="padding-left: 10px;line-height: 45px;font-size: 0.6rem;color: #666;  border-bottom: 1px #eee solid;">商品说明</p>

                    <div class="sm_right" style="margin-left: 10px;margin-top: 0px;height:51px" v-for="descinfo2 in productInfo.productIntroList">
                        <div style="color:#666;font-size:0.55rem;"><span></span>{{descinfo2.title}}</div>
                        <div style="color:#666;font-size:0.5rem;line-height:18px;margin-left: 11px;height:28px;margin-top: 2px;padding-right:15px">{{descinfo2.introduction}}</div>
                    </div>
                </div>
            </div>
        </transition>
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText" style="z-index: 99999;"></alert-tip>
        <!--注册提示框  -->
        <div class="registered" v-show="iszhuce">
            <div class="name">{{kehuName}},请先完成手机验证</div>
            <!--关闭  -->
            <div class="coverClose" @click="closeDiv" style="width: 2.88rem;height: 1.88rem;position: absolute;left: 12.834667rem;top: 0;"></div>  
            <div class="close" @click="closeDiv">
                <img src="../../common/images/closediv.png" alt="error">
            </div>
            <hr>
            <!--手机号  -->
            <input id="phone" type="text" class="phone" placeholder="请输入手机号" v-model="phonecode">
            <!--验证码  -->
            <input id="phone_code" class="number" type="number" placeholder="请输入验证码" v-model="yzcode">
            <button id="btn" class="keyNum" @click="settime(this)" :disabled="disabled" >{{divname}}</button>
            <!--确认注册  -->
            <div class="sure" @click="getTip()">确认</div>
        </div>
    </div>
</template>

<script>
    import alertTip from 'base/alertTip/alertTip'
    import { mapState, mapMutations } from 'vuex'
    import headTop from 'base/head/head'
    import loading from 'base/loading/loading'
    import footGuide from 'base/footer/footGuide'
    import loadingToast from 'base/loadingToast/loadingToast'
    import { rootPath } from 'config/env'
    import { productDetail, checkBuy ,sendCode , userRegister , memberCenter} from 'api'
    import qs from 'qs'
    // import {orderList, cancelOrder, queryTake, deleteOrder, orderPay, productDetail,checkBuy} from 'src/service/getData'
    // import { getImgPath, loadMore} from 'src/components/common/mixin'
    import {showBack, animate, isWeiXin, wxHideOptionMenu} from 'common/js/utils'
    import sa from 'sa-sdk-javascript';

    export default {
        data() {
            return {
                isShow: false,
                disabled : false,
                area_code : 86,   //写死中国大陆地区
                linkKey:1,        //接口控制
                timeoutKey : 0,   //倒计时控制
                countdown : 60,   //倒计时初始时间
                divname : '获取验证码',
                yzcode : '',
                phonecode : '',
                iszhuce : false,
                // iszhuce : true,
                checkList: ['选中且禁用','复选框 A'],
                selectSpecInfo: '请选择相关别类~',
                routerPath:'',
                shopid: '',
                productId: '',
                productName:'',
                productType: 0,
                productPrice: '',
                imagePath: '',
                showAlert: false, //弹出框
                alertText: null, //弹出框信息
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
                    code: 310000,
                    name: '上海'
                }],
                showBuy: false, //显示数量选择框
                showDesc: false, //显示商品说明
                addcartpram: {
                    productId: '',
                    num: 1,
                    isFromCartList: false,
                },                                 //购物车商品数量修改请求参数
                oprType: 1, //操作类型 1-添加购物车 2-立即购买
                oprText: '', //操作描述
                quantity: 0, //购物车数量
                postage: '', //运费
                kkk:{}, //运费文字
                yunfeikk:false, //控制运费文字的显示
                productee:false, //运费栏显示(无需求 暂时不显示)
                primarySpecModelName: '',
                secondarySpecModelName: '',
                productSpecList: [],
                primarySpecList: [],
                secondarySpecList: [],
                isSelectProductSpec: false,
                // 顶部下载集客多高度
                scTop: 0,
                showtop:true,
                kehuName:'', //客户昵称
                topinfo:{
                    txt1 :'',
                    txt2 :'',
                    txt3 :'',
                    txt4 :'',
                    imgurl1 :'',
                    imgurl2 :'',
                    imgurl3 :'',
                    imgurl4 :'',
                 },
                giftProductId:'',
                crucesMoney:'',
                saveMoney:'',
                bottomImg:{} ,  //底部大图
                isResend: false,
            }
        },
        created() {
            let me = this;
            me.productId = me.$route.query.productId;
            me.addcartpram.productId = me.productId;
            me.routerPath = rootPath;


            // 获取初始化页面数据
            let params = qs.stringify({
                a:'v1/memberCenter'
            })
            console.log(params)
            memberCenter(params).then(res => {
                console.log('开通经销商详情----')
                console.log(res)
                this.giftProductId = res.levelPrice.giftProductId
                if(this.giftProductId != ''){
                    this.getproductDetail(); //获取大礼包详情
                }
                // 价格区间
                this.crucesMoney = res.levelPrice.crucesMoney
                this.saveMoney = res.levelPrice.saveMoney
                // 小文字
                this.topinfo.txt1 = res.nextAuthority[0].title
                this.topinfo.txt2 = res.nextAuthority[1].title
                this.topinfo.txt3 = res.nextAuthority[2].title
                this.topinfo.txt4 = res.nextAuthority[3].title
                // 小图片
                this.topinfo.imgurl1 = res.nextAuthority[0].headImage
                this.topinfo.imgurl2 = res.nextAuthority[1].headImage
                this.topinfo.imgurl3 = res.nextAuthority[2].headImage
                this.topinfo.imgurl4 = res.nextAuthority[3].headImage



            })
        },
        components: {
            alertTip
        },
        methods: {
            getproductDetail:function(){
                let me = this
                let params = qs.stringify({
                    a: 'v1/productDetail',
                    productId: this.giftProductId 
                })
                // console.log(params)
                productDetail(params).then(res => {
                    console.log('产品详情----')
                    console.log(res);
                    // 页面底部大图
                    this.bottomImg = res.data.productDesc
                    this.kehuName = res.data.nickName
                    me.showAlert=false;
                    me.showLoading = false;
                    if (res.code == "1") {
                        me.productSpecList = res.data.productSpecList;
                        me.headerImageList = res.headerImageList;
                        me.quantity = res.data.cartProductNumbers;
                        me.productInfo = res.data;
                        if(me.productInfo){
                            me.productPrice = me.productInfo.price;
                            me.productName = me.productInfo.productName;
                            if(me.productInfo.isSpceProduct == 0){
                                me.stockNumber = Number(me.productInfo.stockNumber);
                                me.productType = Number(me.productInfo.productType);
                            }
                        }

                        // 规格商品信息
                        if(me.productInfo.isSpceProduct == 1){
                            me.primarySpecList = [];
                            me.secondarySpecList = [];

                            
                            let isExistPrimarySpec = false

                            // 所有商品信息
                            me.productSpecList.forEach((spec, index) => {
                                let toggle = true
                                let isExistPrimarySpec = true;
                                console.log('第' + index + '个')

                                if (spec.isSoldOut == '1') {
                                    spec.disabled = true
                                } else {
                                    spec.disabled = false
                                }

                                if (me.primarySpecList.length) {
                                    toggle = false
                                    me.primarySpecList.forEach((item) => {
                                        if (spec.primarySpecId != item.primarySpecId) {
                                            isExistPrimarySpec = false
                                        } else {
                                            isExistPrimarySpec = true
                                        }
                                    })
                                }

                                if (!isExistPrimarySpec) {
                                    me.primarySpecList.push(spec)
                                    console.log(me.primarySpecList)
                                }

                                if (toggle) {
                                    me.primarySpecList.push(spec)
                                }


                            })
                        

                            if(me.productInfo.isMoreSpecProduct == 1){
                                me.productSpecList.forEach((item)=>{
                                    let isExistSecondarySpec = false;
                                    if(me.secondarySpecList.length > 0){
                                        me.secondarySpecList.forEach((productSpec)=>{
                                            if(productSpec.secondarySpecId == item.secondarySpecId){
                                                isExistSecondarySpec = true;
                                                return;
                                            }
                                        });
                                    }
                                    if(!isExistSecondarySpec){
                                        me.secondarySpecModelName = item.secondarySpecModelName;
                                        me.secondarySpecList.push(Object.assign({}, item, {isChecked: false, isDisabled: false}));
                                    }
                                });
                            }
                        }

                        // 运费 优先判断是否包邮
                        if(res.data.isFreePostage == 1 ){ //包邮
                            me.postage = res.data.postageData.freePostageAct;
                            this.kkk = res.data.postageData.postageDescH5List
                        }else if(res.data.isFreePostage == 0 ){ //不包邮
                            me.postage = res.data.postageData.postage+'元';
                            this.kkk = res.data.postageData.postageDescH5List;
                        }
                        
                    }else{   //接口失败
                        this.showAlert = true;
                        this.alertText = res.msg;

                        // setTimeout(() => {
                        //     this.$router.go(-1);
                        // }, 1000);
                    }
                })
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
            _filter(add, name, code) {
                let result = [];
                for (let i = 0; i < add.length; i++) {
                    if (code == add[i].code) {
                        result = add[i][name];
                    }
                }
                return result;
            },
            getProvinceId: function(code, input, index) {
                this.province = code;
                this.Province = input;
                this.showProvince = false;
                this.showCity = true;
                this.showDistrict = false;
                this.showCityList = this._filter(this.info, 'children', this.province);
                // 点击选择当前
                this.info.map(a => a.selected = false);
                this.info[index].selected = true;
            },
            provinceSelected: function() {
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
                this.showDistrictList = this._filter(this.showCityList, 'children', this.city);
                // 选择当前添加active
                this.showCityList.map(a => a.selected = false);
                this.showCityList[index].selected = true;
            },
            citySelected: function() {
                this.showProvince = false;
                this.showCity = true;
                this.showDistrict = false;
            },
            getDistrictId: function(code, input, index) {
                this.district = code;
                this.District = input;
                // 选择当前添加active
                this.showDistrictList.map(a => a.selected = false);
                this.showDistrictList[index].selected = true;
                // 选取市区选项之后关闭弹层
                this.showChose = false;
                // 重新选择后 根据目的地重新获取运费价格
                if(this.productInfo.isFreePostage == 0){               
                    //如果为非包邮商品更新信息
                    getPostage({
                        number: this.addcartpram.num,
                        productId: this.productId,
                        provinceId: this.province,
                        isWeb: true
                    }).then(res => {
                        if (res.code == "1") {
                            this.postage = res.postage+'元';    //更新运费
                            this.kkk = res.postageDesc;         //更新描述文字
                        }
                    });
                }
            },
            districtSelected: function() {
                this.showProvince = false;
                this.showCity = false;
                this.showDistrict = true;
            },
            addCart: function() {
                this.oprType = 1;
                this.oprText = "加入购物车";
                this.chooseProductNum();
            },
            buyNow:function(){
                if(this.productInfo.isH5CommonUser  == 1){   //先注册
                    this.iszhuce = true
                }else{   //前往购买
                    this.oprType = 2;
                    this.oprText = "立即购买";
                    this.chooseProductNum();
                }
            },
            closeBuy() {
                this.showAlert=false;
                this.showBuy = false;

                if(!this.showBuy 
                    && this.productInfo.isSpceProduct == 1
                    && this.primarySpecList.length > 0){
                    // 默认所有一级规格不选中状态
                    this.primarySpecList.forEach((productSpec)=>{
                        productSpec.isChecked = false;
                        productSpec.isDisabled = false;
                    });

                    if(this.productInfo.isMoreSpecProduct == 1){
                        if(this.secondarySpecList.length > 0){
                            this.secondarySpecList.forEach((productSpec)=>{
                                productSpec.isChecked = false;
                                productSpec.isDisabled = false;
                            });
                        }
                    }
                }
            },
            closeDesc() {
                this.showDesc = !this.showDesc;
            },
            chooseProductNum() {
                this.showBuy = true;
                this.showAlert=false;
                this.selectSpecInfo = '请选择相关别类~';
                this.productPrice = this.productInfo.price;
                this.addcartpram.num = 1;

                if(this.headerImageList.length > 0){
                    this.imagePath = this.headerImageList[0].imageUrl;
                }
                // console.log(this.imagePath)
                if(this.productInfo.isSpceProduct == 1){
                    this.showProductSpec = true;
                    if(this.primarySpecList.length > 0){
                        this.primarySpecList.forEach((productSpec)=>{
                            productSpec.isChecked = false;
                            productSpec.isDisabled = false;
                        });
                    }
                    if(this.productInfo.isMoreSpecProduct == 1){
                        this.showProductSecondarySpec = true;
                        if(this.secondarySpecList.length > 0){
                            this.secondarySpecList.forEach((productSpec)=>{
                                productSpec.isChecked = false;
                                productSpec.isDisabled = false;
                            });
                        }
                    }
                }
            },
            add() {
                //数量加
                this.addcartpram.num = Number(this.addcartpram.num) + 1;
                console.log()
            },
            subtraction() {
                //数量减
                if (this.addcartpram.num > 1) {
                    this.addcartpram.num = Number(this.addcartpram.num) - 1;
                }
            },
            descStatusChange(state) {
                this.descStatus = state;
            },
            // 规格选择框确定立即购买按钮
            doOperation() {
                //加入购物车或者立即购买
                let me = this;
                let productSpecId = '';
                if(this.productInfo.isSpceProduct == 1){
                    // 默认所有一级规格不选中状态
                    let isSelectPrimarySpec = false;
                    this.primarySpecList.forEach((productSpec)=>{
                        if(productSpec.isChecked == true){
                            isSelectPrimarySpec = true;

                            // 单规格商品
                            if(this.productInfo.isMoreSpecProduct == 0){
                                productSpecId = productSpec.productSpecId;
                            }
                        }
                    });

                    if(!isSelectPrimarySpec){
                        me.showAlert=true;
                        me.alertText="请选择相关规格~";
                        return;
                    }
                    
                    // 大礼包必为多规格商品
                    if(this.productInfo.isMoreSpecProduct == 1){
                        let isSelectSecondarySpec = false;
                        console.log(this.secondarySpecList)

                        if(this.secondarySpecList.length > 0){
                            this.secondarySpecList.forEach((productSpec)=>{
                                if(productSpec.isChecked == true){
                                    productSpecId = productSpec.productSpecId;
                                    isSelectSecondarySpec = true;
                                }
                            });
                        }

                        if(!isSelectSecondarySpec){
                            me.showAlert=true;
                            me.alertText="请选择相关规格~";
                            return;
                        }
                    }
                }  

                if (this.oprType == "1") {
                    //加入购物车
                    addNumCart({
                        productId: this.addcartpram.productId,
                        productSpecId: productSpecId,
                        num: me.addcartpram.num,
                        isFromCartList: false
                    }).then(res => {
                        if (res.code == "1") { //成功
                            this.showAlert = true;
                            this.alertText ="添加购物车成功！";
                            this.quantity = res.cartProductNumbers;
                            this.showBuy = !this.showBuy;
                        } else {
                            this.showAlert = true;
                            this.alertText = res.msg;
                            this.showBuy = !this.showBuy;
                        }
                    });
                } else { 
                    //立即开通经销商跳转支付
                    let params = qs.stringify({                                             
                        productId: me.productId,
                        productSpecId: productSpecId,
                        number: me.addcartpram.num
                    })

                    checkBuy(params).then(res => {
                        console.log('立即购买----')
                        console.log(res)

                        if (res.code == "1") { //成功

                            // 跳转订单支付页面
                            me.$router.push({
                                path:  me.routerPath+'/confirmOrder',
                                query: {
                                    id: res.productId,
                                    productSpecId: productSpecId,
                                    num: me.addcartpram.num,
                                    ispackage:1,
                                }
                            });
                        }else {   //显示信息
                            this.showAlert = true;
                            this.alertText = res.msg;
                            this.showBuy = !this.showBuy;
                        } 
                    });
                }
            },
            selectPrimarySpec(item, index) {
                if(item.disabled){
                    return;
                }
               
                let secondarySpecName = null;
                if(this.primarySpecList.length > 0){
                    // 默认所有一级规格不选中状态
                    this.primarySpecList.forEach((productSpec)=>{
                        productSpec.isChecked = false;
                    });
                    
                    // 商品多规格检查库存信息
                    if(this.productInfo.isMoreSpecProduct == 1){
                        // 有库存的二级规格
                        let tmpSecondarySpecList = [];
                        this.productSpecList.forEach((productSpec)=>{
                            if(productSpec.primarySpecId == item.primarySpecId
                                    && productSpec.isSoldOut == 0){
                                tmpSecondarySpecList.push(productSpec);
                            }
                        });

                        // 遍历二级规格列表
                        this.secondarySpecList.forEach((productSpec)=>{
                            productSpec.isDisabled = true;
                            productSpec.productSpecId = null;
                            if(tmpSecondarySpecList.length > 0){
                                tmpSecondarySpecList.forEach((tmpProductSpec)=>{
                                    if(productSpec.secondarySpecId == tmpProductSpec.secondarySpecId){
                                        productSpec.isDisabled = false;
                                        productSpec.productSpecId = tmpProductSpec.productSpecId;
                                        productSpec.primarySpecId = tmpProductSpec.primarySpecId;
                                        productSpec.secondarySpecId = tmpProductSpec.secondarySpecId;
                                        productSpec.secondarySpecName = tmpProductSpec.secondarySpecName;                                        
                                        productSpec.stockNumber = tmpProductSpec.stockNumber;
                                        productSpec.paymentPrice = tmpProductSpec.price; 

                                        if(productSpec.isChecked == true){
                                            this.productPrice = productSpec.paymentPrice;
                                            secondarySpecName = productSpec.secondarySpecName;
                                            console.log('-------' + productSpec.productSpecId);
                                        }
                                    }
                                });
                            }
                        });
                    }
                }
                
                this.selectSpecInfo = '已选择：' + item.primarySpecName;
                if(secondarySpecName != null){
                    this.selectSpecInfo += '、' + secondarySpecName;
                }

                // 单规格商品直接获取价格
                if(this.productInfo.isMoreSpecProduct == 0){
                    this.productPrice = item.price;
                }
                this.imagePath = item.imageUrl;
                item.isChecked = true;
            },
            selectSecondarySpec(item, index) {
                    if(item.isDisabled){
                        return;
                    }

                    let primarySpecName = null;
                    if(this.secondarySpecList.length > 0){
                        this.secondarySpecList.forEach((productSpec)=>{
                            productSpec.isChecked = false;
                        });

                        // 检查一级规格是否有库存
                        let tmpPrimarySpecIdList = [];
                        this.productSpecList.forEach((productSpec)=>{
                            if(productSpec.secondarySpecId == item.secondarySpecId
                                    && productSpec.isSoldOut == 0){
                                tmpPrimarySpecIdList.push(productSpec.primarySpecId);
                            }
                        });

                        // 遍历一级规格列表
                        this.primarySpecList.forEach((productSpec)=>{
                            productSpec.isDisabled = true;
                            if(tmpPrimarySpecIdList.length > 0){
                                tmpPrimarySpecIdList.forEach((primarySpecId)=>{
                                    if(productSpec.primarySpecId == primarySpecId){
                                        productSpec.isDisabled = false;

                                        if(productSpec.isChecked == true){
                                            primarySpecName = productSpec.primarySpecName;
                                            this.productPrice = item.price;
                                        }
                                    }
                                });
                            }
                        });
                    }

                    this.selectSpecInfo = '已选择：' + item.secondarySpecName;
                    if(primarySpecName != null){
                        this.selectSpecInfo = '已选择：' + primarySpecName + '、' + item.secondarySpecName;
                    }
                    item.isChecked = true;
                    console.log('-------' + item.productSpecId);
                },
                // 关闭注册框
                closeDiv(){
                    this.iszhuce = false;
                },
                // 验证码
                 
                settime(obj) {
                    var my = this
                    var phone = this.phonecode;
                    
                    if (phone =='') {                                           //如果输入为空
                        this.phonecode = ""
                        this.alertText = '请输入手机号'
                        this.showAlert = true
                        return false;
                    }

                    // if (this.area_code == "86") {
                    //     if (!phone.match(/^1[3|4|5|7|8][0-9]{9}$/)) {           //检查手机号格式
                    //         this.alertText = '请输入正确的手机号'
                    //         this.showAlert = true
                    //         this.timeoutKey = 0              //关闭倒计时
                    //         this.linkKey = 1                 //开启接口
                    //         this.disabled = false
                    //         this.divname = '获取验证码'
                    //         this.countdown = 60;
                    //         return false;
                    //     }
                    // } 

                    if (this.linkKey == 1) {   
                        let _this = this;
                        let params = qs.stringify({
                            mobile: phone,
                            countryCode: 86,
                            codeType: 5
                        })
                        sendCode(params).then(res => {
                            sa.track('obtainCaptcha', {
                                pageType: '注册经销商',
                                phoneNumber: phone+'',
                                isResend: this.isResend ? true : false
                            })

                            if (res.code == '0'){                                 //发送失败 跳出提示 不进行倒计时
                                var msg1= res.msg
                                this.alertText = msg1
                                this.showAlert = true
                                clearTimeout(ttt);    
                            }else if(res.code == '1'){                            //发送成功 进入倒计时 按钮持续不可操作 直到cuntdown为0后恢复
                                var msg2 = res.msg
                                this.alertText = msg2
                                this.showAlert = true
                                this.timeoutKey = 1;         //倒计时控制变量 开启
                                this.linkKey = 0;            //接口关闭
                                // console.log(this.timeoutKey)
                                // console.log(this.linkKey)
                            }else{
                                this.alertText = res.msg
                                this.showAlert = true
                            }
                        })

                        sa.track('obtainCaptcha', {
                            pageType: '升级经销商',
                            phoneNumber: phone + '',
                            isResend: _this.isResend,
                        })
                    }

                    if(this.timeoutKey == '1' & this.linkKey != '1'){                //倒计时控制开启  接口控制关闭  此时进行倒计时
                        this.disabled = true
                        // obj.setAttribute("disabled", true);                  //不可选中
                        this.divname = "重新发送" + this.countdown;
                        this.countdown--;                                       //数字倒计时
                        this.isResend = true
                    }

                    if (this.countdown == 0) {                                  //倒计时结束 重置按钮 可重新走接口
                        this.linkKey++                 //开启接口
                        this.timeoutKey--              //关闭倒计时
                        this.disabled = false
                        // obj.removeAttribute("disabled");  //重置倒计时按钮样式
                        this.divname = "获取验证码"
                        this.countdown = 60;
                        this.isResend = true
                        return;
                    }

                    var ttt = setTimeout(function(){
                        my.settime(obj)
                    }, 1000) 
                },
                // 确认注册框
                getTip(){
                    console.log(this.yzcode)
                    if(this.yzcode == ''){
                        this.alertText = '请输入验证码'
                        this.showAlert = true
                    }else{  //验证注册 跳转支付页面
                        console.log(this.yzcode)
                        let params = qs.stringify({
                            mobile: this.phonecode,       //注册框手机号
                            smsCode : this.yzcode,  //注册框验证码
                        })
                       
                        userRegister(params).then(res => {   //验证注册接口
                            sa.track('signUp', {
                                inviteCode: '',
                                signChannel: '经销商注册',
                                signType: '经销商注册'
                            })

                            if(res){
                                if(res.code =='1'){  //注册成功 关闭注册框 重新购买
                                    this.iszhuce = false
                                    this.alertText = res.msg
                                    this.showAlert = true
                                    location.reload();
                                }else{   //注册失败 重新尝试
                                    this.alertText = res.msg
                                    this.showAlert = true
                                }
                            }else{
                                this.alertText = '注册接口关闭'
                                this.showAlert = true
                            }
                        })
                    }
                }
        },
        filters: {

        },
        computed: {
        　　num(){
        　　　return this.addcartpram.num
        　　},
            top(){
        　　　return this.scTop
        　　}
        },
        watch:{
            num(newValue, oldValue){ 
            // 防止死循环提示请选择相关规格提示
            if(this.isSelectProductSpec){
                this.isSelectProductSpec = false;
                return;
            }else if(this.showBuy == false){
                // 购买弹出框关闭
                return;
            }
            
            if(this.productInfo.isSpceProduct == 1 && this.primarySpecList.length > 0){
                    this.stockNumber = 0;
                    // 默认所有一级规格不选中状态
                    let isSelectPrimarySpec = false;
                    this.primarySpecList.forEach((productSpec)=>{
                        if(productSpec.isChecked == true){
                        this.stockNumber = Number(productSpec.stockNumber);
                        isSelectPrimarySpec = true;
                        }
                    });

                    if(!isSelectPrimarySpec){
                        this.showAlert=true;
                        this.alertText="请选择相关规格~";
                        this.isSelectProductSpec = true;
                        this.addcartpram.num = 1;
                        return;
                    }

                    if(this.productInfo.isMoreSpecProduct == 1){
                        let isSelectSecondarySpec = false;
                        if(this.secondarySpecList.length > 0){
                        this.secondarySpecList.forEach((productSpec)=>{
                            if(productSpec.isChecked == true){
                            this.stockNumber = Number(productSpec.stockNumber);
                            isSelectSecondarySpec = true;
                            }
                        });
                    }

                    if(!isSelectSecondarySpec){
                    this.showAlert=true;
                    this.alertText="请选择相关规格~";
                    this.isSelectProductSpec = true;
                    this.addcartpram.num = 1;
                    return;
                    }
                }
                }  
                // 当前所有筛选下库存最小值
                if(newValue > this.stockNumber){
                    this.showAlert=true;
                    this.alertText="温馨提示,超出商品库存限额~";
                    this.addcartpram.num = this.stockNumber;
                }
            }
        }
    }
</script>

<style lang="css" scoped>
    @import 'dealers';
</style>
