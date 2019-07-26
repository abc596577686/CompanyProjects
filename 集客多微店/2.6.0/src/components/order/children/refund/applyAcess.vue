<template>
    <div>
        <div class="cover">
            <img  class="topimg" src="../../../../common/images/r2xred.png">
            <div class="txt1">售后申请已提交</div>
            <div class="txt2">您的申请已提交，请耐心等待平台</div>
            <button class="golook" @click="goRefundDetail()">查看售后详情</button>
        </div>
    </div>
</template>

<script>
    import { userInfo } from 'api'
    import qs from 'qs'
    import { rootPath } from 'config/env'

    export default {
        data() {
            return {
                routerPath:'',
                myInfo: {

                },
                itemId:''
            }
        },
        created() {
            this.routerPath=rootPath;
            this.itemId = this.$route.query.itemId;
        },
        mounted() {
            
        },
        methods:{
            goRefundDetail(){
                this.$router.push({path: this.routerPath+'/refundDetail',query:{itemId:this.itemId}});
            }
        },
        components: {

        },
    }
</script>
<style lang="css" scoped>
    @import 'applyAcess'; 
</style>
