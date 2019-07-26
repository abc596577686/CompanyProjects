import { getConfirmOrderDetail, confirmOrder, orderPay, saveAddressDetails, saveIdentityInfo } from '../../api/api.js'
import { randomString } from '../../utils/index.js'
import { baseUrl, err_ok } from '../../etc/config.js'
const ANI_TIME_MASKLAYER = 260

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowPayPanel: false,
    isShowMaskLayer: false,
    msgTips: '',
    showMask : false,
    frontImg : '',
    backImg : '',
    flag : true,
    identityName : '',
    identityNo: '',
    isShowIdBox : false,
    selectedCouponId : '0'

  },

  wxRequestPayment(payModel) {
    this._showLoading()
    return new Promise((resolve, reject) => {
      wx.requestPayment({
        timeStamp: payModel.timeStamp,
        nonceStr: payModel.nonceStr,
        package: payModel.package,
        signType: payModel.signType,
        paySign: payModel.paySign,
        success: res => {
          console.log('支付成功')
          console.log(res)
          resolve(res)
        },
        fail: res => {
          console.log('支付失败')
          console.log(res)
          reject(res)
        }
      })
    })
  },

  _paySuccess(res) {
    wx.showToast({
      title: '支付成功',
      icon: 'success',
      duration: 1600
    })

    setTimeout(() => {
      this._closePayPanelEnv()
      return
    }, 2000)
  },

  _payFail(res) {
    this._hideLoading()
    
    this.data.msg = '支付失败'
    if (res.errMsg == 'requestPayment:fail cancel') {
      this.data.msg = '支付取消'
    }
    wx.showToast({
      title: this.data.msg,
      icon: 'fail',
      duration: 1600
    })
    setTimeout(() => {
      this._closePayPanelEnv()
      return
    }, 2000)
  },

  paymentBtn() {
    this._showLoading()

    let params = {
      payType: 'weixin',
      orderId: this.data.orderId
    }
    orderPay(params).then(res => {
      
      this._hideLoading()
      console.log('获取支付信息：')
      console.log(res)

      if (res.data.code === '1') {
        let payModel = res.data
        this.wxRequestPayment(payModel.orderPayInfo).then(successMsg => {
          this._paySuccess(successMsg)
        })
        .catch(failMsg => {
          this._payFail(failMsg)
        })
      } else {
        this._showMsg(res.data.msg)
      }
    })
  },

  confirmOrderEnv() {
    if (!this.data.isHaveAddressInfo) {
      console.log('请选择收货地址')
      this._showTipsContainer()
      return
    }

    // 检测是否需要身份证信息
    if (this.data.productType == '2') {
      if (!this.data.isValidIdentity) {
        // this._showMsg('此商品为跨境商品，需要您本人身份证号码')
        this.setData({
          showMask : true
        })
        this._showIdBoxAni()
        this._showMaskLayer()
        return
      }
    }
    if(this.data.productType == '3'){
      if (!this.data.isValidIdentity) {
        // this._showMsg('此商品为直邮商品，需要您本人完整的身份证信息')
        this.setData({
          showMask : true
        })
        this._showIdBoxAni()
        this._showMaskLayer()
        return
      }
    }

    let params = {
      postType: this.data.postType,
      addressId: this.data.addressInfo.addressId,
      userCouponId: this.data.userCouponId||'0'
    }

    if (this.data.postType == '1') {
      params = Object.assign({}, params, {
        cartIds: this.data.cartIds,
        groupProductInfo: this.data.groupProductInfo || ''
      })
    }
    if (this.data.postType == '0') {
      params = Object.assign({}, params, {
        productId: this.data.productId,
        productSpecId: this.data.productSpecId || '',
        number: this.data.number,
        groupProductInfo: this.data.groupProductInfo || ''
      })
    }

    if (this.data.isSelectedCoupon) {
      params.userCouponId = this.data.selectedCouponId
    }

    this._confirmOrder(params)
  },

  _confirmOrder(params) {
    this._showLoading()
    confirmOrder(params).then(res => {
      console.log('提交订单')
      console.log(res)
      this._hideLoading()

      if (res.data.code === '1') {
        this.data.orderId = res.data.orderId
        this._showPayPanel()
      } else {
        this._showMsg(res.data.msg)
      }
      
    })
  },

  _initAnimation() {
    this.ani_payPanel = wx.createAnimation({
      duration: ANI_TIME_MASKLAYER,
      timingFunction: 'linear',
      delay: 0
    })
    this.ani_maskLayer = wx.createAnimation({
      duration: ANI_TIME_MASKLAYER,
      timingFunction: 'linear',
      delay: 0
    })
    this.ani_tipsContainer = wx.createAnimation({
      duration: ANI_TIME_MASKLAYER,
      timingFunction: 'linear',
      delay: 0
    })
    this.ani_idBox = wx.createAnimation({
      duration: ANI_TIME_MASKLAYER,
      timingFunction: 'linear',
      delay: 0
    })
  },

  _clickMaskLayer() {
    this._hidePayPanelAni()
    this._hideTipsContainerAni()
    this._hideMaskLayer()
    this._hideIdBoxAni()
  },

  _closePayPanelEnv() {
    this._hidePayPanelAni()
    this._hideMaskLayer()
    wx.redirectTo({
      url: `/pages/orderPayStatus/orderPayStatus?orderId=${this.data.orderId}`,
    })
  },

  _closeTipsPanelEnv() {
    this._hideTipsContainerAni()
    this._hideMaskLayer()
  },

  _showPayPanel() {
    this._showPayPanelAni()
    this._showMaskLayer()
  },

  _showTipsContainer() {
    this._showTipsContainerAni()
    this._showMaskLayer()
  },

  _showPayPanelAni() {
    this.setData({
      isShowPayPanel: true
    })

    this.ani_payPanel.opacity(1).translate3d(0, 0, 0).step();
    this.setData({
      payPanelAni: this.ani_payPanel.export()
    })

    this._getElementSize('#payPanel').then(res => {
      this.setData({
        payPanelHeight: res.height
      })
    })
  },
  _showIdBoxAni() {
    this.setData({
      isShowIdBox: true
    })

    this.ani_idBox.opacity(1).translate3d(0, 0, 0).step();
    this.setData({
      idBoxAni : this.ani_idBox.export()
    })

    this._getElementSize('#idBox').then(res => {
      this.setData({
        idBoxHeight: res.height
      })
    })
  },

  _showTipsContainerAni() {
    this.setData({
      isShowTipsContainer: true
    })

    this.ani_tipsContainer.opacity(1).scale(1).step();
    this.setData({
      tipsContainerAni: this.ani_tipsContainer.export()
    })

    this._getElementSize('#tipsContainer').then(res => {
      this.setData({
        tipsContainerHeight: res.height
      })
    })
  },
  

  _hidePayPanelAni() {
    console.log(this.data.payPanelHeight)
    this.ani_payPanel.opacity(0).translate3d(0, this.data.payPanelHeight, 0).step()
    this.setData({
      payPanelAni: this.ani_payPanel.export()
    })
  },
  _hideIdBoxAni() {
    this.ani_idBox.opacity(0).translate3d(0, this.data.idBoxHeight, 0).step()
    this.setData({
      idBoxAni: this.ani_idBox.export(),
      isShowIdBox : false
    })
  },
  

  _hideTipsContainerAni() {
    // console.log(this.data.tipsContainerAni)
    this.ani_tipsContainer.opacity(0).scale(.3).step()
    this.setData({
      tipsContainerAni: this.ani_tipsContainer.export()
    })
  },

  _hideMaskLayer() {
    console.log('hide')
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

  _showMaskLayer() {
    this.setData({
      isShowMaskLayer: true
    })
    this.ani_maskLayer.opacity(1).step()
    this.setData({
      maskLayerAni: this.ani_maskLayer.export()
    })
  },


  _getElementSize(element) {
    return new Promise((resolve, reject) => {
      wx.createSelectorQuery().select(element).boundingClientRect(res => {
        console.log('当前元素大小')
        console.log(res)
        resolve(res)
      }).exec()
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

  selectCouponEnv() {
    wx.navigateTo({
      url: `/pages/coupon/coupon?userCouponId=${this.data.userCouponId}`,
    })
  },

  _setAddressInfo(addressInfo) {
    this.setData({
      addressInfo: addressInfo
    })

    if (this.data.addressInfo.name.length) {
      this.setData({
        isHaveAddressInfo: true
      })
    } else {
      this.setData({
        isHaveAddressInfo: false
      })
    }

    console.log('当前收获地址信息: ')
    console.log(this.data.addressInfo)
  },

  _getConfirmOrderDetail() {
    let params = {}
    if (this.data.postType == '1') {
      params = {
        cartIds: this.data.cartIds,
        postType: this.data.postType,
        groupProductInfo: this.data.groupProductInfo || ''
      }
    } else {
      params = {
        number: this.data.number,
        postType: this.data.postType,
        productId: this.data.productId,
        productSpecId: this.data.productSpecId || '',
        groupProductInfo: this.data.groupProductInfo || ''
      }
    }

    if (this.data.isSelectedCoupon) {
      params.userCouponId = this.data.selectedCouponId
    }

    getConfirmOrderDetail(params).then(res => {
      this._hideLoading()
      console.log('订单详情：')
      console.log(res)

      if (res.data.code === '1') {
        this.setData({
          productList: res.data.data.productList,
          orderInfo: res.data.data,
          isValidIdentity: res.data.addressInfo.isValidIdentity == '1' ? true : false,
          couponList: res.data.coupon,
          productType : res.data.data.productType,
          userCouponId: res.data.data.useCouponId

          
        })

        console.log('商品列表')
        console.log(this.data.productList)

        console.log('优惠劵列表', res.data.coupon)
        wx.setStorageSync('__couponList__', res.data.coupon)
        console.log('优惠劵id',this.data.orderInfo.useCouponId)


        this.setData({
          isSelectAddress: false
        })
        
        // if (this.data.selectAddressInfo){
        //   this._setAddressInfo(this.data.selectAddressInfo)
        //   console.log(111)
          // this.setData({
          //   isValidIdentity: this.data.addressInfo.isValidIdentity
          // })
        // }else{
          this._setAddressInfo(res.data.addressInfo)
          console.log(222)
          
        // }
        
      }
      this._hideLoading()
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
  cancelBox(){
    this._hideMaskLayer()
    this._hideIdBoxAni()
  },
  saveAddressEnv(e) {
    console.log(111)
    if (!this._checkForm(e)) return

    let params = {}
    // 如果是直邮商品需要上传身份证照片
    params = {
      identityName: this.data.identityName,
      // name: this.data.addressInfo.username,
      // mobile: this.data.addressInfo.mobile,
      // address: this.data.addressInfo.address,
      identityNo: this.data.identityNo || '',
      identityFrontRelative: this.data.frontImg,
      identityBackRelative: this.data.backImg,
      productType: this.data.productType || '1',
      addressId: this.data.addressInfo.addressId

    }
  
    if (this.data.flag) {
      saveIdentityInfo(params).then(res => {
        console.log('保存收货人信息：')
        console.log(res)

        if (res.data.code === '0') {
          wx.showToast({
            title: res.data.msg,
            icon : 'none'
          })
          return;
        }

        if (res.data.code === '1') {
          this.setData({
            flag: false
          })
          wx.showToast({
            title: '保存成功',
            icon: 'none',
          })
          this._hideMaskLayer()
          this._hideIdBoxAni()
          this.setData({
            frontImg : '',
            backImg : ''
          })
          this._getConfirmOrderDetail()

          return;
        }
      })
        .catch(res => {
          this._timeout()
        })
    }
  },
  getName(e){
    console.log(e)
    let identityName = e.detail.value
    this.setData({
      identityName: identityName
    })

  },
  getIdNum(e){
    let identityNo = e.detail.value
    this.setData({
      identityNo: identityNo
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
        icon : 'none'
      })
      return false
    }
    if (identityNo == '') {
      wx.showToast({
        title: '请填写身份证号码',
        icon : 'none'
      })
      return false
    }
    if(this.data.productType=="3"){
      if(this.data.frontImg&&this.data.backImg){

      }else{
        wx.showToast({
          title: '请上传完整的身份照片',
          icon : 'none'
        })
        return false
      }
     
    }

    return true
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('onLoad',options)

    this._initAnimation()

    //每次购买清除一次
    wx.removeStorageSync('__selectedCouponId__')
    wx.removeStorageSync('__selectedCouponName__')

    this.data.number = options.number;
    this.data.postType = options.postType;
    this.data.productId = options.productId;
    this.data.productSpecId = options.productSpecId;
    this.data.cartIds = options.cartIds
    this.data.groupProductInfo = options.groupProductInfo
    // let userCouponId = options.userCouponId == undefined ? '' : options.userCouponId

    this.setData({
      number: this.data.number || '',
      postType: this.data.postType || '',
      productId: this.data.productId || '',
      productSpecId: this.data.productSpecId || '',
      cartIds: this.data.cartIds || '',
      // userCouponId: userCouponId || ''
    })
    // this._getConfirmOrderDetail()

    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    let selectAddressInfo = wx.getStorageSync('__selectAddress__')
    let selectedCouponId = wx.getStorageSync('__selectedCouponId__') || this.data.selectedCouponId
    // console.log(this.data.orderInfo.useCouponId)
    
    console.log(selectedCouponId)
    
    //默认渲染
    if (selectedCouponId=='0'){
      this._getConfirmOrderDetail()
    }

    if (selectAddressInfo) {
      this.setData({
        isSelectAddress: true
      })
    }

    if (selectedCouponId && selectedCouponId!='0') {
      this.setData({
        isSelectedCoupon : true,
        selectedCouponId: selectedCouponId,
        userCouponId: selectedCouponId
      },function(){
        this._getConfirmOrderDetail()
      })
      
    }

    if (this.data.isShowIdBox){
      this._showMaskLayer()
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log('onready触发了')

  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('hide')
    this._closeTipsPanelEnv()
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