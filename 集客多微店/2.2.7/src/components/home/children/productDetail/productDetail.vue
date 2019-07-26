<template>
    <div>
        <div v-title :data-title="productName"></div>
        <div v-if="productName.length" v-stat="{type:'pageview', title:productName}"></div>

        <div v-if="productInfo.productName" v-stat="{type: 'pageview', title: productInfo.productName}"></div>
        <div v-show="!showLoading">
            <nav class="msite_nav">
                <!-- 轮播图 -->
                <more-banner v-if="headerImageList.length" :bannerList="headerImageList"></more-banner>
            </nav>
            <!--秒杀框  -->
            <div class="timeoutBuy" v-show="showSeckillProduct">
                <!--秒杀价格  -->
                <div class="toBuy_price">{{productInfo.price?'￥'+productInfo.price:''}}</div>
                <!--秒杀备注  -->
                <div class="toBuy_tip">经销商专享</div>
                <!--倒计时开抢  -->
                <div class="toBuy_fut" v-show="isSeckillReadStatus" >{{seckillDateTips}}</div>  
                <!--距离结束倒计时  -->
                <div class="toBuy_fut toBuy_sec" v-show="!isSeckillReadStatus">
                    距结束 {{seckillHour}} : {{seckillMin}} : {{seckillSec}}
                </div>
            </div>
            <div class="info_div">
                <p class="txt txtkey" style="font-size:15px;margin-top:10px;">{{productInfo.productName}}</p>
                <p class="proTip" v-show="showProductEffectIntro" style="font-size:15px;margin-top:10px;">{{productInfo.productEffectIntro}}</p>

                <!-- 普通商品价格 -->
                <p class="price" v-show="productInfo.isGroupProduct == 0" style="color:#FB4A4C;font-size:20px;font-weight:600">¥{{productInfo.price}} <del class="price_del" v-show="productInfo.taobaoPrice != ''">¥{{productInfo.taobaoPrice}}</del> </p>
                <!-- 组合商品价格 -->
                <p class="price" v-show="productInfo.isGroupProduct == 1" style="color:#FB4A4C;font-size:20px;font-weight:600">¥{{productInfo.groupPriceRegion}} <del class="price_del" v-show="productInfo.taobaoPrice != ''">¥{{productInfo.taobaoPrice}}</del></p>

                <!-- 新建红色框 -->
                <!-- <div class="paySOTip">-->
                    <!--提示文字  -->
                   <!--  {{productInfo.priceDiscount}}-->
                    <!--跳转  -->
                    <!-- <span @click="ktload" style="float:right;margin-right:1.3rem;bottom:2px" v-if="productInfo.isBuyPackage == 1">立刻开通</span>-->
                    <!--指示箭头  -->
                    <!-- <div class="weui-cell-ft" style="position:relative;bottom:2px;right:9px;margin-top:-.3rem;" v-if="productInfo.isBuyPackage == 1"></div>-->
                    <!--分享  -->
                    <!-- <span class="fenxiang" v-if="productInfo.isBuyPackage == 0" @click="goshare">-->
                    <!--     <img src="../../../../common/images/fx@2x.png" style="display:block:width:100%;height:100%">-->
                    <!-- </span>-->
                <!-- </div>-->
                <div class="label">
                    <p class="label_p" v-for="(info,index) in productInfo.infoList" :style="{margin:index==0?'0':'0 0 0 20px'}">
                        <img class="label_img" src="../../../../common/images/icon_name@2x.png">{{info.value}}
                    </p>
                </div>
            </div>
            <div class="list-dp">
                <div class="weui-cell weui-cell-access" id="showIOSActionSheet" @click="choseAdd()" style="height:50px">
                    <div class="weui-cell-bd">
                        <span style="vertical-align: middle" id="peisong_address">配送&nbsp&nbsp&nbsp{{Province?Province:'省份'}}、 {{City?City:'城市'}}、{{District?District:'区域'}}</span>
                    </div>
                    <div class="weui-cell-ft"></div> 
                </div>
                <!-- <div class="weui-cell weui-cell-access" v-show="productInfo.productType=='3'"> -->
                <!--商品重量  -->
                <!-- <div class="weui-cell weui-cell-access" v-show="productee" style="height:50px"> -->
                        <!-- <div class="weui-cell-bd">  -->
                        <!-- {{productInfo.postageData.totalWeights}} -->
                            <!-- <span style="vertical-align: middle"><p class="dp">重量&nbsp&nbsp<span id="yunfei"></span><span>{{weightDesc}}</span></p>  -->
                            <!-- </span>  -->
                        <!-- </div>  -->
                <!-- </div> -->
                <div class="weui-cell weui-cell-access" style="height:50px">
                    <div class="weui-cell-bd" @click="cpa()">
                        <span style="vertical-align: middle"><p class="dp">运费&nbsp&nbsp&nbsp<span id="yunfei">{{postage}}</span></p>
                        </span>
                        <div class="weui-cell-ft" style="position:relative;bottom:5px"></div>
                    </div>
                </div>
            </div>
            <div class="weui-cell weui-cell-access top" style="padding-bottom: 10px;height:70px" @click.stop="closeDesc()">
                <div class="weui-cell-bd" >
                    <div class="sm" style="font-family: Hiragino Sans GB;font-weight:600;font-size: 13px;color: #333333;">说明</div>
                    <div class="sm_right" style="padding-top:13px;height:65px">
                        <!--灰字说明-->
                        <div class="minTitle" v-for="(descinfo,index) in productInfo.productIntroList" :class="{'activee':!index}">
                            <p>{{descinfo.title}}</p>
                        </div>
                        <!-- <p v-for="descinfo in productInfo.productIntroList">{{descinfo.title}}</p>  -->
                    </div>
                </div>
                <div class="weui-cell-ft"></div>
            </div>
            <!--答疑  -->
            <!-- <div class="question" @click="showQues">
                <img src="../../../../common/images/wen.png" class="ques_im1">
                <p class="ques_p1">今天天气好吗？</p>
                <img src="../../../../common/images/da.png" class="ques_im2">
                <p class="ques_p2">千万可千万级科技武器二级我去额情况无穷无尽阿达撒萨达萨达萨达雷克萨第六课</p>  
                <div class="weui-cell-ft" style="position:relative;bottom:25px"></div>
            </div>  -->
            <div class="evaluate" @click="goallevaluate()">
                <div class="eval_num" @click="goallevaluate()">{{'商品评价('+evaluatedata.evaluateQuantity+')'}}</div>
                <div class="evaluateRate" v-if="evaluatedata.dataInfoList.length != 0" @click="goallevaluate()">{{evaluatedata.evaluateRate}}</div>
                <div class="weui-cell-ft" style="position:relative;top:-1.16rem;right:.6rem;"></div>
                <div class="banner" style="width:100%;height:5.5rem;padding-top:.2rem;" v-if="evaluatedata.dataInfoList.length != 0">
                    <swiper :options="swiperOption" style="width:100%;height:5.5rem;" class="autoslide">
                        <swiper-slide v-for="items in evaluatedata.dataInfoList" style="height:4.9rem!important" class="info">
                            <div class="userImg" @click="goallevaluate()">
                                <img :src="items.userHeaderImage" v-if="items.userHeaderImage != ''">
                                <img src="../../../../common/images/localimg.png" v-if="items.userHeaderImage == ''">
                            </div>
                            <div class="userNickName">{{items.nickName}}</div>
                            <div class="userContnet" v-if='items.imageUrlList.length !=0' @click="goallevaluate()">{{items.content}}</div>
                            <div class="userContnet1" v-if='items.imageUrlList.length ==0' @click="goallevaluate()">{{items.content}}</div>
                            <img v-if='items.imageUrlList.length !=0' :src="items.imageUrlList[0].imageUrl" style="width:4.650667rem;height:4.949333rem;position: absolute;right:0;" @click="goallevaluate()">
                            <div class="imgnumber" v-if="items.imageUrlList.length != 0">{{items.imageQuantity}}</div>
                        </swiper-slide>
                        <swiper-slide @click="goallevaluate()">
                            <img src="../../../../common/images/Seemore@2x_80.png" style="width:4.949333rem;height:4.949333rem;margin-left:2rem;" @click="goallevaluate()">
                        </swiper-slide>
                    </swiper>
                </div>
            </div>
            <div class="choose">
                <div class="left c">
                    <div class="kko" :class='{chco: descStatus ==0}' @click="descStatusChange(0)">产品介绍</div>
                </div>
                <div class="right c">
                    <div class="kko" :class='{chco: descStatus ==1}' @click="descStatusChange(1)">购买答疑</div>
                </div>
            </div>
            <div class="usemethod" @click="showusemethod()" v-if="ccc != ''">
                使用方法
            </div>
            <div v-show="descStatus==0">
                <div class="dp_img_list" style="display: block;">
                    <p>
                        <img v-for="(img,index) in productInfo.productDesc" v-lazy="img.src" :key="index">
                    </p>
                </div>
            </div>
            <div v-show="descStatus==1">
                <div v-show="!productInfo.purchaseNotes" class="dp_img_list" style="font-size: 0.55rem;padding: 10px;">
                    暂无购买须知！
                </div>
                <div v-show="productInfo.purchaseNotes" class="dp_img_list" style="font-size: 0.55rem;padding: 10px;background-color:#fff">
                    <!-- <img v-for="(img,index) in productInfo.purchaseNotes" v-lazy="img.src" :key="index"> -->
                    <div class="answerMout" v-for="(data,num) in productInfo.purchaseDoubtList">
                        <div class="aM_1">
                            <span style="color:#FF969E;font-size:16px" class="aMSp_1">Q</span><span class="aMSp_2" style="color:#333333;font-size:14px; line-height: 14px;">{{num+1}}. {{data.title}}</span>
                        </div>
                        <div class="aM_2">
                            <span style="color:#999999;font-size:13px" class="aMSp_3">A</span><span class="aMSp_4" style="color:#666666;font-size:12px; line-height: 16px;">{{data.description}}</span>
                        </div> 
                    </div>
                </div>

            </div>
            <transition name="slide">
                <!-- <section class="myAddress"> -->
                    <!-- <section class="showChose" v-if="showChose" @click="closeAdd()"></section> -->
                    <div class="address" v-if="showChose">
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
                    </div>
                <!-- </section> -->
            </transition>
            <!-- <transition name="fades"> 
                <div class="cover" v-if="showBuy || showChose" @click="closeBuy"></div>
            </transition>  -->
            <transition name="spec_mandel_ani">
                <section class="choose_type_Container choose_spec_container" v-if="showBuy">
                    <!--商品顶部标题  -->
                    <div class="proTitle">
                        <span class="proImg">
                            <img :src="imagePath" style="width:100%;height:100%;display:block;">  
                            <!-- <img :src="imagePath"  style="width:100%;height:100%;display:block;"> -->
                        </span>
                        <span class="proPrice">¥{{productPrice}}</span>

                        <!-- <span class="proAllInfo" v-if="!showProductSpec && productInfo.isSeckillLimit != 1">{{selectSpecInfo}}</span> -->
                        <!-- <span class="proAllInfo1" v-if="!showProductSpec && productInfo.isSeckillLimit == 1">{{selectSpecInfo}}</span> -->
                        
                        <span class="proAllInfo" v-if="showProductSpec && imposeBuyData.isSeckillLimit != 1">{{selectSpecInfo}}</span>
                        <span class="proAllInfo1" v-if="showProductSpec && imposeBuyData.isSeckillLimit == 1">{{selectSpecInfo}}</span>

                        <span class="keybuyInfo" v-if="!showProductSpec && productInfo.isSeckillLimit == 1">{{'限购'+productInfo.seckillLimitNumber+'件'}}</span>
                        <span class="keybuyInfo" v-if="showProductSpec && imposeBuyData.isSeckillLimit == 1">{{'限购'+imposeBuyData.seckillLimitNumber+'件'}}</span>
                        
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
                                <li class="tt1div" v-for="(item, index) in primarySpecList" @click="selectPrimarySpec(item, index)" :class="{'activeSpec': item.isChecked,'ee': item.disabled}" >
                                    {{item.primarySpecName}}
                                </li>
                            </ul>
                        </div>
                        <span class="coverligg"></span>
                        <!--二级规格  -->
                        <div class="proSize" v-if="showProductSecondarySpec">
                            <span class="tit11">{{secondarySpecModelName}}</span>
                            <ul>
                                <li class="tt1div" v-for="(item, index) in secondarySpecList" @click="selectSecondarySpec(item, index)" :class="{'activeSpec': item.isChecked,'ee': item.disabled}">
                                    {{item.secondarySpecName}}
                                </li>
                            </ul>
                        </div>
                        <span class="coverligg"></span>
                    </div>
                    <!--选择数量  -->
                    <div class="list">
                        <p class="list_p">数量</p>
                        <div class="gw_num" style="margin-top: 13px;">
                            <span class="input-number-decrement" @click="subtraction();">–</span>
                            <input class="input-number" v-model="addcartpram.addNum">
                            <span class="input-number-increment" @click="add();">+</span>
                        </div>
                        <div class="warntit" v-if="!showProductSpec && productInfo.isSeckillLimit == 1 && productInfo.seckillExistBuyNum != 0">
                            此规格商品限购{{productInfo.seckillLimitNumber}}件（您已购买{{productInfo.seckillExistBuyNum}}件）
                        </div>
                        <div class="warntit" v-if="!showProductSpec && productInfo.isSeckillLimit == 1 && productInfo.seckillExistBuyNum == 0">
                            （此规格商品限购{{productInfo.seckillLimitNumber}}件）
                        </div>
                        <div class="warntit" v-if="showProductSpec && imposeBuyData.isSeckillLimit == 1 && imposeBuyData.seckillExistBuyNum != 0">
                            此规格商品限购{{imposeBuyData.seckillLimitNumber}}件（您已购买{{imposeBuyData.seckillExistBuyNum}}件）
                        </div>
                        <div class="warntit" v-if="showProductSpec && imposeBuyData.isSeckillLimit == 1 && imposeBuyData.seckillExistBuyNum == 0">
                            （此规格商品限购{{imposeBuyData.seckillLimitNumber}}件）
                        </div>
                        <!--税费显示  -->
                        <!-- <div class="shuifei" v-show="productType==2">
                            <div class="shuifei1">税费</div>
                            <div class="shuifei2">本商品已包税</div> 
                        </div>  -->
                        <!--购买  -->
                    </div>
                    <div class="buynow2" @click="doOperation();">确定</div>
                </section>
            </transition>
