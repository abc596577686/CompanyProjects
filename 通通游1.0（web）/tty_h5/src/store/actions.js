import * as types from './mutation-types'
import {saveSearch, deleteSearch, clearSearch, saveProductInfo, saveTripInfo, saveSelectedVisitor, saveEditVisitorEnv, saveServerStatusEnv} from 'common/js/cache'

export const saveSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export const deleteSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

export const clearSearchHistory = function ({commit}) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}

export const saveProductInfos = function ({commit}, info) {
	commit(types.SET_PRODUCT_INFO, saveProductInfo(info))
}

export const saveTripInfos = function ({commit}, info) {
	commit(types.SET_TRIP_INFO, saveTripInfo(info))
}

export const saveSelectedVisitors = function ({commit}, visitors) {
	commit(types.SET_SELECTED_VISITOR, saveSelectedVisitor(visitors))
}

export const saveEditVisitor = function ({commit}, visitors) {
	commit(types.SET_EDIT_VISITOR, saveEditVisitorEnv(visitors))
}

export const saveServerStatus = function ({commit}, status) {
	commit(types.SET_SERVER_STATUS, saveServerStatusEnv(status))
}