// pages/logistics/logistics.js
import { getOrderPackageList } from '../../api/api.js'
import { formatTime, dateFormate } from '../../utils/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectActive: 0,
    packageList: [
    ]


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let orderId;
    if (options) {
      this.setData({
        orderId: options.orderId
      })
    }


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
    this._getOrderPackageList()
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
  selPack(e) {
    console.log(e)
    let active = e.currentTarget.dataset.index
    this.setData({
      selectActive: active
    })
  },
  _getOrderPackageList() {
    let params = { orderId: this.data.orderId }
    getOrderPackageList(params).then(res => {
      console.log('物流信息：', res)
      if (res.data.code === '1') {
        let packageList = res.data.packageList

        packageList.forEach(function (item) {
          item.productList.forEach(function (i) {
            i.price = (i.price-0).toFixed(2)
          })
          item.dataList.forEach(function (i) {
            i.createTime = dateFormate(item.createTime * 1000)

          })
          console.log(item.createTime)
          item.createTime = dateFormate(item.createTime * 1000)
        })
        this.setData({
          packageList: packageList
        })
      }
    })
  }
})