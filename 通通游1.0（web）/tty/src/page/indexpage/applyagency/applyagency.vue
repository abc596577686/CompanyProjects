
<template>
    <div>
        <div class="apply">申请成为分销员</div>
        <div class="peophone">申请人手机号：</div>
        <input class="phonenum" type="text">
        <div class="peoname">申请人姓名：</div>
        <input class="name" type="text">
        <div class="givename">推荐人姓名：</div>
        <input class="gname" type="text">
        <div class="onputBtn" @click="onput()">提交申请</div>
    </div>
</template>

<script>

    // 引入
    // import promain from 'src/page/personal/promain/ppxromain'

export default {
    data(){
        return{
            
        }
    },
    mounted(){

    },
    watch:{
    
    },
    components: {
     
    },
    methods:{
        onput:function(){
            alert('提交申请')
        }
    }
}

</script>

<style lang="css" scoped>
     /* @import 'applyagency';  */
      @import 'applyagency.css'; 

    *{
        margin: 0;
        padding: 0;
    }
    /*粗线  */
    .gte{
        display: block;
        width: 100%;
        height:.085333rem;
        background-color: #f0f0f0;
    }
    /*细线  */
    .gte1{
        display: block;
        width: 100%;
        height:.04rem;
        background-color: #f0f0f0;
    }
    /*特别粗  */
    .gte2{
        display: block;
        width: 100%;
        height:.426667rem;
        background-color: #f0f0f0;
    }
  
</style>

