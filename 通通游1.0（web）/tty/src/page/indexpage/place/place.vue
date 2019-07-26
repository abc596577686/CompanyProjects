
<template>
    <div>
       <div class="toptit">目的地
            <span class="topim1">
                <img src="../../../images/tty/icon_back_black.png" style="width：100%;height:100%;display:block;">
            </span>
            <span class="topim2">
                <img src="../../../images/tty/搜索@2x.png" style="width：100%;height:100%;display:block;">
            </span>
       </div>
       <div class="maintxt">
            <div class="mainPick">
                 <div v-for="(item,$index) in items"  @click="selectStyle(item, $index)":class="{'active':item.active || item.autoActive,'unactive':!item.active}">{{item.select}} 
                 </div>  
            </div>
            <div class="mainShow">
                
            </div>
       </div>
    </div>
</template>

<script>

export default {
    data(){
        return{
            active: false,
            items: [   
                    {select:'欧洲', autoActive:true},
                    {select:'亚洲'},
                    {select:'非洲'},
                    {select:'大洋洲'},
                    {select:'北美洲'},
                    {select:'南美洲'},
                    {select:'南极洲'}
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
        }   
}

</script>

<style lang="css" scoped>
    @import 'place.css';
    *{
        padding: 0;
        margin:0;
    }
    .active{
        background-color: #f0f0f0;
        color: #008ee5;
        /* background-image: url('../../../images/tty/') */
    }
</style>