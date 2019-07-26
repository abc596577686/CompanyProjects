import Watch from '../../assets/plugins/watch.js'
import { requestHeader } from '../../etc/config.js'
import { getSortlist, getBrandList } from '../../api/api.js'
var JyoComponent = require('../../components/UI/JyoComponent');

const app = getApp();
const mockData = require('../../mock/index.js');
const api = require('../../api/api.js');


let typePage, watch

typePage = {
  data: {
    // loading
    isLoading: true,
    // tabbar
    catalogs: [
      {
        "catalogName": "分类",
        "select": 0
      },
      {
        "catalogName": "品牌",
        "select": 1
      },
    ],
    isActivePage: 0,//分类品牌选择
    catalogSelect: 0,//判断是否选中

    // 导航
    dhlist: null,  //分类 左侧商品导航块
    hotList: [],
    allBrandList: [],
    viewName: "",
    gotopNAme: "顶部",
    dhProlist: [],
    dhSelect: 0,//品牌页 左侧导航
    keyId: null,
    toView: 'red',
    scrollTop: 0,
    ishow_spl: false,
    heightKey: 0,
    topImageurl: '',
    isShow: 0,
    sort: '1', //1销量 2人气 3价格
    sortType: '2',//升降序 1升2降
    firstCategoryId: '', //一级分类id
    secondCategoryId: '', //二级分类id
    brandId: '',//品牌id
    keyword: '',//关键字
    isSh: 0,
    localHeight: '',
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
  _showLoading() {
    wx.showNavigationBarLoading()
    this.setData({
      isLoading: true
    })
  },
  _hideLoading() {
    this.setData({
      isLoading: false
    })
  },
  chooseCatalog: function (data) {
    // wx.vibrateShort()
    var that = this;
    console.log(data)
    that.setData({   //把选中值放入判断值,查找序列添加样式
      catalogSelect: data.currentTarget.dataset.select,
      isActivePage: data.currentTarget.dataset.select,
    })
  },
  // 点选展示目标品类商品
  choosedhlist: function (data) {
    // wx.vibrateShort()
    var that = this;
    this.setData({
      ishow_spl: false
    })
    this.setData({
      keyId: data.currentTarget.dataset.select  //当前选中的品类 cartId
    })
    console.log(data.currentTarget.id)
    console.log(that.data.keyId)   //当前选中的Id

    var list = []
    var i
    for (i = 0; i < that.data.dhlist.length; i++) {
      if (that.data.keyId == that.data.dhlist[i].catId) {
        var obj = {}
        list.push(that.data.dhlist[i].childrenList)  //载入数据集合
        this.setData({
          topImageurl: that.data.dhlist[i].catPic, //右侧一级类名下图片
          viewName: that.data.dhlist[i].catName,  //右侧一级类名
          firstCategoryId: that.data.dhlist[i].catId //一级分类id
        })
      }
    }

    list = list[0]

    if (list.length == 0) {
      this.setData({
        ishow_spl: true
      })
    }

    this.setData({
      // dhSelect: data.currentTarget.dataset.select, //把选中值放入判断值  
      dhSelect: data.currentTarget.id,
      dhProlist: list
    })
  },

  // 初始化获取分类页数据
  _getCartList() {
    this._showLoading()
    getSortlist().then(res => {
      console.log('分类数据')
      console.log(res)

      this.setData({
        dhlist: res.data.list  //分类导航数据
      })
      // 触发初始数据
      this._initPro();
      
      let load = setTimeout(() => {
        this.setData({   //加载完毕出现页面                        
          isSh: 1
        })
        clearTimeout(load)
      }, 1000)

      if (this.data.isPullDownRefresh) {
        let timer = setTimeout(() => {
          wx.stopPullDownRefresh()
          clearTimeout(timer)
        }, 300)
      }
    })
    .catch(res => {
      this._timeout()
    })
  },

  _getBrandList() {
    this._showLoading()
    // 初始化品牌
    let sortListView1 = JyoComponent.create("SortListView", "sortListView1", this);
    // console.log(this.data.allBrandList)
    sortListView1.footerText = sortListView1.list.length + "条数据";
    // 初始化获取品牌页数据

    getBrandList().then(res => {
      console.log('品牌数据')
      console.log(res.data)
      this.setData({
        allBrandList: res.data.allBrandList,  //全部品牌数据
        hotList: res.data.hotBrandList  //热门品牌数据
      });
      // console.log(this.data.allBrandList)
      // console.log(this.data.hotList)
      // 设置品牌数据
      sortListView1.setList(
        this.data.allBrandList
      )
      // 设置热门数据
      sortListView1.setList1(
        this.data.hotList
      )
      if (this.data.isPullDownRefresh) {
        let timer = setTimeout(() => {
          wx.stopPullDownRefresh()
          clearTimeout(timer)
        }, 300)
      }
    })
    .catch(res => {
      this._timeout()
    })

    sortListView1.onSelect = e => {
      console.log(1111)
      console.log(e)
      this.setData({
        brandId: e.brandId,
        firstCategoryId: '',
        name : e.name
      })
      // wx.vibrateShort()
      wx.navigateTo({
        url: '../showDetail/showDetail?isShow' + this.data.isShow + '&sort=' + this.data.sort + '&sortType=' + this.data.sortType
        + '&firstCategoryId=' + this.data.firstCategoryId + '&secondCategoryId=' + this.data.secondCategoryId + '&brandId=' + this.data.brandId
        + '&keyword=' + this.data.keyword +'&name=' + this.data.name
      })
    };

    sortListView1.onSelect1 = e => {
      console.log(2222)
      console.log(e)
      this.setData({
        brandId: e.brandId,
        firstCategoryId: '',
        name : e.name
        
      })
      // wx.vibrateShort()
      wx.navigateTo({
        url: '../showDetail/showDetail?isShow' + this.data.isShow + '&sort=' + this.data.sort + '&sortType=' + this.data.sortType
        + '&firstCategoryId=' + this.data.firstCategoryId + '&secondCategoryId=' + this.data.secondCategoryId + '&brandId=' + this.data.brandId + '&name='+this.data.name
        + '&keyword=' + this.data.keyword,
        success: function (res) {

        }
      })
    };
    sortListView1.isVisible = true;
  },

  _timeout() {
    this._hideLoading()
    this.setData({
      timeout: true
    })
  },

  // 分类页面初始数据
  _initPro() {
    this.setData({
      firstCategoryId: this.data.dhlist[0].catId,
      topImageurl: this.data.dhlist[0].catPic,
      viewName: this.data.dhlist[0].catName
    })

    var list = []
    list.push(this.data.dhlist[0].childrenList)
    list = list[0]

    this.setData({
      dhProlist: list
    })
    let lay = setTimeout(() => {
      this._hideLoading()
      clearTimeout(lay)
    }, 1000)
    
  },
  // 跳转
  // 一级分类全部商品跳转
  firstGateto() {
    // wx.vibrateShort()
    this.setData({
      brandId: '',
      secondCategoryId: '',
    })
    wx.navigateTo({
      url: '../showDetail/showDetail?isShow' + this.data.isShow + '&sort=' + this.data.sort + '&sortType=' + this.data.sortType
      + '&firstCategoryId=' + this.data.firstCategoryId + '&secondCategoryId=' + this.data.secondCategoryId + '&brandId=' + this.data.brandId
      + '&keyword=' + this.data.keyword,
      success: function (res) {

      }
    })
  },
  // 二级分类下细分跳转
  secondGateto(data) {
    // wx.vibrateShort()
    var aaa = data.currentTarget.dataset.select
    var name = data.currentTarget.dataset.name
    this.setData({
      brandId: '',
      secondCategoryId: aaa,
      name : name
    })
    wx.navigateTo({
      url: '../showDetail/showDetail?isShow' + this.data.isShow + '&sort=' + this.data.sort + '&sortType=' + this.data.sortType
      + '&firstCategoryId=' + this.data.firstCategoryId + '&secondCategoryId=' + this.data.secondCategoryId + '&brandId=' + this.data.brandId
      + '&keyword=' + this.data.keyword + '&name=' + this.data.name
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

  refreshEnv() {
    this.setData({
      timeout: false
    })
    this._getCartList()
    this._getBrandList()
  },

  onLoad(options) {
    this._getCartList()
    this._getBrandList()
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
        isIphoneX: isIphoneX
    })
    console.log(this.data.isIphoneX)
    if (this.data.isIphoneX) {  //X的尺寸
        this.setData({
            localHeight: 1215
        })
    } else{  //常规尺寸
        this.setData({
            // localHeight: 1037
            localHeight: 1058
        })
    }
  },
  upper: function (e) {
    // console.log("触发了upper")
    // this.isShow = 0
  },
  lower: function (e) {
    console.log(e)
  },
  scroll: function (e) {
    console.log(e)
  },
  scrollLog: function (e) {
    // if (e.detail.scrollTop > 1000) {
    //   this.setData({
    //     heightKey: 1
    //   })
    // } else {
    //   this.setData({
    //     heightKey: 0
    //   })
    // }
    // console.log(this.data.heightKey)
  },

  tap: function (e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove: function (e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },
  // 跳往具体搜索页
  jumpSearchEnv() {
    wx.navigateTo({
      url: '../search/search',
      success: function (res) { }
    })
  },
  // onPullDownRefresh(e) {
  //   console.log('refresh')
  //   wx.showNavigationBarLoading()

  //   this.data.isPullDownRefresh = true
  //   this._getCartList()
  //   getBrandList()
  // },
  // refresh(e) {
  //   console.log(6787897987987)
  // },
  scrolltoupper() {
    console.log(111111111111111111111111)
  }
}

Page(typePage)
