webpackJsonp([25],{"1jeY":function(t,e){},AL2K:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});i("NYxO"),i("RMAT"),i("uaSg");var s=i("fdFc"),a=i("P9l9"),o=i("mw3O"),n=i.n(o),r=i("qxsu"),c=i("y/jF"),d=i("RPyc"),l={data:function(){return{productImg:"",productName:"大礼包",productPrice:"￥25.00",productInfo:{},headerImageList:[],stockNumber:0,preventRepeat:!1,showLoading:!0,descStatus:0,showChose:!1,showProvince:!0,showCity:!1,showDistrict:!1,showCityList:!1,showDistrictList:!1,showProductSpec:!1,showProductSecondarySpec:!1,province:31e4,city:31e4,district:310112,GetProvinceId:2,Province:"上海市",City:!1,District:!1,selected:!1,info:[{areaId:31e4,areaName:"上海"}],showAlert:!1,alertText:null,showLoadingToast:!1,loadingText:"",payinfo:{addressId:"",name:"",mobile:"",provinceId:"",cityId:"",areaId:"",address:"",smsCode:"",identityNo:""},payType:"0"}},created:function(){var t=this;this.choosedAddress&&(this.payinfo.addressId=this.choosedAddress.addressId);var e=n.a.stringify({a:"v1/regionList"});Object(a.s)(e).then(function(e){console.log("城市列表----"),console.log(e),t.info=e.list});var i=n.a.stringify({a:"v1/productDetail",productId:1});Object(a.O)(i).then(function(e){console.log("产品详情----"),console.log(e),t.productImg=e.headerImageList[0].imageUrl})},mounted:function(){},methods:{districtSelected:function(){this.showProvince=!1,this.showCity=!1,this.showDistrict=!0},yunfeiXs:function(){this.yunfeikk=!this.yunfeikk},cpa:function(){this.yunfeikk=!this.yunfeikk},choseAdd:function(){this.showChose=!0},closeAdd:function(){this.showChose=!1},_filter:function(t,e,i){for(var s=[],a=0;a<t.length;a++)i==t[a].areaId&&(s=t[a][e]);return s},getProvinceId:function(t,e,i){this.province=t,this.Province=e,this.showProvince=!1,this.showCity=!0,this.showDistrict=!1,this.showCityList=this._filter(this.info,"childrenList",this.province),this.info.map(function(t){return t.selected=!1}),this.info[i].selected=!0,this.payinfo.provinceId=t},provinceSelected:function(t,e,i){this.showCityList=!1,this.showDistrictList=!1,this.City=!1,this.District=!1,this.showProvince=!0,this.showCity=!1,this.showDistrict=!1},getCityId:function(t,e,i){this.city=t,this.City=e,this.showProvince=!1,this.showCity=!1,this.showDistrict=!0,this.showDistrictList=this._filter(this.showCityList,"childrenList",this.city),this.showCityList.map(function(t){return t.selected=!1}),this.showCityList[i].selected=!0,this.payinfo.cityId=t},citySelected:function(){this.showProvince=!1,this.showCity=!0,this.showDistrict=!1},getDistrictId:function(t,e,i){this.district=t,this.District=e,this.showDistrictList.map(function(t){return t.selected=!1}),this.showDistrictList[i].selected=!0,this.showChose=!1,this.payinfo.areaId=t},submitPay:function(){var t=this,e=n.a.stringify({addressId:this.payinfo.addressId,name:this.payinfo.name,mobile:this.payinfo.mobile,provinceId:this.payinfo.provinceId,cityId:this.payinfo.cityId,areaId:this.payinfo.areaId,address:this.payinfo.address,smsCode:this.payinfo.smsCode,identityNo:this.payinfo.identityNo});console.log(e),Object(a.F)(e).then(function(e){if(console.log("----支付反馈----"),console.log(e),1==e.code){var i={orderId:e.orderId,payType:"weixin",isWeb:!0},o=n.a.stringify(i),r=t;console.log(o),Object(a.M)(o).then(function(e){if(r.showLoadingToast=!1,"1"==e.code)if(Object(s.e)()&&0==t.payType){var i=function(){WeixinJSBridge.invoke("getBrandWCPayRequest",{appId:e.orderPayInfo.appId,timeStamp:e.orderPayInfo.timeStamp,nonceStr:e.orderPayInfo.nonceStr,package:e.orderPayInfo.package,signType:e.orderPayInfo.signType,paySign:e.orderPayInfo.paySign},function(t){"get_brand_wcpay_request:ok"==t.err_msg?(r.showAlert=!0,r.alertText="订单支付成功！",r.$router.push({path:r.routerPath+"/success"})):"get_brand_wcpay_request:cancel"==t.err_msg?(r.showAlert=!0,r.alertText="订单支付取消！",r.$router.push({path:r.routerPath+"/paydealers"})):"get_brand_wcpay_request:fail"==t.err_msg&&(r.showAlert=!0,r.alertText="订单支付失败！",r.$router.push({path:r.routerPath+"/paydealers"}))})};"undefined"==typeof WeixinJSBridge?document.addEventListener?document.addEventListener("WeixinJSBridgeReady",i,!1):document.attachEvent&&(document.attachEvent("WeixinJSBridgeReady",i),document.attachEvent("onWeixinJSBridgeReady",i)):i()}else 1==r.payType?setTimeout(function(){window.location.href=e.orderPayInfo},1e3):(r.showAlert=!0,r.alertText="请在微信浏览器中打开");else r.showAlert=!0,r.alertText=e.msg})}else me.showAlert=!0,me.alertText=e.msg})}},components:{alertTip:r.a,loadingToast:d.a,loading:c.a}},h={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"profile_page"},[i("div",{directives:[{name:"title",rawName:"v-title"}],attrs:{"data-title":"支付"}}),t._v(" "),i("div",{directives:[{name:"stat",rawName:"v-stat",value:{type:"pageview",title:"支付"},expression:"{type:'pageview', title:'支付'}"}]}),t._v(" "),i("div",{staticClass:"proInfo"},[i("div",{staticClass:"proImg"},[i("img",{attrs:{src:t.productImg,alt:"error"}})]),t._v(" "),i("div",{staticClass:"proName"},[t._v("\n            "+t._s(t.productName)+"\n        ")]),t._v(" "),i("div",{staticClass:"proPrice"},[t._v("\n            "+t._s(t.productPrice)+"\n        ")])]),t._v(" "),i("div",{staticClass:"getTip"},[t._v("\n        收货信息\n    ")]),t._v(" "),i("div",{staticClass:"name"},[t._v("\n        收货人姓名\n        "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.payinfo.name,expression:"payinfo.name"}],staticClass:"inputInfo",attrs:{type:"text"},domProps:{value:t.payinfo.name},on:{input:function(e){e.target.composing||t.$set(t.payinfo,"name",e.target.value)}}})]),t._v(" "),i("hr"),t._v(" "),i("div",{staticClass:"name"},[t._v("\n        手机号\n        "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.payinfo.mobile,expression:"payinfo.mobile"}],staticClass:"inputInfo",attrs:{type:"number"},domProps:{value:t.payinfo.mobile},on:{input:function(e){e.target.composing||t.$set(t.payinfo,"mobile",e.target.value)}}})]),t._v(" "),i("hr"),t._v(" "),i("div",{staticClass:"name"},[t._v("\n        身份证号\n        "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.payinfo.identityNo,expression:"payinfo.identityNo"}],staticClass:"inputInfo",attrs:{type:"number"},domProps:{value:t.payinfo.identityNo},on:{input:function(e){e.target.composing||t.$set(t.payinfo,"identityNo",e.target.value)}}})]),t._v(" "),i("hr"),t._v(" "),i("div",{staticClass:"weui-cell weui-cell-access",staticStyle:{height:"50px","background-color":"#fff","padding-left":".64rem"},attrs:{id:"showIOSActionSheet"}},[i("div",{staticClass:"weui-cell-bd",on:{click:function(e){t.choseAdd()}}},[i("span",{staticStyle:{"vertical-align":"middle","font-size":".597333rem"},attrs:{id:"peisong_address"}},[t._v("省市区(请选择)   "+t._s(t.Province?t.Province:"省份")+"、 "+t._s(t.City?t.City:"城市")+"、"+t._s(t.District?t.District:"区域"))])]),t._v(" "),i("div",{staticClass:"weui-cell-ft"})]),t._v(" "),i("hr"),t._v(" "),i("div",{staticClass:"mainAdress"},[i("span",{staticClass:"mA-1"},[t._v("请填写详细地址")]),t._v(" "),i("span",{staticClass:"mA-2"},[t._v("(无需重复填写省市区)")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.payinfo.address,expression:"payinfo.address"}],attrs:{type:"text",id:"addrPic"},domProps:{value:t.payinfo.address},on:{input:function(e){e.target.composing||t.$set(t.payinfo,"address",e.target.value)}}})]),t._v(" "),i("hr"),t._v(" "),i("span",{staticClass:"tti"}),t._v(" "),i("hr",{staticStyle:{opacity:"0.1","background-color":"lightgrey",height:".2px"}}),t._v(" "),t._m(0),t._v(" "),i("hr"),t._v(" "),i("div",{staticClass:"markSure",on:{click:function(e){e.stopPropagation(),t.submitPay()}}},[t._v("\n        马上支付\n    ")]),t._v(" "),i("section",{staticClass:"myAddress"},[i("section",{directives:[{name:"show",rawName:"v-show",value:t.showChose,expression:"showChose"}],staticClass:"showChose",on:{click:function(e){t.closeAdd()}}}),t._v(" "),i("section",{directives:[{name:"show",rawName:"v-show",value:t.showChose,expression:"showChose"}],staticClass:"address"},[i("section",{staticClass:"title",staticStyle:{height:"2rem","line-height":"2rem","border-bottom":"1px #eee solid",overflow:"hidden"}},[i("div",{staticClass:"area",class:t.showProvince?"active":"",on:{click:function(e){t.provinceSelected()}}},[t._v(t._s(t.Province?t.Province:"省份"))]),t._v(" "),i("div",{staticClass:"area",class:t.showCity?"active":"",on:{click:function(e){t.citySelected()}}},[t._v(t._s(t.City?t.City:"城市"))]),t._v(" "),i("div",{staticClass:"area",class:t.showDistrict?"active":"",on:{click:function(e){t.districtSelected()}}},[t._v(t._s(t.District?t.District:"区域"))])]),t._v(" "),i("ul",[t._l(t.info,function(e,s){return i("li",{directives:[{name:"show",rawName:"v-show",value:t.showProvince,expression:"showProvince"}],staticClass:"addList",class:e.selected?"active":"",on:{click:function(i){t.getProvinceId(e.areaId,e.areaName,s)}}},[t._v(t._s(e.areaName))])}),t._v(" "),t._l(t.showCityList,function(e,s){return i("li",{directives:[{name:"show",rawName:"v-show",value:t.showCity,expression:"showCity"}],staticClass:"addList",class:e.selected?"active":"",on:{click:function(i){t.getCityId(e.areaId,e.areaName,s)}}},[t._v(t._s(e.areaName))])}),t._v(" "),t._l(t.showDistrictList,function(e,s){return i("li",{directives:[{name:"show",rawName:"v-show",value:t.showDistrict,expression:"showDistrict"}],staticClass:"addList",class:e.selected?"active":"",on:{click:function(i){t.getDistrictId(e.areaId,e.areaName,s)}}},[t._v(t._s(e.areaName))])})],2)])]),t._v(" "),t.showAlert?i("alert-tip",{attrs:{alertText:t.alertText},on:{closeTip:function(e){t.showAlert=!1}}}):t._e(),t._v(" "),t.showLoadingToast?i("loading-toast",{attrs:{loadingText:t.loadingText},on:{closeTip:function(e){t.showLoadingToast=!1}}}):t._e()],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"payType"},[e("div",{staticClass:"type_1"},[e("img",{attrs:{src:i("EKD7"),alt:"error"}})]),this._v(" "),e("div",{staticClass:"type_2"},[this._v("微信支付")]),this._v(" "),e("div",{staticClass:"type_3"},[this._v("(推荐)")]),this._v(" "),e("div",{staticClass:"type_4"},[e("img",{attrs:{src:i("1myp"),alt:"error"}})])])}]};var v=i("VU/8")(l,h,!1,function(t){i("1jeY")},"data-v-a1edb6da",null);e.default=v.exports}});