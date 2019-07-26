const app = getApp()

import {
  ajax,
  login,
  checkSession,
  getUserInfo
} from '../../utils/index.js'
import Watch from '../../assets/plugins/watch.js'
import {
  setJumpUrl,
  _getValForKey
} from '../../utils/index.js'
import {
  getNavList,
  getChannelDetails,
  getRegionList,
  getHomeCouponList,
  getAllCoupon,
  seckillList
} from '../../api/api.js'

import {
  err_ok
} from '../../etc/config.js'

const CROLL_ID = 2 //初始化TAB边界值
const PER_TAB_WIDTH = 80 //初始化TAB宽度

let homePage
let watch, changePositionVal

Page({
  data: {
    storeId: 1,

    // loading
    isLoading: true,
    animationData: {},

    // tabtop
    placeholderText: '请输入商品名称',
    scanText: '扫 码',
    tabList: null,
    activeId: null,
    curTapId: 0,
    scrollLeft: null,
    perTabOffsetLeft: null,
    posStatus: 'relative',

    // swiper
    imgUrls: [],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 300,
    currentIndex: null,
    topHeadWrapHeight: 0,
    isShowMaskLayer: true,
    isShowBox: false,
    index: 0,
    activityImg: '/assets/images/activity.png '

  },
  watch: {
    curTapId(newVal, oldVal) {
      if (newVal == oldVal) return
      // console.log(newVal, oldVal)
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

  swiperSlideEndEnv() {
    // console.log('滑动结束')
  },
  switchTabEnv(e, swiperId) {
    // console.log(e)
    if (e.currentTarget.id == this.data.activeId) return
    wx.showToast({
      title: '请稍后…',
      icon: 'loading'
    })

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
    this._getChannelDetails(e.currentTarget.dataset.id)
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
      success: function(res) {}
    })
  },
  scanCodeEnv() {
    wx.scanCode({
      onlyFromCamera: false,
      scanType: ['qrCode', 'barCode'],
      success: res => {
        console.log('扫码成功:')
        console.log(res)
        let ecode = res.result
        wx.navigateTo({
          url: `/pages/productDetail/productDetail?productBarCode=${ecode}`
        })
      }
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
    console.log(channelList, 1)
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
  _getNavList() {
    getNavList().then(res => {
      wx.showToast({
        title: res.data.msg,
      })

      console.log('导航----')
      console.log(res.data)

      if (res.data.code !== '1') return

      this.setData({
        tabList: res.data.channelList
      })

      let channelId = this.data.tabList[0] ? this.data.tabList[0].channelId : ''
      this._getChannelDetails(channelId)
      this._initTabList()
      this._initSwiper()

      let query = wx.createSelectorQuery()
      query.select('.topHead').boundingClientRect(res => {
        // console.log(rect)
        if (res) {
          this.setData({
            topHeadWrapHeight: res.height
          })
        }
      }).exec()

    })
  },

  _getRegionList() {
    if (!wx.getStorageSync('__regionList__')) {
      getRegionList().then(res => {
        console.log('区域列表：')
        console.log(res)

        if (res.data.code !== err_ok) {
          return
        }
        wx.setStorageSync('__regionList__', res.data.list)
      })
    }
  },

  _getChannelDetails(channelId) {
    channelId = channelId ? channelId : ''
    this._showLoading()
    let params = {
      channelId: channelId
    }
    getChannelDetails(params).then(res => {
        this._hideLoading()

        console.log('当前模版数据----')
        console.log(res)

        /* 这里暂时取消 */
        // this.data.channelList[this.data.curTapId] = setJumpUrl(this._generateList(res.data.list, channelId), channelId, this.data.storeId)

        if (res.data.code !== '1') {
          this.setData({
            endError: true
          })
          return
        }

        this.data.channelList = []
        this.data.channelList.push(setJumpUrl(this._generateList(res.data.list, channelId), channelId, this.data.storeId))

        this.setData({
          channelList: this.data.channelList
        })

        if (this.data.isPullDownRefresh) {
          let timer = setTimeout(() => {
            wx.stopPullDownRefresh()
            clearTimeout(timer)
          }, 300)
        }

        console.log('页面公共数据----')
        console.log(this.data.channelList)

        // 这里静默加载省市区数据放入本地缓存区
        this._getRegionList()
      })
      .catch(res => {
        this._timeout()
      })
  },
  _getValForKey(url, key) {
    const newUrl = url.substring(url.indexOf('?'), url.length)
    return newUrl.substring(newUrl.indexOf(key), newUrl.length).split('=')[1]
  },
  _generateList(data, channelId) {
    data.forEach(item => {
      if (item.type == 2) {
        if (item.contents[0].requestUrl) {
          const pageId = this._getValForKey(item.contents[0].requestUrl, 'pageId');
          item.products.push({
            itemType: 'more',
            title: '查看全部',
            desc: 'See More',
            jumpUrl: `/pages/theme/theme?channelId=${channelId}&pageId=${pageId}`
          })
        }
      }
    })
    return data
  },
  _checkSession() {
    checkSession().then(res => {
      this._getChannelDetails()
    })
  },

  _getHomeCouponList() {
    getHomeCouponList().then(res => {
      console.log('coupon: ', res)
      if (res.data.code == '1') {
        let couponList = res.data.couponTaskList
        console.log(couponList)
        if (couponList == null || couponList.length <= 0){
          return;
        }

        let index = 0
        let activeList = []
        let normolList = []
        let isRegister = false
        let isRegisterMaskLayer = false
        let couponTaskIdList = wx.getStorageSync('couponTaskIdList')

        couponList.forEach(function(item) {
          if (couponTaskIdList != null && couponTaskIdList.length > 0){
            let isExistItem = false
            couponTaskIdList.forEach(function (couponTaskId) {
              if (couponTaskId == item.taskId){
                isExistItem = true
              }
            })

            if (isExistItem){
              return
            }
          }

          item.isClick = false
          item.couponList.forEach(function(item) {
            item.fullAmount = parseInt(item.fullAmount)
            item.giveAmount = parseInt(item.giveAmount)
          })
          
          if (item.isRegister == "1") {
            try {
              if (couponTaskIdList != null && couponTaskIdList.length > 0) {
                let isExistTaskId = false
                let taskId = parseInt(item.taskId)
                couponTaskIdList.forEach(function (couponTaskId) {
                  if (couponTaskId == taskId) {
                    isExistTaskId = true
                  }
                })

                if (!isExistTaskId){
                  couponTaskIdList[couponTaskIdList.length] = taskId
                }
              }else{
                couponTaskIdList = []
                couponTaskIdList[0] = parseInt(item.taskId)
              }
              wx.setStorageSync('couponTaskIdList', couponTaskIdList)
            } catch (e) { }
            
            isRegister = true
            isRegisterMaskLayer = true
            item.isClick = true
            index ++
          }
          activeList.push(item)
        })

        this.setData({
          isShowBox: false,
          isShowMaskLayer: isRegisterMaskLayer,
          activeList: activeList,
          index: index
        })

        if (!isRegister 
          && activeList != null 
          && activeList.length > 0) {
          this.goNext()
        }
      } else{
        this.setData({
          activeList: [],
          isShowBox: false,
          isShowMaskLayer: false
        })
      }
    }).catch(res => {
      this.setData({
        activeList: [],
        isShowBox: false,
        isShowMaskLayer : false
      })
    })
  },
  cancelCouponer(){
    this.setData({
      isShowMaskLayer: false,
      isShowBox: false
    })
    this.goNext()
  },
  cancel() {
    this.setData({
      isShowMaskLayer: false,
      isShowBox: false
    })
    this.goNext()
  },
  getAll(e) {
    this._showLoading()
    let index = e.currentTarget.dataset.index
    let activeList = this.data.activeList
    console.log(index)
    let params = {
      taskId: activeList[index].taskId
    }
    getAllCoupon(params).then(res => {
      this._hideLoading()
      console.log(res)
      if (res.data.code == '1') {
        activeList[index].isClick = false
        this.setData({
          activeList: activeList,
          isShowMaskLayer: true,
          isShowBox: true
        })
      }else{
        wx.showToast({
          title: res.data.msg,
        })
      }
    })
  },
  seeCoupon() {
    this.setData({
      isShowMaskLayer: false,
      isShowBox: false
    })
    wx.navigateTo({
      url: '/pages/userCenter/myCoupon/myCoupon',
    })
  },
  goNext() {
    let index = this.data.index
    let activeList = this.data.activeList
    let couponTaskIdList = wx.getStorageSync('couponTaskIdList')

    if (activeList.length > 0 && index < activeList.length) {
     
      activeList.forEach(function (item) {
        item.isClick = false
      })

      activeList[index].isClick = true
      if(activeList[index].isActivity=='1'){
        this.setData({
          changeBottom : '1'
        })
      }else{
        this.setData({
          changeBottom : '0'
        })
      }

      try{
        if (couponTaskIdList != null && couponTaskIdList.length > 0) {
          let isExistTaskId = false
          let taskId = parseInt(activeList[index].taskId)
          couponTaskIdList.forEach(function (couponTaskId) {
            if (couponTaskId == taskId) {
              isExistTaskId = true
            }
          })

          if (!isExistTaskId) {
            couponTaskIdList[couponTaskIdList.length] = taskId
          }
        } else {
          couponTaskIdList = []
          couponTaskIdList[0] = parseInt(activeList[index].taskId)
        }
        wx.setStorageSync('couponTaskIdList', couponTaskIdList)
      } catch (e) { }

      index ++
      this.setData({
        activeList: activeList,
        isShowMaskLayer: true,
        isShowBox: false,
        index: index
      })
    }else{
      this.setData({
        isShowMaskLayer: false,
        isShowBox: false
      })
    }
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
    this.onPullDownRefresh()
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
  hideMask(){
    this.setData({
      isShowMaskLayer : false

    })
  },

  onLoad(options) {
    wx.setStorageSync('storeUserId', '7')
    
    // if (options.storeUserId) {
    //   wx.setStorageSync('storeUserId', options.storeUserId)
    // }

    this._showLoading()
    this._initWatchData()
    this._checkSession()
    // wx.clearStorage()
  },
  onShow() {
    this.setData({
      activeList: [],
      isShowBox: false,
      isShowMaskLayer: false
    })
    this._getHomeCouponList()
  },
  onHide() {
    // console.log('onHide')
    // wx.setStorageSync('__newPack__', "1")

  },
  onPullDownRefresh(e) {
    
    console.log('refresh')
    wx.showNavigationBarLoading()
    this.data.isPullDownRefresh = true
    this._getChannelDetails()
  },


  onShareAppMessage() {
    return {
      title: '我发现一个好东西，分享给你！',
      desc: '',
      path: `/pages/home/home`
    }
  },
  imageLoadError(e){
    //图片出错时显示默认图
    let activeList = this.data.activeList
    let index = e.currentTarget.dataset.index
    activeList[index].activityImagePath = this.data.activityImg
    this.setData({
      activeList: activeList
    })
    this._hideLoading()
  },
  imageLoad(e){
    //获取图片的原始宽度和高度 
    this._showLoading() 
    let originalWidth = e.detail.width
    let originalHeight = e.detail.height
    this.setData({
      originalWidth : originalWidth,
      originalHeight : originalHeight
    })

    let bottom = originalHeight
    this.setData({
      bottom : bottom
    },function(){
      this._hideLoading()
    })
  }
})