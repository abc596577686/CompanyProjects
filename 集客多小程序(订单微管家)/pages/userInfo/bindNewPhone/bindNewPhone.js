// pages/userInfo/bindNewPhone/bindNewPhone.js

import { sendCode, bindOtherPhone } from '../../../api/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber: '',
    smsCode: '',
    isBind: false,
    codeText: '获取验证码',
    isClick: true
  },

  phoneNumberEnv(e) {
    this.setData({
      phoneNumber: e.detail.value
    })
    this._checkIsBind()
  },

  smsCodeEnv(e) {
    this.setData({
      smsCode: e.detail.value
    })
    this._checkIsBind()
  },

  _checkIsBind() {
    if (!this.data.smsCode || !this.data.phoneNumber) {
      this.setData({
        isBind: false
      })
    } else {
      this.setData({
        isBind: true
      })
    }

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
      codeType: 4
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
    if (!this.data.isBind) {
      return;
    }

    let params = {
      mobile: this.data.phoneNumber,
      smsCode: this.data.smsCode
    }
    bindOtherPhone(params).then(res => {
      console.log(res)

      if (res.data.code !== '1') {
        this._showMsg(res.data.msg)
        return
      }
      this._showMsg(res.data.msg)
      
      let timer = setTimeout(() => {
        clearTimeout(timer);
        
        wx.switchTab({
          url: '/pages/userCenter/userCenter'
        })
      }, 1000)
      
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