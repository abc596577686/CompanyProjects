/**
 * 配置编译环境和线上环境之间的切换
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * 
 */
// let baseUrl = 'http://localhost:8080/';
// let baseUrl2 = 'http://localhost:8080/wap/index.json?a=v1/';
// const imgBaseUrl = 'http://test.uzengroup.com/';

// let baseUrl = 'http://www.jikeduo.com.cn/';
// let baseUrl2 = 'http://www.jikeduo.com.cn/wap/index.json?a=v1/';
// const imgBaseUrl = 'http://www.jikeduo.com.cn/upload/';

// 192.168.10.214  (彭)
// let baseUrl = 'http://192.168.10.214:8080/';
// let baseUrl2 = 'http://192.168.10.214:8080/wap/index.json?a=v1/';
// const imgBaseUrl = 'http://test.uzengroup.com/';

// let baseUrl = '/';
// let baseUrl2 = '/wap/index.json?a=v1/';
// const imgBaseUrl = '';

// rap测试端
let baseUrl = 'http://wap.ttylink.com/portal-html5';
let baseUrl2 = 'http://wap.ttylink.com/portal-html5';
const imgBaseUrl = 'http://wap.ttylink.com/portal-html5';

let rootPath = '/wap';
let routerMode;
if (process.env.NODE_ENV == 'development') {
    routerMode = 'hash'
} else {
    routerMode = 'hash'
}

export {
  baseUrl,
  baseUrl2,
  routerMode,
  imgBaseUrl,
  rootPath
}