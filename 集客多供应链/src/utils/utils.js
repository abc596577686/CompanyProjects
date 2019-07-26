
export function substring(str, len) {
  //专业匹配中文 
  let reg = /[\u4e00-\u9fa5]/g;
  let slice = str.substring(0, len);
  let chineseCharNum = (~~(slice.match(reg) && slice.match(reg).length));
  let realen = slice.length * 2 - chineseCharNum; 
  return str.substr(0, realen) + (realen < str.length ? "..." : "");
}