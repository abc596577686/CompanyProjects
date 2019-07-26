<template>
    <div>
        <div v-title data-title="退款/售后"></div>
        <div class="refundList">
            12121212112
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            
        }
    },
    created(){
        this.shopid = this.$route.query.shopid;
    }
}
</script>

<style lang="css" scoped>
   @import 'refundList';
</style>
