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
    /**
     * 隐藏微信的分享按钮
     */
export const wxHideOptionMenu = function() {
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
    }


}
    /**
     * 隐藏微信的分享按钮
     */
export const wxShowOptionMenu = function() {
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