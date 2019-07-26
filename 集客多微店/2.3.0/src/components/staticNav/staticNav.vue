 <template>
    <div class="topHead" ref="viewport">
        <div class="navBarContainer" ref="slider">
            <div ref="sliderGroup" class="navWrap" :class="{'couponNav': coupon}">
                <div class="nav" v-for="(nav, index) in navList" :class="{'active': curIndex === index}" v-html="nav.channelName" @click="selectNavBar(index, nav)" ></div>
                <span class="line" ref="line"></span>
            </div>
        </div>
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
            navList: {
                type: Array,
                default() {
                    return [{
                        id: 1,
                        channelName: 'default'
                    }]
                }
            },
            curSelectIndex: {
                type: Number,
                default: 0
            },
            coupon: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            // curSelectIndex(val) {
            //     console.log('改变***********')
            //     this.$emit('changeNavBar', val)
            // }
        },
    	data(){
            return{
                curIndex: 0
            }
        },
        created() {
            this.curIndex = this.curSelectIndex
        },
        mounted(){
            // console.log(this.navList)
            setTimeout(()=>{
                this._initSliderWidth()
                this._setLineWidth()
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
            // callPause() {
            //     this.temp = false
            //     console.log('slide告诉NavBar，不用重新获取了')
            // },
            searchEnv() {
                this.$router.push({
                    path: '/wap/search'
                })
            },
            changeCurrentIndex(curIndex) {
                // console.log('====改变导航索引:' + curIndex)
                this._resetSlide(curIndex)
            },
            selectNavBar(curIndex, nav) {
                // console.log('=====切换导航')
                // console.log('当前导航索引：' + curIndex)
                
                // console.log('当前导航id：' + nav.channelId)
                this._resetSlide(curIndex, nav.channelId)
            },
            _resetSlide(curIndex, channelId) {
                let newIndex = curIndex
                if (newIndex == this.curIndex) return
                this.curIndex = curIndex

                channelId = channelId ? channelId : ''
                // this.curSelectIndex = this.curIndex
                this._adjust(this.curIndex)
                this._setLineWidth()
                this.$emit('changeNavBar', this.curIndex)
            },
            _setLineWidth() {
                this._setLineStyle()
            },
            _setLineStyle() {
                // console.log('11111111')
                this.$refs.line.style.transition = `all .3s`
                this.$refs.line.style.width = this._calculationWidth(this.curIndex) + 'px'
                this.$refs.line.style.left = this._calculationPosition(this.curIndex) + 'px'
            },
            _initSliderWidth() {
                this.slider = this.$refs.sliderGroup
                this.sliderChildren = this.slider.children
                let width = 0
                for (let i = 0; i < this.sliderChildren.length; i++) {
                  width += this.sliderChildren[i].clientWidth
                }
                width += this.sliderChildren[0].clientWidth / 2
                // this.slider.style.width = width + 'px'
            },
            _calculationWidth(curIndex) {
                for (let i = 0; i < this.sliderChildren.length; i++) {
                    if (i == curIndex) {
                        return this.sliderChildren[i].clientWidth - this.sliderChildren[i].clientWidth * 0.3
                    }
                }
            },
            _calculationPosition(curIndex) {
                for (let i = 0; i < this.sliderChildren.length; i++) {
                    if (i == curIndex) {
                        return this.sliderChildren[i].offsetLeft + this.sliderChildren[i].clientWidth * 0.15
                    }
                }
            },
            _adjust(navId) {
                navId ++;
                const viewportWidth = this.$refs.viewport.clientWidth
                const tabListWidth = this.$refs.sliderGroup.clientWidth
                const minTranslate = Math.min(0, viewportWidth - tabListWidth)
                const middleTranslate = viewportWidth / 2
                const items = this.$refs.sliderGroup.children
                let width = 0
                this.navList.every((item, index) => {
                  if (item.id === navId) {
                    return false
                  }
                  width += items[index].clientWidth
                  return true
                })
                let translate = middleTranslate - width
                translate = Math.max(minTranslate, Math.min(0, translate))
                this.$refs.slider.scrollTo(translate, 0, 300)
            }
        },
        components: {
            Scroll
        }
    }
</script>

<style lang="css" scoped>
    .topHead{
        position: relative;
        width: 100%;
        height: 1.9rem;
        background: rgba(255,255,255, 100);
    }
    .topHead.fixed{
        position: fixed;
        z-index: 9999;
        box-shadow: 0 1px 3px #ccc;
    }
    .navBarContainer {
        width: 100%;
        /*// background: #fff;*/
        font-size: 0.55rem;
        overflow: hidden
    }
    .searchWrap{
        position: absolute;
        height: 100%;
        top: 0;
        right: 0;
        padding: .3rem 0.7rem;
        background: -webkit-linear-gradient(left, rgba(255,255,255,.5), rgba(255,255,255,1) .6rem);
    }
    .searchImg{
        width: 0.64rem;
        display: inline-block;
        vertical-align: top;
        margin-top: .3rem;
    }
    .line{
        position: absolute;
        left: 0;
        bottom: 0;
        width: 0;
        height: 2px;
        background: #FFD946;
    }
    .navWrap{
        /*@include levelCenter*/
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .nav{
        color: #333;
        padding: 0.5rem .2rem;
        font-size: 0.6rem;
        flex: 1;
        text-align: center;
    }
    .nav.active{
        font-weight: bold;
    }
    .couponNav .nav{
        
    }
    .couponNav .nav.active{
        color: #f02f39;
    }
    .couponNav .line{
        background: #f02f39;
    }

</style>
