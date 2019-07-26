import {
  sendCode,
  bindOtherPhone
} from '../../api/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    phoneNumber: '',
    codeNumber: '',
    isClick: true,
    codeText: '获取验证码'
  },

  getCodeEnv() {
    if (!this.data.phoneNumber) {
      this._showMsg('请填写手机号码')
      return
    }
    if (!this.data.isClick) {
      return
    }

    let tamp = 60
    let timer = setInterval(() => {
      this.data.isClick = false
      if (tamp <= 1) {
        this.data.isClick = true
        this.setData({
          codeText: `获取验证码`
        })
        clearInterval(timer)
        return
      }
      tamp --
      this.setData({
        codeText: `${tamp}s后重新获取`
      })
    }, 1000)

    let params = {
      mobile: this.data.phoneNumber,
      codeType: 4
    }
    sendCode(params).then(res => {
      console.log(res)
      if (res.data.code === '1') {
        this._showMsg(res.data.msg)
      }

    })
  },

  bingOtherPhoneEnv() {
    let params = {
      mobile: this.data.phoneNumber,
      smsCode: this.data.codeNumber
    }
    bindOtherPhone(params).then(res => {
      console.log(res)
      if (res.data.code === '1') {
        wx.showToast({
          title: '绑定成功',
          icon: 'success'
        })

        setTimeout(() => {
          wx.switchTab({
            url: '/pages/home/home',
          })
        }, 1200)
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'fail'
        })
      }
    })
  },

  inputValueEnv(e) {
    this.data.phoneNumber = e.detail.value
  },
  
  codeValueEnv(e) {
    this.data.codeNumber = e.detail.value
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
    if (detail.errMsg.indexOf('fail') != '-1') {
      wx.showModal({
        title: '授权提示',
        content: '请允许',
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

  _showMsg(msg, time) {
    this.setData({
      msgTips: msg
    })
    let timer = setTimeout(() => {
      this.setData({
        msgTips: null
      })
      clearTimeout(timer)
    }, time || 1600)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.codeKey = options.codeKey
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})