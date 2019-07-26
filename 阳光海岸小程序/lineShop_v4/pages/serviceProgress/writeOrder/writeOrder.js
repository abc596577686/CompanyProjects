import {
  getCustomerServerDetails,
  getExpressList,
  saveExpressNumber
} from '../../../api/api.js'

import { baseUrl, err_ok } from '../../../etc/config.js'

const MAX_IMG_NUM = 3

// pages/refund/writeOrder/writeOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [],
    imgListSends: [],
    expressCompanys: [{
        name: '申通快递',
        id: 0
      }, {
        name: '圆通速递',
        id: 1
      },
      '申通快递',
      '圆通速递',
      '中通快递', '百世汇通',
      '韵达快递', '顺丰快递',
      '其他'
    ],
    index: 0,
  },

  previewImgEnv(e) {
    console.log(e)
    let curImgUrl = e.currentTarget.dataset.imgurl
    wx.previewImage({
      // current: curImgUrl, // 当前显示图片的http链接
      urls: [curImgUrl] // 需要预览的图片http链接列表
    })
  },

  chooseImageEnv() {
    if (this.data.imgList.length >= MAX_IMG_NUM) {
      wx.showToast({
        title: '最多上传3张',
        icon: 'none'
      })
      return
    }
    wx.chooseImage({
      count: MAX_IMG_NUM,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        console.log('已选择')
        console.log(res)
        if (res.errMsg === 'chooseImage:ok') {
          let filesList = res.tempFilePaths
          // console.log(filesList)
          this._webUploadImage(filesList)
        } else {
          console.log('上传出错')
          console.log(res.errMsg)
        }
      }
    })
  },

  _webUploadImage(filesList) {
    console.log('开始上传')
    wx.showLoading({
      title: '上传中…',
    })

    filesList.forEach(file => {
      this._uploadFile(file).then(res => {
        if (res.userImageAbso) this.data.curImgCount++
        this.data.imgList.push(res.userImageAbso)
        this.data.imgListSends.push(res.userImage)

        this.setData({
          imgList: this.data.imgList
        })

        let header = getApp().globalData.requestHeader
        header['Content-Type'] = 'application/x-www-form-urlencoded'
      })
    })
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

  _checkForm() {
    if (this.data.expressNumber == '') {
      this._showMsg('请填写订单号')
      return false
    }
    if (this.data.expressExplain == '') {
      this._showMsg('请填写备注信息')
      return false
    }

    return true
    // if (!this.data.imgList.length) {
    //   this._showMsg('请上传图片')
    //   return false
    // }

  },

  formSubmit(e) {
    console.log(e)
    let detail = e.detail.value

    this.data.expressNumber = detail.orderNum
    this.data.expressCompany = this.data.expressCompanys[detail.company].companyName
    this.data.expressExplain = detail.remark

    if (!this._checkForm()) return

    let params = {
      refundId: this.data.refundId,
      expressNumber: this.data.expressNumber,
      expressCompany: this.data.expressCompany,
      expressExplain: this.data.expressExplain,
      expressImage1: this.data.imgList[0] ? this.data.imgList[0] : '',
      expressImage2: this.data.imgList[1] ? this.data.imgList[1] : '',
      expressImage3: this.data.imgList[2] ? this.data.imgList[2] : ''
    }

    console.log(params)

    saveExpressNumber(params).then(res => {
      console.log('提交申请', res)

      if (res.data.code === '1') {
        wx.showToast({
          title: '提交成功',
          icon: 'success'
        })
        let timer = setTimeout(() => {
          this._changePrePageData()
          wx.navigateBack({})
          clearTimeout(timer)
        }, 1600)

      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    })
  },

  _changePrePageData() {
    // 获取页面栈
    let pages = getCurrentPages()
    // console.log(pages)
    if (pages.length > 1) {
      let prePage = pages[pages.length - 2];
      // console.log(prePage)
      prePage._getCustomerServerDetails(this.data.itemId)
    }
  },

  _getCustomerServerDetails(itemId) {
    let params = {
      itemId: itemId
    }
    getCustomerServerDetails(params).then(res => {
      console.log('售后详情')
      console.log(res)

      if (res.data.code === '1') {
        this.setData({
          goodsInfo: res.data.data
        })
      }
    })
  },

  pickerChange(e) {
    console.log(e)
    let curIndex = e.detail.value - 0
    this.data.expressCompany = this.data.expressCompanys[curIndex].companyName
    this.setData({
      index : curIndex
    })
  },

  _getExpressList() {
    let params = {}

    getExpressList(params).then(res => {
      console.log('快递公司', res)

      if (res.data.code === '1') {
        this.setData({
          expressCompanys: res.data.dataList
        })
      }
    })
  },

  _showMsg(msg, time) {
    this.setData({
      msgTips: msg
    })
    let timer = setTimeout(() => {
      this.setData({
        msgTips: null
      })
      clearTimeout(timer)
    }, time || 1600)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options) {
      this.data.refundId = options.refundId
      this.data.itemId = options.itemId
    }
    this._getCustomerServerDetails(this.data.itemId)
    this._getExpressList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

})