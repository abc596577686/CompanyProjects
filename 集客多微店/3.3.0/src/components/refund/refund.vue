<template>
    <div>
        <section>
            售后页面
        </section>
        <!-- <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition> -->
    </div>
</template>

<script>
    import footGuide from 'base/footer/footGuide'
    import { userInfo } from 'api'
    import qs from 'qs'
    import { rootPath } from 'config/env'

    export default {
        data() {
            return {
                routerPath:'',
                myInfo: {}
            }
        },
        created() {
            this.routerPath=rootPath;
        },
       
        mounted() {
            
        },
        components: {
            footGuide
        },
    }
</script>
<style lang="css" scoped>
    @import 'refund';
</style>