<!-- 
            <transition name="fade"> 
                <div class="cover" v-if="showDesc" @click="closeDesc"></div>
            </transition>  -->
            <transition name="slid_up">
                <div class="choose_type_Container" v-if="showDesc">
                    <p style="padding-left: .426667rem;line-height: 1.92rem;font-size: 0.6rem;color: #666;  border-bottom: .042667rem #eee solid;">商品说明</p>
                    <div class="fD_2" @click="closeDesc">
                        <img src="../../../../common/images/icon_guanbi@2x.png" width="17" style="display: block;">
                    </div>
                    <div class="gm-task" > 
                        <div class="sm_right" style="margin-left: 10px;margin-top: 0px;padding-top:8px" v-for="descinfo2 in productInfo.productIntroList">
                            <div style="color:#666;font-size:0.55rem;"><span></span>{{descinfo2.title}}</div>
                            <div style="color:#666;font-size:0.5rem;line-height:18px;margin-left: 11px;margin-top: 2px;padding-right:15px">{{descinfo2.introduction}}</div>
                        </div>
                    </div>
                </div>
            </transition> 
            <!-- </div> -->
            <footer class="foot_div" style="z-index:10000;height:2.1rem">
                <router-link class="href" tag="div" :to='{path: routerPath+"/index"}'>
                    <div class="zy ff" style="background:#fff">
                    <img src="../../../../common/images/icon_shouye@2x.png">主页
                    </div>
                </router-link>
                <!--网易七鱼客服跳转链接  -->
                <a class="href" href="https://jikeduo.qiyukf.com/client?k=06f1b1294f5f993266d9931f9be05e51&wp=1">
                    <div class="gwc ff" style="background:#fff">
                    <img src="../../../../common/images/kfimg@2x.png"> 客服
                    </div>
                </a>
                <div class="href" @click="goCart">
                    <div class="gwc ff" style="background:#fff">
                    <p class="addcart-goods-num" v-show="quantity>0">{{quantity}}</p>
                    <img src="../../../../common/images/icon_gouwuche@2x.png"> 购物车
                    </div>
                </div>
                <!--1.83根据新增商品类型以及 正常库存/活动库存 判断  -->
                <!--正常商品  -->
                <div class="actionGroup">
                    <button class="jr_gwc bt part"  v-show="productInfo.isSeckillProduct == '0' && productInfo.isSoldOut!='1'" @click="addCartEnv">加入购物车</button> 
                    <button class="gm bt part"  v-show="productInfo.isSeckillProduct == '0' && productInfo.isSoldOut!='1'"  @click="buyNowEnv">立即购买</button> 
                    <button class="bt full" v-show="productInfo.isSeckillProduct == '0' && productInfo.isSoldOut=='1'" style="width: 55%;background: #999;">暂无库存</button>  
                    
                    <!--秒杀商品  -->
                    <!--开抢提醒  status=1 -->
                    <button class="bt part" v-show="productInfo.isSeckillProduct == '1' && productStatus == 1" style="width: 55%;background: #FB4A4C;" @click.stop.prevent="remindMsgEnv()" v-html="remindText"></button>
                    <!--正常购买  status=2-->
                    <button class="jr_gwc bt part"  v-show="productInfo.isSeckillProduct == '1' && productStatus == 2" @click="addCartEnv" style="border-right: 1px #fff solid;">加入购物车</button> 
                    <button class="gm bt part"  v-show="productInfo.isSeckillProduct == '1' && productStatus == 2"  @click="buyNowEnv">立即购买</button>
                    <!--提示升级  status=3-->
                    <button class="bt full" v-show="productInfo.isSeckillProduct == '1' && productStatus == 3" style="width: 55%;background: #FB4A4C;" @click="ktload">升级经销商开启秒杀</button>
                    <!--提示售罄  status=4-->
                    <button class="bt full" v-show="productInfo.isSeckillProduct == '1' && productStatus == 4" style="width: 55%;background: #999;">暂无库存</button>
                </div>

            </footer>
        </div>
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText" style="z-index: 99999;"></alert-tip>
        <transition name="loading"> 
            <loading v-show="showLoading"></loading>
        </transition> 
        
        <!--优化运费说明弹窗动画-->
        <transition name="slide">
            <section v-if="yunfeikk" class="choose_type_Container" style="height:13rem">
                <div class="freightDes">
                    <div class="fD_1">
                        运费说明
                    </div>
                    <span class="fD_2" @click="yunfeiXs()">
                        <img src="../../../../common/images/icon_guanbi@2x.png">
                    </span>
                    <!-- <div class="weui-cell-ft"></div> -->
                </div>
                <!-- <span class="bottSp"> </span> -->
                <div class="description">
                    <div class="dr_1">
                        <div style="color:#666;font-size:0.5rem;">{{kkk}}</div>
                    </div>
                    <!-- <div v-else>
                        <div class="dr_1" v-for="tit in kkk">
                            <div style="color:#666;font-size:0.5rem;">{{tit.postageDesc}}</div>
                        </div>
                    </div> -->
                </div>
            </section>
        </transition>  

        <!-- 使用说明 -->
        <transition name="slide">
            <section v-if="yunfeikk1" class="choose_type_Container" style="height:13rem;">
                <div class="freightDes">
                    <div class="fD_1">
                        使用方法
                    </div>
                    <span class="fD_2" @click="yunfeiXs1()">
                        <img src="../../../../common/images/icon_guanbi@2x.png">
                    </span>
                    <!-- <div class="weui-cell-ft"></div> -->
                </div>
                <!-- <span class="bottSp"> </span> -->
                <div class="description">
                    <div class="dr_1">
                        <div style="color:#666;font-size:0.5rem;">{{ccc!=''?ccc:'此商品暂未标注使用方法'}}</div>
                    </div>
                    <!-- <div v-else>
                        <div class="dr_1" v-for="tit in kkk">
                            <div style="color:#666;font-size:0.5rem;">{{tit.postageDesc}}</div>
                        </div>
                    </div> -->
                </div>
            </section>
        </transition>  

        <transition name="fade">
            <span class="grey1" v-if="yunfeikk || iszhuce || showBuy || showChose || showDesc || yunfeikk1" @click="hideMask"></span>
        </transition>
        <!-- <span class="grey1" v-show="iszhuce" @click="closeDiv"></span> -->
        <!--注册提示框  -->
        <div class="registered" v-show="iszhuce" style="z-index:99999">
            <div class="name">{{nickName?nickName+',请先完成手机验证':'请先完成手机注册'}}</div>
            <!--关闭  -->
            <div class="coverClose" @click="closeDiv"></div>  
            <div class="close1" @click="closeDiv">
                <img src="../../../../common/images/closediv.png"> 
            </div>  
            <span class="coversp"></span> 
            <!--手机号  -->
            <input id="phone" type="text" class="phone" placeholder="请输入手机号" v-model="phonecode" autofocus>
            <!--验证码  -->
            <input id="phone_code" type="text" class="number" placeholder="请输入验证码" v-model="yzcode" >
            <button id="btn" class="keyNum" @click="settime(this)" :disabled="disabled" >{{divname}}</button>
            <!--确认注册  -->
            <button class="sure" @click="getTip()">确认</button>
        </div>
        <!--分享界面蒙层  -->
        <div class="shareCover" v-show="isshare">
            <img src="../../../../common/images/lw@2x.png" class="shareimg1">
            <img src="../../../../common/images/zhixiang@2x.png" class="shareimg2">
            <div class="gosharediv">快去邀请好友</div>
        </div>
        <span class="grey2" v-show="isshare" @click="closeShare"></span> 
        <!--开抢提醒  -->
        <!-- 确认弹窗 -->
        <transition name="fade">
            <confirm v-show="isShowConfirm" :userMobile="userMobile" :productDetails=true @hideConfirm="hideConfirm" @confirm="confirm"></confirm>
        </transition>
    </div>
