// pages/userInfo/verify/verify.js

import { sendCode, modifyMobile } from '../../../api/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber: '',
    smsCode: '',
    isClick: true,
    codeText: '获取验证码'
  },

  phoneNumberEnv(e) {
    this.setData({
      phoneNumber: e.detail.value
    })
  },

  smsCodeEnv(e) {
    this.setData({
      smsCode: e.detail.value
    })
  },

  sendCodeEnv() {
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
      tamp--
      this.setData({
        codeText: `${tamp}s后重新获取`
      })
    }, 1000)
    let params = {
      mobile: this.data.phoneNumber,
      codeType: 3
    }

    sendCode(params).then(res => {
      console.log(res)
      if (res.data.code !== '1') {
        this._showMsg(res.data.msg)
        this.data.isClick = true
        this.setData({
          codeText: `获取验证码`
        })
        clearInterval(timer)
        return
      }
      this._showMsg(res.data.msg)
    })
  },

  bindPhoneEnv() {
    if (!this.data.phoneNumber) {
      this._showMsg('请填写手机号码')
      return
    }
    if (!this.data.smsCode) {
      this._showMsg('请填写验证码')
      return
    }

    let params = {
      mobile: this.data.phoneNumber,
      smsCode: this.data.smsCode
    }
    modifyMobile(params).then(res => {
      console.log(res)
      if (res.data.code !== '1') {
        this._showMsg(res.data.msg)
        return
      }
      wx.navigateTo({
        url: '/pages/userInfo/bindNewPhone/bindNewPhone',
      })
    })
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
  onLoad: function (options) {
    this.setData({
      phoneNumber: options.phoneNumber || ''
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