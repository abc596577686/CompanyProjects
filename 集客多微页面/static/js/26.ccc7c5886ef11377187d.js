webpackJsonp([26],{dVRq:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=e("mvHQ"),r=e.n(a),i=e("Gu7T"),o=e.n(i),c=e("fdFc"),n=e("y/jF"),h=e("RMAT"),u=e("P9l9"),l=e("uaSg"),p=e("mw3O"),d=e.n(p),g={data:function(){return{routerPath:"",searchHistory:[],showHistory:!1,searchValue:"",emptyResult:!1,pageMax:0,productListArr:[],preventRepeatReuqest:!1,showBackStatus:!1,showLoading:!1,nomore:!1,pram:{categId:"",pagesize:20,pageidx:1,keyword:"",status:"",couponId:""},storeName:sessionStorage.storeName}},created:function(){this.routerPath=l.c,this.pram.couponId=this.$route.query.couponId},mounted:function(){var t=this;Object(c.d)("searchHistory")&&(this.searchHistory=JSON.parse(Object(c.d)("searchHistory"))),""!=this.pram.couponId&&this.getData(),""!=sessionStorage.serchVaule&&(this.pram.keyword=sessionStorage.serchVaule,this.searchValue=sessionStorage.serchVaule,1==window.isPSearchLoadData&&window.localStorage?(this.pageMax=sessionStorage.searchPPageMax,this.productListArr=JSON.parse(sessionStorage.searchPRestaurantList),this.pram.pageidx=sessionStorage.pdgpageidx):(window.isPSearchLoadData=!0,sessionStorage.pdgpageidx=1,this.getData())),Object(c.i)(function(s){t.showBackStatus=s})},components:{footGuide:h.a,loading:n.a},methods:{loaderMore:function(){var t=this,s=this;if(s.pram.pageidx<s.pageMax){if(s.preventRepeatReuqest)return;s.showLoading=!0,s.preventRepeatReuqest=!0,s.pram.pageidx=Number(s.pram.pageidx)+1,sessionStorage.pdgpageidx=s.pram.pageidx;var e=d.a.stringify(s.pram);Object(u.D)(e).then(function(e){s.showLoading=!1,s.productListArr=[].concat(o()(t.productListArr),o()(e.goods)),sessionStorage.searchPRestaurantList=r()(s.productListArr),s.preventRepeatReuqest=!1,e.goods.length}).catch(function(t){s.showLoading=!1,s.preventRepeatReuqest=!1})}else this.nomore=!0},deleteHistory:function(t){this.searchHistory.splice(t,1),Object(c.h)("searchHistory",this.searchHistory)},clearAllHistory:function(){this.searchHistory=[],Object(c.h)("searchHistory",this.searchHistory)},backTop:function(){Object(c.b)(document.body,{scrollTop:"0"},400,"ease-out")},getData:function(){var t=this;this.searchValue.length&&(this.showHistory=!1),this.productListArr=[],this.showLoading=!0,this.pram.keyword=this.searchValue,sessionStorage.serchVaule=this.pram.keyword,this.pram.a="v1/distributionProductList",console.log(this.pram);var s=d.a.stringify(this.pram);Object(u.D)(s).then(function(s){console.log("搜索结果----"),console.log(s),t.showLoading=!1,"1"==s.code&&(0==s.dataList.length?(t.emptyResult=!0,sessionStorage.searchPEmptyResult=!0):(t.emptyResult=!1,t.productListArr=s.dataList,sessionStorage.searchPEmptyResult=!1,sessionStorage.searchPRestaurantList=r()(s.dataList)))}).catch(function(t){})},checkInput:function(t){""===this.searchValue&&(this.showHistory=!1,this.emptyResult=!1),13==t.keyCode&&this.searchTarget()},searchTarget:function(t){var s=this;t?(this.searchValue=t,this.pram.keyword=this.searchValue):this.pram.keyword=this.searchValue,this.showHistory=!1,this.getData();var e=Object(c.d)("searchHistory");if(e){var a=!1;this.searchHistory=JSON.parse(e),this.searchHistory.forEach(function(t){t==s.searchValue&&(a=!0)}),a||""!=this.searchValue&&""!=Object(c.j)(this.searchValue)&&this.searchHistory.push(this.searchValue)}else""!=this.searchValue&&""!=Object(c.j)(this.searchValue)&&this.searchHistory.push(this.searchValue);Object(c.h)("searchHistory",this.searchHistory)}}},v={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("div",{directives:[{name:"title",rawName:"v-title"}],attrs:{"data-title":"商品搜索"}}),t._v(" "),e("div",{staticClass:"search_form"},[e("button",{staticClass:"custom-search-button",attrs:{type:"submit"}}),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.searchValue,expression:"searchValue"}],staticClass:"search_input",attrs:{type:"text",placeholder:"请输入商品关键字"},domProps:{value:t.searchValue},on:{focus:function(s){t.showHistory=!1},keyup:function(s){t.checkInput(s)},input:function(s){s.target.composing||(t.searchValue=s.target.value)}}}),t._v(" "),e("button",{staticStyle:{width:"2.3rem","margin-left":"0.6rem","border-radius":"0.2rem",border:"none",background:"#fff"},attrs:{type:"text"},on:{click:function(s){s.stopPropagation(),s.preventDefault(),t.searchTarget()}}},[t._v("搜索")])]),t._v(" "),0!=t.productListArr.length?e("section",[e("div",{staticClass:"double"},t._l(t.productListArr,function(s){return e("div",{key:s.productId,staticClass:"items"},[e("router-link",{attrs:{to:{path:t.routerPath+"/productDetail",query:{productId:s.productId}}}},[e("div",{staticClass:"placeholder"},[e("div",{staticClass:"imgWrap"},[e("img",{attrs:{src:s.imageUrl}})]),t._v(" "),e("p",{staticClass:"mc"},[1==s.isSeckillProduct?e("span",{staticClass:"seckillTip"},[t._v("限时购")]):t._e(),t._v("\n                                "+t._s(s.productName))]),t._v(" "),e("p",{staticClass:"price"},[t._v("￥"+t._s(s.price))])])])],1)}))]):t._e(),t._v(" "),e("p",{directives:[{name:"show",rawName:"v-show",value:t.nomore,expression:"nomore"}],staticClass:"empty_data"},[t._v("没有更多了")]),t._v(" "),t.showBackStatus?e("aside",{staticClass:"return_top",on:{click:t.backTop}},[e("svg",{staticClass:"back_top_svg"},[e("use",{attrs:{"xmlns:xlink":"http://www.w3.org/1999/xlink","xlink:href":"#backtop"}})])]):t._e(),t._v(" "),t.searchHistory.length&&t.showHistory?e("section",{staticClass:"search_history"},[e("h4",{staticClass:"title_restaurant"},[t._v("搜索历史")]),t._v(" "),e("ul",t._l(t.searchHistory,function(s,a){return e("li",{key:a,staticClass:"history_list"},[e("span",{staticClass:"history_text ellipsis",on:{click:function(e){e.preventDefault(),t.searchTarget(s)}}},[t._v(t._s(s))]),t._v(" "),e("svg",{staticClass:"delete_icon",attrs:{xmlns:"http://www.w3.org/2000/svg",version:"1.1"},on:{click:function(s){t.deleteHistory(a)}}},[e("line",{staticStyle:{stroke:"#999","stroke-width":"3"},attrs:{x1:"8",y1:"8",x2:"18",y2:"18"}}),t._v(" "),e("line",{staticStyle:{stroke:"#999","stroke-width":"3"},attrs:{x1:"18",y1:"8",x2:"8",y2:"18"}})])])})),t._v(" "),e("footer",{staticClass:"clear_history",on:{click:t.clearAllHistory}},[t._v("清空搜索历史")])]):t._e(),t._v(" "),e("footer",{directives:[{name:"show",rawName:"v-show",value:t.preventRepeatReuqest,expression:"preventRepeatReuqest"}],staticClass:"loader_more"},[t._v("正在加载更多商品...")]),t._v(" "),e("div",{ref:"abc",staticStyle:{"background-color":"red"}}),t._v(" "),e("transition",{attrs:{name:"loading"}},[e("loading",{directives:[{name:"show",rawName:"v-show",value:t.showLoading,expression:"showLoading"}]})],1),t._v(" "),t.emptyResult?e("div",{staticClass:"search_none"},[t._v("很抱歉！无搜索结果")]):t._e()],1)},staticRenderFns:[]};var m=e("VU/8")(g,v,!1,function(t){e("s/A9")},"data-v-68455f58",null);s.default=m.exports},"s/A9":function(t,s){}});