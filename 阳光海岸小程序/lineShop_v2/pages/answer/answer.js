// pages/community/community/answer/answer.js
import { addAnswer, getAnswerList} from '../../api/api.js'
import { formatNumber } from '../../utils/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    goodInfo: {},
    isFocus1: false,
    placeholder: "近期购买才能回答哦，4-100个字",
    content: '',
    answerList : [],
    isLoading : false,
    dataLoaded : false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let productId = options.productId
    let questionId = options.questionId
    console.log(productId, questionId)
    this.setData({
      productId : productId,
      questionId : questionId
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
    this._getAnswerList()
  
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
  
  },
  formatTime(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return [year, month, day].map(formatNumber).join('-')
  },
  /*复制回答*/
  copyAnswer(e) {
    console.log(e)
    wx.setClipboardData({
      data: e.currentTarget.dataset.copy,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            console.log(res.data)
            wx.showToast({
              title: '内容已复制',
              icon: 'none',
              duration: 800

            })
          }
        })
      }
    })
  },
  /*获取焦点是触发*/
 
  inpFocus() {
    if(this.data.isAllow =='0'){
      return
    }
    this.setData({
      isFocus1: true,
      placeholder1: '写回答...'
    })
  },
  bgtap() {
    this.setData({
      isFocus1: false
    })
  },
  noPro() {

  },
  goDetail(e) {
    let productId = this.data.goodInfo.productId
    wx.navigateTo({
      url: `/pages/productDetail/productDetail?productId=${productId}`,
    })
  },
  //问题列表
  _getAnswerList(){
    let that = this
    let params = {
      pageidx : '0',
      pagesize :'100',
      questionId : this.data.questionId,
      lastId : '1'
    }
    getAnswerList(params).then(res => {
      console.log(res)
      
      if(res.data.code=='1'){
        let list = res.data.answerList
        list.forEach(function (item) {
          item.createTime = that.formatTime(new Date(item.createTime * 1000))
          // item.headerImage = item.headerImage.substring(item.headerImage.indexOf('m')+1)
        })
        this.setData({
          goodInfo : res.data.data,
          answerList : list,
          isAllow : res.data.isAllow,
          total : res.data.total,
          dataLoaded : true
        })
        this._hideLoading()
      }
    })
  },
  // 回答问题
  getAnswer(e) {
    console.log(e)
    let value = e.detail.value
    this.setData({
      content: value
    })
  },
  _addAnswer(){
    if(this.data.content==''){
      wx.showToast({
        title: '输入内容不能为空',
        icon : 'none',
        duration : 800
      })
      return
    }
    wx.showLoading({
      title: '提交中。。。',
    })
    let params = {
      questionId : this.data.questionId,
      content : this.data.content
    }
    addAnswer(params).then(res => {
      console.log(res)
      wx.hideLoading()
      if(res.data.code=='0'){
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 800
        })
        return
      }
      if(res.data.code=='1'){
        this._getAnswerList()
        wx.showToast({
          title: '提交成功',
        })
        this.setData({
          content : '',
          isFocus1 : false
        })
      }
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
  }
})