webpackJsonp([13],{BekI:function(t,e){},DK9C:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("woOf"),c=i.n(s),o=i("qxsu"),r=(i("NYxO"),i("3Yky"),i("y/jF"),i("RMAT"),i("RPyc"),i("uaSg")),a=i("P9l9"),n=i("mw3O"),d=i.n(n),h=(i("fdFc"),i("uYVh")),l=i.n(h),p={data:function(){return{isShow:!1,disabled:!1,area_code:86,linkKey:1,timeoutKey:0,countdown:60,divname:"获取验证码",yzcode:"",phonecode:"",iszhuce:!1,checkList:["选中且禁用","复选框 A"],selectSpecInfo:"请选择相关别类~",routerPath:"",shopid:"",productId:"",productName:"",productType:0,productPrice:"",imagePath:"",showAlert:!1,alertText:null,productInfo:{},headerImageList:[],stockNumber:0,preventRepeat:!1,showLoading:!0,descStatus:0,showChose:!1,showProvince:!0,showCity:!1,showDistrict:!1,showCityList:!1,showDistrictList:!1,showProductSpec:!1,showProductSecondarySpec:!1,province:31e4,city:31e4,district:310112,GetProvinceId:2,Province:"上海市",City:!1,District:!1,selected:!1,info:[{code:31e4,name:"上海"}],showBuy:!1,showDesc:!1,addcartpram:{productId:"",num:1,isFromCartList:!1},oprType:1,oprText:"",quantity:0,postage:"",kkk:{},yunfeikk:!1,productee:!1,primarySpecModelName:"",secondarySpecModelName:"",productSpecList:[],primarySpecList:[],secondarySpecList:[],isSelectProductSpec:!1,scTop:0,showtop:!0,kehuName:"",topinfo:{txt1:"",txt2:"",txt3:"",txt4:"",imgurl1:"",imgurl2:"",imgurl3:"",imgurl4:""},giftProductId:"",crucesMoney:"",saveMoney:"",bottomImg:{},isResend:!1}},created:function(){var t=this,e=this;e.productId=e.$route.query.productId,e.addcartpram.productId=e.productId,e.routerPath=r.c;var i=d.a.stringify({a:"v1/memberCenter"});console.log(i),Object(a.H)(i).then(function(e){console.log("开通经销商详情----"),console.log(e),t.giftProductId=e.levelPrice.giftProductId,""!=t.giftProductId&&t.getproductDetail(),t.crucesMoney=e.levelPrice.crucesMoney,t.saveMoney=e.levelPrice.saveMoney,t.topinfo.txt1=e.nextAuthority[0].title,t.topinfo.txt2=e.nextAuthority[1].title,t.topinfo.txt3=e.nextAuthority[2].title,t.topinfo.txt4=e.nextAuthority[3].title,t.topinfo.imgurl1=e.nextAuthority[0].headImage,t.topinfo.imgurl2=e.nextAuthority[1].headImage,t.topinfo.imgurl3=e.nextAuthority[2].headImage,t.topinfo.imgurl4=e.nextAuthority[3].headImage})},components:{alertTip:o.a},methods:{getproductDetail:function(){var t=this,e=this,i=d.a.stringify({a:"v1/productDetail",productId:this.giftProductId});Object(a.P)(i).then(function(i){if(console.log("产品详情----"),console.log(i),t.bottomImg=i.data.productDesc,t.kehuName=i.data.nickName,e.showAlert=!1,e.showLoading=!1,"1"==i.code){if(e.productSpecList=i.data.productSpecList,e.headerImageList=i.headerImageList,e.quantity=i.data.cartProductNumbers,e.productInfo=i.data,e.productInfo&&(e.productPrice=e.productInfo.price,e.productName=e.productInfo.productName,0==e.productInfo.isSpceProduct&&(e.stockNumber=Number(e.productInfo.stockNumber),e.productType=Number(e.productInfo.productType))),1==e.productInfo.isSpceProduct){e.primarySpecList=[],e.secondarySpecList=[];e.productSpecList.forEach(function(t,i){var s=!0,c=!0;console.log("第"+i+"个"),"1"==t.isSoldOut?t.disabled=!0:t.disabled=!1,e.primarySpecList.length&&(s=!1,e.primarySpecList.forEach(function(e){c=t.primarySpecId==e.primarySpecId})),c||(e.primarySpecList.push(t),console.log(e.primarySpecList)),s&&e.primarySpecList.push(t)}),1==e.productInfo.isMoreSpecProduct&&e.productSpecList.forEach(function(t){var i=!1;e.secondarySpecList.length>0&&e.secondarySpecList.forEach(function(e){e.secondarySpecId!=t.secondarySpecId||(i=!0)}),i||(e.secondarySpecModelName=t.secondarySpecModelName,e.secondarySpecList.push(c()({},t,{isChecked:!1,isDisabled:!1})))})}1==i.data.isFreePostage?(e.postage=i.data.postageData.freePostageAct,t.kkk=i.data.postageData.postageDescH5List):0==i.data.isFreePostage&&(e.postage=i.data.postageData.postage+"元",t.kkk=i.data.postageData.postageDescH5List)}else t.showAlert=!0,t.alertText=i.msg})},yunfeiXs:function(){this.yunfeikk=!this.yunfeikk},cpa:function(){this.yunfeikk=!this.yunfeikk},choseAdd:function(){this.showChose=!0},closeAdd:function(){this.showChose=!1},_filter:function(t,e,i){for(var s=[],c=0;c<t.length;c++)i==t[c].code&&(s=t[c][e]);return s},getProvinceId:function(t,e,i){this.province=t,this.Province=e,this.showProvince=!1,this.showCity=!0,this.showDistrict=!1,this.showCityList=this._filter(this.info,"children",this.province),this.info.map(function(t){return t.selected=!1}),this.info[i].selected=!0},provinceSelected:function(){this.showCityList=!1,this.showDistrictList=!1,this.City=!1,this.District=!1,this.showProvince=!0,this.showCity=!1,this.showDistrict=!1},getCityId:function(t,e,i){this.city=t,this.City=e,this.showProvince=!1,this.showCity=!1,this.showDistrict=!0,this.showDistrictList=this._filter(this.showCityList,"children",this.city),this.showCityList.map(function(t){return t.selected=!1}),this.showCityList[i].selected=!0},citySelected:function(){this.showProvince=!1,this.showCity=!0,this.showDistrict=!1},getDistrictId:function(t,e,i){var s=this;this.district=t,this.District=e,this.showDistrictList.map(function(t){return t.selected=!1}),this.showDistrictList[i].selected=!0,this.showChose=!1,0==this.productInfo.isFreePostage&&getPostage({number:this.addcartpram.num,productId:this.productId,provinceId:this.province,isWeb:!0}).then(function(t){"1"==t.code&&(s.postage=t.postage+"元",s.kkk=t.postageDesc)})},districtSelected:function(){this.showProvince=!1,this.showCity=!1,this.showDistrict=!0},addCart:function(){this.oprType=1,this.oprText="加入购物车",this.chooseProductNum()},buyNow:function(){1==this.productInfo.isH5CommonUser?this.iszhuce=!0:(this.oprType=2,this.oprText="立即购买",this.chooseProductNum())},closeBuy:function(){this.showAlert=!1,this.showBuy=!1,!this.showBuy&&1==this.productInfo.isSpceProduct&&this.primarySpecList.length>0&&(this.primarySpecList.forEach(function(t){t.isChecked=!1,t.isDisabled=!1}),1==this.productInfo.isMoreSpecProduct&&this.secondarySpecList.length>0&&this.secondarySpecList.forEach(function(t){t.isChecked=!1,t.isDisabled=!1}))},closeDesc:function(){this.showDesc=!this.showDesc},chooseProductNum:function(){this.showBuy=!0,this.showAlert=!1,this.selectSpecInfo="请选择相关别类~",this.productPrice=this.productInfo.price,this.addcartpram.num=1,this.headerImageList.length>0&&(this.imagePath=this.headerImageList[0].imageUrl),1==this.productInfo.isSpceProduct&&(this.showProductSpec=!0,this.primarySpecList.length>0&&this.primarySpecList.forEach(function(t){t.isChecked=!1,t.isDisabled=!1}),1==this.productInfo.isMoreSpecProduct&&(this.showProductSecondarySpec=!0,this.secondarySpecList.length>0&&this.secondarySpecList.forEach(function(t){t.isChecked=!1,t.isDisabled=!1})))},add:function(){this.addcartpram.num=Number(this.addcartpram.num)+1,console.log()},subtraction:function(){this.addcartpram.num>1&&(this.addcartpram.num=Number(this.addcartpram.num)-1)},descStatusChange:function(t){this.descStatus=t},doOperation:function(){var t=this,e=this,i="";if(1==this.productInfo.isSpceProduct){var s=!1;if(this.primarySpecList.forEach(function(e){1==e.isChecked&&(s=!0,0==t.productInfo.isMoreSpecProduct&&(i=e.productSpecId))}),!s)return e.showAlert=!0,void(e.alertText="请选择相关规格~");if(1==this.productInfo.isMoreSpecProduct){var c=!1;if(console.log(this.secondarySpecList),this.secondarySpecList.length>0&&this.secondarySpecList.forEach(function(t){1==t.isChecked&&(i=t.productSpecId,c=!0)}),!c)return e.showAlert=!0,void(e.alertText="请选择相关规格~")}}if("1"==this.oprType)addNumCart({productId:this.addcartpram.productId,productSpecId:i,num:e.addcartpram.num,isFromCartList:!1}).then(function(e){"1"==e.code?(t.showAlert=!0,t.alertText="添加购物车成功！",t.quantity=e.cartProductNumbers,t.showBuy=!t.showBuy):(t.showAlert=!0,t.alertText=e.msg,t.showBuy=!t.showBuy)});else{var o=d.a.stringify({productId:e.productId,productSpecId:i,number:e.addcartpram.num});Object(a.h)(o).then(function(s){console.log("立即购买----"),console.log(s),"1"==s.code?e.$router.push({path:e.routerPath+"/confirmOrder",query:{id:s.productId,productSpecId:i,num:e.addcartpram.num,ispackage:1}}):(t.showAlert=!0,t.alertText=s.msg,t.showBuy=!t.showBuy)})}},selectPrimarySpec:function(t,e){var i=this;if(!t.disabled){var s=null;if(this.primarySpecList.length>0&&(this.primarySpecList.forEach(function(t){t.isChecked=!1}),1==this.productInfo.isMoreSpecProduct)){var c=[];this.productSpecList.forEach(function(e){e.primarySpecId==t.primarySpecId&&0==e.isSoldOut&&c.push(e)}),this.secondarySpecList.forEach(function(t){t.isDisabled=!0,t.productSpecId=null,c.length>0&&c.forEach(function(e){t.secondarySpecId==e.secondarySpecId&&(t.isDisabled=!1,t.productSpecId=e.productSpecId,t.primarySpecId=e.primarySpecId,t.secondarySpecId=e.secondarySpecId,t.secondarySpecName=e.secondarySpecName,t.stockNumber=e.stockNumber,t.paymentPrice=e.price,1==t.isChecked&&(i.productPrice=t.paymentPrice,s=t.secondarySpecName,console.log("-------"+t.productSpecId)))})})}this.selectSpecInfo="已选择："+t.primarySpecName,null!=s&&(this.selectSpecInfo+="、"+s),0==this.productInfo.isMoreSpecProduct&&(this.productPrice=t.price),this.imagePath=t.imageUrl,t.isChecked=!0}},selectSecondarySpec:function(t,e){var i=this;if(!t.isDisabled){var s=null;if(this.secondarySpecList.length>0){this.secondarySpecList.forEach(function(t){t.isChecked=!1});var c=[];this.productSpecList.forEach(function(e){e.secondarySpecId==t.secondarySpecId&&0==e.isSoldOut&&c.push(e.primarySpecId)}),this.primarySpecList.forEach(function(e){e.isDisabled=!0,c.length>0&&c.forEach(function(c){e.primarySpecId==c&&(e.isDisabled=!1,1==e.isChecked&&(s=e.primarySpecName,i.productPrice=t.price))})})}this.selectSpecInfo="已选择："+t.secondarySpecName,null!=s&&(this.selectSpecInfo="已选择："+s+"、"+t.secondarySpecName),t.isChecked=!0,console.log("-------"+t.productSpecId)}},closeDiv:function(){this.iszhuce=!1},settime:function(t){var e=this,i=this,s=this.phonecode;if(""==s)return this.phonecode="",this.alertText="请输入手机号",this.showAlert=!0,!1;if(1==this.linkKey){var c=d.a.stringify({mobile:s,countryCode:86,codeType:5});Object(a._0)(c).then(function(t){if(l.a.track("obtainCaptcha",{pageType:"注册经销商",phoneNumber:s+"",isResend:!!e.isResend}),"0"==t.code){var i=t.msg;e.alertText=i,e.showAlert=!0,clearTimeout(o)}else if("1"==t.code){var c=t.msg;e.alertText=c,e.showAlert=!0,e.timeoutKey=1,e.linkKey=0}else e.alertText=t.msg,e.showAlert=!0}),l.a.track("obtainCaptcha",{pageType:"升级经销商",phoneNumber:s+"",isResend:this.isResend})}if("1"==this.timeoutKey&"1"!=this.linkKey&&(this.disabled=!0,this.divname="重新发送"+this.countdown,this.countdown--,this.isResend=!0),0==this.countdown)return this.linkKey++,this.timeoutKey--,this.disabled=!1,this.divname="获取验证码",this.countdown=60,void(this.isResend=!0);var o=setTimeout(function(){i.settime(t)},1e3)},getTip:function(){var t=this;if(console.log(this.yzcode),""==this.yzcode)this.alertText="请输入验证码",this.showAlert=!0;else{console.log(this.yzcode);var e=d.a.stringify({mobile:this.phonecode,smsCode:this.yzcode});Object(a._6)(e).then(function(e){l.a.track("signUp",{inviteCode:"",signChannel:"经销商注册",signType:"经销商注册"}),e?"1"==e.code?(t.iszhuce=!1,t.alertText=e.msg,t.showAlert=!0,location.reload()):(t.alertText=e.msg,t.showAlert=!0):(t.alertText="注册接口关闭",t.showAlert=!0)})}}},filters:{},computed:{num:function(){return this.addcartpram.num},top:function(){return this.scTop}},watch:{num:function(t,e){var i=this;if(this.isSelectProductSpec)this.isSelectProductSpec=!1;else if(0!=this.showBuy){if(1==this.productInfo.isSpceProduct&&this.primarySpecList.length>0){this.stockNumber=0;var s=!1;if(this.primarySpecList.forEach(function(t){1==t.isChecked&&(i.stockNumber=Number(t.stockNumber),s=!0)}),!s)return this.showAlert=!0,this.alertText="请选择相关规格~",this.isSelectProductSpec=!0,void(this.addcartpram.num=1);if(1==this.productInfo.isMoreSpecProduct){var c=!1;if(this.secondarySpecList.length>0&&this.secondarySpecList.forEach(function(t){1==t.isChecked&&(i.stockNumber=Number(t.stockNumber),c=!0)}),!c)return this.showAlert=!0,this.alertText="请选择相关规格~",this.isSelectProductSpec=!0,void(this.addcartpram.num=1)}}t>this.stockNumber&&(this.showAlert=!0,this.alertText="温馨提示,超出商品库存限额~",this.addcartpram.num=this.stockNumber)}}}},u={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"page"},[s("div",{directives:[{name:"title",rawName:"v-title"}],attrs:{"data-title":"开通经销商"}}),t._v(" "),s("div",{directives:[{name:"stat",rawName:"v-stat",value:{type:"pageview",title:"开通经销商"},expression:"{type:'pageview', title:'开通经销商'}"}]}),t._v(" "),s("div",{staticClass:"register"},[t._m(0),t._v(" "),t._m(1),t._v(" "),s("div",{staticClass:"regis_img_3"},[s("img",{attrs:{src:t.topinfo.imgurl1}})]),t._v(" "),s("span",{staticClass:"regis_txt_1 littletxt"},[t._v(t._s(t.topinfo.txt1))]),t._v(" "),s("div",{staticClass:"regis_img_4"},[s("img",{attrs:{src:t.topinfo.imgurl2}})]),t._v(" "),s("span",{staticClass:"regis_txt_2 littletxt"},[t._v(t._s(t.topinfo.txt2))]),t._v(" "),s("div",{staticClass:"regis_img_5"},[s("img",{attrs:{src:t.topinfo.imgurl3}})]),t._v(" "),s("span",{staticClass:"regis_txt_3 littletxt"},[t._v(t._s(t.topinfo.txt3))]),t._v(" "),s("div",{staticClass:"regis_img_6"},[s("img",{attrs:{src:t.topinfo.imgurl4}})]),t._v(" "),s("span",{staticClass:"regis_txt_4 littletxt"},[t._v(t._s(t.topinfo.txt4))]),t._v(" "),s("div",{staticClass:"txt1"},[t._v("据2017年数据统计成为经销商预计")]),t._v(" "),s("div",{staticClass:"txt2"},[s("span",{staticClass:"t1"},[t._v("可省")]),t._v(" "),s("span",{staticClass:"t2",staticStyle:{color:"#B2976A","font-size":".682667rem"}},[t._v(t._s(t.crucesMoney))]),t._v(" "),s("span",{staticClass:"t3"},[t._v("元")]),t._v(" "),s("span",{staticClass:"t4"},[t._v("可赚")]),t._v(" "),s("span",{staticClass:"t5",staticStyle:{color:"#B2976A","font-size":".682667rem"}},[t._v(t._s(t.saveMoney))]),t._v(" "),s("span",{staticClass:"t6"},[t._v("元")])])]),t._v(" "),t._l(t.bottomImg,function(t){return s("div",{staticClass:"bottomImg"},[s("img",{staticStyle:{display:"block"},attrs:{src:t.src}})])}),t._v(" "),s("div",{staticClass:"payBtn",on:{click:t.buyNow}},[t._v(" \n        288元开通集客多经销商\n    ")]),t._v(" "),s("transition",{attrs:{name:"fade"}},[t.showBuy?s("div",{staticClass:"cover",on:{click:t.closeBuy}}):t._e()]),t._v(" "),s("section",{staticClass:"myAddress"},[s("section",{directives:[{name:"show",rawName:"v-show",value:t.showChose,expression:"showChose"}],staticClass:"showChose",on:{click:function(e){t.closeAdd()}}}),t._v(" "),s("section",{directives:[{name:"show",rawName:"v-show",value:t.showChose,expression:"showChose"}],staticClass:"address"},[s("section",{staticClass:"title",staticStyle:{height:"2rem","line-height":"2rem","border-bottom":"1px #eee solid",overflow:"hidden"}},[s("div",{staticClass:"area",class:t.showProvince?"active":"",on:{click:function(e){t.provinceSelected()}}},[t._v(t._s(t.Province?t.Province:"省份"))]),t._v(" "),s("div",{staticClass:"area",class:t.showCity?"active":"",on:{click:function(e){t.citySelected()}}},[t._v(t._s(t.City?t.City:"城市"))]),t._v(" "),s("div",{staticClass:"area",class:t.showDistrict?"active":"",on:{click:function(e){t.districtSelected()}}},[t._v(t._s(t.District?t.District:"区域"))])]),t._v(" "),s("ul",[t._l(t.info,function(e,i){return s("li",{directives:[{name:"show",rawName:"v-show",value:t.showProvince,expression:"showProvince"}],staticClass:"addList",class:e.selected?"active":"",on:{click:function(s){t.getProvinceId(e.code,e.name,i)}}},[t._v(t._s(e.name))])}),t._v(" "),t._l(t.showCityList,function(e,i){return s("li",{directives:[{name:"show",rawName:"v-show",value:t.showCity,expression:"showCity"}],staticClass:"addList",class:e.selected?"active":"",on:{click:function(s){t.getCityId(e.code,e.name,i)}}},[t._v(t._s(e.name))])}),t._v(" "),t._l(t.showDistrictList,function(e,i){return s("li",{directives:[{name:"show",rawName:"v-show",value:t.showDistrict,expression:"showDistrict"}],staticClass:"addList",class:e.selected?"active":"",on:{click:function(s){t.getDistrictId(e.code,e.name,i)}}},[t._v(t._s(e.name))])})],2)])]),t._v(" "),s("transition",{attrs:{name:"fade"}},[t.showBuy?s("div",{staticClass:"cover",on:{click:t.closeBuy}}):t._e()]),t._v(" "),s("transition",{attrs:{name:"slid_up"}},[t.showBuy?s("div",{staticClass:"choose_type_Container",staticStyle:{overflow:"scroll"}},[s("div",{staticClass:"proTitle"},[s("span",{staticClass:"proImg"},[s("img",{staticStyle:{width:"100%",height:"100%",display:"block"},attrs:{src:t.imagePath}})]),t._v(" "),s("span",{staticClass:"proPrice"},[t._v("¥"+t._s(t.productPrice))]),t._v(" "),t.showProductSpec?s("span",{staticClass:"proAllInfo"},[t._v(t._s(t.selectSpecInfo))]):t._e(),t._v(" "),s("span",{staticClass:"closePro",on:{click:function(e){t.closeBuy()}}},[s("img",{staticStyle:{width:"100%",height:"100%",display:"block"},attrs:{src:i("m1y0"),alt:"error"}})])]),t._v(" "),t.showProductSpec?s("div",{staticStyle:{overflow:"scroll","min-height":"5rem","max-height":"15rem"}},[s("div",{staticClass:"proColor"},[s("span",{staticClass:"tit11"},[t._v(t._s(t.primarySpecModelName))]),t._v(" "),t.primarySpecList.length?s("ul",{staticClass:"tt1"},t._l(t.primarySpecList,function(e,i){return s("li",{staticClass:"tt1div",class:{activeSpec:e.isChecked,ee:e.disabled},on:{click:function(s){t.selectPrimarySpec(e,i)}}},[t._v("\n                            "+t._s(e.primarySpecName)+"\n                        ")])})):t._e()]),t._v(" "),t.showProductSecondarySpec?s("div",{staticClass:"proSize"},[s("span",{staticClass:"tit11"},[t._v(t._s(t.secondarySpecModelName))]),t._v(" "),s("ul",t._l(t.secondarySpecList,function(e,i){return s("li",{staticClass:"tt1div",class:{activeSpec:e.isChecked,ee:e.disabled},on:{click:function(s){t.selectSecondarySpec(e,i)}}},[t._v("\n                            "+t._s(e.secondarySpecName)+"\n                        ")])}))]):t._e()]):t._e(),t._v(" "),s("div",{staticClass:"list "},[s("p",{staticClass:"list_p"},[t._v("续费年数")]),t._v(" "),s("div",{staticClass:"gw_num",staticStyle:{"margin-top":"13px"}},[s("span",{staticClass:"input-number-decrement",on:{click:function(e){t.subtraction()}}},[t._v("–")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.addcartpram.num,expression:"addcartpram.num"}],staticClass:"input-number",domProps:{value:t.addcartpram.num},on:{input:function(e){e.target.composing||t.$set(t.addcartpram,"num",e.target.value)}}}),t._v(" "),s("span",{staticClass:"input-number-increment",on:{click:function(e){t.add()}}},[t._v("+")])])]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:2==t.productType,expression:"productType==2"}],staticClass:"shuifei"},[s("div",{staticClass:"shuifei1"},[t._v("税费")]),t._v(" "),s("div",{staticClass:"shuifei2"},[t._v("本商品已包税")])]),t._v(" "),s("div",{staticClass:"buynow2",on:{click:function(e){t.doOperation()}}},[t._v("确定")])]):t._e()]),t._v(" "),s("transition",{attrs:{name:"fade"}},[t.showDesc?s("div",{staticClass:"cover",on:{click:t.closeDesc}}):t._e()]),t._v(" "),s("transition",{attrs:{name:"slid_up"}},[t.showDesc?s("div",{staticClass:"choose_type_Container"},[s("div",{staticClass:"gm-task",staticStyle:{"padding-bottom":"2.176rem"}},[s("div",{staticStyle:{position:"absolute",right:"10px",top:"10px"},on:{click:t.closeDesc}},[s("img",{attrs:{src:i("m1y0"),width:"17"}})]),t._v(" "),s("p",{staticStyle:{"padding-left":"10px","line-height":"45px","font-size":"0.6rem",color:"#666","border-bottom":"1px #eee solid"}},[t._v("商品说明")]),t._v(" "),t._l(t.productInfo.productIntroList,function(e){return s("div",{staticClass:"sm_right",staticStyle:{"margin-left":"10px","margin-top":"0px",height:"51px"}},[s("div",{staticStyle:{color:"#666","font-size":"0.55rem"}},[s("span"),t._v(t._s(e.title))]),t._v(" "),s("div",{staticStyle:{color:"#666","font-size":"0.5rem","line-height":"18px","margin-left":"11px",height:"28px","margin-top":"2px","padding-right":"15px"}},[t._v(t._s(e.introduction))])])})],2)]):t._e()]),t._v(" "),t.showAlert?s("alert-tip",{staticStyle:{"z-index":"99999"},attrs:{alertText:t.alertText},on:{closeTip:function(e){t.showAlert=!1}}}):t._e(),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.iszhuce,expression:"iszhuce"}],staticClass:"registered"},[s("div",{staticClass:"name"},[t._v(t._s(t.kehuName)+",请先完成手机验证")]),t._v(" "),s("div",{staticClass:"coverClose",staticStyle:{width:"2.88rem",height:"1.88rem",position:"absolute",left:"12.834667rem",top:"0"},on:{click:t.closeDiv}}),t._v(" "),s("div",{staticClass:"close",on:{click:t.closeDiv}},[s("img",{attrs:{src:i("0bfS"),alt:"error"}})]),t._v(" "),s("hr"),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.phonecode,expression:"phonecode"}],staticClass:"phone",attrs:{id:"phone",type:"text",placeholder:"请输入手机号"},domProps:{value:t.phonecode},on:{input:function(e){e.target.composing||(t.phonecode=e.target.value)}}}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.yzcode,expression:"yzcode"}],staticClass:"number",attrs:{id:"phone_code",type:"number",placeholder:"请输入验证码"},domProps:{value:t.yzcode},on:{input:function(e){e.target.composing||(t.yzcode=e.target.value)}}}),t._v(" "),s("button",{staticClass:"keyNum",attrs:{id:"btn",disabled:t.disabled},on:{click:function(e){t.settime(this)}}},[t._v(t._s(t.divname))]),t._v(" "),s("div",{staticClass:"sure",on:{click:function(e){t.getTip()}}},[t._v("确认")])])],2)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"regis_img_1"},[e("img",{attrs:{src:i("GIhc"),alt:"error"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"regis_img_2"},[e("img",{attrs:{src:i("l+3K"),alt:"error"}})])}]};var m=i("VU/8")(p,u,!1,function(t){i("BekI")},"data-v-a809b1c2",null);e.default=m.exports},GIhc:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYwAAAAqCAYAAACgC2wNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NUY2MzgzN0VFREQ2MTFFN0FENDk5NDQ0RTY2QTFBMDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NUY2MzgzN0ZFREQ2MTFFN0FENDk5NDQ0RTY2QTFBMDgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1RjYzODM3Q0VERDYxMUU3QUQ0OTk0NDRFNjZBMUEwOCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1RjYzODM3REVERDYxMUU3QUQ0OTk0NDRFNjZBMUEwOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PoX2yKsAABN+SURBVHja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"},"l+3K":function(t,e,i){t.exports=i.p+"static/img/zuoo@2x.5308777.png"}});