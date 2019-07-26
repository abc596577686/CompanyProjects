
let baseUrl = '';
let baseUrl2 = '';

const GOODS_MAX_NUM = 8

export function hasClass(el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
}

export function addClass(el, className) {
    if (hasClass(el, className)) {
        return
    }

    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
}

/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
    if (!name) return;
    return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
    if (!name) return;
    window.localStorage.removeItem(name);
}
//删除左右两端的空格 
export const trim = (str) => {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
/**
 * 获取style样式
 */
export const getStyle = (element, attr, NumberMode = 'int') => {
    let target;
    // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
    if (attr === 'scrollTop') {
        target = element.scrollTop;
    } else if (element.currentStyle) {
        target = element.currentStyle[attr];
    } else {
        target = document.defaultView.getComputedStyle(element, null)[attr];
    }
    //在获取 opactiy 时需要获取小数 parseFloat
    return NumberMode == 'float' ? parseFloat(target) : parseInt(target);
}

/**
 * 页面到达底部，加载更多
 */
export const loadMore = (element, callback) => {
    let windowHeight = window.screen.height;
    let height;
    let setTop;
    let paddingBottom;
    let marginBottom;
    let requestFram;
    let oldScrollTop;
    console.log()
    document.body.addEventListener('scroll', () => {
        loadMore();
    }, false)

    //运动开始时获取元素 高度 和 offseTop, pading, margin
    element.addEventListener('touchstart', () => {
        height = element.offsetHeight;
        setTop = element.offsetTop;
        paddingBottom = getStyle(element, 'paddingBottom');
        marginBottom = getStyle(element, 'marginBottom');
    }, { passive: true })

    //运动过程中保持监听 scrollTop 的值判断是否到达底部
    element.addEventListener('touchmove', () => {
        loadMore();
    }, { passive: true })

    //运动结束时判断是否有惯性运动，惯性运动结束判断是非到达底部
    element.addEventListener('touchend', () => {
        oldScrollTop = document.body.scrollTop;
        moveEnd();
    }, { passive: true })

    const moveEnd = () => {
        requestFram = requestAnimationFrame(() => {
            if (document.body.scrollTop != oldScrollTop) {
                oldScrollTop = document.body.scrollTop;
                loadMore();
                moveEnd();
            } else {
                cancelAnimationFrame(requestFram);
                //为了防止鼠标抬起时已经渲染好数据从而导致重获取数据，应该重新获取dom高度
                height = element.offsetHeight;
                loadMore();
            }
        })
    }

    const loadMore = () => {
        if (document.body.scrollTop + windowHeight >= height + setTop + paddingBottom + marginBottom) {
            callback();
        }
    }
}

/**
 * 显示返回顶部按钮，开始、结束、运动 三个过程中调用函数判断是否达到目标点
 */
export const showBack = callback => {
    let requestFram;
    let oldScrollTop;

    document.addEventListener('scroll', () => {
        showBackFun();
    }, false)
    document.addEventListener('touchstart', () => {
        showBackFun();
    }, { passive: true })

    document.addEventListener('touchmove', () => {
        showBackFun();
    }, { passive: true })

    document.addEventListener('touchend', () => {
        oldScrollTop = document.body.scrollTop;
        moveEnd();
    }, { passive: true })

    const moveEnd = () => {
        requestFram = requestAnimationFrame(() => {
            if (document.body.scrollTop != oldScrollTop) {
                oldScrollTop = document.body.scrollTop;
                moveEnd();
            } else {
                cancelAnimationFrame(requestFram);
            }
            showBackFun();
        })
    }

    //判断是否达到目标点
    const showBackFun = () => {
        if (document.body.scrollTop > 500) {
            callback(true);
        } else {
            callback(false);
        }
    }
}
/**
 * 判断是否微信
 */
export const isWeiXin = function () {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}
/**
 * 隐藏微信的分享按钮
 */
export const wxHideOptionMenu = function () {
    if (isWeiXin()) {
        function onBridgeReady() {
            WeixinJSBridge.call('hideOptionMenu');
        }
        if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
        } else {
            onBridgeReady();
        }
        // wx.hideAllNonBaseMenuItem();
    }
}
/**
 * 隐藏微信的分享按钮
 */
