const app = getApp()

Page({
  data: {
    userInfo: null
  },
  onLoad() {
    let _this = this
    app.getUserInfo( userInfo => {
      _this.setData({
        userInfo: userInfo
      })
      console.log(userInfo)
    })
  }
})
