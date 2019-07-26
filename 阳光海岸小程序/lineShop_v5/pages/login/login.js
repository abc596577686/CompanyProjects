import { getToken, getWechatCode, getWeiXinUserInfo } from '../../api/api.js'
import { baseUrl } from '../../etc/config.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false
  },

  getUserPhoneNumber() {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: '警告',
        content: '将获取您的手机号码',
        success: res => {
          if (res.confirm) {
            resolve('success')
          } else {
            reject('fail')
          }
        }
      })
    })
  },

  login() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: res => {
          resolve(res)
        },
        fail: res => {
          reject(res)
        }
      })
    })
  },

  setUserInfo(userInfo) {
    getApp().globalData.userInfo = userInfo
    // wx.setStorageSync('__userInfo__', userInfo)
  },

  getUserInfoEnv(e) {
    // wx.clearStorage()

    console.log('调起授权窗口')
    console.log("e",e)

    let userData = e.detail.userInfo
    let userInfo = {}

    if (userData) {
      userData = e.detail
      this.setUserInfo(e.detail.userInfo)
      wx.setStorageSync("userDetailMes", e.detail)
      let userInfo = getApp().globalData.userInfo

      console.log('用户同意授权信息')
      console.log('获取用户信息:')
      console.log(userInfo)

      wx.showToast({
        title: '登录中……',
        icon: 'loading'
      })
      let params = {
        code: this.data.code
      }
      getWechatCode(params).then(response => {
        console.log(response)
        let wxparams = {
          encryptedData: userData.encryptedData,
          iv: userData.iv,
          codeKey: response.data.codeKey + ''
        }
        getWeiXinUserInfo(wxparams).then(res => {
          console.log(123,res)
          if (res.data.code == 1) {
            wx.setStorageSync('userId', res.data.userInfo.userId)
            if (res.data.isBindMobile == 1) {
              let share = wx.getStorageSync('share')
              let sceneId =  wx.getStorageSync('sceneId')
              if (share) {
                console.log('todetail')
                wx.redirectTo({
                  url: `/pages/groupDetail/groupDetail?collageId=${share}`,
                })
                return
              }else if(sceneId != ''){
                wx.redirectTo({
                  url: `/pages/productDetail/productDetail?productId=${sceneId}`,
                })
              } else{
                wx.switchTab({
                  url: '/pages/home/home',
                })
              }
            } else {
              wx.redirectTo({
                url: `/pages/innerLogin/innerLogin?codeKey=${response.data.codeKey}`,
              })
            }

          } else {
            wx.showToast({
              title: res.data.msg
            })
          }
        }).catch(res => {
          // console.log('发送加密数据失败')
          console.log(res)
        })

      }).catch(res => {
        // console.log('发送失败：')
        // console.log(res)

        wx.showToast({
          title: res.msg
        })
      })
    }

  },

  getCode() {
    this.login().then(res => {
      console.log('login',res)
      this.data.code = res.code
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCode()
    // console.log('onLoad')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */


  onReady: function () {
    // console.log('onReady')

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log('onShow')
    // this.getCode()
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