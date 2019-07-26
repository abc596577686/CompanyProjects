import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LEN = 8

const PRODUCT_INFO = '__productInfo__'
const TRIP_INFO = '__tripInfo__'
const SELECTED_VISITORS = '__selectedVisitors__'
const EDIT_VISITOR = '__editVisitor__'
const SERVER_STATUS = '__serverStatus__'

function insertArray(arr, val, compare, maxLen) {
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

function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

 /**
 * 判断是否微信
 */
export const isWeiXin = function() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

// 搜索历史
export function saveSearch(query) {
	let searches = storage.get(SEARCH_KEY, [])
	insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LEN)
  storage.set(SEARCH_KEY, searches)
  return searches
}
export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}

// 清理搜索历史
export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}
export function clearSearch() {
	storage.remove(SEARCH_KEY)
  return []
}

// 产品信息
export function saveProductInfo(info) {
  storage.set(PRODUCT_INFO, info)
  let productInfo = info
  return productInfo
}
export function loadProductInfo() {
  return storage.get(PRODUCT_INFO, {})
}

// 旅行人信息
export function saveTripInfo(info) {
  storage.set(TRIP_INFO, info)
  let tripInfo = info
  return tripInfo
}
export function loadTripInfo() {
  return storage.get(TRIP_INFO, {})
}

// 出行人信息
export function saveSelectedVisitor(visitors) {
  storage.set(SELECTED_VISITORS, visitors)
  let selectedVisitors = visitors
  return selectedVisitors
}
export function loadSelectedVisitors() {
  return storage.get(SELECTED_VISITORS, {})
}

// 编辑的出行人信息
export function saveEditVisitorEnv(visitors) {
  storage.set(EDIT_VISITOR, visitors)
  let editVisitor = visitors
  return editVisitor
}
export function loadEditVisitorEnv() {
  return storage.get(EDIT_VISITOR, {})
}

// 单房差状态
export function saveServerStatusEnv(status) {
  storage.set(SERVER_STATUS, status)
  let serverStatus = status
  return serverStatus
}
export function loadServerStatusEnv() {
  return storage.get(SERVER_STATUS, {})
}


