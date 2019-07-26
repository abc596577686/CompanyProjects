// pages/innerLogin/innerLogin.js
import { bindWXPhone } from '../../api/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false
  },

  bingOtherPhoneEnv() {

  },

  bindOtherPhoneEnv() {
    wx.navigateTo({
      url: `/pages/mobileBind/mobileBind?codeKey=${this.data.codeKey}`,
    })
  },

  bindconfirmEnv(e) {
    console.log(e)
  },

  loginEnv() {
    wx.redirectTo({
      url: '/pages/home/home',
    })
  },

  getPhoneNumberEnv(e) {
    console.log(e)
    let detail = e.detail
    if (detail.errMsg.indexOf('ok') == '-1') {
      wx.showModal({
        title: '授权提示',
        content: '请同意授权获取您的手机号码，以便为你提供更好的服务',
      })
    } else {
      let params = {
        encryptedData: detail.encryptedData,
        iv: detail.iv,
        codeKey: this.data.codeKey
      }
      
      bindWXPhone(params).then(res => {
        console.log(res)
        if (res.data.code === '1') {
          wx.showToast({
            title: res.data.msg,
            icon: 'success'
          })
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/home/home',
            })
          }, 1500)
        } else {
          wx.switchTab({
            url: '/pages/home/home',
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.codeKey = options.codeKey
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