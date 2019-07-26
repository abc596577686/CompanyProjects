<template>
    <div>
        <div v-title data-title=""></div>
        
        <div class="bgImg">
  		 <img src="../../../common/images/bg11@.png"> 
  		 <img class="dg" src="../../../common/images/dagou2@2x.png"> 
      	<span class="dg_2">恭喜您成功获得</span>
      	<span class="dg_3">集客多大礼包及集客多年度经销商</span>
        <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.webapp.jkd">下载集客多</a>
    </div>
    </div>
</template>

<script>
    // import footGuide from 'src/components/footer/footGuide' 
    import { baseUrl } from 'config/env'
    // import { userInfo } from 'api'
    // import { userInfo } from 'src/service/getData'
    // import { getImgPath } from 'src/components/common/mixin'
    // import {wxHideOptionMenu } from 'src/config/mUtils'
    // import { rootPath } from 'src/config/env'

    export default {
        data() {
            return {
             
            }
        },
        created() {
         
        },
       
        mounted() {
            
        },
        methods:{
            // 返回
            goback(){
    	        window.history.go(-1);
	        }
        },
        components: {
            
        },
        mixins: [
            
        ],
    }
</script>
<style lang="css" scoped>
    a{
        width: 11.648rem;
        height: 1.706667rem;
    }
    img{
        width: 100%;
        height: 100%;
    }
    .topTitle{
        width: 100%;
        height: 2.52rem;
        background-color: black;
        position: relative;
    }
    .bgImg{
        width: 100%;
        height: 100%;
        /* position: relative;
        top: -0.4rem; */
    }
    .dg{
        width: 2.04rem;
        height: 2.04rem;
        position: absolute;
        left: 6.6rem;
        top: 10.52rem;
    }
    .dg_2{
        width: 7rem;
        height: 1.2rem;
        font-size: .8rem;
        line-height: 0.76rem;
        color: #EE3B43;
        position: absolute;
        left: 4.84rem;
        top: 13.44rem;
        font-weight: 600;
    }
    .dg_3{
        width: 10rem;
        height: 1.5rem;
        font-size: .52rem;
        line-height: 0.52rem;
        color: #EE3B43;
        position: absolute;
        left: 3.64rem;
        top: 14.76rem;
        font-weight: 600;
    }
    .bgImg a{
        width: 11.648rem;
        height: 1.706667rem;
        border-radius: .2rem .2rem .2rem .2rem;
        background-color: #FB4A4C;
        color: white;
        font-size: .6rem;
        position: absolute;
        left: 2.16rem;
        top: 19.28rem;
        text-align: center;
        padding-top: .48rem;
        text-decoration: none;
    }
    .tT_1{
        width: .6rem;
        height: .8rem;
        position: absolute;
        left: .4rem;
        bottom: .48rem;
    }
    .tT_2{
        width: 1.44rem;
        height: .84rem;
        font-size: .6rem;
        position: absolute;
        left: 1.2rem;
        bottom: .45rem;
        color: white;
    }
    .tT_3{
        width: 1.44rem;
        height: .84rem;
        font-size: .6rem;
        position: absolute;
        left: 2.6rem;
        bottom: .45rem;
        color: white;
    }
    .tT_4{
        width: 3.5rem;
        height: .95rem;
        font-size: .8rem;
        position: absolute;
        left: 6rem;
        bottom: .6rem;
        color: white;
    }
    .tT_5{
        width: 1.1rem;
        height: .27rem;
        font-size: .8rem;
        position: absolute;
        left: 13.2rem;
        bottom: .8rem;
        color: white;
    }
</style>
