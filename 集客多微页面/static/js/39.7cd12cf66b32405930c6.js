webpackJsonp([39],{"2tqb":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("Gu7T"),o=a.n(s),r=a("mvHQ"),i=a.n(r),n=a("Xxa5"),c=a.n(n),p=a("exGp"),d=a.n(p),u=a("P9l9"),l=a("mw3O"),g=a.n(l),h=a("fdFc"),m=a("y/jF"),v=a("qxsu"),w=a("uaSg"),f={data:function(){return{routerPath:"",shopid:"",showAlert:!1,alertText:"加入购物车成功！",restaurantList:[],emptyResult:!1,pageMax:0,preventRepeatReuqest:!1,showBackStatus:!1,showLoading:!1,nomore:!1,groupName:"",showProductName:"",showPrice:"",showBuyBnt:"",addcartpram:{productId:"",num:1,isFromCartList:!1},pram:{groupId:"",pagesize:20,pageidx:1},storeName:sessionStorage.storeName}},created:function(){this.shopid=this.$route.query.shopid,this.routerPath=w.c},mounted:function(){var t=this,e=this;e.pram.groupId=this.$route.query.id,1==window.isProductLoadData&&window.localStorage?(e.pageMax=sessionStorage.pdgPageMax,e.showProductName=sessionStorage.pdgshowProductName,e.showPrice=sessionStorage.pdgshowPrice,e.showBuyBnt=sessionStorage.pdgshowBuyBnt,e.groupName=sessionStorage.pdggroupName,e.emptyResult=sessionStorage.pdgemptyResult,e.restaurantList=JSON.parse(sessionStorage.pdgrestaurantList)):(window.isProductLoadData=!0,e.initData()),Object(h.i)(function(e){t.showBackStatus=e})},components:{loading:m.a,alertTip:v.a},methods:{initData:function(){var t=this;return d()(c.a.mark(function e(){return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.getData();case 2:case"end":return e.stop()}},e,t)}))()},getData:function(){var t=this;t.productListArr=[],t.showLoading=!0;var e=g.a.stringify(t.pram);Object(u.O)(e).then(function(e){t.showLoading=!1,t.pageMax=e.pageMax,t.showProductName=e.data.show_title,t.showPrice=e.data.price,t.showBuyBnt=e.data.buy_btn,t.groupName=e.data.groupName,sessionStorage.pdgPageMax=e.pageMax,sessionStorage.pdgshowProductName=e.data.show_title,sessionStorage.pdgshowPrice=e.data.price,sessionStorage.pdgshowBuyBnt=e.data.buy_btn,sessionStorage.pdggroupName=e.data.groupName,0==e.data.productList.length?(t.emptyResult=!0,sessionStorage.pdgemptyResult=!0):(t.emptyResult=!1,t.restaurantList=e.data.productList,sessionStorage.pdgemptyResult=!1,sessionStorage.pdgrestaurantList=i()(e.data.productList))}).catch(function(e){t.showLoading=!1})},loaderMore:function(){var t=this;return d()(c.a.mark(function e(){var a,s;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!((a=t).pram.pageidx<a.pageMax)){e.next=11;break}if(!a.preventRepeatReuqest){e.next=4;break}return e.abrupt("return");case 4:a.showLoading=!0,a.preventRepeatReuqest=!0,a.pram.pageidx=Number(a.pram.pageidx)+1,s=g.a.stringify(a.pram),Object(u.O)(s).then(function(e){a.showLoading=!1,a.restaurantList=[].concat(o()(t.restaurantList),o()(e.data.productList)),a.preventRepeatReuqest=!1,e.data.productList.lenght}).catch(function(t){a.showLoading=!1,a.preventRepeatReuqest=!1}),e.next=12;break;case 11:a.nomore=!0;case 12:case"end":return e.stop()}},e,t)}))()},backTop:function(){Object(h.b)(document.body,{scrollTop:"0"},400,"ease-out")},addcart:function(t){var e=this;this.addcartpram.productId=t;var a=g.a.stringify(this.addcartpram);Object(u.a)(a).then(function(t){"1"==t.code?e.showAlert=!0:(e.showAlert=!0,e.alertText=t.msg)})}}},_={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{directives:[{name:"title",rawName:"v-title"}],attrs:{"data-title":"商品"}}),t._v(" "),a("div",{directives:[{name:"stat",rawName:"v-stat",value:{type:"pageview",title:"组合商品"},expression:"{type:'pageview', title:'组合商品'}"}]}),t._v(" "),a("header",{staticClass:"head_top"},[a("p",{staticStyle:{"line-height":"2.133rem","font-size":"0.68rem",color:"#333","text-align":"center"}},[t._v(t._s(t.groupName))])]),t._v(" "),a("section",{staticStyle:{"margin-top":"0.3rem"}},t._l(t.restaurantList,function(e){return a("li",{staticClass:"goods-card goods-list small-pic card"},[a("router-link",{staticClass:"js-goods link clearfix",attrs:{to:{path:t.routerPath+"/productDetail",query:{shopid:t.shopid,productid:e.productId}}}},[a("span",{staticClass:"photo-block"},[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.imageUrl,expression:"item.imageUrl"}],staticClass:"goods-photo js-goods-lazy",staticStyle:{display:"inline"}})]),t._v(" "),a("span",{staticClass:"info clearfix info-title"},["1"==t.showProductName?a("span",{staticClass:"goods-title"},[t._v(t._s(e.productName))]):t._e(),t._v(" "),a("span",{staticClass:"goods-price display-block min-height-price"},["1"==t.showPrice?a("span",[t._v("￥"+t._s(e.price))]):t._e()]),t._v(" "),a("span",{staticClass:"goods-price-taobao hide"})]),t._v(" "),a("div",["1"==t.showBuyBnt?a("span",{staticClass:"goods-buy btn1 info-no-title",on:{click:function(a){a.stopPropagation(),a.preventDefault(),t.addcart(e.productId)}}}):t._e()])])],1)})),t._v(" "),t.showBackStatus?a("aside",{staticClass:"return_top",on:{click:t.backTop}},[a("svg",{staticClass:"back_top_svg"},[a("use",{attrs:{"xmlns:xlink":"http://www.w3.org/1999/xlink","xlink:href":"#backtop"}})])]):t._e(),t._v(" "),a("footer",{directives:[{name:"show",rawName:"v-show",value:t.preventRepeatReuqest,expression:"preventRepeatReuqest"}],staticClass:"loader_more"},[t._v("正在加载更多商品...")]),t._v(" "),a("div",{ref:"abc",staticStyle:{"background-color":"red"}}),t._v(" "),a("transition",{attrs:{name:"loading"}},[a("loading",{directives:[{name:"show",rawName:"v-show",value:t.showLoading,expression:"showLoading"}]})],1),t._v(" "),t.showAlert?a("alert-tip",{attrs:{alertText:t.alertText},on:{closeTip:function(e){t.showAlert=!1}}}):t._e(),t._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:t.emptyResult,expression:"emptyResult"}],staticClass:"empty_data"},[t._v("没有查询到相关数据")])],1)},staticRenderFns:[]};var y=a("VU/8")(f,_,!1,function(t){a("3rGS")},"data-v-02866c33",null);e.default=y.exports},"3rGS":function(t,e){}});