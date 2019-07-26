import { getCustomerServerDetails } from '../../api/api.js'

// pages/refund/refund.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList : {
      /*status0,1 代表退货和退款*/
      status:1,
      statusInfo : {
        /*退貨時0-4 代表退货步骤,'客服审核','寄回商品','平台收货','退货成功','交易关闭'*/
        /*退款時0-2 代表步驟,"客服审核","完成退款","交易關閉"*/
        statusStep : 3,
        goodName: "apple watch 表带运动手表带苹果精钢金属男女米兰42mm/38mm",
        goodImg : "",
        goodNum : 1,
        reason : "商品与页面描述不服",
        money : 398,
        problem : "商品寄过来是少的",
        promptMes: "您的售后申请已提交，客服将为您及时解决",
        promptime: "2017-01-18  00:02",
        promptHeader: "售后申请已提交"
      }
    },
    headerList : [
      ["填写申请","平台审核","完成退款"],
      ['填写申请', '平台审核', '寄回商品', '平台收货', '退货成功'],
      ["填写申请","平台审核","退款关闭"]
    ]
  },

  copyTextEnv() {
    wx.setClipboardData({
      data: this.data.refundStatusInfo.content,
      success: res => {
        wx.showToast({
          title: '复制成功',
          icon: 'success'
        })
      }
    })
  },

  reEditEnv() {
    wx.navigateTo({
      url: `/pages/serviceProgress/writeOrder/writeOrder?orderId=${this.data.orderId}&itemId=${this.data.itemId}&refundId=${this.data.refundId}`,
    })
  },

  reApplication() {  //再次申请
    console.log(this.data.orderId)
    console.log(this.data.itemId)

    wx.navigateTo({
      url: `/pages/customerService/customerService?orderId=${this.data.orderId}&itemId=${this.data.itemId}`,
    })
  },

  _generatar(refundInfo) {
    refundInfo.refundImages = []
    if (refundInfo.refundImage1.indexOf('upload/images') != '-1') {
      refundInfo.refundImages.push(refundInfo.refundImage1)
    }
    if (refundInfo.refundImage2.indexOf('upload/images') != '-1') {
      refundInfo.refundImages.push(refundInfo.refundImage2)
    }
    if (refundInfo.refundImage3.indexOf('upload/images') != '-1') {
      refundInfo.refundImages.push(refundInfo.refundImage3)
    }

    return refundInfo
  },

  previewImgEnv(e) {
    console.log(e)
    let curViewImgs = e.currentTarget.dataset.imgs
    wx.previewImage({
      // current: curImgUrl, // 当前显示图片的http链接
      urls: curViewImgs // 需要预览的图片http链接列表
    })
  },

  _getCustomerServerDetails(itemId) {
    let params = {
      itemId: itemId
    }
    getCustomerServerDetails(params).then(res => {
      console.log('售后详情')
      console.log(res)
      this._hideLoading()

      if (res.data.code === '1') {
        this.setData({
          refundStatusInfo: res.data.refundStatusContent,
          goodsInfo: res.data.data,
          refundInfo: this._generatar(res.data.data)
        })

        this.data.orderId = res.data.data.orderId
        this.data.itemId = res.data.data.orderItemId
        this.data.refundId = res.data.data.refundId

        /* 退款时设置 */
        if (this.data.refundInfo.refundType === '1') {
          this.data.dataList.status = 0

          // 申请中
          if (this.data.refundInfo.refundStatus == 1 || this.data.refundInfo.refundStatus == 7 || this.data.refundInfo.refundStatus == 8 || this.data.refundInfo.refundStatus == 9) {
            this.data.dataList.statusInfo.statusStep = 0
          }

          // 关闭
          if (this.data.refundInfo.refundStatus == 2 || this.data.refundInfo.refundStatus == 6) {
            this.data.dataList.statusInfo.statusStep = 2
          }

          // 完成
          if (this.data.refundInfo.refundStatus == 5) {
            this.data.dataList.statusInfo.statusStep = 1
          }
        }

        /* 退款/退货时设置 */
        if (this.data.refundInfo.refundType === '2') {
          this.data.dataList.status = 1

          // 客服审核
          if (this.data.refundInfo.refundStatus == 1) {
            this.data.dataList.statusInfo.statusStep = 0
          }

          // 审核未通过
          if (this.data.refundInfo.refundStatus == 2) {
            this.data.dataList.statusInfo.statusStep = 4
          }

          // 寄回商品
          if (this.data.refundInfo.refundStatus == 3) {
            this.data.dataList.statusInfo.statusStep = 1
          }

          // 平台收货
          if (this.data.refundInfo.refundStatus == 4 || this.data.refundInfo.refundStatus == 7 || this.data.refundInfo.refundStatus == 8 || this.data.refundInfo.refundStatus == 9) {
            this.data.dataList.statusInfo.statusStep = 2
          }

          // 退货成功
          if (this.data.refundInfo.refundStatus == 5) {
            this.data.dataList.statusInfo.statusStep = 3
          }
        }

        this.setData({
          dataList: this.data.dataList
        })

      }
      if (res.data.code === '0') {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
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
    console.log(options)
    this._getCustomerServerDetails(options.itemId || options.orderId)
    this._showLoading()
    
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