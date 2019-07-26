import { userCenterInfo, getAllCoupon } from '../../api/api.js'

Page({
  data: {
    userInfo: null,
    isShowMaskLayer: false,
    index : 0,
    isShowBox: false,
    bannerShow : true,
    auto : true,
    isLoading : false,
    activityImg: '/assets/images/activity.png'
  },

  viewVipCodeEnv(e) {
    console.log(e)
  },

  _getUserCenterInfo() {

    let params = {}
    userCenterInfo().then(res => {
      console.log('个人中心：')
      console.log(res)
      if (res.data.code !== '1') {
        console.log(res.data.msg)
        return
      }
      let activeList = res.data.userInfo.couponTaskList
      activeList.forEach(function(item){
        item.isClick = false
        item.couponList.forEach(function (item) {
          item.fullAmount = parseInt(item.fullAmount)
          item.giveAmount = parseInt(item.giveAmount)
        })
      }) 
      // if(activeList.length !=0){
      //   activeList[0].isClick = true
      // }
      this.setData({
        userInfo: res.data.userInfo,
        orderInfo: res.data.userInfo,
        activeList : activeList
      })
      
      this._setStorageUserInfo(this.data.userInfo)

    })
  },

  _setStorageUserInfo(userInfo) {
    wx.setStorageSync('__userInfo__', userInfo)
  },

  cancelCoupon() {
    this.setData({
      isShowMaskLayer: false,
      isShowBox: false
    })
  },

  getAll(e) {
    let index = e.currentTarget.dataset.index
    console.log(index)
    let params = {
      taskId: this.data.activeList[index].taskId
    }
    this._showLoading()
    getAllCoupon(params).then(res => {
      console.log(res)
      this._getUserCenterInfo()
      this._hideLoading()

      let activeList = this.data.activeList
      activeList[index].isClick = false
      this.setData({
        isShowMasker : false,
      })

      activeList.splice(index, 1)
      if (res.data.code === '1') {
        this.setData({
          isShowBox : true,
          isShowMasker : true,
          activeList: activeList,
          current : 0
        })
       
      }else{
        wx.showToast({
          title: res.data.msg,
        })

        this.setData({
          isShowMasker: false,
          isShowBox: false,
          activeList: activeList
        })
       
      }
      
    }).catch(res => {
        this._hideLoading()
        this.setData({
          timeout: true,
          isShowMaskLayer: false
        })
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
  showCouponer(e){
    let activeList = this.data.activeList
    let index = e.currentTarget.dataset.idx
    activeList.forEach(function(item){
      item.isClick = false
    })

    activeList[index].isClick = true
    if (activeList[index].isActivity=='1'){
      this.setData({
        changeBottom : '1'
      })
    }else{
      this.setData({
        changeBottom : '0'
      })
    }

    this.setData({
      activeList: activeList,
      isShowMaskLayer : true
    })

    try{
      let couponTaskIdList = wx.getStorageSync('couponTaskIdList')
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
    }catch(e){}
  },
  cancel(){
    this.setData({
      isShowMaskLayer : false,
      isShowBox : false
    })
  },
  imageLoadError(e){
    console.log(111)
    let activeList = this.data.activeList
    let index = e.currentTarget.dataset.index
    activeList[index].activityImagePath = this.data.activityImg
    this.setData({
      activeList: activeList
    })
  },
  imageLoad(e) {
    //获取图片的原始宽度和高度 
    let originalWidth = e.detail.width;
    let originalHeight = e.detail.height;
    this.setData({
      originalWidth: originalWidth,
      originalHeight: originalHeight
    })

    let bottom = originalHeight
    this.setData({
      bottom: bottom
    })
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
  onLoad(){
    this.setData({
      userInfo: wx.getStorageSync('userInfo') || getApp().globalData.userInfo
    })
  },
  onShow() {
    this.setData({
      isShowMaskLayer: false,
      isShowBox: false
    })
    this._getUserCenterInfo()

  }
})
