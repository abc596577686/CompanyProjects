// pages/celebrityList/celebrityLi/st.js
import { celebrityList, delIdentityInfo, saveIdentityInfo} from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowMaskLayer :false,
    showDetailBox : false,
    showKnowMore : false
    
  
  },
  _initAnimation() {
    this.ani_maskLayer = wx.createAnimation({
      duration: 300,
      timingFunction: 'linear',
      delay: 0
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
    },300)

  },

  _hideMaskLayer() {
    this._hideMaskLayerAni()
    this.setData({
      showDetailBox : false,
      showKnowMore : false

    })

  },
  cancleEnv(){
    this._hideMaskLayer()
    
  },
  confirmEnv(){
    let params = {
      certificationId: this.data.certificationId
    }
    this._showLoading()
    delIdentityInfo(params).then(res => {
      this._hideLoading()
      wx.showToast({
        title: res.data.msg,
      })
      if (res.data.code == '1') {
        this._celebrityList()
        this._hideMaskLayer()
      } else {

      }
    })
    

  },

  _celebrityList(){
    celebrityList().then(res => {
      console.log(res)
      let userList = res.data.dataList
      // userList.forEach(item => {
      //   item.isClick = false
      // })
     
      this.setData({
        userList : userList
      })

    } )
  },
  delUserInfo(e){
    let certificationId = e.currentTarget.dataset.id
    this.setData({
      certificationId : certificationId
    })
    this._showMaskLayer()
    this.setData({
      showDetailBox : true
    })
    
   

  },
  addUserInfo(){
    wx.navigateTo({
      url: '/pages/celebrityAdd/celebrityAdd',
    })

  },
  setDefault(e){
    let index = e.currentTarget.dataset.index
    let userList = this.data.userList
    let userInfo = userList[index]
    this._showLoading()
    console.log('-----',userInfo)

    let params = {
      certificationId: userInfo.certificationId,
      identityName: userInfo.identityName,
      identityNo: userInfo.realIdentityNo,
      identityFrontRelative: userInfo.identityFrontRelative||'',
      identityBackRelative: userInfo.identityBackRelative||'',
      isDefault: true
    }
    
    saveIdentityInfo(params).then(res => {
      if(res.data.code=='1'){
        // this._celebrityList()
        this._hideLoading()
        userList.forEach((item,index1) => {
          if(index1 == index){
            item.isDefault = "1"
          }else{
            item.isDefault = "0"
          }

        })
        this.setData({
          userList : userList
        })
      }
    })

  },
  editUserInfo(e){
    let userInfo = e.currentTarget.dataset.info
    wx.navigateTo({
      url: '/pages/celebrityAdd/celebrityAdd?edit=1',
    })
    wx.setStorageSync('userInfo', userInfo)
  },
  knowMoreInfo(){
    this._showMaskLayer()
    this.setData({
      showDetailBox : false,
      showKnowMore : true

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

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
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
    this._celebrityList()
  
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