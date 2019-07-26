// pages/cart/firmOrder/coupon/coupon.js
import {
  getCouponList
} from '../../../api/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: '0',
    isCollapse: false,
    active: '',
    showList: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {},
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this._getMyCouponList()
    this._showLoading() 
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
    this._showLoading()
    let status = this.data.show
    this._getMyCouponList(status)

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

  },
  /*tab栏切换*/
  changePage(e) {
    console.log(e)
    let status = e.currentTarget.dataset.change
    console.log('status', status)
    this._getMyCouponList(status)

  },
  /*下拉折叠*/
  changeCollapes(e) {
    console.log(e)
    if (this.data.active === e.currentTarget.dataset.id) {
      this.setData({
        active: ''
      })
      return
    }
    this.setData({
      active: e.currentTarget.dataset.id
    })

  },
  _getMyCouponList(status) {
    let params = {
      pageidx: '0',
      pagesize: '100',
      status: status || '0',
      lastId: '1'
    }
    getCouponList(params).then(res => {
      console.log('coupon', res)
      let couponList = res.data.dataList
      if (couponList.length == 0) {
        this.setData({
          showList: false
        })
      } else {
        this.setData({
          showList: true
        })
      }
      couponList.forEach(function(item) {
        item.fullAmount = parseInt(item.fullAmount)
        item.giveAmount = parseInt(item.giveAmount)
      })
      // this.getRestTime(couponList)
      this.setData({
        couponList: couponList,
        show: params.status
      })
      wx.stopPullDownRefresh()
      this._hideLoading()

    }).catch(res => {
      console.log(res)
    })
  },
  //获取剩余时间
  // getRestTime(list){

  //   var now = new Date().getTime()
  //   let five = 1000*60*60*24*5
  //   console.log(now)
  //   list.forEach(function(item){
  //     var effect = item.effectiveTime.replace(/-/g, '/')
  //     var until = new Date(effect).getTime()
  //     console.log(until)
  //     let rest = until - now
  //     if(rest <= five){
  //       item.effectiveTimeFormat = false
  //       item.rest = parseInt(rest / 1000 / 3600 / 24)
  //       console.log(11,item.rest)
  //     }
  //   })
  // },
  goSearch(e) {
    console.log(e)
    let couponId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/search/search?couponId=${couponId}`
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
  }
})