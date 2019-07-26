<template>
    <div class="home-title" :style="{background:content.bgcolor==''?'#fff':content.bgcolor}">
        <p class="title" v-if="content.show_method=='0'" >{{content.title}}</p>
        <p class="sub-tite" v-if="content.show_method=='0'">{{content.sub_title}}</p>
        <p class="title" v-if="content.show_method=='1'" style="text-align: center;">{{content.title}}</p>
        <p class="sub-tite" v-if="content.show_method=='1'"  style="text-align: center;">{{content.sub_title}}</p>
        <p class="title" v-if="content.show_method=='2'"  style="text-align: right;">{{content.title}}</p>
        <p class="sub-tite" v-if="content.show_method=='2'"  style="text-align: right;">{{content.sub_title}}</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        props: ['content'],
       
    }
</script>

<style lang="scss" scoped>
    .home-title{
        padding: 10px;
        background: #fff;
    }
    .title{
        font-size: 18px;
        color: #333;
    }
    .sub-tite{
        font-size: 14px;
        color: #666;
    }
</style>