export const wxShowOptionMenu = function () {
    if (isWeiXin()) {
        function onBridgeReady() {
            WeixinJSBridge.call('showOptionMenu');
        }
        if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
        } else {
            onBridgeReady();
        }
    }


}
/**
 * 请求网络数据
 */
export const getJSON = function (type = 'GET', url = '', data = {}) {
    type = type.toUpperCase();
    if (type == "GET") {
        url = baseUrl2 + url;
    } else {
        url = baseUrl + url;
    }

    let sendData = '';
    let dataStr = ''; //数据拼接字符串
    Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&';
    })
    if (dataStr !== '') {
        dataStr = dataStr.substr(0, dataStr.length - 1);
    }
    if (type == 'GET') {
        if (url.search(/\?/) === -1) {
            url += '?' + dataStr
        } else {
            url += '&' + dataStr
        }
        dataStr = '';
    }
    return new Promise(function (resolve, reject) {
        let requestObj;
        if (window.XMLHttpRequest) {
            requestObj = new XMLHttpRequest();
        } else {
            requestObj = new ActiveXObject;
        }
        requestObj.open(type, url, true);
        requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        requestObj.send(dataStr);

        requestObj.onreadystatechange = () => {
            if (requestObj.readyState == 4) {
                if (requestObj.status == 200) {
                    // console.log(requestObj)
                    try {
                        let obj = requestObj.response
                        // console.log(obj)
                        if (typeof obj !== 'object') {
                            obj = JSON.parse(obj);
                        }
                        resolve(obj);
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    throw new Error(requestObj)
                }
            }
        }
    })
}

function postDataFormat(obj) {

    if (typeof obj != "object") {

        return;
    }

    // 支持有FormData的浏览器（Firefox 4+ , Safari 5+, Chrome和Android 3+版的Webkit）
    if (typeof FormData == "function") {
        var data = new FormData();
        for (var attr in obj) {
            data.append(attr, obj[attr]);
        }
        return data;
    } else {
        // 不支持FormData的浏览器的处理 
        var arr = new Array();
        var i = 0;
        for (var attr in obj) {
            arr[i] = encodeURIComponent(attr) + "=" + encodeURIComponent(obj[attr]);
            i++;
        }
        return arr.join("&");
    }
}

/**
 * 运动效果
 * @param {HTMLElement} element   运动对象，必选
 * @param {JSON}        target    属性：目标值，必选
 * @param {number}      duration  运动时间，可选
 * @param {string}      mode      运动模式，可选
 * @param {function}    callback  可选，回调函数，链式动画
 */
