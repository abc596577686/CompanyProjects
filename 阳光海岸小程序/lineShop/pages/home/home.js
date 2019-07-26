import Watch from '../../assets/plugins/watch.js'
import { requestHeader } from '../../etc/config.js'

const app = getApp();
const mockData = require('../../mock/index.js');
const api = require('../../api/api.js');
const CROLL_ID = 2 //初始化边界值
const perTabWidth = 80 //初始化tab宽度
const SCROLL_TOP = -100 //可刷新边界值

let homePage, watch

homePage = {
  data: {
    // refresh
    refreshMarginTop: 0,
    refreshTips: '下拉可以刷新',
    curTime: '14:00',
    refreshHeight: 0,
    refreshMaskHeight: 0,
    isRefresh: false,
    scrollViewMarginTop: 0,
    timing: '0s',

    hideHeader: false,
    scrollTopVal: 100,
    toogle: true,
    toggleScroll: true,
    // tab
    tabList: null,
    activeId: null,
    curTapId: null,
    scrollLeft: null,
    perTabOffsetLeft: null,
    tabWrapHeight: 0,
    // swiper
    imgUrls: [],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 300,
    currentIndex: null,
    swiperHeight: 0,
    topHeadWrapHeight: 0
  },
  watch: {
    curTapId(newVal, oldVal) {
      if (newVal == oldVal) return
      // console.log(newVal, oldVal)
      if (newVal >= CROLL_ID) {
        this.setData({
          scrollLeft: (newVal - 1) * 80
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
  // 原生下拉刷新
  onPullDownRefresh() {
    console.log('开始刷新====')
    wx.showNavigationBarLoading()
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },
  // 滚动时触发
  scrollEnv(e) {
    // console.log(e)
    let curScrollTop = e.detail.scrollTop
    console.log(curScrollTop)
    if (curScrollTop <= -this.data.refreshHeight) {
      this.setData({
        refreshTips: '松开立即刷新',
        isRefresh: true,
        refreshMaskHeight: this.data.refreshHeight,
        scrollViewMarginTop: -this.data.refreshHeight
      })
    } else {
      this.setData({
        refreshTips: '下拉可以刷新',
        isRefresh: false,
        refreshMaskHeight: 0,
        scrollViewMarginTop: 0
      })
    }
  },
  move(e) {
    console.log('手指移动----')
    console.log(e)
  },
  // 自定义下拉刷新 (在scroll-view组件中使用)
  upper() {
    console.log('触发upper')
    // if (!this.data.toogle) return
    // this.setData({
    //   toogle: false
    // })

    // wx.showNavigationBarLoading()
    // setTimeout(() => {
    //   wx.hideNavigationBarLoading(); 
    //   wx.stopPullDownRefresh();
    //   this.setData({
    //     hideHeader: false,
    //     toogle: true
    //   })
    // }, 2000);
    
    // var self = this;
    // console.log('下拉刷新');
    // // var date = new Date();
    // self.setData({
    //   // refreshTime: date.toLocaleTimeString(),
    //   hideHeader: false
    // })
    // self.getData();
  },
  refresh() {
    console.log('刷新中……')
  },
  touchEnd() {
    let _this = this
    console.log('手指离开')
    if (!_this.data.isRefresh) return
    wx.showNavigationBarLoading()
    this.setData({
      refreshMaskHeight: this.data.refreshHeight,
      timing: '1s'
    })

    // 加载完成后
    setTimeout(() => {
      wx.hideNavigationBarLoading()
      _this.setData({
        refreshMaskHeight: 0,
        timing: '0s'
      })
    }, 1000)
  },
  getData() {
    var self = this;
    setTimeout(() => {
      self.setData({
        hideHeader: true,
        toogle: true,
        scrollTop: 0
      })
      console.log('隐藏')
    }, 1500)
  },
  // switchSwiperEnv() {
  //   this.setData({
  //     currentIndex: 2
  //   })
  //   this.switchTabEnv(undefined, this.data.currentIndex)
  // },
  swiperSlideEndEnv() {
    // console.log('滑动结束')
  },
  switchTabEnv(e, swiperId) {
    if (swiperId !== undefined) {
      this.setData({
        activeId: swiperId,
        perTabOffsetLeft: perTabWidth
      })
      watch.setData({
        curTapId: swiperId
      })

    } else {
      let curTapId = e.currentTarget.id
      let perTabOffsetLeft = e.currentTarget.offsetLeft / curTapId
      this.setData({
        activeId: curTapId,
        perTabOffsetLeft: perTabOffsetLeft
      })
      watch.setData({
        curTapId: curTapId,
      })
    }

    if (this.data.curTapId >= CROLL_ID) {
      this.setData({
        scrollLeft: (this.data.curTapId - 1) * this.data.perTabOffsetLeft
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }

  },
  swiperSlideEnv(e) {
    // console.log(e)
    watch.setData({
      currentIndex: e.detail.current
    })
  },
  jumpSearchEnv() {
    wx.navigateTo({
      url: '../search/search',
      success: function (res) { }
    })
  },
  scanCodeEnv() {
    wx.scanCode({
      onlyFromCamera: false,
      scanType: ['qrCode', 'barCode'],
      success: function (res) {
        console.log('扫码成功:')
        console.log(res)

        wx.navigateTo({
          url: '../productDetail/productDetail',
          success: function (res) {
            console.log(res)
          },
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  _initSwiper() {
    let channelList = []
    this.data.tabList.forEach(() => {
      let obj = {}
      channelList.push(obj)
    })
    this.setData({
      channelList: channelList
    })
    console.log(this.data.channelList)
    console.log('_initSwiper')
  },
  _initWatchData() {
    watch = new Watch(this)
    watch.setData({
      perTabOffsetLeft: null,
      curTapId: null,
      currentIndex: 0
    })
  },
  _initTabList() {
    //默认选择第一个
    this.setData({
      activeId: 0,
      scrollLeft: 0
    })

  },
  _initRefresh() {
    console.log('_initRefresh')
    let _this = this
    let query = wx.createSelectorQuery()
    query.select('#topHead').boundingClientRect(rect => {
      console.log(rect)
      _this.setData({
        refreshMarginTop: rect.height
      })
    }).exec()
    
  },
  _getRefreshWrapHeight() {
    let _this = this
    wx.createSelectorQuery().select('#refreshWrap').boundingClientRect(rect => {
      _this.setData({
        refreshHeight: rect.height
      })
    }).exec()
  },
  _getNavList() {
    let _this = this

    wx.request({
      url: api.getNavList,
      method: 'GET',
      header: requestHeader,
      success: function (res) {
        console.log('导航----')
        console.log(res.data)
        let data = res.data
        _this.setData({
          tabList: data.channelList
        })
        console.log('tabList')

        let channelId = _this.data.tabList[0] ? _this.data.tabList[0].channelId : ''
        _this._getChannelDetails(channelId)
        _this._initTabList()
        _this._initSwiper()
        _this._initRefresh()
        _this._getRefreshWrapHeight()
      }
    })
  },
  _getChannelDetails(channelId) {
    let _this = this
    wx.request({
      url: api.getChannelDetails,
      data: {
        channelId: channelId
      },
      method: 'GET',
      header: requestHeader,
      success: function (res) {
        console.log('当前模版数据----')
        console.log(res)

        let channelList = _this.data.channelList
        channelList[0] = res.data.list
        _this.setData({
          channelList: channelList
        })
        console.log(_this.data.channelList)
      }
    })
  },
  onLoad() {
    console.log('页面加载……')
    this._initWatchData()
    let _this = this
    _this._getNavList()

    // mock数据
    // _this.setData({
    //   tabList: mockData.getNavList
    // })
  },
  onReady() {
    let _this = this
    console.log('渲染完成……')

    let query = wx.createSelectorQuery()
    query.select('#topHead').boundingClientRect(res => {
      // console.log(res)
      let tabHeadHeight = res.height

      wx.getSystemInfo({
        success: function (res) {
          // console.log(res)
          _this.setData({
            swiperHeight: res.windowHeight
          })
        },
      })
    }).exec()
  }
}

Page(homePage)