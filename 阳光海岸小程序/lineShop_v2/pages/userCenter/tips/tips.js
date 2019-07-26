// pages/userCenter/tips/tips.js
import { submitFeedback } from '../../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curNumber: 0,
    max: 150,
    content: '',
    mobile: '',
    flag: true
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

  },
  inputs: function (e) {
    let value = e.detail.value
    // console.log(e)
    let len = parseInt(value.length)
    if (len > this.data.max) return
    this.setData({
      curNumber: len,
      content: value
    })
  },
  getMobile(e) {
    let mobile = e.detail.value
    this.setData({
      mobile: mobile
    })
  },
  _submitFeedback() {
    if (this.data.flag) {
      let params = {
        content: this.data.content,
        mobile: this.data.mobile,
        ftype : 0
      }
      if (params.content == '') {
        wx.showToast({
          title: '内容不能为空',
          icon: 'none',
          duration: 800
        })
        return
      }
      submitFeedback(params).then(res => {
        console.log(res)
        if (res.data.code == '1') {
         setTimeout(function(){
           wx.showToast({
             title: res.data.msg,
             icon: 'none',
             duration: 800
           },1500)
         })
          this.setData({
            content: '',
            mobile: '',
            flag: false,
            curNumber : 0
          })
         
            wx.switchTab({
              url: '/pages/userCenter/userCenter',
          })
        }
      })
    }else{
      wx.showToast({
        title: '已经提交过问题了哦',
        icon : 'none',
        duration : 800
      })
    }
  }
})