export const animate = (element, target, duration = 400, mode = 'ease-out', callback) => {
    clearInterval(element.timer);

    //判断不同参数的情况
    if (duration instanceof Function) {
        callback = duration;
        duration = 400;
    } else if (duration instanceof String) {
        mode = duration;
        duration = 400;
    }

    //判断不同参数的情况
    if (mode instanceof Function) {
        callback = mode;
        mode = 'ease-out';
    }

    //获取dom样式
    const attrStyle = attr => {
        if (attr === "opacity") {
            return Math.round(getStyle(element, attr, 'float') * 100);
        } else {
            return getStyle(element, attr);
        }
    }
    //根字体大小，需要从此将 rem 改成 px 进行运算
    const rootSize = parseFloat(document.documentElement.style.fontSize);

    const unit = {};
    const initState = {};

    //获取目标属性单位和初始样式值
    Object.keys(target).forEach(attr => {
        if (/[^\d^\.]+/gi.test(target[attr])) {
            unit[attr] = target[attr].match(/[^\d^\.]+/gi)[0] || 'px';
        } else {
            unit[attr] = 'px';
        }
        initState[attr] = attrStyle(attr);
    });

    //去掉传入的后缀单位
    Object.keys(target).forEach(attr => {
        if (unit[attr] == 'rem') {
            target[attr] = Math.ceil(parseInt(target[attr]) * rootSize);
        } else {
            target[attr] = parseInt(target[attr]);
        }
    });


    let flag = true; //假设所有运动到达终点
    const remberSpeed = {}; //记录上一个速度值,在ease-in模式下需要用到
    element.timer = setInterval(() => {
        Object.keys(target).forEach(attr => {
            let iSpeed = 0; //步长
            let status = false; //是否仍需运动
            let iCurrent = attrStyle(attr) || 0; //当前元素属性址
            let speedBase = 0; //目标点需要减去的基础值，三种运动状态的值都不同
            let intervalTime; //将目标值分为多少步执行，数值越大，步长越小，运动时间越长
            switch (mode) {
                case 'ease-out':
                    speedBase = iCurrent;
                    intervalTime = duration * 5 / 400;
                    break;
                case 'linear':
                    speedBase = initState[attr];
                    intervalTime = duration * 20 / 400;
                    break;
                case 'ease-in':
                    let oldspeed = remberSpeed[attr] || 0;
                    iSpeed = oldspeed + (target[attr] - initState[attr]) / duration;
                    remberSpeed[attr] = iSpeed
                    break;
                default:
                    speedBase = iCurrent;
                    intervalTime = duration * 5 / 400;
            }
            if (mode !== 'ease-in') {
                iSpeed = (target[attr] - speedBase) / intervalTime;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            }
            //判断是否达步长之内的误差距离，如果到达说明到达目标点
            switch (mode) {
                case 'ease-out':
                    status = iCurrent != target[attr];
                    break;
                case 'linear':
                    status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
                    break;
                case 'ease-in':
                    status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
                    break;
                default:
                    status = iCurrent != target[attr];
            }

            if (status) {
                flag = false;
                //opacity 和 scrollTop 需要特殊处理
                if (attr === "opacity") {
                    element.style.filter = "alpha(opacity:" + (iCurrent + iSpeed) + ")";
                    element.style.opacity = (iCurrent + iSpeed) / 100;
                } else if (attr === 'scrollTop') {
                    element.scrollTop = iCurrent + iSpeed;
                } else {
                    element.style[attr] = iCurrent + iSpeed + 'px';
                }
            } else {
                flag = true;
            }

            if (flag) {
                clearInterval(element.timer);
                if (callback) {
                    callback();
                }
            }
        })
    }, 20);
}


export function getValForKey(url, key) {
    let newUrl = url.substring(url.indexOf('?'), url.length);
    let val = newUrl.substring(newUrl.indexOf(key), newUrl.length).split('=')[1]
    return val;
}

export function navSerialize(list) {
    let ret = []
    list.forEach((item, index) => {
        let obj = {
            id: index + 1,
            channelName: item.channelName,
            channelId: item.channelId,
            isSeckill: item.isSeckill
        }
        ret.push(obj)
    })
    return ret;
}

