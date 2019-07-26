
<template>
    <div>
        <div class="pagefoot">
            <div class="indexbtn" >
                <div class="inbt_im" @click="indexcli">
                    <img src="../../images/tty/icon_home@2x.png" alt="error" v-show="indexct"> 
                    <img src="../../images/tty/icon_home_active@2x.png" alt="error" v-show="indexct1">  
                </div>
                <div class="inbt_t">首页</div>
            </div>
             <div class="kefubtn"  @click="kefucli">
                <div class="inbt_im">
                    <img src="../../images/tty/icon_custom_active@2x.png" alt="error" v-show="kefuct">
                    <img src="../../images/tty/icon_custom@2x.png" alt="error" v-show="kefuct1">  
                </div>
                <div class="inbt_t">客服</div>
            </div>
            <div class="personalbtn" @click="personalcli">
                <div class="inbt_im">
                    <img src="../../images/tty/people@2x.png" alt="error" v-show="personalct">
                    <img src="../../images/tty/people_fill11@2x.png" alt="error" v-show="personalct1">  
                </div>
                <!-- <div class="inbt_t">个人中心</div>  -->
                <div class="inbt_t" >{{geren}}</div>
            </div>
            <!-- <div></div> -->
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return{
            indexct:true,
            indexct1:false,
            kefuct:true,
            kefuct1:false,
            personalct:true,
            personalct1:false,
            geren:'个人中心',
        }
    },
    mounted(){
        // console.log(1)
        if (this.content) {
            // this.geren = this.content.userInfo.phone
        }
    },
    watch:{
    
    },
    components: {
        
    },
    methods:{
        indexcli:function(){
            this.indexct = false
            this.indexct1 = true
            this.kefuct = true
            this.kefuct1 = false
            this.personalct = true
            this.personalct1 = false
        },
        kefucli:function(){
            this.kefuct = false
            this.kefuct1 = true
            this.indexct = true
            this.indexct1 = false
            this.personalct = true
            this.personalct1 = false
        },
        personalcli:function(){
            this.personalct = false
            this.personalct1 = true
            this.kefuct = true
            this.kefuct1 = false
            this.indexct = true
            this.indexct1 = false
        },
    },
    props: ['content'],
}

</script>

<style lang="css" scoped>
    /* @import 'src/style/mixin'; */
    /* @import 'foot.css';  */
    .pagefoot{
        width: 100%;
        height: 2.218667rem;
        position: fixed;
        bottom: 0;
        background-color: #fff;
    }
    .indexbtn{
        width: 4.5rem;
        height: 2.218667rem;
        display: inline-block;
        position: relative;
    }
    .kefubtn{
        width: 4.4rem;
        height: 2.218667rem;
        display: inline-block;
        position: relative;
    }
    .personalbtn{
        width: 5rem;
        height: 2.218667rem;
        display: inline-block;
        position: relative;
    }
    .inbt_im{
        width: 1.024rem;
        height: .938667rem;
        position: absolute;
        left: 2.176rem;
        top: .469333rem;
    }
    .inbt_im img{
        width: 100%;
        height: 100%;
    }
    .inbt_t{
        width: 2.517333rem;
        height: .597333rem;
        line-height: .597333rem;
        position: absolute;
        left: 1.408rem;
        top: 1.536rem;
        font-size: .426667rem;
        color: #666666;
        text-align: center;
    }
</style>