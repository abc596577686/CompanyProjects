webpackJsonp([27],{dVRq:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("mvHQ"),r=s.n(a),i=s("Gu7T"),o=s.n(i),c=s("fdFc"),n=s("y/jF"),h=s("RMAT"),u=s("P9l9"),l=s("uaSg"),d=s("mw3O"),p=s.n(d),v=s("uYVh"),g=s.n(v),m={data:function(){return{routerPath:"",searchHistory:[],showHistory:!1,searchValue:"",emptyResult:!1,pageMax:0,productListArr:[],preventRepeatReuqest:!1,showBackStatus:!1,showLoading:!1,nomore:!1,pram:{categId:"",pagesize:20,pageidx:1,keyword:"",status:"",couponId:""},storeName:sessionStorage.storeName}},created:function(){this.routerPath=l.c,this.pram.couponId=this.$route.query.couponId},mounted:function(){var t=this;Object(c.d)("searchHistory")&&(this.searchHistory=JSON.parse(Object(c.d)("searchHistory"))),""!=this.pram.couponId&&this.getData(),""!=sessionStorage.serchVaule&&(this.pram.keyword=sessionStorage.serchVaule,this.searchValue=sessionStorage.serchVaule,1==window.isPSearchLoadData&&window.localStorage?(this.pageMax=sessionStorage.searchPPageMax,this.productListArr=JSON.parse(sessionStorage.searchPRestaurantList),this.pram.pageidx=sessionStorage.pdgpageidx):(window.isPSearchLoadData=!0,sessionStorage.pdgpageidx=1,this.getData())),Object(c.i)(function(e){t.showBackStatus=e})},components:{footGuide:h.a,loading:n.a},methods:{loaderMore:function(){var t=this,e=this;if(e.pram.pageidx<e.pageMax){if(e.preventRepeatReuqest)return;e.showLoading=!0,e.preventRepeatReuqest=!0,e.pram.pageidx=Number(e.pram.pageidx)+1,sessionStorage.pdgpageidx=e.pram.pageidx;var s=p.a.stringify(e.pram);Object(u.F)(s).then(function(s){e.showLoading=!1,e.productListArr=[].concat(o()(t.productListArr),o()(s.goods)),sessionStorage.searchPRestaurantList=r()(e.productListArr),e.preventRepeatReuqest=!1,s.goods.length}).catch(function(t){e.showLoading=!1,e.preventRepeatReuqest=!1})}else this.nomore=!0},deleteHistory:function(t){this.searchHistory.splice(t,1),Object(c.h)("searchHistory",this.searchHistory)},clearAllHistory:function(){this.searchHistory=[],Object(c.h)("searchHistory",this.searchHistory)},backTop:function(){Object(c.b)(document.body,{scrollTop:"0"},400,"ease-out")},getData:function(){var t=this;this.searchValue.length&&(this.showHistory=!1),this.productListArr=[],this.showLoading=!0,this.pram.keyword=this.searchValue,sessionStorage.serchVaule=this.pram.keyword,this.pram.a="v1/distributionProductList",console.log(this.pram);var e=p.a.stringify(this.pram);Object(u.F)(e).then(function(e){console.log("搜索结果----"),console.log(e),t.showLoading=!1,"1"==e.code?(g.a.track("search",{keyWord:t.searchValue,hasResult:!0,isHistory:!1,isRecommend:!1}),0==e.dataList.length?(t.emptyResult=!0,sessionStorage.searchPEmptyResult=!0):(t.emptyResult=!1,t.productListArr=e.dataList,sessionStorage.searchPEmptyResult=!1,sessionStorage.searchPRestaurantList=r()(e.dataList))):g.a.track("search",{keyWord:t.searchValue,hasResult:!1,isHistory:!1,isRecommend:!1})}).catch(function(t){})},checkInput:function(t){""===this.searchValue&&(this.showHistory=!1,this.emptyResult=!1),13==t.keyCode&&this.searchTarget()},searchTarget:function(t){var e=this;t?(this.searchValue=t,this.pram.keyword=this.searchValue):this.pram.keyword=this.searchValue,this.showHistory=!1,this.getData();var s=Object(c.d)("searchHistory");if(s){var a=!1;this.searchHistory=JSON.parse(s),this.searchHistory.forEach(function(t){t==e.searchValue&&(a=!0)}),a||""!=this.searchValue&&""!=Object(c.j)(this.searchValue)&&this.searchHistory.push(this.searchValue)}else""!=this.searchValue&&""!=Object(c.j)(this.searchValue)&&this.searchHistory.push(this.searchValue);Object(c.h)("searchHistory",this.searchHistory)}}},y={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{directives:[{name:"title",rawName:"v-title"}],attrs:{"data-title":"商品搜索"}}),t._v(" "),s("div",{directives:[{name:"stat",rawName:"v-stat",value:{type:"pageview",title:"商品搜索"},expression:"{type:'pageview', title:'商品搜索'}"}]}),t._v(" "),s("div",{staticClass:"search_form"},[s("button",{staticClass:"custom-search-button",attrs:{type:"submit"}}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.searchValue,expression:"searchValue"}],staticClass:"search_input",attrs:{type:"text",placeholder:"请输入商品关键字"},domProps:{value:t.searchValue},on:{focus:function(e){t.showHistory=!1},keyup:function(e){t.checkInput(e)},input:function(e){e.target.composing||(t.searchValue=e.target.value)}}}),t._v(" "),s("button",{staticStyle:{width:"2.3rem","margin-left":"0.6rem","border-radius":"0.2rem",border:"none",background:"#fff"},attrs:{type:"text"},on:{click:function(e){e.stopPropagation(),e.preventDefault(),t.searchTarget()}}},[t._v("搜索")])]),t._v(" "),0!=t.productListArr.length?s("section",[s("div",{staticClass:"double"},t._l(t.productListArr,function(e){return s("div",{key:e.productId,staticClass:"items"},[s("router-link",{attrs:{to:{path:t.routerPath+"/productDetail",query:{productId:e.productId}}}},[s("div",{staticClass:"placeholder"},[s("div",{staticClass:"imgWrap"},[s("img",{attrs:{src:e.imageUrl}})]),t._v(" "),s("p",{staticClass:"mc"},[1==e.isSeckillProduct?s("span",{staticClass:"seckillTip"},[t._v("限时购")]):t._e(),t._v("\n                                "+t._s(e.productName))]),t._v(" "),s("p",{staticClass:"price"},[t._v("￥"+t._s(e.price))])])])],1)}))]):t._e(),t._v(" "),s("p",{directives:[{name:"show",rawName:"v-show",value:t.nomore,expression:"nomore"}],staticClass:"empty_data"},[t._v("没有更多了")]),t._v(" "),t.showBackStatus?s("aside",{staticClass:"return_top",on:{click:t.backTop}},[s("svg",{staticClass:"back_top_svg"},[s("use",{attrs:{"xmlns:xlink":"http://www.w3.org/1999/xlink","xlink:href":"#backtop"}})])]):t._e(),t._v(" "),t.searchHistory.length&&t.showHistory?s("section",{staticClass:"search_history"},[s("h4",{staticClass:"title_restaurant"},[t._v("搜索历史")]),t._v(" "),s("ul",t._l(t.searchHistory,function(e,a){return s("li",{key:a,staticClass:"history_list"},[s("span",{staticClass:"history_text ellipsis",on:{click:function(s){s.preventDefault(),t.searchTarget(e)}}},[t._v(t._s(e))]),t._v(" "),s("svg",{staticClass:"delete_icon",attrs:{xmlns:"http://www.w3.org/2000/svg",version:"1.1"},on:{click:function(e){t.deleteHistory(a)}}},[s("line",{staticStyle:{stroke:"#999","stroke-width":"3"},attrs:{x1:"8",y1:"8",x2:"18",y2:"18"}}),t._v(" "),s("line",{staticStyle:{stroke:"#999","stroke-width":"3"},attrs:{x1:"18",y1:"8",x2:"8",y2:"18"}})])])})),t._v(" "),s("footer",{staticClass:"clear_history",on:{click:t.clearAllHistory}},[t._v("清空搜索历史")])]):t._e(),t._v(" "),s("footer",{directives:[{name:"show",rawName:"v-show",value:t.preventRepeatReuqest,expression:"preventRepeatReuqest"}],staticClass:"loader_more"},[t._v("正在加载更多商品...")]),t._v(" "),s("div",{ref:"abc",staticStyle:{"background-color":"red"}}),t._v(" "),s("transition",{attrs:{name:"loading"}},[s("loading",{directives:[{name:"show",rawName:"v-show",value:t.showLoading,expression:"showLoading"}]})],1),t._v(" "),t.emptyResult?s("div",{staticClass:"search_none"},[t._v("很抱歉！无搜索结果")]):t._e()],1)},staticRenderFns:[]};var w=s("VU/8")(m,y,!1,function(t){s("oGda")},"data-v-519b22bc",null);e.default=w.exports},oGda:function(t,e){}});