<template>
    <div>
        <div v-show="!showLoading">
            <div v-title data-title="成为集客多VIP1"></div>
            <div v-stat="{type:'pageview', title:'邀请'}"></div>
            
            <footer class="foot_div">
                <button class="gm bt" @click="buyNow()" style="text-align:center;font-size:.64rem;">立即购买</button> 
            </footer>
            <header v-if="islong">
                <div class="heImg">
                    <img :src="headImg">
                </div>
                <div class="txt1">{{peoName}}</div>
                <div class="txt2">邀请您加入集客多，请选择VIP1大礼包</div>
            </header>
            <section class="showProductList" v-if="islong">
                <div class="spl" v-for="(data,index) in giftProduct" :class="{isActive:index==isActive}" @click="reClick(data,index)">
                    <div class="spl_1">
                        <img :src="data.imageUrl">
                    </div>
                    <div class="spl_2">
                        {{data.primarySpecName}}
                    </div>
                </div>
            </section>
            <!-- 缩略版 -->
            <section class="suolvecover" v-if="islong1">
                
            </section>
            <section class="suolve" v-if="islong1">
                <div  v-for="(data,index) in giftProduct" :class="{isActive1:index==isActive1}" @click="reClick1(data,index)">
                    <span class="kSp">
                         {{data.primarySpecName}}
                    </span>
                </div>
            </section>
            <section class="backgroundImg">
                <div class="backImg">
                    <img :src="backgroundImgUrl">
                </div>
                <div class="primaryName">
                    {{primarySpecName}}
                </div>
                <div class="lowNum">
                    {{proprice!=''?'￥'+proprice+'元':''}}
                </div>
            </section>
            <section class="middleShow">
                <img src="../../../../common/images/fuli@2x.png">
            </section>
            <footer class="bottomImg" v-for="data in bottomImgList">
                <img :src="data.src">
            </footer>
            <div class="boo">

            </div>
            <!-- <div class="dp_img_list" style="display: block;z-index:999">
                <p style="display: block;z-index:999">
                    <img v-for="(img,index) in productInfo.productDesc" v-lazy="img.src" :key="index">
                </p>
            </div> -->
            <transition name="slid_up">
                <section>
                <div class="choose_type_Container" v-if="showBuy" style="overflow:scroll">
                    <!--商品顶部标题  -->
                    <div class="proTitle">
                        <span class="proImg">
                            <img :src="imagePath" style="width:100%;height:100%;display:block;">  
                            <!-- <img :src="imagePath"  style="width:100%;height:100%;display:block;"> -->
                        </span>
                        <span class="proPrice">¥{{productPrice}}</span>
                        <span class="proAllInfo" v-if="showProductSpec">{{selectSpecInfo}}</span>
                        <span class="closePro" @click="closeBuy()">
                                <img src="../../../../common/images/icon_guanbi@2x.png"  style="width:100%;height:100%;display:block;"> 
                                <!-- <img :src="promainimg"  style="width:100%;height:100%;display:block;">  -->
                        </span>
                    </div>

                    <div v-if="showProductSpec" style="overflow:scroll;min-height:5rem;max-height:15rem;">    
                        <!--一级规格  -->
                        <div class="proColor">
                            <span class="tit11">{{primarySpecModelName}}</span>
                            <ul class="tt1">
                                <button class="tt1div" v-for="(item, index) in primarySpecList" @click="selectPrimarySpec(item, index)" :class="{'activeSpec': item.isChecked,'ee': item.isDisabled}" >
                                    {{item.primarySpecName}}
                                </button>
                            </ul>
                        </div>
                        <span class="coverligg"></span>
                        <!--二级规格  -->
                        <div class="proSize" v-if="showProductSecondarySpec">
                            <span class="tit11">{{secondarySpecModelName}}</span>
                            <ul>
                                <button class="tt1div" v-for="(item, index) in secondarySpecList" @click="selectSecondarySpec(item, index)" :class="{'activeSpec': item.isChecked,'ee': item.isDisabled}">
                                    {{item.secondarySpecName}}
                                </button>
                                
                            </ul>
                        </div>
                        <span class="coverligg"></span>
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
                    <div class="buynow2" @click="doOperation();">确定</div>
                </div>

                <div>
                    <span class="grey1" v-show="yunfeikk"></span>
                    <span class="grey1" v-show="iszhuce" @click="closeDiv"></span>
                    <!--注册提示框  -->
                    <div class="registered" v-show="iszhuce">
                        <div class="name">{{nickName?nickName+',请先完成手机验证':'请先完成手机注册'}}</div>
                        <!--关闭  -->
                        <div class="close" @click="closeDiv">
                            <img src="../../../../common/images/closediv.png" alt="error"> 
                        </div>
                        <span class="coversp"></span> 
                        <!--手机号  -->
                        <input id="phone" type="text" class="phone" placeholder="请输入手机号" v-model="phonecode">
                        <!--验证码  -->
                        <input id="phone_code" class="number" type="number" placeholder="请输入验证码" v-model="yzcode">
                        <button id="btn" class="keyNum" @click="settime(this)" :disabled="disabled" >{{divname}}</button>
                        <!--确认注册  -->
                        <button class="sure" @click="getTip()">确认</button>
                    </div>
                    <span class="grey2" v-show="showBuy" @click="closebuy"></span>  
                </div>
                </section>
            </transition>

             <transition name="fade"> 
                <div class="cover" v-if="showDesc" @click="closeDesc"></div>
             </transition>
        </div>
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText" style="z-index: 99999;"></alert-tip>
         <transition name="loading"> 
            <loading v-show="showLoading"></loading>
         </transition>
    </div>
