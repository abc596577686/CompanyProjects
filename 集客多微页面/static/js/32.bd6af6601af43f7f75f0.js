webpackJsonp([32],{"3ytd":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("Gu7T"),r=s.n(a),o=s("mvHQ"),i=s.n(o),n=(s("NYxO"),s("3Yky")),c=s("y/jF"),d=s("RMAT"),l=s("qxsu"),u=s("RPyc"),p=s("uaSg"),h=s("P9l9"),g=s("mw3O"),v=s.n(g),_=s("fdFc"),y=s("uYVh"),m=s.n(y),f={data:function(){return{routerPath:"",orderList:[],showAlert:!1,show:!1,showTxt:"",showLoadingToast:!1,loadingText:"",showconfirmText:"确定",porType:1,oprOrderId:"",oprOrder:{},showPayWay:!1,payType:0,alipay:!1,offset:0,preventRepeat:!1,showLoading:!1,orderStatus:0,pageMax:0,nomore:!1,preventRepeatReuqest:!1,showBackStatus:!1,emptyResult:!1,orderPram:{status:"0",pageidx:1,pagesize:100},showCover:!1,ercode:"",orderNoName:"订单号：",listlength:"8",key:1}},created:function(){this.orderStatus=this.$route.query.tab,this.orderPram.status=this.orderStatus,this.routerPath=p.c},mounted:function(){m.a.track("$pageview",{$title:document.title,$url:location.href,$url_path:location.pathname,$referrer_host:location.hostname,$referrer:document.referrer});1!=window.isOrderLoadData||!window.localStorage||window.comeBackorder?(window.isOrderLoadData=!0,this.showLoading=!0,sessionStorage.orderpageidx=1,this.getOrderList()):(this.orderList=JSON.parse(sessionStorage.orderList),this.orderStatus=sessionStorage.orderStatus,this.pageMax=sessionStorage.OrderPageMax,this.orderList.length>0?this.emptyResult=!1:this.emptyResult=!0,this.orderPram.pageidx=sessionStorage.orderpageidx),this.bottom=8},methods:{infinite:function(t){var e=this;console.log("触发下拉");var s=this;if(0!=s.key){this.showLoading=!0;setTimeout(function(){s.orderPram.pagesize=e.bottom+5,e.bottom=s.orderPram.pagesize,e.orderPram.a="v1/orderList";var a=v.a.stringify(e.orderPram);Object(h.K)(a).then(function(t){if(console.log(s.listlength),console.log(t.dataList.length),console.log("订单列表----"),console.log(t),"1"==t.code)if(t.dataList.length!=s.listlength)e.pageMax=t.pageMax,sessionStorage.OrderPageMax=t.pageMax,sessionStorage.orderStatus=e.orderStatus,t.dataList.length?(sessionStorage.OrderEmptyResult=!1,t.dataList.length<e.orderPram.pagesize&&(e.nomore=!0),e.emptyResult=!1,e.orderList=t.dataList,sessionStorage.orderList=i()(t.dataList)):(e.emptyResult=!0,sessionStorage.OrderEmptyResult=!0,sessionStorage.orderList=i()(t.dataList)),s.showLoading=!1,s.listlength=t.dataList.length;else{s.showLoading=!1,window.clearTimeout(a);var a=null;s.key=0}}),t(),window.clearTimeout(r);var r=null},1500)}},goRefundMain:function(t){console.log(t)},showDetail:function(t){6==this.orderPram.status||(this.preventRepeat=!1,this.$router.push({path:this.routerPath+"/order/orderDetail",query:{id:t}}))},getOrderList:function(){var t=this;this.showLoading=!0,this.orderPram.a="v1/orderList";var e=v.a.stringify(this.orderPram);Object(h.K)(e).then(function(e){console.log("订单列表----"),console.log(e),t.showLoading=!1,"1"==e.code&&(t.pageMax=e.pageMax,sessionStorage.OrderPageMax=e.pageMax,sessionStorage.orderStatus=t.orderStatus,e.dataList.length?(sessionStorage.OrderEmptyResult=!1,e.dataList.length<t.orderPram.pagesize&&(t.nomore=!0),t.emptyResult=!1,t.orderList=e.dataList,sessionStorage.orderList=i()(e.dataList)):(t.emptyResult=!0,sessionStorage.OrderEmptyResult=!0,sessionStorage.orderList=i()(e.dataList)))})},backTop:function(){animate(document.body,{scrollTop:"0"},400,"ease-out")},orderStatusChange:function(t){this.nomore=!1,this.emptyResult=!1,this.orderList=[],this.orderStatus=t,this.orderPram.status=t,this.orderPram.pageidx=1,sessionStorage.orderStatus=t,this.orderNoName=6==t?"售后订单：":"订单号：",this.getOrderList()},doOprOrder:function(){this.show=!0,this.isEnter=!0,this.isLeave=!1},loaderMore:function(){var t=this,e=this;if(e.orderPram.pageidx<e.pageMax){if(e.preventRepeatReuqest)return;e.showLoading=!0,e.preventRepeatReuqest=!0,e.orderPram.pageidx=Number(e.orderPram.pageidx)+1,sessionStorage.orderpageidx=e.orderPram.pageidx;var s=v.a.stringify(e.orderPram);Object(h.K)(s).then(function(s){e.showLoading=!1,e.orderList=[].concat(r()(t.orderList),r()(s.orderList)),sessionStorage.orderList=i()(e.orderList),e.preventRepeatReuqest=!1,s.orderList.length<e.orderPram.pagesize&&(e.nomore=!0)}).catch(function(t){e.showLoading=!1,e.preventRepeatReuqest=!1})}else e.nomore=!0},cancelDel:function(){var t=this;clearTimeout(this.timer),this.isEnter=!1,this.isLeave=!0,this.timer=setTimeout(function(){clearTimeout(t.timer),t.show=!1},200)},confirmDel:function(){var t=this;console.log();var e=this;if(1==this.porType){var s=v.a.stringify({orderId:this.oprOrderId});Object(h.e)(s).then(function(s){"1"==s.code?t.getOrderList():(e.showAlert=!0,e.alertText=s.msg)})}else if(2==this.porType){var a=v.a.stringify({orderId:this.oprOrderId});Object(h.m)(a).then(function(s){console.log("删除订单----"),console.log(s),"1"==s.code?t.getOrderList():(e.showAlert=!0,e.alertText=s.msg)})}else if(3==this.porType){var r=v.a.stringify({orderId:this.oprOrderId});Object(h.Q)(r).then(function(s){"1"==s.code?t.getOrderList():(e.showAlert=!0,e.alertText=s.msg)})}clearTimeout(this.timer),this.isEnter=!1,this.isLeave=!0,this.timer=setTimeout(function(){clearTimeout(t.timer),t.show=!1},200)},doPayOrder:function(t){this.oprOrder=t,this.oprOrderId=t.orderId,this.showPayWayFun()},docancelOrder:function(t){this.porType=1,this.oprOrderId=t.orderId,this.showTxt="是否确认取消该订单？",this.showconfirmText="确定",this.doOprOrder()},doSureGet:function(t){this.porType=3,this.oprOrderId=t.orderId,this.showTxt="是否确认该订单收货？",this.showconfirmText="确定",this.doOprOrder()},doDelOrder:function(t){this.porType=2,this.oprOrderId=t.orderId,this.showTxt="是否确认删除该订单？",this.showconfirmText="删除",this.doOprOrder()},goLogistics:function(t){console.log(t),this.$router.push({path:this.routerPath+"/order/logistics",query:{orderId:t.orderId}})},showPayWayFun:function(){this.showPayWay=!this.showPayWay},surePayway:function(t){console.log(t),"1"==t&&(this.alipay=!0),this.payType=0},surePayway1:function(t){console.log(t),"1"==t&&(this.alipay=!0),this.payType=1},showAlipay:function(){this.alipay=!this.alipay,this.alipay?this.payType=1:this.payType=0},submitPay:function(t){var e=this;console.log(t),this.showPayWay=!this.showPayWay;var s=this;s.showLoadingToast=!0,s.loadingText="订单正在提交....";var a={orderId:this.oprOrderId,isWeb:!0};if(1==this.payType)s.$router.push({path:s.routerPath+"/yytOrderDetail",query:{orderId:this.oprOrderId,price:t.payAmount,num:t.orderNo}});else if(0==this.payType){a.payType="weixin";var r=v.a.stringify(a);Object(h.M)(r).then(function(t){if(console.log("订单支付----"),console.log(t),s.showLoadingToast=!1,"1"==t.code){if("1"==t.orderPayInfo.isOther)return s.ercode=t.orderPayInfo.imagePath,void(s.showCover=!0);if(Object(_.e)()&&0==e.payType){var a=function(){WeixinJSBridge.invoke("getBrandWCPayRequest",{appId:t.orderPayInfo.appId,timeStamp:t.orderPayInfo.timeStamp,nonceStr:t.orderPayInfo.nonceStr,package:t.orderPayInfo.package,signType:t.orderPayInfo.signType,paySign:t.orderPayInfo.paySign},function(e){"get_brand_wcpay_request:ok"==e.err_msg?(s.showAlert=!0,s.alertText="订单支付成功！",s.$router.push({path:s.routerPath+"/paySuccess",query:{id:t.orderId}})):"get_brand_wcpay_request:cancel"==res3.err_msg?(s.showAlert=!0,s.alertText="订单支付取消！"):(s.showAlert=!0,s.alertText="订单支付失败！")})};"undefined"==typeof WeixinJSBridge?document.addEventListener?document.addEventListener("WeixinJSBridgeReady",a,!1):document.attachEvent&&(document.attachEvent("WeixinJSBridgeReady",a),document.attachEvent("onWeixinJSBridgeReady",a)):a()}else 1==e.payType?(s.getOrderList(),window.location.href=t.orderPayInfo):(s.showAlert=!0,s.alertText="请在微信浏览器中打开")}else s.showAlert=!0,s.alertText=t.msg})}},closeCover:function(){this.showCover=!1}},components:{headTop:n.a,footGuide:d.a,loading:c.a,alertTip:l.a,loadingToast:u.a},filters:{orderStatusDesc:function(t){switch(t){case"1":return"待付款";case"2":return"待发货";case"3":return"已发货";case"4":return"已完成";case"5":return"退款成功";case"6":return"退款中";case"7":return"买家确认收货"}},orderStatusDesc1:function(t){switch(t){case"1":return"待付款";case"2":return"待发货";case"3":return"已发货";case"4":return"已完成";case"5":return"交易关闭";case"6":return"退款中";case"7":return"买家确认收货"}},refundStatus:function(t){switch(t){case"1":case"7":case"8":case"3":case"4":case"9":return"退款中";case"2":case"6":return"退款失败";case"5":return"退款成功"}}},beforeRouteEnter:function(t,e,s){e.path.indexOf("orderDetail")>=0||e.path.indexOf("logistics")>0?(window.comeBackorder=!1,s()):(window.comeBackorder=!0,s())}},w={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"order_page"},[a("div",{directives:[{name:"title",rawName:"v-title"}],attrs:{"data-title":"订单列表"}}),t._v(" "),a("div",{directives:[{name:"stat",rawName:"v-stat",value:{type:"pageview",title:"订单列表"},expression:"{type:'pageview', title:'订单列表'}"}]}),t._v(" "),a("header",{staticClass:"head_top"},[a("div",{staticClass:"tabber"},[a("span",{class:{active:"0"==t.orderStatus},on:{click:function(e){t.orderStatusChange(0)}}},[t._v("全部")]),t._v(" "),a("span",{class:{active:"1"==t.orderStatus},on:{click:function(e){t.orderStatusChange(1)}}},[t._v("待付款")]),t._v(" "),a("span",{class:{active:"2"==t.orderStatus},on:{click:function(e){t.orderStatusChange(2)}}},[t._v("待发货")]),t._v(" "),a("span",{class:{active:"3"==t.orderStatus},on:{click:function(e){t.orderStatusChange(3)}}},[t._v("已发货")]),t._v(" "),a("span",{class:{active:"4"==t.orderStatus},on:{click:function(e){t.orderStatusChange(4)}}},[t._v("已完成")]),t._v(" "),a("span",{class:{active:"6"==t.orderStatus},on:{click:function(e){t.orderStatusChange(6)}}},[t._v("售后")])])]),t._v(" "),a("div",{staticClass:"order_list_ul"},[t.emptyResult?a("div",{staticClass:"empty-list list-finished",staticStyle:{"padding-top":"60px"}},[t._m(0),t._v(" "),a("div",[a("router-link",{staticClass:"tag tag-big tag-orange",staticStyle:{padding:"8px 30px"},attrs:{to:{path:t.routerPath+"/index"}}},[t._v("去逛逛")])],1)]):t._e(),t._v(" "),t.emptyResult?t._e():a("ul",{staticStyle:{"margin-bottom":"2.5rem"}},t._l(t.orderList,function(e){return a("li",{key:e.orderId,staticClass:"block block-order animated"},[a("div",{staticClass:"header"},[a("span",{staticStyle:{margin:"0 10px 0 0",color:"#999","font-size":"12px"}},[t._v(t._s(e.storeName))]),t._v(" "),a("span",{staticStyle:{color:"#999","font-size":"12px","margin-left":"-10px"}},[t._v(t._s(t.orderNoName+e.orderNo))]),t._v(" "),6!=t.orderStatus?a("span",{staticClass:"orange-color order_status"},[t._v(t._s(t._f("orderStatusDesc1")(e.status)))]):t._e(),t._v(" "),6==t.orderStatus?a("span",{staticClass:"orange-color order_status"},[t._v(t._s(t._f("refundStatus")(e.status)))]):t._e()]),t._v(" "),t._l(e.productList,function(s){return a("section",{staticClass:"order-content",staticStyle:{display:"block"},on:{click:function(s){t.showDetail(e.orderId)}}},[a("div",{staticClass:"block block-list block-border-top-none block-border-bottom-none"},[a("div",{staticClass:"block-item name-card name-card-3col clearfix"},[a("div",{staticStyle:{width:"58px",float:"left"}},[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:s.imageUrl,expression:"product.imageUrl"}],staticStyle:{width:"2.9rem",height:"2.9rem"}}),t._v(" "),a("img",{directives:[{name:"show",rawName:"v-show",value:"1"==s.isSoldout,expression:"product.isSoldout=='1'"}],staticStyle:{position:"absolute",top:"0.34rem",width:"2.9rem",height:"2.9rem"},attrs:{src:" ../../common/images/icon_qiangguang.png"}})]),t._v(" "),a("div",{staticClass:"detail"},[a("p",{staticStyle:{"margin-bottom":"6px","font-size":"14px"}},[t._v(t._s(s.productName))])]),t._v(" "),a("div",{staticClass:"right-col"},[a("div",{staticClass:"price font_size_13",staticStyle:{color:"#545454"}},[a("span",[t._v(t._s(s.price?"￥"+s.price:""))])]),t._v(" "),a("div",{staticClass:"num font_size_12"},[t._v("×"),a("span",{staticClass:"num-txt"},[t._v(t._s(s.productNumber))])]),t._v(" "),6!=t.orderStatus?a("div",[a("span",{staticClass:"orange-color order_status"},[t._v(t._s(t._f("refundStatus")(s.refundStatus)))])]):t._e()]),t._v(" "),a("div",{staticClass:"proTag"},[t._v(t._s(s.productTags))])])])])}),t._v(" "),6!=t.orderStatus?a("div",{staticClass:"bottom",staticStyle:{width:"100%",float:"right"}},[a("div",{staticClass:"clearfix",staticStyle:{float:"right"}},[a("span",{staticClass:"font_size_11 font_color_black_3"},[t._v("共"+t._s(e.totalNumber)+"件  合计")]),a("span",{staticClass:"dark_gray font_size_13 font_color_black_2"},[t._v("￥"+t._s(e.payAmount))]),t._v("   "),a("span",{staticClass:"font_size_11 font_color_black_2"},[t._v("(含快递￥"+t._s(e.postage)+")")])])]):t._e(),t._v(" "),6==t.orderStatus?a("div",{staticClass:"bottom",staticStyle:{width:"100%",float:"right"}},[a("div",{staticClass:"clearfix",staticStyle:{float:"right"}},[a("span",{staticClass:"font_size_11 font_color_black_3"},[a("span",{staticStyle:{"font-size":".469333rem",color:"#666666"}},[t._v("退款金额：")]),a("span",{staticStyle:{"font-size":".469333rem",color:"#FB4A4C"}},[t._v(t._s(e.payAmount?"￥"+e.payAmount:""))])])])]):t._e(),t._v(" "),a("div",{staticClass:"clearfix",staticStyle:{width:"100%",float:"right"}},[1==e.status&&6!=t.orderStatus?a("p",{staticClass:"orange-color js-delete-order font-size-12 btn-payment bordercolor1",staticStyle:{float:"right"},on:{click:function(s){t.doPayOrder(e)}}},[t._v("付款")]):t._e(),t._v(" "),1==e.status&&6!=t.orderStatus?a("p",{staticClass:"orange-color js-delete-order font-size-12 btn-payment bordercolor2",staticStyle:{float:"right"},on:{click:function(s){t.docancelOrder(e)}}},[t._v("取消订单")]):t._e(),t._v(" "),3==e.status&&6!=t.orderStatus?a("p",{staticClass:"orange-color js-delete-order font-size-12 btn-payment bordercolor1",staticStyle:{float:"right"},on:{click:function(s){t.doSureGet(e)}}},[t._v("确认收货")]):t._e(),t._v(" "),3==e.status&&6!=t.orderStatus?a("p",{staticClass:"orange-color js-delete-order font-size-12 btn-payment bordercolor1",staticStyle:{float:"right"},on:{click:function(s){t.goLogistics(e)}}},[t._v("查看物流")]):t._e(),t._v(" "),4==e.status&&6!=t.orderStatus?a("p",{staticClass:"orange-color js-delete-order font-size-12 btn-payment bordercolor1",staticStyle:{float:"right"},on:{click:function(s){t.goLogistics(e)}}},[t._v("查看物流")]):t._e(),t._v(" "),5==e.status&&6!=t.orderStatus?a("p",{staticClass:"orange-color js-delete-order font-size-12 btn-payment bordercolor2",staticStyle:{float:"right"},on:{click:function(s){t.doDelOrder(e)}}},[t._v("删除订单")]):t._e(),t._v(" "),6==t.orderStatus?a("router-link",{staticClass:"orange-color js-delete-order font-size-12 btn-payment bordercolor2",staticStyle:{float:"right"},attrs:{to:{path:t.routerPath+"/refundDetail",query:{itemId:e.orderId}}}},[t._v("查看详情")]):t._e()],1)],2)}))]),t._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:t.nomore,expression:"nomore"}],staticClass:"empty_data"},[t._v("没有更多了")]),t._v(" "),t.showBackStatus?a("aside",{staticClass:"return_top",on:{click:t.backTop}},[a("svg",{staticClass:"back_top_svg"},[a("use",{attrs:{"xmlns:xlink":"http://www.w3.org/1999/xlink","xlink:href":"#backtop"}})])]):t._e(),t._v(" "),a("footer",{directives:[{name:"show",rawName:"v-show",value:t.preventRepeatReuqest,expression:"preventRepeatReuqest"}],staticClass:"loader_more"},[t._v("正在加载更多商品...")]),t._v(" "),a("div",{ref:"abc",staticStyle:{"background-color":"red"}}),t._v(" "),t.show?a("section",{staticClass:"coverpart"},[a("section",{staticClass:"cover-background"}),t._v(" "),a("section",{staticClass:"cover-content ",class:{"cover-animate":t.isEnter,"cover-animate-leave":t.isLeave}},[a("h2",[t._v(t._s(t.showTxt))]),t._v(" "),a("div",{staticClass:"sa-botton"},[a("button",{staticClass:"waiting",on:{click:t.cancelDel}},[t._v("取消")]),t._v(" "),a("div",{staticStyle:{display:"inline-block"}},[a("button",{staticClass:"quitlogin",on:{click:t.confirmDel}},[t._v(t._s(t.showconfirmText))])])])])]):t._e(),t._v(" "),a("transition",{attrs:{name:"fade"}},[t.showPayWay?a("div",{staticClass:"cover",on:{click:t.showPayWayFun}}):t._e()]),t._v(" "),a("transition",{attrs:{name:"slid_up"}},[t.showPayWay?a("div",{staticClass:"choose_type_Container"},[t.showPayWay?a("div",{staticClass:"choose_type_Container"},[a("div",{staticClass:"pay_msg1"},[a("span",[t._v("请选择支付方式")]),t._v(" "),a("img",{attrs:{src:s("m1y0")},on:{click:t.showPayWayFun}})]),t._v(" "),a("div",{staticClass:"pay_msg pay_msg2"},[a("span",{staticClass:"order_time_msg"},[t._v("请在72小时内完成支付")]),t._v(" "),a("span",{staticClass:"order_money"},[t._v("¥"+t._s(t.oprOrder.payAmount))])]),t._v(" "),a("div",{staticClass:"pay_msg pay_msg5",staticStyle:{display:"block"}},[a("img",{staticClass:"pay_icon",attrs:{src:s("EKD7")}}),t._v(" "),a("span",{staticClass:"pay_text"},[t._v("微信支付（推荐）")]),t._v(" "),0==t.payType?a("img",{staticClass:"pay_select_icon",attrs:{src:s("1myp")},on:{click:function(e){t.surePayway(1)}}}):t._e(),t._v(" "),0!=t.payType?a("img",{staticClass:"pay_select_icon",attrs:{src:s("Y+SM")},on:{click:function(e){t.surePayway(0)}}}):t._e()]),t._v(" "),a("div",{staticClass:"pay_msg pay_msg5"},[a("img",{staticClass:"pay_icon",attrs:{src:s("yFJN")}}),t._v(" "),a("span",{staticClass:"pay_text"},[t._v("美付宝快捷支付")]),t._v(" "),1==t.payType?a("img",{staticClass:"pay_select_icon",attrs:{src:s("1myp")},on:{click:function(e){t.surePayway1(0)}}}):t._e(),t._v(" "),1!=t.payType?a("img",{staticClass:"pay_select_icon",attrs:{src:s("Y+SM")},on:{click:function(e){t.surePayway1(1)}}}):t._e()]),t._v(" "),a("div",{staticClass:"pay_msg6"},[a("div",{staticClass:"pay_button",on:{click:function(e){e.stopPropagation(),t.submitPay(t.oprOrder)}}},[t._v("确认支付")])])]):t._e()]):t._e()]),t._v(" "),t.showLoadingToast?a("loading-toast",{attrs:{loadingText:t.loadingText},on:{closeTip:function(e){t.showLoadingToast=!1}}}):t._e(),t._v(" "),t.showAlert?a("alert-tip",{attrs:{alertText:t.alertText},on:{closeTip:function(e){t.showAlert=!1}}}):t._e(),t._v(" "),a("transition",{attrs:{name:"loading"}},[a("loading",{directives:[{name:"show",rawName:"v-show",value:t.showLoading,expression:"showLoading"}]})],1),t._v(" "),a("transition",{attrs:{name:"router-slid",mode:"out-in"}},[a("router-view")],1),t._v(" "),t.showCover?a("div",{staticClass:"cover22",on:{click:function(e){if(e.target!==e.currentTarget)return null;t.closeCover(e)}}},[a("div",[a("img",{staticClass:"ercode",attrs:{src:t.ercode}})])]):t._e()],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("p",{staticClass:"noorder"},[this._v("居然还没有订单")]),this._v(" "),e("p",{staticClass:"font-size-12"},[this._v("好东西，手慢无")])])}]};var S=s("VU/8")(f,w,!1,function(t){s("jjdB")},"data-v-1d084970",null);e.default=S.exports},jjdB:function(t,e){}});