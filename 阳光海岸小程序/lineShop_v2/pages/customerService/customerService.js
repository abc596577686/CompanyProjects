import { getRefundReasonList, webUploadImage, applyRefund } from '../../api/api.js';
import { baseUrl, err_ok } from '../../etc/config.js'

const MAX_IMG_NUM = 3

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index1: 0,
    index2: 2,
    imgList: [],
    imgListSends: [],
    curImgCount: 0,
    isSelected: true
  },

  submissionEnv() {
    if (!this.data.isSelected) {
      this._showMsg('请选择售后类型')
      return
    }

    if (!this._checkAmount()) {
      return
    }

    wx.showModal({
      title: '提示',
      content: '确认提交申请？',
      success: res => {
        if (res.confirm) {
          this._applyRefund().then(res => {
            console.log('提交申请结果')
            console.log(res)
            // this._changePrePageData()
            if(res.data.code === '1') {
              wx.redirectTo({
                url: `/pages/customerServiceResult/customerServiceResult?itemId=${this.data.itemId}`
              })
            }
            
          })
          .catch(res => {
            console.log(res)
            if (res.data.code === '0') {
              wx.showToast({
                title: res.data.msg,
                icon: 'none'
              })
            }
            if (res.data.code === '-1') {
              wx.showToast({
                title: res.data.msg,
                icon: 'none'
              })
            }
          })
        }
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

  _applyRefund() {
    return new Promise((resolve, reject) => {
      let params = {
        reasonId: this.data.reasonId,
        refundType: this.data.refundType,
        orderId: this.data.orderId,
        itemId: this.data.itemId,
        amount: this.data.inputMaxAmount,
        refundExplain: this.data.textAreaVal || '未填写',
        image1: this.data.imgListSends[0] || '',
        image2: this.data.imgListSends[1] || '',
        image3: this.data.imgListSends[2] || ''
      }

      applyRefund(params).then(res => {
        if (res.data.code === '1') {
          resolve(res)
        } else {
          reject(res)
        }
      })
    })

  },

  chooseImageEnv() {
    if (this.data.curImgCount >= MAX_IMG_NUM) {
      wx.showToast({
        title: `最多上传${MAX_IMG_NUM}张`,
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
      // .catch(res => {
      //   wx.showToast({
      //     title: '上传失败'
      //   })
      // })
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

  previewImgEnv(e) {
    console.log(e)
    let curImgUrl = e.currentTarget.dataset.imgurl
    wx.previewImage({
      // current: curImgUrl, // 当前显示图片的http链接
      urls: [curImgUrl] // 需要预览的图片http链接列表
    })
  },

  _checkAmount() {
    let tamp = true
    let inputMaxAmount = this.data.inputMaxAmount - 0
    let maxAmount = this.data.maxAmount - 0

    if (inputMaxAmount > maxAmount) {
      tamp = false
      this._showMsg('退款金额不能小于最大退款金额')
    }

    return tamp
  },

  inputBlurEnv(e) {
    console.log(e.detail.value)
    console.log(this.data.maxAmount)

    let newVal = e.detail.value - 0
    let maxAmount = this.data.maxAmount - 0

    this.setData({
      inputMaxAmount: newVal
    })

    if (!this._checkAmount()) {
      return
    }

  },

  bindPickerChange(e) {
    console.log(e)
    let curServiceIndex = e.detail.value
    console.log(curServiceIndex)

    this.setData({
      index1: curServiceIndex
    })

    this._setRefundType(this.data.index1)
  },

  bindReasonChange(e) {
    let curReasonIndex = e.detail.value
    console.log(curReasonIndex)

    let maxAmount = this.data.reasons[curReasonIndex].maxAmount
    this.setData({
      index2: curReasonIndex,
      maxAmount: maxAmount,
      inputMaxAmount: maxAmount
    })

    this._setReasonId(this.data.index2)
  },

  // onBlurEnv(e) {
  //   console.log(e)
  //   this.setData({
  //     textAreaVal: e.detail.value
  //   })
  // },

  onInput(e) {
    this.setData({
      textAreaVal: e.detail.value
    })
  },

  _setRefundType(index) {
    this.data.refundType = this.data.services[index].refundType
  },

  _setReasonId(index) {
    this.data.reasonId = this.data.reasons[index].reasonId
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
  onLoad: function (options) {
    console.log(options);
    this._showLoading()

    this.data.orderId = options.orderId || '' || 93096 || 93141
    this.data.itemId = options.itemId || '' || 98844 || 99210

    let params = {
      orderId: this.data.orderId,
      itemId: this.data.itemId
    }

    getRefundReasonList(params).then(res => {
      console.log('获取申请售后详情：', res)

      if (res.data.code !== '1') {
        this._showMsg(res.data.msg)
        return
      }

      this.setData({
        goodsInfo: {
          productImage: res.data.productImage,
          productName: res.data.productName,
          productTags: res.data.productTags,
          quantity: res.data.quantity
        }
      })

      let maxAmount = res.data.dataList[this.data.index2].maxAmount
      this.setData({
        services: res.data.refundTypeList,
        reasons: res.data.dataList,
        maxAmount: maxAmount,
        inputMaxAmount: maxAmount
      })

      this._setRefundType(this.data.index1)
      this._setReasonId(this.data.index2)
      this._hideLoading()

    })
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

})