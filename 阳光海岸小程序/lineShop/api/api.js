import {baseUrl} from '../etc/config.js'

// 获取导航
const getNavList = `${baseUrl}?a=v1/channelDetail`
// 获取导航
const getChannelDetails = `${baseUrl}?a=v1/channelDetail`
// 获取分类
const getSortlist = `${baseUrl}?a=v1/productCategoryList`

module.exports = {
    getNavList,
    getChannelDetails,
    getSortlist
}
