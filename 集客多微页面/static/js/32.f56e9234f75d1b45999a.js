webpackJsonp([32],{YfWJ:function(e,t){},do8e:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=i("qxsu"),o=i("P9l9"),a=i("y/jF"),r=(i("uaSg"),i("mw3O")),n=i.n(r),c={data:function(){return{routerPath:"",storeName:sessionStorage.storeName,price:"",orderNo:"",cardNum:"",showAlert:!1,timeoutKey:0,linkKey:1,countdown:60,divname:"免费获取",yzcode:"",phonecode:"",disabled:!1,orderId:"",quickCardId:"",bankName:"",cardNumber:"",isshowfail:!1,failReason:""}},created:function(){},mounted:function(){this.orderId=this.$route.query.orderId,this.orderNo=this.$route.query.orderNo,this.price=this.$route.query.price,this.quickCardId=this.$route.query.quickCardId,this.bankName=this.$route.query.bankName,this.cardNumber=this.$route.query.cardNumber},methods:{settime:function(e){var t=this,i=this,s=this.phonecode;if(""==s)return this.phonecode="",this.alertText="请输入手机号",this.showAlert=!0,!1;if(1==this.linkKey){var a=n.a.stringify({orderId:i.orderId,sceneType:"0403",quickCardId:i.quickCardId,mobile:s});Object(o.S)(a).then(function(e){if(console.log(e),"0"==e.code){var i=e.msg;t.alertText=i,t.showAlert=!0,clearTimeout(r)}else if("1"==e.code){var s=e.msg;t.alertText=s,t.showAlert=!0,t.timeoutKey=1,t.linkKey=0,console.log(t.timeoutKey),console.log(t.linkKey)}else t.alertText=e.msg,t.showAlert=!0})}if("1"==this.timeoutKey&&"0"==this.linkKey&&(this.disabled=!0,this.divname=this.countdown+"s后重新获取",this.countdown--),0==this.countdown)return this.linkKey++,this.timeoutKey--,this.disabled=!1,this.divname="免费获取",void(this.countdown=60);var r=setTimeout(function(){i.settime(e)},1e3)},commit:function(){var e=this,t=n.a.stringify({orderId:this.orderId,quickCardId:this.quickCardId,smsCode:this.yzcode});Object(o.R)(t).then(function(t){if(console.log("获取支付信息----"),console.log(t),1==t.code){var i=e;e.alertText="支付成功",e.showAlert=!0,setTimeout(function(){i.$router.push({path:i.routerPath+"/wap/paySuccess",query:{orderId:i.orderId}})},2e3)}else 0==t.code?(e.failReason=t.msg,e.isshowfail=!0):(e.alertText="接口调用失败 请重试",e.showAlert=!0)})},goback:function(){this.isshowfail=!0,this.$router.go(-1)},godown:function(){this.isshowfail=!1}},components:{loading:a.a,AlertTip:s.a}},d={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("div",{directives:[{name:"title",rawName:"v-title"}],attrs:{"data-title":"美付宝快捷支付"}}),e._v(" "),i("div",{staticClass:"toptit"},[i("div",{staticClass:"price"},[e._v("订单金额"),i("span",[e._v(e._s(e.price?"￥"+e.price:""))])]),e._v(" "),i("div",{staticClass:"num"},[e._v("订单编号"),i("span",[e._v(e._s(e.orderNo))])])]),e._v(" "),i("div",{staticClass:"card"},[i("span",{staticClass:"name"},[e._v("\n            "+e._s(e.bankName)+"\n        ")]),e._v(" "),i("span",{staticClass:"name",staticStyle:{"margin-left":".213333rem",width:"9rem"}},[e._v("\n            "+e._s(e.cardNumber)+"\n        ")])]),e._v(" "),i("div",{staticClass:"cov"}),e._v(" "),i("div",{staticClass:"card"},[i("span",[e._v("手机号")]),e._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:e.phonecode,expression:"phonecode"}],staticClass:"phone",staticStyle:{"margin-left":".5rem"},attrs:{id:"phone",type:"text",placeholder:"银行预留手机号"},domProps:{value:e.phonecode},on:{input:function(t){t.target.composing||(e.phonecode=t.target.value)}}})]),e._v(" "),i("div",{staticClass:"cov"}),e._v(" "),i("div",{staticClass:"card"},[i("span",[e._v("验证码")]),e._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:e.yzcode,expression:"yzcode"}],staticClass:"number",staticStyle:{"margin-left":".5rem",width:"8rem"},attrs:{id:"phone_code",type:"number",placeholder:"短信验证码"},domProps:{value:e.yzcode},on:{input:function(t){t.target.composing||(e.yzcode=t.target.value)}}}),e._v(" "),i("button",{staticClass:"keyNum",attrs:{disabled:e.disabled},on:{click:function(t){e.settime(this)}}},[e._v(e._s(e.divname))])]),e._v(" "),i("button",{staticClass:"sureBtn",on:{click:function(t){e.commit()}}},[e._v("确认并付款")]),e._v(" "),e.isshowfail?i("div",{staticClass:"tim"},[i("div",{staticStyle:{padding:"1rem 1rem"}},[e._v("\n             "+e._s(e.failReason)+"\n        ")]),e._v(" "),i("div",{staticClass:"coverline"}),e._v(" "),i("div",{staticClass:"surediv"},[i("span",{staticClass:"sure",on:{click:function(t){e.goback()}}},[e._v("取消支付")]),e._v(" "),i("span",{staticClass:"sure",on:{click:function(t){e.godown()}}},[e._v("继续支付")])])]):e._e(),e._v(" "),e.isshowfail?i("div",{staticClass:"cover11"}):e._e(),e._v(" "),e.showAlert?i("alert-tip",{staticStyle:{"z-index":"99999"},attrs:{alertText:e.alertText},on:{closeTip:function(t){e.showAlert=!1}}}):e._e()],1)},staticRenderFns:[]};var l=i("VU/8")(c,d,!1,function(e){i("YfWJ")},"data-v-1a07256e",null);t.default=l.exports}});