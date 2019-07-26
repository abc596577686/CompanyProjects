<template>
    <div id="vhtml" class="custom-richtext custom-richtext-fullscreen" v-html="content.content">
    </div>
</template>

<script>
    export default {
        data() {
            return {
    
            }
        },
        mounted() {
            var tables = document.querySelectorAll('.custom-richtext table');
            for(var i=0;i<tables.length;i++){ 
                tables[i].style.cssText ="border-collapse: collapse; border-spacing: 0;margin-bottom: 10px;display: table;";
            } 
            var tds = document.querySelectorAll('.custom-richtext td');
            for(var i=0;i<tds.length;i++){ 
                tds[i].style.cssText ="font-weight: normal;vertical-align: middle;";
            } 
            var imgs = document.querySelectorAll('.custom-richtext img');
            for(var i=0;i<imgs.length;i++){ 
                imgs[i].style.cssText ="background: none; max-width: 100% !important;min-height: 1px;idth: auto !important;height: auto !important;vertical-align: middle;border: none;";
            } 
        },
        props: ['content','storeId']
    }
</script>

<style lang="scss" scoped>
    .custom-richtext-fullscreen {
        padding: 0;
        margin-top: 0;
    }
    
    .custom-richtext {
        // padding: 0 10px;
        padding-top: 10px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        font-size: 16px;
        color: #333;
        line-height: 1.5;
        overflow: hidden;
        text-align: left;
        word-wrap: break-word;
    }
    
    .custom-richtext table {
        border-collapse: collapse;
        border-spacing: 0;
        margin-bottom: 10px;
        display: table;
    }
    caption,
    th,
    td {
        font-weight: normal;
        vertical-align: middle;
    }
    a {
        color: #333;
        background: transparent;
        text-decoration: none;
    }
    .custom-richtext img {
        background: none;
        max-width: 100% !important;
        min-height: 1px;
        width: auto !important;
        height: auto !important;
        vertical-align: middle;
        border: none;
    } 
</style>
