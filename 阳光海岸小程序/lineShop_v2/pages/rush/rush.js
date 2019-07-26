import { seckillList, seckillNotice } from '../../api/api.js'
import { requestHeader } from '../../etc/config.js'
import { setJumpUrl, getImageHeight } from '../../utils/index.js'
import Watch from '../../assets/plugins/watch.js'

let watch //全局变量, 由实例化后的对象赋值

Page({
    data: {
        name: '',
        isLoading: true, //载入中
        pageId: '',
        seckillId: 0,
        outHeight: '100%',
        isFixed: false,
        maindata: '',
        bannerImg: '',
        seckillList: [],
        activeId: '',
        timeshow: '',
        countDownDay: '00',
        countDownHour: '00',
        countDownMinute: '00',
        countDownSecond: '00',
        systemTime: '',
        startTime: '',
        endTime: '',
        isshowtimeout: 0,
        // dataList:'',
        isSell: '',
        // currentSeckillId
        isfirstin: true,
        inputNum: '',
        isphone: 0,
        productId: '',
        slidewidth: 170,
        sys: '',
        isPullDownRefresh: '',
        msStatus: '',
        isShowView: 1,
        isNoChoice: 0,
    },
    watch: {

    },
    _seckillList(index) {
        this.setData({
            isLoading: true,
        });
        let params = {
            seckillId: index
        }
        seckillList(params).then(res => {
            console.log('---秒杀场次数据如下---')
            console.log(res)
            if (res.data.code == 0) {   //当前无场次 秒杀活动未开启
                console.log(res.data.msg)
                wx.hideNavigationBarLoading()
                this.setData({   
                    isNoChoice: 1,
                    isLoading: false,
                })
                return
            }
            let timer = setTimeout(() => {
                wx.stopPullDownRefresh()
                clearTimeout(timer)
            }, 300)

            wx.hideNavigationBarLoading()

            //获取数据
            this.setData({    
                seckillList: res.data.seckillList,
                maindata: res.data,
                dataList: res.data.dataList,
                inputNum: res.data.mobile,
                isLoading: false,
            })

            if (this.data.isfirstin == true) {  //如果是初次进页面 设置初始化数据
                for (var i = 0; i < res.data.seckillList.length; i++) {
                    if (res.data.seckillList[i].isCurrentSeckill == 1) {
                        console.log(i)
                        var systemTime = this.data.maindata.systemTime
                        var startTime = this.data.seckillList[i].startTime
                        var endTime = this.data.seckillList[i].endTime
                        this.setData({
                            activeId: i,
                            sys: systemTime,
                            msStatus: this.data.seckillList[i].seckillStatus
                        });
                        if (systemTime < startTime) {  //预热未开始
                            this.setData({
                                isSell: 0,
                                isLoading: false,
                            });
                            if (totalSecond < 0) {  //倒计时结束
                                clearInterval(this.data.interval),
                                    wx.showToast({
                                        title: '活动已开启,赶快抢购吧',
                                    });
                                this.setData({
                                    countDownDay: '00',
                                    countDownHour: '00',
                                    countDownMinute: '00',
                                    countDownSecond: '00',
                                });
                                this._seckillList(0) //获取秒杀场次信息
                                this._initOutHeight() //获取设备可使用高度
                            }
                            var ts = (startTime - systemTime) / 1000;
                            var totalSecond = parseInt(ts)
                            console.log(totalSecond)

                            this.setData({
                                interval: setInterval(() => {
                                    // 秒数  
                                    var second = totalSecond;
                                    // 天数位  
                                    var day = Math.floor(second / 3600 / 24);
                                    var dayStr = day.toString();
                                    if (dayStr.length == 1) dayStr = '0' + dayStr;
                                    // 小时位  
                                    var hr = Math.floor((second - day * 3600 * 24) / 3600);
                                    var hrStr = hr.toString();
                                    if (hrStr.length == 1) hrStr = '0' + hrStr;
                                    // 分钟位  
                                    var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
                                    var minStr = min.toString();
                                    if (minStr.length == 1) minStr = '0' + minStr;
                                    // 秒位  
                                    var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
                                    var secStr = sec.toString();
                                    if (secStr.length == 1) secStr = '0' + secStr;
                                    this.setData({
                                        countDownDay: dayStr,
                                        countDownHour: hrStr,
                                        countDownMinute: minStr,
                                        countDownSecond: secStr,
                                    });
                                    totalSecond--;
                                }, 1000)
                            })
                        } else if (systemTime > startTime && systemTime < endTime) {
                            this.setData({
                                isSell: 1   //显示当前场次倒计时
                            });

                            var ts = (endTime - systemTime) / 1000;
                            var totalSecond = parseInt(ts)
                            console.log(totalSecond)
                            this.setData({
                                interval: setInterval(() => {
                                    // 秒数  
                                    var second = totalSecond;
                                    // 天数位  
                                    var day = Math.floor(second / 3600 / 24);
                                    var dayStr = day.toString();
                                    if (dayStr.length == 1) dayStr = '0' + dayStr;
                                    // 小时位  
                                    var hr = Math.floor((second - day * 3600 * 24) / 3600);
                                    var hrStr = hr.toString();
                                    if (hrStr.length == 1) hrStr = '0' + hrStr;
                                    // 分钟位  
                                    var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
                                    var minStr = min.toString();
                                    if (minStr.length == 1) minStr = '0' + minStr;
                                    // 秒位  
                                    var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
                                    var secStr = sec.toString();
                                    if (secStr.length == 1) secStr = '0' + secStr;
                                    this.setData({
                                        countDownDay: dayStr,
                                        countDownHour: hrStr,
                                        countDownMinute: minStr,
                                        countDownSecond: secStr,
                                    });
                                    totalSecond--;
                                }, 1000)
                            })

                            if (totalSecond < 0) {
                                clearInterval(this.data.interval),
                                    wx.showToast({
                                        title: '活动已结束',
                                    });
                                this.setData({
                                    countDownDay: '00',
                                    countDownHour: '00',
                                    countDownMinute: '00',
                                    countDownSecond: '00',
                                });
                            }

                            this.setData({
                                isshowtimeout: 1,
                                isfirstin: false,
                                isLoading: false
                            })
                        }
                    }
                }
            } else {
                return
            }
        }).catch((res) => {
            // console.log(res)
            console.log('请求超时……')
            this._timeout()
            this.setData({
                isShowView: 0
            })
            
        })

    },
    _go() {
        wx.switchTab({
            url: '/pages/home/home',
        })
    },
    _initOutHeight() {
        wx.getSystemInfo({
            success: res => {
                this.setData({
                    outHeight: res.windowHeight
                })
            },
        })
    },
    // containerScrollEnv(e) {
    //     const scrollTop = e.detail.scrollTop
    //     // console.log(scrollTop)
    //     if (scrollTop >= this.data.scrollHeight) {
    //         console.log('固定')
    //         this.setData({
    //             isFixed: true
    //         })
    //     } else {
    //         console.log('取消固定')
    //         this.setData({
    //             isFixed: false
    //         })
    //     }
    // },
    switchTab(e) {
        console.log(e.currentTarget.dataset.item.seckillStatus)
        this.setData({
            msStatus: e.currentTarget.dataset.item.seckillStatus
        })
        clearInterval(this.data.interval)
        this.setData({
            activeId: e.currentTarget.id,
            isshowtimeout: 0,
            isLoading: true,
            countDownDay: '00',
            countDownHour: '00',
            countDownMinute: '00',
            countDownSecond: '00',
            dataList: ' ',
            isSell: '',
            maindata: '',
        })
        this.data.seckillId = this.data.seckillList[e.currentTarget.id].seckillId
        // console.log(this.data.seckillId)

        this._seckillList(this.data.seckillId)   //载入当前场次商品数据

        this._timekill(e.currentTarget.id)  //重新部署倒计时
    },
    _timekill(id) {  //页面倒计时
        // console.log(sys)
        var systemTime = this.data.sys
        var startTime = this.data.seckillList[id].startTime
        var endTime = this.data.seckillList[id].endTime

        console.log(systemTime)
        console.log(startTime)
        console.log(endTime)

        
        if (systemTime < startTime) {  //预热未开始
            this.setData({
                isSell: 0,
                isLoading: false,
            });
            if (totalSecond < 0) {  //倒计时结束
                clearInterval(this.data.interval),
                    wx.showToast({
                        title: '活动已开启,赶快抢购吧',
                    });
                this.setData({
                    countDownDay: '00',
                    countDownHour: '00',
                    countDownMinute: '00',
                    countDownSecond: '00',
                });
                this._seckillList(0) //获取秒杀场次信息
                this._initOutHeight() //获取设备可使用高度
            }
            var ts = (startTime - systemTime) / 1000;
            var totalSecond = parseInt(ts)
            console.log(totalSecond)

            this.setData({
                interval: setInterval(() => {
                    // 秒数  
                    var second = totalSecond;
                    // 天数位  
                    var day = Math.floor(second / 3600 / 24);
                    var dayStr = day.toString();
                    if (dayStr.length == 1) dayStr = '0' + dayStr;
                    // 小时位  
                    var hr = Math.floor((second - day * 3600 * 24) / 3600);
                    var hrStr = hr.toString();
                    if (hrStr.length == 1) hrStr = '0' + hrStr;
                    // 分钟位  
                    var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
                    var minStr = min.toString();
                    if (minStr.length == 1) minStr = '0' + minStr;
                    // 秒位  
                    var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
                    var secStr = sec.toString();
                    if (secStr.length == 1) secStr = '0' + secStr;
                    this.setData({
                        countDownDay: dayStr,
                        countDownHour: hrStr,
                        countDownMinute: minStr,
                        countDownSecond: secStr,
                    });
                    totalSecond--;
                }, 1000)
            })
            
        } else if (systemTime > startTime && systemTime < endTime) {
            this.setData({
                isSell: 1   //显示当前场次倒计时
            });
            // var totalSecond = endTime - Date.parse(systemTime) / 1000;
            var ts = (endTime - systemTime) / 1000;
            var totalSecond = parseInt(ts)
            console.log(totalSecond)

            if (totalSecond < 0) {
                clearInterval(interval);
                wx.showToast({
                    title: '活动已结束',
                });
                this.setData({
                    countDownDay: '00',
                    countDownHour: '00',
                    countDownMinute: '00',
                    countDownSecond: '00',
                });
            }

            this.setData({
                interval: setInterval(() => {
                    // 秒数  
                    var second = totalSecond;
                    // 天数位  
                    var day = Math.floor(second / 3600 / 24);
                    var dayStr = day.toString();
                    if (dayStr.length == 1) dayStr = '0' + dayStr;
                    // 小时位  
                    var hr = Math.floor((second - day * 3600 * 24) / 3600);
                    var hrStr = hr.toString();
                    if (hrStr.length == 1) hrStr = '0' + hrStr;
                    // 分钟位  
                    var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
                    var minStr = min.toString();
                    if (minStr.length == 1) minStr = '0' + minStr;
                    // 秒位  
                    var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
                    var secStr = sec.toString();
                    if (secStr.length == 1) secStr = '0' + secStr;
                    this.setData({
                        countDownDay: dayStr,
                        countDownHour: hrStr,
                        countDownMinute: minStr,
                        countDownSecond: secStr,
                    });
                    totalSecond--;
                }, 1000)
            })
            if (this.data.countDownSecond != '') {
                this.setData({
                    isshowtimeout: 1,
                    isLoading: false
                })
            }
        } else {
            this.setData({
                // isshowtimeout: 1,
                isLoading: false
            })
        }
    },
    showphone(e) {
        console.log(e)
        this.setData({
            isphone: 1,
            productId: this.data.dataList[e.currentTarget.id].productId
        })
    },
    hidephone() {
        this.setData({
            isphone: 0
        })
    },
    changecode(value) {
        // this.setData({
        //     inputNum: inputNum
        // })
        // var num = this.data.inputNum.substr(0,3)+"****"+this.data.inputNum.substr(7)

        console.log(value)
        this.setData({
            inputNum: value.detail.value
        })
        // var num = this.data.inputNum.substr(0, 3) + "****" + this.data.inputNum.substr(7)
        // this.setData({
        //     inputNum: num
        // })
    },
    sendphone() {
        console.log(this.data.productId)
        console.log(this.data.inputNum)

        let params = {
            productId: this.data.productId,
            mobile: this.data.inputNum,
        }
        seckillNotice(params).then(res => {
            console.log(res.data)
            if (res.data.code == 1) {
                wx.showToast({
                    title: '预约成功',
                    icon: 'success'
                });
                this.setData({
                    isphone: 0
                })
            } else {
                wx.showToast({
                    title: res.data.msg,
                    icon: 'none'
                });
            }
        })
    },
    goProductDetail(e) {    //去往商品详情
        this.setData({
            productId: this.data.dataList[e.currentTarget.id].productId
        })
        let productId = this.data.productId
        wx.navigateTo({
            url: `/pages/productDetail/productDetail?productId=${productId}`
        })
    },
    onPullDownRefresh: function () {   //下拉刷新
        var oid = this.data.seckillId
        // console.log(oid)
        this._seckillList(oid)
        // clearInterval(this.data.interval)
    },
    _timeout() {
        this._hideLoading()
        this.setData({
            timeout: true
        })
    },

    refreshEnv() {  //重新加载
        this.setData({
            timeout: false,
            isShowView: 1
        })
        // this.onPullDownRefresh()
        // console.log(1)
        this.setData({
            isLoading: true,

        })
        wx.showNavigationBarLoading()
        wx.setNavigationBarTitle({
            title: this.data.name,
        })

        this._seckillList(0) //获取秒杀场次信息
        this._initOutHeight() //获取设备可使用高度
    },
    _showLoading() {
        wx.showNavigationBarLoading()
        this.setData({
            isLoading: true
        })
    },
    _hideLoading() {
        wx.hideNavigationBarLoading()
        this.setData({
            isLoading: false
        })
    },
    onLoad(options) {   //options ==> 带来的参数信息
        this.setData({
            // isLoading : true,
            name: options.name ? options.name : '限时购',
            isLoading: true
        })
        wx.showNavigationBarLoading()
        wx.setNavigationBarTitle({
            title: this.data.name,
        })
        this._seckillList(0) //获取秒杀场次信息
        this._initOutHeight() //获取设备可使用高度
        // console.log(1111111)
    }
})