 <template>
    <div class="alet_container">
        <section class="showChose" @click="closeTip"></section>
	    <section class="tip_text_container">
            <!--<div class="tip_icon">
                <span></span>
                <span></span>
            </div>-->
            <p class="tip_text">{{alertText}}</p>
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
            },2000)
        },
        props: ['alertText'],
        methods: {
            closeTip(){
                this.$emit('closeTip')
            }
        }
    }
</script>

<style lang="css" scoped>
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
        /* z-index: 200; */
        z-index: 10000;
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
        position: fixed;
        top: 20%;
        left: 50%;
        margin-left: -4rem;
        width: 8rem;
        animation: tipMove .4s ;
        background-color: rgba(0, 0, 0, 0.7);
        border: 1px;
        /*// padding-top: .6rem;*/
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border: 1px;
        border-radius: 0.25rem;
        z-index: 20000;
    }
    .tip_text_container .tip_icon{
        /*@include wh(1.2rem, 1.2rem);*/
        width: 1.2rem;
        height: 1.2rem;
        border: 0.1rem solid #f8cb86;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        
    }
    .tip_text_container .tip_icon span:nth-of-type(1){
        /*@include wh(.09rem, 0.45rem);*/
        width: .09rem;
        height: .45rem;
        background-color: #f8cb86;
    }
    .tip_text_container .tip_icon span:nth-of-type(2){
        /*@include wh(.2rem, .2rem);*/
        width: .2rem;
        height: .2rem;
        border: 1px;
        border-radius: 50%;
        margin-top: .2rem;
        background-color: #f8cb86;
    }
    .tip_text_container .tip_text{
        /*@include sc(.55rem, #fff);*/
        font-size: .55rem;
        color: #fff;
        line-height: .9rem;
        text-align: center;
        padding: 0.5rem .4rem;
    }
    .tip_text_container .confrim{
        /*@include sc(.6rem, #fff);*/
        font-size: .6rem;
        color: #fff;
        /*// font-weight: bold;*/
        margin-top: 1rem;
        background-color: #fe5000;
        width: 100%;
        text-align: center;
        line-height: 1.8rem;
        border: 1px;
        border-bottom-left-radius: 0.25rem;
        border-bottom-right-radius: 0.25rem;
    }
    
</style>
