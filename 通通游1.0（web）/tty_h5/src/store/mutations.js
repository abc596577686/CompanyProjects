import * as types from './mutation-types'

const mutations = {
	[types.SET_SEARCH_KEYWORDS](state, searchKeywords) {
    state.searchKeywords = searchKeywords
  },
  [types.SET_SEARCH_HISTORY](state, searchHistory) {
    state.searchHistory = searchHistory
  },
  [types.SET_PRODUCT_INFO](state, productInfo) {
    state.productInfo = productInfo
  },
  [types.SET_TRIP_INFO](state, tripInfo) {
    state.tripInfo = tripInfo
  },
  [types.SET_SELECTED_VISITOR](state, visitor) {
    state.selectedVisitors = visitor
  },
  [types.SET_EDIT_VISITOR](state, visitor) {
    state.editVisitor = visitor
  },
  [types.SET_SERVER_STATUS](state, status) {
    state.serverStatus = status
  }

}

export default mutations