webpackJsonp([5],{"0Ys/":function(e,t){},"6b6t":function(e,t){},"8u2W":function(e,t){},EgvP:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("y/jF"),s=i("qwAB"),a=i("i97M"),r=i("nSAR"),c=i("ur2F"),l={props:{theme:{type:Object,default:{}}},computed:{data:function(){return this.theme}},data:function(){return{}},created:function(){},methods:{},components:{}},o={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"themeDetail"},[i("div",{directives:[{name:"title",rawName:"v-title"}],attrs:{"data-title":"专题详情"}}),e._v(" "),i("div",{staticClass:"title"},[i("img",{attrs:{src:e.theme.picture}})]),e._v(" "),i("div",{staticClass:"productList"},e._l(e.theme.products,function(t){return i("div",{staticClass:"productWrap"},[i("router-link",{staticClass:"product",attrs:{tag:"div",to:t.jumpUrl}},[i("div",{staticClass:"imgWrap"},[i("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.imageUrl,expression:"product.imageUrl"}]}),e._v(" "),1==t.isSeckillProduct?i("div",{staticClass:"seckillTip"},[e._v("限时购")]):e._e()]),e._v(" "),i("div",{staticClass:"productDesc"},[i("p",{staticClass:"text",domProps:{innerHTML:e._s(t.productName)}})]),e._v(" "),i("p",{staticClass:"price",domProps:{innerHTML:e._s("¥ "+t.price)}})])],1)}))])},staticRenderFns:[]};var h=i("VU/8")(l,o,!1,function(e){i("0Ys/")},"data-v-1d565e3a",null).exports,d=i("mw3O"),v=i.n(d),u=i("P9l9"),g=(i("fPUB"),i("fdFc")),I={data:function(){return{probeType:3,listenScroll:!0,scrollY:0,isShowMoreNav:!1,curSelectIndex:0,curIndex:0,bannerImgUrl:"",navList:null,themeList:[],tabIsFixed:!1,showLoading:!1}},created:function(){this.channelId=this.$route.query.channelId,this.pageId=this.$route.query.pageId,this._getThemeDetails()},watch:{isShowMoreNav:function(e){e?(this.$refs.scroll.scrollTo(0,0,300),this.$refs.scroll.disable()):this.$refs.scroll.enable()},scrollY:function(e){-e!=this.$refs.themeImgWrap.offsetHeight&&0!=e&&(-e>this.$refs.themeImgWrap.offsetHeight?this.tabIsFixed=!0:this.tabIsFixed=!1)},curIndex:function(e){this.curSelectIndex=e}},methods:{scroll:function(e){this.scrollY=e.y},touchEnv:function(){this.isShowMoreNav=!1},showMoreNav:function(){this.isShowMoreNav=!0},selectTopNav:function(e){var t=this;this.curIndex=e,this.isShowMoreNav=!1,this.curSelectIndex=this.curIndex,setTimeout(function(){t._changeIndex(e)},50),this._scrollTo(e)},changeNavBar:function(e){var t=this;this.tabIsFixed=!0,this.curIndex=e,this._scrollTo(e),setTimeout(function(){t._changeIndex(e)},50)},_changeIndex:function(e){this.navList.length>4?(this.$refs.navBar_4.changeCurrentIndex(e),this.tabIsFixed&&this.$refs.navBar_2.changeCurrentIndex(e)):(this.$refs.navBar_3.changeCurrentIndex(e),this.tabIsFixed&&this.$refs.navBar_1.changeCurrentIndex(e))},_scrollTo:function(e){var t=this;this.themeList.forEach(function(i,n){if(e!=n);else{var s=-t.$refs[i.refName][0].$el.offsetTop;t.$refs.scroll.scrollTo(0,s+45,500)}})},_getThemeDetails:function(){var e=this,t=v.a.stringify({a:"v1/channelDetail",channelId:this.channelId,pageId:this.pageId});e.showLoading=!0,Object(u.C)(t).then(function(t){if("1"==t.code){e.showLoading=!1,e.bannerImgUrl=t.spePicture;var i=[];t.list.forEach(function(e,t){var n={id:t+1,channelName:e.specialName};i.push(n)}),e.navList=i,t.list.forEach(function(t){t=Object(g.g)(t,e.channelId)}),e.themeList=e._addAttr(t.list)}})},_addAttr:function(e){return e.forEach(function(e,t){e.refName="theme_"+t}),e}},mounted:function(){},components:{loading:n.a,Scroll:s.a,StaticNav:c.a,NavBar:r.a,ThemeDetail:h,Shade:a.a}},m={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"themeContainer"},[n("div",{directives:[{name:"title",rawName:"v-title"}],attrs:{"data-title":"专题"}}),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:!e.showLoading,expression:"!showLoading"}]},[e.tabIsFixed&&e.navList&&e.navList.length<=4&&1!=e.navList.length?n("static-nav",{ref:"navBar_1",class:{fixed:e.tabIsFixed},attrs:{navList:e.navList,curSelectIndex:e.curSelectIndex},on:{changeNavBar:e.changeNavBar}}):e._e(),e._v(" "),e.tabIsFixed&&e.navList&&e.navList.length>4?n("nav-bar",{ref:"navBar_2",class:{fixed:e.tabIsFixed},attrs:{viewMore:!0,navList:e.navList,curSelectIndex:e.curSelectIndex},on:{changeNavBar:e.changeNavBar,showMoreNav:e.showMoreNav}}):e._e(),e._v(" "),n("scroll",{ref:"scroll",staticClass:"themeWrap",attrs:{"listen-scroll":e.listenScroll,"probe-type":e.probeType},on:{scroll:e.scroll}},[n("div",[n("div",{ref:"themeImgWrap",staticClass:"themeImgWrap"},[n("img",{attrs:{src:e.bannerImgUrl}})]),e._v(" "),n("transition",{attrs:{name:"viewMoreAni"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.isShowMoreNav,expression:"isShowMoreNav"}],staticClass:"topNav"},[n("div",{staticClass:"title"},[e._v("\n              切换楼层\n              "),n("img",{staticClass:"packUp",attrs:{src:i("HE6G")}})]),e._v(" "),n("div",{staticClass:"list"},e._l(e.navList,function(t,i){return n("div",{staticClass:"item",class:{active:e.curIndex==i},domProps:{innerHTML:e._s(t.channelName)},on:{click:function(t){e.selectTopNav(i)}}})}))])]),e._v(" "),e.navList&&e.navList.length<=4&&1!=e.navList.length?n("static-nav",{ref:"navBar_3",attrs:{navList:e.navList,curSelectIndex:e.curSelectIndex},on:{changeNavBar:e.changeNavBar}}):e._e(),e._v(" "),e.navList&&e.navList.length>4?n("nav-bar",{ref:"navBar_4",attrs:{viewMore:!0,navList:e.navList,curSelectIndex:e.curSelectIndex},on:{changeNavBar:e.changeNavBar,showMoreNav:e.showMoreNav}}):e._e(),e._v(" "),e._l(e.themeList,function(e,t){return n("theme-detail",{key:e.channelName,ref:e.refName,refInFor:!0,attrs:{theme:e}})}),e._v(" "),n("transition",{attrs:{name:"viewMoreAni"}},[n("shade",{directives:[{name:"show",rawName:"v-show",value:e.isShowMoreNav,expression:"isShowMoreNav"}],on:{touchEnv:e.touchEnv}})],1)],2)])],1),e._v(" "),n("transition",{attrs:{name:"loading"}},[n("loading",{directives:[{name:"show",rawName:"v-show",value:e.showLoading,expression:"showLoading"}]})],1)],1)},staticRenderFns:[]};var f=i("VU/8")(I,m,!1,function(e){i("6b6t")},"data-v-53a854d5",null);t.default=f.exports},HE6G:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAXCAYAAAB9J90oAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTMzQjk1NjBGNDI3MTFFNzhCOUY4NEZGRkM0MDIzMTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTMzQjk1NjFGNDI3MTFFNzhCOUY4NEZGRkM0MDIzMTYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5MzNCOTU1RUY0MjcxMUU3OEI5Rjg0RkZGQzQwMjMxNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5MzNCOTU1RkY0MjcxMUU3OEI5Rjg0RkZGQzQwMjMxNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pm3IoLwAAAICSURBVHjazJdLKERRGMfvmYmwIEXK2kJKNmTL1HizkA1TspBHNhamS3YicxdWIgsrJIqU10LXa4uVbBQ7Nl5lYzES/6+OOh33zr0zc+5cX/37pu+ex+9+55zvnmGaIjMMg8HNQP3QOXld199VjR/Q1Nk8NAEVQ13QDuDz/hUogGJwI1K4HtpXBcsUQE7DTSZocgq1YRt8+JZRQI5bQG5An6ozG0gDMgo3K4eRuW6+R61gczK69JhwGG5RCs8Bckxo0wG3BWUJbfboJdAu7nlGATBoAbkERcUAYHYtMttO8Bgj29OMYoII3Ir0gsvQAMC+bfooySxLArIHblWCXId6MeGXQ1/at2tS36RgmUtIq6xsQhEnSIfVoO3R6WYM5mIC2lfbKg6FDayrVWEOA4eorEC5QviAZyGeYsVICZYlCankK5MKLLMZqBbuCMoXwnQjakkX0qEW28Iyl5AXUIPKa1sCWMp0n1zuglLHSg5ZKIQvvYAkM03zKhwOP+FnqxCugkoQP8Tzv6Ac8gQqEjrdQI2AfNM8MhvYahk2yCHL4I7poQQZAuSz5rFx2Bc6A3awAQ55BpUKje6h5kxACneDBf4PQbSh3z3MAEoHpUaCrEPHB80H43dc+fpYTnWsQgg8Qk1+QfLMxiwyW0CgUxDVrVueyTvNZ+Owo9Arr9/XPwIMAEgq6Gj5VpVmAAAAAElFTkSuQmCC"},Ukpw:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAuCAYAAABTTPsKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjY0Qzk0ODhGNDI0MTFFNzhCOUY4NEZGRkM0MDIzMTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjhGNzEyQjJGNDI0MTFFNzhCOUY4NEZGRkM0MDIzMTYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyNjRDOTQ4NkY0MjQxMUU3OEI5Rjg0RkZGQzQwMjMxNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyNjRDOTQ4N0Y0MjQxMUU3OEI5Rjg0RkZGQzQwMjMxNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpEHx94AAARCSURBVHjazJl5SBRxFMdnzVIstUwzpKgoO80olS4qMYXsj7KbikiiA4tIMw0SOuwmszSIIEqw6KSiQDpMCqRD0hIqNRArI+kuMw0qq+9j38RzW8eZ3XXHBx+c389x5ztv3+/93u9piYiIUMy00tJSQ/d7OvGsLmAkGAz6gG6gGXwDL0ElqAK/XfmCRgWTqLlgHpjMYy37AArBSXCdX8gp89B5nx/YzJ7LA9N1iCULBAtBAagGSU5+q7r+eA7IBSF2flcPnoLnoJHneoABIAx4i3v7g8MseiW472rBXiAHrLKZfwdOgHOgTONrJrETwSKwAHTleYr7YpAB9oE/RgRbWskSvuASmCrmvoDt4AhoMuiYIJAG1vFiVe0oeRyZotmZGPbhBSLF3gDDQLYDYsneg3QwBjwR8yvAscjISIujgi38dY8XcyQyHrxxQVaieB8Lroi5pWCro4KTwWwx3gtSXZxLm3ghS9EZ8HKM0RjuByo4JMhOg8VGF4UBo+fcBlE8pkwThnhu0uvhLCH2GcdXe4lVPT0ffOUxpcINekNiBH9NqiWJvNqe9gJkinEKQsNXj+BkXnAKZ4hbbqx/aFOq5evuILEtwd5cH6i2383V2k/eoFRb0pbgKfxmZHWgyIQq85TYMaMQFiFagqPFuMDV5aBOL1OOfyCmorUEh4txsYm1/B1xHa4lOFSMq0wUXCmuB2kJ7iXGr00UXCeug7UEy7zXaKLgBpuTTauCv4txZxMFe4nrH1qC5ZsFmCg4oBVv/ye4Rk+wu8Hks2u1BMvMEGWiYPnsx1qCZe6NNUMpdjZP3nFVK9ESXCTKyAmgrwmaY0UMf2xL8CvhZRqvNkHwWllXaB1KPcTpVdbCQW4Mh0g+Mypcx+TqqYfP8BGFzB/scZPeTuCQqMWvwbvVegT/AhvF/DIwyw2CqZkyjq+beaz71Hye3lCM87hL0142Q7H261Q7CO+WGz3mJ4r+A4UGdR5Ht4PYmeAshwRZuR7v2hP8FiSI7k4wH8UTXCSUYjUFXFBaNgqpfeXnaKuqhJspauVGH3SRQyTQCbGhfMDNFp5VbTjtB0gYQY4IVk/OcSI8LBwuNZxBBhoQSp2a49ymirM5LGSKTYvWSyFE99Tb+bFnvRVrr812y6aHlHG4POIXaWTP+bI36YOpoTjEzufmgzWK9d8L1NE8IFLbQ3oeFuBnRwSr3qWj9w4XbNvUuVzPi1k9gNLmkcKh8m+aRdfrDQlbb+Zz+bcc3DMokvLrTe4sjZJihWjycLrcACnF4kX8HfGwPaM+WAwn/aGK9d8J6od/4rNhBS/gq4q1P9zaEV9u05vwY6f49V0wDfc0OCvYlT0J29pii9KyX0yFWTzua9QbEu5+gW1KywbhJGrw4EV8OqRgFk1e3i2mqLi/TKI7pGAWTfGcZVPk53RYwSw6jXO0amGeSse3VK5xKCx2/RVgANXpBN5W+QaRAAAAAElFTkSuQmCC"},nSAR:function(e,t,i){"use strict";var n=i("qwAB"),s=i("uaSg"),a={props:{loop:{type:Boolean,default:!1},coupon:{type:Boolean,default:!1},navList:{type:Array,default:function(){return[{id:1,channelName:"default"}]}},curSelectIndex:{type:Number,default:null},viewMore:{type:Boolean,default:!1},search:{type:Boolean,default:!0}},watch:{curIndex:function(e){}},created:function(){this.curIndex=this.curSelectIndex},data:function(){return{curIndex:0,toggleClick:!1}},mounted:function(){var e=this;setTimeout(function(){e._initSliderWidth(),e._setLineWidth()},20),window.addEventListener("resize",function(){e.slider&&e.slider.enabled&&(clearTimeout(e.resizeTimer),e.resizeTimer=setTimeout(function(){e.refresh()},30))})},methods:{viewMoreEnv:function(){this.toggleClick=!this.toggleClick,this.$emit("showMoreNav")},searchEnv:function(){this.$router.push({path:s.c+"/productSearch"})},changeCurrentIndex:function(e){this.toggleClick=!1,this._resetSlide(e)},selectNavBar:function(e,t){console.log("=====切换导航"),this._resetSlide(e,t.channelId)},_resetSlide:function(e,t){e!=this.curIndex&&(this.curIndex=e,t=t||"",this._adjust(this.curIndex),this._setLineWidth(),this.$emit("changeNavBar",this.curIndex))},_setLineWidth:function(){this._setLineStyle()},_setLineStyle:function(){this.$refs.line.style.transition="all .3s",this.$refs.line.style.width=this._calculationWidth(this.curIndex)+"px",this.$refs.line.style.left=this._calculationPosition(this.curIndex)+"px"},_initSliderWidth:function(){this.slider=this.$refs.sliderGroup,this.sliderChildren=this.slider.children;for(var e=0,t=0;t<this.sliderChildren.length;t++)e+=this.sliderChildren[t].clientWidth;e+=this.sliderChildren[0].clientWidth/2,this.slider.style.width=e+"px",this._adjust(this.curIndex)},_calculationWidth:function(e){for(var t=0;t<this.sliderChildren.length;t++)if(t===e)return this.sliderChildren[t].clientWidth-.3*this.sliderChildren[t].clientWidth},_calculationPosition:function(e){for(var t=0;t<this.sliderChildren.length;t++)if(t===e)return this.sliderChildren[t].offsetLeft+.15*this.sliderChildren[t].clientWidth},_adjust:function(e){e++;var t=this.$refs.viewport.clientWidth,i=this.$refs.sliderGroup.clientWidth,n=Math.min(0,t-i),s=t/2,a=this.$refs.sliderGroup.children,r=0;this.navList.every(function(t,i){return t.id!==e&&(r+=a[i].clientWidth,!0)});var c=s-r;c=Math.max(n,Math.min(0,c)),this.$refs.slider.scrollTo(c,0,300)}},components:{Scroll:n.a}},r={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{ref:"viewport",staticClass:"topHead"},[n("scroll",{ref:"slider",staticClass:"navBarContainer",attrs:{direction:"horizontal"}},[n("div",{ref:"sliderGroup"},[e._l(e.navList,function(t,i){return n("div",{staticClass:"nav",class:{active:e.curIndex==i},domProps:{innerHTML:e._s(t.channelName)},on:{click:function(n){e.selectNavBar(i,t)}}})}),e._v(" "),n("span",{ref:"line",staticClass:"line"})],2)]),e._v(" "),!e.viewMore&&e.search?n("div",{staticClass:"searchWrap"},[n("img",{staticClass:"searchImg",attrs:{src:i("Ukpw")},on:{click:e.searchEnv}})]):e._e(),e._v(" "),e.viewMore?n("div",{staticClass:"viewMore",on:{click:e.viewMoreEnv}},[n("img",{ref:"viewMoreImg",staticClass:"viewMoreImg",class:{ani:e.toggleClick},attrs:{src:i("Nm2h")}})]):e._e()],1)},staticRenderFns:[]};var c=i("VU/8")(a,r,!1,function(e){i("8u2W")},"data-v-6fda6af2",null);t.a=c.exports}});