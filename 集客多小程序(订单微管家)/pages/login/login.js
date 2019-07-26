import { getToken, getWechatCode, getWeiXinUserInfo , bindMobile, bindWXPhone} from '../../api/api.js'
import { baseUrl } from '../../etc/config.js'

const ANI_TIME_MASKLAYER = 260
const ANI_TIME_AREAPICKER = 260

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    isShowProductSpecSelectPlain: false,
    iphoneCode: '',
    isReadyLogin: false
  },

  _showSpecSelectPlain() {
    this.setData({
      isShowProductSpecSelectPlain: true
    })

    this.ani_productSpecSelectPlain.opacity(1).translate3d(0, 0, 0).step();
    this.setData({
      productSpecSelectPlainAni: this.ani_productSpecSelectPlain.export()
    })

    this._getElementSize('#productSpecSelectPlain').then(res => {
      this.setData({
        productSpecSelectPlainHeight: res.height
      })
    })
  },

  _hideSpecSelectPlain() {
    // this._clearSelectedSpec()

    this.ani_productSpecSelectPlain.translate3d(0, this.data.productSpecSelectPlainHeight, 0).step()
    this.setData({
      productSpecSelectPlainAni: this.ani_productSpecSelectPlain.export()
    })

    let timer = setTimeout(() => {
      this.setData({
        isShowProductSpecSelectPlain: false
      })
      clearTimeout(timer)
    }, ANI_TIME_AREAPICKER)
    console.log('_hideSpecSelectPlain')
    // this.setTimer(this.data.top)
  },

  _initAnimation() {
    this.ani_maskLayer = wx.createAnimation({
      duration: ANI_TIME_MASKLAYER,
      timingFunction: 'linear',
      delay: 0
    })

    this.ani_areaPicker = wx.createAnimation({
      duration: ANI_TIME_AREAPICKER,
      timingFunction: 'linear',
      delay: 0
    })

    this.ani_transExplain = wx.createAnimation({
      duration: ANI_TIME_AREAPICKER,
      timingFunction: 'linear',
      delay: 0
    })

    this.ani_productIntroInfo = wx.createAnimation({
      duration: ANI_TIME_AREAPICKER,
      timingFunction: 'linear',
      delay: 0
    })

    this.ani_productSpecSelectPlain = wx.createAnimation({
      duration: ANI_TIME_AREAPICKER,
      timingFunction: 'linear',
      delay: 0
    })

  },

  _showMaskLayer() {
    this.setData({
      isShowMaskLayer: true
    })
    this.ani_maskLayer.opacity(1).step()
    this.setData({
      maskLayerAni: this.ani_maskLayer.export()
    })
  },

  _showMaskLayer() {
    this.setData({
      isShowMaskLayer: true
    })
    this.ani_maskLayer.opacity(1).step()
    this.setData({
      maskLayerAni: this.ani_maskLayer.export()
    })
  },

  _clickMaskLayer(){
    this._hideMaskLayer()
    this._hideTransExplains()
    // this._hideAreaPicker()  //移除功能
    this._hideProductIntroInfo()
    this._hideSpecSelectPlain()   
    this.setData({
      showDetail: false
    })
  },

  _hideProductIntroInfo() {
    this.ani_productIntroInfo.translate3d(0, this.data.productIntroInfoHeight, 0).step()
    this.setData({
      productIntroInfoAni: this.ani_productIntroInfo.export()
    })

    let timer = setTimeout(() => {
      this.setData({
        isShowProductIntroInfo: false
      })
      clearTimeout(timer)
    }, ANI_TIME_AREAPICKER)
  },

  _hideMaskLayerAni() {
    this.ani_maskLayer.opacity(0).step()
    this.setData({
      maskLayerAni: this.ani_maskLayer.export()
    })

    let timer = setTimeout(() => {
      this.setData({
        isShowMaskLayer: false
      })
      clearTimeout(timer)
    }, ANI_TIME_MASKLAYER)

  },

  _hideMaskLayer() {
    this._hideMaskLayerAni()

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
  showIphoneCodeBox(e) {
    this.setData({
      collageId: ''
    })
    this.setData({
      postType: '0',
      isCollageBuy: false
    })
    this._showSpecSelectPlain()
    this._showMaskLayer()
  },

  _getElementSize(element) {
    return new Promise((resolve, reject) => {
      wx.createSelectorQuery().select(element).boundingClientRect(res => {
        // console.log('当前元素大小')
        // console.log(res)
        resolve(res)
      }).exec()
    })

  },

  _hideTransExplains() {
    this.ani_transExplain.translate3d(0, this.data.transExplainsHeight, 0).step()
    this.setData({
      transExplainAni: this.ani_transExplain.export()
    })

    let timer = setTimeout(() => {
      this.setData({
        isShowTransExplains: false
      })
      clearTimeout(timer)
    }, ANI_TIME_AREAPICKER)

  },

  setIphoneCode(e) {
    this.setData({
      iphoneCode: e.detail.value
    })
  },

  checkIphoneCode(e) {
    // console.log(this.data.iphoneCode)
    let params = {
      mobile: this.data.iphoneCode
    }
    bindMobile(params).then(response => { 
      console.log(response)
      if (response.statusCode == 200) {
        let productId = wx.getStorageSync('productId')
        let storeUserId = wx.getStorageSync('shareUserSecret')

        // wx.redirectTo({
        //   url: '/pages/productDetail/productDetail?productId='+productId+'&shareUserSecret='+storeUserId,
        // })

      } else {
        wx.showToast({
          title: response.msg
        });
      }
    })
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
          console.log('返回数据',res)
          if (res.data.code == 1) {
            this.setData({
              collageId: ''
            })
            this.setData({
              postType: '0',
              isCollageBuy: false
            })
            // this._showSpecSelectPlain()
            // this._showMaskLayer()

            this.setData({
              isReadyLogin: true
            })


            // let productId = wx.getStorageSync('productId')
            // let storeUserId = wx.getStorageSync('shareUserSecret')
            
            // wx.redirectTo({
            //   url: '/pages/productDetail/productDetail?productId='+productId+'&shareUserSecret='+storeUserId,
            // })

            // if (productId && productId !='' && storeUserId && storeUserId !='') {
            //   wx.redirectTo({
            //     url: `/pages/productDetail/productDetail?productId=${productId}`+`storeUserId='nuiThCdd'`,
            //   })
            // }

            // console.log(productId)

            // wx.setStorageSync('userId', res.data.userInfo.userId)
            // if (res.data.isBindMobile == 1) {
            //   let share = wx.getStorageSync('share')
            //   if (share) {
            //     console.log('todetail')
            //     wx.redirectTo({
            //       url: `/pages/groupDetail/groupDetail?collageId=${share}`,
            //     })
            //     return
            //   }
            //   wx.switchTab({
            //     url: '/pages/productDetail/productDetail?productId=3',
            //   })
            // } else {
            //   wx.redirectTo({
            //     url: `/pages/innerLogin/innerLogin?codeKey=${response.data.codeKey}`,
            //   })
            // }

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

  getPhoneNumberEnv(e) {
    console.log(e)
    let detail = e.detail
    if (detail.errMsg.indexOf('ok') == '-1') {
      wx.showModal({
        title: '授权提示',
        content: '请同意授权获取您的手机号码，以便为你提供更好的服务',
      })
    } else {
      let params = {
        encryptedData: detail.encryptedData,
        iv: detail.iv,
        codeKey: this.data.codeKey
      }

      bindWXPhone(params).then(res => {
        console.log(res)
        if (res) {

          let productId = wx.getStorageSync('productId')
          let storeUserId = wx.getStorageSync('shareUserSecret')
          wx.redirectTo({
            url: '/pages/productDetail/productDetail?productId='+productId+'&shareUserSecret='+storeUserId,
          })
          // let share = wx.getStorageSync('share')
          // if(share){
          //   wx.redirectTo({
          //     url: `pages/groupDetail/groupDetail?collageId=${share}`,
          //   })
          //   return
          // }
          // wx.showToast({
          //   title: res.data.msg,
          //   icon: 'success'
          // })
          // setTimeout(() => {
          //   wx.switchTab({
          //     url: '/pages/home/home',
          //   })
          // }, 1500)
        }
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
    this._initAnimation()
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