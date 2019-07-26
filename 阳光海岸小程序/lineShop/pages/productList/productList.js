Page({
  data: {},
  onLoad(options) {
    console.log(options.type)
    let type = options.type
    let _this = this
    switch(type) {
      case '3':
        wx.setNavigationBarTitle({
          title: '热门',
        })
        _this.setData({
          typeName: '热门'
        })
        break;
      case '4':
        wx.setNavigationBarTitle({
          title: '爆款',
        })
        _this.setData({
          typeName: '爆款'
        })
        break;
      case '5':
        wx.setNavigationBarTitle({
          title: '高返佣',
        })
        _this.setData({
          typeName: '高返佣'
        })
        break;
    }
  }
})
