webpackJsonp([33],{kau4:function(t,e){},quTg:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("Xxa5"),i=a.n(s),r=a("exGp"),n=a.n(r),o=a("P9l9"),c=a("mw3O"),d=a.n(c),l=a("y/jF"),p=a("qxsu"),u={data:function(){return{shopid:"",showLoading:!0,showAlert:!1,show:!1,pageIndex:0,orderPackage:[{total:0,logistics:"",expressNo:"",createTime:""}],productList:[],dataList:[],params:{orderId:""},orderId:""}},created:function(){this.shopid=this.$route.query.shopid,this.params.orderId=this.$route.query.orderId},mounted:function(){this.initData()},components:{loading:l.a,alertTip:p.a},methods:{timesyc:function(t){var e=Number(t),a=new Date(1e3*e);return a.getFullYear()+"-"+((a.getMonth()+1<10?"0"+(a.getMonth()+1):a.getMonth()+1)+"-")+(a.getDate()+" ")+(a.getHours()+":")+(a.getMinutes()+":")+(a.getSeconds()+1<10?"0"+(a.getSeconds()+1):a.getSeconds()+1)},initData:function(){var t=this;return n()(i.a.mark(function e(){var a;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:a=d.a.stringify(t.params),Object(o.K)(a).then(function(e){console.log("查看物流----"),console.log(e),t.showLoading=!1,"1"==e.code?(t.orderPackage=e.packageList,t.orderPackage&&e.packageList.length>0&&(t.productList=e.packageList[0].productList,t.dataList=e.packageList[0].dataList)):(t.showAlert=!0,t.alertText=e.msg)});case 2:case"end":return e.stop()}},e,t)}))()},pageChange:function(t){this.pageIndex=t,this.productList=this.orderPackage[t].productList,this.dataList=this.orderPackage[t].dataList}}},v={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"order_detail_page"},[a("div",{directives:[{name:"title",rawName:"v-title"}],attrs:{"data-title":"物流详情"}}),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:!t.showLoading,expression:"!showLoading"}]},[a("ul",{staticClass:"cho_top"},t._l(t.orderPackage,function(e,s){return a("li",{class:{on:t.pageIndex==s},on:{click:function(e){t.pageChange(s)}}},[a("p",[t._v("包裹"+t._s(s+1))])])})),t._v(" "),a("div",{staticClass:"co"},[t.productList.length>0?a("div",{staticClass:"page",attrs:{"data-num":"1"}},[t._l(t.productList,function(e){return a("div",{staticClass:"wl_info"},[a("div",{staticClass:"wl_img"},[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.imageUrl,expression:"product.imageUrl"}]})]),t._v(" "),a("div",{staticClass:"wl_txt"},[a("p",{staticClass:"wl_name"},[t._v(t._s(e.productName))])]),t._v(" "),a("div",{staticClass:"wl_price"},[a("p",{staticClass:"peice"},[t._v("￥"+t._s(e.price))]),t._v(" "),a("p",{staticClass:"num"},[t._v("x"+t._s(e.productNumber))]),t._v(" "),a("p",{staticClass:"rufund"},[t._v(t._s(e.rufundStatusName))])]),t._v(" "),a("div",{staticClass:"proTags"},[t._v(t._s(e.productTags))])])}),t._v(" "),a("div",{staticClass:"wl_ques"},[a("ul",[a("li",[a("p",[a("span",[t._v("包裹"+t._s(t.pageIndex+1)+"：")]),t._v(t._s(t.orderPackage[t.pageIndex].total)+"件物品")])]),t._v(" "),a("li",[a("p",[a("span",[t._v("物流公司：")]),t._v(t._s(t.orderPackage[t.pageIndex].logistics))])]),t._v(" "),a("li",[a("p",[a("span",[t._v("物流编号：")]),t._v(t._s(t.orderPackage[t.pageIndex].expressNo))])]),t._v(" "),a("li",[a("p",[a("span",[t._v("下单时间：")]),t._v(t._s(t.timesyc(t.orderPackage[t.pageIndex].createTime)))])])])]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.dataList.length>0,expression:"dataList.length>0"}],staticClass:"track-rcol"},[a("div",{staticClass:"track-list"},[a("ul",{staticStyle:{"padding-bottom":"30px"}},t._l(t.dataList,function(e){return a("li",[a("i",{staticClass:"node-icon"}),t._v(" "),a("span",{staticClass:"txt"},[t._v(t._s(e.title))]),t._v(" "),a("span",{staticClass:"time"},[t._v(t._s(t.timesyc(e.createTime)))])])}))])])],2):t._e()])]),t._v(" "),t.showAlert?a("alert-tip",{attrs:{alertText:t.alertText},on:{closeTip:function(e){t.showAlert=!1}}}):t._e(),t._v(" "),a("transition",{attrs:{name:"loading"}},[a("loading",{directives:[{name:"show",rawName:"v-show",value:t.showLoading,expression:"showLoading"}]})],1)],1)},staticRenderFns:[]};var g=a("VU/8")(u,v,!1,function(t){a("kau4")},"data-v-076c07de",null);e.default=g.exports}});