</template>
<script src="https://qiyukf.com/script/06f1b1294f5f993266d9931f9be05e51.js"></script>
<script>
    import loading from 'base/loading/loading'
    import DownApp from 'base/downApp/downApp'
    import MoreBanner from 'components/banner/banner'
    import qs from 'qs'
    import { getCityList, productDetail, addNumCart, orderCheckDetail, checkBuy, getPostage, shareProduct, getToken ,seckillList,userRegister,sendCode,seckillNotice} from 'api'
    import { wxShowOptionMenu, isWeiXin } from 'common/js/utils'
    import AlertTip from 'base/alertTip/alertTip'
    import { rootPath } from 'config/env'
    import storage from 'good-storage'
    import Confirm from 'base/confirm/confirm'
    import wx from 'weixin-js-sdk'
    import sa from 'sa-sdk-javascript';

    const ASSEMBLY_PRODUCT = 1
    const GOODS_MAX_NUM = 8
    const pullingDownBackHeight = -50
    const SECKILL_TAB_INDEX = '__seckillTabIndex__'
    const PRODUCT_ID = 'productId'
    const COUPON_ID = 'couponId'
    const USERINFO_MOBILE = '__userMobile__'

    export default {
      data() {
        return {
            isStr: false,
            productStatus:'',
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
            inviteProductId: '',
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
                addNum: 1,
                isFromCartList: false,
            }, //购物车商品数量修改请求参数
            oprType: 1, //操作类型 1-添加购物车 2-立即购买
            oprText: '', //操作描述
            quantity: 0, //购物车数量
            postage: '', //运费
            kkk:{}, //运费文字
            ccc:'',
            yunfeikk:false, //控制运费文字的显示
            yunfeikk1: false, //使用说明
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
            userMobile: '',                 //开抢提醒手机号
            isShowConfirm: false,

            remindText: '开抢提醒',
            evaluatedata:'',  //评价数据
            swiperOption: {
                freeMode : true,
                slidesPerView: 1.5,
                pagination: '.swiper-pagination',
                paginationClickable: true,
                autoplay: 2500,
                autoplayDisableOnInteraction: false,
                loop: false,
                coverflow: {
                　　rotate: 30,
                　　stretch: 10,
                　　depth: 60,
                　　modifier: 2,
                　　slideShadows : true
            　　}
            },
            canbuynum:'',   //限购数量
            readybuynum:'',  //已购数量 /包括待支付
            imposeBuyData:[],  //规格商品限购数据
        }
    },
    // beforeRouteLeave(to,from,next){
    //     to.meta.isBack = false
    // },
    created() {
        this.productId = this.$route.query.productId;  //路径带参数
        this.addcartpram.productId = this.productId;
        this.routerPath = rootPath;  //保存路径
        this._getProductDetail()
      },
    mounted() {
        // console.log(this.productId)
        // console.log(sessionStorage.detailpageProductId)

        this.userMobile = storage.get(USERINFO_MOBILE, '')
        console.log(this.userMobile)

        this._wxShareEnv()
        
        // 页面监听滚动
        window.addEventListener('scroll', this.handleScroll)
        
        if(this.productId == sessionStorage.detailpageProductId){
            this.returntop();
        }
    },

      // mixins: [getImgPath],
    methods: {
        showusemethod(){
            this.yunfeikk1 =! this.yunfeikk1;
        },
        returntop(){
            console.log('滚动到保存位置')
            // window.scrollTo(0,sessionStorage.detailpageReturnTop)
            window.scrollTo(0,700)
        },
        goallevaluate(){
            this.$router.push({
                path: this.routerPath + '/allevaluate',
                query: {
                    productId: this.productId,
                }
            })
        },
        hideMask() {
            this.showChose = false 
            this.showBuy = false 
            this.iszhuce = false 
            this.yunfeikk = false
            this.showDesc = false
            this.yunfeikk1 = false
        },
        _getProductDetail(){
            let me = this
            let params = qs.stringify({
                a: 'v1/productDetail',
                productId: this.productId
            })
    
            me.showLoading = true;
            productDetail(params).then(res => {
                console.log('商品详情数据----')
                console.log(res);
                this.ccc = res.data.usageMethod //使用说明
                this.evaluatedata = res.data.evaluate   //评价数据
                this.nickName = res.data.nickName
                this.canbuynum =  res.data.seckillLimitNumber  //限购总数
                this.readybuynum = res.data.seckillExistBuyNum  //已购数量

                me.showAlert=false;
                me.showLoading = false;
                me.showSeckillProduct = false;
                me.isSeckillReadStatus = false;
                me.showProductEffectIntro = false;

                if (res.code == "1") {
                    me.productSpecList = res.data.productSpecList;
                    me.headerImageList = res.headerImageList;
                    me.quantity = res.data.cartProductNumbers;
                    me.productInfo = res.data;

                    if(me.productInfo) {
                        me.inviteProductId = me.productInfo.inviteProductId;
                        me.productPrice = me.productInfo.price;
                        me.productName = me.productInfo.productName;

                        if(me.productInfo.isSpceProduct == 0){
                            me.stockNumber = Number(me.productInfo.stockNumber);
                            me.productType = Number(me.productInfo.productType);
                        }

                        //商品作用简介
                        if(me.productInfo.productEffectIntro.length > 0){
                            me.showProductEffectIntro = true;
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
                            }

                            if (toggle) {
                                me.primarySpecList.push(spec)
                                me.primarySpecModelName = me.primarySpecList[0].primarySpecModelName
                            }

                        })
                    }

                    //有二级规格商品添加二级规格
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
                        this.kkk = res.data.postageData.postageDesc;
                    }

                    // 秒杀商品
                    if(res.data.isSeckillProduct == 1){
                        //秒杀商品  
                        me.showSeckillProduct = true
                        if(res.data.isSeckillReadStatus == 1){  
                            //活动未开始
                            me.isSeckillReadStatus = true
                            me.seckillDateTips = res.data.seckillReadDateTips
                        }else{
                            //活动已开始 
                            me.isSeckillReadStatus = false
                            me.currentTimes = res.systemTime
                            me.seckillStartTime = res.data.seckillStartTime
                            me.seckillEndTime = res.data.seckillEndTime
                            me._seckillProductDown(); 
                        }
                    }

                    // 初始化秒杀商品状态
                    if(res.data.isSeckillProduct == '1'){  //是秒杀商品 
                        if(me.seckillStartTime >= me.currentTimes){   //活动预热中
                            if(this.productInfo.isBuyPackage == '0'){   //经销商
                                if(this.productInfo.isSoldOut == '0'){  //有货
                                    this.productStatus = 2                                        //正常                                
                                }else{  //没货
                                    this.productStatus = 1                                        //开抢提醒
                                }   
                            }else{      //vip或者普通  
                                if(this.productInfo.isSoldOut == '0'){  //有货
                                    this.productStatus = 3                                        //提示升级                         
                                }else{  //没货        
                                    this.productStatus = 3                                        //提示升级
                                } 
                            }
                        }else{   //活动开始中
                            if(this.productInfo.isBuyPackage == '0'){   //经销商
                                if(this.productInfo.isSoldOut == '0'){  //有货
                                    this.productStatus = 2                                        //正常                                
                                }else{  //没货
                                    this.productStatus = 4                                        //提示售罄
                                }   
                            }else{      //vip或者普通  
                                if(this.productInfo.isSoldOut == '0'){  //有货
                                    this.productStatus = 3                                        //提示升级                         
                                }else{  //没货        
                                    this.productStatus = 4                                        //提示售罄
                                } 
                            }
                        }
                    }

                    console.log('秒杀商品的状态')
                    console.log(this.productStatus)

                    // sa.track('$pageview', {
                    //   $title: me.productInfo.productName,
                    //   $url: location.href,
                    //   $url_path: location.pathname,
                    //   $referrer_host: location.hostname,
                    //   $referrer: document.referrer,
                    // })
                    sa.track('commodityDetail', {
                        isSeckilling: me.productInfo.isSeckillProduct == 1 ? true : false,
                        inviteCode: '',
                        commodityID: me.productInfo.productId,
                        commodityName: me.productInfo.productName,
                        firstCommodity: me.primarySpecList.length ? me.primarySpecList.join('') : '',
                        secondCommodity: me.secondarySpecList.length ? me.secondarySpecList.join('') : '',
                        originalPrice: parseFloat(me.productInfo.taobaoPrice),
                        pricePerCommodity: parseFloat(me.productInfo.price),
                        commodityDiscountAmount: parseFloat(me.productInfo.taobaoPrice) - parseFloat(me.productInfo.price),
                    });

                    // 获取城市列表
                    me._getCityList()
                }else{
                  this.showAlert = true;
                  this.alertText = res.msg;
                }
                
            })
        },
        _getCityList: function(){
            let params = qs.stringify({a: 'v1/regionList'})
            getCityList(params).then(res => {
                console.log('城市列表----')
                console.log(res)
                this.info = res.list;
            });
        },
        _seckillProductDown: function(){
            let me = this
            setInterval(function(){
                let currentTimes = Number(me.currentTimes);
                me.currentTimes = Number(currentTimes + 1000);
                let seckillStartTime = Number(me.seckillStartTime);
                let seckillEndTime = Number(me.seckillEndTime);
                
                if(seckillStartTime < currentTimes && currentTimes < seckillEndTime){
                    // 秒杀商品进行中
                    let currentDate = new Date(currentTimes);
                    let seckillEndDate = new Date(seckillEndTime);
                    let t = seckillEndDate.getTime() - currentDate.getTime();
                    let hour = Math.floor((t/3600000)%24);
                    let min = Math.floor((t/60000)%60);
                    let sec = Math.floor((t/1000)%60);

                    // 到计时时分秒
                    me.seckillHour = hour < 10 ? "0" + hour : hour;
                    me.seckillMin = min < 10 ? "0" + min : min;
                    me.seckillSec = sec < 10 ? "0" + sec : sec;
                }else{
                    // 秒杀已结束刷新页面
                    me._getProductDetail()
                }
            },1000);
        },
        close() {
          this.isShowDownload = false
        },
        yunfeiXs:function(){
            this.yunfeikk =! this.yunfeikk;
        },   
        yunfeiXs1:function(){
            this.yunfeikk1 =! this.yunfeikk1;
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
                let params = qs.stringify({
                    number: this.addcartpram.addNum,
                    productId: this.productId,
                    provinceId: this.province,
                    isWeb: true
                })
                // console.log(params)
                getPostage(params).then(res => {
                  console.log('运费计算----');
                  console.log(res);
                    if (res.code == "1") {
                        this.postage = res.postage+'元';    //更新运费
                        this.isStr = true;
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
        addCartEnv() {
            this.iszhuce = false
            if (this.productInfo.isH5CommonUser == 1) {    //加入购物车优先判断注册
                this.iszhuce = true
            } else {
                this.oprType = 1;
                this.oprText = "加入购物车";
                // console.log(this.productInfo)
                if (this.productInfo.isGroupProduct == ASSEMBLY_PRODUCT) {  // 商品组合
                    this.$router.push({
                        path: this.routerPath + '/groupProduct',
                        query: {
                            productId: this.productId,
                            oprType: this.oprType
                        }
                    })
                } else {
                    this.chooseProductNum();
                }
            }
        },
        buyNowEnv() {
            this.iszhuce = false
            if (this.productInfo.isH5CommonUser == 1) {   //确认订单优先判断注册
                this.iszhuce = true
            } else {
                this.oprType = 2;
                this.oprText = "立即购买";
                
                if (this.productInfo.isGroupProduct == ASSEMBLY_PRODUCT) {  // 商品组合
                    this.$router.push({
                        path: this.routerPath + '/groupProduct',
                        query: {
                            productId: this.productId,
                            oprType: this.oprType
                        }
                    })
                } else {
                    this.chooseProductNum();
                }
            } 
            
        },
        closeBuy() {
            this.showAlert=false;
            this.showBuy = false;
            this.showChose = false

            this.addcartpram.addNum = 1
            this.imposeBuyData = []
            // conosle.log(this.imposeBuyData)

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
            this.showAlert = false;
            this.selectSpecInfo = '请选择相关别类~';
            this.productPrice = this.productInfo.price;
            this.addcartpram.addNum = 1;

            if(this.headerImageList.length > 0){
                this.imagePath = this.headerImageList[0].imageUrl;
            }

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
            this.addcartpram.addNum = Number(this.addcartpram.addNum) + 1;
        },
        subtraction() {
            //数量减
            if (this.addcartpram.addNum > 1) {
                this.addcartpram.addNum = Number(this.addcartpram.addNum) - 1;
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

            if (this.oprType == "1") { 
                //加入购物车
                let params = qs.stringify({
                  productId: this.addcartpram.productId,
                  productSpecId: productSpecId,
                  addNum: me.addcartpram.addNum,
                //   isFromCartList: false
                })
                addNumCart(params).then(res => {
                  console.log('购物车改变---')
                  console.log(res);
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
                //立即购买
                let params = qs.stringify({
                    productId: me.productId,
                    productSpecId: productSpecId,
                    number: me.addcartpram.addNum
                })

                checkBuy(params).then(res => {
                    console.log('购买----')
                    console.log(res);
                    if (res.code == "1"){ // 验证成功 跳转支付
                        storage.remove(COUPON_ID);

                        me.$router.push({
                            path:  me.routerPath+'/confirmOrder',
                            query: {
                                id: me.productId,
                                productSpecId: productSpecId,
                                num: me.addcartpram.addNum
                            }
                        });
                    }else if(res.code == '-11'){  //需要开通经销商 跳转开通经销商页面
                        this.showAlert = true;
                        this.alertText = res.msg;
                        this.showBuy = !this.showBuy;
                    }else {   //报错提示            
                        this.showAlert = true;
                        this.alertText = res.msg;
                        // this.showBuy = !this.showBuy;


                        this.showBuy = false;
                        this.showChose = false

                        this.addcartpram.addNum = 1
                        this.imposeBuyData = []
                        // conosle.log(this.imposeBuyData)

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
                    }
                });
            }
        },
        selectPrimarySpec(item, index) {
            if(item.disabled){
                return;
            }
            
            // this.addcartpram.addNum = 1

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
                    // console.log(tmpSecondarySpecList)
                    this.imposeBuyData = tmpSecondarySpecList

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
                console.log(item)
                this.imposeBuyData = item   //更新限购数据
            }
            this.imagePath = item.imageUrl;
            item.isChecked = true;
        },
        selectSecondarySpec(item, index) {
            if(item.isDisabled){
                return;
            }

            // this.addcartpram.addNum = 1

            console.log(item)
            this.imposeBuyData = item  //更新限购数据
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
                    sa.track('obtainCaptcha', {
                        pageType: '注册页',
                        phoneNumber: phone+'',
                        isResend: this.isResend ? true : false
                    })

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
            // console.log(this.yzcode)
            if(this.yzcode == '' || this.phonecode == ''){
                this.alertText = '请输入完整的信息'
                this.showAlert = true
            }else{  //验证注册 跳转支付页面
                // console.log(this.yzcode)
                let params = qs.stringify({
                    mobile: this.phonecode,   
                    smsCode : this.yzcode,  //注册框验证码
                    productId: this.productId
                })
                
                userRegister(params).then(res => {   //验证注册接口
                    
                    sa.track('signUp', {
                        inviteCode: '',
                        signChannel: '微店注册',
                        commodityID: this.productId,
                        signType: 'VIP注册'
                    })

                    // console.log(res)
                    if(res){
                        if(res.code =='1'){  //注册成功 关闭注册框 重新购买
                        // alert('1');
                            this.iszhuce = false
                            this.alertText = res.msg
                            this.showAlert = true
                            //  alert('2');
                            console.log('--------')
                            this.productInfo.isH5CommonUser = 0
                            this._getProductDetail()
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
        },
        // 开通经销商
        ktload(){
            let me = this
            // 优先判断是否需要注册 
            if(this.productInfo.isH5CommonUser == 1){   //需要注册
                this.iszhuce = true
            }else if(this.productInfo.isH5CommonUser == 0){  //无需注册 直接前往
                me.$router.push({
                    path:  me.routerPath+'/invitation',
                    query: {
                        // productId: this.inviteProductId
                    }
                });
            }
        },
        // 去分享给好友
        goshare(){
            this.isshare = true
        },
        // 关闭分享蒙层
        closeShare(){
            this.isshare = false
        },
        // 底部购物车按钮
        goCart(){
            if(this.productInfo.isH5CommonUser == 1){   //优先注册
                this.iszhuce = true
            }else{
                this.$router.push({path:  this.routerPath+'/cart'});
            } 
        },
        // 开抢提醒
        remindMsgEnv() {
            console.log('开抢提醒')
            this.isShowConfirm = true
            this.noticeProduct = this.productId   //商品id
        },
        hideConfirm() {
            this.isShowConfirm = false
        },
        confirm(phone) {
            this.isShowConfirm = false
            let params = qs.stringify({
                productId: this.noticeProduct,
                mobile: phone
            })
            seckillNotice(params).then(res => {
                console.log('提交手机号----')
                console.log(phone)
                console.log(res)
                if (res.code != '1') {
                    this.showAlert = true
                    this.alertText = res.msg
                    return
                }
                this.showAlert = true
                this.alertText = res.msg
                // this.remindText = '已设置开抢提醒'
            })
        },
        _wxShareEnv() {
            let _this = this
            console.log('微信判断----')
            console.log(isWeiXin())
            
            if (isWeiXin()) {
              let me = this
              let link = window.location.href
              let title =  '商品详情';
              let imgUrl = require('common/images/logo.png');
              let desc = '我发现一个好东西，分享给你！';
              let link2 = link.replace(/&/g,"##");

              let xparams = qs.stringify({
                a: 'v1/productDetail',
                productId: this.productId
              })
              productDetail(xparams).then(res => {
                if (res.code == "1") {
                    link = res.shareURL
                    link2 = link.replace(/&/g,"##");
                    title = res.data.productName;
                    imgUrl = res.minImagePath;
                    desc = res.data.productEffectIntro;
                    if(desc.length <= 0){
                        desc = title;
                    }
                }
              }) 

              let params = qs.stringify({
                url: link2
              })

              getToken(params).then((res) => {
                console.log('微信签名----');
                console.log(res);

                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: res.appId, // 必填，公众号的唯一标识
                    timestamp: res.timestamp, // 必填，生成签名的时间戳
                    nonceStr: res.nonceStr, // 必填，生成签名的随机串
                    signature: res.signature, // 必填，签名，见附录1
                    jsApiList: [
                      'onMenuShareAppMessage', // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
                      'onMenuShareTimeline', // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
                      'onMenuShareQQ', // 获取“分享到QQ”按钮点击状态及自定义分享内容接口
                      'onMenuShareQZone' //获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
                    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });

                wx.ready(function () {
                  wx.onMenuShareTimeline({
                      title: title, // 分享标题
                      link: link, // 分享链接
                      imgUrl: imgUrl, // 分享图标
                      success() {
                        me.showAlert=true;
                        me.alertText="分享成功";

                        sa.track('shareCommodity', {
                            commodityID: _this.productId,
                            commodityName: _this.productName,
                            firstCommodity: _this.primarySpecList.length ? _this.primarySpecList.join('') : '',
                            secondCommodity: _this.secondarySpecList.length ? _this.secondarySpecList.join('') : '',
                            originalPrice: parseFloat(_this.productInfo.taobaoPrice),
                            pricePerCommodity: parseFloat(_this.productInfo.price),
                            shareMethod: '朋友圈'
                        })
                      },
                      cancel() {
                          // 用户取消分享后执行的回调函数
                      }
                  })
                  // 分享给朋友
                  wx.onMenuShareAppMessage({
                      title: title, // 分享标题
                      desc: desc, // 分享描述
                      link: link, // 分享链接
                      imgUrl: imgUrl, // 分享图标
                      success: function() {
                          me.showAlert=true;
                          me.alertText="分享成功";

                          sa.track('shareCommodity', {
                            commodityID: _this.productId,
                            commodityName: _this.productName,
                            firstCommodity: _this.primarySpecList.length ? _this.primarySpecList.join('') : '',
                            secondCommodity: _this.secondarySpecList.length ? _this.secondarySpecList.join('') : '',
                            originalPrice: parseFloat(_this.productInfo.taobaoPrice),
                            pricePerCommodity: parseFloat(_this.productInfo.price),
                            shareMethod: '微信好友'
                         })
                      },
                      cancel: function() {
                          // 用户取消分享后执行的回调函数
                      }
                  })
                  // 分享到QQ
                  wx.onMenuShareAppMessage({
                      title: title, // 分享标题
                      desc: desc, // 分享描述
                      link: link, // 分享链接
                      imgUrl: imgUrl, // 分享图标
                      success: function() {
                          me.showAlert=true;
                          me.alertText="分享成功";
                      },
                      cancel: function() {
                          // 用户取消分享后执行的回调函数
                      }
                  })
                  // 分享到QQ空间
                  wx.onMenuShareQZone({
                      title: title, // 分享标题
                      desc: desc, // 分享描述
                      link: link, // 分享链接
                      imgUrl: imgUrl, // 分享图标
                      success: function() {
                          me.showAlert=true;
                          me.alertText="分享成功";
                      },
                      cancel: function() {
                          // 用户取消分享后执行的回调函数
                      }
                  })
                })
              })             
            }
          }
      },

    components: {
        loading,
        AlertTip,
        MoreBanner,
        DownApp,
        Confirm,
    },
    filters: {
        sfFixed: function(value) {
            return value.toFixed(2);
        }
    },
    computed: {
    　　num(){
    　　　return this.addcartpram.addNum
    　　},
        top(){
    　　　return this.scTop
    　　}
    },
    watch: { 
        productName(val) {
            document.title = val
        },
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
                    this.addcartpram.addNum = 1;
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
                  this.addcartpram.addNum = 1;
                  return;
                }
              }
            }  

            // 当前所有筛选下库存最小值
            if(this.productInfo.isSpceProduct == 0){  //非规格商品
                if(this.productInfo.isSeckillLimit == 0){     //非限购商品
                    if(newValue > this.stockNumber){
                        this.showAlert=true;
                        this.alertText="温馨提示,超出商品库存限额~";
                        this.addcartpram.addNum = this.stockNumber;
                    }
                }else{    //限购商品
                    if((this.productInfo.seckillLimitNumber - this.productInfo.seckillExistBuyNum) == 0){  //初始已无可购数量
                        this.addcartpram.addNum = 1
                        this.showAlert=true;
                        this.alertText="您的限购数量已用完，请下一场次再来"
                        return
                    }else if(newValue > (this.productInfo.seckillLimitNumber - this.productInfo.seckillExistBuyNum)){      //超出限购数量
                        if(this.productInfo.seckillExistBuyNum != 0){ //购买过该商品
                            // this.showAlert=true;
                            this.addcartpram.addNum = (this.productInfo.seckillLimitNumber - this.productInfo.seckillExistBuyNum);
                        }else{  //未购买过该商品
                            // this.showAlert=true;
                            this.addcartpram.addNum = this.productInfo.seckillLimitNumber;
                        }
                    }
                }
            }else{                                     //规格商品
                if(this.imposeBuyData.isSeckillLimit == 0){     //非限购商品
                    if(newValue > this.stockNumber){
                        this.showAlert=true;
                        this.alertText="温馨提示,超出商品库存限额~";
                        this.addcartpram.addNum = this.stockNumber;
                    }
                }else{    //限购商品
                    if((this.imposeBuyData.seckillLimitNumber - this.imposeBuyData.seckillExistBuyNum) == 0){ //初始已无可购数量
                        this.addcartpram.addNum = 1
                        this.showAlert=true;
                        this.alertText="您的限购数量已用完，请下一场次再来"
                        return
                    }else if(newValue > (this.imposeBuyData.seckillLimitNumber - this.imposeBuyData.seckillExistBuyNum)){  //超出限购数量
                        if(this.imposeBuyData.seckillExistBuyNum != 0){ //购买过该商品
                            // this.showAlert=true;
                            this.addcartpram.addNum = (this.imposeBuyData.seckillLimitNumber - this.imposeBuyData.seckillExistBuyNum);
                        }else{  //未购买过该商品
                            // this.showAlert=true;
                            this.addcartpram.addNum = this.imposeBuyData.seckillLimitNumber;
                        }
                    }
                }
            }
        },
        // 监听高度
        top(newValue, oldValue){
        //   console.log(newValue)
          sessionStorage.detailpageReturnTop = newValue
          sessionStorage.detailpageProductId = this.productId
          if(newValue > 30){
            this.showtop = false
          }
          if(newValue < 10){
            this.showtop = true
          }
        },

    }
    }
</script>

<style lang="css" scoped>
  @import 'productDetail';
  .confirmWrap{
      position: fixed;
  }
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
    position: relative;
  }
  .freightDes:after{
    position: absolute;
    content: '';
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: #ccc;
    transform: scaleY(.5);
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
  .fD_2 img{
    display: block;
    width: 100%;
  }
  .description {
    width: 100%;
    margin: .7rem 0;
    padding: 0 .5rem;
  }
  .bottSp {
    display: block;
    width: 100%;
    height: 0.05rem;
    background-color: #DDDDDD;
  }
  .dr_1 {
    /*height: 4rem;*/
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
  /* .proTitle {
    width: 100%;
    height: 3.925333rem;
    position: relative;   
  } */
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
    height: auto;
    position: relative;
    font-size: 0;
  }
  .tt1{ 
    width: 100%;
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
    height: auto;
    position: relative;
    font-size: 0;
  }
  .proSize ul{
    width: 100%;
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
</style>

