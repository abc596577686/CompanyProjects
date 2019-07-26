
<template>
    <div>
        <div :data-title="productName?productName:'电子合同'"></div>
        <div class="tit">电子合同</div>
        <div class="maintxt">
            -承诺- 1、出游前：通通游、旅行社、导游三方联系 2、出游中：出游前一天提供紧急联系人电话，24小时保持畅通 3、出游后：随机选择5-10名游客，电话回访 -问答- 1、草原的住宿怎么样？答:住宿是双人标准间，区别于一般,环境简陋的度假村标间。牛人专线产品已经提高了住宿标准，但是和城市里面的住宿同等级差距较大，请见谅，勿期望过高。 2、越野车可以随便开么?答：草原保护性可持续发展，部分地段维护隔离，没有限制的地段可以前往。越野车在规定的跑马场出发。 （补充：越野车司机为当地牧民，无服务意识，且民风彪悍，请勿与越野车司机发生冲突。）
        </div>
        <div class="btn" @click="getdata()">生成合同</div>
    </div>
</template>

<script>

export default {
    data(){
        return{
            productName:'电子合同',
        }
    },
    mounted(){

    },
    watch:{
    
    },
    components: {

    },
    methods:{
        getdata(){
            alert('走合同接口')
        }
    }
}

</script>

<style lang="css" scoped>
    .tit{
        width: 3.413333rem;
        height: .853333rem;
        font-size: .682667rem;
        color: #333333;
        position: absolute;
        left: 6.656rem;
        top: .810667rem;
    }
    .maintxt{
        width: 14.805333rem;
        height: 18.517333rem;
        position: absolute;
        left: .554667rem;
        top: 2.858667rem;
        /*文字超出自动换行 如果是图片不需要  */
        word-wrap:break-word;
        font-size: .597333rem;
    }
    .btn{
        width: 15.018667rem;
        height: 2.133333rem;
        background-color: #008ee5;
        text-align: center;
        line-height: 2.133333rem;
        font-size: .725333rem;
        border-radius: .341333rem .341333rem .341333rem .341333rem;
        color: white;
        position: absolute;
        left: .426667rem;
        top: 24.789333rem;
    }
</style>