webpackJsonp([14],{"1NDi":function(t,e){},ivgQ:function(t,e,s){t.exports=s.p+"static/img/fuli@2x.5b62514.png"},nbfs:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("woOf"),c=s.n(i),o=s("y/jF"),r=s("AVxF"),a=s("ZwXr"),n=s("mw3O"),d=s.n(n),u=s("P9l9"),p=(s("fdFc"),s("qxsu")),h=s("uaSg"),l=s("MfZv"),m=s.n(l),f={beforeRouteEnter:function(t,e,s){s(function(e){t.path.indexOf("/productDetail")>0&&(e.productId=Number(t.query.productId),console.log(e.productId),console.log(m.a.get("productId")),e.productId!=m.a.get("productId")?(e._getProductDetail(),m.a.set("productId",e.productId)):e._getProductDetail())})},data:function(){return{isoractivitySoldOut:!1,isordinarySoldOut:!1,disabled:!1,area_code:86,linkKey:1,timeoutKey:0,countdown:60,divname:"获取验证码",yzcode:"",phonecode:"",isShowDownload:!0,nickName:"",checkList:["选中且禁用","复选框 A"],selectSpecInfo:"请选择相关别类~",routerPath:"",productId:"",productName:"",productType:0,productPrice:"",imagePath:"",showAlert:!1,alertText:null,productInfo:{},headerImageList:[],stockNumber:0,preventRepeat:!1,showLoading:!1,descStatus:0,showChose:!1,showProvince:!0,showCity:!1,showDistrict:!1,showCityList:!1,showDistrictList:!1,showProductSpec:!1,showProductSecondarySpec:!1,province:31e4,city:31e4,district:310112,GetProvinceId:2,Province:"上海市",City:!1,District:!1,selected:!1,info:[{code:31e4,name:"上海"}],showBuy:!1,showDesc:!1,addcartpram:{productId:"",num:1,isFromCartList:!1},oprType:1,oprText:"",quantity:0,postage:"",kkk:{},yunfeikk:!1,productee:!1,primarySpecModelName:"",secondarySpecModelName:"",productSpecList:[],primarySpecList:[],secondarySpecList:[],isSelectProductSpec:!1,scTop:0,showtop:!0,iszhuce:!1,isshare:!1,showProductEffectIntro:!1,showSeckillProduct:!1,isSeckillReadStatus:!1,seckillDateTips:"",currentTimes:0,seckillStartTime:0,seckillEndTime:0,seckillHour:"00",seckillMin:"00",seckillSec:"00",headImg:"",peoName:"",splImgUrl:"",giftProduct:"",isActive:0,isActive1:0,backgroundImgUrl:"",bottomImgUrl:"",bottomImgList:[],islong:!0,islong1:!1,primarySpecName:"",kucunNum:"",ischeckSucc:""}},created:function(){this.productId=this.$route.query.productId,this.addcartpram.productId=this.productId,this.routerPath=h.c,this._getProductDetail(),this._giftProductInfo()},mounted:function(){window.addEventListener("scroll",this.handleScroll)},methods:{reClick:function(t,e){this.isActive=e,this.backgroundImgUrl=this.giftProduct[e].imageUrl,this.bottomImgList=this.giftProduct[e].productDesc,this.primarySpecName=this.giftProduct[e].primarySpecName,this.kucunNum=this.giftProduct[e].stockNumber,console.log(this.bottomImgList)},reClick1:function(t,e){this.isActive1=e,this.backgroundImgUrl=this.giftProduct[e].imageUrl,this.bottomImgList=this.giftProduct[e].productDesc,this.primarySpecName=this.giftProduct[e].primarySpecName,this.kucunNum=this.giftProduct[e].stockNumber,console.log(t.productDesc)},_giftProductInfo:function(){var t=this;this.showLoading=!0,Object(u.E)().then(function(e){console.log(e),t.giftProduct=e.data.productSpecList,t.headImg=e.data.logo,t.peoName=e.data.storeName,t.backgroundImgUrl=t.giftProduct[0].imageUrl,t.bottomImgList=t.giftProduct[0].productDesc,t.primarySpecName=t.giftProduct[0].primarySpecName,t.kucunNum=t.giftProduct[0].stockNumber,t.ischeckSucc=e.data.isValidateMobile})},_getProductDetail:function(){var t=this,e=this,s=d.a.stringify({a:"v1/productDetail",productId:this.productId});e.showLoading=!0,Object(u.P)(s).then(function(s){console.log("商品详情数据----"),console.log(s),t.nickName=s.data.nickName,e.showAlert=!1,e.showLoading=!1,e.showSeckillProduct=!1,e.isSeckillReadStatus=!1,e.showProductEffectIntro=!1,"1"==s.code?(e.productSpecList=s.data.productSpecList,e.headerImageList=s.headerImageList,e.quantity=s.data.cartProductNumbers,e.productInfo=s.data,e.productInfo&&(e.productPrice=e.productInfo.price,e.productName=e.productInfo.productName,0==e.productInfo.isSpceProduct&&(e.stockNumber=Number(e.productInfo.stockNumber),e.productType=Number(e.productInfo.productType)),e.productInfo.productEffectIntro.length>0&&(e.showProductEffectIntro=!0)),1==e.productInfo.isSpceProduct&&(e.primarySpecList=[],e.secondarySpecList=[],e.productSpecList.forEach(function(t){var s=!1;e.primarySpecList.length>0&&e.primarySpecList.forEach(function(e){e.primarySpecId!=t.primarySpecId||(s=!0)}),s||(e.primarySpecModelName=t.primarySpecModelName,e.primarySpecList.push(c()({},t,{isChecked:!1,isDisabled:!1})))})),1==e.productInfo.isMoreSpecProduct&&e.productSpecList.forEach(function(t){var s=!1;e.secondarySpecList.length>0&&e.secondarySpecList.forEach(function(e){e.secondarySpecId!=t.secondarySpecId||(s=!0)}),s||(e.secondarySpecModelName=t.secondarySpecModelName,e.secondarySpecList.push(c()({},t,{isChecked:!1,isDisabled:!1})))}),1==s.data.isFreePostage?(e.postage=s.data.postageData.freePostageAct,t.kkk=s.data.postageData.postageDescH5List):0==s.data.isFreePostage&&(e.postage=s.data.postageData.postage+"元",t.kkk=s.data.postageData.postageDescH5List)):(t.showAlert=!0,t.alertText=s.msg)})},close:function(){this.isShowDownload=!1},yunfeiXs:function(){this.yunfeikk=!this.yunfeikk},cpa:function(){this.yunfeikk=!this.yunfeikk},choseAdd:function(){this.showChose=!0},closeAdd:function(){this.showChose=!1},_filter:function(t,e,s){for(var i=[],c=0;c<t.length;c++)s==t[c].areaId&&(i=t[c][e]);return i},addCart:function(){this.iszhuce=!1,1==this.productInfo.isH5CommonUser?this.iszhuce=!0:(this.oprType=1,this.oprText="加入购物车",this.chooseProductNum())},buyNow:function(){this.iszhuce=!1,1==this.productInfo.isH5CommonUser?0==this.ischeckSucc?this.iszhuce=!0:(this.oprType=2,this.oprText="立即购买",this.chooseProductNum()):(this.showAlert=!0,this.alertText="您已经是集客多代理了哦~")},closeBuy:function(){this.showAlert=!1,this.showBuy=!1,!this.showBuy&&1==this.productInfo.isSpceProduct&&this.primarySpecList.length>0&&(this.primarySpecList.forEach(function(t){t.isChecked=!1,t.isDisabled=!1}),1==this.productInfo.isMoreSpecProduct&&this.secondarySpecList.length>0&&this.secondarySpecList.forEach(function(t){t.isChecked=!1,t.isDisabled=!1}))},closeDesc:function(){this.showDesc=!this.showDesc},chooseProductNum:function(){this.showBuy=!0,this.showAlert=!1,this.selectSpecInfo="请选择相关别类~",this.productPrice=this.productInfo.price,this.addcartpram.num=1,this.headerImageList.length>0&&(this.imagePath=this.headerImageList[0].imageUrl),1==this.productInfo.isSpceProduct&&(this.showProductSpec=!0,this.primarySpecList.length>0&&this.primarySpecList.forEach(function(t){t.isChecked=!1,t.isDisabled=!1}),1==this.productInfo.isMoreSpecProduct&&(this.showProductSecondarySpec=!0,this.secondarySpecList.length>0&&this.secondarySpecList.forEach(function(t){t.isChecked=!1,t.isDisabled=!1})))},add:function(){this.addcartpram.num=Number(this.addcartpram.num)+1},subtraction:function(){this.addcartpram.num>1&&(this.addcartpram.num=Number(this.addcartpram.num)-1)},descStatusChange:function(t){this.descStatus=t},doOperation:function(){var t=this,e=this,s="";if(1==this.productInfo.isSpceProduct){var i=!1;if(this.primarySpecList.forEach(function(e){1==e.isChecked&&(i=!0,0==t.productInfo.isMoreSpecProduct&&(s=e.productSpecId))}),!i)return e.showAlert=!0,void(e.alertText="请选择相关规格~");if(1==this.productInfo.isMoreSpecProduct){var c=!1;if(this.secondarySpecList.length>0&&this.secondarySpecList.forEach(function(t){1==t.isChecked&&(s=t.productSpecId,c=!0)}),!c)return e.showAlert=!0,void(e.alertText="请选择相关规格~")}}var o=d.a.stringify({productId:e.productId,productSpecId:s,number:e.addcartpram.num});Object(u.g)(o).then(function(i){console.log("----购买大礼包----"),console.log(i),"1"==i.code?e.$router.push({path:e.routerPath+"/confirmOrder",query:{id:e.productId,productSpecId:s,num:e.addcartpram.num}}):(i.code,t.showAlert=!0,t.alertText=i.msg,t.showBuy=!t.showBuy)})},selectPrimarySpec:function(t,e){var s=this;if(!t.isDisabled){var i=null;if(this.primarySpecList.length>0&&(this.primarySpecList.forEach(function(t){t.isChecked=!1}),1==this.productInfo.isMoreSpecProduct)){var c=[];this.productSpecList.forEach(function(e){e.primarySpecId==t.primarySpecId&&0==e.isSoldOut&&c.push(e)}),this.secondarySpecList.forEach(function(t){t.isDisabled=!0,t.productSpecId=null,c.length>0&&c.forEach(function(e){t.secondarySpecId==e.secondarySpecId&&(t.isDisabled=!1,t.productSpecId=e.productSpecId,t.primarySpecId=e.primarySpecId,t.secondarySpecId=e.secondarySpecId,t.secondarySpecName=e.secondarySpecName,t.stockNumber=e.stockNumber,t.paymentPrice=e.price,1==t.isChecked&&(s.productPrice=t.price,i=t.secondarySpecName))})})}this.selectSpecInfo="已选择："+t.primarySpecName,null!=i&&(this.selectSpecInfo+="、"+i),0==this.productInfo.isMoreSpecProduct&&(this.productPrice=t.price),this.imagePath=t.imageUrl,t.isChecked=!0}},selectSecondarySpec:function(t,e){var s=this;if(!t.isDisabled){var i=null;if(this.secondarySpecList.length>0){this.secondarySpecList.forEach(function(t){t.isChecked=!1});var c=[];this.productSpecList.forEach(function(e){e.secondarySpecId==t.secondarySpecId&&0==e.isSoldOut&&c.push(e.primarySpecId)}),this.primarySpecList.forEach(function(e){e.isDisabled=!0,c.length>0&&c.forEach(function(c){e.primarySpecId==c&&(e.isDisabled=!1,1==e.isChecked&&(i=e.primarySpecName,s.productPrice=t.price))})})}this.selectSpecInfo="已选择："+t.secondarySpecName,null!=i&&(this.selectSpecInfo="已选择："+i+"、"+t.secondarySpecName),t.isChecked=!0,console.log("-------"+t.productSpecId)}},getTop:function(){window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.webapp.jkd"},handleScroll:function(){var t=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;this.scTop=t},showQues:function(){alert("页面待添加")},closeDiv:function(){this.iszhuce=!1},settime:function(t){var e=this,s=this,i=this.phonecode;if(""==i)return this.phonecode="",this.alertText="请输入手机号",this.showAlert=!0,!1;if(1==this.linkKey){var c=d.a.stringify({mobile:i,countryCode:86,codeType:5});Object(u.Y)(c).then(function(t){if(console.log(t),"0"==t.code){var s=t.msg;e.alertText=s,e.showAlert=!0,clearTimeout(o)}else if("1"==t.code){var i=t.msg;e.alertText=i,e.showAlert=!0,e.timeoutKey=1,e.linkKey=0}else e.alertText=t.msg,e.showAlert=!0})}if("1"==this.timeoutKey&"1"!=this.linkKey&&(this.disabled=!0,this.divname="重新发送"+this.countdown,this.countdown--),0==this.countdown)return this.linkKey++,this.timeoutKey--,this.disabled=!1,this.divname="获取验证码",void(this.countdown=60);var o=setTimeout(function(){s.settime(t)},1e3)},getTip:function(){var t=this;if(console.log(this.yzcode),""==this.yzcode||""==this.phonecode)this.alertText="请输入完整的信息",this.showAlert=!0;else{console.log(this.yzcode);var e=d.a.stringify({mobile:this.phonecode,smsCode:this.yzcode});Object(u.i)(e).then(function(e){e?"1"==e.code?(t.iszhuce=!1,t.alertText=e.msg,t.showAlert=!0,t.ischeckSucc=1):(t.alertText=e.msg,t.showAlert=!0):(t.alertText="验证接口错误",t.showAlert=!0)})}},goshare:function(){this.isshare=!0},closeShare:function(){this.isbuy=!1},goCart:function(){1==this.productInfo.isH5CommonUser?this.iszhuce=!0:this.$router.push({path:this.routerPath+"/cart"})},closebuy:function(){this.showBuy=!1}},components:{loading:o.a,AlertTip:p.a,MoreBanner:a.a,DownApp:r.a},filters:{sfFixed:function(t){return t.toFixed(2)}},computed:{num:function(){return this.addcartpram.num},top:function(){return this.scTop}},watch:{num:function(t,e){var s=this;if(this.isSelectProductSpec)this.isSelectProductSpec=!1;else if(0!=this.showBuy){if(1==this.productInfo.isSpceProduct&&this.primarySpecList.length>0){this.stockNumber=0;var i=!1;if(this.primarySpecList.forEach(function(t){1==t.isChecked&&(s.stockNumber=Number(t.stockNumber),i=!0)}),!i)return this.showAlert=!0,this.alertText="请选择相关规格~",this.isSelectProductSpec=!0,void(this.addcartpram.num=1);if(1==this.productInfo.isMoreSpecProduct){var c=!1;if(this.secondarySpecList.length>0&&this.secondarySpecList.forEach(function(t){1==t.isChecked&&(s.stockNumber=Number(t.stockNumber),c=!0)}),!c)return this.showAlert=!0,this.alertText="请选择相关规格~",this.isSelectProductSpec=!0,void(this.addcartpram.num=1)}}t>this.stockNumber&&(this.showAlert=!0,this.alertText="温馨提示,超出商品库存限额~",this.addcartpram.num=this.stockNumber)}},top:function(t,e){console.log(t),t>30&&(this.islong=!1,this.islong1=!0),t<30&&(this.islong=!0,this.islong1=!1)},isActive:function(t,e){this.isActive1=t},isActive1:function(t,e){this.isActive=t}}},v={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{directives:[{name:"show",rawName:"v-show",value:!t.showLoading,expression:"!showLoading"}]},[i("div",{directives:[{name:"title",rawName:"v-title"}],attrs:{"data-title":"成为集客多经销商"}}),t._v(" "),i("footer",{staticClass:"foot_div"},[i("button",{staticClass:"gm bt",staticStyle:{"text-align":"center","font-size":".64rem"},on:{click:function(e){t.buyNow()}}},[t._v("立即购买")])]),t._v(" "),t.islong?i("header",[i("div",{staticClass:"heImg"},[i("img",{attrs:{src:t.headImg}})]),t._v(" "),i("div",{staticClass:"txt1"},[t._v(t._s(t.peoName))]),t._v(" "),i("div",{staticClass:"txt2"},[t._v("邀请您加入集客多，请选择经销商大礼包")])]):t._e(),t._v(" "),t.islong?i("section",{staticClass:"showProductList"},t._l(t.giftProduct,function(e,s){return i("div",{staticClass:"spl",class:{isActive:s==t.isActive},on:{click:function(i){t.reClick(e,s)}}},[i("div",{staticClass:"spl_1"},[i("img",{attrs:{src:e.imageUrl}})]),t._v(" "),i("div",{staticClass:"spl_2"},[t._v("\n                    "+t._s(e.primarySpecName)+"\n                ")])])})):t._e(),t._v(" "),t.islong1?i("section",{staticClass:"suolvecover"}):t._e(),t._v(" "),t.islong1?i("section",{staticClass:"suolve"},t._l(t.giftProduct,function(e,s){return i("div",{class:{isActive1:s==t.isActive1},on:{click:function(i){t.reClick1(e,s)}}},[i("span",{staticClass:"kSp"},[t._v("\n                     "+t._s(e.primarySpecName)+"\n                ")])])})):t._e(),t._v(" "),i("section",{staticClass:"backgroundImg"},[i("div",{staticClass:"backImg"},[i("img",{attrs:{src:t.backgroundImgUrl}})]),t._v(" "),i("div",{staticClass:"primaryName"},[t._v("\n                "+t._s(t.primarySpecName)+"\n            ")]),t._v(" "),i("div",{staticClass:"lowNum"},[t._v("\n                "+t._s(""!=t.kucunNum?"库存"+t.kucunNum+"件":"")+"\n            ")])]),t._v(" "),t._m(0),t._v(" "),t._l(t.bottomImgList,function(t){return i("footer",{staticClass:"bottomImg"},[i("img",{attrs:{src:t.src}})])}),t._v(" "),i("transition",{attrs:{name:"slid_up"}},[i("section",[t.showBuy?i("div",{staticClass:"choose_type_Container",staticStyle:{overflow:"scroll"}},[i("div",{staticClass:"proTitle"},[i("span",{staticClass:"proImg"},[i("img",{staticStyle:{width:"100%",height:"100%",display:"block"},attrs:{src:t.imagePath}})]),t._v(" "),i("span",{staticClass:"proPrice"},[t._v("¥"+t._s(t.productPrice))]),t._v(" "),t.showProductSpec?i("span",{staticClass:"proAllInfo"},[t._v(t._s(t.selectSpecInfo))]):t._e(),t._v(" "),i("span",{staticClass:"closePro",on:{click:function(e){t.closeBuy()}}},[i("img",{staticStyle:{width:"100%",height:"100%",display:"block"},attrs:{src:s("m1y0")}})])]),t._v(" "),t.showProductSpec?i("div",{staticStyle:{overflow:"scroll","min-height":"5rem","max-height":"15rem"}},[i("div",{staticClass:"proColor"},[i("span",{staticClass:"tit11"},[t._v(t._s(t.primarySpecModelName))]),t._v(" "),i("ul",{staticClass:"tt1"},t._l(t.primarySpecList,function(e,s){return i("button",{staticClass:"tt1div",class:{activeSpec:e.isChecked,ee:e.isDisabled},on:{click:function(i){t.selectPrimarySpec(e,s)}}},[t._v("\n                                "+t._s(e.primarySpecName)+"\n                            ")])}))]),t._v(" "),i("span",{staticClass:"coverligg"}),t._v(" "),t.showProductSecondarySpec?i("div",{staticClass:"proSize"},[i("span",{staticClass:"tit11"},[t._v(t._s(t.secondarySpecModelName))]),t._v(" "),i("ul",t._l(t.secondarySpecList,function(e,s){return i("button",{staticClass:"tt1div",class:{activeSpec:e.isChecked,ee:e.isDisabled},on:{click:function(i){t.selectSecondarySpec(e,s)}}},[t._v("\n                                "+t._s(e.secondarySpecName)+"\n                            ")])}))]):t._e(),t._v(" "),i("span",{staticClass:"coverligg"})]):t._e(),t._v(" "),i("div",{staticClass:"list "},[i("p",{staticClass:"list_p"},[t._v("续费年数")]),t._v(" "),i("div",{staticClass:"gw_num",staticStyle:{"margin-top":"13px"}},[i("span",{staticClass:"input-number-decrement",on:{click:function(e){t.subtraction()}}},[t._v("–")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.addcartpram.num,expression:"addcartpram.num"}],staticClass:"input-number",domProps:{value:t.addcartpram.num},on:{input:function(e){e.target.composing||t.$set(t.addcartpram,"num",e.target.value)}}}),t._v(" "),i("span",{staticClass:"input-number-increment",on:{click:function(e){t.add()}}},[t._v("+")])])]),t._v(" "),i("div",{staticClass:"buynow2",on:{click:function(e){t.doOperation()}}},[t._v("确定")])]):t._e(),t._v(" "),i("div",[i("span",{directives:[{name:"show",rawName:"v-show",value:t.yunfeikk,expression:"yunfeikk"}],staticClass:"grey1"}),t._v(" "),i("span",{directives:[{name:"show",rawName:"v-show",value:t.iszhuce,expression:"iszhuce"}],staticClass:"grey1",on:{click:t.closeDiv}}),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.iszhuce,expression:"iszhuce"}],staticClass:"registered"},[i("div",{staticClass:"name"},[t._v(t._s(t.nickName?t.nickName+",请先完成手机验证":"请先完成手机注册"))]),t._v(" "),i("div",{staticClass:"close",on:{click:t.closeDiv}},[i("img",{attrs:{src:s("0bfS"),alt:"error"}})]),t._v(" "),i("span",{staticClass:"coversp"}),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.phonecode,expression:"phonecode"}],staticClass:"phone",attrs:{id:"phone",type:"text",placeholder:"请输入手机号"},domProps:{value:t.phonecode},on:{input:function(e){e.target.composing||(t.phonecode=e.target.value)}}}),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.yzcode,expression:"yzcode"}],staticClass:"number",attrs:{id:"phone_code",type:"number",placeholder:"请输入验证码"},domProps:{value:t.yzcode},on:{input:function(e){e.target.composing||(t.yzcode=e.target.value)}}}),t._v(" "),i("button",{staticClass:"keyNum",attrs:{id:"btn",disabled:t.disabled},on:{click:function(e){t.settime(this)}}},[t._v(t._s(t.divname))]),t._v(" "),i("button",{staticClass:"sure",on:{click:function(e){t.getTip()}}},[t._v("确认")])]),t._v(" "),i("span",{directives:[{name:"show",rawName:"v-show",value:t.showBuy,expression:"showBuy"}],staticClass:"grey2",on:{click:t.closebuy}})])])]),t._v(" "),i("transition",{attrs:{name:"fade"}},[t.showDesc?i("div",{staticClass:"cover",on:{click:t.closeDesc}}):t._e()])],2),t._v(" "),t.showAlert?i("alert-tip",{staticStyle:{"z-index":"99999"},attrs:{alertText:t.alertText},on:{closeTip:function(e){t.showAlert=!1}}}):t._e(),t._v(" "),i("transition",{attrs:{name:"loading"}},[i("loading",{directives:[{name:"show",rawName:"v-show",value:t.showLoading,expression:"showLoading"}]})],1)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("section",{staticClass:"middleShow"},[e("img",{attrs:{src:s("ivgQ")}})])}]};var g=s("VU/8")(f,v,!1,function(t){s("1NDi")},"data-v-8da3d1bc",null);e.default=g.exports}});