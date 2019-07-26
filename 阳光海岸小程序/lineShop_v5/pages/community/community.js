// pages/community/community.js
import { getQuestionList, addQuestiones, } from '../../api/api.js'
import { formatNumber } from '../../utils/index.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // list : [
      
    //   {
    //     questionId: 4,
    //     content: '效果怎么样啊？效果怎么样啊？效果怎么样啊？效果怎么样啊？效果怎么样啊？效果怎么样啊？效果怎么样啊？效果怎么样啊？',
    //     answerContent: 
    //       '不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错不错'
    //     ,
    //     createTime: '2016-11-22',
    //     answerNumber : 1
    //   }
      
    // ],
    list : [],
    goodInfo : {},
    isFocus : false,
    placeholder: "向已买的人提问，4-50个字",
    content : '',
    productId : '',
    isLoading : false,
    dataLoaded : false
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '商品问答',
    })
    console.log(options)
    this._showLoading()
    let productId = options.productId
    this._getQuestionList(productId)
    
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
  
  },
  formatTime(date){
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return [year, month, day].map(formatNumber).join('-') 
  },

  /*复制回答*/ 
  copyAnswer(e){
    console.log(e)
    wx.setClipboardData({
      data: e.currentTarget.dataset.copy,
      success:function(res){
        wx.getClipboardData({
          success: function (res) {
            console.log(res.data)
            wx.showToast({
              title: '内容已复制',
              icon : 'none',
              duration : 800

            }) 
          }
        })
      }
    })
  },
  /*获取焦点是触发*/
  // focusBox(e){
  //   console.log(e)
  //   this.setData({
  //     isFocus : true,
  //     placeholder : '写回答...'
  //   })
  // },
  // blurBox(){
  //   this.setData({
  //     isFocus : false,
  //     placeholder: '向已买的人提问，4-50个字'
  //   })
  // },
  inpFocus(){
    this.setData({
      isFocus : true,
      placeholder1 : '写回答。。。'
    })
  },
  bgtap(){
    this.setData({
      isFocus : false
    })
  },
  noPro(){

  },
  //渲染
  _getQuestionList(productId){
    let that = this
    let params = {
      pageidx : '0',
      pagesize : '100',
      productId: productId,
      lastId : '0'
    }
    getQuestionList(params).then(res => {
        console.log(res)
        if(res.data.code=='1'){
          let list = res.data.questionList
          list.forEach(function (item) {
            item.createTime = that.formatTime(new Date(item.createTime * 1000))
          })
          this.setData({
            goodInfo: res.data.data,
            list: list,
            dataLoaded : true
          })
          this._hideLoading()
        }
    })
    
  } ,
  goDetail(e){
    let productId = this.data.goodInfo.productId
    wx.navigateTo({
      url: `/pages/productDetail/productDetail?productId=${productId}`,
    })
  },
  //提出问题
  _addQuestiones(){
    let productId = this.data.goodInfo.productId
    let content = this.data.content 
    let params = {
      productId : productId,
      content : content
    }
    if(this.data.content===''){
      wx.showToast({
        title: '输入内容不能为空',
        icon: 'none',
        duration: 800
      })
      return
    }
    if(this.data.content.length<4){
      wx.showToast({
        title: '内容不能小于4个字',
        icon: 'none',
        duration: 800
      })
      return
    }
    wx.showLoading({
      title: '提交中。。。',
    })
    
    addQuestiones(params).then(res => {
        console.log(res)
        wx.hideLoading()
        if(res.data.code==1){
          wx.showToast({
            title: '提交成功',
            icon : 'none'
          
          })
          
          this._getQuestionList(productId)
          this.setData({
            isFocus : false,
            content : ''
          })
        }
        if(res.data.code==0){
          wx.showToast({
            title: res.data.msg,
            icon : 'none'
          })
        }
        
    })
  },
  getQuestion(e){
    console.log(e)
    let value = e.detail.value
    this.setData({
      content : value
    })
  },
  goAnswerList(e){
    console.log(e)
    let questionId = e.currentTarget.dataset.id
    let productId = this.data.goodInfo.productId
    wx.navigateTo({
      url: `/pages/answer/answer?productId=${productId}&questionId=${questionId}`
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