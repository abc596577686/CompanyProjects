import { saveAddressDetails, saveIdentityInfo, getRegionList, deleteAddress } from '../../api/api.js'
import { baseUrl, err_ok } from '../../etc/config.js'

const ANI_TIME_MASKLAYER = 260
const ANI_TIME_AREAPICKER = 260

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 提示余额
    // 遮罩层
    isShowMaskLayer: false,

    // 商品类型 0:跨境商品  1:直邮商品
    // isDirectMail: true,

    // 身份证照片
    isShowPhotoOfIdCard: true,
    frontImg: '',
    backImg: '',
    // isShower: true,
    // isShow : true,

    // 个人信息
    name: '',
    mobile: '',
    provinceId: '310000',
    cityId: '310100',
    areaId: '310117',
    address: '',
    zipcode: '451200',
    identityNo: '',
    isDefault: true,
    flag : true,
    identityName: '',

  },

  _showModal() {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: '提示',
        content: '删除后无法恢复，确定删除吗？',
        success: (res => {
          console.log(res)
          if (res.confirm) {
            resolve()
          }
          if (!res.confirm) {
            reject()
          }
        })
      })
    })
  },

  deleteAddressEnv() {
    this._showModal().then(res => {
      wx.showLoading({
        title: '请稍后…',
      })
      let params = {
        addressId: this.data.curEditAddress.addressId
      }
      deleteAddress(params).then(res => {
        wx.hideLoading()
        console.log('删除地址结果')
        console.log(res)
        if (res.data.code === '1') {
          wx.showToast({
            title: res.data.msg,
          })
          let timer2 = setTimeout(res => {
            wx.navigateBack({})
            clearTimeout(timer2)
          }, 500)
        }
      })
      .catch(res => {
        this._timeout()
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

    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        console.log('已选择')
        console.log(res)
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

  switchChangeEnv(e) {
    console.log(e)
    let value = e.detail.value
    this.setData({
      isDefault: value
    })
  },

  _checkForm(e) {
    let name = e.detail.value.username
    let mobile = e.detail.value.mobile
    let fullAddress = this.data.fullAddress
    let address = e.detail.value.address
    let identityNo = e.detail.value.identityNo
    let identityName = e.detail.value.identityName

    if (name === '') {
      this._showMsg('请填写收货人姓名')
      return false
    }
    if (mobile === '') {
      this._showMsg('请填写收货人手机号')
      return false
    }
    if (!fullAddress) {
      this._showMsg('请选择收货人地址')
      return false
    }
    if (address === '') {
      this._showMsg('请填写收货人详细地址')
      return false
    }
    if (identityNo === '') {
      this._showMsg('请填写身份证号码')
      return false
    }
    if (identityName === '') {
      this._showMsg('请填写身份证号码对应的姓名')
      return false
    }

    return true
  },

  saveAddressEnv(e) {
    console.log(e)
    if (!this._checkForm(e)) return

    let params = {}
    // 如果是直邮商品需要上传身份证照片
    params = {
      name: e.detail.value.username,
      mobile: e.detail.value.mobile,
      address: e.detail.value.address,
      provinceId: this.data.addressIds[0],
      cityId: this.data.addressIds[1],
      areaId: this.data.addressIds[2],
      isDefault: this.data.isDefault ? '1' : '0',
      zipcode: ''
    }
    if (this.data.handleType === '1') {
      params['addressId'] = this.data.curEditAddress.addressId
    }
    if (this.data.handleType === '0') {

    }
    if(this.data.flag){
      saveAddressDetails(params).then(res => {
        console.log('保存收货人信息：')
        console.log(res)

        if (res.data.code === '0') {
          this._showMsg(res.data.msg)
          return;
        }

        if (res.data.code === '1') {
          this.setData({
            flag : false
          })
          wx.showToast({
            title: '保存成功',
            icon: 'none',
          })

          let timer = setTimeout(() => {
            wx.navigateBack({})
            clearTimeout(timer)
          }, 500)
          return;
        }
      })
        .catch(res => {
          this._timeout()
        })
    }
  },

  _setAddress(handleType) {
    return new Promise((resolve, reject) => {
      let provinceId, cityId, areaId, fullAddress, address

      if (handleType === '1') {
        let curEditAddress = this.data.curEditAddress = wx.getStorageSync('__curEditAddress__')
        provinceId = curEditAddress.provinceId
        cityId = curEditAddress.cityId
        areaId = curEditAddress.areaId
        fullAddress = curEditAddress.provinceName + '、' + curEditAddress.cityName + '、' + curEditAddress.areaName
        address = curEditAddress.address

        this.setData({
          fullAddress: fullAddress
        })
      }

      // 默认不显示省市区
      if (handleType === '0') {
        provinceId = null
        cityId = null
        areaId = null
        address = ''
      }

      this.setData({
        address: address,
        addressIds: [provinceId, cityId, areaId]
      })

      resolve(this.data.addressIds)
    })

  },

  _getRegionList(addressIds) {

    let regionList = wx.getStorageSync('__regionList__')
    this.setData({
      regionList: regionList,
    })

    // 通过id找到对应的索引值
    this._getIndexForId(addressIds).then(addressIndex => {
      console.log('得到当前的省市区索引')
      console.log(addressIndex)

      this.setData({
        addressIndex: addressIndex
      })
    })

  },

  _getIndexForId(addressIds) {
    console.log(addressIds)
    return new Promise((resolve, reject) => {
      // if (!this.data.addressId) return

      let curIndexs = []
      let provinceIndex, cityIndex, areaIndex
      let provinceId = addressIds[0] ? addressIds[0] : '310000'
      let cityId = addressIds[1] ? addressIds[1] : '310100'
      let areaId = addressIds[2] ? addressIds[2] : null

      console.log(provinceId)
      console.log(cityId)
      console.log(areaId)

      this.data.regionList.forEach((province, provinceIndex) => {
        if (province.areaId === provinceId) {
          curIndexs.push(provinceIndex + '')
          province.childrenList.forEach((city, cityIndex) => {
            if (city.areaId === cityId) {
              curIndexs.push(cityIndex + '')
              if (areaId) {
                city.childrenList.forEach((area, areaIndex) => {
                  if (area.areaId === areaId) {
                    curIndexs.push(areaIndex + '')
                  }
                })
              } else {
                curIndexs.push('0')
              }
            }
          })
        }
      })
      resolve(curIndexs)
    })
  },


  _submitEnv(e) {
    // console.log('提交事件')
    // console.log(e)

    this._changeAddressIds(this.data.addChangeData)
    this._changeAddress(this.data.addChangeData)
    this.data.isSelectedAddress = true

    this._hideAreaPicker()
    // this._hideMaskLayer()
  },

  _cancelEnv(e) {
    // console.log('取消事件')
    // console.log(e)

    this._hideAreaPicker()
  },

  _changeEnv(e) {
    console.log('地址改变')
    console.log(e)
    this.data.addChangeData = e
  },

  _changeAddress(e) {
    let provinceName = e.detail.provinces.areaName
    let cityName = e.detail.citys.areaName
    let areaName = e.detail.area.areaName
    let fullAddress = provinceName + '、' + cityName + '、' + areaName

    this.setData({
      fullAddress: fullAddress
    })
  },

  _changeAddressIds(e) {
    let provinceId = e.detail.provinces.areaId
    let cityId = e.detail.citys.areaId
    let areaId = e.detail.area.areaId

    this.setData({
      addressIds: [provinceId, cityId, areaId]
    })
  },

  _showAreaPickerEnv() {
    this._showAreaPicker()
  },

  _showAreaPicker() {
    this._showMaskLayer()


    this.ani_areaPicker.opacity(1).translate3d(0, 0, 0).step();
    this.setData({
      showAnimationData: this.ani_areaPicker.export()
    })

    this._getElementSize('#pickerContainer').then(res => {
      this.setData({
        areaPickerHeight: res.height
      })
    })
  },

  _hideAreaPicker() {
    this._hideMaskLayer()
    this.ani_areaPicker.opacity(0).translate3d(0, this.data.areaPickerHeight, 0).step()
    this.setData({
      showAnimationData: this.ani_areaPicker.export()
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

  _hideMaskLayer() {
    this._hideMaskLayerAni()
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

  _clickMaskLayer() {
    this._hideMaskLayer()
    this._hideAreaPicker()
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
  },

  _showLoading() {
    this.setData({
      isLoading: true
    })
  },

  _hideLoading() {
    this.setData({
      isLoading: false
    })
  },

  _timeout() {
    this._hideLoading()
    this.setData({
      timeout: true
    })
  },

  _fillInfo() {
    let curEditAddress = wx.getStorageSync('__curEditAddress__')
    this.setData({
      name: curEditAddress.name,
      mobile: curEditAddress.mobile,
      identityNo: curEditAddress.identityNo == 'undefined' ? '' : curEditAddress.identityNo,
      identityName: curEditAddress.identityName == 'undefined' ? '' : curEditAddress.identityName,
      isDefault: curEditAddress.isDefault == '1' ? true : false,
      frontImg: curEditAddress.identityFrontRelative ? curEditAddress.identityFrontRelative : '',
      backImg: curEditAddress.identityBackRelative ? curEditAddress.identityBackRelative : '',
      zipcode: curEditAddress.zipcode ? curEditAddress.zipcode : '',
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
  onLoad(options) {
    console.log('onLoad', options)

    let handleType = this.data.handleType = options.handleType
    let productType = options.productType

    console.log('类型', productType)
    
    let identityNo = options.identityNo == 'undefined' ? '' : options.identityNo
    let identityName = options.identityName == 'undefined' ? '' : options.identityName
    let idImgFront = options.idImgFront?options.idImgFront:''
    let idImgBack = options.idImgBack?options.idImgBack:''
    let userCenter = options.userCenter?options.userCenter:''
    console.log('类型',productType)
    // this.setData({
    //   productType : productType,
      // identityNo: identityNo,
      // identityName: identityName,
      // idImgFront: idImgFront,
      // idImgBack : idImgBack,
      // userCenter : userCenter
    // })

    // 操作地址信息
    this._setAddress(handleType).then((addressIds) => {
      console.log('获取的区域id')
      console.log(addressIds)
      this._getRegionList(addressIds) //获取区域列表
    })

    // 操作其他信息
    if (handleType === '1') { //编辑
      this._fillInfo()
      this.setData({
        isShowDelete: true
      })
    }
    if (handleType === '0') { //添加
      this.setData({
        isShowDelete: false
      })
    }

    this._initAnimation()
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
    // console.log('onShow')
    // if (this.data.productType) {
    //   console.log(111)
    //   this.saveAddressEnv(e)
    // }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // console.log('onHide')
    // if (this.data.productType){
    //   console.log(111)
    //   this.saveAddressEnv()
    // }

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
