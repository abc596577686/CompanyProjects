import { getOrderDetail, orderPay, deleteOrder, cancelOrder, queryTake } from '../../api/api.js';
import { dateFormate, countDown } from '../../utils/index.js'

const ANI_TIME_MASKLAYER = 260

Page({

  /**
   * 页面的初始数据
   */
  data: {
    /*状态的文字 0全部 1待付款 2待发货 3已发货 4已完成 5已取消/交易关闭 6退款*/
    statusName: ["待付款", "待发货", "已发货", "交易完成", '交易关闭', "退款"],
    /*对应状态0-8*/
    // ["交易关闭(超时)",'待付款',"待发货",'已发货','已完成','退款中','退款成功','退款关闭','申请超时']
    status: 0,
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
      [],
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
      ]
    ],
    headerName: ["交易关闭", '待付款', "待发货", '已发货', '已完成'],
    // 1 7 8 3 4 9为退款中 2 6为退款关闭 5 为退款完成/成功
    customerServiceName: ['申请售后', "退款中", '退款关闭', '退款中', '退款中', '退款成功', '退款关闭', '退款中', "退款中", "退款中"],
    btnName: [
      ['删除订单'],
      ['取消订单', '付款'],
      [],
      ['查看物流', '确认收货'],
      ['查看物流']
    ],
    showcreateTime: '',
    showpayTime: '',
    showsendTime: '',
    showcomplateTime: '',
  },

  seeLogisticsEnv(e) {
    // console.log(e)
    let orderId = e.currentTarget.dataset.orderid
    wx.navigateTo({
      url: `/pages/logistics/logistics?orderId=${orderId}`,
    })
  },

  confirmReceiptEnv(e) {
    let orderId = e.currentTarget.dataset.orderid

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

        this._changePrePageData(orderId, 1)
        this._getOrderDetail(this.data.orderId)
      }
    })
  },

  cancelOrderEnv(e) {
    console.log(e)
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

  _changePrePageData(orderId, handleType) {
    // 获取页面栈
    let pages = getCurrentPages()
    // console.log(pages)
    if (pages.length > 1) {
      let prePage = pages[pages.length - 2];
      // console.log(prePage)
      if (handleType == 0) {
        prePage._resetOrderList(orderId)
      }
      if (handleType == 1) {
        prePage._resetOrderForOver(orderId)
      }
    }
  },

  _cancelOrder(orderId) {
    let params = {
      orderId: orderId
    }
    cancelOrder(params).then(res => {
      console.log('取消订单')
      console.log(res)
      if (res.data.code === '1') {
        this._changePrePageData(orderId, 0)
        this._getOrderDetail(this.data.orderId)
        // wx.navigateBack({})
      } else {
        wx.showToast({
          title: '操作失败',
        })
      }
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

  _deleteOrder(orderId) {
    let params = {
      orderId: orderId
    }
    deleteOrder(params).then(res => {
      console.log('删除订单')
      console.log(res)
      if (res.data.code === '1') {
        wx.showToast({
          title: '已删除此订单',
          icon: 'success'
        })
        let timer = setTimeout(() => {
          this.changePrePageData(orderId)
          wx.navigateBack({})
          clearTimeout(timer)
        }, 1600)
        

      } else {
        wx.showToast({
          title: '操作失败',
          icon: 'none'
        })
      }
    })
  },

  changePrePageData(orderId) {
    let pages = getCurrentPages()
    if (pages.length > 1) {
      let prePage = pages[pages.length - 2];
      prePage.resetOrderList(orderId)
    }
  },

  changeServiceStatus(orderItemId) {
    this.data.goodsList.forEach(goods => {
      if (orderItemId === this.data.itemId) {
        goods.refundStatus = 3 //设为退款中
      }
    })

    this.setData({
      goodsList: this.data.goodsList
    })
  },

  customerServerEnv(e) {
    console.log(e)
    let servicestatus = e.currentTarget.dataset.servicestatus - 0
    this.data.curServiceStatus = e.currentTarget.dataset.servicestatus - 0
    
    this.data.orderId = e.currentTarget.dataset.orderid
    this.data.itemId = e.currentTarget.dataset.itemid

    if (this.data.curServiceStatus == '6') {
      wx.showModal({
        title: '提示',
        content: '您的售后申请已超时，可电话联系平台客服， 4000639639 为您及时解决。',
        success: res => {
          if (res.confirm) {
            wx.makePhoneCall({
              phoneNumber: '4000639639'
            })
          }
        },
      })
      return
    }
    if (this.data.curServiceStatus == '0') {
      wx.navigateTo({
        url: `/pages/customerService/customerService?orderId=${this.data.orderId}&itemId=${this.data.itemId}`
      })
    } else {
      wx.navigateTo({
        url: `/pages/serviceProgress/serviceProgress?orderId=${this.data.orderId}&itemId=${this.data.itemId}`
      })
    }
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
      console.log(this.data.orderId)
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
    console.log(e)
    let orderId = e.currentTarget.dataset.orderid
    let price = e.currentTarget.dataset.price
    console.log(orderId)
    this.data.orderId = orderId
    this.setData({
      paymentAmount: price
    })
    this._showPayPanel()
  },

  _getEndPayTime() {
    let difference = this.data.endPaymentTime - this.data.systemTime
    var countSeconds = Math.round(difference / 1000)
    // console.log('剩余秒：' + countSeconds)
    this.setData({
      endPayTime: countDown(difference)
    })

    this.setData({
      endPayCountDownTimer: setInterval(() => {
        if (countSeconds == 0) {
          wx.showToast({
            title: '订单超时，请重新下单',
          })
          this._getOrderDetail(this.data.orderId)
          clearInterval(this.data.endPayCountDownTimer)
          return
        }
        difference = (countSeconds - 1) * 1000
        countSeconds = countSeconds - 1;
        // console.log(countDown(difference))
        this.setData({
          endPayTime: countDown(difference)
        })
      }, 1000)
    })
  },

  _getOrderDetail(orderId) {
    let params = {
      orderId: orderId
    }

    getOrderDetail(params).then(res => {
      this._hideLoading()
      console.log('订单详情', res)

      if (res.data.code !== '1') {
        console.log('获取订单详情失败')
        return
      }

      
      let dataList = this._generateGoodsList(res.data.dataList)
      let orderInfo = this._generateOrderInfo(res.data.data)

      if (orderInfo.status === '2') {

      }

      this.setData({
        goodsList: dataList,
        orderInfo: orderInfo
      })

      this.setData({
        createTime: this.data.orderInfo.createTime ,
        payTime: this.data.orderInfo.payTime,
        endPaymentTime: this.data.orderInfo.endPaymentTime,
        sendTime: this.data.orderInfo.sendTime,
        complateTime: this.data.orderInfo.complateTime,
        systemTime: res.data.systemTime,
      })

      this.setData({
        showcreateTime: dateFormate(this.data.createTime + '000'),
        showpayTime: dateFormate(this.data.payTime + '000'),
        showsendTime: dateFormate(this.data.sendTime + '000'),
        showcomplateTime: dateFormate(this.data.complateTime + '000'),
      })

      // // if (this.data.orderInfo.payTime == 0) {
      //   this.setData({
      //     createTime: dateFormate(this.data.orderInfo.createTime + '000'),
      //     payTime: this.data.orderInfo.payTime,
      //     endPaymentTime: dateFormate(this.data.orderInfo.endPaymentTime),
      //     sendTime: dateFormate(this.data.orderInfo.sendTime + '000'),
      //     complateTime: dateFormate(this.data.orderInfo.complateTime + '000'),
      //     systemTime: res.data.systemTime,
      //   })
      // } else if(this.data.orderInfo.sendTime == 0){
      //   this.setData({
      //     createTime: dateFormate(this.data.orderInfo.createTime + '000'),
      //     payTime:dateFormate(this.data.orderInfo.payTime + '000'),
      //     endPaymentTime: dateFormate(this.data.orderInfo.endPaymentTime),
      //     sendTime: this.data.orderInfo.sendTime,
      //     complateTime: dateFormate(this.data.orderInfo.complateTime + '000'),
      //     systemTime: res.data.systemTime,
      //   }) 
      // }else if(this.data.orderInfo.payTime == 0 && this.data.orderInfo.sendTime == 0){
      //   this.setData({
      //     createTime: dateFormate(this.data.orderInfo.createTime + '000'),
      //     payTime: this.data.orderInfo.payTime,
      //     endPaymentTime: dateFormate(this.data.orderInfo.endPaymentTime),
      //     sendTime: this.data.orderInfo.sendTime,
      //     complateTime: dateFormate(this.data.orderInfo.complateTime + '000'),
      //     systemTime: res.data.systemTime,
      //   }) 
      // }else {
      //   this.setData({
      //     createTime: dateFormate(this.data.orderInfo.createTime + '000'),
      //     payTime:dateFormate(this.data.orderInfo.payTime + '000'),
      //     endPaymentTime: dateFormate(this.data.orderInfo.endPaymentTime),
      //     sendTime: dateFormate(this.data.orderInfo.sendTime + '000'),
      //     complateTime: dateFormate(this.data.orderInfo.complateTime + '000'),
      //     systemTime: res.data.systemTime,
      //   })
      // }
      

      this._getEndPayTime()
    })
  },

  _generateOrderInfo(orderInfo) {

    return orderInfo
  },

  _generateGoodsList(goodsList) {
    if (!goodsList.length) return goodsList;
    goodsList.forEach(goods => {
      let refundStatus = (goods.refundStatus).trim()
      switch (refundStatus) {
        case '0':
          goods.refundStatusName = '申请售后'
          break;
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
    return goodsList
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
    console.log(this.data.payPanelHeight)
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
  copy(e){
    let data = e.currentTarget.dataset.copy
    wx.setClipboardData({
      data: data,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            console.log(res.data) // data
            wx.showToast({
              title: '订单号已复制',
              icon : "none"
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getNum()
    this._initAnimation()

    this.data.orderId = options.orderId
    console.log(options)

    this._getOrderDetail(this.data.orderId)
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
    // console.log('show')
    // clearInterval(this.data.endPayCountDownTimer)
    // this.setData({
    //   endPayCountDownTimer: null
    // })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    // this.setData({
    //   endPayCountDownTimer: null
    // })
    // clearInterval(this.data.endPayCountDownTimer)
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