 <template>
    <div class="goodsSlide" ref="viewport">
        <scroll class="navBarContainer" ref="slider" direction="horizontal" :beforeScroll="true" @beforeScroll="beforeScroll">
            <div class="sliderGroup" ref="sliderGroup">
                <div class="goodWrap" v-for="good in themeGoodsList">
                    <router-link tag="div" :to="good.jumpUrl" class="good" v-if="!good.viewAll">
                        <div class="imgWrap">
                            <img v-lazy="good.imageUrl">
                            <div v-if="good.isSeckillProduct == 1" class="seckillTip">限时购</div>
                        </div>
                        <p class="text" v-html="good.productName"></p>
                        <p class="price">
                            ¥ <span class="num" v-html="good.price"></span>   
                        </p>
                    </router-link>
                    <router-link tag="div" :to="good.jumpUrl" v-if="good.viewAll" class="viewAll">
                        <div class="box">
                            <span class="text" v-html="good.viewAll"></span>
                            <span class="line"></span>
                            <span class="defaultText" v-html="good.defaultText"></span>
                        </div>
                    </router-link>
                </div>
            </div>
        </scroll>
    </div>
</template>

<script>
    import Scroll from 'base/scroll/scroll'

    export default {
        props: {
            loop: {
                type: Boolean,
                default: false
            },
            themeGoodsList: {
                type: Array,
                default() {}
            }
        },
    	data(){
            return{
            }
        },
        mounted(){
            setTimeout(()=>{
                this._initSliderWidth()
            }, 20)

            window.addEventListener('resize', () => {
                if (!this.slider || !this.slider.enabled) {
                  return
                }
                clearTimeout(this.resizeTimer)
                this.resizeTimer = setTimeout(() => {
                    this.refresh()
                }, 30)
            })
        },
        methods: {
            beforeScroll() {
                this.$emit('pauseOutSlide')
            },
            scrollEnd() {
                this.$emit('playOutSlide')
            },
            _initSliderWidth() {
                this.slider = this.$refs.sliderGroup
                if (this.slider) {
                    this.sliderChildren = this.slider.children
                }
                let width = 0
                for (let i = 0; i < this.sliderChildren.length; i++) {
                  width += this.sliderChildren[i].clientWidth
                }
                width += this.sliderChildren[0].clientWidth / 2
                this.slider.style.width = width + 'px'
            }
        },
        components: {
            Scroll
        }
    }
</script>

<style lang="css" scoped>
    /*@import 'src/style/mixin';*/
    .topHead{
        position: relative;
        width: 100%;
        height: 1.9rem;
        background: #fff;
    }
    .navBarContainer {
        width: 100%;
        background: #fff;
        font-size: 0.55rem;
        overflow: hidden
    }
    .sliderGroup{
        padding: .1rem 0;
        overflow: hidden;
    }
    .goodWrap{
        width: 4.5rem;
        padding: .3rem;
        padding-bottom: 0;
        display: inline-block;
        vertical-align: top;
        float: left;
    }
    .good{
        /*@include center;*/
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    .imgWrap{
        width: 3.27rem;
        height: 3.27rem;
        overflow: hidden;
        text-align: center;
        margin-bottom: .2rem;
        position: relative;
    }
    .imgWrap img{
        width: 100%;
    }
    .imgWrap .seckillTip{
        position: absolute;
        bottom: 0;
        left: 0;
        font-size: .2rem;
        padding: 0 .16rem;
        border: .02rem solid #FB4A4C;
        color: #FB4A4C;
        background-color: #ffffff;
    }
    .good .text{
        font-size: .56rem;
        line-height: 1.3;
        height: 1.42rem;
        margin-bottom: .3rem;
        overflow:hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        /* autoprefixer: off */
        -webkit-box-orient: vertical;
        /* autoprefixer: on */
        word-break: break-all;
        text-overflow: ellipsis;
    }
    .price{
        color: #FB4A4C;
        font-size: .45rem;
        width: 100%;
        text-align: center;
    }
    .price .num{
        font-size: .6rem;
        color: #FB4A4C;
    }
    .viewAll{
        display: inline-block;
        padding: .3rem;
        width: 3.5rem;
        height: 3.5rem;
        border: 0.03rem solid #000;
    }
    .viewAll .box{
        width: 100%;
        height: 100%;
        /*@include center;*/
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .viewAll .text{
        color: #FB4A4C;
    }
    .viewAll .line{
        width: 100%;
        height: 1px;
        background: #FB4A4C;
        margin: .2rem 0;
    }


</style>
