import Watch from '../../assets/plugins/watch.js'
import { requestHeader } from '../../etc/config.js'

const app = getApp();
const mockData = require('../../mock/index.js');
const api = require('../../api/api.js');

let typePage, watch

typePage = {
  data: {
    catalogs: [
      { "catalogName": "分类",
        "select": 0          
      },
      {
        "catalogName": "品牌",
        "select": 1
      },
    ],
    dhlist: null,  //分类 左侧商品导航块
    // 分类右侧详细数据
    viewName: "运动营养",
    dhProlist:[],
    isActivePage:0,//分类品牌选择
    catalogSelect: 0,//判断是否选中
    dhSelect: 49,//品牌页 左侧导航
    keyId: null,
    toView: 'red',
    scrollTop: 100,
    ishow_spl:false,
  },
  watch: {
    // dhProlist(newVal, oldVal) {
    //   // console.log(newVal)
    //   if (newVal.length == 0) {
    //     watch.setData({
    //       ishow_spl:true
    //     })
    //   }
    // }
  },
  chooseCatalog:function(data){
    var that=this;
    that.setData({   //把选中值放入判断值,查找序列添加样式
      catalogSelect: data.currentTarget.dataset.select,
      isActivePage: data.currentTarget.dataset.select,
    })
  },
  // 点选展示目标品类商品
  choosedhlist:function(data){
    var that = this;
    this.setData({
      ishow_spl: false
    })
    this.setData({
      keyId: data.currentTarget.dataset.select  //当前选中的品类 cartId
    })
    console.log(that.data.keyId)   //当前选中的Id
    // console.log(that.data.dhlist)  //全部数据
    // console.log(that.data.dhProlist)
    var list = []
    var i
    for (i = 0; i < that.data.dhlist.length;i++){
      if (that.data.keyId == that.data.dhlist[i].catId) {
        var obj = {}
        list.push(that.data.dhlist[i].childrenList)
      }      
    }
    
    list = list[0]

    if (list.length == 0) {
      this.setData({
        ishow_spl: true
      })
    }

    this.setData({
      dhSelect: data.currentTarget.dataset.select, //把选中值放入判断值  
      dhProlist: list
    })

    if (that.data.dhlist.length == 0) {
      // that.data.ishow_spl = true
    }
  },
  _getCartList() {
    let _this = this
    wx.request({
      url: api.getSortlist,
      method: 'GET',
      header: requestHeader,
      success: function (res) {
        console.log(res.data)
        _this.setData({
          dhlist: res.data.list  //分类导航数据
        })
        console.log(_this.data.dhlist)
        // 触发初始数据
        _this._initPro();
      }
    })
  },
  // 分类页面初始数据
  _initPro() {
    let _this = this
    console.log('dhlist')
    console.log(_this.data.dhlist[0].childrenList)
  
    var list = []
    list.push(_this.data.dhlist[0].childrenList)
    list = list[0]
    this.setData({
      dhProlist: list
    })
  },
  onLoad() { 
    let _this = this
    _this._getCartList()
  },
  upper: function(e) {
    console.log(e)
  },
  lower: function(e) {
    console.log(e)
  },
  scroll: function(e) {
    console.log(e)
  },
  tap: function(e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove: function(e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  }
}

Page(typePage)
