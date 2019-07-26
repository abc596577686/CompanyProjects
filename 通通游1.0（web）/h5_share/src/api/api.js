import axios from 'axios'

// 本地
let base = '/api/'

// 打包
// let base = 'http://39.106.15.249/distributor/'

// 退出
export const getGoodsDetails = params => { return axios.post(`${base}product/productDetail.msp`, params).then(res => res.data) }