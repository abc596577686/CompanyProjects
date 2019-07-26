import {
  saveSearchHistory,
  hasKey,
  setJumpUrl,
  debounce
} from '../../utils/index.js'
import {
  getSearchValue
} from '../../api/api.js'
import {
  requestHeader
} from '../../etc/config.js'
import Watch from '../../assets/plugins/watch.js'

const SEARCH_HISTORY = '__searchHistory__'
const SEARCH_HISTORY_MAX_LEN = 10

let watch

Page({
  data: {
    isLoading: false,
    searchKeywords: null,
    searchHistory: [],
    showSearchHistory: false,
    searchResult: [],
    searchResultNull: false, //没搜到商品时做的判断
    idx: 1,
    isload: 1,

    // 搜索类型切换
    isSelect: 0,
    isSortCt: 0, //价格升降序显示控制
    sort: 1, //1销量 2人气 3价格
    sortType: 1, //升降序 1升2降

    scrollTop: '',
    isShowEnd: 0, //提示没有更多内容
    localHeight: '', //iphonex兼容高度
    placeholder : '减脂'
  },
  watch: {
    searchKeywords(newVal, oldVal) {
      // console.log(newVal, oldVal)
      if (!newVal || !newVal.length) {
        this.setData({
          searchResultNull: false
        })
        return
      }
      this.setData({ //翻页
        idx: 1,
        isload: 1, //开启加载
        scrollTop: 0, // 回到顶部
      })

      debounce(this._getSearchValue(newVal), 800) //自动延迟搜索
    }
  },
  // 顶部选框
  chooseCatalog(res) {
    console.log(res)
    this.setData({
      isSelect: res.currentTarget.dataset.select,
      sort: parseInt(res.currentTarget.dataset.select) + 1,
      size: 1,
      loadkey: 1,
      // isSortCt: 0,
      scrollTop: 0, // 切换类目时回到顶部
    })

    if (res.currentTarget.dataset.select == 2) {
      if (this.data.sortType == 1) {
        this.setData({
          sortType: 2
        })
      } else {
        this.setData({
          sortType: 1
        })
      }

      if (this.data.isSortCt == 2) {
        this.setData({
          isSortCt: 1
        })
      } else {
        this.setData({
          isSortCt: this.data.isSortCt + 1
        })
      }
    } else {
      this.setData({
        isSortCt: 0,
        sortType: 1
      })
    }

    this._getSearchValue(this.data.searchKeywords)
  },

  inputChange(e) {
    console.log(e.detail.value)
    watch.setData({
      searchKeywords: e.detail.value
    })
  },
  searchEnv() {
    let newSearchKeywords = this.data.searchKeywords ? this.data.searchKeywords.trim() : ''
    let couponId = this.data.couponId
    if (!newSearchKeywords || !newSearchKeywords.length) return

    console.log(newSearchKeywords)
    this._getSearchValue(newSearchKeywords)

    saveSearchHistory(newSearchKeywords, SEARCH_HISTORY, SEARCH_HISTORY_MAX_LEN)
  },

  clearHistoryEnv() {
    wx.clearStorage()
    this.setData({
      searchHistory: []
    })
  },
  quickSearchEnv(e) {
    // console.log(e.currentTarget.dataset.text)
    this.setData({
      searchKeywords: e.currentTarget.dataset.text
    })
    this._getSearchValue(this.data.searchKeywords)
  },
  _getSearchValue(keywords) {
    this._showLoading()

    let params = {
      pagesize: 200,
      pageidx: this.data.idx,
      sort: this.data.sort,
      sortType: this.data.sortType
    }

    if (this.data.couponId) {
      let couponId = this.data.couponId
      params = Object.assign({}, params, {
        couponId: couponId,
        keyword: keywords || ''
      })

    } else {
      params = Object.assign({}, params, {
        keyword: keywords || ''
      })
    }

    getSearchValue(params).then(res => {
      this._hideLoading()
      console.log('搜索结果----')
      console.log(res)

      if (res.data && res.data.dataList.length) {
        this.setData({
          searchResultNull: false,
          searchResult: setJumpUrl(res.data.dataList)
        })
      } else {
        this.setData({
          searchResultNull: true
        })
      }
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
  _initWatchData() {
    watch = new Watch(this)
    watch.setData({
      searchKeywords: null
    })
  },
  onShow() {
    hasKey(SEARCH_HISTORY).then((res) => {
      // console.log(res)
      this.setData({
        searchHistory: wx.getStorageSync(SEARCH_HISTORY)
      })
      // console.log(this.data.searchHistory)
    }).catch((res) => {
      // console.log(res)
    })
  },
  onLoad(options) {
    this._initWatchData()

    let couponId = this.data.couponId = options.couponId || ''
    console.log(couponId)
    this.setData({
      couponId: couponId
    })

    if (this.data.couponId) {
      this._getSearchValue()
      this.setData({
        placeholder: '在优惠劵适用商品中搜索'
      })
    }
    let isIphoneX = getApp().globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX
    })
    console.log(this.data.isIphoneX)
    if (this.data.isIphoneX) {
      this.setData({
        localHeight: 1260
      })
    } else {
      this.setData({
        localHeight: 1100
      })
    }

  },
  onPullDownRefresh() {

  },
  bottom: function(e) {
    if (this.data.isload == 0) return
    // 唤醒loading
    this._showLoading()
    // 拿数据
    this.setData({ //翻页
      idx: this.data.idx + 1
    })
    let params = {
      keyword: this.data.searchKeywords,
      pagesize: 8,
      pageidx: this.data.idx,
    }
    getSearchValue(params).then(res => {

      console.log('搜索结果----')
      console.log(res)
      if (res.data.dataList == '') {
        this.setData({
          isload: 0,
          isShowEnd: 1 
        })
      }
      if (res.data && res.data.dataList.length) {
        this.setData({
          searchResultNull: false,
          searchResult: setJumpUrl(this.data.searchResult.concat(res.data.dataList))
        })
      } else {
        this.setData({
          searchResultNull: true
        })
      }
      this._hideLoading()
    })
  }
})