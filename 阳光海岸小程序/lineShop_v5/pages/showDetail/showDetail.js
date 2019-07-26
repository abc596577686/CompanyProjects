import Watch from '../../assets/plugins/watch.js'
import { setJumpUrl } from '../../utils/index.js'
import { requestHeader } from '../../etc/config.js'
import { getDistribution } from '../../api/api.js'

const app = getApp();
let showPage

showPage = {
    data: {
        isLoading: true,//载入
        isActivePage:0,//分类品牌选择
        catalogSelect: 0,//判断是否选中
        isSelect: 0,
        isSortCt: 0,//价格升降序显示控制
        productlistData: [],//商品数据
        isShow: '',
        sort: 1, //1销量 2人气 3价格
        sortType: 1,//升降序 1升2降
        firstCategoryId: '', //一级分类id
        secondCategoryId: '', //二级分类id
        brandId: '',//品牌id
        keyword:'',//关键字
        name: '',//标题
        size: 1,
        loadkey:1,
        brandName : '',
        scrollTop: '',
        isShowEnd: 0,
        isIphoneX: '',
        localHeight: '',
        isEmpty : false,
    },
    // 顶部选框
    chooseCatalog: function (data) {
        var that = this;
        that.setData({  
            isSelect: data.currentTarget.dataset.select,
            sort: parseInt(data.currentTarget.dataset.select) + 1,
            size: 1,
            loadkey: 1,
            // isSortCt: 0,
            scrollTop: 0, // 切换类目时回到顶部
            isShowEnd: 0 //隐藏底部小奶瓶
        })
        if (data.currentTarget.dataset.select == 2) {
            
            if (that.data.sortType == 1) {
                that.setData({  
                    sortType : 2
                })
            } else {
                that.setData({  
                    sortType : 1
                })
            }
            if (that.data.isSortCt == 2) {
                that.setData({  
                    isSortCt : 1
                })
            } else {
                that.setData({  
                    isSortCt :  that.data.isSortCt+1 
                })
            }
        } else {
            that.setData({  
                isSortCt : 0,
                sortType : 1
            })
        }
        that._getDistribution()
        wx.vibrateShort()
    },
    // 页面数据载入接口
    _getDistribution() {
        this._showLoading()
        wx.showNavigationBarLoading()
        let params = {
            sort: this.data.sort,
            sortType: this.data.sortType, 
            firstCategoryId: this.data.firstCategoryId,
            secondCategoryId: this.data.secondCategoryId,
            brandId: this.data.brandId,
            keyword: this.data.keyword,
            pageidx: this.data.size,
            pagesize: 6,
        }
        getDistribution(params).then(res => {
            this.setData({  
                // productlistData : this.data.productlistData.push(res.data.dataList)
                productlistData : setJumpUrl(res.data.dataList)
            })
          if (this.data.productlistData.length=='0'){
            this.setData({
              isEmpty : true
            })
          }
            console.log(this.data.productlistData)
            this._hideLoading()
            wx.stopPullDownRefresh()
            wx.hideNavigationBarLoading()
            if (res.data.pageTopName != '') {
                // console.log(res.pageTopName)
                this._setPageTitle(res.data.pageTopName)
            }
            // if (this.data.isPullDownRefresh) {
            //   let timer = setTimeout(() => {
            //     wx.stopPullDownRefresh()
            //     clearTimeout(timer)
            //   }, 300)
            // }
        }).catch((res) => {
            console.log(res)
        })
    },
    _setPageTitle(text) {
        wx.setNavigationBarTitle({
          title: text + '' //转成字符串类型，以免报数据类型错误
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
    onLoad: function (options) {
        console.log('name',options)
        let name = options.name || options.brand
        this.setData({
            sort: options.sort, 
            sortType: 1,
            firstCategoryId: options.firstCategoryId, 
            secondCategoryId: options.secondCategoryId, 
            brandId: options.brandId,
            keyword: options.keyword,
            name: name,
        })
        this._getDistribution()
        wx.setNavigationBarTitle({
          title: this.data.name,
        })


        let isIphoneX = app.globalData.isIphoneX;
        this.setData({
            isIphoneX: isIphoneX
        })
        console.log(this.data.isIphoneX)
        if (this.data.isIphoneX) {
            this.setData({
                localHeight: 1300
            })
        } else{
            this.setData({
                localHeight: 1130
            })
        }
    },

    onReady: function () {
    
    },

    onShow: function () {
    
    },

    onHide: function () {
    
    },

    onUnload: function () {
    
    },

    onPullDownRefresh: function () {
      // console.log('refresh')
      // wx.showNavigationBarLoading()

      // this.data.isPullDownRefresh = true
      // this.__getDistribution()
      this._showLoading()
      this._getDistribution()
    
    },

    onReachBottom: function () {
      console.log(111)
    
    },
    bottom: function (e) {
        console.log(this.data.sortType)
        if (this.data.loadkey == 0) {
            return
        } 
        this._showLoading()
        let _this = this
        // console.log(e)
        _this.setData({  
            size : this.data.size + 1
        })
        // console.log(this.data.size)
        let params = {
            sort: this.data.sort,
            sortType: this.data.sortType, 
            firstCategoryId: this.data.firstCategoryId,
            secondCategoryId: this.data.secondCategoryId,
            brandId: this.data.brandId,
            keyword: this.data.keyword,
            pageidx: this.data.size,
            pagesize: 6,
        }
        getDistribution(params).then(res => {
            console.log(res.data.dataList)
            if (res.data.dataList != '') {
                this.setData({  
                    productlistData : setJumpUrl(this.data.productlistData.concat(res.data.dataList))
                })
            }else{
                this.setData({  
                    loadkey: 0,
                    isShowEnd: 1
                })
            }
            console.log(this.data.productlistData)
            this._hideLoading()
            if (this.data.isPullDownRefresh) {
              let timer = setTimeout(() => {
                wx.stopPullDownRefresh()
                clearTimeout(timer)
              }, 300)
            }
        }).catch((res) => {
            console.log(res)
        })
    }
}
  
Page(showPage)