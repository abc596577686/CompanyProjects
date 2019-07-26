<template>
    <div class="service_page">
        <section>
            <div class="title" style="text-align:center;color:#999;background: #fff;font-size: 0.55rem;height: 1.8rem;line-height: 1.8rem;">暂无售后信息！</div>            
        </section>
    </div>
</template>

<script>


export default {
    data(){
        return{
            shopid:''
        }
    },
    created(){
        this.shopid = this.$route.query.shopid;
    }
}

</script>

<style lang="css" scoped>
   @import 'service';
</style>
