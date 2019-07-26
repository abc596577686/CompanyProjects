/*!
 *
 *                    .::::.
 *                  .::::::::.
 *                 :::::::::::
 *              ..:::::::::::'
 *           ':::::::::::::::
 *             .:::::::::::'
 *        '::::::::::::::.
 *             ..::::::::::.
 *           ''::::::::::::::
 *            ::::''::::::::'       .:::.
 *           ::::'   ':::::'      .::::::::.
 *         .::::'     :::::     .:::::::'::::.
 *        .:::'       :::::  .:::::::::' ':::::.
 *       .::'        :::::.:::::::::'      `:::::.
 *      .::'         ::::::::::::::'         ``::::.
 *  ...:::           ::::::::::::'              ``::.
 * '''' ':.          ':::::::::'                  ::::..
 *                    '.:::::'                    `````..
 *
 */

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

export const getValForKey = (url, key) => {
  if (!url) return '';
  const newUrl = url.substring(url.indexOf('?'), url.length);
  return newUrl.substring(newUrl.indexOf(key), newUrl.length).split('=')[1]
};
export const dateFormate = date => {
  // console.log(date)
  // date = parseInt(date)
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

