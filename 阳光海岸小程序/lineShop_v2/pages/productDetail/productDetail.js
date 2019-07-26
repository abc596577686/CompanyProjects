import { getGoodsDetail, getRegionList, getPostage, checkBuy, addShoppingCart,seckillNotice } from '../../api/api.js'
import { setJumpUrl } from '../../utils/index.js'
import { err_ok } from '../../etc/config.js'
import Watch from '../../assets/plugins/watch.js'

let watch //全局变量, 由实例化后的对象赋值

const ANI_TIME_MASKLAYER = 260
const ANI_TIME_AREAPICKER = 260

Page({
  onShareAppMessage() {
    return {
      title: this.data.productName,
      desc: this.data.productInfo.productEffectIntro,
      path: `/pages/productDetail/productDetail?productId=${this.data.productId}`
    }
  },
  data: {
    // loading
    isLoading: false,
    // 默认按钮
    isDefault: true,
    // 遮罩层
    isShowMaskLayer: false,
    // banner
    bannerImages: [],
    // 区域选择
    // isShowAreaPicker: false, //显示/隐藏区域选择器
    fullAddress: '', //默认收货地址
    productNumber: 1, //默认商品数量
    // 运费说明
    isShowTransExplains: false,
    // 商品说明
    isShowProductIntroInfo: false,
    // 商品推荐tab
    recommendTitle: ['同类热销', '为你推荐'],
    curTabIndex: 0,
    goodsListHotSale: [], //热销
    goodsListRecommend: [], //推荐

    // 商品服务
    serviceTitle: ['产品介绍', '购买答疑'],
    curTabIndexService: 0,

    // 商品规格选择
    isShowProductSpecSelectPlain: false,
    selectSpecType: [],
    selectedSpecType: [],
    selectedSpecName: [],
    primaryOldIndex: null,
    goodsSpecList: null, //处理后的规格
    selectedSpec: [],    //已选规格

    // 商品数量编辑
    inputGoodsNum: 1,  //商品数量 初始化1个商品
    maxStockNum: '',  //最大库存
    choiceGoodsMaxNum: 60, //可选的最大商品数
    isReduce: true,  //可以减少
    isAdd: true,  //可以增加
    isstart: 0, //秒杀是否开始
    isphone: 0,//显示开抢提醒
    currentProId: '',//当前需要开抢提醒的商品id  
    inputNum:'' ,//手机号
  },

  watch: {
    inputGoodsNum(newVal, oldVal) {
      if (newVal === '') return;
      newVal = newVal - 0
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

  quickIntoEnv() {
    wx.navigateTo({
      url: '/pages/rush/rush',
    })
  },

  _previewImgEnv() {
    console.log(this.data.bannerImages)
    this.data.curViewImgs = []
    this.data.bannerImages.forEach(item => {
      this.data.curViewImgs.push(item.imageUrl)
    })
    wx.previewImage({
      // current: curImgUrl, // 当前显示图片的http链接
      urls: this.data.curViewImgs // 需要预览的图片http链接列表
    })
  },

  _setDisabledStyles(selectSpecId, specType) {

    if (specType === 'secondary') {
      let selectSecondarySpecId = selectSpecId

      this.data.productSpecList.forEach((spec, index) => {
        spec.primaryDisabled = false
      })
      this.data.productSpecList.forEach((spec, index) => {
        if (spec.secondarySpecId === selectSecondarySpecId && spec.isSoldOut === '1') {
          this.data.productSpecList.forEach(item => {
            if (spec.primarySpecId === item.primarySpecId) {
              item.primaryDisabled = true
            }
          })
        }
      })
    } else {
      let selectPrimarySpecId = selectSpecId
      this.data.productSpecList.forEach((spec, index) => {
        spec.secondaryDisabled = false
      })
      this.data.productSpecList.forEach((spec, index) => {
        if (spec.primarySpecId === selectPrimarySpecId && spec.isSoldOut === '1') {
          this.data.productSpecList.forEach(item => {
            if (spec.secondarySpecId === item.secondarySpecId) {
              item.secondaryDisabled = true
            }
          })
        }
      })
    }
  },

  _resetDisabledStyles(specType) {
    let args = ''
    if (specType === 'secondary') {
      args = 'primaryDisabled'
    } else {
      args = 'secondaryDisabled'
    }

    this.data.productSpecList.forEach((spec, index) => {
      spec[args] = false
    })
  },

  _setSelectedStyles(selectSpecId, selectIndex, specType) {
    if (specType === 'secondary') {
      let selectSecondarySpecId = selectSpecId
      this.data.productSpecList.forEach((spec, index) => {
        if (selectSecondarySpecId === spec.secondarySpecId) {
          spec.secondarySelected = true
        } else {
          spec.secondarySelected = false
        }
      })
      this.data.oldSelectSecondaryIndex = selectIndex
    } else {
      let selectPrimarySpecId = selectSpecId
      this.data.productSpecList.forEach((spec, index) => {
        if (selectPrimarySpecId === spec.primarySpecId) {
          spec.primarySelected = true
        } else {
          spec.primarySelected = false
        }
      })
      this.data.oldSelectPrimaryIndex = selectIndex
    }
  },

  _resetSelectedStyles(selectSpecId, specType) {
    if (specType === 'secondary') {
      let secondarySelected = selectSpecId
      // console.log(selectSpecId)
      this.data.productSpecList.forEach((spec, index) => {
        spec.secondarySelected = false
      })
      this.data.oldSelectSecondaryIndex = undefined
    } else {
      let primarySelected = selectSpecId
      this.data.productSpecList.forEach((spec, index) => {
        spec.primarySelected = false
      })
      this.data.oldSelectPrimaryIndex = undefined
    }
  },

  setSelectedSpec(e, specType) {
    let selectSpec = e.currentTarget.dataset.spec
    let selectIndex = e.currentTarget.dataset.index
    let oldSelectSecondaryIndex = this.data.oldSelectSecondaryIndex;
    let oldSelectPrimaryIndex = this.data.oldSelectPrimaryIndex;
    let arg, selectSpecId;

    if (specType === 'secondary') {
      selectSpecId = selectSpec.secondarySpecId
      arg = 'secondary'
    } else {
      selectSpecId = selectSpec.primarySpecId
      arg = 'primary'
    }
    console.log(selectSpec)
    console.log(selectIndex)
    console.log(selectSpecId)

    if (specType === 'secondary') {
      if (oldSelectSecondaryIndex === selectIndex) {
        this._resetSelectedStyles(selectSpecId, arg)
        this._resetDisabledStyles(arg)

        this.data.selectedSpecType[1] = undefined
        this.data.selectedSpecName[1] = undefined
      } else {
        this._setSelectedStyles(selectSpecId, selectIndex, arg)
        this._setDisabledStyles(selectSpecId, arg)

        if (!this.data.selectedSpecType[0]) {
          this.data.selectedSpecType[0] = undefined
        }
        this.data.selectedSpecType[1] = selectSpec.secondarySpecModelName

        if (!this.data.selectedSpecName[0]) {
          this.data.selectedSpecName[0] = undefined
        }
        this.data.selectedSpecName[1] = selectSpec.secondarySpecName
      }
    } else {
      if (oldSelectPrimaryIndex === selectIndex) {
        this._resetSelectedStyles(selectSpecId, arg)
        this._resetDisabledStyles(arg)

        this.data.selectedSpecType[0] = undefined
        this.data.selectedSpecName[0] = undefined
      } else {
        this._setSelectedStyles(selectSpecId, selectIndex, arg)
        this._setDisabledStyles(selectSpecId, arg)

        if (this.data.selectSpecType[1] && !this.data.selectedSpecType[1]) {
          this.data.selectedSpecType[1] = undefined
        }
        this.data.selectedSpecType[0] = selectSpec.primarySpecModelName

        if (this.data.selectSpecType[1] && !this.data.selectedSpecName[1]) {
          this.data.selectedSpecName[1] = undefined
        }
        this.data.selectedSpecName[0] = selectSpec.primarySpecName
      }
    }

    this.setData({
      productSpecList: this.data.productSpecList
    })
    
    this.setData({
      selectedSpecType: this.data.selectedSpecType,
      selectedSpecName: this.data.selectedSpecName
    })
    console.log('当前选择规格')
    console.log(this.data.selectedSpecType)
    console.log(this.data.selectedSpecName)

    // 设置选中后的状态
    let temp = 0
    let tipSelectSpecTypes = ''
    this.data.selectedSpecType.forEach((selectedItem, index) => {
      if (selectedItem) {
        temp++
      }
      if (!selectedItem) {
        this.setData({
          tipSelectSpecTypes: this.data.selectSpecType[index]
        })
      }
    })
    if (this.data.selectSpecType.length === temp) {
      this.setData({
        isSelected: true,
        isSelectedFinish: true
      })
    }
    if (temp > 0 && temp < this.data.selectSpecType.length) {
      this.setData({
        isSelected: true,
        isSelectedFinish: false
      })
    }
    if (temp === 0) {
      this.setData({
        isSelected: false,
        isSelectedFinish: false
      })
    }

    // 设置规格图片
    if (this.data.isSelected) {
      this._getSpecImg().then(curSpecImg => {
        this.setData({
          specImage: curSpecImg
        })
        // console.log('选择的图片' + curSpecImg)
      })
    } else {
      this._setBannerImg()
    }

    if (this.data.isSelectedFinish) {
      // 当前选择的商品规格id
      this._getCurProductId().then(curProductId => {
        this.setData({
          curProductId: curProductId
        })
        console.log('选择的商品id' + curProductId)
      })
    }

  },

  _getSpecImg() {
    return new Promise((resolve, reject) => {
      let primaryIndex = this.data.oldSelectPrimaryIndex
      let secondaryIndex = this.data.oldSelectSecondaryIndex
      let curSpecImg, curPrimarySpecId, curSecondarySpecId

      if (primaryIndex === undefined || secondaryIndex === undefined) {
        this.data.productSpecList.forEach((spec, index) => {
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
        this.data.productSpecList.forEach((spec, index) => {
          if (primaryIndex === index) {
            curPrimarySpecId = spec.primarySpecId
          }
          if (secondaryIndex === index) {
            curSecondarySpecId = spec.secondarySpecId
          }
        })
        this.data.productSpecList.forEach((spec, index) => {
          if (curPrimarySpecId === spec.primarySpecId && curSecondarySpecId === spec.secondarySpecId) {
            curSpecImg = spec.imageUrl
          }
        })
      }
      resolve(curSpecImg)
    })
  },

  _getCurProductId() {
    return new Promise((resolve, reject) => {
      let primaryIndex = this.data.oldSelectPrimaryIndex
      let secondaryIndex = this.data.oldSelectSecondaryIndex
      console.log(primaryIndex)
      console.log(secondaryIndex)
      let curPrimarySpecId, curSecondarySpecId, curProductId

      this.data.productSpecList.forEach((spec, index) => {
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
        this.data.productSpecList.forEach((spec, index) => {
          if (curPrimarySpecId === spec.primarySpecId && curSecondarySpecId === spec.secondarySpecId) {
            curProductId = spec.productSpecId
          }
        })
      } else {
        this.data.productSpecList.forEach((spec, index) => {
          if (curPrimarySpecId === spec.primarySpecId) {
            curProductId = spec.productSpecId
          }
        })
      }
      console.log('当前选择的商品规格id')
      // console.log(curPrimarySpecId, curSecondarySpecId)
      console.log(curProductId)
      resolve(curProductId)
    })
  },

  selectPrimarySpecEnvs(e) {
    let selectSpec = e.currentTarget.dataset.spec
    console.log(selectSpec)
    if (selectSpec.primaryDisabled) return;

    this.setSelectedSpec(e, 'primary')
  },

  selectSecondarySpecEnvs(e) {
    let selectSpec = e.currentTarget.dataset.spec
    console.log(selectSpec)
    if (selectSpec.secondaryDisabled) return;

    this.setSelectedSpec(e, 'secondary')
  },

  checkBuyEnv() {
    this._showLoading()

    // console.log('是否完成规格选择')
    // console.log(this.data.isSelectedFinish)
    // console.log('是否已选择')
    // console.log(this.data.isSelected)

    if (this.data.isSelectedFinish) {
      let params = {
        productId: this.data.productId,
        productSpecId: this.data.curProductId || '',
        number: this.data.inputGoodsNum
      }
      // console.log('发送验证')
      checkBuy(params).then(res => {
        console.log('订单验证结果', res)
        console.log(res)
        if (res.data.code === "1") {
          this.continueAction(res.data)
        } else {
          this._showMsg(res.data.msg)
        }
        this._hideLoading()
      })
    } else {
      if (this.data.isSelected) {
        this._showMsg('请选择 ' + this.data.tipSelectSpecTypes, 1600)
      } else {
        this._showMsg('请选择规格', 1600)
      }
      this._hideLoading()
    }
  },

  continueAction(data) {
    let navigatorUrl;
    let productId = data.productId
    let number = this.data.inputGoodsNum
    let productSpecId = this.data.curProductId || ''

    if (this.data.postType === '0') {
      let navigatorUrl = `/pages/confirmOrder/confirmOrder?postType=${this.data.postType}&productId=${productId}&productSpecId=${productSpecId}&number=${number}&productType=${this.data.productType}`;
      wx.navigateTo({
        url: navigatorUrl
      })
    } else {
      let params
      if (this.data.isSpceProduct === '1') {
        params = {
          productId: this.data.productId,
          productSpecId: this.data.curProductId || '',
          addNum: this.data.inputGoodsNum
        }
      }
      if (this.data.isSpceProduct === '0') {
        params = {
          productId: this.data.productId,
          addNum: this.data.inputGoodsNum
        }
      }

      addShoppingCart(params).then(res => {
        console.log('添加购物车')
        console.log(res)
        if (res.data.code === '1') {
          this._showMsg(res.data.msg)
          this.closeSpecSelectPlainEnv()
          this.resetCartProductNumber(res.data.cartProductNumbers)

          return
        }
        this._showMsg(res.data.msg)
      })
    }

  },

  resetCartProductNumber(cartProductNumbers) {
    this.setData({
      cartProductNumbers: cartProductNumbers
    })
  },

  reduceNumEnv() {
    watch.setData({
      inputGoodsNum: this.data.inputGoodsNum - 1
    })

  },

  addNumEnv() {
    watch.setData({
      inputGoodsNum: this.data.inputGoodsNum - 0 + 1
    })

  },

  changeInputValEnv(e) {
    console.log(e)

    watch.setData({
      inputGoodsNum: e.detail.value
    })
  },

  inputBlurEnv(e) {
    // console.log(e)
    if (!e.detail.value.length) {
      this.setData({
        inputGoodsNum: 1
      })
    }
  },

  changeTabIndexEnv(e) {
    this.setData({
      curTabIndex: e.currentTarget.dataset.index
    })
  },

  changeTabIndexServiceEnv(e) {
    this.setData({
      curTabIndexService: e.currentTarget.dataset.index
    })
  },

  _showSpecPlain(actionType) {
    if (actionType === 'shopping') {
      this.data.postType = '1'
    }

    if (actionType === 'atOnceBuy') {
      this.data.postType = '0'
    }

    this._showMaskLayer()
    this._showSpecSelectPlain()
  },

  addShoppingCartEnv() {
    if (this.data.isGroupProduct === '1') {
      console.log('组合商品 + shopping')

      wx.navigateTo({
        url: `/pages/groupProduct/groupProduct?postType=1&productId=${this.data.productId}`,
      })
      return
    }

    this._showSpecPlain('shopping')
  },

  buyNowEnv() {
    if (this.data.isGroupProduct === '1') {
      console.log('组合商品 + atOnceBuy')
      wx.navigateTo({
        url: `/pages/groupProduct/groupProduct?postType=0&productId=${this.data.productId}`,
      })
      return
    }

    this._showSpecPlain('atOnceBuy')
  },

  _showAreaPickerEnv() {
    this._showAreaPicker()
    this._showMaskLayer()
  },

  _changeEnv(e) {
    // console.log('地址改变')
    // console.log(e)

    this._changeAddress(e)
    this._changePostage(e)
  },

  _submitEnv(e) {
    // console.log('提交事件')
    // console.log(e)

    this._hideAreaPicker()
    this._hideMaskLayer()
  },

  _cancelEnv(e) {
    // console.log('取消事件')
    // console.log(e)

    this._hideAreaPicker()
    this._hideMaskLayer()
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

  _changePostage(e) {
    let provinceId = e.detail.provinces.areaId
    this._getPostage(provinceId)
  },

  _showAreaPicker() {
    this.ani_areaPicker.translate3d(0, 0, 0).step();
    this.setData({
      showAreaPickerAni: this.ani_areaPicker.export()
    })
  },

  _hideAreaPicker() {
    this.ani_areaPicker.translate3d(0, this.data.areaPickerHeight, 0).step()

    this.setData({
      showAreaPickerAni: this.ani_areaPicker.export()
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
    this._hideTransExplains()
    this._hideAreaPicker()
    this._hideProductIntroInfo()
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

  _showTransExplains() {
    this.setData({
      isShowTransExplains: true
    })
    this.ani_transExplain.translate3d(0, 0, 0).step()
    this.setData({
      transExplainAni: this.ani_transExplain.export()
    })

    this._getElementSize('#bottomBounce').then(res => {
      this.setData({
        transExplainsHeight: res.height
      })
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

  _showProductIntroInfo() {
    this.setData({
      isShowProductIntroInfo: true
    })
    this.ani_productIntroInfo.translate3d(0, 0, 0).step()
    this.setData({
      productIntroInfoAni: this.ani_productIntroInfo.export()
    })

    this._getElementSize('#productIntroInfo').then(res => {
      this.setData({
        productIntroInfoHeight: res.height
      })
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
  },


  _showTransPlainEnv() {
    this._showMaskLayer()
    this._showTransExplains()
  },

  _showProductIntroInfoEnv() {
    this._showMaskLayer()
    this._showProductIntroInfo()
  },

  _closeTransExplainEnv() {
    this._hideTransExplains()
    this._hideMaskLayer()
  },

  _closeProductIntroInfoEnv() {
    this._hideProductIntroInfo()
    this._hideMaskLayer()
  },

  closeSpecSelectPlainEnv() {
    this._hideSpecSelectPlain()
    this._hideMaskLayer()
    // this._clearSelectedSpec()
  },

  _setPageTitle(text) {
    wx.setNavigationBarTitle({
      title: text + '' //转成字符串类型，以免报数据类型错误
    })
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

  _generateSpecList(specList) {
    specList.forEach(spec => {
      if (spec.isSoldOut === '1') {
        spec.primaryDisabled = true
        spec.secondaryDisabled = true
      }
    })
    wx.setStorageSync('__oldProductSpecList__', specList)
    return specList
  },

  _getGoodsDetails() {
    let params = {
      productId: this.data.productBarCode ? '' : this.data.productId,
      productBarCode: this.data.productBarCode || '',
    }

    getGoodsDetail(params).then(res => {
      console.log('商品详情：', res)
      if (res.data.code === '1') {
        let data = res.data
        this._setPageTitle(data.data.productName)

        this.setData({
          productName: data.data.productName,
          isDefault: false,
          bannerImages: data.headerImageList,
          productInfo: data.data,
          productIntroList: data.data.productIntroList,
          productIntroTitles: this._productIntroTitle(data.data.productIntroList),
          goodsListHotSale: setJumpUrl(data.data.sameKindWholesaleList),
          goodsListRecommend: setJumpUrl(data.data.recommendWholesaleList),
          productSpecList: this._generateSpecList(data.data.productSpecList),
          questionData: data.data.questionData,
          productType: data.data.productType,
          inputNum: data.data.mobile,
          maxStockNum: data.data.stockNumber,
          couponList: data.data.couponLableList
        })

        this.setData({
          cartProductNumbers: this.data.productInfo.cartProductNumbers
        })
        console.log('商品规格列表：', this.data.productSpecList)

        // 秒杀倒计时
        if (this.data.productInfo.isSeckillProduct === '1') {
          this.data.currentTimes = data.systemTime
          this.data.seckillStartTime = data.data.seckillStartTime
          this.data.seckillEndTime = data.data.seckillEndTime

          // 在倒计时开始前提前判断是否是秒杀商品以及开售状态 显示底部按钮
          let currentTimes = Number(this.data.currentTimes);
          this.data.currentTimes = Number(currentTimes + 1000);
          let seckillStartTime = Number(this.data.seckillStartTime);
          let seckillEndTime = Number(this.data.seckillEndTime);
          if (seckillStartTime < currentTimes && currentTimes < seckillEndTime) { 
            this.setData({
              isstart: 1   //是否开始
            })
          }
          // 调用倒计时
          this._seckillProductDown()
        }

        // 如果不是规格商品，直接购买
        this.data.isSpceProduct = this.data.productInfo.isSpceProduct
        this.data.isGroupProduct = this.data.productInfo.isGroupProduct

        if (this.data.isSpceProduct === '1') {
          console.log('规格商品')
          // 判断组合商品/规格商品
          if (this.data.productInfo.isSoldOut === '0') { //判断是规格商品并且没有规格的情况
            if (this.data.isGroupProduct === '0') { //组合商品
              this._checkIsSoldOut()
            }
          }
        }

        if (this.data.isSpceProduct === '0') {
          this.setData({
            isSelected: true,
            isSelectedFinish: true
          })
        }

        if (this.data.isGroupProduct === '1') {
          console.log('组合商品')
        }

        // 商品规格类型
        this._getGoodsSpecTypes(data.data.productSpecList)

        this._setBannerImg()

        // 邮寄地址
        let provinceId = data.data.postageData.provinceId
        let cityId = data.data.postageData.cityId
        let areaId = data.data.postageData.areaId || null
        let fullAddress = data.data.postageData.address
        this._getAddress(provinceId, cityId, areaId, fullAddress).then(res => {
          this._getRegionList() //获取区域列表
        })

        // 商品已售完
        if (this.data.productInfo.isSoldOut) {
          return
        }
      }

    }).catch(res => {
      this._timeout()
    })
  },

  _seckillProductDown() {
    let timer = setInterval(() => {
      let currentTimes = Number(this.data.currentTimes);
      this.data.currentTimes = Number(currentTimes + 1000);
      let seckillStartTime = Number(this.data.seckillStartTime);
      let seckillEndTime = Number(this.data.seckillEndTime);

      if (seckillStartTime < currentTimes && currentTimes < seckillEndTime) {
        // 秒杀商品进行中
        let currentDate = new Date(currentTimes);
        let seckillEndDate = new Date(seckillEndTime);
        let t = seckillEndDate.getTime() - currentDate.getTime();
        let hour = Math.floor((t / 3600000) % 24);
        let min = Math.floor((t / 60000) % 60);
        let sec = Math.floor((t / 1000) % 60);

        // 到计时 时、分、秒
        this.setData({
          seckillHour: hour < 10 ? "0" + hour : hour,
          seckillMin: min < 10 ? "0" + min : min,
          seckillSec: sec < 10 ? "0" + sec : sec,
          isstart: 1   //是否开始
        })

      } else if(currentTimes < seckillStartTime){
        console.log('秒杀未开始')
        clearInterval(timer)
        this.setData({
          isstart: 0   //是否开始
        })
      } else if (currentTimes > seckillEndTime) {
        console.log('活动已结束')
        this._getGoodsDetails()
        clearInterval(timer)
      }
    }, 1000);
  },

  _checkIsSoldOut() {
    // 是否所有的规格都已售完
    let temp = 0
    this.data.productSpecList.forEach(spec => {
      if (spec.isSoldOut === '0') {
        temp++
      }
    })

    if (temp === 0) {
      console.log('全部售完')
      this.data.productInfo.isSoldOut = '1'
      this.setData({
        productInfo: this.data.productInfo
      })
    }
  },

  _setBannerImg() {
    if (this.data.bannerImages.length) {
      this.setData({
        specImage: this.data.bannerImages[0].imageUrl || ''
      })
    } else {
      this.setData({
        specImage: ''
      })
    }
  },

  _getGoodsSpecTypes(specList) {
    let selectSpecType = []
    if (specList && specList.length) {
      if (specList[0].primarySpecModelName) {
        selectSpecType.push(specList[0].primarySpecModelName)
      }
      if (specList[0].secondarySpecModelName) {
        selectSpecType.push(specList[0].secondarySpecModelName)
      }
    }
    this.setData({
      selectSpecType: selectSpecType
    })
    console.log('规格分类', this.data.selectSpecType)

    this.data.selectedSpecType = new Array(this.data.selectSpecType.length)
    this.data.selectedSpecName = new Array(this.data.selectSpecType.length)
    console.log('规格分类数量', this.data.selectedSpecType.length)
  },

  _serializeGoodsSpec(speclist) {
    let primarySpecList = []
    let secondarySpecList = []

    // 一级规格
    speclist.forEach((spec, index) => {
      // console.log('第' + index + '个')

      let toggle_primary = true
      let isExistPrimarySpec = true;

      // if (spec.isSoldOut === '1') {
      //   spec.disabled = true
      // } else {
      //   spec.disabled = false
      // }

      if (primarySpecList.length) {
        toggle_primary = false

        for (var i = 0; i < primarySpecList.length; i++) {
          if (spec.primarySpecId !== primarySpecList[i].primarySpecId) {
            isExistPrimarySpec = false
          } else {
            isExistPrimarySpec = true
            return
          }
        }
      }

      if (toggle_primary) {
        primarySpecList.push(spec)
      }

      if (!isExistPrimarySpec) {
        primarySpecList.push(spec)
      }

    })

    this.setData({
      primarySpecList: primarySpecList
    })

    console.log('一级规格：')
    console.log(primarySpecList)

    // 二级规格
    speclist.forEach((spec, index) => {
      // console.log('第' + index + '个')

      let toggle_secondary = true
      let isExistScondarySpec = true;

      // if (spec.isSoldOut === '1') {
      //   spec.disabled = true
      // } else {
      //   spec.disabled = false
      // }

      if (secondarySpecList.length) {
        toggle_secondary = false

        for (var i = 0; i < secondarySpecList.length; i++) {
          if (spec.secondarySpecId != secondarySpecList[i].secondarySpecId) {
            isExistScondarySpec = false
          } else {
            isExistScondarySpec = true
            return
          }
        }
      }

      if (toggle_secondary && spec.secondarySpecId) {
        secondarySpecList.push(spec)
      }

      if (!isExistScondarySpec) {
        secondarySpecList.push(spec)
      }

    })

    this.setData({
      secondarySpecList: secondarySpecList
    })


    console.log('二级规格：')
    console.log(secondarySpecList)

    this._setSelectableSpecs(primarySpecList, secondarySpecList)
  },

  _setSelectableSpecs(primary, secondary) {
    let selectableSpecs = []

    if (primary.length) {
      selectableSpecs.push(primary[0].primarySpecModelName)
    }
    if (secondary.length) {
      selectableSpecs.push(secondary[0].secondarySpecModelName)
    }

    let selectedSpec = []
    selectedSpec.length = selectableSpecs.length

    this.setData({
      selectableSpecs: selectableSpecs,
      selectedSpec: selectedSpec
    })

    console.log('可选择的规格:')
    console.log(this.data.selectableSpecs)

    console.log('可选规格长度：')
    console.log(this.data.selectedSpec)

  },

  _clearSelectedSpec() {
    this.setData({
      isSelectedFinish: false,
      isSelected: false
    })

    this.setData({
      productSpecList: wx.getStorageSync('__oldProductSpecList__')
    })
  },

  _productIntroTitle(list) {
    let temp = []
    list.forEach(item => {
      temp.push(item.title)
    })
    // console.log('商品说明标题')
    // console.log(temp)
    return temp
  },

  _getAddress(provinceId, cityId, areaId, fullAddress) {
    return new Promise((resolve, reject) => {
      this.setData({
        fullAddress: fullAddress,
        addressIds: [provinceId, cityId, areaId]
      })
      // console.log(this.data.addressIds)
      resolve()
    })

  },

  _getPostage(provinceId) { //获取邮费信息
    let params = {
      productId: this.data.productId,
      provinceId: provinceId || this.data.addressIds[0],
      number: this.data.productNumber //商品数量
    }
    getPostage(params).then(res => {
      console.log('邮费信息', res)

      let data = res.data
      if (data.code !== '1') {  //商品已下架
        this._showMsg(data.msg, 1600)
        return
      } else {
        this.setData({
          postage: data.postage,
          transExplains: data.postageDesc || []
        })
      }
    })
  },

  _getIndexForId() {
    // console.log(this.data.addressIds)
    return new Promise((resolve, reject) => {
      if (!this.data.addressIds) return

      let curIndexs = []
      let provinceIndex, cityIndex, areaIndex
      let provinceId = this.data.addressIds[0]
      let cityId = this.data.addressIds[1]
      let areaId = this.data.addressIds[2] ? this.data.addressIds[2] : null
      console.log(provinceId, cityId, areaId)

      this.data.regionList.forEach((province, provinceIndex) => {
        if (province.areaId === this.data.addressIds[0]) {
          curIndexs.push(provinceIndex + '')
          province.childrenList.forEach((city, cityIndex) => {
            if (city.areaId === this.data.addressIds[1]) {
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

      // console.log('得到当前的省市区索引')
      // console.log(curIndexs)

      resolve(curIndexs)
    })
  },

  _getRegionList() {
    if (!wx.getStorageSync('__regionList__')) {
      getRegionList().then(res => {
        console.log('区域列表：')
        console.log(res)

        if (res.data.code !== err_ok) {
          return
        }
        wx.setStorageSync('__regionList__', res.data.list)
        this.setData({
          regionList: res.data.list
        })
      })
    } else {
      let regionList = wx.getStorageSync('__regionList__')
      console.log('区域列表：', regionList)

      this.setData({
        regionList: regionList
      })
    }

    this._hideLoading()

    // 通过id找到对应的索引值
    this._getIndexForId().then(res => {
      this.setData({
        addressIndex: res
      })

      this._getElementSize('#pickerContainer').then(res => {
        this.setData({
          areaPickerHeight: res.height
        })
      })

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

  _initWatchData() {
    watch = new Watch(this)
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

  _timeout() {
    this._hideLoading()
    this.setData({
      timeout: true
    })
  },

  refreshEnv() {
    this.setData({
      timeout: false
    })
    this._getGoodsDetails()
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

  _removeStorage() {
    wx.removeStorageSync('__selectAddress__')
    wx.removeStorageSync('__selectedCouponId__')
    wx.removeStorageSync('__couponList__')

  },

  onLoad(options) {
    if (options.storeUserId) {
      wx.setStorageSync('storeUserId', options.storeUserId)
    }
    
    this._showLoading()
    this._removeStorage()
    this._initWatchData()
    this._initAnimation()

    console.log(options)
    if (options.productBarCode) {
      this.setData({
        productBarCode: options.productBarCode
      })
    }

    this.setData({
      productId: options.productId || 144719
    })
    this._getGoodsDetails()

  },

  onHide: function () {
    // console.log('hide')
    this.closeSpecSelectPlainEnv()
    // this._clearSelectedSpec()
  },
  showphone(e) {
    console.log(e)
    this.setData({
        isphone: 1,
        // productId: this.data.dataList[e.currentTarget.id].productId
        currentProId:e.target.dataset.id,
    })
  },
  hidephone() {
    this.setData({
        isphone: 0
    })
  },
  changecode(value) {
    console.log(value)
    this.setData({
        inputNum: value.detail.value
    })
  },
  sendphone() {
    console.log(this.data.currentProId)
    console.log(this.data.inputNum)

    let params = {
        productId: this.data.currentProId,
        mobile: this.data.inputNum,
    }
    seckillNotice(params).then(res => {
        console.log(res.data)
        if (res.data.code == 1) {
            wx.showToast({
                title: '预约成功',
                icon: 'success'
            });
            this.setData({
                isphone: 0
            })
        } else {
            wx.showToast({
                title: res.data.msg,
                icon: 'none'
            });
        }
    })
  },
})
