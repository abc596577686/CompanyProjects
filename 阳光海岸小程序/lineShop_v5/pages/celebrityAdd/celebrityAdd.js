// pages/celebrityList/celebrityList.js
import { baseUrl, err_ok } from '../../etc/config.js'
import { saveIdentityInfo} from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowMaskLayer: false,
    showExplainBox : true,
    showKnowMore : false,
    identityName : '',
    identityNo : '',
    frontImg : '',
    backImg : '',
    flag : true





  },
  _initAnimation() {
    this.ani_maskLayer = wx.createAnimation({
      duration: 300,
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
  _clickMaskLayer() {
    this._hideMaskLayer()
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
    }, 300)

  },

  _hideMaskLayer() {
    this._hideMaskLayerAni()

  },
  setIdentityName(e){
    console.log(e)
    this.data.identityName = e.detail.value

  },
  setIdentityNum(e){
    this.data.identityNo = e.detail.value

  },
  _uploadFile(file) {
    let header = getApp().globalData.requestHeader
    header.cookie = wx.getStorageSync('session')
    header['X-TOKEN'] = wx.getStorageSync('token')
    header['Content-Type'] = 'multipart/form-data'

    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: `${baseUrl}/clt/user/uploadImage.msp`,
        filePath: file,
        name: 'file',
        formData: {
          name: 'file'
        },
        header: header,
        success: res => {
          wx.hideLoading()
          header['Content-Type'] = 'application/x-www-form-urlencoded'

          console.log('发送图片至服务器')
          console.log(res)
          if (res.errMsg == 'uploadFile:ok') {
            resolve(JSON.parse(res.data))
          } else {
            reject(JSON.parse(res.data))
          }
        }
      })
    })
  },

  _webUploadImage(filesList) {
    console.log('开始上传')
    wx.showLoading({
      title: '上传中…',
    })

    filesList.forEach(file => {
      this._uploadFile(file).then(res => {
        if (this.data.uploadType === '0') {
          this.setData({
            frontImg: res.userImageAbso
          })
        }
        if (this.data.uploadType === '1') {
          this.setData({
            backImg: res.userImageAbso
          })
        }
      })
    })
  },

  upLoadEnv(e) {
    var that = this;
    console.log(e)
    this.data.uploadType = e.currentTarget.dataset.type
    // this._showMaskLayer()

    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        console.log('已选择')
        console.log(res)
        // this._showMaskLayer()
        if (res.errMsg === 'chooseImage:ok') {
          let filesList = res.tempFilePaths
          console.log(filesList)
          this._webUploadImage(filesList)

        } else {
          console.log('上传出错')
          console.log(res.errMsg)
        }
      }
    })
  },
  _checkForm(e) {
    let identityName = this.data.identityName
    let identityNo = this.data.identityNo
    let frontImg = this.data.frontImg
    let backImg = this.data.backImg

    if (identityName == '') {
      wx.showToast({
        title: '请填写收货人姓名',
        icon: 'none'
      })
      return false
    }
    if (identityNo == '') {
      wx.showToast({
        title: '请填写身份证号码',
        icon: 'none'
      })
      return false
    }
    // if (this.data.productType == "3") {
    //   if (this.data.frontImg && this.data.backImg) {

    //   } else {
    //     wx.showToast({
    //       title: '请上传完整的身份照片',
    //       icon: 'none'
    //     })
    //     return false
    //   }

    // }

    return true
  },
  _saveIdentityInfo(){

    if (!this._checkForm()) return

    let params = {}
    params = {
      certificationId: this.data.certificationId || '',
      identityName: this.data.identityName,
      identityNo: this.data.identityNo,
      identityFrontRelative: this.data.frontImg||'',
      identityBackRelative: this.data.backImg||'',
      isDefault: true
    }

    if (this.data.flag) {
      saveIdentityInfo(params).then(res => {
        if (res.data.code === '0') {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          return;
        }

        if (res.data.code === '1') {
          this.setData({
            flag: false
          })
         let timer = setTimeout(() => {
           wx.showToast({
             title: '保存成功',
             icon: 'none',
           })
           clearTimeout(timer)

         },300)
          this._hideMaskLayer()
          this.setData({
            frontImg: '',
            backImg: ''
          })
          
          wx.navigateBack({
            
          })
  }
      })
    }
  },
    

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    this._initAnimation()
    let edit = options.edit
    let userCenter = options.userCenter
    if(edit=="1"){
      let userInfo = wx.getStorageSync('userInfo')
      wx.removeStorageSync('userInfo')
      this.setData({
        certificationId: userInfo.certificationId,
        identityName: userInfo.identityName,
        identityNo: userInfo.realIdentityNo,
        frontImg: userInfo.identityFront,
        backImg: userInfo.identityBack,
      })
    }
    if(userCenter == '1'){
      this.setData({
        userCenter : userCenter
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
    // wx.removeStorageSync('userInfo')
    // if(this.data.userCenter == '1'){
    //   wx.navigateTo({
    //     url: '/pages/celebrityList/celebrityList',
    //   })
    // }

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