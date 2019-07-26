<template>
    <div>
        <div class="toptit">
            <div class="toptBg">
                <span class="totim">
                    <img src="../../images/tty/搜索@2x.png" alt="error" style="width:100%;height:100%;display:block;">
                </span>
                <input  class="toptB" type="text" placeholder="目的地/关键词">
            </div>
        </div>
        <!--轮播图  -->
        <div class="swiperIm">
            <!-- <mt-swipe :auto="3000" >
                <mt-swipe-item v-for="img in productIndexResult.cycleTheme">
                    <img :src="img.imageUrl" alt="error" style="width:100%;height:100%;display:block;">
                </mt-swipe-item>
            </mt-swipe> -->                  
        </div>
        <!--链接小logo  -->
        <div class="linkTip" :class="{height:num}">
            <!-- <div class="linktt" v-for="linktt in productIndexResult.logo">
                 <div class="Lt_im1">
                    <img :src="linktt.imageUrl" alt="error" style="width:100%;height:100%;display:block;">
                </div> 
                 <div class="Lt_t1">{{linktt.title}}</div> 
            </div> -->
        </div>
        <span class="sp1"></span>
        <div class="new">最新</div>
        <!--弹出提示框  -->
        <!-- <alert-tip v-show="showAlert" @closeTip="showAlert = false" :alertTit="alertTit"  :alertText="alertText" :alertMain="alertMain"></alert-tip>  -->
        <!--产品信息  -->
        <div class="project" v-for="pro in data.productList">
            <div class="mainPro">
                <img :src="img1" alt="error">
                <span class="mptitle">{{pro.productId}}</span>
                <span class="goTime">最近出发 {{pro.calDate}}</span>
                <span class="pay">￥{{pro.adultPrice}}起</span>
            </div>
        </div>
        <foot :content="data"></foot>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { imgBaseUrl } from "src/config/env";
import { loadMore } from "src/components/common/mixin";
// 小弹窗
import alertTip from "src/components/common/alertTip";
// 首页数据接口
import { homeDatas, getToken } from "src/service/getData";
// 域名端口号
import { rootPath } from "src/config/env";
// 底部
import foot from "src/page/foot/foot";

export default {
  data() {
    return {
      showAlert: false, //弹出框
      alertTit: null, //弹出框标题
      alertText: null, //弹出框信息
      alertMain: null, //确认提示
      // 轮播图地址
      img1:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511414941653&di=e0ab98ec828745a8ec640767bbcba5bf&imgtype=0&src=http%3A%2F%2Fwww.busanha.net%2Fuploads%2Fallimg%2F101009%2F1_101009012428_1.jpg",
      img2:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511414941653&di=e0ab98ec828745a8ec640767bbcba5bf&imgtype=0&src=http%3A%2F%2Fwww.busanha.net%2Fuploads%2Fallimg%2F101009%2F1_101009012428_1.jpg",
      img3:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511414941653&di=e0ab98ec828745a8ec640767bbcba5bf&imgtype=0&src=http%3A%2F%2Fwww.busanha.net%2Fuploads%2Fallimg%2F101009%2F1_101009012428_1.jpg",
      img4:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511414941653&di=e0ab98ec828745a8ec640767bbcba5bf&imgtype=0&src=http%3A%2F%2Fwww.busanha.net%2Fuploads%2Fallimg%2F101009%2F1_101009012428_1.jpg",
      mpim1:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511414941653&di=e0ab98ec828745a8ec640767bbcba5bf&imgtype=0&src=http%3A%2F%2Fwww.busanha.net%2Fuploads%2Fallimg%2F101009%2F1_101009012428_1.jpg",
      mptitle: "斜拉链的拉升到了萨达山莨建档立卡时间到了卡时间打",
      mpgotime: "10-7、10-8、10-9",
      pay: "8999",
      // 分销商id jkd
      distId: "",
      // 运营商id tty
      platId: "",
      // 首页数据
      data: [],
      // 默认小于四个 大于四个高度加一倍
      num: true,
      productIndexResult: {}
    };
  },
  mounted() {
    let me = this;
    // 跟参里抓取shopid
    // me.shopid = me.$route.query.shopid;
    me.distId = "jkd";
    me.platId = "tty";

    // shopid 存入vuex
    // me.SAVE_SHOPID(me.shopid);
    // sessionStorage.serchVaule="";

    //获取首页数据
    // if(window.isHomeLoadData!=true||!window.localStorage){
    // window.isHomeLoadData=true;
    // me.showLoading = true;
    homeDatas(me.distId, me.platId)
      .then(res => {
        // me.productNumber = res.productNumber;
        // me.pStoreName=res.storeName;
        // me.pImage=res.image;
        // me.storeCustomFieldList = res.storeCustomFieldList;
        // sessionStorage.productNumber = res.productNumber;
        // sessionStorage.pStoreName=res.storeName;
        // sessionStorage.pImage=res.image;
        // sessionStorage.storeCustomFieldList = JSON.stringify(res.storeCustomFieldList);

        // sessionStorage.storeName=res.storeName;
        // me.showLoading = false;

        // console.log(res.userInfo)
        me.data = res;
        console.log(me.data);
      })
      .catch(function(err) {
        // me.showLoading = false;
        alert("接口走不通");
      });
    // }
  },
  watch: {
    linkTip: function() {
      if (this.data.productIndexResult.logo.length > 4) {
        this.num = true;
      }
    }
  },
  components: {
    
  },
  methods: {}
};
</script>

<style lang="css" scoped>
/* @import 'src/style/mixin'; */
@import "index.css";
.height {
  height: 7.424rem;
}
</style>