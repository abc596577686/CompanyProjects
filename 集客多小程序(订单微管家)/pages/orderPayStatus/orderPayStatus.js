import { getOrderDetail } from '../../api/api.js';

// pages/orderMes/orderMes.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  containueEnv() {
    wx.switchTab({
      url: '/pages/home/home',
    })
  },

  redirectToEnv() {
    wx.redirectTo({
      url: `/pages/orderDetail/orderDetail?orderId=${this.data.orderId}`,
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._showLoading()
    console.log(options)
    this.data.orderId = options.orderId
    console.log(this.data.orderId)

    let params = {
      orderId: this.data.orderId
    }
    getOrderDetail(params).then(res => {
      console.log('订单详情')
      console.log(res)
      if (res.data.code !== '1') {
        console.log('获取信息失败')
        return
      }

      this.setData({
        orderInfo: res.data.data
      })
      this._hideLoading()
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
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    getApp().globalData.goToDetail = false
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    getApp().globalData.goToDetail = false

  },
  

  // 

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
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