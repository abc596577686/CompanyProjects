// pages/insidePage/insidePage.js
import { getNavList } from '../../api/api.js'
// import { requestHeader } from '../../etc/config.js'
import { setJumpUrl } from '../../utils/index.js'

const requestHeader = getApp().globalData.requestHeader

Page({

  /**
   * 页面的初始数据
   */
  data: {
    insideData: [],
    headImageHeight: 0
  },
  _getNavList(channelId, pageId) {
    let params = {
      channelId: channelId,
      pageId: pageId
    }
    getNavList(params).then(res => {
      console.log(res)
      this.setData({
        insideData: setJumpUrl(res.data.list)
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    wx.setNavigationBarTitle({
      title: options.name,
    })

    this._getNavList(options.channelId, options.pageId)
    wx.setNavigationBarTitle({
      title: options.name
    })
  }
})