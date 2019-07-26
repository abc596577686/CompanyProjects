<template>
    <div class="custom-notice" id="wrapper">
        <div class="custom-notice-inner" id="inner">
            <p class="custom-notice-scroll" id="content">公告：{{content.content}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
    
            }
        },
        props: ['content','storeId'],
        mounted() {
            var wrapper = document.getElementById('wrapper');
            var inner = document.getElementById('inner');
            var content =  document.getElementById('content');
            var p_w = content.offsetWidth;
            var wrapper_w = wrapper.offsetWidth;
            if (wrapper_w > p_w) {
                return false;
            }
            clearInterval(this.timer);
            content.innerHTML += content.innerHTML;
            function fun1() {
                if (p_w > wrapper.scrollLeft) {
                    wrapper.scrollLeft++;
                }
            }
            this.timer = setInterval(() => fun1(), 50);
            
        },
         beforeDestroy() {
             clearInterval(this.timer);
		}
    }
</script>

<style lang="scss" scoped>
    .custom-notice {
        padding: 0 10px;
        height: 37px;
        line-height: 37px;
        color: #f90;
        background: #ffc;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
        word-break: break-all;
        font-size: 12px;
         white-space: nowrap;
            overflow: hidden;
            width: 100%;
    } 
    .custom-notice-inner {
      width: 10000px;
        overflow: hidden;
    }
    .custom-notice-scroll {
       
         display: inline-block;
    }
</style>
