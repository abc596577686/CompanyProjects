webpackJsonp([25],{SaJC:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("P9l9"),s=(a("y/jF"),a("i97M")),n=a("qxsu"),o=(a("uaSg"),a("mw3O")),r=a.n(o),d={data:function(){return{showAlert:!1,isShowShade:!1,isShowBankCardList:!1,isShowBankCardType:!1,isCreditCard:!1,curSelectBankCardName:"请选择银行卡",curSelectBankCardTypeName:"请选择",cardNumber:"",accountName:"",idCardNo:"",validityDate:"",identifyCode:"",phoneNumber:"",phoneIdentifyCode:"",bankList:[],bankCardTypes:[],isClick:!0,getCodeBtnText:"免费获取"}},created:function(){this._getBankCardList(),this.orderId=this.$route.query.orderId||"34823"},mounted:function(){},methods:{cardNumberEnv:function(e){console.log(this.cardNumber)},getCodeEnv:function(){var e=this;if(this._checkInfo()&&this.isClick){var t=r.a.stringify({orderId:this.orderId||"34823",sceneType:"0801",mobile:this.phoneNumber,bankCardNumber:this.cardNumber,realName:this.accountName,identityNo:this.idCardNo});Object(i.u)(t).then(function(t){if(console.log("获取验证码"),console.log(t),"0"!==t.code)return"1"===t.code?(e._showMsg(t.msg),void e._djs()):void 0;e._showMsg(t.msg)})}},_djs:function(){var e=this;this.isClick=!1;var t=60;t--,this.getCodeBtnText=t+"s后重新获取";var a=setInterval(function(){if(1==t)return e.getCodeBtnText="免费获取",e.isClick=!0,void clearInterval(a);t--,e.getCodeBtnText=t+"s后重新获取"},1e3)},bindBankCardEnv:function(){var e=this;if(this._checkInfo()){if(!this.phoneIdentifyCode.length)return this._showMsg("验证码不能为空"),!1;var t=r.a.stringify({orderId:this.orderId,cardType:this.curSelectBankCardTypeId,bankType:this.curSelectBankCardId,sceneType:"0801",mobile:this.phoneNumber,bankCardNumber:this.cardNumber,realName:this.accountName,identityNo:this.idCardNo,cvvNumber:this.identifyCode,expiredDate:this._changeVal(this.validityDate),smsCode:this.phoneIdentifyCode});Object(i.e)(t).then(function(t){if(console.log("获取验证码"),console.log(t),"0"!==t.code)return"1"===t.code?(e._showMsg(t.msg),void e.$router.go(-1)):void 0;e._showMsg(t.msg)})}},_changeVal:function(e){return e.slice(0,2)+","+e.slice(2,4)},_checkInfo:function(){if(void 0==this.curSelectBankCardId)return this._showMsg("请选择卡片所属银行"),!1;if(void 0==this.curSelectBankCardTypeId)return this._showMsg("请选择卡片类型"),!1;if(!this.cardNumber.length)return this._showMsg("请填写完整的银行卡号"),!1;if(!this.accountName.length)return this._showMsg("请填写账户名"),!1;if(!this.idCardNo.length)return this._showMsg("请填写身份证号码"),!1;if(this.isCreditCard){if(!this.validityDate.length)return this._showMsg("请填写信用卡有效期"),!1;if("4"!=this.validityDate.length)return this._showMsg("信用卡有效期格式有误"),!1;if(!this.identifyCode.length)return this._showMsg("请填写信用卡CVN码"),!1}return!!this.phoneNumber.length||(this._showMsg("手机号码不能为空"),!1)},_getBankCardList:function(){var e=this,t=r.a.stringify({a:"v1/bankList"});Object(i.q)(t).then(function(t){console.log("银行卡列表"),console.log(t),"1"===t.code&&(e.bankList=t.dataList,e.bankCardTypes=t.cardTypeList)})},selectBankCardEnv:function(e){console.log(e);var t=e.bankId,a=e.bankName;this.curSelectBankCardName=a,this.curSelectBankCardId=t,this._hideShade(),this._hideBankCardList()},selectBankCardTypeEnv:function(e){console.log(e);var t=e.cardName,a=e.cardType;this.isCreditCard="信用卡"==t,this.curSelectBankCardTypeName=t,this.curSelectBankCardTypeId=a,this._hideShade(),this._hideBankCardType()},touchEnv:function(){this._hideShade(),this._hideBankCardList(),this._hideBankCardType()},showBankListEnv:function(){this._showBankCardList(),this._showShade()},showBankCardType:function(){this._showShade(),this._showBankCardType()},_hideShade:function(){this.isShowShade=!1},_showShade:function(){this.isShowShade=!0},_hideBankCardList:function(){this.isShowBankCardList=!1},_showBankCardList:function(){this.isShowBankCardList=!0},_hideBankCardType:function(){this.isShowBankCardType=!1},_showBankCardType:function(){this.isShowBankCardType=!0},_showMsg:function(e){this.showAlert=!0,this.alertText=e}},components:{AlertTip:n.a,Shade:s.a}},c={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"editBankInfo"},[i("div",{directives:[{name:"title",rawName:"v-title"}],attrs:{"data-title":"绑定银行卡"}}),e._v(" "),i("div",{directives:[{name:"stat",rawName:"v-stat",value:{type:"pageview",title:"绑定银行卡"},expression:"{type:'pageview', title:'绑定银行卡'}"}]}),e._v(" "),i("div",{staticClass:"outItem"},[i("div",{staticClass:"innerItem"},[i("div",{staticClass:"label"},[e._v("银行")]),e._v(" "),i("div",{staticClass:"desc",on:{click:e.showBankListEnv}},[i("div",{staticClass:"text",domProps:{innerHTML:e._s(e.curSelectBankCardName)}}),e._v(" "),i("img",{attrs:{src:a("xayK"),alt:""}})])]),e._v(" "),i("div",{staticClass:"innerItem"},[i("div",{staticClass:"label"},[e._v("银行卡类型")]),e._v(" "),i("div",{staticClass:"desc",on:{click:e.showBankCardType}},[i("div",{staticClass:"text",domProps:{innerHTML:e._s(e.curSelectBankCardTypeName)}}),e._v(" "),i("img",{attrs:{src:a("xayK"),alt:""}})])]),e._v(" "),i("div",{staticClass:"innerItem"},[i("span",{staticClass:"label"},[e._v("银行卡")]),e._v(" "),i("span",{staticClass:"content"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.cardNumber,expression:"cardNumber"}],attrs:{type:"text",placeholder:"输入您的银行卡号"},domProps:{value:e.cardNumber},on:{change:function(t){e.cardNumberEnv(e.cardNumber)},input:function(t){t.target.composing||(e.cardNumber=t.target.value)}}})])])]),e._v(" "),i("div",{staticClass:"outItem"},[i("div",{staticClass:"innerItem"},[i("span",{staticClass:"label"},[e._v("持卡人姓名")]),e._v(" "),i("span",{staticClass:"content"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.accountName,expression:"accountName"}],attrs:{type:"text",placeholder:"输入您的账户名"},domProps:{value:e.accountName},on:{input:function(t){t.target.composing||(e.accountName=t.target.value)}}})])]),e._v(" "),i("div",{staticClass:"innerItem"},[i("span",{staticClass:"label"},[e._v("身份证号码")]),e._v(" "),i("span",{staticClass:"content"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.idCardNo,expression:"idCardNo"}],attrs:{type:"text",placeholder:"输入您的身份证号码"},domProps:{value:e.idCardNo},on:{input:function(t){t.target.composing||(e.idCardNo=t.target.value)}}})])])]),e._v(" "),i("div",{staticClass:"outItem"},[e.isCreditCard?i("div",{staticClass:"innerItem"},[i("span",{staticClass:"label"},[e._v("有效期")]),e._v(" "),i("span",{staticClass:"content"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.validityDate,expression:"validityDate"}],attrs:{type:"number",placeholder:"银行卡有效期，格式：0688"},domProps:{value:e.validityDate},on:{input:function(t){t.target.composing||(e.validityDate=t.target.value)}}})])]):e._e(),e._v(" "),e.isCreditCard?i("div",{staticClass:"innerItem"},[i("span",{staticClass:"label"},[e._v("CVN2")]),e._v(" "),i("span",{staticClass:"content"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.identifyCode,expression:"identifyCode"}],attrs:{type:"number",placeholder:"信用卡背面CVN码"},domProps:{value:e.identifyCode},on:{input:function(t){t.target.composing||(e.identifyCode=t.target.value)}}})])]):e._e(),e._v(" "),i("div",{staticClass:"innerItem"},[i("span",{staticClass:"label"},[e._v("手机号")]),e._v(" "),i("span",{staticClass:"content"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.phoneNumber,expression:"phoneNumber"}],attrs:{type:"number",placeholder:"银行卡预留手机号码"},domProps:{value:e.phoneNumber},on:{input:function(t){t.target.composing||(e.phoneNumber=t.target.value)}}})])]),e._v(" "),i("div",{staticClass:"innerItem"},[i("span",{staticClass:"label"},[e._v("验证码")]),e._v(" "),i("span",{staticClass:"content phoneIdentifyCode"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.phoneIdentifyCode,expression:"phoneIdentifyCode"}],attrs:{type:"number",placeholder:"短信验证码"},domProps:{value:e.phoneIdentifyCode},on:{input:function(t){t.target.composing||(e.phoneIdentifyCode=t.target.value)}}}),e._v(" "),i("div",{staticClass:"getCode",domProps:{innerHTML:e._s(e.getCodeBtnText)},on:{click:e.getCodeEnv}})])])]),e._v(" "),i("div",{staticClass:"btnWrap"},[i("div",{staticClass:"btn",on:{click:e.bindBankCardEnv}},[e._v("绑定银行卡")])]),e._v(" "),e.isShowBankCardList?i("div",{staticClass:"bankListWrap"},e._l(e.bankList,function(t){return e.bankList.length?i("div",{staticClass:"item",domProps:{innerHTML:e._s(t.bankName)},on:{click:function(a){e.selectBankCardEnv(t)}}}):e._e()})):e._e(),e._v(" "),e.isShowBankCardType?i("div",{staticClass:"bankCardTypeWrap"},e._l(e.bankCardTypes,function(t){return e.bankCardTypes.length?i("div",{staticClass:"item",domProps:{innerHTML:e._s(t.cardName)},on:{click:function(a){e.selectBankCardTypeEnv(t)}}}):e._e()})):e._e(),e._v(" "),e.isShowShade?i("shade",{on:{touchEnv:e.touchEnv}}):e._e(),e._v(" "),e.showAlert?i("alert-tip",{staticStyle:{"z-index":"99999"},attrs:{alertText:e.alertText},on:{closeTip:function(t){e.showAlert=!1}}}):e._e()],1)},staticRenderFns:[]};var l=a("VU/8")(d,c,!1,function(e){a("fNwC")},"data-v-24e1c4d8",null);t.default=l.exports},fNwC:function(e,t){},xayK:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAATCAYAAACk9eypAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkVFRTM1NjhFNjA4NTExRThBMUVCQjI3NTg0RjlCNzg3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkVFRTM1NjhGNjA4NTExRThBMUVCQjI3NTg0RjlCNzg3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RUIyQTZCNjc2MDg1MTFFOEExRUJCMjc1ODRGOUI3ODciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RUIyQTZCNjg2MDg1MTFFOEExRUJCMjc1ODRGOUI3ODciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz54M+1EAAABNUlEQVR42oyTvUoDQRSFdxMLCyGlhUUeICAqhKyVnY1REYMohDxBIit5C6uxEXwCJY2FSSHW4hryU6TVxsIoVgZEG8HvyhUGzWQc+HImk3O4e29mwziO74MgeIZtY8ww8KwUXMEy3BKe9wXSSZI0oyj6kApQZt/n7M4ZkA8M1xgHbEtQYf/CWWdcILS/8Eh55AJm4Qjq9PXpDGgoi7Qgp+E9Qm/OgIYySANWoQ9FQo8/U/qz+PEVWYMTWNQJLjgr/KpWRw7hHXbTvgDTumFq8ogrsJn6R4WaiFYohxOMUt1AFZ608a5rSjPImTY+UPOD63+YQ5ogU7mEHcwj+/LZ5iWkreZjqWCbZU1Z5g3kFKbhAKNxXW8xyxTO9WzLZf7uAa9csn0YanM93wu0Dl0o+MyyvgQYAMgUbLA+xlGsAAAAAElFTkSuQmCC"}});