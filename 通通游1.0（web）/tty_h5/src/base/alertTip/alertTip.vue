 <template>
    <div class="alet_container">
        <!--黑底  -->
        <section class="showChose" @click="closeTip"></section>
	    <section class="tip_text_container">
            <!--提示标题  -->
            <p class="tip_tit">{{alertTit}}</p>
            <!--提示内容  -->
            <p class="tip_text">{{alertText}}</p>
            <!--确认提示  -->
            <p class="tip_main" @click="cco">{{alertMain}}</p>
        </section>
    </div>
</template>

<script>
    export default {
    	data(){
            return{
                positionY: 0,
                timer: null,
            }
        },
        mounted(){
            setTimeout(()=>{
                this.$emit('closeTip')
            },10000)
        },
        props: [
            'alertTit',
            'alertText',
            'alertMain',
        ],
        methods: {
            closeTip(){
                this.$emit('closeTip')
            },
            cco(){
                this.$emit('closeTip')
            }
        }
    }
</script>

<style lang="css" scoped>
    .alet_container{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 200;
    }
    .showChose{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1999;
        background: rgba(0, 0, 0, 0.6);
    }
    .tip_text_container{
        width: 13.269333rem;
        height: 7.296rem;
        background-color: #fff;
        position: fixed;
        top: 10.666667rem;
        left: 1.408rem;
        z-index: 2000;
    }
    .tip_tit{
        width: 2.986667rem;
        height: .810667rem;
        font-size: .682667rem;
        color: #333333;
        position: absolute;
        left: 5.205333rem;
        top: .810667rem;
    }
    .tip_text{
        width: 7.765333rem;
        height: .853333rem;
        font-size: .64rem;
        color: #333333;
        position: absolute;
        left: 2.773333rem;
        top: 2.858667rem;
        text-align: center;
    }
    .tip_main{
        width: 1.578667rem;
        height: .853333rem;
        font-size: .682667rem;
        color: #008EE5;
        position: absolute;
        left: 5.973333rem;
        top: 5.888rem;
    }
</style>
