import { getThemeDetail } from '../../api/api.js'
import { requestHeader } from '../../etc/config.js'
import { setJumpUrl, getImageHeight, getElementSize } from '../../utils/index.js'
import Watch from '../../assets/plugins/watch.js'

const CROLL_ID = 2 //初始化TAB边界值
const PER_TAB_WIDTH = 80 //初始化TAB宽度
const ANI_TIME = 600 //slider隐藏/显示的动画执行的时机

let watch //全局变量, 由实例化后的对象赋值

Page({
  data: {
    // loading
    isLoading: false,

    // animation
    sliderAnimation: {},
    containerAnimation: {},

    // container
    slideContainerHeight: null,
    isShowContainer: false,
    outToView: null,
    outHeight: '100%',
    scrollHeight: null,
    channelId: 29,
    pageId: 218,
    listHeights: [], //商品列表每个类型的高度

    // banner
    bannerImg: null,

    // tabList
    themeNavs: [],
    isFixed: false,
    activeId: 0,
    perTabOffsetLeft: null,
    scrollLeft: null,
    curTapId: null,
    posStatus: 'relative',
    currentIndex: null,

    // goodsList
    goodsList: [],
    toView: '',
    goodsListHeight: '',

    // switchType
    tabSwitch: false,
    name: '商品主题',

    // 列表滚动
    touchStarNum: 1
  },
  watch: {
    curTapId(newVal, oldVal) {
      if (newVal == oldVal) return
      if (newVal >= CROLL_ID) {
        this.setData({
          scrollLeft: (newVal - 1) * PER_TAB_WIDTH
        })
      } else {
        this.setData({
          scrollLeft: 0
        })
      }
      watch.setData({
        currentIndex: newVal
      })
    },

    currentIndex(newVal, oldVal) {
      if (newVal == oldVal) return
      // console.log(newVal, oldVal)
      watch.setData({
        curTapId: newVal,
        activeId: newVal
      })
    }
  },

  seeMoreEnv() {
    if (!this.data.isShowContainer) {
      this.setData({
        isShowContainer: true,
        outToView: 'themeGoods' //滚动到顶部
      })
      this._setContainerAnimation('show')
      this._setSlideContainerHeight() //设置顶部滑块的高度
      this._setSliderAnimation('show') //设置slider隐藏/显示动画
    } else {
      this.setData({
        isShowContainer: false,
        outToView: null //滚动到顶部
      })
      this._setContainerAnimation('hide')
      this._setSliderAnimation('hide')
    }

  },

  hideContainerEnv() {
    this._setContainerAnimation('hide')
    this._setSliderAnimation('hide') //设置slider隐藏/显示动画
  },

  // touchStartEnv() { //手指触摸时 滚动至顶部 (有bug 先不用)
  //   this.setData({
  //     outToView: 'themeGoods'
  //   })
  // },

  switchHideTabEnv(e) {
    this._setContainerAnimation('hide')
    this._setSliderAnimation('hide') //设置slider隐藏/显示动画

    if (e.currentTarget.id == this.data.activeId) return

    let curTapId = e.currentTarget.id
    this.setData({
      activeId: curTapId,
      toView: `toView_${curTapId}`
    })

    watch.setData({
      curTapId: curTapId,
    })
  },

  switchTabEnv(e) {
    this.setData({
      tabSwitch: true,
      outToView: 'themeGoods'
    })

    let curSelectId = e.currentTarget.id
    let offsetLeft = e.currentTarget.offsetLeft
    console.log(curSelectId)

    this.setData({
      activeId: curSelectId,
      toView: `toView_${curSelectId}`
    })

    if (this.data.themeNavs.length >= 5) {
      let perTabOffsetLeft = offsetLeft / curSelectId
      this.setData({
        perTabOffsetLeft: perTabOffsetLeft
      })
    }

    // watch.setData({
    //   curTapId: curSelectId,
    // })
  },

  goodsListScrollViewEnv(e) {
    let scrollTop = e.detail.scrollTop
    console.log(scrollTop)

    // if (scrollTop >= this.data.scrollHeight) return

    if (scrollTop >= 1) {
      console.log('固定')
      this.setData({
        outToView: 'themeGoods'
      })

    } else {
      console.log('取消固定')
      this.setData({
        outToView: null,
      })
    }
  },

  containerScrollEnv(e) {
    let scrollTop = e.detail.scrollTop

    console.log(scrollTop)
    if (scrollTop >= this.data.scrollHeight) {
      // console.log('固定')
      this.setData({
        isFixed: true,
        // outToView: 'themeGoods'
      })
    } else {
      // console.log('取消固定')
      this.setData({
        isFixed: false,
        // outToView: null
      })
    }
  },

  goodsListScrollEnv(e) {
    // 手动切换tab导致页面滚动，不执行
    // if (this.data.tabSwitch) return

    let curIndex = 0
    let scrollTop = e.detail.scrollTop
    let listHeights = this.data.listHeights
    // console.log(scrollTop)

    for (var i = 0; i < listHeights.length; i++) {
      let height1 = listHeights[i]
      let height2 = listHeights[i + 1]
      if (height1 < scrollTop && scrollTop < height2) {
        // console.log(i)
        watch.setData({
          curTapId: i + 1
        })
        return
      }
    }
    watch.setData({
      curTapId: 0
    })
  },

  _setBannerImg(pic) {
    return !pic || !pic.length ? null : pic
  },
  _setThemeNavs(list) {
    if (!list.length) return []
    let ret = []
    list.forEach(item => {
      ret.push({
        tabName: item.specialName
      })
    })
    return ret
  },
  _setGoodsList(list) {
    return setJumpUrl(list)
  },

  _initWatchData() {
    watch = new Watch(this)
    watch.setData({
      perTabOffsetLeft: null,
      curTapId: null,
      currentIndex: 0
    })
  },

  _initOutHeight() {
    wx.getSystemInfo({
      success: res => {
        // console.log(res)
        this.setData({
          outHeight: res.windowHeight
        })
      },
    })
  },

  _setTabBarFixedHeight() {
    getElementSize('#headWrap').then(res => {
      if (!res) {
        this.setData({
          scrollHeight: null
        })
      } else {
        this.setData({
          scrollHeight: res.height
        })
      }
    })
  },

  _setGoodsListHeight() {
    getElementSize('#tabContainer').then(res => {
      let tabContainerHeight
      if (!res) {
        tabContainerHeight = 0
      } else {
        tabContainerHeight = res.height
        wx.getSystemInfo({
          success: res => {
            console.log('当前系统信息：')
            console.log(res)
            this.setData({
              goodsListHeight: res.windowHeight - tabContainerHeight
            })
          }
        })
      }
    })
  },

  _getPTHFGL() {
    setTimeout(() => { //设置延迟时间，使元素渲染完之后获取高度
      let ret = []
      let height = 0
      this.data.goodsList.forEach((item, index) => {
        // console.log(index)
        new Promise((resolve, reject) => {
          getElementSize('#toView_' + index).then(res => {
            if (!res) {
              resolve(null)
            } else {
              resolve(res.height)
            }
          })
        }).then(res => {
          // console.log(res)
          ret.push(height += res)
          this.setData({
            listHeights: ret
          })
          // console.log(this.data.listHeights)
        })
      })
    }, 500)
  },

  _setSlideContainerHeight() {
    setTimeout(() => {

      getElementSize('#hideHeadWrap').then(res => {
        if (!res) {
          this.setData({
            slideContainerHeight: null
          })
        } else {
          this.setData({
            slideContainerHeight: res.height
          })
        }
      })

    }, 100)
  },

  _setContainerAnimation(type) {
    if (type === 'hide') {
      this.ani_container.opacity(0).step()
      setTimeout(() => {
        this.setData({
          isShowContainer: false
        })
      }, 300)
    }
    if (type === 'show') {
      this.ani_container.opacity(1).step()
    }

    this.setData({
      containerAnimation: this.ani_container.export()
    })
  },

  _setSliderAnimation(type) {
    if (type === 'show') {
      this.ani_slider.top(0).step()
    }
    if (type === 'hide') {
      this.ani_slider.top('-50%').step()
    }

    this.setData({
      sliderAnimation: this.ani_slider.export()
    })
  },

  _initPage() {
    this._initWatchData() //初始化watch实例 并设置需要监听的数据
    this._initOutHeight() //获取设备可使用高度
    this._setTabBarFixedHeight() //设置tabbar固定/取消固定的高度
    this._setGoodsListHeight()  //设置goodsList固定高度
    this._getPTHFGL()  //获取goodsList每个类型的当前高度

  },

  _initAnimation() {
    // this.ani_maskLayer = wx.createAnimation({
    //   duration: ANI_TIME_MASKLAYER,
    //   timingFunction: 'linear',
    //   delay: 0
    // })

    this.ani_slider = wx.createAnimation({
      duration: 300,
      timingFunction: 'linear',
      delay: 0
    })

    this.ani_container = wx.createAnimation({
      duration: 300,
      timingFunction: 'linear',
      delay: 0
    })
  },

  _getThemeDetail() {
    // 获取专题详情，并处理数据，分类赋值与页面结构需要的数据类型
    let params = {
      channelId: this.data.channelId,
      pageId: this.data.pageId
    }

    getThemeDetail(params).then(res => {
      this._hideLoading()

      this.setData({
        bannerImg: this._setBannerImg(res.data.spePicture),
        themeNavs: this._setThemeNavs(res.data.list),
        goodsList: this._setGoodsList(res.data.list),
      })

      this._initPage()
    })
    .catch(res => {
      this._timeout()
    })
    let timer = setTimeout(() => {
      wx.stopPullDownRefresh()
      clearTimeout(timer)
    }, 300)
  },

  imgLoadEnv(e) {
    getImageHeight(this, '.slide-image', e).then(res => {
      this.setData({
        imageHeight: res
      })
    })
  },

  _timeout() {
    this._hideLoading()
    this.setData({
      timeout: true
    })
  },

  refreshEnv() {
    this.setData({
      timeout: false
    })
    this._getThemeDetail()
  },

  _showLoading() {
    wx.showNavigationBarLoading()
    this.setData({
      isLoading: true
    })
  },

  _hideLoading() {
    wx.hideNavigationBarLoading()
    this.setData({
      isLoading: false
    })
  },

  onLoad(options) {
    console.log(options)
    this._showLoading()

    this.data.pageId = options.pageId || ''
    this.data.channelId = options.channelId || ''
    this.data.name = options.name ? options.name : '阳光海岸'

    wx.setNavigationBarTitle({  //设置页面标题
      title: this.data.name,
    })

    this._getThemeDetail()
    this._initAnimation()
  },
  onPullDownRefresh: function () {
    wx.setNavigationBarTitle({  //设置页面标题
      title: this.data.name,
    })

    this._getThemeDetail()
    this._initAnimation()
  },
})
