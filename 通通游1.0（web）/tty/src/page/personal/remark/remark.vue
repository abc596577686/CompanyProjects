
<template>
    <div>
        <div class="mainmark">
            <div class="mm_1">备注</div>
            <div class="mm_2">{{mm2}}</div>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return{
            mm2:'需要轮椅'
        }
    },
    mounted(){

    },
    watch:{

    },
    components: {

    },
    methods:{
        
    }
}

</script>

<style lang="css" scoped>
    *{
        padding: 0;
        margin:0;
    }
    .mainmark{
        width: 100%;
        height: 3.669333rem;
        background-color: #fff;
    }
    .mm_1{
        width: 100%;
        height: 1.493333rem;
        position: relative;
        padding-left: .554667rem;
        padding-top: .512rem;
        font-size: .554667rem;
        color: #666666;
    }
    .mm_2{
        width: 100%;
        height: 2.176rem;
        position: relative;
        padding-left: .554667rem;
        padding-top: .554667rem;
        font-size: .554667rem;
        color: #666666;
    }
    
</style>