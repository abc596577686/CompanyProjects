 <template>
    <div class="downloadContainer">
        <div class="box">
            <img class="logo" src="../../common/images/logo.png">
            <span class="text">下载APP</span>
            <!-- <span class="close" @click="close">X</span> -->
            <a class="downloadBtn" href="http://a.app.qq.com/o/simple.jsp?pkgname=com.webapp.jkd">立即下载</a>
        </div>
    </div>
</template>

<script>
    export default {
    	data(){
            return{
            }
        },
        mounted(){
            setTimeout(()=>{
                this.$emit('closeTip')
            },2000)
        },
        methods: {
            closeTip(){
                this.$emit('closeTip')
            },
            close() {
                console.log('1')
                this.$emit('closeEnv')
            },
            // closeEnv(){
                
            // }
        }
    }
</script>

<style lang="css" scoped>
    .downloadContainer {
        width: 100%;
        height: 2.3rem;
        padding: 0.6rem;
        background: #333;
        color: #fff;
        font-size: 0.55rem;
    }
    .box{
        overflow: hidden;
    }
    .logo{
        width: 1.11rem;
        float: left;
    }
    .text{
        margin-left: 0.3rem;
        color: #fff;
        margin-top: 0.15rem;
        display: inline-block
    }
    .close{
        float: right;
        height: 1.11rem;
        line-height: 1.11rem;
        color: #fff;
        font-size: 14px;
        padding: 0 .5rem;
    }
    .downloadBtn{
        display: inline-block;
        float: right;
        background: #FDD754;
        color: #333;
        font-size: 0.51rem;
        padding: 0 0.25rem;
        height: 1.11rem;
        line-height: 1.11rem;
        border-radius: 4px;
        margin-right: .3rem;
    }

</style>
