import {loadSearch, loadProductInfo, loadTripInfo, loadSelectedVisitors, loadEditVisitorEnv, loadServerStatusEnv} from 'common/js/cache'

const state = {
	searchKeywords: null,
	searchHistory: loadSearch(),
	productInfo: loadProductInfo(),
	tripInfo: loadTripInfo(),
	selectedVisitors: loadSelectedVisitors(),
	editVisitor: loadEditVisitorEnv(),
	serverStatus: loadServerStatusEnv()
}

export default state