export function setJumpUrl(list, channelId) {
    // 专题商品
    if (list.type == '4') {
        list.products.forEach(item => {
            let productId = getValForKey(item.requestUrl, 'productId');
            productId = productId ? productId : ''
            let jumpUrl = `/wap/productDetail?productId=${productId}`
            item.jumpUrl = jumpUrl
        })
    }


    if (list.contents.length) {
        list.contents.forEach((item) => {
            // console.log(item)
            switch (item.targetType) {
                case '0':  // 内页
                    // item.jumpUrl = '/wap/index/insidePage'
                    let pageId = getValForKey(item.requestUrl, 'pageId');
                    pageId = pageId ? pageId : ''
                    // let jumpUrl = `/wap/index/insidePage?channelId=${channelId}&pageId=${pageId}`
                    item.jumpUrl = `/wap/index/insidePage?channelId=${channelId}&pageId=${pageId}`
                    break;
                case '1':// 分类
                    item.jumpUrl = '/wap/index/insidePage'
                    break;
                case '2':  //商品详情
                    let productId = getValForKey(item.requestUrl, 'productId');
                    productId = productId ? productId : ''
                    let jumpUrl = `/wap/productDetail?productId=${productId}`
                    item.jumpUrl = jumpUrl
                    break;
                case '3':  // 专题
                    let pageUrl = ''
                    pageUrl = item.requestUrl
                    list.contents[0].pageId = getValForKey(pageUrl, 'pageId');
                    jumpUrl = `/wap/index/theme?channelId=${channelId}&pageId=${getValForKey(pageUrl, 'pageId')}&themeName=${item.navigationName}`;
                    item.jumpUrl = jumpUrl
                    break;
                case '4':  //大礼包
                    // item.jumpUrl = `/wap/dealers?productId=${item.giftId}`
                    item.jumpUrl = `/wap/invitation`
                    break;
                case '':
                    item.jumpUrl = ''
                    break;
            }
        })
    }

    // 商品
    if (list.type == '3') {
        list.products.forEach((good) => {
            let productId = getValForKey(good.requestUrl, 'productId');
            productId = productId ? productId : ''
            let jumpUrl = `/wap/productDetail?productId=${productId}`
            good.jumpUrl = jumpUrl
        })
    }

    // 专题
    if (list.type == '2') {
        if (list.products.length > GOODS_MAX_NUM) {
            list.products = list.products.slice(0, GOODS_MAX_NUM)
        }
        let temp = true
        list.products.forEach((good) => {
            if (good.viewAll) {
                temp = false
                return
            }
            let productId = getValForKey(good.requestUrl, 'productId');
            productId = productId ? productId : ''
            let jumpUrl = `/wap/productDetail?productId=${productId}`
            good.jumpUrl = jumpUrl
        })
        if (!temp) return

        // 在原始数据添加新属性 pageId
        let pageUrl = ''
        if (list.contents.length) {
            pageUrl = list.contents[0].requestUrl
            list.contents[0].pageId = getValForKey(pageUrl, 'pageId');
        }
        let jumpUrl = `/wap/index/theme?channelId=${channelId}&pageId=${getValForKey(pageUrl, 'pageId')}`;
        // console.log(jumpUrl);

        let viewAllItem = {
            themeId: '1581',
            viewAll: '查看全部',
            defaultText: 'See more',
            jumpUrl: jumpUrl
        }
        list.products.push(viewAllItem)
    }

    return list;
}

// 时间差
export function countDown(difference) {

    // var seconds = difference/1000;
    // var minutes = difference/1000/60
    // var hours = difference/1000/60/60

    var leave1 = difference % (24 * 3600 * 1000); //计算天数后剩余的毫秒数

    var day = Math.floor(difference / (24 * 3600 * 1000));
    var newHours = Math.floor(leave1 / (3600 * 1000))

    if (day != 0) {
        newHours += Number(day * 24)
    }

    var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
    var newMinutes = Math.floor(leave2 / (60 * 1000))

    var leave3 = leave2 % (60 * 1000);      //计算分钟数后剩余的毫秒数
    var newSeconds = Math.round(leave3 / 1000)
    if (newSeconds == 60) {
        newSeconds = 0;
        newMinutes++;
    }

    // console.log('秒差:' + seconds)
    // console.log('分钟差:' + minutes)
    // console.log('小时差:' + hours)

    // console.log('秒差:' + newSeconds)
    // console.log('分钟差:' + newMinutes)
    // console.log('小时差:' + newHours)
    // console.log('天差:' + day)

    if (newHours < 10) {
        newHours = '0' + newHours
    }
    if (newMinutes < 10) {
        newMinutes = '0' + newMinutes
    }
    if (newSeconds < 10) {
        newSeconds = '0' + newSeconds
    }

    // console.log(`本场还剩 ${day}天 ${newHours}: ${newMinutes}: ${newSeconds}`)
    // return `本场还剩 ${day}天 ${newHours}: ${newMinutes}: ${newSeconds}`
    return `${newHours}: ${newMinutes}: ${newSeconds}`

}


export function dateFormate(date) {
    console.log(date)
    date = parseInt(date)
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
    // return `${year}-${month}-${day} 00:00:00`
}


