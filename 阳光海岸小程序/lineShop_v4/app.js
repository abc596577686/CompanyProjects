//app.js
App({
  onLaunch() {
    // wx.clearStorage()
  },
  globalData: {
    requestHeader: {
      'XAccept-Encoding': 'true',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    userInfo: {},
    isIphoneX: false
  },
  onShow(options) {
    let that = this;
    wx.getSystemInfo({
      success: res => {
        console.log('客户端信息: ' + res.model)
        let modelmes = res.model;
        if (modelmes.search('iPhone X') != -1) {
          that.globalData.isIphoneX = true
        }
      }
    })

    // 检查请求query参数
    if (options.query && options.query.storeUserId){
      console.log(options.query.storeUserId)
      wx.setStorageSync('storeUserId', options.query.storeUserId)
    }
    console.log(options)
    console.log(1,this.globalData.userInfo)
  },
})