</template>
<script src="https://qiyukf.com/script/06f1b1294f5f993266d9931f9be05e51.js"></script>
<script>
    import loading from 'base/loading/loading'
    import DownApp from 'base/downApp/downApp'
    import MoreBanner from 'components/banner/banner'
    import qs from 'qs'
    import { checkSmsCode, productGiftInfo, getCityList, productDetail, addNumCart, orderCheckDetail, checkBuy, getPostage, shareProduct, getToken ,seckillList,userRegister,sendCode} from 'api'
    import { wxShowOptionMenu, isWeiXin } from 'common/js/utils'
    import AlertTip from 'base/alertTip/alertTip'
    import { rootPath } from 'config/env'
    import storage from 'good-storage'
    import sa from 'sa-sdk-javascript';

    const GOODS_MAX_NUM = 8
    const pullingDownBackHeight = -50
    const SECKILL_TAB_INDEX = '__seckillTabIndex__'
    const PRODUCT_ID = 'productId'

    // import wx from 'weixin-js-sdk'
    // import { getImgPath } from 'src/components/common/mixin'`

    export default {
        beforeRouteEnter(to, from, next){
          next(vm => {
            if (to.path.indexOf('/productDetail') > 0) {
              vm.productId = Number(to.query.productId);
              console.log(vm.productId)
              console.log(storage.get(PRODUCT_ID))

              if (vm.productId != storage.get(PRODUCT_ID)) {
                vm._getProductDetail()
                
                storage.set(PRODUCT_ID, vm.productId)
              } else {
                vm._getProductDetail()
              }
            }
          })
        },
      data() {
        return {
            isoractivitySoldOut:false,   //活动库存
            isordinarySoldOut:false,     //普通库存
            disabled : false,
            area_code : 86,   //写死中国大陆地区
            linkKey:1,        //接口控制
            timeoutKey : 0,   //倒计时控制
            countdown : 60,   //倒计时初始时间
            divname : '获取验证码',
            yzcode : '',
            phonecode : '',
            isShowDownload: true,
            nickName:'',
            checkList: ['选中且禁用','复选框 A'],
            selectSpecInfo: '请选择相关别类~',
            routerPath:'',
            productId: '',
            productName:'',
            productType: 0,
            productPrice: '',
            imagePath: '',
            showAlert: false, //弹出框
            alertText: null, //弹出框信息
            productInfo: {},
            // headerImageList: [],
            stockNumber: 0,
            preventRepeat: false, //防止重复获取
            showLoading: false,   //显示加载动画
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
            }, //购物车商品数量修改请求参数
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
            iszhuce:false, //提示注册框显示
            isshare:false, //提示分享显示
            showProductEffectIntro: false,
            showSeckillProduct: false,  //是否秒杀商品
            isSeckillReadStatus: false, //秒杀即将开始 
            seckillDateTips: '',        //秒杀即将开始提示
            currentTimes: 0,            //系统当前时间
            seckillStartTime: 0,        //秒杀开始时间
            seckillEndTime: 0,          //秒杀结束时间
            seckillHour:'00',           //时
            seckillMin:'00',            //分
            seckillSec:'00',            //秒
            headImg:'',                 //顶部头像       // 2018.07.26 change
            peoName:'',
            splImgUrl:'',
            giftProduct:'',
            isActive:0,
            isActive1:0,
            backgroundImgUrl:'',
            bottomImgUrl:'',
            bottomImgList:[], //底部详情图片
            islong:true,
            islong1:false,
            primarySpecName:'',
            kucunNum:'',
            proprice:'',  //商品售价
            ischeckSucc:'',  //该用户是否进行过手机验证
            ischecknum: -1,
            kucunNumList:[],
        }
      },
      created() {
        let me = this;
        // this.productId = this.$route.query.productId;  //路径带参数
        // this.addcartpram.productId = this.productId;
        this.routerPath = rootPath;  //保存路径
        // this._getProductDetail()
        this._giftProductInfo()
      },
      mounted() {
        // 页面监听滚动
        window.addEventListener('scroll', this.handleScroll)  
        sa.track('inviteH5View', {
          inviteType: '邀请经销商',
          inviteCode: '',
        })
      },
      // mixins: [getImgPath],
      methods: {
        _giftProductInfo(){
            let me = this
            me.showLoading = true;
            productGiftInfo().then(res => {
                console.log(res)
                this.addcartpram.productId = res.data.productId
                this.productId = res.data.productId
                this.giftProduct = res.data.productSpecList
                this.headImg = res.data.logo
                this.peoName = res.data.storeName
                this.backgroundImgUrl = this.giftProduct[0].imageUrl
                this.bottomImgList = this.giftProduct[0].productDesc
                this.primarySpecName = this.giftProduct[0].primarySpecName
                this.kucunNum = this.giftProduct[0].stockNumber
                this.proprice = this.giftProduct[0].price
                this.ischeckSucc = res.data.isValidateMobile
                this.ischeckSucc = 0
                this.imagePath = this.giftProduct[0].imageUrl
                this.productPrice = this.giftProduct[0].price
                // console.log(this.giftProduct[0].price)
                for(var i=0;i<this.giftProduct.length;i++){
                    this.kucunNumList.push(this.giftProduct[i].stockNumber)
                }
                this.nickName = res.data.nickName
                
                me.showAlert=false;
                me.showLoading = false;
                me.showSeckillProduct = false;
                me.isSeckillReadStatus = false;
                me.showProductEffectIntro = false;
                if (res.code == "1") {
                    me.productSpecList = res.data.productSpecList;
                    // me.headerImageList = res.headerImageList;
                    me.quantity = res.data.cartProductNumbers;
                    me.productInfo = res.data;
                    if(me.productInfo){
                        // me.productPrice = me.productInfo.price;
                        me.productName = me.productInfo.productName;
                        if(me.productInfo.isSpceProduct == 0){
                            me.stockNumber = Number(me.productInfo.stockNumber);
                            me.productType = Number(me.productInfo.productType);
                        }

                        // //商品作用简介
                        // if(me.productInfo.productEffectIntro.length > 0){
                        //     me.showProductEffectIntro = true;
                        // }
                    }

                    // 规格商品信息
                    if(me.productInfo.isSpceProduct == 1){
                        me.primarySpecList = [];
                        me.secondarySpecList = [];

                        // 所有商品信息
                        me.productSpecList.forEach((item)=>{
                            let isExistPrimarySpec = false;
                            if(me.primarySpecList.length > 0){
                                me.primarySpecList.forEach((productSpec)=>{
                                    if(productSpec.primarySpecId == item.primarySpecId){
                                        isExistPrimarySpec = true;
                                        return;
                                    }
                                })
                            }

                            if(!isExistPrimarySpec){
                                me.primarySpecModelName = item.primarySpecModelName;
                                me.primarySpecList.push(Object.assign({}, item, {isChecked: false, isDisabled: false}));
                            }
                        })
                    }

                    if(me.productInfo.isMoreSpecProduct == 1){
                        me.productSpecList.forEach((item)=>{
                            let isExistSecondarySpec = false;
                            if(me.secondarySpecList.length > 0){
                                me.secondarySpecList.forEach((productSpec)=>{
                                    if(productSpec.secondarySpecId == item.secondarySpecId){
                                        isExistSecondarySpec = true;
                                        return;
                                    }
                                })
                            }

                            if(!isExistSecondarySpec){
                                me.secondarySpecModelName = item.secondarySpecModelName;
                                me.secondarySpecList.push(Object.assign({}, item, {isChecked: false, isDisabled: false}));
                            }
                        })
                    }

                    // 运费 优先判断是否包邮
                    if(res.data.isFreePostage == 1 ){ //包邮
                        me.postage = res.data.postageData.freePostageAct;
                        this.kkk = res.data.postageData.postageDescH5List
                    }else if(res.data.isFreePostage == 0 ){ //不包邮
                        me.postage = res.data.postageData.postage+'元';
                        this.kkk = res.data.postageData.postageDescH5List;
                    }
                }else{
                  this.showAlert = true;
                  this.alertText = res.msg;
                }
            })
        },
        reClick(data,index){
            this.isActive = index
            this.backgroundImgUrl = this.giftProduct[index].imageUrl
            this.bottomImgList = this.giftProduct[index].productDesc
            this.primarySpecName = this.giftProduct[index].primarySpecName
            this.kucunNum = this.giftProduct[index].stockNumber
            this.proprice = this.giftProduct[index].price
            
            this.ischecknum = index   //当前已选择了第几个规格
        },
        reClick1(data,index){
            this.isActive1 = index
            this.backgroundImgUrl = this.giftProduct[index].imageUrl
            this.bottomImgList = this.giftProduct[index].productDesc
            this.primarySpecName = this.giftProduct[index].primarySpecName
            this.kucunNum = this.giftProduct[index].stockNumber
            this.proprice = this.giftProduct[index].price

            this.ischecknum = index   //当前已选择了第几个规格
            window.scrollTo(0,30)
        },
        close() {
          this.isShowDownload = false
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
        _filter(add, areaname, areaId) {
            let result = [];
            for (let i = 0; i < add.length; i++) {
                if (areaId == add[i].areaId) {
                    result = add[i][areaname];
                }
            }
            return result;
        },
    
        buyNow() {
            this.iszhuce = false
            console.log(this.productInfo)

            if(this.productInfo.level == 0){    //普通用户
                if(this.ischeckSucc == 0){  //是否验证过
                    this.iszhuce = true
                }else{
                    this.oprType = 2;
                    this.oprText = "立即购买";
                    this.chooseProductNum();  
                }
            }else if(this.productInfo.level == 1){  // vip
                    this.oprType = 2;
                    this.oprText = "立即购买";
                    this.chooseProductNum();  
            }else{
                this.showAlert=true;
                this.alertText="您已经是集客多代理了哦~";
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
            // this.productPrice = this.productInfo.price;
            this.addcartpram.num = 1;
            console.log(this.kucunNumList)

            if(this.productInfo.isSpceProduct == 1){
                this.showProductSpec = true;
                if(this.primarySpecList.length > 0){
                    this.primarySpecList.forEach((productSpec)=>{
                        productSpec.isChecked = false;
                        productSpec.isDisabled = false;
                    });
                }
                if(this.ischecknum != -1){
                    // console.log(this.ischecknum)    //用户已选择第几个规格
                    for(var i=0;i<this.primarySpecList.length;i++){
                        this.primarySpecList[this.ischecknum].isChecked = true
                    }
                    console.log(this.primarySpecList)
                    this.imagePath = this.giftProduct[this.ischecknum].imageUrl
                    this.selectSpecInfo =  this.primarySpecList[this.ischecknum].primarySpecName
                    this.productPrice = this.giftProduct[this.ischecknum].price
                }
                
                for(var i=0;i<this.kucunNumList.length;i++){
                    if(this.kucunNumList[i] == 0){
                        this.primarySpecList[i].isDisabled = true
                    }
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

                if(this.productInfo.isMoreSpecProduct == 1){
                    let isSelectSecondarySpec = false;
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

            //立即购买
            let params = qs.stringify({                                            
                productId: me.productId,
                productSpecId: productSpecId,
                number: me.addcartpram.num
            })

            checkBuy(params).then(res => {
                console.log('----购买大礼包----')
                console.log(res);
                if (res.code == "1"){ // 验证成功 跳转支付
                    me.$router.push({
                        path:  me.routerPath+'/confirmOrder',
                        query: {
                            id: me.productId,
                            productSpecId: productSpecId,
                            num: me.addcartpram.num
                        }
                    });
                    
                }else if(res.code == '-11'){  //需要开通经销商 跳转开通经销商页面
                    this.showAlert = true;
                    this.alertText = res.msg;
                    this.showBuy = !this.showBuy;
                }else {   //报错提示            
                    this.showAlert = true;
                    this.alertText = res.msg;
                    this.showBuy = !this.showBuy;
                }
            })
        },
        selectPrimarySpec(item, index) {
            if(item.isDisabled){
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
                                        this.productPrice = productSpec.price;
                                        secondarySpecName = productSpec.secondarySpecName;
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
        // 下载集客多
        getTop(){
            window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.webapp.jkd"
        },
        // 监听高度方法
        handleScroll () {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            this.scTop = scrollTop
        },
        // 答疑跳转
        showQues(){
            alert('页面待添加')
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
                let params = qs.stringify({ 
                    mobile: phone,
                    countryCode: 86,
                    codeType: 5
                })
                sendCode(params).then(res => {

                    // sa.track('obtainCaptcha', {
                    //     pageType: '升级经销商',
                    //     phoneNumber: phone+'',
                    //     isResend: this.isResend ? true : false
                    // })

                    console.log(res)
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
            }

            if(this.timeoutKey == '1' & this.linkKey != '1'){                //倒计时控制开启  接口控制关闭  此时进行倒计时
                this.disabled = true
                // obj.setAttribute("disabled", true);                  //不可选中
                this.divname = "重新发送" + this.countdown;
                this.countdown--;                                       //数字倒计时
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
            if(this.yzcode == '' || this.phonecode == ''){
                this.alertText = '请输入完整的信息'
                this.showAlert = true
            }else{                                //开始手机验证
                console.log(this.yzcode)
                let params = qs.stringify({
                    mobile: this.phonecode,       //手机号
                    smsCode: this.yzcode,         //验证码
                })
                
                checkSmsCode(params).then(res => {   //手机验证接口
                    if(res){
                        if(res.code =='1'){          //验证成功
                            this.iszhuce = false
                            this.alertText = res.msg
                            this.showAlert = true
                            this.ischeckSucc = 1     //确认验证成功
                            this.oprType = 2;
                            this.oprText = "立即购买";
                            this.chooseProductNum(); 
                        }else{                       //验证失败 提示错误
                            this.alertText = res.msg
                            this.showAlert = true
                        }
                    }else{
                        this.alertText = '网络错误,请稍候重试'
                        this.showAlert = true
                    }
                })
            }
        },
        // 去分享给好友
        goshare(){
            this.isshare = true
        },
        // 关闭分享蒙层
        closeShare(){
            this.isbuy = false
        },
        // 底部购物车按钮
        goCart(){
            if(this.productInfo.isH5CommonUser == 1){   //优先注册
                this.iszhuce = true
            }else{
                this.$router.push({
                    path:  this.routerPath+'/cart'
                });
            } 
        },
        closebuy(){
            this.showBuy = false
        }
    },

    components: {
        loading,
        AlertTip,
        MoreBanner,
        DownApp
    },
    filters: {
        sfFixed: function(value) {
            return value.toFixed(2);
        }
    },
    computed: {
    　　num(){
    　　　return this.addcartpram.num
    　　},
        top(){
    　　　return this.scTop
    　　}
    },
      watch: { 
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
          //console.log('-------' + this.stockNumber + '--' + newValue);
          if(newValue > this.stockNumber){
            this.showAlert=true;
            this.alertText="温馨提示,超出商品库存限额~";
            this.addcartpram.num = this.stockNumber;
          }
　　     },
        // 监听高度
        top(newValue, oldValue){
            // console.log(newValue)
            if(newValue > 30){
                this.islong = false
                this.islong1 = true
            }
            if(newValue < 30){
                this.islong = true
                this.islong1 = false
            }
        },
        isActive(newValue, oldValue){
            this.isActive1 = newValue
        },
        isActive1(newValue, oldValue){
            this.isActive = newValue
        }
      }
    }
</script>

<style lang="css" scoped>
  @import 'invitationDetail';

  .altKK {
    position: fixed;
    z-index: 100000;
    top: 87%;
    left: 50%;
    background-color: white;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 100%;
    height: 7.552rem;
  }
  .grey1 {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
  }
  .freightDes {
    width: 100%;
    height: 2.176rem;
  }
  .fD_1 {
    width: 60px;
    height: 20px;
    position: relative;
    top: 35%;
    left: 13px;
    color: #333333;
    font-size: 14px;
  }
  .fD_2 {
    display: inline-block;
    width: 18px;
    height: 18px;
    position: absolute;
    right: 10px;
    top: 15px;
  }
  .description {
    width: 100%;
    height: 5rem;
    padding: 10px;
  }
  .bottSp {
    display: block;
    width: 100%;
    height: 0.05rem;
    background-color: #DDDDDD;
  }
  .dr_1 {
    height: 4rem;
    position: relative;
    font-size: 12px;
    line-height: 23px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    /* autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
    word-break: break-all;
  }
  .guigePro {
    width: 100%;
    background-color: #fff;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 5000;
  }
  .proTitle {
    width: 100%;
    height: 3.925333rem;
    position: relative;   
  }
  .proImg{
    width: 2.901333rem;
    height: 2.901333rem;
    display: block;
    position: absolute;
    left: .426667rem;
    top: .256rem;
  }
  .proPrice{
    display: block;
    width: 2.56rem;
    height: .597333rem;
    line-height: .597333rem;
    color: #fb4a4c;
    font-size: .725333rem;
    position: absolute;
    left: 4.053333rem;
    top: 1.152rem;
  }
  .proAllInfo{
    display: block;
    width: 10.973333rem;
    height: .512rem;
    line-height: .512rem;
    color: #999999;
    font-size: .512rem;
    position: absolute;
    left: 4.053333rem;
    top: 2.048rem;
  }
  .proColor{
    width: 100%;
    /*// height: 3.029333rem;*/
    /*// height: 6.061333rem;*/
    height: auto;
    position: relative;
    font-size: 0;
    /*// overflow: hidden;*/
  }
  .tt1{ 
    width: 100%;
    /*// height: 1.877333rem;*/
    /*// height: 3.7546rem;  */
    height: auto;
  }
  .tit11{
    display: block;
    width: 100%;
    height: 1.152rem;
    line-height: 1.152rem;
    text-indent: .853333rem;
    font-size: .597333rem;
    color: #999999;
  }
  .proColor button{
    background-color: #fff;
    display: inline-block;
    /*// width: 2.773333rem;  */
    width: auto;
    height: 1.28rem;
    text-align: center;
    line-height: 1.28rem;
    color: #666666;
    font-size: .554667rem;
    margin-left: .597333rem;
    margin-bottom: .597333rem;
    border: .042667rem solid #999999;
    border-radius: .213333rem .213333rem .213333rem .213333rem;
    padding-left: .426667rem;
    padding-right: .426667rem;
  }
  .proSize{
    width: 100%;
    /*// height: 3.029333rem;*/
    /*// height: 6.06333rem;*/
    height: auto;
    position: relative;
    font-size: 0;
    /*// padding-right: 5.12rem;  */
  }
  .proSize ul{
    width: 100%;
    /*// height: 1.877333rem;             */
    height: auto;  
  }
  .proSize button{
    background-color: #fff;
    display: inline-block;
    /*// width: 2.773333rem;*/
    width: auto;
    height: 1.28rem;
    text-align: center;
    line-height: 1.28rem;
    color: #666666;
    font-size: .554667rem;
    margin-left: .597333rem;
    margin-bottom: .597333rem;
    border: .042667rem solid #999999;
    border-radius: .213333rem .213333rem .213333rem .213333rem;
    padding-left: .426667rem;
    padding-right: .426667rem;
  }
  .shuifei{
    width: 100%;
    height: 2.090667rem;
    position: relative;
  }
  .shuifei1{
    width: 1.493333rem;
    height: .597333rem;
    font-size: .597333rem;
    color: #666;
    position: absolute;
    left: .426667rem;
    top: .768rem;
  }
  .shuifei2{
    width: 3.157333rem;
    height: .853333rem;
    line-height: .853333rem;
    font-size: .469333rem;
    color: #fff;
    text-align: center;
    background-color: #F99A99;
    position: absolute;
    left: 11.9rem;
    top: .768rem;
  }
  .buynow2{
    width: 100%;
    height: 2.090667rem;
    background-color: #fb4a4c;
    color: #ffffff;
    text-align: center;
    line-height:  2.090667rem;
    font-size: .64rem;
  }
  .closePro{
    width: .682667rem;
    height: .682667rem;
    display: block;
    position: absolute;
    left: 14.976rem;
    top: .469333rem;
  }
  .activeSpec{
    background-color: #F99A99 !important;
    color:#fff!important;
  }
  .ee{
    border: .042667rem solid #E5E5E5 !important;
    color: #E5E5E5 !important;
    background-color: #fff !important;
  }
    .isActive{
        background-image: url('../../../../common/images/xz@2x.png');
        background-size: 99.2% 100%;
    }
    .isActive1{
        border: .04rem solid #FB4C51!important;
    }
</style>

