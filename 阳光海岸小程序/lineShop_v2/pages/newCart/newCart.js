// pages/cart/cart.js
import { getShoppingCartList, delShoppingCartList, buyShopoingGood, addNumberCart } from '../../api/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isEdit: false,
    toast: false,
    totalPrice: 0,
    editMes: ['编辑', '完成'],
    orderList: [],
    isLoading: false,
    dataLoaded: false,
    AllEdit: false
  },

  _timeout() {
    this._hideLoading()
    this.setData({
      timeout: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // this.getCartList()
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

    this.getCartList()
    // this.getTotalPrice()
    let totalPrice = 0
    this.setData({
      isEdit: false,
      totalPrice: totalPrice.toFixed(2)

    })
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
    console.log('refresh')
    this._showLoading()
    this.getCartList()
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
  /*渲染*/
  getCartList() {
    let params = {
      pagesize: 100,
      pageidx: 1
    }
    getShoppingCartList(params).then(res => {
      console.log(res)
      if (res.data.code == '1') {
        let data = res.data.dataList

        let cartIds = []
        for (let i = 0, len = data.length; i < len; i++) {
          data[i].isCheck = false
          data[i].isEdit = false
          data[i].productList.forEach(function (item) {
            if (item.stockNumber == '0') {
              cartIds.push(item.cartId)
              cartIds = cartIds.join()
              let params = { cartIds: cartIds }
              delShoppingCartList(params)
            }
            item.everyCheck = false
            item.startNum = item.productNumber
          })

        }

        this.setData({
          orderList: data,
          isCheckAll: false,
          dataLoaded: true
        })


        wx.stopPullDownRefresh()
        this._hideLoading()
        wx.hideNavigationBarLoading()
      }

    })
      .catch(res => {
        this._timeout()
      })
  },
  editOrder(e) {
    let list = this.data.orderList;
    let index = e.currentTarget.dataset.idx
    console.log(index)
    list.forEach(function (item, index1) {
      if (index == index1) {
        list[index].isEdit = !list[index].isEdit
      } else {
        item.isEdit = false
      }
    })
    let AllEdit = list[index].isEdit
    this.setData({
      orderList: list,
      AllEdit: AllEdit
    })
  },

  selectAll(e) {
    let idx = e.currentTarget.dataset.idx

    let list = this.data.orderList
    list[idx].isCheck = !list[idx].isCheck
    let productList = list[idx].productList
    console.log(productList)
    productList.forEach(function (item) {
      item.everyCheck = list[idx].isCheck
    })
    this.setData({
      orderList: list
    })
    this.getTotalPrice()
  },
  selectOne(e) {
    console.log(e)
    let list = this.data.orderList
    //全选序号
    let idx = e.currentTarget.dataset.idx
    //反选序号
    let index = e.currentTarget.dataset.index
    let productList = list[idx].productList
    productList[index].everyCheck = !productList[index].everyCheck
    console.log(productList.everyCheck)
    for (let i = 0, len = productList.length; i < len; i++) {
      if (!productList[i].everyCheck) {
        list[idx].isCheck = false
        break
      }
      list[idx].isCheck = true
    }
    console.log(list)
    this.setData({
      orderList: list,
    })
    this.getTotalPrice()
  },
  //数量变化
  _addCartNumbers(idx, index) {
    let list = this.data.orderList
    let productList = list[idx].productList
    console.log('111', idx, index)
    let current = productList[index]
    let params = {
      productId: current.productId,
      productSpecId: current.productSpecId,
      num: current.productNumber
    }
    addNumberCart(params).then(res => {
      console.log(res)
      if (res.data.code == '1') {
        current.realNum = res.data.quantity
      }
      if (res.data.code == '0') {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
        if (current.realNum) {
          current.productNumber = current.realNum
        } else {
          current.productNumber = current.startNum
        }
        this.setData({
          orderList: list
        })

      }
      this.getTotalPrice()
    })
  },
  //外层循环idx，item；内层循环index，eve

  delNum(e) {
    const idx = e.currentTarget.dataset.idx
    const index = e.currentTarget.dataset.index
    let list = this.data.orderList
    let productList = list[idx].productList
    let num = productList[index].productNumber
    let max = productList[index].stockNumber
    //处理购物车库存改变错误
    if (num > max) {
      num = max
      productList[index].productNumber = num
      console.log(num)
      this.setData({
        orderList: list
      }, function () {
        this._addCartNumbers(idx, index)
      })

      return
    }
    //
    num--
    if (num <= 0) {
      return
    }
    productList[index].productNumber = num
    this.setData({
      orderList: list
    })
    this._addCartNumbers(idx, index)
  },
  addNum(e) {
    const idx = e.currentTarget.dataset.idx
    const index = e.currentTarget.dataset.index
    let list = this.data.orderList
    let productList = list[idx].productList
    let num = productList[index].productNumber
    let max = productList[index].stockNumber - 0
    console.log(max)
    if (num >= max) {
      wx.showToast({
        title: `当前商品仅剩${max}件`,
        icon: 'none',
        duration: 800
      })
      productList[index].productNumber = max
      this.setData({
        orderList: list
      })
      this._addCartNumbers(idx, index)
      return
    }
    num++
    productList[index].productNumber = num
    this.setData({
      orderList: list
    })
    this._addCartNumbers(idx, index)

  },

  changeNum(e) {
    console.log(e)
    let value = e.detail.value - 0
    const idx = e.currentTarget.dataset.idx
    let index = e.currentTarget.dataset.index
    let list = this.data.orderList
    let productList = list[idx].productList
    let num = productList[index].productNumber
    let max = productList[index].stockNumber - 0
    let stockNum = productList[index].stockNumber - 0
    if (value >= stockNum) {
      productList[index].productNumber = stockNum
      wx.showToast({
        title: `当前商品仅剩${stockNum}件`,
        icon: 'none',
        duration: 800
      })
    } else if (value <= 0) {
      productList[index].productNumber = 1
    } else {
      productList[index].productNumber = value - 0
    }

    this.setData({
      orderList: list
    })
    this._addCartNumbers(idx, index)
  },
  noGoto() {

  },

  // 计算总价
  getTotalPrice() {
    let list = this.data.orderList
    let total = 0
    list.forEach(function (item) {
      item.productList.forEach(function (i) {
        if (i.everyCheck) {
          total += i.productNumber * i.price
        }
      })

    })
    this.setData({
      totalPrice: total.toFixed(2)
    })
  },

  //获取选中的参数
  getCartIds() {
    let list = this.data.orderList
    let cartIds = []
    let storeList = []
    list.forEach(function (item) {
      item.productList.forEach(function (i) {
        if (i.everyCheck) {
          cartIds.push(i.cartId)
        }
      })
    })
    console.log('------', cartIds)
    cartIds = cartIds.join()

    return cartIds
  },
  //获取商品总数
  getGoodCount() {
    let list = this.data.orderList
    let totalCount = 0
    list.forEach(function (item) {
      if (item.isCheck) {
        totalCount += item.productNumber - 0
      }
    })
    return totalCount
  },

  // 结算功能
  toBuy() {
    let cartIds = this.getCartIds()
    if (!cartIds) {
      wx.showToast({
        title: '请选择商品',
        icon: 'none',
        duration: 800
      })
      return
    }

    let params = { cartIds: cartIds }
    console.log(params)
    buyShopoingGood(params).then(res => {
      console.log('checkCart')
      console.log(res)

      if (res.data.code == '0') {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
        return
      }

      wx.navigateTo({
        url: `../confirmOrder/confirmOrder?cartIds=${cartIds}&postType=1`,
      })
    })



  },
  // 删除商品
  toDel() {
    var that = this
    let list = this.data.orderList
    let cartIds = that.getCartIds()
    if (!cartIds) {
      wx.showToast({
        title: '请选择商品',
        icon: 'none',
        duration: 800
      })
      return
    }

    // let cate = 0
    // for (let i = 0, len = list.length; i < len; i++) {
    //   if (list[i].isCheck) {
    //     cate++
    //   }
    // }
    if (cartIds) {
      wx.showModal({
        title: '提示',
        content: `确认要删除选中的商品吗?`,
        success: function (res) {
          console.log(res)
          if (res.confirm) {
            console.log(cartIds)
            let params = { cartIds: cartIds }
            delShoppingCartList(params).then(res => {
              console.log(res)
              if (res.data.code == '1') {
                that.getCartList()
                let totalPrice = 0
                that.setData({
                  totalPrice: totalPrice.toFixed(2)
                })
              }
            })

          }
        }
      })
    }
  },
  goDetail(e) {
    console.log(e)
    let idx = e.currentTarget.dataset.idx
    let index = e.currentTarget.dataset.index
    let list = this.data.orderList
    let productList = list[idx].productList

    let productId = productList[index].productId
    console.log(productId)
    wx.navigateTo({
      url: `/pages/productDetail/productDetail?productId=${productId}`
    })
  },
  refreshEnv() {
    this.setData({
      timeout: false
    })
    this.getCartList()
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
  go() {
    wx.switchTab({
      url: '/pages/home/home',
    })
  }

})