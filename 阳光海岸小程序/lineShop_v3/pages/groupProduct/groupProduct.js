import { getGroupProductList, checkBuy, addShoppingCart } from '../../api/api.js'
import { getElementSize } from '../../utils/index.js'
import Watch from '../../assets/plugins/watch.js'

const PRIMARY = 1
const SECONDARY = 2
const ANI_TIME_MASKLAYER = 260
const ANI_TIME_SELECTSPEC = 260

let watch //全局变量, 由实例化后的对象赋值

// pages/groupProduct/groupProduct.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // loading
    isLoading: false,

    // 遮罩层
    isShowMaskLayer: false,

    isSelectedSpecs: false,
    selectedSpecsText: '草莓、巧克力',

    // 商品数量编辑
    inputGoodsNum: 1,  //商品数量 初始化1个商品
    maxStockNum: 10,  //最大库存
    choiceGoodsMaxNum: 5, //可选的最大商品数
    isReduce: true,  //可以减少
    isAdd: true,  //可以增加

    // 商品规格选择
    isShowProductSpecSelectPlain: false,
    selectSpecType: [],
    selectedSpecType: [],
    primaryOldIndex: null,
    goodsSpecList: null, //处理后的规格
    selectedSpec: [],    //已选规格
  },

  watch: {
    inputGoodsNum(newVal, oldVal) {
      if (newVal === '') return;
      if (newVal <= 1) {
        this.setData({
          inputGoodsNum: 1
        })
      }
      if (newVal > this.data.maxStockNum) {
        this._showMsg('超过库存')
        this.setData({
          inputGoodsNum: this.data.oldValue
        })
        return
      }

      this.setData({
        oldValue: newVal
      })
    }
  },

  reduceNumEnv() {
    watch.setData({
      inputGoodsNum: this.data.inputGoodsNum - 1
    })
  },

  addNumEnv() {
    watch.setData({
      inputGoodsNum: this.data.inputGoodsNum + 1
    })
  },

  changeInputValEnv(e) {
    console.log(e)
    watch.setData({
      inputGoodsNum: e.detail.value
    })
  },

  confirmSelectEnv() {
    console.log('确定')

    if (!this._checkIsFinished()) {
      return
    }

    let groupIds = this._getGroupId(this.data.goodsList).join(',')
    console.log('当前组合商品ids：', groupIds)

    let params
    if (this.data.postType === '0') { //立即购买
      params = {
        productId: this.data.productId,
        groupProductInfo: groupIds,
        number: this.data.inputGoodsNum,
      }
      this._checkBuy(params)
    }

    if (this.data.postType === '1') { //购物车
      params = {
        productId: this.data.productId,
        groupProductInfo: groupIds,
        addNum: this.data.inputGoodsNum,
      }
      this._addShoppingCart(params)
    }
    
  },

  _checkBuy(params) {
    wx.showLoading({
      title: '订单提交中…',
      icon: 'loading'
    })
    checkBuy(params).then(res => {
      wx.hideLoading()
      console.log('验证结果: ', res)
      if (res.data.code === '1') {
        let navigatorUrl = `/pages/confirmOrder/confirmOrder?productId=${params.productId}&groupProductInfo=${params.groupProductInfo}&number=${params.number}&postType=${this.data.postType}`;

        wx.redirectTo({
          url: navigatorUrl
        })
      }
      if (res.data.code === '0') {
        this._showMsg(res.data.msg)
      }
    })
  },

  _addShoppingCart(params) {
    addShoppingCart(params).then(res => {
      console.log('添加购物车：', res)
      if (res.data.code === '1') {
        this._showMsg('添加购物车成功')
        this._changePrePageData(res.data.cartProductNumbers)

        setTimeout(() => {
          wx.navigateBack({})
        }, 1800)
      } else {
        this._showMsg(res.data.msg)
      }
    })
  },

  _changePrePageData(cartProductNumbers) {
    // 获取页面栈
    let pages = getCurrentPages()
    // console.log(pages)
    if (pages.length > 1) {
      let prePage = pages[pages.length - 2];
      // console.log(prePage)
      prePage.resetCartProductNumber(cartProductNumbers)
    }
  },

  _getGroupId(goodsList) {
    let groupGoodsIds = []
    goodsList.forEach(goods => {
      // console.log(goods.curProductId)
      if (goods.curProductId) {
        groupGoodsIds.push(goods.curProductId)
      } else {
        groupGoodsIds.push(goods.groupId)
      }
    })
    return groupGoodsIds
  },

  _checkIsFinished() {
    let temp = true
    this.data.goodsList.forEach(goods => {
      if (!goods.isSelectedFinish) {
        this._showMsg(`还有商品没有选择规格`)
        temp = false
      }
    })
    return temp
  },

  innerConfirmEnv() {
    if (this.data.curGoods.isSelectedFinish) {
      // this._showMsg('提交')
      this.closeSpecSelectPlainEnv()

      this.data.goodsList.splice(this.data.curIndex, 1, this.data.curGoods)

      this.setData({
        goodsList: this.data.goodsList
      })

      console.log('当前商品列表: ', this.data.goodsList)

    } else {
      if (this.data.curGoods.isSelected) {
        this._showMsg('请选择 ' + this.data.curGoods.tipSelectSpecTypes, 1600)
      } else {
        this._showMsg('请选择规格', 1600)
      }
      // this._hideLoading()
    }
  },

  checkGoodsStock(curGoods) {
    curGoods.productSpecList.forEach((curSpec, curIndex) => {
      if (curSpec.isSoldOut === '1') {
        curGoods.productSpecList.forEach((spec, index) => {
          if (curSpec.primarySpecId === spec.primarySpecId && spec.isSoldOut === '0') {
            curSpec.secondarySelected = true
          }
          if (curSpec.primarySpecId === spec.primarySpecId && spec.isSoldOut === '1') {
            spec.secondarySelected = true
          }
        })

      }
    })
  },

  changeSpecEnv(e) {
    console.log(e)

    this.actionSpecPanel(e, 0)
  },

  selectSpecEnv(e) {
    console.log(e)

    this.actionSpecPanel(e, 1)
  },

  actionSpecPanel(e, handleType) {
    this._showMaskLayer()
    this._showSpecSelectPlain()

    let curGoods = e.currentTarget.dataset.goods
    let curIndex = e.currentTarget.dataset.index
    let curImgUrl = e.currentTarget.dataset.goods.imageUrl

    let curSpecType = this._getGoodsSpecTypes(curGoods.productSpecList)
    curGoods.productSpecType = curSpecType

    if (handleType == 0) { // 修改
      // curGoods.selectedSpecType = []
      // curSpecType.forEach((item, index) => {
      //   curGoods.selectedSpecType.push(undefined)
      // })
    }

    if (handleType == 1) { // 选择
      curGoods.selectedSpecType = []
      curSpecType.forEach((item, index) => {
        curGoods.selectedSpecType.push(undefined)
      })
    }
    curGoods.specPrice = curGoods.price

    this.setData({
      curGoods: curGoods,
      curIndex: curIndex
    })

    console.log('当前商品：', this.data.curGoods)

    // 初始化无库存的设置为不可点击
    // this.checkGoodsStock(curGoods)
  },

  selectPrimarySpecEnvs(e) {
    let selectSpec = e.currentTarget.dataset.spec
    // console.log('选择的规格：', selectSpec)

    if (selectSpec.primaryDisabled) {
      this._showMsg('不可点击')
      return;
    }

    this.setSelectedSpec(e, PRIMARY)
  },

  selectSecondarySpecEnvs(e) {
    let selectSpec = e.currentTarget.dataset.spec
    console.log(selectSpec)

    if (selectSpec.secondaryDisabled) {
      this._showMsg('不可点击')
      return;
    }

    this.setSelectedSpec(e, SECONDARY)
  },

  setSelectedSpec(e, specType) {
    let selectSpec = e.currentTarget.dataset.spec
    let selectSpecIndex = e.currentTarget.dataset.index
    let oldSelectSecondaryIndex = this.data.curGoods.oldSelectSecondaryIndex;
    let oldSelectPrimaryIndex = this.data.curGoods.oldSelectPrimaryIndex;
    let selectSpecId;

    if (specType === SECONDARY) {
      selectSpecId = selectSpec.secondarySpecId
    }
    if (specType === PRIMARY) {
      selectSpecId = selectSpec.primarySpecId
    }

    console.log('选择的规格：', selectSpec)
    console.log('选择的索引：', selectSpecIndex)
    console.log('选择的规格id：', selectSpecId)

    if (specType === SECONDARY) {
      if (oldSelectSecondaryIndex === selectSpecIndex) {
        this._resetSelectedStyles(selectSpecId, specType)
        this._resetDisabledStyles(specType)

        this.data.curGoods.selectedSpecType[1] = undefined
      } else {
        this._setSelectedStyles(selectSpecId, selectSpecIndex, specType)
        this._setDisabledStyles(selectSpecId, specType)

        if (!this.data.curGoods.selectedSpecType[0]) {
          this.data.curGoods.selectedSpecType[0] = undefined
        }
        this.data.curGoods.selectedSpecType[1] = selectSpec.secondarySpecModelName
      }
    }

    if (specType === PRIMARY) {
      if (oldSelectPrimaryIndex === selectSpecIndex) {
        this._resetSelectedStyles(selectSpecId, specType)
        this._resetDisabledStyles(specType)

        this.data.curGoods.selectedSpecType[0] = undefined
      } else {
        this._setSelectedStyles(selectSpecId, selectSpecIndex, specType)
        this._setDisabledStyles(selectSpecId, specType)

        if (this.data.curGoods.selectedSpecType[1] && !this.data.curGoods.selectedSpecType[1]) {
          this.data.curGoods.selectedSpecType[1] = undefined
        }
        this.data.curGoods.selectedSpecType[0] = selectSpec.primarySpecModelName
      }
    }

    console.log('当前选择规格: ', this.data.curGoods.selectedSpecType)
    console.log('当前规格列表: ', this.data.curGoods.productSpecList)
    this.data.curGoods.specPrice = selectSpec.price

    // // 设置选中后的状态
    let temp = 0
    let isSelected = false, isSelectedFinish = false
    let tipSelectSpecTypes = ''
    let curProductId = ''
    let selectedSpecsText;

    this.data.curGoods.selectedSpecType.forEach((selectedItem, index) => {
      if (selectedItem) {
        temp++
      }
      if (!selectedItem) {
        tipSelectSpecTypes = this.data.curGoods.productSpecType[index]
        // console.log(tipSelectSpecTypes)
      }
    })
    // console.log('temp:', temp)

    if (this.data.curGoods.productSpecType.length === temp) {
      isSelected = true
      isSelectedFinish = true
    }

    if (temp > 0 && temp < this.data.curGoods.productSpecType.length) {
      isSelected = true
      isSelectedFinish = false
    }

    if (temp === 0) {
      isSelected = false
      isSelectedFinish = false
    }

    // // 设置规格图片
    if (isSelected) {
      this._getSpecImg().then(curSpecImg => {
        this.data.curGoods.specImage = curSpecImg
        // console.log('选择的图片' + curSpecImg)
      })
    } else {
      this._setDefaultImg()
    }

    if (isSelectedFinish) {
      // 当前选择的商品规格id
      this._getCurProductId().then(curProductId => {
        console.log('选择的商品id: ' + curProductId)
        curProductId = curProductId
        this._getSelectedSpecsText(curProductId).then(arr => {
          console.log(arr)

          selectedSpecsText = arr.join('、')
          this.data.curGoods.selectedSpecsText = selectedSpecsText
          console.log(selectedSpecsText)

          this.data.curGoods.curProductId = curProductId
        })
      })
    }

    this.data.curGoods.isSelected = isSelected
    this.data.curGoods.isSelectedFinish = isSelectedFinish
    this.data.curGoods.tipSelectSpecTypes = tipSelectSpecTypes

    this.setData({
      curGoods: this.data.curGoods
    })
    console.log('当前商品详情：', this.data.curGoods)

  },

  _resetSelectedStyles(selectSpecId, specType) {
    if (specType === SECONDARY) {
      let secondarySelected = selectSpecId
      // console.log(selectSpecId)

      this.data.curGoods.productSpecList.forEach((spec, index) => {
        spec.secondarySelected = false
      })
      this.data.curGoods.oldSelectSecondaryIndex = undefined
    }
    if (specType === PRIMARY) {
      let primarySelected = selectSpecId
      this.data.curGoods.productSpecList.forEach((spec, index) => {
        spec.primarySelected = false
      })
      this.data.curGoods.oldSelectPrimaryIndex = undefined
    }
  },

  _resetDisabledStyles(specType) {
    let args = ''
    if (specType === SECONDARY) {
      args = 'primaryDisabled'
    }
    if (specType === PRIMARY) {
      args = 'secondaryDisabled'
    }

    this.data.curGoods.productSpecList.forEach((spec, index) => {
      spec[args] = false
    })
  },

  _setSelectedStyles(selectSpecId, selectIndex, specType) {
    if (specType === SECONDARY) {
      this.data.curGoods.productSpecList.forEach((spec, index) => {
        if (selectSpecId === spec.secondarySpecId) {
          spec.secondarySelected = true
        } else {
          spec.secondarySelected = false
        }
      })
      this.data.curGoods.oldSelectSecondaryIndex = selectIndex
    }

    if (specType === PRIMARY) {
      this.data.curGoods.productSpecList.forEach((spec, index) => {
        if (selectSpecId === spec.primarySpecId) {
          spec.primarySelected = true
        } else {
          spec.primarySelected = false
        }
      })
      this.data.curGoods.oldSelectPrimaryIndex = selectIndex
    }
  },

  _setDisabledStyles(selectSpecId, specType) {
    if (specType === SECONDARY) {
      this.data.curGoods.productSpecList.forEach((spec, index) => {
        spec.primaryDisabled = false
      })
      this.data.curGoods.productSpecList.forEach((spec, index) => {
        if (spec.secondarySpecId === selectSpecId && spec.isSoldOut === '1') {
          this.data.curGoods.productSpecList.forEach(item => {
            if (spec.primarySpecId === item.primarySpecId) {
              item.primaryDisabled = true
            }
          })
        }
      })
    }
    if (specType === PRIMARY) {
      this.data.curGoods.productSpecList.forEach((spec, index) => {
        spec.secondaryDisabled = false
      })
      this.data.curGoods.productSpecList.forEach((spec, index) => {
        if (spec.primarySpecId === selectSpecId && spec.isSoldOut === '1') {
          this.data.curGoods.productSpecList.forEach(item => {
            if (spec.secondarySpecId === item.secondarySpecId) {
              item.secondaryDisabled = true
            }
          })
        }
      })
    }
  },

  _getSelectedSpecsText(curProductId) {
    return new Promise((resolve, reject) => {
      let arr = []
      this.data.curGoods.productSpecList.forEach((spec, index) => {
        if (curProductId == spec.groupId) {
          if (spec.secondarySpecName) {
            arr = [spec.primarySpecName, spec.secondarySpecName]
          } else {
            arr = [spec.primarySpecName]
          }
          resolve(arr)
        }
      })
    })

  },

  _getCurProductId() {
    return new Promise((resolve, reject) => {
      let primaryIndex = this.data.curGoods.oldSelectPrimaryIndex
      let secondaryIndex = this.data.curGoods.oldSelectSecondaryIndex
      console.log(primaryIndex)
      console.log(secondaryIndex)
      let curPrimarySpecId, curSecondarySpecId, curProductId

      this.data.curGoods.productSpecList.forEach((spec, index) => {
        if (primaryIndex === index) {
          curPrimarySpecId = spec.primarySpecId
        }
        if (secondaryIndex !== undefined) {
          if (secondaryIndex === index) {
            curSecondarySpecId = spec.secondarySpecId
          }
        }
      })

      if (secondaryIndex !== undefined) {
        this.data.curGoods.productSpecList.forEach((spec, index) => {
          if (curPrimarySpecId === spec.primarySpecId && curSecondarySpecId === spec.secondarySpecId) {
            curProductId = spec.groupId
          }
        })
      } else {
        this.data.curGoods.productSpecList.forEach((spec, index) => {
          if (curPrimarySpecId === spec.primarySpecId) {
            curProductId = spec.groupId
          }
        })
      }
      resolve(curProductId)
    })
  },

  closeSpecSelectPlainEnv() {
    // this._hideSpecSelectPlain()
    // this._hideMaskLayer()
  },

  _getGoodsSpecTypes(curSpecList) {
    let selectSpecType = []
    if (curSpecList && curSpecList.length) {
      if (curSpecList[0].primarySpecModelName) {
        selectSpecType.push(curSpecList[0].primarySpecModelName)
      }
      if (curSpecList[0].secondarySpecModelName) {
        selectSpecType.push(curSpecList[0].secondarySpecModelName)
      }
    }

    console.log('当前规格类型：', selectSpecType, selectSpecType.length)
    console.log('当前规格类型数：', selectSpecType.length)

    return selectSpecType
  },

  _getGroupProductList() {
    this._showLoading()

    let params = {
      productId: this.data.productId
    }
    getGroupProductList(params).then(res => {
      console.log('组合商品详情：', res)
      this._hideLoading()

      if (res.data.code === '1') {
        let goodsList = res.data.dataList
        goodsList.forEach(goods => {
          if (goods.productSpecList) {
            if (!this._checkSoldOut(goods.productSpecList)) {
              goods.isSelectedFinish = false
            } else {
              goods.isSelectedFinish = true
            }
          } else {
            goods.isSelectedFinish = true
          }
        })
        this.setData({
          goodsList: goodsList
        })
      }
      console.log('商品列表：', this.data.goodsList)
    })
  },

  _checkSoldOut(goodsList) {
    let temp = true
    goodsList.forEach(spec => {
      if (spec.isSoldOut === '0') {
        temp = false
      }
    })
    return temp
  },

  _getSpecImg() {
    return new Promise((resolve, reject) => {
      let primaryIndex = this.data.curGoods.oldSelectPrimaryIndex
      let secondaryIndex = this.data.curGoods.oldSelectSecondaryIndex
      let curSpecImg, curPrimarySpecId, curSecondarySpecId

      if (primaryIndex === undefined || secondaryIndex === undefined) {
        this.data.curGoods.productSpecList.forEach((spec, index) => {
          if (primaryIndex !== undefined) {
            if (primaryIndex === index) {
              curSpecImg = spec.imageUrl
            }
          } else {
            if (secondaryIndex === index) {
              curSpecImg = spec.imageUrl
            }
          }
        })
      } else {
        this.data.curGoods.productSpecList.forEach((spec, index) => {
          if (primaryIndex === index) {
            curPrimarySpecId = spec.primarySpecId
          }
          if (secondaryIndex === index) {
            curSecondarySpecId = spec.secondarySpecId
          }
        })

        this.data.curGoods.productSpecList.forEach((spec, index) => {
          if (curPrimarySpecId === spec.primarySpecId && curSecondarySpecId === spec.secondarySpecId) {
            curSpecImg = spec.imageUrl
          }
        })
      }
      resolve(curSpecImg)
    })
  },

  _setDefaultImg() {
    if (!this.data.curGoods.imageUrl) {
      this.data.curGoods.imageUrl = ''
    }
  },

  closeSpecSelectPlainEnv() {
    this._hideSpecSelectPlain()
    this._hideMaskLayer()
  },

  _showSpecSelectPlain() {
    this.setData({
      isShowProductSpecSelectPlain: true
    })

    this.ani_productSpecSelectPlain.translate3d(0, 0, 0).step();
    this.setData({
      productSpecSelectPlainAni: this.ani_productSpecSelectPlain.export()
    })

    getElementSize('#productSpecSelectPlain').then(res => {
      this.setData({
        productSpecSelectPlainHeight: res.height
      })
    })
  },

  _hideSpecSelectPlain() {
    this.ani_productSpecSelectPlain.translate3d(0, this.data.productSpecSelectPlainHeight, 0).step()
    this.setData({
      productSpecSelectPlainAni: this.ani_productSpecSelectPlain.export()
    })

    let timer = setTimeout(() => {
      this.setData({
        isShowProductSpecSelectPlain: false
      })
      clearTimeout(timer)
    }, ANI_TIME_SELECTSPEC)
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
    this._hideSpecSelectPlain()
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

  _initWatchData() {
    watch = new Watch(this)
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

  _initAnimation() {
    this.ani_maskLayer = wx.createAnimation({
      duration: ANI_TIME_MASKLAYER,
      timingFunction: 'linear',
      delay: 0
    })

    this.ani_productSpecSelectPlain = wx.createAnimation({
      duration: ANI_TIME_SELECTSPEC,
      timingFunction: 'linear',
      delay: 0
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('options: ', options)

    this.data.productId = options.productId || '144719'
    this.data.postType = options.postType || '0'

    this._getGroupProductList()
    this._initWatchData()
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