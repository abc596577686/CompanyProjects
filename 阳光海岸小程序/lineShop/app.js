import WXBizDataCrypt from '/utils/WXBizDataCrypt.js'

//app.js
App({
  onLaunch() {
    let _this = this
    // 登录
    wx.login({
      success: res => {
        // console.log(res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          wx.request({
            url: `http://test.uzengroup.com/clt/user/weChatOauth.msp?appid=${_this.globalData.login.appid}&secret=${_this.globalData.login.secret}&js_code=${res.code}&grant_type=authorization_code`,
            data: {
              code: res.code
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
              'BDAccept-Encoding': 'jkd.uzengroup.com'
            },
            method: 'POST',
            success: function(res) {
              let pc = new WXBizDataCrypt(_this.globalData.login.appid, res.data.session_key)
              // wx.getUserInfo({
              //   success: function(res) {
              //     console.log(res)
              //     // let data = pc.decryptData(res.encryptedData, res.iv)
              //     // console.log('解密后的数据：' + data)
              //   },
              //   fail: function(res) {}
              // })
              // console.log(res)
            }
          })
        } else {
          console.log('登录失败:' + res.errMsg)
        }
      }
    })

  },

  getUserInfo(cb) {
    let _this = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      // 登录
      wx.login({
        success: function(res) {
          wx.getUserInfo({
            success: function(res) {
              console.log(res)
              _this.globalData.userInfo = res.userInfo
              typeof cb == 'function' && cb(_this.globalData.userInfo)
            },
            fail: function(res) {}
          })
        },
        fail: function(res) {}
      })
    }
  },
  globalData: {
    userInfo: null,
    login: {
      appid: 'wx72f51f3e0259c9c2',
      secret: '5dfc9dd32d5ac112aeb75fd975019120'
    }
  }
})