// pages/groupShoping/groupShoping.js
import { groupBuyDetail} from '../../api/api.js'
import { countDown, dateFormate, formatNumber } from '../../utils/index.js'
import { setJumpUrl } from '../../utils/index.js'
Page({
  onShareAppMessage(res) {
    console.log(res)
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: `快来${this.data.collagePrice}元拼${this.data.productName}`,
      path: `/pages/groupDetail/groupDetail?collageId=${this.data.collageId}`,
      // imageUrl: this.data.shareImg
    }
  },

  /**
   * 页面的初始数据
   */
  data: {
    isMaskShow : true,
    // status : '1',//0.开团参团失败1.参团成功2.成功
    groupUserImg : [
    
    ],
    shareImg : '',
    defalutImg: '/assets/images/other@2x.png',
    showAddress : false,
    showGroupBox : false,
    showDetailBox : false,
    recommendProductList: [],
    index: 1,
    loadKey : true,
    lastId : 0,
    isShowEnd : 0,
    hide : false
    
    
    
  
  },
  shareEnv(){
    

  },
  // 用户头像列表
  initUserImg(){
    let groupSize = this.data.groupSize
    let groupUserImg = this.data.groupUserImg
    let defalutImg = this.data.defalutImg
    if (groupSize > groupUserImg.length){
      let num = groupSize - groupUserImg.length
      for(let i=0;i<num;i++){
        groupUserImg.push(defalutImg)
      }
    }
   this.setData({
     groupUserImg : groupUserImg,
   })

  },
  showGroupBox(){
    this.setData({
      showGroupBox : true,
      isMaskShower: true,
      showDetailBox : true

    })
  },
  showAddressBox() {
    this.setData({
      showAddressBox: true,
      isMaskShower: true,
      showDetailBox : true
    })
  },
  close(){
    this.setData({
      showAddressBox: false,
      isMaskShower: false,
      showDetailBox: false,
      showGroupBox : false
    })

  },
  _getGroupbuyDetail(){
    let orderId = this.data.orderId 
    let params = {
      orderId : orderId,
      pageIdx: this.data.index,
      lastId: this.data.lastId,
      pagesize: 20
      }
    groupBuyDetail(params).then(res => {
      
      // console.log(data)
      if(res.data.code=='1'){
        this.setData({
          hide : true
        })
        let lastId
        let data = res.data.data
        if (data.recommendProductList.length > 0) {
          lastId = data.recommendProductList[data.recommendProductList.length - 1].productId
        } else {
          lastId = this.data.lastId
          this.setData({
            loadKey: false,
            isShowEnd : 1
          })
        }
        this._hideLoading()
        console.log(res)
        let jionTime = dateFormate(data.jionTime)
        this.setData({
          groupUserImg: data.ImgUrlList,
          collageId: data.collageId,
          groupSize: data.collageSize - 0,
          productId: data.productId,
          productName: data.productName,
          jionTime: jionTime,
          status: data.status,
          userName: data.userName,
          succTime: dateFormate(data.succTime),
          address: data.address,
          collageShareBackgroundImg: data.collageShareBackgroundImg,
          recommendProductList: setJumpUrl(this.data.recommendProductList.concat(data.recommendProductList)),
          lastId: lastId,
          shareImg: data.productImg,
          price : data.price,
          collagePrice : data.collagePrice,
          preferential: data.preferential
        })
        this.setProMes()
        this.setgroupStatus()
        this.initUserImg()
        this.setTime(data.endTime)
        this.initStatus()
        clearInterval(this.timer)
        this.timer = setInterval(() => {
          if ((this.data.rest1 <= 200 && this.data.status == '1') || (this.data.rest1 <= 0 && this.data.status == '3')) {
            this._showLoading()
            this.setData({
              restTime : 0
            })
            clearInterval(this.timer)
            this._getGroupbuyDetail()
          }
          this.setTime(data.endTime)
         

        }, 100)
        
      }
    })
  },
  setProMes(){
    let status = this.data.status
    let statusName
    switch (status) {
      case '0':
        statusName = '开团失败'
        break;
      case '1':
       statusName = '开团成功'
        break;
      case '2':
        statusName = '参团失败'
        break;
      case '3':
       statusName = '参团成功'
        break;
      case '4':
        statusName = '拼团失败'
        break;
      case '5':
        statusName = '拼团成功'
        break;
    }
    this.setData({
      statusName : statusName
    })
  },
  setgroupStatus(){
    let status = this.data.status
    if(status=="1"||status=="3"||status=="5"){
      // this.data.secMes = '商家正在努力发货，请耐心等待'
      this.setData({
        groupStatus : true
      })
    }else{
      // this.data.secMes = '这个团没有拼成功，将尽快退款'
      this.setData({
        groupStatus: false
      })
    }
  },
  initStatus(){
    let status = this.data.status
    if(status == "1" || status == "3"){
      this.setData({
        groupGoing : true
      })
    }else{
      this.setData({
        groupGoing : false
      })
    }

  },
  setTime(endTime){
      console.log('111')
      let nowTime = new Date().getTime()
    let rest1 = endTime - nowTime
      let rest = countDown(endTime - nowTime)
      this.setData({
        restTime : rest,
        rest1 : rest1
      })
  },
  goHome(){
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  goDetail(){
    wx.navigateTo({
      url: `/pages/productDetail/productDetail?productId=${this.data.productId}`,
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
  getLastProductId(){

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._showLoading()
    let orderId = options.orderId 
    this.setData({
      orderId :orderId 
    }) 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.groupUserImg = this.selectComponent('#groupUserImg')
    // this.init()
  
  },
  init(){
    this.groupUserImg.init()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this._getGroupbuyDetail()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(this.timer)
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.timer)
  
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
    console.log('到底了')
    if(this.data.loadKey){
      this._showLoading()
      this.setData({
        index: this.data.index + 1
      })
      this._getGroupbuyDetail()
    }else{
      this.setData({
        isShowEnd : 1
      })
    }

  
  },

  /**
   * 用户点击右上角分享
   */
  hideMasker(){
    console.log(111)
     this.setData({
       isMaskShow : false,
       showGroupBox: false,
       showDetailBox: true

     })
  }
})