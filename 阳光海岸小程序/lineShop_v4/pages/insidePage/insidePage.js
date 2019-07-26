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
    headImageHeight: 0,
    isEmpty : false
  },
  _getNavList(channelId, pageId) {
    let params = {
      channelId: channelId,
      pageId: pageId
    }
    getNavList(params).then(res => {
      this._hideLoading()
      console.log(res)
      this.setData({
        insideData: setJumpUrl(res.data.list)
      })
      if (this.data.insideData.length == '0') {
        this.setData({
          isEmpty: true
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
  onLoad(options) {
    console.log(options)
    this._showLoading()
    
    this.setData({
      options :options
    })
    
    wx.setNavigationBarTitle({
      title: options.name
    })
   

   
  },
  onShow(){
    this._getNavList(this.data.options.channelId,this.data.options.pageId)
    clearInterval()
  }
})