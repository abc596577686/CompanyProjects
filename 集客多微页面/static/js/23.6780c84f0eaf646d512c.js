webpackJsonp([23],{Szyb:function(t,e){},oiG6:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("mvHQ"),o=s.n(a),i=s("fdFc"),r=s("P9l9"),n=s("y/jF"),c=s("RMAT"),l=s("uaSg"),d=s("mw3O"),u=s.n(d),p={data:function(){return{routerPath:"",storeName:sessionStorage.storeName,searchValue:"",channelList:[],curIndex:0,emptyResult:!1,pageMax:0,productListArr:[],preventRepeatReuqest:!1,showBackStatus:!1,showLoading:!1,nomore:!1,pram:{firstCategoryId:"",pagesize:200,pageidx:1,keyword:"",status:1}}},created:function(){this.$route.query.channelId,this.routerPath=l.c,this._getCategoryList()},mounted:function(){var t=this;Object(i.i)(function(e){t.showBackStatus=e})},methods:{changeTab:function(t,e){console.log("导航id："+t),this.oldIndex!=e&&(this.oldIndex=e,this.pageidx=1,this.nomore=!1,this.productListArr=[],""==t?(this.firstCategoryId="",this._productCollection()):(this.firstCategoryId=t,this._goodsLists()),this.curIndex=e)},backTop:function(){Object(i.b)(document.body,{scrollTop:"0"},400,"ease-out")},_getCategoryList:function(){var t=this,e=u.a.stringify({a:"v1/productCategoryList"});Object(r.p)(e).then(function(e){if(console.log("商品分类----"),console.log(e),"1"==e.code){t.showLoading=!1;e.list.unshift({catId:"",catName:"店主推荐"}),t.channelList=e.list,t._productCollection()}})},_productCollection:function(){var t=this,e=u.a.stringify({a:"v1/productCollectionList"});Object(r.y)(e).then(function(e){console.log("店主推荐----"),console.log(e),t.showLoading=!1,t.pageMax=e.pageMax,sessionStorage.TypePageMax=e.pageMax,e.dataList&&!e.dataList.length?(t.emptyResult=!0,sessionStorage.TypeEmptyResult=!0,t.channelList.shift(),t.firstCategoryId=t.channelList[0].catId,t._goodsLists()):(t.emptyResult=!1,sessionStorage.TypeEmptyResult=!1,t.productListArr=e.dataList,sessionStorage.productListArr=o()(e.dataList))})},_goodsLists:function(){var t=this;this.productListArr=[],this.showLoading=!0;var e=u.a.stringify({a:"v1/distributionProductList",pageidx:this.pageidx,firstCategoryId:this.firstCategoryId});Object(r.D)(e).then(function(e){console.log("商品列表----"),console.log(e),t.showLoading=!1,t.pageMax=e.pageMax,sessionStorage.TypePageMax=e.pageMax,e.dataList.length?(t.emptyResult=!1,sessionStorage.TypeEmptyResult=!1,t.productListArr=e.dataList,sessionStorage.productListArr=o()(e.dataList)):(t.emptyResult=!0,sessionStorage.TypeEmptyResult=!0)})},searchTarget:function(){""!=this.searchValue&&(this.pram.keyword=this.searchValue,this._getData())}},components:{footGuide:c.a,loading:n.a,getProxyProductList:r.z}},h={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("form",{staticClass:"search_form"},[s("button",{staticClass:"custom-search-button",attrs:{type:"submit"}}),t._v(" "),s("router-link",{staticStyle:{width:"100%"},attrs:{to:{path:t.routerPath+"/productSearch"}}},[s("input",{staticClass:"search_input",staticStyle:{width:"100%"},attrs:{type:"search",name:"search",placeholder:"请输入商品关键字",readonly:"true"}})])],1),t._v(" "),s("section",[s("div",{staticClass:"cho_list"},[s("ul",t._l(t.channelList,function(e,a){return s("li",{key:a,on:{click:function(s){t.changeTab(e.catId,a)}}},[s("span",{class:{cho_list_span:t.curIndex==a}},[t._v(t._s(e.catName))])])}))])]),t._v(" "),s("section",[s("div",{staticClass:"double"},t._l(t.productListArr,function(e){return t.productListArr.length>0?s("div",{key:e.productId,staticClass:"items"},[s("router-link",{attrs:{to:{path:t.routerPath+"/productDetail",query:{productId:e.productId}}}},[s("div",{staticClass:"placeholder"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.imageUrl,expression:"good.imageUrl"}]}),t._v(" "),s("p",{staticClass:"mc"},[t._v(t._s(e.productName))]),t._v(" "),s("p",{staticClass:"price"},[t._v("￥"+t._s(e.price))])])])],1):t._e()}))]),t._v(" "),s("p",{directives:[{name:"show",rawName:"v-show",value:t.nomore,expression:"nomore"}],staticClass:"empty_data"},[t._v("没有更多了")]),t._v(" "),t.showBackStatus?s("aside",{staticClass:"return_top",on:{click:t.backTop}},[s("svg",{staticClass:"back_top_svg"},[s("use",{attrs:{"xmlns:xlink":"http://www.w3.org/1999/xlink","xlink:href":"#backtop"}})])]):t._e(),t._v(" "),s("footer",{directives:[{name:"show",rawName:"v-show",value:t.preventRepeatReuqest,expression:"preventRepeatReuqest"}],staticClass:"loader_more"},[t._v("正在加载更多商品...")]),t._v(" "),s("section",{ref:"abc",staticStyle:{"background-color":"red"}}),t._v(" "),t.emptyResult?s("section",{staticClass:"search_none"},[t._v("很抱歉！无搜索结果")]):t._e(),t._v(" "),s("transition",{attrs:{name:"loading"}},[s("loading",{directives:[{name:"show",rawName:"v-show",value:t.showLoading,expression:"showLoading"}]})],1),t._v(" "),s("foot-guide")],1)},staticRenderFns:[]};var g=s("VU/8")(p,h,!1,function(t){s("Szyb")},"data-v-d20cf254",null);e.default=g.exports}});