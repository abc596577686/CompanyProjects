webpackJsonp([27],{EpAd:function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=i("Xxa5"),e=i.n(a),c=i("exGp"),n=i.n(c),o=i("P9l9"),l=i("mw3O"),v=i.n(l),d=i("uaSg"),r=i("qwAB"),u=i("ur2F"),h=i("uX7S"),A=(i("fPUB"),i("MfZv"),i("y/jF")),_={data:function(){return{items:30,beforeScroll:!0,listenScroll:!0,probeType:3,routerPath:"",myInfo:{},navList:[{id:0,channelName:"未使用"},{id:1,channelName:"已使用"},{id:2,channelName:"已过期"}],curSelectIndex:0,coupon:!0,down:!0,up:!1,me:{pageidx:1,pagesize:100,status:""},dataList:{},showLoading:!0,isAc:0,isActive:-1,couponId:"",isshow:0}},created:function(){this.routerPath=d.c,this.me.pageidx=1,this.me.pagesize=100,this.me.status=this.$route.query.status},mounted:function(){this.init()},methods:{init:function(){var t=this;return n()(e.a.mark(function s(){var i,a;return e.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:i=t,a=v.a.stringify(i.me),Object(o.k)(a).then(function(s){console.log(s),t.dataList=s.dataList,t.showLoading=!1,0==i.me.status?i.isshow=0:i.isshow=1});case 3:case"end":return s.stop()}},s,t)}))()},changeNavBar:function(t){console.log(t),this.showLoading=!0,this.me.status=t,console.log(this.me.status),this.init(),this.$refs.slideContent.scrollTo(t)},showUp:function(t,s){3==t.attribute?console.log("此券全场通用"):this.isActive=s},showDown:function(){this.isActive=-1},usecard:function(t){this.$router.push({path:this.routerPath+"/productSearch",query:{couponId:t.couponId}})},showac:function(t){this.isAc=t,console.log(t),this.showLoading=!0,this.me.status=t,this.init()}},components:{Scroll:r.a,StaticNav:u.a,ContentSlide:h.a,loading:A.a},watch:{}},m={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",[a("div",{directives:[{name:"title",rawName:"v-title"}],attrs:{"data-title":"我的优惠券"}}),t._v(" "),a("div",{directives:[{name:"stat",rawName:"v-stat",value:{type:"pageview",title:"我的优惠券"},expression:"{type:'pageview', title:'我的优惠券'}"}]}),t._v(" "),a("div",{staticClass:"toptit"},t._l(t.navList,function(s,i){return a("span",{class:{iscc:i==t.isAc},on:{click:function(s){t.showac(i)}}},[t._v(t._s(s.channelName))])})),t._v(" "),a("section",{staticClass:"couponlist"},[t._l(t.dataList,function(s,e){return 0==t.isshow?a("div",[a("div",{staticClass:"list"},[a("div",{staticClass:"priceimg"},[t._v("￥")]),t._v(" "),a("span",{staticClass:"price"},[t._v(t._s(s.giveAmount))]),t._v(" "),a("div",{staticClass:"fulluse"},[t._v(t._s(""!=s.fullAmount?"满￥"+s.fullAmount+"使用":""))]),t._v(" "),a("div",{staticClass:"coverline"}),t._v(" "),a("div",{staticClass:"leftd"}),t._v(" "),a("div",{staticClass:"rightd"}),t._v(" "),a("div",{staticClass:"useCvor"},[t._v(t._s(s.title))]),t._v(" "),a("div",{staticClass:"down",class:{active:e==t.isActive},on:{click:function(i){t.showUp(s,e)}}},[a("img",{staticClass:"downImg im",attrs:{src:i("Nm2h")}})]),t._v(" "),a("div",{staticClass:"up",class:{active1:e==t.isActive},on:{click:function(i){t.showDown(s,e)}}},[a("img",{staticClass:"upImg im",attrs:{src:i("HE6G")}})]),t._v(" "),a("div",{staticClass:"cardtype"},[t._v("\n                    "+t._s(s.typeName)+"\n                ")]),t._v(" "),a("div",{staticClass:"cardName"},[t._v("\n                    "+t._s(s.couponName)+"\n                ")]),t._v(" "),a("div",{staticClass:"cardtitle"},[t._v("\n                    "+t._s(s.effectiveTime)+"\n                    "),1==s.isLastDay?a("span",{staticStyle:{color:"#FB4A4C"}},[t._v(t._s("("+s.lastDayInfo+")"))]):t._e()]),t._v(" "),a("div",{staticClass:"nowUse",on:{click:function(i){t.usecard(s)}}},[t._v("\n                    立刻使用\n                ")])]),t._v(" "),a("div",{staticClass:"otherProduct",class:{active1:e==t.isActive}},[a("div",{staticClass:"line"}),t._v(" "),a("div",{staticClass:"useCvor1"},[t._v("以下商品适用：")]),t._v(" "),a("div",{staticClass:"bfproduct"},[t._v("\n                    "+t._s(s.bindNames)+"\n                ")])])]):t._e()}),t._v(" "),t._l(t.dataList,function(s,i){return 1==t.isshow?a("div",[a("div",{staticClass:"list",staticStyle:{"background-color":"#E1E1E1"}},[a("div",{staticClass:"priceimg",staticStyle:{color:"#000"}},[t._v("￥")]),t._v(" "),a("span",{staticClass:"price",staticStyle:{color:"#000"}},[t._v(t._s(s.giveAmount))]),t._v(" "),a("div",{staticClass:"fulluse",staticStyle:{color:"#000"}},[t._v(t._s(""!=s.fullAmount?"满￥"+s.fullAmount+"使用":""))]),t._v(" "),a("div",{staticClass:"coverline"}),t._v(" "),a("div",{staticClass:"leftd"}),t._v(" "),a("div",{staticClass:"rightd"}),t._v(" "),a("div",{staticClass:"useCvor"},[t._v(t._s(s.title))]),t._v(" "),a("div",{staticClass:"cardtype",staticStyle:{"background-color":"#666666"}},[t._v("\n                    "+t._s(s.typeName)+"\n                ")]),t._v(" "),a("div",{staticClass:"cardName"},[t._v("\n                    "+t._s(s.couponName)+"\n                ")]),t._v(" "),a("div",{staticClass:"cardtitle"},[t._v("\n                    "+t._s(s.effectiveTime)+"\n                    "),1==s.isLastDay?a("span",{staticStyle:{color:"#FB4A4C"}},[t._v(t._s("("+s.lastDayInfo+")"))]):t._e()])]),t._v(" "),a("div",{staticClass:"otherProduct",class:{active1:i==t.isActive}},[a("div",{staticClass:"line"}),t._v(" "),a("div",{staticClass:"useCvor1"},[t._v("以下商品适用：")]),t._v(" "),a("div",{staticClass:"bfproduct"},[t._v("\n                    "+t._s(s.bindNames)+"\n                ")])])]):t._e()})],2),t._v(" "),a("transition",{attrs:{name:"loading"}},[a("loading",{directives:[{name:"show",rawName:"v-show",value:t.showLoading,expression:"showLoading"}]})],1)],1)},staticRenderFns:[]};var g=i("VU/8")(_,m,!1,function(t){i("YAE1")},"data-v-1013ef6c",null);s.default=g.exports},HE6G:function(t,s){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAXCAYAAAB9J90oAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTMzQjk1NjBGNDI3MTFFNzhCOUY4NEZGRkM0MDIzMTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTMzQjk1NjFGNDI3MTFFNzhCOUY4NEZGRkM0MDIzMTYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5MzNCOTU1RUY0MjcxMUU3OEI5Rjg0RkZGQzQwMjMxNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5MzNCOTU1RkY0MjcxMUU3OEI5Rjg0RkZGQzQwMjMxNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pm3IoLwAAAICSURBVHjazJdLKERRGMfvmYmwIEXK2kJKNmTL1HizkA1TspBHNhamS3YicxdWIgsrJIqU10LXa4uVbBQ7Nl5lYzES/6+OOh33zr0zc+5cX/37pu+ex+9+55zvnmGaIjMMg8HNQP3QOXld199VjR/Q1Nk8NAEVQ13QDuDz/hUogGJwI1K4HtpXBcsUQE7DTSZocgq1YRt8+JZRQI5bQG5An6ozG0gDMgo3K4eRuW6+R61gczK69JhwGG5RCs8Bckxo0wG3BWUJbfboJdAu7nlGATBoAbkERcUAYHYtMttO8Bgj29OMYoII3Ir0gsvQAMC+bfooySxLArIHblWCXId6MeGXQ1/at2tS36RgmUtIq6xsQhEnSIfVoO3R6WYM5mIC2lfbKg6FDayrVWEOA4eorEC5QviAZyGeYsVICZYlCankK5MKLLMZqBbuCMoXwnQjakkX0qEW28Iyl5AXUIPKa1sCWMp0n1zuglLHSg5ZKIQvvYAkM03zKhwOP+FnqxCugkoQP8Tzv6Ac8gQqEjrdQI2AfNM8MhvYahk2yCHL4I7poQQZAuSz5rFx2Bc6A3awAQ55BpUKje6h5kxACneDBf4PQbSh3z3MAEoHpUaCrEPHB80H43dc+fpYTnWsQgg8Qk1+QfLMxiwyW0CgUxDVrVueyTvNZ+Owo9Arr9/XPwIMAEgq6Gj5VpVmAAAAAElFTkSuQmCC"},YAE1:function(t,s){}});