// pages/cart/firmOrder/coupon/coupon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: 0,
    tabColor: '#FB4A4C',
    couponTitle: ['availableCouponList', 'unavailableCouponList']
  },

  changeTabEnv(e) {
    console.log(e)
    let curSelectIndex = e.currentTarget.dataset.index - 0
    this.setData({
      show: curSelectIndex
    })

  },

  selectCoupon(e) {
    console.log(e)

    let couponList = this.data.couponList
    let sel = this.data.couponTitle[this.data.show]
    let list = couponList[sel]
    let userCouponId = e.currentTarget.dataset.id
    let userCouponName = e.currentTarget.dataset.name
    let canClick = e.currentTarget.dataset.click
    if (canClick === '0') {
      return
    }

    // console.log(111,list)
    let index1 = e.currentTarget.dataset.index
    couponList[sel].forEach(function (item, index) {
      if (index == index1) {
        item.isChecked = !item.isChecked
      } else {
        item.isChecked = false
      }
    })

    this.setData({
      couponList: couponList
    })
    wx.stopPullDownRefresh()
    wx.hideNavigationBarLoading()

    wx.setStorageSync('__selectedCouponId__', userCouponId)
    wx.setStorageSync('__selectedCouponName__', userCouponName)
    wx.navigateBack({})

  },
  noUseEnv() {
    wx.setStorageSync('__selectedCouponId__', '-1')
    wx.navigateBack({})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('onload')
    let userCouponId1 = options.userCouponId
    this.setData({
      userCouponId1: userCouponId1
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log('onshow')
    let couponList = wx.getStorageSync('__couponList__')
    let { availableCouponList, unavailableCouponList } = couponList
    let userCouponId = wx.getStorageSync("__selectedCouponId__") || this.data.userCouponId1
    availableCouponList.forEach(function (item, index) {
      item.fullAmount = parseInt(item.fullAmount)
      item.giveAmount = parseInt(item.giveAmount)
      item.isChecked = false
      item.canClick = '1'
      if (item.userCouponId == userCouponId) {
        item.isChecked = true
      }

    })
    unavailableCouponList.forEach(function (item) {
      item.fullAmount = parseInt(item.fullAmount)
      item.giveAmount = parseInt(item.giveAmount)
      item.isChecked = false
      item.canClick = '0'
    })
    couponList.availableCouponList = availableCouponList
    couponList.unavailableCouponList = unavailableCouponList
    // if (availableCouponList && availableCouponList.length>0){
    //   availableCouponList[0].isClick = true
    // }

    this.setData({
      couponList: couponList
    })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // this._showLoading()
    wx.showNavigationBarLoading()
    setTimeout(function () {
      wx.stopPullDownRefresh()
      wx.hideNavigationBarLoading()
    }, 500)

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})