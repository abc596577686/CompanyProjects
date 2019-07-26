
<template>
    <div>
        <div class="promain">
            <div class="promain_im">
                <span class="supplier" v-html="productInfo.supName"></span>
                <img :src="productInfo.imgUrl" >
            </div>
            <div class="promain_tit" v-html="productInfo.title"></div>
            <div class="promain_peonum">出游人数：
                <span v-if="tripInfo.persons">成人:{{tripInfo.persons.adult}}人</span>
                <span v-if="tripInfo.persons">儿童:{{tripInfo.persons.children}}人</span>
                <!-- <span v-if="tripInfo.orderNumDesc" v-html="tripInfo.orderNumDesc"></span> -->
            </div>
            <div class="promain_peotime">出发时间： {{tripInfo.date}}</div>
            <div class="promain_state" v-show="isProgress">{{prostate}}</div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
      productInfo: {
        type: Object,
        default: {}
      },
      tripInfo: {
        type: Object,
        default: {}
      }
    },
    data(){
        return{
            isProgress: false,
            promatit:'邂逅彩虹岛-美国夏威夷欧湖半岛自助游7天4晚',
            peoplenum:'成人x1',
            peopletime:'2017-09-24',
            prostate:'退款进度'
        }
    },
    mounted(){
        // console.log(this.tripInfo)
    },
    watch:{

    },
    components: {

    },
    methods:{
        
    }
}

</script>

<style scoped lang="css">
    .promain{
        width: 100%;
        height: 4.949333rem;
        background-color: #fff;
        position: relative;
    }
    .promain_im{
        width: 5.290667rem;
        height: 3.925333rem;
         position: absolute; 
        /* position: relative; */
        left: .554667rem;
        top: .512rem;
        text-align: center;
        overflow: hidden;
    }
    .promain_im img{
        display: inline-block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
        height: 100%;
    }
    .promain_tit{
        width: 9.258667rem;
        height: 1.365333rem;
        line-height: .682667rem;
        font-size: .597333rem;
        color: #666666;
        position: absolute;
        left: 6.058667rem;
        top: .512rem;
    }
    .promain_peonum{
        width: 8.106667rem;
        height: .853333rem;
        line-height: .512rem;
        font-size: .512rem;
        color: #999999;
        position: absolute;
        left: 6.101333rem;
        top: 2.602667rem;
    }
    .promain_peotime{
        width: 8.106667rem;
        height: .853333rem;
        line-height: .512rem;
        font-size: .512rem;
        color: #999999;
        position: absolute;
        left: 6.101333rem;
        top: 3.925333rem;
    }
    .promain_state{
        width: 2.944rem;
        height: 1.024rem;
        line-height: 1.024rem;
        font-size: .554667rem;
        color: #FB4A4C;
        border: 1px solid #FB4A4C; 
        text-align: center;
        position: absolute;
        left: 12.544rem;
        top: 3.541333rem;
    }
    .shuoming{
        width: 16rem;
        height: 1.962667rem;
        padding-left: .554667rem;
        padding-top: .384rem;
        background-color: #fff;
        border: 1px solid lightgrey;
        border-left: none;
        border-right: none;
        border-bottom: none;
    }
    .shuom1{
        width: 9.386667rem;
        height: .554667rem;
        font-size: .469333rem;
        color: #666666;
    }
    .shuom2{
        width: 9.386667rem;
        height: .554667rem;
        font-size: .469333rem;
        color: #666666;
        position: relative;
        top: .256rem;
    }
    .zc{
        width: 100%;
        height: 1.92rem;
        background-color: #fff;
        border: 1px solid lightgrey;
        border-left: none;
        border-right: none;
        border-bottom: none;
        padding-left: 12.544rem;
        padding-top: .469333rem;
    }
    .zcsq{
        width: 2.944rem;
        height: 1.024rem;
        border: 1px solid #666666;
        font-size: .554667rem;
        text-align: center;
        line-height: 1.024rem;
    }
    .supplier{
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        padding: 0.26rem 0.34rem;
        background: rgba(0,0,0,.5);
        color: #fff;
        font-size: 0.47rem;
        z-index: 9999;
    }
</style>