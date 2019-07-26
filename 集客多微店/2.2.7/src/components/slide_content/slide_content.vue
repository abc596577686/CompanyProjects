<template>
  <div class="slide" ref="slideContent">
    <div class="slide-group" ref="slideGroup">
      <slot>
      </slot>
    </div>
    <div v-if="showDot" class="dots">
      <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { addClass } from 'common/js/utils'
  import BScroll from 'better-scroll'

  const COMPONENT_NAME = 'slide'

  export default {
    name: COMPONENT_NAME,
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      },
      showDot: {
        type: Boolean,
        default: false
      },
      click: {
        type: Boolean,
        default: true
      },
      threshold: {
        type: Number,
        default: 0.3
      },
      speed: {
        type: Number,
        default: 400
      }
    },
    data() {
      return {
        dots: [],
        currentPageIndex: 0,
        pageIndex: 0
      }
    },
    mounted() {
      this.update()

      window.addEventListener('resize', () => {
        if (!this.slideContent || !this.slideContent.enabled) {
          return
        }
        clearTimeout(this.resizeTimer)
        this.resizeTimer = setTimeout(() => {
          if (this.slideContent.isInTransition) {
            this._onScrollEnd()
          } else {
            if (this.autoPlay) {
              this._play()
            }
          }
          this.refresh()
        }, 60)
      })
    },
    activated() {
      if (!this.slideContent) {
        return
      }
      this.slideContent.enable()
      let pageIndex = this.slideContent.getCurrentPage().pageX
      this.slideContent.goToPage(pageIndex, 0, 0)
      this.currentPageIndex = pageIndex
      if (this.autoPlay) {
        this._play()
      }
      this.refresh()
    },
    deactivated() {
      this.slideContent.disable()
      clearTimeout(this.timer)
    },
    beforeDestroy() {
      this.slideContent.disable()
      clearTimeout(this.timer)
    },
    methods: {
      // callPause() {
      //   this.temp = false
      //   console.log('navBar告诉Slide，不用重新获取了')
      // },
      slideDisabled() {
        // console.log('禁用外部slide')
        this.slideContent.disable()
      },
      slideEnable() {
        // console.log('启用外部slide')
        this.slideContent.enable()
      },
      scrollTo(index) {
        this.slideContent.goToPage(index, 0, 500)
      },
      update() {
        if (this.slideContent) {
          this.slideContent.destroy()
        }
        this.$nextTick(() => {
          this.init()
        })
      },
      refresh() {
        this._setSlideWidth(true)
        this.slideContent.refresh()
      },
      prev() {
        this.slideContent.prev()
      },
      next() {
        this.slideContent.next()
      },
      init() {
        clearTimeout(this.timer)
        this.currentPageIndex = 0
        this._setSlideWidth()
        if (this.showDot) {
          this._initDots()
        }
        this._initSlide()

        if (this.autoPlay) {
          this._play()
        }
      },
      _setSlideWidth(isResize) {
        this.children = this.$refs.slideGroup.children
        let width = 0
        let slideWidth = this.$refs.slideContent.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slide-item')
          child.style.width = slideWidth + 'px'
          width += slideWidth
        }
        if (this.loop && !isResize) {
          width += 2 * slideWidth
        }
        this.$refs.slideGroup.style.width = width + 'px'
      },
      _initSlide() {
        // console.log('2: ' + this.threshold)
        this.slideContent = new BScroll(this.$refs.slideContent, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: {
            loop: this.loop,
            threshold: this.threshold,
            speed: this.speed
          },
          bounce: false,
          click: this.click
        })

        this.slideContent.on('scrollEnd', this._onScrollEnd)

        this.slideContent.on('touchEnd', () => {
          if (this.autoPlay) {
            this._play()
          }
          this.$emit('startPlay')
        })

        this.slideContent.on('beforeScrollStart', () => {
          if (this.autoPlay) {
            clearTimeout(this.timer)
          }
          this.$emit('pausePlay')

        })

      },
      _onScrollEnd() {
        // console.log('====滑动结束')
        let newPageIndex = this.slideContent.getCurrentPage().pageX
        if (this.pageIndex == newPageIndex) return

        this.pageIndex = this.slideContent.getCurrentPage().pageX
        this.currentPageIndex = newPageIndex
        if (this.autoPlay) {
          this._play()
        }

        this.$emit('changeSlideIndex', this.currentPageIndex)
      },
      _initDots() {
        this.dots = new Array(this.children.length)
      },
      _play() {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.slideContent.next()
        }, this.interval)
      }
    },
    watch: {
      loop() {
        this.update()
      },
      autoPlay() {
        this.update()
      },
      speed() {
        this.update()
      },
      threshold() {
        this.update()
      }
    }
  }
</script>

<style lang="css" scoped>
  .slide{
    height: 100%;
  }
  .slide-group{
    height: 100%;
    position: relative;
  }
  .slide-item{
    display: inline-block;
    height: 100%;
    overflow: hidden;
    position: relative;
  }
</style>
