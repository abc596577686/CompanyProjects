const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const dateFormate = date => {
  if (date == '' || date == null || date == 0) {   //空值或者0 不显示
    return null
  }
  
  var now = new Date(date * 1000),
  // y = now.getFullYear(),
  // m = now.getMonth() + 1,
  d = now.getDate();
  // return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
  return (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
  
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  dateFormate: dateFormate
}
