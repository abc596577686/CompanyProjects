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

<style lang="scss" scoped>
    @import '../../style/mixin';
	@keyframes tipMove{
       0%   { transform: scale(1) }
       35%  { transform: scale(.8) }
       70%  { transform: scale(1.1) }
       100% { transform: scale(1) }
    }
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
        width: 13.269333rem;
        height: 7.296rem;
        background-color: #fff;
        position: fixed;
        top: 10.666667rem;
        left: 1.408rem;
        z-index: 2000;
        // margin-left: -4rem;
        // width: 8rem;
        // animation: tipMove .4s ;
        // background-color: rgba(0, 0, 0, 0.7);
        // border: 1px;
        // // padding-top: .6rem;
        // display: flex;
        // justify-content: center;
        // align-items: center;
        // flex-direction: column;
        // border: 1px;
        // border-radius: 0.25rem;
        // z-index: 2001;
        // .tip_icon{
        //     @include wh(1.2rem, 1.2rem);
        //     border: 0.1rem solid #f8cb86;
        //     border-radius: 50%;
        //     display: flex;
        //     justify-content: center;
        //     align-items: center;
        //     flex-direction: column;
        //     span:nth-of-type(1){
        //         @include wh(.09rem, 0.45rem);
        //         background-color: #f8cb86;
        //     }
        //     span:nth-of-type(2){
        //         @include wh(.2rem, .2rem);
        //         border: 1px;
        //         border-radius: 50%;
        //         margin-top: .2rem;
        //         background-color: #f8cb86;
        //     }
        // }
        // .tip_text{
        //     @include sc(.55rem, #fff);
        //     line-height: .9rem;
        //     text-align: center;
        //     padding: 0.5rem .4rem;
        // }
        // .confrim{
        //     @include sc(.6rem, #fff);
        //     // font-weight: bold;
        //     margin-top: 1rem;
        //     background-color: #fe5000;
        //     width: 100%;
        //     text-align: center;
        //     line-height: 1.8rem;
        //     border: 1px;
        //     border-bottom-left-radius: 0.25rem;
        //     border-bottom-right-radius: 0.25rem;
        // }
    }
    
</style>
