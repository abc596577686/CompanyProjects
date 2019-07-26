
<template>
    <div>
        <div class="altoptit">
            <div v-for="(item,$index) in items"  @click="selectStyle (item, $index)":class="{'active':item.active || item.autoActive,'unactive':!item.active}">{{item.select}}
            </div>
        </div>
        <div class="mid_img">
            <img style="width:100%;height:100%" src="../../images/tty/pic3@2x.png">
        </div>
        <div class="tip">暂无数据,去其他页面逛逛</div>
    </div>
</template>

<script>

export default {
    data(){
        return{
            active: false,  //顶部导航样式
            items: [
                    // {select:'全部',}, 
                    {select:'全部', autoActive:true}, //第一个默认变色
                    {select:'待付款'},
                    {select:'已付款'},
                    {select:'已完成'},
                    {select:'已取消'},
                    {select:'退款'},
            ],
        }
    },
    mounted(){

    },
    watch:{
    
    },
    components: {
        
    },
    methods:{
        selectStyle (item, index) {
            const _this=this;
            this.$nextTick(function () {
                this.items.forEach(function (item) {
                    _this.$set(item,'active',false);
                    item.autoActive = false;
                });
                    this.$set(item,'active',true);
            });
        },
        rebtn(){
            alert('重新加载')
        }
    }
}

</script>

<style lang="css" scoped>
    body{
        background-color: #f0f0f0;
    }
    .altoptit{
        width: 100%;
        height: 1.834667rem;
        background-color: #fff;
        position: relative;
        z-index: 3;
         border: 1px solid #f0f0f0;
         border-top: none; 
         border-left: none; 
         border-right: none; 
    } 
    .altoptit >div{
         margin-left: .64rem;     
    }
    .active{
        display: inline-block;
        width: 1.621333rem;
        width: 1.92rem;
        border: .128rem solid #008ee5;
        border-left: none;
        border-top: none;
        border-right: none;
        position: relative; 
        font-size: .554667rem;
        color: #008ee5;
        text-align: center;
        line-height: 1.749333rem;
    }
    .unactive{
        display: inline-block;
        width: 1.92rem;
        height: 1.749333rem;
        font-size: .554667rem;
        color: #666666;
        text-align: center;
        line-height: 1.749333rem;
    }  
    .mid_img{
        width: 4.394667rem;
        height: 4.224rem;
        position: absolute;
        left: 5.76rem;
        top: 6.613333rem;
    }
    .tip{
        width:8.533333rem;
        height: 1.066667rem;
        line-height: .682667rem;
        font-size: .682667rem;
        color: #666666;
        position: absolute;
        left: 3.8rem; 
        /* text-align: center; */
        top: 11.562667rem;
    }
</style>