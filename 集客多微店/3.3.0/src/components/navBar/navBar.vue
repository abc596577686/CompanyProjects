 <template>
    <div class="topHead" ref="viewport">
        <scroll class="navBarContainer" ref="slider" direction="horizontal">
            <div ref="sliderGroup">
                <div class="nav" v-for="(nav, index) in navList" :class="{'active': curIndex == index}" v-html="nav.channelName" @click="selectNavBar(index, nav)"></div>
                <span class="line" ref="line"></span>
            </div>
        </scroll>
        <div class="searchWrap" v-if="!viewMore && search">
            <img @click="searchEnv" class="searchImg" src="../../common/images/icon_search.png">
        </div>
        <div class="viewMore" v-if="viewMore" @click="viewMoreEnv">
            <img ref="viewMoreImg" class="viewMoreImg" :class="{'ani': toggleClick}" src="../../common/images/icon_viewMore.png">
        </div>
    </div>
</template>

<script>
    import Scroll from 'base/scroll/scroll'
    import { rootPath } from 'config/env'
    import sa from 'sa-sdk-javascript';

    export default {
        props: {
            loop: {
                type: Boolean,
                default: false
            },
            coupon: {
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
                default: null
            },
            viewMore: {
                type: Boolean,
                default: false
            },
            search: {
                type: Boolean,
                default: true
            }
        },
        watch: {
            curIndex(val) {
                // this._adjust(val)
            }
        },
        created() {
            this.curIndex = this.curSelectIndex
        },
    	data(){
            return{
                curIndex: 0,
                toggleClick: false,
            }
        },
        mounted() {
            // this.curSelectIndex = this.currentTabIndex
            // console.log(this.curSelectIndex)
            // console.log(this.navList)

            setTimeout(() => {
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
            viewMoreEnv() {
                this.toggleClick = !this.toggleClick;
                this.$emit('showMoreNav')
            },
            searchEnv() {
                this.$router.push({
                    path: `${rootPath}/productSearch`
                })
            },
            changeCurrentIndex(curIndex) {
                // console.log('====改变导航索引:' + curIndex)
                this.toggleClick = false;
                this._resetSlide(curIndex)
            },
            selectNavBar(curIndex, nav) {
                sa.track('$WebClick', {
                  $element_id: '',
                  $element_content: '',
                  $element_name: nav.channelName,
                  $element_class_name: 'nav',
                  $element_type: 'navigator',
                  $element_selector: '',
                  $element_target_url: '',
                  $url: location.href,
                  $title: document.title,
                  $url_path: location.pathname,
                })

                console.log('=====切换导航')
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
                this.slider.style.width = width + 'px'
                this._adjust(this.curIndex)
                
            },
            _calculationWidth(curIndex) {
                for (let i = 0; i < this.sliderChildren.length; i++) {
                    if (i === curIndex) {
                        return this.sliderChildren[i].clientWidth - this.sliderChildren[i].clientWidth * 0.3
                    }
                }
            },
            _calculationPosition(curIndex) {
                for (let i = 0; i < this.sliderChildren.length; i++) {
                    if (i === curIndex) {
                        return this.sliderChildren[i].offsetLeft + this.sliderChildren[i].clientWidth * 0.15
                    }
                }
            },
            _adjust(navId) {
                navId++;
                // console.log('navId: ' + navId + ' ==========')
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
        overflow: hidden
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
        bottom: .2rem;
        width: 0;
        height: 2px;
        background: #FFD946;
    }
    .nav{
        color: #333;
        display: inline-block;
        padding: 0.5rem 0.4rem;
        font-size: 0.6rem;
    }
    .nav.active{
        font-weight: bold;
    }

</style>
