
export const checkSession = function () {
  return new Promise((resolve, reject) => {
    wx.checkSession({
      success: res => {
        resolve(res)
      },
      fail: res => {
        console.log('登录已过期，需重新登录: ')
        console.log(res)
        wx.redirectTo({
          url: '/pages/login/login',
        })
        return
        reject(res)
      }
    })
  })
}

export const getElementSize = function (element) {
  return new Promise((resolve, reject) => {
    wx.createSelectorQuery().select(element).boundingClientRect(res => {
      // console.log('当前元素大小')
      // console.log(res)
      resolve(res)
    }).exec()
  })

}

export const query = function (url, params, method) {
  let header = getApp().globalData.requestHeader
  header['cookie'] = wx.getStorageSync('session')
  header['X-TOKEN'] = wx.getStorageSync('token')
  header['X-STORE-USER-ID'] = wx.getStorageSync('storeUserId')

  if (!params) params = {}
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: method,
      header: header,
      data: params,
      success: res => {
        if (res.header['Set-Cookie'] != null) {
          wx.setStorageSync('session', res.header['Set-Cookie'])
        }
        if (res.header['X-TOKEN'] != null) {
          wx.setStorageSync('token', res.header['X-TOKEN'])
        }

        if (res.data.code === '-1') {
          wx.clearStorage()
          console.log('登录已过期，需重新登录: ')
          console.log(res)
          wx.redirectTo({
            url: '/pages/login/login',
          })
          return
        }

        if (res.data.code === '-2') {
          wx.clearStorage()
          console.log('未绑定手机号码 ')
          console.log(res)
          wx.redirectTo({
            url: '/pages/innerLogin/innerLogin',
          })
          return
        }

        resolve(res)
      },
      fail: res => {
        console.log('请求失败……')
        reject(res)
      }
    })
  })
}

export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

export const dateFormate = date => {
  // console.log(date)
  date = parseInt(date)
  let dateFormate = new Date(date);
  let year = dateFormate.getFullYear();
  let month = dateFormate.getMonth() + 1;
  let day = dateFormate.getDate();
  let hour = dateFormate.getHours();
  let min = dateFormate.getMinutes();
  let second = dateFormate.getSeconds();

  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }
  if (hour < 10) {
    hour = '0' + hour
  }
  if (min < 10) {
    min = '0' + min
  }
  if (second < 10) {
    second = '0' + second
  }

  return `${year}-${month}-${day} ${hour}:${min}:${second}`
  // return `${year}-${month}-${day} 00:00:00`
}

export const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 倒计时
export const countDown = difference => {

  // var seconds = difference/1000;
  // var minutes = difference/1000/60
  // var hours = difference/1000/60/60

  var leave1 = difference % (24 * 3600 * 1000); //计算天数后剩余的毫秒数

  var day = Math.floor(difference / (24 * 3600 * 1000));
  var newHours = Math.floor(leave1 / (3600 * 1000))

  if (day != 0) {
    newHours += Number(day * 24)
  }

  var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
  var newMinutes = Math.floor(leave2 / (60 * 1000))

  var leave3 = leave2 % (60 * 1000);      //计算分钟数后剩余的毫秒数
  var newSeconds = Math.round(leave3 / 1000)
  if (newSeconds == 60) {
    newSeconds = 0;
    newMinutes++;
  }

  // console.log('秒差:' + seconds)
  // console.log('分钟差:' + minutes)
  // console.log('小时差:' + hours)

  // console.log('秒差:' + newSeconds)
  // console.log('分钟差:' + newMinutes)
  // console.log('小时差:' + newHours)
  // console.log('天差:' + day)

  if (newHours < 10) {
    newHours = '0' + newHours
  }
  if (newMinutes < 10) {
    newMinutes = '0' + newMinutes
  }
  if (newSeconds < 10) {
    newSeconds = '0' + newSeconds
  }

  // console.log(`本场还剩 ${newHours}: ${newMinutes}: ${newSeconds}`)
  // return `本场还剩 ${day}天 ${newHours}: ${newMinutes}: ${newSeconds}`
  return `${newHours}: ${newMinutes}: ${newSeconds}`
}

export const getImageHeight = function (that, el, e) {
  let imageRatio = e.detail.width / e.detail.height
  return new Promise(function (resolve, reject) {
    let query = wx.createSelectorQuery().in(that)
    query.selectAll(el).boundingClientRect(rects => {
      resolve((rects[0].width / imageRatio).toFixed(2))
    }).exec()
  })
}

const _getValForKey = function (url, key) {
  if (!url) return ''
  const newUrl = url.substring(url.indexOf('?'), url.length)
  return newUrl.substring(newUrl.indexOf(key), newUrl.length).split('=')[1]
}

