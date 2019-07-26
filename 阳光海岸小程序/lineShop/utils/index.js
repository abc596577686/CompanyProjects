const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getImageHeight = function (that, el, e) {
  let imageRatio = e.detail.width / e.detail.height
  return new Promise(function (resolve, reject) {
    let query = wx.createSelectorQuery().in(that)
    query.selectAll(el).boundingClientRect(rects => {
      resolve((rects[0].width / imageRatio).toFixed(2))
    }).exec()
  })
}

module.exports = {
  formatTime,
  getImageHeight
}
