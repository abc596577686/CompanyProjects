webpackJsonp([14],{CvKe:function(e,t){},"f/Fb":function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAXCAYAAADQpsWBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQ1MzU4OUQ4MjhCQTExRTg4QTMzQUZCRjVDQ0Y0M0E0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQ1MzU4OUQ5MjhCQTExRTg4QTMzQUZCRjVDQ0Y0M0E0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDUzNTg5RDYyOEJBMTFFODhBMzNBRkJGNUNDRjQzQTQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDUzNTg5RDcyOEJBMTFFODhBMzNBRkJGNUNDRjQzQTQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7y69qbAAAAzUlEQVR42pTUPwrCMBQG8OTpDXTKLo7qHXT1ECI5gHiZhCI4ujq7u1pw8Q56hvhFUvFPk74X+Eha8uO9tqHaObdXSt2RrbU2KMYgZIRskMp7r7loiVyQFRcSWoqtLSQwVlJSSM1CAunzggvp90aC8xKktvKAjxKk3MNm4Gu/DqF8CLBxgOmETJEdsu5ECY4xXZE+MiMGGGI6JFAhNTFAbG2SgI2HmqQg+/ZKoBV1gT/EAV+IC95IAuLoGWNEoKl0lACVvvINOUv+Rk8BBgAjI3616dOh1wAAAABJRU5ErkJggg=="},mXjU:function(e,t,c){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=c("woOf"),r=c.n(s),i=c("qxsu"),o=c("P9l9"),l=c("uaSg"),d=c("mw3O"),u=c.n(d),a={data:function(){return{maxGoodsNum:20,isShowSpecSelectPanel:!1,isRotate:!1,isSelected:!1,packageNum:1,productList:[],productStockNumber:0,selectedSpecList:[],curSelectedSpecList:[],curSelectIndex_primary:null,curSelectIndex_second:null,curSelectProduct:null,curSelectProductIndex:null,isDisabled:!1,reduceDisabled:!1,addDisabled:!1,showAlert:!1,alertText:""}},watch:{selectedSpecList:function(e){var t=this;this.isShowSpecSelectPanel&&(console.log(e),this.curSelectProduct.selectedSpecListText="",this.curSelectProduct.curSelectedSpecList=[],this.productList[this.curSelectProductIndex].selectedSpecListText="",this.productList[this.curSelectProductIndex].curSelectedSpecList=[],e.forEach(function(e){e&&(t.curSelectProduct.curSelectedSpecList.push(e),t.productList[t.curSelectProductIndex].curSelectedSpecList.push(e))}),this.curSelectProduct.curSelectedSpecList.length&&(this.curSelectProduct.selectedSpecListText=this.curSelectProduct.curSelectedSpecList.join("、"),this.productList[this.curSelectProductIndex].selectedSpecListText=this.curSelectProduct.curSelectedSpecList.join("、")),console.log(this.curSelectProduct.curSelectedSpecList),console.log(this.curSelectProduct.selectedSpecListText))},packageNum:function(e,t){if(e>=this.productStockNumber||e>=this.maxGoodsNum?(this.addDisabled=!0,this.reduceDisabled=!1):this.addDisabled=!1,e<=1?(this.reduceDisabled=!0,this.addDisabled=!1):this.reduceDisabled=!1,e>this.productStockNumber)return this._toastMsg("超过库存"),void(this.packageNum=t);e<0&&(this.packageNum=1)}},mounted:function(){this.productId=this.$route.query.productId,this.oprType=this.$route.query.oprType,this._getGroupProduct()},methods:{handleFocus:function(e){console.log("获取焦点")},handleBlur:function(e){console.log("失去焦点")},addEnv:function(){this.packageNum++,this.packageNum,this.productStockNumber},reduceEnv:function(){this.packageNum<=1||this.packageNum--},selectSpecNav:function(e,t){this.isShowSpecSelectPanel=!this.isShowSpecSelectPanel,this.curSelectProductIndex=t,e.curSelectedSpecList.length?this.isSelected=!0:this.isSelected=!1,this.curSelectProduct=r()({},this._regenerateProduct(e)),console.log(this.curSelectProduct)},_regenerateProduct:function(e){if(!e.productSpecList.length)return e;var t=[],c=[];e.productSpecList.forEach(function(e,c){var s=!0,r=!0;if("1"==e.isSoldOut?e.disabled=!0:e.disabled=!1,t.length){s=!1;for(var i=0;i<t.length;i++){if(e.primarySpecId==t[i].primarySpecId)return void(r=!0);r=!1}}s&&t.push(e),r||t.push(e)}),e.productSpecList.forEach(function(e,t){var s=!0,r=!0;if("1"==e.isSoldOut?e.disabled=!0:e.disabled=!1,c.length){s=!1;for(var i=0;i<c.length;i++){if(e.secondarySpecId==c[i].secondarySpecId)return void(r=!0);r=!1}}s&&c.push(e),r||c.push(e)}),e.namePrimarySpecModel=t[0].primarySpecModelName,e.nameSecondarySpecModel=c[0].secondarySpecModelName,e.temporaryPrimarySpecList=t,e.temporarySecondarySpecList=c;var s=!1;return e.temporarySecondarySpecList.length&&""!=e.temporarySecondarySpecList[0].secondarySpecId&&(s=!0),e.isHaveSecondarySpec=s,console.log("是否有二级规格:"+s),this.isSelected?e.selectImageUrl=e.temporaryPrimarySpecList[e.curSelectIndex_primary].imageUrl:e.selectImageUrl=e.imageUrl,e},selectPrimarySpecEnv:function(e,t){"1"!==e.isSoldOut&&(this.curSelectProduct.oldSelectIndex_primary!==t?(this.curSelectProduct.selectImageUrl=e.imageUrl,this.productList[this.curSelectProductIndex].selectImageUrl=e.imageUrl,this.curSelectProduct.oldSelectIndex_primary=this.curSelectProduct.curSelectIndex_primary=t,this.productList[this.curSelectProductIndex].oldSelectIndex_primary=this.productList[this.curSelectProductIndex].curSelectIndex_primary=t,this._generateSpecText("primary-spec",e.primarySpecName)):(this.curSelectProduct.oldSelectIndex_primary=this.curSelectProduct.curSelectIndex_primary=null,this.productList[this.curSelectProductIndex].oldSelectIndex_primary=this.productList[this.curSelectProductIndex].curSelectIndex_primary=null,this.curSelectProduct.selectImageUrl=this.curSelectProduct.imageUrl,this._resetSpecText("primary-spec")))},selectSecondSpecEnv:function(e,t){"1"!==e.isSoldOut&&(this.curSelectProduct.oldSelectIndex_second!==t?(this.curSelectProduct.oldSelectIndex_second=this.curSelectProduct.curSelectIndex_second=t,this.productList[this.curSelectProductIndex].oldSelectIndex_second=this.productList[this.curSelectProductIndex].curSelectIndex_second=t,this._generateSpecText("sconds-spec",e.secondarySpecName)):(this.curSelectProduct.oldSelectIndex_second=this.curSelectProduct.curSelectIndex_second=null,this.productList[this.curSelectProductIndex].oldSelectIndex_second=this.productList[this.curSelectProductIndex].curSelectIndex_second=null,this._resetSpecText("sconds-spec")))},_getGroupProduct:function(){var e=this,t=u.a.stringify({a:"v1/productGroupList",productId:this.productId});Object(o.o)(t).then(function(t){if(console.log("商品组合----"),console.log(t),"1"==t.code){var c=t.dataList;c.forEach(function(e){e.curSelectedSpecList=[],e.selectImageUrl=e.imageUrl}),e.productList=c,e.productStockNumber=t.stockNumber,e.productStockNumber<1&&(e.packageNum=0)}})},_calculationStock:function(e){var t=[];return e.forEach(function(e){t.push(parseInt(parseInt(e.stockNumber)/parseInt(e.saleTimes)))}),Math.min.apply(null,t)},_generateSpecText:function(e,t){"primary-spec"===e&&this.$set(this.selectedSpecList,0,t),"sconds-spec"===e&&this.$set(this.selectedSpecList,1,t)},_resetSpecText:function(e){"primary-spec"===e&&this.$set(this.selectedSpecList,0,void 0),"sconds-spec"===e&&this.$set(this.selectedSpecList,1,void 0)},hideSpecPanelEnv:function(){var e=this;this.isRotate=!0;var t=setTimeout(function(){e.isShowSpecSelectPanel=!1,e.isRotate=!1,clearTimeout(t),e.isSelected||e._resetSpecData()},600)},_resetSpecData:function(){this.productList[this.curSelectProductIndex].oldSelectIndex_primary=null,this.productList[this.curSelectProductIndex].oldSelectIndex_second=null,this.productList[this.curSelectProductIndex].curSelectIndex_primary=null,this.productList[this.curSelectProductIndex].curSelectIndex_second=null,this.productList[this.curSelectProductIndex].curSelectedSpecList=[],this.productList[this.curSelectProductIndex].selectImageUrl=this.productList[this.curSelectProductIndex].imageUrl,this.curSelectProduct=null,this.selectedSpecList=[]},submitSpecParamEnv:function(){if(this.curSelectProduct.productSpecList.length)if(!this.curSelectProduct.productSpecList.length||this.curSelectProduct.curSelectedSpecList.length){if(this.curSelectProduct.isHaveSecondarySpec){if(!this.selectedSpecList[0]&&null===this.curSelectProduct.curSelectIndex_primary)return void this._toastMsg("请选择"+this.curSelectProduct.namePrimarySpecModel);if(!this.selectedSpecList[1])return void this._toastMsg("请选择"+this.curSelectProduct.nameSecondarySpecModel)}this.productList[this.curSelectProductIndex].imageUrl=this.curSelectProduct.imageUrl,this.isShowSpecSelectPanel=!1,this._resetSpecText("primary-spec"),this._resetSpecText("sconds-spec")}else this._toastMsg("请选择规格");else this.isShowSpecSelectPanel=!1},actionConfirm:function(){var e=this;console.log(this.productList);var t=[];if(this.productList.forEach(function(e){var c="",s="";void 0!=e.curSelectIndex_primary&&(c=e.temporaryPrimarySpecList[e.curSelectIndex_primary].primarySpecName),void 0!=e.curSelectIndex_second&&(s=e.temporarySecondarySpecList[e.curSelectIndex_second].secondarySpecName);var r=[],i={};e.productSpecList.forEach(function(e){e.primarySpecName==c&&r.push(e)}),r.forEach(function(e){e.secondarySpecName==s&&(i=e)}),console.log(i),console.log(e);var o=i&&i.groupId?i.groupId:e.groupId;t.push(o),console.log("已选的组合ID ===="),console.log(t)}),t=t.join(","),"1"==this.oprType){var c=u.a.stringify({productId:this.productId,groupProductInfo:t,addNum:this.packageNum});Object(o.a)(c).then(function(t){console.log("购物车改变---"),console.log(t),"1"==t.code?(e._toastMsg(t.msg),setTimeout(function(){e.$router.go(-1)},800)):e._toastMsg(t.msg)})}else{var s=u.a.stringify({productId:this.productId,groupProductInfo:t,number:this.packageNum});Object(o.g)(s).then(function(c){console.log("提交商品----"),console.log(c),1==c.code?e.$router.push({path:l.c+"/confirmOrder",query:{id:e.productId,groupProductInfo:t,num:e.packageNum}}):e._toastMsg("请选择规格商品")})}},_toastMsg:function(e){this.showAlert=!0,this.alertText=e}},components:{AlertTip:i.a}},n={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("section",{staticClass:"specGroupContainer"},[s("div",{directives:[{name:"title",rawName:"v-title"}],attrs:{"data-title":"选择套餐商品属性"}}),e._v(" "),s("div",{directives:[{name:"stat",rawName:"v-stat",value:{type:"pageview",title:"选择套餐商品属性"},expression:"{type:'pageview', title:'选择套餐商品属性'}"}]}),e._v(" "),s("ul",{staticClass:"goodList"},e._l(e.productList,function(t,r){return s("li",{key:r,staticClass:"good"},[s("div",{staticClass:"imgWrap"},[s("img",{attrs:{src:t.selectImageUrl}})]),e._v(" "),s("div",{staticClass:"goodDesc"},[s("div",{staticClass:"info"},[s("p",{staticClass:"goodName",domProps:{innerHTML:e._s(t.productName)}}),e._v(" "),s("span",{staticClass:"goodNumWrap",domProps:{innerHTML:e._s(t.saleTimes)}},[e._v("10")])]),e._v(" "),s("p",{staticClass:"goodsPrice",domProps:{innerHTML:e._s("¥"+t.price)}}),e._v(" "),1!=t.isSpceProduct||t.curSelectedSpecList.length?e._e():s("div",{staticClass:"selectSpec",on:{click:function(c){e.selectSpecNav(t,r)}}},[s("p",{staticClass:"text_select"},[e._v("请选择规格")]),e._v(" "),e._m(0,!0)]),e._v(" "),1==t.isSpceProduct&&t.curSelectedSpecList.length?s("div",{staticClass:"selectedSpec",on:{click:function(c){e.selectSpecNav(t,r)}}},[s("p",{staticClass:"specDesc"},[s("ul",{staticClass:"list"},[s("li",{staticClass:"span",domProps:{innerHTML:e._s(t.selectedSpecListText)}})]),e._v(" "),s("img",{staticClass:"select_up",attrs:{src:c("f/Fb")}})])]):e._e()])])})),e._v(" "),s("div",{staticClass:"actionNum"},[s("div",{staticClass:"packageNumChange"},[s("span",{staticClass:"text"},[e._v("套餐数量")]),e._v(" "),s("div",{staticClass:"numChangeWrap"},[s("div",{staticClass:"handle reduce",class:{disabled:e.reduceDisabled},on:{click:e.reduceEnv}},[e._v("-")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.packageNum,expression:"packageNum"}],staticClass:"packageNum",attrs:{type:"number"},domProps:{value:e.packageNum},on:{focus:e.handleFocus,blur:e.handleBlur,input:function(t){t.target.composing||(e.packageNum=t.target.value)}}}),e._v(" "),s("div",{staticClass:"handle add",class:{disabled:e.addDisabled},on:{click:e.addEnv}},[e._v("+")])])]),e._v(" "),s("div",{staticClass:"btn",on:{click:e.actionConfirm}},[e._v("确定")])]),e._v(" "),s("transition",{attrs:{name:"slide"}},[e.isShowSpecSelectPanel?s("div",{staticClass:"specSelectPanel"},[s("div",{staticClass:"goodInfo"},[s("div",{staticClass:"imgWrap"},[s("img",{attrs:{src:e.curSelectProduct.selectImageUrl}})]),e._v(" "),s("div",{staticClass:"selectedSpec"},[s("p",{staticClass:"goodsPrice",domProps:{innerHTML:e._s("¥"+e.curSelectProduct.price)}}),e._v(" "),e.curSelectProduct.productSpecList.length?e._e():s("p",[e._v("此商品没有可选规格")]),e._v(" "),!e.curSelectProduct.curSelectedSpecList.length&&e.curSelectProduct.productSpecList.length?s("p",[e._v("请选择规格")]):e._e(),e._v(" "),e.curSelectProduct.curSelectedSpecList.length&&e.curSelectProduct.productSpecList.length?s("p",[e._v("已选："),s("span",{domProps:{innerHTML:e._s(e.curSelectProduct.selectedSpecListText)}})]):e._e()])]),e._v(" "),e.curSelectProduct.productSpecList.length?s("div",{staticClass:"specList"},[s("div",{staticClass:"spec primarySpec"},[s("h3",{staticClass:"title",domProps:{innerHTML:e._s(e.curSelectProduct.namePrimarySpecModel)}}),e._v(" "),s("ul",e._l(e.curSelectProduct.temporaryPrimarySpecList,function(t,c){return""!==t.primarySpecName?s("li",{staticClass:"item",class:{active:e.curSelectProduct.curSelectIndex_primary===c,disabled:"1"===t.isSoldOut},domProps:{innerHTML:e._s(t.primarySpecName)},on:{click:function(s){e.selectPrimarySpecEnv(t,c)}}}):e._e()}))]),e._v(" "),""!==e.curSelectProduct.nameSecondarySpecModel?s("div",{staticClass:"spec secondSpec"},[s("h3",{staticClass:"title",domProps:{innerHTML:e._s(e.curSelectProduct.nameSecondarySpecModel)}}),e._v(" "),s("ul",e._l(e.curSelectProduct.temporarySecondarySpecList,function(t,c){return""!==t.secondarySpecName?s("li",{staticClass:"item",class:{active:e.curSelectProduct.curSelectIndex_second===c,disabled:"1"===t.isSoldOut},domProps:{innerHTML:e._s(t.secondarySpecName)},on:{click:function(s){e.selectSecondSpecEnv(t,c)}}}):e._e()}))]):e._e()]):e._e(),e._v(" "),s("div",{staticClass:"btn",on:{click:e.submitSpecParamEnv}},[e._v("确定")]),e._v(" "),s("div",{staticClass:"closeBtn",class:{rotateAni:e.isRotate},on:{click:e.hideSpecPanelEnv}})]):e._e()]),e._v(" "),s("transition",{attrs:{name:"fade"}},[e.isShowSpecSelectPanel?s("div",{staticClass:"mask",on:{click:function(t){e.isShowSpecSelectPanel=!1}}}):e._e()]),e._v(" "),e.showAlert?s("alert-tip",{staticStyle:{"z-index":"999"},attrs:{alertText:e.alertText},on:{closeTip:function(t){e.showAlert=!e.showAlert}}}):e._e()],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"iconImgWrap"},[t("img",{staticClass:"icon_select",attrs:{src:c("f/Fb")}})])}]};var p=c("VU/8")(a,n,!1,function(e){c("CvKe")},"data-v-be7975f0",null);t.default=p.exports}});