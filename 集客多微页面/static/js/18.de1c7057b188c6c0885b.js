webpackJsonp([18],{T5Do:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e("Xxa5"),i=e.n(s),o=e("exGp"),n=e.n(o),r=e("P9l9"),c=e("mw3O"),l=e.n(c),d=e("y/jF"),v=e("qxsu"),p=e("uaSg"),u={data:function(){return{shopid:"",routerPath:"",showLoading:!0,showAlert:!1,alertText:null,orderData:{},pram:{a:"v1/orderDetail",orderId:""}}},created:function(){this.routerPath=p.c,this.pram.orderId=this.$route.query.orderId},mounted:function(){this.initData()},components:{loading:d.a,alertTip:v.a},methods:{initData:function(){var t=this;return n()(i.a.mark(function a(){var e,s;return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:e=t,s=l.a.stringify(e.pram),Object(r.K)(s).then(function(t){console.log("订单详情----"),console.log(t),e.showLoading=!1,"1"==t.code?e.orderData=t.data:(e.showAlert=!0,e.alertText=t.msg)});case 3:case"end":return a.stop()}},a,t)}))()},goOnbuy:function(){this.$router.push({path:this.routerPath+"/index"})}}},h={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"paySuccess_page"},[s("div",{directives:[{name:"title",rawName:"v-title"}],attrs:{"data-title":"订单支付成功"}}),t._v(" "),s("div",{directives:[{name:"stat",rawName:"v-stat",value:{type:"pageview",title:"订单支付成功"},expression:"{type:'pageview', title:'订单支付成功'}"}]}),t._v(" "),s("section",{directives:[{name:"show",rawName:"v-show",value:!t.showLoading,expression:"!showLoading"}]},[s("div",{staticClass:"toptit"},[s("div",{staticClass:"ready"},[t._v("买家已付款")]),t._v(" "),s("div",{staticClass:"chaxun"},[t._v("\n                    您的包裹准备就绪\n                    "),s("router-link",{staticClass:"cx",attrs:{to:{path:t.routerPath+"/order/orderDetail",query:{id:t.orderData.orderId}}}},[t._v("\n                        订单查询\n                    ")]),t._v(" "),s("img",{attrs:{src:e("f/Fb")}})],1)]),t._v(" "),s("span",{staticClass:"coverline"}),t._v(" "),s("div",{staticClass:"toptit1"},[s("div",{staticClass:"ee"},[t._v("实付金额\n                    "),s("div",[t._v(t._s(t.orderData.payAmount?"￥"+t.orderData.payAmount:""))])]),t._v(" "),s("div",{staticClass:"ff"},[t._v("订单号\n                    "),s("div",[t._v(t._s(t.orderData.orderNo))])])]),t._v(" "),s("section",{staticClass:"bottomobrd",staticStyle:{"padding-top":"10px","margin-top":"10px",color:"#333"}},[t._m(0),t._v(" "),s("p",{staticClass:"baoguo"},[s("span",[t._v("收件人")]),s("span",{staticClass:"bent"},[t._v(t._s(t.orderData.name))])]),t._v(" "),s("p",{staticClass:"baoguo"},[s("span",[t._v("联系电话")]),s("span",{staticClass:"bent"},[t._v(t._s(t.orderData.mobile))])]),t._v(" "),s("p",{staticClass:"baoguo"},[s("span",[t._v("收货地址")]),s("span",{staticClass:"bent"},[t._v(t._s(t.orderData.address))])])]),t._v(" "),s("section",{staticClass:"my_address_but"},[s("button",{on:{click:function(a){a.stopPropagation(),a.preventDefault(),t.goOnbuy(a)}}},[t._v("继续购物")])])]),t._v(" "),t.showAlert?s("alert-tip",{attrs:{alertText:t.alertText},on:{closeTip:function(a){t.showAlert=!1}}}):t._e(),t._v(" "),s("transition",{attrs:{name:"loading"}},[s("loading",{directives:[{name:"show",rawName:"v-show",value:t.showLoading,expression:"showLoading"}]})],1)],1)},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("p",{staticClass:"baoguo"},[a("span",{staticStyle:{"font-size":"14px"}},[this._v("收件人信息")])])}]};var g=e("VU/8")(u,h,!1,function(t){e("hcqm")},"data-v-7d0a57a2",null);a.default=g.exports},"f/Fb":function(t,a){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAXCAYAAADQpsWBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQ1MzU4OUQ4MjhCQTExRTg4QTMzQUZCRjVDQ0Y0M0E0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQ1MzU4OUQ5MjhCQTExRTg4QTMzQUZCRjVDQ0Y0M0E0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDUzNTg5RDYyOEJBMTFFODhBMzNBRkJGNUNDRjQzQTQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDUzNTg5RDcyOEJBMTFFODhBMzNBRkJGNUNDRjQzQTQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7y69qbAAAAzUlEQVR42pTUPwrCMBQG8OTpDXTKLo7qHXT1ECI5gHiZhCI4ujq7u1pw8Q56hvhFUvFPk74X+Eha8uO9tqHaObdXSt2RrbU2KMYgZIRskMp7r7loiVyQFRcSWoqtLSQwVlJSSM1CAunzggvp90aC8xKktvKAjxKk3MNm4Gu/DqF8CLBxgOmETJEdsu5ECY4xXZE+MiMGGGI6JFAhNTFAbG2SgI2HmqQg+/ZKoBV1gT/EAV+IC95IAuLoGWNEoKl0lACVvvINOUv+Rk8BBgAjI3616dOh1wAAAABJRU5ErkJggg=="},hcqm:function(t,a){}});