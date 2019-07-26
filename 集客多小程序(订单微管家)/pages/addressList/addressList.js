import { getAddressList, saveAddressDetails } from '../../api/api.js'


// pages/addressList/addressList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  _navigator(identityNo, idImgFront, idImgBack, identityName) {
    wx.navigateTo({
      url: `/pages/addressDetail/addressDetail?handleType=${this.data.handleType}&productType=${this.data.productType}&identityNo=${identityNo}&idImgFront=${idImgFront}&idImgBack=${idImgBack}&userCenter=${this.data.userCenter}&identityName=${identityName}`
    })
  },

  selectAddressEnv(e) {
    console.log(e)
    if (this.data.userCenter == '1') {
      return
    }
    wx.setStorageSync('__selectAddress__', e.currentTarget.dataset.addressinfo)
    this.saveAddressEnv(e.currentTarget.dataset.addressinfo)

    wx.navigateBack({})
  },

  editEnv(e) {
    let curEditAddress = e.currentTarget.dataset.cureditaddress
    console.log('cur', curEditAddress)
    let identityNo = curEditAddress.identityNo
    let idImgFront = curEditAddress.identityFrontRelative
    let idImgBack = curEditAddress.identityBackRelative
    let identityName = curEditAddress.realName
    wx.setStorageSync('__curEditAddress__', curEditAddress)

    this.data.handleType = '1'
    this._navigator(identityNo, idImgFront, idImgBack, identityName)
  },

  addEnv(e) {
    this.data.handleType = '0'
    this._navigator()
  },

  _getAddressList() {
    this._showLoading()
    let params = {
      pageidx: '',
      lastId: '',
      pagesize: '100',
      productType: this.data.productType
    }
    getAddressList(params).then(res => {
      console.log('收货地址列表')
      console.log(res)
      if (res.data.code === '1') {
        this._hideLoading()
        let dataList = res.data.dataList
        this.setData({
          addressList: dataList
        })
        wx.stopPullDownRefresh()
        return
      }
    })
    .catch(res => {
      this._timeout()
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
  saveAddressEnv(e) {
    let params = {}
    // 如果是直邮商品需要上传身份证照片
    params = {
      realName:e.realName != undefined ? e.realName: '',
      name: e.name,
      mobile: e.mobile,
      address: e.address,
      identityNo: e.identityNo?e.identityNo:'',
      provinceId: e.provinceId,
      cityId: e.cityId,
      areaId: e.areaId,
      identityFrontRelative: e.identityFrontRelative,
      identityBackRelative: e.identityBackRelative,
      isDefault: '1',
      productType: this.data.productType,
      zipcode: '',
      addressId : e.addressId
    }
    // if (this.data.handleType === '1') {
    //   params['addressId'] = this.data.curEditAddress.addressId
    // }
    // if (this.data.handleType === '0') {

    // }
    saveAddressDetails(params).then(res => {
      console.log('保存收货人信息：')
      console.log(res)

      // if (res.data.code === '0') {
      //   this._showMsg(res.data.msg)
      //   return;
      // }

      // if (res.data.code === '1') {
      //   wx.showToast({
      //     title: '保存成功',
      //     icon: 'none',
      //   })
      //   let timer = setTimeout(() => {
      //     wx.navigateBack({})
      //     clearTimeout(timer)
      //   }, 500)
      //   return;
      // }
    })
    .catch(res => {
      this._timeout()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('productType',options)
    this.data.productType = options.productType == undefined ? 1 : options.productType
    console.log(this.data.productType)

    this.data.userCenter = options.userCenter == undefined ? null : options.userCenter
    this.setData({
      productType : productType
    })

    this._showLoading()
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
    this._getAddressList();
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
    this._showLoading()
    this._getAddressList()
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