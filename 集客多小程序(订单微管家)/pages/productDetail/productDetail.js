import {
  getGoodsDetail,
  getRegionList,
  getPostage,
  checkBuy,
  addShoppingCart,
  seckillNotice
} from '../../api/api.js'
import {
  setJumpUrl
} from '../../utils/index.js'
import {
  err_ok
} from '../../etc/config.js'
import {
  countDown
} from '../../utils/index.js'
import Watch from '../../assets/plugins/watch.js'
let watch //全局变量, 由实例化后的对象赋值

const ANI_TIME_MASKLAYER = 260
const ANI_TIME_AREAPICKER = 260
let app = getApp()

Page({
  onShareAppMessage() {
    return {
      title: this.data.productName,
      desc: this.data.productInfo.productEffectIntro,
      path: `/pages/productDetail/productDetail?productId=${this.data.productId}&shareUserSecret=${this.data.shareUserSecret}`
    }
  },
  data: {
    // groupList : [
    //   1,2,3,1,2
    // ],
    // isGroup : 0,

    // 拼团弹窗
    showDetail: false,

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
    selectedSpec: [], //已选规格

    // 商品数量编辑
    inputGoodsNum: 1, //商品数量 初始化1个商品
    maxStockNum: '', //最大库存
    choiceGoodsMaxNum: 60, //可选的最大商品数
    isReduce: true, //可以减少
    isAdd: true, //可以增加
    isstart: 0, //秒杀是否开始
    isphone: 0, //显示开抢提醒
    currentProId: '', //当前需要开抢提醒的商品id  
    inputNum: '', //手机号
    selectSpec: [],
    selectSpecTax: '0.0',
    shareUserSecret: '',
    secondSpecNumber: '',
    localprimaryBox: [],
    currentPriceRegion: ''
  },

  watch: {
    inputGoodsNum(newVal, oldVal) {
      // console.log(newVal)
      if (newVal === '') return;
      newVal = newVal - 0
      if (newVal <= 1) {
        this.setData({
          inputGoodsNum: 1
        })
      }

      let selectSpec = this.data.selectSpec
      if (selectSpec) {
        this.setData({
          selectSpecTax: (Number(selectSpec.tax)*Number(newVal)).toFixed(2)
        })
      }


      if (this.data.productInfo.isSpceProduct != 1) { 
        if (newVal > this.data.maxStockNum) {
          this._showMsg('超过库存')
          this.setData({
            inputGoodsNum: this.data.maxStockNum
          })
          return
        }
      } else {
        if (!selectSpec) {
          return
        }
        let selectSpec = this.data.selectSpec
        console.log(selectSpec)

        // this.setData({
        //   selectSpec: selectSpec,
        //   selectSpecTax: Number(selectSpec.tax)*Number(this.data.inputGoodsNum) != 0 ? (Number(selectSpec.tax)*Number(this.data.inputGoodsNum)).toFixed(2) : '0.0'
        // })

        if (this.data.productInfo.isSpceProduct == 1) {
          if (selectSpec.isSeckillLimit == 0) {  //非限购商品
            if (this.data.inputGoodsNum > selectSpec.stockNumber) {
              wx.showToast({
                title: '库存不足',
                icon: 'none'
              })
              this.setData({
                inputGoodsNum: Number(selectSpec.stockNumber),
                selectSpecTax: (Number(selectSpec.tax)*Number(selectSpec.stockNumber)).toFixed(2)
              })
            }
          } else if (selectSpec.isSeckillLimit == 1) {  //限购商品
            selectSpec.seckillLimitNumber = Number(selectSpec.seckillLimitNumber); //秒杀限购数量
            selectSpec.stockNumber = Number(selectSpec.stockNumber);

            if (selectSpec.seckillLimitNumber > selectSpec.stockNumber) {  //秒杀库存大于真实库存
              //限购数大于库存
              if (this.data.inputGoodsNum > selectSpec.stockNumber) {  //选择数大于库存数
                wx.showToast({
                  title: '库存不足',
                  icon: 'none'
                })
                // this.data.inputGoodsNum = Number(selectSpec.stockNumber);
                this.setData({
                  inputGoodsNum: Number(selectSpec.stockNumber),
                  selectSpecTax: (Number(selectSpec.tax)*Number(selectSpec.stockNumber)).toFixed(2)
                })
              }
            } else if (selectSpec.seckillLimitNumber < selectSpec.stockNumber) {  //真实库存大于秒杀库存
              if (this.data.inputGoodsNum > selectSpec.seckillLimitNumber) {
                wx.showToast({
                  title: '已达最大购买数量',
                  icon: 'none'
                })
                // this.data.inputGoodsNum = Number(selectSpec.seckillLimitNumber);
                this.setData({
                  inputGoodsNum:Number(selectSpec.seckillLimitNumber),
                  selectSpecTax: (Number(selectSpec.tax)*Number(selectSpec.seckillLimitNumber)).toFixed(2)
                })
              }
            } else if (selectSpec.seckillLimitNumber == selectSpec.stockNumber) {
              if (this.data.inputGoodsNum > selectSpec.seckillLimitNumber) {
                //限购数等于库存
                wx.showToast({
                  title: '已达最大购买数量',
                  icon: 'none'
                })
                // this.data.inputGoodsNum = Number(selectSpec.seckillLimitNumber);
                this.setData({
                  inputGoodsNum:Number(selectSpec.seckillLimitNumber),
                  selectSpecTax: (Number(selectSpec.tax)*Number(selectSpec.seckillLimitNumber)).toFixed(2)
                })
              }
            }
          }
        }
      }

      this.setData({
        oldValue: newVal
      })
    }
  },

  goOrderDetail() {
    wx.navigateTo({
      // url: navigatorUrl
      url:'/pages/allOrder/allOrder'
    })
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
    // console.log()
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

  _setSelectedStyles(selectSpecId, selectIndex, specType) {   //选中效果
    console.log(selectIndex)
    // console.log(this.data.primaryBox)
    if (specType === 'secondary') {    //二级规格选中效果
      let selectSecondarySpecId = selectSpecId
      // console.log(selectSecondarySpecId)
      // console.log(this.data.productSpecList)
      let realprimarySpecId = []
      this.data.productSpecList.forEach((spec, index) => {
        if (selectSecondarySpecId == spec.secondarySpecId) {
          spec.secondarySelected = true
          if (spec.isSoldOut != 1) { 
            realprimarySpecId.push(spec.primarySpecId)
          }
          
          // console.log(spec)
          // if (spec.isSoldOut != 1) {  
          //   this.data.primaryBox.forEach((dat, index) => {
          //     console.log(dat.primarySpecId) 
              
          //     if (dat.primarySpecId != spec.primarySpecId) {  
          //       dat.weigth = ''
          //     }

          //   })
          // }
        } else {
          spec.secondarySelected = false
        }
      })

      console.log(realprimarySpecId) // 全部二级规格里存在未售罄的一级规格

      this.data.primaryBox.forEach((lis,index) => {
        console.log(lis)
        if (realprimarySpecId.indexOf(lis.primarySpecId) > -1) {
          console.log('显示此一级规格')
          lis.weigth = 'isShow'
        } else {
          console.log('此一级规格下二级规格全部售罄',lis)
          lis.weigth = ''
        }
      })

      console.log('所有一级规格', this.data.primaryBox)

      this.data.oldSelectSecondaryIndex = selectIndex
      this.data.oldSelectSecondaryIndexs = selectSpecId
      
    } else {         //一级规格选中效果
      let selectPrimarySpecId = selectSpecId
      // console.log(selectPrimarySpecId)
      // this.data.productSpecList.forEach((spec, index) => {
      this.data.primaryBox.forEach((spec, index) => {
        // console.log(spec)
        if (selectPrimarySpecId == spec.primarySpecId) {
          // console.log(spec.primarySpecId)
          spec.primarySelected = true
          // spec.isout = ''
        } else {
          spec.primarySelected = false
          // spec.isout = 'isout'
        }
      })
      this.data.oldSelectPrimaryIndex = selectIndex
      this.data.oldSelectPrimaryIndexs = selectSpecId
    }
    // this.setData({
    //   primaryBox: this.data.primaryBox
    // })
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
    console.log(e)
    let selectSpec = e.currentTarget.dataset.spec
    let selectIndex = e.currentTarget.dataset.index
    console.log(selectSpec)


    let oldSelectSecondaryIndex = this.data.oldSelectSecondaryIndex;
    let oldSelectPrimaryIndex = this.data.oldSelectPrimaryIndex;
    let arg, selectSpecId;

    // console.log(oldSelectPrimaryIndex)
    // console.log(oldSelectSecondaryIndex)

    if (specType === 'secondary') {
      selectSpecId = selectSpec.secondarySpecId
      arg = 'secondary'
    } else {
      selectSpecId = selectSpec.primarySpecId
      arg = 'primary'
    }
    // console.log(selectSpec)

    console.log('当前规格税费',Number(selectSpec.tax))
    console.log('当前所选数量',Number(this.data.inputGoodsNum))
    this.setData({
      selectSpec: selectSpec,
      selectSpecTax: Number(selectSpec.tax)*Number(this.data.inputGoodsNum) != 0 ? (Number(selectSpec.tax)*Number(this.data.inputGoodsNum)).toFixed(2) : '0.0'
    })

    // console.log(selectIndex)
    // console.log(selectSpecId)

    if (specType === 'secondary') {   //选择二级规格
      if (oldSelectSecondaryIndex === selectIndex) {  //反选二级规格
        console.log('反选二级规格')

        let localprimaryBox = wx.getStorageSync('localprimaryBox')  
        console.log(localprimaryBox)
        localprimaryBox.forEach((data,index) => {
          if (data.weigth == 'isShow') {
            this.data.primaryBox.forEach((dat, indexs) => { 
              if (dat.primarySpecId == data.primarySpecId) {
                dat.weigth = 'isShow'
              }
            })
          }
        })
        this.setData({
          primaryBox: this.data.primaryBox,
          oldSelectSecondaryIndexs: '',
        })

        this._resetSelectedStyles(selectSpecId, arg)
        this._resetDisabledStyles(arg)

        this.data.selectedSpecType[1] = undefined
        this.data.selectedSpecName[1] = undefined
      } else {   //点选二级规格
        // console.log(this.data.primaryBox)
        // let afterPrimary = []
        // console.log(selectSpecId)
        // this.data.productSpecList.forEach((data,index) => {
        //   if (data.secondarySpecId == selectSpecId && data.isSoldOut != 1 ) {
        //     // console.log(data.primarySpecId)  
        //     afterPrimary.push(data.primarySpecId)
        //   }
        // })
        // console.log(afterPrimary)
        
        // this.data.primaryBox.forEach((dat, indexs) => { 
        //   if (dat.primarySpecId == data.primarySpecId) {
        //     dat.weigth = 'isShow'
        //   }
        // })
        // this.setData({
        //   primaryBox: this.data.primaryBox,
        //   // oldSelectSecondaryIndexs: '',
        // })
        // oldSelectSecondaryIndexs

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
    } else {   //选择一级规格
      if (oldSelectPrimaryIndex === selectIndex) {  //反选一级规格
        this._resetSelectedStyles(selectSpecId, arg)
        this._resetDisabledStyles(arg)

        let localprimaryBox = wx.getStorageSync('localprimaryBox')
        this.setData({
          primaryBox: localprimaryBox
        }, () => {
          console.log(this.data.primaryBox)
        })
        
        this.data.selectedSpecType[0] = undefined
        this.data.selectedSpecName[0] = undefined
      } else {   //点选一级规格

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

        // console.log(this.data.primaryBox)
        // wx.setStorageSync('localprimaryBox', this.data.primaryBox)
      }
    } 

    this.setData({
      productSpecList: this.data.productSpecList,
      primaryBox: this.data.primaryBox
    })
    
    console.log('当前选择规格')
    // console.log(this.data.selectedSpecType)
    // console.log(this.data.selectedSpecName)
    // if (this.data.selectedSpecType == '' && selectedSpecName == '') {
      
    // }
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
        // console.log(this.data.currentPrice)
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
      let primaryIndex = this.data.oldSelectPrimaryIndexs
      let secondaryIndex = this.data.oldSelectSecondaryIndexs

      console.log(primaryIndex)
      console.log(secondaryIndex)

      let curSpecImg, curPrimarySpecId, curSecondarySpecId,price

      if (primaryIndex === undefined && secondaryIndex === undefined) {
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
      } else if (primaryIndex != undefined && secondaryIndex == undefined) { 
        this.data.productSpecList.forEach((spec, index) => {
          if (primaryIndex === spec.primarySpecId) {
            curSpecImg = spec.imageUrl
          }
        })
      } else if (primaryIndex == undefined && secondaryIndex != undefined) { 
        
      } else if (primaryIndex != undefined && secondaryIndex != undefined) {    
        this.data.productSpecList.forEach((spec, index) => {
          if (primaryIndex === spec.primarySpecId && secondaryIndex === spec.secondarySpecId) {
            curSpecImg = spec.imageUrl
            // this.setData({
              // currentPrice: spec.price
            // })

            let productInfo = this.data.productInfo
            productInfo.price = spec.price
            
            this.currentPriceRegion = spec.price
            
            this.setData({
              productInfo
            })
          }
        })


        // this.data.productSpecList.forEach((spec, index) => {
        //   if (primaryIndex === index) {
        //     curPrimarySpecId = spec.primarySpecId
        //   }
        //   if (secondaryIndex === index) {
        //     curSecondarySpecId = spec.secondarySpecId
        //   }
        // })
        // console.log(curPrimarySpecId)
        // console.log(curSecondarySpecId)
        // this.data.productSpecList.forEach((spec, index) => {
        //   if (curPrimarySpecId === spec.primarySpecId && curSecondarySpecId === spec.secondarySpecId) {
        //     curSpecImg = spec.imageUrl
        //   }
        // })
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

  selectPrimarySpecEnvs(e) {   //选择一级规格点击效果
    let selectSpec = e.currentTarget.dataset.spec

    // console.log(selectSpec)
    console.log(this.data.selectedSpecType.length)
    if (this.data.selectedSpecType.length == 1 ) {
      let productInfo = this.data.productInfo
      productInfo.price = selectSpec.price
      
      this.setData({
        productInfo: productInfo,
        currentPriceRegion: selectSpec.price
      })
    }
   

    // if (selectSpec.primaryDisabled) return;

    this.setSelectedSpec(e, 'primary')
  },

  selectSecondarySpecEnvs(e) {
    let selectSpec = e.currentTarget.dataset.spec
    let productInfo = this.data.productInfo
    productInfo.price = selectSpec.price

    this.setData({
      productInfo: productInfo,
      currentPriceRegion: selectSpec.price
    })
    console.log(selectSpec)
    if (selectSpec.secondaryDisabled) return;
    this.setData({
      productInfo: productInfo
    })
    this.setSelectedSpec(e, 'secondary')
  },

  checkBuyEnv() {
    // this._showLoading()

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
    let collageId = this.data.collageId
    let isCollageBuy = this.data.isCollageBuy
    //直接购买和开团参团直接跳到支付页

    if (this.data.postType === '0' || this.data.postType === '2') {
      let navigatorUrl = `/pages/confirmOrder/confirmOrder?postType=${this.data.postType}&productId=${productId}&productSpecId=${productSpecId}&number=${number}&productType=${this.data.productType}&collageId=${collageId}`;
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
    if (this.data.selectSpec == '') {
      return
    }
    watch.setData({
      inputGoodsNum: this.data.inputGoodsNum - 1
    })
    this.checkNum()
  },

  addNumEnv() {
    // console.log(this.data.selectSpec)
    if (this.data.selectSpec == '') {
      return
    }
    watch.setData({
      inputGoodsNum: this.data.inputGoodsNum - 0 + 1
    })
    this.checkNum()
  },

  changeInputValEnv(e) {
    console.log(e)
    watch.setData({
      inputGoodsNum: e.detail.value
    })
    this.checkNum()
  },

  checkNum() { 
    let selectSpec = this.data.selectSpec
    console.log(selectSpec)
    // this.setData({
    //   selectSpec: selectSpec,
    //   selectSpecTax: Number(selectSpec.tax)*Number(this.data.inputGoodsNum) != 0 ? (Number(selectSpec.tax)*Number(this.data.inputGoodsNum)).toFixed(2) : '0.0'
    // })

    if (this.data.productInfo.isSpceProduct == 1) {
      if (selectSpec.isSeckillLimit == 0) {  //非限购商品
        if (this.data.inputGoodsNum > selectSpec.stockNumber) {
          wx.showToast({
            title: '库存不足',
            icon: 'none'
          })
          this.setData({
            inputGoodsNum: Number(selectSpec.stockNumber),
            selectSpecTax: (Number(selectSpec.tax)*Number(selectSpec.stockNumber)).toFixed(2)
          })
        }
      } else if (selectSpec.isSeckillLimit == 1) {  //限购商品
        selectSpec.seckillLimitNumber = Number(selectSpec.seckillLimitNumber); //秒杀限购数量
        selectSpec.stockNumber = Number(selectSpec.stockNumber);

        if (selectSpec.seckillLimitNumber > selectSpec.stockNumber) {  //秒杀库存大于真实库存
          //限购数大于库存
          if (this.data.inputGoodsNum > selectSpec.stockNumber) {  //选择数大于库存数
            wx.showToast({
              title: '库存不足',
              icon: 'none'
            })
            // this.data.inputGoodsNum = Number(selectSpec.stockNumber);
            this.setData({
              inputGoodsNum: Number(selectSpec.stockNumber),
              selectSpecTax: (Number(selectSpec.tax)*Number(selectSpec.stockNumber)).toFixed(2)
            })
          }
        } else if (selectSpec.seckillLimitNumber < selectSpec.stockNumber) {  //真实库存大于秒杀库存
          if (this.data.inputGoodsNum > selectSpec.seckillLimitNumber) {
            wx.showToast({
              title: '已达最大购买数量',
              icon: 'none'
            })
            // this.data.inputGoodsNum = Number(selectSpec.seckillLimitNumber);
            this.setData({
              inputGoodsNum:Number(selectSpec.seckillLimitNumber),
              selectSpecTax: (Number(selectSpec.tax)*Number(selectSpec.seckillLimitNumber)).toFixed(2)
            })
          }
        } else if (selectSpec.seckillLimitNumber == selectSpec.stockNumber) {
          if (this.data.inputGoodsNum > selectSpec.seckillLimitNumber) {
            //限购数等于库存
            wx.showToast({
              title: '已达最大购买数量',
              icon: 'none'
            })
            // this.data.inputGoodsNum = Number(selectSpec.seckillLimitNumber);
            this.setData({
              inputGoodsNum:Number(selectSpec.seckillLimitNumber),
              selectSpecTax: (Number(selectSpec.tax)*Number(selectSpec.seckillLimitNumber)).toFixed(2)
            })
          }
        }
      }
    }
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
      this.setData({
        postType: '1',
        isCollageBuy: false
      })
    }

    if (actionType === 'atOnceBuy') {
      this.setData({
        postType: '0',
        isCollageBuy: false
      })
    }
    if (actionType === 'groupBuy') {
      this.setData({
        postType: '2',
        isCollageBuy: true
      })
    }
    if (actionType === 'grouPin') {
      this.setData({
        postType: '2',
        isCollageBuy: true,
        showDetail: false

      })
    }
    console.log('拼团', this.data.isCollageBuy)
    console.log("拼团", this.data.collageId)

    this._showMaskLayer()
    this._showSpecSelectPlain()
    // clearInterval(this.timer)
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
    let loginToken = wx.getStorageSync('token')
    if (loginToken == '' || loginToken == 'no' || loginToken.length < 5) {
      wx.redirectTo({
        url: '/pages/login/login',
      })
    } else {
      if (this.data.isGroupProduct === '1') {
        console.log('组合商品 + atOnceBuy')
        wx.navigateTo({
          url: `/pages/groupProduct/groupProduct?postType=0&productId=${this.data.productId}`,
          // url: `/pages/groupProduct/groupProduct?postType=0&productId=145730`,
        })
        return
      }
      this.setData({
        collageId: ''
      })
      this._showSpecPlain('atOnceBuy')
    }
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

  // _changeAddress(e) {
  //   let provinceName = e.detail.provinces.areaName
  //   let cityName = e.detail.citys.areaName
  //   let areaName = e.detail.area.areaName
  //   let fullAddress = provinceName + '、' + cityName + '、' + areaName

  //   this.setData({
  //     fullAddress: fullAddress
  //   })
  // },

  // _changePostage(e) {
  //   let provinceId = e.detail.provinces.areaId
  //   this._getPostage(provinceId)
  // },

  // _showAreaPicker() {
  //   this.ani_areaPicker.translate3d(0, 0, 0).step();
  //   this.setData({
  //     showAreaPickerAni: this.ani_areaPicker.export()
  //   })
  // },

  // _hideAreaPicker() {
  //   this.ani_areaPicker.translate3d(0, this.data.areaPickerHeight, 0).step()

  //   this.setData({
  //     showAreaPickerAni: this.ani_areaPicker.export()
  //   })
  // },

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
    console.log('_hideSpecSelectPlain')
    // this.setTimer(this.data.top)
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
  _closeSpecSelectPlainEnv() {
    return new Promise((resolve, reject) => {
      this.closeSpecSelectPlainEnv()
      // console.log(this.data.addressIds)
      resolve('123')
    })
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
  // 设置拼团列表
  // setGroupList(data) {
  //   let groupList = data.data.applyCollageList
  //   this.data.fakerGroupList = []
  //   if (groupList.length > 2) {
  //     let endList = groupList.slice(0, 2)
  //     this.data.fakerGroupList = groupList.concat(endList)
  //   } else {
  //     this.data.fakerGroupList = groupList
  //   }
  //   if (groupList.length > 0) {
  //     this.restTimer = setInterval(() => {
  //       // this.data.currentTimes += 100
  //       this.data.currentTimes = (new Date()).getTime()
  //       this.timerFuc(this.data.fakerGroupList, 0)
  //       console.log("___", '11111111')
  //     }, 100)
  //   }
  // },
  //定时器函数
  timerFuc(dataList, listType) {
    dataList.forEach((item) => {
      let diffence = item.endTime - Number(this.data.currentTimes)
      // console.log('________', diffence)
      if (diffence > 0) {
        item.restTime = countDown(diffence)
      } else {
        // this._showLoading()
        this._getGoodsDetails()
        clearInterval(this.restTimer)

      }
      // console.log('-------------', item.restTime)
    })
    if (listType == 0) {
      this.setData({
        fakerGroupList: dataList,
      })
    }
    if (listType == 1) {
      this.setData({
        groupList: dataList,
      })
    }
  },

  uniq(array){
    var temp = []; //一个新的临时数组
    for(var i = 0; i < array.length; i++){
        if(temp.indexOf(array[i]) == -1){
            temp.push(array[i]);
        }
    }
    return temp;
  },

  check() {
    return true
  },

  _getGoodsDetails() {
    let params = {
      productId: this.data.productBarCode? '' : this.data.productId,
      productBarCode: this.data.productBarCode || '',
    }
    // 关闭加载
    // this._hideLoading()

    getGoodsDetail(params).then(res => {
      console.log('商品详情：', res)
      if (res.data.code === '1') {
        if (res.data.data.isChecked == 1) {  //如果已通过审核 无参数模式显示小程序首页
          if (this.data.productId == '145660') {
            wx.navigateTo({
              url: `/pages/shopIndex/index`
            })
            return
          }
        }
        let data = res.data
        this._setPageTitle(data.data.productName)
        this.setData({
          productName: data.data.productName,
          isDefault: false,
          bannerImages: data.headerImageList,
          productInfo: data.data,
          currentprice: data.data.price,  //商品价格
          currentPriceRegion: data.data.priceRegion,
          productIntroList: data.data.productIntroList,
          productIntroTitles: this._productIntroTitle(data.data.productIntroList),
          goodsListHotSale: setJumpUrl(data.data.sameKindWholesaleList),
          goodsListRecommend: setJumpUrl(data.data.recommendWholesaleList),
          productSpecList: this._generateSpecList(data.data.productSpecList),
          questionData: data.data.questionData,
          productType: data.data.productType,
          inputNum: data.data.mobile,
          maxStockNum: data.data.stockNumber,
          // isCollageProduct: data.data.isCollageProduct,
          // groupList: data.data.applyCollageList,
          // collagePrice: data.data.collagePrice,
          // applyOrderSize: data.data.applyCollageSize,
          // isApplyingCollage: data.data.isApplyingCollage,
          // applyingCollageOrderId: data.data.applyingCollageOrderId,
          // salesDetails: data.data.salesDetails,
          // collageSize: data.data.collageSize
        }) 

        this.setData({
          cartProductNumbers: this.data.productInfo.cartProductNumbers
        })
        console.log('商品规格列表：', this.data.productSpecList)

        let secondSpecNumber = []
        this.data.productSpecList.forEach(spec=>{
          secondSpecNumber.push(spec.secondarySpecName)
        })
        this.setData({
          secondSpecNumber: this.uniq(secondSpecNumber)  //2级规格数量
        }, () => {
          console.log(this.data.secondSpecNumber)
        })

        //筛选存在未售罄二级规格的一级规格
        let realPrimaryWord = []
        this.data.productSpecList.map( (key,index) =>{ 
          if (!key.primaryDisabled) {
            realPrimaryWord.push(key.primarySpecId)
          }
        })
        realPrimaryWord = this.uniq(realPrimaryWord)
        console.log('此一级规格下存未售罄二级规格',realPrimaryWord)   //存在未售罄2级规格的1级规格
        this.setData({
          realPrimaryWord
        })

        //一级已筛选规格
        let primaryBox = []
        this.data.productSpecList.map((data, index) => {
          if (this.data.productSpecList[index + 1] == null || this.data.productSpecList[index + 1] == undefined) {
            primaryBox.push(this.data.productSpecList[index])
            return
          }
          if (this.data.productSpecList[index].primarySpecId != this.data.productSpecList[index+1].primarySpecId) {
            primaryBox.push(this.data.productSpecList[index])
          }
        })
        // console.log(primaryBox)
        primaryBox.map((data, index) => {
          realPrimaryWord.map((x, index) => {
            if (data.primarySpecId == x) {
              data.weigth='isShow'
            }
          })
        })
        console.log('所有一级规格', primaryBox)
        // const localprimaryBox = primaryBox
        wx.setStorageSync('localprimaryBox' , primaryBox )
        this.setData({
          primaryBox,
          // localprimaryBox: primaryBox
        })

        //筛选存在未售罄一级规格的二级规格
        let realSecondord = []
        this.data.productSpecList.map( (key,index) =>{ 
          if (!key.secondaryDisabled) {
            realSecondord.push(key.secondarySpecId)
          }
        })
        let currentProductSpecList = this.data.productSpecList
        console.log('此二级规格下存未售罄一级规格', realSecondord)
        realSecondord.map((data,index) => {
          currentProductSpecList.map((dat,index) => {
            if (dat.secondarySpecId == data) {
              dat.secondaryDisabled = false
            }
          })
        })
        this.setData({
          productSpecList: currentProductSpecList
        },()=> {
          // console.log(this.data.productSpecList)
        })

        // let secondBox = []
        // let secondBox = []
        // let currentProductSpecList = this.data.productSpecList
        // // console.log(currentProductSpecList)
        // realSecondord.map((y,index) => {  //此二级规格下存未售罄一级规格
        //   for (var i = 0; i < this.data.secondSpecNumber.length; i++) {
        //     if (currentProductSpecList[i].secondarySpecId == y) {
        //       currentProductSpecList[i].weigth = 'isShow'
        //       // secondBox.push(currentProductSpecList[i])
        //     }
        //   }
        // })
        // console.log(secondBox)
        // console.log(currentProductSpecList)
        // this.setData({
        //   productSpecList: currentProductSpecList
        // }, () => {
        //   console.log(this.data.productSpecList)
        // })
        
        
        // console.log(secondBox)
        // secondBox.map((data, index) => {
        //   realSecondord.map((x, index) => {
        //     if (data.secondarySpecId == x) {
        //       data.weigth='isShow'
        //     }
        //   })
        // })
        // console.log(this.data.secondBox)
        // this.setData({
        //   secondBox
        // })




        // let secondBox = []
        // this.data.productSpecList.map((data, index) => {
        //   if (this.data.productSpecList[index + 1] == null || this.data.productSpecList[index + 1] == undefined) {
        //     secondBox.push(this.data.productSpecList[index])
        //     return
        //   }
        //   if (this.data.productSpecList[index].secondarySpecId != this.data.productSpecList[index+1].secondarySpecId) {
        //     secondBox.push(this.data.productSpecList[index])
        //   }
        // })
        // console.log(secondBox)
        
        // secondBox.map((data, index) => {
        //   realPrimaryWord.map((x, index) => {
        //     if (data.secondarySpecId == x) {
        //       data.weigth='isShow'
        //     }
        //   })
        // })
        // console.log(secondBox)
        // this.setData({
        //   secondBox
        // })


        

        




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


        // 商品已售完
        if (this.data.productInfo.isSoldOut) {
          return
        }
        let laytime = setTimeout(res => {
          this._hideLoading()
          clearTimeout(laytime)
        }, 800)
      }
    }).catch(res => {
      console.log('err', res)
      this._timeout()
      // this._hideLoading()
    })
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
      let toggle_primary = true
      let isExistPrimarySpec = true;

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
      if (data.code !== '1') { //商品已下架
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

    // this._hideLoading()
    let laytime = setTimeout(res => {
      this._hideLoading()
      clearTimeout(laytime)
    }, 800)

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
  showGroupBox() {
    this._showMaskLayer()
    this.setData({
      showDetail: true
    })
    this.restTimer2 = setInterval(() => {
      this.data.currentTimes = (new Date()).getTime()
      this.timerFuc(this.data.groupList, 1)
    }, 100)

  },
  hideDetail() {
    this._hideMaskLayer()
    this.setData({
      showDetail: false
    })
    clearInterval(this.restTimer2)

  },
  setTimer(toper) {
    console.log('触发了')
    let that = this
    let num = this.data.fakerGroupList.length //团个数
    let height = this.data.itemHeight //滚动视图高
    let step = height / num //item高度
    let top = toper || 0
    if (num > 2) {
      this.swiperTimer = setInterval(function() {
        console.log(2222)
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
  // pauseEnv(){
  //   console.log(111)

  //   clearInterval(this.SwiperTimer)
  // },
  // startEnv(){
  //   console.log('start')
  //   let toper = this.data.top
  //   this.setTimer(toper)
  // },
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
  groupBuy() {
    if (this.checkIsGroupUser()) {
      this.setData({
        collageId: 0
      })
      this._showSpecPlain('groupBuy')

    }

  },
  grouPin(e) {
    // if (this.checkIsGroupUser()){
    console.log('拼团')
    let collageId = e.currentTarget.dataset.collageid
    let isJoinedCollage = e.currentTarget.dataset.join
    let orderId = e.currentTarget.dataset.orderid
    console.log(isJoinedCollage)
    if (isJoinedCollage =='0'){
      console.log('----0')
      this.setData({
        collageId: collageId
      })
      this._showSpecPlain('grouPin')
    }else{
      wx.navigateTo({
        url: `/pages/groupShoping/groupShoping?orderId=${orderId}`,
      })

    }
  },

  onLoad(options) {
    console.log(options)
    this._showLoading()
    this._removeStorage()
    this._initWatchData()
    this._initAnimation()
    this._getRegionList()

    console.log('-------',options)
    if (options.productBarCode) {
      this.setData({
        productBarCode: options.productBarCode
      })
    }

    this.setData({
      // productId: options.productId
      productId: options.productId || '145660' 
      // productId: 145671,     //普通商品
      // productId: 145730,     //组合商品
      // 145681
      // 145726 跨境
      // 144478
    }, () => {
      wx.setStorageSync('productId', this.data.productId)   
      if (options.shareUserSecret) {                                      //正常带参数链接
        wx.setStorageSync('shareUserSecret', options.shareUserSecret)
        this.setData({
          shareUserSecret: options.shareUserSecret
        })
      } else {                                                            //无参数链接（纯搜索首页或审核模式）
        if (this.data.productId == '145660') {
          wx.setStorageSync('shareUserSecret', 'CvEZC1kg')
          this.setData({
            shareUserSecret: 'CvEZC1kg'
          })
          // if ( this.data.isChecked == 0 ) {  //如果已通过审核 显示小程序首页
          //   wx.navigateTo({
          //     url: `/pages/shopIndex/index`
          //   })
          // }  
        }
      }


      // wx.setStorageSync('productId', this.data.productId)   
      // if (options.shareUserSecret) {
      //   wx.setStorageSync('shareUserSecret', options.shareUserSecret)
      //   this.setData({
      //     shareUserSecret: options.shareUserSecret
      //   })
      // } else {  
      //   if (this.data.productId == '145660') {
      //     wx.setStorageSync('shareUserSecret', 'CvEZC1kg')
      //     this.setData({
      //       shareUserSecret: 'CvEZC1kg'
      //     })
      //   }
      // }
    })
    
    


    // 适配X
    let isIphoneX = getApp().globalData.isIphoneX;
    if (isIphoneX) {
      this.setData({
        isIphoneX: isIphoneX,
        btuBottom: '68rpx'
      })
    }
  },

  onReady() {

  },
  onShow() {
    this.setData({
      selectedSpecType: '',
      selectedSpecName: '',
      selectSpecType: []
    }, () => {
      this._getGoodsDetails() 
      console.log(this.data.selectedSpecType)
      console.log(this.data.selectedSpecName)
    })

    

    // this.setData({
    //   curProductId: ''
    // }, () => {
    //   this._getCurProductId()  
    // })
    
    // console.log('_____show', getApp().globalData.goToDetail)
    // if (getApp().globalData.goToDetail) {
    //   this.setData({
    //     isSelectedFinish: true
    //   })
    //   getApp().globalData.goToDetail = false
    //   this._showMaskLayer()
    //   wx.showModal({
    //     title: '确认要放弃付款吗？',
    //     content: '您尚未完成支付，喜欢的商品可能会被抢空哦~',
    //     cancelText: '暂时放弃',
    //     confirmText: '继续支付',
    //     confirmColor: '#F84C51',
    //     cancelColor: '#999',
    //     success: (res) => {
    //       this._hideMaskLayer()
    //       if (res.confirm) {
    //         console.log('用户点击确定')
    //         this.checkBuyEnv()
    //       } else if (res.cancel) {
    //         console.log('用户点击取消')
    //       }
    //     }
    //   })
    // }
    // console.log('detail-----', getApp().globalData.goToDetail)
  },

  onHide: function() {
    clearInterval(this.restTimer)
    console.log('hide')
    this._closeSpecSelectPlainEnv().then(res => {
      console.log(res)
      this._clearSelectedSpec()
      clearInterval(this.swiperTimer)
      this.hideDetail()
      // getApp().globalData.goToDetail = false

    })
    // this._clearSelectedSpec()
    // console.log('--------',getApp().globalData.swiperTimer)
    // console.log('--------', getApp().globalData.restTimer)


  },
  onUnload() {
    // getApp().globalData.goToDetail = false
    clearInterval(this.restTimer)
    clearInterval(this.swiperTimer)
  },
  showphone(e) {
    console.log(e)
    this.setData({
      isphone: 1,
      // productId: this.data.dataList[e.currentTarget.id].productId
      currentProId: e.target.dataset.id,
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