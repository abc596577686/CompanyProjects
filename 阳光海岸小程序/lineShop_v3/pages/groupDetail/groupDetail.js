// pages/groupDetail/groupDetail.js
import { getElementSize } from '../../utils/index.js'
import { setJumpUrl } from '../../utils/index.js'
import { getWechatCode, getWeiXinUserInfo, userCenterInfo, groupShareDetail,checkBuy} from '../../api/api.js'
import Watch from '../../assets/plugins/watch.js'
import { countDown } from '../../utils/index.js'
let watch //全局变量, 由实例化后的对象赋值

const ANI_TIME_MASKLAYER = 260
const ANI_TIME_AREAPICKER = 260
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  // href
  data: {
    defalutImg: '/assets/images/other@2x.png',
    groupList: [
      
    ],
    showBg : false,
    showDetailBox : false,
    productNumber: 1, //默认商品数量
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
    isAdd: true,  //可以增加,
    top : 0,
    index : 1,
    recommendProductList :[],
    hide : false,
    loadKey : true,
    lastId : 0,
    isShowEnd : 0
    
  },
  goProductDegtail(){
    wx.navigateTo({
      url: `/pages/productDetail/productDetail?productId=${this.data.productId}`,
    })

  },
  setLower(){
    return new Promise((resolve, reject) => {
      let that = this
      setTimeout(function(){
        that.setData({
          lower : 0
        },100)
      })
      resolve(1)
    })
  },


  setSwiperTimer(toper) {
    console.log('触发了')
    let that = this
    let num = this.data.fakerGroupList.length//团个数
    let height = this.data.itemHeight//滚动视图高
    let step = height / num//item高度
    let top = toper || 0
    if (num > 2) {
      clearInterval(this.swiperTimer)
      this.swiperTimer = setInterval(function () {
        console.log('---------swiper')
        if (top >= height - step * 2) {
          top = 0
          that.setData({
            top: 0
          })
        }
        top += step
        that.setData({
          top: top
        })
      }, 3000)
    }

  },
  // 设置拼团列表
  setGroupList(data) {
    let groupList = data
    let fakerGroupList = []
    if (groupList.length > 2) {
      let endList = groupList.slice(0, 2)
      fakerGroupList = groupList.concat(endList)
      this.setData({
        fakerGroupList: fakerGroupList
      })
       this.delayId = setTimeout(() => {
         getElementSize('#scrollEle').then(res => {
           console.log(res)
           this.setData({
             itemHeight: res.height
           })
           this.setSwiperTimer()
         })
         clearTimeout(delayId)
       },2000)
    } else {
      fakerGroupList = groupList
      this.setData({
        fakerGroupList: fakerGroupList

      })
    }
    if (groupList.length > 0) {
      this.restAllTime = setInterval(() => {
        // this.data.currentTimes += 100
        this.data.currentTimes = (new Date()).getTime()
        this.timerFuc(this.data.fakerGroupList)
        // console.log("___", 'alltime')
      }, 100)
    }
  },
  //定时器函数
  timerFuc(dataList) {
    dataList.forEach((item) => {
      let diffence = item.endTime - Number(this.data.currentTimes)
      // console.log('________', diffence)
      if (diffence > 0) {
        item.restTime = countDown(diffence)
      }else{
        this.showLoading()
        this.groupShareDetail()
        clearInterval(this.restTimer)

      }
      
    })
    this.setData({
      fakerGroupList: dataList,
    })
    


  },
  close(){
    this.setData({
      showBg : false,
      showDetailBox : false
    })
  },
  hideBg(){
    this.setData({
      showBg : false
    })
    this._hideSpecSelectPlain()
  },
  knowDetail(){
    this.setData({
      showBg: true,
      showDetailBox: true

    })
  },
  pinGroup(){
    console.log(111)
    this.setData({
      showBg : true
    })
    this._showSpecSelectPlain()
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
  _getElementSize(element) {
    return new Promise((resolve, reject) => {
      wx.createSelectorQuery().select(element).boundingClientRect(res => {
        // console.log('当前元素大小')
        // console.log(res)
        resolve(res)
      }).exec()
    })

  },
  _initAnimation() {
    this.ani_maskLayer = wx.createAnimation({
      duration: 300,
      timingFunction: 'linear',
      delay: 0
    })
    
    this.ani_productSpecSelectPlain = wx.createAnimation({
      duration: 300,
      timingFunction: 'linear',
      delay: 0
    })

  },
  groupBuy(){
    if(this.checkIsGroupUser()){
      this.setData({
        collageId: 0,
        postType: '2'
      })
      this._showMaskLayer()
      this._showSpecSelectPlain()

    }
    
  },
  grouPin(e) {
    console.log('拼团')
    let collageId = e.currentTarget.dataset.collageid
    let isJoinedCollage = e.currentTarget.dataset.join
    let orderId = e.currentTarget.dataset.orderid
    console.log(collageId)
    if (isJoinedCollage =='0'){
      this.setData({
        collageId: collageId,
        postType: '2',
        isGroupBuy: true
      })
      this._showMaskLayer()
      this._showSpecSelectPlain()

    }else{
      wx.navigateTo({
        url: `/pages/groupShoping/groupShoping?orderId=${orderId}`,
      })

    }
    
  },
  grouPin1(e) {
    console.log('拼团')
    let collageId = e.currentTarget.dataset.collageid
      this.setData({
        collageId: collageId,
        postType: '2',
        isGroupBuy: true
      })
      this._showMaskLayer()
      this._showSpecSelectPlain()
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
  // 选规格
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

    console.log('当前选择规格')
    console.log(this.data.selectedSpecType)
    console.log(this.data.selectedSpecName)
    this.setData({
      selectedSpecType: this.data.selectedSpecType,
      selectedSpecName: this.data.selectedSpecName
    })
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
      this.setData({
        specImage: this.data.productInfo.productImgUrl
      })
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
  // 获取规格
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
        number: this.data.inputGoodsNum,
        isCollageBuy: this.data.isCollageBuy,
      }
      if (this.data.isCollageBuy) {
        params.collageId = this.data.collageId
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
    // let isGroupBuy = this.data.isGroup == 1? true : false
    let collageId = this.data.collageId
    let isCollageBuy = this.data.isCollageBuy
    //直接购买和开团参团直接跳到支付页

    if (this.data.postType === '0' || this.data.postType === '2') {
      let navigatorUrl = `/pages/confirmOrder/confirmOrder?postType=${this.data.postType}&productId=${productId}&productSpecId=${productSpecId}&number=${number}&productType=${this.data.productType}&isCollageBuy=${isCollageBuy}&collageId=${collageId}`;
      wx.navigateTo({
        url: navigatorUrl
      })
    } else if (this.data.postType == '1') {
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
    } else {

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
  _initWatchData() {
    watch = new Watch(this)
  },
  //获取规格标题
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
  _timeout() {
    this._hideLoading()
    this.setData({
      timeout: true
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
  closeSpecSelectPlainEnv() {
    this._hideSpecSelectPlain()
    this._hideMaskLayer()
    // this._clearSelectedSpec()
  },
  _closeSpecSelectPlainEnv() {
    return new Promise((resolve, reject) => {
      this.closeSpecSelectPlainEnv()
      // console.log(this.data.addressIds)
      resolve('123')
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
  // _setBannerImg() {
  //   if (this.data.bannerImages.length) {
  //     this.setData({
  //       specImage: this.data.bannerImages[0].imageUrl || ''
  //     })
  //   } else {
  //     this.setData({
  //       specImage: ''
  //     })
  //   }
  // },
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

  _getGroupShareDetail(){
    let params = {
      collageId : this.data.collageId,
      pageIdx : this.data.index,
      lastId : this.data.lastId ,
      pagesize : 20
      }
      console.log(111)
    let collageId = this.data.collageId

      
    wx.setStorageSync('share',collageId)
   if(this.data.loadKey){
     groupShareDetail(params).then(res => {
       this._hideLoading()
       console.log(res)
       this.setData({
         loadOver: true
       })
       let data = res.data.data
       let lastId
       let share = wx.getStorageSync('share')||''

       if (res.data.code == '1') {
        if(share){
          console.log(1234)
          wx.removeStorageSync('share')

        }
         if(data.recommendProductList.length>0){
           lastId = data.recommendProductList[data.recommendProductList.length - 1].productId
         }else {
           lastId = this.data.lastId
           this.setData({
             loadKey: false,
             isShowEnd : 1
           })
         }
         this.setData({
           productInfo: data,
           ImgUrlList: data.ImgUrlList,
           applyCollageList: data.applyCollageList,
           productSpecList: this._generateSpecList(data.productSpecList),
           infoList: data.infoList,
           productId: data.productId,
           isCollageBuy: true,
           endTime: data.endTime,
           maxStockNum: data.stockNumber,
           isSpceProduct: data.isSpecProduct,
           recommendProductList: setJumpUrl(this.data.recommendProductList.concat(data.recommendProductList)),
           lastId: lastId,
           hide: true,
           isApplyingCollage: data.isApplyingCollage || '',
           applyingCollageOrderId: data.applyingCollageOrderId,
           specImage: data.productImgUrl
           

         })
         this.initUserImg()
         this.setTime(data.endTime)
         this.setGroupList(data.applyCollageList)
         this.restTimer = setInterval(() => {
           this.setTime(data.endTime)
         }, 100)



         console.log(this.data.dataInfo)
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

         // if (this.data.isGroupProduct === '1') {
         //   console.log('组合商品')
         // }

         // 商品规格类型
         this._getGoodsSpecTypes(data.productSpecList)
         this._getPrimaryLength()

         // this._setBannerImg()

       }
       if (res.data.code == '302') {
        if(share){
          wx.removeStorageSync('share')
        }
         let orderId = res.data.param
         console.log('302')
         wx.redirectTo({
           url: `/pages/groupShoping/groupShoping?orderId=${orderId}`,
         })
       }
       if (res.data.code == '-1') {
         console.log(1111)
        //  wx.setStorageSync('share', '1')
       }
     })
   }
  },
  _getPrimaryLength(){
    let primary = []
    let listLength = this.data.productSpecList.length
    this.data.productSpecList.forEach(item => {
      if (primary.indexOf(item.primarySpecId) == -1){
        primary.push(item.primarySpecId)
      }

    })
    let primaryLength = primary.length
    this.setData({
      primaryLength : primaryLength,
      listLength: listLength
    })
    console.log('``````',primaryLength)

  },
  initUserImg() {
    let groupSize = this.data.productInfo.collageSize
    let groupUserImg = this.data.productInfo.ImgUrlList
    let defalutImg = this.data.defalutImg
    if (groupSize > groupUserImg.length) {
      let num = groupSize - groupUserImg.length
      for (let i = 0; i < num; i++) {
        groupUserImg.push(defalutImg)
      }
    }
    this.setData({
      groupUserImg: groupUserImg,
    })

  },
  setTime(endTime) {
    // console.log('111')
    let nowTime = new Date().getTime()
    let rest1 = endTime - nowTime
    let rest = countDown(rest1)
    this.setData({
      restTime: rest
    })
    if(this.data.restTime<=0){
      this._showLoading()
      this.groupShareDetail()
      clearInterval(this.restTimer)
    }
  },
  checkIsGroupUser() {
    if (this.data.isApplyingCollage == '1') {
      let toast = setTimeout(() => {
        wx.showToast({
          title: '您已经在该拼团中了哦',
          icon: 'none'
        })
        clearTimeout(toast)
      }, 1000)
      wx.navigateTo({
        url: `/pages/groupShoping/groupShoping?orderId=${this.data.applyingCollageOrderId}`,
      })


      return false

    } else {
      return true
    }

  },
  
  


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this._showLoading()
    let collageId = options.collageId
    this.setData({
      collageId:  collageId || 1
    })
    wx.setStorageSync('collageId', this.data.collageId)
    
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
    let collageId = wx.getStorageSync('collageId')
    this.setData({
      collageId : collageId,
      top : 0,
      loadKey : true
    })
    this._initAnimation()
    this._initWatchData()
    this._getGroupShareDetail()
  },
  
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    console.log('hide')
    this._closeSpecSelectPlainEnv().then(res => {
    //   console.log(res)
      this._clearSelectedSpec()
      clearInterval(this.restTimer)
      clearInterval(this.SwiperTimer)
      clearInterval(this.restAllTime)
    })
    

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    console.log('unload')
    clearInterval(this.restTimer)
    clearInterval(this.SwiperTimer)
    clearInterval(this.restAllTime)

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
    console.log('到底了')
    if(this.data.loadKey){
      this._showLoading()
      this.setData({
        index: this.data.index + 1,
        top: 0
      })
      this._getGroupShareDetail()
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})