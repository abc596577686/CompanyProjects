const SEARCH_HISTORY = '__searchHistory__'
const SEARCH_HISTORY_MAX_LEN = 10

Page({
  data:{
    searchKeywords: '',
    searchHistory: []
  },
  inputChange(e) {
    this.data.searchKeywords = e.detail.value
  },
  searchEnv() {
    console.log('search====')
    let newSearchKeywords = this.data.searchKeywords
    console.log(newSearchKeywords)
    this.data.searchHistory = this._saveSearchHistory(newSearchKeywords)
  },
  onLoad() {},
  onShow(options) {
    let _this = this
    let searchHistory = wx.getStorageSync(SEARCH_HISTORY)
    _this.setData({
      searchHistory: searchHistory
    })
  },
  _saveSearchHistory(query) {
    let searches = this._getStorage(SEARCH_HISTORY)
    this._insertArray(searches, query, (item) => {
      return item === query
    }, SEARCH_HISTORY_MAX_LEN)
    wx.setStorageSync(SEARCH_HISTORY, searches)
    return searches
  },
  _insertArray(arr, val, compare, maxLen) {
    const index = arr.findIndex(compare)
    if (index === 0) {
      return
    }
    if (index > 0) {
      arr.splice(index, 1)
    }
    arr.unshift(val)
    if (maxLen && arr.length > maxLen) {
      arr.pop()
    }
  },
  _getStorage(key) {
    let ret = []
    ret = wx.getStorageSync(key)
    return ret ? ret : []
  }
})