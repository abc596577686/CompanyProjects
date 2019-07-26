export function dateFormate() {
  let dateFormate = new Date()
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
