
/***
 * 获取浏览器cookie值
 * sName: $key
 * return $value
 */
export const getCookie = (sName) => {
  let aCookie = document.cookie.split("; ");
  for (let i = 0; i < aCookie.length; i++) {
    let aCrumb = aCookie[i].split("=");
    if (sName === aCrumb[0])
      return aCrumb[1]
  }
  return null;
};

/**
 * 获取url对应参数值
 * url: url
 * key: 参数名
 * return '男'
 * */
export const getValForKey = (url, key) => {
  if (!url) return '';
  const newUrl = url.substring(url.indexOf('?'), url.length);
  return newUrl.substring(newUrl.indexOf(key), newUrl.length).split('=')[1]
};

/**
 * 获取当前时间日期
 * 日期格式可自定义
 * return '2018-2020/01/01'
 * */
export const getNowFormatDate = () => {
  let date = new Date();
  let seperator1 = "-";
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  let hour = date.getHours();
  let min = date.getMinutes();
  let second = date.getSeconds();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
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
  let currentdate = year + seperator1 + month + seperator1 + strDate +' '
                    +`${hour}:${min}:${second}`
  ;
  return currentdate;
};
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
}

export const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//格式化
// 工具方法
// export const formatJson = function(json, options) {
//   var reg = null,
//     formatted = '',
//     pad = 0,
//     PADDING = '    '; // one can also use '\t' or a different number of spaces
//   // optional settings
//   options = options || {};
//   // remove newline where '{' or '[' follows ':'
//   options.newlineAfterColonIfBeforeBraceOrBracket = (options.newlineAfterColonIfBeforeBraceOrBracket === true) ? true : false;
//   // use a space after a colon
//   options.spaceAfterColon = (options.spaceAfterColon === false) ? false : true;
//
//   // begin formatting...
//
//   // make sure we start with the JSON as a string
//   if (typeof json !== 'string') {
//     json = JSON.stringify(json);
//   }
//   // parse and stringify in order to remove extra whitespace
//   json = JSON.parse(json);
//   json = JSON.stringify(json);
//
//   // add newline before and after curly braces
//   reg = /([\{\}])/g;
//   json = json.replace(reg, '\r\n$1\r\n');
//
//   // add newline before and after square brackets
//   reg = /([\[\]])/g;
//   json = json.replace(reg, '\r\n$1\r\n');
//
//   // add newline after comma
//   reg = /(\,)/g;
//   json = json.replace(reg, '$1\r\n');
//
//   // remove multiple newlines
//   reg = /(\r\n\r\n)/g;
//   json = json.replace(reg, '\r\n');
//
//   // remove newlines before commas
//   reg = /\r\n\,/g;
//   json = json.replace(reg, ',');
//
//   // optional formatting...
//   if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
//     reg = /\:\r\n\{/g;
//     json = json.replace(reg, ':{');
//     reg = /\:\r\n\[/g;
//     json = json.replace(reg, ':[');
//   }
//   if (options.spaceAfterColon) {
//     reg = /\:/g;
//     json = json.replace(reg, ': ');
//   }
//
//   $.each(json.split('\r\n'), function(index, node) {
//     var i = 0,
//       indent = 0,
//       padding = '';
//
//     if (node.match(/\{$/) || node.match(/\[$/)) {
//       indent = 1;
//     } else if (node.match(/\}/) || node.match(/\]/)) {
//       if (pad !== 0) {
//         pad -= 1;
//       }
//     } else {
//       indent = 0;
//     }
//
//     for (i = 0; i < pad; i++) {
//       padding += PADDING;
//     }
//     formatted += padding + node + '\r\n';
//     pad += indent;
//   });
//   return formatted;
// };
