// pages/userCenter/allOrder/allOrder.js
import {
  getOrderList,
  cancelOrder,
  deleteOrder,
  queryTake,
  orderPay
} from '../../api/api.js';

const ANI_TIME_MASKLAYER = 260

/*状态的文字 0全部 1待付款 2待发货 3已发货 4已完成 5已取消/交易关闭 6退款7待分享*/


Page({
  onShareAppMessage(res) {
    console.log(res)
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: '快来拼团',
      path: '/pages/groupDetail/groupDetail'
    }
  },

  /**
   * 页面的初始数据
   */
  data: {
    // loading
    isLoading: true,
    loadOver: false,
    showConfirmBox : false,

    orderList: [],

    // 翻页
    pagesize: 20,
    pageidx: 1,

    // 导航
    tabList: [{
        index: 0,
        id: 0,
        text: '全部'
      },
      {
        index: 1,
        id: 1,
        text: '待付款'
      },
      {
        index : 2,
        id : 7,
        text : '待分享'
      },
      {
        index: 3,
        id: 2,
        text: '待发货'
      },
      {
        index: 4,
        id: 3,
        text: '已发货'
      },
      {
        index: 5,
        id: 4,
        text: '已完成'
      },
      {
        index: 6,
        id: 6,
        text: '售后'
      },
    ],
    
    /*状态对应的按钮*/
    statusBtns: [
      [
        {
          type: 0,
          text: '取消订单',
          url: '/pages/allOrder/allOrder',
          env: 'cancelOrderEnv'
        },
        {
          type: 1,
          text: '付款',
          url: '/pages/allOrder/allOrder',
          env: 'paymentEnv'
        }
      ],
      [

      ],
      [
        {
          type: 2,
          text: '查看物流',
          url: '/pages/allOrder/allOrder',
          env: 'seeLogisticsEnv'
        },
        {
          type: 3,
          text: '确认收货',
          url: '/pages/allOrder/allOrder',
          env: 'confirmReceiptEnv'
        }
      ],
      [
        {
          type: 4,
          text: '查看物流',
          url: '/pages/allOrder/allOrder',
          env: 'seeLogisticsEnv'
        }
      ],
      [
        {
          type: 5,
          text: '删除订单',
          url: '/pages/allOrder/allOrder',
          env: 'deleteOrderEnv'
        }
      ],
      [
        {
          type: 6,
          text: '查看详情',
          url: '/pages/allOrder/allOrder',
          env: 'viewRefundDetailEnv'
        }
      ]
    ],
    curSelectIndex: 0,
    curStatus : 0,
    isShow: true,
    tabSel: true,
    selId: 'all',
  },

  paymentBtn() {
    console.log('支付')

    let params = {
      payType: 'weixin',
      orderId: this.data.orderId
    }
    orderPay(params).then(res => {
      console.log('获取支付信息：')
      console.log(res)

      if (res.data.code === '1') {
        console.log(res.data.msg)

        let payModel = res.data
        this.wxRequestPayment(payModel.orderPayInfo)
        this._closePayPanelEnv()
      } else {
        console.log(res.data.msg)
      }

    })
  },

  wxRequestPayment(payModel) {
    wx.requestPayment({
      timeStamp: payModel.timeStamp,
      nonceStr: payModel.nonceStr,
      package: payModel.package,
      signType: payModel.signType,
      paySign: payModel.paySign,
      success: res => {
        console.log('支付成功')
        console.log(res)
        this._paySuccess(res)

      },
      fail: res => {
        console.log('支付失败')
        console.log(res)
        this._payFail(res)

      }
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
      // console.log(this.data.orderId)
      wx.redirectTo({
        url: `/pages/orderPayStatus/orderPayStatus?orderId=${this.data.orderId}`,
      })
      return
    }, 2000)
  },

  _payFail(res) {
    this.data.msg = '支付失败'
    if (res.errMsg == 'requestPayment:fail cancel') {
      this.data.msg = '支付取消'
    }
    wx.showToast({
      title: this.data.msg,
      icon: 'fail',
      duration: 1600
    })
  },

  paymentEnv(e) {
    // console.log(e)
    let orderId = e.currentTarget.dataset.orderid
    let price = e.currentTarget.dataset.price
    // console.log(orderId)
    this.data.orderId = orderId
    this.setData({
      paymentAmount: price
    })
    this._showPayPanel()
  },

  confirmReceiptEnv(e) {
    // console.log(e)
    let orderId = e.currentTarget.dataset.orderid
    let imgUrl = e.currentTarget.dataset.img
    let isCollageBuy = e.currentTarget.dataset.collage
    this.setData({
      groupImg : imgUrl
    })

    if(isCollageBuy == '0'){
      wx.showModal({
        title: '提示?',
        content: '您是否已收到该订单商品？',
        success: res => {
          if (res.confirm) {
            this._queryTake(orderId)
            
          } else if (res.cancel) {
            wx.showToast({
              title: '未收货',
            })
          }
        }
      })
    }else{
      this._showMaskLayer()
      this.setData({
        showConfirmBox : true,
        groupImg: imgUrl,
        orderId : orderId
      })
    }
  },
  groupConfirm(){
    this._queryTake(this.data.orderId)
    this._hideMaskLayer()
    this.setData({
      showConfirmBox: false
    })

  },
  groupCancel(){
    // wx.showToast({
    //   title: '未收货',
    // })
    this._hideMaskLayer()
    this.setData({
      showConfirmBox : false
    })

  },

  seeLogisticsEnv(e) {
    // console.log(e)
    let orderId = e.currentTarget.dataset.orderid
    wx.navigateTo({
      url: `/pages/logistics/logistics?orderId=${orderId}`,
    })
  },

  deleteOrderEnv(e) {
    // console.log(e)
    let orderId = e.currentTarget.dataset.orderid

    wx.showModal({
      title: '确认删除订单?',
      content: '删除之后订单无法恢复，若存在售后问题则无法处理，请慎重考虑',
      success: res => {
        if (res.confirm) {
          this._deleteOrder(orderId)
        }

      }
    })
  },

  cancelOrderEnv(e) {
    // console.log(e)
    let orderId = e.currentTarget.dataset.orderid

    wx.showModal({
      title: '提示',
      content: '确认取消订单吗',
      success: res => {
        if (res.confirm) {
          this._cancelOrder(orderId)
        }
      }
    })
  },

  _queryTake(orderId) {
    let params = {
      orderId: orderId
    }
    queryTake(params).then(res => {
      console.log('确认收货')
      console.log(res)
      if (res.data.code === '1') {
        wx.showToast({
          title: '订单已完成',
        })
        this.setData({
          orderList : []
        })
        this._getOrderList(this.data.curStatus)
        this._resetOrderForOver(orderId)

      }
    })
  },

  _resetOrderForOver(orderId) {
    this.data.orderList.forEach(order => {
      if (order.orderId === orderId) {
        order.status = 4
      }
    })
    this.setData({
      orderList: this.data.orderList
    })
  },

  _deleteOrder(orderId) {
    let params = {
      orderId: orderId
    }
    deleteOrder(params).then(res => {
      console.log('删除订单')
      console.log(res)
      if (res.data.code === '1') {
        wx.showToast({
          title: '已删除订单',
        })
        this.resetOrderList(orderId)

      } else {
        wx.showToast({
          title: '操作失败',
        })
      }
    })
  },

  resetOrderList(orderId) {
    this.data.orderList.forEach((order, index) => {
      if (order.orderId === orderId) {
        this.data.curOrderIndex = index
      }
    })
    this.data.orderList.splice(this.data.curOrderIndex, 1)
    this.setData({
      orderList: this.data.orderList
    })
  },

  _cancelOrder(orderId) {
    let params = {
      orderId: orderId
    }
    cancelOrder(params).then(res => {
      console.log('取消订单')
      console.log(res)
      if (res.data.code === '1') {
        // this._resetOrderList(orderId)
        this._showLoading()
        this.data.orderList = []
        this.data.isPullDown = true
        this._getOrderList(this.data.curStatus)
      } else {
        wx.showToast({
          title: '操作失败',
        })
      }
    })
  },

  _resetOrderList(orderId) {
    this.data.orderList.forEach((order, index) => {
      if (order.orderId === orderId) {
        if (this.data.status == '0') {
          order.status = 5
        }
        if (this.data.status == '1') {
          this.data.curOrderIndex = index
          this.data.orderList.splice(this.data.curOrderIndex, 1)
        }
      }
    })
    this.setData({
      orderList: this.data.orderList
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  selStatusEnv(e) {
    console.log(e)
    this.data.curIndex = e.currentTarget.dataset.index
    this.data.curStatus = e.currentTarget.dataset.id
    this.data.pageidx = 1
    this.setData({
      orderList : []
    })

    console.log(this.data.curIndex)
    console.log(this.data.curStatus)

    this.setData({
      curSelectIndex: this.data.curIndex,
      loadOver: false,
    })

    if (this.data.curStatus === 6) { //售后
      this.setData({
        isRefund: true
      })
    } else {
      this.setData({
        isRefund: false
      })
    }

    this._setOrderStatusForStorage(this.data.curStatus)
    this._getOrderList(this.data.curStatus)
  },

  focus() {
    this.setData({
      isShow: false
    })
  },

  blur() {
    this.setData({
      isShow: true
    })
  },
  selOrder(e) {
    // console.log(e)
    this.setData({
      tabSel: !this.data.tabSel,
      selId: e.currentTarget.id
    })
  },

  _getOrderList(status) {
    this.setData({
      loadOver: false
    })
    this._showLoading()

    let params = {
      pagesize: this.data.pagesize,
      status: status == undefined ? '' : status,
      pageidx: this.data.pageidx
    }
    getOrderList(params).then(res => {
        this._hideLoading()
        if (this.data.isPullDown) {
          wx.stopPullDownRefresh()
        }

        console.log('订单列表: ', res)
        let dataList = res.data.dataList
        console.log(dataList.length, this.data.pagesize)

        if (this.data.isRefund) {
          dataList = this._setOrderList(dataList)
        } else {
          dataList = this._setOrderStatusName(dataList)
          dataList = this._setOrderBtns(dataList)
        }
        dataList = this._setGoodsStatusName(dataList)

        if (dataList.length < this.data.pagesize) {
          if (this.data.pageidx == '1') {
            this.setData({
              isShowEndLogo: false
            })
          } else {
            console.log('到底了')
            this.setData({
              isShowEndLogo: true
            })
          }
          this.setData({
            isLoadEnd: true,
          })
        } else {
          this.setData({
            isShowEndLogo: false,
            isLoadEnd: false
          })
        }

        this.setData({
          orderList: this.data.orderList.concat(dataList),
          loadOver: true
        })
        
      })
      .catch(res => {
        this._timeout()
      })
  },

  _setOrderBtns(orderList) {
    if (!orderList.length) return orderList;
    orderList.forEach(order => {
      switch(order.status) {
        case '1':
          if (order.isUnderLineBuy == 1) { 
            order.btns = [
              {
                name: '取消订单',
                env: 'cancelOrderEnv',
                primary: false
              }
            ]
          } else {
            order.btns = [
              {
                name: '取消订单',
                env: 'cancelOrderEnv',
                primary: false
              },
              {
                name: '付款',
                env: 'paymentEnv',
                primary: true
              }
            ]
          } 
          break;
        case '2':
          order.btns = []
          break;
        case '3':
          order.btns = [
            {
              name: '查看物流',
              env: 'seeLogisticsEnv',
              primary: false
            },
            {
              name: '确认收货',
              env: 'confirmReceiptEnv',
              primary: true
            }
          ]
          break;
        case '4': 
          if (order.isUnderLineBuy==1) {
            break;
          } else {
            order.btns = [
              {
                name: '查看物流',
                env: 'seeLogisticsEnv',
                primary: false
              }
            ]
            break;
          }  
        case '5':
          order.btns = [
            {
              name: '删除订单',
              env: 'deleteOrderEnv',
              primary: false
            }
          ]
          break;
      }
      if (order.waitShare == '1') {
         
      }
    })
    return orderList
  },

  _setOrderStatusName(orderList) {
    if (!orderList.length) return orderList;
    orderList.forEach(order => {
      switch(order.status) {
        case '1':
          order.statusName = '待付款'
          break;
        case '2':
          order.statusName = '待发货'
          break;
        case '3':
          order.statusName = '已发货'
          break;
        case '4':
          order.statusName = '已完成'
          break;
        case '5':
          order.statusName = '交易关闭'
          break;
        case '6':
          order.statusName = '退款'
          break;
      }
      if (order.useCollageStatusDetail =='1' && order.isCollageBuy=="1"){
        if(order.status-0<3){
          order.statusName = order.collageStatusDetail
        }else if(order.status == '3'){
          order.statusName = '拼团成功，已发货'
        }else if(order.status == '4'){
          order.statusName = '拼团成功，已完成'
        }
      }
    })
    return orderList
  },

  _setGoodsStatusName(orderList) {
    orderList.forEach(order => {
      if (order.productList.length) {
        order.productList.forEach(goods => {
          switch (goods.refundStatus) {
            case '1':
              goods.refundStatusName = '退款中'
              break;
            case '7':
              goods.refundStatusName = '退款中'
              break;
            case '8':
              goods.refundStatusName = '退款中'
              break;
            case '3':
              goods.refundStatusName = '退款中'
              break;
            case '4':
              goods.refundStatusName = '退款中'
              break;
            case '9':
              goods.refundStatusName = '退款中'
              break;
            case '2':
              goods.refundStatusName = '退款失败'
              break;
            case '6':
              goods.refundStatusName = '退款失败'
              break;
            case '5':
              goods.refundStatusName = '退款成功'
              break;
          }
        })
      }
    })

    return orderList
  },

  _setOrderList(orderList) {
    orderList.forEach(order => {
      if (order.isCollageAutoRefund =='0'){
        switch (order.status) {
          case '1':
            order.statusName = '退款中'
            break;
          case '7':
            order.statusName = '退款中'
            break;
          case '8':
            order.statusName = '退款中'
            break;
          case '3':
            order.statusName = '退款中'
            break;
          case '4':
            order.statusName = '退款中'
            break;
          case '9':
            order.statusName = '退款中'
            break;
          case '2':
            order.statusName = '退款失败'
            break;
          case '6':
            order.statusName = '退款失败'
            break;
          case '5':
            order.statusName = '退款成功'
            break;
        }

      }else{
        switch (order.status) {
          case '1':
            order.statusName = '拼团失败，退款中'
            break;
          case '7':
            order.statusName = '拼团失败，退款中'
            break;
          case '8':
            order.statusName = '拼团失败，退款中'
            break;
          case '3':
            order.statusName = '拼团失败，退款中'
            break;
          case '4':
            order.statusName = '拼团失败，退款中'
            break;
          case '9':
            order.statusName = '拼团失败，退款中'
            break;
          case '2':
            order.statusName = '拼团失败，退款失败'
            break;
          case '6':
            order.statusName = '拼团失败，退款失败'
            break;
          case '5':
            order.statusName = '拼团失败，退款成功'
            break;
        }
      }
      
    })

    return orderList
  },

  _closePayPanelEnv() {
    this._hidePayPanelAni()
    this._hideMaskLayer()
  },

  _clickMaskLayer() {
    this._hidePayPanelAni()
    this._hideMaskLayer()
  },

  _showPayPanel() {
    this._showPayPanelAni()
    this._showMaskLayer()
  },

  _hidePayPanelAni() {
    // console.log(this.data.payPanelHeight)
    this.ani_payPanel.opacity(0).translate3d(0, this.data.payPanelHeight, 0).step()
    this.setData({
      payPanelAni: this.ani_payPanel.export()
    })
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
    this.setData({
      showConfirmBox : false
    })

  },

  refreshEnv() {
    this.data.isPullDown = false

    this.setData({
      timeout: false,
      orderList: []
    })
    this._getOrderList(this.data.status)
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

  _setOrderStatusForStorage(status) {
    wx.setStorageSync('__orderStatus__', status)
  },
  getCurIndex(status,options){
    if (this.data.status == '6' || this.data.status == '1' || this.data.status == '0') {
      this.setData({
        curSelectIndex: options.status
      })
    } else if (this.data.status == '7') {
      this.setData({
        curSelectIndex: 2
      })
    } else {
      this.setData({
        curSelectIndex: options.status - 0 + 1
      })
    }
  },
  showCancelBox(){
    wx.showModal({
      title: '暂时无法取消订单',
      content: '发起拼单24小时后，若拼单未成功将自动取消订单并退款',
      showCancel :false,
      confirmText : '我知道了',
      confirmColor : '#333'
    })
  },
  shareEnv(e){
    let orderId = e.currentTarget.dataset.orderid
    wx.navigateTo({
      url: `/pages/groupShoping/groupShoping?orderId=${orderId}`,
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.data.isPullDown = false

    if (options.status != undefined) {
      let status = options.status
      console.log('----------',status)
      this.data.status = status
      this.setData({
        curStatus : status
      })
      if(status=="6"){
        this.setData({
          scrollLeft : 840
        })
      }
      this._setOrderStatusForStorage(status)

      // 
      this.getCurIndex(this.data.status,options)

    }
    if(this.data.status == '6'){
      this.setData({
        isRefund : true
      })
    }
    this._getOrderList(this.data.status);
    this._initAnimation()

    this._getElementSize('#status').then(res => {
      wx.getSystemInfo({
        success: sys => {
          console.log('当前系统信息：')
          console.log(sys)
          this.setData({
            mainHeight: sys.windowHeight - res.height
          })
        },
      })
    })
  },

  bottomEnv() {
    if (this.data.isLoadEnd) return;
    this.data.isPullDown = false
    this.data.pageidx++;
    console.log('第 ' + this.data.pageidx + ' 页')
    this._getOrderList(this.data.curStatus);
  },

  topEnv() {
    console.log('置顶')
    this.onPullDownRefresh()
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
    console.log('show')
    let orderStatus = wx.getStorageSync('__orderStatus__')
    // this._getOrderList(orderStatus)
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
    this._showLoading()
    this.setData({
      orderList : []
    })
    this.data.isPullDown = true
    this.setData({
      pageidx : 1
    })
    
    this._getOrderList(this.data.curStatus)
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.bottomEnv()


  },

})