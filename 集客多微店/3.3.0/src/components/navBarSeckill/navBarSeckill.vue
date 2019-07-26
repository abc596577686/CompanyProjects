 <template>
    <div class="topHead" ref="viewport" style="height:auto;">
        <scroll class="navBarContainer" ref="slider" direction="horizontal" @pauseOutSlideForSeckill="pauseOutSlideForSeckill" @playOutSlideForSeckill="playOutSlideForSeckill">
            <div ref="sliderGroup">
                <div class="nav" v-for="(nav, index) in seckillList" :class="{'active': curIndex == index}" @click="selectNavBar(index, nav)">
                    <p class="time" v-html="nav.seckillName"></p>
                    <p class="text" v-html="nav.seckillStatus"></p>
                </div>
                <!-- <span class="line" ref="line"></span> -->
            </div>
        </scroll>
    </div>
</template>

<script>
    import Scroll from 'base/scroll/scroll'
    import storage from 'good-storage'
    import { rootPath } from 'config/env'

    const SECKILL_TAB_INDEX = '__seckillTabIndex__'

    export default {
        props: {
            loop: {
                type: Boolean,
                default: false
            },
            seckillList: {
                type: Array,
                default() {
                    return [{
                        id: 1,
                        channelName: 'default'
                    }]
                }
            },
            curSelectIndexForSeckill: {
                type: Number,
                default: null
            },
            viewMore: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            curIndex(val) {
                // this._adjust(val)
            }
        },
        created() {
            console.log('秒杀列表 导航---')
            console.log(this.seckillList)
            console.log(this.curSelectIndexForSeckill)
            this.curIndex = this.curSelectIndexForSeckill
        },
    	data(){
            return{
                curIndex: 0,
                toggleClick: false,
            }
        },
        mounted(){
            // this.curSelectIndex = this.currentTabIndex
            // console.log(this.curSelectIndex)
            // console.log(this.seckillList)

            setTimeout(() => {
                this._initSlider()
                // this._setLineWidth()
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
            pauseOutSlideForSeckill() {
                this.$emit('pauseOutSlideForSeckill')
            },
            playOutSlideForSeckill() {
                this.$emit('playOutSlideForSeckill')
            },
            viewMoreEnv() {
                this.toggleClick = !this.toggleClick;
                this.$emit('showMoreNav')
            },
            changeCurrentIndex(curIndex) {
                // console.log('====改变导航索引:' + curIndex)
                this.toggleClick = false;
                this._resetSlide(curIndex)
            },
            selectNavBar(curIndex, nav) {
                storage.set(SECKILL_TAB_INDEX, curIndex)
                console.log('切换导航----')
                // console.log('当前导航索引：' + curIndex)
                
                // console.log('当前导航id：' + nav.id)
                this._resetSlide(curIndex, nav)
            },
            _resetSlide(curIndex, nav) {
                let newIndex = curIndex
                if (newIndex == this.curIndex) return
                this.curIndex = curIndex

                nav.id = nav.id ? nav.id : ''
                // this.curSelectIndex = this.curIndex
                // this._adjust(this.curIndex)
                // this._setLineWidth()
                this.$emit('switchScreen', nav)
            },
            _setLineWidth() {
                this._setLineStyle()
            },
            _setLineStyle() {
                this.$refs.line.style.transition = `all .3s`
                this.$refs.line.style.width = this._calculationWidth(this.curIndex) + 'px'
                this.$refs.line.style.left = this._calculationPosition(this.curIndex) + 'px'
            },
            _initSlider() {
                this.slider = this.$refs.sliderGroup
                this.sliderChildren = this.slider.children
                let width = 0
                for (let i = 0; i < this.sliderChildren.length; i++) {
                  width += this.sliderChildren[i].clientWidth
                }
                width += this.sliderChildren[0].clientWidth / 2
                this.slider.style.width = width + 'px'
                this._adjust(this.curIndex)
                
            },
            _calculationWidth(curIndex) {
                for (let i = 0; i < this.sliderChildren.length; i++) {
                    if (i === curIndex) {
                        // return this.sliderChildren[i].clientWidth - this.sliderChildren[i].clientWidth * 0.3
                        return this.sliderChildren[i].clientWidth
                    }
                }
            },
            _calculationPosition(curIndex) {
                for (let i = 0; i < this.sliderChildren.length; i++) {
                    if (i === curIndex) {
                        return this.sliderChildren[i].offsetLeft + this.sliderChildren[i].clientWidth * 0.15
                        // return this.sliderChildren[i].offsetLeft
                    }
                }
            },
            _adjust(navId) {
                navId++;
                // console.log('navId: ' + navId + ' ==========')
                const viewportWidth = this.$refs.viewport.clientWidth
                const tabListWidth = this.$refs.sliderGroup.clientWidth
                const minTranslate = Math.min(0, viewportWidth - tabListWidth)
                // const middleTranslate = viewportWidth / 2
                const middleTranslate = viewportWidth
                const items = this.$refs.sliderGroup.children
                let width = 0

                this.seckillList.every((item, index) => {
                  if (item.id === navId) {
                    return false
                  }
                  width += items[index].clientWidth
                  return true
                })

                let translate = middleTranslate - width
                translate = Math.max(minTranslate, Math.min(0, translate))
                // console.log('translate:' + tabListWidth)
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
        overflow: hidden;
        background: #fedbdb;
    }
    .searchWrap,
    .viewMore{
        position: absolute;
        height: 100%;
        top: 0;
        right: 0;
        padding: .3rem 0.7rem;
        background: -webkit-linear-gradient(left, rgba(255,255,255,.5), rgba(255,255,255,1) .6rem);
    }
    .searchImg,
    .viewMoreImg{
        width: 0.64rem;
        display: inline-block;
        vertical-align: top;
        margin-top: .3rem;
    }
    .viewMoreImg{
        width: auto;
        height: .4rem;
        margin-top: .6rem;
        transition: transform .3s;
    }
    .viewMoreImg.ani{
        transform: rotate(180deg);
    }
    .line{
        position: absolute;
        left: 0;
        bottom: 0;
        width: 0;
        height: 2px;
        background: #FFD946;
    }
    .nav{
        color: #fff;
        display: inline-block;
        padding: 0.3rem 0.6rem;
        font-size: 0.6rem;
        text-align: center;
        color: #5c5c5c;
        float: left;
    }
    .nav.active{
        font-weight: bold;
        background: #fb4a4c;
        padding: 0.36rem 0.6rem;
    }
    .nav .text{
        font-size: .56rem;
    }
    .nav.active .time,
    .nav.active .text{
        color: #fff;
        font-weight: 700;
        font-size: .53rem;
    }
    .nav.active .time{
        font-size: .56rem;
    }

</style>