export const setJumpUrl = function (list, channelId, storeId) {
  if (!list.length) return list

  const BANNER = '0' //banner图
  const BANNER_MORE_ATTR = '0' //banner 多图
  const BANNER_ALONE_ATTR = '1' //banner 单图
  const BANNER_DOUBLE_ATTR = '2'  //banner 双图
  const NAVIGATOR = '1'  //导航
  const NAVIGATOR_FOUR_ATTR = '0'  //导航 4个
  const NAVIGATOR_EIGHT_ATTR = '1'  //导航 8个
  const THEME = '2' //专题 
  const GOODS_TWO_COLUMNS = '3'  // 商品 一行两列
  const THEME_DETAIL = '4' //专题 详情
  const RUSH ='5' //限时购
  const INSIDE_PAGE = '0'  //内页
  const PRODUCT_DETAIL = '2' //商品详情
  const THEME_PAGE = '3'  //专题页
  const DEALERS = '4'  //大礼包

  function assignmentUrl(component) {
    if (!component.contents) { //searchValue
      const goods = component
      goods.jumpUrl = `/pages/productDetail/productDetail?productId=${goods.productId}`
      return
    }

    const ARR = component.contents
    ARR.forEach(item => {
      if (item.targetType === INSIDE_PAGE) { //insidePage
        const pageId = _getValForKey(item.requestUrl, 'pageId');
        item.jumpUrl = `/pages/insidePage/insidePage?channelId=${channelId}&pageId=${pageId}`
      }
      if (item.targetType === PRODUCT_DETAIL) {  //productDetail
        const productId = _getValForKey(item.requestUrl, 'productId');
        if (!productId) {
          item.jumpUrl = ''
        } else {
          item.jumpUrl = `/pages/productDetail/productDetail?productId=${productId}`
        }
      }
      if (item.targetType === THEME_PAGE) {  //theme
        const pageId = _getValForKey(item.requestUrl, 'pageId');
        item.jumpUrl = `/pages/theme/theme?channelId=${channelId}&pageId=${pageId}`
      }
      if (item.targetType === DEALERS) {  //dealers
        const pageId = _getValForKey(item.requestUrl, 'pageId');
        item.jumpUrl = `/pages/dealers/dealers?storeId=${storeId}&productId=${item.giftId}`
      }
      if (item.targetType === RUSH) {  //限时购
        item.jumpUrl = `/pages/rush/rush`
      }
    })
  }

  list.forEach((component, index) => {
    if (component.type === undefined) { //searchValue
      assignmentUrl(component)
    }
    if (component.type === THEME_DETAIL) { //themeDetail
      const ARR = component.products
      ARR.forEach(item => {
        item.jumpUrl = `/pages/productDetail/productDetail?productId=${item.productId}`
      })
    }

    if (component.type === BANNER) { //banner
      if (component.attribute === BANNER_MORE_ATTR) { //bannerMore
        assignmentUrl(component)
      }
      if (component.attribute === BANNER_ALONE_ATTR) { //bannerAlone
        assignmentUrl(component)
      }
      if (component.attribute === BANNER_DOUBLE_ATTR) { //bannerDouble
        assignmentUrl(component)
      }
    }
    if (component.type === NAVIGATOR) { //navigator
      assignmentUrl(component)
    }
    if (component.type === THEME) { //theme
      const pageId = _getValForKey(component.contents[0].requestUrl, 'pageId');
      component.jumpUrl = `/pages/theme/theme?channelId=${channelId}&pageId=${pageId}`

      const ARR = component.products
      ARR.forEach((product, indexs) => {
        if (product.itemType !== 'more') {

          const productId = _getValForKey(product.requestUrl, 'productId');
          product.jumpUrl = `/pages/productDetail/productDetail?productId=${productId}`
        }
      })
    }
    if (component.type === GOODS_TWO_COLUMNS) { // goodsTwoColumns 一行两列商品
      const ARR = component.products
      ARR.forEach(item => {
        // const productId = _getValForKey(item.requestUrl, 'productId');
        item.jumpUrl = `/pages/productDetail/productDetail?productId=${item.productId}`
      })
    }

    if (component.type === undefined) { //商品详情-推荐商品
      component.jumpUrl = `/pages/productDetail/productDetail?productId=${component.productId}`
    }

  })
  // console.log(list)
  return list
}

export const saveSearchHistory = function (query, str, len) {
  let searches = _getStorage(str)
  // console.log(searches)
  // console.log(searches[0])
  _insertArray(searches, query, (item) => {
    return item === query
  }, len)
  wx.setStorageSync(str, searches)
  // console.log(searches)
  return searches
}

function _getStorage(key) {
  let ret = []
  ret = wx.getStorageSync(key)
  return ret ? ret : []
}

function _insertArray(arr, val, compare, maxLen) {
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
}

function _contains(arr, str) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === str) {
      return true
    }
  }
  return false
}

export const hasKey = function (str) {
  return new Promise((resolve, reject) => {
    wx.getStorageInfo({
      success: res => {
        // console.log(res)
        if (res.keys.length) {
          if (_contains(res.keys, str)) {
            resolve(`有${str}`)
          } else {
            reject(`没有${str}`)
          }
        } else {
          reject('没有任何参数')
        }
      }
    })
  })
}

export const debounce = function (func, delay) {
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}


export const randomString = function (len) {
  len = len || 32;
  var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  var maxPos = $chars.length;
  var pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}